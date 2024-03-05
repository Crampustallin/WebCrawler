module.exports = {
	testEnvironment: "node",
	testMatch: [
		'**/__test__/**/*.js',
		'**/?(*.)+(spec|test).js',
	],
	testPathIgnorePatterns: [
		'/node_modules/',
	],
	roots: [
		'<rootDir>/src',
		'<rootDir>/tests',
	],
}
