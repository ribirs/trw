
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initBricks();
    });

    const marginRatio = 0.05;
    const offsetX = canvas.width * marginRatio;
    const offsetY = canvas.height * marginRatio;
    const gameWidth = canvas.width * (1 - 2 * marginRatio);
    const gameHeight = canvas.height * (1 - 2 * marginRatio);

    let score = 0;
    let stage = 1;
    let isDragging = false;
    let dragStartX = 0;
    let canFire = true;
    let launcherColor = "black";
    let balls = [];

    const ballCountRange = document.getElementById("ballCountRange");
    const ballSpeedRange = document.getElementById("ballSpeedRange");
    const ballSizeRange = document.getElementById("ballSizeRange");
    const ballColorPicker = document.getElementById("ballColorPicker");

    let ballCount = parseInt(ballCountRange.value);
    let ballSpeed = parseFloat(ballSpeedRange.value);
    let ballSize = parseInt(ballSizeRange.value);
    let ballColor = ballColorPicker.value;

    ballCountRange.oninput = (e) => {
      ballCount = parseInt(e.target.value);
      ballCountValue.textContent = ballCount;
    };
    ballSpeedRange.oninput = (e) => {
      ballSpeed = parseFloat(e.target.value);
      ballSpeedValue.textContent = ballSpeed.toFixed(1);
    };
    ballSizeRange.oninput = (e) => {
      ballSize = parseInt(e.target.value);
      ballSizeValue.textContent = ballSize;
    };
    ballColorPicker.oninput = (e) => ballColor = e.target.value;

    // 옵션 팝업
    const optionBtn = document.getElementById("optionBtn");
    const optionModal = document.getElementById("optionModal");
    const closeOption = document.getElementById("closeOption");

    optionBtn.onclick = () => {
      optionModal.style.display = optionModal.style.display === "block" ? "none" : "block";
    };
    closeOption.onclick = () => optionModal.style.display = "none";

    const launcherLength = 40;
    const launcherBaseX = offsetX + gameWidth / 2;
    const launcherBaseY = offsetY + gameHeight - 20;
    let launcherAngle = -90;
    const maxAngle = 75;

    const hpColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"];

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
          const hp = Math.floor(Math.random() * Math.min(1 + stage, 7)) + 1;
          bricks[c][r] = { x: 0, y: 0, hp };
        }
      }
    }

    class Ball {
      constructor(x, y, angleDeg) {
        const rad = angleDeg * Math.PI / 180;
        this.x = x;
        this.y = y;
        this.radius = ballSize;
        this.dx = Math.cos(rad) * ballSpeed * 5;
        this.dy = Math.sin(rad) * ballSpeed * 5;
        this.active = true;
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < offsetX + this.radius || this.x > offsetX + gameWidth - this.radius) this.dx *= -1;
        if (this.y - this.radius <= offsetY) this.dy *= -1;
        if (this.y > launcherBaseY + 30) this.active = false;

        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.hp > 0 &&
                this.x > b.x && this.x < b.x + brickWidth &&
                this.y > b.y && this.y < b.y + brickHeight) {
              b.hp--;
              score += stage;
              this.dy *= -1;
            }
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
        grad.addColorStop(0, "#fff");
        grad.addColorStop(0.3, ballColor);
        grad.addColorStop(1, darkenColor(ballColor, 0.4));
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.closePath();
      }
    }

    function fireBalls() {
      if (!canFire) return;
      canFire = false;
      launcherColor = "red";
      balls = [];
      for (let i = 0; i < ballCount; i++) {
        setTimeout(() => balls.push(new Ball(launcherBaseX, launcherBaseY, launcherAngle)), i * 100);
      }
    }

    function drawLauncher() {
      const rad = launcherAngle * Math.PI / 180;
      const endX = launcherBaseX + launcherLength * Math.cos(rad);
      const endY = launcherBaseY + launcherLength * Math.sin(rad);

      ctx.beginPath();
      ctx.moveTo(launcherBaseX, launcherBaseY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = launcherColor;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.closePath();

      // 받침대
      ctx.beginPath();
      ctx.arc(launcherBaseX, launcherBaseY, 12, 0, Math.PI * 2);
      ctx.fillStyle = launcherColor;
      ctx.fill();
      ctx.closePath();

      // 조준선
      ctx.beginPath();
      ctx.moveTo(launcherBaseX, launcherBaseY);
      ctx.lineTo(launcherBaseX + 3000 * Math.cos(rad), launcherBaseY + 3000 * Math.sin(rad));
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "rgba(255,0,0,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
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
    
            // 🎨 라디얼 그라데이션 생성
            const grad = ctx.createLinearGradient(brickX, brickY, brickX + brickWidth, brickY + brickHeight);
            grad.addColorStop(0, "#ffffff"); // 빛 받는 면
            grad.addColorStop(0.2, hpColors[b.hp - 1]); // 기본 색
            grad.addColorStop(1, darkenColor(hpColors[b.hp - 1], 0.4)); // 그림자
    
            ctx.fillStyle = grad;
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
    
            // 🖍️ 밝은 테두리 (왼쪽, 위)
            ctx.strokeStyle = "#ffffff88";
            ctx.beginPath();
            ctx.moveTo(brickX, brickY + brickHeight);
            ctx.lineTo(brickX, brickY);
            ctx.lineTo(brickX + brickWidth, brickY);
            ctx.stroke();
    
            // 🖍️ 어두운 테두리 (오른쪽, 아래)
            ctx.strokeStyle = "#00000044";
            ctx.beginPath();
            ctx.moveTo(brickX + brickWidth, brickY);
            ctx.lineTo(brickX + brickWidth, brickY + brickHeight);
            ctx.lineTo(brickX, brickY + brickHeight);
            ctx.stroke();
          }
        }
      }
    }

    
    

    function darkenColor(hex, factor) {
      const { r, g, b } = hexToRgb(hex);
      return rgbToHex(r * (1 - factor), g * (1 - factor), b * (1 - factor));
    }

    function hexToRgb(hex) {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const num = parseInt(hex, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }

    function rgbToHex(r, g, b) {
      const toHex = n => Math.round(n).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    const keys = {};
    document.addEventListener("keydown", (e) => {
      keys[e.code] = true;
      if (e.code === "Space" && canFire) fireBalls();
    });
    document.addEventListener("keyup", (e) => keys[e.code] = false);

    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      dragStartX = e.clientX;
    });
    canvas.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX;
      dragStartX = e.clientX;
      launcherAngle = Math.max(-90 - maxAngle, Math.min(-90 + maxAngle, launcherAngle + delta * 0.2));
    });
    canvas.addEventListener("mouseup", () => isDragging = false);
    canvas.addEventListener("dblclick", () => { if (canFire) fireBalls(); });

    function updateAngle() {
      if (keys["ArrowLeft"]) launcherAngle = Math.max(launcherAngle - 2, -90 - maxAngle);
      if (keys["ArrowRight"]) launcherAngle = Math.min(launcherAngle + 2, -90 + maxAngle);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawLauncher();
      updateAngle();
      balls.forEach(ball => { ball.update(); ball.draw(); });
      balls = balls.filter(b => b.active);

      if (balls.length === 0) {
        canFire = true;
        launcherColor = "black";
        if (bricks.flat().every(b => b.hp <= 0)) {
          stage++;
          initBricks();
        }
      }

      ctx.fillStyle = "lightgreen";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText(`Score: ${score}`, offsetX + 20, offsetY + 25);
      ctx.fillText(`Stage: ${stage}`, offsetX + 20, offsetY - 15);

      requestAnimationFrame(draw);
    }

    initBricks();
    draw();