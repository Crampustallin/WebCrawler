const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const normalizeURL = (url) => {
	try {
	const wholeUrl = new URL(url);
	let pathname = `${wholeUrl.hostname}${wholeUrl.pathname}`;
	if(pathname.length > 0 && pathname.endsWith('/')) {
		pathname = pathname.slice(0,-1);
	}
	return pathname;
	} catch {
		return undefined;
	}
}

const getURLsFromHTML = (htmlbody, baseURL) => {
	const dom = new JSDOM(htmlbody);
	const nodeURLs = dom.window.document.querySelectorAll('a');
	let unNormalizedURLs = [];
	nodeURLs.forEach((a,i) => {
		const href = a.href;
		if(href.trim() !== '') {
			try {
				unNormalizedURLs[i] = (new URL(a.href, baseURL)).href;
			} catch (err) {
				console.error(err);
			}
		}
	});
	return unNormalizedURLs;
}

const crawlPage = async (baseURL, currentURL, pages) => {
	let baseDomain = new URL(baseURL);
	let currentDomain = new URL(currentURL, baseURL);
	if(baseDomain.host !== currentDomain.host) {
		return pages;
	}
	let normolized = normalizeURL(currentURL);
	if(!normolized) {
		return pages;
	}
	if(pages[normolized]) {
		pages[normolized]++;
		return pages;
	}  
	pages[normolized] = 1;
	
	let htmlBody = '';
	try {
		let response = await fetch(currentURL);
		if(!response.ok) {
			console.error('Failed to fetch HTML');
			return pages;
		} else if(response.headers.get('Content-Type').indexOf('text/html') === -1) {
			console.error('Content type is not HTML');
			return pages;
		}
		htmlBody = await response.text();
	} catch (err) {
		console.error(err);
	}
	const unNormalizedURLs = getURLsFromHTML(htmlBody, baseURL);
	for (const href of unNormalizedURLs) {
		pages = await crawlPage(baseURL, href, pages);
	}
	return pages;
}

const startCrawl = async (baseURL) => {
	return new Promise(async (resolve, reject) => {
		try {
			let text = await crawlPage(baseURL, baseURL, {});
			resolve(text);
		} catch(err) {
			reject(err);
		}
	});
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	startCrawl,
}
