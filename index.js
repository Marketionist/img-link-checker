const { promisify } = require('util');
const fs = require('fs');
const axios = require('axios');

const checkFile = async (filePath) => {
    const readFile = promisify(fs.readFile);
    const text = await readFile(filePath, 'utf8');

    // Filter out only links that start from http(s) and end with ) or " or '
    // Using negative lookahead ?! to filter out localhost:
    const links = text.match(/https?:\/\/(?!.*(localhost:)).*?[\)|"|']/gi);

    if (links) {
        // Clear links from last character ) or " or '
        const clearedLinks = links.map((value) => value.slice(0, -1));

        console.log(`Found ${clearedLinks.length} link(s):`);
        console.log(clearedLinks);

        const responses = await Promise.all(clearedLinks.map(async (value) => {
            try {
                const response = await axios.get(value);

                return response.status;
            } catch (error) {
                console.error(`Found broken link (${error}): ${value}`);
            }
        }));

        const brokenLinks = [];
        const statusCodeOk = 200;

        responses.map((value, index) => {
            if (value !== statusCodeOk) { brokenLinks.push(clearedLinks[index]); }
        });

        if (brokenLinks.length > 0) {
            console.error('Broken links list:', brokenLinks);
            process.exit(1);
        } else {
            return clearedLinks;
        }
    } else {
        console.log(`No links found in ${filePath}`);
    }

};

if (process.env.TARGET_FILE_PATH) {
    checkFile(process.env.TARGET_FILE_PATH);
}

module.exports = {
    checkFile
};
