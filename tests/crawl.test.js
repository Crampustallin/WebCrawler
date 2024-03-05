const {test, expect} = require('@jest/globals');
const {normalizeURL} = require('../src/crawl');

test('normalize function', () => {
	expect(normalizeURL('https://blog.boot.dev/path?name=john&lname=johnjr')).toBe('blog.boot.dev/path');
});
