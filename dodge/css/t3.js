
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

let isTouching = false;
let touchX = 0;
let touchY = 0;

// 기본 이동속도 (현재 4)
let playerSpeed = 4;
let enemySpeed = 4;
const playerSpeedInput = document.getElementById('player-speed');
const enemySpeedInput = document.getElementById('enemy-speed');
const playerSpeedVal = document.getElementById('player-speed-val');
const enemySpeedVal = document.getElementById('enemy-speed-val');
playerSpeedInput.addEventListener('input', () => {
  playerSpeed = Number(playerSpeedInput.value);
  playerSpeedVal.textContent = playerSpeed;
});

enemySpeedInput.addEventListener('input', () => {
  enemySpeed = Number(enemySpeedInput.value);
  enemySpeedVal.textContent = enemySpeed;
});


const player = document.getElementById('player');
let px, py, vx, vy;
const accBase = 0.3;
const friction = 0.95;
let maxSpeed = 4;
let acc = 0.3;
let score = 0;

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

// 시작 버튼
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');

startBtn.addEventListener('click', () => {
  // 시작 화면 숨기기
  startScreen.style.display = 'none';

  // 게임 초기화 및 시작 함수 호출
  initGame();
  startGame();
});

function initGame() {
  // 위치 초기화
  px = window.innerWidth / 2;
  py = window.innerHeight / 2;

  vx = 0;
  vy = 0;

  maxSpeed = playerSpeed;
  acc = accBase * (playerSpeed / 4);  // 기본 4 기준 비례 조절

  // 적 공 관련 속도도 enemySpeed 변수로 반영 (아래에서 처리)
}

// 게임 시작 함수 (예: 애니메이션 시작 등)
function startGame() {
  // 기존 게임 루프, 타이머, 기타 시작
  animationFramePlayer = requestAnimationFrame(updatePlayer);
  resetGame();
  // 기타 게임 시작 로직
}


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
document.addEventListener('touchstart', e => {
  isTouching = true;
  const touch = e.touches[0];
  lastTouchX = touch.clientX;
  lastTouchY = touch.clientY;
});

document.addEventListener('touchmove', e => {
  if (!isTouching) return;
  const touch = e.touches[0];
  
  // 터치 이동량 계산
  const deltaX = touch.clientX - lastTouchX;
  const deltaY = touch.clientY - lastTouchY;

  // 플레이어 위치에 이동량 더하기
  px += deltaX;
  py += deltaY;

  // 경계 체크 (화면 밖으로 안 나가게)
  const r = 7.5;
  if (px < r) px = r;
  if (px > window.innerWidth - r) px = window.innerWidth - r;
  if (py < r) py = r;
  if (py > window.innerHeight - r) py = window.innerHeight - r;

  // 플레이어 DOM 위치 업데이트
  player.style.left = (px - r) + 'px';
  player.style.top = (py - r) + 'px';

  // 다음 이동량 계산을 위해 현재 터치 위치 저장
  lastTouchX = touch.clientX;
  lastTouchY = touch.clientY;

  e.preventDefault();  // 화면 스크롤 방지
});

document.addEventListener('touchend', e => {
  isTouching = false;
});


function createBall() {
  const ball = document.createElement('div');
  ball.className = 'ball';
  document.body.appendChild(ball);

  const x = centerX;
  const y = centerY;
  let dx = Math.random() * 2 - 1;
  let dy = Math.random() * 2 - 1;
  // 기본 속도에 enemySpeed 곱함
  const speed = (2 + Math.random() * 2) * (enemySpeed / 4); 
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
  const speed = baseOrangeSpeed * speedMultiplier * (enemySpeed / 4) * 4; // 기존 *4 유지하며 enemySpeed 반영

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

    if (redBall) {
      const playerSpeedValue = Math.sqrt(vx * vx + vy * vy);
    
      const baseOrangeSpeed = 2;
      const speedMultiplier = 1 + 0.2 * (stage - 1);
      const orangeSpeed = baseOrangeSpeed * speedMultiplier * (enemySpeed / 4);  // enemySpeed 반영
    
      const minRedSpeed = orangeSpeed * 0.7;
      const redSpeed = Math.max(playerSpeedValue * 0.8, minRedSpeed);
    
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
  if (!isTouching) {
    // 키보드 조작 기존 코드 유지
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

    player.style.left = (px - r) + 'px';
    player.style.top = (py - r) + 'px';
  }
  // 터치 중일 때는 위에서 터치move 이벤트에서 직접 위치를 업데이트하므로 별도 처리 안함

  // 점수 등 기타 업데이트 코드 유지

  animationFramePlayer = requestAnimationFrame(updatePlayer);
}

function gameOver() {
  if (isGameOver) return;  // 게임 종료 상태면 종료
  isGameOver = true;
  overlay.style.display = 'flex';
  retryBtn.textContent = '메인으로';  // 버튼 텍스트 변경
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
  // 게임 재시작이 아니라 메인 화면(시작화면)으로 이동
  overlay.style.display = 'none';
  startScreen.style.display = 'flex';
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