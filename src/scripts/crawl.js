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

const crawlPage = async (baseURL) => {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(baseURL);
			if(!response.ok) {
				throw new Error('Failed to fetch HTML');
			} else if(response.headers.get('Content-Type').indexOf('text/html') === -1) {
				throw new Error('Content type is not HTML');
			}
			let text = await response.text();
			resolve(text);
		} catch(err) {
			reject(err);
		}
	});
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
}
