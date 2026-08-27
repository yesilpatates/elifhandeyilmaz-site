import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/build/pdf.mjs";
import { PageFlip } from "https://cdn.jsdelivr.net/npm/page-flip@2.0.7/+esm";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/build/pdf.worker.mjs";

const editorialProjects = [
  {
    id: "yacht-news-57",
    title: "Yacht News Türkiye - 57. Sayı",
    description: "Ocak - Şubat 2026",
    cover: "assets/editorial-projects/yacht-news-turkiye-57-2026-ocak-subat.webp",
    pdf: "assets/editorial-pdfs/yacht-news-turkiye-57-2026-ocak-subat.pdf",
    pageCount: 76
  }
];

const pdfPromises = new Map();
const renderJobs = new Map();

let libraryModal = null;
let flipbookModal = null;
let pageFlip = null;
let activeProject = null;
let activePdf = null;
let activePages = [];
let initialized = false;
let loadingFailed = false;
let lastFocused = null;
let returnToLibrary = false;

const getPdf = (project) => {
  if (!pdfPromises.has(project.id)) {
    pdfPromises.set(
      project.id,
      pdfjsLib.getDocument({
        url: project.pdf,
        withCredentials: false,
        disableRange: false,
        disableStream: false
      }).promise
    );
  }

  return pdfPromises.get(project.id);
};

const escapeHtml = (value = "") =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[character]);

const createLibraryModal = () => {
  if (libraryModal) return libraryModal;

  libraryModal = document.createElement("div");
  libraryModal.className = "editorial-library";
  libraryModal.hidden = true;
  libraryModal.setAttribute("role", "dialog");
  libraryModal.setAttribute("aria-modal", "true");
  libraryModal.setAttribute("aria-labelledby", "editorial-library-title");

  const cards = editorialProjects.map((project) => `
    <button class="editorial-library-card" type="button" data-editorial-project="${project.id}">
      <span class="editorial-library-cover">
        <img src="${project.cover}" alt="${escapeHtml(project.title)} kapak görseli" loading="lazy" decoding="async" referrerpolicy="no-referrer">
        <span class="editorial-library-page-count">${project.pageCount} sayfa</span>
      </span>
      <span class="editorial-library-card-body">
        <strong>${escapeHtml(project.title)}</strong>
        <span>${escapeHtml(project.description)}</span>
        <em>Çevirmeli dergiyi aç →</em>
      </span>
    </button>`).join("");

  libraryModal.innerHTML = `
    <div class="editorial-library-backdrop" data-editorial-library-close></div>
    <section class="editorial-library-dialog">
      <header class="editorial-library-header">
        <div>
          <span class="editorial-flipbook-kicker">Editoryal Tasarım</span>
          <h2 id="editorial-library-title">Dergi ve katalog projeleri</h2>
          <p>İncelemek istediğiniz yayını seçin.</p>
        </div>
        <button class="editorial-flipbook-close" type="button" aria-label="Projeleri kapat" data-editorial-library-close>×</button>
      </header>
      <div class="editorial-library-grid">${cards}</div>
    </section>`;

  document.body.appendChild(libraryModal);

  libraryModal.querySelectorAll("[data-editorial-library-close]").forEach((element) => {
    element.addEventListener("click", closeLibrary);
  });

  libraryModal.querySelectorAll("[data-editorial-project]").forEach((card) => {
    card.addEventListener("click", () => {
      const project = editorialProjects.find((item) => item.id === card.dataset.editorialProject);
      if (!project) return;
      returnToLibrary = true;
      closeLibrary(false);
      openFlipbook(project);
    });
  });

  return libraryModal;
};

const createFlipbookModal = () => {
  if (flipbookModal) return flipbookModal;

  flipbookModal = document.createElement("div");
  flipbookModal.className = "editorial-flipbook";
  flipbookModal.hidden = true;
  flipbookModal.setAttribute("role", "dialog");
  flipbookModal.setAttribute("aria-modal", "true");
  flipbookModal.setAttribute("aria-labelledby", "editorial-flipbook-title");
  flipbookModal.innerHTML = `
    <div class="editorial-flipbook-backdrop" data-editorial-close></div>
    <section class="editorial-flipbook-dialog">
      <header class="editorial-flipbook-header">
        <div>
          <span class="editorial-flipbook-kicker">Editoryal Tasarım</span>
          <h2 class="editorial-flipbook-title" id="editorial-flipbook-title"></h2>
          <p class="editorial-flipbook-description"></p>
        </div>
        <button class="editorial-flipbook-close" type="button" aria-label="Dergiyi kapat" data-editorial-close>×</button>
      </header>

      <div class="editorial-flipbook-stage">
        <button class="editorial-flipbook-nav editorial-flipbook-prev" type="button" aria-label="Önceki sayfa">‹</button>
        <div class="editorial-book-shell">
          <div class="editorial-book" id="editorial-book"></div>
        </div>
        <button class="editorial-flipbook-nav editorial-flipbook-next" type="button" aria-label="Sonraki sayfa">›</button>
        <div class="editorial-flipbook-loading">Dergi hazırlanıyor…</div>
      </div>

      <details class="editorial-flipbook-project-info" hidden style="padding:10px 24px 12px;border-top:1px solid #e0d7cb;background:#fff;color:#4f5868;font-size:.84rem;line-height:1.58;overflow:auto;max-height:180px;">
        <summary style="cursor:pointer;color:#078f99;font-weight:700;list-style-position:inside;">Proje açıklaması</summary>
        <p class="editorial-flipbook-project-details" style="margin:10px 0 0;"></p>
        <p class="editorial-flipbook-project-note" style="margin:9px 0 0;padding:9px 11px;border-left:3px solid #07beb8;background:#f4fbfa;color:#586170;"></p>
      </details>

      <footer class="editorial-flipbook-toolbar">
        <button type="button" data-editorial-projects>Projeler</button>
        <button type="button" data-editorial-first>İlk sayfa</button>
        <span class="editorial-flipbook-counter" aria-live="polite">1 / 1</span>
        <button type="button" data-editorial-fullscreen>Tam ekran</button>
      </footer>
    </section>`;

  document.body.appendChild(flipbookModal);

  flipbookModal.querySelectorAll("[data-editorial-close]").forEach((element) => {
    element.addEventListener("click", () => closeFlipbook());
  });

  flipbookModal.querySelector(".editorial-flipbook-prev")?.addEventListener("click", goPrevious);
  flipbookModal.querySelector(".editorial-flipbook-next")?.addEventListener("click", goNext);
  flipbookModal.querySelector("[data-editorial-first]")?.addEventListener("click", async () => {
    await ensurePagesAround(0);
    pageFlip?.turnToPage(0);
  });
  flipbookModal.querySelector("[data-editorial-projects]")?.addEventListener("click", () => {
    returnToLibrary = false;
    closeFlipbook(true);
  });
  flipbookModal.querySelector("[data-editorial-fullscreen]")?.addEventListener("click", async () => {
    const dialog = flipbookModal.querySelector(".editorial-flipbook-dialog");
    try {
      if (!document.fullscreenElement) {
        await dialog?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (error) {
      console.info("Tam ekran açılamadı:", error);
    }
  });

  return flipbookModal;
};

const updateCounter = (index, total) => {
  const counter = flipbookModal?.querySelector(".editorial-flipbook-counter");
  if (!counter) return;
  const page = Math.min(index + 1, total);
  counter.textContent = page === 1
    ? `Kapak · 1 / ${total}`
    : `${page}–${Math.min(page + 1, total)} / ${total}`;
};

const updateFlipbookHeader = (project) => {
  const title = flipbookModal?.querySelector(".editorial-flipbook-title");
  const description = flipbookModal?.querySelector(".editorial-flipbook-description");
  const info = flipbookModal?.querySelector(".editorial-flipbook-project-info");
  const details = flipbookModal?.querySelector(".editorial-flipbook-project-details");
  const note = flipbookModal?.querySelector(".editorial-flipbook-project-note");

  if (title) title.textContent = project.title;
  if (description) description.textContent = project.description;

  if (info) {
    info.open = false;
    info.hidden = !(project.details || project.note);
  }
  if (details) {
    details.textContent = project.details || "";
    details.hidden = !project.details;
  }
  if (note) {
    note.textContent = project.note ? `Not: ${project.note}` : "";
    note.hidden = !project.note;
  }
};

const resetFlipbook = () => {
  try {
    pageFlip?.destroy?.();
  } catch (error) {
    console.info("Önceki dergi görünümü kapatıldı:", error);
  }

  pageFlip = null;
  activePdf = null;
  activePages = [];
  renderJobs.clear();
  initialized = false;
  loadingFailed = false;

  const book = flipbookModal?.querySelector("#editorial-book");
  const loading = flipbookModal?.querySelector(".editorial-flipbook-loading");
  flipbookModal?.querySelector(".editorial-flipbook-error")?.remove();

  if (book) book.replaceChildren();
  if (loading) {
    loading.hidden = false;
    loading.textContent = "Dergi hazırlanıyor…";
  }
};

const renderPage = async (pageNumber) => {
  if (!activePdf || !activeProject || pageNumber < 1 || pageNumber > activePdf.numPages) return;
  const pageData = activePages[pageNumber - 1];
  if (!pageData || pageData.rendered) return;
  if (renderJobs.has(pageNumber)) return renderJobs.get(pageNumber);

  const job = (async () => {
    const page = await activePdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: pageData.scale });
    const { canvas, element } = pageData;
    const context = canvas.getContext("2d", { alpha: false });

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    canvas.setAttribute("aria-label", `${activeProject.title}, sayfa ${pageNumber}`);

    await page.render({ canvasContext: context, viewport }).promise;
    pageData.rendered = true;
    element.classList.add("is-rendered");
  })().finally(() => renderJobs.delete(pageNumber));

  renderJobs.set(pageNumber, job);
  return job;
};

const ensurePagesAround = async (pageIndex, radius = 4) => {
  if (!activePdf) return;
  const start = Math.max(1, pageIndex + 1 - radius);
  const end = Math.min(activePdf.numPages, pageIndex + 1 + radius);
  const tasks = [];

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    tasks.push(renderPage(pageNumber));
  }

  await Promise.all(tasks);
};

const finishInitialization = (loading, total) => {
  pageFlip?.update();
  updateCounter(0, total);
  flipbookModal?.querySelector(".editorial-flipbook-dialog")?.classList.add("is-cover-view");
  loading.hidden = true;
  initialized = true;
};

const renderPdfPages = async (project) => {
  activePdf = await getPdf(project);
  const book = flipbookModal.querySelector("#editorial-book");
  const loading = flipbookModal.querySelector(".editorial-flipbook-loading");

  if (!book || !loading) return;

  const firstPage = await activePdf.getPage(1);
  const baseViewport = firstPage.getViewport({ scale: 1 });
  const longDocument = activePdf.numPages > 40;
  const deviceScale = Math.min(window.devicePixelRatio || 1, longDocument ? 1.15 : 1.45);
  const renderScale = Math.max(longDocument ? 1 : 1.08, deviceScale);
  const pages = [];

  for (let pageNumber = 1; pageNumber <= activePdf.numPages; pageNumber += 1) {
    const pageElement = document.createElement("div");
    pageElement.className = "editorial-page";

    if (pageNumber === 1 || pageNumber === activePdf.numPages) {
      pageElement.dataset.density = "hard";
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(baseViewport.width * 0.08));
    canvas.height = Math.max(1, Math.round(baseViewport.height * 0.08));
    canvas.setAttribute("aria-label", `${project.title}, sayfa ${pageNumber}`);
    pageElement.appendChild(canvas);
    book.appendChild(pageElement);

    activePages.push({
      element: pageElement,
      canvas,
      scale: renderScale,
      rendered: false
    });
    pages.push(pageElement);
  }

  loading.textContent = "Kapak hazırlanıyor…";
  await renderPage(1);

  const sourceWidth = Math.round(baseViewport.width);
  const sourceHeight = Math.round(baseViewport.height);
  const ratio = sourceHeight / sourceWidth;
  const stage = flipbookModal.querySelector(".editorial-flipbook-stage");
  const mobileView = window.matchMedia("(max-width: 820px)").matches;
  const availableHeight = Math.max(320, (stage?.clientHeight || 760) - 28);
  const availableWidth = Math.max(
    260,
    mobileView
      ? (stage?.clientWidth || 620) - 24
      : ((stage?.clientWidth || 1400) - 156) / 2
  );
  const fittedPageWidth = Math.floor(Math.min(740, availableWidth, availableHeight / ratio));
  const fittedPageHeight = Math.floor(fittedPageWidth * ratio);

  pageFlip = new PageFlip(book, {
    width: sourceWidth,
    height: sourceHeight,
    size: "stretch",
    minWidth: 260,
    maxWidth: fittedPageWidth,
    minHeight: Math.round(260 * ratio),
    maxHeight: fittedPageHeight,
    maxShadowOpacity: 0.38,
    showCover: true,
    mobileScrollSupport: false,
    usePortrait: true,
    autoSize: true,
    drawShadow: true,
    flippingTime: 850,
    swipeDistance: 24,
    clickEventForward: true,
    useMouseEvents: true,
    showPageCorners: true,
    disableFlipByClick: false
  });

  pageFlip.on("flip", (event) => {
    const index = Number(event.data);
    flipbookModal
      ?.querySelector(".editorial-flipbook-dialog")
      ?.classList.toggle("is-cover-view", index === 0);
    updateCounter(index, activePdf.numPages);
    ensurePagesAround(index).catch((error) => console.info("Sayfa ön yükleme hatası:", error));
  });
  pageFlip.on("init", () => finishInitialization(loading, activePdf.numPages));

  pageFlip.loadFromHTML(pages);

  window.setTimeout(() => {
    if (!initialized) finishInitialization(loading, activePdf.numPages);
  }, 180);

  ensurePagesAround(0, 6).catch((error) => console.info("İlk sayfalar hazırlanamadı:", error));
};

const showLoadError = (error) => {
  loadingFailed = true;
  const stage = flipbookModal?.querySelector(".editorial-flipbook-stage");
  const loading = flipbookModal?.querySelector(".editorial-flipbook-loading");
  if (!stage || !loading || !activeProject) return;

  loading.hidden = true;
  stage.querySelector(".editorial-flipbook-error")?.remove();

  const message = document.createElement("div");
  message.className = "editorial-flipbook-error";
  message.innerHTML = `
    <strong>PDF görüntülenemedi.</strong>
    <span>Dosyayı normal PDF görünümünde açabilirsiniz.</span>
    <a href="${activeProject.pdf}" target="_blank" rel="noopener">PDF’yi aç</a>`;
  stage.appendChild(message);
  console.error("Editoryal PDF yüklenemedi:", error);
};

async function openLibrary() {
  createLibraryModal();
  lastFocused = document.activeElement;
  libraryModal.hidden = false;
  document.body.classList.add("editorial-flipbook-open");

  requestAnimationFrame(() => {
    libraryModal.classList.add("is-open");
    libraryModal.querySelector(".editorial-flipbook-close")?.focus({ preventScroll: true });
  });
}

function closeLibrary(restoreFocus = true) {
  if (!libraryModal) return;
  libraryModal.classList.remove("is-open");

  window.setTimeout(() => {
    libraryModal.hidden = true;
    if (!flipbookModal || flipbookModal.hidden) {
      document.body.classList.remove("editorial-flipbook-open");
    }
    if (restoreFocus) lastFocused?.focus?.({ preventScroll: true });
  }, 220);
}

async function openFlipbook(project) {
  createFlipbookModal();
  activeProject = project;
  resetFlipbook();
  updateFlipbookHeader(project);

  flipbookModal.hidden = false;
  document.body.classList.add("editorial-flipbook-open");

  requestAnimationFrame(() => {
    flipbookModal.classList.add("is-open");
    flipbookModal.querySelector(".editorial-flipbook-close")?.focus({ preventScroll: true });
  });

  try {
    await renderPdfPages(project);
  } catch (error) {
    showLoadError(error);
  }
}

window.openEditorialFlipbook = () => openFlipbook(editorialProjects[0]);

function closeFlipbook(openProjects = false) {
  if (!flipbookModal) return;
  flipbookModal.classList.remove("is-open");

  window.setTimeout(() => {
    flipbookModal.hidden = true;

    if (openProjects || returnToLibrary) {
      returnToLibrary = false;
      openLibrary();
    } else {
      document.body.classList.remove("editorial-flipbook-open");
      lastFocused?.focus?.({ preventScroll: true });
    }
  }, 220);
}

async function goPrevious() {
  if (!pageFlip || !activePdf) return;
  const target = Math.max(0, pageFlip.getCurrentPageIndex() - 2);
  await ensurePagesAround(target);
  pageFlip.flipPrev("top");
}

async function goNext() {
  if (!pageFlip || !activePdf) return;
  const target = Math.min(activePdf.numPages - 1, pageFlip.getCurrentPageIndex() + 2);
  await ensurePagesAround(target);
  pageFlip.flipNext("top");
}

const enhanceEditorialCard = () => {
  const cards = [...document.querySelectorAll(".project-card")];
  const card = cards.find((item) =>
    item.querySelector(".project-body h3")?.textContent
      ?.toLocaleLowerCase("tr-TR")
      .includes("editoryal")
  );
  if (!card || card.dataset.editorialProjectsBound === "true" || card.dataset.editorialFlipbook === "true") return;

  card.dataset.editorialFlipbook = "true";
  card.classList.add("has-editorial-flipbook");
  card.querySelectorAll(".editorial-card-modal-trigger, .project-card-hitarea").forEach((item) => item.remove());

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "editorial-card-modal-trigger";
  trigger.setAttribute("aria-label", "Editoryal tasarım dergi ve katalog projelerini aç");
  trigger.addEventListener("click", openLibrary);
  card.appendChild(trigger);
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (flipbookModal && !flipbookModal.hidden) {
      event.preventDefault();
      returnToLibrary = false;
      closeFlipbook();
    } else if (libraryModal && !libraryModal.hidden) {
      event.preventDefault();
      closeLibrary();
    }
    return;
  }

  if (!flipbookModal || flipbookModal.hidden) return;

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrevious();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.setTimeout(enhanceEditorialCard, 650), { once: true });
} else {
  window.setTimeout(enhanceEditorialCard, 650);
}
