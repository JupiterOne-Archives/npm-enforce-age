'use strict';

const sh = require('child_process').execSync;

function fetchNPMTokens() {
  return JSON.parse(sh('npm token list --json').toString());
}

module.exports = fetchNPMTokens;
