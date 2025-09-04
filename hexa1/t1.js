const ROWS = 15;
const COLS = 6;
// 7종 이모지 블록 종류
const EMOJIS = ['🔺', '🔷', '🔲', '⭐', '⚫', '🔶', '🔴'];
let lastTime = 0;
let dropTimer = 0;
let dropInterval = 1000; // 기본 1초 (기존 500ms의 2배)
let startTime = null;
let fastDrop = false; // 아래 방향키 혹은 손가락 아래로 드래그 시 true로 변경

const game = document.getElementById('game');
let grid = [];
let activeBlocks = [];

function createGrid() {
  game.innerHTML = ''; // 기존 그리드 리셋
  grid = [];
  for (let y = 0; y < ROWS; y++) {
    grid[y] = [];
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      game.appendChild(cell);
      grid[y][x] = cell;
    }
  }
}

function getRandomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

// 다음 블록 3개 보관 및 표시용
let nextEmojis = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()];

// 다음 블록 UI 엘리먼트 참조
const nextBlockElems = [
  document.getElementById('next-block-0'),
  document.getElementById('next-block-1'),
  document.getElementById('next-block-2'),
];

// 다음 블록 표시 함수
function drawNextBlocks() {
  for (let i = 0; i < 3; i++) {
    nextBlockElems[i].textContent = nextEmojis[i];
  }
}

// 기존 spawnBlock() 함수 수정 — 현재 블록을 다음 블록으로 시작하고 새 다음 블록 생성
function spawnBlock() {
  let x = Math.floor(COLS / 2);
  let y = 0;

  activeBlocks = [
    { x: x, y: y, emoji: nextEmojis[0] },
    { x: x, y: y - 1, emoji: nextEmojis[1] },
    { x: x, y: y - 2, emoji: nextEmojis[2] },
  ];

  nextEmojis = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()];
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
  emojis.unshift(emojis.pop()); // 오른쪽으로 한 칸 순환
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

let score = 0;
const scoreElem = document.getElementById('score');

function updateScore(points) {
  score += points;
  scoreElem.textContent = `Score: ${score}`;
}

// 애니메이션용 CSS class 'blink'가 필요합니다 (예: 깜빡임 효과)
// 아래 함수는 매치된 블록을 찾아 제거, 점수 갱신, 중력 적용, 연쇄 처리
function checkMatchesWithGravity() {
  let toRemove = [];

  // 가로 3개 이상 매치 체크
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS - 2; x++) {
      const c1 = grid[y][x];
      const c2 = grid[y][x + 1];
      const c3 = grid[y][x + 2];
      if (
        c1.classList.contains('filled') &&
        c2.classList.contains('filled') &&
        c3.classList.contains('filled') &&
        c1.textContent === c2.textContent &&
        c1.textContent === c3.textContent
      ) {
        toRemove.push([y, x], [y, x + 1], [y, x + 2]);
      }
    }
  }

  // 세로 3개 이상 매치 체크
  for (let y = 0; y < ROWS - 2; y++) {
    for (let x = 0; x < COLS; x++) {
      const c1 = grid[y][x];
      const c2 = grid[y + 1][x];
      const c3 = grid[y + 2][x];
      if (
        c1.classList.contains('filled') &&
        c2.classList.contains('filled') &&
        c3.classList.contains('filled') &&
        c1.textContent === c2.textContent &&
        c1.textContent === c3.textContent
      ) {
        toRemove.push([y, x], [y + 1, x], [y + 2, x]);
      }
    }
  }

  // 좌상 -> 우하 대각선 3개 이상 체크
  for (let y = 0; y < ROWS - 2; y++) {
    for (let x = 0; x < COLS - 2; x++) {
      const c1 = grid[y][x];
      const c2 = grid[y + 1][x + 1];
      const c3 = grid[y + 2][x + 2];
      if (
        c1.classList.contains('filled') &&
        c2.classList.contains('filled') &&
        c3.classList.contains('filled') &&
        c1.textContent === c2.textContent &&
        c1.textContent === c3.textContent
      ) {
        toRemove.push([y, x], [y + 1, x + 1], [y + 2, x + 2]);
      }
    }
  }

  // 우상 -> 좌하 대각선 3개 이상 체크
  for (let y = 0; y < ROWS - 2; y++) {
    for (let x = 2; x < COLS; x++) {
      const c1 = grid[y][x];
      const c2 = grid[y + 1][x - 1];
      const c3 = grid[y + 2][x - 2];
      if (
        c1.classList.contains('filled') &&
        c2.classList.contains('filled') &&
        c3.classList.contains('filled') &&
        c1.textContent === c2.textContent &&
        c1.textContent === c3.textContent
      ) {
        toRemove.push([y, x], [y + 1, x - 1], [y + 2, x - 2]);
      }
    }
  }

  if (toRemove.length === 0) {
    spawnBlock();
    return;
  }

  // 중복 제거
  toRemove = toRemove.filter((pos, idx, arr) =>
    arr.findIndex(p => p[0] === pos[0] && p[1] === pos[1]) === idx
  );

  // 점수 계산: 3개당 10점씩
  const pointsEarned = Math.floor(toRemove.length / 3) * 10;
  updateScore(pointsEarned);

  // 애니메이션 처리 (blink 효과 2번 깜빡임)
  toRemove.forEach(([y, x]) => {
    const cell = grid[y][x];
    cell.classList.add('blink');
  });

  setTimeout(() => {
    // 블록 실제 제거
    for (let [y, x] of toRemove) {
      grid[y][x].className = 'cell';
      grid[y][x].textContent = '';
    }
    applyGravity();

    // 연쇄 반응 처리
    setTimeout(checkMatchesWithGravity, 300);
  }, 800);
}

function applyGravity() {
  for (let x = 0; x < COLS; x++) {
    for (let y = ROWS - 2; y >= 0; y--) {
      if (
        grid[y][x].classList.contains('filled') &&
        !grid[y + 1][x].classList.contains('filled')
      ) {
        let ny = y;
        while (
          ny + 1 < ROWS &&
          !grid[ny + 1][x].classList.contains('filled')
        ) {
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

// 게임 시간 표시용 엘리먼트
const elapsedTimeElem = document.getElementById('elapsed-time');

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

  const elapsed = time - startTime;
  const elapsedMinutes = elapsed / 60000;
  updateElapsedTime(elapsed);

  // 속도 증가 계산
  let speedMultiplier = 1 - elapsedMinutes * 0.2;
  if (speedMultiplier < 0.1) speedMultiplier = 0.1;

  dropInterval = 1000 * speedMultiplier;

  const currentInterval = fastDrop ? dropInterval / 5 : dropInterval;

  dropTimer += delta;

  if (activeBlocks.length > 0) {
    if (dropTimer > currentInterval) {
      dropBlock();
      dropTimer = 0;
    }
  }

  requestAnimationFrame(gameLoop);
}

// 키보드 이벤트
document.addEventListener('keydown', (e) => {
  if (activeBlocks.length === 0) return;
  if (e.code === 'ArrowLeft') move(-1);
  else if (e.code === 'ArrowRight') move(1);
  else if (e.code === 'ArrowUp') rotate();
  else if (e.code === 'ArrowDown') fastDrop = true;
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown') fastDrop = false;
});

// 터치 이벤트 (좌우 이동, 회전, 아래로 드래그 가속)
let touchStartX = null;
let touchStartY = null;
let touchMoved = false;

document.addEventListener('touchstart', e => {
  if (activeBlocks.length === 0) return;
  if (e.touches.length !== 1) return;
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  touchMoved = false;
});

document.addEventListener('touchmove', e => {
  
  if (activeBlocks.length === 0) return;
  if (e.touches.length !== 1) return;
  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  const threshold = 30;

  if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
    if (!touchMoved) {
      if (dx > 0) move(1);
      else move(-1);
      touchMoved = true;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }
    e.preventDefault();
    fastDrop = false;
  }
  else if (dy < -threshold && Math.abs(dy) > Math.abs(dx)) {
    if (!touchMoved) {
      rotate();
      touchMoved = true;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }
    e.preventDefault();
    fastDrop = false;
  }
  else if (dy > threshold && Math.abs(dy) > Math.abs(dx)) {
    fastDrop = true;
    e.preventDefault();
  }
});

document.addEventListener('touchend', e => {
  touchStartX = null;
  touchStartY = null;
  touchMoved = false;
  fastDrop = false;
});

// 초기화 및 게임 시작
createGrid();
drawNextBlocks();
spawnBlock();
requestAnimationFrame(gameLoop);
