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
  const ul = document.createElement('ul');
  words.forEach(function(word){
    //console.log(word);
    const li = document.createElement('li');
    li.innerText = word.word;
    ul.appendChild(li);
  });
  return ul;
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
  synonym_search_button.addEventListener('click', getSynonyms);
  //new PieChart();
}

const buildPieChart = function(words) {
  synonymData = []
  for(i = 0; i < words.length; i++) {
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
