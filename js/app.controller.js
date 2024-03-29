import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';

window.onload = onInit;
window.onSearch = onSearch;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onMapClicked = onMapClicked;
window.onSaveLocation = onSaveLocation;


function onInit() {
    onGetLocs()
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready');

        })
        .catch(() => console.log('Error: cannot init map'));
}

function onSearch(ev) {
    if (ev) ev.preventDefault();
    const elInputSearch = document.querySelector('input[name=search]');
    mapService.getLocation(elInputSearch.value)


}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        console.log('Locations:', locs);
        var strHtml = locs.map(location => {
            return `<p>Name: ${location.name}</p>
            <button onclick="onPanTo('${location.lat},${location.lng}')">Go</button>
            <button onclick="onDeleteLoc('${location.name}')">Delete</button>            
            `
        })
        document.querySelector('.locs').innerHTML = strHtml.join('');
    });
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords);
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
        })
        .catch((err) => {
            console.log('err!!!', err);
        });
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onMapClicked(ev) {
    console.log(ev);
}

function onSaveLocation() {
    // ev.preventDefault();
    // console.log(ev)
    const elInputName = document.querySelector('input[name=save-name]').value;
    console.log(elInputName)

}
