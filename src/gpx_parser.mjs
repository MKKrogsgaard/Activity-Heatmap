import GPX from 'gpx-parser-builder';
import fs from 'fs';

/**
 * Reads a GPX file and parses it to
 * @param {string} filepath Path to the GPX file
 * @returns {Promise<object>} Promise that resolves to the (raw) parsed GPX file
 */
function parseGpxFile(filepath) {
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
 * @param {object} data A (raw) parsed GPX file produced by parseGpxFile()
 * @returns {Array{lat:number, long:number, timestamp?:string, altitude?: number}} Array containing the GPS points 
 */
function getGpxPoints(data) {
    /* 
    The gps points we are interested in are located in 
    [tracks] -> {track} -> [segments] -> {segment} -> [waypoints] -> {waypoint}

    The structure of the parsed data is confusing AF 
    TODO: Include some kind of illustration of the structure in the repo?
    */

    const points = [];
    // If location data is present, append it
    let tracks = [];
    if (data.trk) {
        tracks = data.trk;
    } else {
        // If something went wrong with the location data, return a single point at 0 latitude and longtitude, so we don't return nothing
        // Should probably fix this later
        points.push({
                lat: 0,
                long: 0,
                altitude: 0
                });
        return points;
    }
    
    
    for (const track of tracks) {
        const segments = track.trkseg;
        for (const segment of segments) {
            // Add the points if they are present in the current segment
            const waypoints = segment.trkpt;
            for (const waypoint of waypoints) {
                if (typeof waypoint.$.lat !== 'undefined' && typeof waypoint.$.lon !== 'undefined') { // Make sure the current record actually contains position data
                    points.push({
                        lat: Number(waypoint.$.lat),
                        long: Number(waypoint.$.lon),
                        altitude: Number(waypoint.ele) || null
                    });
                } else {
                    console.warn("A GPX waypoint had undefined position values!");
                }
            }
        }
    }

    return points;
}

export {
    parseGpxFile,
    getGpxPoints
}


