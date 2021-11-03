import { storageService } from './storage.service.js';

export const locService = {
    getLocs,
    saveLocation
}


const locs = storageService.load('locationsDB') || []
// { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
// { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveLocation(pos, name) {
    var location = {
        name,
        lat: pos.lat,
        lng: pos.lng,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        weather: 'crappy'
    }
    locs.push(location)
    storageService.save('locationsDB', locs);
    // console.log(locs)
}

