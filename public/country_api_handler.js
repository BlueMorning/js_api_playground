var CountriesAPI = function () {
  this.countries = [];
  this.onUpdate = null;
};

CountriesAPI.prototype = {

  fetchData: function () {
    var url = 'https://restcountries.eu/rest/v2';
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

CountriesAPI.prototype.getRandomCountry = function() {

  //how to ensure that once a country has been chosen, it wont again?
  let randomIndex = Math.floor(Math.random() * this.countries.length);
  //const randomCountry = this.countries.splice(randomIndex, 1);
  //this.countries.push(randomCountry)
  return this.countries[randomIndex];
}
