
const ballCountInitial = 10;
let ballCount = ballCountInitial;
let balls = [];
let blueBalls = [];
let redBall = null;  // 빨간 공 객체
let isGameOver = false;
const hud = document.getElementById('hud');
const overlay = document.getElementById('overlay');
const retryBtn = document.getElementById('retry-btn');
const posInfo = document.getElementById('pos-info');

let centerX, centerY;
let animationFrameBall, animationFramePlayer;
let startTime, stage;
let hudTimer;

const player = document.getElementById('player');
let px, py, vx, vy;
const acc = 0.3;
const friction = 0.95;
const maxSpeed = 4;
let score = 0;

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

document.addEventListener('keydown', e => {
  if (e.key === ' ') {
    e.preventDefault();  // 스페이스바 기본 스크롤 방지
    if (overlay.style.display === 'flex') {
      resetGame();
    }
  }
  if (e.key in keys) keys[e.key] = true;
});

document.addEventListener('keyup', e => {
  if (e.key in keys) keys[e.key] = false;
});

function createBall() {
  const ball = document.createElement('div');
  ball.className = 'ball';
  document.body.appendChild(ball);

  const x = centerX;
  const y = centerY;
  let dx = Math.random() * 2 - 1;
  let dy = Math.random() * 2 - 1;
  const speed = 2 + Math.random() * 2;
  const mag = Math.sqrt(dx * dx + dy * dy);
  dx /= mag;
  dy /= mag;

  return { el: ball, x, y, dx, dy, speed };
}

function createBlueBall() {
  const blueBallEl = document.createElement('div');
  blueBallEl.style.position = 'absolute';
  blueBallEl.style.width = '15px';
  blueBallEl.style.height = '15px';
  blueBallEl.style.borderRadius = '50%';
  blueBallEl.style.backgroundColor = 'blue';
  blueBallEl.style.zIndex = '15';
  document.body.appendChild(blueBallEl);

  const x = centerX;
  const y = centerY;

  const dx = px - x;
  const dy = py - y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const dirX = dx / dist;
  const dirY = dy / dist;

  const baseOrangeSpeed = 2; // 기존 주황공 기본 속도 기준
  const speedMultiplier = 1 + 0.2 * (stage - 1);
  const speed = baseOrangeSpeed * speedMultiplier * 4;

  return { el: blueBallEl, x, y, dx: dirX, dy: dirY, speed };
}

// 빨간 공 생성 함수
function createRedBall() {
  const redBallEl = document.createElement('div');
  redBallEl.id = 'red-ball';
  document.body.appendChild(redBallEl);

  // 초기 위치는 화면 중앙
  const x = centerX;
  const y = centerY;

  return { el: redBallEl, x, y };
}


function resetGame() {
  isGameOver = false;
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;

  balls.forEach(b => b.el.remove());
  balls = [];
  blueBalls.forEach(b => b.el.remove());
  blueBalls = [];

  if (redBall) {
    redBall.el.remove();
    redBall = null;
  }

  score = 0;

  ballCount = ballCountInitial; // 초기값으로 복구

  for (let i = 0; i < ballCount; i++) {
    balls.push(createBall());
  }

  px = 10;
  py = 10;
  vx = 0;
  vy = 0;

  player.style.left = px - 7.5 + 'px';
  player.style.top = py - 7.5 + 'px';

  startTime = Date.now();
  stage = 1;
  updateHUD();

  overlay.style.display = 'none';

  cancelAnimationFrame(animationFrameBall);
  cancelAnimationFrame(animationFramePlayer);
  updateBalls();
  updatePlayer();
}


function updateHUD() {
  if (isGameOver) return;  // 게임 종료 상태면 종료
  clearTimeout(hudTimer);
  const elapsedMs = Date.now() - startTime;
  const elapsedSec = Math.floor(elapsedMs / 1000);
  stage = Math.floor(elapsedSec / 10) + 1;

  // 스테이지가 올라갈 때마다 주황공 갯수 증가
  ballCount = ballCountInitial + Math.max(0, stage - 1);

  // 3스테이지부터 파란공 생성
  if (stage >= 2) {
    if (blueBalls.length === 0) {
      blueBalls.push(createBlueBall());
    }
  } else {
    blueBalls.forEach(b => b.el.remove());
    blueBalls = [];
  }

  // 5스테이지부터 빨간공 생성 (한번만)
  if (stage >= 3 && !redBall) {
    redBall = createRedBall();
  }

  const minutes = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
  const seconds = String(elapsedSec % 60).padStart(2, '0');
  const milliseconds = String(elapsedMs % 1000).padStart(3, '0');

  hud.textContent = `${minutes}분 ${seconds}.${milliseconds}초 | ${stage} 스테이지`;

  hudTimer = setTimeout(updateHUD, 30);
}


function checkCollision(bx, by, br, px, py, pr) {
  const dx = bx - px;
  const dy = by - py;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist < br + pr;
}

function updateBalls() {
  const speedMultiplier = 1 + 0.2 * (stage - 1);

  // 파란공 위치 업데이트
  blueBalls.forEach((ball, index) => {
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;

    if (
      ball.x < -20 || ball.x > window.innerWidth + 20 ||
      ball.y < -20 || ball.y > window.innerHeight + 20
    ) {
      // 재생성: 다시 내 공 위치 향해 초기화
      ball.el.remove();
      blueBalls[index] = createBlueBall();
    } else {
      ball.el.style.left = ball.x + 'px';
      ball.el.style.top = ball.y + 'px';
    }

    // 충돌 체크 (파란공도 충돌 시 게임오버)
    if (checkCollision(ball.x + 7.5, ball.y + 7.5, 7.5, px, py, 7.5)) {
      gameOver();
    }
  });

  // 주황공 위치 업데이트
  while (balls.length < ballCount) {
    balls.push(createBall());
  }
  while (balls.length > ballCount) {
    const b = balls.pop();
    b.el.remove();
  }

  balls.forEach(ball => {
    ball.x += ball.dx * ball.speed * speedMultiplier;
    ball.y += ball.dy * ball.speed * speedMultiplier;

    if (
      ball.x < -30 || ball.x > window.innerWidth + 30 ||
      ball.y < -30 || ball.y > window.innerHeight + 30
    ) {
      ball.x = centerX;
      ball.y = centerY;
      ball.dx = Math.random() * 2 - 1;
      ball.dy = Math.random() * 2 - 1;
      const mag = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx /= mag;
      ball.dy /= mag;
    }

    ball.el.style.left = ball.x + 'px';
    ball.el.style.top = ball.y + 'px';

    if (checkCollision(ball.x + 15, ball.y + 15, 15, px, py, 7.5)) {
      gameOver();
    }
  });

  // 빨간 공 위치 업데이트 (5스테이지부터)
  if (redBall) {
  const playerSpeed = Math.sqrt(vx * vx + vy * vy);
  
  const baseOrangeSpeed = 2;
  const speedMultiplier = 1 + 0.2 * (stage - 1);
  const orangeSpeed = baseOrangeSpeed * speedMultiplier;
  
  const minRedSpeed = orangeSpeed * 0.7;
  const redSpeed = Math.max(playerSpeed * 0.8, minRedSpeed);

  const dx = px - redBall.x;
  const dy = py - redBall.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 0) {
    const dirX = dx / dist;
    const dirY = dy / dist;

    redBall.x += dirX * redSpeed;
    redBall.y += dirY * redSpeed;

    redBall.el.style.left = redBall.x - 10 + 'px';
    redBall.el.style.top = redBall.y - 10 + 'px';

    if (checkCollision(redBall.x, redBall.y, 10, px, py, 7.5)) {
      gameOver();
    }
  }
}



  animationFrameBall = requestAnimationFrame(updateBalls);
}


function updatePlayer() {
  if (keys.ArrowLeft) vx -= acc;
  if (keys.ArrowRight) vx += acc;
  if (keys.ArrowUp) vy -= acc;
  if (keys.ArrowDown) vy += acc;

  vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
  vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

  px += vx;
  py += vy;

  vx *= friction;
  vy *= friction;

  const r = 7.5;
  if (px < r) { px = r; vx = 0; }
  if (px > window.innerWidth - r) { px = window.innerWidth - r; vx = 0; }
  if (py < r) { py = r; vy = 0; }
  if (py > window.innerHeight - r) { py = window.innerHeight - r; vy = 0; }

  player.style.left = px - r + 'px';
  player.style.top = py - r + 'px';

  // 거리 계산
  const distX = Math.abs(px - centerX);
  const distY = Math.abs(py - centerY);
  const dist = Math.sqrt(distX * distX + distY * distY);
  const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2;

  // 거리와 스테이지로 점수 증가량 계산
  let gainRatio = (maxDist - dist) / maxDist;
  if (gainRatio < 0) gainRatio = 0;
  const gain = gainRatio * stage * 0.5;
  score += gain;

  posInfo.textContent = `X${Math.round(distX).toString().padStart(3, '0')} Y${Math.round(distY).toString().padStart(3, '0')} | 점수: ${Math.floor(score)}`;

  animationFramePlayer = requestAnimationFrame(updatePlayer);
}

function gameOver() {
  if (isGameOver) return;  // 게임 종료 상태면 종료
  isGameOver = true;
  overlay.style.display = 'flex';
  cancelAnimationFrame(animationFrameBall);
  cancelAnimationFrame(animationFramePlayer);
  clearTimeout(hudTimer);

  const finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = `최종 점수: ${Math.floor(score)}`;

  const finalStageEl = document.getElementById('final-stage');
  finalStageEl.textContent = `최종 스테이지: ${stage}`;

  const finalTimeEl = document.getElementById('final-time');
  const elapsedMs = Date.now() - startTime;
  const minutes = String(Math.floor(elapsedMs / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((elapsedMs % 60000) / 1000)).padStart(2, '0');
  const ms = String(elapsedMs % 1000).padStart(3, '0');
  finalTimeEl.textContent = `플레이 타임: ${minutes}분 ${seconds}.${ms}초`;

  const highRecordEl = document.getElementById('high-record');
  const highData = JSON.parse(localStorage.getItem('highRecord') || 'null');

  const current = {
    score: Math.floor(score),
    stage: stage,
    timeMs: elapsedMs
  };

  if (!highData || current.score > highData.score) {
    localStorage.setItem('highRecord', JSON.stringify(current));
    highRecordEl.textContent = `🎉 신기록 달성!`;
  } else {
    const prevMin = String(Math.floor(highData.timeMs / 60000)).padStart(2, '0');
    const prevSec = String(Math.floor((highData.timeMs % 60000) / 1000)).padStart(2, '0');
    const prevMs = String(highData.timeMs % 1000).padStart(3, '0');

    highRecordEl.textContent = `최고 점수: ${highData.score} | 스테이지: ${highData.stage} | ${prevMin}분 ${prevSec}.${prevMs}초`;
  }
}






retryBtn.addEventListener('click', () => {
  resetGame();
});

window.addEventListener('resize', () => {
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
});
window.addEventListener('orientationchange', () => {
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
});


resetGame();