
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const retryBtn = document.getElementById("retry");
const portalToggle = document.getElementById("portalToggle");

const gridSize = 20;
const tileCount = canvas.width / gridSize;
const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");
const snakeColorPicker = document.getElementById("snakeColorPicker");
const foodColorPicker = document.getElementById("foodColorPicker");
let gameSpeed = parseInt(speedRange.value); // 초기 속도 (ms)


let snake, dx, dy, food, gameOver, gameLoop;
let score = 0; // 점수 변수 추가
speedRange.addEventListener("input", () => {
  gameSpeed = parseInt(speedRange.value);
  speedValue.textContent = gameSpeed;

  // 게임이 진행 중이면 속도 즉시 변경
  if (!gameOver && !animating) {
    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, gameSpeed);
  }
});
let snakeColor = snakeColorPicker.value;
let foodColor = foodColorPicker.value;
snakeColorPicker.addEventListener("input", () => {
  snakeColor = snakeColorPicker.value;
  draw(); // 즉시 색상 변경 반영 위해 다시 그림
});
foodColorPicker.addEventListener("input", () => {
  foodColor = foodColorPicker.value;
  draw();
});

let touchStartX = null;
let touchStartY = null;
const swipeThreshold = 30; // 드래그 최소 거리 (픽셀)

canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

canvas.addEventListener("touchmove", e => {
  if (!touchStartX || !touchStartY) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // 좌우 스와이프
    if (deltaX > swipeThreshold && dx !== -1) {
      dx = 1;
      dy = 0;
      resetTouch();
    } else if (deltaX < -swipeThreshold && dx !== 1) {
      dx = -1;
      dy = 0;
      resetTouch();
    }
  } else {
    // 상하 스와이프
    if (deltaY > swipeThreshold && dy !== -1) {
      dx = 0;
      dy = 1;
      resetTouch();
    } else if (deltaY < -swipeThreshold && dy !== 1) {
      dx = 0;
      dy = -1;
      resetTouch();
    }
  }
});

canvas.addEventListener("touchend", resetTouch);
canvas.addEventListener("touchcancel", resetTouch);

function resetTouch() {
  touchStartX = null;
  touchStartY = null;
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft":
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case "ArrowRight":
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
    case "ArrowUp":
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case "ArrowDown":
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
  }
});

function randomPosition() {
  const margin = 2; // 벽으로부터 최소 거리 (칸 수)
  const max = tileCount - margin;
  const min = margin;

  return {
    x: Math.floor(Math.random() * (max - min)) + min,
    y: Math.floor(Math.random() * (max - min)) + min
  };
}

function updateGame() {
  if (gameOver) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // 충돌 체크
  // 벽 충돌 체크 또는 포탈 이동
  if (portalToggle.checked) {
    // 포탈: 반대편으로 이동
    if (head.x < 0) head.x = tileCount - 1;
    else if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    else if (head.y >= tileCount) head.y = 0;
  } else {
    // 벽에 부딪히면 게임오버
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      return endGame();
    }
  }
  // 자기 몸에 충돌
  for (let part of snake) {
    if (part.x === head.x && part.y === head.y) return endGame();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomPosition();
    score += 10; // 점수 10점 증가
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 뱀 그리기
  ctx.fillStyle = snakeColor;
  for (let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  }

  // 먹이 그리기
  ctx.fillStyle = foodColor;
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  // 점수 표시
  ctx.fillStyle = "#fff";
  ctx.font = "16px sans-serif";
  ctx.fillText("점수: " + score, 10, 20);
  // 격자 테두리 그리기
  ctx.strokeStyle = "#888"; // 어두운 회색
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function endGame() {
  gameOver = true;
  clearInterval(gameLoop);
  ctx.fillStyle = "red";
  ctx.font = "30px sans-serif";
  ctx.fillText("게임 오버", 120, 200);
  retryBtn.style.display = "block";
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  food = randomPosition();
  score = 0; // ← 점수 초기화
  gameOver = false;
  retryBtn.style.display = "none";
  // 슬라이더에서 현재 속도값 가져오기
  gameSpeed = parseInt(speedRange.value);
  speedValue.textContent = gameSpeed;
  draw();
  clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, gameSpeed);
}

retryBtn.addEventListener("click", resetGame);

// 게임 시작
resetGame();