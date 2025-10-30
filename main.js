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
  let velocity = 0;
  let prevX = 0;
  let rafID;

  // ✅ 관성 스크롤
  const momentumScroll = () => {
    slider.scrollLeft += velocity;
    velocity *= 0.95; // 감속률 (값이 낮을수록 빨리 멈춤)
    if (Math.abs(velocity) > 0.1) {
      rafID = requestAnimationFrame(momentumScroll);
    }
  };

  const stopMomentum = () => cancelAnimationFrame(rafID);

  // ✅ 마우스 드래그 스크롤
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    prevX = e.pageX;
    stopMomentum();
  });

  slider.addEventListener("mouseleave", () => {
    if (isDown) {
      isDown = false;
      slider.classList.remove("active");
      requestAnimationFrame(momentumScroll);
    }
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
    requestAnimationFrame(momentumScroll);
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const dx = x - prevX;
    prevX = x;

    cancelAnimationFrame(rafID);
    rafID = requestAnimationFrame(() => {
      slider.scrollLeft -= dx;
      velocity = dx * 0.8;
    });
  });

  /* ============================
        ✅ 마우스 휠로 좌우 이동
  ============================= */
  slider.addEventListener("wheel", (e) => {
    e.preventDefault(); // 기본 세로 스크롤 방지

    // 휠 올림 (deltaY < 0) → 오른쪽으로
    // 휠 내림 (deltaY > 0) → 왼쪽으로
    const scrollSpeed = 80; // 한 번 휠당 이동 거리 (원하면 조정 가능)
    slider.scrollLeft += e.deltaY < 0 ? scrollSpeed : -scrollSpeed;
  }, { passive: false });
});


