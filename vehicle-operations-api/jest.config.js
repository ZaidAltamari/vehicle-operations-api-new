// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: '.',
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
};
