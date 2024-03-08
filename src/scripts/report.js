let printReport = (pages) => {
	console.log('Report is starting...');
	let sortedPages = sortPages(pages);
	for (const [page, value] of Object.entries(sortedPages)) {
		console.log(`Found ${value} internal links to ${page}`); // TODO: print results to csv file rather than in console log
	}
}

let sortPages = (pages) => {
	let objectEntries = Object.entries(pages);
	let sortedPages = Object.fromEntries(objectEntries.sort((a, b) => b[1] - a[1]));
	return sortedPages;
}

module.exports = {
	printReport,
	sortPages,
}
