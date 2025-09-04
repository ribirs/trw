
// 최초 실행 + 리사이즈 시 갱신
setViewportHeight();
window.addEventListener('resize', setViewportHeight);

let ROWS = 15;
let COLS = 8;
const EMOJIS = ['🍓', '🌸', '🍋', '🌼', '🍇', '🏵️', '🍒','🌻','🍊','💠'];
// 모바일 환경 감지 함수
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
         window.innerWidth <= 1000; // 작은 화면도 모바일로 간주
}

// 모바일이면 다른 값 설정
if (isMobile()) {
  ROWS = 10;
  COLS = 6;
}

let lastTime = 0;
let dropTimer = 0;
let dropInterval = 1200;
let startTime = null;
let currentElapsedMs = 0;
let fastDrop = false;

const game = document.getElementById('game');
const scoreElem = document.getElementById('score');
const elapsedTimeElem = document.getElementById('elapsed-time');

let grid = [];
let activeBlocks = [];
let score = 0;

// 게임 영역의 크기를 계산해서 셀 크기 결정
function setCellSize() {
  const gameWidth = game.offsetWidth;
  const gameHeight = game.offsetHeight;

  // 게임 영역에 맞춰 셀 크기를 동적으로 계산 (가로/세로 비율 고려)
  const cellWidth = gameWidth / COLS;
  const cellHeight = gameHeight / ROWS;

  // 가장 작은 크기로 셀 크기 결정
  const cellSize = Math.min(cellWidth, cellHeight) * 1; // 88%로 축소
  const gapSize = cellSize * 0.2; // 셀 크기의 10% 간격
  game.style.gap = `${gapSize}px`;
  return cellSize;
}

// ⬇️ 이모지 개수 제한 함수
function getEmojiLimit(elapsedMs) {
  const minutes = elapsedMs / 60000;
  if (minutes < 2) return 4;
  else if (minutes < 4) return 5;
  else if (minutes < 6) return 6;
  else if (minutes < 8) return 7;
  else if (minutes < 10) return 8;
  else if (minutes < 12) return 9;
  else return 10;
}

// ⬇️ 제한된 범위에서 이모지 선택
function getRandomEmoji(elapsedMs) {
  const limit = getEmojiLimit(elapsedMs);
  const pool = EMOJIS.slice(0, limit);
  return pool[Math.floor(Math.random() * pool.length)];
}

// ⬇️ 초기화
function createGrid() {
  game.innerHTML = ''; // 기존 그리드 리셋
  grid = [];
  
  // 셀 크기 계산
  const cellSize = setCellSize();

  // 각 셀에 스타일 적용 (동적 크기 설정)
  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.width = `${cellSize}px`;  // 동적으로 셀 크기 설정
      cell.style.height = `${cellSize}px`; // 동적으로 셀 크기 설정
      cell.style.gap = `1px`;
      game.appendChild(cell);
      grid[y][x] = cell;
    }
  }
}

// ⬇️ 다음 블록 UI
let nextEmojis = [
  getRandomEmoji(0),
  getRandomEmoji(0),
  getRandomEmoji(0)
];

const nextBlockElems = [
  document.getElementById('next-block-0'),
  document.getElementById('next-block-1'),
  document.getElementById('next-block-2')
];

function drawNextBlocks() {
  for (let i = 0; i < 3; i++) {
    nextBlockElems[i].textContent = nextEmojis[i];
  }
}

// ⬇️ 블록 생성
function spawnBlock() {
  const x = Math.floor(COLS / 2);
  const y = 0;

  activeBlocks = [
    { x, y, emoji: nextEmojis[0] },
    { x, y: y - 1, emoji: nextEmojis[1] },
    { x, y: y - 2, emoji: nextEmojis[2] }
  ];

  // 다음 블록 갱신
  nextEmojis = [
    getRandomEmoji(currentElapsedMs),
    getRandomEmoji(currentElapsedMs),
    getRandomEmoji(currentElapsedMs)
  ];
  drawNextBlocks();

  if (isBlocked()) {
    alert("게임 오버!");
    activeBlocks = [];
    return;
  }

  drawBlocks();
}

function drawBlocks() {
  clearActive();
  for (let block of activeBlocks) {
    if (block.y >= 0) {
      const cell = grid[block.y][block.x];
      cell.classList.add('active');
      cell.textContent = block.emoji;
    }
  }
}

function clearActive() {
  document.querySelectorAll('.active').forEach(cell => {
    cell.classList.remove('active');
    if (!cell.classList.contains('filled')) {
      cell.textContent = '';
    }
  });
}

function move(dx) {
  if (activeBlocks.every(b => b.x + dx >= 0 && b.x + dx < COLS && (b.y < 0 || !grid[b.y][b.x + dx].classList.contains('filled')))) {
    activeBlocks.forEach(b => b.x += dx);
    drawBlocks();
  }
}

function rotate() {
  const emojis = activeBlocks.map(b => b.emoji);
  emojis.unshift(emojis.pop());
  activeBlocks.forEach((b, i) => b.emoji = emojis[i]);
  drawBlocks();
}

function dropBlock() {
  if (canMoveDown()) {
    activeBlocks.forEach(b => b.y++);
    drawBlocks();
  } else {
    fixToGrid();
    checkMatchesWithGravity();
  }
}

function canMoveDown() {
  return activeBlocks.every(b => {
    let newY = b.y + 1;
    return newY < ROWS && (newY < 0 || !grid[newY][b.x].classList.contains('filled'));
  });
}

function isBlocked() {
  return activeBlocks.some(b => b.y >= 0 && grid[b.y][b.x].classList.contains('filled'));
}

function fixToGrid() {
  for (let b of activeBlocks) {
    if (b.y >= 0) {
      const cell = grid[b.y][b.x];
      cell.classList.add('filled');
      cell.classList.remove('active');
      cell.textContent = b.emoji;
    }
  }
  activeBlocks = [];
}

function updateScore(points) {
  score += points;
  scoreElem.textContent = `Score: ${score} +${points}`;
}

function checkMatchesWithGravity() {
  let toRemove = [];

  function isMatch(c1, c2, c3) {
    return (
      c1.classList.contains('filled') &&
      c2.classList.contains('filled') &&
      c3.classList.contains('filled') &&
      c1.textContent === c2.textContent &&
      c1.textContent === c3.textContent
    );
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS - 2; x++) {
      if (isMatch(grid[y][x], grid[y][x + 1], grid[y][x + 2])) {
        toRemove.push([y, x], [y, x + 1], [y, x + 2]);
      }
    }
  }

  for (let y = 0; y < ROWS - 2; y++) {
    for (let x = 0; x < COLS; x++) {
      if (isMatch(grid[y][x], grid[y + 1][x], grid[y + 2][x])) {
        toRemove.push([y, x], [y + 1, x], [y + 2, x]);
      }
    }
  }

  for (let y = 0; y < ROWS - 2; y++) {
    for (let x = 0; x < COLS - 2; x++) {
      if (isMatch(grid[y][x], grid[y + 1][x + 1], grid[y + 2][x + 2])) {
        toRemove.push([y, x], [y + 1, x + 1], [y + 2, x + 2]);
      }
    }
  }

  for (let y = 0; y < ROWS - 2; y++) {
    for (let x = 2; x < COLS; x++) {
      if (isMatch(grid[y][x], grid[y + 1][x - 1], grid[y + 2][x - 2])) {
        toRemove.push([y, x], [y + 1, x - 1], [y + 2, x - 2]);
      }
    }
  }

  if (toRemove.length === 0) {
    spawnBlock();
    return;
  }

  toRemove = toRemove.filter((pos, idx, arr) =>
    arr.findIndex(p => p[0] === pos[0] && p[1] === pos[1]) === idx
  );

  if (toRemove.length === 3) {
    updateScore(10);
  } else if (toRemove.length === 4) {
    updateScore(20);
  } else if (toRemove.length === 5) {
    updateScore(30);
  } else if (toRemove.length === 6) {
    updateScore(40);
  } else if (toRemove.length === 7) {
    updateScore(60);
  } else {
    updateScore(toRemove.length * 10);
  }

  toRemove.forEach(([y, x]) => {
    grid[y][x].classList.add('blink');
  });

  setTimeout(() => {
    for (let [y, x] of toRemove) {
      grid[y][x].className = 'cell';
      grid[y][x].textContent = '';
    }
    applyGravity();
    setTimeout(checkMatchesWithGravity, 100);
  }, 200);
}

function applyGravity() {
  for (let x = 0; x < COLS; x++) {
    for (let y = ROWS - 2; y >= 0; y--) {
      if (grid[y][x].classList.contains('filled') && !grid[y + 1][x].classList.contains('filled')) {
        let ny = y;
        while (ny + 1 < ROWS && !grid[ny + 1][x].classList.contains('filled')) {
          grid[ny + 1][x].className = grid[ny][x].className;
          grid[ny + 1][x].textContent = grid[ny][x].textContent;
          grid[ny][x].className = 'cell';
          grid[ny][x].textContent = '';
          ny++;
        }
      }
    }
  }
}

function updateElapsedTime(elapsedMs) {
  let totalSeconds = elapsedMs / 1000;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const secondsFormatted = seconds.toFixed(2);
  elapsedTimeElem.textContent = `Time: ${hours}시간 ${minutes}분 ${secondsFormatted}초`;
}

function gameLoop(time = 0) {
  if (!startTime) startTime = time;
  if (!lastTime) lastTime = time;

  const delta = time - lastTime;
  lastTime = time;
  currentElapsedMs = time - startTime;

  updateElapsedTime(currentElapsedMs);

  const currentInterval = fastDrop ? dropInterval / 5 : dropInterval;
  dropTimer += delta;

  if (activeBlocks.length > 0 && dropTimer > currentInterval) {
    dropBlock();
    dropTimer = 0;
  }

  requestAnimationFrame(gameLoop);
}

// ⌨️ 키보드 & 터치 입력
document.addEventListener('keydown', e => {
  if (activeBlocks.length === 0) return;
  if (e.code === 'ArrowLeft') move(-1);
  else if (e.code === 'ArrowRight') move(1);
  else if (e.code === 'ArrowUp') rotate();
  else if (e.code === 'ArrowDown') fastDrop = true;
});
document.addEventListener('keyup', e => {
  if (e.code === 'ArrowDown') fastDrop = false;
});

let touchStartX = null;
let touchStartY = null;
let touchMoved = false;

document.addEventListener('touchstart', e => {
  if (e.touches.length !== 1 || activeBlocks.length === 0) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchMoved = false;
});
document.addEventListener('touchmove', e => {
  if (e.touches.length !== 1 || activeBlocks.length === 0) return;
  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;
  const threshold = 30;

  if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
    if (!touchMoved) {
      move(dx > 0 ? 1 : -1);
      touchMoved = true;
    }
    e.preventDefault();
    fastDrop = false;
  } else if (dy < -threshold && Math.abs(dy) > Math.abs(dx)) {
    if (!touchMoved) {
      rotate();
      touchMoved = true;
    }
    e.preventDefault();
    fastDrop = false;
  } else if (dy > threshold && Math.abs(dy) > Math.abs(dx)) {
    fastDrop = true;
    e.preventDefault();
  }
});
document.addEventListener('touchend', () => {
  touchStartX = null;
  touchStartY = null;
  touchMoved = false;
  fastDrop = false;
});
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 리사이즈 시 동적으로 셀 크기 재설정
window.addEventListener('resize', createGrid);
// ▶ 게임 시작
createGrid();
drawNextBlocks();
spawnBlock();
requestAnimationFrame(gameLoop);
