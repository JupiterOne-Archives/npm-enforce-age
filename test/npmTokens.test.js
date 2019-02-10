'use strict';

const childProcess = require('child_process');
childProcess.execSync = jest.fn();
const fetchNPMTokens = require('../src/npmTokens');

childProcess.execSync.mockReturnValue({
  toString: () => {
    return '[]';
  }
});

test('should parse NPM Token List as JSON', () => {
  const result = fetchNPMTokens();
  expect(result).toEqual([]);
});
