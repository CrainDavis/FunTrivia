const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");
const timeElement = document.getElementById("countdownTimer");
const loader = document.getElementById("loader");
const game = document.getElementById("playArea");

// ================================================================

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let timeLeft = 61;
let questionCounter = 0;
let availableQuestions = [];

// ================================================================

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&type=multiple&encode=base64")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    function formatText(text) {
      var fixedText = window.atob(text);
      return fixedText;
    }

    questions = loadedQuestions.results.map((ques) => {
      const formattedQuestion = {
        question: formatText(ques.question),
      };

      const answerChoices = [...ques.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        ques.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = formatText(choice);
      });

      return formattedQuestion;
    });

    startGame();
    setTime();
  })
  .catch((err) => {
    console.log(err);
  });

// ================================================================

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// ================================================================

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();

  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.pathname("/submit-scores.html");
  }

  questionCounter++;
  progressText.innerText = `QUESTION ${questionCounter} / ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    } else {
      timePenalty();
    }

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

setTime = () => {
  let timerInterval = setInterval(function () {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      return window.location.pathname("/game-over.html");
    }
  }, 1000);
};

function timePenalty() {
  timeLeft = timeLeft - 4;
}

// ================================================================
