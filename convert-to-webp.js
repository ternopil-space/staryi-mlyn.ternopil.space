const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const itemsDir = path.join(__dirname, 'src', 'assets', 'item');
const dishesPath = path.join(__dirname, 'src', 'data', 'dishes.json');
const firstNewDishSlug = 'banderyky-snidanky';

const sourceBySlug = {
	'banderyky-snidanky': 'banderiky.jpg',
	'duzhe-syrnyi-omlet': 'very-cheesy-omelette.jpg',
	'yaiechnia-z-kovbasoiu': 'eggs-with-sausage.png',
	'palianytsia-z-indychkoiu': 'bread-with-turkey.jpg',
	'nalysnyky-z-yablukamy-snidanky': 'crepes-with-apples.png',
	'palianytsia-z-forelliu': 'bread-with-trout.jpg',
	'shchedro-po-mlynivsky': 'generous-mlyn-style.png',
	'hryby-tushkovani-z-halushkamy-snidanky': 'braised-mushrooms-with-dumplings.png',
	'pecheni-yaitsia': 'baked-eggs.jpg',
	'syrnyky-try-moloka': 'cheesecakes-three-milks.jpg',
	'z-babusynoho-horodu': 'from-grandmas-garden.png',
	'z-kachynoiu-nizhkoiu': 'with-duck-leg.jpg',
	'vesniani-barvy': 'spring-colors.jpg',
	'vinehret-z-bilymy-hrybamy': 'vinaigrette-with-porcini.jpg',
	'salat-z-lisovykh-hrybiv': 'forest-mushroom-salad.jpg',
	'salat-z-kuriachymy-kruchenykamy': 'salad-with-chicken-rolls.png',
	'yazykata-khveska': 'talkative-khveska.jpg',
	'maionez-z-horoshkom': 'olivier-salad.png',
	'vin-toho-vartyi': 'he-is-worth-it.jpg',
	'pashtet-z-kuriachoi-pechinky': 'chicken-liver-pate.png',
	'karpacho-z-kachky': 'duck-carpaccio.jpg',
	'zakatana-kapusta': 'pickled-cabbage.jpg',
	'oseledets-z-kaviarom': 'herring-with-roe.jpeg',
	'saloperehony': 'salo-races.jpg',
	'kurkulska-tarel': 'rich-mans-board.jpg',
	'bili-hryby-otstovani': 'marinated-porcini.jpg',
	'pivkilo-riznosoliv': 'half-kilo-of-pickles.jpg',
	'miasna-selianka': 'meat-solyanka.jpg',
	'kvaskovyi-borshch-z-kropyvoiu': 'sour-borscht-with-nettle.jpg',
	'bulion-z-pechi': 'oven-broth.jpg',
	'hrybna-yushka': 'mushroom-soup.png',
	'vchorashnii-borshch': 'yesterdays-borscht.jpg',
	'smazheni-baraboli': 'fried-potatoes.png',
	'ovochi-zadymleni-v-pechi': 'smoked-oven-vegetables.png',
	'piure-z-bulby': 'potato-puree.jpg',
	'kapusta-zasypana-openkamy': 'cabbage-with-honey-mushrooms.png',
	'barabolka-po-ternopilsky': 'ternopil-style-potatoes.jpg',
	'medivnyk-shcho-tane-v-roti': 'melt-in-mouth-honey-cake.jpg',
	'morozyvo-z-lisu': 'forest-ice-cream.jpg',
	'nalysnyky-z-yablukamy-solodenke': 'crepes-with-apples-2.png',
	'naidovshyi-shokoladnyi': 'the-longest-chocolate.png',
	'mokryi-napoleon': 'wet-napoleon.png',
	'zoloti-horishky': 'golden-nuts.jpg',
	'kuryachi-kotletky': 'chicken-cutlets.png',
	'bulionchyk-kuriachyi': 'chicken-broth.png',
	'varenyky-z-kartopleiu': 'dumplings-with-potato.jpg',
	'varenyky-z-krolykom': 'dumplings-with-rabbit.jpg',
	'kuryachi-kovbasky-z-fri': 'chicken-sausages-with-fries.png',
	'halytski-obidy': 'galician-lunches.jpg',
	'kanapka-z-kurkoiu-ta-ovochamy': 'canape-with-chicken-and-vegetables.jpg',
	'kanapka-z-oseledtsem': 'canape-with-herring.jpg',
	'kanapka-z-teliatyny': 'veal-canape.jpg',
	'kanapka-z-shynkoiu': 'canape-with-ham.jpg',
	'kanapka-z-shprotoiu': 'canape-with-sprats.jpg',
	'sviatkove-kurcha': 'festive-chicken.jpg',
	'farshyrovanyi-korop': 'stuffed-carp.png',
	'fruktova-narizka': 'fruit-platter.jpg',
	'patelnia-miasa': 'meat-pan.png',
	'kilohram-pliatskiv': 'kilogram-of-cakes.jpg',
	espreso: 'espresso.jpg',
	rystreto: 'ristretto.jpg',
	amerykano: 'americano.jpg',
	kapuchyno: 'cappuccino.webp',
	'kapuchyno-na-roslynnomu-molotsi': 'cappuccino-with-plant-milk.jpg',
	'motsna-kava': 'strong-coffee.jpg',
	'matcha-late': 'matcha-latte.jpg',
	late: 'latte.jpg',
	'lavandove-late': 'lavender-latte.jpg',
	'kakao-z-khmarynkamy': 'cocoa-with-marshmallows.jpg',
	'kvas-yabluchnyi-05-l': 'apple-kvass-05l.jpg',
	'kvas-yabluchnyi-1-l': 'apple-kvass-1l.jpg',
	'milksheik-bananovyi': 'banana-milkshake.jpg',
	'milksheik-yahidnyi': 'berry-milkshake.jpg',
	'fresh-yabluchnyi': 'apple-fresh-juice.jpg',
	'fresh-apelsynovyi': 'orange-fresh-juice.jpg',
	'fresh-hreipfrutovyi': 'grapefruit-fresh-juice.jpg',
	'chai-oblipykhovo-hreipfrutovyi': 'sea-buckthorn-grapefruit-tea.jpg',
	'chai-malynovo-konoplianyi': 'raspberry-hemp-tea.jpg',
	'kysil-yahidnyi-03-l': 'berry-kissel-03l.jpg',
	'sik-vyshnevyi-domashnii-1-l': 'homemade-cherry-juice-1l.jpg',
	'sik-yabluchnyi-domashnii-1-l': 'homemade-apple-juice-1l.jpg',
	'sik-tomatnyi-orhanichnyi-1-l': 'organic-tomato-juice-1l.jpg',
	'uzvar-kopchenyi-05-l': 'smoked-uzvar-05l.jpg',
	'uzvar-kopchenyi-1-l': 'smoked-uzvar-1l.jpg',
	'uzvar-kopchenyi-15-l': 'smoked-uzvar-15l.jpg',
	'voda-poliana-kvasova-05-l': 'polyana-kvasova-water-05l.jpg',
};

function basenameWithoutExtension(file) {
	return path.basename(file, path.extname(file));
}

function distance(a, b) {
	const costs = Array.from({ length: b.length + 1 }, (_, index) => index);

	for (let i = 1; i <= a.length; i++) {
		let previous = i;
		for (let j = 1; j <= b.length; j++) {
			const current = costs[j];
			costs[j] =
				a[i - 1] === b[j - 1]
					? costs[j - 1]
					: Math.min(costs[j - 1] + 1, previous + 1, current + 1);
			previous = current;
		}
		costs[0] = i;
	}

	return costs[b.length];
}

function closestFile(target, files) {
	const targetBase = basenameWithoutExtension(target);

	return files
		.map((file) => ({
			file,
			score: distance(targetBase, basenameWithoutExtension(file)),
		}))
		.sort((a, b) => a.score - b.score || a.file.localeCompare(b.file))[0]?.file;
}

async function convertImage(source, target) {
	try {
		await sharp(source).webp({ quality: 86 }).toFile(target);
		return 'converted';
	} catch (error) {
		fs.copyFileSync(source, target);
		return `copied fallback (${error.message})`;
	}
}

async function main() {
	const dishes = JSON.parse(fs.readFileSync(dishesPath, 'utf8'));
	const firstNewDishIndex = dishes.findIndex((dish) => dish.slug === firstNewDishSlug);

	if (firstNewDishIndex === -1) {
		throw new Error(`Could not find first new dish slug: ${firstNewDishSlug}`);
	}

	const files = fs.readdirSync(itemsDir);
	const imageFiles = files.filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
	const newDishes = dishes.slice(firstNewDishIndex).filter((dish) => sourceBySlug[dish.slug]);
	let created = 0;
	let skipped = 0;

	for (const dish of newDishes) {
		const targetFile = `${dish.slug}.webp`;
		const targetPath = path.join(itemsDir, targetFile);

		if (fs.existsSync(targetPath)) {
			console.log(`exists ${targetFile}`);
			skipped++;
			continue;
		}

		const preferredSource = sourceBySlug[dish.slug];
		const sourceFile = fs.existsSync(path.join(itemsDir, preferredSource))
			? preferredSource
			: closestFile(preferredSource, imageFiles);

		if (!sourceFile) {
			console.log(`missing source for ${dish.slug}`);
			continue;
		}

		const sourcePath = path.join(itemsDir, sourceFile);
		const result = await convertImage(sourcePath, targetPath);
		console.log(`${result} ${sourceFile} -> ${targetFile}`);
		created++;
	}

	const missing = newDishes
		.map((dish) => `${dish.slug}.webp`)
		.filter((file) => !fs.existsSync(path.join(itemsDir, file)));

	console.log(`created ${created}, skipped ${skipped}, missing ${missing.length}`);

	if (missing.length) {
		console.log(`missing: ${missing.join(', ')}`);
		process.exitCode = 1;
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
