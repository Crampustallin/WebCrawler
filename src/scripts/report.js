const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

let  printReport = async (pages) => {
	try {
		let sortedPages = sortPages(pages);
		await saveToFile(sortedPages);
		for (const [page, value] of Object.entries(sortedPages)) {
			console.log(`Found ${value} internal links to ${page}`); // TODO: print results to csv file rather than in console log
		} 
	} catch (err) {
		console.error(err);
	}
}

let sortPages = (pages) => {
	let objectEntries = Object.entries(pages);
	let sortedPages = Object.fromEntries(objectEntries.sort((a, b) => b[1] - a[1]));
	return sortedPages;
}

let saveToFile = async (data) => {
	return new Promise((resolve, rejects) => {
		try {
			console.log(data);
			const csv = Papa.unparse(Object.entries(data));
			console.log(csv.toString());
			const now = Date.now();
			const fileName = (now) + ".csv";
			const filePath = path.join(`${__dirname}`, '..', '..', '/data', fileName); // TODO: find a solution to create the data directory if it's doesn't exist
			fs.writeFileSync(filePath, csv); 
			resolve('Success');
		} catch (err) {
			rejects('ERROR: while saving to csv\n'+ err.message);
		}
	});
}
module.exports = {
	printReport,
	sortPages,
	saveToFile,
}
