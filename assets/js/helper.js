var template = '<div class="imformation Window"><h2>%title%<h2></di>'
var mykey = 'AIzaSyBxbo8jtHUlXtuOnG1wT-YbWtISWVACm4g'
var root = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='

const placeholders = {
  title: '%title%'
}

const mainMap = {

  init(places) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      scrollwheel: true,
      controls: false,
      streetViewControl: false,
      zoom: 13,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }
    });
    this.panorama
    this.service = new google.maps.places.PlacesService(this.map);
    this.markers = []
    this.infoWindows = []
    window.mapBounds = new google.maps.LatLngBounds();
    this.count = 0

    places.forEach(function (place) {
      mainMap.searchPlace(place)
    }, this);
  },

  callback(results, status) {
    mainMap.setMarker(results[0])
  },

  setMarker(place) {
    var self = this
    console.log(place);
    var newLocation = {
      id: this.count++,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      icon: place.icon,
      name: place.name,
      realName: place.formatted_address,
      pictures: []
    }
    var photos = place.photos
    var bounds = window.mapBounds

    if (photos !== undefined) {
      photos.forEach(function (object) {
        newLocation.pictures.push(root + place.reference + '&key=' + mykey)
      }, this);
    }
    //  Information window
    var contentString = template.replace(placeholders.title, 'Hola Mundo')
    var informationWindow = new google.maps.InfoWindow({
      content: contentString
    })

    // this array is from the app.js
    locationView.locations.push(newLocation)

    //  the markers
    var image = './assets/img/map-marker.png'
    var marker = new google.maps.Marker({
      icon: image,
      map: self.map,
      position: place.geometry.location,
      title: newLocation.name,
      animation: google.maps.Animation.BOUNCE
    });

    marker.addListener('click', function () {
      informationWindow.open(self.map, marker);
    })

    self.markers.push(marker);

    bounds.extend(new google.maps.LatLng(newLocation.lat, newLocation.lng));
    // fit the map to the new marker
    self.map.fitBounds(bounds);
    // center the map
    mymap.setCenter(bounds.getCenter());

  },

  searchPlace(place) {
    this.service.textSearch({
      query: place
    }, this.callback)
  },

  stopMarkers() {
    this.markers.forEach(function (marker) {
      marker.setAnimation(google.maps.Animation.DROP)
    })
  },

  setCenter(coords,is_zoom){
    this.map.panTo(coords);
    if(is_zoom) this.map.setZoom(15);
  },

  setStreetView(position){
    if(!position) {
      position = { lat: collection.locations[0].lat, lng: collection.locations[0].lng}
    }
    this.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'),{
        position: position,
        POV: {
          heading: 34,
          pitch: 10
        }
      }
    )

    this.map.setStreetView(this.panorama)
  }

}