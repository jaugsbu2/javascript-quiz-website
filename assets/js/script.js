var buttonStart = document.querySelector(".button-start");
var secondsLeft = 75
var timeEl = document.getElementById('countdown');
var h1El = document.getElementById("h1");
var h2El = document.getElementById("h2");
var h3El = document.getElementById("h3");
var answerEl = document.getElementById("answers");
var correctText;
var answerText;
var questionCount = 0;
var answerBtns;
var stopCounter = false;
var secondsToadd;
var initBox;
var yourScore;
var saveBtn;
var pEl;
var timerInterval;
var initials;
// var h4Score;
var h2Score
var clearBtn;
var scoreLog = [];

questionAll = {
  'What are JavaScript data types?': ['Boolean', 'String', 'Number', 'All of the above', 3],
  'What is a global variable?': ['A variable that can be seen around the globe.', 'A variable found within a function.', 'A variable that is available throughout the length of the code.', 'A variable that is found in the HTML.', 2],
  'What symbol is used to comment a single line in JavaScript?': ['*', '%', '=/', '//', 3],
  'What are the looping structures in JavaScript?': ['For', 'While', 'Do-while', 'All of the above', 3],
  'What does Null mean in JavaScript?': ['No Lull', 'Negative','No value', 'The time',2]
};

init();
function displayOpen() {
  if (localStorage.getItem("scores") != null) {
    scoreLog = JSON.parse(localStorage.getItem("scores"));
    sortScores();
  }
  console.log(scoreLog)
  h1El.textContent = "Coding Quiz";
  h2El.textContent = "Answer the following code related questions before the time runs out. The highest score wins!";
  buttonStart = document.createElement("button");
  buttonStart.className = 'button-start';
  buttonStart.innerHTML = "Start Quiz";
  answerEl.appendChild(buttonStart);
  startGame();
};



function startGame() {
  buttonStart.addEventListener("click", function () {
    h1El.textContent = "";
    buttonStart.remove();
    secondsLeftstart = secondsLeft;
    displayQuestion();
    countDown()
  });
}



function countDown() {

  if (answerText === correctText) {
    secondsLeft = secondsLeftend + secondsToadd;
  }

  timerInterval = setInterval(function () {
    secondsLeft--;

    if (secondsLeft >= 0 && stopCounter == false) {

    }
    else {
      clearInterval(timerInterval);
      return
    }

  }, 1000);
  return
}



function displayQuestion() {
  var question = Object.keys(questionAll)[questionCount]
  var answers = questionAll[Object.keys(questionAll)[questionCount]];
  var correctArrval = answers[4];
  stopCounter = false;
  // countDown();
  timeEl.textContent = "Time: " + secondsLeft
  secondsLeftstart = secondsLeft
  // console.log(secondsLeftstart)
  String(question);
  h2El.textContent = question;

  correctText = answers[correctArrval];

  if (questionCount === 0) {
    for (var i = 0; i < answers.length - 1; i++) {
      answerBtn = document.createElement("button");
      answerBtn.className = 'button';
      answerBtn.setAttribute('id', 'button' + i)
      answerBtn.setAttribute('data-num', [i])
      answerBtn.innerHTML = answers[i];
      answerEl.appendChild(answerBtn);
    }
    selectAnswer();
  }

  else {

    for (var j = 0; j < answers.length - 1; j++) {
      btnchange = document.getElementById('button' + [j])
      btnchange.innerHTML = answers[j];
    }
  };

};


function selectAnswer() {
  answerBtns = document.querySelectorAll(".button");
  answerBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      var answer = event.target;
      answerText = answer.innerHTML;
      checkAnswer();
    });
  });
}



function checkAnswer() {
  if (questionCount < Object.keys(questionAll).length - 1 && secondsLeft > 0) {
    questionCount++;
    secondsLeftend = secondsLeft;
    if (answerText === correctText) {
      secondsToadd = secondsLeftstart - secondsLeftend
      secondsLeft = secondsToadd + secondsLeftend
      correctMessage();
      displayQuestion();
    }
    else if (answerText != correctText) {
      wrongMessage()
      displayQuestion();
    }
  }
  else {
    if (answerText === correctText) {

      secondsToadd = secondsLeftstart - secondsLeftend
      secondsLeft = secondsToadd + secondsLeftend
      correctMessage();
      timeEl.textContent = "Time: " + secondsLeft;
    }
    else {
      wrongMessage();
      timeEl.textContent = "Time: " + secondsLeft;
    }
    stopCounter = true
    scoreInput();
  }
}

function wrongMessage() {
  h3El.textContent = "You are Wrong"
}

function correctMessage() {
  h3El.textContent = "You are Correct!"
}

function scoreInput() {
  // console.log(answerBtns)
  for (i = 0; i < answerBtns.length; i++) {
    answerBtns[i].remove();
  }
  h3El.textContent = "";
  var secondsLefttext = secondsLeft - 1
  console.log(secondsLefttext)
  h2El.textContent = "Your score is: " + secondsLefttext;
  pEl = document.createElement("p");
  pEl.textContent = "Input your initials and press Save to save your score and play again."
  answerEl.appendChild(pEl);
  initBox = document.createElement("INPUT");
  initBox.setAttribute("type", "text");
  answerEl.appendChild(initBox);
  saveBtn = document.createElement("button");
  saveBtn.className = 'button';
  saveBtn.innerHTML = "Save";
  answerEl.appendChild(saveBtn);
  clearBtn = document.createElement("button");
  clearBtn.className = 'button';
  clearBtn.innerHTML = "Clear Scores";
  answerEl.appendChild(clearBtn);
  console.log(scoreLog)
  renderScores();
  clearScores();
  saveScore();
};


function saveScore() {

  saveBtn.addEventListener("click", writeScore);

  function writeScore(event) {
    event.preventDefault();
    // var scoreLog = [];
    initials = initBox.value;
    var scoreObj = {
      id: initials,
      score: secondsLeft
    };

    if (initials != "") {

      scoreLog.push(scoreObj);
      localStorage.setItem("scores", JSON.stringify(scoreLog));
      reset();
    }

    else {
      alert("Input your initials to save.")
    };


  };


};

function sortScores() {
  if (scoreLog.length != null)
    scoreLog.sort((a, b) => b.score - a.score);
}

function renderScores() {

  h2Score = document.createElement("h2");
  h2Score.innerHTML = "High Scores"
  answerEl.appendChild(h2Score);
  if (scoreLog.length < 9) {

    for (var i = 0; i < scoreLog.length; i++) {
      var h4Score = document.createElement("h4");
      h4Score.innerHTML = Object.values(scoreLog[i]);
      answerEl.appendChild(h4Score);
      h4Score.id = "score" + [i]
    }
  }
  else {

    for (var i = 0; i < 9; i++) {
      var h4Score = document.createElement("h4");
      h4Score.innerHTML = Object.values(scoreLog[i]);
      answerEl.appendChild(h4Score);
      h4Score.id = "score" + [i]
    }
  };

};

function clearScores() {
  clearBtn.addEventListener("click", clearfunction);
}

function clearfunction() {
  if (scoreLog.length - 1 < 9) {
    for (var i = 0; i < scoreLog.length; i++) {
      var h4score = document.getElementById(String("score" + [i]));
      console.log(h4score)
      h4score.remove();
    }
  }
  else {

    for (var i = 0; i < 9; i++) {
      var h4score = document.getElementById(String("score" + [i]));
      h4score.remove();
    }
}
scoreLog = [];
localStorage.clear('scores');
}

function init() {
  displayOpen();
}


function reset() {
  h2Score.remove();
  if (scoreLog.length - 1 < 9) {
    for (var i = 0; i < scoreLog.length - 1; i++) {
      var h4score = document.getElementById(String("score" + [i]));
      h4score.remove();
    }
  }
  else {

    for (var i = 0; i < 9; i++) {
      var h4score = document.getElementById(String("score" + [i]));
      h4score.remove();
    }
  };

  pEl.remove();
  saveBtn.remove();
  clearBtn.remove();
  initBox.remove();
  clearInterval(timerInterval);
  secondsLeft = 75;
  questionCount = 0;
  displayOpen();
};