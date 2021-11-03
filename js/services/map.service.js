import { locService } from './loc.service.js';

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocation,
    gMap,
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi().then(() => {
        console.log('google available');
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        });
        console.log('Map!', gMap);

        gMap.addListener('click', (mapsMouseEvent) => {
            let clickedPos = mapsMouseEvent.latLng.toJSON()
            let spotName = prompt('What is the name of the location you want to save?');
            console.log(clickedPos)
            panTo(clickedPos.lat, clickedPos.lng)
            addMarker(clickedPos, spotName)
            locService.saveLocation(clickedPos, spotName);

            // let infoWindow = new google.maps.InfoWindow({
            //     content: `<input type="text" name="save-name" placeholder="Name the place!">
            //     <button class="btn btn-save-name" onclick="onSaveLocation(clickedPos)">Save Location</button>`,
            //     position: gMap.center,
            // });
            // infoWindow.open(gMap);
        })
    })
}

function addMarker(loc, spotName) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: spotName,
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDLnvwHZ3qiqSKnFkDrUd-6oYw-2f2m9vE'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
}

function getLocation(term) {
    const API_KEY = 'AIzaSyBVD3I9gj3fOYt_lJ0Npeb2lspNLlD9elE';
    return axios
        .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${API_KEY}`
        )
        .then((res) => {
            const loc = res.data.results[0].geometry.location
            panTo(loc.lat, loc.lng);
            addMarker(loc, term);
            locService.saveLocation(loc, term);

        })

}
