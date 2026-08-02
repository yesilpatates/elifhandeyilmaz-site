import * as pdfjsLib from "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/build/pdf.mjs";
import { PageFlip } from "https://cdn.jsdelivr.net/npm/page-flip@2.0.7/+esm";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.1.200/build/pdf.worker.mjs";

const editorialProject = {
  title: "Edinburg Tarih, Kültür ve Zamansız Güzellik",
  description: "Kültür Dergisi",
  cover: "https://at.adobe.com/m5Vj9pElJnE08K92",
  pdf: "https://at.adobe.com/TkIXxlc92bi9TucR"
};

let pdfPromise = null;
let pageFlip = null;
let modal = null;
let initialized = false;
let loadingFailed = false;
let lastFocused = null;

const getPdf = () => {
  if (!pdfPromise) {
    pdfPromise = pdfjsLib.getDocument({
      url: editorialProject.pdf,
      withCredentials: false,
      disableRange: false,
      disableStream: false
    }).promise;
  }
  return pdfPromise;
};

const createModal = () => {
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "editorial-flipbook";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "editorial-flipbook-title");
  modal.innerHTML = `
    <div class="editorial-flipbook-backdrop" data-editorial-close></div>
    <section class="editorial-flipbook-dialog">
      <header class="editorial-flipbook-header">
        <div>
          <span class="editorial-flipbook-kicker">Editoryal Tasarım</span>
          <h2 class="editorial-flipbook-title" id="editorial-flipbook-title">${editorialProject.title}</h2>
          <p class="editorial-flipbook-description">${editorialProject.description}</p>
        </div>
        <button class="editorial-flipbook-close" type="button" aria-label="Dergiyi kapat" data-editorial-close>×</button>
      </header>

      <div class="editorial-flipbook-stage">
        <button class="editorial-flipbook-nav editorial-flipbook-prev" type="button" aria-label="Önceki sayfa">‹</button>
        <div class="editorial-book-shell">
          <div class="editorial-book" id="edinburg-book"></div>
        </div>
        <button class="editorial-flipbook-nav editorial-flipbook-next" type="button" aria-label="Sonraki sayfa">›</button>
        <div class="editorial-flipbook-loading">Dergi hazırlanıyor…</div>
      </div>

      <footer class="editorial-flipbook-toolbar">
        <button type="button" data-editorial-first>İlk sayfa</button>
        <span class="editorial-flipbook-counter" aria-live="polite">1 / 21</span>
        <button type="button" data-editorial-fullscreen>Tam ekran</button>
      </footer>
    </section>`;

  document.body.appendChild(modal);

  modal.querySelectorAll("[data-editorial-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  modal.querySelector(".editorial-flipbook-prev")?.addEventListener("click", () => pageFlip?.flipPrev("top"));
  modal.querySelector(".editorial-flipbook-next")?.addEventListener("click", () => pageFlip?.flipNext("top"));
  modal.querySelector("[data-editorial-first]")?.addEventListener("click", () => pageFlip?.turnToPage(0));
  modal.querySelector("[data-editorial-fullscreen]")?.addEventListener("click", async () => {
    const dialog = modal.querySelector(".editorial-flipbook-dialog");
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

  return modal;
};

const updateCounter = (index, total) => {
  const counter = modal?.querySelector(".editorial-flipbook-counter");
  if (!counter) return;
  counter.textContent = `${Math.min(index + 1, total)} / ${total}`;
};

const renderPdfPages = async () => {
  const pdf = await getPdf();
  const book = modal.querySelector("#edinburg-book");
  const loading = modal.querySelector(".editorial-flipbook-loading");

  if (!book || !loading) return;

  book.replaceChildren();
  const pages = [];
  const renderScale = Math.min(1.5, Math.max(1.08, window.devicePixelRatio || 1));

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: renderScale });
    const pageElement = document.createElement("div");
    pageElement.className = "editorial-page";

    if (pageNumber === 1 || pageNumber === pdf.numPages) {
      pageElement.dataset.density = "hard";
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    canvas.setAttribute("aria-label", `${editorialProject.title}, sayfa ${pageNumber}`);
    pageElement.appendChild(canvas);
    book.appendChild(pageElement);

    await page.render({ canvasContext: context, viewport }).promise;
    pages.push(pageElement);
    loading.textContent = `Dergi hazırlanıyor… ${pageNumber} / ${pdf.numPages}`;
  }

  pageFlip = new PageFlip(book, {
    width: 595,
    height: 842,
    size: "stretch",
    minWidth: 280,
    maxWidth: 720,
    minHeight: 396,
    maxHeight: 1018,
    maxShadowOpacity: 0.38,
    showCover: true,
    mobileScrollSupport: false,
    usePortrait: true,
    autoSize: true,
    drawShadow: true,
    flippingTime: 850,
    swipeDistance: 24,
    clickEventForward: true
  });

  pageFlip.on("flip", (event) => updateCounter(Number(event.data), pdf.numPages));
  pageFlip.loadFromHtml(pages);
  updateCounter(0, pdf.numPages);
  loading.hidden = true;
  initialized = true;
};

const showLoadError = (error) => {
  loadingFailed = true;
  const stage = modal?.querySelector(".editorial-flipbook-stage");
  const loading = modal?.querySelector(".editorial-flipbook-loading");
  if (!stage || !loading) return;

  loading.hidden = true;
  stage.querySelector(".editorial-flipbook-error")?.remove();

  const message = document.createElement("div");
  message.className = "editorial-flipbook-error";
  message.innerHTML = `
    <strong>PDF görüntülenemedi.</strong>
    <span>Dosyayı normal PDF görünümünde açabilirsiniz.</span>
    <a href="${editorialProject.pdf}" target="_blank" rel="noopener">PDF’yi aç</a>`;
  stage.appendChild(message);
  console.error("Editoryal PDF yüklenemedi:", error);
};

async function openModal() {
  createModal();
  lastFocused = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("editorial-flipbook-open");

  requestAnimationFrame(() => {
    modal.classList.add("is-open");
    modal.querySelector(".editorial-flipbook-close")?.focus({ preventScroll: true });
  });

  if (!initialized && !loadingFailed) {
    try {
      await renderPdfPages();
    } catch (error) {
      showLoadError(error);
    }
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("editorial-flipbook-open");

  window.setTimeout(() => {
    modal.hidden = true;
    lastFocused?.focus?.({ preventScroll: true });
  }, 220);
}

const setEditorialCover = (card) => {
  const visual = card.querySelector(".project-visual");
  if (!visual) return;

  const image = new Image();
  image.className = "editorial-card-cover";
  image.src = editorialProject.cover;
  image.alt = `${editorialProject.title} kapak görseli`;
  image.loading = "eager";
  image.decoding = "async";
  image.referrerPolicy = "no-referrer";
  image.addEventListener("load", () => visual.replaceChildren(image), { once: true });
};

const enhanceEditorialCard = () => {
  const cards = [...document.querySelectorAll(".project-card")];
  const card = cards[1];
  if (!card || card.dataset.editorialFlipbook === "true") return;

  card.dataset.editorialFlipbook = "true";
  card.classList.add("has-editorial-flipbook");
  card.querySelectorAll(".editorial-card-modal-trigger, .project-card-hitarea").forEach((item) => item.remove());

  const title = card.querySelector(".project-body h3");
  const description = card.querySelector(".project-body p");
  if (title) title.textContent = editorialProject.title;
  if (description) description.textContent = editorialProject.description;

  setEditorialCover(card);

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "editorial-card-modal-trigger";
  trigger.setAttribute("aria-label", `${editorialProject.title} çevirmeli dergisini aç`);
  trigger.addEventListener("click", openModal);
  card.appendChild(trigger);
};

document.addEventListener("keydown", (event) => {
  if (!modal || modal.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    pageFlip?.flipPrev("top");
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    pageFlip?.flipNext("top");
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.setTimeout(enhanceEditorialCard, 650), { once: true });
} else {
  window.setTimeout(enhanceEditorialCard, 650);
}
