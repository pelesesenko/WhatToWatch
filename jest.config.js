/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx"
  ],
  "moduleNameMapper": {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"]
};

// ,
//   "jest": {
//     preset: 'ts-jest',
//   testEnvironment: 'node',
//     "moduleFileExtensions": [
//       "js",
//       "ts",
//       "tsx"
//     ],
//     "moduleNameMapper": {
//       "\\.(css|less)$": "identity-obj-proxy"
//     }
//   }
