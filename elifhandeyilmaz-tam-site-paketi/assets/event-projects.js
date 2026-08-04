(() => {
  const eventProjects = [
    {
      id: "5-turkiye-denizcilik-zirvesi",
      title: "5. Türkiye Denizcilik Zirvesi",
      available: true,
      cover: "assets/event-projects/turkiye-denizcilik-zirvesi/01-ana-mockup.webp",
      description: [
        "Ulaştırma ve Altyapı Bakanlığı tarafından geleneksel olarak düzenlenen Türkiye Denizcilik Zirvesi’nin beşincisi, 2–3 Temmuz 2026 tarihlerinde Tersane İstanbul’da gerçekleştirildi.",
        "Kamu kuruluşları, özel sektör, akademik çevreler ve uluslararası kuruluşların temsilcilerini bir araya getiren zirvede; Kabotaj Kanunu’nun 100. yılı, Türk denizciliğinin gelişimi, deniz ticaretindeki dönüşüm, limancılık, lojistik, sürdürülebilirlik ve küresel tedarik zincirlerinin geleceği ele alındı."
      ],
      works: [
        "Etkinlik görsel kimliği ve uygulama sistemi",
        "Sahne, LED ekran ve kürsü tasarımları",
        "Backdrop ve karşılama alanları",
        "Açık alan bayrakları ve yönlendirmeler",
        "Yaka kartı ve boyun askısı",
        "Davetiye, program ve basılı materyaller",
        "Masaüstü uygulamaları ve organizasyon ekipmanları"
      ],
      role: "Etkinliğin görsel kimliğinin farklı basılı, dijital ve mekânsal uygulamalara uyarlanması; tasarım bütünlüğünün korunması ve organizasyon materyallerinin üretime hazırlanması.",
      images: [
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/01-ana-mockup.webp", alt: "5. Türkiye Denizcilik Zirvesi ana organizasyon mockup sunumu" },
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/02-sahne-led.webp", alt: "5. Türkiye Denizcilik Zirvesi sahne ve LED ekran uygulaması" },
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/03-karsilama-backdrop.webp", alt: "5. Türkiye Denizcilik Zirvesi karşılama backdrop uygulaması" },
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/04-acik-alan.webp", alt: "5. Türkiye Denizcilik Zirvesi açık alan bayrak ve yönlendirme uygulamaları" },
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/05-konusma.webp", alt: "5. Türkiye Denizcilik Zirvesi konuşma ve sahne görünümü" },
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/06-masa-bayraklari.webp", alt: "5. Türkiye Denizcilik Zirvesi masa bayrakları ve mekân detayı" },
        { src: "assets/event-projects/turkiye-denizcilik-zirvesi/07-gala-neta-sea.webp", alt: "5. Türkiye Denizcilik Zirvesi gala alanı ve Neta Sea dergisi" }
      ]
    },
    { id: "denizci-kadinlar-gunu", title: "Denizci Kadınlar Günü", available: false },
    { id: "yesil-donusum-zirvesi", title: "II. Yeşil Dönüşüm Zirvesi", available: false },
    { id: "ulusal-gemi-yat-tasarim-yarismasi", title: "XIV. Ulusal Gemi ve Yat Tasarım Yarışması", available: false },
    { id: "denizci-fenerbahceliler-dernegi", title: "Denizci Fenerbahçeliler Derneği", available: false }
  ];

  const findEventCard = () => [...document.querySelectorAll(".project-card")].find((card) => {
    const title = card.querySelector(".project-body h3")?.textContent?.toLocaleLowerCase("tr-TR") || "";
    return title.includes("etkinlik") && title.includes("organizasyon");
  });

  const eventCard = findEventCard();
  if (!eventCard || eventCard.dataset.eventProjectsReady === "true") return;
  eventCard.dataset.eventProjectsReady = "true";

  const modal = document.createElement("div");
  modal.className = "event-project-modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "event-project-title");
  modal.innerHTML = `
    <div class="event-project-backdrop" data-event-close></div>
    <article class="event-project-dialog">
      <header class="event-project-header">
        <button class="event-project-back" type="button" aria-label="Tüm organizasyonlara dön" hidden>
          <span aria-hidden="true">←</span><span>Tüm Organizasyonlar</span>
        </button>
        <div class="event-project-heading">
          <span class="event-project-kicker">Etkinlik & Organizasyon Tasarımı</span>
          <h2 id="event-project-title">Organizasyon Projeleri</h2>
          <p class="event-project-subtitle">Seçili etkinlik kimlikleri ve mekânsal tasarım uygulamaları</p>
        </div>
        <button class="event-project-close" type="button" aria-label="Pencereyi kapat" data-event-close>×</button>
      </header>

      <div class="event-project-list-view">
        <div class="event-project-grid"></div>
      </div>

      <div class="event-project-detail-view" hidden>
        <div class="event-gallery">
          <div class="event-gallery-stage">
            <div class="event-gallery-loading" aria-hidden="true"></div>
            <img class="event-gallery-image" alt="">
            <button class="event-gallery-arrow prev" type="button" aria-label="Önceki görsel">‹</button>
            <button class="event-gallery-arrow next" type="button" aria-label="Sonraki görsel">›</button>
            <span class="event-gallery-counter" aria-live="polite"></span>
          </div>
          <div class="event-gallery-thumbs" aria-label="Proje görselleri"></div>
        </div>
        <div class="event-project-copy">
          <section class="event-project-about"><h3>Organizasyon Hakkında</h3><div class="event-project-description"></div></section>
          <section><h3>Hazırlanan Çalışmalar</h3><ul class="event-project-works"></ul></section>
          <section><h3>Projedeki Rolüm</h3><p class="event-project-role"></p></section>
        </div>
      </div>
    </article>
  `;
  document.body.appendChild(modal);

  const dialog = modal.querySelector(".event-project-dialog");
  const listView = modal.querySelector(".event-project-list-view");
  const detailView = modal.querySelector(".event-project-detail-view");
  const grid = modal.querySelector(".event-project-grid");
  const heading = modal.querySelector("#event-project-title");
  const subtitle = modal.querySelector(".event-project-subtitle");
  const backButton = modal.querySelector(".event-project-back");
  const closeButton = modal.querySelector(".event-project-close");
  const galleryStage = modal.querySelector(".event-gallery-stage");
  const galleryImage = modal.querySelector(".event-gallery-image");
  const galleryLoading = modal.querySelector(".event-gallery-loading");
  const galleryCounter = modal.querySelector(".event-gallery-counter");
  const galleryThumbs = modal.querySelector(".event-gallery-thumbs");
  const description = modal.querySelector(".event-project-description");
  const works = modal.querySelector(".event-project-works");
  const role = modal.querySelector(".event-project-role");
  const previousButton = modal.querySelector(".event-gallery-arrow.prev");
  const nextButton = modal.querySelector(".event-gallery-arrow.next");
  let activeProject = null;
  let activeImageIndex = 0;
  let lastFocused = null;
  let swipeStart = null;

  const renderCards = () => {
    grid.replaceChildren(...eventProjects.map((project, index) => {
      const card = document.createElement(project.available ? "button" : "article");
      card.className = `event-project-card${project.available ? " is-available" : " is-pending"}`;
      if (project.available) {
        card.type = "button";
        card.setAttribute("aria-label", `${project.title} projesini aç`);
        card.addEventListener("click", () => openProject(project));
      } else {
        card.setAttribute("aria-disabled", "true");
      }
      const visual = document.createElement("span");
      visual.className = "event-project-card-visual";
      if (project.cover) {
        const image = document.createElement("img");
        image.src = project.cover;
        image.alt = "";
        image.loading = "lazy";
        visual.appendChild(image);
      } else {
        const number = document.createElement("span");
        number.className = "event-project-card-number";
        number.textContent = String(index + 1).padStart(2, "0");
        visual.appendChild(number);
      }
      const body = document.createElement("span");
      body.className = "event-project-card-body";
      const name = document.createElement("strong");
      name.textContent = project.title;
      const status = document.createElement("small");
      status.textContent = project.available ? "Projeyi Görüntüle" : "İçerik hazırlanıyor";
      body.append(name, status);
      card.append(visual, body);
      return card;
    }));
  };

  const renderImage = (index) => {
    if (!activeProject) return;
    activeImageIndex = (index + activeProject.images.length) % activeProject.images.length;
    const image = activeProject.images[activeImageIndex];
    galleryLoading.hidden = false;
    galleryImage.classList.add("is-loading");
    galleryImage.alt = image.alt;
    const preloader = new Image();
    preloader.decoding = "async";
    preloader.onload = () => {
      galleryImage.src = image.src;
      galleryImage.classList.remove("is-loading");
      galleryLoading.hidden = true;
    };
    preloader.onerror = () => {
      galleryImage.classList.remove("is-loading");
      galleryLoading.hidden = true;
      galleryImage.removeAttribute("src");
      galleryImage.alt = `${image.alt} yüklenemedi`;
    };
    preloader.src = image.src;
    galleryCounter.textContent = `${activeImageIndex + 1} / ${activeProject.images.length}`;
    [...galleryThumbs.children].forEach((thumb, thumbIndex) => {
      const selected = thumbIndex === activeImageIndex;
      thumb.classList.toggle("is-active", selected);
      thumb.setAttribute("aria-current", selected ? "true" : "false");
      if (selected) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
  };

  const renderThumbnails = () => {
    galleryThumbs.replaceChildren(...activeProject.images.map((image, index) => {
      const button = document.createElement("button");
      button.className = "event-gallery-thumb";
      button.type = "button";
      button.setAttribute("aria-label", `${index + 1}. görseli göster`);
      const thumb = document.createElement("img");
      thumb.src = image.src;
      thumb.alt = "";
      thumb.loading = "lazy";
      button.appendChild(thumb);
      button.addEventListener("click", () => renderImage(index));
      return button;
    }));
  };

  const openProject = (project) => {
    if (!project.available) return;
    activeProject = project;
    activeImageIndex = 0;
    heading.textContent = project.title;
    subtitle.textContent = "Mockup ve gerçek organizasyon fotoğrafları";
    backButton.hidden = false;
    listView.hidden = true;
    detailView.hidden = false;
    description.replaceChildren(...project.description.map((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      return element;
    }));
    works.replaceChildren(...project.works.map((work) => {
      const item = document.createElement("li");
      const check = document.createElement("span");
      check.setAttribute("aria-hidden", "true");
      check.textContent = "✓";
      item.append(check, document.createTextNode(work));
      return item;
    }));
    role.textContent = project.role;
    renderThumbnails();
    renderImage(0);
    detailView.scrollTop = 0;
  };

  const showList = () => {
    activeProject = null;
    backButton.hidden = true;
    detailView.hidden = true;
    listView.hidden = false;
    heading.textContent = "Organizasyon Projeleri";
    subtitle.textContent = "Seçili etkinlik kimlikleri ve mekânsal tasarım uygulamaları";
    listView.scrollTop = 0;
  };

  const openModal = () => {
    lastFocused = document.activeElement;
    showList();
    modal.hidden = false;
    document.body.classList.add("event-project-open");
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      closeButton.focus({ preventScroll: true });
    });
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("event-project-open");
    window.setTimeout(() => {
      modal.hidden = true;
      lastFocused?.focus?.({ preventScroll: true });
    }, 220);
  };

  const showPreviousImage = () => activeProject && renderImage(activeImageIndex - 1);
  const showNextImage = () => activeProject && renderImage(activeImageIndex + 1);

  eventCard.style.position = "relative";
  eventCard.classList.add("has-event-project-modal");
  const cardTrigger = document.createElement("button");
  cardTrigger.className = "event-project-card-trigger";
  cardTrigger.type = "button";
  cardTrigger.setAttribute("aria-label", "Etkinlik ve Organizasyon projelerini görüntüle");
  cardTrigger.addEventListener("click", openModal);
  eventCard.appendChild(cardTrigger);

  renderCards();
  backButton.addEventListener("click", showList);
  previousButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);
  modal.querySelectorAll("[data-event-close]").forEach((element) => element.addEventListener("click", closeModal));

  galleryStage.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    swipeStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  galleryStage.addEventListener("touchend", (event) => {
    if (!swipeStart || event.changedTouches.length !== 1) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStart.x;
    const deltaY = touch.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
    deltaX > 0 ? showPreviousImage() : showNextImage();
  }, { passive: true });
  galleryStage.addEventListener("touchcancel", () => { swipeStart = null; }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      activeProject ? showList() : closeModal();
    } else if (activeProject && event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage();
    } else if (activeProject && event.key === "ArrowRight") {
      event.preventDefault();
      showNextImage();
    } else if (event.key === "Tab") {
      const focusable = [...modal.querySelectorAll("button:not([hidden]):not([disabled])")].filter((element) => element.offsetParent !== null);
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
