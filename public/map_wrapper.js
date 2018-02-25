const MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom,
    styles: [
          { elementType: 'labels', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'administrative.land_parcel',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [{ visibility: 'off' }],
          },
          { featureType: 'road', stylers: [{ visibility: 'off' }] },
        ],
  });
  this.countryMarker = null;
  this.userGuess = null;
}

MapWrapper.prototype.addClickEvent = function(){

  google.maps.event.addListener(this.googleMap, 'click', function(event){
    console.log('click');
    let coords = { lat: event.latLng.lat(), lng: event.latLng.lng() }

    this.userGuess = this.addMarker(coords);
    this.countryMarker.setMap(this.googleMap);
    this.googleMap.setCenter(this.countryMarker.position);
    this.googleMap.setZoom(12);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(this.userGuess.position, this.countryMarker.position);
    console.log(distance);
  }.bind(this));
}

MapWrapper.prototype.addMarker = function (coords) {
  const marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
  });
  this.googleMap.setCenter(marker.position);
  return marker;
}

MapWrapper.prototype.setCountryMarker = function(coords) {
  this.countryMarker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      icon: {
        url: 'https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w300',
        scaledSize : new google.maps.Size(50,50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(25,50)
      }
    });

  this.countryMarker.setMap(null);
}
