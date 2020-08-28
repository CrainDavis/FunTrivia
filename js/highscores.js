const highScoresList = document.getElementById("highScoresList");

// ================================================================

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// ================================================================

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score"><span class="high-score-item">${score.date}</span> | <span class="high-score-item">${score.name}</span> | <span class="high-score-item">${score.score}</span></li>`;
  })
  .join("");
