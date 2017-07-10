
var markers = []

function initMap(newPlace) {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat: -34.397, lng: 150.644},
    scrollwheel: true,
    zoom: 8
  });

  function callback(results,status){
    console.log(results[0])
    setMarker(results[0])
  }

  function setMarker(place){
    var newLocation = {
      lat: place.geometry.location.lat(),
      lng : place.geometry.location.lng(),
      icon: place.icon,
      name: place.formatted_address,
      pictures: []
    }

    var photos = place.photos
    var bounds = window.mapBounds

    if(photos !== undefined){
      photos.forEach(function(object) {
          newLocation.pictures.push(object.getUrl)
      }, this);
    }

    //  Information window
    var contentString = '<div class="imformation Window"><h2>Hola mundo<h2></di>'
    var informationWindow = new google.maps.InfoWindow({
      content: contentString
    })

    locationView.locations.push(newLocation)

    //  the markers

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    var marker = new google.maps.Marker({
      icon: image,
      map: map,
      position: place.geometry.location,
      title: newLocation.name,
      animation: google.maps.Animation.BOUNCE
    });

    marker.addListener('click',function(){
      informationWindow.open(map,marker);
    })

    markers.push(marker);

    bounds.extend(new google.maps.LatLng(newLocation.lat, newLocation.lng));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());

  }
  
  window.mapBounds = new google.maps.LatLngBounds();
  console.log(newPlace)
  var service = new google.maps.places.PlacesService(map);
  places.forEach(function(place) {
    service.textSearch({query: place},callback)
  }, this);
  
}

function stopMarkers(){
  markers.forEach(function(marker){
    marker.setAnimation(google.maps.Animation.DROP)
  })
}