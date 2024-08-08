"use strict";

const fs = require('fs');
const path = require('path');
const zipcodes = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../zipcodes.de.json'), 'utf-8'));

const getCoordinatesByPLZ = (PLZ) => {
    // console.log("PLZ için konum aranıyor:", PLZ);
    const location = zipcodes.find(entry => entry.zipcode == PLZ);
    if (location) {
        // console.log("lokasyon bulundu:", { place: location.place });
        return { 
            latitude: parseFloat(location.latitude), 
            longitude: parseFloat(location.longitude),
            place: location.place 
        };
    }
    // console.log("PLZ için koordinat bulunamadı:", PLZ);
    return null;
};


module.exports = { getCoordinatesByPLZ };