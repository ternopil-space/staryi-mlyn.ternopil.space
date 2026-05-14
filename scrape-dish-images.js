const fs = require('fs');
const https = require('https');
const path = require('path');
const sharp = require('sharp');

const CATEGORY_URLS = [
	'https://samogon.org/1201-staryj-mlyn/1442-snidanky',
	'https://samogon.org/1201-staryj-mlyn/menu-salatki',
	'https://samogon.org/1201-staryj-mlyn/menu-silski-smaki',
	'https://samogon.org/1201-staryj-mlyn/menu-na-pershe',
	'https://samogon.org/1201-staryj-mlyn/menu-garniri',
	'https://samogon.org/1201-staryj-mlyn/menu-solodki-smakotuli',
	'https://samogon.org/1201-staryj-mlyn/dityache-menyu-1',
	'https://samogon.org/1201-staryj-mlyn/1443-dilovi-obidy',
	'https://samogon.org/1201-staryj-mlyn/1520-benketne-menyu',
	'https://samogon.org/1201-staryj-mlyn/menu-napoyi-3',
	'https://samogon.org/1201-staryj-mlyn/1562-yak-u-mamy',
];

const IMAGE_URL_PATTERN =
	/https:\/\/samogon\.org\/image\/cache\/catalog\/stariy_mlyn\/[^"'<>\\\s]+?-242x242\.jpg/gi;
const DISHES_PATH = path.join(__dirname, 'src', 'data', 'dishes.json');
const OUTPUT_DIR = path.join(__dirname, 'src', 'assets', 'item');

function request(url, redirectsLeft = 5) {
	return new Promise((resolve, reject) => {
		https
			.get(
				url,
				{
					headers: {
						'User-Agent':
							'Mozilla/5.0 (compatible; StaryiMlynDishImageScraper/1.0)',
					},
				},
				(response) => {
					const statusCode = response.statusCode || 0;
					const location = response.headers.location;

					if (
						statusCode >= 300 &&
						statusCode < 400 &&
						location &&
						redirectsLeft > 0
					) {
						response.resume();
						resolve(request(new URL(location, url).toString(), redirectsLeft - 1));
						return;
					}

					if (statusCode < 200 || statusCode >= 300) {
						response.resume();
						reject(new Error(`Request failed (${statusCode}) for ${url}`));
						return;
					}

					const chunks = [];
					response.on('data', (chunk) => chunks.push(chunk));
					response.on('end', () => resolve(Buffer.concat(chunks)));
				},
			)
			.on('error', reject);
	});
}

function decodeHtml(value) {
	const namedEntities = {
		amp: '&',
		apos: "'",
		gt: '>',
		lt: '<',
		nbsp: ' ',
		quot: '"',
	};

	return value
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) =>
			String.fromCodePoint(Number.parseInt(code, 16)),
		)
		.replace(/&([a-z]+);/gi, (entity, name) => namedEntities[name] || entity);
}

function stripTags(value) {
	return decodeHtml(value.replace(/<[^>]*>/g, ' '))
		.replace(/\s+/g, ' ')
		.trim();
}

function normalizeName(value) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s]/gu, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function attrValue(tag, attrName) {
	const match = tag.match(
		new RegExp(`${attrName}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'),
	);

	return match ? stripTags(match[2]) : '';
}

function closestAnchorContext(html, imageIndex) {
	const beforeImage = html.slice(0, imageIndex);
	const anchorStart = beforeImage.lastIndexOf('<a');

	if (anchorStart === -1) {
		return '';
	}

	const anchorEnd = html.indexOf('</a>', imageIndex);
	const nextAnchorStart = html.indexOf('<a', anchorStart + 2);

	if (anchorEnd === -1 || (nextAnchorStart !== -1 && nextAnchorStart < imageIndex)) {
		return '';
	}

	return html.slice(anchorStart, anchorEnd + 4);
}

function dishNameFromContext(html, imageIndex) {
	const anchor = closestAnchorContext(html, imageIndex);
	const context = anchor || html.slice(Math.max(0, imageIndex - 600), imageIndex + 600);
	const imageTag = context.match(/<img\b[^>]*>/i)?.[0] || '';
	const anchorTag = context.match(/<a\b[^>]*>/i)?.[0] || '';

	return (
		attrValue(anchorTag, 'title') ||
		attrValue(imageTag, 'title') ||
		attrValue(imageTag, 'alt') ||
		stripTags(anchor)
	);
}

function findDishImages(html) {
	const dishesByImageUrl = new Map();

	for (const match of html.matchAll(IMAGE_URL_PATTERN)) {
		const imageUrl = match[0];

		if (dishesByImageUrl.has(imageUrl)) {
			continue;
		}

		const dishName = dishNameFromContext(html, match.index || 0);

		if (dishName) {
			dishesByImageUrl.set(imageUrl, dishName);
		}
	}

	return [...dishesByImageUrl].map(([imageUrl, dishName]) => ({
		dishName,
		imageUrl,
	}));
}

function dishesByNormalizedName(dishes) {
	const result = new Map();

	for (const dish of dishes) {
		const normalized = normalizeName(dish.name || '');

		if (normalized && !result.has(normalized)) {
			result.set(normalized, dish);
		}
	}

	return result;
}

async function saveWebp(imageUrl, slug) {
	const targetPath = path.join(OUTPUT_DIR, `${slug}.webp`);
	const image = await request(imageUrl);

	await sharp(image).webp({ quality: 86 }).toFile(targetPath);
}

function missingDishImages(dishes) {
	return dishes
		.filter((dish) => !fs.existsSync(path.join(OUTPUT_DIR, `${dish.slug}.webp`)))
		.map((dish) => `${dish.name} (${dish.slug})`);
}

async function main() {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	const dishes = JSON.parse(fs.readFileSync(DISHES_PATH, 'utf8'));
	const dishByName = dishesByNormalizedName(dishes);
	const seenImageUrls = new Set();
	let downloaded = 0;
	let skipped = 0;

	for (const pageUrl of CATEGORY_URLS) {
		console.log(`Fetching ${pageUrl}`);
		const html = (await request(pageUrl)).toString('utf8');
		const dishImages = findDishImages(html);

		for (const { dishName, imageUrl } of dishImages) {
			if (seenImageUrls.has(imageUrl)) {
				continue;
			}

			seenImageUrls.add(imageUrl);
			const match = dishByName.get(normalizeName(dishName));

			if (!match) {
				skipped += 1;
				console.log(`✗ skipped ${dishName} — no matching slug`);
				continue;
			}

			await saveWebp(imageUrl, match.slug);
			downloaded += 1;
			console.log(`✓ saved ${dishName} → ${match.slug}.webp`);
		}
	}

	const missing = missingDishImages(dishes);

	console.log('');
	console.log(`Total images downloaded: ${downloaded}`);
	console.log(`Total skipped: ${skipped}`);
	console.log('Dishes from dishes.json still missing image files:');

	if (missing.length) {
		for (const dish of missing) {
			console.log(`- ${dish}`);
		}
	} else {
		console.log('- none');
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
