document.addEventListener("DOMContentLoaded", function () {
  const openPopup = document.getElementById('openPopup');
  const popup = document.getElementById('popup');
  const closeBtn = document.getElementById('closeBtn');
  const deviceSize = document.getElementById('deviceSize');
  

  openPopup.addEventListener('click', function (e) {
    e.preventDefault();

    const width = window.innerWidth;
    const height = window.innerHeight;
    deviceSize.textContent = `현재 디바이스 크기: ${width}px x ${height}px`;

    popup.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });
  

  const openPopup2 = document.getElementById('openPopup2');
  const popup2 = document.getElementById('popup2');
  const closeBtn2 = document.getElementById('closeBtn2');
  openPopup2.addEventListener('click', function (e) {
    e.preventDefault();
    popup2.style.display = 'flex';
  });

  closeBtn2.addEventListener('click', function () {
    popup2.style.display = 'none';
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const gameCards = document.querySelectorAll(".game-card");
  const favButtons = document.querySelectorAll('.favorite-btn');
  const searchInput = document.getElementById("searchInput");
  const STORAGE_KEY = 'favoriteGames';

  let currentFilter = "all";

  // 로컬스토리지에서 즐겨찾기 URL 배열 불러오기 (없으면 빈 배열)
  let favoriteHrefs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // 각 카드별 즐겨찾기 상태 세팅
  gameCards.forEach(card => {
    const link = card.querySelector('a');
    const href = link ? link.href : null;
    const heart = card.querySelector('.heart');

    if (href && favoriteHrefs.includes(href)) {
      heart.textContent = '♥';
      heart.style.color = 'red';
      card.dataset.favorited = "true";
    } else {
      heart.textContent = '♡';
      heart.style.color = '#06e0e4';
      card.dataset.favorited = "false";
    }
  });

  // 즐겨찾기 버튼 클릭 이벤트
  favButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.game-card');
      const link = card.querySelector('a');
      const href = link ? link.href : null;
      const heart = button.querySelector('.heart');

      if (!href) return;

      if (card.dataset.favorited === "true") {
        // 즐겨찾기 해제
        heart.textContent = '♡';
        heart.style.color = '#06e0e4';
        card.dataset.favorited = "false";

        // 로컬스토리지에서 제거
        favoriteHrefs = favoriteHrefs.filter(h => h !== href);
      } else {
        // 즐겨찾기 설정
        heart.textContent = '♥';
        heart.style.color = 'red';
        card.dataset.favorited = "true";

        // 로컬스토리지에 추가
        if (!favoriteHrefs.includes(href)) {
          favoriteHrefs.push(href);
        }
      }

      // 로컬스토리지 업데이트
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteHrefs));

      // 필터 + 검색 적용 (즐겨찾기 필터일 때 바로 반영 위해)
      filterAndSearch();
    });
  });

  // 필터 버튼 기능
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      filterAndSearch();
    });
  });

  // 검색 기능
  searchInput.addEventListener("input", () => {
    filterAndSearch();
  });

  // 필터 + 검색 결합 함수
  function filterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    gameCards.forEach(card => {
      const tags = card.dataset.tags.split(",").map(t => t.trim());
      const title = card.querySelector(".game-title").textContent.toLowerCase();
      const desc = card.querySelector(".game-desc").textContent.toLowerCase();
      const isFav = card.dataset.favorited === "true";

      const matchesFilter = 
        currentFilter === "all" ||
        (currentFilter === "favorites" && isFav) ||
        tags.includes(currentFilter);

      const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // 초기 화면은 전체 필터, 검색어 없음 상태
  filterAndSearch();
});

