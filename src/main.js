const {startCrawl} = require('./scripts/crawl');
const {printReport} = require('./scripts/report');
const {argv} = require('node:process');

let main = () => {
	if(argv[2] && !argv[3]) {
		const baseURL = argv[2];
		let message = `Starting crawling at ${baseURL}`;
		console.log(message);
		let dots = '.';

		const intrvalId = setInterval(() => {
			if(dots === '...') {
				dots = '.'
			} else {
				dots += '.';
			}
			process.stdout.write('\x1B[2J\x1B[0f');
			console.log(message + dots);
		}, 800); 

		startCrawl(baseURL).then(text => {
			message =`Saving results to csv file`; 
			printReport(text).then(() => intrvalId.unref());
		}).catch(err => { 
			console.log(err);
		}).finally(() => intrvalId.unref());

		message = `Crawling at ${baseURL}`;
	} else {
		console.error('ERROR: It has to be one baseURL argument');
	}
} 

main();
