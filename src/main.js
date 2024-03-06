const {crawlPage} = require('./scripts/crawl');
const {argv} = require('node:process');

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

		crawlPage(baseURL).then(text => {
			intrvalId.unref();
			console.log(text);
		}).catch(err => { 
			intrvalId.unref();
			console.log(err);
		});

	} else {
		console.error('ERROR: It has to be one baseURL argument');
	}
} 

main();
