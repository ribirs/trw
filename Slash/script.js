// 기본 스텟
let stats = {
  health: 100,
  energy: 50,
  STR: 0,
  AGI: 0,
  CHI: 0,
  SEN: 0,
  WIL: 0,
  ITG: 0,
  DEF: 0,
  VIT: 0,
  sect: null,
  lineage: null,
  fame: 0,
  Realm: 0,
  Age: 20,
  Life: 40
  // 기타 초기값
};

let MaxHealth = 100;
let MaxEnergy = 50;
let Gold = 0;

// 경지
const realms = [
  { name: "입문자", Pay: 10, required: { health: 100, energy: 50, totalStats: 8 } },
  { name: "수련생", Pay: 30, required: { health: 200, energy: 100, totalStats: 500 } },
  { name: "삼류",   Pay: 100, required: { health: 500, energy: 250, totalStats: 2000 } },
  { name: "이류",   Pay: 300, required: { health: 1000, energy: 500, totalStats: 5000 } },
  { name: "일류",   Pay: 1000, required: { health: 5000, energy: 2500, totalStats: 20000 } },
  { name: "절정",   Pay: 3000, required: { health: 10000, energy: 5000, totalStats: 35000 } },
  { name: "초절정", Pay: 10000, required: { health: 20000, energy: 10000, totalStats: 80000 } },
  { name: "화경",   Pay: 30000, required: { health: 50000, energy: 20000, totalStats: 120000 } },
  { name: "현경",   Pay: 50000, required: { health: 100000, energy: 50000, totalStats: 200000 } },
  { name: "생사경", Pay: 80000, required: { health: 200000, energy: 100000, totalStats: 500000 } },
  { name: "자연경", Pay: 100000, required: { health: 500000, energy: 200000, totalStats: 1000000 } },
  { name: "극도경", Pay: 200000, required: { health: 1000000, energy: 500000, totalStats: 2000000 } },
  { name: "천지경", Pay: 300000, required: { health: 2000000, energy: 1000000, totalStats: 5000000 } },
  { name: "무극경", Pay: 500000, required: { health: 5000000, energy: 2000000, totalStats: 10000000 } },
  { name: "만법경", Pay: 700000, required: { health: 10000000, energy: 5000000, totalStats: 20000000 } },
  { name: "신화경", Pay: 900000, required: { health: 20000000, energy: 10000000, totalStats: 50000000 } },
];
const statLabels = {
  STR: "근력 (筋力)",
  AGI: "신법 (身法)",
  CHI: "내력 (內力)",
  SEN: "기감 (氣感)",
  WIL: "심지 (心志)",
  ITG: "오성 (悟性)",
  DEF: "외공 (外功)",
  VIT: "경맥 (經脈)"
};
const statItems = [
  { name: "강근단", hanja: "強筋丹", Buy: 100, Sell: 10, STR: 10, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 0, VIT: 0 },
  { name: "풍신단", hanja: "風身丹", Buy: 100, Sell: 10, STR: 0, AGI: 10, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 0, VIT: 0 },
  { name: "청기단", hanja: "淸氣丹", Buy: 100, Sell: 10, STR: 0, AGI: 0, CHI: 10, SEN: 0, WIL: 0, ITG: 0, DEF: 0, VIT: 0 },
  { name: "통기단", hanja: "通氣丹", Buy: 100, Sell: 10, STR: 0, AGI: 0, CHI: 0, SEN: 10, WIL: 0, ITG: 0, DEF: 0, VIT: 0 },
  { name: "정심단", hanja: "靜心丹", Buy: 100, Sell: 10, STR: 0, AGI: 0, CHI: 0, SEN: 0, WIL: 10, ITG: 0, DEF: 0, VIT: 0 },
  { name: "오성단", hanja: "悟性丹", Buy: 100, Sell: 10, STR: 0, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 10, DEF: 0, VIT: 0 },
  { name: "금강단", hanja: "金剛丹", Buy: 100, Sell: 10, STR: 0, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 10, VIT: 0 },
  { name: "활맥단", hanja: "活脈丹", Buy: 100, Sell: 10, STR: 0, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 0, VIT: 10 },

  { name: "청신단", hanja: "靑身丹", Buy: 1000, Sell: 100, STR: 0, AGI: 25, CHI: 25, SEN: 0, WIL: 0, ITG: 0, DEF: 0, VIT: 0 },
  { name: "철근단", hanja: "鐵筋丹", Buy: 1000, Sell: 100, STR: 25, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 25, VIT: 0 },
  { name: "심기단", hanja: "心氣丹", Buy: 1000, Sell: 100, STR: 0, AGI: 0, CHI: 0, SEN: 25, WIL: 25, ITG: 0, DEF: 0, VIT: 0 },
  { name: "오맥단", hanja: "悟脈丹", Buy: 1000, Sell: 100, STR: 0, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 25, DEF: 0, VIT: 25 },
  { name: "벽력단", hanja: "霹靂丹", Buy: 1000, Sell: 100, STR: 25, AGI: 25, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 0, VIT: 0 },
  { name: "청현단", hanja: "靑玄丹", Buy: 1000, Sell: 100, STR: 0, AGI: 0, CHI: 25, SEN: 0, WIL: 25, ITG: 0, DEF: 0, VIT: 0 },
  { name: "운기단", hanja: "運氣丹", Buy: 1000, Sell: 100, STR: 0, AGI: 0, CHI: 0, SEN: 25, WIL: 0, ITG: 0, DEF: 0, VIT: 25 },
  { name: "지각단", hanja: "知覺丹", Buy: 1000, Sell: 100, STR: 0, AGI: 0, CHI: 0, SEN: 25, WIL: 0, ITG: 25, DEF: 0, VIT: 0 },
  { name: "강체단", hanja: "強體丹", Buy: 1000, Sell: 100, STR: 25, AGI: 0, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 25, VIT: 0 },
  { name: "명정단", hanja: "明靜丹", Buy: 1000, Sell: 100, STR: 0, AGI: 0, CHI: 0, SEN: 0, WIL: 25, ITG: 25, DEF: 0, VIT: 0 },

  { name: "용혼환", hanja: "龍魂丸", Buy: 10000, Sell: 1000, STR: 50, AGI: 0, CHI: 50, SEN: 50, WIL: 0, ITG: 0, DEF: 50, VIT: 0 },
  { name: "현심환", hanja: "玄心丸", Buy: 10000, Sell: 1000, STR: 0, AGI: 50, CHI: 0, SEN: 0, WIL: 50, ITG: 50, DEF: 0, VIT: 50 },
  { name: "태극단", hanja: "太極丹", Buy: 10000, Sell: 1000, STR: 0, AGI: 50, CHI: 50, SEN: 50, WIL: 50, ITG: 0, DEF: 0, VIT: 0 },
  { name: "무혼환", hanja: "武魂丸", Buy: 10000, Sell: 1000, STR: 50, AGI: 50, CHI: 0, SEN: 0, WIL: 0, ITG: 0, DEF: 50, VIT: 50 },
  { name: "천명환", hanja: "天命丸", Buy: 10000, Sell: 1000, STR: 0, AGI: 0, CHI: 0, SEN: 50, WIL: 50, ITG: 50, DEF: 0, VIT: 50 },

  { name: "조화단", hanja: "造化丹", Buy: 250000, Sell: 25000, STR: 100, AGI: 100, CHI: 100, SEN: 100, WIL: 100, ITG: 100, DEF: 100, VIT: 100 },
  
  { name: "속명환", hanja: "續命丸", Buy: 1000, Sell: 500, Life:2, LifeMax:100 },
  { name: "연수단", hanja: "延壽丹", Buy: 10000, Sell: 5000, Life:10, LifeMax:250 },
  { name: "청령단", hanja: "靑靈丹", Buy: 100000, Sell: 50000, Life:50, LifeMax:500 },
  { name: "수혼단", hanja: "壽魂丹", Buy: 1000000, Sell: 500000, Life:200, LifeMax:0 },
  { name: "매명취리", hanja: "賣名取利", Fame: 100 },
];
let DanItem = Array(statItems.length).fill(0).map(() => ({ Cnt: 0 }));

// 인벤토리 렌더링 함수
function renderInventory(statItems, DanItem) {
  const container = document.getElementById('inventoryContainer');
  container.innerHTML = ''; // 초기화

  DanItem.forEach((item, idx) => {
    const stat = statItems[idx];
    if (item.Cnt > 0 || Gold >= stat.Buy || (stats.fame >= 10 && stat.Fame > 0)) {
      const paddedIdx = idx.toString().padStart(2, '0');
      const imagePath = `img/item/d${paddedIdx}.webp`;

      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';

      // 이미지 영역
      const imageDiv = document.createElement('div');
      imageDiv.className = 'item-image';
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = stat.name;
      imageDiv.appendChild(img);

      // 정보 및 버튼 영역
      const infoDiv = document.createElement('div');
      infoDiv.className = 'item-info';

      // ⬇ 이름 + 수량
      const name = document.createElement('div');
      name.className = 'item-name';
      name.textContent = `${stat.name}(${stat.hanja}) x${item.Cnt}`;
      if (stat.Fame > 0) {
        name.textContent = `${stat.name}(${stat.hanja})`;
      }

      // ⬇ 상승 스탯 표시
      const hanja = document.createElement('div');
      hanja.className = 'item-hanja';

      // 스탯 필드에서 유효한 스탯만 추출해서 텍스트로 나열
      const statKeys = Object.keys(statLabels); // 고정 순서 보장
      const statTextArr = statKeys
        .filter(key => stat[key] && stat[key] > 0)
        .map(key => `${statLabels[key]}+${stat[key]}`);

      // 2개씩 끊어서 줄바꿈 처리
      let groupedText = '';
      for (let i = 0; i < statTextArr.length; i += 2) {
        const group = statTextArr.slice(i, i + 2).join(' ');
        groupedText += group;
        if (i + 2 < statTextArr.length) groupedText += '<br>';
      }

      // 텍스트 적용
      hanja.innerHTML = groupedText;
      if (stat.Life > 0) {
        hanja.innerHTML = `수명 ${stat.Life}년 연장`;
      }
      if (stat.Fame > 0) {
        hanja.innerHTML = `명성을 팔아 금전적 이득을 취함`;
      }


      const buttons = document.createElement('div');
      buttons.className = 'item-buttons';

      if (DanItem[idx].Cnt > 0) {
        const singleUseBtn = document.createElement('button');
        singleUseBtn.textContent = '1개 사용';
        singleUseBtn.addEventListener('click', () => useItem(idx, 1));
        buttons.appendChild(singleUseBtn);
  
        const useAllBtn = document.createElement('button');
        useAllBtn.textContent = '모두 사용';
        useAllBtn.addEventListener('click', () => useItem(idx, item.Cnt));
        buttons.appendChild(useAllBtn);
      } else if (Gold >= stat.Buy) {
        const BuyBtn = document.createElement('button');
        BuyBtn.innerHTML = `1개 구매<br>(${stat.Buy.toLocaleString()}냥)`;
        BuyBtn.addEventListener('click', () => BuyItem(idx,1));
        BuyBtn.classList.add('buy');
        buttons.appendChild(BuyBtn);

        const BuyBtn2 = document.createElement('button');
        const BuyCnt = Math.floor(Gold / stat.Buy);
        BuyBtn2.innerHTML = `일괄 구매<br>(${(stat.Buy * BuyCnt).toLocaleString()}냥)`;
        BuyBtn2.addEventListener('click', () => BuyItem(idx,BuyCnt));
        BuyBtn2.classList.add('buy');
        buttons.appendChild(BuyBtn2);
      } else if (stats.fame >= 10 && stat.Fame > 0) {
        const SellBtn = document.createElement('button');
        SellBtn.innerHTML = `1회 판매<br>🏅-10`;
        SellBtn.addEventListener('click', () => SellItem(idx,1));
        SellBtn.classList.add('Sell');
        buttons.appendChild(SellBtn);
        
        const Sell2Btn = document.createElement('button');
        const SellCnt = Math.floor(stats.fame / 10);
        Sell2Btn.innerHTML = `일괄 판매<br>🏅-${SellCnt*10}`;
        Sell2Btn.addEventListener('click', () => SellItem(idx,SellCnt));
        Sell2Btn.classList.add('Sell');
        buttons.appendChild(Sell2Btn);
      }

      infoDiv.appendChild(name);
      infoDiv.appendChild(hanja);
      infoDiv.appendChild(buttons);

      itemDiv.appendChild(imageDiv);
      itemDiv.appendChild(infoDiv);
      container.appendChild(itemDiv);
    }
  });
}
// 아이템 구매 함수
function BuyItem(idx, count) {
  const stat = statItems[idx];
  let BuyCnt;
  if (count === 1) {
    BuyCnt = count;
  } else {
    BuyCnt = Math.floor(Gold / stat.Buy);
  }
  if (Gold >= stat.Buy*BuyCnt) {
    Gold -= (stat.Buy*BuyCnt);
    DanItem[idx].Cnt += BuyCnt;
    LogAdd(`${stat.name}(${stat.hanja}) ${BuyCnt}개를 손에 넣었도다.`, 'lime');

  } else {
    LogAdd(`지갑이 가벼우니, 거래는 물거품이 되었도다.`, 'red');
  }
  updateUI();
  saveGame();
}
//명성 판매 함수
function SellItem(idx,count) {
  const stat = statItems[idx];
  stats.fame -= count*10;
  Gold += count*50;
  LogAdd(`명성 ${count*10} 푼이 금전 ${count*50} 냥이라, 참담하도다.`,'pink');
  updateUI();
  saveGame();
}
// 아이템 사용 함수
function useItem(index, count) {
  if (DanItem[index].Cnt < count || count === 0) {
    LogAdd(`허공엔 바람뿐, 가진 것이 하나도 없도다.`, 'red');
    return;
  }

  const item = statItems[index];
  const usedItemName = item.name;
  const gainedStats = {};
  const statKeys = ["STR", "AGI", "CHI", "SEN", "WIL", "ITG", "DEF", "VIT"];

  if (item.Life > 0) {
    if (item.LifeMax > 0) {
      if ((stats.Life + (item.Life * count)) <= item.LifeMax) {
        stats.Life += (item.Life * count);
        LogAdd(`${usedItemName} ${count}개로 수명이 ${item.Life * count}년이나 늘어났구나.`, 'lime');
        DanItem[index].Cnt -= count;
      } else {
        LogAdd(`${usedItemName}의 힘이 미약하여 수명을 더이상 늘려주질 못하는구나.`, 'lime');
      }
    } else {
      stats.Life += (item.Life * count);
      LogAdd(`${usedItemName} ${count}개로 수명이 ${item.Life * count}년이나 늘어났구나.`, 'lime');
      DanItem[index].Cnt -= count;
    }
  } else {
    statKeys.forEach(key => {
      const gain = item[key] * count;
      if (gain > 0) {
        stats[key] += gain;
        gainedStats[key] = gain;
      }
    });
    const gainedText = Object.entries(gainedStats)
      .map(([key, value]) => `${statLabels[key]}+${value}`)
      .join(', ');
    LogAdd(`${usedItemName} ${count}개로 ${gainedText}만큼 기운이 샘솟는구나.`, 'lime');
    DanItem[index].Cnt -= count;
  }
  updateUI();
  saveGame();
}


function renderInventory3() {
  const container = document.getElementById('inventoryContainer3');
  container.innerHTML = ''; // 초기화

      const itemDiv = document.createElement('div');
      itemDiv.className = 'item-name';
      const currentStatsMessage = `가이드북<hr>
      1. 게임의 목적<br><small>
      천하제일인이 되세요.</small><hr>
      2. 성장하는 방법<br><small>
      능력치를 올려 자신의 경지를 끌어올리세요.</small><hr>
      3. 경지 확인하는 방법<br><small>
      화면 가운데 📊를 누르고 왼쪽에 🧘를 누르면 다음 경지에 오르기 위한 조건이 나옵니다.</small><hr>
      4. 각 능력치 올리는 방법<br><small>
      능력치를 클릭하면 어떤 스텟에 의해 오르는지 나옵니다.</small><hr>
      5. 스텟을 올리는 방법<br><small>
      가운데 🏃를 누르고 오른쪽에 수련 버튼을 눌러 특정 수련을 하여 능력치를 올릴 수 있습니다.</small><hr>
      6. 🩸or💙가 부족할 경우<br><small>
      수련을 통해 회복이 가능합니다.</small><hr>
      7. 💼은 무엇인가?<br><small>
      처음에 단약 4종을 랜덤으로 지급합니다. 단약을 섭취하여 쉽고 빠르게 원하는 능력치를 올릴 수 있습니다.</small><hr>
      8. 단약을 얻는 방법은?<br><small>
      경지를 올리면 일정량 지급받고, 또는 💰으로 구매도 가능합니다.</small><hr>
      9. 💰를 얻는 방법은?<br><small>
      매달 1일마다 봉급을 받거나 수련을 할때 낮은 확률로 획득할 수 있습니다.</small><hr>
      10.🏅는 무엇인가?<br><small>
      캐릭터의 명성으로 수련을 통해 얻을 수 있습니다.</small><hr>
      11.🏅는 어디다 사용되는가?<br><small>
      일정 경지 이상 오를때 필요하거나, 상점에서 명성을 팔아 💰을 얻을 수도 있습니다.</small><hr>
      12.🧬는 무엇인가?<br><small>
      캐릭터를 최초 생성할때 선택하는 혈통이며 캐릭터의 기본 스텟 상향값을 결정합니다. 종류는 총 50종으로 그 중에서 랜덤 5개 중 하나를 선택할 수 있습니다.</small><hr>
      13.🧬를 변경하는 방법은?<br><small>
      없습니다. 다시 키우세요. 속된말로, 죽었다 다시 태어나시면 됩니다.</small><hr>
      14.🏯는 무엇인가?<br><small>
      이 게임엔 총 8종의 문파가 존재합니다. 일정 스텟 이상 육성하면 자동으로 특정 문파에 들어갈 수 있다고 알림이 뜹니다.</small><hr>
      15.문파에 들어가는 방법은?<br><small>
      🏯아이콘을 누르고 선택지에서 원하는 문파를 클릭하면 됩니다. 추후 변경은 불가능합니다.</small><hr>
      16.문파에 들어가면 좋은 점은?<br><small>
      해당 문파에서만 가능한 수련을 할 수 있습니다. 소모되는 🩸,💙에 비해 능력치 상승량이 매우 높습니다.</small><hr>
      17. 다른 문파의 수련을 하는 방법은?<br><small>
      현재 지원되지 않습니다. 차후 업데이트 예정입니다.</small><hr>
      18.⏳는 무엇인가?<br><small>
      당신의 나이와 수명입니다. 20/40일 경우 나이는 20살이고 수명은 40살이며 앞으로 20년밖에 못삽니다.</small><hr>
      19.수명이 닳은건 왜 그렇지?<br><small>
      힘든 수련을 통해 수명이 닳는 경우가 있습니다. 고된 수련을 할땐 반드시 주의해야 합니다.</small><hr>
      20.수명을 올리는 방법은?<br><small>
      💼에서 수명을 올리는 단약을 구매해 섭취하세요. 참고로 매우 비쌉니다.</small><hr>
      21.속명환을 더이상 섭취할수가 없다고 나오는데?<br><small>
      수명의 단약마다 한계가 있습니다. 낮은 등급은 일정 수명 이상 끌어올리지 못합니다. 그보다 비싼거 사서 드세요.</small><hr>
      22.상점에서 아이템이 뜨는 조건은?<br><small>
      해당 아이템을 보유하거나, 아이템을 구매할 💰을 가지고 있거나, 🏅이 일정 수치 이상이어야 합니다.</small><hr>
      23.물리공격력은 어디다 써먹어?<br><small>
      현재 전투 시스템이 개발중에 있습니다. 현재 버젼에선 아무짝에도 쓸모가 없습니다. 내다 버리세요.</small><hr>
      24.앞으로 추가될 업데이트 예정사항은?<br>
      - 전투 시스템<br>
      - 문파간 호감도 시스템<br>
      - 직업 시스템<br>
      - 스킬 시스템<br>
      - 무림맹, 구파일방, 오대세가 상호작용<br>
      - 무림대회 토너먼트<br>
      - 정파,사파,마교 선택지<br>
      - NPC 상호작용, 친밀도<br>
      - 경지별 캐릭터 디자인<br>`;
      itemDiv.innerHTML = currentStatsMessage;
      container.appendChild(itemDiv);
}



//문파
const sects = [
  {
    name: "강남철권문",
    description: "강한 팔과 단단한 몸을 중요시하는 문파",
    mainStats: ["STR", "CHI"],
    statRequirements: { STR: 200, CHI: 120 }
  },
  {
    name: "청풍채",
    description: "민첩한 몸놀림과 기의 흐름에 집중하는 문파",
    mainStats: ["AGI", "SEN"],
    statRequirements: { AGI: 200, SEN: 120 }
  },
  {
    name: "천심곡",
    description: "내면의 힘과 정신적 집중력을 중시하는 문파",
    mainStats: ["CHI", "WIL"],
    statRequirements: { CHI: 200, WIL: 120 }
  },
  {
    name: "현기루문",
    description: "기의 감지와 깨달음을 중시하는 문파",
    mainStats: ["SEN", "ITG"],
    statRequirements: { SEN: 200, ITG: 120 }
  },
  {
    name: "법진사",
    description: "굳건한 정신력과 외적인 방어를 추구하는 문파",
    mainStats: ["WIL", "DEF"],
    statRequirements: { WIL: 200, DEF: 120 }
  },
  {
    name: "태허문",
    description: "깊은 통찰력과 회복력을 중심으로 수련하는 문파",
    mainStats: ["ITG", "VIT"],
    statRequirements: { ITG: 200, VIT: 120 }
  },
  {
    name: "북천방",
    description: "강인한 힘과 무장을 바탕으로 싸우는 북방 문파",
    mainStats: ["DEF", "STR"],
    statRequirements: { DEF: 200, STR: 120 }
  },
  {
    name: "청운곡",
    description: "자연과 함께 흐르며 회복과 내면 강화에 집중하는 문파",
    mainStats: ["VIT", "AGI"],
    statRequirements: { VIT: 200, AGI: 120 }
  }
];

const bloodlines = [
  { id: 0, nameKor: "무형혈맥", nameHan: "無形血脈", rank: "N",
    traits: "기운이 구름처럼 흩어져 잡히지 않으니, 무공의 길이 매우 더디도다.",
    description: "기혈의 흐름이 어지럽고 불안정하여, 무공 수행의 벽을 높이 쌓았도다."
    ,statBonus: { STR:0.1, AGI:0.1, CHI:0.1, SEN:0.1, WIL:0.1, ITG:0.1, DEF:0.5, VIT:0.2 } // 무형혈맥
  },
  { id: 1, nameKor: "무골혈맥", nameHan: "無骨血脈", rank: "N",
    traits: "뼈대가 부서지기 쉬운 연약함이 몸에 깃들었도다. 방어의 벽이 허술하니 조심할지어다.",
    description: "단단함이 부족하여 상처가 끊이지 않고, 긴 수련길에 큰 고난이 따르도다."
    ,statBonus: { STR:0.2, AGI:0.2, CHI:0.3, SEN:0.3, WIL:0.3, ITG:0.3, DEF:0.2, VIT:0.1 } // 무골혈맥
  },
  { id: 2, nameKor: "치명혈맥", nameHan: "致命血脈", rank: "N",
    traits: "몸속 독기가 흐르니, 오래 견디기 어려워 무공 수행에 장벽이 되도다.",
    description: "독성에 스스로 잠식당해 장기간의 수련은 고통과 쇠락만을 남기리라."
    ,statBonus: { STR:0.3, AGI:0.3, CHI:0.2, SEN:0.2, WIL:0.2, ITG:0.5, DEF:0.2, VIT:0.1 } // 치명혈맥
  },
  { id: 3, nameKor: "혼돈혈맥", nameHan: "混沌血脈", rank: "N",
    traits: "내공과 정신이 파도처럼 출렁여, 무공 발동이 자주 흐트러지도다.",
    description: "불안한 기운이 마음과 몸을 뒤흔들어, 무공의 힘이 뜻밖에 흔들리도다."
    ,statBonus: { STR:0.3, AGI:0.2, CHI:0.1, SEN:0.3, WIL:0.2, ITG:0.3, DEF:0.3, VIT:0.5 } // 혼돈혈맥
  },
  { id: 4, nameKor: "무정혈맥", nameHan: "無精血脈", rank: "N",
    traits: "정신의 불꽃이 쉽게 꺼져, 신법과 심지의 수련이 더디도다.",
    description: "마음이 산란하고 흔들려 신법의 문을 열기 어려운 혈통이로다."
    ,statBonus: { STR:0.3, AGI:0.1, CHI:0.3, SEN:0.2, WIL:0.1, ITG:0.2, DEF:0.5, VIT:0.3 } // 무정혈맥
  },

  { id: 5, nameKor: "잔해혈맥", nameHan: "殘骸血脈", rank: "NR", 
    traits: "태어남과 동시에 상처투성이 몸, 성장의 한계가 깊도다.",
    description: "육신은 약하고 무공의 길도 험하여, 고난만 가득하도다.",
    statBonus: { STR:0.2, AGI:0.3, CHI:0.3, SEN:0.4, WIL:0.9, ITG:1.0, DEF:0.3, VIT:0.3 } // 잔해혈맥
   },
  { id: 6, nameKor: "쇠약혈맥", nameHan: "衰弱血脈", rank: "NR", 
    traits: "기혈이 맥박처럼 약하여, 힘과 기운 모두 쇠잔하도다.",
    description: "조금만 힘써도 몸이 무너지고, 회복은 더디기만 하니라.",
    statBonus: { STR:0.3, AGI:0.3, CHI:0.2, SEN:0.4, WIL:0.5, ITG:0.9, DEF:0.3, VIT:0.2 } // 쇠약혈맥
   },
  { id: 7, nameKor: "흑염혈맥", nameHan: "黑焰血脈", rank: "NR", 
    traits: "몸속 검은 불꽃이 일어나지만, 제 뜻을 따르지 아니하니 화를 부르도다.",
    description: "불꽃 무공을 펼칠 때마다 폭풍과도 같은 위험을 동반하도다.",
    statBonus: { STR:0.4, AGI:0.3, CHI:0.3, SEN:0.9, WIL:1.0, ITG:0.4, DEF:0.3, VIT:0.2 } // 흑염혈맥
   },
  { id: 8, nameKor: "비틀혈맥", nameHan: "扭曲血脈", rank: "NR", 
    traits: "혈맥이 뒤틀려 힘과 방어가 비껴가니, 효율이 크게 떨어지도다.",
    description: "기운이 몸 구석구석 흐르지 못해, 쉽게 무너지기 일쑤로다.",
    statBonus: { STR:0.2, AGI:0.3, CHI:0.4, SEN:0.3, WIL:0.4, ITG:0.3, DEF:0.2, VIT:0.9 } // 비틀혈맥
   },
  { id: 9, nameKor: "맹목혈맥", nameHan: "盲目血脈", rank: "NR", 
    traits: "심지가 흔들려 길을 잃고, 의욕과 정신이 자주 흔들리도다.",
    description: "약한 정신력으로 인해 수련이 방황하며, 성장의 길이 험난하도다.",
    statBonus: { STR:0.3, AGI:0.3, CHI:0.4, SEN:0.3, WIL:0.2, ITG:0.3, DEF:0.9, VIT:1.0 } // 맹목혈맥
   },

  { id: 10, nameKor: "미약혈맥", nameHan: "微弱血脈", rank: "R", 
    traits: "기혈이 조금 모자라 도약이 더디니, 초출의 길 험난하도다.",
    description: "수련은 가능하나, 강한 내공의 경지에 오르기까지 인고가 필요하도다.",
    statBonus: { STR:0.5, AGI:0.5, CHI:1.2, SEN:0.6, WIL:0.7, ITG:1.3, DEF:0.5, VIT:0.6 } // 미약혈맥
   },
  { id: 11, nameKor: "완만혈맥", nameHan: "緩慢血脈", rank: "R", 
    traits: "몸의 움직임 굼뜨니 무공 숙련이 늦게 피어나도다.",
    description: "대련 중 민첩함 모자라 적의 칼끝에 쉽게 밀리나니라.",
    statBonus: { STR:0.6, AGI:0.4, CHI:0.6, SEN:0.7, WIL:1.2, ITG:1.4, DEF:0.5, VIT:0.6 } // 완만혈맥
   },
  { id: 12, nameKor: "소음혈맥", nameHan: "疎陰血脈", rank: "R", 
    traits: "음기 순환 험난하여 내공과 신법 수련에 걸림돌이 되도다.",
    description: "신법 무공 닦기 힘들고, 내공 증강 또한 더디기만 하도다.",
    statBonus: { STR:0.6, AGI:0.5, CHI:0.4, SEN:0.5, WIL:0.6, ITG:1.2, DEF:0.6, VIT:1.3 } // 소음혈맥
   },
  { id: 13, nameKor: "경박혈맥", nameHan: "輕薄血脈", rank: "R", 
    traits: "체력 약해 쉽게 지치니 오래 버티기 어려우리.",
    description: "긴 싸움에 약해, 대전에서 버티기 힘든 운명이로다.",
    statBonus: { STR:0.5, AGI:0.6, CHI:0.6, SEN:0.5, WIL:0.7, ITG:0.5, DEF:1.3, VIT:1.2 } // 경박혈맥
   },
  { id: 14, nameKor: "흔들혈맥", nameHan: "搖曳血脈", rank: "R", 
    traits: "정신이 산란하여 수련 중 자주 길을 잃나니라.",
    description: "심지 무공 익히는 길에 실수가 잦아 발전 더뎌라.",
    statBonus: { STR:0.6, AGI:0.5, CHI:0.6, SEN:0.5, WIL:0.4, ITG:1.4, DEF:0.6, VIT:1.2 } // 흔들혈맥
   },

  { id: 15, nameKor: "중성혈맥", nameHan: "中性血脈", rank: "SR", 
    traits: "기혈 고르게 흐르니, 장단 모두 평온한 균형의 혈맥이로다.",
    description: "특별한 빛도 그늘도 없어, 누구나 무난히 성장하는 길이라.",
    statBonus: { STR:1.0, AGI:1.0, CHI:1.0, SEN:1.0, WIL:1.0, ITG:1.0, DEF:1.0, VIT:1.0 } // 중성혈맥
   },
  { id: 16, nameKor: "평정혈맥", nameHan: "平靜血脈", rank: "SR", 
    traits: "정신은 고요하고 마음은 평온해, 신법과 심지 수련에 길하도다.",
    description: "내공은 무난하나 신법과 심지의 꽃이 빨리 피어나리라.",
    statBonus: { STR:0.9, AGI:1.0, CHI:1.0, SEN:1.5, WIL:1.7, ITG:1.1, DEF:0.9, VIT:1.0 } // 평정혈맥
   },
  { id: 17, nameKor: "견고혈맥", nameHan: "堅固血脈", rank: "SR", 
    traits: "몸은 단단한 바위 같아, 방어와 체력에 굳건함을 더하나니.",
    description: "전장에 쓰러짐 적어 기초 힘줄 튼튼히 지켜주리라.",
    statBonus: { STR:1.2, AGI:0.9, CHI:1.0, SEN:1.0, WIL:1.0, ITG:1.0, DEF:1.7, VIT:1.5 } // 견고혈맥
   },
  { id: 18, nameKor: "유연혈맥", nameHan: "柔軟血脈", rank: "SR", 
    traits: "관절과 근육 유연하니 외공과 기감 무공에 영민하도다.",
    description: "회피와 민첩이 빛나지만 내공은 평범한 물결이라.",
    statBonus: { STR:0.9, AGI:1.6, CHI:0.9, SEN:1.5, WIL:1.0, ITG:1.0, DEF:1.1, VIT:1.0 } // 유연혈맥
   },
  { id: 19, nameKor: "적응혈맥", nameHan: "適應血脈", rank: "SR", 
    traits: "환경에 길들임이 빠르고, 여러 무공 체득에 재주 뛰어나도다.",
    description: "특출난 재능은 없으나 만무공을 고루 익히는 자태라.",
    statBonus: { STR:1.0, AGI:1.0, CHI:1.1, SEN:1.1, WIL:1.1, ITG:1.5, DEF:0.9, VIT:1.7 } // 적응혈맥
   },

  { id: 20, nameKor: "강건혈맥", nameHan: "强健血脈", rank: "SSR", 
    traits: "근골이 강철 같아 초부터 굳건한 체격을 지녔노라.",
    description: "무력과 방어는 산봉우리처럼 높으며, 격투에 능하니 무림의 벽이라.",
    statBonus: { STR:2.0, AGI:1.2, CHI:1.1, SEN:1.2, WIL:1.3, ITG:1.2, DEF:1.8, VIT:1.5 } // 강건혈맥
   },
  { id: 21, nameKor: "명철혈맥", nameHan: "明澈血脈", rank: "SSR", 
    traits: "맑은 정신과 강한 의지, 심지와 신법 수련에 밝은 등불 같도다.",
    description: "복잡한 무공도 쉽게 깨우치며, 내공을 날카롭게 다루는 자태라.",
    statBonus: { STR:1.1, AGI:1.2, CHI:1.5, SEN:1.3, WIL:2.0, ITG:1.8, DEF:1.1, VIT:1.3 } // 명철혈맥
   },
  { id: 22, nameKor: "청명혈맥", nameHan: "淸明血脈", rank: "SSR", 
    traits: "기감과 오성의 기운이 맑게 흐르니 기공과 오공 무공에 밝으리.",
    description: "정기 순환 탁월하여 내외공 모두 조화롭게 꽃피운다.",
    statBonus: { STR:1.3, AGI:1.3, CHI:1.5, SEN:1.8, WIL:1.4, ITG:2.0, DEF:1.2, VIT:1.2 } // 청명혈맥
   },
  { id: 23, nameKor: "비상혈맥", nameHan: "飛翔血脈", rank: "SSR", 
    traits: "민첩과 속도는 바람과 같아 빠른 몸놀림과 회피에 탁월하도다.",
    description: "격투의 춤을 추며 전장에 자유로이 날아다니는 용맹함이라.",
    statBonus: { STR:1.1, AGI:2.0, CHI:1.2, SEN:1.8, WIL:1.2, ITG:1.3, DEF:1.1, VIT:1.3 } // 비상혈맥
   },
  { id: 24, nameKor: "잠재혈맥", nameHan: "潛在血脈", rank: "SSR", 
    traits: "숨겨진 힘이 깊이 잠들어 꾸준한 수련으로 빛을 발하리라.",
    description: "초반은 평범하나 수련할수록 폭발하는 신비로운 혈맥이라.",
    statBonus: { STR:1.2, AGI:1.3, CHI:1.5, SEN:1.3, WIL:1.4, ITG:2.0, DEF:1.2, VIT:1.8 } // 잠재혈맥
   },

  { id: 25, nameKor: "초목혈맥", nameHan: "草木血脈", rank: "UR", 
    traits: "천지(天地)의 영기(靈氣)를 품어 생기와 회복력이 빛나느니라.",
    description: "산림(山林)과 초목(草木)의 정기(精氣)를 이어받아 천부(天賦)의 치유력이라.",
    statBonus: { STR:1.5, AGI:1.7, CHI:2.6, SEN:1.8, WIL:2.0, ITG:1.6, DEF:1.9, VIT:3.0 } // 초목혈맥
   },
  { id: 26, nameKor: "돌기혈맥", nameHan: "岩骨血脈", rank: "UR", 
    traits: "암석(巖石)같이 단단한 골기(骨氣)를 품어 방패와 같도다.",
    description: "바위처럼 굳건한 골격(骨格)이 몸을 지키며, 견강(堅強)한 힘을 품었느니라.",
    statBonus: { STR:3.2, AGI:1.5, CHI:1.6, SEN:1.5, WIL:1.8, ITG:1.7, DEF:3.0, VIT:2.6 } // 돌기혈맥
   },
  { id: 27, nameKor: "연기혈맥", nameHan: "煙氣血脈", rank: "UR", 
    traits: "연무(煙霧)처럼 흐릿한 기운(氣運), 은밀하고 민첩함을 드러내누나.",
    description: "연하(煙霞)처럼 흐르며 적의 눈을 피하고 그림자 속에 숨는다.",
    statBonus: { STR:1.4, AGI:3.8, CHI:1.6, SEN:3.0, WIL:1.7, ITG:2.0, DEF:1.5, VIT:1.8 } // 연기혈맥
   },
  { id: 28, nameKor: "화염유맥", nameHan: "火焰游脈", rank: "UR", 
    traits: "체내(體內)에 화염(火焰)의 혼이 깃들어 불꽃 같은 열렬함을 품었도다.",
    description: "화설(火舌)이 휘날리며 적을 태우고, 열염(烈焰)의 위력이 몸을 감싸누나.",
    statBonus: { STR:2.6, AGI:2.0, CHI:3.8, SEN:2.7, WIL:1.5, ITG:1.9, DEF:2.5, VIT:1.6 } // 화염유맥
   },
  { id: 29, nameKor: "빙설혈맥", nameHan: "冰雪血脈", rank: "UR", 
    traits: "빙설(氷雪)의 기운이 혈맥에 깃들어 한기(寒氣)와 결빙(結氷)의 힘을 지녔느니라.",
    description: "한광(寒光)이 응결하여 적의 움직임을 응체(凝滯)시키고, 얼음의 영기(靈氣)를 내뿜는다.",
    statBonus: { STR:1.7, AGI:1.5, CHI:2.0, SEN:3.8, WIL:2.6, ITG:1.8, DEF:1.6, VIT:2.9 } // 빙설혈맥
   },

   { id: 30, nameKor: "광염혈맥", nameHan: "光炎血脈", rank: "LR", 
    traits: "태양(太陽)의 불꽃처럼 눈부신 빛과 뜨거운 열기를 내뿜으며, 그 기운이 대지를 태우도다.",
    description: "이 혈맥은 강렬한 광휘(光輝)와 화염(火焰)을 자유로이 조종하여, 전장에서 적의 시야를 방해하고 불꽃 같은 공격력으로 적진을 붉게 물들이느니라.",
    statBonus: { STR:5.0, AGI:3.2, CHI:2.8, SEN:4.5, WIL:7.0, ITG:2.6, DEF:3.2, VIT:2.9 }
  },
  { id: 31, nameKor: "천무혈맥", nameHan: "天舞血脈", rank: "LR", 
    traits: "하늘(天空)을 유영하는 춤사위처럼 가볍고 민첩한 몸놀림이 그 혈맥의 자랑이라.",
    description: "이 혈맥을 지닌 자는 바람결에 실려 하늘 위를 유영하듯 경쾌하고 우아한 동작을 펼쳐, 적의 공격을 피하며 무공의 절정을 이루나니 그 기운은 마치 구름 사이를 누비는 천상의 무희 같도다.",
    statBonus: { STR:2.7, AGI:5.0, CHI:2.5, SEN:4.2, WIL:2.9, ITG:7.0, DEF:2.4, VIT:2.6 }
  },
  { id: 32, nameKor: "흑란혈맥", nameHan: "黑蘭血脈", rank: "LR", 
    traits: "어둠(暗影)과 그림자(影子)의 기운을 머금어, 은밀한 암습과 숨어드는 재주에 능하도다.",
    description: "이 혈맥을 타고난 자는 칠흑 같은 밤하늘 속에 자신을 감추며, 번개같은 속도로 적진을 급습하여 순식간에 사라지는 흑란(黑蘭)처럼 은밀하고 치명적인 힘을 펼치느니라.",
    statBonus: { STR:2.6, AGI:4.8, CHI:2.7, SEN:5.0, WIL:2.8, ITG:2.9, DEF:7.5, VIT:2.5 }
  },
  { id: 33, nameKor: "청풍유맥", nameHan: "靑風游脈", rank: "LR", 
    traits: "맑고 시원한 바람(靑風)처럼 빠르고 유연한 몸놀림과 깊은 기감(氣感)이 그 혈맥의 특징이로다.",
    description: "이 혈맥을 지닌 자는 청명한 바람결을 타고 유유히 움직이며, 상대의 허점을 날카롭게 꿰뚫어 날렵한 공격을 퍼붓고, 그 민첩함은 마치 산들바람처럼 적의 심장에 닿는다 하리라.",
    statBonus: { STR:2.8, AGI:4.5, CHI:2.9, SEN:4.8, WIL:2.6, ITG:3.2, DEF:2.7, VIT:7.5 }
  },
  { id: 34, nameKor: "황룡혈맥", nameHan: "黃龍血脈", rank: "LR", 
    traits: "전설의 용(龍)의 기운과 위엄을 품어, 강력한 공격력과 천하를 압도하는 위압감을 자랑하느니라.",
    description: "황룡(黃龍)의 후예라 칭해지는 이 혈맥은 무림(武林)에서 최고라 일컬어지며, 강대한 무공과 탁월한 리더십으로 전장을 지휘하여, 그 존재만으로도 적군의 혼을 꺾는 위엄을 드러내는 것이로다.",
    statBonus: { STR:7.0, AGI:3.0, CHI:3.2, SEN:3.5, WIL:4.2, ITG:2.8, DEF:4.8, VIT:3.0 }
  },  

  { id: 35, nameKor: "혼천혈맥", nameHan: "混天血脈", rank: "GR", 
    traits: "하늘(天)과 땅(地)을 두루 아우르는 기운을 품어, 만가지 속성(屬性)을 자유자재로 다룰 수 있는 무궁무진한 혈맥이라.",
    description: "온갖 무공의 근원이 되는 다채로운 기운을 내포하여, 그 힘은 강대하고 광범위하며, 여러 무공에 응용됨이 무림(武林)에서 전설로 전해진다 하리라.",
    statBonus: { STR:7.5, AGI:11.2, CHI:8.0, SEN:7.5, WIL:7.0, ITG:9.5, DEF:6.8, VIT:7.2 }
  },
  { id: 36, nameKor: "천뢰혈맥", nameHan: "天雷血脈", rank: "GR", 
    traits: "하늘(天)의 번개(雷電)와 천둥(天雷)의 정수를 온전히 품어, 전격(電擊) 속성 공격을 강력히 발휘하는 혈맥이로다.",
    description: "전격 무공에 뛰어난 재능을 지니며, 번개처럼 빠르고 강렬한 폭발력으로 적들을 단숨에 제압하는 기상이 서려 있도다.",
    statBonus: { STR:9.0, AGI:7.8, CHI:11.5, SEN:9.8, WIL:6.3, ITG:6.5, DEF:5.2, VIT:5.0 }
  },
  { id: 37, nameKor: "흑풍혈맥", nameHan: "黑風血脈", rank: "GR", 
    traits: "검은 바람(黑風)과 어둠(暗影)의 기운이 융합하여, 신속성과 암습에 뛰어난 절정의 혈맥이라.",
    description: "그 기운은 바람처럼 빠르며, 어둠 속에 몸을 숨겨 적을 암살하는 데 능하며, 기습과 은밀한 움직임에 그 이름이 높도다.",
    statBonus: { STR:5.0, AGI:9.5, CHI:5.8, SEN:11.0, WIL:5.6, ITG:6.0, DEF:5.2, VIT:5.5 }
  },
  { id: 38, nameKor: "화룡유맥", nameHan: "火龍游脈", rank: "GR", 
    traits: "불타는 용(火龍)의 숨결을 품어, 강력한 화염(火焰) 무공을 펼치는 화염공격 특화 혈맥이로다.",
    description: "화염 무공의 집중과 폭발력을 지니고 있어, 전투에서 불꽃 같은 강렬함을 뽐내며, 적들을 한순간에 불태우는 힘을 지녔느니라.",
    statBonus: { STR:10.0, AGI:7.2, CHI:6.8, SEN:8.5, WIL:11.2, ITG:6.0, DEF:6.0, VIT:6.5 }
  },
  { id: 39, nameKor: "빙천혈맥", nameHan: "氷天血脈", rank: "GR", 
    traits: "차가운 얼음(氷)과 하늘(天)의 정기(精氣)를 품어, 냉기(冷氣)와 방어력(防禦力)에 뛰어난 혈맥이라 하노라.",
    description: "얼음을 다루는 능력과 뛰어난 방어력으로 몸을 단단히 지키며, 성품 또한 차갑고 냉철하여 어떤 난관도 이겨내는 불굴의 힘을 갖추었느니라.",
    statBonus: { STR:6.0, AGI:5.5, CHI:7.0, SEN:6.2, WIL:8.2, ITG:11.5, DEF:9.5, VIT:10.0 }
  },
  
  { id: 40, nameKor: "성월유맥", nameHan: "星月游脈", rank: "TR", 
    traits: "별(星)과 달(月)의 신비로운 힘을 품어, 신법(神法)과 심지(心智) 수련에 탁월한 은혜를 내리는 혈맥이라.",
    description: "천체(天體)의 기운을 머금어 심신을 맑게 하며, 깊은 정신력과 뛰어난 집중력으로 무공을 더욱더 강화하는 자손이 될지니라.",
    statBonus: { STR:8.2, AGI:9.5, CHI:10.0, SEN:12.0, WIL:14.5, ITG:13.0, DEF:15.0, VIT:9.5 } // 성월유맥
   },
  { id: 41, nameKor: "영혼혈맥", nameHan: "靈魂血脈", rank: "TR", 
    traits: "혼(魂)과 영혼(靈魂)의 순수한 기운을 품어, 강력한 내공과 예민한 기감(氣感)을 갖춘 혈맥이라 하노라.",
    description: "내공의 깊이와 기감이 극도로 발달하여 심리전과 무공의 심화(深化)에 있어 무림(武林)에서도 으뜸가는 존재로 칭송받을 것이니라.",
    statBonus: { STR:8.0, AGI:8.8, CHI:14.0, SEN:10.2, WIL:12.5, ITG:11.0, DEF:8.2, VIT:15.8 } // 영혼혈맥
   },
  { id: 42, nameKor: "천마혈맥", nameHan: "天魔血脈", rank: "TR", 
    traits: "마족(魔族)의 기운을 잇는 혈통으로, 강대한 공격력과 뛰어난 재생력을 갖추었도다.",
    description: "인간과 마족이 혼혈되어 태어난 이 혈맥은 강인한 체력과 빠른 회복력으로 전장에서 압도적인 힘을 발휘할지니, 그 위용이 두렵다 하리라.",
    statBonus: { STR:16.0, AGI:10.5, CHI:9.2, SEN:9.5, WIL:8.0, ITG:8.8, DEF:12.0, VIT:13.5 } // 천마혈맥
   },
  { id: 43, nameKor: "운룡혈맥", nameHan: "雲龍血脈", rank: "TR", 
    traits: "구름(雲)과 용(龍)의 기운이 어우러져, 무공과 기감이 균형 있게 조화를 이룬 혈맥이라.",
    description: "신속성과 파괴력이 완벽한 조화를 이루어 전투에 능하며, 어느 곳에서나 빛나는 균형잡힌 전투력을 자랑하리라.",
    statBonus: { STR:11.5, AGI:16.0, CHI:9.5, SEN:10.5, WIL:9.0, ITG:10.0, DEF:9.8, VIT:10.2 } // 운룡혈맥
   },
  { id: 44, nameKor: "태양혈맥", nameHan: "太陽血脈", rank: "TR", 
    traits: "태양(太陽)의 뜨거운 불꽃과 뜨거운 열기를 품어, 강력한 화속성(火屬性) 무공을 펼치는 혈맥이라.",
    description: "불속성 무공에 뛰어난 재능을 지녔으며, 불꽃처럼 타오르는 강렬한 공격과 눈부신 광휘를 발휘하여 무림의 전장에서 찬란한 빛을 내뿜으리라.",
    statBonus: { STR:14.0, AGI:10.0, CHI:16.5, SEN:11.0, WIL:10.2, ITG:9.5, DEF:10.0, VIT:11.5 } // 태양혈맥
   },

  { id: 45, nameKor: "황천혼맥", nameHan: "黃天魂脈", rank: "XR", 
    traits: "천계(天界)의 거룩한 기운과 순수한 영혼(魂)이 한데 융합된, 최상위의 신성한 혈통이로다.",
    description: "천지를 관통하는 강력한 내공과 신법, 예민한 기감이 무한히 극한에 닿아, 신화 속 신령(神靈)과도 같아 무림의 절대 경지라 일컬어진다.",
    statBonus: { STR:40.0, AGI:35.0, CHI:60.0, SEN:99.0, WIL:30.0, ITG:40.0, DEF:38.0, VIT:37.5 } // 황천혼맥
   },
  { id: 46, nameKor: "무극혈맥", nameHan: "無極血脈", rank: "XR", 
    traits: "무한(無限)의 기운을 자유자재로 다루는, 경계 없는 무극의 극한 혈맥이로다.",
    description: "한계를 초월하는 힘과 탁월한 기술을 구사하여, 수련의 종착점이라 할 만한 전설적인 혈맥으로 후세에 길이 남을지니라.",
    statBonus: { STR:60.0, AGI:45.0, CHI:55.0, SEN:40.0, WIL:99.0, ITG:38.0, DEF:37.0, VIT:36.0 } // 무극혈맥
   },
  { id: 47, nameKor: "천지혼혈", nameHan: "天地混血", rank: "XR", 
    traits: "천지(天地)의 광대한 기운이 혼합되어, 초월의 경지에 오른 신성한 혈통이라 일컫노라.",
    description: "자연 만물의 모든 힘을 일부나마 담아내어, 신법과 무공이 극치를 이루며, 무림의 고수들이 꿈꾸는 절정의 존재로 빛나리라.",
    statBonus: { STR:45.0, AGI:38.0, CHI:60.0, SEN:50.0, WIL:42.0, ITG:99.0, DEF:39.0, VIT:41.0 } // 천지혼혈
   },
  { id: 48, nameKor: "마성혼맥", nameHan: "魔性魂脈", rank: "XR", 
    traits: "마계(魔界)의 어둠과 불가사의한 힘이 응축되어, 그 위험마저도 경외하는 강력한 혈맥이라.",
    description: "강렬한 마법과 신비로운 어둠의 무공을 자유로이 다루며, 힘의 대가로써 감당하기 어려운 위험 또한 품고 있으니, 무림의 어둠 속 전설이라 하리라.",
    statBonus: { STR:38.0, AGI:40.0, CHI:50.0, SEN:45.0, WIL:60.0, ITG:55.0, DEF:99.5, VIT:36.5 } // 마성혼맥
   },
  { id: 49, nameKor: "천룡혈맥", nameHan: "天龍血脈", rank: "XR", 
    traits: "하늘의 용신(龍神) 혈통으로, 모든 무공과 내공의 절정을 상징하는 숭고한 혈맥이라.",
    description: "전설과 신화에 빛나는 이 혈맥은 신체 능력과 무공의 극대화를 이루어내어, 무림의 절대 고수들이 평생을 갈망하는 궁극의 존재라 일컬어진다.",
    statBonus: { STR:55.0, AGI:50.0, CHI:70.0, SEN:65.0, WIL:60.0, ITG:62.0, DEF:40.0, VIT:99.0 } // 천룡혈맥
   }

];



// DOM 요소
const actionBtn = document.getElementById("actionBtn");
const actionList = document.getElementById("actionList");
const statsBtn = document.getElementById("statsBtn");
const statsPanel = document.getElementById("statsPanel");
const actionsPanel = document.getElementById("actionsPanel");
const log = document.getElementById("log");
const closeStatsBtn = document.getElementById("closeStatsBtn");
const closeActionsBtn = document.getElementById("closeActionsBtn");


//   STR: "근력 (筋力)",
//   AGI: "신법 (身法)",
//   CHI: "내력 (內力)",
//   SEN: "기감 (氣感)",
//   WIL: "심지 (心志)",
//   ITG: "오성 (悟性)",
//   DEF: "외공 (外功)",
//   VIT: "경맥 (經脈)"
// [행동명, 최소일수, 최대일수, 소모체력, 소모내력, 회복체력, 회복내력, 명성증가량,
//   STR, AGI, CHI, SEN, WIL, ITG, DEF, VIT,
//   최소경지인덱스, 최대경지인덱스, 허용문파배열]
// 기존 필드 뒤에 failRate, injuryRate 추가
const actionData = [
  ["호흡정신<br>(呼吸精神)", 1, 2, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, [], 0, 0],
  ["집기응기<br>(集氣凝氣)", 1, 2, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, [], 0, 0],
  ["기력순환<br>(氣力循環)", 2, 4, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, [], 0, 0],
  ["내공흡기<br>(內功吸氣)", 2, 4, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, [], 0, 0],
  ["기공대법<br>(氣功大法)", 3, 6, 0, 0, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 9, [], 0, 0],
  ["기맥개방<br>(氣脈開放)", 3, 6, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 9, [], 0, 0],
  ["신공개방<br>(神功開放)", 5, 9, 0, 0, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 15, [], 0, 0],
  ["내공대성<br>(內功大成)", 5, 9, 0, 0, 0, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 15, [], 0, 0],

  ["참목참수<br>(斬木斬手)", 1, 3, 10, 5, 0, 0, 1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 5, [], 0.05, 0],
  ["요격회피<br>(要擊回避)", 1, 3, 5, 10, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 5, [], 0.05, 0],
  ["단전호흡<br>(丹田呼吸)", 1, 3, 0, 15, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 5, [], 0.05, 0],
  ["안개명상<br>(煙霞冥想)", 1, 3, 5, 10, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 5, [], 0.05, 0],
  ["묵통기공<br>(默通氣功)", 1, 3, 8, 8, 0, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 0, 5, [], 0.05, 0],
  ["사범모방<br>(師範模倣)", 1, 3, 10, 5, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 5, [], 0.05, 0],
  ["참장작파<br>(斬薪作破)", 1, 3, 15, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 5, [], 0.05, 0],
  ["호흡동기<br>(呼吸同期)", 1, 3, 8, 8, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 2, 0, 5, [], 0.05, 0],

  ["적재운반<br>(積載運搬)", 4, 8, 50, 25, 0, 0, 3, 6, 0, 3, 1, 0, 0, 0, 0, 1, 6, [], 0.05, 0], 
  ["수상보행<br>(水上步行)", 4, 8, 25, 50, 0, 0, 3, 0, 6, 0, 3, 1, 0, 0, 0, 1, 6, [], 0.05, 0], 
  ["명화호위<br>(明火護衛)", 4, 8, 0, 75, 0, 0, 3, 0, 0, 6, 0, 3, 1, 0, 0, 1, 6, [], 0.05, 0], 
  ["무음행보<br>(無音行步)", 4, 8, 25, 50, 0, 0, 3, 0, 0, 0, 6, 0, 3, 1, 0, 1, 6, [], 0.05, 0], 
  ["경전필사<br>(經典筆寫)", 4, 8, 30, 45, 0, 0, 3, 0, 0, 0, 0, 6, 0, 3, 1, 1, 6, [], 0.05, 0], 
  ["무공전수<br>(武功傳授)", 4, 8, 50, 25, 0, 0, 3, 1, 0, 0, 0, 0, 6, 0, 3, 1, 6, [], 0.05, 0], 
  ["잠수지기<br>(潛水持氣)", 4, 8, 75, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 6, 0, 1, 6, [], 0.05, 0], 
  ["경혈압박<br>(經穴壓迫)", 4, 8, 45, 30, 0, 0, 3, 0, 3, 1, 0, 0, 0, 0, 6, 1, 6, [], 0.05, 0], 

  ["석쇄견인<br>(石碎牽引)", 10, 25, 200, 100, 0, 0, 5, 12, 0, 6, 2, 0, 0, 0, 0, 3, 10, [], 0.15, 0.1], // STR +3, VIT +2, 체력 회복 +1
  ["암벽등반<br>(巖壁登攀)", 10, 25, 100, 200, 0, 0, 5, 0, 12, 0, 6, 2, 0, 0, 0, 3, 10, [], 0.15, 0.1], // AGI +3, VIT +1, 내력 회복 +1
  ["동굴정념<br>(洞窟靜念)", 10, 25, 0, 300, 0, 0, 5, 0, 0, 12, 0, 6, 2, 0, 0, 3, 10, [], 0.15, 0], // CHI +3, SEN +1, ITG +1, VIT +1, 내력 회복 +6
  ["기류감지<br>(氣流感知)", 10, 25, 100, 200, 0, 0, 5, 0, 0, 0, 12, 0, 6, 2, 0, 3, 10, [], 0.15, 0], // AGI +4, SEN +1, ITG +1, 내력 회복 +4
  ["사념봉쇄<br>(邪念封鎖)", 10, 25, 120, 180, 0, 0, 5, 0, 0, 0, 0, 12, 0, 6, 2, 3, 10, [], 0.15, 0], // SEN +4, WIL +2, ITG +1, 내력 회복 +5
  ["진법관찰<br>(陣法觀察)", 10, 25, 200, 100, 0, 0, 5, 2, 0, 0, 0, 0, 12, 0, 6, 3, 10, [], 0.15, 0], // AGI +2, WIL +2, ITG +2, 내력 회복 +5
  ["예리접촉<br>(銳利接觸)", 10, 25, 300, 0, 0, 0, 5, 6, 2, 0, 0, 0, 0, 12, 0, 3, 10, [], 0.15, 0.1], // STR +3, VIT +2, 체력 회복 +2
  ["냉온순환<br>(冷溫循環)", 10, 25, 180, 120, 0, 0, 5, 0, 6, 2, 0, 0, 0, 0, 12, 3, 10, [], 0.15, 0],  // CHI +2, ITG +2, SEN +2, 내력 회복 +5

  ["일지지기<br>(一指支氣)", 20, 40, 1000, 500, 0, 0, 10, 20, 0, 10, 5, 0, 0, 0, 0, 5, 12, [], 0.15, 0.1], // STR +4, VIT +3, 체력 회복 +2
  ["삭로보행<br>(索路步行)", 20, 40, 500, 1000, 0, 0, 10, 0, 20, 0, 10, 5, 0, 0, 0, 5, 12, [], 0.15, 0.1], // AGI +4, SEN +2, 내력 회복 +2
  ["독기내성<br>(毒氣耐性)", 20, 40, 0, 1500, 0, 0, 10, 0, 0, 20, 0, 10, 5, 0, 0, 5, 12, [], 0.25, 0.2], // CHI +6, SEN +3, ITG +3, VIT +3, 부작용 있음
  ["정적감지<br>(靜寂感知)", 20, 40, 500, 1000, 0, 0, 10, 0, 0, 0, 20, 0, 10, 5, 0, 5, 12, [], 0.2, 0.1], // AGI +5, SEN +3, ITG +3
  ["환상대면<br>(幻象對面)", 20, 40, 600, 900, 0, 0, 10, 0, 0, 0, 0, 20, 0, 10, 5, 5, 12, [], 0.25, 0.2], // SEN +6, WIL +5, ITG +3
  ["무공분해<br>(武功分解)", 20, 40, 1000, 500, 0, 0, 10, 5, 0, 0, 0, 0, 20, 0, 10, 5, 12, [], 0.2, 0.1], // AGI +4, WIL +3, ITG +3
  ["철초분쇄<br>(鐵草粉碎)", 20, 40, 1500, 0, 0, 0, 10, 10, 5, 0, 0, 0, 0, 20, 0, 5, 12, [], 0.25, 0.2], // STR +6, VIT +5, 극공형
  ["경락조작<br>(經絡操作)", 20, 40, 900, 600, 0, 0, 10, 0, 10, 5, 0, 0, 0, 0, 20, 5, 12, [], 0.2, 0.1], // CHI +4, WIL +3, ITG +3

  ["웅투혈전<br>(熊鬪血戰)", 30, 60, 5000, 2500, 0, 0, 15, 50, 0, 25, 10, 0, 0, 0, 0, 7, 15, [], 0.35, 0.25], // 근력5
  ["풍속질주<br>(風速疾走)", 30, 60, 2500, 5000, 0, 0, 15, 0, 50, 0, 25, 10, 0, 0, 0, 7, 15, [], 0.3, 0.2], // 신법5
  ["내력융합<br>(內力融合)", 30, 60, 0, 7500, 0, 0, 15, 0, 0, 50, 0, 25, 10, 0, 0, 7, 15, [], 0.15, 0], // 내력5
  ["기류역전<br>(氣流逆轉)", 30, 60, 2500, 5000, 0, 0, 15, 0, 0, 0, 50, 0, 25, 10, 0, 7, 15, [], 0.35, 0.25], // 기감5
  ["독각단련<br>(毒覺鍛鍊)", 30, 60, 3000, 4500, 0, 0, 15, 0, 0, 0, 0, 50, 0, 25, 10, 7, 15, [], 0.4, 0.3], // 심지5
  ["무공수정<br>(武功修正)", 30, 60, 5000, 2500, 0, 0, 15, 10, 0, 0, 0, 0, 50, 0, 25, 7, 15, [], 0.35, 0], // 오성5
  ["육신뇌격<br>(肉身雷擊)", 30, 60, 7500, 0, 0, 0, 15, 25, 10, 0, 0, 0, 0, 50, 0, 7, 15, [], 0.4, 0.35], // 외공5
  ["천맥역행<br>(天脈逆行)", 30, 60, 4500, 3000, 0, 0, 15, 0, 25, 10, 0, 0, 0, 0, 50, 7, 15, [], 0.4, 0.3],  // 경맥5

  ["장작벌채<br>(樟斫伐柴)", 5, 10, 10, 5, 0, 0, 1, 5, 0, 2, 0, 0, 0, 0, 0, 1, 5, ["강남철권문"], 0.2, 0.15],
  ["철권격파<br>(鐵拳擊破)", 5, 10, 30, 15, 0, 0, 3, 10, 0, 5, 0, 0, 0, 0, 0, 3, 10, ["강남철권문"], 0.25, 0.2],
  ["일장전속<br>(日長電速)", 5, 10, 100, 50, 0, 0, 5, 15, 0, 8, 0, 0, 0, 0, 0, 5, 15, ["강남철권문"], 0.18, 0.12],
  ["철근불괴<br>(鐵筋不壞)", 5, 10, 300, 150, 0, 0, 10, 25, 0, 12, 0, 0, 0, 0, 0, 10, 15, ["강남철권문"], 0.3, 0.2],

  ["수상질주<br>(樹上疾走)", 5, 10, 5, 10, 0, 0, 1, 0, 5, 0, 2, 0, 0, 0, 0, 1, 5, ["청풍채"], 0.22, 0.15],
  ["조음은신<br>(鳥音隱身)", 5, 10, 15, 30, 0, 0, 3, 0, 10, 0, 5, 0, 0, 0, 0, 3, 10, ["청풍채"], 0.18, 0.12],
  ["유풍경속<br>(流水輕速)", 5, 10, 50, 100, 0, 0, 5, 0, 15, 0, 8, 0, 0, 0, 0, 5, 15, ["청풍채"], 0.2, 0.15],
  ["풍뢰신속<br>(風雷神速)", 5, 10, 150, 300, 0, 0, 10, 0, 25, 0, 12, 0, 0, 0, 0, 10, 15, ["청풍채"], 0.2, 0.15],

  ["계곡정념<br>(溪谷靜念)", 5, 10, 0, 15, 0, 0, 1, 0, 0, 5, 0, 2, 0, 0, 0, 1, 5, ["천심곡"], 0.15, 0.1],
  ["풍속단련<br>(風速鍛鍊)", 5, 10, 0, 45, 0, 0, 3, 0, 0, 10, 0, 5, 0, 0, 0, 3, 10, ["천심곡"], 0.22, 0.15],
  ["정심단련<br>(定心鍛鍊)", 5, 10, 0, 150, 0, 0, 5, 0, 0, 15, 0, 8, 0, 0, 0, 5, 15, ["천심곡"], 0.25, 0.2],
  ["천지흡기<br>(天地吸氣)", 5, 10, 0, 450, 0, 0, 10, 0, 0, 25, 0, 12, 0, 0, 0, 10, 15, ["천심곡"], 0.25, 0.2],

  ["단전회전<br>(丹田回轉)", 5, 10, 5, 10, 0, 0, 1, 0, 0, 0, 5, 0, 2, 0, 0, 1, 5, ["현기루문"], 0.22, 0.15],
  ["절벽경맥<br>(絶壁經脈)", 5, 10, 20, 25, 0, 0, 3, 0, 0, 0, 10, 0, 5, 0, 0, 3, 10, ["현기루문"], 0.28, 0.2],
  ["심산명상<br>(深山冥想)", 5, 10, 50, 100, 0, 10, 5, 0, 0, 0, 15, 0, 8, 0, 0, 5, 15, ["현기루문"], 0.25, 0.15],
  ["무극현감<br>(無極玄感)", 5, 10, 200, 250, 0, 10, 10, 0, 0, 0, 25, 0, 12, 0, 0, 10, 15, ["현기루문"], 0.25, 0.15],

  ["기맥통개<br>(氣脈通開)", 5, 10, 6, 9, 0, 0, 1, 0, 0, 0, 0, 5, 0, 2, 0, 1, 5, ["법진사"], 0.25, 0.15],
  ["산풍명상<br>(山風冥想)", 5, 10, 18, 27, 0, 0, 3, 0, 0, 0, 0, 10, 0, 5, 0, 3, 10, ["법진사"], 0.18, 0.1],
  ["기운유도<br>(氣運誘導)", 5, 10, 60, 90, 0, 0, 5, 0, 0, 0, 0, 15, 0, 8, 0, 5, 15, ["법진사"], 0.3, 0.2],
  ["철혈불멸<br>(鐵血不滅)", 5, 10, 180, 270, 0, 0, 10, 0, 0, 0, 0, 25, 0, 12, 0, 10, 15, ["법진사"], 0.3, 0.2],

  ["계곡정념<br>(溪谷靜念)", 5, 10, 10, 5, 0, 0, 1, 0, 0, 0, 0, 0, 5, 0, 2, 1, 5, ["태허문"], 0.25, 0.15],
  ["단전회전<br>(丹田回轉)", 5, 10, 50, 25, 0, 0, 3, 0, 0, 0, 0, 0, 10, 0, 5, 3, 10, ["태허문"], 0.22, 0.12],
  ["산중정진<br>(山中精進)", 5, 10, 100, 50, 0, 0, 5, 0, 0, 0, 0, 0, 15, 0, 8, 5, 15, ["태허문"], 0.3, 0.2],
  ["오행파천<br>(五行破天)", 5, 10, 500, 250, 0, 0, 10, 0, 0, 0, 0, 0, 25, 0, 12, 10, 15, ["태허문"], 0.3, 0.2],

  ["빙천수련<br>(氷泉修鍊)", 5, 10, 15, 0, 0, 0, 1, 0, 2, 0, 0, 7, 0, 5, 0, 1, 5, ["북천방"], 0.3, 0.2],
  ["한기불리<br>(寒氣扶立)", 5, 10, 50, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, 10, 0, 3, 10, ["북천방"], 0.28, 0.2],
  ["빙결명상<br>(氷結冥想)", 5, 10, 150, 0, 0, 0, 5, 0, 8, 0, 0, 5, 0, 15, 0, 5, 15, ["북천방"], 0.2, 0.1],
  ["강철천피<br>(鋼鐵天皮)", 5, 10, 500, 0, 0, 0, 10, 0, 12, 0, 0, 5, 0, 25, 0, 10, 15, ["북천방"], 0.2, 0.1],

  ["고서탐독<br>(古書探讀)", 5, 10, 9, 6, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 5, 1, 5, ["청운곡"], 0.22, 0.15],
  ["풍감명상<br>(風感冥想)", 5, 10, 27, 18, 0, 0, 3, 0, 5, 0, 0, 0, 0, 0, 10, 3, 10, ["청운곡"], 0.25, 0.15],
  ["임중관찰<br>(林中觀察)", 5, 10, 90, 60, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 15, 5, 15, ["청운곡"], 0.18, 0.1],
  ["혈로천행<br>(血路天行)", 5, 10, 270, 180, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 25, 10, 15, ["청운곡"], 0.18, 0.1]

];



function doAction(idx) {
  const [
    name,  MinDay, MaxDay, costHealth, costEnergy, recovHealth, recovEnergy, gainFame,
    deltaSTR, deltaAGI, deltaCHI, deltaSEN, deltaWIL, deltaITG, deltaDEF, deltaVIT,
    minRealm, maxRealm, allowedSects, failRate = 0, injuryRate = 0
  ] = actionData[idx];

  // 경지 조건 체크
  if (stats.Realm < minRealm) {
    LogAdd(`'${name.replace(/<br\s*\/?>/gi, ' ')}' 은(는) 오직 ${realms[minRealm].name} 이상의 경지에 오른 자만이 닦을 수 있으니, 힘써 수련을 쌓으라 하노라.`, 'orange');
  return;
  }
  if (stats.Realm > maxRealm) {
    LogAdd(`'${name.replace(/<br\s*\/?>/gi, ' ')}' 은(는) ${realms[maxRealm].name} 이하의 경지만이 펼칠 수 있으니, 그 힘에 부합하도록 마음을 가다듬으라.`, 'orange');
  return;
  }

  // 문파 조건 체크 (stats.sect가 없으면 통과, 있으면 검사)
  if (allowedSects.length > 0 && (!stats.sect || !allowedSects.includes(stats.sect))) {
    LogAdd(`지금의 문파로는 '${name.replace(/<br\s*\/?>/gi, ' ')}' 의 비공을 펼치기 어렵다. 문파의 허락을 받으라.`, 'red');
  return;
  }

  // 자원 조건 체크
  if (stats.health < costHealth) {
    LogAdd(`네 육체의 기혈이 모자라 '${name.replace(/<br\s*\/?>/gi, ' ')}' 을(를) 수행하기 고되다.`, 'red');
  return;
  }
  if (stats.energy < costEnergy) {
    LogAdd(`정기의 고갈로 인해 '${name.replace(/<br\s*\/?>/gi, ' ')}' 을(를) 펼칠 수 없으니, 심신을 단련하여 정기를 회복하라.`, 'lightblue');
  return;
  }
  
  // 실패 확률 처리
  if (Math.random() < failRate) {
    LogAdd(`⚠️ '${name.replace(/<br\s*\/?>/gi, ' ')}' 의 수련이 뜻밖의 고비에 부딪혀 무너지고 말았노라!`, 'orange');
    // 부상 처리
    if (Math.random() < injuryRate) {
      const injuryDamage = Math.floor(costHealth * 0.5) || 5; // 부상 체력 감소량, 최소 5
      stats.health = Math.max(stats.health - injuryDamage, 0);
      LogAdd(`❗ 기혈이 상하여 육체에 상처를 입었으니, 🩸 ${injuryDamage} 만큼 기운이 빠져나갔도다.`, 'red');
      stats.Life -= 1;
      LogAdd(`❗ 이로 인해 수명 또한 1년 줄어들었음을 경고하노라.`, 'red');
      LifeChk();
    }
    
    const randomDays = Math.floor(Math.random() * (MaxDay - MinDay + 1)) + MinDay;
    AddDay(randomDays*2);
    LogAdd(`수련의 길에 ${randomDays*2}일의 세월이 덧없이 흘러갔도다.`, 'yellow');

    

    MaxCal();
    // 체력 및 내력 계산
    stats.health = stats.health - costHealth;
    stats.energy = stats.energy - costEnergy;
    updateUI();
    return;  // 실패 시 스탯 상승 등은 없음
  }
  if (Math.random() < (failRate/2)) {
    Gold += realms[stats.Realm].Pay;
    LogAdd(`수련 도중 운좋게 금전 ${realms[stats.Realm].Pay.toLocaleString()}냥을 얻는 행운을 가졌다.`,'gold');
  }
  // 기존 체력, 내력 변경 코드 수정
  const prevHealth = stats.health;
  const prevEnergy = stats.energy;

  const sb = stats.lineage.statBonus;
  if (deltaSTR > 0) stats.STR += deltaSTR * sb.STR; else stats.STR += deltaSTR;
  if (deltaAGI > 0) stats.AGI += deltaAGI * sb.AGI; else stats.AGI += deltaAGI;
  if (deltaCHI > 0) stats.CHI += deltaCHI * sb.CHI; else stats.CHI += deltaCHI;
  if (deltaSEN > 0) stats.SEN += deltaSEN * sb.SEN; else stats.SEN += deltaSEN;
  if (deltaWIL > 0) stats.WIL += deltaWIL * sb.WIL; else stats.WIL += deltaWIL;
  if (deltaITG > 0) stats.ITG += deltaITG * sb.ITG; else stats.ITG += deltaITG;
  if (deltaDEF > 0) stats.DEF += deltaDEF * sb.DEF; else stats.DEF += deltaDEF;
  if (deltaVIT > 0) stats.VIT += deltaVIT * sb.VIT; else stats.VIT += deltaVIT;
  

  MaxCal();
  let HealHp = recovHealth > 0 
    ? recovHealth + Math.floor(stats.DEF * 0.1) + Math.floor(stats.AGI * 0.05) 
    : recovHealth;

  let HealMp = recovEnergy > 0 
    ? recovEnergy + Math.floor(stats.SEN * 0.05) + Math.floor(stats.AGI * 0.025) 
    : recovEnergy;


  // 체력 및 내력 계산
  stats.health = Math.min(stats.health - costHealth + HealHp, MaxHealth);
  stats.energy = Math.min(stats.energy - costEnergy + HealMp, MaxEnergy);

  stats.fame += gainFame;
  


  // 로그 출력
  LogAdd('a','black');
  LogAdd('a','black');
  LogAdd(`'${name.replace(/<br\s*\/?>/gi, ' ')}' 의 수련을 무사히 마치었노라.`, 'lime');

  const randomDays = Math.floor(Math.random() * (MaxDay - MinDay + 1)) + MinDay;
  AddDay(randomDays);
  LogAdd(`수련의 길에 ${randomDays}일의 세월이 흘러갔도다.`, 'lightgray');

  // 체력 변화 로그
  const healthChange = stats.health - prevHealth;
  let ChangeHP = ``;
  if (healthChange !== 0) {
    ChangeHP = `🩸${healthChange > 0 ? '+' : ''}${healthChange}`;
  }

  // 내력(에너지) 변화 로그
  const energyChange = stats.energy - prevEnergy;
  let ChangeMP = ``;
  if (energyChange !== 0) {
    ChangeMP = `💙${energyChange > 0 ? '+' : ''}${energyChange}`;
  }
  LogAdd(`${ChangeHP} ${ChangeMP}`,'orange');

  // if (gainExp !== 0) {
  //   LogAdd(`경험치 ${gainExp > 0 ? '+' : ''}${gainExp}`, gainExp > 0 ? 'lime' : 'orange');
  // }
  if (gainFame !== 0) {
    LogAdd(`명성 ${gainFame > 0 ? '+' : ''}${gainFame}`, gainFame > 0 ? 'lime' : 'orange');
  }
  const statNames = ["STR", "AGI", "CHI", "SEN", "WIL", "ITG", "DEF", "VIT"];
  const deltas = [deltaSTR, deltaAGI, deltaCHI, deltaSEN, deltaWIL, deltaITG, deltaDEF, deltaVIT];
  // const sb = stats.lineage.statBonus;
  
  statNames.forEach((stat, i) => {
    const baseChange = deltas[i];
    if (baseChange !== 0) {
      // 보너스 곱하기, 플러스일 때만
      const finalChange = baseChange > 0 ? baseChange * sb[stat] : baseChange;
      
      // 실제 스텟에 적용
      stats[stat] += finalChange;
  
      // 로그 출력: 보너스 적용된 값 출력
      LogAdd(`${statLabels[stat]} ${finalChange > 0 ? '+' : ''}${finalChange.toFixed(1)}`, finalChange > 0 ? 'lime' : 'orange');
    }
  });
  

  updateUI();
  saveGame();
}

function MaxCal() {
  MaxHealth = 100 
  + Math.floor(stats.VIT * 1.5) 
  + Math.floor(stats.STR * 0.5)
  + Math.floor(stats.ITG * 0.4);
  MaxEnergy = 50 
  + Math.floor(stats.WIL * 1)
  + Math.floor(stats.CHI * 0.25) 
  + Math.floor(stats.ITG * 0.2);
}

let currentPage = 1;
const pageSize = 4;
const popup = document.getElementById('inventoryPopup');
const btn = document.getElementById('ballBtn');
const popup3 = document.getElementById('inventoryPopup3');
const btn3 = document.getElementById('GuideBtn');
actionBtn.addEventListener("click", () => {
  // 아이템 팝업 열려 있으면 닫기
  if (!popup.classList.contains('hidden')) {
    popup.classList.add('hidden');
  }
  if (!popup3.classList.contains('hidden')) {
    popup3.classList.add('hidden');
  }
  if (actionsPanel.classList.contains("open-right")) {
    closeActionsPanel();
  } else {
    currentPage = 1;
    openActionsPanel();
  }
});
btn.addEventListener('click', () => {
  // 액션 패널 열려 있으면 닫기
  if (actionsPanel.classList.contains('open-right')) {
    closeActionsPanel();
  }
  if (!popup3.classList.contains('hidden')) {
    popup3.classList.add('hidden');
  }
  // 아이템 팝업 토글
  popup.classList.toggle('hidden');
});
btn3.addEventListener('click', () => {
  // 액션 패널 열려 있으면 닫기
  if (actionsPanel.classList.contains('open-right')) {
    closeActionsPanel();
  }
  if (!popup.classList.contains('hidden')) {
    popup.classList.add('hidden');
  }
  popup3.classList.toggle('hidden');
});


function openActionsPanel() {
  actionsPanel.classList.add("open-right");
  actionsPanel.classList.remove("close-right");

  actionList.innerHTML = "";

  const totalPages = Math.ceil(actionData.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  // 현재 페이지에 해당하는 행동만 렌더링
  
// [행동명, 소모체력, 소모내력, 회복체력, 회복내력, 경험치증가량, 명성증가량,
//   STR, AGI, CHI, SEN, WIL, ITG, DEF, VIT,
//   최소경지인덱스, 최대경지인덱스, 허용문파배열]
// 기존 필드 뒤에 failRate, injuryRate 추가
  const currentActions = actionData.slice(start, end);
  currentActions.forEach(([
    name, MinDay, MaxDay, costHealth, costEnergy, recovHealth, recovEnergy,gainFame,
    deltaSTR, deltaAGI, deltaCHI, deltaSEN, deltaWIL, deltaITG, deltaDEF, deltaVIT,
    minRealm, maxRealm, allowedSects
  ], idx) => {
    // 체력 표시 (회복이 있으면 +, 없으면 소모 -, 0이면 빈 문자열)
    let healthText = "";
    if (recovHealth > 0) healthText = `🩸+${recovHealth.toLocaleString()}`;
    else if (costHealth > 0) healthText = `🩸-${costHealth.toLocaleString()}`;
  
    // 내공 표시 (회복이 있으면 +, 없으면 소모 -, 0이면 빈 문자열)
    let energyText = "";
    if (recovEnergy > 0) energyText = `💙+${recovEnergy.toLocaleString()}`;
    else if (costEnergy > 0) energyText = `💙-${costEnergy.toLocaleString()}`;

    let sectText = "";
    if (allowedSects.length > 0) {
      sectText = `<br>[${allowedSects.join(", ")}]`;
    }
    
    // 경지 조건 체크
    let RealmChk = "";
    if (stats.Realm < minRealm) {
      RealmChk = `<br>${realms[minRealm].name} 이상`;
    }
    if (stats.Realm > maxRealm) {
      RealmChk = `<br>${realms[maxRealm].name} 이하`;
    }
    const btn = document.createElement("button");
    // btn.innerHTML = `${name}<br>${healthText} ${energyText}${sectText}`;
    let displayName = name.includes('<br>') ? name : name + '<br>';
    btn.innerHTML = `${displayName}<br>${healthText} ${energyText}${sectText}${RealmChk}`;

    btn.classList.add("action-button");
    btn.style.margin = "5px";
    btn.style.fontSize = "16px";
    btn.onclick = () => {
      doAction(start + idx);  // 실제 인덱스로 doAction 호출
      // closeActionsPanel();
    };
    actionList.appendChild(btn);
  });

  // 페이지네이션 버튼 생성
  const paginationDiv = document.createElement("div");
  paginationDiv.style.marginTop = "10px";
  paginationDiv.style.textAlign = "center";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "←";
  prevBtn.className = "pagination-button";
  // prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      openActionsPanel();
    } else {
      currentPage = totalPages;
      openActionsPanel();
    }
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "→";
  nextBtn.className = "pagination-button";
  // nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      openActionsPanel();
    } else {
      currentPage = 1;
      openActionsPanel();
    }
  };

  const pageInfo = document.createElement("span");
  pageInfo.textContent = ` ${currentPage} / ${totalPages}`;
  pageInfo.style.margin = "0 5px";
  pageInfo.className = "pagination-page-info";
  pageInfo.style.color = "brown";  // 무협풍 색상으로

  paginationDiv.appendChild(prevBtn);
  paginationDiv.appendChild(pageInfo);
  paginationDiv.appendChild(nextBtn);

  // actionList.appendChild(paginationDiv);
  actionList.insertBefore(paginationDiv, actionList.firstChild);
}

function closeActionsPanel() {
  actionsPanel.classList.remove("open-right");
  actionsPanel.classList.add("close-right");
  actionList.innerHTML = "";
}


// 스텟 패널 토글
statsBtn.addEventListener("click", () => {
  if (statsPanel.classList.contains("open-left")) {
    closeStatsPanel();
  } else {
    openStatsPanel();
  }
});

function openStatsPanel() {
  statsPanel.classList.add("open-left");
  statsPanel.classList.remove("close-left");
  updateUI();
}

function closeStatsPanel() {
  statsPanel.classList.remove("open-left");
  statsPanel.classList.add("close-left");
}

// 경지 도달 체크
function checkRealmUpgrade() {
  const nextRealm = realms[stats.Realm + 1];
  if (!nextRealm) return;

  // 메인 8개 스텟 합산
  const totalStats =
    stats.STR +
    stats.AGI +
    stats.CHI +
    stats.SEN +
    stats.WIL +
    stats.ITG +
    stats.DEF +
    stats.VIT;
    
  MaxCal();
  const minStatRequirement = nextRealm.required.totalStats * 0.05;
  // 각 스탯이 최소 요구치를 만족하는지 확인
  const statList = [stats.STR, stats.AGI, stats.CHI, stats.SEN, stats.WIL, stats.ITG, stats.DEF, stats.VIT];
  const hasBelowMinimum = statList.some(stat => stat < minStatRequirement);


  if (
    MaxHealth >= nextRealm.required.health &&
    MaxEnergy >= nextRealm.required.energy &&
    totalStats >= nextRealm.required.totalStats &&
    !hasBelowMinimum
  ) {
    stats.Realm += 1;
    
    // 0~7 중 랜덤 인덱스 4개 뽑아서 중복 가능하게 지급
    let Cnt = 4+stats.Realm;
    let Max = 7;
    let Min = 0;
    if (stats.Realm >= 4) {
      Max = 15;
      Min = 0;
    } else if (stats.Realm >= 8) {
      Max = 19;
      Min = 8;
    }
    for (let i = 0; i < Cnt; i++) {
      const randIdx = Math.floor(Math.random() * (Max - Min + 1)) + Min;
      DanItem[randIdx].Cnt += 1;  // 중복 가능하니 += 1
    }

    LogAdd("💫━━━━━━━━━━━━━━━━━━━━━━━💫", "cyan");
    LogAdd("🌟🌟🌟 새로운 경지에 도달하였도다! 🌟🌟🌟", "cyan");
    LogAdd(`▶ [${nextRealm.name}]`, "cyan");
    LogAdd("💫━━━━━━━━━━━━━━━━━━━━━━━💫", "cyan");

    updateUI();
  }
}
document.getElementById("realm").addEventListener("click", function () {
  const nextRealm = realms[stats.Realm + 1];
  if (!nextRealm) {
    LogAdd("⚠️ 이미 최종 경지에 도달하였구나", "cyan");
    return;
  }

  const totalStats =
    stats.STR +
    stats.AGI +
    stats.CHI +
    stats.SEN +
    stats.WIL +
    stats.ITG +
    stats.DEF +
    stats.VIT;
    
  MaxCal();
  
  const minStatRequirement = nextRealm.required.totalStats * 0.05;

  // 스탯 키 배열
  const statKeys = ["STR", "AGI", "CHI", "SEN", "WIL", "ITG", "DEF", "VIT"];

  // 미달 / 충족 스탯 분류
  const belowStats = statKeys
    .filter(key => stats[key] < minStatRequirement)
    .map(key => `${statLabels[key]}`);

  const metStats = statKeys
    .filter(key => stats[key] >= minStatRequirement)
    .map(key => `${statLabels[key]}`);

    const currentStatsMessage = `🔍 다음 경지 [${nextRealm.name}] 조건은 아래와 같도다 :
최대🩸: ${MaxHealth.toLocaleString()} / ${nextRealm.required.health.toLocaleString()}
최대💙: ${MaxEnergy.toLocaleString()} / ${nextRealm.required.energy.toLocaleString()}
능력📊 총합: ${totalStats.toLocaleString()} / ${nextRealm.required.totalStats.toLocaleString()}
🧩 각 스탯 최소 요구치: ${Math.floor(minStatRequirement).toLocaleString()} 이상

✅ 충족된 스탯: ${metStats.join(", ")}
❌ 미달된 스탯: ${belowStats.length > 0 ? belowStats.join(", ") : "없음"}`;
  
    LogAdd(currentStatsMessage, "cyan");
});
document.getElementById("fame").addEventListener("click", function () {
  if (stats.fame <= 0) {
    LogAdd(`그대는 강호에 이름조차 없는 미명의 인물이라 하겠다.`, "lime");
} else if (stats.fame <= 100) {
    LogAdd(`근래 강호의 시정잡배 사이에서 그대의 이름이 조금씩 오르내리기 시작하였도다.`, "lime");
} else if (stats.fame <= 300) {
    LogAdd(`몇몇 무림인들이 그대의 존재를 기억하기 시작했으니, 강호의 변두리에 작은 물결이 이는구나.`, "lime");
} else if (stats.fame <= 600) {
    LogAdd(`이제 그대의 이름은 강호의 여러 객잔과 무관에서 자주 오르내리는구나. 낯선 이가 먼저 그대를 알아보기도 하도다.`, "lime");
} else if (stats.fame <= 1000) {
    LogAdd(`그대의 명성은 사방으로 퍼져, 강호의 자잘한 무리들조차 경외의 눈빛으로 그대를 바라보는구나.`, "lime");
} else if (stats.fame <= 5000) {
    LogAdd(`강호의 이름 있는 문파들조차 그대의 행보를 주시하며, 일부는 은밀히 동맹을 타진하고자 하도다.`, "lime");
} else if (stats.fame <= 20000) {
    LogAdd(`이제 그대의 이름은 강호 전역에 울려 퍼지며, 무림의 질서마저 흔들 수 있는 존재로 여겨지고 있도다.`, "lime");
} else if (stats.fame <= 50000) {
    LogAdd(`그대의 무공과 행적은 전설처럼 회자되며, 수많은 이들이 그 이름 석 자를 마음속에 새기고 따르려 하도다.`, "lime");
} else if (stats.fame <= 200000) {
    LogAdd(`세상의 이목이 모두 그대에게로 쏠리니, 강호의 흐름마저 그대의 발걸음에 따라 바뀌는 듯하도다.`, "lime");
} else {
    LogAdd(`그대는 이제 강호의 이치조차 벗어난 존재. 속세의 법도와 이름으로는 더 이상 그대를 규정할 수 없도다.`, "lime");
}



});
document.getElementById("blood").addEventListener("click", function () {
  LogAdd(`그대는 ${stats.lineage.nameKor} 혈통이로다.`, "skyblue");
  LogAdd(`${stats.lineage.traits}`,'orange');
  LogAdd(`${stats.lineage.description}`,'yellow');
  MaxBonusStat();
});
document.getElementById("age").addEventListener("click", function () {
  LogAdd(`그대가 이 땅에 첫 숨을 튼 지, 어느덧 ${stats.Age}년의 세월이 흘렀도다.`, "lightgreen");
  LogAdd(`생과 사의 경계 너머, 명부에 이름이 오르기까지 남은 날은 ${stats.Life - stats.Age}년에 불과하도다.`, "red");
});
document.getElementById("STR").addEventListener("click", function () {
  LogAdd(`그대의 기골은 단단하니, 근력 수치가 ${stats.STR.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`기운이 맥을 타고 흐르며, 근력 한 점마다 체혈이 0.5씩 더해지니 총 ${(stats.STR * 0.5).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`주먹에 실린 무게 또한 달라지니, 근력 한 점마다 타격이 2.0씩 더해져 총 ${(stats.STR * 2).toLocaleString(1)}이 되었도다.`, "skyblue");
});
document.getElementById("AGI").addEventListener("click", function () {
  LogAdd(`그대의 보법은 가벼워, 신법 수치가 ${stats.AGI.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`기혈의 흐름이 날렵해져, 신법 한 점마다 체혈 회복이 0.05씩 더해지니 총 ${(stats.AGI * 0.05).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`심호흡 또한 고르게 되니, 신법 한 점마다 내공 회복이 0.025씩 늘어나 총 ${(stats.AGI * 0.025).toLocaleString(1)}이 되었도다.`, "skyblue");
});
document.getElementById("CHI").addEventListener("click", function () {
  LogAdd(`그대의 단전은 깊고도 넓어, 내력 수치가 ${stats.CHI.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`숨결마다 내공이 쌓이니, 내력 한 점마다 내공이 0.25씩 더해져 총 ${(stats.CHI * 0.25).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`기운을 품은 손끝엔 위력이 실려, 내력 한 점마다 타격이 0.5씩 늘어나 총 ${(stats.CHI * 0.5).toLocaleString(1)}이 되었도다.`, "skyblue");
});
document.getElementById("SEN").addEventListener("click", function () {
  LogAdd(`그대의 육감은 예리하니, 기감 수치가 ${stats.SEN.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`기운의 미세한 떨림조차 감지하니, 기감 한 점마다 내공 회복이 0.05씩 더해져 총 ${(stats.SEN * 0.05).toLocaleString(1)}이라.`, "skyblue");
});
document.getElementById("WIL").addEventListener("click", function () {
  LogAdd(`그대의 뜻은 강철과 같고, 심지의 깊이가 ${stats.WIL.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`흔들림 없는 의지가 기의 그릇을 넓히니, 심지 한 점마다 내공이 1.0씩 더해져 총 ${(stats.WIL * 1).toLocaleString(1)}이라.`, "skyblue");
});
document.getElementById("ITG").addEventListener("click", function () {
  LogAdd(`그대는 타고난 총기로 가득하니, 오성 수치가 ${stats.ITG.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`혈맥이 스스로 열리니, 오성 한 점마다 체혈이 0.4씩 늘어나 총 ${(stats.ITG * 0.4).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`기운의 통로 또한 넓어지니, 오성 한 점마다 내공이 0.2씩 더해져 총 ${(stats.ITG * 0.2).toLocaleString(1)}이 되었도다.`, "skyblue");
});
document.getElementById("DEF").addEventListener("click", function () {
  LogAdd(`그대의 살과 뼈는 쇠처럼 단단하여, 외공 수치가 ${stats.DEF.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`몸에 밴 단련이 기혈의 흐름을 안정케 하니, 외공 한 점마다 체혈 회복이 0.1씩 더해져 총 ${(stats.DEF * 0.1).toLocaleString(1)}이라.`, "skyblue");
});
document.getElementById("VIT").addEventListener("click", function () {
  LogAdd(`그대의 경맥은 활짝 열려, 그 흐름이 ${stats.VIT.toLocaleString()}에 이르렀도다.`, "lightgreen");
  LogAdd(`경맥에 기가 넘치면 육신 또한 강건해지니, 경맥 한 점마다 체혈이 1.5씩 더해져 총 ${(stats.VIT * 1.5).toLocaleString(1)}이라.`, "skyblue");
});
document.getElementById("defVal").addEventListener("click", function () {
  LogAdd(`몸에 밴 단련이 기혈의 흐름을 안정케 하니, 외공 한 점마다 체혈 회복이 0.1씩 더해져 총 ${(stats.DEF * 0.1).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`기혈의 흐름이 날렵해져, 신법 한 점마다 체혈 회복이 0.05씩 더해지니 총 ${(stats.AGI * 0.05).toLocaleString(1)}이라.`, "skyblue");
});
document.getElementById("vitVal").addEventListener("click", function () {
  LogAdd(`기운의 미세한 떨림조차 감지하니, 기감 한 점마다 내력 회복이 0.05씩 더해져 총 ${(stats.SEN * 0.05).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`심호흡 또한 고르게 되니, 신법 한 점마다 내공 회복이 0.025씩 늘어나 총 ${(stats.AGI * 0.025).toLocaleString(1)}이 되었도다.`, "skyblue");
});
document.getElementById("health").addEventListener("click", function () {
  LogAdd(`경맥에 기가 넘치면 육신 또한 강건해지니, 경맥 한 점마다 체혈이 1.5씩 더해져 총 ${(stats.VIT * 1.5).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`기운이 맥을 타고 흐르며, 근력 한 점마다 체혈이 0.5씩 더해지니 총 ${(stats.STR * 0.5).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`혈맥이 스스로 열리니, 오성 한 점마다 체혈이 0.4씩 늘어나 총 ${(stats.ITG * 0.4).toLocaleString(1)}이라.`, "skyblue");
});
document.getElementById("energy").addEventListener("click", function () {
  LogAdd(`흔들림 없는 의지가 기의 그릇을 넓히니, 심지 한 점마다 내공이 1.0씩 더해져 총 ${(stats.WIL * 1).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`숨결마다 내공이 쌓이니, 내력 한 점마다 내공이 0.25씩 더해져 총 ${(stats.CHI * 0.25).toLocaleString(1)}이라.`, "skyblue");
  LogAdd(`기운의 통로 또한 넓어지니, 오성 한 점마다 내공이 0.2씩 더해져 총 ${(stats.ITG * 0.2).toLocaleString(1)}이 되었도다.`, "skyblue");
});


function checkSectEligibility() {
  if (stats.sect) return; // 이미 문파 있음

  sects.forEach((sect, idx) => {
    const isEligible = Object.entries(sect.statRequirements).every(([key, value]) => stats[key] >= value);
    if (isEligible) {
      // 문파 입문 조건 설명 추가
      const requirements = Object.entries(sect.statRequirements)
      .map(([stat, value]) => `${statLabels[stat]} ${value} 이상`)
      .join(", ");

      LogAdd(`🔔 '${sect.name}' 문파에 입문할 수 있노라. (${requirements})`, "aqua");

      // addSectJoinButton(sect.name);
    }
  });
}
function createSectPopup() {
  const popup = document.createElement("div");
  popup.id = "sectPopup";
  popup.className = "popup";

  const title = document.createElement("h2");
  title.textContent = "입문 가능한 문파";
  popup.appendChild(title);

  const container = document.createElement("div");
  container.className = "sectContainer";

  sects.forEach(sect => {
    const canJoin = Object.entries(sect.statRequirements).every(
      ([stat, val]) => (stats[stat] || 0) >= val
    );

    if (stats.sect || !canJoin) return;

    const btn = document.createElement("button");
    btn.className = "sectOptionBtn";
    btn.innerHTML = `
      <strong>${sect.name}</strong><br>
      <small>${sect.description}</small><br>
      필요 스탯: ${Object.entries(sect.statRequirements)
        .map(([k, v]) => `${statLabels[k]} ${v}`)
        .join(", ")}
    `;

    btn.onclick = () => {
      stats.sect = sect.name;
      LogAdd(`🎉 '${sect.name}' 문파에 입문하였도다!`, "lime");
      updateUI();
      saveGame();
      document.body.removeChild(popup);
    };

    container.appendChild(btn);
  });

  if (!container.children.length) {
    const noOption = document.createElement("p");
    noOption.textContent = "입문 가능한 문파가 없구나";
    container.appendChild(noOption);
  }

  popup.appendChild(container);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "닫기";
  closeBtn.onclick = () => document.body.removeChild(popup);
  popup.appendChild(closeBtn);

  document.body.appendChild(popup);
}
document.getElementById("sect").addEventListener("click", () => {
  createSectPopup();
});


// function addSectJoinButton(sectName) {
//   const actionList = document.getElementById("actionList");

//   // 이미 버튼이 있으면 리턴
//   if (document.getElementById(`joinSectBtn_${sectName}`)) return;

//   const btn = document.createElement("button");
//   btn.id = `joinSectBtn_${sectName}`;
//   btn.innerHTML = `${sectName}<br>문파 입문`;
//   btn.classList.add("action-button");  // 여기에 클래스를 추가
//   btn.style.margin = "5px";
//   btn.onclick = () => {
//     stats.sect = sectName;
//     LogAdd(`🎉 '${sectName}' 문파에 입문했습니다!`, "lime");
//     updateUI();
//     clearSectJoinButtons();
//     saveGame();
//   };

//   actionList.appendChild(btn);
// }

function clearSectJoinButtons() {
  const actionList = document.getElementById("actionList");
  const buttons = actionList.querySelectorAll("button[id^='joinSectBtn_']");
  buttons.forEach(btn => btn.remove());
}






// UI 갱신
function updateUI() {
  checkRealmUpgrade();
  checkSectEligibility(); // ← 문파 조건 확인 추가
  // 기본 스텟
  
  MaxCal();

  document.getElementById("health").textContent = `${stats.health}/${MaxHealth}`;
  document.getElementById("energy").textContent = `${stats.energy}/${MaxEnergy}`;
  document.getElementById("blood").textContent = stats.lineage?.nameKor ?? "";
  document.getElementById("fame").textContent = stats.fame.toLocaleString();
  document.getElementById("realm").textContent = realms[stats.Realm].name;
  document.getElementById("sect").textContent = stats.sect ? stats.sect : "소속 문파 없음";
  document.getElementById("age").textContent = `${stats.Age}/${stats.Life}`;
  document.getElementById("Gold").textContent = `${Gold.toLocaleString()}냥`;


  const totalStats =
    stats.STR +
    stats.AGI +
    stats.CHI +
    stats.SEN +
    stats.WIL +
    stats.ITG +
    stats.DEF +
    stats.VIT;

  // 메인 스텟
  document.getElementById("STR").textContent = Number(stats.STR.toFixed(1)).toLocaleString();
  document.getElementById("AGI").textContent = Number(stats.AGI.toFixed(1)).toLocaleString();
  document.getElementById("CHI").textContent = Number(stats.CHI.toFixed(1)).toLocaleString();
  document.getElementById("SEN").textContent = Number(stats.SEN.toFixed(1)).toLocaleString();
  document.getElementById("WIL").textContent = Number(stats.WIL.toFixed(1)).toLocaleString();
  document.getElementById("ITG").textContent = Number(stats.ITG.toFixed(1)).toLocaleString();
  document.getElementById("DEF").textContent = Number(stats.DEF.toFixed(1)).toLocaleString();
  document.getElementById("VIT").textContent = Number(stats.VIT.toFixed(1)).toLocaleString();
  document.getElementById("All").textContent = Number(totalStats.toFixed(1)).toLocaleString();


  

  // 능력치 계산 (임의 예시)
  const physAtk = (stats.STR * 2) + (stats.CHI * 0.25);

  const defVal = (stats.DEF * 0.1) + (stats.AGI * 0.05);
  const vitVal = (stats.SEN * 0.05) + (stats.AGI * 0.025);

  document.getElementById("physAtk").textContent = physAtk.toFixed(1);
  document.getElementById("defVal").textContent = defVal.toFixed(1);
  document.getElementById("vitVal").textContent = vitVal.toFixed(1);

  const healthRatio = Math.max(0, Math.min(stats.health / MaxHealth, 1));
  const energyRatio = Math.max(0, Math.min(stats.energy / MaxEnergy, 1));

  document.getElementById("healthBar").style.width = `${healthRatio * 100}%`;
  document.getElementById("energyBar").style.width = `${energyRatio * 100}%`;

  updateDisplay();
  renderInventory(statItems, DanItem);
  renderInventory3();
}

  
  

let lastLogText = '';

function LogAdd(text, color = 'white') {
  const logContainer = document.getElementById('log-container');

  const logEntry = document.createElement('div');
  logEntry.textContent = text;
  logEntry.style.color = color;

  logContainer.appendChild(logEntry);

  // 로그 50개 초과 시 제거
  while (logContainer.children.length > 50) {
    logContainer.removeChild(logContainer.firstChild);
  }

  // 스크롤 맨 아래로 이동
  logContainer.scrollTop = logContainer.scrollHeight;

  lastLogText = text;
}




let currentSaveSlot = null;  // 선택한 저장 슬롯 번호 (1~9)

function getSaveData(slot) {
  const saved = localStorage.getItem(`myGameSave_slot${slot}`);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function createLoadPopup() {
  const existing = document.getElementById("loadPopup");
  if (existing) existing.remove(); // 기존 팝업 제거
  // 팝업 엘리먼트 생성
  const popup = document.createElement("div");
  popup.id = "loadPopup";

  // 제목
  const title = document.createElement("h2");
  title.textContent = "📜무림에 남겨진 족적📜";
  popup.appendChild(title);

  // 슬롯 컨테이너
  const slotContainer = document.createElement("div");
  slotContainer.id = "saveSlots";

  for (let i = 1; i <= 9; i++) {
    const data = getSaveData(i);
    const btn = document.createElement("button");
    btn.className = "saveSlotBtn";
    btn.dataset.slot = i;

    let content = `<div class="slotTitle">제${i}세계</div>`;
    MaxCal();
    if (data) {
      const { stats, sect,Gold } = data;
      // 총 스텟 합 계산
      const totalStats = (stats.STR || 0) + (stats.AGI || 0) + (stats.CHI || 0) + (stats.SEN || 0) +
                         (stats.WIL || 0) + (stats.ITG || 0) + (stats.DEF || 0) + (stats.VIT || 0);
      content += `<div class="slotInfo">
                    🩸${stats.health.toLocaleString()} / ${MaxHealth.toLocaleString()}<br>
                    💙${stats.energy.toLocaleString()} / ${MaxEnergy.toLocaleString()}<br>
                    🏅${stats.fame} / 💰${Gold}냥 / 🧬${stats.lineage.nameKor}<br>
                    🧘${realms[stats.Realm]?.name} / 🏯${sect || "소속 문파 없음"}<br>
                    ⏳${stats.Age} / ${stats.Life} / 📊${Number(totalStats.toFixed(1)).toLocaleString()}<br>
                    ${customDate.year}년 ${customDate.month}월 ${customDate.day}일
                  </div>`;
                  // 삭제 버튼 추가 (data-slot-index 속성에 슬롯 인덱스 저장)
                  content += `<button class="deleteSlotBtn" data-slot-index="${i}">기록 삭제</button>`;
      } else {
        if (i === 1) content += `<div class="slotInfo" style="color:lightgreen;">이 땅에 아직 없는 이야기를 새겨넣으려 하노라.</div>`;
        if (i === 2) content += `<div class="slotInfo" style="color:lightgreen;">운명의 붓을 들어 새로운 전설을 쓰려 하노라.</div>`;
        if (i === 3) content += `<div class="slotInfo" style="color:lightgreen;">역사의 바람결에 그대의 자취를 새기려 하노라.</div>`;
        if (i === 4) content += `<div class="slotInfo" style="color:lightgreen;">미지의 서사시를 펼치려 마음 먹었노라.</div>`;
        if (i === 5) content += `<div class="slotInfo" style="color:lightgreen;">아직 밝혀지지 않은 길에 첫 발을 내딛으려 하노라.</div>`;
        if (i === 6) content += `<div class="slotInfo" style="color:lightgreen;">전설의 씨앗을 땅에 심으려 하노라.</div>`;
        if (i === 7) content += `<div class="slotInfo" style="color:lightgreen;">새벽 안개 속에서 새로운 이야기가 태동하리라.</div>`;
        if (i === 8) content += `<div class="slotInfo" style="color:lightgreen;">운명의 바람 속에 그대 이름이 울려 퍼지리라.</div>`;
        if (i === 9) content += `<div class="slotInfo" style="color:lightgreen;">미래의 서막이 이곳에서 막 열리려 하노라.</div>`;
    }
    

    btn.innerHTML = content;

    btn.onclick = () => {
      loadGame(i);
      currentSaveSlot = i;
      document.body.removeChild(popup);
    };

    slotContainer.appendChild(btn);
  }

  popup.appendChild(slotContainer);
  document.body.appendChild(popup);
  attachDeleteSlotHandlers();
}
// 슬롯 목록 출력 후에 호출
function attachDeleteSlotHandlers() {
  const deleteButtons = document.querySelectorAll(".deleteSlotBtn");
  deleteButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const slotIndex = e.target.getAttribute("data-slot-index");
      if (confirm(`제${parseInt(slotIndex)}세계에 새겨진 그대의 기억을 어둠 속에 영원히 가두리라.`)) {
        localStorage.removeItem(`myGameSave_slot${slotIndex}`);
        if (currentSaveSlot == slotIndex) {
          currentSaveSlot = null;  // 현재 슬롯 삭제 시 초기화
        }
        createLoadPopup(); // 팝업 다시 렌더링 (슬롯 갱신)
      }
    });
  });
}

const economicTiers = [
  {
    title: "거렁뱅이",
    description: "검은 칼집뿐, 등짐 속엔 바람만 들었다. 강호의 쓴맛을 배우는 자.",
    goldRange: [1, 9]
  },
  {
    title: "나그네 무사",
    description: "지나는 주막마다 얼굴을 알리진 못해도, 전전한 노련함이 묻어나는 신입.",
    goldRange: [10, 49]
  },
  {
    title: "촌문파 제자",
    description: "작은 문파에서 수련을 시작한 입문자, 사부님이 쥐여준 짐짝 속엔 쓸만한 은전이 몇 닢.",
    goldRange: [50, 99]
  },
  {
    title: "객잔 단골",
    description: "무림 초출이나, 어디선가 행운을 얻었는지 동전은 제법 넉넉하다.",
    goldRange: [100, 199]
  },
  {
    title: "남궁세가 막내아들",
    description: "고운 옷자락에 먼지 한 톨 없으나, 검은 아직 무겁다. 금전만 넉넉한 풋내기.",
    goldRange: [200, 499]
  }
];
function getRandomTier(tiers) {
  const index = Math.floor(Math.random() * tiers.length);
  return tiers[index];
}
// 골드 범위 내 무작위 설정
function getRandomGold(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 캐릭터 경제력 초기화 (항상 입문자)
function initializeCharacterEconomy() {
  const tier = getRandomTier(economicTiers);
  Gold += getRandomGold(tier.goldRange[0], tier.goldRange[1]);
  LogAdd(`태생: ${tier.title}`,'skyblue');
  LogAdd(`${tier.description}`,'lightgray');
  LogAdd(`💰 소지 금화: ${Gold}냥`,'gold');
}


// 로드,불러오기,Load,load
function loadGame(slot) {
  const data = getSaveData(slot);
  if (data) {
    stats = data.stats;
    Gold = data.Gold;
    DanItem = data.DanItem;
    customDate.year = data.customDate.year;
    customDate.month = data.customDate.month;
    customDate.day = data.customDate.day;

    if ('sect' in data) {
      stats.sect = data.sect;
    }
    LogAdd(`제${slot}세계에 감춰진 그대의 발자취를 찾아냈도다.`, "aqua");
    document.getElementById("topButtons").style.display = "flex";
  } else {
    ResetCode(slot);
  }
  updateUI();
}
// 리셋, 초기화
function ResetCode(slot) {
  stats = {
    health: 100,
    energy: 50,
    STR: 0,
    AGI: 0,
    CHI: 0,
    SEN: 0,
    WIL: 0,
    ITG: 0,
    DEF: 0,
    VIT: 0,
    sect: null,
    lineage: null,
    fame: 0,
    Realm: 0,
    Age: 20,
    Life: 40
    // 기타 초기값
  };
  Gold = 0;
  const selectedBloodlines = getRandomBloodlines(5);

  // 아이템 카운트 초기화 (0으로 리셋)
  DanItem.forEach(item => item.Cnt = 0);

  // 0~7 중 랜덤 인덱스 4개 뽑아서 중복 가능하게 지급
  for (let i = 0; i < 4; i++) {
    const randIdx = Math.floor(Math.random() * 8); // 0~7
    DanItem[randIdx].Cnt += 1;  // 중복 가능하니 += 1
  }
  
  showLineageSelection(selectedBloodlines);
  LogAdd("모든것이 태초로 회귀하는도다.", "red");
}

// 저장, 세이브, save, SAVE, Save
function saveGame(slot) {
  if (!slot) slot = currentSaveSlot;
  if (!slot) {
    LogAdd("아직 기운을 새길 곳을 정하지 못했구나.", "red");
    return;
  }

  const saveData = {
    stats,
    customDate,
    DanItem,
    Gold,
    sect: stats.sect || null,
  };

  localStorage.setItem(`myGameSave_slot${slot}`, JSON.stringify(saveData));
  LogAdd(`제${slot}세계에 그대의 혼과 기운이 새겨졌도다.`, "gray");
}

// 페이지 로드 시 팝업 생성
window.addEventListener("load", () => {
  createLoadPopup();
  closeStatsPanel();
  closeActionsPanel();
  updateUI();
});

function showLineageSelection(options) {
  const container = document.getElementById("lineage-options");
  container.innerHTML = "";

  options.forEach(bloodline => {
    const btn = document.createElement("button");
    btn.textContent = `${bloodline.nameHan}`;
    // btn.textContent = `${bloodline.nameKor}(${bloodline.nameHan})`;
    btn.onclick = (e) => selectLineage(bloodline, e.target);
    container.appendChild(btn); // 생성할 때는 appendChild 유지해도 됨
  });

  document.getElementById("lineage-selection").style.display = "block";
}


function selectLineage(bloodline, btn) {
  const container = document.getElementById("lineage-options");
  container.insertBefore(btn, container.firstChild); // 버튼을 앞으로 보냄
  stats.lineage = bloodline; // <- 전체 객체 저장!

  const adjustment = bloodline.statAdjust;
  for (let key in adjustment) {
    if (stats[key] !== undefined) {
      stats[key] += adjustment[key];
    }
  }

  document.getElementById("lineage-selection").style.display = "none";
  document.getElementById("topButtons").style.display = "flex";
  LogAdd(`당신은 혈통 ‘${bloodline.nameKor}’의 기운을 이어받았노라.`, "gold");
  // LogAdd(`이름: ${stats.lineage.nameKor}`);
//   LogAdd(`등급: ${stats.lineage.rank}`);
  LogAdd(`${stats.lineage.traits}`,'orange');
  LogAdd(`${stats.lineage.description}`,'yellow');
//   const sb = stats.lineage.statBonus;
// LogAdd(`스텟 보너스:
// 힘(STR): ${sb.STR}
// 민첩(AGI): ${sb.AGI}
// 기혈(CHI): ${sb.CHI}
// 감각(SEN): ${sb.SEN}
// 의지(WIL): ${sb.WIL}
// 통솔(ITG): ${sb.ITG}
// 방어(DEF): ${sb.DEF}
// 체력(VIT): ${sb.VIT}`);
  initializeCharacterEconomy();
  LogAdd(`이제 막 운명의 바람이 불어와 새로운 전설이 싹트기 시작했도다.`, "lime");
  updateStatsDisplay(); // 화면 반영용 함수
  saveGame();
}

function updateStatsDisplay() {
  const statKeys = ["STR", "AGI", "CHI", "SEN", "WIL", "ITG", "DEF", "VIT"];
  statKeys.forEach(key => {
    document.getElementById(key).textContent = stats[key];
  });
}

function getRandomBloodlines(n) {
  const zones = {
    lowest: Array.from({ length: 10 }, (_, i) => i),           // 0~9
    low: Array.from({ length: 10 }, (_, i) => i + 10),         // 10~19
    middle: Array.from({ length: 10 }, (_, i) => i + 20),      // 20~29
    high: Array.from({ length: 10 }, (_, i) => i + 30),        // 30~39
    highest: Array.from({ length: 10 }, (_, i) => i + 40),     // 40~49
  };

  const weights = {
    lowest: 0.5,
    low: 0.4,
    middle: 0.06,
    high: 0.03,
    highest: 0.01,
  };

  const zoneNames = Object.keys(weights);
  const zoneWeights = zoneNames.map(name => weights[name]);

  const cumulativeWeights = [];
  zoneWeights.reduce((acc, w, i) => {
    cumulativeWeights[i] = acc + w;
    return cumulativeWeights[i];
  }, 0);

  function pickZone() {
    const rand = Math.random();
    for (let i = 0; i < cumulativeWeights.length; i++) {
      if (rand < cumulativeWeights[i]) {
        return zoneNames[i];
      }
    }
    return zoneNames[zoneNames.length - 1];
  }

  const selected = new Set();

  while (selected.size < n) {
    const zone = pickZone();
    const zoneArr = zones[zone];
    const chosenIndex = zoneArr[Math.floor(Math.random() * zoneArr.length)];
    selected.add(chosenIndex);
  }

  // 만약 bloodlines 배열이 전역에 선언되어 있다면, 여기서 인덱스로 실제 bloodlines 요소 가져오기
  return Array.from(selected).map(i => bloodlines[i]);
}


let customDate = {
  year: 2025,
  month: 1,
  day: 1,
};

function pad(n) {
  return n.toString().padStart(2, '0');
}

function displayCustomDate() {
  return `${customDate.year}년 ${pad(customDate.month)}월 ${pad(customDate.day)}일`;
}

function updateDisplay() {
  const dateDisplay = document.getElementById('custom-date-display');
  if (dateDisplay) {
    dateDisplay.textContent = displayCustomDate();
  }
}
function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate(); // month는 1~12, 0은 전달 마지막날
}

function AddDay(daysToAdd) {
  customDate.day += daysToAdd;
  while (customDate.day > daysInMonth(customDate.year, customDate.month)) {
    customDate.day -= daysInMonth(customDate.year, customDate.month);
    AddMonth(1);
  }
  updateDisplay();
}

function AddWeek(weeksToAdd) {
  AddDay(weeksToAdd * 7);
}

function AddMonth(monthsToAdd) {
  customDate.month += monthsToAdd;
  Gold += realms[stats.Realm].Pay;
  LogAdd(`${realms[stats.Realm].name} 매달 봉급 ${realms[stats.Realm].Pay.toLocaleString()}냥을 벌었도다.`,'gold');
  while (customDate.month > 12) {
    customDate.month -= 12;
    customDate.year += 1;
    stats.Age += 1;
    LifeChk();
  }
  // 월이 바뀌면서 day가 유효하지 않으면 조정
  const dim = daysInMonth(customDate.year, customDate.month);
  if (customDate.day > dim) {
    customDate.day = dim;
  }
  updateDisplay();
}

function LifeChk() {
  if (stats.Age > stats.Life) {
    LogAdd(`💀 천수가 다하니, 그 숨결은 이제 안개 속으로 흩어졌도다.`, 'red');
    ResetCode();
  }
}

// 2. 날짜 표시용 함수
function displayCustomDate() {
  // 월, 일이 한자리 수면 0 붙이기 (예: 9 -> 09)
  const mm = customDate.month.toString().padStart(2, '0');
  const dd = customDate.day.toString().padStart(2, '0');

  // Date 객체 생성 (주의: month는 0부터 시작이므로 -1)
  const dateObj = new Date(customDate.year, customDate.month - 1, customDate.day);

  const daysKor = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = daysKor[dateObj.getDay()];

  return `${customDate.year}년 ${mm}월 ${dd}일(${dayName})`;
}

const dateDisplay = document.getElementById('custom-date-display');
if (dateDisplay) {
  dateDisplay.textContent = displayCustomDate();
}

function MaxBonusStat() {
  const sb = stats.lineage.statBonus;

  let maxStat = null;
  let minStat = null;
  let maxValue = -Infinity;
  let minValue = Infinity;

  for (const stat in sb) {
    const value = sb[stat];

    if (value > maxValue) {
      maxValue = value;
      maxStat = stat;
    }

    if (value < minValue) {
      minValue = value;
      minStat = stat;
    }
  }

  if (maxStat && statLabels[maxStat]) {
    LogAdd(`그대의 숨겨진 최고 재능은 바로 '${statLabels[maxStat]}'이로다.`, "gold");
} else {
    LogAdd("그대의 숨결 속 최고의 재능을 감지할 수 없도다.", "gray");
}

if (minStat && statLabels[minStat]) {
    LogAdd(`가장 허술한 맥은 '${statLabels[minStat]}'이니, 수련에 힘쓰라.`, "red");
} else {
    LogAdd("최악의 재능을 가릴 수 없으니, 부단히 수련하라.", "gray");
}

}
