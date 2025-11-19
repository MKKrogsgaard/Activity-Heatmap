import GPX from 'gpx-parser-builder';
import fs from 'fs';

/**
 * Reads a GPX file and parses it to
 * @param {string} filepath Path to the GPX file
 * @returns {Promise<object>} Promise that resolves to the (raw) parsed GPX file
 */
function parseGpxFile(filepath) {
    console.log('Currently parsing GPX file: ' + filepath);
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, content) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            // Parse the file and return it
            try {
                let parsedGpx = GPX.parse(content.toString());
                return resolve(parsedGpx);
            } catch (err) {
                console.error(err);
                return reject(err);
            }
        });
    });
}

/**
 * 
 * @param {<object>} data A (raw) parsed GPX file produced by parseGpxFile()
 * @returns {<Array>{lat:number, long:number, timestamp?:string, altitude?: number}} Array containing the GPS points 
 */
function getGpxPoints(data) {
    const points = [];
    const tracks = data.trk;
    
    for (const track of data.trk) {
        const segments = track.trkseg;
        for (const segment of segments) {
            // Add the points if they are present in the current segment
            const trackpoint = segment.trkpt;
            if (trackpoint) {
                console.log(trackpoint);
                points.push({
                    lat: trackpoint['$'].lat,
                    long: trackpoint['$'].lon,
                    timestamp: trackpoint.time,
                    altitude: trackpoint.ele
                });
            }
        }
    }

    return points;
}

export {
    parseGpxFile,
    getGpxPoints
}


