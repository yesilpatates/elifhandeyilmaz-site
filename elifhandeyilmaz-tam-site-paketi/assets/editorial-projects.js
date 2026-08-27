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
    },
    {
      id: "edinburgh-sehir-rehberi",
      title: "Edinburgh Şehir Tanıtım Rehberi",
      issue: "Şehir Tanıtım Rehberi",
      pages: "28 sayfa",
      cover: "assets/editorial-projects/edinburgh-sehir-tanitim-rehberi.jpg",
      pdf: "assets/editorial-pdfs/edinburgh-sehir-tanitim-rehberi.pdf",
      description: "Edinburgh'un tarihî dokusunu, mimarisini ve kent atmosferini güçlü fotoğraflar, rafine tipografi ve dengeli sayfa düzeniyle bir araya getiren şehir tanıtım rehberi."
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

  const libraryModal = document.createElement("div");
  libraryModal.className = "editorial-modal editorial-library-modal";
  libraryModal.hidden = true;
  libraryModal.setAttribute("role", "dialog");
  libraryModal.setAttribute("aria-modal", "true");
  libraryModal.setAttribute("aria-labelledby", "editorial-library-title");
  libraryModal.innerHTML = `
    <div class="editorial-backdrop" data-editorial-library-close></div>
    <section class="editorial-library-dialog">
      <header class="editorial-library-header">
        <div>
          <span class="editorial-kicker">Editoryal Tasarım</span>
          <h2 id="editorial-library-title">Dergiler</h2>
        </div>
        <button class="editorial-close" type="button" aria-label="Pencereyi kapat" data-editorial-library-close>×</button>
      </header>
      <div class="editorial-library-grid">
        <section class="editorial-library-group" aria-labelledby="yacht-news-issues-title">
          <h3 id="yacht-news-issues-title">Yacht News Sayıları</h3>
          <div class="editorial-library-covers">
            ${projects.filter((project) => project.id.startsWith("yacht-news")).map((project) => `
              <button class="editorial-library-card" type="button" data-editorial-project="${project.id}" aria-label="${project.title} yayınını görüntüle">
                <img src="${project.cover}" alt="${project.title} dergi kapağı" loading="lazy" decoding="async">
              </button>`).join("")}
          </div>
        </section>
        <section class="editorial-library-group" aria-labelledby="neta-sea-issues-title">
          <h3 id="neta-sea-issues-title">Neta Sea Sayıları</h3>
          <div class="editorial-library-covers">
            ${projects.filter((project) => project.id.startsWith("neta-sea")).map((project) => `
              <button class="editorial-library-card" type="button" data-editorial-project="${project.id}" aria-label="${project.title} yayınını görüntüle">
                <img src="${project.cover}" alt="${project.title} dergi kapağı" loading="lazy" decoding="async">
            </button>`).join("")}
          </div>
        </section>
        <section class="editorial-library-group editorial-library-group-other" aria-labelledby="other-editorial-title">
          <h3 id="other-editorial-title">Diğer Editoryal Tasarımlar</h3>
          <div class="editorial-library-covers">
            ${projects.filter((project) =>
              !project.id.startsWith("yacht-news") && !project.id.startsWith("neta-sea")
            ).map((project) => `
              <button class="editorial-library-card" type="button" data-editorial-project="${project.id}" aria-label="${project.title} yayınını görüntüle">
                <img src="${project.cover}" alt="${project.title} kapak görseli" loading="lazy" decoding="async">
              </button>`).join("")}
          </div>
        </section>
      </div>
    </section>`;
  document.body.appendChild(libraryModal);

  const detailModal = document.createElement("div");
  detailModal.className = "editorial-modal";
  detailModal.hidden = true;
  detailModal.setAttribute("role", "dialog");
  detailModal.setAttribute("aria-modal", "true");
  detailModal.setAttribute("aria-labelledby", "editorial-modal-title");
  detailModal.innerHTML = `
    <div class="editorial-backdrop" data-editorial-detail-close></div>
    <section class="editorial-dialog">
      <button class="editorial-back" type="button" aria-label="Tüm dergilere dön" data-editorial-detail-back>← <span>Tüm Dergiler</span></button>
      <button class="editorial-close" type="button" aria-label="Pencereyi kapat" data-editorial-detail-close>×</button>
      <div class="editorial-grid">
        <div class="editorial-cover-wrap"><img class="editorial-cover" alt=""></div>
        <div class="editorial-copy">
          <span class="editorial-kicker">Editoryal Tasarım</span>
          <h2 id="editorial-modal-title"></h2>
          <p class="editorial-issue"></p>
          <p class="editorial-description"></p>
          <div class="editorial-meta"></div>
          <a class="button button-primary editorial-pdf-link" target="_blank" rel="noopener">PDF'yi Görüntüle <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>`;
  document.body.appendChild(detailModal);

  let activeProject = projects[0];
  const renderProject = (project) => {
    activeProject = project;
    detailModal.querySelector(".editorial-cover").src = project.cover;
    detailModal.querySelector(".editorial-cover").alt = `${project.title} dergi kapağı`;
    detailModal.querySelector("#editorial-modal-title").textContent = project.title;
    detailModal.querySelector(".editorial-issue").textContent = project.issue;
    detailModal.querySelector(".editorial-description").textContent = project.description;
    detailModal.querySelector(".editorial-meta").textContent = project.pages;
    detailModal.querySelector(".editorial-pdf-link").href = project.pdf;
  };

  let lastFocused = null;
  const showModal = (modal) => {
    modal.hidden = false;
    document.body.classList.add("editorial-open");
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      modal.querySelector(".editorial-close")?.focus({ preventScroll: true });
    });
  };
  const hideModal = (modal, onHidden) => {
    modal.classList.remove("is-open");
    window.setTimeout(() => {
      modal.hidden = true;
      onHidden?.();
    }, 220);
  };
  const openLibrary = (rememberFocus = true) => {
    if (rememberFocus) lastFocused = document.activeElement;
    showModal(libraryModal);
  };
  const closeLibrary = () => {
    hideModal(libraryModal, () => {
      document.body.classList.remove("editorial-open");
      lastFocused?.focus?.({ preventScroll: true });
    });
  };
  const openDetail = (project) => {
    renderProject(project);
    hideModal(libraryModal, () => showModal(detailModal));
  };
  const closeDetail = () => hideModal(detailModal, () => showModal(libraryModal));

  libraryModal.querySelector(".editorial-library-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-editorial-project]");
    const project = projects.find((item) => item.id === button?.dataset.editorialProject);
    if (project) openDetail(project);
  });

  const pdfLink = detailModal.querySelector(".editorial-pdf-link");
  pdfLink.addEventListener("click", async (event) => {
    event.preventDefault();
    hideModal(detailModal, () => document.body.classList.remove("editorial-open"));
    await import("./editorial-flipbook.js?v=20260827-fit-v3");
    window.setTimeout(() => window.openEditorialFlipbook?.(activeProject), 230);
  });

  trigger.addEventListener("click", () => openLibrary());
  libraryModal.querySelectorAll("[data-editorial-library-close]").forEach((item) => item.addEventListener("click", closeLibrary));
  detailModal.querySelectorAll("[data-editorial-detail-close]").forEach((item) => item.addEventListener("click", closeDetail));
  detailModal.querySelector("[data-editorial-detail-back]")?.addEventListener("click", closeDetail);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!detailModal.hidden) closeDetail();
    else if (!libraryModal.hidden) closeLibrary();
  });
})();
