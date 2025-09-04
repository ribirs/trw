
  // 스탯 기본값
  let stats = {
    lv: 1,
    exp: 0,
    hp: 20,
    mp: 5,
    statPoint: 3,
    skillPoint: 1,
    str: 0,
    dex: 0,
    int: 0,
    luk: 0,
    con: 0,
    men: 0,
    gold: 10
  };

  let detailedShown = false;

  // 던전 관련 변수
  let Stage = 1;
  let monster = {
    maxHp: 0,
    hp: 0,
    atk: 0,
    accuracy: 50
  };
  let player = {
    maxHp: 0,
    hp: 0,
    atk: 0,
    accuracy: 0
  };
  let potions = 2;
  let Job = "초보자";

  // UI 요소들
  const statPointEl = document.getElementById("statPoint");
  const skillPointEl = document.getElementById("skillPoint");
  const lvEl = document.getElementById("lv");
  const expEl = document.getElementById("exp");
  const expNeededEl = document.getElementById("expNeeded");
  const hpEl = document.getElementById("hp");
  const mpEl = document.getElementById("mp");
  const goldEl = document.getElementById("gold");
  const version = "0.1";
  const monsterHpBar = document.getElementById("monster-hp-bar");
  const monsterHpText = document.getElementById("monster-hp-text");
  const monsterAtkEl = document.getElementById("monster-atk");
  const playerLvBar = document.getElementById("player-lv-bar");
  const playerHpBar = document.getElementById("player-hp-bar");
  const playerMpBar = document.getElementById("player-mp-bar");
  const playerXpBar = document.getElementById("player-xp-bar");
  const playerHpText = document.getElementById("player-hp-text");
  const playerAtkEl = document.getElementById("player-atk");
  const attackBtn = document.getElementById("attack-btn");
  const potionBtn = document.getElementById("potion-btn");
  const healBtn = document.getElementById("heal-btn");
  const potionCountEl = document.getElementById("potion-count");
  const potionCountEl2 = document.getElementById("potion-count2");
  const dungeonBattleDiv = document.getElementById("dungeon-battle");
  const logContainer = document.getElementById("log-container");
  const DungeonLv = document.getElementById("DungeonLv");
  const inn = document.getElementById("inn");
  const JobName = document.getElementById("JobName");
  

  // --- 스텟 분배 UI 생성 ---
  function createStatControls() {
    const container = document.getElementById("custom-stats");
    container.innerHTML = "";
    const statsKeys = ["str", "dex", "int", "luk", "con", "men"];
    statsKeys.forEach(stat => {
      const div = document.createElement("div");
      div.classList.add("stat-item");
      const label = document.createElement("div");
      label.textContent = stat.toUpperCase() + ": ";
      const value = document.createElement("span");
      value.id = stat + "-val";
      value.textContent = stats[stat];
      label.appendChild(value);

      // 버튼들
      const btns = document.createElement("div");
      btns.classList.add("stat-buttons");

      const incBtn = document.createElement("button");
      incBtn.textContent = "+1";
      incBtn.onclick = () => increaseStat(stat, 1);
      btns.appendChild(incBtn);

      const incAllBtn = document.createElement("button");
      incAllBtn.textContent = "All";
      incAllBtn.onclick = () => increaseStat(stat, stats.statPoint);
      btns.appendChild(incAllBtn);
      
      const StatGuide = document.createElement("button");
      StatGuide.textContent = "?";
      StatGuide.onclick = () => StatGuides(stat);
      btns.appendChild(StatGuide);

      div.appendChild(label);
      div.appendChild(btns);
      container.appendChild(div);
    });
  }

  function StatGuides(stat) {
    if (stat === 'str') {
      logAdd(`STR 1당 물리데미지 1, 체력 2 증가`,'cyan');
    } else if (stat === 'dex') {
      logAdd(`DEX 1당 회피율 2% 증가`,'cyan');
    } else if (stat === 'int') {
      logAdd(`INT 1당 마법데미지 2, 마나 2 증가`,'cyan');
    } else if (stat === 'luk') {
      logAdd(`LUK 1당 명중률 1% 증가`,'cyan');
    } else if (stat === 'con') {
      logAdd(`CON 1당 체력 10 증가`,'cyan');
    } else if (stat === 'men') {
      logAdd(`MEN 1당 마나 5 증가`,'cyan');
    } 
  }

  function increaseStat(stat, amount) {
    if (amount > stats.statPoint) amount = stats.statPoint;
    if (amount <= 0) return;
    stats[stat] += amount;
    stats.statPoint -= amount;
    updateStats();
    saveGame();  // 즉시 저장
  }

  function toggleDetails() {
    detailedShown = !detailedShown;
    document.getElementById("detailed-stats").classList.toggle("hidden", !detailedShown);
    document.getElementById("toggle-details").textContent = detailedShown ? "상세 스탯 숨기기" : "상세 스탯 보기";
  }

  // 경험치 필요량 계산 (레벨 1 -> 20, 이후 지수함수 1.25)
  function expToNextLevel(lv) {
    if (lv === 1) return 20;
    return Math.floor(20 * Math.pow(lv, 1.25));
  }

  // 내부 스탯 계산
  function calculateDerivedStats() {
    let physicalDamage = 1 + stats.str * 1;
    let magicDamage = 0 + stats.int * 2;
    let accuracy = 80 + stats.luk * 1;
    let evasion = 10 + stats.dex * 2;
    let critRate = 10;
    let magicCritRate = 0;
    let critDamage = 0;
    let magicCritDamage = 0;

    let maxHp = 14 + stats.str * 2 + stats.con * 10;
    let maxMp = 5 + stats.int * 2 + stats.men * 5;

    return {
      physicalDamage, magicDamage, accuracy, evasion, critRate, magicCritRate, critDamage, magicCritDamage,
      maxHp, maxMp
    };
  }

  // 스탯 UI 업데이트
  function updateStats() {
    // 기본
    lvEl.textContent = "Lv : " + stats.lv;
    expEl.textContent = "EXP : " + stats.exp + " / " + expToNextLevel(stats.lv);
    // expNeededEl.textContent = expToNextLevel(stats.lv);
    if (stats.statPoint >= 1) {
      statPointEl.style.color = "yellow";
    } else {
      statPointEl.style.color = "white";
    }
    statPointEl.textContent = "StatPoint : " + stats.statPoint;
    skillPointEl.textContent = "SkillPoint : " + stats.skillPoint;
    goldEl.textContent = stats.gold;

    // 최대 HP/MP 재계산 및 현재값 조정
    const derived = calculateDerivedStats();
    stats.maxHp = derived.maxHp;
    stats.maxMp = derived.maxMp;

    // 현재 체력 조정
    if (stats.hp > stats.maxHp) stats.hp = stats.maxHp;
    if (stats.mp > stats.maxMp) stats.mp = stats.maxMp;

    hpEl.textContent = "HP : " + stats.hp + " / " + stats.maxHp;
    mpEl.textContent = "MP : " + stats.mp + " / " + stats.maxMp;

    // 커스텀 스탯 수치 표시
    ["str","dex","int","luk","con","men"].forEach(s=>{
      document.getElementById(s+"-val").textContent = stats[s];
    });

    potionCountEl.textContent = potions;
    potionCountEl2.textContent = potions;
    // 상세 스탯 표시
    document.getElementById("physicalDamage").textContent = derived.physicalDamage;
    document.getElementById("magicDamage").textContent = derived.magicDamage;
    document.getElementById("accuracy").textContent = derived.accuracy.toFixed(2) + "%";
    document.getElementById("evasion").textContent = derived.evasion.toFixed(2) + "%";
    document.getElementById("critRate").textContent = derived.critRate.toFixed(2) + "%";
    document.getElementById("magicCritRate").textContent = derived.magicCritRate.toFixed(2) + "%";
    document.getElementById("critDamage").textContent = derived.critDamage.toFixed(2) + "%";
    document.getElementById("magicCritDamage").textContent = derived.magicCritDamage.toFixed(2) + "%";

    DungeonLv.textContent = "던전 레벨 " + Stage;
    inn.textContent = "여관 (" + (30 * stats.lv) + "G)" ;
    JobName.textContent = "직업 : " + Job;
    updateBars();

    // 업데이트 플레이어 상태 (던전 전투용)
    stats.maxHp = derived.maxHp;
    if (stats.hp > stats.maxHp) stats.hp = stats.maxHp;
    player.atk = derived.physicalDamage;
    player.accuracy = derived.accuracy;
    player.evasion = derived.evasion;
  }
  

  function updateBars() {
    // 몬스터 HP 바
    const monsterHpPercent = (monster.hp / monster.maxHp) * 100;
    monsterHpBar.style.width = monsterHpPercent + "%";
    monsterHpText.textContent = "HP : " + monster.hp + " / " + monster.maxHp;

    let playerLvPercent = "10%";
    if (stats.lv < 10) {
      playerLvPercent = (stats.lv / 10) * 100;
    } else if (stats.lv < 30) {
      playerLvPercent = (stats.lv / 30) * 100;
    } else if (stats.lv < 60) {
      playerLvPercent = (stats.lv / 60) * 100;
    } else if (stats.lv < 100) {
      playerLvPercent = (stats.lv / 100) * 100;
    } else if (stats.lv < 140) {
      playerLvPercent = (stats.lv / 140) * 100;
    } else if (stats.lv < 200) {
      playerLvPercent = (stats.lv / 200) * 100;
    } else if (stats.lv < 260) {
      playerLvPercent = (stats.lv / 260) * 100;
    } else if (stats.lv < 300) {
      playerLvPercent = (stats.lv / 300) * 100;
    } else {
      playerLvPercent = (100 / 100) * 100;
    }
    playerLvBar.style.width = playerLvPercent + "%";
    // 플레이어 HP 바
    const playerHpPercent = (stats.hp / stats.maxHp) * 100;
    const playerMpPercent = (stats.mp / stats.maxMp) * 100;
    const playerXpPercent = (stats.exp / expToNextLevel(stats.lv)) * 100;
    playerHpBar.style.width = playerHpPercent + "%";
    playerMpBar.style.width = playerMpPercent + "%";
    playerXpBar.style.width = playerXpPercent + "%";
    // 공격력 표시
    monsterAtkEl.textContent = monster.atk;
    playerAtkEl.textContent = player.atk.toFixed(0);
  }

  // 메뉴 전환 함수
  function showPanel(panelName) {
    const panels = {
      "stat": document.getElementById("stat-window"),
      "town": document.getElementById("town-panel"),
      "dungeon": document.getElementById("dungeon-panel"),
      "equip": document.getElementById("equip-panel"),
      "job": document.getElementById("job-panel"),
      "skill": document.getElementById("skill-panel")
    };
    for (let key in panels) {
      panels[key].classList.remove("visible");
    }
    panels[panelName].classList.add("visible");

    // 던전 입장 UI 초기화
    if (panelName === "dungeon") {
      if (Stage < 1) {
        Stage = 1;
      } else if (Stage >= stats.lv) {
        Stage = stats.lv;
      }
      startBattle(Stage);
    }
  }
  function startBattle() {
    console.log(1);
    if (stats.hp === 0) return;
    // 층선택 UI 숨기고 전투 UI 표시
    dungeonBattleDiv.classList.remove("hidden");

    // 몬스터 HP: 층 × (8~10) 랜덤
    monster.maxHp = Math.floor(8 * (Stage ** 1.2));
    monster.hp = monster.maxHp;
    monster.atk = Math.floor(1 * (Stage ** 1.1))
    monster.accuracy = 80;
    monster.evasion = 10;

    // 플레이어 HP/atk/accuracy 세팅
    const derived = calculateDerivedStats();
    // if (stats.hp === 0) stats.hp = stats.maxHp; // 플레이어가 던전 입장 전에 사망했을 경우 대비
    if (stats.hp > stats.maxHp) stats.hp = stats.maxHp;
    player.atk = derived.physicalDamage;
    player.accuracy = derived.accuracy;
    player.evasion  = derived.evasion ;

    // logClear();
    logAdd(`던전 ${Stage}층에서 전투를 시작합니다!`,'lightgreen');

    updateStats();

    // 버튼 활성화
    attackBtn.disabled = false;
    potionBtn.disabled = potions <= 0;
  }

  // 전투 처리
  
  // 키보드 입력 감지
  document.addEventListener('keydown', function(event) {
    // 스페이스바는 key === ' ' 또는 keyCode === 32
    if (event.code === 'Space') {
      event.preventDefault(); // 페이지 스크롤 방지
      Attack();
    }
  });

  attackBtn.addEventListener("click", ()=>{
    Attack();
  });
  function Attack() {
    if(stats.hp < 1) {
      logAdd("체력이 없습니다. 여관에서 회복하세요.",'red');
      updateStats();
      resetBattle();
      return;
    }
    if(monster.hp <= 0) {
      updateStats();
      resetBattle();
    }

    // 플레이어 공격 몬스터
    if(chanceHit(player.accuracy - monster.evasion)) {
      monster.hp -= player.atk;
      monster.hp = Math.max(0, monster.hp);
      logAdd(`플레이어가 몬스터에게 ${player.atk.toFixed(0)} 데미지를 입혔습니다.`,'lightgreen');
    } else {
      logAdd("플레이어의 공격이 빗나갔습니다.",'green');
    }

    updateStats();

    if(monster.hp <= 0 && stats.hp > 0) {
      // 몬스터 처치
      logAdd("몬스터를 처치했습니다!",'lightblue');
      gainExp();
      updateStats();
      resetBattle();
      return;
    }

    // 몬스터 공격 플레이어
    if(chanceHit(monster.accuracy - player.evasion)) {
      stats.hp -= monster.atk;
      stats.hp = Math.max(0, stats.hp);
      logAdd(`몬스터가 플레이어에게 ${monster.atk} 데미지를 입혔습니다.`,'red');
      updateStats()
    } else {
      logAdd("몬스터의 공격이 빗나갔습니다.",'orange');
    }

    updateStats();

    if(stats.hp <= 0) {
      logAdd("플레이어가 쓰러졌습니다...",'red');
      attackBtn.disabled = true;
      potionBtn.disabled = potions <= 0;
    }
  };

  // 포션 사용
  potionBtn.addEventListener("click", ()=>{
    if(potions <= 0) return;
    if(stats.hp <= 0) {
      logAdd("플레이어가 쓰러졌습니다...",'red');
      return;
    }
    const healAmount = 10;
    stats.hp += healAmount;
    if(stats.hp > stats.maxHp) stats.hp = stats.maxHp;
    potions--;
    potionCountEl.textContent = potions;
    logAdd(`포션을 사용하여 ${healAmount}만큼 회복했습니다. 현재 체력: ${stats.hp}/${stats.maxHp}`,'lightblue');
    updateStats();

    // 쓰러졌을 경우 포션 사용 가능하게 다시 버튼 활성화
    if(stats.hp > 0) {
      attackBtn.disabled = false;
    }

    if(potions <= 0) potionBtn.disabled = true;
  });
  
  healBtn.addEventListener("click", ()=>{
    heal(5,1);
  });

  function heal(Hpt,Mpt) {
    if (stats.mp >= Mpt) {
      stats.mp -= Mpt;
      stats.hp += Hpt;
      if (stats.hp >= stats.maxHp) {
        stats.hp = stats.maxHp;
      }
      logAdd(`힐~`,'lightgreen');
    } else {
      logAdd(`마나가 부족합니다`,'cyan');
    }
    updateStats();
  }

  // 확률 체크 함수
  function chanceHit(accuracy) {
    let rand = Math.random() * 100;
    return rand < accuracy;
  }
  function chanceEva(evasion) {
    let rand = Math.random() * 100;
    return rand < evasion;
  }

  // 경험치 획득 및 레벨업 체크
  function gainExp() {
    let expUp = Math.floor(1 * (Stage ** 1.25));
    let goldUp = Math.floor(expUp * (Math.random() * 10 + 5));
    
    stats.exp += expUp;
    logAdd(`경험치를 ${expUp} 획득했습니다.`,'lightgreen');
    stats.gold += goldUp;
    logAdd(`${goldUp}G 획득했습니다.`,'gold');
    const needed = expToNextLevel(stats.lv);
    if(stats.exp >= needed) {
      stats.exp -= needed;
      stats.lv++;
      stats.statPoint += 3;
      stats.skillPoint += 1;
      stats.hp = stats.maxHp;
      stats.mp = stats.maxMp;
      logAdd(`레벨업! 현재 레벨: ${stats.lv} 스텟포인트 +3 획득.`,'lightgreen');
      updateStats();
    }
    saveGame();  // 즉시 저장
  }

  //포션 구매
  function openItemShop() {
    if (stats.gold >= 20) {
      stats.gold -= 20;
      potions += 1;
      logAdd(`포션을 구매했습니다.`,'lightgreen');
    } else {
      logAdd(`포션을 구매할 돈(20G)가 부족합니다.`,'red');
    }
    updateStats();
    saveGame();  // 즉시 저장
  }
  //여관 이용
  function useInn() {
    if (stats.gold >= 30 * stats.lv) {
      stats.gold -= (30 * stats.lv);
      stats.hp = stats.maxHp;
      stats.mp = stats.maxMp;
      logAdd(`여관을 다녀왔습니다.`,'lightgreen');
    } else {
      logAdd(`여관 이용료가 부족합니다.`,'red');
    }
    updateStats();
    saveGame();  // 즉시 저장
  }
  function DungeonUp() {
    if (Stage >= stats.lv) {
      Stage = stats.lv;
      logAdd(`던전 레벨 ${Stage}는 현재 최고층입니다.`,'lightgreen');
    }
    else {
      Stage += 1;
      logAdd(`던전 레벨이 ${Stage}로 올랐습니다. `,'lightgreen');
    }
    updateStats();
    resetBattle();
  }
  function DungeonDown() {
    if (Stage === 1) {
      logAdd(`던전 레벨 1층 아래로 내려갈 수 없습니다.`,'lightgreen');
    } else {
      Stage -= 1;
      logAdd(`던전 레벨을 ${Stage}로 내렸습니다. `,'lightgreen');
    }
    updateStats();
    resetBattle();
  }

  // 전투 초기화
  function resetBattle() {
    // floorSelectionDiv.classList.remove("hidden");
    dungeonBattleDiv.classList.add("hidden");
    monster.hp = 0;
    monster.maxHp = 0;
    monster.atk = 0;
    // stats.hp = stats.maxHp;
    updateStats();
    attackBtn.disabled = true;
    potionBtn.disabled = potions <= 0;

    startBattle(Stage);
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

  // 최초 UI 생성 및 업데이트
  createStatControls();
  updateStats();
  showPanel("stat");

  // 메뉴 버튼 클릭시 패널 변경
  // document.getElementById("menu-stat").addEventListener("click", ()=>showPanel("stat"));
  // document.getElementById("menu-town").addEventListener("click", ()=>showPanel("town"));
  // document.getElementById("menu-dungeon").addEventListener("click", ()=>showPanel("dungeon"));

  // 상세 스탯 토글 버튼
  document.getElementById("toggle-details").addEventListener("click", toggleDetails);

  // 저장 함수
  function saveGame() {
    const saveData = {
      version,
      stats,
      potions,
      gold: stats.gold,
      playerHp: player.hp,
      Job,Stage
    };
    localStorage.setItem("rpg_save", JSON.stringify(saveData));
    logAdd("게임이 저장되었습니다.", "lightblue");
  }
  
  // 불러오기 함수
  function loadGame() {
    const saved = localStorage.getItem("rpg_save");
    if (!saved) return false;

    try {
      const saveData = JSON.parse(saved);
      if (saveData.version !== version) {
        logAdd("저장된 게임 버전이 맞지 않아 불러올 수 없습니다.", "red");
        return false;
      }
      Object.assign(stats, saveData.stats);
      potions = saveData.potions;
      stats.gold = saveData.gold;  // gold는 stats.gold에 저장되어 있음
      player.hp = saveData.playerHp;
      Job = saveData.Job;
      Stage = saveData.Stage;
      updateStats();
      potionCountEl.textContent = potions;
      goldEl.textContent = stats.gold;
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
      localStorage.removeItem("rpg_save");
      alert("게임 데이터가 초기화되었습니다. 페이지가 새로고침됩니다.");
      location.reload(); // 새로고침
    }
  });

  
  document.getElementById("jb11").addEventListener("click", () => {
    logAdd("[직업소개 - 버서커]", "lightgreen");
    logAdd("레벨 10에 전직 가능한 직업 1 - 버서커", "lightgreen");
    logAdd("주 스텟 : STR", "lightgreen");
    logAdd("체력을 돌보지 않고 오로지 공격에 집중한 직업", "lightgreen");
    logAdd("STR 1당 물리 데미지 증가값이 1 > 3 으로 오르지만,", "lightgreen");
    logAdd("STR 1당 체력 증가값이 2 > 1로 깎인다. ", "pink");
    logAdd("직업 스킬 : 강타 (액티브)", "cyan");
    logAdd("자신의 MP를 모두 소모하여 MPx물리데미지x5의 공격을 가한다.", "cyan");
  });
  
  document.getElementById("jb12").addEventListener("click", () => {
    logAdd("[직업소개 - 로그]", "lightgreen");
    logAdd("레벨 10에 전직 가능한 직업 2 - 로그", "lightgreen");
    logAdd("주 스텟 : DEX, LUK", "lightgreen");
    logAdd("높은 명중률과 회피율을 자랑한다.", "lightgreen");
    logAdd("STR의 스텟 효과가 사라지는 대신,", "pink");
    logAdd("DEX나 LUK을 올릴때마다 물리 데미지가 1씩 오른다.", "lightgreen");
    logAdd("직업 스킬 : 금전감각 (패시브)", "cyan");
    logAdd("MP 1 이상일때 MP 1을 소모하여 골드 획득량이 2배로 오른다.", "cyan");
  });
  
  document.getElementById("jb13").addEventListener("click", () => {
    logAdd("[직업소개 - 나이트]", "lightgreen");
    logAdd("레벨 10에 전직 가능한 직업 3 - 나이트", "lightgreen");
    logAdd("주 스텟 : CON", "lightgreen");
    logAdd("높은 체력을 가진다.", "lightgreen");
    logAdd("CON 1당 물리 데미지가 1씩 오른다.", "lightgreen");
    logAdd("다른 스텟의 불리한 효과는 없다.", "lightgreen");
    logAdd("직업 스킬 : 불사 (패시브)", "cyan");
    logAdd("빈사상태일때 골드를 소모하여 자동으로 체력을 회복한다.", "cyan");
  });