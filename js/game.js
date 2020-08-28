const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

// ================================================================

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// ================================================================

let questions = [
  {
    question: "What is the capital city of California?",
    choice1: "Los Angeles",
    choice2: "San Francisco",
    choice3: "Sacramento",
    choice4: "San Jose",
    answer: 3,
  },
  {
    question: "Who was the 2nd President of the United States?",
    choice1: "John Adams",
    choice2: "Thomas Jefferson",
    choice3: "Abraham Lincoln",
    choice4: "James Madison",
    answer: 1,
  },
  {
    question: "Alexander Graham Bell invented the _____.",
    choice1: "microwave",
    choice2: "x-ray machine",
    choice3: "light bulb",
    choice4: "telephone",
    answer: 4,
  },
  {
    question:
      "Who is the only US President to have never been elected to office?",
    choice1: "Richard Nixon",
    choice2: "Gerald Ford",
    choice3: "Lyndon B. Johnson",
    choice4: "John F. Kennedy",
    answer: 2,
  },
  {
    question: "Which US state was the first to allow women to vote?",
    choice1: "Arizona",
    choice2: "Texas",
    choice3: "Wyoming",
    choice4: "New York",
    answer: 3,
  },
  {
    question: "Which US state was the first to obtain statehood?",
    choice1: "Delaware",
    choice2: "Pennsylvania",
    choice3: "New York",
    choice4: "Massachusetts",
    answer: 1,
  },
  {
    question: "Which of these is NOT a member of the Ivy League?",
    choice1: "Dartmouth College",
    choice2: "University of Pennsylvania",
    choice3: "Stanford University",
    choice4: "Cornell University",
    answer: 3,
  },
  {
    question:
      "As of the 2016 election, how many people have served as President of the United States?",
    choice1: "45",
    choice2: "50",
    choice3: "40",
    choice4: "44",
    answer: 4,
  },
  {
    question: "Which of the following is NOT based in Seattle, WA?",
    choice1: "Starbucks Coffee",
    choice2: "Boeing",
    choice3: "Amazon",
    choice4: "Alaska Airlines",
    answer: 2,
  },
  {
    question:
      "The top-3 most commonly spoken languages in the US are: (1) English, (2) Spanish, and (3) Chinese. What is the 4th?",
    choice1: "Tagalog",
    choice2: "Arabic",
    choice3: "German",
    choice4: "Japanese",
    answer: 1,
  },
];

// ================================================================

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

// ================================================================

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign("/end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter} / ${MAX_QUESTIONS}`;
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

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

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

startGame();
