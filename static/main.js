// fetch https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5

const countStart = 30;

var vards;

var rounds = 0;
var punkti = 0;

let punktiH3 = document.querySelector('#punkti');
let roundiH3 = document.querySelector('#roundi');

var count;

let beigtSpeli = () => {
  let modal = document.getElementById("beigtModal");
  let span = document.getElementsByClassName("closeBeigt")[0];

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

var counting = false;
let startCount = () => {
  var counter = setInterval(() => {
    document.getElementById("laiks").innerHTML = count + " secs";
    count = count - 1;
    if (count < 0) {
      beigtSpeli();
      clearInterval(counter);
      document.querySelector("#laiks").innerHTML = "Spēle beigusies";
      document.querySelector("#modalPunkti").innerHTML = "Punkti: " + punkti;
      document.querySelector("#modalRoundi").innerHTML = "Uzminēti vārdi: " + (rounds - 1);
      counting = false;
      document.querySelector("#startButton").style.opacity = "1";
      return;
    }
  }, 1000);
}

let restart = () => {
  if (counting) {
    return;
  }

  counting = true;
  document.querySelector("#startButton").style.opacity = "0.4";
  rounds = 0;
  punkti = 0;
  count = countStart;
  startCount();
  jaunsRounds();
  updateText();
  document.querySelector("#demo").innerHTML = "";

  let modal = document.getElementById("beigtModal");
  modal.style.display = "none";
}


let saglabatDatus = () => {
  let modalBeigt = document.getElementById("beigtModal");
  modalBeigt.style.display = "none";

  let modal = document.getElementById("saglabatModal");
  let span = document.getElementsByClassName("closeSaglabat")[0];
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

let sutitDatus = () => {
  let vards = document.querySelector("#vards").value;

  if (vards.length < 3) {
    alert("Vārds ir par īsu!");
    return;
  }

  let data = {
    vards: vards,
    punkti: punkti
  }

  fetch('/api/saglabat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })

  let modal = document.getElementById("saglabatModal");
  document.querySelector("#demo").innerHTML = "";
  modal.style.display = "none";
}

let initButtons = () => {
  vards.then((vards) => {
    let characterArea = document.querySelector('#characters');
    let guessArea = document.querySelector('#guesses');

    characterArea.innerHTML = "";
    guessArea.innerHTML = "";

    let characters = shuffleWord(vards).split('');
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
  roundiH3.innerHTML = "Uzminēti vārdi: " + (rounds - 1);
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
      punkti += vards.length * 10;
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

// Modal logic for noteikumi //

var modal1 = document.getElementById("noteikumuModal");
var btn1 = document.getElementById("noteikumuButton");
var span1 = document.getElementsByClassName("closeNoteikumu")[0];
btn1.onclick = function () {
  modal1.style.display = "block";
}
span1.onclick = function () {
  modal1.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
}


var modal2 = document.getElementById("veidotajuModal");
var btn2 = document.getElementById("veidotajuButton");
var span2 = document.getElementsByClassName("closeVeidotaji")[0];
btn2.onclick = function () {
  modal2.style.display = "block";
}
span2.onclick = function () {
  modal2.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}


var modal3 = document.getElementById("lideriModal");
var btn3 = document.getElementById("lideriButton");
var span3 = document.getElementsByClassName("closeLideri")[0];
btn3.onclick = function () {
  modal3.style.display = "block";
}
span3.onclick = function () {
  modal3.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}

let lideruSaraksts = async () => {
  let response = await fetch('api/saglabat');
  let data = await response.json();
  let lideri = data.slice(0, 10);
  let saraksts = document.getElementById('lideriTable');

  for (let i = 0; i < lideri.length; i++) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.innerText = i + 1;
    td2.innerText = lideri[i].vards;
    td3.innerText = lideri[i].punkti;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    saraksts.appendChild(tr);
  }
}

lideruSaraksts();