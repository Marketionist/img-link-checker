const { checkFile } = require('../index.js');

(async () => {
    const brokenLinks = await checkFile(
        './README.md',
        [
            'https://github.com/Marketionist/img-link-checker/actions',
            'https://www.linkedin.com/in/test/'
        ]
    );

    // Print a list of broken links and exit the process (will mark the CI/CD build as failed)
    if (brokenLinks.length > 0) {
        console.error('Broken links list:', brokenLinks);
        process.exit(1);
    }
})();
