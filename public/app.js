let mapSection;
let quizSection;
let context;
let canvas;
let colourSelector;
let quizButton;
let map;
let questionContainer;
let resultsContainer;
let playAgain;


const initialiseElements = function(){
  quizSection = document.querySelector('#quiz');
  canvas = document.querySelector('#main-canvas');
  context = canvas.getContext('2d');
  mapSection = document.querySelector('#map');
  colourSelector = document.querySelector('#colour-selector');
  quizButton = document.querySelector('.start-btn');
  questionContainer = document.querySelector('.question-container');
  questionContainer.style.visibility = 'hidden';
  resultsContainer = document.querySelector('.results-container');
  playAgainButton = document.querySelector('.play-again');
}

const app = function(){
  initialiseElements();
  quizButton.addEventListener('click', fetchCountries);
  playAgainButton.addEventListener('click', fetchCountries);
}

const fetchCountries = function() {
  const api_handler = new CountriesAPI();
  api_handler.fetchData();
  api_handler.onUpdate = function(countries){
    let randomCountry = api_handler.getRandomCountry();
    quizButton.style.visibility = "hidden";
    questionContainer.style.visibility = 'visible';
    resultsContainer.style.visibility = 'hidden';
    buildCountryQuiz(randomCountry);
  }
}
const displayResults = function(win, country){
  const h2 = document.createElement('h2');
  const h1 = document.createElement('hi');
  h1.innerText = `Welcome to ${country.name}`;
  resultsContainer.appendChild(h1);
  const result = document.querySelector('.result-text');
  result.innerText = `You were ${win ? 'correct' : 'incorrect'}. The capital of ${country.name} is ${country.capital}. ${country.population} people live there.`;

  const map = new MapWrapper(mapSection, {lat: country.latlng[0], lng: country.latlng[1]}, 2);
  map.addMarker({lat: country.latlng[0], lng: country.latlng[1]});
  const img = document.createElement('img')
  img.src = country.flag;
  resultsContainer.appendChild(img);
  fetchGiphy(country);
  const flagCanvas = new Canvas();
  colourSelector.addEventListener('input', function () {
        const colourSelected = this.value;
        flagCanvas.changeColour(colourSelected);
    });
  canvas.addEventListener('mousemove', function(event){
    flagCanvas.draw(event);
  });

}
const displayGIF = function(gif) {
  console.log(gif);
    const gifImg = document.createElement("img");
    gifImg.src = gif[0].images.fixed_height.url;

    console.log(gifImg);
    console.log(resultsContainer);
    resultsContainer.appendChild(gifImg);

  }

const fetchGiphy = function(country) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${country.name}`;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener('load', function() {

      if (request.status === 200) {
        const jsonString = request.responseText;
        const gifObject = JSON.parse(jsonString);
        const gif = gifObject.data;
        console.log('hel');
        displayGIF(gif);
      }
    });
    request.send();
}

const checkGuess = function(country, guess) {
  questionContainer.style.visibility = 'hidden';
  resultsContainer.style.visibility = 'visible';
  if (guess == country.capital){
    displayResults(win=true, country)
  } else {
    displayResults(win=false, country)
  }

    //   let h3 = document.createElement('h3');
    // if (country.capital=== userCapitalAnswer.value) {
    //   h3.innerText = `Yup, ${country.capital} is the capital of ${country.name}`;
    //   quizSection.appendChild(h3);
    // } else {
    //   h3.innerText = `Wrong! ${country.capital} is the capital of ${country.name}`;
    //   quizSection.appendChild(h3);
    // })

}




const buildCountryQuiz = function(country) {
  let capitalQuestion = document.querySelector('#country-capital');
  capitalQuestion.innerText = country.name;
  const userGuessButton = document.querySelector('#capital-guess-button');
  const userGuess = document.querySelector('#capital-guess');
  userGuessButton.addEventListener('click', function(){
    const guess = userGuess.value;
    checkGuess(country, guess);
  });
  // const coords = {lat:51.509865, lng: -0.118092};
  // let h2 = document.createElement('h2');
  // h2.innerText = `Where is ${country.name}?`;
  // quizSection.appendChild(h2);
  // const map = new MapWrapper(mapSection, coords, 2);
  // map.addClickEvent();
  // map.setCountryMarker({lat: country.latlng[0], lng: country.latlng[1]});
  // const questionElement = document.createElement('h3');
  // let userCapitalAnswer = document.createElement('input');
  // let userAnswerButton = document.createElement('button');
  //
  // questionElement.innerHTML = `What is the capital of ${country.name}?`
  // userAnswerButton.innerText = "Check!";
  // userAnswerButton.addEventListener('click', function(){
  //   const img = document.createElement('img');
  //   img.src = country.flag;
  //   quizSection.appendChild(img);

  //
  // });
  //
  // quizSection.appendChild(questionElement);
  // quizSection.appendChild(userCapitalAnswer);
  // quizSection.appendChild(userAnswerButton);
}
  //

  // const api_handler = new CountriesAPI();
  // api_handler.fetchData();
  // api_handler.onUpdate = function(countries){
  //   let randomCountry = api_handler.getRandomCountry();
  //   console.log(randomCountry);
  //   buildCountryQuiz(randomCountry);
  // }

  //canvas = document.getElementById('imageView')







document.addEventListener('DOMContentLoaded', app);
