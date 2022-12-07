// fetch https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

const roundsMax = 5;
const punktiRoundam = 1000;
const nonemasPunktiRoundam = 100;

var rounds = 1;
var punkti = 0;
var punktiRounda = punktiRoundam;
  
// vaardu dabusana un logika

let vards = fetch('https://random-word-api.herokuapp.com/word')
  .then((response) => response.json(response))
  .then((data) => data[0])
  .then((word) => {
    console.log(word);
    return word
  })
  .then((word) => {
    document.querySelector('.word').innerHTML = shuffleWord(word);
    return word
  })

const shuffleWord = (word) => {
  var shuffledWord = '';
  word = word.split('');
  while (word.length > 0) {
    shuffledWord += word.splice(word.length * Math.random() << 0, 1);
  }
  return shuffledWord;
}

function inputText() {
  vards.then((vards) => {
    let res = '';
    if (vards === document.querySelector('#myText').value) {
      res = "pareizi"
    } else res = "nepareizi";
    document.getElementById("demo").innerHTML = res;
  }).catch(() => {
    document.getElementById("demo").innerHTML = 'vaards vel nav atrasts';
  })
}

// Modal logic for noteikumi //

var modal = document.getElementById("noteikumuModal");
var btn = document.getElementById("noteikumuButton");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}