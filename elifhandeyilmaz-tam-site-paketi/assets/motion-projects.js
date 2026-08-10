(() => {
  const videos = [
    {
      id: "yRAWQz-qm-U",
      title: "Alfa Sigorta Sağlık Sigortaları Animasyonu",
      description: "Sağlık sigortası ürünlerini 8-bit oyun estetiği ve piksel animasyon diliyle anlatan dikey sosyal medya videosu.",
      tags: ["8-bit Estetik", "Piksel Animasyon", "Sosyal Medya"]
    },
    {
      id: "51PMkSZXWLU",
      title: "Alfa Sigorta – Dijital Başvuru Rehberi",
      description: "Dijital başvuru sürecini anlaşılır ve akıcı bir görsel anlatımla aktaran dikey bilgilendirme videosu.",
      tags: ["Dijital Rehber", "Motion Graphics", "Sosyal Medya"]
    }
  ];

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);

  const thumbnail = (videoId) => `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
  const fallbackThumbnail = (videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const card = [...document.querySelectorAll(".project-card")].find((item) => {
    const title = item.querySelector(".project-body h3")?.textContent?.toLocaleLowerCase("tr-TR") || "";
    return title.includes("video") && title.includes("animasyon");
  });

  if (!card || card.dataset.motionReady === "true") return;
  card.dataset.motionReady = "true";
  card.classList.add("motion-project-card");
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", "Video ve animasyon projelerini görüntüle");

  const visual = card.querySelector(".project-visual");
  const body = card.querySelector(".project-body");
  const title = body?.querySelector("h3");
  const description = body?.querySelector("p");

  if (visual) {
    visual.className = "project-visual motion-project-visual";
    visual.innerHTML = `
      <div class="motion-project-cover">
        <div class="motion-project-cover-grid">
          ${videos.map((video) => `
            <div class="motion-project-cover-panel">
              <img
                src="${thumbnail(video.id)}"
                onerror="this.onerror=null;this.src='${fallbackThumbnail(video.id)}';"
                alt=""
                loading="lazy"
                decoding="async"
              >
            </div>
          `).join("")}
        </div>
        <span class="motion-project-badge">MOTION DESIGN</span>
        <span class="motion-project-play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
        </span>
        <span class="motion-project-ratio">${videos.length} Proje · 9:16</span>
      </div>
    `;
  }

  if (title) title.textContent = "Video & Animasyon Tasarımı";
  if (description) {
    description.textContent = "Marka mesajlarını hareketli grafikler, açıklayıcı içerikler ve sosyal medya videolarıyla etkili biçimde aktarıyorum.";
  }

  if (body && !body.querySelector(".motion-project-meta")) {
    body.insertAdjacentHTML("beforeend", `
      <div class="motion-project-meta" aria-label="Proje özellikleri">
        <span>${videos.length} Video</span>
        <span>Motion Graphics</span>
        <span>Dikey İçerik</span>
      </div>
    `);
  }

  const modal = document.createElement("div");
  modal.className = "motion-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="motion-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="motion-modal-title">
      <button class="motion-modal-close" type="button" aria-label="Videoyu kapat">×</button>
      <div class="motion-modal-layout">
        <div class="motion-modal-video"></div>
        <aside class="motion-modal-details">
          <span class="motion-modal-kicker">Video & Animasyon Tasarımı</span>
          <h2 id="motion-modal-title"></h2>
          <p class="motion-modal-description"></p>
          <div class="motion-modal-tags" aria-label="Proje özellikleri"></div>
          <div class="motion-modal-footer">
            <span class="motion-modal-counter" aria-live="polite"></span>
            <div class="motion-modal-navigation">
              <button class="motion-modal-nav motion-modal-prev" type="button" aria-label="Önceki video">‹</button>
              <button class="motion-modal-nav motion-modal-next" type="button" aria-label="Sonraki video">›</button>
            </div>
          </div>
          <a class="motion-modal-youtube" href="#" target="_blank" rel="noopener noreferrer">YouTube’da İzle <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const videoFrame = modal.querySelector(".motion-modal-video");
  const modalTitle = modal.querySelector("#motion-modal-title");
  const modalDescription = modal.querySelector(".motion-modal-description");
  const modalTags = modal.querySelector(".motion-modal-tags");
  const modalCounter = modal.querySelector(".motion-modal-counter");
  const youtubeLink = modal.querySelector(".motion-modal-youtube");
  const closeButton = modal.querySelector(".motion-modal-close");
  const previousButton = modal.querySelector(".motion-modal-prev");
  const nextButton = modal.querySelector(".motion-modal-next");
  let activeIndex = 0;
  let lastFocus = null;

  const renderVideo = (autoplay = true) => {
    const video = videos[activeIndex];
    modalTitle.textContent = video.title;
    modalDescription.textContent = video.description;
    modalTags.innerHTML = video.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    modalCounter.textContent = `${activeIndex + 1} / ${videos.length}`;
    youtubeLink.href = `https://youtube.com/shorts/${video.id}`;
    videoFrame.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${video.id}?autoplay=${autoplay ? 1 : 0}&rel=0&playsinline=1"
        title="${escapeHtml(video.title)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  };

  const openModal = () => {
    lastFocus = document.activeElement;
    activeIndex = 0;
    renderVideo();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("motion-modal-open");
    closeButton.focus({ preventScroll: true });
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("motion-modal-open");
    videoFrame.replaceChildren();
    lastFocus?.focus?.({ preventScroll: true });
  };

  const showVideo = (direction) => {
    activeIndex = (activeIndex + direction + videos.length) % videos.length;
    renderVideo();
  };

  card.addEventListener("click", openModal);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal();
    }
  });
  closeButton.addEventListener("click", closeModal);
  previousButton.addEventListener("click", () => showVideo(-1));
  nextButton.addEventListener("click", () => showVideo(1));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") showVideo(-1);
    if (event.key === "ArrowRight") showVideo(1);
  });
})();
