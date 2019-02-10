'use strict';
module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1'
  },
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  verbose: false,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};
