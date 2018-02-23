const WordList = function(url){
  this.url = "https://api.datamuse.com/words?";
  this.words = [];
  this.onUpdate = null;
  this.parameters;
}

// WordList.prototype.buildUrl = function(parameters){
//
// }

WordList.prototype = {

  buildUrl: function(parameters){
    this.url = this.url + 'ml=' + parameters['ml'];
  },

  getData: function(){
    const request = new XMLHttpRequest();
    request.open('GET', this.url);

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
