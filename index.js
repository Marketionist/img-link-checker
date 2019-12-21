const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {

    checkFile: async (directoryPath, file) => {
        const readFile = promisify(fs.readFile);
        const filePath = process.env.TARGET_FILE_PATH || path.join(directoryPath, file);

        const text = await readFile(filePath, 'utf8');

        // Filter out only links that start from http(s) and end with ) or " or '
        // Using negative lookahead ?! to filter out localhost:
        const links = text.match(/https?:\/\/(?!.*(localhost:)).*?[\)|"|']/gi).map(
            // Clear links from last character ) or " or '
            (value) => value.slice(0, -1)
        );

        console.log(`Found ${links.length} links:`);
        console.log(links);

        const responses = await Promise.all(links.map(async (value) => {
            try {
                const response = await axios.get(value);

                return response.status;
            } catch (error) {
                console.error(`Found broken link (${error.response.status}): ${value}`);
            }
        }));

        const brokenLinks = [];

        responses.map((value, index) => {
            if (value !== 200) { brokenLinks.push(links[index]); }
        });

        if (brokenLinks.length > 0) {
            console.error('Broken links list:', brokenLinks);
            process.exit(1);
        } else {
            return links;
        }
    }

};
