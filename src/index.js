'use strict';

const fetchNPMTokens = require('./npmTokens');

function enforceMaxNPMTokenAge(days) {
  const maxAgeInSeconds = 60 * 60 * 24 * days;
  const expiredTokens = [];

  process.exitCode = 0;

  let tokens = [];
  try {
    // Prevent Yarn from overriding registry
    // See https://github.com/yarnpkg/yarn/issues/2935
    const original_config_registry = process.env['npm_config_registry'];
    delete process.env['npm_config_registry'];

    tokens = fetchNPMTokens();

    process.env['npm_config_registry'] = original_config_registry;
  } catch (err) {
    console.error(err);
    console.log('Please login with "npm login".');
    process.exitCode = 1;
    return false;
  }

  tokens.forEach(token => {
    const ageInSeconds = Math.floor((Date.now() - Date.parse(token.created)) / 1000);
    if (ageInSeconds > maxAgeInSeconds) {
      expiredTokens.push(token);
    }
  });

  expiredTokens.forEach(token => {
    const id = token.key.substr(0, 6);
    console.log('Your npm token with id ' + id + ' is too old! It was created on ' + token.created);
    console.log('Please take the following steps:');
    console.log('1. npm token create --read-only');
    console.log('2. Paste this new token into your ~/.npmrc');
    console.log('3. npm token revoke ' + id);
    console.log();
    process.exitCode = 1;
  });
  return process.exitCode === 0;
}

module.exports = enforceMaxNPMTokenAge;
