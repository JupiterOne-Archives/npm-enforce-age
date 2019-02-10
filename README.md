## `npm-enforce-age`

NPM tokens do not expire. They really should, though, as a matter of security best practice and data hygiene. This project is intended to be used to help remind you when it is time to revoke your issued NPM tokens.

To use, simply do:

`npx @jupiterone/npm-enforce-age <days>`

e.g.:

`npx @jupiterone/npm-enforce-age 60`

By default, if you do not provide a `<days>` argument, NPM tokens older than 30 days will be flagged for revocation.

The script will exit cleanly with exit code 0 upon success, or emit warning messages and exit with code 1 if one or more of your issued tokens is older than the `<days>` limit. This makes it convenient to put this script in a `package.json` lifecycle hook, (say, `prepublish`), or some other local build script. A few examples:

```json
 "scripts": {
    "prepublish": "npx @jupiterone/npm-enforce-age",
 }
```

or:

```shell
#!/bin/bash
set -e
npx @jupiterone/npm-enforce-age
...rest of build script...
```

or perhaps:

```shell
npx @jupiterone/npm-enforce-age || exit 1
...rest of script...
```

For use inside a local NodeJS script, you might do:

```javascript
const enforceMaxNPMTokenAge = require('@jupiterone/npm-enforce-age');

if (!enforceMaxNPMTokenAge(30)) {
  return;
}
...rest of script...
```