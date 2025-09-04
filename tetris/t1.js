
const boardWidth = 8;
const boardHeight = 15;
const board = document.getElementById("board");
const nextDisplay = document.getElementById("next");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

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
  { shape: [[1,1,1],[0,1,0]], color: "purple" },
  { shape: [[1,1,1,1]], color: "lightblue" },
  { shape: [[1,1],[1,1]], color: "yellow" },
  { shape: [[0,1,1],[1,1,0]], color: "green" },
  { shape: [[1,1,0],[0,1,1]], color: "red" },
  { shape: [[1,0,0],[1,1,1]], color: "blue" },
  { shape: [[0,0,1],[1,1,1]], color: "orange" }
];

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
    clearInterval(timer);
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

  if (linesCleared > 0) {
    score += linesCleared * 10;
    updateScore();
  }
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

function updateTime() {
  const elapsed = Date.now() - startTime;
  timeEl.textContent = formatTime(elapsed);
}

// 시작
spawnBlock();
drawBoard();
const gameLoop = setInterval(moveDown, 700);
const timer = setInterval(updateTime, 1000);