const MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    mapTypeId: 'terrain'
  })
  this.markers = [];
}

MapWrapper.prototype.addInfoWindow = function (coords, contentString) {
  const window = new google.maps.InfoWindow({
    position: coords,
    map: this.googleMap,
    content: contentString,
  })
};

MapWrapper.prototype.addMarker = function (coords) {
  marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
  });
  this.markers.push(marker);
}

MapWrapper.prototype.addClickEvent = function () {
  google.maps.event.addListener(this.googleMap, 'click', function(event){
    // console.log(event);
    // console.log(event.latLng.lat());

    let coords = {lat:event.latLng.lat(), lng:event.latLng.lng()};
    this.addMarker(coords);
  }.bind(this))
};
