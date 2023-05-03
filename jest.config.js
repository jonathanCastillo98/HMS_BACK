/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */

module.exports = {
    clearMocks: true,
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'ts'],
    roots: ["<rootDir>/src"],
    preset:'ts-jest',
    testEnvironment: 'node'
}