// 초기 상태
let gameDate = new Date(2025, 6, 9); // 2025-07-10 시작
let money = 2000;
let gameSpeed = 2;
let gameInterval = null;
let autoBuyEnabled = false;
let autoSellEnabled = false;
let gameLoopTimeout;

const dateDisplay = document.getElementById('date');
const moneyDisplay = document.getElementById('money');
const propertiesContainer = document.getElementById('properties-container');
const optionsButton = document.getElementById('options-button');
const optionsPanel = document.getElementById('options-panel');
const speedRange = document.getElementById('speed-range');
const speedValueDisplay = document.getElementById('speed-value');
const autoBuyCheckbox = document.getElementById('auto-buy');
const autoSellCheckbox = document.getElementById('auto-sell');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
// const resetButton = document.getElementById('reset-button');

const priceChangeMessageDiv = document.getElementById('price-change-message');
saveButton.addEventListener('click', saveGame);
loadButton.addEventListener('click', loadGame);
// resetButton.addEventListener('click', resetGame);
const DevilMod = document.getElementById('optionSatan');
let DevilModOn = DevilMod.checked;

DevilMod.addEventListener('change', () => {
  DevilModOn = DevilMod.checked;
});

// 옵션창 토글
optionsButton.addEventListener('click', () => {
  const isVisible = optionsPanel.style.display === 'block';
  optionsPanel.style.display = isVisible ? 'none' : 'block';
});
// 속도 조절 슬라이더
speedRange.addEventListener('input', () => {
  gameSpeed = parseInt(speedRange.value);
  speedValueDisplay.textContent = gameSpeed;
  restartGameLoop(); // 속도 변경 적용
});
// 자동 구매
autoBuyCheckbox.addEventListener('change', () => {
  autoBuyEnabled = autoBuyCheckbox.checked;
});
// 자동 판매
autoSellCheckbox.addEventListener('change', () => {
  autoSellEnabled = autoSellCheckbox.checked;
});
//자동매매 동작 로직 구현 (매 틱마다 호출)
function autoTrade() {
  if (autoBuyEnabled) {
    const buyCandidates = properties
      .filter(p =>
        p.canTrade() &&
        money >= p.currentPrice &&
        p.currentPrice <= p.initialPrice * 0.90 // 초기가 대비 10% 이상 하락
      )
      .map(p => ({
        prop: p,
        diffValue: p.initialPrice - p.currentPrice // 하락 금액 (절댓값이 클수록 우선)
      }))
      .sort((a, b) => b.diffValue - a.diffValue); // 많이 하락한 순

    for (const candidate of buyCandidates) {
      if (money < candidate.prop.currentPrice) break;
      candidate.prop.buy();
    }
  }

  if (autoSellEnabled) {
    const sellCandidates = properties
      .filter(p =>
        p.canTrade() &&
        p.ownedCount > 0 &&
        p.currentPrice >= p.initialPrice * 1.10 // 초기가 대비 10% 이상 상승
      )
      .map(p => ({
        prop: p,
        diffValue: p.currentPrice - p.initialPrice // 상승 금액 (절댓값이 클수록 우선)
      }))
      .sort((a, b) => b.diffValue - a.diffValue); // 많이 오른 순

    for (const candidate of sellCandidates) {
      if (candidate.prop.ownedCount === 0) continue;
      candidate.prop.sell();
    }
  }

  updateUI();
}

const logPanel = document.getElementById('log-panel');

function logTransaction(message) {
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const y = gameDate.getFullYear();
  const m = String(gameDate.getMonth() + 1).padStart(2, '0');
  const d = String(gameDate.getDate()).padStart(2, '0');
  logEntry.textContent = `[📅${y}${m}${d}] ${message}`;
  logPanel.appendChild(logEntry);
  logPanel.scrollTop = logPanel.scrollHeight; // 최신 로그로 스크롤
  if (logPanel.children.length > 100) {
    logPanel.removeChild(logPanel.firstChild); // 가장 오래된 로그 삭제
  }
}


// 부동산 클래스
class Property {
  constructor(name, initialPrice, cooldownDays) {
    this.name = name;
    this.initialPrice = initialPrice;
    this.currentPrice = initialPrice;
    this.previousPrice = initialPrice; // 이전 시세 저장
    this.cooldown = 0;
    this.cooldownDays = cooldownDays;
    this.ownedCount = 0;
  }

  updatePrice() {
    this.previousPrice = this.currentPrice;
  
    if (!DevilModOn) {
      // 사탄 옵션 꺼짐: 기존 변동폭
      const changePercent = Math.random() * 0.6 - 0.3; // -30% ~ +30%
      this.currentPrice = Math.round(this.initialPrice * (1 + changePercent));
    } else {
      // 사탄 옵션 켜짐
      if (this.ownedCount === 0) {
        // 미구매: -20% ~ +50%
        const changePercent = Math.random() * 0.7 - 0.2;
        this.currentPrice = Math.round(this.initialPrice * (1 + changePercent));
      } else {
        // 구매한 부동산: -50% ~ +20%
        const changePercent = Math.random() * 0.7 - 0.5;
        this.currentPrice = Math.round(this.initialPrice * (1 + changePercent));
      }
    }
  }
  

  tick() {
    if (this.cooldown > 0) this.cooldown--;
  }

  canTrade() {
    return this.cooldown === 0;
  }

  buy() {
    if (money >= this.currentPrice && this.canTrade()) {
      money -= this.currentPrice;
      this.ownedCount++;
      this.cooldown = this.cooldownDays;
  
      logTransaction(`🟢 구매: ${this.name} | 현재고: +${this.ownedCount} | 현재가: ${formatMoney(this.currentPrice)}`);
    }
  }

  sell() {
    if (this.ownedCount > 0 && this.canTrade()) {
      money += this.currentPrice;
      this.ownedCount--;
      this.cooldown = this.cooldownDays;
  
      logTransaction(`🔴 판매: ${this.name} | 현재고: -${this.ownedCount} | 현재가: ${formatMoney(this.currentPrice)}`);
    }
  }
  
  collectRent() {
    if (this.ownedCount > 0) {
      const rent = Math.round(this.currentPrice * 0.02 * this.ownedCount);
      money += rent;
    }
  }

  render() {
    const card = document.createElement('div');
    card.className = 'property-card';
  
    if (this.currentPrice >= 1_000_000_000) {
      card.classList.add('purple-tier');
    } else if (this.currentPrice >= 10_000_000) {
      card.classList.add('red-tier');
    } else if (this.currentPrice >= 100_000) {
      card.classList.add('green-tier');
    }
    
    let priceChange = this.currentPrice - this.initialPrice;
    let changeRate = this.initialPrice === 0 ? 0 : (priceChange / this.initialPrice) * 100;
    if(optionToggle.checked) {
     priceChange = this.currentPrice - this.previousPrice;
     changeRate = this.previousPrice === 0 ? 0 : (priceChange / this.previousPrice) * 100;
    }
    // 색상 및 아이콘 결정
    let priceColor = 'white';
    let icon = '';
    let sign = '';
  
    if (priceChange > 0) {
      priceColor = '#e57373'; // 옅은 빨강
      sign = '+';
      if (changeRate >= 16) icon = '⏫';
      else if (changeRate >= 1) icon = '🔺';
    } else if (priceChange < 0) {
      priceColor = '#64b5f6'; // 옅은 파랑
      if (changeRate <= -16) icon = '⏬';
      else if (changeRate <= -1) icon = '🔻';
    }
  
    const formattedRate = changeRate.toFixed(1); // 소수점 1자리까지 표시
  
    card.innerHTML = `
      <h3>${this.name}</h3>
      <p class="owned-text${this.ownedCount === 0 ? ' hidden' : ''}">
        보유 수량: ${this.ownedCount}
      </p>
      <p class="cooldown-text${this.cooldown === 0 ? ' hidden' : ''}">
        쿨타임: ${this.cooldown > 0 ? this.cooldown + '일' : '없음'}
      </p>
      <p style="color: ${priceColor}; line-height: 1.4em; font-size:1.3rem;font-weight: bold;">
        시세: ${formatMoney(this.currentPrice)} ${icon} (${sign}${formattedRate}%)
      </p>
    `;


  
    const buyBtnWrapper = document.createElement('div');
    buyBtnWrapper.style.display = 'inline-block';
    buyBtnWrapper.style.width = '80px';  // 고정 너비 예시
    buyBtnWrapper.style.marginRight = '10px';
    
    const buyBtn = document.createElement('button');
    buyBtn.textContent = '구매';
    buyBtn.disabled = !this.canTrade() || money < this.currentPrice;
    buyBtn.onclick = () => {
      this.buy();
      updateUI();
    };
    // 돈이 부족하거나 거래 불가시 숨김 처리
    buyBtn.style.visibility = (buyBtn.disabled) ? 'hidden' : 'visible';

    buyBtnWrapper.appendChild(buyBtn);
  
    const sellBtnWrapper = document.createElement('div');
    sellBtnWrapper.style.display = 'inline-block';
    sellBtnWrapper.style.width = '80px';  // 고정 너비 예시
  
    const sellBtn = document.createElement('button');
    sellBtn.textContent = '판매';
    sellBtn.disabled = !this.canTrade() || this.ownedCount === 0;
    sellBtn.onclick = () => {
      this.sell();
      updateUI();
    };
    // 보유 수량 없으면 숨김 처리
    sellBtn.style.visibility = (sellBtn.disabled) ? 'hidden' : 'visible';
  
    sellBtnWrapper.appendChild(sellBtn);
  
    // 버튼 wrapper들을 card에 추가
    card.appendChild(buyBtnWrapper);
    card.appendChild(sellBtnWrapper);
  
    return card;
  }
  

}

function formatMoney(value) {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(3) + 'G';
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(3) + 'M';
  if (value >= 1_000) return (value / 1_000).toFixed(3) + 'k';
  return '$' + value.toLocaleString();
}


// 부동산 목록 초기화
const properties = [
  new Property("새싹 빌라", 100, 2),
  new Property("단지 아파트", 350, 4),
  new Property("소형 상가", 1000, 6),
  new Property("오피스텔 타워", 4000, 9),
  new Property("역세권 상가", 10000, 11),
  new Property("도심 주상복합", 30000, 14),
  new Property("강남 테라스", 90000, 17),
  new Property("글로벌 비즈센터", 150000, 20),
  new Property("한강뷰 레지던스", 250000, 23),
  new Property("프라임 빌딩", 400000, 26),
  new Property("메가몰 복합단지", 650000, 29),
  new Property("고급 리조트 단지", 1000000, 32),
  new Property("스마트시티 블럭", 1500000, 35),
  new Property("미래형 메가타워", 2500000, 38),
  new Property("우주관측센터 부지", 4000000, 41),
  new Property("초고층 크리스탈 타워", 6500000, 44),
  new Property("드론택배 물류허브", 10000000, 47),
  new Property("AI 자율도시 지구", 15000000, 50),
  new Property("해양 부유 도시 모듈", 25000000, 55),
  new Property("위성 기반 스마트 네트워크", 40000000, 60),
  new Property("달 거주지 착륙지권", 70000000, 65),
  new Property("화성 테라포밍 구역권", 150000000, 70),
  new Property("목성 궤도 스테이션", 300000000, 75),
  new Property("엔셀라두스 빙하 연구 콜로니", 500000000, 80),
  new Property("우주 엘리베이터 기지권", 800000000, 85),
  new Property("천왕성 핵융합 발전소", 1200000000, 90),
  new Property("태양 주력 광산 채굴권", 2000000000, 95),
  new Property("워프게이트 터미널 관리권", 4000000000, 100),
  new Property("다차원 중개 허브", 7000000000, 110),
  new Property("시공간 초월 주거구역(Ω타워)", 12000000000, 120)
];



// UI 갱신
function updateUI() {
  const y = gameDate.getFullYear();
  const m = String(gameDate.getMonth() + 1).padStart(2, '0');
  const d = String(gameDate.getDate()).padStart(2, '0');
  dateDisplay.textContent = `📅${y}${m}${d}`;
  moneyDisplay.textContent = `💰${formatMoney(money)}`;

  propertiesContainer.innerHTML = '';
  properties.forEach(p => {
    let card = document.getElementById(`property-${p.name}`);
    if (!card) {
      card = p.render();
      card.id = `property-${p.name}`;
      propertiesContainer.appendChild(card);
    } else {
      // 기존 카드 내용만 부분 갱신 (예: 가격, 보유 수 등 텍스트 변경)
      p.updateCardContent(card);
    }
  });
}

// 날짜 업데이트
function tickDay() {
  // 날짜 1일 증가, 쿨다운 감소 등 기존 작업들...
  gameDate.setDate(gameDate.getDate() + 1);
  properties.forEach(p => p.tick());  // 쿨다운 감소 위임

  if (money <= 2000) {
    money += 1;
  } else {
    if (!DevilModOn) {
      money = Math.round(money * 1.001);
    } else {
      money += 2;
    }
  }

  // 매달 5일 마다 곧 시세 변동 메시지 출력
  if (gameDate.getDate() === 5) {
    showPriceChangeWarning();
  }

  // 10일마다 시세 변동 코드 유지
  if (gameDate.getDate() === 10) {
    properties.forEach(p => p.updatePrice());
    logTransaction(`시세가 변동되었습니다`);
  }

  // 25일 임대수익 지급 유지
  if (gameDate.getDate() === 25) {
    let totalRent = 0;
    properties.forEach(p => {
      if (p.ownedCount > 0) {
        let rentPer = 0.1;
        if (DevilModOn) {
          rentPer = 0.02
        }
        const rent = Math.round(p.currentPrice * rentPer * p.ownedCount);
        totalRent += rent;
        money += rent;
      }
    });
  
    if (totalRent >= 1) {
      logTransaction(`임대 수익 ${formatMoney(totalRent)} 획득`);
    }
  }
  

  // 자동매매 실행
  autoTrade();

  updateUI();
}

//시세변동 메시지
function showPriceChangeWarning() {
  priceChangeMessageDiv.textContent = '곧 시세가 변동됩니다';
  priceChangeMessageDiv.style.opacity = '1';

  setTimeout(() => {
    priceChangeMessageDiv.style.opacity = '0';
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  // optionToggle 선언 및 관련 초기화, 이벤트 등록 모두 이 안에서 하세요

  const optionToggle = document.getElementById('optionToggle');

  optionToggle.addEventListener('change', () => {
    updateUI();
  });

  // 게임 초기화 코드도 여기에 넣으면 안전합니다
  updateUI();
  startGameLoop();
});


function gameLoop() {
  tickDay();
  gameLoopTimeout = setTimeout(gameLoop, 1000 / gameSpeed);
}

function startGameLoop() {
  clearTimeout(gameLoopTimeout);
  gameLoop();
}

function restartGameLoop() {
  clearTimeout(gameLoopTimeout);
  startGameLoop();
}

// 저장 함수
function saveGame() {
  const saveData = {
    date: gameDate.toISOString(),
    money,
    properties: properties.map(p => ({
      ownedCount: p.ownedCount,
      cooldown: p.cooldown,
      currentPrice: p.currentPrice,
      previousPrice: p.previousPrice
    })),
    gameSpeed,
    autoBuyEnabled,
    autoSellEnabled
  };
  localStorage.setItem('realEstateGameSave', JSON.stringify(saveData));
  alert('게임이 저장되었습니다!');
}

// 불러오기 함수
function loadGame() {
  const saveStr = localStorage.getItem('realEstateGameSave');
  if (!saveStr) {
    alert('저장된 데이터가 없습니다.');
    return;
  }
  try {
    const saveData = JSON.parse(saveStr);
    gameDate = new Date(saveData.date);
    money = saveData.money;
    saveData.properties.forEach((pData, i) => {
      const p = properties[i];
      if (!p) return;
      p.ownedCount = pData.ownedCount;
      p.cooldown = pData.cooldown;
      p.currentPrice = pData.currentPrice;
      p.previousPrice = pData.previousPrice;
    });
    gameSpeed = saveData.gameSpeed || 1;
    autoBuyEnabled = !!saveData.autoBuyEnabled;
    autoSellEnabled = !!saveData.autoSellEnabled;

    // UI 업데이트: 옵션 슬라이더, 체크박스, 속도 값 등
    speedRange.value = gameSpeed;
    speedValueDisplay.textContent = gameSpeed;
    autoBuyCheckbox.checked = autoBuyEnabled;
    autoSellCheckbox.checked = autoSellEnabled;

    restartGameLoop();
    updateUI();
    alert('게임을 불러왔습니다!');
  } catch(e) {
    alert('불러오기 실패: 데이터가 손상되었을 수 있습니다.');
  }
}

function resetGame() {
  if (confirm('게임을 초기화하시겠습니까? 저장하지 않은 데이터는 사라집니다.')) {
    // 초기 상태 값으로 되돌리기
    gameDate = new Date(2025, 7, 9);
    money = 1000;
    gameSpeed = 1;
    autoBuyEnabled = false;
    autoSellEnabled = false;

    // 부동산 상태 초기화
    properties.forEach(p => {
      p.ownedCount = 0;
      p.cooldown = 0;
      p.currentPrice = p.basePrice;
      p.previousPrice = p.basePrice;
    });

    // UI 초기화 옵션 반영
    speedRange.value = gameSpeed;
    speedValueDisplay.textContent = gameSpeed;
    autoBuyCheckbox.checked = autoBuyEnabled;
    autoSellCheckbox.checked = autoSellEnabled;

    // 게임 루프 재시작
    restartGameLoop();

    // UI 갱신
    updateUI();
  }
}
