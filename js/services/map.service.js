

export const mapService = {
    initMap,
    addMarker,
    panTo,
    gMap
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);

            gMap.addListener('click', (mapsMouseEvent) => {
                let clickedPos = mapsMouseEvent.latLng.toJSON();
                let infoWindow = new google.maps.InfoWindow({
                    content: `Name the spot<br>
                    <input type="text" name="loc-name" id="loc-name"><br>
                    <button type="submit" class="btn loc-save-btn" name="loc-name" onclick="onSaveName(this.value)">Save Location</button>`,
                    position: gMap.center,
                });
                infoWindow.open(gMap);
                // let posName = prompt('Name of loaction to be saved?');
                // console.log(posName)
                console.log(clickedPos)
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDNyrNr0MyFXTxYobEUYROPnvMr9rrvxCA'
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

