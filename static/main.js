// fetch https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

const punktiRounda = 1000;
const nonemasPunktiRoundam = 100;

var vards;

var rounds = 0;
var punkti = 0;

let punktiH3 = document.querySelector('#punkti');
let roundiH3 = document.querySelector('#roundi');

var count = 30;

let beigtSpeli = () => {
  let modal = document.getElementById("beigtModal");
  let span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

var counter = setInterval(() => {
  document.getElementById("laiks").innerHTML = count + " secs";
  count = count - 1;
  if (count < 0) {
    beigtSpeli();
    clearInterval(counter);
    return;
  }
}, 1000);

let initButtons = () => {
  vards.then((vards) => {
    let characterArea = document.querySelector('#characters');
    let guessArea = document.querySelector('#guesses');

    characterArea.innerHTML = "";
    guessArea.innerHTML = "";

    let characters = vards.split('');
    characters.forEach((character) => {
      let characterButton = document.createElement('button');
      characterButton.classList.add('characterButton');
      characterButton.innerHTML = character;
      characterButton.addEventListener('click', () => {
        newGuess(characterButton)
      });
      characterArea.prepend(characterButton);

      let guess = document.createElement('div');
      guess.classList.add('guess');
      guessArea.appendChild(guess);
    })

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('characterButton');
    deleteButton.innerHTML = "⌫";
    deleteButton.addEventListener('click', () => {
      deleteChar()
    });
    characterArea.appendChild(deleteButton);

    let guessButton = document.createElement('button');
    guessButton.classList.add('characterButton');
    guessButton.innerHTML = "⏎";

    guessButton.addEventListener('click', () => {
      guessWord()
    });
    guessArea.appendChild(guessButton);
  })
}

let jaunsRounds = async () => {
  let vards = await dabutVardu()

  rounds++;

  initButtons();
  updateText()

  return vards;
}

let updateText = () => {
  roundiH3.innerHTML = "Rounds: " + rounds;
  punktiH3.innerHTML = "Punkti: " + punkti;
}

let newGuess = (guessChar) => {
  let guesses = document.querySelectorAll('.guess');

  for (let i = 0; i < guesses.length; i++) {
    if (guesses[i].innerText === "") {
      guesses[i].innerText = guessChar.innerText;

      guessChar.disabled = true;
      return;
    }
  }
}

let deleteChar = () => {
  let guesses = document.querySelectorAll('.guess');

  for (let i = guesses.length - 1; i >= 0; i--) {
    if (guesses[i].innerText !== "") {
      let characterButtons = document.querySelectorAll('.characterButton');
      for (let j = 0; j < characterButtons.length; j++) {
        if (characterButtons[j].innerText === guesses[i].innerText && characterButtons[j].disabled === true) {
          characterButtons[j].disabled = false;
          guesses[i].innerText = "";
          return;
        }
      }
    }
  }
}

let guessWord = () => {
  vards.then((vards) => {
    let guesses = document.querySelectorAll('.guess');
    let guessWord = "";
    let res = '';

    for (let i = 0; i < guesses.length; i++) {
      guessWord += guesses[i].innerText;
    }

    if (guessWord === vards) {
      res = "pareizi"
      punkti += punktiRounda;
      jaunsRounds();
    } else {
      res = "nepareizi"
    };
    document.getElementById("demo").innerHTML = res;
  }).catch(() => {
    document.getElementById("demo").innerHTML = 'vaards vel nav atrasts';
  })
}


let dabutVardu = async () => {
  vards = fetch('https://random-word-api.herokuapp.com/word')
    .then((response) => response.json(response))
    .then((data) => data[0])
    .then((word) => {
      console.log(word);
      return word
    })
    .then((word) => {
      document.querySelector('.word').innerHTML = shuffleWord(word);
      return word
    }).then((vards) => {
      return vards
    })
}

const shuffleWord = (word) => {
  var shuffledWord = '';
  word = word.split('');
  while (word.length > 0) {
    shuffledWord += word.splice(word.length * Math.random() << 0, 1);
  }
  return shuffledWord;
}

jaunsRounds();
initButtons();

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