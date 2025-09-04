
const optionBtn = document.getElementById("optionBtn");
const optionModal = document.getElementById("optionModal");
const ProgressBar = document.getElementById("progress-bar");
optionBtn.addEventListener("click", () => {
  if (optionModal.style.display === "block") {
    optionModal.style.display = "none";
  } else {
    optionModal.style.display = "block";
  }
});

let Upgrade1 = 0;
const UpgradeBtn = document.getElementById("UpgradeBtn");
const UpgradeWin = document.getElementById("UpgradeWin");
UpgradeBtn.addEventListener("click", () => {
  if (UpgradeWin.style.display === "block") {
    UpgradeWin.style.display = "none";
  } else {
    UpgradeWin.style.display = "block";
    // 숨기고 보여줄 업그레이드 DOM 요소 처리
    const currentUpgradeId = 9 + Upgrade1;
    const nextUpgradeId = currentUpgradeId + 1;

    if (Upgrade1 === 0) {
      document.getElementById("Upgrade10").style.display = "block";
    } else if (Upgrade1 >= 1 && Upgrade1 <= 7) {
      document.getElementById(`Upgrade${currentUpgradeId}`).style.display = "none";
      document.getElementById(`Upgrade${nextUpgradeId}`).style.display = "block";
    }

  }
});


const CheatBtn = document.getElementById("CheatBtn");
const CheatWin = document.getElementById("CheatWin");
CheatBtn.addEventListener("click", () => {
  if (CheatWin.style.display === "block") {
    CheatWin.style.display = "none";
  } else {
    CheatWin.style.display = "block";
  }
});


let totalDuration = 5000;   // 9초 (9000ms)
const progressInterval = 200; // ms 단위 진행 주기
let increment = (progressInterval / totalDuration) * 100; // 200ms마다 증가량
// 슬라이더 기존 코드 유지
CycleTime.addEventListener("input", (e) => {
  totalDuration = parseInt(e.target.value);
  CycleValue.textContent = totalDuration/1000;
  increment = (progressInterval / totalDuration) * 100; // 200ms마다 증가량
});


let ResPower = 1;   // 9초 (9000ms)
RestPower.addEventListener("input", (e) => {
  ResPower = parseInt(e.target.value);
  RestValue.textContent = ResPower;
  updateMenu(0,0);
});


let PbarColor = "#0f0";  // 기본 색상
const BarColor = document.getElementById("BarColor");
BarColor.addEventListener("input", (e) => {
  PbarColor = e.target.value;
  ProgressBar.style.backgroundColor = PbarColor;
});

let ClickX = 0;
let ClickY = 0;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 타일 크기 및 월드 좌표 범위
let tileSize = 50;
TileSize.addEventListener("input", (e) => {
  tileSize = parseInt(e.target.value);
  TileValue.textContent = tileSize;
  updateMenu(0, 0);  // UI 갱신
  resizeCanvas();
  draw();
});

const toggleBtn = document.getElementById('ToggleBtn');
const toggleValue = document.getElementById('ToggleValue');
const Tog = document.getElementById('ToggleValue').textContent;

toggleBtn.addEventListener('click', function () {
  const current = toggleValue.textContent;

  if (current === 'Basic') {
    toggleValue.textContent = 'Chest';
    toggleValue.style.color = 'yellow';
  } else if (current === 'Chest') {
    toggleValue.textContent = 'Gene';
    toggleValue.style.color = 'Green';
  } else if (current === 'Gene') {
    toggleValue.textContent = 'Return';
    toggleValue.style.color = 'blue';
  } else {
    toggleValue.textContent = 'Basic';
    toggleValue.style.color = 'red';
  }
  updateMenu(ClickX, ClickY);  // UI 갱신
  draw();
});

const minCoord = -200;
const maxCoord = 200;
const worldSize = maxCoord - minCoord + 1;

const imageNames = [
  "Home", "Town", 
  "Grass", "Tree1", "Tree2", "Tree3", "Tree4",
  "Farm", "Farm1", "Farm2", 
  "Hill", "Rock1", "Rock2", "Rock3", 
  "Mnt", "Iron1", "Iron2","Iron3", 
  "Chip", "Chip1", "Chip2",
  "Gold", "Gold1", "Gold2", "Gold3", "Gold4", 
  "Water", "Fish1", "Fish2", "Fish3","WaterGem", 
  "Oil", "Oil1", "Oil2", 
  "Oilw", "Oilw1", 
  "Gem", "Gem1", "Gem2", 
  "Uranium","Uranium1",
  "FoodBox","RockBox","ChipBox","AllBox",
  "TreeBox","SteelBox","OilBox","UraniumBox",
  "River1","River2","GeSea",
  "GeCoal","GeWind","GeTher"
];

const imagePaths = Object.fromEntries(
  imageNames.map(name => [name, `img/${name}.webp`])
);

const images = {};

imageNames.forEach(name => {
  images[name] = new Image();
  images[name].src = imagePaths[name];
});

let imagesLoaded = 0;
const totalImages = Object.keys(images).length;

function onImageLoad() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    draw();
  }
}

for (const key in images) {
  images[key].onload = onImageLoad;
  // 만약 로딩 에러도 추적하고 싶으면
  images[key].onerror = () => {
    console.error(`Failed to load image: ${key}`);
    // 에러도 포함시키려면 imagesLoaded++ 할 수도 있음
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      draw();
    }
  };
}

for (const key in images) {
  images[key].onload = onImageLoad;
  // 필요시 onerror도 같이 등록 가능
  images[key].onerror = () => {
    console.error(`Failed to load image: ${key}`);
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      draw();
    }
  };
}

// 레벨, 골드, UI 요소
const GoldElem = document.getElementById('Gold');
const TreeElem = document.getElementById('Tree');
const FoodElem = document.getElementById('Food');
const RockElem = document.getElementById('Rock');
const SteelElem = document.getElementById('Steel');
const OilElem = document.getElementById('Oil');
const GemElem = document.getElementById('Gem');
const UraniumElem = document.getElementById('Uranium');
const ChipElem = document.getElementById('Chip');
const RestElem = document.getElementById('Rest');
const EnergyElem = document.getElementById('Energy');
const DarkElem = document.getElementById('Dark');
const ClickButton = document.getElementById('ClickButton');
// const LevelupButton = document.getElementById('Levelup-button');
// const LevelupCostText = document.getElementById('Levelup-cost');
const bottomCoords = document.getElementById('bottom-coords');
const bottomValue = document.getElementById('bottom-value');

let Level = 1;
let Gold = 100;
let GoldMine = 0;
let GoldBonus = 1;
let Tree = 0;
let TreeAmount = 0;
let Food = 0;
let FoodAmount = 0;
let Rock = 0;
let RockAmount = 0;
let Steel = 0;
let SteelAmount = 0;
let Version = 0.4;
let Oil = 0;
let OilAmount = 0;
let Gem = 0;
let GemAmount = 0;
let Uranium = 0;
let UraniumAmount = 0;
let Chip = 0;
let ChipAmount = 0;

// 창고 추가
let TreeBox = 2000;
let FoodBox = 2000;
let RockBox = 2000;
let SteelBox = 2000;
let ChipBox = 1000;
let OilBox = 1000;
let UraniumBox = 1000;

let Energy = 0;
let Dark = 0;


let progress = 0;          // 진행 바 % (0 ~ 100)
// 9초 진행 바
function updateProgressBar() {
  progress += increment;
  if (progress >= 100) {
    progress = 0;          // 초기화
    giveBonusResources();  // 100% 도달 시 보상 함수 호출
  }
  document.getElementById('progress-bar').style.width = progress + '%';
}
//9초 자원 지급 함수
function giveBonusResources() {
  // 예: 수도 레벨 기준 골드와 목재 획득량 계산
  let GoldGain = Math.floor(((Level + GoldBonus) * 5) + GoldMine);
  let TreeGain = Math.floor(TreeAmount * 10 );
  let FoodGain = Math.floor(FoodAmount * 10 );
  let RockGain = Math.floor(RockAmount * 10 );
  let SteelGain = Math.floor(SteelAmount * 10 );
  let ChipGain = Math.floor(ChipAmount * 5 );
  let OilGain = Math.floor(OilAmount * 5 );
  let UraniumGain = Math.floor(UraniumAmount * 3 );
  let GemGain = Math.floor(GemAmount);
  if (Upgrade1 >= 1) { GoldGain *= 2;}
  if (Upgrade1 >= 2) { TreeGain *= 2;}
  if (Upgrade1 >= 3) { FoodGain *= 2;}
  if (Upgrade1 >= 4) { RockGain *= 2;}
  if (Upgrade1 >= 5) { SteelGain *= 2;}
  if (Upgrade1 >= 6) { ChipGain *= 2;}
  if (Upgrade1 >= 7) { OilGain *= 2;}
  if (Upgrade1 >= 8) { UraniumGain *= 2;}

  if (Energy < 0 || Dark > 0) {
    return;
  }
  Gold += GoldGain;
  Tree += TreeGain;
  Food += FoodGain;
  Rock += RockGain;
  Steel += SteelGain;
  Oil += OilGain;
  Gem += GemGain;
  Uranium += UraniumGain;
  Chip += ChipGain;
  if (Tree > TreeBox) {Tree = TreeBox;}
  if (Food > FoodBox) {Food = FoodBox;}
  if (Rock > RockBox) {Rock = RockBox;}
  if (Steel > SteelBox) {Steel = SteelBox;}
  if (Chip > ChipBox) {Chip = ChipBox;}
  if (Oil > OilBox) {Oil = OilBox;}
  if (Uranium > UraniumBox) {Uranium = UraniumBox;}

  const messages = [];
    if (GoldGain >= 1) messages.push(`+ ${formatNumber(GoldGain)} 골드`);
    if (TreeGain >= 1 && Tree < TreeBox) messages.push(`+ ${formatNumber(TreeGain)} 목재`);
    if (FoodGain >= 1 && Food < FoodBox) messages.push(`+ ${formatNumber(FoodGain)} 식량`);
    if (RockGain >= 1 && Rock < RockBox) messages.push(`+ ${formatNumber(RockGain)} 석재`);
    if (SteelGain >= 1 && Steel < SteelBox) messages.push(`+ ${formatNumber(SteelGain)} 강철`);
    if (ChipGain >= 1 && Chip < ChipBox) messages.push(`+ ${formatNumber(ChipGain)} 반도체`);
    if (OilGain >= 1 && Oil < OilBox) messages.push(`+ ${formatNumber(OilGain)} 석유`);
    if (UraniumGain >= 1 && Uranium < UraniumBox) messages.push(`+ ${formatNumber(UraniumGain)} 우라늄 배터리`);
    if (GemGain >= 1) messages.push(`+ ${formatNumber(GemGain)} 보석`);
  

  // aler1t나 UI 피드백 추가 가능
  // console.log(`보너스 지급: 골드 +${GoldGain}, 목재 +${TreeGain}`);
  if (AutoSave.checked) {
    saveGame();
  }
  if (messages.length > 0 && totalDuration >= 4000) {
    showGivItem(messages);
  }
  updateMenu(ClickX, ClickY);  // UI 갱신
  draw();           // 캔버스 재렌더링
}


function showGivItem(messages) {
  const GivDiv = document.getElementById('Give-message');
  GivDiv.innerHTML = messages.join('<br>');  // 줄바꿈 포함 출력
  GivDiv.style.display = 'block';
  setTimeout(() => {
    GivDiv.style.display = 'none';
  }, 1000);
}


  window.onload = function() {
    loadGame(1);
  };


// 숫자 축약형
function formatNumber(num) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'b';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'm';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'k';
  } else {
    return num.toString();
  }
}

document.getElementById("Cheat0").addEventListener("click", function () {
    if (getLevelRequirement(Level) >= (100000 * Level)) {
      Gold += getLevelRequirement(Level);
    } else {
      Gold += (100000 * Level);
    }
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat1").addEventListener("click", function () {
    Tree = TreeBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat2").addEventListener("click", function () {
    Food = FoodBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat3").addEventListener("click", function () {
    Rock = RockBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat4").addEventListener("click", function () {
    Steel = SteelBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat5").addEventListener("click", function () {
    Chip = ChipBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat6").addEventListener("click", function () {
    Oil = OilBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat7").addEventListener("click", function () {
    Uranium = UraniumBox;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat8").addEventListener("click", function () {
    Energy += 1000;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat9").addEventListener("click", function () {
    Dark -= 1000;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});
document.getElementById("Cheat10").addEventListener("click", function () {
    TreeBox += 100000;
    FoodBox += 100000;
    RockBox += 100000;
    SteelBox += 100000;
    ChipBox += 100000;
    OilBox += 100000;
    UraniumBox += 100000;
    showWarning(`치트 사용`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  
    draw();
});


document.getElementById("Upgrade10").addEventListener("click", function () {
  if (Gold >= 10000) {
    Gold -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`${10000 - Gold}골드 부족`, 0);
  }
});
document.getElementById("Upgrade11").addEventListener("click", function () {
  if (Tree >= 10000) {
    Tree -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`목재 ${10000 - Tree} 부족`, 0);
  }
});
document.getElementById("Upgrade12").addEventListener("click", function () {
  if (Food >= 10000) {
    Food -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`식량 ${10000 - Food} 부족`, 0);
  }
});
document.getElementById("Upgrade13").addEventListener("click", function () {
  if (Rock >= 10000) {
    Rock -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`석재 ${10000 - Rock} 부족`, 0);
  }
});
document.getElementById("Upgrade14").addEventListener("click", function () {
  if (Steel >= 10000) {
    Steel -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`강철 ${10000 - Steel} 부족`, 0);
  }
});
document.getElementById("Upgrade15").addEventListener("click", function () {
  if (Chip >= 10000) {
    Chip -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`반도체 ${10000 - Chip} 부족`, 0);
  }
});
document.getElementById("Upgrade16").addEventListener("click", function () {
  if (Oil >= 10000) {
    Oil -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`석유 ${10000 - Oil} 부족`, 0);
  }
});
document.getElementById("Upgrade17").addEventListener("click", function () {
  if (Uranium >= 10000) {
    Uranium -= 10000;
    Upgrade1 += 1;
    showWarning(`업그레이드 완료`, 1);
    UpgradeWin.style.display = "none";
    updateMenu(ClickX, ClickY);  // UI 갱신
    draw();           // 캔버스 재렌더링
  } else {
    showWarning(`우라늄 배터리 ${10000 - Uranium} 부족`, 0);
  }
});


// 월드 좌표 오프셋 (뷰포트 중심 기준)
let offsetX = (worldSize * tileSize) / 2 - canvas.width / 2;
let offsetY = (worldSize * tileSize) / 2 - canvas.height / 2;

// 타일 데이터 저장(Map)
const tileData = new Map();

// 키 생성 함수
function getTileKey(x, y) {
  return `${x},${y}`;
}

// 타일 초기화
function initializeTileData(x, y) {
  if (x === 0 && y === 0) return; // 수도는 초기화 제외

  const distance = (Math.abs(x) + Math.abs(y));
  let need = (distance*5);
  if (distance >= 5) need *= 2;
  if (distance >= 10) need *= 2;
  if (distance >= 20) need *= 2;
  if (distance >= 30) need *= 2;
  if (distance >= 40) need *= 2;
  if (distance >= 50) need *= 2;
  if (distance >= 60) need *= 2;
  if (distance >= 70) need *= 2;
  if (distance >= 80) need *= 2;
  if (distance >= 90) need *= 2;
  if (distance >= 100) need *= 2;
  if (distance >= 120) need *= 2;
  if (distance >= 140) need *= 2;
  if (distance >= 160) need *= 2;
  if (distance >= 180) need *= 2;
  if (distance >= 200) need *= 2;

  const key = getTileKey(x, y);
  if (!tileData.has(key)) {
    tileData.set(key, {
      need: need,
      purified: need,
      terrain: null,
      TownLevel: null // Town 레벨 추가 (없으면 null)
    });
  }
}
// 헬퍼 함수
function formatCostDisplay(current, required, iconPath) {
  const currentColor = current >= required ? 'lime' : 'red'; // 초록 또는 빨강
  const slashColor = 'orange';  // 주황
  const requiredColor = 'yellow'; // 노랑

  return (`
    <img src="${iconPath}" alt="자원" style="width:18px; height:18px; vertical-align: middle; transform: translateY(-4px); margin-right: -3px;">
    <span style="color:${currentColor};">${formatNumber(current)}</span><span style="color:${slashColor};">/</span><span style="color:${requiredColor};">${formatNumber(required)}</span>
  `).trim();
  
}

function formatCostDisplay2(current, iconPath) {
  const currentColor = current >= 0 ? 'lime' : 'red'; // 초록 또는 빨강
  const slashColor = 'orange';  // 주황

  return (`
    <img src="${iconPath}" alt="자원" style="width:18px; height:18px; vertical-align: middle; transform: translateY(-4px); margin-right: -3px;">
    <span style="color:${currentColor};">${formatNumber(current)}</span>
  `).trim();
  
}

// 스페이스바로 레벨업 작동
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') return;

    if (event.code === 'Space' || event.code === 'Enter') {
      const clicks = document.getElementById('Clicks');
      clicks.click();
    }
    if (event.code === 'KeyZ') {
      const BtnCk = document.getElementById('ToggleBtn');
      BtnCk.click();
    }
    if (event.code === 'KeyU') {
      const BtnCk = document.getElementById('UpgradeBtn');
      BtnCk.click();
    }
    if (event.code === 'KeyO') {
      const BtnCk = document.getElementById('optionBtn');
      BtnCk.click();
    }
    if (event.code === 'ArrowUp') {
      ClickY -= 1;
      updateMenu(ClickX, ClickY);
      draw();
    }
    if (event.code === 'ArrowDown') {
      ClickY += 1;
      updateMenu(ClickX, ClickY);
      draw();
    }
    if (event.code === 'ArrowLeft') {
      ClickX -= 1;
      updateMenu(ClickX, ClickY);
      draw();
    }
    if (event.code === 'ArrowRight') {
      ClickX += 1;
      updateMenu(ClickX, ClickY);
      draw();
    }
  });
});
document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // 기본 우클릭 메뉴 차단 (선택 사항)
  const clicks = document.getElementById('Clicks');
  clicks.click();
});

function createActionButton(imgPath, onClick, costs = []) {
  let html = `
    <div style="display: flex; align-items: flex-start;">
      <a href="#" id="Clicks" style="margin-right: 8px;">
        <img src="${imgPath}" width="40" height="40" alt="클릭" style="vertical-align: middle;">
      </a>
      <div id="costContainer">
  `;

  let shown = 0;
  for (let i = 0; i < costs.length; i++) {
    const cost = costs[i];

    if (cost.required !== 0) {
      if (shown > 0 && shown % 3 === 0) {
        html += '<br>';
      }
      html += formatCostDisplay(cost.current, cost.required, cost.icon);
      shown++;
    } else if (cost.current !== 0) {
      if (shown > 0 && shown % 3 === 0) {
        html += '<br>';
      }
      html += formatCostDisplay2(cost.current, cost.icon);
      shown++;
    }
  }

  html += `
      </div>
    </div>
  `;

  ClickButton.innerHTML = html;
  // console(html);
  ClickButton.style.display = 'block';

  requestAnimationFrame(() => {
    const button = document.getElementById('Clicks');
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        onClick();
      });
    }
  });
}

// 지형별 동작 모듈화
const terrainHandlers = {
  'Home': (x, y, data) => {
      const cost = getLevelRequirement(Level);
      let costTree = 0;
      let costFood = 0;
      let costRock = 0;
      let costSteel = 0;
      let costOil = 0;
      let costUranium = 0;
      let costChip = 0;
      let costGem = 0;
      if (Level >= 5) {
        costTree = getTreeRequirement(Level);
      }
      if (Level >= 10) {
        costFood = getFoodRequirement(Level);
      }
      if (Level >= 20) {
        costRock = getRockRequirement(Level);
      }
      if (Level >= 30) {
        costSteel = getSteelRequirement(Level);
      }
      if (Level >= 40) {
        costChip = getChipRequirement(Level);
      }
      if (Level >= 50) {
        costOil = getOilRequirement(Level);
      }
      if (Level >= 75) {
        costUranium = getUraniumRequirement(Level);
      }
      if (Level >= 100) {
        costGem = getGemRequirement(Level);
      }
    createActionButton('img/icon/Up.png', () => {
      
      if (Gold >= cost && Tree >= costTree && Food >= costFood && Rock >= costRock 
        && Steel >= costSteel && Chip >= costChip && Oil >= costOil && Uranium >= costUranium && Gem >= costGem) {
        Gold -= cost;
        Tree -= costTree;
        Food -= costFood;
        Rock -= costRock;
        Steel -= costSteel;
        Chip -= costChip;
        Oil -= costOil;
        Uranium -= costUranium;
        Gem -= costGem;
        Level++;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < cost) parts.push(`${formatNumber(cost - Gold)}골드`);
        if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
        if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
        if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
        if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
        if (Gem < costGem) parts.push(`보석 ${formatNumber(costGem - Gem)}`);
        showWarning(parts.join(', ') + ' 필요',0);
      }
    }, [
      { current: Gold, required: cost, icon: 'img/icon/Gold.webp' },
      { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
      { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
      { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' },
      { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' },
      { current: Gem, required: costGem, icon: 'img/icon/Gem.webp' }
    ]);
  },
  'Farm': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 500;
      let costTree = 40;
      let ReqLv = 10;
      createActionButton('img/Farm1.webp', () => {
        if (Gold >= costGold && Tree >= costTree && Level >= ReqLv) {
          Gold -= costGold;
          Tree -= costTree;
          data.terrain = 'Farm1';
          FoodBox += 100;
          FoodAmount += 1;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' }
      ]);
    } else if (Tog === 'Chest') {
      let costGold = 8000;
      let costFood = 1000;
      createActionButton('img/FoodBox.webp', () => {
        if (Gold >= costGold && Food >= costFood) {
          Gold -= costGold;
          Food -= costFood;
          data.terrain = 'FoodBox';
          FoodBox += 2000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Food, required: costFood, icon: 'img/icon/Food.webp' }
      ]);
    } else if (Tog === 'Gene') {
      let costGold = 450000;
      let costSteel = 45000;
      let costChip = 350000;
      let ReqLv = 70;
      createActionButton('img/GeTher.webp', () => {
        if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Level >= ReqLv) {
          Gold -= costGold;
          Steel -= costSteel;
          Chip -= costChip;
          Energy += 350;
          Dark += 5;
          data.terrain = 'GeTher';
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
        { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: 350, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -5, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/Grass.webp', () => {
        if (Gold >= 1000) {Gold -= 1000;data.terrain = 'Grass';updateMenu(x, y);draw();
        } else {showWarning(`${formatNumber(1000 - Gold)}골드 필요`, 0);}
      }, [{ current: Gold, required: 1000, icon: 'img/icon/Gold.webp' }]);
    }
  },

  'Farm1': (x, y, data) => {
    let costGold = 15000;
    let costTree = 3000;
    let costRock = 150;
    let ReqLv = 35;
    createActionButton('img/Farm2.webp', () => {
      if (Gold >= costGold && Tree >= costTree && Rock >= costRock && Level >= ReqLv) {
        Gold -= costGold;
        Tree -= costTree;
        Rock -= costRock;
        data.terrain = 'Farm2';
        FoodBox += 400;
        FoodAmount += 4;
        Energy -= 5;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
        if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요',0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
      { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -5, required: 0, icon: 'img/icon/Energy.webp' }
    ]);
  },

  'Hill': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 3500;
      let costTree = 500;
      let costFood = 100;
      let ReqLv = 20;
      createActionButton('img/Rock1.webp', () => {
        if (Gold >= costGold && Tree >= costTree && Food >= costFood && Level >= ReqLv) {
          Gold -= costGold;
          Tree -= costTree;
          Food -= costFood;
          data.terrain = 'Rock1';
          RockBox += 100;
          RockAmount += 1;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
          if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
        { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' }
      ]);
    } else if (Tog === 'Gene') {
      let costGold = 36000;
      let costSteel = 2200;
      let costChip = 2000;
      let ReqLv = 45;
      createActionButton('img/GeWind.webp', () => {
        if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Level >= ReqLv) {
          Gold -= costGold;
          Steel -= costSteel;
          Chip -= costChip;
          Energy += 20;
          Dark += 1;
          data.terrain = 'GeWind';
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
        { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: 20, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -1, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Chest') {
      let costGold = 15000;
      let costRock = 1000;
      createActionButton('img/RockBox.webp', () => {
        if (Gold >= costGold && Rock >= costRock) {
          Gold -= costGold;
          Rock -= costRock;
          data.terrain = 'RockBox';
          RockBox += 2000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    }
  },

  'Rock1': (x, y, data) => {
    let costGold = 25000;
    let costTree = 5000;
    let costSteel = 100;
    let ReqLv = 40;
    createActionButton('img/Rock2.webp', () => {
      if (Gold >= costGold && Tree >= costTree && Steel >= costSteel && Level >= ReqLv) {
        Gold -= costGold;
        Tree -= costTree;
        Steel -= costSteel;
        data.terrain = 'Rock2';
        RockBox += 400;
        RockAmount += 4;
        Dark += 5;
        Energy -= 35;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요',0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -35, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -5, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Rock2': (x, y, data) => {
    let costGold = 45000;
    let costTree = 9000;
    let costFood = 2000;
    let costRock = 500;
    let costSteel = 100;
    let ReqLv = 60;

    createActionButton('img/Rock3.webp', () => {
      if (Gold >= costGold && Tree >= costTree && Food >= costFood && Rock >= costRock && Steel >= costSteel && Level >= ReqLv) {
        Gold -= costGold;
        Tree -= costTree;
        Food -= costFood;
        Rock -= costRock;
        Steel -= costSteel;
        data.terrain = 'Rock3';
        RockBox += 500;
        RockAmount += 5;
        Energy -= 50;
        Dark += 50;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
        if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
        if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
      { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
      { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -50, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -50, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Mnt': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 12000;
      let costTree = 2000;
      let costFood = 500;
      let costRock = 100;
      let ReqLv = 30;

      createActionButton('img/Iron1.webp', () => {
        if (Gold >= costGold && Tree >= costTree && Food >= costFood && Rock >= costRock && Level >= ReqLv) {
          Gold -= costGold;
          Tree -= costTree;
          Food -= costFood;
          Rock -= costRock;
          data.terrain = 'Iron1';
          SteelBox += 100;
          SteelAmount += 1;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
          if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
          if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요', 0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
        { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
        { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Gene') {
      let costGold = 36000;
      let costSteel = 2200;
      let costChip = 2000;
      let ReqLv = 45;
      createActionButton('img/GeWind.webp', () => {
        if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Level >= ReqLv) {
          Gold -= costGold;
          Steel -= costSteel;
          Chip -= costChip;
          Energy += 20;
          Dark += 1;
          data.terrain = 'GeWind';
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
        { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: 20, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -1, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Chest') {
      let costGold = 20000;
      let costSteel = 1000;
      createActionButton('img/SteelBox.webp', () => {
        if (Gold >= costGold && Steel >= costSteel) {
          Gold -= costGold;
          Steel -= costSteel;
          data.terrain = 'SteelBox';
          SteelBox += 2000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' }
      ]);
    }
  },
  
  'Iron1': (x, y, data) => {
    let costGold = 50000;
    let costTree = 10000;
    let costFood = 2000;
    let costRock = 500;
    let costSteel = 100;
    let ReqLv = 60;

    createActionButton('img/Iron2.webp', () => {
      if (Gold >= costGold && Tree >= costTree && Food >= costFood && Rock >= costRock && Steel >= costSteel && Level >= ReqLv) {
        Gold -= costGold;
        Tree -= costTree;
        Food -= costFood;
        Rock -= costRock;
        Steel -= costSteel;
        data.terrain = 'Iron2';
        SteelBox += 400;
        SteelAmount += 4;
        Energy -= 25;
        Dark += 65;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
        if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
        if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
      { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
      { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -25, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -65, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Iron2': (x, y, data) => {
    let costGold = 1750000;
    let costSteel = 12000;
    let costChip = 4000;
    let costUranium = 100;
    let ReqLv = 80;

    createActionButton('img/Iron3.webp', () => {
      if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Uranium >= costUranium && Level >= ReqLv) {
        Gold -= costGold;
        Steel -= costSteel;
        Chip -= costChip;
        Uranium -= costUranium;
        data.terrain = 'Iron3';
        SteelBox += 500;
        SteelAmount += 5;
        Energy -= 250;
        Dark += 300;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -250, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -300, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },


  'Chip': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 30000;
      let costTree = 7500;
      let costRock = 500;
      let costSteel = 250;
      let ReqLv = 40;

      createActionButton('img/Chip1.webp', () => {
        if (Gold >= costGold && Tree >= costTree && Rock >= costRock && Steel >= costSteel && Level >= ReqLv) {
          Gold -= costGold;
          Tree -= costTree;
          Rock -= costRock;
          Steel -= costSteel;
          data.terrain = 'Chip1';
          ChipBox += 50;
          ChipAmount += 1;
          Energy -= 200;
          Dark += 75;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
          if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요', 0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
        { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: -200, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -75, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Gene') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Chest') {
      let costGold = 35000;
      let costChip = 500;
      createActionButton('img/ChipBox.webp', () => {
        if (Gold >= costGold && Chip >= costChip) {
          Gold -= costGold;
          Chip -= costChip;
          data.terrain = 'ChipBox';
          ChipBox += 1000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' }
      ]);
    }
  },

  'Chip1': (x, y, data) => {
    let costGold = 250000;
    let costSteel = 1000;
    let costChip = 500;
    let costOil = 100;
    let ReqLv = 55;

    createActionButton('img/Chip2.webp', () => {
      if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Oil >= costOil && Level >= ReqLv) {
        Gold -= costGold;
        Steel -= costSteel;
        Chip -= costChip;
        Oil -= costOil;
        data.terrain = 'Chip2';
        ChipBox += 200;
        ChipAmount += 4;
        Energy -= 700;
        Dark += 400;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -700, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -400, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  
  'Oil': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 200000;
      let costSteel = 800;
      let costChip = 250;
      let ReqLv = 50;

      createActionButton('img/Oil1.webp', () => {
        if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Level >= ReqLv) {
          Gold -= costGold;
          Steel -= costSteel;
          Chip -= costChip;
          data.terrain = 'Oil1';
          OilBox += 50;
          OilAmount += 1;
          Energy -= 10;
          Dark += 10;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요', 0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
        { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: -10, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -10, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Gene') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Chest') {
      let costGold = 300000;
      let costOil = 500;
      createActionButton('img/OilBox.webp', () => {
        if (Gold >= costGold && Oil >= costOil) {
          Gold -= costGold;
          Oil -= costOil;
          data.terrain = 'OilBox';
          OilBox += 1000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' }
      ]);
    }
  },


  'Oilw': (x, y, data) => {
    let costGold = 750000;
    let costSteel = 3500;
    let costChip = 1000;
    let ReqLv = 65;

    createActionButton('img/Oilw1.webp', () => {
      if (Gold >= costGold && Steel >= costSteel && Chip >= costChip && Level >= ReqLv) {
        Gold -= costGold;
        Steel -= costSteel;
        Chip -= costChip;
        data.terrain = 'Oilw1';
        OilBox += 100;
        OilAmount += 2;
        Energy -= 25;
        Dark += 60;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -25, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -60, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Oil1': (x, y, data) => {
    let costGold = 2000000;
    let costSteel = 10000;
    let costChip = 5000;
    let costOil = 1000;
    let costUranium = 250;
    let ReqLv = 90;

    createActionButton('img/Oil2.webp', () => {
      if (
        Gold >= costGold &&
        Steel >= costSteel &&
        Chip >= costChip &&
        Oil >= costOil &&
        Uranium >= costUranium &&
        Level >= ReqLv
      ) {
        Gold -= costGold;
        Steel -= costSteel;
        Chip -= costChip;
        Oil -= costOil;
        Uranium -= costUranium;
        data.terrain = 'Oil2';
        OilBox += 200;
        OilAmount += 4;
        Energy -= 100;
        Dark += 100;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
        if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' },
      { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -100, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -100, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Uranium': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 1200000;
      let costSteel = 7500;
      let costChip = 4000;
      let costOil = 1500;
      let ReqLv = 75;

      createActionButton('img/Uranium1.webp', () => {
        if (
          Gold >= costGold &&
          Steel >= costSteel &&
          Chip >= costChip &&
          Oil >= costOil &&
          Level >= ReqLv
        ) {
          Gold -= costGold;
          Steel -= costSteel;
          Chip -= costChip;
          Oil -= costOil;
          data.terrain = 'Uranium1';
          UraniumBox += 50;
          UraniumAmount += 1;
          Energy -= 100;
          Dark += 400;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Steel < costSteel) parts.push(`강철 ${formatNumber(costSteel - Steel)}`);
          if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
          if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요', 0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Steel, required: costSteel, icon: 'img/icon/Steel.webp' },
        { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
        { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: -100, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -400, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Gene') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Chest') {
      let costGold = 1500000;
      let costUranium = 100;
      createActionButton('img/UraniumBox.webp', () => {
        if (Gold >= costGold && Uranium >= costUranium) {
          Gold -= costGold;
          Uranium -= costUranium;
          data.terrain = 'UraniumBox';
          UraniumBox += 1000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' }
      ]);
    }
  },

  'WaterGem': (x, y, data) => {
    let costGold = 10000000;
    let costUranium = 500;
    let ReqLv = 85;
    createActionButton('img/Water.webp', () => {
      if (Gold >= costGold && Uranium >= costUranium && Level >= ReqLv) {
        Gold -= costGold;
        Uranium -= costUranium;
        data.terrain = 'Water';
        Gem += 50;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' }
    ]);
  },

  'Gem': (x, y, data) => {
    const costGold = 12500000;
    const costChip = 40000;
    const costOil = 10000;
    const costUranium = 1500;
    const ReqLv = 80;

    createActionButton('img/Gem1.webp', () => {
      if (Gold >= costGold && Chip >= costChip && Oil >= costOil && Uranium >= costUranium && Level >= ReqLv) {
        Gold -= costGold;
        Chip -= costChip;
        Oil -= costOil;
        Uranium -= costUranium;
        data.terrain = 'Gem1';
        GemAmount += 1;
        Energy -= 200;
        Dark += 50;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
        if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' },
      { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -200, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -50, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  
  'Gem1': (x, y, data) => {
    const costGold = 75000000;
    const costOil = 50000;
    const costUranium = 7500;
    const ReqLv = 100;

    createActionButton('img/Gem2.webp', () => {
      if (Gold >= costGold && Oil >= costOil && Uranium >= costUranium && Level >= ReqLv) {
        Gold -= costGold;
        Oil -= costOil;
        Uranium -= costUranium;
        data.terrain = 'Gem2';
        GemAmount += 4;
        Energy -= 500;
        Dark += 350;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Oil < costOil) parts.push(`석유 ${formatNumber(costOil - Oil)}`);
        if (Uranium < costUranium) parts.push(`우라늄 배터리 ${formatNumber(costUranium - Uranium)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Oil, required: costOil, icon: 'img/icon/Oil.webp' },
      { current: Uranium, required: costUranium, icon: 'img/icon/Uranium.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: -500, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -350, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },


  'Grass': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      let costGold = 100;
      createActionButton('img/Tree1.webp', () => {
        if (Gold >= costGold && Level >= 5) {
          Gold -= costGold;
          data.terrain = 'Tree1';
          TreeBox += 100;
          TreeAmount += 1;
          Dark -= 1;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Level < 5) parts.push(`레벨 ${formatNumber(5 - Level)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Level, required: 5, icon: 'img/icon/Up.png' },
        { current: 1, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Chest') {
      let costGold = 4000;
      let costTree = 1000;
      createActionButton('img/TreeBox.webp', () => {
        if (Gold >= costGold && Tree >= costTree) {
          Gold -= costGold;
          Tree -= costTree;
          data.terrain = 'TreeBox';
          TreeBox += 1000;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' }
      ]);
    } else if (Tog === 'Gene') {
      let costGold = 78000;
      let costTree = 7000;
      let costRock = 20000;
      let ReqLv = 35;
      createActionButton('img/GeCoal.webp', () => {
        if (Gold >= costGold && Tree >= costTree && Rock >= costRock && Level >= ReqLv) {
          Gold -= costGold;
          Tree -= costTree;
          Rock -= costRock;
          Energy += 150;
          Dark += 80;
          data.terrain = 'GeCoal';
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Tree < costTree) parts.push(`목재 ${formatNumber(costTree - Tree)}`);
          if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Tree, required: costTree, icon: 'img/icon/Tree.webp' },
        { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: 150, required: 0, icon: 'img/icon/Energy.webp' },
        { current: -80, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Return') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    }
  },

  'Tree1': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      const costGold = 2000;
      const ReqLv = 15;

      createActionButton('img/Tree2.webp', () => {
        if (Gold >= costGold && Level >= ReqLv) {
          Gold -= costGold;
          data.terrain = 'Tree2';
          TreeBox += 200;
          TreeAmount += 2;
          GoldBonus += 1;
          Dark -= 2;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요', 0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: 2, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Chest') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Gene') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Return') {
      createActionButton('img/Grass.webp', () => {
        if (Gold >= 1000) {Gold -= 1000;data.terrain = 'Grass';updateMenu(x, y);draw();
        TreeBox -= 100;
        TreeAmount -= 1;
        } else {showWarning(`${formatNumber(1000 - Gold)}골드 필요`, 0);}
      }, [{ current: Gold, required: 1000, icon: 'img/icon/Gold.webp' }]);
    }
  },

  
  'Tree2': (x, y, data) => {
    const costGold = 30000;
    const ReqLv = 45;

    createActionButton('img/Tree3.webp', () => {
      if (Gold >= costGold && Level >= ReqLv) {
        Gold -= costGold;
        data.terrain = 'Tree3';
        TreeBox += 300;
        TreeAmount += 3;
        GoldBonus += 2;
        Dark -= 5;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: 5, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  
  'Tree3': (x, y, data) => {
    const costGold = 200000;
    const ReqLv = 70;

    createActionButton('img/Tree4.webp', () => {
      if (Gold >= costGold && Level >= ReqLv) {
        Gold -= costGold;
        data.terrain = 'Tree4';
        TreeBox += 400;
        TreeAmount += 4;
        GoldBonus += 2;
        Dark -= 10;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: 10, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },


  'Water': (x, y, data) => {
    const Tog = document.getElementById('ToggleValue').textContent;
    if (Tog === 'Basic') {
      const costFood = 500;
      const reqLevel = 25;

      createActionButton('img/Fish1.webp', () => {
        if (Food >= costFood && Level >= reqLevel) {
          Food -= costFood;
          data.terrain = 'Fish1';
          FoodBox += 50;
          FoodAmount += 1;
          Dark -= 2;
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
          if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
          showWarning(parts.join(', ') + ' 필요', 0);
        }
      }, [
        { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
        { current: Level, required: reqLevel, icon: 'img/icon/Up.png' },
        { current: 2, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Chest') {
      createActionButton('img/icon/Book.webp', () => {},[]);
    } else if (Tog === 'Gene') {
      let costGold = 92000;
      let ReqLv = 25;
      createActionButton('img/River1.webp', () => {
        if (Gold >= costGold && Level >= ReqLv) {
          Gold -= costGold;
          Dark -= 8;
          data.terrain = 'River1';
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
        { current: 8, required: 0, icon: 'img/icon/Dark.webp' }
      ]);
    } else if (Tog === 'Return') {
      let costGold = 10000;
      let costRock = 1000;
      createActionButton('img/Grass.webp', () => {
        if (Gold >= costGold && Rock >= costRock) {
          Gold -= costGold;
          Rock -= costRock;
          data.terrain = 'Grass';
          updateMenu(x, y);
          draw();
        } else {
          const parts = [];
          if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
          if (Rock < costRock) parts.push(`석재 ${formatNumber(costRock - Rock)}`);
          showWarning(parts.join(', ') + ' 필요',0);
        }
      }, [
        { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
        { current: Rock, required: costRock, icon: 'img/icon/Rock.webp' }
      ]);
    }
  },

  'River1': (x, y, data) => {
    let costGold = 6500000;
    let costChip = 750000;
    let ReqLv = 90;
    createActionButton('img/River2.webp', () => {
      if (Gold >= costGold && Chip >= costChip && Level >= ReqLv) {
        Gold -= costGold;
        Chip -= costChip;
        Dark -= 20;
        Energy += 5;
        data.terrain = 'River2';
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Chip < costChip) parts.push(`반도체 ${formatNumber(costChip - Chip)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요',0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Chip, required: costChip, icon: 'img/icon/Chip.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: 5, required: 0, icon: 'img/icon/Energy.webp' },
      { current: 20, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'River2': (x, y, data) => {
    let costGem = 40;
    let ReqLv = 95;
    createActionButton('img/GeSea.webp', () => {
      if (Gem >= costGem && Level >= ReqLv) {
        Gem -= costGem;
        Energy += 75;
        Dark -= 20;
        data.terrain = 'GeSea';
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gem < costGem) parts.push(`보석 ${formatNumber(costGem - Gem)}`);
        if (Level < ReqLv) parts.push(`레벨 ${formatNumber(ReqLv)}`);
        showWarning(parts.join(', ') + ' 필요',0);
      }
    }, [
      { current: Gem, required: costGem, icon: 'img/icon/Gem.webp' },
      { current: Level, required: ReqLv, icon: 'img/icon/Up.png' },
      { current: 75, required: 0, icon: 'img/icon/Energy.webp' },
      { current: 20, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Fish1': (x, y, data) => {
    const costFood = 1500;
    const reqLevel = 55;

    createActionButton('img/Fish2.webp', () => {
      if (Food >= costFood && Level >= reqLevel) {
        Food -= costFood;
        data.terrain = 'Fish2';
        FoodBox += 50;
        FoodAmount += 1;
        Dark -= 5;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
        if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
      { current: Level, required: reqLevel, icon: 'img/icon/Up.png' },
        { current: 5, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Fish2': (x, y, data) => {
    const costFood = 8000;
    const reqLevel = 75;

    createActionButton('img/Fish3.webp', () => {
      if (Food >= costFood && Level >= reqLevel) {
        Food -= costFood;
        data.terrain = 'Fish3';
        FoodBox += 150;
        FoodAmount += 3;
        Dark -= 20;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Food < costFood) parts.push(`식량 ${formatNumber(costFood - Food)}`);
        if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Food, required: costFood, icon: 'img/icon/Food.webp' },
      { current: Level, required: reqLevel, icon: 'img/icon/Up.png' },
        { current: 20, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Gold': (x, y, data) => {
    const costGold = 35000;
    const reqLevel = 50;

    createActionButton('img/Gold1.webp', () => {
      if (Gold >= costGold && Level >= reqLevel) {
        Gold -= costGold;
        data.terrain = 'Gold1';
        GoldMine += 100;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Level, required: reqLevel, icon: 'img/icon/Up.png' }
    ]);
  },

  'Gold1': (x, y, data) => {
    const costGold = 100000;
    const reqLevel = 65;

    createActionButton('img/Gold2.webp', () => {
      if (Gold >= costGold && Level >= reqLevel) {
        Gold -= costGold;
        data.terrain = 'Gold2';
        GoldMine += 150;
        Energy -= 50;
        Dark += 5;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Level, required: reqLevel, icon: 'img/icon/Up.png' },
      { current: -50, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -5, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Gold2': (x, y, data) => {
    const costGold = 350000;
    const reqLevel = 85;
    createActionButton('img/Gold3.webp', () => {
      if (Gold >= costGold && Level >= reqLevel) {
        Gold -= costGold;
        data.terrain = 'Gold3';
        GoldMine += 350;
        Energy -= 170;
        Dark += 35;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Level, required: reqLevel, icon: 'img/icon/Up.png' },
      { current: -170, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -35, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  'Gold3': (x, y, data) => {
    const costGold = 1000000;
    const reqLevel = 95;

    createActionButton('img/Gold4.webp', () => {
      if (Gold >= costGold && Level >= reqLevel) {
        Gold -= costGold;
        data.terrain = 'Gold4';
        GoldMine += 900;
        Energy -= 350;
        Dark += 60;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costGold) parts.push(`${formatNumber(costGold - Gold)}골드`);
        if (Level < reqLevel) parts.push(`레벨 ${formatNumber(reqLevel - Level)}`);
        showWarning(parts.join(', ') + ' 필요', 0);
      }
    }, [
      { current: Gold, required: costGold, icon: 'img/icon/Gold.webp' },
      { current: Level, required: reqLevel, icon: 'img/icon/Up.png' },
      { current: -350, required: 0, icon: 'img/icon/Energy.webp' },
      { current: -60, required: 0, icon: 'img/icon/Dark.webp' }
    ]);
  },

  
  'Town': (x, y, data) => {
    const costg = Math.floor(100 * Math.pow(data.TownLevel, 1.2));
    createActionButton('img/icon/Up.png', () => {
      if (Gold >= costg && Level > data.TownLevel) {
        Gold -= costg;
        data.TownLevel++;
        GoldBonus+=data.TownLevel;
        updateMenu(x, y);
        draw();
      } else {
        const parts = [];
        if (Gold < costg) parts.push(`${formatNumber(costg - Gold)}골드`);
        if (Level === data.TownLevel) parts.push(`수도 레벨`);
        showWarning(parts.join(', ') + ' 필요',0);
      }
    }, [
      { current: Gold, required: costg, icon: 'img/icon/Gold.webp' }
    ]);
  }
};
function getLevelRequirement(Level) {
  let exponent;
  if (Level <= 10) {
    exponent = 1.25;
  } else if (Level <= 50) {
    exponent = 1.5;
  } else if (Level <= 50) {
    exponent = 1.75;
  } else if (Level <= 75) {
    exponent = 2;
  } else {
    exponent = 3;
  }
  return Math.floor(100 * Math.pow(Level, exponent));
}
function getTreeRequirement(Level) {
  if (Level < 5) return 0;
  let exponent;
  if (Level <= 15) {
    exponent = 1.2;
  } else if (Level <= 35) {
    exponent = 1.35;
  } else if (Level <= 55) {
    exponent = 1.5;
  } else if (Level <= 75) {
    exponent = 1.5;
  } else {
    exponent = 2;
  }
  return Math.floor(90 * Math.pow(Level - 4, exponent));
}
function getFoodRequirement(Level) {
  if (Level < 10) return 0;
  return Math.floor(80 * Math.pow(Level - 9, 1.3));
}
function getRockRequirement(Level) {
  if (Level < 20) return 0;
  return Math.floor(70 * Math.pow(Level - 19, 1.25));
}
function getSteelRequirement(Level) {
  if (Level < 30) return 0;
  return Math.floor(60 * Math.pow(Level - 29, 1.2));
}
function getChipRequirement(Level) {
  if (Level < 40) return 0;
  return Math.floor(50 * Math.pow(Level - 39, 1.15));
}
function getOilRequirement(Level) {
  if (Level < 50) return 0;
  return Math.floor(40 * Math.pow(Level - 49, 1.1));
}
function getUraniumRequirement(Level) {
  if (Level < 75) return 0;
  return Math.floor(25 * Math.pow(Level - 74, 1.05));
}
function getGemRequirement(Level) {
  if (Level < 100) return 0;
  return Math.floor(10 * Math.pow(Level - 99, 1.02));
}
// 메뉴 UI 업데이트 함수

document.getElementById("MaxShow").addEventListener("change", function () {
  updateMenu(ClickX, ClickY);  // UI 갱신
  draw();           // 캔버스 재렌더링
});


function updateMenu(x, y) {
  const key = getTileKey(x, y);
  const data = tileData.get(key);
  ClickX = x;
  ClickY = y;

  GoldElem.textContent = formatNumber(Gold);
  if (MaxShow.checked) {
    TreeElem.textContent = `${formatNumber(Tree)} / ${formatNumber(TreeBox)}`;
    FoodElem.textContent = `${formatNumber(Food)} / ${formatNumber(FoodBox)}`;
    RockElem.textContent = `${formatNumber(Rock)} / ${formatNumber(RockBox)}`;
    SteelElem.textContent = `${formatNumber(Steel)} / ${formatNumber(SteelBox)}`;
    ChipElem.textContent = `${formatNumber(Chip)} / ${formatNumber(ChipBox)}`;
    OilElem.textContent = `${formatNumber(Oil)} / ${formatNumber(OilBox)}`;
    UraniumElem.textContent = `${formatNumber(Uranium)} / ${formatNumber(UraniumBox)}`;
  } else {
    TreeElem.textContent = formatNumber(Tree);
    FoodElem.textContent = formatNumber(Food);
    RockElem.textContent = formatNumber(Rock);
    SteelElem.textContent = formatNumber(Steel);
    ChipElem.textContent = formatNumber(Chip);
    OilElem.textContent = formatNumber(Oil);
    UraniumElem.textContent = formatNumber(Uranium);
  }
  
    if (Tree >= TreeBox) {TreeElem.style.color = 'Lime';}
    else {TreeElem.style.color = 'White';}
    if (Food >= FoodBox) {FoodElem.style.color = 'Lime';}
    else {FoodElem.style.color = 'White';}
    if (Rock >= RockBox) {RockElem.style.color = 'Lime';}
    else {RockElem.style.color = 'White';}
    if (Steel >= SteelBox) {SteelElem.style.color = 'Lime';}
    else {SteelElem.style.color = 'White';}
    if (Chip >= ChipBox) {ChipElem.style.color = 'Lime';}
    else {ChipElem.style.color = 'White';}
    if (Oil >= OilBox) {OilElem.style.color = 'Lime';}
    else {OilElem.style.color = 'White';}
    if (Uranium >= UraniumBox) {UraniumElem.style.color = 'Lime';}
    else {UraniumElem.style.color = 'White';}

  GemElem.textContent = formatNumber(Gem);
  EnergyElem.textContent = formatNumber(Energy);
  if (Energy > 0) {
    EnergyElem.style.color = 'Lime';
  } else if (Energy < 0) {
    EnergyElem.style.color = 'Red';
  } else {
    EnergyElem.style.color = 'White';
  }
  DarkElem.textContent = formatNumber(Dark);
  if (Dark > 0) {
    DarkElem.style.color = 'Red';
  } else if (Dark < 0) {
    DarkElem.style.color = 'Lime';
  } else {
    DarkElem.style.color = 'White';
  }
  
  let LvPw = Level * ResPower;
  if (window.innerWidth <= 768) {
  RestElem.textContent = `${Math.floor(Gold / (LvPw * 5))}`;
  } else {
  RestElem.textContent = `${LvPw} (${LvPw * -5}골드 / ${Math.floor(Gold / (LvPw * 5))}회 정화)`;
  }
  bottomCoords.textContent = `( ${x} , ${y} )`;

  if (data?.purified > 0) {
    bottomValue.textContent = `정화 진행도 : ${data.purified} / ${data.need}`;
    ClickButton.style.display = 'none';

  } else if (terrainHandlers[data?.terrain]) {
    const terrainLabels = {
      Home: '수도',Town: '도시',
      Grass: '잔디',Tree1: '나무(목재+10)',Tree2: '작은 숲(목재+30)',
      Tree3: '큰 숲(목재+60)',Tree4: '거대한 숲(목재+100)',
      Hill: '언덕',Rock1: '채석장(석재+10)',
      Rock2: '대형 채석장(석재+50)',Rock3: '최신형 채석장(석재+100)',
      Mnt: '산',Iron1: '철광산(강철+10)',Iron2: '고급 철광산(강철+50)',Iron3: '강철 공장(강철+100)',
      Gold: '금광맥',Gold1: '금광산(골드+100)',Gold2: '고급 금광산(골드+250)',
      Gold3: '놀라운 금광산(골드+600)',Gold4: '프리미엄 금광산(골드+1500)',
      Water: '물',Fish1: '소형 물고기(식량+10)',
      Fish2: '중형 물고기(식량+25)',Fish3: '대형 물고기(식량+50)',
      Farm: '논밭',Farm1: '농장(식량+10)',Farm2: '고급 농장(식량+50)',
      Oil: '석유 매장지',Oil1: '석유 시추기(석유+5)',Oil2: '고급 석유 시추기(석유+25)',
      Oilw: '해양 석유 매장지',Oilw1: '해양 석유 시추기(석유+10)',
      Gem: '보석 광맥',Gem1: '보석 광산(보석+1)',Gem2: '고급 보석 광산(보석+5)',
      Gemwater: '보석 운석(1회성 보석+50)',
      Uranium: '우라늄 매장지',Uranium1: '우라늄 공장(우라늄 배터리+3)',
      Chip: '구리 광맥',Chip1: '반도체 공장(반도체+5)',Chip2: '반도체 공장(반도체+25)',
      TreeBox:'목재 컨테이너(목재 저장량+2000)',
      FoodBox: '식량 컨테이너(식량 저장량+2000)',
      RockBox: '석재 컨테이너(석재 저장량+2000)',
      SteelBox: '강철 컨테이너(강철 저장량+2000)',
      ChipBox: '반도체 컨테이너(반도체 저장량+1000)',
      OilBox: '석유 컨테이너(석유 저장량+1000)',
      UraniumBox: '우라늄 배터리 컨테이너(우라늄 배터리 저장량+1000)',
      AllBox: '통합 컨테이너(모든 저장량+50000)'
    };
    bottomValue.textContent = terrainLabels[data.terrain] || '';

    terrainHandlers[data.terrain](x, y, data);

  } else {
    ClickButton.style.display = 'none';
    const terrainLabels = {
      Home: '수도',Town: '도시',
      Grass: '잔디',Tree1: '나무(목재+10)',Tree2: '작은 숲(목재+30)',
      Tree3: '큰 숲(목재+60)',Tree4: '거대한 숲(목재+100)',
      Hill: '언덕',Rock1: '채석장(석재+10)',
      Rock2: '대형 채석장(석재+50)',Rock3: '최신형 채석장(석재+100)',
      Mnt: '산',Iron1: '철광산(강철+10)',Iron2: '고급 철광산(강철+50)',Iron3: '강철 공장(강철+100)',
      Gold: '금광맥',Gold1: '금광산(골드+100)',Gold2: '고급 금광산(골드+250)',
      Gold3: '놀라운 금광산(골드+600)',Gold4: '프리미엄 금광산(골드+1500)',
      Water: '물',Fish1: '소형 물고기(식량+10)',
      Fish2: '중형 물고기(식량+25)',Fish3: '대형 물고기(식량+50)',
      Farm: '논밭',Farm1: '농장(식량+10)',Farm2: '고급 농장(식량+50)',
      Oil: '석유 매장지',Oil1: '석유 시추기(석유+10)',Oil2: '고급 석유 시추기(석유+50)',
      Oilw: '해양 석유 매장지',Oilw1: '해양 석유 시추기(석유+20)',
      Gem: '보석 광맥',Gem1: '보석 광산(보석+1)',Gem2: '고급 보석 광산(보석+5)',
      Gemwater: '보석 운석(1회성 보석+50)',
      Uranium: '우라늄 매장지',Uranium1: '우라늄 공장(우라늄 배터리+10)',
      Chip: '구리 광맥',Chip1: '반도체 공장(반도체+10)',Chip2: '반도체 공장(반도체+50)',
      TreeBox:'목재 컨테이너(목재 저장량+2000)',
      FoodBox: '식량 컨테이너(식량 저장량+2000)',
      RockBox: '석재 컨테이너(석재 저장량+2000)',
      SteelBox: '강철 컨테이너(강철 저장량+2000)',
      ChipBox: '반도체 컨테이너(반도체 저장량+1000)',
      OilBox: '석유 컨테이너(석유 저장량+1000)',
      UraniumBox: '우라늄 배터리 컨테이너(우라늄 배터리 저장량+1000)',
      AllBox: '통합 컨테이너(모든 저장량+50000)'
    };
    bottomValue.textContent = terrainLabels[data.terrain] || '';
  }
}


// 캔버스 크기 조정
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 뷰포트 중심 좌표 재계산
  offsetX = (worldSize * tileSize) / 2 - canvas.width / 2;
  offsetY = (worldSize * tileSize) / 2 - canvas.height / 2;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  draw();
});
window.addEventListener('DOMContentLoaded', () => {
  // 초기화 작업들...
  const key = getTileKey(0, 0);
  tileData.set(key, {
    terrain: 'Home',
    TownLevel: 1,
    purified: 0,
    need: 0
  });
  setInterval(updateProgressBar, 200); // DOM 로드 완료 후 타이머 시작
});

resizeCanvas();

// draw 함수 (타일 그리기)
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startX = Math.floor(offsetX / tileSize);
  const startY = Math.floor(offsetY / tileSize);
  const endX = Math.ceil((offsetX + canvas.width) / tileSize);
  const endY = Math.ceil((offsetY + canvas.height) / tileSize);

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      const worldX = x + minCoord;
      const worldY = y + minCoord;

      if (worldX < minCoord || worldX > maxCoord || worldY < minCoord || worldY > maxCoord) continue;

      initializeTileData(worldX, worldY);

      const screenX = x * tileSize - offsetX;
      const screenY = y * tileSize - offsetY;

      const key = getTileKey(worldX, worldY);

      // 타일 배경 및 이미지 처리
      if (worldX === 0 && worldY === 0) {
        // 수도 타일
        if (images.Home.complete) {
          ctx.drawImage(images.Home, screenX, screenY, tileSize, tileSize);
          const boxSize = tileSize * 0.45; // 40% 크기
          const boxX = screenX + tileSize - boxSize - 0; // 오른쪽 아래, 여백 0
          const boxY = screenY + tileSize - boxSize - 0;
          
          ctx.fillStyle = 'rgba(150, 200, 200, 1)';
          ctx.fillRect(boxX, boxY, boxSize, boxSize);
          
          ctx.fillStyle = '#000000'; // 검은색
          ctx.font = `${boxSize * 0.65}px Arial`;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          const textX = boxX + boxSize / 2;
          const textY = boxY + boxSize / 2;
          ctx.fillText(Level, textX, textY);

        } else {
          ctx.fillStyle = '#444';
          ctx.fillRect(screenX, screenY, tileSize, tileSize);
        }
      } else if (tileData.has(key) && tileData.get(key).purified === 0) {
        const terrain = tileData.get(key).terrain;
        if (terrain === 'Town' && images.Town.complete) {
          ctx.drawImage(images.Town, screenX, screenY, tileSize, tileSize);
          const data = tileData.get(key);
          const boxSize = tileSize * 0.45; // 40% 크기
          const boxX = screenX + tileSize - boxSize - 0; // 오른쪽 아래, 여백 0
          const boxY = screenY + tileSize - boxSize - 0;

          ctx.fillStyle = 'rgba(200, 200, 200, 1)';
          ctx.fillRect(boxX, boxY, boxSize, boxSize);

          ctx.fillStyle = '#000000'; // 검은색
          ctx.font = `${boxSize * 0.65}px Arial`;
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          const textX = boxX + boxSize / 2;
          const textY = boxY + boxSize / 2;
          ctx.fillText(data.TownLevel, textX, textY);

        } else {
          if (imageNames.includes(terrain) && images[terrain]?.complete) {
            ctx.drawImage(images[terrain], screenX, screenY, tileSize, tileSize);
          } else {
            // 로드 안 된 경우 대체 색상
            ctx.fillStyle = '#0a0';
            ctx.fillRect(screenX, screenY, tileSize, tileSize);
          }
        }
      } else {
        // 정화 중인 타일
        ctx.fillStyle = 'black';
        ctx.fillRect(screenX, screenY, tileSize, tileSize);
      }

      // 정화 진행 바 표시
      if (tileData.has(key)) {
        const data = tileData.get(key);
        const progressRatio = (data.need - data.purified) / data.need;
        if (data.purified > 0 && progressRatio > 0) {
          const barWidth = tileSize * progressRatio;
          const barHeight = 5;
          const barX = screenX;
          const barY = screenY; // 타일 최상단

          ctx.fillStyle = '#555';
          ctx.fillRect(barX, barY, tileSize, barHeight);

          ctx.fillStyle = '#0f0';
          ctx.fillRect(barX, barY, barWidth, barHeight);
        }
      }
    }
  }
}

function showWarning(message, type = 0) {
  const warningDiv = document.getElementById('warning-message');
  warningDiv.textContent = message;

  // 메시지 타입에 따라 색상 변경
  warningDiv.style.color = type === 1 ? 'lightgreen' : 'red';

  warningDiv.style.display = 'block';

  setTimeout(() => {
    warningDiv.style.display = 'none';
  }, 600);
}




// 뷰포트 이동을 위한 드래그 구현
let isDragging = false;
let dragStartX, dragStartY;

canvas.addEventListener('mousedown', e => {
  isDragging = true;
  dragStartX = e.clientX + offsetX;
  dragStartY = e.clientY + offsetY;
});

canvas.addEventListener('mouseup', e => {
  isDragging = false;
});

canvas.addEventListener('mouseleave', e => {
  isDragging = false;
});

canvas.addEventListener('mousemove', e => {
  if (!isDragging) return;

  offsetX = dragStartX - e.clientX;
  offsetY = dragStartY - e.clientY;

  // 월드 범위 내로 제한 (optional)
  const maxOffset = worldSize * tileSize - canvas.width;
  const maxOffsetY = worldSize * tileSize - canvas.height;

  offsetX = Math.min(Math.max(offsetX, 0), maxOffset);
  offsetY = Math.min(Math.max(offsetY, 0), maxOffsetY);

  draw();
});

// 📱 터치 이벤트 추가
canvas.addEventListener('touchstart', e => {
  if (e.touches.length !== 1) return; // 한 손가락 터치만 허용
  isDragging = true;

  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  dragStartX = x + offsetX;
  dragStartY = y + offsetY;
});

canvas.addEventListener('touchend', e => {
  isDragging = false;
});

canvas.addEventListener('touchcancel', e => {
  isDragging = false;
});

canvas.addEventListener('touchmove', e => {
  if (!isDragging || e.touches.length !== 1) return;
  e.preventDefault(); // 스크롤 방지

  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  offsetX = dragStartX - x;
  offsetY = dragStartY - y;

  // 월드 범위 내로 제한
  const maxOffset = worldSize * tileSize - canvas.width;
  const maxOffsetY = worldSize * tileSize - canvas.height;

  offsetX = Math.min(Math.max(offsetX, 0), maxOffset);
  offsetY = Math.min(Math.max(offsetY, 0), maxOffsetY);

  draw();
}, { passive: false }); // preventDefault 허용


function canPurifyTile(x, y) {
  const directions = [
    [0, -1], // 위
    [0, 1],  // 아래
    [-1, 0], // 왼쪽
    [1, 0],  // 오른쪽
  ];

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    const key = getTileKey(nx, ny);

    if (tileData.has(key)) {
      const neighbor = tileData.get(key);

      if (neighbor.purified === 0 || neighbor.terrain === 'Home') {
        return true; // 인접한 타일 중 정화된 타일 또는 수도가 있음
      }
    }
  }
  return false; // 주변에 정화된 타일 없음
}


// 캔버스 클릭 이벤트 핸들러 통합
canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const tileX = Math.floor((mouseX + offsetX) / tileSize) + minCoord;
  const tileY = Math.floor((mouseY + offsetY) / tileSize) + minCoord;

  if (tileX < minCoord || tileX > maxCoord || tileY < minCoord || tileY > maxCoord) {
    // 범위 밖 클릭 무시
    return;
  }


  // 일반 타일 클릭 시 정화 진행
  const key = getTileKey(tileX, tileY);
  if (!tileData.has(key)) {
    initializeTileData(tileX, tileY);
  }

  const data = tileData.get(key);
  
  // 수도 클릭 시 골드 획득 및 레벨업 UI 표시
  if (CityClick.checked && window.innerWidth <= 768) {
      Gold += (Level * 10);
      updateMenu(tileX, tileY);
  } else {
    if (tileX === 0 && tileY === 0) {
      if (Level <= 10) {Gold += (Level * 10);}
      else if (Level <= 20){Gold += (Level * 20);}
      else if (Level <= 30){Gold += (Level * 30);}
      else if (Level <= 40){Gold += (Level * 50);}
      else if (Level <= 50){Gold += (Level * 100);}
      else {Gold += (Level * 200);}
      updateMenu(tileX, tileY);
      draw();
      return;
    }
  }

  if (data.purified > 0) {
    if (canPurifyTile(tileX, tileY)) {
      let costPurified = 0;
      costPurified = Level * ResPower * 5;
      if (Gold >= costPurified) {
        Gold -= costPurified;
        data.purified = Math.max(0, data.purified - (Level * ResPower));
      } else {
        showWarning(`블록 정화시, ${formatNumber(costPurified - Gold)}골드가 부족합니다.`,0);
      }
    } else {
      showWarning('반드시 인접한 정화된 블록이 있어야 합니다!',0);
    }
      
    if (data.purified === 0) {
      let terrains = [];
      let probabilities = [];
      // 정화 완료 시 확률 조정된 랜덤 지형 설정
      if (Level < 5) {
        terrains = ['Grass'];
        probabilities = [1];
      } else if (Level < 10) {
        terrains = ['Grass','Town'];
        probabilities = [0.97, 0.03];
      } else if (Level < 20) {
        terrains = ['Grass','Town','Farm','Water'];
        probabilities = [0.65, 0.05, 0.15, 0.15];
      } else if (Level < 30) {
        terrains = ['Grass','Town','Farm','Water','Hill'];
        probabilities = [0.48, 0.07, 0.15, 0.15, 0.15];
      } else if (Level < 40) {
        terrains = ['Grass','Town','Farm','Water','Hill','Mnt'];
        probabilities = [0.3, 0.1, 0.15, 0.15, 0.15, 0.15];
      } else if (Level < 50) {
        terrains = ['Grass','Town','Farm','Water','Hill','Mnt','Chip'];
        probabilities = [0.2, 0.1, 0.15, 0.15, 0.15, 0.15, 0.1];
      } else if (Level < 75) {
        terrains = ['Grass','Town','Farm','Water','Hill','Mnt','Chip','Gold','Oil','Oilw'];
        probabilities = [0.25, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,0.05,0.05,0.05];
      } else {
        terrains = ['Grass','Town','Farm','Water','Hill','Mnt','Chip','Gold','Oil','Oilw','Gem','WaterGem','Uranium'];
        probabilities = [0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,0.05,0.05,0.05,0.01,0.02,0.02];
      }

      // 0~1 사이의 랜덤 숫자 생성
      const rand = Math.random();

      let cumulative = 0;
      for (let i = 0; i < terrains.length; i++) {
        cumulative += probabilities[i];
        if (rand < cumulative) {
          data.terrain = terrains[i];
          if (terrains[i] === 'Town') {
            data.TownLevel = 1;
          }
          break;
        }
      }
    }


    draw();
  }
  updateMenu(tileX, tileY);
});

// // 레벨업 버튼 클릭 이벤트
// LevelupButton.addEventListener('click', () => {
//   const cost = Level * 100;
//   if (Gold >= cost) {
//     Gold -= cost;
//     Level++;
//     updateMenu(0, 0);
//     draw();
//   } else {
//     showWarning('골드가 부족합니다!',0);
//   }
// });

// 저장
function saveGame() {
  const saveData = {
    Level,
    Gold,
    GoldMine,
    GoldBonus,
    Tree, 
    TreeAmount,    
    Food,     
    FoodAmount,
    Rock,     
    RockAmount,
    Steel,     
    SteelAmount,
    Oil,  
    OilAmount,
    Gem,  
    GemAmount,
    Uranium, 
    UraniumAmount,
    Chip, 
    ChipAmount,
    TreeBox,FoodBox,RockBox,SteelBox,
    ChipBox,OilBox,UraniumBox,
    Upgrade1,
    Energy,Dark,

    Version,
    tileData: Array.from(tileData.entries()) // [key, value] 형식 배열
  };

  localStorage.setItem('idleGameSave', JSON.stringify(saveData));
  showWarning('게임이 저장되었습니다.',1);
}
// 불러오기
function loadGame(A) {
  const data = localStorage.getItem('idleGameSave');

  if (!data) {
    showWarning('저장된 데이터가 없습니다.',0);
    return;
  }
  if (A === 2) {
     Level = 1;
     Gold = 100;
     GoldMine = 0;
     GoldBonus = 1;
     Tree = 0;
     TreeAmount = 0;
     Food = 0;
     FoodAmount = 0;
     Rock = 0;
     RockAmount = 0;
     Steel = 0;
     SteelAmount = 0;
     Oil = 0;
     OilAmount = 0;
     Gem = 0;
     GemAmount = 0;
     Uranium = 0;
     UraniumAmount = 0;
     Chip = 0;
     ChipAmount = 0;
    TreeBox = 1000;
    FoodBox = 1000;
    RockBox = 1000;
    SteelBox = 1000;
    ChipBox = 500;
    OilBox = 500;
    UraniumBox = 100;
    progress = 90;
    Upgrade1 = 0;
    Energy = 0;
    Dark = 0;
      tileData.clear();
      const key = getTileKey(0, 0);
      tileData.set(key, {
        terrain: 'Home',
        TownLevel: 1,
        purified: 0,
        need: 0
      });
      saveGame();
    return;
  }

  try {
    const saveData = JSON.parse(data);
    if (saveData.Version === Version) {
      Level = saveData.Level;
      Gold = saveData.Gold;
      GoldMine = saveData.GoldMine;
      GoldBonus = saveData.GoldBonus;
      Tree = saveData.Tree;
      TreeAmount = saveData.TreeAmount;
      Food = saveData.Food;
      FoodAmount = saveData.FoodAmount;
      Rock = saveData.Rock;
      RockAmount = saveData.RockAmount;
      Steel = saveData.Steel;
      SteelAmount = saveData.SteelAmount;
      Chip = saveData.Chip;
      ChipAmount = saveData.ChipAmount;
      Oil = saveData.Oil;
      OilAmount = saveData.OilAmount;
      Uranium = saveData.Uranium;
      UraniumAmount = saveData.UraniumAmount;
      Gem = saveData.Gem;
      GemAmount = saveData.GemAmount;
      TreeBox = saveData.TreeBox,
      FoodBox = saveData.FoodBox,
      RockBox = saveData.RockBox,
      SteelBox = saveData.SteelBox,
      ChipBox = saveData.ChipBox,
      OilBox = saveData.OilBox,
      UraniumBox = saveData.UraniumBox,
      Upgrade1 = saveData.Upgrade1,
      Energy = saveData.Energy,
      Dark = saveData.Dark,
      tileData.clear();
      for (const [key, value] of saveData.tileData) {
        tileData.set(key, value);
      }

      updateMenu(0, 0);
      draw();
      showWarning('게임이 불러와졌습니다.',1);
    
    } else {
      showWarning('저장된 버전이 다릅니다.',0);
    }
  } catch (e) {
    showWarning('저장된 데이터를 불러오는 중 오류가 발생했습니다.',0);
    console.error(e);
  }
}

// 저장 파일 다운로드
function exportToFile() {
  const saveData = {
    Level,
    Gold,
    tileData: Array.from(tileData.entries())
  };
  const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "idle-game-save.json";
  a.click();
  URL.revokeObjectURL(url);
}


// 초기 화면 UI 세팅
updateMenu(0, 0);

