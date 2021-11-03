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

<<<<<<< HEAD
            gMap.addListener('click', (mapsMouseEvent) => {
                let clickedPos = mapsMouseEvent.latLng.toJSON()
                console.log(clickedPos);

                // let infoWindow = new google.maps.InfoWindow({
                //     content: `<input type="text" name="save-name" placeholder="Name the place!">
                //     <button class="btn btn-save-name" onclick="onSaveLocation(clickedPos)">Save Location</button>`,
                //     position: gMap.center,
                // });
                // infoWindow.open(gMap);


            })
        })
=======
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
            console.log(clickedPos);
        });
    });
>>>>>>> ed4aaa7b6eb29a8a8a5f047a4ee3a91bbe92fa41
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
<<<<<<< HEAD
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDLnvwHZ3qiqSKnFkDrUd-6oYw-2f2m9vE'
=======
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyBVD3I9gj3fOYt_lJ0Npeb2lspNLlD9elE';
>>>>>>> ed4aaa7b6eb29a8a8a5f047a4ee3a91bbe92fa41
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
        .then((res) => (res.data.results[0].geometry.location))
        .then((res) => panTo(res.lat, res.lng))
}
