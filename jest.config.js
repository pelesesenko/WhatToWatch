/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx"
  ],
  "moduleNameMapper": {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  "setupFilesAfterEnv": [
    "./src/tests/setupTest.ts"
  ],
  // "verbose": true,
  "clearMocks": true,
  // "collectCoverage": true,
};
