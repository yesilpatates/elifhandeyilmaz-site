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
      features: [
        ["▣", "Responsive Tasarım"],
        ["W", "WordPress"],
        ["✎", "UI/UX Tasarımı"],
        ["▯", "Mobil Uyumlu"]
      ],
      desktop: {
        src: "https://at.adobe.com/dVarBXG3yodZGyop",
        alt: "PilavYeri responsive web sitesi masaüstü ana sayfa arayüz tasarımı"
      },
      mobile: {
        src: "https://at.adobe.com/GZQ2KIgQJpcOmrph",
        alt: "PilavYeri mobil uyumlu responsive web sitesi arayüz tasarımı"
      }
    },
    {
      id: "sigortaguru",
      title: "SigortaGuru – Sigorta Danışmanlığı Web Sitesi",
      type: "Web & Arayüz Tasarımı",
      description: "SigortaGuru için sigorta hizmetlerinin anlaşılır biçimde sunulduğu, kullanıcıların ihtiyaç duydukları poliçelere ulaşabildiği ve hızlı teklif talebi oluşturabildiği responsive bir web sitesi tasarladım. Arayüz tasarımı, sayfa yapısı, hizmet alanları ve kullanıcı yönlendirmeleri WordPress üzerinde oluşturuldu.",
      liveUrl: "https://www.sigortaguru.com/",
      programs: ["WordPress", "Kubio", "Adobe Photoshop", "Adobe Illustrator"],
      roles: ["UI Tasarımı", "WordPress Web Tasarımı", "Sayfa Kurgusu", "İçerik Düzenleme", "Görsel Uygulama"],
      features: [
        ["▣", "Responsive Tasarım"],
        ["W", "WordPress"],
        ["✎", "UI/UX Tasarımı"],
        ["▯", "Mobil Uyumlu"]
      ],
      desktop: {
        src: "https://at.adobe.com/ht82Hb6OULgGRZOw",
        alt: "SigortaGuru sigorta danışmanlığı web sitesi masaüstü arayüzü"
      },
      mobile: {
        src: "https://at.adobe.com/xxF8uU9bB1wm2IBZ",
        alt: "SigortaGuru sigorta danışmanlığı web sitesi mobil uyumlu arayüzü"
      }
    }
  ];

  let modal = null;
  let activeProjectIndex = 0;
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

        <div class="web-project-showcase">
          <div class="web-project-device-stage">
            <span class="device-label desktop-label">Masaüstü Görünüm</span>
            <div class="web-laptop" aria-label="Masaüstü site görünümü">
              <div class="web-laptop-camera" aria-hidden="true"></div>
              <div class="web-laptop-screen">
                <div class="web-device-loading">Görsel yükleniyor…</div>
                <img class="web-project-desktop-image" alt="" referrerpolicy="no-referrer">
              </div>
              <div class="web-laptop-base" aria-hidden="true"><span></span></div>
            </div>

            <span class="device-label mobile-label">Mobil Uyumlu Görünüm</span>
            <div class="web-phone" aria-label="Mobil site görünümü">
              <div class="web-phone-speaker" aria-hidden="true"></div>
              <div class="web-phone-screen">
                <div class="web-device-loading">Görsel yükleniyor…</div>
                <img class="web-project-mobile-image" alt="" referrerpolicy="no-referrer">
              </div>
            </div>
          </div>

          <div class="web-feature-badges"></div>
        </div>

        <div class="web-project-info">
          <section class="web-project-card web-project-about">
            <span class="web-project-counter" aria-live="polite"></span>
            <h3>Proje Hakkında</h3>
            <p class="web-project-description"></p>
            <a class="web-project-live" href="#" target="_blank" rel="noopener noreferrer">Canlı Siteyi Görüntüle <span aria-hidden="true">↗</span></a>
          </section>
          <section class="web-project-card">
            <h3>Kullanılan Programlar</h3>
            <div class="web-project-tags web-project-programs"></div>
          </section>
          <section class="web-project-card">
            <h3>Projedeki Rolüm</h3>
            <div class="web-project-tags web-project-roles"></div>
          </section>
        </div>

        <button class="web-project-nav next" type="button" aria-label="Sonraki web projesi">›</button>
      </section>`;

    document.body.appendChild(modal);

    modal.querySelectorAll("[data-web-project-close]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });

    modal.querySelector(".web-project-nav.prev")?.addEventListener("click", () => renderProject(activeProjectIndex - 1));
    modal.querySelector(".web-project-nav.next")?.addEventListener("click", () => renderProject(activeProjectIndex + 1));

    return modal;
  };

  const loadDeviceImage = (selector, item) => {
    const image = modal.querySelector(selector);
    const loading = image.closest(".web-laptop-screen, .web-phone-screen")?.querySelector(".web-device-loading");
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

  const renderProject = (index) => {
    activeProjectIndex = (index + webProjects.length) % webProjects.length;
    const project = webProjects[activeProjectIndex];
    const dialog = modal.querySelector(".web-project-dialog");
    dialog.scrollTop = 0;

    modal.querySelector(".web-project-title").textContent = project.title;
    modal.querySelector(".web-project-type").textContent = project.type;
    modal.querySelector(".web-project-description").textContent = project.description;
    modal.querySelector(".web-project-counter").textContent = `${activeProjectIndex + 1} / ${webProjects.length}`;

    modal.querySelector(".web-project-programs").innerHTML = project.programs
      .map((program) => `<span>${escapeHtml(program)}</span>`).join("");
    modal.querySelector(".web-project-roles").innerHTML = project.roles
      .map((role) => `<span>${escapeHtml(role)}</span>`).join("");
    modal.querySelector(".web-feature-badges").innerHTML = project.features
      .map(([icon, label]) => `<div class="web-feature-badge"><span aria-hidden="true">${escapeHtml(icon)}</span><strong>${escapeHtml(label)}</strong></div>`).join("");

    const liveLink = modal.querySelector(".web-project-live");
    liveLink.href = project.liveUrl;
    liveLink.hidden = !project.liveUrl;

    loadDeviceImage(".web-project-desktop-image", project.desktop);
    loadDeviceImage(".web-project-mobile-image", project.mobile);
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

    const visual = card.querySelector(".project-visual");
    if (visual) {
      visual.classList.add("web-category-preview");
      visual.innerHTML = `
        <div class="web-card-laptop"><img src="${webProjects[0].desktop.src}" alt="" referrerpolicy="no-referrer"></div>
        <div class="web-card-phone"><img src="${webProjects[0].mobile.src}" alt="" referrerpolicy="no-referrer"></div>
        <span class="web-card-count">${webProjects.length} proje</span>`;
    }

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
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderProject(activeProjectIndex - 1);
      return;
    }
    if (event.key === "ArrowRight") {
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