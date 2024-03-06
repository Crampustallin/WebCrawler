const {crawlPage} = require('./scripts/crawl');
const { Console } = require('node:console');
const {argv, argv0} = require('node:process');

let main = () => {
	if(argv[2] && !argv[3]) {
		const baseURL = argv[2];
		console.log(`Strting crawling at ${baseURL}`);
		let dots = '.';
		const intrvalId = setInterval(() => {
			if(dots === '...') {
				dots = '.'
			} else {
				dots += '.';
			}
			process.stdout.write('\x1B[2J\x1B[0f');
			console.log(`Strting crawling at ${baseURL}${dots}`);
		}, 800);
		crawlPage(baseURL).then(text => console.log(text))
			.catch(err => console.log(err))
			.finally(() => intrvalId.unref());
	} else {
		console.error('ERROR: It has to be one baseURL argument');
	}
} 

main();
