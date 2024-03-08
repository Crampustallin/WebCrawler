const {test, expect} = require('@jest/globals');
const {sortPages, saveToFile} = require('../src/scripts/report');

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

test('save to csv', () => {
	const sorted = sortPages({"page1": 0, "page3": 10, "page4": 5 });
	console.log(sorted);
	saveToFile(sorted).then((res) => expect(res).toBe('Success'));
})
