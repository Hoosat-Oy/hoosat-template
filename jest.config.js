// This Jest configuration file exports an object with various properties to configure Jest for TypeScript and Node.js environment testing.
export default {
  // Use the ts-jest preset to transform TypeScript code to JavaScript for Jest.
  preset: 'ts-jest',
  // Use the Node.js test environment for running tests in a Node.js environment.
  testEnvironment: 'node',
  // Define the root directory for tests.
  roots: ['<rootDir>/src', '<rootDir>/src/__tests__'],
  // Define the test match pattern for Jest to find test files.
  testMatch: ['**/*.test.(ts|tsx)'],
  // Define the file extensions that Jest will recognize.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};