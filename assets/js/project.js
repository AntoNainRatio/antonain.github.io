/* ===========================================================================
   Effet parallax du hero des pages projet.
   Le fond défile plus lentement que le contenu au scroll.
   =========================================================================== */
(function () {
  const layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length) return;

  // Respecte la préférence "réduire les animations"
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;

  function update() {
    const y = window.scrollY;
    layers.forEach((layer) => {
      // 0.4 = vitesse du fond (plus petit = plus lent). scale fixe pour éviter
      // de laisser apparaître les bords pendant le déplacement.
      layer.style.transform = `translate3d(0, ${y * 0.4}px, 0) scale(1.05)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
