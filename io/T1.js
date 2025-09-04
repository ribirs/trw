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
  speed: 5
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
  const maxStage = 25;
  const t = Math.min(stage - 1, maxStage - 1) / (maxStage - 1); // 0~1
  const value = Math.round(255 * (1 - t)); // 255 → 0
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

function spawnAI(baseSize = null) {
  const baseSpeed = 1.5 + Math.random();
  const scaledSpeed = baseSpeed * (1 + 0.1 * (stage - 1));
  const radius = baseSize ? baseSize * 1.2 : Math.random() * 10 + 15;
  aiEnemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: radius,
    color: "#e74c3c",
    speed: scaledSpeed,
    angle: Math.random() * Math.PI * 2
  });
}

function initStage() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.radius = 20;

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
    const dToPlayer = distance(player.x, player.y, ai.x, ai.y);
    const angleToPlayer = Math.atan2(player.y - ai.y, player.x - ai.x);
  
    // 주변 도트 중 가장 가까운 것 찾기
    let closestDot = null;
    let minDotDist = Infinity;
    for (const dot of dots) {
      const distDot = distance(ai.x, ai.y, dot.x, dot.y);
      if (distDot < minDotDist) {
        minDotDist = distDot;
        closestDot = dot;
      }
    }
  
    if (closestDot) {
      const angleToDot = Math.atan2(closestDot.y - ai.y, closestDot.x - ai.x);
      
      // AI가 플레이어보다 크면 플레이어 쫓음 (기존 행동)
      if (ai.radius > player.radius + 5) {
        ai.x += Math.cos(angleToPlayer) * ai.speed;
        ai.y += Math.sin(angleToPlayer) * ai.speed;
      }
      // AI가 작으면 플레이어 피함
      else if (ai.radius < player.radius - 5) {
        ai.x -= Math.cos(angleToPlayer) * ai.speed;
        ai.y -= Math.sin(angleToPlayer) * ai.speed;
      } 
      // 비슷할 땐 먹이(도트)를 향해 적극적으로 이동
      else {
        // 도트 방향으로 이동 속도 조금 더 빠르게
        ai.x += Math.cos(angleToDot) * ai.speed * 1.3;
        ai.y += Math.sin(angleToDot) * ai.speed * 1.3;
      }
    } else {
      // 도트가 없으면 기존 무작위 이동
      ai.x += Math.cos(ai.angle) * ai.speed;
      ai.y += Math.sin(ai.angle) * ai.speed;
    }
  
    // (아래는 기존 코드 그대로 유지)
    if (
      ai.x < -ai.radius || ai.x > canvas.width + ai.radius ||
      ai.y < -ai.radius || ai.y > canvas.height + ai.radius
    ) {
      aiEnemies.splice(index, 1);
      spawnAI(ai.radius);
      return;
    }
  
    for (let i = dots.length - 1; i >= 0; i--) {
      const dot = dots[i];
      const d = distance(ai.x, ai.y, dot.x, dot.y);
      if (d < ai.radius + dot.radius && ai.radius > dot.radius) {
        ai.radius += dot.radius * 0.05;
        dots.splice(i, 1);
        spawnDot();
      }
    }
  
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

function draw() {
  // 🔸 배경색 설정
  ctx.fillStyle = getBackgroundColor(stage);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  dots.forEach(drawCircle);
  aiEnemies.forEach(drawCircle);
  if (player.radius > 0) drawCircle(player);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

initStage();
loop();
