(() => {
  const VIDEO_ID = "yRAWQz-qm-U";
  const card = [...document.querySelectorAll(".project-card")].find((item) => {
    const title = item.querySelector(".project-body h3")?.textContent?.toLocaleLowerCase("tr-TR") || "";
    return title.includes("video") && title.includes("animasyon");
  });

  if (!card || card.dataset.motionReady === "true") return;
  card.dataset.motionReady = "true";
  card.classList.add("motion-project-card");
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "Alfa Sigorta Sağlık Sigortaları Animasyonu videosunu oynat");

  const visual = card.querySelector(".project-visual");
  const body = card.querySelector(".project-body");
  const title = body?.querySelector("h3");
  const description = body?.querySelector("p");

  if (visual) {
    visual.className = "project-visual motion-project-visual";
    visual.innerHTML = `
      <div class="motion-project-cover">
        <img
          src="https://i.ytimg.com/vi/${VIDEO_ID}/hq720.jpg"
          onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg';"
          alt="Alfa Sigorta sağlık sigortaları piksel animasyonu kapak görseli"
          loading="lazy"
          decoding="async"
        >
        <span class="motion-project-badge">MOTION DESIGN</span>
        <span class="motion-project-play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
        </span>
        <span class="motion-project-ratio">9:16 · 43 sn</span>
      </div>
    `;
  }

  if (title) title.textContent = "Alfa Sigorta Sağlık Sigortaları Animasyonu";
  if (description) {
    description.textContent = "Sağlık sigortası ürünlerini 8-bit oyun estetiği ve piksel animasyon diliyle anlatan dikey sosyal medya videosu.";
  }

  if (body && !body.querySelector(".motion-project-meta")) {
    body.insertAdjacentHTML("beforeend", `
      <div class="motion-project-meta" aria-label="Proje özellikleri">
        <span>8-bit Estetik</span>
        <span>Piksel Animasyon</span>
        <span>Sosyal Medya</span>
      </div>
    `);
  }

  const modal = document.createElement("div");
  modal.className = "motion-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="motion-modal-dialog" role="dialog" aria-modal="true" aria-label="Alfa Sigorta Sağlık Sigortaları Animasyonu">
      <button class="motion-modal-close" type="button" aria-label="Videoyu kapat">×</button>
      <div class="motion-modal-video"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const videoFrame = modal.querySelector(".motion-modal-video");
  const closeButton = modal.querySelector(".motion-modal-close");
  let lastFocus = null;

  const openModal = () => {
    lastFocus = document.activeElement;
    videoFrame.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1"
        title="Alfa Sigorta Sağlık Sigortaları Animasyonu"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("motion-modal-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("motion-modal-open");
    videoFrame.replaceChildren();
    lastFocus?.focus?.();
  };

  card.addEventListener("click", openModal);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  });
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
})();
