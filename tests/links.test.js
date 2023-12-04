const { checkFile } = require('../index.js');

checkFile(
    './README.md',
    [
        'https://github.com/Marketionist/img-link-checker/actions',
        'https://www.linkedin.com/in/test/'
    ]
);
