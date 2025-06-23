import { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/main/**',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  clearMocks: true,
  //preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/test/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
