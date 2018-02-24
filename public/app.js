let search_results = [];
let synonym_search;
let word_search;
let synonym_search_button;
let quiz_area;

const initialiseElements = function(){
  //word_search = document.querySelector('#word-search')
  //synonym_search = document.querySelector('#input-search-by-synonym');
  //synonym_search_button = document.querySelector('#search-synonym-btn');
  quiz_area = document.querySelector('#quiz');
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
  initialiseElements();
  // synonym_search_button.addEventListener('click', getSynonyms);
  //new PieChart();
  var coords = {lat:51.509865, lng: -0.118092};
  const mapDiv = document.querySelector('#map');
  const map = new MapWrapper(mapDiv, coords, 2);
  map.addClickEvent();
  const api_handler = new CountriesAPI();
  api_handler.fetchData();
  api_handler.onUpdate = function(countries){
    //console.log(countries);
    var flags = api_handler.getFlags();
    //console.log(flags);
    let randomCountry = api_handler.getRandomCountry();
    buildCountryQuiz(randomCountry);
  }
  //coords = ma
}
const buildCountryQuiz = function(country){
  let question = "What is the capital of?";
  const questionElement = document.createElement('h3');
  questionElement.innerHTML = `What is the capital of ${country.name}?`
  let userCapitalAnswer = document.createElement('input');
  let userAnswerButton = document.createElement('button');

  userAnswerButton.innerText = "Check!";
  userAnswerButton.addEventListener('click', function(){
    if (country.capital=== userCapitalAnswer.value) {
      console.log("correct");
    } else {
      console.log("wrong!");
    }
  });
  quiz_area.appendChild(questionElement);
  quiz_area.appendChild(userCapitalAnswer);
  quiz_area.appendChild(userAnswerButton);

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
