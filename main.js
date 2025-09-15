document.addEventListener('DOMContentLoaded', () => {

  /* =============================
        0) 인트로 → 메인 전환
  ============================== */
  const intro = document.getElementById('intro');
  const main  = document.getElementById('main');

  if (intro) {
    intro.classList.add('animate');          // Hello 등장→사라짐
    setTimeout(() => main?.classList.add('show'), 3000); // 3s 뒤 Main 보여주기
  }

  /* =============================
        1) 메뉴 토글 애니메이션
  ============================== */
  const menuToggle = document.getElementById('menuToggle');
  const menuBox    = document.getElementById('menuBox');
  const menuItems  = menuBox.querySelectorAll('li');
  const menuArea   = document.getElementById('menuArea');

  menuToggle.addEventListener('click', () => {
    menuBox.classList.add('open');
    menuToggle.style.display = 'none';
    menuItems.forEach((item, idx) =>
      setTimeout(() => item.classList.add('show'), 150 * idx)
    );
  });

  document.addEventListener('click', e => {
    if (!menuArea.contains(e.target)) {
      menuBox.classList.remove('open');
      menuToggle.style.display = 'block';
      menuItems.forEach(item => item.classList.remove('show'));
    }
  });

  /* =============================
        2) 스킬 카드 플립
  ============================== */
  const cards = document.querySelectorAll('.skii_item');
  cards.forEach(card => {
    card.addEventListener('click', e => {
      e.stopPropagation();
      cards.forEach(c => c !== card && c.classList.remove('is-flipped'));
      card.classList.toggle('is-flipped');
    });
  });

  /* =============================
        3) Footer 텍스트 슬라이드-인
  ============================== */
 const footerFont = document.querySelector('.footer_font');
if (footerFont) {
  const slideIn = () => {
    const rect = footerFont.getBoundingClientRect();
    const winH = window.innerHeight;
    if (rect.top < winH * 0.98) {           // 여기를 0.9 → 0.98로 변경
      footerFont.classList.add('slide-in');
      window.removeEventListener('scroll', slideIn);
    }
  };
  window.addEventListener('scroll', slideIn);
  slideIn();
}

});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector("#main .froject_works ul");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });
});