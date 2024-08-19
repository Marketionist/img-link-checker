const { promisify } = require('util');
const fs = require('fs');
const axios = require('axios');

/* eslint-disable max-len */
/**
 * Checks file for broken links and images.
 * @param {String} filePath path to the file that should be checked for broken links and images (for example: './path/to/file/README.md').
 * @param {Array} ignoreLinks array of links that should not be checked (for example: ['https://www.linkedin.com/in/test/']).
 * @returns {Array} array of broken links.
 */
async function checkFile (filePath, ignoreLinks = []) {
    /* eslint-enable max-len */
    const pathToFile = process.env.TARGET_FILE_PATH || filePath;
    const readFile = promisify(fs.readFile);
    const text = await readFile(pathToFile, 'utf8');
    const statusCodeOk = 200;
    let brokenLinks = [];

    // Filter out only links that start with http(s) and end with ) or " or '
    // Using negative lookahead ?! to filter out localhost:
    const links = text.match(/https?:\/\/(?!.*(localhost:)).*?[\)|"|']/gi);

    if (links) {
        // Clear links from last character ) or " or '
        let filteredLinks = links.map((value) => value.slice(0, -1));

        // Remove the ignored links if any
        if (ignoreLinks.length > 0) {
            filteredLinks = filteredLinks.filter((value) => {
                return !ignoreLinks.includes(value);
            });
        }

        console.log(`Found ${filteredLinks.length} link(s):`);
        console.log(filteredLinks);

        const responses = await Promise.all(filteredLinks.map(async (value) => {
            try {
                const response = await axios.get(value);

                return response.status;
            } catch (error) {
                console.error(`Found broken link (${error}): ${value}`);
            }
        }));

        responses.map((value, index) => {
            if (value !== statusCodeOk) { brokenLinks.push(filteredLinks[index]); }
        });
    } else {
        console.log(`No links found in ${pathToFile}`);
    }

    return brokenLinks;
}

if (process.env.TARGET_FILE_PATH) {
    checkFile(process.env.TARGET_FILE_PATH);
}

module.exports = {
    checkFile
};
