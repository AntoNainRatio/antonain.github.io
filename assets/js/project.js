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

/* ===========================================================================
   Lightbox pour les images de la galerie : clic pour agrandir en pop-up.
   =========================================================================== */
(function () {
  const triggers = document.querySelectorAll(".media-gallery .media-figure img");
  if (!triggers.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">&times;</button>
    <img src="" alt="" />
    <figcaption></figcaption>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  function open(img) {
    const caption = img.closest("figure")?.querySelector("figcaption")?.textContent ?? "";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("is-open");
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
  }

  triggers.forEach((img) => img.addEventListener("click", () => open(img)));
  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();
