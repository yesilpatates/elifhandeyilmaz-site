(() => {
  const webProjects = [
    {
      id: "pilavyeri",
      title: "PilavYeri – Marka Kimliği ve Responsive Web Sitesi",
      type: "Web & Arayüz Tasarımı",
      description: "PilavYeri için logo tasarımından responsive web arayüzüne kadar bütüncül bir marka deneyimi oluşturdum. Sitenin görsel dili, masaüstü ve mobil uyarlamaları ile tüm metin içerikleri tarafımdan hazırlanarak WordPress üzerinde uygulandı.",
      liveUrl: "https://www.pilavyeri.com/",
      roles: ["Logo ve Marka Kimliği Tasarımı", "UI Tasarımı", "WordPress Web Tasarımı", "İçerik Yazarlığı"],
      images: [
        {
          src: "https://at.adobe.com/fdi3iSaiHK0EOe31",
          alt: "PilavYeri masaüstü ve mobil uyumlu web arayüzü sunum şablonu"
        }
      ]
    }
  ];

  let modal = null;
  let activeProjectIndex = 0;
  let activeImageIndex = 0;
  let lastFocused = null;

  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);

  const createModal = () => {
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "web-project-modal";
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "web-project-title");
    modal.innerHTML = `
      <div class="web-project-backdrop" data-web-project-close></div>
      <section class="web-project-dialog">
        <header class="web-project-header">
          <div class="web-project-heading">
            <span class="web-project-kicker">Web & Arayüz Tasarımı</span>
            <h2 class="web-project-title" id="web-project-title"></h2>
            <p class="web-project-type"></p>
          </div>
          <button class="web-project-close" type="button" aria-label="Projeyi kapat" data-web-project-close>×</button>
        </header>

        <button class="web-project-nav prev" type="button" aria-label="Önceki web projesi">‹</button>
        <div class="web-project-content">
          <div class="web-project-media">
            <div class="web-project-image-wrap">
              <div class="web-project-image-loading">Görsel yükleniyor…</div>
              <img class="web-project-image" alt="" referrerpolicy="no-referrer">
            </div>
            <div class="web-project-thumbnails" aria-label="Proje görselleri"></div>
          </div>

          <aside class="web-project-details">
            <span class="web-project-counter" aria-live="polite"></span>
            <section class="web-project-about">
              <h3>Proje Hakkında</h3>
              <p class="web-project-description"></p>
            </section>
            <section class="web-project-role-section">
              <h3>Projedeki Rolüm</h3>
              <ul class="web-project-roles"></ul>
            </section>
            <a class="web-project-live" href="#" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.4 2.5 3.7 5.5 3.7 9S14.4 18.5 12 21M12 3C9.6 5.5 8.3 8.5 8.3 12S9.6 18.5 12 21"></path></svg>
              <span>Canlı Siteyi Görüntüle</span>
            </a>
          </aside>
        </div>
        <button class="web-project-nav next" type="button" aria-label="Sonraki web projesi">›</button>
      </section>`;

    document.body.appendChild(modal);
    modal.querySelectorAll("[data-web-project-close]").forEach((element) => element.addEventListener("click", closeModal));
    return modal;
  };

  const renderImage = (index) => {
    const project = webProjects[activeProjectIndex];
    if (!project?.images?.length) return;

    activeImageIndex = (index + project.images.length) % project.images.length;
    const item = project.images[activeImageIndex];
    const image = modal.querySelector(".web-project-image");
    const loading = modal.querySelector(".web-project-image-loading");

    loading.hidden = false;
    loading.textContent = "Görsel yükleniyor…";
    image.removeAttribute("src");
    image.alt = item.alt;

    const preloader = new Image();
    preloader.decoding = "async";
    preloader.referrerPolicy = "no-referrer";
    preloader.onload = () => {
      image.src = item.src;
      loading.hidden = true;
    };
    preloader.onerror = () => {
      loading.textContent = "Görsel yüklenemedi.";
    };
    preloader.src = item.src;
  };

  const renderProject = () => {
    const project = webProjects[0];
    activeProjectIndex = 0;
    activeImageIndex = 0;
    modal.querySelector(".web-project-dialog").scrollTop = 0;
    modal.querySelector(".web-project-title").textContent = project.title;
    modal.querySelector(".web-project-type").textContent = project.type;
    modal.querySelector(".web-project-description").textContent = project.description;
    modal.querySelector(".web-project-counter").textContent = "1 / 1";
    modal.querySelector(".web-project-roles").innerHTML = project.roles
      .map((role) => `<li><span aria-hidden="true">✓</span>${escapeHtml(role)}</li>`)
      .join("");

    const liveLink = modal.querySelector(".web-project-live");
    liveLink.href = project.liveUrl;
    liveLink.hidden = !project.liveUrl;

    modal.querySelector(".web-project-thumbnails").hidden = true;
    modal.querySelectorAll(".web-project-nav").forEach((button) => {
      button.classList.add("is-hidden");
      button.disabled = true;
    });
    renderImage(0);
  };

  function openModal() {
    createModal();
    lastFocused = document.activeElement;
    renderProject();
    modal.hidden = false;
    document.body.classList.add("web-project-open");
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      modal.querySelector(".web-project-close")?.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("web-project-open");
    window.setTimeout(() => {
      modal.hidden = true;
      lastFocused?.focus?.({ preventScroll: true });
    }, 220);
  }

  const bindProjectCard = () => {
    const card = [...document.querySelectorAll(".project-card")].find((item) => {
      const title = item.querySelector(".project-body h3")?.textContent?.toLocaleLowerCase("tr-TR") || "";
      return title.includes("web") && title.includes("arayüz");
    });

    if (!card || card.dataset.webProjectsBound === "true") return Boolean(card);
    card.dataset.webProjectsBound = "true";
    card.style.position = "relative";
    card.classList.add("has-web-project-modal");
    card.querySelectorAll(".web-project-card-trigger").forEach((element) => element.remove());

    const trigger = document.createElement("button");
    trigger.className = "web-project-card-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-label", "PilavYeri web ve arayüz projesini görüntüle");
    trigger.addEventListener("click", openModal);
    card.appendChild(trigger);
    return true;
  };

  if (!bindProjectCard()) {
    const observer = new MutationObserver(() => {
      if (bindProjectCard()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 10000);
  }

  document.addEventListener("keydown", (event) => {
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  });
})();