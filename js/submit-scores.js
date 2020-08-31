const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

// ================================================================

const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 10;

finalScore.innerText = mostRecentScore;

// ================================================================

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (event) => {
  event.preventDefault();

  let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

  const score = {
    score: mostRecentScore,
    name: username.value,
    date: currentDate,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10);
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.replace("https://craindavis.github.io/FunTrivia/view-highscores.html");
};
