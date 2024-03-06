const {startCrawl} = require('./scripts/crawl');
const {printReport} = require('./scripts/report');
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

		startCrawl(baseURL).then(text => {
			printReport(text);
		}).catch(err => { 
			console.log(err);
		}).finally(() => intrvalId.unref());

	} else {
		console.error('ERROR: It has to be one baseURL argument');
	}
} 

main();
