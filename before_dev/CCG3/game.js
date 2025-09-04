function preventTouchMove(e) {
  e.preventDefault();
}

let gold;
let Goal;
let SizeChk;
let version;
let UpgAbil;
let CardStone;
let Quest;
let MaxBonusAtk;
let MaxBonusMhp;
let MaxBonusDef;
let CardRoll=1;
let Diamond;

let currentSaveSlot = null;
let SlotMax = 9;

let option = [
  {opt: true},
  {opt: false},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
  {opt: true},
]

function Opt(A, Txt) {
  if (A >= 0 && A < option.length) {
    option[A].opt = !option[A].opt;
    LogAdd(`${Txt} : ${option[A].opt ? '활성화' : '비활성화'}`, 'lightgreen');

    const optElement = document.querySelector(`#Opt${A}`);
    if (optElement) {
      optElement.classList.toggle('Active');
    }

    UIRendering();
  }
}
// 로그 관련 옵션의 인덱스 목록
const logOptionIndices = [2, 3, 4, 6, 7, 10, 12, 13, 14, 15, 16];

// 전체 ON/OFF 상태 저장용
let isLogOptionsOn = true; // 초기 상태: ON

function toggleLogOptions() {
  // 현재 상태 반전
  isLogOptionsOn = !isLogOptionsOn;

  // 로그 관련 옵션을 일괄 변경
  logOptionIndices.forEach(index => {
    if (index >= 0 && index < option.length) {
      option[index].opt = isLogOptionsOn; // 일괄 설정

      // 버튼 UI 상태 업데이트
      const optElement = document.querySelector(`#Opt${index}`);
      if (optElement) {
        if (isLogOptionsOn) {
          optElement.classList.add('Active');
        } else {
          optElement.classList.remove('Active');
        }
      }

    }
  });
  // 로그 출력
  LogAdd(`로그 출력 기능 일괄 : ${isLogOptionsOn ? '활성화' : '비활성화'}`, 'lightgreen');
  UIRendering(); // UI 전체 다시 그림
}




// 버전별 업데이트 내역
const updateNotes = {
  "0.71" : ["3단계 등급 감소"
           ,"이에 따라 기존 캐릭터, 직업군 재배치"
           ,"기본 강화석 드롭 확률 추가"
           ,"적 처치시 낮은 확률로 다이아 획득"
           ,"강화석 소모량 최대 3개로 제한"  ],
           
  "0.701" : ["슬롯 넘버링이 불일치하는 오류 수정"],
  "0.7" : ["다중 세이브 슬롯 업데이트"
          ,"이제 최대 9개의 세이브 슬롯을 관리하고 여러 세이브를 육성할 수 있습니다."
          ,"최초 접속시 선택하는 슬롯으로 데이터가 저장됩니다."
          ,"단! 절대 튜토리얼 도중에 게임을 종료하지 마세요. 세이브에 오류가 발생할 수 있습니다."
            ],

  "0.67" : ["카드 일괄 합성시 한번에 적용되도록 개선"
            ,"재료가 충분할 경우 카드 일괄 레벨업, 일괄 강화 기능 추가"
            ,"신규 재화 - 다이아몬드 추가."
            ,"유료 결제 시스템은 없지만 이와 비슷한 느낌으로 적용"
            ,"다이아 획득 경로 1 : 튜토리얼 & 메인 퀘스트"
            ,"다이아 사용처 1 : 상점에서 20+1로 높은 확률로 카드 제공"  ],

  "0.66" : ["업그레이드 가격과 💰보유량에 따라 색상 변경"
           ,"카드 교체시 현재 카드의 Lv,Xp표기, 보너스 스펙 표기 안함"
           ,"옵션에서 전투 버튼 위치 옮길 수 있도록 추가"
           ,"로그 이름 및 위치 변경"
           ,"티어15이상 💰 획득량 증가"
           ,"💰획득량 증가 업그레이드 효과 증가"
           ,"카드구매 비용감소 업그레이드 2단계 효과 100% 증가"
           ,"체력회복에 필요한 💰 50% 감소"
           ,"가드 메시지 옵션으로 온오프 조정 추가"
           ,"강화석 판매액 증가"],

  "0.651" : ["오프라인 시간동안 💰 획득 시스템 추가"
           ,"기본 최대 오프라인 시간은 1시간이며"
           ,"최대 진행한 적 상대의 기본 💰 획득량의 1%를 1초마다 획득한것으로 계산."
           ,"업그레이드 버튼 최적화 패치"
           ,"상점에서 카드 구매시 애니메이션 효과 추가"
           ,"카드 등록 > 카드 교체로 네이밍 변경"
           ,"카드 레벨업 텍스트 조정"
           ,"카드 교체 화면 변경"
           ,"현재 카드보다 1단계 위의 카드 교체시 버튼에 *표기"
           ,"전투시 최대체력증가 제대로 반영 안되는 버그 수정"
           ,"전투도중 사망할 경우 내 공격이 들어가지 않도록 수정"],

  "0.64" : ["자동전투 종료 조건에 보너스체력을 함께 계산하도록 변경"
            ,"튜토리얼 도중 합성버튼이 상시 떠있는 버그 수정"
            ,"방어력 > 방어율로 변경, 방어율 100%는 모든 공격을 차단함."
            ,"카드만렙 달성 보너스 공격력 수치 20%에서 33%로 상승"
            ,"강화시, 필요량/보유량으로 표기되는걸 보유량/필요량으로 변경"
            ,"업그레이드로 오르는 공격력,체력 상승값 대폭 상승"
            ,"업그레이드로 오르는 방어력값, 방어율에 맞게 개선"
            ,"가이드에 티어별 카드상점 확률표 표기"
            ,"단계별 💰 획득량 상승"
            ,"적 처치시 일정 확률로 해당 등급의 강화석을 드롭하는 업그레이드 추가"  ],

  "0.63": ["+🗡️추가 공격력 업그레이드"
          ,"+❤️추가 체력 업그레이드"
          ,"+🛡️추가 방어력 업그레이드"
          ,"적 카드의 레벨,강화표기 삭제"
          ,"카드 이미지 구경하기 기능 추가"],

  "0.62": ["더이상 의미없는 닫기 버튼 삭제"
          ,"구매 버튼 해금 시기 조정"
          ,"카드 분할,분해,강화 버튼 조정"
          ,"등급별 중복 직업 캐릭터 조정"
          ,"가이드 메뉴 추가"
          ,"카드에 등급 대신 티어 표기"
          ,"카드 강화시, 실패 확률 추가"
          ,"카드 강화 수치가 높을 수록 실패 확률이 오릅니다."
          ,"기존방식대로 전체표기하는 기능도 추가"
          ,"합성버튼이 상시 표기되며, 조건에 부족한걸 로그로 띄우도록 변경"
          ,"기본 자동전투 속도 상승, 속도 증가량 소폭 감소"
          ,"업그레이드 비용 일부 감소"],

  "0.61": ["자동전투 버튼 온오프 기능 추가"
          ,"체력회복 메시지 온오프 기능 추가"
          ,"킬 카운트 보상 주기 변경"
          ,"애니메이션 끄기 옵션 삭제"
          ,"좌측 메뉴 간격 50px > 40px로 변경"
          ,"카드 크기가 width기준이 아닌 height기준으로 크기가 재조정되도록 변경"
          ,"카드 테두리 크기 10px > 6px로 변경"
          ,"현재 오픈한 메뉴가 무엇인지 구분할 수 있도록 조정"
          ,"💰 획득량 그래프 조정"
          ,"카드 분할시에도 강화석을 필요로 하도록 수정"
          ,"카드 분할시 무조건 2장 나오도록 수정"],

  "0.6": ["옵션 버튼 추가"
          ,"이제 다양한 기능을 옵션으로 온 오프 할수 있도록 개선하였습니다."],

  "0.59": ["카드 레벨 만렙 조정"
          ,"카드 강화Max값을 Lv과 동일하게 조정"
          ,"이에 따른 일부 튜토리얼 보상 및 내용 수정"
          ,"카드 만렙, 최대 강화 달성시 상시 추가효과 부여"
          ,"- 카드 단일 분해 / 일괄 분해 추가"
          ,"- 카드 단일 분할 / 일괄 분할 추가"
          ,"- 강화석 단일 조합 / 일괄 조합 추가"
          ,"공격력,체력 밸런싱 패치"
          ,"킬 보상으로 카드를 지급하는 리워드가 Tier30까지만 제공되도록 함"],

 "0.58": ["티어 표기 개선"
          ,"회복시 계산값 표기"
          ,"최초 적 처치시 회복 효과 적용"
          ,"회복 버튼 맨 밑으로 이동"
          ,"리셋 버튼을 메인화면에서 제외, 기록 맨 밑으로 이동"
          ,"자동전투 진행시 배속 표기"
          ,"카드 최대체력 밸런스 조정"
          ,"카드 분할 기능 추가"
          ,"분할 - 상위 카드를 하위 카드로 전환"
          ,"카드 킬수가 초기화되지 않는 버그 수정"
          ,"보유하지 않은 강화석은 표기하지 않도록 수정"
          ,"튜토리얼을 모두 마치면 F급 강화석 15개를 추가 지급"
          ,"튜토리얼 중 관련없는 메뉴를 열지 못하도록 제한"
          ,"카드 계승 값 50% > 80%로 개선"
          ,"강화석 보유량을 상점 강화석 조합에서 표기되도록 수정"],

 "0.57": ["체력 회복 로직 개선"
          ,"자동전투 로직 개선"
          ,"하위 강화석을 조합하여 상위 강화석으로 제작 가능하도록 기능 개선"
          ,"상점의 Auto버튼을 다른 기능에서 사용 가능하도록 개선"
          ,"- 카드 단일 판매 / 일괄 판매"
          ,"- 카드 단일 합성 / 일괄 합성 > 일괄 합성 버튼 삭제"
          ,"- 강화석 단일 판매 / 일괄 판매"
          ,"- 카드 단일 구매 / 일괄 구매"
          ,"화면 슬라이드가 오른쪽에서 나오도록 수정"
          ,"슬라이드가 나오는 메뉴 색상 금색으로 변경"
          ,"닫기 버튼 이름 X로 변경, 메뉴 버튼 다시 눌러도 닫히도록 수정"
          ,"자동 전투 버튼 위치 조정"
          ,"퀘스트 > 기록으로 이름 변경"
          ,"강화석 보유량을 기록 안으로 옮김"],

 "0.56": ["강화석 사용 용도 추가"
          ,"이제 강화석이 있어야 강화가 가능해집니다."
          ,"대신, 강화석을 통해 공격력, 체력 둘다 오르도록 개선됩니다."
          ,"카드의 레벨, 강화가 한계치까지 도달하면 다음 등급 카드 1장을 무료로 받습니다."
          ,"카드 스텟 - 방어력 추가"
          ,"방어력 : 적의 공격력을 상쇄시켜주며, 공격력보다 방어력이 더 높으면 데미지가 박히지 않음."
          ,"카드 만렙 도달시 방어력+1 효과가 적용됩니다."
          ,"카드 최대 강화 도달시 방어력+1 효과가 적용됩니다."
          ,"카드 레벨업, 강화시 낮은 확률로 방어력 증대 효과가 적용됩니다."
          ,"카드 방어력은 계승에 반영되지 않습니다."
          ,"인벤토리 카드 구분 가독성 개선."
          ,"상점 메뉴에 판매 버튼 추가"
          ,"남는 강화석을 판매할 수 있도록 기능 추가"
          ,"💰 보유량 화면이 가려지지 않도록 수정"
          ,"로그 화면이 가려지지 않도록 수정"],

  "0.55": ["자동 전투시, 일반전투 버튼 비활성화"
          ,"자동 전투중 자동 체력회복 로그 수정"
          ,"20단계부터 💰 획득량 추가 증가"
          ,"카드 구매 비용 감소"
          ,"카드 구매 해금되는 시기 감소"
          ,"업그레이드 비용 일부 조정"
          ,"💰 획득량 증폭 업그레이드 3단계 추가"
          ,"카드 구매 로직 개선"
          ,"카드 상위카드로 교체시, 기존 카드의 일부 능력치 계승"
          ,"강화석 추가, 카드 분해시 강화석 획득"
          ,"최초 처치 보상 획득시 랜덤 삭제"
          ,"단위에 k,M,G,T 추가"
          ,"gold표기 대신 💰이모지로 변경"
          ,"퀘스트 추가"
          ,"킬 수 추가, 10킬, 25킬, 50킬, 100킬, 250킬, 500킬, 1천킬에서 카드 획득"],

  "0.54": ["회복시 💰가 소모되도록 수정"
          ,"회복시 나만 치료받도록 수정"
          ,"적 변경시, 회복되지 않도록 수정"
          ,"카드 레벨업, 강화, 구매시 회복되지 않도록 수정"
          ,"체력 회복 비용 감소 업그레이드 추가"
          ,"UI 일부 수정"],
             
  "0.53": ["업그레이드 가격을 조정하였습니다."
          ,"상급 상점 업그레이드가 추가됩니다."
          ,"최상급 상점과 업그레이드가 추가됩니다."
          ,"버젼 체크 로직이 추가됩니다."
          ,"업데이트 내역이 추가됩니다."
          ,"추가 20단계의 카드가 추가됩니다."
          ,"각 등급별 체계를 개선하였습니다."
          ,"S급 이상 카드의 이미지를 수정합니다."
          ,"카드 배경 테두리가 추가됩니다."
          ,"초기 지급 카드 갯수를 2 > 3으로 늘렸습니다."
          ,"초기 지급 💰를 1000 > 900으로 줄였습니다."
          ,"카드 등록시 확인 팝업창이 추가됩니다."]
};

function DefaultSetting() {
  enemyCards = [{ ...CardPack[0],Cod:0 }];
  playerCards = [{ ...CardPack[0],Cod:0 }];
  gold = 200;
  Diamond = 0;
  Goal = -1;
  //Max 38
  version = 0.71;
  Quest = 1;
  MaxBonusAtk = 0;
  MaxBonusMhp = 0;
  MaxBonusDef = 0;

  UpgAbil = [
  //0~4
  { Value: 10000, Have: 0, Name: "N~R급 구매 최소+1", Num: 1, Max: 2 },
  { Value: 30000, Have: 0, Name: "N~R급 구매 최소+1", Num: 2, Max: 2 },
  { Value: 30000, Have: 0, Name: "N~R급 비용 100💰 감소", Num: 1, Max: 2 },
  { Value: 100000, Have: 0, Name: "N~R급 비용 200💰 감소", Num: 2, Max: 2 },
  { Value: 100000, Have: 0, Name: "R~SR급 구매 최소+1", Num: 1, Max: 2 },
  // 5~9
  { Value: 300000, Have: 0, Name: "R~SR급 구매 최소+1", Num: 2, Max: 2 },
  { Value: 300000, Have: 0, Name: "R~SR급 비용 1k💰 감소", Num: 1, Max: 2 },
  { Value: 1000000, Have: 0, Name: "R~SR급 비용 2k💰 감소", Num: 2, Max: 2 },
  { Value: 5000, Have: 0, Name: "💰 획득량 25% 증가", Num: 1, Max: 3 },
  { Value: 50000, Have: 0, Name: "💰 획득량 25% 증가", Num: 2, Max: 3 },
  // 10~14
  { Value: 500000, Have: 0, Name: "💰 획득량 25% 증가", Num: 3, Max: 3 },
  { Value: 25000, Have: 0, Name: "자동 전투 1배속", Num: 1, Max: 7 },
  { Value: 50000, Have: 0, Name: "자동 전투 1.25배속", Num: 2, Max: 7 },
  { Value: 200000, Have: 0, Name: "자동 전투 1.5배속", Num: 3, Max: 7 },
  { Value: 1000000, Have: 0, Name: "자동 전투 2배속", Num: 4, Max: 7 },
  // 15~19
  { Value: 5000000, Have: 0, Name: "자동 전투 3배속", Num: 5, Max: 7 },
  { Value: 15000000, Have: 0, Name: "자동 전투 4배속", Num: 6, Max: 7 },
  { Value: 50000000, Have: 0, Name: "자동 전투 5배속", Num: 7, Max: 7 },
  { Value: 25000000, Have: 0, Name: "전투 후 자동 회복", Num: 1, Max: 1 },
  { Value: 1000000, Have: 0, Name: "SR~SSR급 구매 최소+1", Num: 1, Max: 2 },
  // 20~24
  { Value: 3000000, Have: 0, Name: "SR~SSR급 구매 최소+1", Num: 2, Max: 2 },
  { Value: 3000000, Have: 0, Name: "SR~SSR급 비용 10k💰 감소", Num: 1, Max: 2 },
  { Value: 10000000, Have: 0, Name: "SR~SSR급 비용 20k💰 감소", Num: 2, Max: 2 },
  { Value: 10000000, Have: 0, Name: "SSR~UR급 구매 최소+1", Num: 1, Max: 2 },
  { Value: 30000000, Have: 0, Name: "SSR~UR급 구매 최소+1", Num: 2, Max: 2 },
  // 25~29
  { Value: 30000000, Have: 0, Name: "SSR~UR급 비용 100k💰 감소", Num: 1, Max: 2 },
  { Value: 100000000, Have: 0, Name: "SSR~UR급 비용 200k💰 감소", Num: 2, Max: 2 },
  { Value: 50000, Have: 0, Name: "체력 회복 비용 5 > 4💰 감소", Num: 1, Max: 5 },
  { Value: 500000, Have: 0, Name: "체력 회복 비용 4 > 3💰 감소", Num: 2, Max: 5 },
  { Value: 5000000, Have: 0, Name: "체력 회복 비용 3 > 2💰 감소", Num: 3, Max: 5 },
  // 30~34
  { Value: 50000000, Have: 0, Name: "체력 회복 비용 2 > 1💰 감소", Num: 4, Max: 5 },
  { Value: 200000000, Have: 0, Name: "체력 회복 비용 무료화", Num: 5, Max: 5 },
  { Value: 2000000, Have: 0, Name: "💰 획득 증폭 50% 증가", Num: 1, Max: 3 },
  { Value: 20000000, Have: 0, Name: "💰 획득 증폭 50% 증가", Num: 2, Max: 3 },
  { Value: 200000000, Have: 0, Name: "💰 획득 증폭 50% 증가", Num: 3, Max: 3 },
  // 35~38
  { Value: 100000000, Have: 0, Name: "UR~LR급 구매 최소+1", Num: 1, Max: 2 },
  { Value: 300000000, Have: 0, Name: "UR~LR급 구매 최소+1", Num: 2, Max: 2 },
  { Value: 300000000, Have: 0, Name: "UR~LR급 1M💰 감소", Num: 1, Max: 2 },
  { Value: 1000000000, Have: 0, Name: "UR~LR급 2M💰 감소", Num: 2, Max: 2 },
    // 39~48 🗡️추가 공격력
  { Value: 1000, Have: 0, Name: "🗡️추가 공격력 +1", Num: 1, Max: 10 },
  { Value: 10000, Have: 0, Name: "🗡️추가 공격력 +10", Num: 2, Max: 10 },
  { Value: 100000, Have: 0, Name: "🗡️추가 공격력 +50", Num: 3, Max: 10 },
  { Value: 1000000, Have: 0, Name: "🗡️추가 공격력 +200", Num: 4, Max: 10 },
  { Value: 3000000, Have: 0, Name: "🗡️추가 공격력 +1k", Num: 5, Max: 10 },
  { Value: 10000000, Have: 0, Name: "🗡️추가 공격력 +5k", Num: 6, Max: 10 },
  { Value: 30000000, Have: 0, Name: "🗡️추가 공격력 +20k", Num: 7, Max: 10 },
  { Value: 100000000, Have: 0, Name: "🗡️추가 공격력 +100k", Num: 8, Max: 10 },
  { Value: 300000000, Have: 0, Name: "🗡️추가 공격력 +500k", Num: 9, Max: 10 },
  { Value: 1000000000, Have: 0, Name: "🗡️추가 공격력 +2M", Num: 10, Max: 10 },
    // 49~58 ❤️추가 체력
  { Value: 2000, Have: 0, Name: "❤️추가 체력 +10", Num: 1, Max: 10 },
  { Value: 20000, Have: 0, Name: "❤️추가 체력 +100", Num: 2, Max: 10 },
  { Value: 200000, Have: 0, Name: "❤️추가 체력 +500", Num: 3, Max: 10 },
  { Value: 2000000, Have: 0, Name: "❤️추가 체력 +2k", Num: 4, Max: 10 },
  { Value: 6000000, Have: 0, Name: "❤️추가 체력 +10k", Num: 5, Max: 10 },
  { Value: 20000000, Have: 0, Name: "❤️추가 체력 +50k", Num: 6, Max: 10 },
  { Value: 60000000, Have: 0, Name: "❤️추가 체력 +200k", Num: 7, Max: 10 },
  { Value: 200000000, Have: 0, Name: "❤️추가 체력 +1M", Num: 8, Max: 10 },
  { Value: 600000000, Have: 0, Name: "❤️추가 체력 +5M", Num: 9, Max: 10 },
  { Value: 2000000000, Have: 0, Name: "❤️추가 체력 +20M", Num: 10, Max: 10 },
    // 59~68 🛡️추가 방어력
  { Value: 10000, Have: 0, Name: "🛡️추가 방어력 +1%", Num: 1, Max: 10 },
  { Value: 100000, Have: 0, Name: "🛡️추가 방어력 +3%", Num: 2, Max: 10 },
  { Value: 1000000, Have: 0, Name: "🛡️추가 방어력 +5%", Num: 3, Max: 10 },
  { Value: 3000000, Have: 0, Name: "🛡️추가 방어력 +10%", Num: 4, Max: 10 },
  { Value: 10000000, Have: 0, Name: "🛡️추가 방어력 +15%", Num: 5, Max: 10 },
  { Value: 30000000, Have: 0, Name: "🛡️추가 방어력 +25%", Num: 6, Max: 10 },
  { Value: 100000000, Have: 0, Name: "🛡️추가 방어력 +50%", Num: 7, Max: 10 },
  { Value: 300000000, Have: 0, Name: "🛡️추가 방어력 +75%", Num: 8, Max: 10 },
  { Value: 1000000000, Have: 0, Name: "🛡️추가 방어력 +90%", Num: 9, Max: 10 },
  { Value: 3000000000, Have: 0, Name: "🛡️추가 방어력 +95%", Num: 10, Max: 10 },
    // 69~76 강화석 드롭 확률
  { Value: 500, Have: 0, Name: "강화석 드롭 확률 +1%", Num: 1, Max: 8 },
  { Value: 5000, Have: 0, Name: "강화석 드롭 확률 +3%", Num: 2, Max: 8 },
  { Value: 50000, Have: 0, Name: "강화석 드롭 확률 +5%", Num: 3, Max: 8 },
  { Value: 500000, Have: 0, Name: "강화석 드롭 확률 +10%", Num: 4, Max: 8 },
  { Value: 5000000, Have: 0, Name: "강화석 드롭 확률 +15%", Num: 5, Max: 8 },
  { Value: 50000000, Have: 0, Name: "강화석 드롭 확률 +25%", Num: 6, Max: 8 },
  { Value: 500000000, Have: 0, Name: "강화석 드롭 확률 +50%", Num: 7, Max: 8 },
  { Value: 5000000000, Have: 0, Name: "강화석 드롭 확률 +100%", Num: 8, Max: 8 },
    //77~83 최대 오프라인 시간 +60분 증가
  { Value: 100000, Have: 0, Name: "최대 오프라인 시간 +50분 증가", Num: 1, Max: 7 },
  { Value: 300000, Have: 0, Name: "최대 오프라인 시간 +60분 증가", Num: 2, Max: 7 },
  { Value: 1000000, Have: 0, Name: "최대 오프라인 시간 +60분 증가", Num: 3, Max: 7 },
  { Value: 3000000, Have: 0, Name: "최대 오프라인 시간 +60분 증가", Num: 4, Max: 7 },
  { Value: 10000000, Have: 0, Name: "최대 오프라인 시간 +60분 증가", Num: 5, Max: 7 },
  { Value: 30000000, Have: 0, Name: "최대 오프라인 시간 +60분 증가", Num: 6, Max: 7 },
  { Value: 100000000, Have: 0, Name: "최대 오프라인 시간 +60분 증가", Num: 7, Max: 7 },
    //84~90 오프라인 보상 % 증가
  { Value: 1000000, Have: 0, Name: "오프라인 보상 2% 증가", Num: 1, Max: 7 },
  { Value: 5000000, Have: 0, Name: "오프라인 보상 4% 증가", Num: 2, Max: 7 },
  { Value: 20000000, Have: 0, Name: "오프라인 보상 6% 증가", Num: 3, Max: 7 },
  { Value: 100000000, Have: 0, Name: "오프라인 보상 8% 증가", Num: 4, Max: 7 },
  { Value: 500000000, Have: 0, Name: "오프라인 보상 10% 증가", Num: 5, Max: 7 },
  { Value: 2000000000, Have: 0, Name: "오프라인 보상 15% 증가", Num: 6, Max: 7 },
  { Value: 10000000000, Have: 0, Name: "오프라인 보상 20% 증가", Num: 7, Max: 7 }
  ];
  CardStone = [
    { Tier:"N",Cnt:0 },
    { Tier:"R",Cnt:0 },
    { Tier:"SR",Cnt:0 },
    { Tier:"SSR",Cnt:0 },
    { Tier:"UR",Cnt:0 },
    { Tier:"LR",Cnt:0 },
    { Tier:"GR",Cnt:0 },
    { Tier:"TR",Cnt:0 },
  ];
  for (let i = 0; i < CardInventory.length; i++) {
    CardInventory[i] = 0;
  }
  CardInventory[0] = 2;
  for (let i = 0; i < CardKill.length; i++) {
    CardKill[i] = 0;
  }
  for (let i = 0; i < CardMax.length; i++) {
    CardMax[i] = 0;
  }
  
  
}


// 등급 및 티어 리스트 (0부터 시작 인덱스)
const GRADES = ["커먼","언커먼", "매직", "레어","히어로", "유니크", "에픽", "레전더리", "신화","절대"];
// const TIERS = ["F","E","D","C", "B", "A", "S","SS","SSS","Z","ZZ"];
const TIERS = ["N","R","SR","SSR", "UR", "LR","GR","TR"];
const TIER2 = ["⚪","🟢","🔵", "🟣", "🟠", "🟡","🔴","⭐"];
const CardPack = [
  //0~4 x4
  { name: "궁수 윌슨", atk: 1, hp: 4, Lv: 1, Mhp: 4, grade: 0, tier: 0, Xp: 0 , def: 0 }, 
  { name: "격투가 조안", atk: 3, hp: 12, Lv: 1, Mhp: 12, grade: 1, tier: 0, Xp: 0 , def: 1 },  
  { name: "총잡이 엘라", atk: 5, hp: 20, Lv: 1, Mhp: 20, grade: 2, tier: 0, Xp: 0 , def: 2 },  
  { name: "정령사 베티", atk: 7, hp: 28, Lv: 1, Mhp: 28, grade: 3, tier: 0, Xp: 0 , def: 3 },  
  { name: "사냥꾼 케이트", atk: 10, hp: 40, Lv: 1, Mhp: 40, grade: 4, tier: 0, Xp: 0 , def: 4 }, 
  //5~9 x5
  { name: "힐러 달시", atk: 15, hp: 75, Lv: 1, Mhp: 75, grade: 1, tier: 1, Xp: 0 , def: 5 }, 
  { name: "전사 칼슨", atk: 22, hp: 120, Lv: 1, Mhp: 120, grade: 2, tier: 1, Xp: 0 , def: 6 }, 
  { name: "탐험가 앨리스", atk: 35, hp: 200, Lv: 1, Mhp: 200, grade: 3, tier: 1, Xp: 0 , def: 7 }, 
  { name: "쌍검사 메그", atk: 57, hp: 350, Lv: 1, Mhp: 350, grade: 4, tier: 1, Xp: 0 , def: 8 }, 
  { name: "위저드 로빈", atk: 93, hp: 600, Lv: 1, Mhp: 600, grade: 5, tier: 1, Xp: 0 , def: 9 }, 

  //10~14 x6
  { name: "건슬링거 리사", atk: 155, hp: 1000, Lv: 1, Mhp: 1000, grade: 1, tier: 2, Xp: 0 , def: 10 }, 
  { name: "검성 네드", atk: 300, hp: 1650, Lv: 1, Mhp: 1650, grade: 2, tier: 2, Xp: 0 , def: 12 }, 
  { name: "성녀 쟈넷", atk: 450, hp: 2560, Lv: 1, Mhp: 2560, grade: 3, tier: 2, Xp: 0 , def: 14 }, 
  { name: "백마법사 진", atk: 685, hp: 3930, Lv: 1, Mhp: 3930, grade: 4, tier: 2, Xp: 0 , def: 16 }, 
  { name: "정령술사 마가렛", atk: 1045, hp: 6010, Lv: 1, Mhp: 6010, grade: 5, tier: 2, Xp: 0 , def: 18 }, 
  //15~19 x8
  { name: "무사 유화", atk: 1600, hp: 9200, Lv: 1, Mhp: 9200, grade: 2, tier: 3, Xp: 0 , def: 20 }, 
  { name: "혈검사 명주", atk: 2700, hp: 15500, Lv: 1, Mhp: 15500, grade: 3, tier: 3, Xp: 0 , def: 22 }, 
  { name: "절정고수 린시 ", atk: 4400, hp: 25300, Lv: 1, Mhp: 25300, grade: 4, tier: 3, Xp: 0 , def: 24 }, 
  { name: "용신녀 운설", atk: 7150, hp: 41200, Lv: 1, Mhp: 41200, grade: 5, tier: 3, Xp: 0 , def: 26 }, 
  { name: "도사 무령", atk: 11600, hp: 66800, Lv: 1, Mhp: 66800, grade: 6, tier: 3, Xp: 0 , def: 28 }, 
  //20~24 x10
  { name: "성녀 초운", atk: 18830, hp: 108440, Lv: 1, Mhp: 108440, grade: 2, tier: 4, Xp: 0 , def: 30 }, 
  { name: "빙검신 연화", atk: 32590, hp: 187690, Lv: 1, Mhp: 187690, grade: 3, tier: 4, Xp: 0 , def: 33 }, 
  { name: "천사 유린", atk: 55040, hp: 316930, Lv: 1, Mhp: 316930, grade: 4, tier: 4, Xp: 0 , def: 36 }, 
  { name: "해적여제 은조", atk: 92670, hp: 533620, Lv: 1, Mhp: 533620, grade: 5, tier: 4, Xp: 0 , def: 39 }, 
  { name: "대신관 초령", atk: 156000, hp: 898290, Lv: 1, Mhp: 898290, grade: 6, tier: 4, Xp: 0 , def: 42 }, 
  //25~29 x15
  { name: "용기사 월향", atk: 262640, hp: 1512310, Lv: 1, Mhp: 1512310, grade: 3, tier: 5, Xp: 0 , def: 45 }, 
  { name: "프린세스 세화", atk: 463060, hp: 2666350, Lv: 1, Mhp: 2666350, grade: 4, tier: 5, Xp: 0 , def: 50 }, 
  { name: "성황 연홍", atk: 799510, hp: 4603700, Lv: 1, Mhp: 4603700, grade: 5, tier: 5, Xp: 0 , def: 55 }, 
  { name: "여제 진령", atk: 1377060, hp: 7929360, Lv: 1, Mhp: 7929360, grade: 6, tier: 5, Xp: 0 , def: 60 }, 
  { name: "무녀 채운", atk: 2371210, hp: 13653890, Lv: 1, Mhp: 13653890, grade: 7, tier: 5, Xp: 0 , def: 65 }, 
  //30~34 x20
  { name: "용제 카린", atk: 4083040, hp: 23510940, Lv: 1, Mhp: 23510940, grade: 4, tier: 6, Xp: 0 , def: 70 }, 
  { name: "기갑 소연", atk: 7173910, hp: 41308830, Lv: 1, Mhp: 41308830, grade: 5, tier: 6, Xp: 0 , def: 75 }, 
  { name: "페어리퀸 청아", atk: 12229270, hp: 70418660, Lv: 1, Mhp: 70418660, grade: 6, tier: 6, Xp: 0 , def: 80 }, 
  { name: "대천사 아리엘", atk: 20749270, hp: 119478670, Lv: 1, Mhp: 119478670, grade: 7, tier: 6, Xp: 0 , def: 85 }, 
  { name: "이단심판관 은비", atk: 35164370, hp: 202483880, Lv: 1, Mhp: 202483880, grade: 8, tier: 6, Xp: 0 , def: 90 }, 
  //35~39 x25
  { name: "제국의 무녀", atk: 59564390, hp: 342984410, Lv: 1, Mhp: 342984410, grade: 5, tier: 7, Xp: 0 , def: 95 }, 
  { name: "제국의 황녀", atk: 102681310, hp: 591260870, Lv: 1, Mhp: 591260870, grade: 6, tier: 7, Xp: 0 , def: 96 }, 
  { name: "전장의 지배자", atk: 172808300, hp: 995067080, Lv: 1, Mhp: 995067080, grade: 7, tier: 7, Xp: 0 , def: 97 }, 
  { name: "엑스 마키나", atk: 289670810, hp: 1667986390, Lv: 1, Mhp: 1667986390, grade: 8, tier: 7, Xp: 0 , def: 98 }, 
  { name: "차원의 초월자", atk: 485056560, hp: 2793059330, Lv: 1, Mhp: 2793059330, grade: 9, tier: 7, Xp: 0 , def: 99 }, 
  
];


let CardInventory = new Array(CardPack.length).fill(0);
let CardKill = new Array(CardPack.length).fill(0);
let CardMax = new Array(CardPack.length).fill(0);

// 적 카드 데이터 (grade, tier 숫자 인덱스)
let enemyCards = [
  { ...CardPack[0],Cod:0 }
];

// 플레이어 카드 데이터
let playerCards = [
  { ...CardPack[0],Cod:0 }
];


// 카드 DOM 요소 생성 함수
function createCardElement(card,A) {
  // grade, tier 문자로 변환
  const gradeName = GRADES[card.grade] || "커먼";
  const tierName = TIERS[card.tier] || "N";

  const cardDiv = document.createElement('div');

  // 등급에 따른 클래스 설정
  const gradeClass = {
    "커먼": "common",
    "언커먼": "uncommon",
    "매직": "magic",
    "레어": "rare",
    "히어로": "heroic",
    "유니크": "unique",
    "에픽": "epic",
    "레전더리": "legendary",
    "신화": "myth",
    "절대": "transcendent"
  }[gradeName] || "normal";

  cardDiv.className = `card ${gradeClass}`;

  // 카드 이름 감싸기
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'card-title';

  const title = document.createElement('h4');
  title.textContent = `T${card.Cod} ${card.name}`;

  titleWrapper.appendChild(title);


  // 수치 영역 (세로 정렬)
  const stats = document.createElement('div');
stats.className = 'card-stats';


// HTML 구성
let CarAtk = 0;
let Carhp = 0;
let CarMhp = 0;
let CarDef = 0;
let DefTxt;
if (A === 1) {
  CarAtk = card.atk + MaxBonusAtk;
  Carhp = card.hp + MaxBonusMhp;
  CarMhp = card.Mhp + MaxBonusMhp;
  CarDef = card.def+MaxBonusDef;
  if (MaxBonusDef > 0) {
    DefTxt = `${card.def}% + ${MaxBonusDef}%`;
  } else {
    DefTxt = `${card.def}%`;
  }
} else {
  CarAtk = card.atk;
  Carhp = card.hp;
  CarMhp = card.Mhp;
  CarDef = card.def;
  DefTxt = `${card.def}%`;
}

// HP 비율 계산
let hpPercent = ((Number(Carhp) / Number(CarMhp)) * 100).toFixed(2);
if (A ===1 && MaxBonusMhp >= 1) {
    hpPercent = ((Number(Carhp+MaxBonusMhp) / Number(CarMhp+MaxBonusMhp)) * 100).toFixed(2);
}

if (CarDef > 0 ) {
  stats.innerHTML = `
    <div class="crd"><span class="emoji">🗡️</span> ${AttackRangeText(CarAtk)}</div>
    <div class="crd"><span class="emoji">❤️</span> ${numk(Carhp)}</div>
    <div class="crd"><span class="emoji">🛡️</span> ${DefTxt}</div>
    <div class="hp-bar-container">
      <div class="hp-bar" style="width: ${hpPercent}%;"></div>
    </div>
  `;
} else {
stats.innerHTML = `
<div class="crd"><span class="emoji">🗡️</span> ${AttackRangeText(CarAtk)}</div>
<div class="crd"><span class="emoji">❤️</span> ${numk(Carhp)}</div>
<div class="hp-bar-container">
  <div class="hp-bar" style="width: ${hpPercent}%;"></div>
</div>
`;
}


  // 티어 표시 (우상단)
  const tier = document.createElement('div');
  tier.className = 'card-tier';
  const TierImageUrl = `tr/a${card.tier}.webp`;
  //LogAdd(`tr/a${card.tier}.webp`);
  tier.style.backgroundImage = `url(${TierImageUrl})`;
  tier.style.backgroundSize = 'cover';
  tier.style.backgroundPosition = 'center';
  tier.style.backgroundRepeat = 'no-repeat';
  if (A === 0) {
    tier.style.color = 'red';
  } else {
    tier.style.color = 'lightgreen';
  }
  
  // 레벨 표시 (좌상단)
  const lv = document.createElement('div');
  lv.className = 'card-lv';
  lv.textContent = card.Lv + '/' + MaxLv(card.Cod);

  // 레벨 표시 (좌상단)
  const xp = document.createElement('div');
  xp.className = 'card-xp';
  xp.textContent = '+' + card.Xp + '/' + MaxXp(card.Cod);

  // 카드 구성
  cardDiv.appendChild(titleWrapper);
  cardDiv.appendChild(stats);
  cardDiv.appendChild(tier);
  if (A === 1) {
    cardDiv.appendChild(lv);
    cardDiv.appendChild(xp);
  }

  // 카드 배경 이미지 설정
  const backgroundImageUrl = `img/t${card.Cod}.webp`;
  cardDiv.style.backgroundImage = `url(${backgroundImageUrl})`;
  cardDiv.style.backgroundSize = 'cover';
  cardDiv.style.backgroundPosition = 'center 30px';
  cardDiv.style.backgroundRepeat = 'no-repeat';

  if (A === 0) {
    const body = document.getElementById('background');
    body.style.backgroundImage = `url(${backgroundImageUrl})`;

  }
  return cardDiv;
}

const panels = {
  inventory: {
    btn: document.getElementById('inventoryBtn'),
    panel: document.getElementById('inventoryPanel'),
    questRequired: 0
  },
  shop: {
    btn: document.getElementById('shopBtn'),
    panel: document.getElementById('shopPanel'),
    questRequired: 9
  },
  upgrade: {
    btn: document.getElementById('UpgradeBtn'),
    panel: document.getElementById('UpPanel'),
    questRequired: 10
  },
  quest: {
    btn: document.getElementById('QuestBtn'),
    panel: document.getElementById('QuestPanel'),
    questRequired: 0
  },
  option: {
    btn: document.getElementById('OptionBtn'),
    panel: document.getElementById('OptionPanel'),
    questRequired: 0
  },
  guide: {
    btn: document.getElementById('GuideBtn'),
    panel: document.getElementById('GuidePanel'),
    questRequired: 0
  }
};

const resetButtonStyles = () => {
  for (const key in panels) {
    panels[key].btn.style.transform = 'scale(1) translateX(0px) translateY(0px)';
  }
};

const openPanel = (key) => {
  const current = panels[key];

  // 퀘스트 조건 검사
  if (Quest < current.questRequired) {
    LogAdd('다른 튜토리얼을 먼저 진행해주세요.', 'red');
    return;
  }

  const isOpen = current.panel.classList.contains('open');

  if (!isOpen) {
    // 모든 패널 닫기
    for (const otherKey in panels) {
      panels[otherKey].panel.classList.remove('open');
    }

    current.panel.classList.add('open');
    resetButtonStyles();
    current.btn.style.transform = 'scale(1.3) translateX(5px) translateY(-1px)';

    if (key === 'quest') {
      const questBtn = document.getElementById(`QuestBtn${Quest}`);
      if (questBtn) questBtn.classList.remove('hidden');
    }
  } else {
    current.panel.classList.remove('open');
    resetButtonTransform(current.btn);
  }
};

for (const key in panels) {
  const { btn } = panels[key];
  btn.addEventListener('click', () => openPanel(key));
}
function resetButtonTransform(button) {
  button.style.transform = 'scale(1) translateX(0px) translateY(0px)';
}


function Quests() {
  if (Quest < 11) {
    QuestsT();
  } else {
    QuestsM1();
  }
}
function QuestsT() {
  if (Quest === 1) {
    if (CardInventory[1] >= 1) {
      QuestOk();
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎`,'orange');
    } else {
      LogAdd(`[튜토리얼 1]`,'orange');
      LogAdd(`${CardPack[0].name} 카드를 2개 합성하여`,'cyan');
      LogAdd(` ${CardPack[1].name} 1장을 얻으세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽의 카드를 누르세요.`,'yellow');
      LogAdd(`2. 화면 좌측상단의 ⟳버튼을 눌러 [합성모드]로 전환하세요.`,'yellow');
      LogAdd(`3. ${CardPack[0].name} 아래에 합성 버튼을 누르세요.`,'yellow');
      LogAdd(`4. 최소 2개 이상 있어야 합성 버튼이 활성화 되며`,'yellow');
      LogAdd(` 많이 보유한 경우 일괄 합성으로 진행할 수 있습니다.`,'yellow');
      LogAdd(`5. 카드 합성시, 일정량의 💰이 소모되며,`,'yellow');
      LogAdd(` 100% 확률로 다음 카드가 등장합니다.`,'yellow');
    }
  }
  if (Quest === 2) {
    if (playerCards[0].Cod === 1) {
      QuestOk();
      CardInventory[0] += 1;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 ${CardPack[0].name} 1장`,'orange');
    } else {
      LogAdd(`[튜토리얼 2]`,'orange');
      LogAdd(`${CardPack[1].name}를 교체하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽의 카드를 누르세요.`,'yellow');
      LogAdd(`2. 화면 좌측상단의 ⟳버튼을 눌러 [교체모드]로 전환하세요.`,'yellow');
      LogAdd(`3. ${CardPack[1].name} 아래에 교체 버튼을 누르세요.`,'yellow');
      LogAdd(`4. 현재 사용중인 카드보다 높은 카드만 교체가 가능합니다.`,'yellow');
    }
  }
  if (Quest === 3) {
    if (gold >= 100) {
      QuestOk();
      CardInventory[1] += 2;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 ${CardPack[1].name} 2장`,'orange');
    } else {
      LogAdd(`[튜토리얼 3]`,'orange');
      LogAdd(`${CardPack[0].name}를 판매하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽의 카드를 누르세요.`,'yellow');
      LogAdd(`2. 화면 좌측상단의 ⟳버튼을 눌러 [판매모드]로 전환하세요.`,'yellow');
      LogAdd(`3. ${CardPack[0].name} 아래에 판매 버튼을 누르세요.`,'yellow');
      LogAdd(`4. 사용하지 않는 카드는 판매하여 💰을 벌 수 있습니다.`,'yellow');
    }
  }
  if (Quest === 4) {
    if (playerCards[0].Lv >= 3) {
      QuestOk();
      CardInventory[0] += 1;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 ${CardPack[0].name} 1장`,'orange');
    } else {
      LogAdd(`[튜토리얼 4]`,'orange');
      LogAdd(`${CardPack[1].name} 레벨을 3 달성하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽의 카드를 누르세요.`,'yellow');
      LogAdd(`2. 화면 좌측상단의 ⟳버튼을 눌러 [교체모드]로 전환하세요.`,'yellow');
      LogAdd(`3. ${CardPack[1].name} 아래에 레벨업 버튼을 2번 누르세요.`,'yellow');
      LogAdd(`4. 동일한 카드는 레벨을 올려 전투력을 상승시킬 수 있습니다.`,'yellow');
      LogAdd(`5. 최대 레벨제한은 카드 왼쪽 상단에 노란색으로 표기되어 있습니다.`,'yellow');
      LogAdd(`6. 현재 이 카드는 최대 5레벨까지 올릴 수 있습니다.`,'yellow');
    }
  }
  if (Quest === 5) {
    if (CardStone[0].Cnt >= 1) {
      QuestOk();
      CardInventory[0] += 4;
      CardStone[0].Cnt += 3;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 ${CardPack[0].name} 4장, N급 강화석 3개`,'orange');
    } else {
      LogAdd(`[튜토리얼 5]`,'orange');
      LogAdd(`${CardPack[0].name}를 분해하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽의 카드를 누르세요.`,'yellow');
      LogAdd(`2. 화면 좌측상단의 ⟳버튼을 눌러 [분해모드]로 전환하세요.`,'yellow');
      LogAdd(`3. ${CardPack[0].name} 아래에 분해 버튼을 누르세요.`,'yellow');
      LogAdd(`4. 현재 카드보다 낮은 카드는 분해할 수 있습니다.`,'yellow');
      LogAdd(`5. 분해된 카드는 강화석으로 사용할 수 있습니다..`,'yellow');
    }
  }
  if (Quest === 6) {
    if (playerCards[0].Xp >= 4) {
      QuestOk();
      gold += 2000;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 2k💰`,'orange');
    } else {
      LogAdd(`[튜토리얼 6]`,'orange');
      LogAdd(`${CardPack[1].name}를 5번 강화하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽의 카드를 누르세요.`,'yellow');
      LogAdd(`2. 화면 좌측상단의 ⟳버튼을 눌러 [교체모드]로 전환하세요.`,'yellow');
      LogAdd(`3. ${CardPack[0].name} 아래에 강화 버튼을 4번 누르세요.`,'yellow');
      LogAdd(`4. 현재 카드보다 1단계 낮은 카드는 강화에 사용할 수 있습니다.`,'yellow');
      LogAdd(`5. 최대 강화 제한은 카드 왼쪽 상단에 빨간색으로 표기됩니다.`,'yellow');
      LogAdd(`6. 현재 이 카드는 최대 5강화까지 올릴 수 있습니다.`,'yellow');
      LogAdd(`7. 강화시 관련 강화석을 필요로 합니다.`,'gold');
    }
  }
  if (Quest === 7) {
    if (Goal >= 0) {
      QuestOk();
      gold += 3000;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 3k💰`,'orange');
    } else {
      LogAdd(`[튜토리얼 7]`,'orange');
      LogAdd(`적과 전투를 치르세요.`,'cyan');
      LogAdd(`1. 화면 오른쪽에 전투 버튼을 클릭하세요.`,'yellow');
      LogAdd(`2. 적을 무찌를때까지 전투를 진행할 수 있습니다.`,'yellow');
    }
  }
  if (Quest === 8) {
    if (playerCards[0].hp === playerCards[0].Mhp) {
      QuestOk();
      gold += 4000;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 4k💰`,'orange');
    } else {
      LogAdd(`[튜토리얼 8]`,'orange');
      LogAdd(`체력을 회복하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽에 회복 버튼을 클릭하세요.`,'yellow');
      LogAdd(`2. 체력1 당 10💰을 소모하여 회복됩니다.`,'yellow');
    }
  }
  if (Quest === 9) {
    if (gold < 4000) {
      QuestOk();
      gold += 10000;
      Diamond += 10;
      LogAdd(`튜토리얼 보상 - 10💎 10k💰`,'orange');
    } else {
      LogAdd(`[튜토리얼 9]`,'orange');
      LogAdd(`카드를 구매하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽에 상점 버튼을 클릭하세요.`,'yellow');
      LogAdd(`2. N~R급 카드(10+1) 구매 버튼을 클릭하세요.`,'yellow');
      LogAdd(`3. 10배 금액을 지불하게 되면 1개는 보너스로 획득이 가능합니다.`,'yellow');
    }
  }
  if (Quest === 10) {
    if (UpgAbil[0].Have === 1) {
      QuestOk();
      CardInventory[3] += 3;
      CardInventory[2] += 4;
      CardStone[0].Cnt += 12;
      Diamond += 10;
      LogAdd(`튜토리얼 완료 보상 - 10💎 F급 워리어 3장, F급 매지션 4장, F급 강화석 12개`,'orange');
    } else {
      LogAdd(`[튜토리얼 10]`,'orange');
      LogAdd(`업그레이드를 구매하세요.`,'cyan');
      LogAdd(`1. 화면 왼쪽에 업글 버튼을 클릭하세요.`,'yellow');
      LogAdd(`2. N~R급 구매 최소+1 을 클릭하세요.`,'yellow');
      LogAdd(`3. N~R급 카드 구매시 최소 ${CardPack[1].name}부터 등장하게 되며`,'yellow');
      LogAdd(` 더이상 ${CardPack[0].name}가 등장하지 않게 됩니다.`,'yellow');
    }
  }
  UIRendering();
}
function QuestOk() {
  if (Quest < 10) {
    LogAdd(`${Quest}번째 튜토리얼을 완료하였습니다.`,'lightblue');
  } else if (Quest === 10) {
    LogAdd(`튜토리얼을 모두 완료하였습니다. 축하드립니다.`,'lightblue');
  } else {
    LogAdd(`${Quest-10}번째 퀘스트를 완료하였습니다.`,'lightblue');
  }
  document.getElementById(`QuestBtn${Quest}`).classList.add('hidden');
  Quest += 1;
  document.getElementById(`QuestBtn${Quest}`).classList.remove('hidden');
  saveGame();
}
function QuestsM1() {
  if (Quest === 11) {
    if (Goal >= 4) {
      QuestOk();
      CardInventory[4] += 2;
      Diamond += 300;
      LogAdd(`퀘스트 완료 보상 - 300💎 ${CardPack[4].name} 2장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 1]`,'orange');
      LogAdd(`N급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 0 - ${CardPack[0].name}`,'yellow');
      LogAdd(`Tier 1 - ${CardPack[1].name}`,'yellow');
      LogAdd(`Tier 2 - ${CardPack[2].name}`,'yellow');
      LogAdd(`Tier 3 - ${CardPack[3].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[4].name}`,'yellow');
    }
  }
  if (Quest === 12) {
    if (Goal >= 9) {
      QuestOk();
      CardInventory[9] += 2;
      Diamond += 600;
      LogAdd(`퀘스트 완료 보상 - 600💎 ${CardPack[9].name} 2장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 2]`,'orange');
      LogAdd(`R급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 1 - ${CardPack[5].name}`,'yellow');
      LogAdd(`Tier 2 - ${CardPack[6].name}`,'yellow');
      LogAdd(`Tier 3 - ${CardPack[7].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[8].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[9].name}`,'yellow');
    }
  }
  if (Quest === 13) {
    if (Goal >= 14) {
      QuestOk();
      CardInventory[14] += 2;
      Diamond += 1000;
      LogAdd(`퀘스트 완료 보상 - 1000💎 ${CardPack[14].name} 2장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 3]`,'orange');
      LogAdd(`SR급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 1 - ${CardPack[10].name}`,'yellow');
      LogAdd(`Tier 2 - ${CardPack[11].name}`,'yellow');
      LogAdd(`Tier 3 - ${CardPack[12].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[13].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[14].name}`,'yellow');
    }
  }
  if (Quest === 14) {
    if (Goal >= 19) {
      QuestOk();
      CardInventory[19] += 2;
      Diamond += 2500;
      LogAdd(`퀘스트 완료 보상 - 2500💎 ${CardPack[19].name} 2장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 4]`,'orange');
      LogAdd(`SSR급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 2 - ${CardPack[15].name}`,'yellow');
      LogAdd(`Tier 3 - ${CardPack[16].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[17].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[18].name}`,'yellow');
      LogAdd(`Tier 6 - ${CardPack[19].name}`,'yellow');
    }
  }
  if (Quest === 15) {
    if (Goal >= 24) {
      QuestOk();
      CardInventory[24] += 2;
      Diamond += 5000;
      LogAdd(`퀘스트 완료 보상 - 5000💎 ${CardPack[24].name} 2장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 5]`,'orange');
      LogAdd(`UR급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 2 - ${CardPack[20].name}`,'yellow');
      LogAdd(`Tier 3 - ${CardPack[21].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[22].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[23].name}`,'yellow');
      LogAdd(`Tier 6 - ${CardPack[24].name}`,'yellow');
    }
  }
  if (Quest === 16) {
    if (Goal >= 29) {
      QuestOk();
      CardInventory[29] += 1;
      Diamond += 15000;
      LogAdd(`퀘스트 완료 보상 - 15000💎 ${CardPack[29].name} 1장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 6]`,'orange');
      LogAdd(`LR급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 3 - ${CardPack[25].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[26].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[27].name}`,'yellow');
      LogAdd(`Tier 6 - ${CardPack[28].name}`,'yellow');
      LogAdd(`Tier 7 - ${CardPack[29].name}`,'yellow');
    }
  }
  if (Quest === 17) {
    if (Goal >= 34) {
      QuestOk();
      CardInventory[34] += 1;
      Diamond += 30000;
      LogAdd(`퀘스트 완료 보상 - 30000💎 ${CardPack[34].name} 1장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 7]`,'orange');
      LogAdd(`GR급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 3 - ${CardPack[30].name}`,'yellow');
      LogAdd(`Tier 4 - ${CardPack[31].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[32].name}`,'yellow');
      LogAdd(`Tier 6 - ${CardPack[33].name}`,'yellow');
      LogAdd(`Tier 7 - ${CardPack[34].name}`,'yellow');
    }
  }
  if (Quest === 18) {
    if (Goal >= 39) {
      QuestOk();
      CardInventory[39] += 1;
      Diamond += 50000;
      LogAdd(`퀘스트 완료 보상 - 50000💎 ${CardPack[39].name} 1장`,'orange');
    } else {
      LogAdd(`[메인 퀘스트 8]`,'orange');
      LogAdd(`TR급 카드를 모두 처치하세요.`,'cyan');
      LogAdd(`Tier 4 - ${CardPack[35].name}`,'yellow');
      LogAdd(`Tier 5 - ${CardPack[36].name}`,'yellow');
      LogAdd(`Tier 6 - ${CardPack[37].name}`,'yellow');
      LogAdd(`Tier 7 - ${CardPack[38].name}`,'yellow');
      LogAdd(`Tier 8 - ${CardPack[39].name}`,'yellow');
    }
  }
  UIRendering();
}

function MaxLv(index) {
  if (index < 5) {
    return 5;
  } else if (index < 10) {
    return 10;
  } else if (index < 15) {
    return 15;
  } else if (index < 20) {
    return 20;
  } else if (index < 25) {
    return 30;
  } else if (index < 30) {
    return 40;
  } else if (index < 35) {
    return 50;
  } else {
    return 100;
  }
}

function MaxXp(index) {
  return MaxLv(index);
  // return Math.round((0.004 * index**3 + 1.25 * index**2 + 2.3 * index + 2))*5;
}
function CardDrop(index) {
  if (index < 2) {
    return 20;
  } else if (index < 4) {
    return 10;
  } else if (index < 6) {
    return 8;
  } else if (index < 8) {
    return 6;
  } else if (index < 10) {
    return 4;
  } else if (index < 12) {
    return 2;
  } else if (index < 15) {
    return 1;
  } else {
    return 0;
  }
  // return Math.round((0.004 * index**3 + 1.25 * index**2 + 2.3 * index + 2)/2)+1;
}

function StoneDrop() {
  if (UpgAbil[76].Have === 1) { return 100;
  } else if (UpgAbil[75].Have === 1) { return 50;
  } else if (UpgAbil[74].Have === 1) { return 25;
  } else if (UpgAbil[73].Have === 1) { return 15;
  } else if (UpgAbil[72].Have === 1) { return 10;
  } else if (UpgAbil[71].Have === 1) { return 5;
  } else if (UpgAbil[70].Have === 1) { return 3;
  } else if (UpgAbil[69].Have === 1) { return 1;
  }
}

function StoneTierDrop(index) {
  if (index < 5) { //N
    return 20;
  } else if (index < 10) { //R
    return 10;
  } else if (index < 15) { //SR
    return 8;
  } else if (index < 20) { //SSR
    return 6;
  } else if (index < 25) { //UR
    return 4;
  } else if (index < 30) { //LR
    return 2;
  } else if (index < 35) { //GR
    return 1;
  } else { //TR
    return 0;
  }
  // return Math.round((0.004 * index**3 + 1.25 * index**2 + 2.3 * index + 2)/2)+1;
}

function DiaDrop(index) {
  if (index < 5) { //N
    return 1;
  } else if (index < 10) { //R
    return 2;
  } else if (index < 15) { //SR
    return 3;
  } else if (index < 20) { //SSR
    return 4;
  } else if (index < 25) { //UR
    return 5;
  } else if (index < 30) { //LR
    return 6;
  } else if (index < 35) { //GR
    return 8;
  } else { //TR
    return 10;
  }
}

function OfflineMax() {
  if (UpgAbil[83].Have === 1) { return 25200;
  } else if (UpgAbil[82].Have === 1) { return 21600;
  } else if (UpgAbil[81].Have === 1) { return 18000;
  } else if (UpgAbil[80].Have === 1) { return 14400;
  } else if (UpgAbil[79].Have === 1) { return 10800;
  } else if (UpgAbil[78].Have === 1) { return 7200;
  } else if (UpgAbil[77].Have === 1) { return 3600;
  } else { return 600;
  }
}
function OfflineGold() {
  if (UpgAbil[90].Have === 1) { return 20;
  } else if (UpgAbil[89].Have === 1) { return 15;
  } else if (UpgAbil[88].Have === 1) { return 10;
  } else if (UpgAbil[87].Have === 1) { return 8;
  } else if (UpgAbil[86].Have === 1) { return 6;
  } else if (UpgAbil[85].Have === 1) { return 4;
  } else if (UpgAbil[84].Have === 1) { return 2;
  } else { return 1;
  }
}

function IndexCnt(index) {
  if (index < 15) {
    return 2;
  } else if (index < 25) {
    return 3;
  } else if (index < 30) {
    return 4;
  } else {
    return 5;
  }
}
function ReqCost(index) {
  let cost = (index + 1) * 200;
  if (index>5) cost *= 2;
  if (index>10) cost *= 3;
  if (index>15) cost *= 4;
  if (index>20) cost *= 5;
  if (index>25) cost *= 6;
  if (index>30) cost *= 8;
  if (index>35) cost *= 10;
  return cost;
}

function SellCost(index) {
  if (index < 5) {
    return (index+1) * 100;
  } else if (index < 10) {
    return (index+1) * 300;
  } else if (index < 15) {
    return (index+1) * 1000;
  } else if (index < 20) {
    return (index+1) * 3000;
  } else if (index < 25) {
    return (index+1) * 10000;
  } else if (index < 30) {
    return (index+1) * 30000;
  } else if (index < 35) {
    return (index+1) * 100000;
  } else {
    return (index+1) * 300000;
  }
}

function RewardGold(Cod,A) {
  // 부드러운 증가를 위한 곡선 함수
  // 리워드 = 기본값 * (1 + 계수 * Cod^지수)
  
  const baseReward = 200;
  const scale = 0.15; // 증가율 계수 (값 조절 가능)
  const exponent = 2.25; // 2 이상이면 급격한 성장. 2~2.5 사이 추천

  let reward = baseReward * (1 + Cod + scale * Math.pow(Cod, exponent));
  if (Cod >= 5) reward *= 1.15;
  if (Cod >= 10) reward *= 1.25;
  if (Cod >= 15) reward *= 1.5;
  if (Cod >= 20) reward *= 2;
  if (Cod >= 25) reward *= 2;
  if (Cod >= 30) reward *= 2;
  if (Cod >= 35) reward *= 2;
  if (UpgAbil[8].Have === 1) reward *= 1.25;
  if (UpgAbil[9].Have === 1) reward *= 1.25;
  if (UpgAbil[10].Have === 1) reward *= 1.25;
  if (UpgAbil[32].Have === 1) reward *= 1.5;
  if (UpgAbil[33].Have === 1) reward *= 1.5;
  if (UpgAbil[34].Have === 1) reward *= 1.5;
  
  // ±5% 랜덤 변동 적용
  const randomFactor = 1 + (Math.random() * 0.1 - 0.05); // 0.95 ~ 1.05 사이
  if (A === 0) reward *= randomFactor;

  return Math.round(reward);
}

function toggleGuideContent(headerElement) {
  const content = headerElement.nextElementSibling;
  const icon = headerElement.querySelector('.toggle-icon');

  if (!content || !icon) return;

  const isHidden = content.style.display === 'none' || content.style.display === '';

  content.style.display = isHidden ? 'block' : 'none';
  icon.textContent = isHidden ? '🔼' : '🔽';
}

//카드 교체
let pendingCardIndex = null;

function confirmCardChange(confirm) {
  document.getElementById("card-confirm-overlay").style.display = "none";

  if (confirm && pendingCardIndex !== null) {
    const Cod = playerCards[0].Cod;
    const GivMhp = Math.floor((playerCards[0].Mhp - CardPack[Cod].Mhp)/1.25);
    const Givatk = Math.floor((playerCards[0].atk - CardPack[Cod].atk)/1.25);
    playerCards = [{ ...CardPack[pendingCardIndex], Cod: pendingCardIndex }];
    CardInventory[pendingCardIndex] -= 1;
    playerCards[0].Mhp += GivMhp;
    playerCards[0].atk += Givatk;
    LogAdd(`상위 카드로 교체됩니다.`, 'lime');
  } else {
    LogAdd(`카드 교체가 취소되었습니다.`, 'gray');
  }

  pendingCardIndex = null;
  UIRendering();
  saveGame();
}
function InCard(index) {
  let Cde = playerCards[0].Cod;
  let Cxp = playerCards[0].Xp;
  const autoBuyBtn = document.getElementById('AutoBuy');
  if (Cde < index) {
    // 교체 여부 사용자 확인
    const GivMhp = Math.floor((playerCards[0].Mhp - CardPack[Cde].Mhp)/1.25);
    const Givatk = Math.floor((playerCards[0].atk - CardPack[Cde].atk)/1.25);
    const CLv = playerCards[0].Lv;
    const Cxp = playerCards[0].Xp;

    if (option[8].opt === true) {
      if (option[1].opt === true) {
        document.getElementById("card-confirm-text").innerHTML = 
        `❤️ ${numk(playerCards[0].Mhp)} > ${numk(CardPack[index].Mhp+GivMhp)}
        (${numk(CardPack[index].Mhp)} + ${numk(GivMhp)}) [${numk((CardPack[index].Mhp+GivMhp)-playerCards[0].Mhp)}]<br>
        🗡️ ${numk(playerCards[0].atk)} > ${numk(CardPack[index].atk+Givatk)}
        (${numk(CardPack[index].atk)} + ${numk(Givatk)}) [${numk((CardPack[index].atk+Givatk)-playerCards[0].atk)}]<br>
        🛡️ ${numk(playerCards[0].def)} > ${numk(CardPack[index].def)}
        (${numk(CardPack[index].def)})<br>
        Tier ${Cde} > ${index}<br>
        Lv ${CLv} / ${MaxLv(Cde)}<br>
        강화 ${Cxp} / ${MaxXp(Cde)}<br>
        카드 "${CardPack[index].name}"(으)로 교체`;
      } else {
        document.getElementById("card-confirm-text").innerHTML = 
        `❤️ ${numk(playerCards[0].Mhp)} > ${numk(CardPack[index].Mhp+GivMhp+MaxBonusMhp)}
        [${numk((CardPack[index].Mhp+GivMhp+MaxBonusMhp)-playerCards[0].Mhp)}]<br>
        🗡️ ${numk(playerCards[0].atk)} > ${numk(CardPack[index].atk+Givatk+MaxBonusAtk)}
        [${numk((CardPack[index].atk+Givatk+MaxBonusAtk)-playerCards[0].atk)}]<br>
        🛡️ ${numk(playerCards[0].def)} > ${numk(CardPack[index].def)}
        <br>
        Tier ${Cde} > ${index}<br>
        Lv ${CLv} / ${MaxLv(Cde)}<br>
        강화 ${Cxp} / ${MaxXp(Cde)}<br>
        카드 "${CardPack[index].name}"(으)로 교체`;
      }
      pendingCardIndex = index;
      document.getElementById("card-confirm-overlay").style.display = "flex";
    } else {//경고없이 즉시 교체.
      const Cod = playerCards[0].Cod;
      const GivMhp = Math.floor((playerCards[0].Mhp - CardPack[Cod].Mhp)/1.25);
      const Givatk = Math.floor((playerCards[0].atk - CardPack[Cod].atk)/1.25);
      playerCards = [{ ...CardPack[index], Cod: index }];
      CardInventory[index] -= 1;
      playerCards[0].Mhp += GivMhp;
      playerCards[0].atk += Givatk;
      LogAdd(`상위 카드로 교체됩니다.`, 'lime');
    }

    // const userConfirmed = window.confirm(confirmMsg);
  } else if (Cde === index) {
    let currentLv = playerCards[0].Lv;
    let maxLv = MaxLv(Cde);
    let cardCount = CardInventory[index];
    // 단일 or 일괄 업그레이드를 위한 업그레이드 가능한 수 계산
    let upgradableCount = autoBuyBtn.classList.contains('Active')
      ? Math.min(maxLv - currentLv, cardCount)
      : (currentLv < maxLv && cardCount > 0 ? 1 : 0);
      
    if (upgradableCount > 0) {
      playerCards[0].Lv += upgradableCount;
      CardInventory[index] -= upgradableCount;
      CardLevelUp(index, upgradableCount); // count 인자 없으면 그냥 반복 호출하거나 생략

      if (upgradableCount === 1) {
        LogAdd(`동일 카드를 사용하여 레벨업 재료로 사용합니다.`, 'lime');
      } else {
        LogAdd(`동일 카드를 ${upgradableCount}장 사용하여 레벨 ${currentLv} → ${playerCards[0].Lv}로 올립니다.`, 'lime');
      }
      // 한계 돌파 처리
      if (playerCards[0].Lv === maxLv && playerCards[0].Xp === MaxXp(Cde)) {
        LogAdd(`Card Limit Level Up`, 'red');
        LogAdd(`Card Limit Level Up`, 'yellow');
        LogAdd(`Card Limit Level Up`, 'blue');
        LogAdd(`${CardPack[Cde].name}을 한계까지 강화하였습니다.`, 'gold');
        CardInventory[Cde + 1] += 1;
        CardMax[Cde] = 1;
        LogAdd(`${CardPack[Cde + 1].name} 카드 1장을 보너스로 받습니다.`, 'gold');
      } else if (playerCards[0].Lv === maxLv) {
        LogAdd(`${CardPack[Cde].name}가 만렙에 도달하였습니다.`, 'gold');
      }
      // 만렙 보너스
      if (playerCards[0].Lv === maxLv) {
        playerCards[0].def += 1;
        LogAdd(`${CardPack[Cde].name} 만렙 달성 기념 방어율+1%`, 'gold');
      }
    } else {
      LogAdd(`카드 수량이 부족하거나 이미 최대 레벨입니다.`, 'red');
    }
  } else if (Cde === index+1) {
    const Tier = CardPack[Cde].tier;
    let Cnts = Math.max(1, CardPack[Cde].grade); // 최소 1
    if (Cnts >= 3) Cnts = 3;
    let attempts = 1;

    // 자동 강화 시 최대 10회 제한
    if (autoBuyBtn.classList.contains('Active')) {
      const maxByXp = MaxXp(Cde) - playerCards[0].Xp;
      const maxByCard = CardInventory[index];
      const maxByStone = Math.floor(CardStone[Tier].Cnt / Cnts);
      attempts = Math.min(maxByXp, maxByCard, maxByStone, 10);
    }

    for (let i = 0; i < attempts; i++) {
      const Fail = playerCards[0].Xp - 4;
      const rand = Math.random() * 100;

      if (playerCards[0].Xp >= MaxXp(Cde)) {
        LogAdd(`더이상 강화할 수 없습니다.`, 'red');
        break;
      }
      if (CardStone[Tier].Cnt < Cnts) {
        LogAdd(`${TIERS[Tier]}급 강화석이 부족합니다.`, 'red');
        break;
      }

      if (CardInventory[index] < 1) {
        LogAdd(`${CardPack[index].name} 카드가 부족합니다.`, 'red');
        break;
      }
      CardStone[Tier].Cnt -= Cnts;
      CardInventory[index] -= 1;

        if (Fail < rand) {
          playerCards[0].Xp += 1;
          CardLevelUp(index,1);
          LogAdd(`1단계 낮은 카드를 사용하여 일부 능력치가 상승합니다.`, 'lime');
    
          if (playerCards[0].Lv === MaxLv(Cde) && playerCards[0].Xp === MaxXp(Cde)) {
            LogAdd(`Card Limit Level Up`, 'red');
            LogAdd(`Card Limit Level Up`, 'yellow');
            LogAdd(`Card Limit Level Up`, 'blue');
            LogAdd(`${CardPack[Cde].name}을 한계까지 강화하였습니다.`, 'gold');
            CardInventory[Cde + 1] += 1;
            CardMax[Cde] = 1;
            LogAdd(`${CardPack[Cde + 1].name} 카드 1장을 보너스로 받습니다.`, 'gold');
          } else if (playerCards[0].Xp === MaxXp(Cde)) {
            LogAdd(`${CardPack[Cde].name}의 강화가 한계에 도달하였습니다.`, 'gold');
          }
          if (playerCards[0].Xp === MaxXp(Cde)) {
            playerCards[0].def += 1;
            LogAdd(`${CardPack[Cde].name} 최대 강화 달성 기념 방어율+1%`, 'gold');
          }
        } else {
          LogAdd(`${Fail}% 확률로 강화에 실패하였습니다.`, 'red');
          LogAdd(`${CardPack[index].name} 카드 1장을 잃었습니다.`, 'orange');
          LogAdd(`${TIERS[Tier]}급 강화석 ${Cnts}개를 잃었습니다.`, 'orange');
        }
    }
  } else {
    LogAdd(`2단계 이하로 낮은 카드는 도움이 되지 못합니다.`,'red');
  }
  UIRendering();
  saveGame();
}

function CardLevelUp(index,Cnt) {
  let Upatk;
  let UpMhp;
  if (index < 5) {
    Upatk = Math.floor(CardPack[index].atk/3);
    UpMhp = Math.floor(CardPack[index].Mhp/3);
  } else if (index < 10) {
    Upatk = Math.floor(CardPack[index].atk/4);
    UpMhp = Math.floor(CardPack[index].Mhp/4);
  } else if (index < 15) {
    Upatk = Math.floor(CardPack[index].atk/6);
    UpMhp = Math.floor(CardPack[index].Mhp/6);
  } else if (index < 20) {
    Upatk = Math.floor(CardPack[index].atk/8);
    UpMhp = Math.floor(CardPack[index].Mhp/8);
  } else if (index < 25) {
    Upatk = Math.floor(CardPack[index].atk/10);
    UpMhp = Math.floor(CardPack[index].Mhp/10);
  } else if (index < 30) {
    Upatk = Math.floor(CardPack[index].atk/12);
    UpMhp = Math.floor(CardPack[index].Mhp/12);
  } else if (index < 35) {
    Upatk = Math.floor(CardPack[index].atk/15);
    UpMhp = Math.floor(CardPack[index].Mhp/15);
  } else {
    Upatk = Math.floor(CardPack[index].atk/20);
    UpMhp = Math.floor(CardPack[index].Mhp/20);
  }
  if (Upatk < 1) Upatk = 1;
  if (UpMhp < 1) UpMhp = 1;
  Upatk *= Cnt;
  UpMhp *= Cnt;
  playerCards[0].atk += Upatk;
  playerCards[0].Mhp += UpMhp;
  LogAdd(`공격력 +${numk(Upatk)}`,'lime');
  LogAdd(`체력 +${numk(UpMhp)}`,'lime');

  let successCount = 0;
  for (let i = 0; i < Cnt; i++) {
    const rand = Math.random() * 100;
    if (rand < 10) {
      playerCards[0].def += 1;
      successCount++;
    }
  }
  if (successCount > 0) LogAdd(`10% 확률로 방어율 +1% → 총 ${successCount}회 성공`, 'gold');
}


function HealReqGold() {
  if (UpgAbil[31].Have === 1) {
    return 0;
  } else if (UpgAbil[30].Have === 1) {
    return 1;
  } else if (UpgAbil[29].Have === 1) {
    return 2;
  } else if (UpgAbil[28].Have === 1) {
    return 3;
  } else if (UpgAbil[27].Have === 1) {
    return 4;
  } else {
    return 5;
  }
}

function AutoBuy() {
  const autoBuyBtn = document.getElementById('AutoBuy');
  autoBuyBtn.classList.toggle('Active');
  UIRendering();
}


function Fusion(index,Count) {
  let cost = ReqCost(index)*Count;
  let Cnt = IndexCnt(index)*Count;

  if (CardInventory[index] < Cnt) {
    LogAdd(`합성하려면 카드가 ${Cnt}장 이상 있어야 합니다.`, 'red');
    return;
  }

  if (gold < cost) {
    LogAdd(`${numk(cost)}💰 필요!`, 'red');
    return;
  }

  CardInventory[index] -= Cnt;
  gold -= cost;

  if (index + 1 < CardInventory.length) {
    CardInventory[index + 1] += Count;
  } else {
    LogAdd('더 이상 상위 카드가 없습니다!', 'red');
  }

  UIRendering();
  saveGame();
  LogAdd(`합성 성공! 카드 ${numk(Cnt)}장과 ${numk(cost)}💰가 소모되고, '${CardPack[index+1].name}' 카드가 ${Count}장 추가되었습니다.`, 'lime');
}


function AllHeal(A) {
  const player = playerCards[0];
  const enemy = enemyCards[0];
  const RowHp = (player.Mhp - player.hp);
  const ReqGod = RowHp*HealReqGold();
  if (ReqGod <= 0) {
      LogAdd(`이미 체력이 가득한 상태입니다.`,'orange');
  } else {
  if (A === 1 && ReqGod > 0) {
    if (gold >= ReqGod) {
      gold -= ReqGod;
      player.hp = player.Mhp;
      if (ReqGod > 0 && option[10].opt === true) LogAdd(`${numk(ReqGod)}💰를 소모하여 체력을 회복합니다.(Hp${numk(RowHp)} x ${HealReqGold()})`,'lime');
    } else if (gold >= HealReqGold()) {
      let UpHealth = Math.floor(gold/HealReqGold());
      player.hp += UpHealth;
      gold -= (UpHealth*HealReqGold());
      if (option[10].opt === true) LogAdd(`${numk(UpHealth*HealReqGold())}💰가 소모하여 최대한 체력을 회복하였습니다.(Hp${numk(UpHealth)} x ${HealReqGold()})`,'lightgreen');
    }
    if (Goal < enemy.Cod) {
      enemy.hp = enemy.Mhp;
    }
  }
  if (A === 0) {
    player.hp = player.Mhp;
    LogAdd(`체력 회복`,'lime');
  }
  }
  UIRendering();
  saveGame();
}
function Respawn(A) {
  let Cde = enemyCards[0].Cod;
  // LogAdd(Cde + ' ' + A + ' ' + Goal);
  if (A === 1) {//상위
    if (Cde < Goal+1) {
      Cde += 1;
      if (option[2].opt === true) LogAdd(`Tier ${Cde} '${CardPack[Cde].name}' 등장!`, 'orange');
    } else {
      if (option[2].opt === true) LogAdd(`Tier ${Cde} '${CardPack[Cde].name}' 재 전투!`, 'lightgray');
    }
  } else if (A === 2) {//하위
    if (Cde !== 0) {
      Cde -= 1;
      if (option[2].opt === true) LogAdd(`Tier ${Cde} '${CardPack[Cde].name}' 등장!`, 'gold');
    } else {
      if (option[2].opt === true) LogAdd(`Tier ${Cde} '${CardPack[Cde].name}' 재 전투!`, 'lightgray');
    }
  } else {
    if (option[2].opt === true) LogAdd(`Tier ${Cde} '${CardPack[Cde].name}' 재 전투!`, 'lightgray');
  }

  enemyCards[0] = { ...CardPack[Cde], Cod: Cde };
  enemyCards[0].hp = enemyCards[0].Mhp;
  UIRendering();
}

function BuyCard(T) {
  const autoBuyBtn = document.getElementById('AutoBuy');
  let ReqGold, CardMin, CardMax, times,ReqDia;
  
  const baseT = T % 10;        // 기본 티어: 1, 2, 3
  const isBonus = T >= 10;     // 10+1 여부
  times = isBonus ? 11 : 1;    // 몇 장 뽑을지

  if (baseT === 1) {
      ReqGold = 1000;
      ReqDia = 100;
      if (UpgAbil[2].Have === 1) {
        ReqGold -= 100;
      }
      if (UpgAbil[3].Have === 1) {
        ReqGold -= 200;
      }
      CardMin = 0;
      if (UpgAbil[0].Have === 1) {
        CardMin += 1;
      }
      if (UpgAbil[1].Have === 1) {
        CardMin += 1;
      }
  } else if (baseT === 2) {
      ReqGold = 10000;
      ReqDia = 200;
      if (UpgAbil[6].Have === 1) {
        ReqGold -= 1000;
      }
      if (UpgAbil[7].Have === 1) {
        ReqGold -= 2000;
      }
      CardMin = 6;
      if (UpgAbil[4].Have === 1) {
        CardMin += 1;
      }
      if (UpgAbil[5].Have === 1) {
        CardMin += 1;
      }
  } else if (baseT === 3) {
      ReqGold = 100000;
      ReqDia = 300;
      if (UpgAbil[21].Have === 1) {
        ReqGold -= 10000;
      }
      if (UpgAbil[22].Have === 1) {
        ReqGold -= 20000;
      }
      CardMin = 11;
      if (UpgAbil[19].Have === 1) {
        CardMin += 1;
      }
      if (UpgAbil[20].Have === 1) {
        CardMin += 1;
      }
  } else if (baseT === 4) {
      ReqGold = 1000000;
      ReqDia = 400;
      if (UpgAbil[25].Have === 1) {
        ReqGold -= 100000;
      }
      if (UpgAbil[26].Have === 1) {
        ReqGold -= 200000;
      }
      CardMin = 16;
      if (UpgAbil[23].Have === 1) {
        CardMin += 1;
      }
      if (UpgAbil[24].Have === 1) {
        CardMin += 1;
      }
    } else if (baseT === 5) {
        ReqGold = 10000000;
        ReqDia = 500;
        if (UpgAbil[37].Have === 1) {
          ReqGold -= 1000000;
        }
        if (UpgAbil[38].Have === 1) {
          ReqGold -= 2000000;
        }
        CardMin = 21;
        if (UpgAbil[35].Have === 1) {
          CardMin += 1;
        }
        if (UpgAbil[36].Have === 1) {
          CardMin += 1;
        }
  } else {
    LogAdd('잘못된 구매 타입입니다.', 'red');
    return;
  }
  CardMax = CardMin + 4;

  const TotalCost = ReqGold * (isBonus ? 10 : 1); // 10+1은 10배 가격
  const gainedCards = []; // 획득 카드 저장
  // 단일 구매 로직
  function doBuyOnce() {
    if (T < 20) {
      if (gold < TotalCost) {
        LogAdd(`${numk(TotalCost)}💰 필요!`, 'red');
        autoBuyBtn.classList.remove('Active');
        saveGame();
        return false;
      }
      gold -= TotalCost;
    } else {
      if (Diamond < ReqDia) {
        LogAdd(`${numk(ReqDia)}💎 필요!`, 'red');
        autoBuyBtn.classList.remove('Active');
        saveGame();
        return false;
      }
      Diamond -= ReqDia;
      times = 21;

    }
    for (let i = 0; i < times; i++) {
      let probabilities = [
        { offset: 4, prob: 0.01 },
        { offset: 3, prob: 0.05 },
        { offset: 2, prob: 0.19 },
        { offset: 1, prob: 0.30 },
        { offset: 0, prob: 0.45 }
      ];
      if (times > 20) {
        probabilities = [
        { offset: 4, prob: 0.10 },
        { offset: 3, prob: 0.15 },
        { offset: 2, prob: 0.20 },
        { offset: 1, prob: 0.25 },
        { offset: 0, prob: 0.30 }
      ];
      }
      const validProbs = probabilities.filter(p => (CardMin + p.offset) <= CardMax);
      const totalProb = validProbs.reduce((sum, p) => sum + p.prob, 0);
      const normProbs = validProbs.map(p => ({ offset: p.offset, prob: p.prob / totalProb }));

      const rand = Math.random();
      let cumulative = 0;
      let selectedOffset = 0;

      for (const p of normProbs) {
        cumulative += p.prob;
        if (rand <= cumulative) {
          selectedOffset = p.offset;
          break;
        }
      }

      const selectedIndex = CardMin + selectedOffset;
      CardInventory[selectedIndex] = (CardInventory[selectedIndex] || 0) + 1;

      let message = `Tier ${selectedIndex} - [${CardPack[selectedIndex].name}] 카드를 획득했습니다!`;
      gainedCards.push({ index: selectedIndex, rarity: selectedOffset });

      if (times === 11 && i === 10) {
        message = 'Bonus! ' + message;
      } else if (times === 11) {
        message = (i+1) + ' - ' + message;
      }
      LogAdd(message, 'lime');
    }
    if (!autoBuyBtn.classList.contains('Active')) {
      showCardPopup(gainedCards);
    }
    UIRendering();
    return true;
  }

  const success = doBuyOnce();

  if (success && autoBuyBtn.classList.contains('Active')) {
    function autoLoop() {
      if (!autoBuyBtn.classList.contains('Active')) return;
      const next = doBuyOnce();
      if (next) {
        setTimeout(autoLoop, 50);
      }
    }
    setTimeout(autoLoop, 50);
  }

  saveGame();
}
function showCardPopup(cards) {
  const popup = document.getElementById('cardPopup');
  const container = document.getElementById('cardContainer');
  const closeBtn = document.getElementById('closePopup');

  container.innerHTML = ''; // 초기화

  cards.forEach((card, i) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-anim';
    cardDiv.style.backgroundImage = `url('img/t${card.index}.webp')`;

    // 카드 이름 요소 추가
    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'card-title2';

    const title = document.createElement('h4');
    title.textContent = CardPack[card.index].name;
    
    titleWrapper.appendChild(title);
    cardDiv.appendChild(titleWrapper);


    // 희귀도에 따른 클래스 추가
    if (card.rarity >= 1) {
      cardDiv.classList.add(`rarity-${card.rarity}`);
    }

    // 애니메이션 딜레이
    cardDiv.style.animationDelay = `${i * 0.1}s`;
    container.appendChild(cardDiv);
  });

  popup.classList.remove('hidden');

  closeBtn.onclick = () => {
    popup.classList.add('hidden');
    container.innerHTML = '';
  };
}



function SellStone(A,Val) {
  const autoBuyBtn = document.getElementById('AutoBuy');
  if (CardStone[A].Cnt >= 1) {
    if (autoBuyBtn.classList.contains('Active')) {
      const Cnt = CardStone[A].Cnt;
      CardStone[A].Cnt = 0;
      gold += Val * Cnt;
      LogAdd(`${TIERS[A]}급 강화석을 ${numk(Cnt)}개 전부 판매하여 ${numk(Val*Cnt)}💰원을 얻습니다..`,'lime');
    } else {
      CardStone[A].Cnt -= 1;
      gold += Val;
      LogAdd(`${TIERS[A]}급 강화석을 판매하여 ${numk(Val)}💰원을 얻습니다..`,'lime');
    }
  } else {
    LogAdd(`판매할 강화석이 없습니다.`,'red');
  }
  UIRendering();
  saveGame();
}

function StoneUp(A) {
  const autoBuyBtn = document.getElementById('AutoBuy');
  if (CardStone[A].Cnt >= 3 && CardStone[A+1].Cnt >= 1) {
    if (autoBuyBtn.classList.contains('Active')) {
      let Cnts = Math.floor(CardStone[A].Cnt/3);
      CardStone[A].Cnt -= (Cnts*3);
      CardStone[A+1].Cnt += Cnts;
      LogAdd(`${TIERS[A]}급 강화석 ${numk(Cnts*3)}개를 조합하여 ${TIERS[A+1]}급 강화석 ${numk(Cnts)}개를 얻습니다.`,'lime');
    } else {
      CardStone[A].Cnt -= 3;
      CardStone[A+1].Cnt += 1;
      LogAdd(`${TIERS[A]}급 강화석 3개를 조합하여 ${TIERS[A+1]}급 강화석 1개를 얻습니다.`,'lime');
    }
  } else {
    LogAdd(`조합하는데 재료가 부족합니다.`,'red');
  }
  UIRendering();
  saveGame();
}

function animateAttack(cardElement, A) {
  return new Promise((resolve) => {
    if (!cardElement) return resolve();

    const className = `attack-animation${A}`;
    cardElement.classList.remove(className);
    void cardElement.offsetWidth; // 강제 리플로우

    cardElement.classList.add(className);
    // LogAdd(className);
    setTimeout(() => {
      cardElement.classList.remove(className);
      resolve();
    }, 500);
  });
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let stopAutoAttack = true;

async function AutoAttack() {
  document.getElementById('AtkBtn').classList.add('hidden');
  const AutoBtn = document.querySelector('#AutoBtn');
  let Spd,Per;
  let AutoAttackCnt = 100;
  if (UpgAbil[11].Have === 0) {
    LogAdd('자동전투 업그레이드를 구매하세요.','red');
    document.getElementById('AtkBtn').classList.remove('hidden');
    return;
  }
  if (UpgAbil[17].Have === 1) {
    Spd = 200;
    Per = 5;
    AutoAttackCnt = 9999;
  } else if (UpgAbil[16].Have === 1) {
    Spd = 250;
    Per = 4;
    AutoAttackCnt = 6000;
  } else if (UpgAbil[15].Have === 1) {
    Spd = 333;
    Per = 3;
    AutoAttackCnt = 3000;
  } else if (UpgAbil[14].Have === 1) {
    Spd = 500;
    Per = 2;
    AutoAttackCnt = 1500;
  } else if (UpgAbil[13].Have === 1) {
    Spd = 666;
    Per = 1.5;
    AutoAttackCnt = 800;
  } else if (UpgAbil[12].Have === 1) {
    Spd = 800;
    Per = 1.25;
    AutoAttackCnt = 400;
  } else if (UpgAbil[11].Have === 1) {
    Spd = 1000;
    Per = 1;
    AutoAttackCnt = 200;
  }
  stopAutoAttack = !stopAutoAttack;

  while (AutoAttackCnt > 0) {
    AutoAttackCnt--;
    AutoBtn.innerHTML = `Auto<br>${AutoAttackCnt}`;
    if (stopAutoAttack) {
      // stopAutoAttack = !stopAutoAttack;
      LogAdd('자동전투 수동 종료', 'orange');
      document.getElementById('AtkBtn').classList.remove('hidden');
      break;
    }
    const player = playerCards[0];
    const enemy = enemyCards[0];
    if ((enemy.atk*1.2) >= player.hp+MaxBonusMhp) {
      stopAutoAttack = true;
      LogAdd('자동전투 종료', 'red');
      document.getElementById('AtkBtn').classList.remove('hidden');
      break;
    }

    Attack(1); // 실제 전투 처리
    if (option[13].opt === true) LogAdd(`자동전투 ${Per}배속 진행중.. (남은 횟수 ${AutoAttackCnt})`, 'lightblue');
    await sleep(Spd); // 0.5초 딜레이
  }
}

function AttackRange(atk) {
  if (atk >= 10) {
    return Math.round(atk * (1 + (Math.random() * 0.2 - 0.1)));
  } else {
    return atk + (Math.floor(Math.random() * 3) - 1);
  }
}

function AttackRangeText(atk) {
  if (atk >= 10) {
    // ±10% 변동 → 반올림
    const min = Math.round(atk * 0.9);
    const max = Math.round(atk * 1.1);
    return `${numk(min)}~${numk(max)}`;
  } else {
    // ±1 변동
    const min = atk - 1;
    const max = atk + 1;
    return `${min}~${max}`;
  }
}

async function Attack(A) {
  if (playerCards.length === 0 || enemyCards.length === 0) {
    LogAdd('전투할 카드가 없습니다!', 'red');
    return;
  }
  const player = playerCards[0];
  const enemy = enemyCards[0];

  if (player.hp + MaxBonusMhp <= 0) {
    LogAdd('당신은 죽었습니다.', 'red');
    return;
  }
  if (A === 0 ) document.getElementById('AtkBtn').classList.add('hidden');

  const playerCardEl = document.querySelector('.player .card');
  const enemyCardEl = document.querySelector('.enemy .card');

  // 1. 적 공격 (반격)
  // let Edmg = AttackRange(enemy.atk) - (player.def + MaxBonusDef);
  let Edmg =  Math.floor(AttackRange(enemy.atk) * ((1 - player.def / 100) * (1 - MaxBonusDef / 100)));
  
  if (option[12].opt === true) {
    if (MaxBonusDef > 0) {
      const totalDefRate = 1 - ((1 - player.def / 100) * (1 - MaxBonusDef / 100));
      const defPercent = Math.round(totalDefRate * 100);
      LogAdd(`적의 공격을 ${defPercent}% 피해 감소 (기본 방어력 ${player.def}%, 보너스 ${MaxBonusDef}%)`, 'gold');
    } else if (player.def > 0) {
      LogAdd(`적의 공격을 ${player.def}% 방어율로 일부 가드`,'gold');
    }
  }
  
  if (Edmg < 0) Edmg = 0;
  player.hp -= Edmg;

  // if (player.hp < 0) player.hp = 0;

  if (option[3].opt === true) {
    if (A === 0 ) {
      if (player.def > 0 && Edmg === 0) {
        LogAdd(`적 ${enemy.name}의 공격은 ${player.name}의 방어력에 의해 상쇄되었다!`, 'lightgreen');
      } else {
        LogAdd(`적 ${enemy.name}(이)가 ${player.name}에게 ${Edmg}의 공격!`, 'darkorange');
      }
    }
  }
if (A === 0 && option[5].opt === true) await animateAttack(enemyCardEl, 1);  // 애니메이션 끝날 때까지 기다림

  // 4. 플레이어 사망 처리
  if (player.hp + MaxBonusMhp <= 0) {
    LogAdd(`${player.name} 사망! 가진 💰의 15%를 잃습니다.`, 'red');
    gold = Math.floor(gold * 0.85);
    saveGame();
  } else {
      // 2. 플레이어 공격
      // let Pdmg = AttackRange(player.atk + MaxBonusAtk) - enemy.def;
      let Pdmg = Math.floor(AttackRange(player.atk + MaxBonusAtk) * (1 - enemy.def / 100));
      if (enemy.def > 0 && option[12].opt === true) {
        LogAdd(`적이 내 공격을 ${enemy.def}% 방어율로 일부 가드`,'gold');
      }
      if (Pdmg < 0) Pdmg = 0;
      enemy.hp -= Pdmg;
      if (enemy.hp < 0) enemy.hp = 0;
      
      if (option[4].opt === true) {
        if (A === 0 ) {
          if (enemy.def > 0 && Pdmg === 0) {
            LogAdd(`${player.name}의 공격은 적 ${enemy.name}의 방어력에 의해 상쇄되었다!`, 'red');
          } else {
            LogAdd(`${player.name}(이)가 적 ${enemy.name}에게 ${Pdmg}의 공격!`, 'lime');
          }
        }
      }
        if (A === 0 && option[5].opt === true) await animateAttack(playerCardEl, 2);  // 애니메이션 끝날 때까지 기다림
      // 3. 적 사망 처리
      if (enemy.hp <= 0) {
        CardKill[enemy.Cod] += 1;
        if (option[14].opt === true) LogAdd(`${enemy.name} ${CardKill[enemy.Cod]}번째 처치!`, 'yellow');
        KillCount();
        const reward = RewardGold(enemy.Cod,0);
        const reward2 = RewardGold(enemy.Cod,2);
        

        gold += reward;
        if (option[7].opt === true) LogAdd(`보상으로 ${numk(reward)}💰를 획득했습니다.`, 'gold');
        if (A === 0 && option[6].opt === true) showPopupMessage(`+${numk(reward)}💰`, 'gold');
        if (A === 1 && option[6].opt === true) showPopupMessage(`+${numk(reward)}💰`, 'gold',150);

        const rad = (Math.random() * 100);
        if (rad < CardDrop(enemy.Cod) && enemy.Cod < 15) {
          CardInventory[enemy.Cod] += 1;
          LogAdd(`${CardDrop(enemy.Cod)}% 확률로 "${enemy.name}"카드를 1장 획득했습니다.`, 'cyan');
        }
        const rad2 = (Math.random() * 100);
        if ((StoneDrop() + StoneTierDrop(enemy.Cod)) < 100) {
          if (rad2 < (StoneDrop() + StoneTierDrop(enemy.Cod))) {
              CardStone[enemy.tier].Cnt += 1;
              if (option[16].opt === true) LogAdd(`${(StoneDrop() + StoneTierDrop(enemy.Cod))}% 확률로 ${TIERS[enemy.tier]}급 강화석을 획득했습니다.`, 'lightblue');
          }
        } else {
          CardStone[enemy.tier].Cnt += 1;
          if (rad2 < ((StoneDrop() + StoneTierDrop(enemy.Cod))-100)) {
              CardStone[enemy.tier].Cnt += 1;
              if (option[16].opt === true) LogAdd(`${(StoneDrop() + StoneTierDrop(enemy.Cod))}% 확률로 ${TIERS[enemy.tier]}급 강화석을 2개 획득했습니다.`, 'lightblue');
          } else {
            if (option[16].opt === true) LogAdd(`100% 확률로 ${TIERS[enemy.tier]}급 강화석을 1개 획득했습니다.`, 'lightblue');
          }
        }
        const rad3 = (Math.random() * 100);
        const RewardDia = DiaDrop(enemy.Cod);
        if (rad3 < 3) {
          Diamond += RewardDia;
          LogAdd(`3% 확률로 ${RewardDia}💎를 획득했습니다.`, 'skyblue');
        }
        if (UpgAbil[18].Have === 1) {
          const RowHp = (player.Mhp - player.hp);
          const ReqGod = (RowHp * HealReqGold());
          if ((player.Mhp - player.hp) > 0) {
            if (gold >= ReqGod) {
              gold -= ReqGod;
              player.hp = player.Mhp;
              if (ReqGod > 0 && option[10].opt === true) LogAdd(`${numk(ReqGod)}💰 소모하여 체력 회복.(Hp${numk(RowHp)} x ${HealReqGold()})`,'orange');
            } else if (gold >= HealReqGold()) {
            let UpHealth = Math.floor(gold/HealReqGold());
              player.hp += UpHealth;
              gold -= (UpHealth*HealReqGold());
              if (option[10].opt === true) LogAdd(`${numk(UpHealth*HealReqGold())}💰 소모하여 체력 회복.(Hp${numk(UpHealth)} x ${HealReqGold()})`,'orange');
            } else {
              LogAdd(`${numk(HealReqGold())}💰 부족하여 자동회복이 미발동.`,'red');
            }
          }
        }

        if (Goal < enemy.Cod) {
          const Firsts = reward2 * 5;
          gold += Firsts;
          Goal = enemy.Cod;
          player.hp = player.Mhp-1;
          LogAdd(`[최초 처치 보상! ${numk(Firsts)}💰를 획득했습니다.]`, 'cyan');
          if (A === 0 ) showPopupMessage(`+${numk(Firsts)}💰`, 'orange');
          Respawn(1);
        } else {
          Respawn(0);
        }

        saveGame();
        if (A === 0 ) document.getElementById('AtkBtn').classList.remove('hidden');
        return; // 반격 생략 (죽었으니까)
      }
  }
  UIRendering();
  if (A === 0 ) document.getElementById('AtkBtn').classList.remove('hidden');
}

function showPopupMessage(text, color = 'gold', duration = 1000) {
  const popup = document.getElementById('popupMsg');
  popup.style.color = color;
  popup.textContent = text;
  popup.style.display = 'block';

  setTimeout(() => {
    popup.style.display = 'none';
  }, duration);
}

function KillCount() {
  const enemy = enemyCards[0];
  if (enemy.Cod < 30) {
    if (CardKill[enemy.Cod] === 25 || 
      CardKill[enemy.Cod] === 100 || 
      CardKill[enemy.Cod] === 250 || 
      CardKill[enemy.Cod] === 500 || 
      CardKill[enemy.Cod] === 750 || 
      CardKill[enemy.Cod] === 1000 || 
      CardKill[enemy.Cod] === 2000
    ) {
      CardInventory[enemy.Cod] += 1;
      LogAdd(`+${enemy.name} ${CardKill[enemy.Cod]}회 킬 보상.`, 'gold');
    }
  }
}

let lastLogText = '';
function LogAdd(text, color = 'white') {
  const logContainer = document.getElementById('log-container');

  // "Save.." 로그가 연속으로 중복될 경우 출력하지 않음
  if (text === 'Save..' && lastLogText === 'Save..') {
    return;
  }

  // 로그 요소 생성
  const logEntry = document.createElement('div');
  logEntry.textContent = text;
  logEntry.style.color = color;

  // 로그 추가
  logContainer.appendChild(logEntry);

  // 로그가 50개를 초과하면 가장 오래된 로그 삭제
  while (logContainer.children.length > 50) {
    logContainer.removeChild(logContainer.firstChild);
  }

  // 최신 로그로 스크롤 이동
  logContainer.scrollTop = logContainer.scrollHeight;

  // 마지막 로그 텍스트 업데이트
  lastLogText = text;
}



// function numk(number) {
//   return new Intl.NumberFormat('en-US', {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//     useGrouping: true
//   }).format(number);
// }

function Size(A) {
  SizeChk = A;
  UIRendering();
}
//UI랜더링 함수
function UIRendering() {
  const enemyContainer = document.getElementById('enemy-cards');
  const playerContainer = document.getElementById('player-cards');
  const goldDisplay = document.getElementById('gold-display');
  const DiaDisplay = document.getElementById('Dia-display');
  const inventoryList = document.getElementById('inventoryList');

  enemyContainer.innerHTML = '';
  playerContainer.innerHTML = '';
  enemyCards.forEach(card => {
    enemyContainer.appendChild(createCardElement(card,0));
  });

  playerCards.forEach(card => {
    playerContainer.appendChild(createCardElement(card,1));
  });
  
  // goldDisplay.textContent = `${numk(gold)}gold[${Goal+1}]`;
  goldDisplay.textContent = `${numk(gold)}💰`;
  DiaDisplay.textContent = `${numk(Diamond)}💎`;

  inventoryList.innerHTML = ''; // 초기화

  CardInventory.forEach((count, index) => {
    if (count > 0) {
      const card = CardPack[index];

      const line = document.createElement('div');
      line.classList.add('inventory-item');
      if (card.def > 0) {
        line.innerHTML = `Tier ${index}<br>${card.name} x ${count}<br>❤️${numk(card.hp)} / 🗡️${numk(card.atk)}<br>🛡️${card.def}%`;
      } else {
        line.innerHTML = `Tier ${index}<br>${card.name} x ${count}<br>❤️${card.hp} / 🗡️${card.atk}`;
      }
      line.style.borderRadius = '10px';
      line.style.fontWeight = "bold";
      if (card.grade === 0) {
          line.style.backgroundColor = '#4c4c4c';  // 어두운 회색
          line.style.border = '10px solid #d2d2d2';
          line.style.color = '#ffffff';           // 밝은 텍스트
      } else if (card.grade === 1) {
          line.style.backgroundColor = '#1f401f';  // 어두운 녹색 계열
          line.style.border = '10px solid #a0ffa0';
          line.style.color = '#eaffea';           // 연한 텍스트
      } else if (card.grade === 2) {
          line.style.backgroundColor = '#0e2a3d';  // 어두운 파랑 계열
          line.style.border = '10px solid #7ecbff';
          line.style.color = '#e6f6ff';
      } else if (card.grade === 3) {
          line.style.backgroundColor = '#2a1e3d';  // 어두운 보라
          line.style.border = '10px solid #b57eff';
          line.style.color = '#f3e6ff';
      } else if (card.grade === 4) {
          line.style.backgroundColor = '#3d1e1a';  // 어두운 붉은 주황
          line.style.border = '10px solid #ff8d7e';
          line.style.color = '#ffeae6';
      } else if (card.grade === 5) {
          line.style.backgroundColor = '#3d1e2e';  // 어두운 핑크/보라
          line.style.border = '10px solid #ff9ce3';
          line.style.color = '#ffe6f3';
      } else if (card.grade === 6) {
          line.style.backgroundColor = '#3d2a1e';  // 어두운 주황/갈색
          line.style.border = '10px solid #ffb347';
          line.style.color = '#fff0db';
      } else if (card.grade === 7) {
          line.style.backgroundColor = '#3d1e1e';  // 어두운 빨강
          line.style.border = '10px solid #ff4c4c';
          line.style.color = '#ffe5e5';
      } else if (card.grade === 8) {
          line.style.backgroundColor = '#3d3a1e';  // 어두운 노랑/카키
          line.style.border = '10px solid #f8e800';
          line.style.color = '#fffde0';
      } else if (card.grade === 9) {
          line.style.backgroundColor = '#1e3d3b';  // 어두운 청록
          line.style.border = '10px solid #20e0d0';
          line.style.color = '#e0fcf9';
      } else {
          line.style.backgroundColor = '#000000';  // 완전 검정
          line.style.border = '10px solid white';
          line.style.color = 'white';
      }
    
    
      line.style.padding = '6px';
      const backgroundImageUrl = `img/t${index}.webp`;
      line.style.backgroundImage = `url(${backgroundImageUrl})`;
      line.style.backgroundSize = 'cover';
      line.style.backgroundPosition = 'center 65px';
      line.style.backgroundRepeat = 'no-repeat';
      line.style.width = '240px';
      line.style.height = '320px';
      line.style.textShadow = '1px 1px 1px blue';
      if (SizeChk ===2) {
        line.innerHTML = `T${index} x${count}<br>`;
        line.style.backgroundPosition = 'center 20px';
        line.style.padding = '2px';
        line.style.width = '80px';
        line.style.height = '150px';
      }
      let Cde = playerCards[0].Cod;
      const autoBuyBtn = document.getElementById('AutoBuy');
      if ((CardRoll === 1 || CardRoll === 6) && count >= 1 && Cde <= index+1 && Quest >= 2 && Quest !== 3 && Quest !== 5) {
        const fusionBtn = document.createElement('button');
        const Tier = CardPack[Cde].tier;
        const Cnts = CardPack[Cde].grade;
        const CLv = playerCards[0].Lv;
        if (Cde < index) {
          fusionBtn.textContent = '교체';
          if (Cde+1 === index) {
            fusionBtn.textContent = '*교체';
          }
        } else if (Cde === index) {
          fusionBtn.textContent = `Lv Up${CLv}/${MaxLv(Cde)}`;
          if (CLv === MaxLv(Cde) ) {
            fusionBtn.textContent = 'Lv Max';
          }
          if (SizeChk ===2) {
            fusionBtn.textContent = `LvUp`;
          }
        } else if (Cde === index+1) {
        const Cxp = playerCards[0].Xp;
          fusionBtn.innerHTML = `강화${Cxp}/${MaxXp(Cde)}<br>${TIERS[Tier]} ${CardStone[Tier].Cnt || 0} / ${Cnts}`;
          if (Cxp === MaxXp(Cde) ) {
            fusionBtn.textContent = '강화Max';
          }
          if (SizeChk ===2) {
            fusionBtn.textContent = '강화';
          }
        }
        if (CardRoll === 6 || SizeChk === 2) {
          fusionBtn.style.fontSize = '16px';
        }
        fusionBtn.className = 'InCard-btn';
        fusionBtn.addEventListener('click', () => InCard(index));
        line.appendChild(fusionBtn);
      }
      if ((CardRoll === 2 || CardRoll === 6 && (Quest === 1 || Quest >= 10))) {
        // LogAdd(2);
        if (autoBuyBtn.classList.contains('Active')) {
          const fusionBtn = document.createElement('button');
          const fusionCount = Math.floor(count / IndexCnt(index));
          const totalCost = fusionCount * ReqCost(index);
          fusionBtn.innerHTML = `일괄 합성(${fusionCount})<br>${numk(totalCost)}💰`;
          if (SizeChk ===2) {
            fusionBtn.textContent = '일괄';
          }
          if (CardRoll === 6 || SizeChk === 2) {
            fusionBtn.style.fontSize = '16px';
          }
          fusionBtn.className = 'fusion2-btn';
          fusionBtn.addEventListener('click', () => Fusion(index,fusionCount));
          line.appendChild(fusionBtn);
        } else {
          const fusionBtn = document.createElement('button');
          fusionBtn.innerHTML = `합성(${count}/${IndexCnt(index)})<br>${numk(ReqCost(index))}💰`;
          if (SizeChk ===2) {
            fusionBtn.textContent = '합성';
          }
          if (CardRoll === 6 || SizeChk === 2) {
            fusionBtn.style.fontSize = '16px';
          }
          fusionBtn.className = 'fusion-btn';
          fusionBtn.addEventListener('click', () => Fusion(index,1));
          line.appendChild(fusionBtn);
        }
      }
      if ((CardRoll === 3 || CardRoll === 6) && count >= 1 && Cde > index && Quest >= 3 && Quest !== 6 && Quest !== 5) {
        const fusionBtn = document.createElement('button');
        fusionBtn.innerHTML = `판매 ${numk(SellCost(index))}💰`;
        if (SizeChk ===2) {
          fusionBtn.textContent = '판매';
        }
        if (CardRoll === 6 || SizeChk === 2) {
          fusionBtn.style.fontSize = '16px';
        }
        fusionBtn.className = 'Sell-btn';
        if (autoBuyBtn.classList.contains('Active')) {
          fusionBtn.addEventListener('click', () => SellCard(index,count));
        } else {
          fusionBtn.addEventListener('click', () => SellCard(index,1));
        }
        line.appendChild(fusionBtn);
      }
      if ((CardRoll === 4 || CardRoll === 6) && count >= 1 && Quest >= 5 && Quest !== 6) {
        const tierName = `${TIERS[CardPack[index].tier]}급 `;
        const Cnt = CardPack[index].grade+1;
        const fusionBtn = document.createElement('button');
        if (autoBuyBtn.classList.contains('Active')) {
          fusionBtn.innerHTML = `일괄 분해<br>${tierName} ${Cnt}개`;
          if (SizeChk ===2) {
            fusionBtn.textContent = '분해';
          }
          if (CardRoll === 6 || SizeChk === 2) {
            fusionBtn.style.fontSize = '16px';
          }
          fusionBtn.className = 'break-btn';
          fusionBtn.addEventListener('click', () => BreakCard(index,count));
          line.appendChild(fusionBtn);
        } else {
          fusionBtn.innerHTML = `분해<br>${tierName} ${Cnt}개`;
          if (SizeChk ===2) {
            fusionBtn.textContent = '분해';
          }
          if (CardRoll === 6 || SizeChk === 2) {
            fusionBtn.style.fontSize = '16px';
          }
          fusionBtn.className = 'break-btn';
          fusionBtn.addEventListener('click', () => BreakCard(index,1));
          line.appendChild(fusionBtn);
        }
      }
      if ((CardRoll === 5 || CardRoll === 6) && count >= 1 && index > 0 && Quest >= 10) {
        const tierName = `${TIERS[CardPack[index].tier]}급 `;
        const fusionBtn = document.createElement('button');
        const Tier = CardPack[index].tier;
        const Stone = CardStone[Tier].Cnt;
        if (autoBuyBtn.classList.contains('Active')) {
          fusionBtn.innerHTML = `일괄 분할<br>${tierName} ${count}<br>${count} / ${Stone}`;
          if (SizeChk ===2) {
            fusionBtn.textContent = '분할';
          }
          if (CardRoll === 6 || SizeChk === 2) {
            fusionBtn.style.fontSize = '16px';
          }
          fusionBtn.className = 'split-btn';
          fusionBtn.addEventListener('click', () => SplitCard(index,count));
          line.appendChild(fusionBtn);
        } else {
          fusionBtn.innerHTML = `분할<br>${tierName} 1<br>1 / ${Stone}`;
          if (SizeChk ===2) {
            fusionBtn.textContent = '분할';
          }
          if (CardRoll === 6 || SizeChk === 2) {
            fusionBtn.style.fontSize = '16px';
          }
          fusionBtn.className = 'split-btn';
          fusionBtn.addEventListener('click', () => SplitCard(index,1));
          line.appendChild(fusionBtn);
        }
      }

      inventoryList.appendChild(line);
    }
  });

  ShowElement();
  updateSellButtonsVisibility();
  GuideSetting();
  document.querySelector('#version').innerHTML = `CCG v${version}`;
}
function ShowElement() {

  if (Goal >= 9) {
    document.getElementById(`ShopBtn2`).classList.remove('hidden');
    document.getElementById(`ShopBtn3`).classList.remove('hidden');
    document.getElementById(`ShopBtn31`).classList.remove('hidden');
  }
  if (Goal >= 14) {
    document.getElementById(`ShopBtn4`).classList.remove('hidden');
    document.getElementById(`ShopBtn5`).classList.remove('hidden');
    document.getElementById(`ShopBtn51`).classList.remove('hidden');
  }
  if (Goal >= 19) {
    document.getElementById(`ShopBtn6`).classList.remove('hidden');
    document.getElementById(`ShopBtn7`).classList.remove('hidden');
    document.getElementById(`ShopBtn71`).classList.remove('hidden');
  }
  if (Goal >= 24) {
    document.getElementById(`ShopBtn8`).classList.remove('hidden');
    document.getElementById(`ShopBtn9`).classList.remove('hidden');
    document.getElementById(`ShopBtn91`).classList.remove('hidden');
  }
  
  if (option[0].opt === true) {
    if (Goal >= 9) {
      document.getElementById(`ShopBtn0`).classList.remove('hidden');
      document.getElementById(`ShopBtn1`).classList.remove('hidden');
      document.getElementById(`ShopBtn11`).classList.remove('hidden');
    }
    if (Goal >= 14) {
      document.getElementById(`ShopBtn2`).classList.remove('hidden');
      document.getElementById(`ShopBtn3`).classList.remove('hidden');
      document.getElementById(`ShopBtn31`).classList.remove('hidden');
    }
    if (Goal >= 19) {
      document.getElementById(`ShopBtn4`).classList.remove('hidden');
      document.getElementById(`ShopBtn5`).classList.remove('hidden');
      document.getElementById(`ShopBtn51`).classList.remove('hidden');
    }
    if (Goal >= 24) {
      document.getElementById(`ShopBtn6`).classList.remove('hidden');
      document.getElementById(`ShopBtn7`).classList.remove('hidden');
      document.getElementById(`ShopBtn71`).classList.remove('hidden');
    }
  } else {
    if (Goal >= 9) {
      document.getElementById(`ShopBtn0`).classList.add('hidden');
      document.getElementById(`ShopBtn1`).classList.add('hidden');
      document.getElementById(`ShopBtn11`).classList.add('hidden');
    }
    if (Goal >= 14) {
      document.getElementById(`ShopBtn2`).classList.add('hidden');
      document.getElementById(`ShopBtn3`).classList.add('hidden');
      document.getElementById(`ShopBtn31`).classList.add('hidden');
    }
    if (Goal >= 19) {
      document.getElementById(`ShopBtn4`).classList.add('hidden');
      document.getElementById(`ShopBtn5`).classList.add('hidden');
      document.getElementById(`ShopBtn51`).classList.add('hidden');
    }
    if (Goal >= 24) {
      document.getElementById(`ShopBtn6`).classList.add('hidden');
      document.getElementById(`ShopBtn7`).classList.add('hidden');
      document.getElementById(`ShopBtn71`).classList.add('hidden');
    }
  }
  
  UpgAbil.forEach((upgrade, index) => {
    if (upgrade.Have === 1) {
      const button = document.getElementById(`UpBtn${index}`);
      if (button) {
        button.classList.add('hidden');
      }
    } else {
      const button = document.getElementById(`UpBtn${index}`);
      if (button) {
        button.classList.remove('hidden');
      }
    }
  });
  const upgradePairs = [
     0,2,4,6,8,9,11,12,13,14,15,16,19
    ,21,23,25,27,28,29,30,32,33,35,37
    ,39,40,41,42,43,44,45,46,47
    ,49,50,51,52,53,54,55,56,57
    ,59,60,61,62,63,64,65,66,67
    ,69,70,71,72,73,74,75
    ,77,78,79,80,81,82
    ,84,85,86,87,88,89];

  upgradePairs.forEach(index => {
    // console.log(index);
    const nextIndex = index + 1;
    const button = document.getElementById(`UpBtn${nextIndex}`);
    if (button) {
      button.classList.add('hidden');
      if (UpgAbil[index].Have === 1 && UpgAbil[nextIndex]?.Have === 0) {
        button.classList.remove('hidden');
      }
    }
  });


  if (UpgAbil[3].Have === 1) {
    document.getElementById("ShopBtn0").innerHTML = "N~R급 카드 랜덤 구매<br>800💰";
    document.getElementById("ShopBtn1").innerHTML = "N~R급 카드 (10+1)<br>8k💰";
  } else if (UpgAbil[2].Have === 1) {
    document.getElementById("ShopBtn0").innerHTML = "N~R급 카드 랜덤 구매<br>900💰";
    document.getElementById("ShopBtn1").innerHTML = "N~R급 카드 (10+1)<br>9k💰";
  } else {
    document.getElementById("ShopBtn0").innerHTML = "N~R급 카드 랜덤 구매<br>1k💰";
    document.getElementById("ShopBtn1").innerHTML = "N~R급 카드 (10+1)<br>10k💰";
  }
  if (UpgAbil[7].Have === 1) {
    document.getElementById("ShopBtn2").innerHTML = "R~SR급 카드 랜덤 구매<br>8k💰";
    document.getElementById("ShopBtn3").innerHTML = "R~SR급 카드 (10+1)<br>80k💰";
  } else if (UpgAbil[6].Have === 1) {
    document.getElementById("ShopBtn2").innerHTML = "R~SR급 카드 랜덤 구매<br>9k💰";
    document.getElementById("ShopBtn3").innerHTML = "R~SR급 카드 (10+1)<br>90k💰";
  } else {
    document.getElementById("ShopBtn2").innerHTML = "R~SR급 카드 랜덤 구매<br>10k💰";
    document.getElementById("ShopBtn3").innerHTML = "R~SR급 카드 (10+1)<br>100k💰";
  }
  if (UpgAbil[22].Have === 1) {
    document.getElementById("ShopBtn4").innerHTML = "SR~SSR급 카드 랜덤 구매<br>80k💰";
    document.getElementById("ShopBtn5").innerHTML = "SR~SSR급 카드 (10+1)<br>800k💰";
  } else if (UpgAbil[21].Have === 1) {
    document.getElementById("ShopBtn4").innerHTML = "SR~SSR급 카드 랜덤 구매<br>90k💰";
    document.getElementById("ShopBtn5").innerHTML = "SR~SSR급 카드 (10+1)<br>900k💰";
  } else {
    document.getElementById("ShopBtn4").innerHTML = "SR~SSR급 카드 랜덤 구매<br>100k💰";
    document.getElementById("ShopBtn5").innerHTML = "SR~SSR급 카드 (10+1)<br>1M💰";
  }
  if (UpgAbil[26].Have === 1) {
    document.getElementById("ShopBtn6").innerHTML = "SSR~UR급 카드 랜덤 구매<br>8k💰";
    document.getElementById("ShopBtn7").innerHTML = "SSR~UR급 카드 (10+1)<br>8M💰";
  } else if (UpgAbil[25].Have === 1) {
    document.getElementById("ShopBtn6").innerHTML = "SSR~UR급 카드 랜덤 구매<br>9k💰";
    document.getElementById("ShopBtn7").innerHTML = "SSR~UR급 카드 (10+1)<br>9M💰";
  } else {
    document.getElementById("ShopBtn6").innerHTML = "SSR~UR급 카드 랜덤 구매<br>1M💰";
    document.getElementById("ShopBtn7").innerHTML = "SSR~UR급 카드 (10+1)<br>10M💰";
  }
  if (UpgAbil[38].Have === 1) {
    document.getElementById("ShopBtn8").innerHTML = "UR~LR급 카드 랜덤 구매<br>8M💰";
    document.getElementById("ShopBtn9").innerHTML = "UR~LR급 카드 (10+1)<br>80M💰";
  } else if (UpgAbil[37].Have === 1) {
    document.getElementById("ShopBtn8").innerHTML = "UR~LR급 카드 랜덤 구매<br>9M💰";
    document.getElementById("ShopBtn9").innerHTML = "UR~LR급 카드 (10+1)<br>90M💰";
  } else {
    document.getElementById("ShopBtn8").innerHTML = "UR~LR급 카드 랜덤 구매<br>10M💰";
    document.getElementById("ShopBtn9").innerHTML = "UR~LR급 카드 (10+1)<br>100M💰";
  }
  
  if (UpgAbil[11].Have === 1) {
    if (option[9].opt === true) {
      document.getElementById("AutoBtn").classList.remove('hidden');
    } else {
      document.getElementById("AutoBtn").classList.add('hidden');
    }
  } else {
    document.getElementById("AutoBtn").classList.add('hidden');
  }
  

  let stoneListHTML = ``;
  for (let i = 0; i < CardStone.length; i++) {
    if (CardStone[i].Cnt > 0) {
      stoneListHTML += `${TIER2[i]} ${TIERS[i]}급 ${numk(CardStone[i].Cnt)}개<br>`;
    }
  }
  document.getElementById('StoneList').innerHTML = stoneListHTML;

  let KillListHTML = ``;
  for (let i = 0; i < CardKill.length; i++) {
    if (CardKill[i] > 0) {
      KillListHTML += `T${i} ${CardPack[i].name} ${numk(CardKill[i])} Kill<br>`;
    }
  }
  document.getElementById('KillList').innerHTML = KillListHTML;
  
  let MaxListHTML = ``;
  MaxBonusAtk = 0;
  MaxBonusMhp = 0;
  MaxBonusDef = 0;
  if (UpgAbil[48].Have === 1) { MaxBonusAtk = 2000000;
  } else if (UpgAbil[47].Have === 1) { MaxBonusAtk = 500000;
  } else if (UpgAbil[46].Have === 1) { MaxBonusAtk = 100000;
  } else if (UpgAbil[45].Have === 1) { MaxBonusAtk = 20000;
  } else if (UpgAbil[44].Have === 1) { MaxBonusAtk = 5000;
  } else if (UpgAbil[43].Have === 1) { MaxBonusAtk = 1000;
  } else if (UpgAbil[42].Have === 1) { MaxBonusAtk = 200;
  } else if (UpgAbil[41].Have === 1) { MaxBonusAtk = 50;
  } else if (UpgAbil[40].Have === 1) { MaxBonusAtk = 10;
  } else if (UpgAbil[39].Have === 1) { MaxBonusAtk = 1;
  } 
  
  if (UpgAbil[58].Have === 1) { MaxBonusMhp = 20000000;
  } else if (UpgAbil[57].Have === 1) { MaxBonusMhp = 5000000;
  } else if (UpgAbil[56].Have === 1) { MaxBonusMhp = 1000000;
  } else if (UpgAbil[55].Have === 1) { MaxBonusMhp = 200000;
  } else if (UpgAbil[54].Have === 1) { MaxBonusMhp = 50000;
  } else if (UpgAbil[53].Have === 1) { MaxBonusMhp = 10000;
  } else if (UpgAbil[52].Have === 1) { MaxBonusMhp = 2000;
  } else if (UpgAbil[51].Have === 1) { MaxBonusMhp = 500;
  } else if (UpgAbil[50].Have === 1) { MaxBonusMhp = 100;
  } else if (UpgAbil[49].Have === 1) { MaxBonusMhp = 10;
  } 
  
  if (UpgAbil[68].Have === 1) { MaxBonusDef = 95;
  } else if (UpgAbil[67].Have === 1) { MaxBonusDef = 90;
  } else if (UpgAbil[66].Have === 1) { MaxBonusDef = 75;
  } else if (UpgAbil[65].Have === 1) { MaxBonusDef = 50;
  } else if (UpgAbil[64].Have === 1) { MaxBonusDef = 25;
  } else if (UpgAbil[63].Have === 1) { MaxBonusDef = 15;
  } else if (UpgAbil[62].Have === 1) { MaxBonusDef = 10;
  } else if (UpgAbil[61].Have === 1) { MaxBonusDef = 5;
  } else if (UpgAbil[60].Have === 1) { MaxBonusDef = 3;
  } else if (UpgAbil[59].Have === 1) { MaxBonusDef = 1;
  } 
  
  for (let i = 0; i < CardMax.length; i++) {
    if (CardMax[i] > 0) {
      MaxListHTML += `T${i} ${CardPack[i].name}<br>`;
      MaxBonusAtk += Math.floor(CardPack[i].atk/3);
      MaxBonusMhp += Math.floor(CardPack[i].Mhp/5);
      MaxBonusDef += Math.floor(i/10);
    }
  }
  if (MaxBonusAtk > 0) {
    MaxListHTML += `+🗡️ ${numk(MaxBonusAtk)}<br>`;
  }
  if (MaxBonusMhp > 0) {
    MaxListHTML += `+❤️ ${numk(MaxBonusMhp)}<br>`;
  }
  if (MaxBonusDef > 0) {
    MaxListHTML += `+🛡️ ${numk(MaxBonusDef)}%<br>`;
  }
  document.getElementById('MaxList').innerHTML = MaxListHTML;

  const card = playerCards[0];
  const hpPercent = ((card.hp+MaxBonusMhp) / (card.Mhp+MaxBonusMhp)) * 100;  // 예: hpPercent 계산
  const formattedHpPercent = hpPercent % 1 === 0 ? hpPercent.toFixed(0) : hpPercent.toFixed(1);
  const healPer = document.querySelector('#healPer');
  healPer.innerHTML = `${formattedHpPercent}%`;
  // healPer.innerHTML = `${hpPercent}%`;
  
  for (let i = 0; i < UpgAbil.length; i++) {
    const btn = document.getElementById("UpBtn" + i);
    if (!btn) continue; // 버튼 없으면 건너뜀

    const item = UpgAbil[i];

    // 예: "F~E급 구매 최소+1<br>10k💰<br>[ 1 / 2 ]"
    if (gold >= item.Value) {
      btn.innerHTML = `${item.Name} <br><h3 style="color:lime">${numk(item.Value)}💰</h3><br> [ ${item.Num} / ${item.Max} ]`;
    } else {
      let ReqG = (item.Value-gold);
      btn.innerHTML = `${item.Name} <br><h3 style="color:orange">${numk(ReqG)}💰부족</h3> <br> [ ${item.Num} / ${item.Max} ]`;
    }
  }

  const AtkBtns = document.querySelector('#AtkBtn');
  const AutoBtn = document.querySelector('#AutoBtn');
  if (option[11].opt === true) {
    AtkBtns.style.right = '20px';
    AtkBtns.style.left = ''; // 초기화
    AtkBtns.style.top = '60px';
    AutoBtn.style.right = '20px';
    AutoBtn.style.left = ''; // 초기화
    AutoBtn.style.top = '60px';
  } else {
    AtkBtns.style.left = '20px';
    AtkBtns.style.right = ''; // 초기화
    AtkBtns.style.top = '500px';
    AutoBtn.style.left = '20px';
    AutoBtn.style.right = ''; // 초기화
    AutoBtn.style.top = '500px';
  }
}


function GuideSetting() {

  const maxLvGuide = document.getElementById('maxLvGuide');
  maxLvGuide.innerHTML = '';
  CardPack.forEach((_, index) => {
    const p = document.createElement('p');
    p.innerHTML = `${CardPack[index].name} : Max ${MaxLv(index)}`;
    maxLvGuide.appendChild(p);
  
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px';  // 원하는 간격 조절 가능
      maxLvGuide.appendChild(spacer);
    }
  });
  
  const dropGuide = document.getElementById('dropGuide');
  dropGuide.innerHTML = '';
  CardPack.forEach((_, index) => {
    const p = document.createElement('p');
    p.innerHTML = `${CardPack[index].name} : ${CardDrop(index)}%`;
    dropGuide.appendChild(p);
  
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px';
      dropGuide.appendChild(spacer);
    }
  });

  const cntGuide = document.getElementById('cntGuide');
  cntGuide.innerHTML = '';
  CardPack.forEach((_, index) => {
    const p = document.createElement('p');
    p.innerHTML = `${CardPack[index].name} : ${IndexCnt(index)}장`;
    cntGuide.appendChild(p);
  
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px';
      cntGuide.appendChild(spacer);
    }
  });
  
  const costGuide = document.getElementById('costGuide');
  costGuide.innerHTML = '';
  CardPack.forEach((_, index) => {
    const p = document.createElement('p');
    p.innerHTML = `<br>${CardPack[index].name} :<br> ${numk(ReqCost(index))}💰`;
    costGuide.appendChild(p);
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px'; // 또는 원하는 간격(px 단위)
      costGuide.appendChild(spacer);
    }
  });
  
  const sellCostGuide = document.getElementById('sellCostGuide');
  sellCostGuide.innerHTML = '';
  CardPack.forEach((_, index) => {
    const p = document.createElement('p');
    p.innerHTML = `<br>${CardPack[index].name} :<br> ${numk(SellCost(index))}💰`;
    sellCostGuide.appendChild(p);
  
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px'; // 간격 조절 가능
      sellCostGuide.appendChild(spacer);
    }
  });
  
  const rewardGoldGuide = document.getElementById('rewardGoldGuide');
  rewardGoldGuide.innerHTML = '';
  CardPack.forEach((_, index) => {
    // 랜덤 요소 제외하고 계산 (A != 0)
    const base = RewardGold(index, 1); // 고정값으로 계산
    const min = Math.round(base * 0.95);
    const max = Math.round(base * 1.05);
  
    const p = document.createElement('p');
    p.innerHTML = `<br>${CardPack[index].name} :<br> ${numk(min)}~${numk(max)}💰`;
    rewardGoldGuide.appendChild(p);
  
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px';
      rewardGoldGuide.appendChild(spacer);
    }
  });

  const levelUpGuide = document.getElementById('levelUpGuide');
  levelUpGuide.innerHTML = '';
  CardPack.forEach((card, index) => {
    let div;
    if (index % 5 === 0) {
      div = document.createElement('div');
      div.style.marginBottom = '12px';
    }

    let atkUp, hpUp;

    if (index < 10) {
      atkUp = Math.floor(card.atk / 4);
      hpUp = Math.floor(card.Mhp / 4);
    } else if (index < 15) {
      atkUp = Math.floor(card.atk / 6);
      hpUp = Math.floor(card.Mhp / 6);
    } else if (index < 20) {
      atkUp = Math.floor(card.atk / 8);
      hpUp = Math.floor(card.Mhp / 8);
    } else if (index < 25) {
      atkUp = Math.floor(card.atk / 10);
      hpUp = Math.floor(card.Mhp / 10);
    } else if (index < 30) {
      atkUp = Math.floor(card.atk / 12);
      hpUp = Math.floor(card.Mhp / 12);
    } else if (index < 35) {
      atkUp = Math.floor(card.atk / 15);
      hpUp = Math.floor(card.Mhp / 15);
    } else if (index < 40) {
      atkUp = Math.floor(card.atk / 18);
      hpUp = Math.floor(card.Mhp / 18);
    } else if (index < 45) {
      atkUp = Math.floor(card.atk / 20);
      hpUp = Math.floor(card.Mhp / 20);
    } else if (index < 50) {
      atkUp = Math.floor(card.atk / 25);
      hpUp = Math.floor(card.Mhp / 25);
    } else {
      atkUp = Math.floor(card.atk / 30);
      hpUp = Math.floor(card.Mhp / 30);
    }

    if (atkUp < 1) atkUp = 1;
    if (hpUp < 1) hpUp = 1;

    const p = document.createElement('p');
    p.innerHTML = `<br>${CardPack[index].name} :<br>🗡️+${numk(atkUp)}  ❤️+${numk(hpUp)}`;
    div?.appendChild(p);
    levelUpGuide.appendChild(div ?? p);
  });

  const maxBonusGuide = document.getElementById('maxBonusGuide');
  maxBonusGuide.innerHTML = '';
  for (let i = 1; i < CardPack.length; i += 5) {
    const group = CardPack.slice(i, i + 5);
  
    group.forEach((card, index) => {
      const tier = i + index;
      const bonusAtk = Math.floor(card.atk / 3);
      const bonusMhp = Math.floor(card.Mhp / 5);
      const bonusDef = Math.floor(i / 10);
  
      const p = document.createElement('p');
      if (bonusDef > 0) {
        p.innerHTML = `<br>${CardPack[tier].name} :<br>🗡️+${numk(bonusAtk)} ❤️+${numk(bonusMhp)} <br>🛡️+${numk(bonusDef)}%<br>`;
      } else {
        p.innerHTML = `<br>${CardPack[tier].name} :<br>🗡️+${numk(bonusAtk)} ❤️+${numk(bonusMhp)}<br>`;
      }
      maxBonusGuide.appendChild(p);
    });
  
    // 구간 간격 추가
    const spacer = document.createElement('div');
    spacer.style.height = '12px';
    maxBonusGuide.appendChild(spacer);
  }
  
  const imageShow = document.getElementById('imageShow');
  imageShow.innerHTML = '';
  // CardPack.forEach((_, index) => {
  for (let index = 0; index < CardPack.length; index++) {
    if (index > Goal) break;
    // if (index > Goal+1) break;
    const p = document.createElement('p');
    p.innerHTML = `<br>${CardPack[index].name} :<br>`;
    imageShow.appendChild(p);

    const cardDiv = document.createElement('div');
    cardDiv.className = `card`;
    const backgroundImageUrl = `img/t${index}.webp`;
    // console.log(CardPack[index].Cod);
    cardDiv.style.backgroundImage = `url(${backgroundImageUrl})`;
    cardDiv.style.backgroundSize = 'cover';
    cardDiv.style.backgroundPosition = 'center 25px';
    cardDiv.style.backgroundRepeat = 'no-repeat';
    imageShow.appendChild(cardDiv);
  
    if ((index + 1) % 5 === 0) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px'; // 간격 조절 가능
      imageShow.appendChild(spacer);
    }
  };
  // });

  //추가
  renderCardProbGuide();

}
  function getCardProbabilities(T) {
  const baseT = T % 10;
  let CardMin = 0;
  let CardMax = 0;

  switch (baseT) {
    case 1:
      CardMin = 0 + (UpgAbil[0].Have || 0) + (UpgAbil[1].Have || 0);
      CardMax = CardMin + 4;
      break;
    case 2:
      CardMin = 6 + (UpgAbil[4].Have || 0) + (UpgAbil[5].Have || 0);
      CardMax = CardMin + 4;
      break;
    case 3:
      CardMin = 11 + (UpgAbil[19].Have || 0) + (UpgAbil[20].Have || 0);
      CardMax = CardMin + 4;
      break;
    case 4:
      CardMin = 16 + (UpgAbil[23].Have || 0) + (UpgAbil[24].Have || 0);
      CardMax = CardMin + 4;
      break;
    case 5:
      CardMin = 21 + (UpgAbil[35].Have || 0) + (UpgAbil[36].Have || 0);
      CardMax = CardMin + 4;
      break;
  }

  // 기본 확률 구조
  const rawProbabilities = [
    { offset: 4, prob: 0.01 },
    { offset: 3, prob: 0.05 },
    { offset: 2, prob: 0.19 },
    { offset: 1, prob: 0.30 },
    { offset: 0, prob: 0.45 }
  ];

  const validProbs = rawProbabilities.filter(p => (CardMin + p.offset) <= CardMax);
  const totalProb = validProbs.reduce((sum, p) => sum + p.prob, 0);

  return validProbs.map(p => {
    const index = CardMin + p.offset;
    const rawPercent = (p.prob / totalProb * 100);
    return {
      index,
      name: CardPack[index]?.name || `카드 ${index}`,
      percent: rawPercent % 1 === 0 ? `${rawPercent.toFixed(0)}` : `${rawPercent.toFixed(1)}`

    };
  });
}
function renderCardProbGuide() {
  const container = document.getElementById('cardProbGuide');
  container.innerHTML = '';

  const TList = [1, 2, 3, 4, 5];

  TList.forEach(T => {
    const probs = getCardProbabilities(T);

    // T 제목
    const title = document.createElement('h5');
    const labelMap = {
      1: 'N~R급 카드',
      2: 'R~SR급 카드',
      3: 'SR~SSR급 카드',
      4: 'SSR~UR급 카드',
      5: 'UR~LR급 카드'
    };
    title.innerText = `${labelMap[T]} 획득 확률`;
    container.appendChild(title);

    // 확률 정보
    probs.forEach(({ index, name, percent }, i) => {
      const p = document.createElement('p');
      p.innerHTML = `Tier ${index} - <strong>${name}</strong> : ${percent}%`;
      container.appendChild(p);

      // spacer 삽입 (5개마다)
      if ((i + 1) % 5 === 0) {
        const spacer = document.createElement('div');
        spacer.style.height = '12px';
        container.appendChild(spacer);
      }
    });

    // 단락 구분선
    const divider = document.createElement('hr');
    divider.style.margin = '20px 0';
    container.appendChild(divider);
  });
}



function updateSellButtonsVisibility() {
  for (let i = 0; i < CardStone.length; i++) {
    const btn = document.getElementById(`SellBtn${i}`);
    if (!btn) continue;

    if (CardStone[i].Cnt > 0) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  }
  for (let i = 0; i < CardStone.length-1; i++) {
    const btn = document.getElementById(`StoneBtn${i}`);
    if (!btn) continue;

    if (CardStone[i].Cnt >= 3 && CardStone[i+1].Cnt >= 1) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  }
}


function Upgrade(A) {
  if (UpgAbil[A].Have === 0) {
    if (gold >= UpgAbil[A].Value) {
      gold -= UpgAbil[A].Value;
      UpgAbil[A].Have = 1;
      LogAdd(`[${UpgAbil[A].Name}] [${UpgAbil[A].Num}/${UpgAbil[A].Max}] 업그레이드 완료`,'lime');
    } else {
      LogAdd(`[${UpgAbil[A].Name}] [${UpgAbil[A].Num}/${UpgAbil[A].Max}] ${numk(UpgAbil[A].Value)}💰 필요.`,'red');
    }
  } else {
    LogAdd(`이미 보유한 업그레이드`,'orange');
  }
  UIRendering();
  saveGame();
}

function SellCard(index,cnt) {
  if (cnt === 1) {
    if (CardInventory[index] >= 1) {
      CardInventory[index] -= 1;
      gold += SellCost(index);
      LogAdd(`[${CardPack[index].name}] 카드 1장을 ${numk(SellCost(index))}💰에 판매했습니다!`, 'lightblue');
      UIRendering();
    } else {
      LogAdd(`[${CardPack[index].name}] 카드가 부족합니다.`,'red')
    }
  } else {
    if (CardInventory[index] >= 1) {
      const Cout = CardInventory[index];
      CardInventory[index] = 0;
      gold += (SellCost(index) * Cout);
      LogAdd(`[${CardPack[index].name}] 카드 ${numk(Cout)}장을 ${numk((SellCost(index) * Cout))}💰에 판매했습니다!`, 'lightblue');
      UIRendering();
    } else {
      LogAdd(`[${CardPack[index].name}] 카드가 부족합니다.`,'red');
    }
  }
  UIRendering();
  saveGame();
}

function BreakCard(index,Count) {
  const Tier = CardPack[index].tier;
  const tierName = `${TIERS[CardPack[index].tier]}급 강화석 `;
  const Cnt = CardPack[index].grade+1;
  CardStone[Tier].Cnt += (Cnt * Count);
  CardInventory[index] -= Count;
  LogAdd(`${tierName} ${numk(Cnt*Count)}개 획득!`,'lime');
  UIRendering();
  saveGame();
}

function SplitCard(index,Count) {
  const Tier = CardPack[index].tier;
  const tierName = `${TIERS[CardPack[index].tier]}급 강화석`;
  // const Cnt = IndexCnt(index-1);
  const Cnt = 2; //2장 고정
  if (CardStone[Tier].Cnt >= Count) {
    CardStone[Tier].Cnt -= Count;
    CardInventory[index] -= Count;
    CardInventory[index-1] += (Count*Cnt);
    LogAdd(`${CardPack[index].name}카드 ${Count}장을 분할하여 ${CardPack[index-1].name}카드 ${numk(Count*Cnt)}장을 얻었습니다.`,'lime');
  } else {
      LogAdd(`${tierName}이 ${Count}개 부족합니다.`,'red');
  }
  UIRendering();
  saveGame();
}

function CRoll() {
  const rollElement = document.getElementById("Roll");
  rollElement.classList.remove("one", "two", "three", "four", "five","six");
  CardRoll = CardRoll % 6 + 1;
  const classMap = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six"
  };
  const textMap = {
    1: "교체",
    2: "합성",
    3: "판매",
    4: "분해",
    5: "분할",
    6: "전체"
  };
  rollElement.classList.add(classMap[CardRoll]);
  rollElement.innerText = "⟳" + textMap[CardRoll];
  UIRendering();
}



// document.addEventListener("DOMContentLoaded", UIRendering);
window.onload = () => {
  DefaultSetting();
  UIRendering();
  showSaveSlotUI(); // 먼저 슬롯 UI를 보여줌
};

function numk(value) {
  const autoBuyBtn = document.getElementById('AutoBuy');
  if (autoBuyBtn.classList.contains('Active')) {
    return value.toLocaleString();
  } else {
    if (value >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(1) + 'T'; // 조 (Trillion)
    } else if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'G'; // 십억 (Billion)
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M'; // 백만 (Million)
    } else if (value >= 100_000) {
      return (value / 1_000).toFixed(1) + 'k'; // 천 (Thousand)
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(2) + 'k'; // 천 (Thousand)
    } else {
      return value.toString(); // 그대로 출력
    }
  }
}


function ResetGame(A) {
  let confirmReset = true;
  if (A === 0 && Goal !== -1) {
    confirmReset = confirm("정말로 게임을 초기화하시겠습니까?\n이 작업은 되돌릴 수 없습니다.");
  }
  if (Goal < 0) {
    LogAdd('리세마라를 진행합니다.', 'orange');
  }

  if (!confirmReset) {
    LogAdd('게임 초기화를 취소했습니다.', 'gray');
    return; // 유저가 아니오(No)를 누르면 초기화하지 않음
  }
  DefaultSetting();
  LogAdd('게임 초기화 완료', 'yellow');
  UIRendering();
  saveGame();
}

//세이브 로드
function showSaveSlotUI() {
  const container = document.getElementById('save-slots-container');
  container.innerHTML = '';

  for (let i = 0; i < SlotMax; i++) {
    const slotKey = `tcgSave${i}`;
    const saveStr = localStorage.getItem(slotKey);
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('slot-box');

    if (saveStr) {
      try {
        const save = JSON.parse(saveStr);
        const date = new Date(save.lastOfflineTime || 0);
        const formattedDate = date.toLocaleString();

        slotDiv.innerHTML = `
          <strong>[슬롯 ${i}]</strong><br>
          ${formattedDate}<br>
          v${save.version}<br>
          ${numk(save.gold || 0)}💰 ${numk(save.Diamond || 0)}💎<br>
          퀘스트 ${save.Quest} 진행중<br>
          Tier ${save.Goal || 0} - ${CardPack[save.Goal || 0].name} 도달<br><br>
          플레이어 카드 : ${save.playerCards[0].name}<br>
          카드 레벨 : ${save.playerCards[0].Lv} 
          강화 : ${save.playerCards[0].Xp}<br>
          🗡️ ${save.playerCards[0].atk} ❤️ ${save.playerCards[0].Mhp} 🛡️ ${save.playerCards[0].def}
        `;
      } catch (e) {
        slotDiv.innerHTML = `<strong>슬롯 ${i}</strong><br>⚠️ 데이터 오류`;
      }
    } else {
      slotDiv.innerHTML = `<strong>슬롯 ${i}</strong><br>비어 있음`;
    }

    // 삭제 버튼 추가
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('slot-delete');
    deleteBtn.textContent = '삭제';
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // 부모 슬롯 클릭 방지
      if (confirm(`정말 슬롯 ${i}을 삭제하시겠습니까?`)) {
        localStorage.removeItem(slotKey);
        showSaveSlotUI(); // 다시 로드
      }
    };
    slotDiv.appendChild(deleteBtn);

    // 슬롯 클릭 -> 불러오기
    slotDiv.onclick = () => {
      currentSaveSlot = i;
      loadgameBySlot(i);
      document.getElementById('save-slot-overlay').style.display = 'none';
    };

    container.appendChild(slotDiv);
  }

  document.getElementById('save-slot-overlay').style.display = 'flex';
}




function loadgameBySlot(slotIndex) {
  DefaultSetting();
  updateButtons();

  const saveDataStr = localStorage.getItem(`tcgSave${slotIndex}`);
  if (!saveDataStr) {
    LogAdd(`슬롯 ${slotIndex}에는 저장된 데이터가 없습니다.`, 'orange');
    LogAdd(`처음 플레이 하는 사람이라면, 먼저 화면 왼쪽에 퀘스트 버튼을 눌러주세요.`, 'yellow');
    LogAdd(`그리고 나서 화면 오른쪽 슬라이드에 튜토리얼 1 버튼을 누르고 설명대로 진행하시면 됩니다.`, 'yellow');
    LogAdd(`PC나 모바일로 플레이하실때, 절대 인터넷 사용 기록 삭제를 하지 마세요.`, 'red');
    LogAdd(`쿠키와 캐시에 세이브 데이터를 저장합니다. 이를 초기화할 경우 세이브가 날라가니 주의해주세요.`, 'red');
    UIRendering();
    return false;
  }

  let saveData;
  try {
    saveData = JSON.parse(saveDataStr);
  } catch (e) {
    LogAdd(`슬롯 ${slotIndex} 데이터 파싱 오류.`, 'red');
    return false;
  }

  currentSaveSlot = slotIndex; // 저장 슬롯 설정

  showVersionMismatchPopup(saveData.version, version);

  if (saveData.playerCards) playerCards = saveData.playerCards;
  if (saveData.enemyCards) enemyCards = saveData.enemyCards;
  if (saveData.CardInventory) CardInventory = saveData.CardInventory;
  if (saveData.CardKill) CardKill = saveData.CardKill;
  if (saveData.CardMax) CardMax = saveData.CardMax;
  if (saveData.UpgAbil) UpgAbil = saveData.UpgAbil;
  if (saveData.CardStone) CardStone = saveData.CardStone;
  if (saveData.gold !== undefined) gold = saveData.gold;
  if (saveData.Goal !== undefined) Goal = saveData.Goal;
  if (saveData.Quest !== undefined) Quest = saveData.Quest;
  if (saveData.Diamond !== undefined) Diamond = saveData.Diamond;

  // 오프라인 보상 처리 동일하게
  if (saveData.lastOfflineTime) {
    const now = Date.now();
    let offlineTimeSec = Math.floor((now - saveData.lastOfflineTime) / 1000);
    const maxOfflineTime = OfflineMax();
    if (offlineTimeSec > maxOfflineTime) offlineTimeSec = maxOfflineTime;

    if (offlineTimeSec > 0) {
      const lastOfflineDate = new Date(saveData.lastOfflineTime);
      const nowDate = new Date(now);

      const isSameDate = lastOfflineDate.toDateString() === nowDate.toDateString();

      const formatFullDate = (date) =>
        `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월 ${date.getDate().toString().padStart(2, '0')}일 ` +
        `${date.getHours().toString().padStart(2, '0')}시 ${date.getMinutes().toString().padStart(2, '0')}분 ${date.getSeconds().toString().padStart(2, '0')}초`;

      const formatTimeOnly = (date) =>
        `${date.getHours().toString().padStart(2, '0')}시 ${date.getMinutes().toString().padStart(2, '0')}분 ${date.getSeconds().toString().padStart(2, '0')}초`;

      LogAdd(`===== 💤 오프라인 보상 요약 =====`, 'gold');
      if (isSameDate) {
        LogAdd(`🕒 마지막 저장한 시간: ${formatTimeOnly(lastOfflineDate)}`, 'lightblue');
        LogAdd(`🕒 방금 데이터를 불러온 시간: ${formatTimeOnly(nowDate)}`, 'lightblue');
      } else {
        LogAdd(`🕒 마지막 저장한 시간: ${formatFullDate(lastOfflineDate)}`, 'lightblue');
        LogAdd(`🕒 방금 데이터를 불러온 시간: ${formatFullDate(nowDate)}`, 'lightblue');
      }

      LogAdd(`⏱️ 오프라인 시간: ${formatSecondsToHMS(offlineTimeSec)} /Max ${formatSecondsToHMS(maxOfflineTime)}`, 'lightblue');

      GiveOfflineRewards(offlineTimeSec);
    }
  }

  LogAdd(`슬롯 ${slotIndex}에서 게임을 불러왔습니다.`, 'lightgreen');
  UIRendering();
  return true;
}




function saveGame() {
  if (currentSaveSlot === null) {
    LogAdd('저장 슬롯이 설정되지 않았습니다. 기본 슬롯(0)에 저장됩니다.');
    currentSaveSlot = 0;
  }
  const saveData = {
    playerCards,
    enemyCards,
    gold,
    Goal,
    CardInventory,
    CardKill,
    CardMax,
    UpgAbil,
    version,
    CardStone,
    Quest,
    lastOfflineTime: Date.now(),   // 여기에 현재 시간을 저장
    Diamond,
  };
  
  localStorage.setItem(`tcgSave${currentSaveSlot}`, JSON.stringify(saveData));
  if (option[15].opt === true) LogAdd(`슬롯 ${currentSaveSlot}에 저장됨`, 'gray');
  UIRendering();
}

//구버젼 하지만 지우지 말것.
// function loadGame() {
//   DefaultSetting();
//   updateButtons();
  
//   // 저장된 슬롯 중 가장 최근 것을 찾아서 불러옴
//   let latestSave = null;
//   let latestTime = 0;
  
//   for (let i = 0; i < SlotMax; i++) {
//     const dataStr = localStorage.getItem(`tcgSave${i}`);
//     if (!dataStr) continue;

//     try {
//       const data = JSON.parse(dataStr);
//       if (data.lastOfflineTime && data.lastOfflineTime > latestTime) {
//         latestTime = data.lastOfflineTime;
//         latestSave = data;
//         currentSaveSlot = i; // 현재 슬롯 설정
//       }
//     } catch (e) {
//       LogAdd(`슬롯 ${i} 파싱 실패:`, e);
//     }
//   }

//   if (!latestSave) {
//     LogAdd('저장된 게임이 없습니다.', 'orange');
//     UIRendering();
//     return false;
//   }
//   const saveData = latestSave;

//   showVersionMismatchPopup(saveData.version, version);
//   // if (saveData.version !== version) {
//   //   LogAdd("저장된 게임 버전이 맞지 않아 데이터가 초기화됩니다.", "red");
//   //   // 팝업 띄우기
//   //   ResetGame(1);
//   //   UIRendering();
//   //   saveGame();
//   //   return false;
//   // }

//   // 저장된 데이터가 있으면 덮어쓰기
//   if (saveData.playerCards) playerCards = saveData.playerCards;
//   if (saveData.enemyCards) enemyCards = saveData.enemyCards;
//   if (saveData.CardInventory) CardInventory = saveData.CardInventory;
//   if (saveData.CardKill) CardKill = saveData.CardKill;
//   if (saveData.CardMax) CardMax = saveData.CardMax;
//   if (saveData.UpgAbil) UpgAbil = saveData.UpgAbil;
//   if (saveData.CardStone) CardStone = saveData.CardStone;
//   if (saveData.gold !== undefined) gold = saveData.gold;
//   if (saveData.Goal !== undefined) Goal = saveData.Goal;
//   if (saveData.Quest !== undefined) Quest = saveData.Quest;
//   if (saveData.Diamond !== undefined) Diamond = saveData.Diamond;
  
//   UIRendering();
//   LogAdd(`게임 불러오기(슬롯${currentSaveSlot}) 완료 v${version}` , 'lightgreen');
//   // --- 오프라인 시간 계산 & 보상 ---
//   if (saveData.lastOfflineTime) {
//     const now = Date.now();
//     let offlineTimeSec = Math.floor((now - saveData.lastOfflineTime) / 1000);
  
//     // 최대 오프라인 시간 제한 (예: 1시간 = 3600초)
//     const maxOfflineTime = OfflineMax();
//     if (offlineTimeSec > maxOfflineTime) offlineTimeSec = maxOfflineTime;
//     if (offlineTimeSec > 0) {
//       const lastOfflineDate = new Date(saveData.lastOfflineTime);
//       const nowDate = new Date(now);
    
//       const isSameDate =
//         lastOfflineDate.getFullYear() === nowDate.getFullYear() &&
//         lastOfflineDate.getMonth() === nowDate.getMonth() &&
//         lastOfflineDate.getDate() === nowDate.getDate();
    
//       const formatFullDate = (date) =>
//         `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, '0')}월 ${date.getDate().toString().padStart(2, '0')}일 ` +
//         `${date.getHours().toString().padStart(2, '0')}시 ${date.getMinutes().toString().padStart(2, '0')}분 ${date.getSeconds().toString().padStart(2, '0')}초`;
    
//       const formatTimeOnly = (date) =>
//         `${date.getHours().toString().padStart(2, '0')}시 ${date.getMinutes().toString().padStart(2, '0')}분 ${date.getSeconds().toString().padStart(2, '0')}초`;
//       LogAdd(`===== 💤 오프라인 보상 요약 =====`, 'gold');
//       if (isSameDate) {
//         LogAdd(`🕒 마지막 저장한 시간: ${formatTimeOnly(lastOfflineDate)}`, 'lightblue');
//         LogAdd(`🕒 방금 데이터를 불러온 시간: ${formatTimeOnly(nowDate)}`, 'lightblue');
//       } else {
//         LogAdd(`🕒 마지막 저장한 시간: ${formatFullDate(lastOfflineDate)}`, 'lightblue');
//         LogAdd(`🕒 방금 데이터를 불러온 시간: ${formatFullDate(nowDate)}`, 'lightblue');
//       }
//       LogAdd(`⏱️ 오프라인 시간: ${formatSecondsToHMS(offlineTimeSec)} /Max ${formatSecondsToHMS(maxOfflineTime)}`, 'lightblue');

//       GiveOfflineRewards(offlineTimeSec);
//     }
    
//   }
  

//   UIRendering();
//   return true;
// }
function GiveOfflineRewards(offlineSeconds) {
  const enemyName = CardPack[Goal].name;
  const baseGold = RewardGold(Goal, 1);
  const Bonus = OfflineGold();
  const goldPerSecond = baseGold / 100 * Bonus;
  const totalReward = Math.floor(offlineSeconds * goldPerSecond);
  gold += totalReward;
  // 로그 출력
  LogAdd(`👾 최종 도달한 적: T${Goal} ${enemyName}`, 'lightblue');
  if (Bonus < 100) {
    LogAdd(`⚙️ 초당 보상 기준: ${numk(goldPerSecond)}💰 (기본 드롭'${numk(baseGold)}💰'의 ${Bonus}%)`, 'lightblue');
  } else {
    LogAdd(`⚙️ 초당 보상 기준: ${numk(goldPerSecond)}💰`, 'lightblue');
  }
  LogAdd(`💰 최종 지급 보상: ${numk(totalReward)}💰`, 'gold');
  UIRendering();
}
function formatSecondsToHMS(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h.toString().padStart(1, '0')}시간 ${m.toString().padStart(1, '0')}분 ${s.toString().padStart(1, '0')}초`;
  } else if (m > 0) {
    return `${m.toString().padStart(1, '0')}분 ${s.toString().padStart(1, '0')}초`;
  } else {
    return `${s}초`;
  }
}

function clearAllSaves() {
  for (let i = 0; i < SlotMax; i++) {
    localStorage.removeItem(`tcgSave${i}`);
  }
  LogAdd('모든 세이브 슬롯이 삭제되었습니다.', 'red');
}


function showVersionMismatchPopup(savedVer, currentVer) {
  // DOM에 버전 표시
  if (savedVer === currentVer) return;
  
  if (savedVer !== -1) {
    document.getElementById("savedVersion").textContent = `저장된 게임 버전: ${savedVer}`;
    document.getElementById("currentVersion").textContent = `현재 게임 버전: ${version}`;
  }

  // 업데이트 로그 필터링
  const updateList = document.getElementById("updateNotesList");
  updateList.innerHTML = ""; // 초기화
  const versionsToShow = Object.keys(updateNotes).filter(v => v > savedVer && v <= currentVer);
  
  if (versionsToShow.length === 0) {
    const li = document.createElement("li");
    li.textContent = "새로운 업데이트 정보가 없습니다.";
    updateList.appendChild(li);
  } else {
    versionsToShow.forEach(ver => {
      const verLi = document.createElement("li");
      verLi.innerHTML = `<strong>${ver}</strong>`;
      const ul = document.createElement("ul");
      updateNotes[ver].forEach(note => {
        const noteLi = document.createElement("li");
        noteLi.textContent = note;
        ul.appendChild(noteLi);
      });
      verLi.appendChild(ul);
      updateList.appendChild(verLi);
    });
  }

  // 팝업 보여주기
  document.getElementById("versionMismatchOverlay").style.display = "flex";
}
function closePopup() {
  document.getElementById("versionMismatchOverlay").style.display = "none";
}

function setPanelHeight() {
  const panels = document.querySelectorAll('.inventory-panel, .shop-panel, .Up-panel, .Quest-panel');
  const viewportHeight = window.innerHeight; // 실제 보이는 화면 높이
  const logHeight = viewportHeight * 0.2; // 20vh
  const panelHeight = viewportHeight - logHeight - 40; // 40px padding or offset

  panels.forEach(panel => {
    panel.style.height = `${panelHeight}px`;
  });
}

function updateButtons() {
  const sections = [
    { title: "상점 카드 구매 관련", buttons: [0,1,2,3,4,5,6,7,19,20,21,22,23,24,25,26,35,36,37,38] },
    { title: "능력치", buttons: [39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68] },
    { title: "💰 획득량<br>중복적용됨", buttons: [8,9,10,32,33,34] },
    { title: "적 처치시 일정 확률로<br>강화석 드롭", buttons: [69,70,71,72,73,74,75,76] },
    { title: "자동 전투", buttons: [11,12,13,14,15,16,17] },
    { title: "회복", buttons: [18,27,28,29,30,31] },
    { title: "오프라인 보상", buttons: [77,78,79,80,81,82,83,84,85,86,87,88,89,90] },
  ];

  const upButtonsDiv = document.getElementById('UpButtons');

  sections.forEach((section, index) => {
    // 제목 추가
    const h5 = document.createElement('h4');
    h5.innerHTML = section.title;
    upButtonsDiv.appendChild(h5);

    // 버튼 추가
    section.buttons.forEach(num => {
      const btn = document.createElement('button');
      btn.id = 'UpBtn' + num;
      btn.textContent = '';  // 버튼 텍스트가 필요하면 여기에 넣으세요
      btn.setAttribute('onclick', `Upgrade(${num})`);
      upButtonsDiv.appendChild(btn);
    });

    // 구간 사이에 hr 넣기 (마지막 구간 제외)
    if (index < sections.length - 1) {
      const hr = document.createElement('hr');
      upButtonsDiv.appendChild(hr);
    }
  });

  for (let i = 0; i < UpgAbil.length; i++) {
    const btn = document.getElementById("UpBtn" + i);
    if (!btn) continue; // 버튼 없으면 건너뜀

    const item = UpgAbil[i];

    // 예: "F~E급 구매 최소+1<br>10k💰<br>[ 1 / 2 ]"
    if (gold >= item.Value) {
      btn.innerHTML = `${item.Name} <br><p style="color:green">${numk(item.Value)}💰</p><br> [ ${item.Num} / ${item.Max} ]`;
    } else {
      btn.innerHTML = `${item.Name} <br><p style="color:red">${numk(item.Value)}💰</p><br> [ ${item.Num} / ${item.Max} ]`;
    }
  }
}


window.addEventListener('load', setPanelHeight);
window.addEventListener('resize', setPanelHeight);
