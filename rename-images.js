const fs = require('fs');
const path = require('path');

const PREFERRED_DIR = path.join(__dirname, 'src', 'assets', 'item');
const REQUESTED_DIR = path.join(__dirname, 'src', 'assets', 'items');
const IMAGE_DIR = fs.existsSync(PREFERRED_DIR) ? PREFERRED_DIR : REQUESTED_DIR;

const MAPPINGS = [
	['banderyky-mlyn.jpg', 'Banderiky'],
	['omlet-z-syrom.jpg', 'Very Cheesy Omelette'],
	['snidanok.jpg', 'Eggs with Sausage'],
	['palyanycya-z-indychkoyu.jpg', 'Bread with Turkey'],
	['mlyntsi-z-polunytseyu.jpg', 'Crepes with Apples'],
	['palyanycya-z-forellyu.jpg', 'Bread with Trout'],
	['shchedro-po-mlynivsky.jpg', 'Generous Mlyn Style'],
	['dyzayn-bez-nazvy-226.png', 'Braised Mushrooms with Dumplings'],
	['pecheni-yajcya.jpg', 'Baked Eggs'],
	['syrnyki.jpg', 'Cheesecakes Three Milks'],
	['1013-2.png', 'From Grandmas Garden'],
	['salat-z-kachynoyu-nizhkoyu.jpg', 'With Duck Leg'],
	['mizeriya-mlyn.jpg', 'Spring Colors'],
	['vinigret.jpg', 'Vinaigrette with Porcini'],
	['salat-z-lisovyh-grybiv.jpg', 'Forest Mushroom Salad'],
	['salat-z-kurkoyu-ta-shkvarkami.png', 'Salad with Chicken Rolls'],
	['yazykata-hveska.jpg', 'Talkative Khveska'],
	['1013-1.png', 'Olivier Salad'],
	['vin-togo-vartyj.jpg', 'He Is Worth It'],
	['6.png', 'Chicken Liver Pate'],
	['karpacho-z-kachky.jpg', 'Duck Carpaccio'],
	['zakatana-kapusta.jpg', 'Pickled Cabbage'],
	['oseledets.jpg', 'Herring with Roe'],
	['saloperegony.jpg', 'Salo Races'],
	['kurkulska-tarel.jpg', 'Rich Mans Board'],
	['bili-hryby-otstovani.jpg', 'Marinated Porcini'],
	['pivkilo-riznosoliv.jpg', 'Half Kilo of Pickles'],
	['soljanka.jpg', 'Meat Solyanka'],
	['02-kvaskovij-borsch.jpg', 'Sour Borscht with Nettle'],
	['bulyon-03-06.jpg', 'Oven Broth'],
	['grybnu-yushku.png', 'Mushroom Soup'],
	['borshch-mlyn-20-10-23.jpg', 'Yesterdays Borscht'],
	['smazhena-bulba.png', 'Fried Potatoes'],
	['1013-2-2.png', 'Smoked Oven Vegetables'],
	['photo-kartoplya.jpg', 'Potato Puree'],
	['kapusta-zasypana-openkamy.png', 'Cabbage with Honey Mushrooms'],
	['barabolka-po-ternopilsky-12-02-24.jpg', 'Ternopil Style Potatoes'],
	['medivnik.jpg', 'Melt in Mouth Honey Cake'],
	['morozyvo-z-lisu.jpg', 'Forest Ice Cream'],
	['nalysnyky-z-yablukamy.png', 'Crepes with Apples'],
	['shokoladna-strila.png', 'The Longest Chocolate'],
	['napoleonu.png', 'Wet Napoleon'],
	['gorishky.jpg', 'Golden Nuts'],
	['8.png', 'Chicken Cutlets'],
	['dyzayn-bez-nazvy-10.png', 'Chicken Broth'],
	['vareniki-d-sm.jpg', 'Dumplings with Potato'],
	['vareniki-d-sm.jpg', 'Dumplings with Rabbit'],
	['5.png', 'Chicken Sausages with Fries'],
	['galycki-obidy.jpg', 'Galician Lunches'],
	['kanapka-z-kurkoyu-ta-ovochamy.jpg', 'Canape with Chicken and Vegetables'],
	['kanapka-z-oseledcem.jpg', 'Canape with Herring'],
	['kanapka-z-telyatyny.jpg', 'Veal Canape'],
	['kanapka-z-shynkoyu.jpg', 'Canape with Ham'],
	['kanapka-z-shprotoyu.jpg', 'Canape with Sprats'],
	['svyatkove-kurcha.jpg', 'Festive Chicken'],
	['1013-6.png', 'Stuffed Carp'],
	['fruktova-narizka.jpg', 'Fruit Platter'],
	['7.png', 'Meat Pan'],
	['klosh-plyackiv.jpg', 'Kilogram of Cakes'],
	['espreso.jpg', 'Espresso'],
	['rystreto.jpg', 'Ristretto'],
	['amerykano-03-01.jpg', 'Americano'],
	['cappuccino.webp', 'Cappuccino'],
	['kapuchino.jpg', 'Cappuccino with Plant Milk'],
	['mocna-kava.jpg', 'Strong Coffee'],
	['matcha-late.jpg', 'Matcha Latte'],
	['late.jpg', 'Latte'],
	['lavandove-late.jpg', 'Lavender Latte'],
	['kakao.jpg', 'Cocoa with Marshmallows'],
	['kvaskk.jpg', 'Apple Kvass 05L'],
	['kraftovyj-kvas.jpg', 'Apple Kvass 1L'],
	['milkshejk-bananovyj.jpg', 'Banana Milkshake'],
	['milkshejk-yagidnyj.jpg', 'Berry Milkshake'],
	['yabluchnyj-fresh.jpg', 'Apple Fresh Juice'],
	['apelsynovyy-fresh.jpg', 'Orange Fresh Juice'],
	['grejpfrutovyj-fresh.jpg', 'Grapefruit Fresh Juice'],
	['oblipyhovo-grejpfrutovyj-chaj.jpg', 'Sea Buckthorn Grapefruit Tea'],
	['malynovo-konoplyanyj-chaj.jpg', 'Raspberry Hemp Tea'],
	['kysil-yagidnyj.jpg', 'Berry Kissel 03L'],
	['vyshnevyj-sik-1l.jpg', 'Homemade Cherry Juice 1L'],
	['sik-domashnij-yabluchnyj.jpg', 'Homemade Apple Juice 1L'],
	['tomatnyj-1l.jpg', 'Organic Tomato Juice 1L'],
	['uzvar-05.jpg', 'Smoked Uzvar 05L'],
	['uzvar-kopchenyj.jpg', 'Smoked Uzvar 1L'],
	['uzvar-1-5-l.jpg', 'Smoked Uzvar 15L'],
	['polyana.jpg', 'Polyana Kvasova Water 05L'],
];

const SOURCE_ALIASES = {
	'omlet-z-syrom.jpg': 'omlet-z-syrom-ta-shponderom-2.jpg',
	'snidanok.jpg': 'snidanok-2.png',
	'palyanycya-z-forellyu.jpg': 'palianytsia-z-forelliu2-mlyn-hruden-2024.jpg',
	'mlyntsi-z-polunytseyu.jpg': 'mlyntsi-z-polunytseiu.png',
	'shchedro-po-mlynivsky.jpg': 'shchedro-po-mlynivsky.png',
	'pecheni-yajcya.jpg': 'pecheni-iaytsia-mlyn.jpg',
	'syrnyki.jpg': 'syrnyky-try-moloka-mlyn.jpg',
	'salat-z-kachynoyu-nizhkoyu.jpg': 'salat-z-kachynoiu-nizhkoiu-mlyn.jpg',
	'mizeriya-mlyn.jpg': 'mizeriia-mlyn.jpg',
	'vinigret.jpg': 'vinihret-28-08.jpg',
	'salat-z-lisovyh-grybiv.jpg': 'salat-z-lisovykh-hrybiv.jpg',
	'salat-z-kurkoyu-ta-shkvarkami.png': 'salat-z-kurkoiu-ta-shkvarkamy.png',
	'yazykata-hveska.jpg': 'iazykata-khveska.jpg',
	'vin-togo-vartyj.jpg': 'vin-toho-vartyy.jpg',
	'karpacho-z-kachky.jpg': 'karpacho-z-kachky-mlyn.jpg',
	'oseledets.jpg': 'oseledets.jpeg',
	'saloperegony.jpg': 'saloperegoni-2022.jpg',
	'kurkulska-tarel.jpg': 'kurkulska-tarel-21-07-22.jpg',
	'pivkilo-riznosoliv.jpg': 'pivkilo-riznosoliv-21-07-22.jpg',
	'soljanka.jpg': 'soljanka-08-08-22.jpg',
	'grybnu-yushku.png': 'hrybnu-iushku.png',
	'photo-kartoplya.jpg': 'photo-2023-10-04-09-48-48.jpg',
	'medivnik.jpg': 'med1vnik2022.jpg',
	'morozyvo-z-lisu.jpg': 'morozyvo-z-lisuu-mlyn.jpg',
	'nalysnyky-z-yablukamy.png': 'mlyntsi-z-polunytseiu.png',
	'gorishky.jpg': 'horishky.jpg',
	'8.png': '1013-8.png',
	'galycki-obidy.jpg': 'halytski-obidy-z-tefteliamy.jpg',
	'kanapka-z-kurkoyu-ta-ovochamy.jpg': 'kanapka-z-kurkoiu-ta-ovochamy.jpg',
	'kanapka-z-oseledcem.jpg': 'kanapka-z-oseledtsem.jpg',
	'kanapka-z-telyatyny.jpg': 'kanapka-z-teliatynoiu.jpg',
	'kanapka-z-shynkoyu.jpg': 'kanapka-z-shynkoiu.jpg',
	'kanapka-z-shprotoyu.jpg': 'kanapka-z-shprotoiu.jpg',
	'svyatkove-kurcha.jpg': 'sviatkove-kurcha-2.jpg',
	'klosh-plyackiv.jpg': 'klosh-pliatskiv.jpg',
	'rystreto.jpg': 'espreso.jpg',
	'kraftovyj-kvas.jpg': 'kvas-1l.jpg',
	'milkshejk-bananovyj.jpg': 'milsheyk-bananovyy-03-02.jpg',
	'milkshejk-yagidnyj.jpg': 'milsheyk-iahidnyy-03-01.jpg',
	'yabluchnyj-fresh.jpg': 'iabluchnyy-fresh.jpg',
	'grejpfrutovyj-fresh.jpg': 'hreypfrutovyy-fresh-2.jpg',
	'oblipyhovo-grejpfrutovyj-chaj.jpg':
		'oblipykhovo-hreypfrutovyy-chay-03-01.jpg',
	'malynovo-konoplyanyj-chaj.jpg': 'malynovo-konoplianyy-chay-03-01.jpg',
	'kysil-yagidnyj.jpg': 'kysil-iahidnyy.jpg',
	'vyshnevyj-sik-1l.jpg': 'vyshnevyy-sik-1l.jpg',
	'tomatnyj-1l.jpg': 'tomatnyy-1l.jpg',
	'uzvar-05.jpg': 'uzvar-0-5.jpg',
	'uzvar-kopchenyj.jpg': 'uzvar-kopchenyy.jpg',
	'polyana.jpg': 'poliana-03-01.jpg',
};

function slugify(value) {
	return value
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function tokens(value) {
	return slugify(path.basename(value, path.extname(value)))
		.split('-')
		.filter(Boolean);
}

function levenshtein(a, b) {
	const rows = Array.from({ length: a.length + 1 }, (_, index) => [index]);
	for (let column = 1; column <= b.length; column += 1) {
		rows[0][column] = column;
	}

	for (let row = 1; row <= a.length; row += 1) {
		for (let column = 1; column <= b.length; column += 1) {
			const cost = a[row - 1] === b[column - 1] ? 0 : 1;
			rows[row][column] = Math.min(
				rows[row - 1][column] + 1,
				rows[row][column - 1] + 1,
				rows[row - 1][column - 1] + cost,
			);
		}
	}

	return rows[a.length][b.length];
}

function similarityScore(requested, candidate) {
	const requestedSlug = slugify(path.basename(requested, path.extname(requested)));
	const candidateSlug = slugify(path.basename(candidate, path.extname(candidate)));
	const requestedTokens = tokens(requested);
	const candidateTokens = new Set(tokens(candidate));
	const sharedTokenCount = requestedTokens.filter((token) =>
		candidateTokens.has(token),
	).length;
	const distance = levenshtein(requestedSlug, candidateSlug);

	return sharedTokenCount * 10 - distance / Math.max(requestedSlug.length, 1);
}

function findSourceFile(requestedName, files) {
	const alias = SOURCE_ALIASES[requestedName];
	if (alias) {
		const aliasMatch = files.find((file) => file.toLowerCase() === alias.toLowerCase());

		if (aliasMatch) {
			return { filename: aliasMatch, exact: false, alias };
		}
	}

	const exactMatch = files.find(
		(file) => file.toLowerCase() === requestedName.toLowerCase(),
	);

	if (exactMatch) {
		return { filename: exactMatch, exact: true };
	}

	const requestedExtension = path.extname(requestedName).toLowerCase();
	const candidates = files.filter(
		(file) => path.extname(file).toLowerCase() === requestedExtension,
	);
	const pool = candidates.length ? candidates : files;
	const closest = pool
		.map((file) => ({
			file,
			score: similarityScore(requestedName, file),
			sharedTokenCount: tokens(requestedName).filter((token) =>
				new Set(tokens(file)).has(token),
			).length,
		}))
		.sort((left, right) => right.score - left.score)[0];

	return closest && closest.score >= 8 && closest.sharedTokenCount >= 2
		? { filename: closest.file, exact: false, score: closest.score }
		: null;
}

function targetName(baseName, extension, occurrence) {
	return occurrence > 1 ? `${baseName}-${occurrence}${extension}` : `${baseName}${extension}`;
}

function cleanupGeneratedTargets(files) {
	const dishOccurrences = new Map();
	const generatedNames = [];

	for (const [, dishName] of MAPPINGS) {
		const baseName = slugify(dishName);
		const occurrence = (dishOccurrences.get(baseName) || 0) + 1;
		dishOccurrences.set(baseName, occurrence);

		for (const extension of ['.jpg', '.jpeg', '.png', '.webp']) {
			const generatedName = targetName(baseName, extension, occurrence);
			const oldGeneratedName = `${baseName}-2${extension}`;

			generatedNames.push(oldGeneratedName);

			if (generatedName === 'cappuccino.webp') {
				continue;
			}

			generatedNames.push(generatedName);
		}
	}

	let removed = 0;
	for (const generatedName of new Set(generatedNames)) {
		if (!files.includes(generatedName)) {
			continue;
		}

		fs.unlinkSync(path.join(IMAGE_DIR, generatedName));
		removed += 1;
	}

	if (removed > 0) {
		console.log(`Removed ${removed} previously generated target files.`);
	}
}

function uniqueTargetName(baseName, extension, occurrence) {
	return targetName(baseName, extension, occurrence);
}

function describeConvention(files) {
	const workingImages = files.filter((file) => file.endsWith('.webp'));
	const conventionSource = workingImages.length ? workingImages : files;
	const sample = conventionSource.slice(0, 8).join(', ');

	console.log('Detected naming convention: lowercase kebab-case filenames.');
	console.log(`Sample existing files: ${sample}`);
}

function main() {
	if (!fs.existsSync(IMAGE_DIR)) {
		throw new Error(`Image folder not found: ${IMAGE_DIR}`);
	}

	let files = fs
		.readdirSync(IMAGE_DIR)
		.filter((file) => /\.(?:jpg|jpeg|png|webp)$/i.test(file));

	describeConvention(files);
	cleanupGeneratedTargets(files);
	files = fs
		.readdirSync(IMAGE_DIR)
		.filter((file) => /\.(?:jpg|jpeg|png|webp)$/i.test(file));

	const seenTargetBaseNames = new Map();
	let processed = 0;

	for (const [sourceName, dishName] of MAPPINGS) {
		const match = findSourceFile(sourceName, files);

		if (!match) {
			console.log(`missing ${sourceName} -> ${dishName}`);
			continue;
		}

		const extension = path.extname(match.filename).toLowerCase();
		const targetBaseName = slugify(dishName);
		const occurrence = (seenTargetBaseNames.get(targetBaseName) || 0) + 1;
		seenTargetBaseNames.set(targetBaseName, occurrence);
		const targetName = uniqueTargetName(targetBaseName, extension, occurrence);
		const sourcePath = path.join(IMAGE_DIR, match.filename);
		const targetPath = path.join(IMAGE_DIR, targetName);

		if (path.resolve(sourcePath) !== path.resolve(targetPath)) {
			fs.copyFileSync(sourcePath, targetPath);
		}
		processed += 1;

		const matchNote = match.exact
			? ''
			: ` (${match.alias ? `alias ${match.alias}` : `closest match for ${sourceName}`})`;
		console.log(`renamed ${match.filename} -> ${targetName}${matchNote}`);
	}

	console.log(`Processed ${processed} image mappings in ${IMAGE_DIR}`);
}

try {
	main();
} catch (error) {
	console.error(error.message);
	process.exitCode = 1;
}
