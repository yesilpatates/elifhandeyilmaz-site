(() => {
  const webProjects = [
    {
      id: "pilavyeri",
      title: "PilavYeri – Marka Kimliği ve Responsive Web Sitesi",
      type: "Web & Arayüz Tasarımı",
      description: "PilavYeri için logo tasarımından responsive web arayüzüne kadar bütüncül bir marka deneyimi oluşturdum. Sitenin görsel dili, masaüstü ve mobil uyarlamaları ile tüm metin içerikleri tarafımdan hazırlanarak WordPress üzerinde uygulandı.",
      liveUrl: "https://www.pilavyeri.com/",
      programs: ["WordPress", "Adobe Illustrator", "Adobe Photoshop"],
      roles: ["Logo ve Marka Kimliği Tasarımı", "UI Tasarımı", "WordPress Web Tasarımı", "İçerik Yazarlığı"],
      images: [
        {
          src: "https://at.adobe.com/dVarBXG3yodZGyop",
          alt: "PilavYeri responsive web sitesi masaüstü ana sayfa arayüz tasarımı"
        },
        {
          src: "https://at.adobe.com/GZQ2KIgQJpcOmrph",
          alt: "PilavYeri mobil uyumlu responsive web sitesi arayüz tasarımı"
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
          <div>
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
            <section class="web-project-card">
              <h3>Proje Hakkında</h3>
              <p class="web-project-description"></p>
            </section>
            <section class="web-project-card">
              <h3>Kullanılan Programlar</h3>
              <div class="web-project-tags web-project-programs"></div>
            </section>
            <section class="web-project-card">
              <h3>Projedeki Rolüm</h3>
              <div class="web-project-tags web-project-roles"></div>
            </section>
            <a class="web-project-live" href="#" target="_blank" rel="noopener noreferrer">Canlı Siteyi Görüntüle <span aria-hidden="true">↗</span></a>
          </aside>
        </div>
        <button class="web-project-nav next" type="button" aria-label="Sonraki web projesi">›</button>
      </section>`;

    document.body.appendChild(modal);

    modal.querySelectorAll("[data-web-project-close]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });

    modal.querySelector(".web-project-nav.prev")?.addEventListener("click", () => {
      if (webProjects.length < 2) return;
      renderProject(activeProjectIndex - 1);
    });

    modal.querySelector(".web-project-nav.next")?.addEventListener("click", () => {
      if (webProjects.length < 2) return;
      renderProject(activeProjectIndex + 1);
    });

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

    modal.querySelectorAll(".web-project-thumb").forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("is-active", thumbIndex === activeImageIndex);
      thumb.setAttribute("aria-current", thumbIndex === activeImageIndex ? "true" : "false");
    });
  };

  const renderProject = (index) => {
    activeProjectIndex = (index + webProjects.length) % webProjects.length;
    activeImageIndex = 0;
    const project = webProjects[activeProjectIndex];
    const dialog = modal.querySelector(".web-project-dialog");
    dialog.scrollTop = 0;

    modal.querySelector(".web-project-title").textContent = project.title;
    modal.querySelector(".web-project-type").textContent = project.type;
    modal.querySelector(".web-project-description").textContent = project.description;
    modal.querySelector(".web-project-counter").textContent = `${activeProjectIndex + 1} / ${webProjects.length}`;

    const programs = modal.querySelector(".web-project-programs");
    programs.innerHTML = project.programs.map((program) => `<span>${escapeHtml(program)}</span>`).join("");

    const roles = modal.querySelector(".web-project-roles");
    roles.innerHTML = project.roles.map((role) => `<span>${escapeHtml(role)}</span>`).join("");

    const liveLink = modal.querySelector(".web-project-live");
    liveLink.href = project.liveUrl;
    liveLink.hidden = !project.liveUrl;

    const thumbnails = modal.querySelector(".web-project-thumbnails");
    thumbnails.replaceChildren();
    project.images.forEach((item, imageIndex) => {
      const button = document.createElement("button");
      button.className = "web-project-thumb";
      button.type = "button";
      button.setAttribute("aria-label", `${imageIndex + 1}. proje görselini göster`);
      button.innerHTML = `<img src="${item.src}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
      button.addEventListener("click", () => renderImage(imageIndex));
      thumbnails.appendChild(button);
    });
    thumbnails.hidden = project.images.length < 2;

    const projectNavigationEnabled = webProjects.length > 1;
    modal.querySelectorAll(".web-project-nav").forEach((button) => {
      button.classList.toggle("is-hidden", !projectNavigationEnabled);
      button.disabled = !projectNavigationEnabled;
    });

    renderImage(0);
  };

  function openModal(index = 0) {
    createModal();
    lastFocused = document.activeElement;
    renderProject(index);
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
    trigger.setAttribute("aria-label", "Web ve Arayüz projelerini görüntüle");
    trigger.addEventListener("click", () => openModal(0));
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
      return;
    }

    if (event.key === "ArrowLeft" && webProjects.length > 1) {
      event.preventDefault();
      renderProject(activeProjectIndex - 1);
      return;
    }

    if (event.key === "ArrowRight" && webProjects.length > 1) {
      event.preventDefault();
      renderProject(activeProjectIndex + 1);
      return;
    }

    if (event.key === "Tab") {
      const focusable = [...modal.querySelectorAll('button:not([disabled]),a[href]:not([hidden])')]
        .filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
