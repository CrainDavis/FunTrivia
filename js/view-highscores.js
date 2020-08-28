const highScoresList = document.getElementById("highScoresList");
const noScores = document.getElementById("noScores");

// ================================================================

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// ================================================================

if (highScores.length < 1) {
  highScoresList.classList.add("hidden");
  noScores.classList.remove("hidden");
} else {
  highScoresList.classList.remove("hidden");
  noScores.classList.add("hidden");
  highScoresList.innerHTML = highScores
    .map((score) => {
      return `<li class="high-score"><span class="high-score-item">${score.date}</span> | <span class="high-score-item">${score.name}</span> | <span class="high-score-item">${score.score}%</span></li>`;
    })
    .join("");
}
