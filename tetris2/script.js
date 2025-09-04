
const boardWidth = 9;
const boardHeight = 22;
const board = document.getElementById("board");
const nextDisplay = document.getElementById("next");
const scoreEl = document.getElementById("score");

let callCount = 0; // 호출 횟수 저장 변수
let score = 0;
let startTime = Date.now();

const cells = [];
for (let i = 0; i < boardWidth * boardHeight; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
  board.appendChild(div);
  cells.push(div);
}

const SHAPES = [
  { shape: [[1,1,1]], color: "aquamarine" },
  { shape: [[1,1],[1,0]], color: "cyan" },
  { shape: [[1,1]], color: "magenta" },
  { shape: [[1]], color: "lime" },
  { shape: [[1],[1],[1]], color: "pink" },
  { shape: [[0,1],[1,1]], color: "brown" },
  { shape: [[1],[1]], color: "teal" },
  { shape: [[1]], color: "lightgreen" },
  { shape: [[1],[1],[1],[1]], color: "indigo" },
  { shape: [[0,1,0],[1,1,1]], color: "darkgreen" },

  { shape: [[1,1,1],[0,1,0]], color: "purple" },
  { shape: [[1,1,1,1]], color: "lightblue" },
  { shape: [[1,1],[1,1]], color: "yellow" },
  { shape: [[0,1,1],[1,1,0]], color: "green" },
  { shape: [[1,1,0],[0,1,1]], color: "red" },
  { shape: [[1,0,0],[1,1,1]], color: "blue" },
  { shape: [[0,0,1],[1,1,1]], color: "orange" }
];


const buttons = document.querySelectorAll('.mobile-controls button');
let keyInterval = null;
let isPressed = false; // 중복 방지 플래그

function triggerKey(key) {
  const event = new KeyboardEvent('keydown', {
    key: key,
    bubbles: true,
  });
  document.dispatchEvent(event);
}

function handlePressStart(event) {
  event.preventDefault(); // 기본 동작 방지 (특히 모바일에서)
  if (isPressed) return; // 이미 눌린 상태면 무시
  isPressed = true;

  const key = event.currentTarget.getAttribute('data-key');
  if (!key) return;

  triggerKey(key); // 한 번 실행

  keyInterval = setInterval(() => {
    triggerKey(key);
  }, 100); // 꾹 누르기 반복
}

function handlePressEnd() {
  isPressed = false;
  clearInterval(keyInterval);
  keyInterval = null;
}

buttons.forEach(button => {
  button.addEventListener('mousedown', handlePressStart);
  button.addEventListener('touchstart', handlePressStart, { passive: false });

  button.addEventListener('mouseup', handlePressEnd);
  button.addEventListener('mouseleave', handlePressEnd);
  button.addEventListener('touchend', handlePressEnd);
  button.addEventListener('touchcancel', handlePressEnd);
});

function drawNextBlock(block) {
  nextDisplay.innerHTML = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (block.shape[r] && block.shape[r][c]) {
        cell.classList.add(block.color);
      }
      nextDisplay.appendChild(cell);
    }
  }
}

let grid = Array.from({ length: boardHeight }, () => Array(boardWidth).fill(null));
let currentBlock = null;
let currentX = 0;
let currentY = 0;
let nextBlock = getRandomBlock();

function getRandomBlock() {
  callCount++;
  // 15회마다 무조건 indigo 블록 반환
  if (callCount % 15 === 0) {
    return { shape: [[1,1,1,1]], color: "blueviolet" };
  }
    const obj = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return { shape: obj.shape, color: obj.color };
}

function spawnBlock() {
  currentBlock = nextBlock;
  nextBlock = getRandomBlock();
  drawNextBlock(nextBlock);
  currentX = 2;
  currentY = 0;

  if (!isValidMove(currentBlock.shape, currentX, currentY)) {
    alert("GAME OVER");
    clearInterval(gameLoop);
  }
}

function drawBoard() {
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = cells[y * boardWidth + x];
      cell.className = "cell";
      if (grid[y][x]) {
        cell.classList.add(grid[y][x]);
      }
    }
  }

  if (currentBlock) {
    const shape = currentBlock.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const bx = currentX + x;
          const by = currentY + y;
          if (by >= 0 && by < boardHeight && bx >= 0 && bx < boardWidth) {
            cells[by * boardWidth + bx].classList.add(currentBlock.color);
          }
        }
      }
    }
  }
}

function isValidMove(shape, x, y) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const nx = x + c;
        const ny = y + r;
        if (nx < 0 || nx >= boardWidth || ny >= boardHeight) return false;
        if (ny >= 0 && grid[ny][nx]) return false;
      }
    }
  }
  return true;
}

function placeBlock() {
  const shape = currentBlock.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const bx = currentX + x;
        const by = currentY + y;
        if (by >= 0) {
          grid[by][bx] = currentBlock.color;
        }
      }
    }
  }
  clearLines();
}

function clearLines() {
  let linesCleared = 0;
  grid = grid.filter(row => {
    if (row.every(cell => cell !== null)) {
      linesCleared++;
      return false;
    }
    return true;
  });

  while (grid.length < boardHeight) {
    grid.unshift(Array(boardWidth).fill(null));
  }

  if (linesCleared === 4) {
    score += 100;
    updateScore();
  } else if (linesCleared === 3) {
    score += 50;
    updateScore();
  } else if (linesCleared >= 1) {
    riseFromBottom();
    updateScore();
  }
}

function riseFromBottom() {
  // 기존 블록들을 위로 한 줄씩 올림
  for (let y = 0; y < boardHeight - 1; y++) {
    grid[y] = [...grid[y + 1]];
  }

  // 새로운 바닥 줄 만들기 (무작위 1칸 비우기)
  const emptyIndex = Math.floor(Math.random() * boardWidth);
  const newRow = Array(boardWidth).fill("gray"); // 혹은 원하는 색상
  newRow[emptyIndex] = null;
  grid[boardHeight - 1] = newRow;

  // 현재 블록도 한 줄 위로 올려줘야 함!
  currentY -= 1;

  drawBoard();
}

function updateScore() {
  scoreEl.textContent = score;
}

function moveDown() {
  if (isValidMove(currentBlock.shape, currentX, currentY + 1)) {
    currentY++;
  } else {
    placeBlock();
    spawnBlock();
  }
  drawBoard();
}

document.addEventListener("keydown", (e) => {
  if (!currentBlock) return;
  if (e.key === "ArrowLeft" && isValidMove(currentBlock.shape, currentX - 1, currentY)) {
    currentX--;
  } else if (e.key === "ArrowRight" && isValidMove(currentBlock.shape, currentX + 1, currentY)) {
    currentX++;
  } else if (e.key === "ArrowDown") {
    moveDown();
  } else if (e.key === "ArrowUp") {
    const rotated = rotate(currentBlock.shape);
    if (isValidMove(rotated, currentX, currentY)) {
      currentBlock.shape = rotated;
    }
  }
  drawBoard();
});

function rotate(shape) {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  const min = String(Math.floor(total / 60)).padStart(2, '0');
  const sec = String(total % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

let touchStartX = null;
let touchStartY = null;
const swipeThreshold = 30; // 최소 이동 거리(px)

window.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

window.addEventListener("touchend", e => {
  if (touchStartX === null || touchStartY === null) return;

  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  // 수평 이동이 더 크면 좌우 이동
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
    if (dx > 0) {
      // 오른쪽으로 스와이프 → 오른쪽 이동
      if (isValidMove(currentBlock.shape, currentX + 1, currentY)) {
        currentX++;
      }
    } else {
      // 왼쪽으로 스와이프 → 왼쪽 이동
      if (isValidMove(currentBlock.shape, currentX - 1, currentY)) {
        currentX--;
      }
    }
  } 
  // 수직 이동이 더 크면 위/아래 동작
  else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > swipeThreshold) {
    if (dy < 0) {
      // 위로 스와이프 → 회전
      const rotated = rotate(currentBlock.shape);
      if (isValidMove(rotated, currentX, currentY)) {
        currentBlock.shape = rotated;
      }
    } else {
      // 아래로 스와이프 → 빠른 하강 (moveDown 여러번 또는 한 번)
      moveDown();
    }
  }

  drawBoard();

  // 초기화
  touchStartX = null;
  touchStartY = null;
});

window.addEventListener("touchmove", e => {
  if (!touchStartX || !touchStartY) return;

  const touch = e.touches[0];
  const dy = touch.clientY - touchStartY;

  // 아래로 스와이프할 때 기본 스크롤 막기
  if (dy > 0) {
    e.preventDefault();
  }
}, { passive: false }); // passive: false 꼭 필요합니다!

// 시작
spawnBlock();
drawBoard();