'use strict';

const sh = require('child_process').execSync;

function enforceMaxNPMTokenAge(days) {
  const maxAgeInSeconds = 60 * 60 * 24 * days;
  const expiredTokens = [];

  let tokens = [];
  try {
    tokens = JSON.parse(sh('npm token list --json').toString());
  } catch (err) {
    console.error(err);
    console.log('Please login with "npm login".');
    process.exitCode = 1;
    return;
  }

  tokens.forEach(token => {
    const ageInSeconds = Math.floor((Date.now() - Date.parse(token.created)) / 1000);
    if (ageInSeconds >= maxAgeInSeconds) {
      expiredTokens.push(token);
    }
  });

  expiredTokens.forEach(token => {
    const id = token.key.substr(0, 6);
    console.log('Your npm token with id ' + id + ' is too old! It was created on ' + token.created);
    console.log('Please issue the command:');
    console.log('npm token revoke ' + id);
    console.log();
    process.exitCode = 1;
  });
  process.exitCode = 0;
}

module.exports = enforceMaxNPMTokenAge;
