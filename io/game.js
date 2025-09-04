// 문서 전체에서 터치 드래그 기본 동작(스크롤 등) 방지
document.body.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, { passive: false });

function isMobile() {
  return window.innerWidth <= 900;
}
let speedFactor = 1;

if (isMobile()) {
  speedFactor = 0.5; // 모바일은 50% 속도
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🔸 스테이지 저장 로드
let stage = parseInt(localStorage.getItem("stage")) || 1;

const baseAI = 5;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  color: "#3498db",
  speed: 5 * speedFactor
};

const mouse = {
  x: player.x,
  y: player.y
};

const dots = [];
const aiEnemies = [];

function updateStageDisplay() {
  document.getElementById("stageInfo").innerText = `Stage: ${stage}`;
  localStorage.setItem("stage", stage);
}

function getBackgroundColor(stage) {
  const maxStage = 10;
  const t = Math.min(stage - 1, maxStage - 1) / (maxStage - 1); // 0~1
  const value = Math.round(255 * (1 - t)); // 10 → 0
  return `rgb(${value}, ${value}, ${value})`;
}

function spawnDot() {
  const radius = Math.random() * 10 + 5;
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: radius,
    color: "#2ecc71"
  });
}

function getRandomAIColor() {
  while (true) {
    const hue = Math.floor(Math.random() * 360);
    // 파랑(240도 ±30), 초록(120도 ±30) 영역 제외
    if (
      (hue > 90 && hue < 150) || // 초록 영역
      (hue > 210 && hue < 270)   // 파랑 영역
    ) {
      continue;
    }
    return `hsl(${hue}, 70%, 60%)`;
  }
}

// spawnAI 함수 수정: color 부분 변경
function spawnAI(baseSize = null) {
  const baseSpeed = 1.5 + Math.random();
  const scaledSpeed = baseSpeed * (1 + 0.1 * (stage - 1));
  const radius = baseSize ? baseSize * 1.2 : Math.random() * 5 + 10;
  aiEnemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: radius,
    color: getRandomAIColor(), // 여기를 고정색에서 랜덤색으로 변경
    speed: scaledSpeed * speedFactor,
    angle: Math.random() * Math.PI * 2
  });
}


function initStage() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.radius = 20;

  // 스테이지에 따라 속도 감소, 최소 2 이상
  player.speed = Math.max(1.5, (5 - (stage - 1) * 0.25) * speedFactor);

  dots.length = 0;
  aiEnemies.length = 0;

  for (let i = 0; i < 30; i++) spawnDot();
  for (let i = 0; i < baseAI + (stage - 1); i++) spawnAI();

  updateStageDisplay();
}

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
}, { passive: false });

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function showMessage(text, onFinish) {
  const msg = document.getElementById("message");
  msg.innerText = text;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
    onFinish?.();
  }, 5000);
}

function handleGameEnd(win) {
  if (win) {
    stage += 1;
    showMessage("🎉 YOU WIN!", () => {
      initStage();
    });
  } else {
    if (stage > 1) stage -= 1;
    showMessage("😢 YOU LOSE!", () => {
      initStage();
    });
  }
}

function update() {
  const dx = mouse.x - player.x;
  const dy = mouse.y - player.y;
  const angle = Math.atan2(dy, dx);
  const dist = distance(player.x, player.y, mouse.x, mouse.y);
  if (dist > 1) {
    player.x += Math.cos(angle) * player.speed;
    player.y += Math.sin(angle) * player.speed;
  }

  for (let i = dots.length - 1; i >= 0; i--) {
    const dot = dots[i];
    const d = distance(player.x, player.y, dot.x, dot.y);
    if (d < player.radius + dot.radius && player.radius > dot.radius) {
      player.radius += dot.radius * 0.1;
      dots.splice(i, 1);
      spawnDot();
    }
  }

  aiEnemies.forEach((ai, index) => {
    // 상태 머신용 상태 없으면 초기화
    if (!ai.state) ai.state = "searching"; // searching, attacking, escaping
    if (!ai.target) ai.target = null;
  
    // 플레이어와 거리, 크기 계산
    const dToPlayer = distance(player.x, player.y, ai.x, ai.y);
    const playerBigger = player.radius > ai.radius;
    const aiBigger = ai.radius > player.radius;
  
    // 주변 도트 중 위험하지 않은 가장 가까운 먹이 찾기
    let closestSafeDot = null;
    let minDist = Infinity;
  
    dots.forEach(dot => {
      const distDot = distance(ai.x, ai.y, dot.x, dot.y);
  
      // 위험 판단: 플레이어나 큰 AI가 도트와 너무 가까우면 위험하다고 간주
      const dangerRange = 150;
      const dangerNearby =
        distance(player.x, player.y, dot.x, dot.y) < dangerRange && playerBigger;
  
      // 다른 AI 중 나보다 크고 도트 근처에 있는 AI 탐색
      let otherAIDanger = false;
      aiEnemies.forEach(otherAI => {
        if (otherAI !== ai && otherAI.radius > ai.radius + 5) {
          if (distance(otherAI.x, otherAI.y, dot.x, dot.y) < dangerRange) {
            otherAIDanger = true;
          }
        }
      });
  
      if (distDot < minDist && !dangerNearby && !otherAIDanger) {
        minDist = distDot;
        closestSafeDot = dot;
      }
    });
  
    // 상태 전환 로직
    switch (ai.state) {
      case "searching":
        if (aiBigger) {
          ai.state = "attacking";
          ai.target = player;
        } else if (playerBigger && dToPlayer <= 350) {
          ai.state = "escaping";
          ai.target = player;
        } else if (closestSafeDot) {
          ai.target = closestSafeDot;
        } else {
          ai.target = null;
        }
        break;
  
      case "attacking":
        if (!aiBigger) {
          ai.state = "searching";
          ai.target = null;
        }
        break;
  
      case "escaping":
        if (!playerBigger || dToPlayer > 350) {
          ai.state = "searching";
          ai.target = null;
        }
        break;
    }
  
    // 이동 처리
    if (ai.target) {
      const angleToTarget = Math.atan2(ai.target.y - ai.y, ai.target.x - ai.x);
      let speedMultiplier = 1;
  
      if (ai.state === "escaping") speedMultiplier = 1.5;
      else if (ai.state === "attacking") speedMultiplier = 1.2;
      else speedMultiplier = 1;
  
      if (ai.state === "escaping") {
        // 도망갈 땐 타겟 반대 방향
        ai.x -= Math.cos(angleToTarget) * ai.speed * speedMultiplier;
        ai.y -= Math.sin(angleToTarget) * ai.speed * speedMultiplier;
      } else {
        // 먹이나 플레이어 향해 이동
        ai.x += Math.cos(angleToTarget) * ai.speed * speedMultiplier;
        ai.y += Math.sin(angleToTarget) * ai.speed * speedMultiplier;
      }
    } else {
      // 목표 없으면 랜덤 방향 이동
      ai.x += Math.cos(ai.angle) * ai.speed;
      ai.y += Math.sin(ai.angle) * ai.speed;
    }
  
    // 맵 밖으로 나가면 리스폰 (기존 코드)
    if (
      ai.x < -ai.radius || ai.x > canvas.width + ai.radius ||
      ai.y < -ai.radius || ai.y > canvas.height + ai.radius
    ) {
      aiEnemies.splice(index, 1);
      spawnAI(ai.radius);
      return;
    }
  
    // AI가 도트 먹기 (기존 코드)
    for (let i = dots.length - 1; i >= 0; i--) {
      const dot = dots[i];
      const d = distance(ai.x, ai.y, dot.x, dot.y);
      if (d < ai.radius + dot.radius && ai.radius > dot.radius) {
        ai.radius += dot.radius * 0.05;
        dots.splice(i, 1);
        spawnDot();
      }
    }
  
    // AI와 플레이어 충돌 처리 (기존 코드)
    if (dToPlayer < ai.radius + player.radius) {
      if (player.radius > ai.radius) {
        player.radius += ai.radius * 0.2;
        aiEnemies.splice(index, 1);
        spawnAI();
      } else {
        player.radius = -9999;
        handleGameEnd(false);
      }
    }
  });
  
  

  const diagonal = Math.hypot(canvas.width, canvas.height);
  if (player.radius > diagonal / 2) {
    player.radius = -9999;
    handleGameEnd(true);
  }
}

function drawCircle(obj) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = obj.color;
  ctx.fill();
}
function drawCircleWithRadius(obj) {
  // 원 그리기
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = obj.color;
  ctx.fill();

  // 텍스트 스타일 설정
  ctx.fillStyle = "white";           // 글자색 (필요시 변경)
  ctx.font = `${obj.radius}px Arial`;  // 반지름 크기에 비례하는 글자 크기
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 반지름 숫자 출력 (반올림)
  ctx.fillText(Math.round(obj.radius), obj.x, obj.y);
}

function draw() {
  ctx.fillStyle = getBackgroundColor(stage);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  dots.forEach(drawCircle);           // 먹이는 숫자 표시 안 하려면 그냥 두기
  aiEnemies.forEach(drawCircleWithRadius);  // AI에는 숫자 표시
  if (player.radius > 0) drawCircleWithRadius(player); // 플레이어도 숫자 표시
}


function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

initStage();
loop();
