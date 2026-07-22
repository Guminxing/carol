/* ============================================================
   夜色特调Carol — 交互脚本
   - 导航栏滚动状态
   - 元素滚动渐入
   - 平滑锚点（CSS 已处理，此处补 fallback）
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 导航栏滚动状态 ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 滚动渐入 ---------- */
  // 给主要区块元素加上 reveal 类
  const revealTargets = document.querySelectorAll(
    '.section__head, .about__lead, .about__facts, .drink, .track, .tl__item, .live__card, .music__note, .vcard, .video__note, .venue, .venues__note'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  // 错开同组元素的渐入时机
  const staggerGroups = ['.drink', '.track', '.tl__item', '.vcard', '.venue'];
  staggerGroups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
    });
  });

  revealTargets.forEach((el) => io.observe(el));

  /* ---------- 成员卡片：鼠标视差光晕 ---------- */
  const drinks = document.querySelectorAll('.drink');
  drinks.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  /* ---------- 当前年份 ---------- */
  const yearEl = document.querySelector('.footer__copy');
  // 已在 HTML 写死 2026，此处保留扩展位
})();
