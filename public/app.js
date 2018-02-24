let search_results = [];
let synonym_search;
let word_search;
let synonym_search_button;

const initialiseElements = function(){
  word_search = document.querySelector('#word-search')
  synonym_search = document.querySelector('#input-search-by-synonym');
  synonym_search_button = document.querySelector('#search-synonym-btn');
}

const addWordList = function(words){
  const select = document.createElement('select');
  words.forEach(function(word){
    const option = document.createElement('option');
    option.innerText = word.word;
    select.appendChild(option);
  });
  return select;
}

const getSynonyms = function(){
    const user_parameters = synonym_search.value;
    const words = new WordList();
    words.buildUrl({'ml': user_parameters})
    words.getData();
    words.onUpdate = function(words){

      console.log(words);
      const display = document.querySelector('#word-search');
      display.innerText = '';
      display.appendChild(addWordList(words));
      buildPieChart(words);
    }

}

const app = function(){
  // initialiseElements();
  // synonym_search_button.addEventListener('click', getSynonyms);
  //new PieChart();
  var coords = {lat:51.509865, lng: -0.118092};
  const mapDiv = document.querySelector('#map');
  const map = new MapWrapper(mapDiv, coords, 2);
  map.addClickEvent();
  const api_handler = new CountriesAPI();
  api_handler.fetchData();
  api_handler.onUpdate = function(countries){
    console.log(countries);
  }
  //coords = ma
}

const buildPieChart = function(words) {
  synonymData = []
  const pieWordCount = Math.min(words.length, 10);
  for(i = 0; i < pieWordCount; i++) {
    console.log(words[i]);
    synonymData.push({
      name: words[i].word,
      y: words[i].score
    });
  }
  var container = document.getElementById("pieChart");
  //console.log(synonymData);
  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: {
          text: "Synonym"
       },
    series: [
      {
          data: synonymData
      }
    ]
  });

};


document.addEventListener('DOMContentLoaded', app);
