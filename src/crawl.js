const normalizeURL = (url) => {
	const wholeUrl = new URL(url);
	let pathname = wholeUrl.pathname;
	if(pathname.endsWith('/')) {
		pathname = pathname.slice(0,-1);
	}
	return wholeUrl.hostname + pathname;
}

module.exports = {
	normalizeURL,
}
