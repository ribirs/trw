const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreBoard = document.getElementById("scoreBoard");
const lifeBoard = document.getElementById("lifeBoard");
const bonusBoard = document.getElementById("bonusBoard");
const Yth = gameArea.offsetHeight;
const Xth = gameArea.offsetWidth-45;
let lives = 4;  // 기본 목숨 4개
let score = 0;
let isGameOver = false;
let autoShootInterval = null;

let playerX = 220;
let velocityX = 0;  // 속도
const acceleration = 0.5;  // 가속도
const friction = 0.1;      // 감속도 (관성)
const maxSpeed = 7;

let movingLeft = false;
let movingRight = false;

let shots = [];
let enemies = [];

let bonuses = [];
let bonusCount = 0;
let dragStartX = null;
let dragThreshold = 20; // 얼마나 움직여야 드래그로 인식할지 (픽셀)

let isDragging = false;
let lastTouchX = null;

function isMobile() {
  return window.innerWidth <= 900;
}

let speedFactor = 1;

if (isMobile()) {
  speedFactor = 0.5; // 모바일은 50% 속도
}

gameArea.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    lastTouchX = e.touches[0].clientX;
  }
});

gameArea.addEventListener("touchmove", (e) => {
  if (isDragging && e.touches.length === 1) {
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastTouchX;
    lastTouchX = currentX;

    // 플레이어 위치 갱신 (이동한 거리만큼)
    playerX += deltaX;

    // 화면 경계 제한
    if (playerX < 0) playerX = 0;
    if (playerX > Xth) playerX = Xth;

    player.style.left = playerX + "px";
  }
});

gameArea.addEventListener("touchend", () => {
  isDragging = false;
  lastTouchX = null;
});



// 목숨 UI 갱신 함수
function updateLives() {
  lifeBoard.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const lifeImg = document.createElement("img");
    lifeImg.src = "img/player.webp";
    lifeImg.style.width = "30px";   // 목숨 아이콘 크기 조절
    lifeImg.style.height = "30px";
    lifeImg.style.objectFit = "contain";
    lifeBoard.appendChild(lifeImg);
  }
}
function updateBonusBoard() {
  const bonusBoard = document.getElementById("bonusBoard");
  bonusBoard.innerHTML = ""; // 기존 아이콘 삭제

  for(let i = 0; i < bonusCount; i++) {
    const img = document.createElement("img");
    img.src = "img/bonus.webp";
    img.style.width = "30px";
    img.style.height = "30px";
    img.style.objectFit = "contain";
    bonusBoard.appendChild(img);
  }
}


function spawnBonus() {
  const bonus = document.createElement("div");
  bonus.className = "bonus";
  bonus.style.position = "absolute";  // 이거 꼭 있어야 움직임 보임
  bonus.style.left = Math.floor(Math.random() * Xth) + "px";
  bonus.style.top = "0px";
  bonus.style.width = "30px";
  bonus.style.height = "30px";
  bonus.style.backgroundImage = "url('img/bonus.webp')";
  bonus.style.backgroundSize = "contain";
  bonus.style.backgroundRepeat = "no-repeat";
  bonus.style.backgroundPosition = "center";
  gameArea.appendChild(bonus);

  bonuses.push({
    el: bonus,
    x: parseInt(bonus.style.left),
    y: 0
  });
}

// 키 누름 이벤트: 방향키 상태 저장
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    movingLeft = true;
  } else if (e.key === "ArrowRight") {
    movingRight = true;
  } else if (e.key === " " || e.key === "ArrowUp") {
    shoot();
  }
});

// 키 뗌 이벤트: 방향키 상태 해제
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    movingLeft = false;
  } else if (e.key === "ArrowRight") {
    movingRight = false;
  }
});
function shoot() {
  const baseX = playerX + 18; // 플레이어 총알 기본 x 위치
  const baseY = 50;           // 총알 시작 y 위치

  const maxShots = 5;         // 최대 5발 발사
  const spacing = 15;         // 총알 간격 (px)

  // bonusCount가 총알 수 증가량이므로, 실제 총알 수는 bonusCount+1 (기본 1발 + 보너스)
  const shotCount = Math.min(bonusCount + 1, maxShots);

  // 총알 위치 배열 생성 (중앙 기준으로 좌우 균등 배치)
  // 예: 3발 -> [-spacing, 0, spacing]
  //     4발 -> [-1.5*spacing, -0.5*spacing, 0.5*spacing, 1.5*spacing]
  //     5발 -> [-2*spacing, -spacing, 0, spacing, 2*spacing]

  const offsets = [];
  if (shotCount % 2 === 1) {
    // 홀수 개수: 중앙 0 기준 양쪽으로 대칭
    const midIndex = Math.floor(shotCount / 2);
    for (let i = 0; i < shotCount; i++) {
      offsets.push((i - midIndex) * spacing);
    }
  } else {
    // 짝수 개수: 중앙 두 발 사이 공간을 기준으로 좌우 배치
    const midIndex = shotCount / 2;
    for (let i = 0; i < shotCount; i++) {
      offsets.push((i - midIndex + 0.5) * spacing);
    }
  }

  offsets.forEach(offset => {
    createShot(baseX + offset, baseY);
  });
}

function createShot(x, y) {
  const shot = document.createElement("div");
  shot.className = "shot";
  shot.style.left = x + "px";
  shot.style.bottom = y + "px";
  gameArea.appendChild(shot);
  shots.push(shot);
}



// 적 생성 함수
function spawnEnemy() {
  // 적 종류 랜덤 선택 (1~9)
  const type = Math.floor(Math.random() * 9) + 1;
  
  const enemyWidth = 30;
  const gap = enemyWidth * 0.2; // 20% 간격
  
  // 최대 X 위치 계산 (게임 영역 너비 480px 가정, 적 위치는 0~Xth 사이)
  // 5개 적과 4개 간격 = 5 * enemyWidth + 4 * gap 총 너비
  const totalWidth = 5 * enemyWidth + 4 * gap;

  // 시작 x 위치 (적이 화면 밖으로 나가지 않게 랜덤 결정)
  const startX = Math.floor(Math.random() * (450 - totalWidth));

  for (let i = 0; i < 5; i++) {
    const enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.dataset.type = type;

    const x = startX + i * (enemyWidth + gap);
    enemy.style.left = x + "px";
    enemy.style.top = "0px";
    enemy.style.backgroundImage = `url('img/enemy${type}.webp')`;
    enemy.style.width = enemyWidth + "px";
    enemy.style.height = enemyWidth + "px";

    gameArea.appendChild(enemy);

    enemies.push({
      el: enemy,
      type: type,
      x: x,
      y: 0,
      moveDir: 1,
      stopCounter: 0,
      angle: 0,
      jumpCooldown: 0,
      jumpFrame: 0
    });
  }
}



// 게임 루프: 위치, 속도, 충돌 체크
function gameLoop() {
  if (isGameOver) return; // 게임 오버면 루프 멈춤
  // 플레이어 가속, 감속 처리
  if (!isDragging) {
    if (movingLeft) {
      velocityX -= acceleration;
    } else if (movingRight) {
      velocityX += acceleration;
    } else {
      // 관성: 감속
      if (velocityX > 0) {
        velocityX -= friction;
        if (velocityX < 0) velocityX = 0;
      } else if (velocityX < 0) {
        velocityX += friction;
        if (velocityX > 0) velocityX = 0;
      }
    }
  }

  // 속도 제한
  if (velocityX > maxSpeed) velocityX = maxSpeed;
  if (velocityX < -maxSpeed) velocityX = -maxSpeed;

  // 위치 업데이트
  playerX += velocityX;

  // 화면 경계 체크
  if (playerX < 0) {
    playerX = 0;
    velocityX = 0;
  } else if (playerX > Xth) {
    playerX = Xth;
    velocityX = 0;
  }

  player.style.left = playerX + "px";

  // 총알 이동 (뒤에서 앞으로 순회)
for (let i = shots.length - 1; i >= 0; i--) {
  let shot = shots[i];
  let y = parseInt(shot.style.bottom);
  if (y > Yth) {
    shot.remove();
    shots.splice(i, 1);
  } else {
    shot.style.bottom = y + 5 + "px";
  }
}

  // 적 이동
  enemies.forEach((enemyObj, i) => {
    let { el, type, x, y, moveDir, stopCounter } = enemyObj;
  
    switch(type) {
      case 1: // 일반 적
        y += 2 * speedFactor;
        break;
    
      case 2: // 지그재그 적
        x += 3 * moveDir * speedFactor;
        y += 1.5 * speedFactor;
        if (x <= 0 || x >= Xth) moveDir *= -1;
        break;
    
      case 3:
        y += 5 * speedFactor;
        break;
    
      case 4:
        if (stopCounter < 100) {
          stopCounter++;
        } else {
          y += 3 * speedFactor;
        }
        break;
    
      case 5:
        x += 4 * moveDir * speedFactor;
        if (x <= 0 || x >= Xth) moveDir *= -1;
        y += 0.5 * speedFactor;
        break;
    
      case 6:
        if (stopCounter < 50) {
          y += 6 * speedFactor;
          stopCounter++;
        } else if (stopCounter < 100) {
          stopCounter++;
        } else {
          y += 6 * speedFactor;
        }
        break;
    
      case 7:
        if (!enemyObj.angle) enemyObj.angle = 0;
        enemyObj.angle += 0.1;
        x += Math.cos(enemyObj.angle) * 3 * speedFactor;
        y += 2 * speedFactor;
        break;
    
      case 8:
        if (!enemyObj.jumpCooldown) enemyObj.jumpCooldown = 0;
        if (enemyObj.jumpCooldown === 0) {
          moveDir = Math.random() < 0.5 ? -1 : 1;
          x += 50 * moveDir * speedFactor;
          enemyObj.jumpCooldown = 30;
        } else {
          enemyObj.jumpCooldown--;
          y += 1.5 * speedFactor;
        }
        break;
    
      case 9:
        if (!enemyObj.jumpFrame) enemyObj.jumpFrame = 0;
        if (enemyObj.jumpFrame < 30) {
          y -= 4 * speedFactor;
          enemyObj.jumpFrame++;
        } else {
          y += 8 * speedFactor;
        }
        break;
    }
    
  
    // 위치 업데이트
    enemyObj.x = x;
    enemyObj.y = y;
    enemyObj.moveDir = moveDir;
    enemyObj.stopCounter = stopCounter;
  
    el.style.left = x + "px";
    el.style.top = y + "px";
  
    // 화면 아래로 벗어나면 제거
    if (y > Yth) {
      el.remove();
      enemies.splice(i, 1);
    }
    
    const enemyRect = enemyObj.el.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    ) {
      // 적 제거
      enemyObj.el.remove();
      enemies.splice(i, 1);

          // 플레이어 피해 처리
      if (bonusCount > 0) {
        // 보너스가 있으면 보너스 하나 소모
        bonusCount--;
        updateBonusBoard();
      } else {
        // 보너스 없으면 목숨 깎기
        lives--;
        updateLives();
        
        if (lives <= 0) {
          gameOver();
          // 게임 재시작 또는 종료 처리
        }
      }
    }
  });
  

    // 충돌 체크 (뒤에서 앞으로 순회)
  for (let si = shots.length -1; si >= 0; si--) {
    let shot = shots[si];
    const sRect = shot.getBoundingClientRect();

    for (let ei = enemies.length -1; ei >=0; ei--) {
      let enemy = enemies[ei].el;
      const eRect = enemy.getBoundingClientRect();

      if (
        sRect.left < eRect.right &&
        sRect.right > eRect.left &&
        sRect.top < eRect.bottom &&
        sRect.bottom > eRect.top
      ) {
        shot.remove();
        enemy.remove();
        shots.splice(si, 1);
        enemies.splice(ei, 1);

        score += 10;
        scoreBoard.textContent = `점수: ${score}`;

        break; // 이 총알은 제거됐으니 inner 루프 종료
      }
    }
  }

  // 보너스 이동 & 충돌 체크
  bonuses.forEach((bonusObj, i) => {
    let { el, x, y } = bonusObj;
    y += 5; //보너스 내려오는 속도
    bonusObj.y = y;
    el.style.top = y + "px";

    if (y > Yth) {
      el.remove();
      bonuses.splice(i, 1);
    } else {
      // 충돌 체크 (플레이어와)
      const pRect = player.getBoundingClientRect();
      const bRect = el.getBoundingClientRect();

      if (
        pRect.left < bRect.right &&
        pRect.right > bRect.left &&
        pRect.top < bRect.bottom &&
        pRect.bottom > bRect.top
      ) {
        el.remove();
        bonuses.splice(i, 1);

        if (bonusCount < 5) {
          bonusCount++;
          updateBonusBoard();
        }
      }
    }
  });

  requestAnimationFrame(gameLoop);
}

player.style.backgroundImage = "url('img/player.webp')";
let enemyInterval = setInterval(spawnEnemy, 1000);
let bonusInterval = setInterval(spawnBonus, 10000);
gameLoop();
updateLives();

if (isMobile()) {
  autoShootInterval = setInterval(() => {
    if (!isGameOver) {
      shoot();
    }
  }, 250); // 0.5초마다 자동 사격
}


function gameOver() {
  isGameOver = true; // 루프 정지
  clearInterval(enemyInterval);
  clearInterval(bonusInterval);
  document.getElementById("finalScore").textContent = `최종 점수: ${score}`;
  document.getElementById("gameOverOverlay").style.display = "flex";

  // 자동 사격 정지
  if (autoShootInterval) {
    clearInterval(autoShootInterval);
    autoShootInterval = null;
  }
}

document.getElementById("restartBtn").addEventListener("click", () => {
  isGameOver = false; // 루프가 다시 돌 수 있게 설정

  // 자동 사격 재시작 (모바일일 경우)
  if (isMobile()) {
    autoShootInterval = setInterval(() => {
      if (!isGameOver) {
        shoot();
      }
    }, 500);
  }
  // 점수 초기화
  score = 0;
  scoreBoard.textContent = `점수: ${score}`;

  // UI 초기화
  document.getElementById("gameOverOverlay").style.display = "none";

  // 목숨, 보너스 초기화
  lives = 4;
  bonusCount = 0;
  updateLives();
  updateBonusBoard();

  // 플레이어 위치 및 속도 초기화
  playerX = 220;
  velocityX = 0;
  player.style.left = playerX + "px";

  // 적, 총알, 보너스 제거
  enemies.forEach(e => e.el.remove());
  enemies = [];

  shots.forEach(s => s.remove());
  shots = [];

  bonuses.forEach(b => b.el.remove());
  bonuses = [];

  // 🟢 게임 루프 다시 시작!
  requestAnimationFrame(gameLoop);

  // 🟢 인터벌 다시 등록
  enemyInterval = setInterval(spawnEnemy, 1000);
  bonusInterval = setInterval(spawnBonus, 10000);
});

