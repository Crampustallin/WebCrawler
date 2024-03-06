const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const normalizeURL = (url) => {
	const wholeUrl = new URL(url);
	let pathname = wholeUrl.pathname;
	if(pathname.endsWith('/')) {
		pathname = pathname.slice(0,-1);
	}
	return wholeUrl.hostname + pathname;
}

const getURLsFromHTML = (htmlbody, baseURL) => {
	const dom = new JSDOM(htmlbody);
	const nodeURLs = dom.window.document.querySelectorAll('a');
	let unNormalizedURLs = [];
	nodeURLs.forEach((a,i) => {
		const href = a.href;
		if(href.trim() !== '') {
			try {
				unNormalizedURLs[i] = (new URL(a.href, baseURL)).toString();
			} catch (err) {
				console.error(err);
			}
		}
	});
	return unNormalizedURLs;
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
}
