# Heatmap generator

A simple heatmap maker for .fit files with location data (I might add .gpx support too, eventually). You drag and drop (or select) some files, and get an interactive heatmap!

I made this because I couldn't be arsed to pay for a Strava subscription, but I think the heatmap is cool :)

As of november 2025, a hosted version of this can be found at https://heatmap-generator-7eb6c3d3805a.herokuapp.com/

# Instructions

Make sure you have `node` and `npm` installed, as well as the following packages:

- path
- express
- fs
- multer

Then run `node server.js` in the root folder of the repo. You should now be able to access the heatmap generator on port `5000` via `http://localhost:5000/`.
