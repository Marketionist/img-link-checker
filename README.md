# img-link-checker

[![Build Status](https://travis-ci.org/Marketionist/img-link-checker.svg?branch=master)](https://travis-ci.org/Marketionist/img-link-checker)
[![npm version](https://img.shields.io/npm/v/img-link-checker.svg)](https://www.npmjs.com/package/img-link-checker)
[![NPM License](https://img.shields.io/npm/l/img-link-checker.svg)](https://github.com/Marketionist/img-link-checker/blob/master/LICENSE)

Check any file for broken links and images

# Installation

```
npm install img-link-checker --save-dev
```

# Usage

## From the code
If you want to check `README.md` for broken links and images just require `img-link-checker` and call
`checkFile('./path/to/file/', 'README.md');`:
```
const { checkFile } = require('img-link-checker');

checkFile('./README.md');
```

## From the command line
Set `TARGET_FILE_PATH` environment variable:
```
TARGET_FILE_PATH='./README.md' node node_modules/.bin/img-link-checker
```

# Thanks
If this link and image checking tool was helpful for you, please give it a **★ Star**
on [github](https://github.com/Marketionist/img-link-checker).
