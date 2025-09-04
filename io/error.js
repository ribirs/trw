let gameOver = false;
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

function spawnAI(baseSize = null) {
  const baseSpeed = 1.5 + Math.random();
  const scaledSpeed = baseSpeed * (1 + 0.1 * (stage - 1));
  const radius = baseSize ? baseSize * 1.2 : Math.random() * 10 + 15;

  aiEnemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: radius,
    color: getRandomAIColor(),  // 랜덤 AI 색상 지정
    speed: scaledSpeed,
    angle: Math.random() * Math.PI * 2,
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
  if (gameOver) return; // 중복 호출 방지
  gameOver = true;
  if (win) {
    stage += 1;
    showMessage("🎉 YOU WIN!", () => {
      gameOver = false;
      initStage();
    });
  } else {
    if (stage > 1) stage -= 1;
    showMessage("😢 YOU LOSE!", () => {
      gameOver = false;
      initStage();
    });
  }
}

function update() {
  if (gameOver) return; // 게임 끝나면 업데이트 중단
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
    // 상태 초기화 (위에서 한 거 유지)
    if (!ai.state) ai.state = "searching";
    if (!ai.target) ai.target = null;
  
    // 플레이어와 거리, 크기 계산
    const dToPlayer = distance(player.x, player.y, ai.x, ai.y);
    const playerBigger = player.radius > ai.radius + 5;
    const aiBigger = ai.radius > player.radius + 5;
  
    // 주변 도트 중 안전한 먹이 찾기 (이전 코드 유지)
    let closestSafeDot = null;
    let minDist = Infinity;
  
    dots.forEach(dot => {
      const distDot = distance(ai.x, ai.y, dot.x, dot.y);
      const dangerRange = 150;
      const dangerNearby =
        distance(player.x, player.y, dot.x, dot.y) < dangerRange && playerBigger;
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
  
    // AI끼리 거리 및 크기 비교 (가장 가까운 공격 가능한 AI 찾기)
    let attackableAI = null;
    let minAIDist = Infinity;
    aiEnemies.forEach(otherAI => {
      if (otherAI !== ai && ai.radius > otherAI.radius + 5) {
        const distToOther = distance(ai.x, ai.y, otherAI.x, otherAI.y);
        if (distToOther < minAIDist) {
          minAIDist = distToOther;
          attackableAI = otherAI;
        }
      }
    });
  
    // 상태 전환 로직 수정 (AI 공격 대상이 플레이어 OR 다른 AI)
    switch (ai.state) {
      case "searching":
        if (playerBigger === false && dToPlayer < 500) {
          ai.state = "attacking";
          ai.target = player;
        } else if (attackableAI && distance(ai.x, ai.y, attackableAI.x, attackableAI.y) < 500) {
          ai.state = "attacking";
          ai.target = attackableAI;
        } else if (playerBigger && dToPlayer < 300) {
          ai.state = "escaping";
          ai.target = player;
        } else if (closestSafeDot) {
          ai.target = closestSafeDot;
        } else {
          ai.target = null;
        }
        break;
    
      case "attacking":
        if (!ai.target || ai.target.radius === undefined || ai.target.radius <= 0) {
          ai.state = "searching";
          ai.target = null;
        } else if (ai.target.radius > ai.radius + 5) {
          ai.state = "searching";
          ai.target = null;
        } else if (distance(ai.x, ai.y, ai.target.x, ai.target.y) > 600) {
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
        ai.x -= Math.cos(angleToTarget) * ai.speed * speedMultiplier;
        ai.y -= Math.sin(angleToTarget) * ai.speed * speedMultiplier;
      } else {
        ai.x += Math.cos(angleToTarget) * ai.speed * speedMultiplier;
        ai.y += Math.sin(angleToTarget) * ai.speed * speedMultiplier;
      }
    } else {
      // 목표 없으면 랜덤 이동
      // 각도 변화폭을 키우고, 
      // 이동 거리 최소 보장
      const angleChange = (Math.random() - 0.5) * 0.3; // -0.15 ~ +0.15 라디안
      ai.angle += angleChange;
    
      // 최소 속도 보장 (speed가 너무 작으면 강제로 이동 보장)
      const moveX = Math.cos(ai.angle) * ai.speed;
      const moveY = Math.sin(ai.angle) * ai.speed;
    
      // 만약 이동량이 너무 작으면 각도를 완전히 반전시켜서 움직임 강제
      if (Math.abs(moveX) < 0.1 && Math.abs(moveY) < 0.1) {
        ai.angle += Math.PI; // 180도 방향 전환
      }
    
      ai.x += Math.cos(ai.angle) * ai.speed;
      ai.y += Math.sin(ai.angle) * ai.speed;
    }
  
    // 맵 밖으로 나가면 리스폰 (기존 코드)
    if (
      ai.x < -ai.radius || ai.x > canvas.width + ai.radius ||
      ai.y < -ai.radius || ai.y > canvas.height + ai.radius
    ) {
      aiEnemies.splice(index, 1);
      spawnAI(ai.radius * 1.2);
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
  
    // AI끼리 충돌 처리 및 공격
    aiEnemies.forEach((otherAI, otherIndex) => {
      if (otherAI !== ai) {
        const d = distance(ai.x, ai.y, otherAI.x, otherAI.y);
        if (d < ai.radius + otherAI.radius) {
          if (ai.radius > otherAI.radius) {
            // ai가 otherAI를 잡음
            ai.radius += otherAI.radius * 0.2;
            aiEnemies.splice(otherIndex, 1);
            // 리스폰 시 80% 크기로 다시 생성
            spawnAI(otherAI.radius * 0.8);
          } else if (ai.radius < otherAI.radius) {
            // otherAI가 ai를 잡음 (현재 루프 내서는 처리 안함, 다음 루프에서 처리됨)
          }
        }
      }
    });
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
  // 예시: 플레이어
  player.color = "blue";
  drawCircle(player);

  // 예시: 먹이
  dots.forEach(dot => {
    dot.color = "green";
    drawCircle(dot);
  });

  // AI들 그리기
  aiEnemies.forEach(ai => {
    drawCircle(ai); // ai.color가 fillStyle로 적용됨
  });

  update();
  draw();
  requestAnimationFrame(loop);
}

initStage();
loop();
