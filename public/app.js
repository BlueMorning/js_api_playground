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
    console.log(word);
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
      const display = document.querySelector('#word-search');
      display.innerText = '';
      display.appendChild(addWordList(words));
    }

}

const app = function(){
  initialiseElements();
  //console.log(synonym_search)
  synonym_search_button.addEventListener('click', getSynonyms);
  //console.log(fetch_data('hello'));

}


document.addEventListener('DOMContentLoaded', app);
