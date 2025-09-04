// 🔷 기본 설정
const arrows = ['←', '↑', '↓', '→'];
const game = document.getElementById("game");
const hitZone = document.getElementById("hit-zone");
const scoreDisplay = document.getElementById("score");
// const stageDisplay = document.getElementById("stage");
const judgmentDiv = document.getElementById("judgment");
const timeDisplay = document.getElementById("time");
// const comboDisplay = document.getElementById("combo");

let score = 0; // 기본 점수
let stage = 1;
let combo = 0;
let isRunning = false;
let gameOver = false;

let arrowIntervalId = null;

function startArrowDropping() {
  if (arrowIntervalId === null) {
    arrowIntervalId = setInterval(() => {
      if (isRunning && !gameOver) {
        createArrow();
      }
    }, dropInterval);
  }
}

function stopArrowDropping() {
  if (arrowIntervalId !== null) {
    clearInterval(arrowIntervalId);
    arrowIntervalId = null;
  }
}
const baseSpeed = window.innerWidth <= 768 ? 1 : 2; // 768px 이하일 때 모바일로 간주

let currentSpeed = baseSpeed;

let dropInterval = 1000; // ms
const hitY = game.offsetHeight - 80 - 25;
const activeArrows = [];

// ** 플레이 시간 관련 변수 추가 **
let startTime = null;          // 게임 시작 시간
let pauseStartTime = null;     // 일시정지 시작 시간
let elapsedPausedTime = 0;     // 누적 일시정지 시간

// 🔷 유틸: 시간 포맷
function formatTime(ms) {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return (
    String(minutes).padStart(2, "0") +
    "분 " +
    seconds.toFixed(2).padStart(5, "0") +
    "초"
  );
}

// 🔷 시간 갱신 루프
function updateTime() {
  if (!isRunning) {
    requestAnimationFrame(updateTime);
    return; // 시간 갱신 멈춤
  }

  const now = Date.now();
  // 일시정지 시간 제외한 경과시간 계산
  const elapsed = now - startTime - elapsedPausedTime;

  timeDisplay.innerText = "Time: " + formatTime(elapsed);
  requestAnimationFrame(updateTime);
}

// 🔷 판정 표시
function showJudgment(text, color = 'yellow',Scor) {
  const scoreText = Scor > 0 ? `+ ${Scor}` : Scor.toString();

  judgmentDiv.innerHTML = `
    <div>${text}</div>
    <div>Combo ${combo}</div>
    <div>${scoreText}</div>
  `;
  judgmentDiv.style.color = color;
  judgmentDiv.classList.remove("show-judgment");
  void judgmentDiv.offsetWidth;
  judgmentDiv.classList.add("show-judgment");
}


// 🔷 화살표 생성
function createArrow() {
  const dir = arrows[Math.floor(Math.random() * arrows.length)];
  const arrow = document.createElement("div");
  arrow.className = "arrow";
  arrow.innerText = dir;

  const xMap = {
    '←': 25,
    '↑': 100,
    '↓': 175,
    '→': 250,
  };
  
  const colorMap = {
    '←': "#ff8080",
    '↑': "#80ff80",
    '↓': "#8080ff",
    '→': "#c080c0",
  };
  const color = colorMap[dir];

  arrow.style.left = xMap[dir] - 15 + "px";
  arrow.style.top = "-50px";
  arrow.style.color = color; // 방향에 맞는 색상 적용
  arrow.style.border = `2px solid ${color}`;
  game.appendChild(arrow);

  activeArrows.push({ el: arrow, dir, y: -50 });
}

// 🔷 화살표 이동 & 벗어남 처리
function updateArrows() {
  for (let i = 0; i < activeArrows.length; i++) {
    const obj = activeArrows[i];
    obj.y += currentSpeed;
    obj.el.style.top = obj.y + "px";

    if (obj.y > game.offsetHeight) {
      game.removeChild(obj.el);
      activeArrows.splice(i, 1);
      i--;

      score = Math.max(-100, score - 50);
      combo = 0;
      showJudgment("Drop", "purple",-50);
      scoreDisplay.innerText = "Score: " + score;
      if (score <= -100) {
        score = 0;
        triggerGameOver();
      }
    }
  }
}

// 🔷 키 입력 처리
function handleInput(dir) {
  for (let i = 0; i < activeArrows.length; i++) {
    const obj = activeArrows[i];
    if (obj.dir === dir) {
      const distance = Math.abs(obj.y - hitY);
      let basePoint = 0;
      let judgment = "";
      let color = "yellow";

      if (distance === 0) {
        basePoint = 1000;
        judgment = "PERFECT";
        color = "#9400D3";
      } else if (distance < 2) {
        basePoint = 20;
        judgment = "EXCELLENT";
        color = "#FF8C00";
      } else if (distance < 10) {
        basePoint = 10;
        judgment = "GOOD";
        color = "#00ffcc";
      } else if (distance < 25) {
        basePoint = 5;
        judgment = "SoSo";
        color = "lightblue";
      } else if (distance < 40) {
        basePoint = 2;
        judgment = "BAD";
        color = "gray";
      } else {
        score = Math.max(-100, score - 10);
        combo = 0;
        judgment = "MISS";
        color = "red";
        showJudgment(judgment, color,-10);
        game.removeChild(obj.el);
        activeArrows.splice(i, 1);
        scoreDisplay.innerText = "Score: " + score;
        if (score <= -100) {
          score = 0;
          triggerGameOver();
        }
        return;
      }

      // GOOD 판정 이상일 때
      if (distance < 10) {
        combo++;
      } else {
        combo = 0;
      }
      const bonus = Math.floor(combo / 50);
      score += basePoint + bonus;

      showJudgment(judgment, color,basePoint + bonus);
      game.removeChild(obj.el);
      activeArrows.splice(i, 1);
      scoreDisplay.innerText = "Score: " + score;

      return;
    }
  }
}

// 🔷 키보드 입력
document.addEventListener("keydown", (e) => {
  const keyMap = {
    ArrowLeft: "←",
    ArrowUp: "↑",
    ArrowDown: "↓",
    ArrowRight: "→",
  };
  if (keyMap[e.key]) {
    handleInput(keyMap[e.key]);
  }
});

// 🔷 스테이지 타이머 (30초마다)
setInterval(() => {
  stage++;
  currentSpeed = baseSpeed * (1 + 0.2 * (stage - 1));
  dropInterval = dropInterval - 100;
  // stageDisplay.innerText = "Stage: " + stage;
}, 30000);

// 🔷 메인 루프 시작
updateTime();
function gameLoop() {
  if (isRunning && !gameOver) {
    updateArrows();
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();

document.getElementById("startBtn").addEventListener("click", () => startGame());
document.getElementById("pauseBtn").addEventListener("click", () => pauseGame());
document.getElementById("resumeBtn").addEventListener("click", () => resumeGame());

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // 스크롤 방지 등 기본 동작 방지

    const pauseBtn = document.getElementById("pauseBtn");
    const resumeBtn = document.getElementById("resumeBtn");

    // display가 'none'이 아닌 걸 기준으로 판단
    if (pauseBtn.style.display !== "none") {
      pauseGame();
    } else if (resumeBtn.style.display !== "none") {
      resumeGame();
    }
  }
});


function startGame() {
  isRunning = true;
  gameOver = false;
  score = 0;
  stage = 1;
  combo = 0;
  currentSpeed = baseSpeed;
  startTime = Date.now();
  pauseStartTime = null;
  elapsedPausedTime = 0;
  activeArrows.forEach(a => game.removeChild(a.el));
  activeArrows.length = 0;

  scoreDisplay.innerText = "Score: " + score;
  timeDisplay.innerText = "Time: 00분 00.00초";

  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline";
  document.getElementById("resumeBtn").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
  startArrowDropping();
}
function pauseGame() {
  isRunning = false;
  pauseStartTime = Date.now();
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resumeBtn").style.display = "inline";
  stopArrowDropping();
}

function resumeGame() {
  if (!gameOver) {
    isRunning = true;
    if (pauseStartTime !== null) {
      elapsedPausedTime += Date.now() - pauseStartTime;
      pauseStartTime = null;
    }
    document.getElementById("pauseBtn").style.display = "inline";
    document.getElementById("resumeBtn").style.display = "none";
    startArrowDropping();
  }
}
function triggerGameOver() {
  isRunning = false;
  gameOver = true;
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resumeBtn").style.display = "none";
  document.getElementById("gameOver").style.display = "block";
  stopArrowDropping();
}
document.getElementById("restartBtn").addEventListener("click", () => {
  startGame();
});

gameLoop();
