// jest.config.js
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!src/**/protocols/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  coverageProvider: 'v8',
};

// eslint-disable-next-line no-undef
module.exports = config;
