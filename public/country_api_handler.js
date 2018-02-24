var CountriesAPI = function () {
  this.countries = [];
  this.onUpdate = null;
};

CountriesAPI.prototype = {

  fetchData: function () {
    var url = 'https://restcountries.eu/rest/v1';
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener('load', function () {
      if (request.status === 200) {
        var jsonString = request.responseText;
        var countries = JSON.parse(jsonString);
        this.countries = countries;
        this.onUpdate(countries);
      }
    }.bind(this));
    request.send();
  }

}
