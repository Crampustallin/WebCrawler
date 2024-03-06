const {test, expect} = require('@jest/globals');
const {sortPages} = require('../src/scripts/report');
const {normalizeURL, getURLsFromHTML} = require('../src/scripts/crawl');

test('normalize function', () => {
	expect(normalizeURL('https://blog.boot.dev/path?name=john&lname=johnjr')).toBe('blog.boot.dev/path');
});

test('normalize function', () => {
	expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('get unnormolized array', () => {
	expect(getURLsFromHTML(`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`,'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/']);
});

test('get unnormolized array', () => {
	expect(getURLsFromHTML(`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
    </body>
</html>`,'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/','https://blog.boot.dev/']);
});

test('get unnormolized array', () => {
	expect(getURLsFromHTML(`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/path/"><span>Go to Boot.dev</span></a>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/path/catch"><span>Go to Boot.dev</span></a>
    </body>
</html>`,'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/','https://blog.boot.dev/path/', 'https://blog.boot.dev/', 'https://blog.boot.dev/path/catch']);
});

test('get unnormolized array', () => {
	expect(getURLsFromHTML(`<html>
    <body>
        <a href=""><span>test</span></a>
        <a href=""><span>Go to Boot.dev</span></a>
    </body>
</html>`,'https://blog.boot.dev')).toEqual([]);
});

test('get sorted', () => {
	const sorted = sortPages({"page3": 0, "page1": 99, "page2": 2});
	const keys = Object.keys(sorted);
	expect(keys).toEqual(["page1", "page2", "page3"]);
});

test('get sorted', () => {
	const sorted = sortPages({"page1": 0, "page3": 10, "page4": 5 });
	const keys = Object.keys(sorted);
	expect(keys).toEqual(["page3", "page4","page1"]);
})
