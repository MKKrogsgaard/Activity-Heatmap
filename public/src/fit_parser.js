/*
DESCRIPTION: Converts a FIT file to JSON using the community fit-file-parser
*/

// Imports
const FitParser = require('fit-file-parser').default || require('fit-file-parser');
const fs = require('fs');

function semicirclesToDeg(sc) {
    /**
     * Converts from semicircle coordinatres (the format used by .fit files) to degrees
     */
    return sc * (180.0 / 2.0**(31));
}
/**
 * Reads a .fit file and parses it to JSON
 * @param {string} filepath - Path to the .fit file 
 * @returns {Promise<object>} - Promise that resolves to a JSON representation of the .fit file
 */
function parseFitFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, content) => {
            if (err){
                return reject(err);
            }
            // Initialize a fitparser. Most of these options are the default choices, but this is for clarity
            let fitParser = new FitParser({
                mode: 'cascade',
                lengthUnit: 'm',
                temperatureUnit: 'celsius',
                speedUnit: 'm/s',
                force: true,
                elapsedRecordField: true
            });

            // Parse the file
            fitParser.parse(content, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(data); // Return parsed data
                }
            });
        });
    });
}

module.exports = {
    parseFitFile
}



