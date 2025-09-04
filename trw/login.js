
// 모달 요소
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

// 버튼 요소
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// 닫기 버튼
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');

// 열기 이벤트
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});
signupBtn.addEventListener('click', () => {
  signupModal.style.display = 'block';
});

// 닫기 이벤트
closeLogin.addEventListener('click', () => {
  loginModal.style.display = 'none';
});
closeSignup.addEventListener('click', () => {
  signupModal.style.display = 'none';
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.style.display = 'none';
  if (e.target === signupModal) signupModal.style.display = 'none';
});

// (선택) 폼 제출 예시 - 실제 서버 연동은 별도 구현 필요
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('로그인하였습니다.');
  loginModal.style.display = 'none';
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // 비밀번호 확인 체크
  const pw = document.getElementById('signupPassword').value;
  const pwConfirm = document.getElementById('signupPasswordConfirm').value;
  if (pw !== pwConfirm) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  alert('회원가입을 축합니다.');
  signupModal.style.display = 'none';
});
