
  let storage = 100;
  let Coin = 0;
  let Fuel = 0;
  // 아이템 정보
  let mcItems = {
    Log: 0,
    Plank: 0,
    Stick: 0,
    Apple: 5,
    Cobblestone: 0,
    Dirt: 0,

    Coal: 0,
    Iron: 0,
    IronIngot: 0,
    Gold: 0,
    GoldIngot: 0,
    Lapis: 0,
    Redstone: 0,
    Diamond: 0,
    Emerald: 0,
    Scrap: 0,
    Netherite: 0,

    Sand: 0,
    Gravel: 0,
    Clay: 0,
    Snow: 0,

    Wheatseed: 0,
    Wheat: 0,
    Bonemeal: 0,
    Bread: 0,
    Goldapple: 0,

    RottenFlesh: 0,
    Carrot: 0,
    Potato: 0,

    SpiderEye: 0,
    String: 0,
    Bone: 0,
    Arrow: 0,

    Porkchop: 0,
    Wool: 0,
    Mutton: 0,
    Beef: 0,
    Leather: 0,
    Chicken: 0,
    Feather: 0,
    Egg: 0,

    Porkchop2: 0,
    Mutton2: 0,
    Beef2: 0,
    Chicken2: 0

  };

  let Stats = {
    Hp : 20,
    Maxhp : 20,
    Hg : 20,
    Maxhg : 20
  };

  function getNameItem(item) {
    switch (item) {
      case 'Log': return '참나무';
      case 'Plank': return '참나무 판자';
      case 'Stick': return '나무 막대기';
      case 'Cobblestone': return '조약돌';
      case 'Dirt': return '흙';
      case 'Apple': return '사과';

      case 'Coal': return '석탄';
      case 'Iron': return '철 원석';
      case 'IronIngot': return '철괴';
      case 'Gold': return '금 원석';
      case 'GoldIngot': return '금괴';
      case 'Lapis': return '청금석';
      case 'Redstone': return '레드스톤';
      case 'Diamond': return '다이아몬드';
      case 'Emerald': return '에메랄드';
      case 'Scrap': return '네더라이트 파편';
      case 'Netherite': return '네더라이트';

      case 'Sand': return '모래';
      case 'Gravel': return '자갈';
      case 'Clay': return '점토';
      case 'Snow': return '눈덩이';
      
      case 'Wheatseed': return '밀 씨앗';
      case 'Wheat': return '밀';
      case 'Bonemeal': return '뼛가루';
      case 'Bread': return '빵';
      case 'Goldapple': return '황금 사과';
      
      case 'RottenFlesh': return '좀비 고기';
      case 'Carrot': return '당근';
      case 'Potato': return '감자';

      case 'SpiderEye': return '거미 눈';
      case 'String': return '실';
      case 'Bone': return '뼈';
      case 'Arrow': return '화살';
      
      case 'Porkchop': return '익히지 않은 돼지 고기';
      case 'Wool': return '양털';
      case 'Mutton': return '익히지 않은 양 고기';
      case 'Beef': return '익히지 않은 소 고기';
      case 'Leather': return '가죽';
      case 'Chicken': return '익히지 않은 닭 고기';
      case 'Feather': return '깃털';
      case 'Egg': return '달걀';

      case 'Porkchop2': return '익힌 돼지 고기';
      case 'Mutton2': return '익힌 양 고기';
      case 'Beef2': return '익힌 소 고기';
      case 'Chicken2': return '익힌 닭 고기';
      default: return '오류';
    }
  }
  
  function SellItem(item) {
    switch (item) {
      case 'Log': return 10;
      case 'Plank': return 2;
      case 'Stick': return 1;
      case 'Cobblestone': return 15;
      case 'Dirt': return 5;
      case 'Apple': return 100;

      case 'Coal': return 50;
      case 'Iron': return 75;
      case 'IronIngot': return 150;
      case 'Gold': return 200;
      case 'GoldIngot': return 400;
      case 'Lapis': return 100;
      case 'Redstone': return 80;
      case 'Diamond': return 800;
      case 'Emerald': return 1250;
      case 'Scrap': return 2000;
      case 'Netherite': return 10000;

      case 'Sand': return 5;
      case 'Gravel': return 5;
      case 'Clay': return 5;
      case 'Snow': return 5;
      
      case 'Wheatseed': return 10;
      case 'Wheat': return 100;
      case 'Bonemeal': return 50;
      case 'Bread': return 350;
      case 'Goldapple': return 4000;
      
      case 'RottenFlesh': return 300;
      case 'Carrot': return 500;
      case 'Potato': return 500;

      case 'SpiderEye': return 300;
      case 'String': return 150;
      case 'Bone': return 200;
      case 'Arrow': return 150;
      
      case 'Porkchop': return 100;
      case 'Wool': return 300;
      case 'Mutton': return 100;
      case 'Beef': return 100;
      case 'Leather': return 150;
      case 'Chicken': return 100;
      case 'Feather': return 150;
      case 'Egg': return 50;

      case 'Porkchop2': return 200;
      case 'Mutton2': return 200;
      case 'Beef2': return 200;
      case 'Chicken2': return 200;
      default: return 1;
    }
  }

  function SumItem() {
    let sum = 0;
    for (let key in mcItems) {
      let value = mcItems[key];
      if (typeof value === 'number' && value > 0) {
        sum += value;
      }
    }
    return sum;
  }
  

  let Tools = {
    Axe: 0,
    Pickaxe: 0,
    Shovel: 0,
    Sword: 0,
    Hoe: 0,
    
    AxeDura: 0,
    PickaxeDura: 0,
    ShovelDura: 0,
    SwordDura: 0,
    HoeDura: 0,

    AxeDuraMax: 0,
    PickaxeDuraMax: 0,
    ShovelDuraMax: 0,
    SwordDuraMax: 0,
    HoeDuraMax: 0
  };

  function getLogTime(toolLevel) {
    switch (toolLevel) {
      case 0: return 1000;
      case 1: return 400;
      case 2: return 300;
      case 3: return 200;
      case 4: return 150;
      case 5: return 130;
      default: return 1000;
    }
  }
  
  function getStoneTime(toolLevel) {
    switch (toolLevel) {
      case 0: return 3750;
      case 1: return 1150;
      case 2: return 600;
      case 3: return 400;
      case 4: return 300;
      case 5: return 250;
      default: return 3750;
    }
  }
  function getDirtTime(toolLevel) {
    switch (toolLevel) {
      case 0: return 750;
      case 1: return 400;
      case 2: return 300;
      case 3: return 200;
      case 4: return 150;
      case 5: return 125;
      default: return 750;
    }
  }
  function getSwordTime(toolLevel) {
    switch (toolLevel) {
      case 0: return 2000;
      case 1: return 1000;
      case 2: return 600;
      case 3: return 300;
      case 4: return 200;
      case 5: return 100;
      default: return 2000;
    }
  }

  function getText(toolName, toolLevel) {
    // toolLevel이 0이면 무조건 "맨손"
    if (toolLevel === 0) {
      return '맨손';
    }
    // toolName별 기본 한글명
    const toolNames = {
      Axe: '도끼',
      Pickaxe: '곡괭이',
      Shovel: '삽',
      Sword: '검',
      Hoe: '괭이'
    };
    // toolLevel별 접두사
    const prefixes = {
      1: '나무',
      2: '돌',
      3: '철',
      4: '다이아몬드',
      5: '네더라이트'
    };
    // toolName과 toolLevel 모두 있으면 접두사 + toolName 반환
    if (toolNames[toolName] && prefixes[toolLevel]) {
      return prefixes[toolLevel] + ' ' + toolNames[toolName];
    }
    // 위 조건 해당 없으면 toolName에 대응하는 한글명만 반환 (없으면 빈 문자열)
    return toolNames[toolName] || '';
  }
  
  
  //자원 획득 버튼 클릭
  function gatherResource(toolName, duraName, itemName) {
    const buttons = document.querySelectorAll('#gettem button');
    buttons.forEach(btn => {
      btn.style.visibility = 'hidden';
    });

    const toolLevel = Tools[toolName];
    const toolText = getText(toolName,toolLevel);
    if (Tools[toolName] >= 1) {
      if (Tools[duraName] <= 0) {
        logAdd(`${toolText}의 내구도가 없습니다!`,'red');
        Tools[toolName] = 0;
        return;
      }
    }
    let workTime = 10000;

    if (toolName === 'Axe') {
      workTime = getLogTime(toolLevel);
    } else if (toolName === 'Pickaxe') {
      if (itemName === 'Iron') {
        workTime = getStoneTime(toolLevel) * 3;
      } else {
        workTime = getStoneTime(toolLevel);
      }
    } else if (toolName === 'Shovel') {
      workTime = getDirtTime(toolLevel);
    } else if (toolName === 'Sword') {
      if (itemName === 'Mob') {
        workTime = getSwordTime(toolLevel) * 5;
      }
      else {
        workTime = getSwordTime(toolLevel);
      }
    }
    const progressBar = document.getElementById("Progress");
    const progressText = document.getElementById("ProgressText");
  
    let startTime = Date.now();
    // 진행바 업데이트용 interval
    const intervalId = setInterval(() => {
    let elapsed = Date.now() - startTime;
    let progress = Math.min(elapsed / workTime, 1);
    let percent = Math.floor(progress * 100);

    progressBar.style.width = percent + "%";
    progressText.textContent = percent + "%";
    if (itemName === 'Mob') {
      if (Stats.Hp > 0) {
        const DownHp = (workTime / 1000 * 0.05);
        Stats.Hp -= DownHp;
      } else {
        Death();
      }
    }
    if (Stats.Hg > 0) {
      const DownHg = (workTime / 1000 * 0.01);
      Stats.Hg -= DownHg;
    }
    if (Stats.Hg <= 0) {
      const DownHg = (workTime / 1000 * 0.01);
      Stats.Hg -= DownHg;
      Stats.Hp += Stats.Hg;
      Stats.Hg = 0;
      if (Stats.Hp <= 0) {
        Death();
      }
    }
    if (progress >= 1) {
      clearInterval(intervalId);

      // 작업 완료 처리
      if (itemName === 'Iron') {
        Tools[duraName]-= 5;
      } else if (itemName === 'Mob') {
        if (Tools[duraName] >= 1) {
          const AttackDura = Math.round(workTime / 250);
          Tools[duraName]-= AttackDura;
        }
      } else {
        Tools[duraName]--;
      }

      if (Tools[toolName] >= 1) {
        if (Tools[duraName] <= 0) {
          Tools[toolName] = 0;
          logAdd(`${toolText}이(가) 부서졌습니다!`,'red');
        }
      }

      // 나무
      if (itemName === 'Log') {
        FgainLog(toolLevel);
      }
      // 조약돌생성기 1티어
      if (itemName === 'Cobblestone') {
        FgainStone1(toolLevel);
      }
      // 조약돌생성기 2티어
      if (itemName === 'Iron') {
        FgainStone2(toolLevel);
      }
      // 흙
      if (itemName === 'Dirt') {
        FgainDirt(toolLevel);
      }
      // 좀비
      if (itemName === 'Mob') {
        let rand1 = Math.random() * 100;
        if (rand1 < 33) {
          logAdd(`좀비를 사냥합니다.`,'yellowgreen')
          FgainZombie(toolLevel);
        } else if (rand1 < 66) {
          logAdd(`거미를 사냥합니다.`,'yellowgreen')
          FgainSpider(toolLevel);
        } else {
          logAdd(`스켈레톤을 사냥합니다.`,'yellowgreen')
          FgainSeleton(toolLevel);
        }
      }
      if (itemName === 'Animal') {
        let rand1 = Math.random() * 100;
        if (rand1 < 25) {
          logAdd(`양을 도축합니다.`,'yellowgreen')
          FgainSheep(toolLevel);
        } else if (rand1 < 50) {
          logAdd(`소를 도축합니다.`,'yellowgreen')
          FgainCow(toolLevel);
        } else if (rand1 < 75) {
          logAdd(`닭을 도축합니다.`,'yellowgreen')
          FgainChicken(toolLevel);
        } else {
          logAdd(`돼지를 도축합니다.`,'yellowgreen')
          FgainPig(toolLevel);
        }
      }
      

      buttons.forEach(btn => {
        btn.style.visibility = 'visible';
      });
      drawItems();
      saveGame();
      // 진행바 초기화 (0%)
      progressBar.style.width = "0%";
      progressText.textContent = "0%";
    }
  }, 50); // 50ms마다 업데이트
  }
  
  function Death() {
    // mcItems 전부 0으로 초기화
    for (let key in mcItems) {
      if (mcItems.hasOwnProperty(key)) {
        mcItems[key] = 0;
      }
    }
    // Stats: Hp = Maxhp, Hg = Maxhg로 설정
    Stats.Hp = 18;
    Stats.Hg = 12;
    storage = 100;
    Fuel = 0;
  
    // Tools 전부 0으로 초기화
    for (let key in Tools) {
      if (Tools.hasOwnProperty(key)) {
        Tools[key] = 0;
      }
    }
    logAdd(`당신은 사망하였습니다.`,'red');
    logAdd(`가지고 있던 모든 아이템을 잃어버렸습니다.`,'red');
    logAdd(`물론 도구도 모두 잃어버렸습니다.`,'red');
    drawItems();
    saveGame();
  }

  function FgainLog(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    if (rand1 < Lv * 10) {
      gainItem('Apple', 1);
    }
    if (rand2 < Lv * 12.5) {
      gainItem('Stick', 1);
    }
    gainItem('Log', Lv + 1);
  }

  function FgainStone1(Lv) {
    let rand1 = Math.random() * 100;
    if (Lv === 0) {
      logAdd(`맨손으로 캐니 아무것도 나오지 않았습니다.`,'red');
    } else {
      if (rand1 < Lv * 3) {
        gainItem('Redstone', 1);
      } else if (rand1 < Lv * 10) {
        gainItem('Lapis', 1);
      } else if (rand1 < Lv * 25) {
        gainItem('Iron', 1);
      } else if (rand1 < Lv * 50) {
        gainItem('Coal', 1);
      }
        gainItem('Cobblestone', 1);
    }
  }

  function FgainStone2(Lv) {
    let rand1 = Math.random() * 100;
    if (Lv === 0) {
      logAdd(`맨손으로 캐니 아무것도 나오지 않았습니다.`,'red');
    } else {
      if (rand1 < Lv * 0.3) {
        gainItem('Scrap', 1);
      } else if (rand1 < Lv * 1) {
        gainItem('Emerald', 1);
      } else if (rand1 < Lv * 2) {
        gainItem('Diamond', 1);
      } else if (rand1 < Lv * 5) {
        gainItem('Gold', 1);
      } else {
        gainItem('Cobblestone', 1);
      }
    }
  }
  function FgainDirt(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    let rand3 = Math.random() * 100;
    let rand4 = Math.random() * 100;
    let rand5 = Math.random() * 100;
    let rand6 = Math.random() * 100;
    if (rand1 < Lv * 3) {
      gainItem('Wheatseed', 1);
    }
    if (rand2 < Lv * 5) {
      gainItem('Clay', 1);
    }
    if (rand4 < Lv * 10) {
      gainItem('Sand', 1);
    }
    if (rand5 < Lv * 25) {
      gainItem('Gravel', 1);
    }
    if (rand6 < Lv * 5) {
      gainItem('Snow', 1);
    }
    gainItem('Dirt', Lv + 1);
  }
  function FgainZombie(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    let rand3 = Math.random() * 100;
    if (rand1 < (2.5 + Lv)) {
      gainItem('IronIngot', 1);
    }
    if (rand2 < (2.5 + Lv)) {
      gainItem('Carrot', 1);
    }
    if (rand3 < (2.5 + Lv)) {
      gainItem('Potato', 1);
    }
    gainItem('RottenFlesh', Lv);
  }
  function FgainSeleton(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    if (rand1 < (5 * Lv)) {
      gainItem('Bone', 2);
    } else if (rand1 < (15 * Lv)) {
      gainItem('Bone', 1);
    } else if (rand1 < (35 * Lv)) {
      gainItem('Bonemeal', 2);
    } else {
      gainItem('Bonemeal', 1);
    }
    if (rand2 < (15 * Lv)) {
      gainItem('Arrow', 1);
    }
  }
  function FgainSpider(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    if (rand1 < (10 * Lv)) {
      gainItem('SpiderEye', 1);
    }
    if (rand2 < (15 * Lv)) {
      gainItem('String', 1);
    }
  }
  function FgainPig(Lv) {
    let rand1 = Math.random() * 100;
    if (rand1 < (10 * Lv)) {
      gainItem('Porkchop', 2);
    } else {
      gainItem('Porkchop', 1);
    }
  }
  function FgainCow(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    if (rand1 < (10 * Lv)) {
      gainItem('Beef', 2);
    } else {
      gainItem('Beef', 1);
    }
    if (rand2 < (15 * Lv)) {
      gainItem('Leather', 1);
    }
  }
  function FgainSheep(Lv) {
    let rand1 = Math.random() * 100;
    if (rand1 < (10 * Lv)) {
      gainItem('Mutton', 2);
    } else {
      gainItem('Mutton', 1);
    }
    gainItem('Wool', 1);
  }
  function FgainChicken(Lv) {
    let rand1 = Math.random() * 100;
    let rand2 = Math.random() * 100;
    let rand3 = Math.random() * 100;
    if (rand1 < (10 * Lv)) {
      gainItem('Chicken', 2);
    } else {
      gainItem('Chicken', 1);
    }
    if (rand2 < (15 * Lv)) {
      gainItem('Feather', 1);
    }
    if (rand3 < (25 * Lv)) {
      gainItem('Egg', 1);
    }
  }
  
  const tileSize = 50;
  const canvas = document.getElementById('itemCanvas');
  const ctx = canvas.getContext('2d');

  // 정렬 상태
  let currentSort = 'default';

  // 아이템 기본 순서 보존용
  const defaultItemOrder = Object.keys(mcItems);

  // 이미지 캐시
  const imageCache = {};

  
    // 캔버스 사이즈 및 타일 그리기
    function drawItems() {
      // const items = getSortedItems();
      const items = getSortedItems().filter(name => mcItems[name] > 0);
      const width = window.innerWidth - 20; // 여백 고려
      const cols = Math.floor(width / tileSize);
      const rows = Math.ceil(items.length / cols);

      canvas.width = cols * tileSize;
      canvas.height = rows * tileSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      items.forEach((itemName, index) => {
        const count = mcItems[itemName];
        const x = (index % cols) * tileSize;
        const y = Math.floor(index / cols) * tileSize;

        drawTile(itemName, count, x, y);
      });
      CraftList();
      ToolShow();
      drawTiles();
      ShowHp();
    }

    function drawTile(name, count, x, y) {
      const imgPath = `img/Item/${name}.webp`;
    
      function drawEverything() {
        // 이미지 또는 기본 배경 그리기
        ctx.drawImage(imageCache[name], x, y, tileSize, tileSize);
        // 수량 그리기
        drawCount(count, x, y);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1);
      }
    
      if (imageCache[name]) {
        drawEverything();
      } else {
        const img = new Image();
        img.src = imgPath;
        img.onload = () => {
          imageCache[name] = img;
          drawEverything(); // 이미지가 로드된 후에 모든 것 그림
        };
        img.onerror = () => {
          // 이미지 로드 실패 시 기본 배경
          ctx.fillStyle = "#ccc";
          ctx.fillRect(x, y, tileSize, tileSize);
          ctx.fillStyle = "#000";
          ctx.fillText(name, x + 5, y + 20);
          // ✅ 테두리도 그리기
          ctx.strokeStyle = 'gray';
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1);
        };
      }
    }
    

    // 수량 텍스트 표시
    function drawCount(count, x, y) {
      ctx.font = `${tileSize * 0.4}px Arial`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      const text = count.toString();
      const textWidth = ctx.measureText(text).width;

      const tx = x + tileSize - textWidth - 3;
      const ty = y + tileSize - 5;

      ctx.strokeText(text, tx, ty);
      ctx.fillText(text, tx, ty);
    }

    // 정렬 함수
    function getSortedItems() {
      let keys = Object.keys(mcItems);
      switch (currentSort) {
        case 'reverse':
          return keys.sort((a, b) => mcItems[a] - mcItems[b]);
        case 'count':
          return keys.sort((a, b) => mcItems[b] - mcItems[a]);
          case 'normal':
            return [...defaultItemOrder];
        default:
          return keys.sort((a, b) => mcItems[b] - mcItems[a]);
      }
    }

    // 정렬 토글
    function sortItems(type) {
      currentSort = type;
      drawItems();
    }

    function CraftList() {
      const craftingRequirements = [
        { id: "EatApple", required: { Apple: 1 } },
        { id: "EatBread", required: { Bread: 1 } },
        { id: "EatGApple", required: { Goldapple: 1 } },
        { id: "EatPorkchop", required: { Porkchop2: 1 } },
        { id: "EatBeef", required: { Beef2: 1 } },
        { id: "EatChicken", required: { Chicken2: 1 } },
        { id: "EatMutton", required: { Mutton2: 1 } },

        { id: "Chest", required: { Plank: 8 } },
        { id: "Log1", required: { Log: 1 } },
        { id: "Plank2", required: { Plank: 2 } },
        { id: "Bread", required: { Wheat: 3 } },
        { id: "Goldapple", required: { GoldIngot: 8, Apple: 1 } },
        { id: "Wool", required: { String: 4 } },
        // 나무 도구
        { id: "Axe1", required: { Plank: 3, Stick: 2 } },
        { id: "Pickaxe1", required: { Plank: 3, Stick: 2 } },
        { id: "Shovel1", required: { Plank: 1, Stick: 2 } },
        { id: "Sword1", required: { Plank: 2, Stick: 1 } },
        { id: "Hoe1", required: { Plank: 2, Stick: 2 } },
        // 돌 도구
        { id: "Axe2", required: { Cobblestone: 3, Stick: 2 } },
        { id: "Pickaxe2", required: { Cobblestone: 3, Stick: 2 } },
        { id: "Shovel2", required: { Cobblestone: 1, Stick: 2 } },
        { id: "Sword2", required: { Cobblestone: 2, Stick: 1 } },
        { id: "Hoe2", required: { Cobblestone: 2, Stick: 2 } },
        // 철 도구
        { id: "Axe3", required: { IronIngot: 3, Stick: 2 } },
        { id: "Pickaxe3", required: { IronIngot: 3, Stick: 2 } },
        { id: "Shovel3", required: { IronIngot: 1, Stick: 2 } },
        { id: "Sword3", required: { IronIngot: 2, Stick: 1 } },
        { id: "Hoe3", required: { IronIngot: 2, Stick: 2 } },
        // 다이아 도구
        { id: "Axe4", required: { Diamond: 3, Stick: 2 } },
        { id: "Pickaxe4", required: { Diamond: 3, Stick: 2 } },
        { id: "Shovel4", required: { Diamond: 1, Stick: 2 } },
        { id: "Sword4", required: { Diamond: 2, Stick: 1 } },
        { id: "Hoe4", required: { Diamond: 2, Stick: 2 } },
        
        { id: "Farm11", required: { Apple: 3 } },
        { id: "Farm12", required: { Sand: 4, Gravel: 5 } },

        // Fuel
        { id: "FIron", required: { Iron: 1 } },
        { id: "FGold", required: { Gold: 1 } },
        { id: "FLog", required: { Log: 1 } },
        { id: "FPork", required: { Porkchop: 1 } },
        { id: "FBeef", required: { Beef: 1 } },
        { id: "FChicken", required: { Chicken: 1 } },
        { id: "FMutton", required: { Mutton: 1 } },
      ];
  
      craftingRequirements.forEach(item => {
        const canCraft = Object.entries(item.required).every(([key, value]) => {
          return mcItems[key] >= value;
        });
  
        document.getElementById(item.id).classList.toggle("hidden", !canCraft);
      });
      if (LowTools.checked) {
        CraftBanList();
      }
    }

    function CraftBanList() {
      const toolTypes = ['Axe', 'Pickaxe', 'Shovel', 'Hoe', 'Sword'];
      let Sames = 1;
      if (SameTools.checked) {
        Sames = 0;
      }
      
      toolTypes.forEach(tool => {
        const level = Tools[tool];
        for (let i = 1; i <= 4; i++) {
          if (level >= i+Sames) {
            const element = document.getElementById(`${tool}${i}`);
            if (element) {
              element.classList.add("hidden");
            }
          }
        }
      });
    }
    
    function craftChest() {
      let ReqTem1 = 'Plank';
      let ReqCnt1 = 8;
      if (mcItems[ReqTem1] >= ReqCnt1) {
        mcItems[ReqTem1] -= ReqCnt1;
        storage += 50;
        // mcItems[GetTem] += GetCnt;
        logAdd(`.`,'black');
        logAdd(`${getNameItem(ReqTem1)} -${ReqCnt1}, (${mcItems[ReqTem1]})`,'pink');
        if (LogSmall.checked) {
          logAdd(`[조합] 상자 제작`,'lightgreen');
        }
        else {
          logAdd(`[조합] ${getNameItem(ReqTem1)} ${ReqCnt1}개를 소모하여 상자를 제작하였습니다.`,'lightgreen');
        }
        logAdd(`저장 공간이 50 증가하였습니다.`,'cyan');
        drawItems();
      } else {
        logAdd(`[조합] 재료 ${getNameItem(ReqTem1)}이(가) ${ReqCnt1}개 필요합니다.`,'red');
      }
      saveGame();
    }

    function Fuels(ReqTem,GetTem,GetCnt) {
      if (Fuel >= 1) {
        Fuel -= 1;
        mcItems[ReqTem] -= 1;
        gainItem(GetTem, GetCnt);
        logAdd(`.`,'black');
        logAdd(`${getNameItem(ReqTem)} -1, (${mcItems[ReqTem]})`,'pink');
        logAdd(`${getNameItem(GetTem)} +${GetCnt}, (${mcItems[GetTem]})`,'cyan');
        if (LogSmall.checked) {
          logAdd(`[제련] ${getNameItem(GetTem)} ${GetCnt}개 획득`,'lightgreen');
        }
        else {
          logAdd(`[제련] ${getNameItem(ReqTem)} 1개를 소모하여 ${getNameItem(GetTem)} ${GetCnt}개를 획득하였습니다.`,'lightgreen');
        }
        drawItems();
      } else {
        logAdd(`[제련] 연료가 부족합니다.`,'red');
      }
      saveGame();
    }

    function craft1(ReqTem1,ReqCnt1,GetTem,GetCnt) {
      if (mcItems[ReqTem1] >= ReqCnt1) {
        mcItems[ReqTem1] -= ReqCnt1;
        gainItem(GetTem, GetCnt);
        // mcItems[GetTem] += GetCnt;
        logAdd(`.`,'black');
        logAdd(`${getNameItem(ReqTem1)} -${ReqCnt1}, (${mcItems[ReqTem1]})`,'pink');
        logAdd(`${getNameItem(GetTem)} +${GetCnt}, (${mcItems[GetTem]})`,'cyan');
        if (LogSmall.checked) {
          logAdd(`[조합] ${getNameItem(GetTem)} ${GetCnt}개 획득`,'lightgreen');
        }
        else {
          logAdd(`[조합] ${getNameItem(ReqTem1)} ${ReqCnt1}개를 소모하여 ${getNameItem(GetTem)} ${GetCnt}개를 획득하였습니다.`,'lightgreen');
        }
        drawItems();
      } else {
        logAdd(`[조합] 재료 ${getNameItem(ReqTem1)}이(가) ${ReqCnt1}개 필요합니다.`,'red');
      }
      saveGame();
    }
    function craft2(ReqTem1,ReqCnt1,ReqTem2,ReqCnt2,GetTem,GetCnt) {
      if (mcItems[ReqTem1] >= ReqCnt1 && mcItems[ReqTem2] >= ReqCnt2) {
        mcItems[ReqTem1] -= ReqCnt1;
        mcItems[ReqTem2] -= ReqCnt2;
        gainItem(GetTem, GetCnt);
        // mcItems[GetTem] += GetCnt;
        logAdd(`.`,'black');
        logAdd(`${getNameItem(ReqTem1)} -${ReqCnt1}, (${mcItems[ReqTem1]})`,'pink');
        logAdd(`${getNameItem(ReqTem2)} -${ReqCnt2}, (${mcItems[ReqTem2]})`,'pink');
        logAdd(`${getNameItem(GetTem)} +${GetCnt}, (${mcItems[GetTem]})`,'cyan');
        if (LogSmall.checked) {
          logAdd(`[조합] ${getNameItem(GetTem)} ${GetCnt}개 획득`,'lightgreen');
        }
        else {
          logAdd(`[조합] ${getNameItem(ReqTem1)} ${ReqCnt1}개, ${getNameItem(ReqTem2)} ${ReqCnt2}개를 소모하여 ${getNameItem(GetTem)} ${GetCnt}개를 획득하였습니다.`,'lightgreen');
        }
        drawItems();
      } else {
        if (mcItems[ReqTem1] < ReqCnt1) logAdd(`[조합] 재료 ${getNameItem(ReqTem1)}이(가) ${ReqCnt1}개 필요합니다.`,'red');
        if (mcItems[ReqTem2] < ReqCnt2) logAdd(`[조합] 재료 ${getNameItem(ReqTem2)}이(가) ${ReqCnt2}개 필요합니다.`,'red');
      }
      saveGame();
    }
    function ToolCraft(ReqTem1,ReqCnt1,ReqTem2,ReqCnt2,GetTem,GetVal,Dura,DuraMax,DrVal) {
      if (mcItems[ReqTem1] >= ReqCnt1 && mcItems[ReqTem2] >= ReqCnt2) {
        mcItems[ReqTem1] -= ReqCnt1;
        mcItems[ReqTem2] -= ReqCnt2;
        if (Tools[GetTem] <= GetVal) {
          Tools[GetTem] = GetVal;
          Tools[Dura] = DrVal;
          Tools[DuraMax] = DrVal;
          logAdd(`.`,'black');
          logAdd(`${getNameItem(ReqTem1)} -${ReqCnt1}, (${mcItems[ReqTem1]})`,'pink');
          logAdd(`${getNameItem(ReqTem2)} -${ReqCnt2}, (${mcItems[ReqTem2]})`,'pink');
          logAdd(`${getText(GetTem,Tools[GetTem])} 내구도 ${DrVal}`,'cyan');
          if (LogSmall.checked) {
            logAdd(`[도구 제작] ${getText(GetTem,Tools[GetTem])} 제작`,'lightgreen');
          }
          else {
            logAdd(`[도구 제작] ${getNameItem(ReqTem1)} ${ReqCnt1}개, ${getNameItem(ReqTem2)} ${ReqCnt2}개를 소모하여 ${getText(GetTem,Tools[GetTem])}를 획득하였습니다.`,'lightgreen');
          }
          drawItems();
        } else {
          logAdd(`[도구 조합] 이미 더 높은 등급의 도구를 가지고 있습니다.`,'red');
        }
      } else {
        if (mcItems[ReqTem1] < ReqCnt1) logAdd(`[조합] 재료 ${getNameItem(ReqTem1)}이(가) ${ReqCnt1}개 필요합니다.`,'red');
        if (mcItems[ReqTem2] < ReqCnt2) logAdd(`[조합] 재료 ${getNameItem(ReqTem2)}이(가) ${ReqCnt2}개 필요합니다.`,'red');
      }
      saveGame();
    }

    function ToolShow() {
      
    const toolNames = ["Axe", "Pickaxe", "Shovel", "Sword", "Hoe"];
    const container = document.getElementById("toolContainer");
    container.innerHTML = ''; // 기존 도구 DOM을 초기화
    toolNames.forEach(tool => {
      const toolLevel = Tools[tool];
      const dura = Tools[tool + "Dura"];
      const duraMax = Tools[tool + "DuraMax"];
  
      const toolDiv = document.createElement("div");
      toolDiv.className = "tool";
  
      const imgDiv = document.createElement("div");
      imgDiv.className = "tool-image";
  
      if (toolLevel >= 1 && toolLevel <= 5) {
        imgDiv.style.backgroundImage = `url("img/Tools/${tool}${toolLevel}.webp")`;
  
        // 내구도 텍스트 추가
        const duraText = document.createElement("div");
        duraText.className = "durability-text";
        duraText.textContent = dura;
        imgDiv.appendChild(duraText);
      }
  
      toolDiv.appendChild(imgDiv);
  
      if (toolLevel >= 1 && duraMax > 0) {
        const bar = document.createElement("div");
        bar.className = "durability-bar";
  
        const fill = document.createElement("div");
        const ratio = dura / duraMax;
        fill.className = "durability-fill";
        fill.style.width = `${Math.floor(ratio * 50)}px`;
  
        if (ratio >= 0.66) {
          fill.style.backgroundColor = "green";
        } else if (ratio >= 0.33) {
          fill.style.backgroundColor = "orange";
        } else {
          fill.style.backgroundColor = "red";
        }
  
        bar.appendChild(fill);
        toolDiv.appendChild(bar);
      }
  
      container.appendChild(toolDiv);
    });

    }

    //farm
    // 타일 사이즈 및 그리드 크기
    const TILE_SIZE = 50;
    const GRID_WIDTH = 9;
    const GRID_HEIGHT = 9;

    // 이미지 경로 기본
    const IMAGES = {
      farmland: 'img/block/farmland.png',
      water: 'img/block/water.png',
    };

    // 타일 객체 정의
    class Tile {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = null;    // 작물 종류, null이면 빈 땅
        this.grow = 0;       // 성장단계
        this.growexp = 0;    // 성장 경험치
      }
  
      getImageKey() {
        // 중앙 타일 (4,4) 은 물
        if (this.x === 4 && this.y === 4) return 'water';
        // 작물이 심어져 있고 이미지가 있으면 그 이미지
        if (this.type && IMAGES[this.type]) return this.type;
        // 기본은 farmland
        return 'farmland';
      }
    }

  // 캔버스 및 컨텍스트
  const farmCanvas = document.getElementById('farmCanvas');
  const ctx2 = farmCanvas.getContext('2d');

  // 타일 데이터 초기화
  const tiles = [];
  for(let y = 0; y < GRID_HEIGHT; y++) {
    for(let x = 0; x < GRID_WIDTH; x++) {
      tiles.push(new Tile(x, y));
    }
  }

  // 이미지 로드 저장 객체
  const loadedImages = {};

  // 이미지들을 비동기 로드하는 함수
  function loadImages(imagePaths) {
    const promises = [];
    for(const [key, src] of Object.entries(imagePaths)) {
      promises.push(new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages[key] = img;
          resolve();
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      }));
    }
    return Promise.all(promises);
  }

  // 모든 타일을 그리는 함수
  function drawTiles() {
    ctx2.clearRect(0, 0, farmCanvas.width, farmCanvas.height);
    for(const tile of tiles) {
      const x = tile.x * TILE_SIZE;
      const y = tile.y * TILE_SIZE;
      // 1. 배경 이미지 (예: farmland 또는 water)
      const bgKey = tile.x === 4 && tile.y === 4 ? 'water' : 'farmland';
      const bgImg = loadedImages[bgKey];
      if (bgImg) {
        ctx2.drawImage(bgImg, x, y, TILE_SIZE, TILE_SIZE);
      }
      // 2. 작물 이미지가 있다면 중앙에 작게 겹쳐서 그림
      if (tile.type) {
        // 현재 성장 단계 기반 키 생성
        const cropKey = `${tile.type}_stage_${tile.grow}`;
        const cropImg = loadedImages[cropKey];
      
        if (cropImg) {
          const iconSize = 32;
          const offsetX = x + (TILE_SIZE - iconSize) / 2;
          const offsetY = y + (TILE_SIZE - iconSize) / 2;
      
          ctx2.drawImage(cropImg, offsetX, offsetY, iconSize, iconSize);
        } else {
          logAdd(`이미지 없음: ${cropKey}`,'red');
        }
      }
    }
  }
  // 클릭 이벤트 리스너 등록
  farmCanvas.addEventListener('click', (event) => {
    // 캔버스 내부의 마우스 클릭 위치를 계산
    const rect = farmCanvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // 클릭한 타일 좌표 계산
    const tileX = Math.floor(clickX / TILE_SIZE);
    const tileY = Math.floor(clickY / TILE_SIZE);

    // 예시: 클릭한 타일 정보 얻기
    const tile = tiles.find(t => t.x === tileX && t.y === tileY);
    if(tile) {
      if (tileX === 4 && tileY === 4) {
        logAdd(`물`,'blue')
      } else {
        const toolLevel = Tools['Hoe'];
        const toolText = getText('Hoe',toolLevel);
        if (toolLevel >= 1 && Tools['HoeDura'] >= 1) {
          Tools['HoeDura'] -= 1;
          if (!tile.type) {
            if (mcItems['Wheatseed'] >= 1 && mcItems['Dirt'] >= 1) {
              mcItems['Wheatseed'] -= 1;
              mcItems['Dirt'] -= 1;
              tile.type = 'wheat';
              tile.grow = 0;
              logAdd(`${getNameItem('Wheatseed')} -1, (${mcItems['Wheatseed']})`,'pink');
              logAdd(`씨앗을 심었습니다.`,'greenyellow')
            } else {
              logAdd(`씨앗이 부족합니다.`,'red')
            }
          } else if (tile.type = 'wheat') {
            if (tile.grow < 3) {
              if (mcItems['Bonemeal'] >= 1) {
                mcItems['Bonemeal'] -= 1;
                tile.grow += 1;
                logAdd(`${getNameItem('Bonemeal')} -1, (${mcItems['Bonemeal']})`,'pink');
                logAdd(`씨앗이 성장하였습니다.`,'greenyellow')
              } else {
                logAdd(`뼛가루가 부족합니다.`,'red')
              }
            } else {
              let SeedCnt = Math.floor(Math.random() * 3 + 1)
              tile.type = null;
              gainItem('Wheat', 1);
              logAdd(`${getNameItem('Wheat')} +1, (${mcItems['Wheat']})`,'lightgreen');
              logAdd(`밀 작물을 채집하였습니다.`,'greenyellow')
              gainItem('Wheatseed', SeedCnt);
              logAdd(`${getNameItem('Wheatseed')} +${SeedCnt}, (${mcItems['Wheatseed']})`,'lightgreen');
              logAdd(`밀 씨앗 ${SeedCnt}개를 채집하였습니다.`,'greenyellow')
            }
          }
        } else {
          logAdd(`괭이 내구도가 부족합니다.`,'red')
        }
      }
      // logAdd(`타일 위치: (${tile.x}, ${tile.y})\n타입: ${tile.type || '빈 땅'}\n성장단계: ${tile.grow}\n경험치: ${tile.growexp}`,'cyan');
      drawItems();
    }
  });


  // 초기 이미지 로드 후 타일 그리기 실행
  loadImages(IMAGES)
    .then(() => {
      drawItems();
    })
    .catch(err => {
      console.error(err);
    });

  // 성장 단계별로 이미지 로드용 추가
const dynamicImages = { ...IMAGES };

// 예: carrot는 성장 단계 0~3까지
for (let i = 0; i <= 3; i++) {
  dynamicImages[`carrot_stage_${i}`] = `img/block/carrot_stage_${i}.png`;
  dynamicImages[`potato_stage_${i}`] = `img/block/potato_stage_${i}.png`;
  dynamicImages[`wheat_stage_${i}`] = `img/block/wheat_stage_${i}.png`;
}

// 이후에 dynamicImages를 loadImages에 전달
loadImages(dynamicImages)
  .then(() => {
    drawItems();
  })
  .catch(err => {
    console.error(err);
  });

  function Eat(Itm) {
    if (mcItems[Itm] >= 1) {
      mcItems[Itm] -= 1;
      switch (Itm) {
        case 'Apple': Stats.Hg += 2;
        break;
        case 'Bread','Chicken2','Mutton2': Stats.Hg += 3;
        break;
        case 'Porkchop2','Beef2': Stats.Hg += 4;
        break;
        case 'Goldapple': Stats.Hg = Stats.Maxhg;
        break;
        default: Stats.Hg += 1;
        break;
      }
      if (Stats.Hg >= Stats.Maxhg) {
        Stats.Hg = Stats.Maxhg;
        if (Stats.Hp < Stats.Maxhp) {
          Stats.Hp += 2;
        }
        if (Stats.Hp >= Stats.Maxhp) {
          Stats.Hp = Stats.Maxhp;
        }
      }
      logAdd(`${getNameItem(Itm)}을(를) 섭취합니다.`,'lightgreen');
    } else {
      logAdd(`해당 아이템이 없습니다.`,'red');
    }
    drawItems();
    saveGame();
  }

  function ShowHp() {
    const playerHpBar = document.getElementById("player-hp-bar");
    const playerHgBar = document.getElementById("player-hg-bar");
    const playerHpPercent = (Stats.Hp / Stats.Maxhp) * 100;
    const playerHgPercent = (Stats.Hg / Stats.Maxhg) * 100;
    playerHpBar.style.width = playerHpPercent + "%";
    playerHgBar.style.width = playerHgPercent + "%";

    const hpEl = document.getElementById("hp");
    const hgEl = document.getElementById("hg");
    hpEl.textContent = "체력 : " + Rd3(Stats.Hp) + " / " + Stats.Maxhp;
    hgEl.textContent = "허기 : " + Rd3(Stats.Hg) + " / " + Stats.Maxhg;

    const Tstorage = document.getElementById("storage");
    Tstorage.textContent = "저장량 : " + Num3(SumItem()) + " / " + Num3(storage);
    const TFuel = document.getElementById("Fuel");
    if (Fuel >= 1) {
      TFuel.textContent = "연료 : " + Rd1(Fuel);
    } else {
      TFuel.textContent = "";
    }
    
    const TCoin = document.getElementById("Coin");
    TCoin.textContent = "코인 : " + Num3(Coin);
  }

  function gainItem(itemName, amount) {
    const currentTotal = SumItem();
    const spaceLeft = storage - currentTotal;
  
    if (spaceLeft <= 0) return; // 공간 없음
  
    const amountToAdd = Math.min(spaceLeft, amount);
  
    if (!mcItems[itemName]) {
      mcItems[itemName] = 0;
    }
  
    mcItems[itemName] += amountToAdd;
    
    if (LogSmall.checked) {
      logAdd(`${getNameItem(itemName)} +${amountToAdd}, (${mcItems[itemName]})`,'lightgreen');
    }
    else {
      logAdd(`${getNameItem(itemName)} +${amountToAdd}, (${mcItems[itemName]-amountToAdd} > ${mcItems[itemName]} / 잔여 공간 :${spaceLeft} )`,'lightgreen');
    }
  }
  
  // function Sell() {
  //   const trashItems = ['Cobblestone', 'Clay', 'Snow','Lapis','Redstone','RottenFlesh'];
  //   trashItems.forEach(item => {
  //     if (mcItems[item] >= 1) {
  //       Coin += mcItems[item];
  //       logAdd(`${getNameItem(item)} ${mcItems[item]}개를 판매하였습니다.`, 'lightgreen');
  //       mcItems[item] = 0;
  //     }
  //   });
    
  //   drawItems();
  //   saveGame();
  // }

  function Rd3(A) {
    return Number(A.toFixed(3));
  }
  function Rd1(A) {
    return Number(A.toFixed(1));
  }

  function Num3(number) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(number);
  }

  //2025.08.11 09:30
  //캔버스에 아이템 클릭
  canvas.addEventListener('click', handleCanvasClick);

  function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cols = Math.floor(canvas.width / tileSize);
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    const index = row * cols + col;

    const items = getSortedItems().filter(name => mcItems[name] > 0);
    const itemName = items[index];
    if (!itemName) return; // 클릭한 위치에 아이템 없으면 종료
    const count = mcItems[itemName];
    logAdd(`🧱 아이템: ${getNameItem(itemName)} 📦 수량: ${count} 💰 판매가: ${SellItem(itemName)}`, 'lightgray');
    if (FuelButton.classList.contains('FuelOn')) {
      const fuelValues = {
        Coal: 8,
        Plank: 1,
        Log: 1,
        Stick: 0.5
      };
      if (fuelValues.hasOwnProperty(itemName)) {
        Fuel += fuelValues[itemName];
        mcItems[itemName] = Math.max((mcItems[itemName] || 0) - 1, 0);
      
        drawItems();
        logAdd(`${getNameItem(itemName)}를 연료로 사용합니다. 연료 +${fuelValues[itemName]} 획득`, 'cyan');
        logAdd(`연료 ${Fuel} 보유`,'lightgreen')
      }      
    } else {
      if (sellButton.classList.contains('SellOn1')) {
        if (count > 0) {
          Coin += SellItem(itemName);
          mcItems[itemName] -= 1;
          if (mcItems[itemName] < 0) mcItems[itemName] = 0;

          drawItems();
          logAdd(`${getNameItem(itemName)} 1개 판매 완료! 코인 +${SellItem(itemName)} 획득`, 'cyan');
        } else {
          logAdd(`판매 가능한 아이템이 아니거나 수량이 없습니다.`, 'orange');
        }
      } else if (sellButton.classList.contains('SellOn2')) {
        if (count > 0) {
          Coin += SellItem(itemName) * count;
          mcItems[itemName] = 0;
          drawItems();
          logAdd(`${getNameItem(itemName)} ${count}개 일괄 판매 완료! 코인 +${SellItem(itemName) * count} 획득`, 'cyan');
        } else {
          logAdd(`판매 가능한 아이템이 아니거나 수량이 없습니다.`, 'orange');
        }

      } else {
        // // SellOff 상태면 판매 기능 꺼짐
        // logAdd(`판매 기능이 꺼져있습니다.`, 'gray');
      }
    }
    saveGame();
  }

  //2025.08.11 09:32
  //판매 버튼 토글.
  const sellButton = document.getElementById('sellButton');
  sellButton.addEventListener('click', () => {
    if (sellButton.classList.contains('SellOff')) {
      sellButton.classList.remove('SellOff');
      sellButton.classList.add('SellOn1');
      logAdd(`낱개 판매 기능이 켜집니다.`,'lightgreen');
    } else if (sellButton.classList.contains('SellOn1')) {
      sellButton.classList.remove('SellOn1');
      sellButton.classList.add('SellOn2');
      logAdd(`일괄 판매 기능이 켜집니다.`,'cyan');
    } else if (sellButton.classList.contains('SellOn2')) {
      sellButton.classList.remove('SellOn2');
      sellButton.classList.add('SellOff');
      logAdd(`판매 기능이 꺼집니다.`,'red');
    }
  });
  const FuelButton = document.getElementById('FuelButton');
  FuelButton.addEventListener('click', () => {
    if (FuelButton.classList.contains('FuelOff')) {
      FuelButton.classList.remove('FuelOff');
      FuelButton.classList.add('FuelOn');
      logAdd(`연료 삽입 기능이 켜집니다.`,'lightgreen');
    } else if (FuelButton.classList.contains('FuelOn')) {
      FuelButton.classList.remove('FuelOn');
      FuelButton.classList.add('FuelOff');
      logAdd(`연료 삽입 기능이 꺼집니다.`,'red');
    }
  });





  let version = '0.1';

  // UI 요소들
  const logContainer = document.getElementById("log-container");
  

  // 메뉴 전환 함수
  function showPanel(panelName) {
    const panelIds = ["stat", "gettem", "craft", "farm","option","updat"];
    const panels = Object.fromEntries(
      panelIds.map(id => [id, document.getElementById(id)])
    );

    for (let key in panels) {
      panels[key].classList.remove("visible");
    }
    panels[panelName].classList.add("visible");
  }
  // 로그창 관련
  function logAdd(text, color) {
    const p = document.createElement("p");
    if (color) {
      const span = document.createElement("span");
      span.textContent = text;
      span.style.color = color;
      p.appendChild(span);
    } else {
      p.textContent = text;
    }
    logContainer.appendChild(p);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  function logClear() {
    logContainer.innerHTML = "";
  }

  showPanel("stat");

  // 저장 함수
  function saveGame() {
    const saveData = {
      version,
      mcItems,Tools,Stats,storage,Coin,Fuel
    };
    localStorage.setItem("minecraft_save", JSON.stringify(saveData));
    // logAdd("save", "black");
  }
  
  // 불러오기 함수
  function loadGame() {
    const saved = localStorage.getItem("minecraft_save");
    if (!saved) return false;

    try {
      const saveData = JSON.parse(saved);
      if (saveData.version !== version) {
        logAdd("저장된 게임 버전이 맞지 않아 불러올 수 없습니다.", "red");
        return false;
      }
      Object.assign(mcItems, saveData.mcItems);
      Object.assign(Tools, saveData.Tools);
      Object.assign(Stats, saveData.Stats);
      storage = saveData.storage;
      Coin = saveData.Coin;
      Fuel = saveData.Fuel;
      return true;
    } catch(e) {
      logAdd("게임 불러오기 중 오류가 발생했습니다.", "red");
      return false;
    }
  }
  
  // 페이지 로드 시 자동 불러오기 시도
  document.addEventListener("DOMContentLoaded", () => {
    if (loadGame()) {
      logAdd("저장된 게임을 불러왔습니다.", "lightgreen");
    } else {
      logAdd("새 게임을 시작합니다.", "lightgreen");
    }
  });

  // 1분마다 자동 저장
  setInterval(saveGame, 60000);

  document.getElementById("reset-game-btn").addEventListener("click", () => {
    const confirmReset = confirm("정말로 게임을 초기화하고 새로 시작하시겠습니까?");
    if (confirmReset) {
      localStorage.removeItem("minecraft_save");
      alert("게임 데이터가 초기화되었습니다. 페이지가 새로고침됩니다.");
      location.reload(); // 새로고침
    }
  });


    // 초기화
    window.addEventListener('resize', drawItems);
    window.addEventListener('load', drawItems);