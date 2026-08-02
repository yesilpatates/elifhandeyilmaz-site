(() => {
  const covers = [
    {
      src: "https://at.adobe.com/ufiqB66wHJRAswSX",
      alt: "Marka & Kurumsal Kimlik Tasarımı kapak görseli",
      title: "Marka & Kurumsal Kimlik",
      label: "BRAND"
    },
    {
      src: "https://at.adobe.com/zvF3n3Q17egUXpiR",
      alt: "Editoryal Tasarım kapak görseli",
      title: "Editoryal Tasarım",
      label: "EDITORIAL"
    },
    {
      src: "https://at.adobe.com/hguOld174sEQhlKx",
      alt: "Etkinlik & Organizasyon Tasarımı kapak görseli",
      title: "Etkinlik & Organizasyon Tasarımı",
      label: "EVENT"
    },
    {
      src: "https://at.adobe.com/B3srmMwoUvQfru2c",
      alt: "Tanıtım & İletişim Tasarımı kapak görseli",
      title: "Tanıtım & İletişim Tasarımı",
      label: "PROMO"
    },
    {
      src: "https://at.adobe.com/ec8nszziADbmVHkt",
      alt: "Sosyal Medya Tasarımı kapak görseli",
      title: "Sosyal Medya Tasarımı",
      label: "SOCIAL"
    },
    {
      src: "https://at.adobe.com/vCPmsaZrLIa0TN9Q",
      alt: "Web & Arayüz Tasarımı kapak görseli",
      title: "Web & Arayüz Tasarımı",
      label: "UI / WEB"
    },
    {
      src: "https://at.adobe.com/TYb10FnMlNsmuouV",
      alt: "Video & Animasyon Tasarımı kapak görseli",
      title: "Video & Animasyon Tasarımı",
      label: "MOTION"
    }
  ];

  const brandProjects = [
    {
      title: "Sağlığım Burada",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/S38mohytVzQkPjQS",
      alt: "Sağlığım Burada marka kimliği sunumu",
      company:
        "Sağlığım Burada, bireylerin daha sağlıklı ve dengeli bir yaşam sürmesine destek olmak amacıyla hizmet veren modern bir sağlık ve danışmanlık markasıdır. Güvenilir bilgi, uzman yaklaşımı ve kolay erişilebilir çözümlerle sağlığı hayatın doğal bir parçası hâline getirmeyi hedefler.",
      logo:
        "Sağlığım Burada logosu; insan figürü, yaprak ve dairesel formları bir araya getirerek sağlıklı yaşamı, gelişimi ve bütüncül iyilik hâlini simgeler. Mavi tonlar güveni ve profesyonelliği, turkuaz ise yenilenmeyi, canlılığı ve sağlığı temsil eder. Akıcı yazı karakteri markaya samimi ve ulaşılabilir bir kimlik kazandırır."
    }
  ];

  const cards = [...document.querySelectorAll(".project-card")];

  cards.forEach((card, index) => {
    const cover = covers[index];
    if (!cover) return;

    const title = card.querySelector(".project-body h3");
    const placeholderLabel = card.querySelector(".project-visual strong");

    if (title) title.textContent = cover.title;
    if (placeholderLabel) placeholderLabel.textContent = cover.label;
  });

  const visuals = [...document.querySelectorAll(".project-card .project-visual")];

  visuals.forEach((visual, index) => {
    const cover = covers[index];
    if (!cover) return;

    const image = new Image();
    image.className = "project-cover-image";
    image.src = cover.src;
    image.alt = cover.alt;
    image.loading = index < 2 ? "eager" : "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";

    image.addEventListener(
      "load",
      () => {
        visual.innerHTML = "";
        visual.classList.add("has-cover");
        visual.appendChild(image);
      },
      { once: true }
    );
  });

  const projectIntro = document.querySelector("#projeler .section-heading p");
  if (projectIntro?.textContent.includes("Proje görselleri eklendiğinde")) {
    projectIntro.textContent =
      "Grafik tasarımın farklı alanlarında geliştirdiğim seçili çalışmalar ve uzmanlık kategorileri.";
  }

  const createLightbox = () => {
    const existingLightbox = document.querySelector(".project-lightbox");
    if (existingLightbox) return existingLightbox;

    const lightbox = document.createElement("div");
    lightbox.className = "project-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-labelledby", "project-lightbox-title");
    lightbox.innerHTML = `
      <div class="project-lightbox-backdrop" data-lightbox-close></div>

      <button class="project-lightbox-close" type="button" aria-label="Galeriyi kapat" data-lightbox-close>
        <span aria-hidden="true">×</span>
      </button>

      <button class="project-lightbox-arrow project-lightbox-prev" type="button" aria-label="Önceki projeyi göster">
        <span aria-hidden="true">‹</span>
      </button>

      <article class="project-lightbox-panel">
        <div class="project-lightbox-media">
          <div class="project-lightbox-loading" aria-hidden="true"></div>
          <img class="project-lightbox-image" alt="">
        </div>

        <div class="project-lightbox-content">
          <div class="project-lightbox-heading">
            <div>
              <span class="project-lightbox-category"></span>
              <h2 id="project-lightbox-title"></h2>
            </div>
            <span class="project-lightbox-counter" aria-live="polite"></span>
          </div>

          <div class="project-lightbox-copy-grid">
            <section>
              <h3>Firma Hakkında</h3>
              <p class="project-lightbox-company"></p>
            </section>
            <section>
              <h3>Logo Tanımı</h3>
              <p class="project-lightbox-logo"></p>
            </section>
          </div>
        </div>
      </article>

      <button class="project-lightbox-arrow project-lightbox-next" type="button" aria-label="Sonraki projeyi göster">
        <span aria-hidden="true">›</span>
      </button>
    `;

    document.body.appendChild(lightbox);
    return lightbox;
  };

  const lightbox = createLightbox();
  const lightboxPanel = lightbox.querySelector(".project-lightbox-panel");
  const lightboxImage = lightbox.querySelector(".project-lightbox-image");
  const lightboxLoading = lightbox.querySelector(".project-lightbox-loading");
  const lightboxTitle = lightbox.querySelector("#project-lightbox-title");
  const lightboxCategory = lightbox.querySelector(".project-lightbox-category");
  const lightboxCounter = lightbox.querySelector(".project-lightbox-counter");
  const lightboxCompany = lightbox.querySelector(".project-lightbox-company");
  const lightboxLogo = lightbox.querySelector(".project-lightbox-logo");
  const prevButton = lightbox.querySelector(".project-lightbox-prev");
  const nextButton = lightbox.querySelector(".project-lightbox-next");
  const closeButton = lightbox.querySelector(".project-lightbox-close");

  let activeProjectIndex = 0;
  let lastFocusedElement = null;

  const updateArrowState = () => {
    const hasMultipleProjects = brandProjects.length > 1;
    prevButton.disabled = !hasMultipleProjects;
    nextButton.disabled = !hasMultipleProjects;
    prevButton.classList.toggle("is-hidden", !hasMultipleProjects);
    nextButton.classList.toggle("is-hidden", !hasMultipleProjects);
  };

  const renderProject = (index) => {
    activeProjectIndex = (index + brandProjects.length) % brandProjects.length;
    const project = brandProjects[activeProjectIndex];

    lightboxPanel.scrollTop = 0;
    lightbox.classList.add("is-loading");
    lightboxLoading.hidden = false;

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = project.alt;
    lightboxTitle.textContent = project.title;
    lightboxCategory.textContent = project.category;
    lightboxCounter.textContent = `${activeProjectIndex + 1} / ${brandProjects.length}`;
    lightboxCompany.textContent = project.company;
    lightboxLogo.textContent = project.logo;

    const image = new Image();
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.onload = () => {
      lightboxImage.src = project.image;
      lightbox.classList.remove("is-loading");
      lightboxLoading.hidden = true;
    };
    image.onerror = () => {
      lightbox.classList.remove("is-loading");
      lightboxLoading.hidden = true;
      lightboxImage.alt = `${project.alt} yüklenemedi`;
    };
    image.src = project.image;

    updateArrowState();
  };

  const openLightbox = (index = 0) => {
    lastFocusedElement = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("project-lightbox-open");
    renderProject(index);

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
      closeButton.focus({ preventScroll: true });
    });
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("project-lightbox-open");

    window.setTimeout(() => {
      lightbox.hidden = true;
      lastFocusedElement?.focus?.({ preventScroll: true });
    }, 220);
  };

  const showPreviousProject = () => {
    if (brandProjects.length < 2) return;
    renderProject(activeProjectIndex - 1);
  };

  const showNextProject = () => {
    if (brandProjects.length < 2) return;
    renderProject(activeProjectIndex + 1);
  };

  const brandCard = cards[0];
  if (brandCard) {
    brandCard
      .querySelectorAll(".project-card-hitarea, .project-card-modal-trigger")
      .forEach((element) => element.remove());

    brandCard.style.position = "relative";
    brandCard.classList.add("has-project-modal");

    const trigger = document.createElement("button");
    trigger.className = "project-card-modal-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-label", "Marka & Kurumsal Kimlik projelerini galeride görüntüle");
    trigger.addEventListener("click", () => openLightbox(0));
    brandCard.appendChild(trigger);
  }

  prevButton.addEventListener("click", showPreviousProject);
  nextButton.addEventListener("click", showNextProject);
  lightbox.querySelectorAll("[data-lightbox-close]").forEach((element) => {
    element.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousProject();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextProject();
      return;
    }

    if (event.key === "Tab") {
      const focusableElements = [...lightbox.querySelectorAll("button:not([disabled])")].filter(
        (element) => !element.classList.contains("is-hidden")
      );

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
})();
