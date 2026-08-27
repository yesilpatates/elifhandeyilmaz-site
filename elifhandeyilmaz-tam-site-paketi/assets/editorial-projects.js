(() => {
  const projects = [
    {
      title: "Yacht News Türkiye - 57. Sayı",
      issue: "Ocak - Şubat 2026",
      pages: "76 sayfa",
      cover: "assets/editorial-projects/yacht-news-turkiye-57-2026-ocak-subat.webp",
      pdf: "assets/editorial-pdfs/yacht-news-turkiye-57-2026-ocak-subat.pdf",
      description: "Yacht News Türkiye'nin 57. sayısı için hazırlanan editoryal tasarım; yatçılık, denizcilik ve sektör içeriklerini güçlü görsel hiyerarşi, dengeli sayfa düzeni ve premium yayın diliyle bir araya getiriyor."
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
          <a class="button button-primary editorial-pdf-link" target="_blank" rel="noopener">PDF'yi Görüntüle <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>`;
  document.body.appendChild(modal);

  const project = projects[0];
  modal.querySelector(".editorial-cover").src = project.cover;
  modal.querySelector(".editorial-cover").alt = `${project.title} dergi kapağı`;
  modal.querySelector("#editorial-modal-title").textContent = project.title;
  modal.querySelector(".editorial-issue").textContent = project.issue;
  modal.querySelector(".editorial-description").textContent = project.description;
  modal.querySelector(".editorial-meta").textContent = project.pages;
  const pdfLink = modal.querySelector(".editorial-pdf-link");
  pdfLink.href = project.pdf;
  pdfLink.addEventListener("click", async (event) => {
    event.preventDefault();
    close();
    await import("./editorial-flipbook.js?v=20260827-fit-v3");
    window.setTimeout(() => window.openEditorialFlipbook?.(), 230);
  });

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
