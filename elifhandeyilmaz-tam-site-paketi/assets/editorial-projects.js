(() => {
  const projects = [
    {
      id: "yacht-news-60",
      title: "Yacht News Türkiye - 60. Sayı",
      issue: "Temmuz - Ağustos 2026",
      pages: "72 sayfa",
      cover: "assets/editorial-projects/yacht-news-turkiye-60-2026-temmuz-agustos.jpg",
      pdf: "assets/editorial-pdfs/yacht-news-turkiye-60-2026-temmuz-agustos.pdf",
      description: "Yacht News Türkiye'nin 60. sayısı için hazırlanan editoryal tasarım; küresel süperyat sektörü, yat tasarımı, festival ve zirve içeriklerini güçlü görseller ve dengeli bir yayın düzeniyle sunuyor."
    },
    {
      id: "yacht-news-59",
      title: "Yacht News Türkiye - 59. Sayı",
      issue: "Mayıs - Haziran 2026",
      pages: "68 sayfa",
      cover: "assets/editorial-projects/yacht-news-turkiye-59-2026-mayis-haziran.jpg",
      pdf: "assets/editorial-pdfs/yacht-news-turkiye-59-2026-mayis-haziran.pdf",
      description: "Yacht News Türkiye'nin 59. sayısı için hazırlanan editoryal tasarım; yat tasarımı, süperyat sahipliği, röportajlar ve sektörel içerikleri güçlü görseller ve düzenli bir yayın hiyerarşisiyle bir araya getiriyor."
    },
    {
      id: "yacht-news-58",
      title: "Yacht News Türkiye - 58. Sayı",
      issue: "Mart - Nisan 2026",
      pages: "76 sayfa",
      cover: "assets/editorial-projects/yacht-news-turkiye-58-2026-mart-nisan.jpg",
      pdf: "assets/editorial-pdfs/yacht-news-turkiye-58-2026-mart-nisan.pdf",
      description: "Yacht News Türkiye'nin 58. sayısı için hazırlanan editoryal tasarım; refit, yatçılık, denizcilik ve sektör içeriklerini güçlü görsel hiyerarşi ve dengeli sayfa düzeniyle sunuyor."
    },
    {
      id: "yacht-news-57",
      title: "Yacht News Türkiye - 57. Sayı",
      issue: "Ocak - Şubat 2026",
      pages: "76 sayfa",
      cover: "assets/editorial-projects/yacht-news-turkiye-57-2026-ocak-subat.webp",
      pdf: "assets/editorial-pdfs/yacht-news-turkiye-57-2026-ocak-subat.pdf",
      description: "Yacht News Türkiye'nin 57. sayısı için hazırlanan editoryal tasarım; yatçılık, denizcilik ve sektör içeriklerini güçlü görsel hiyerarşi, dengeli sayfa düzeni ve premium yayın diliyle bir araya getiriyor."
    },
    {
      id: "neta-sea-83-kabotaj",
      title: "Neta Sea Kabotaj Özel - 83. Sayı",
      issue: "Temmuz - Ağustos 2026",
      pages: "51 sayfa",
      cover: "assets/editorial-projects/neta-sea-kabotaj-ozel-83-2026-temmuz-agustos.jpg",
      pdf: "assets/editorial-pdfs/neta-sea-kabotaj-ozel-83-2026-temmuz-agustos.pdf",
      description: "Neta Sea'nın Kabotaj Özel 83. sayısı için hazırlanan editoryal tasarım; Kabotaj Kanunu'nun 100. yılı, Türk denizciliği, sektör temsilcileri ve Türkiye Denizcilik Zirvesi içeriklerini özel yayın diliyle sunuyor."
    },
    {
      id: "neta-sea-82-en",
      title: "Neta Sea İngilizce - 82. Sayı",
      issue: "Mayıs - Haziran 2026",
      pages: "53 sayfa",
      cover: "assets/editorial-projects/neta-sea-ingilizce-82-2026-mayis-haziran.jpg",
      pdf: "assets/editorial-pdfs/neta-sea-ingilizce-82-2026-mayis-haziran.pdf",
      description: "Neta Sea İngilizce'nin 82. sayısı için hazırlanan editoryal tasarım; Posidonia 2026, denizcilik, gemi inşa, röportajlar ve uluslararası sektör gündemini İngilizce yayın diliyle sunuyor."
    },
    {
      id: "neta-sea-81",
      title: "Neta Sea Türkçe - 81. Sayı",
      issue: "Mart - Nisan 2026",
      pages: "104 sayfa",
      cover: "assets/editorial-projects/neta-sea-turkce-81-2026-mart-nisan.jpg",
      pdf: "assets/editorial-pdfs/neta-sea-turkce-81-2026-mart-nisan.pdf",
      description: "Neta Sea Türkçe'nin 81. sayısı için hazırlanan editoryal tasarım; savunma sanayii, denizcilik, saha fuarları, tersaneler ve sektör gündemini güçlü bir görsel hiyerarşiyle sunuyor."
    },
    {
      id: "neta-sea-80",
      title: "Neta Sea Türkçe - 80. Sayı",
      issue: "Ocak - Şubat 2026",
      pages: "80 sayfa",
      cover: "assets/editorial-projects/neta-sea-turkce-80-2026-ocak-subat.jpg",
      pdf: "assets/editorial-pdfs/neta-sea-turkce-80-2026-ocak-subat.pdf",
      description: "Neta Sea Türkçe'nin 80. sayısı için hazırlanan editoryal tasarım; denizcilik ihracatı, yeşil dönüşüm, tersaneler, limanlar ve sektör röportajlarını düzenli bir yayın hiyerarşisiyle bir araya getiriyor."
    }
  ];

  const card = document.querySelector(".project-card .project-visual.visual-editorial")?.closest(".project-card");
  if (!card || card.dataset.editorialProjectsBound === "true") return;
  card.dataset.editorialProjectsBound = "true";
  card.classList.add("has-editorial-projects");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "editorial-card-trigger";
  trigger.setAttribute("aria-label", "Editoryal tasarım projelerini görüntüle");
  card.appendChild(trigger);

  const modal = document.createElement("div");
  modal.className = "editorial-modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "editorial-modal-title");
  modal.innerHTML = `
    <div class="editorial-backdrop" data-editorial-close></div>
    <section class="editorial-dialog">
      <button class="editorial-close" type="button" aria-label="Pencereyi kapat" data-editorial-close>×</button>
      <div class="editorial-grid">
        <div class="editorial-cover-wrap"><img class="editorial-cover" alt=""></div>
        <div class="editorial-copy">
          <span class="editorial-kicker">Editoryal Tasarım</span>
          <h2 id="editorial-modal-title"></h2>
          <p class="editorial-issue"></p>
          <p class="editorial-description"></p>
          <div class="editorial-meta"></div>
          <div class="editorial-project-picker" aria-label="Yayın seçimi"></div>
          <a class="button button-primary editorial-pdf-link" target="_blank" rel="noopener">PDF'yi Görüntüle <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>`;
  document.body.appendChild(modal);

  let activeProject = projects[0];
  const picker = modal.querySelector(".editorial-project-picker");
  picker.innerHTML = projects.map((project) =>
    `<button type="button" data-editorial-project="${project.id}">${project.title.replace("Yacht News Türkiye - ", "")}</button>`
  ).join("");

  const renderProject = (project) => {
    activeProject = project;
    modal.querySelector(".editorial-cover").src = project.cover;
    modal.querySelector(".editorial-cover").alt = `${project.title} dergi kapağı`;
    modal.querySelector("#editorial-modal-title").textContent = project.title;
    modal.querySelector(".editorial-issue").textContent = project.issue;
    modal.querySelector(".editorial-description").textContent = project.description;
    modal.querySelector(".editorial-meta").textContent = project.pages;
    modal.querySelector(".editorial-pdf-link").href = project.pdf;
    picker.querySelectorAll("[data-editorial-project]").forEach((button) => {
      const selected = button.dataset.editorialProject === project.id;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  picker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-editorial-project]");
    const project = projects.find((item) => item.id === button?.dataset.editorialProject);
    if (project) renderProject(project);
  });

  const pdfLink = modal.querySelector(".editorial-pdf-link");
  pdfLink.addEventListener("click", async (event) => {
    event.preventDefault();
    close();
    await import("./editorial-flipbook.js?v=20260827-fit-v3");
    window.setTimeout(() => window.openEditorialFlipbook?.(activeProject), 230);
  });
  renderProject(activeProject);

  let lastFocused = null;
  const open = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("editorial-open");
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      modal.querySelector(".editorial-close").focus({ preventScroll: true });
    });
  };
  const close = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("editorial-open");
    setTimeout(() => {
      modal.hidden = true;
      lastFocused?.focus?.({ preventScroll: true });
    }, 220);
  };

  trigger.addEventListener("click", open);
  modal.querySelectorAll("[data-editorial-close]").forEach((item) => item.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
})();
