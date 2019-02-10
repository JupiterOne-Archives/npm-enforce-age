'use strict';
const enforceMaxNPMTokenAge = require('../src');

jest.mock('../src/npmTokens');
const fetchNPMTokens = require('../src/npmTokens');

function daysAgo(days) {
  return new Date(new Date().setDate(new Date().getDate() - days));
}

const npmTokenList = [
  {
    token: 'a31c95',
    key: '3e15afb937445a8eeeb6878370b649a9f5dcab7a',
    cidr_whitelist: null,
    readonly: false,
    created: daysAgo(8),
    updated: daysAgo(8)
  },
  {
    token: 'b12d45',
    key: 'ac2d02a937445a8eeeb6878370b649a9f320aef1',
    cidr_whitelist: null,
    readonly: false,
    created: daysAgo(30),
    updated: daysAgo(30)
  },
  {
    token: 'c23e56',
    key: '100deadbeef45a8eeeb6878370b649a9f98a7ea2',
    cidr_whitelist: null,
    readonly: false,
    created: daysAgo(31),
    updated: daysAgo(31)
  }
];

fetchNPMTokens.mockReturnValue(npmTokenList);

test('should exit cleanly if no tokens exceed max', () => {
  enforceMaxNPMTokenAge(31);
  expect(process.exitCode).toBe(0);
});

test('should exit with error if any tokens exceed max', () => {
  enforceMaxNPMTokenAge(30);
  expect(process.exitCode).toBe(1);
});

test('should exit with error if npm cannot retrieve token list', () => {
  fetchNPMTokens.mockImplementation(() => {
    throw new Error('simulated failure');
  });
  enforceMaxNPMTokenAge(31);
  expect(process.exitCode).toBe(1);
});
