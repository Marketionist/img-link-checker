# img-link-checker

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
