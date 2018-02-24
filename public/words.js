const WordList = function(url){
  this.url = "http://api.musixmatch.com/ws/1.1/";
  this.words = [];
  this.onUpdate = null;
  this.parameters;
}

// WordList.prototype.buildUrl = function(parameters){
//
// }

WordList.prototype = {

  buildUrl: function(parameters){
    this.url = this.url + 'https://api.musixmatch.com/ws/1.1/album.tracks.get?format=jsonp&callback=callback&album_id=2&page=1&page_size=100&apikey=' + API_KEY;
  },

  getData: function(){
    const request = new XMLHttpRequest();

    request.open('GET', this.url);

    request.setRequestHeader(
  "content-type", "text/plain; charset=utf-8"
);
    //request.setRequestHeader("apiKey", API_KEY);
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
        const jsonString = request.responseText;
        const words = JSON.parse(jsonString);
        //console.log(words);
        this.words = words;
        this.onUpdate(words);
    }.bind(this));

    request.send();
  }

}
