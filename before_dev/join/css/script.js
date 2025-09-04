(() => {
  const form = document.getElementById("myForm");
  const inputId = document.getElementById("id");
  const inputPass = document.getElementById("pass");
  const inputPassConfirm = document.getElementById("pass_confirm");
  const joinMem = document.getElementById("join_mem");
  const openbox = document.getElementById("openbox");
  const overlay = document.getElementById("overlay");
  const closeIcon = joinMem.querySelector(".close-icon");
  // 비밀번호 확인 체크
  function validatePasswordMatch() {
    if (inputPass.value !== inputPassConfirm.value) {
      alert("비밀번호가 일치하지 않습니다.");
      inputPassConfirm.focus();
      return false;
    }
    return true;
  }
  // 폼 제출 이벤트
  form.addEventListener("submit", e => {
    if (!validatePasswordMatch()) {
      e.preventDefault();
    }
  });
  // 모달 열기
  function openModal() {
    joinMem.style.display = "block";
    overlay.style.display = "block";
    inputId.focus();
  }
  // 모달 닫기
  function closeModal() {
    joinMem.style.display = "none";
    overlay.style.display = "none";
    openbox.focus();
  }
  openbox.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });
  closeIcon.addEventListener("click", e => {
    e.preventDefault();
    closeModal();
  });
  overlay.addEventListener("click", e => {
    e.preventDefault();
    closeModal();
  });
  // ESC키로 모달 닫기
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && joinMem.style.display === "block") {
      closeModal();
    }
  });
})();