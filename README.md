# img-link-checker

[![Actions Status](https://github.com/Marketionist/img-link-checker/workflows/Build%20and%20Test/badge.svg?branch=master)](https://github.com/Marketionist/img-link-checker/actions)
[![npm version](https://img.shields.io/npm/v/img-link-checker.svg)](https://www.npmjs.com/package/img-link-checker)
[![NPM License](https://img.shields.io/npm/l/img-link-checker.svg)](https://github.com/Marketionist/img-link-checker/blob/master/LICENSE)

Check any file for broken links and images. The script in this package parses
any file that you specify and checks all absolute links in it. It makes request
to URL specified in each link and if response status code is not 200 (OK) then
a list (array) of broken links is outputted. 

# Installation
This is a lightweight package with only 1 dependency (axios). To install it just run:
```
npm install img-link-checker --save-dev
```

# Usage

## From the code
For example if you want to check `README.md` for broken links and images just require `img-link-checker` and call `checkFile('./path/to/file/README.md');`:
```
const { checkFile } = require('img-link-checker');

await checkFile('./README.md');
```

> Note: if you need to ignore some of the links - you can specify an optional
> second argument with an array of links that should not be checked:
> ```
> const { checkFile } = require('img-link-checker');
>
> (async () => {
>     const brokenLinks = await checkFile('./README.md', ['https://www.linkedin.com/in/test/']);
>
>     // Print a list of broken links and exit the process (will mark the CI/CD build as failed)
>     if (brokenLinks.length > 0) {
>         console.error('Broken links list:', brokenLinks);
>         process.exit(1);
>     }
> })();
> ```

## From the command line
Checking for broken links and images can also be invoked directly from the command line - just install the package and launch the command with
`TARGET_FILE_PATH` environment variable:
```
TARGET_FILE_PATH='./README.md' node node_modules/.bin/img-link-checker
```

# Thanks
If this link and image checking tool was helpful to you, please give it a
**★ Star** on [GitHub](https://github.com/Marketionist/img-link-checker).
