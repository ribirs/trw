  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src = 'img/icon.png';
let launcherColor = "black";  // 기본 발사대 색상
let canFire = true;            // 발사 가능 여부


bgImage.onload = () => {
  // 캔버스 크기 맞추기
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 게임 루프 내에 배경 그리기
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 🔽 배경 이미지 투명도 조절
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.restore();
      // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
      drawBricks();
      drawLauncher();
      updateAngle();
  
      balls.forEach((ball) => {
        ball.update();
        ball.draw();
      });
  
      balls = balls.filter(ball => ball.active);
  
      if (balls.length === 0) {
        canFire = true;
        launcherColor = "black";  // 발사대 색상 복구
      }
      ctx.fillStyle = "#000";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(`Score: ${score}`, offsetX + 40, offsetY + 10);
      ctx.fillText(`Stage: ${stage}`, offsetX + 200, offsetY + 10);
      const remainingBricks = bricks.flat().filter(b => b.hp > 0);
      if (remainingBricks.length === 0 && balls.length === 0) {
        stage++;
        canFire = true;
        initBricks(); // 다음 맵 생성
    }
    requestAnimationFrame(draw);
  }

  draw();
};

  let marginRatio = 0.05;
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let score = 0;
  let stage = 1;
  let isDragging = false;
  let dragStartX = 0;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const gameWidth = canvasWidth * (1 - 2 * marginRatio);
  const gameHeight = canvasHeight * (1 - 2 * marginRatio);
  const offsetX = canvasWidth * marginRatio;
  const offsetY = canvasHeight * marginRatio;


  // Option
  const optionBtn = document.getElementById("optionBtn");
const optionModal = document.getElementById("optionModal");
const closeOption = document.getElementById("closeOption");
const ballCountRange = document.getElementById("ballCountRange");
const ballCountValue = document.getElementById("ballCountValue");
const ballSpeedRange = document.getElementById("ballSpeedRange");
const ballSpeedValue = document.getElementById("ballSpeedValue");
const ballSizeRange = document.getElementById("ballSizeRange");
const ballSizeValue = document.getElementById("ballSizeValue");


// 옵션 조정
let ballCount = 10; // 초기값
let ballSpeed = 2.5;  // 초기 공 속도
let ballSize = 10;
ballSizeRange.value = ballSize;
ballSizeValue.textContent = ballSize;
let ballColor = "#0095DD";  // 기본 공 색상
const backgroundColor = "#000000";  // 예: 검은색 배경 (실제 배경색으로 교체하세요)

optionBtn.addEventListener("click", () => {
  optionModal.style.display = "block";
});

closeOption.addEventListener("click", () => {
  optionModal.style.display = "none";
});

// 슬라이더 값 변경시
ballCountRange.addEventListener("input", (e) => {
  ballCount = parseInt(e.target.value);
  ballCountValue.textContent = ballCount;
});
// 공 갯수 슬라이더 기존 코드 유지
ballCountRange.addEventListener("input", (e) => {
  ballCount = parseInt(e.target.value);
  ballCountValue.textContent = ballCount;
});

// 공 속도 슬라이더 새로 추가
ballSpeedRange.addEventListener("input", (e) => {
  ballSpeed = parseFloat(e.target.value);
  ballSpeedValue.textContent = ballSpeed.toFixed(1);
});
// 공 크기
ballSizeRange.addEventListener("input", (e) => {
  ballSize = parseFloat(e.target.value);
  ballSizeValue.textContent = ballSize.toFixed(1);
});
const ballColorPicker = document.getElementById("ballColorPicker");
ballColorPicker.addEventListener("input", (e) => {
    ballColor = e.target.value;
});


  // 발사대
  const launcherLength = 40;
  const launcherBaseX = offsetX + gameWidth / 2;
  const launcherBaseY = offsetY + gameHeight - 20;
  let launcherAngle = -90;
  const maxAngle = 75;

  // 색상별 체력 배열
  const hpColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"];

  // 모바일 & PC 방향 조정용 드래그
canvas.addEventListener("touchstart", (e) => {
  isDragging = true;
  dragStartX = e.touches[0].clientX;
});

canvas.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const delta = currentX - dragStartX;
  dragStartX = currentX;
  launcherAngle += delta * 0.2;
  launcherAngle = Math.max(-90 - maxAngle, Math.min(-90 + maxAngle, launcherAngle));
});

canvas.addEventListener("touchend", () => {
  isDragging = false;
});

// 마우스도 동일하게 지원 (PC 환경 호환용)
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStartX = e.clientX;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const currentX = e.clientX;
  const delta = currentX - dragStartX;
  dragStartX = currentX;
  launcherAngle += delta * 0.2;
  launcherAngle = Math.max(-90 - maxAngle, Math.min(-90 + maxAngle, launcherAngle));
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

  // 벽돌 설정
  const brickRowCount = 5;
  const brickColumnCount = 7;
  const brickWidth = gameWidth / 10;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = offsetY + 30;
  const brickOffsetLeft = offsetX + 30;

  let bricks = [];

  function initBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        let maxHp = Math.min(1 + stage, 7); // stage 올라갈수록 최대 hp 증가 (최대 7)
        const hp = Math.floor(Math.random() * maxHp) + 1;
        bricks[c][r] = {
          x: 0,
          y: 0,
          hp: hp
        };
      }
    }
  }

  class Ball {
    constructor(x, y, angleDeg) {
      this.speed = 5 * ballSpeed;  // ballSpeed는 외부 변수로 1~5 사이 조절 가능
      const angleRad = angleDeg * Math.PI / 180;
  
      this.x = x;
      this.y = y;
  
      this.radius = ballSize;
  
      this.dx = Math.cos(angleRad) * this.speed;
      this.dy = Math.sin(angleRad) * this.speed;
  
      this.active = true;
    }
  
    update() {
      this.x += this.dx;
      this.y += this.dy;
  
      // 좌우 벽 반사
      if (this.x < offsetX + this.radius || this.x > offsetX + gameWidth - this.radius) {
        this.dx *= -1;
      }
  
      // 천장 반사
      if (this.y - this.radius <= offsetY) {
        this.dy *= -1;
      }
  
      // 바닥 도달 → 공 회수
      if (this.y > launcherBaseY + 30) {
        this.active = false;
      }
  
      // 벽돌 충돌 검사
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.hp > 0) {
            if (
              this.x > b.x &&
              this.x < b.x + brickWidth &&
              this.y > b.y &&
              this.y < b.y + brickHeight
            ) {
              b.hp--;
              score += stage;
              this.dy *= -1;
            }
          }
        }
      }
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      // 3D 느낌용 라디얼 그라데이션
      const grad = ctx.createRadialGradient(
        this.x - this.radius / 3, this.y - this.radius / 3, this.radius * 0.1,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, "#ffffff"); // 중심 하이라이트
      grad.addColorStop(0.3, ballColor);
      grad.addColorStop(1, darkenColor(ballColor, 0.4)); // 가장자리 어둡게

      ctx.fillStyle = grad;
      ctx.fill();
      ctx.closePath();

    }
  }
  function darkenColor(hex, factor) {
    const { r, g, b } = hexToRgb(hex);
    const darken = (c) => Math.max(0, Math.floor(c * (1 - factor)));
    return rgbToHex(darken(r), darken(g), darken(b));
  }
  
  

  let balls = [];

  function fireBalls() {
    if (!canFire) return;
  
    canFire = false;
    launcherColor = "red"; // 발사대 빨간색으로 변경
    drawLauncher();
    balls = [];
    for (let i = 0; i < ballCount; i++) {
      setTimeout(() => {
        balls.push(new Ball(launcherBaseX, launcherBaseY, launcherAngle));
      }, i * 150); // 발사 간격 0.3초
    }
  }

  // 방향키 조작
  let keys = {};
  document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    if (e.code === "Space" && canFire) {
      fireBalls();
    }
  });
  canvas.addEventListener("dblclick", (e) => {
    if (canFire) fireBalls();
  });
  document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });
  let lastTap = 0;

canvas.addEventListener('touchend', (e) => {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  if (tapLength < 300 && tapLength > 0) {
    // 두 번째 터치가 300ms 이내에 발생하면 더블탭으로 간주
    if (canFire) fireBalls();
    e.preventDefault();
  }
  lastTap = currentTime;
});


  function drawLauncher() {
    const angleRad = launcherAngle * Math.PI / 180;
    const endX = launcherBaseX + launcherLength * Math.cos(angleRad);
    const endY = launcherBaseY + launcherLength * Math.sin(angleRad);
  
    // 대포 몸체 (선)
    ctx.fillStyle = launcherColor;
    ctx.beginPath();
    ctx.moveTo(launcherBaseX, launcherBaseY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
  
    // 대포 받침대 (둥근 원)
    ctx.beginPath();
    ctx.arc(launcherBaseX, launcherBaseY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    
  // 🔥 조준선 추가
  const aimLength = 3000; // 조준선 길이
  const aimX = launcherBaseX + aimLength * Math.cos(angleRad);
  const aimY = launcherBaseY + aimLength * Math.sin(angleRad);

  ctx.beginPath();
  ctx.moveTo(launcherBaseX, launcherBaseY);
  ctx.lineTo(aimX, aimY);
  ctx.strokeStyle = "rgba(255,0,0,0.4)"; // 반투명 빨간색
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]); // 점선
  ctx.stroke();
  ctx.setLineDash([]); // 점선 초기화
  ctx.closePath();
  }
  

  function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const b = bricks[c][r];
        if (b.hp > 0) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          b.x = brickX;
          b.y = brickY;

          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = hpColors[b.hp - 1];
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function updateAngle() {
    if (keys["ArrowLeft"]) {
      launcherAngle = Math.max(launcherAngle - 2, -90 - maxAngle);
    }
    if (keys["ArrowRight"]) {
      launcherAngle = Math.min(launcherAngle + 2, -90 + maxAngle);
    }
  }

  
  // 색상 헥스 코드 -> RGB 객체 변환
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// RGB -> 헥스 문자열 변환
function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, '0');
  return "#" + toHex(r) + toHex(g) + toHex(b);
}



  initBricks();
  draw();

  window.addEventListener("resize", () => location.reload());