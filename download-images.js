const https = require('https');
const fs = require('fs');
const path = require('path');

const PAGE_URL = 'https://samogon.org/1201-staryj-mlyn';
const IMAGE_URL_PATTERN =
	/https:\/\/samogon\.org\/image\/cache\/catalog\/stariy_mlyn\/[^"'<>\\\s]+?-242x242\.(?:jpg|jpeg|png|webp)/gi;
const OUTPUT_DIR = path.join(__dirname, 'src', 'assets', 'item');
const CYRILLIC_TRANSLITERATION = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'h',
	ґ: 'g',
	д: 'd',
	е: 'e',
	є: 'ie',
	ж: 'zh',
	з: 'z',
	и: 'y',
	і: 'i',
	ї: 'i',
	й: 'i',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'kh',
	ц: 'ts',
	ч: 'ch',
	ш: 'sh',
	щ: 'shch',
	ь: '',
	ю: 'iu',
	я: 'ia',
	ы: 'y',
	э: 'e',
	ё: 'yo',
	ъ: '',
};

function request(url, redirectsLeft = 5) {
	return new Promise((resolve, reject) => {
		https
			.get(
				url,
				{
					headers: {
						'User-Agent':
							'Mozilla/5.0 (compatible; StaryiMlynImageDownloader/1.0)',
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
						const nextUrl = new URL(location, url).toString();
						resolve(request(nextUrl, redirectsLeft - 1));
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

function slugify(value) {
	return value
		.normalize('NFKD')
		.replace(/[А-Яа-яҐґЄєІіЇїЁёЪъЫыЭэ]/g, (char) => {
			const lower = char.toLowerCase();
			return CYRILLIC_TRANSLITERATION[lower] || '';
		})
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function filenameFromImageUrl(url, usedFilenames) {
	const pathname = decodeURIComponent(new URL(url).pathname);
	const sourceName = path.basename(pathname).replace(/-242x242\.[^.]+$/i, '');
	const slug = slugify(sourceName);
	const extension = path.extname(pathname).toLowerCase() || '.jpg';
	const baseName = slug || 'dish-image';
	let filename = `${baseName}${extension}`;
	let index = 2;

	while (usedFilenames.has(filename)) {
		filename = `${baseName}-${index}${extension}`;
		index += 1;
	}

	usedFilenames.add(filename);
	return filename;
}

function unique(values) {
	return [...new Set(values)];
}

async function main() {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	console.log(`Fetching ${PAGE_URL}`);
	const html = (await request(PAGE_URL)).toString('utf8');
	const imageUrls = unique(html.match(IMAGE_URL_PATTERN) || []);

	if (!imageUrls.length) {
		throw new Error('No Staryi Mlyn dish image URLs found on the page.');
	}

	console.log(`Found ${imageUrls.length} image URLs.`);

	const usedFilenames = new Set();
	let downloaded = 0;
	for (const imageUrl of imageUrls) {
		const filename = filenameFromImageUrl(imageUrl, usedFilenames);
		const outputPath = path.join(OUTPUT_DIR, filename);
		const image = await request(imageUrl);

		fs.writeFileSync(outputPath, image);
		downloaded += 1;
		console.log(`Saved ${filename}`);
	}

	const savedFiles = fs
		.readdirSync(OUTPUT_DIR)
		.filter((name) => /\.(?:jpg|jpeg|png|webp)$/i.test(name));

	console.log(`Downloaded ${downloaded} images.`);
	console.log(`Verified ${savedFiles.length} image files in ${OUTPUT_DIR}`);
}

main().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
