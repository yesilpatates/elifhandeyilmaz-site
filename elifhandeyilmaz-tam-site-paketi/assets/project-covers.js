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
    },
    {
      title: "La Douceur",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/GsfR5p3nDymqlbfR",
      alt: "La Douceur butik tatlı markası kimlik sunumu",
      company:
        "La Douceur, Fransız pastacılık geleneğinden ilham alan butik bir tatlı markasıdır. Özenle hazırlanan tatlıları, kaliteli malzemeleri ve zarif sunum anlayışıyla her lokmayı unutulmaz bir lezzet deneyimine dönüştürmeyi hedefler.",
      logo:
        "La Douceur logosu, zarafeti ve Fransız esintisini yansıtan akıcı kaligrafik bir tipografiyle tasarlanmıştır. Yumuşak pembe tonları tatlılığın ve şıklığın simgesi olurken, sıcak kahve tonları markanın kalite ve samimiyet anlayışını vurgular. Logo, butik lezzetleri estetik bir kimlikle buluşturan sofistike marka karakterini yansıtır."
    },
    {
      title: "Special Burger",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/T6t6WRq31UnKl9nn",
      alt: "Special Burger marka kimliği sunumu",
      company:
        "Special Burger, kaliteli malzemeler ve özenle hazırlanan tarifleri bir araya getiren modern bir burger restoranıdır. Taptaze içerikler, doyurucu lezzetler ve hızlı servis anlayışıyla her misafirine keyifli bir burger deneyimi sunmayı hedefler.",
      logo:
        "Special Burger logosu, markanın temel ürünü olan hamburgeri modern ve akılda kalıcı bir simgeye dönüştürür. Burger formuna entegre edilen ‘S’ harfi, markanın kimliğini güçlü bir şekilde vurgularken; sıcak sarı tonları lezzeti, kahverengi güveni ve doğallığı, kırmızı ise iştahı ve enerjiyi temsil eder. Logo, lezzet, kalite ve samimiyeti yansıtan güçlü bir marka karakteri oluşturur."
    }
  ];

  const cards = [...document.querySelectorAll(".project-card")];

  cards.forEach((card, index) => {
    const cover = covers[index];
    if (!cover) return;

    const title = card.querySelector(".project-body h3");
    const label = card.querySelector(".project-visual strong");
    if (title) title.textContent = cover.title;
    if (label) label.textContent = cover.label;

    const visual = card.querySelector(".project-visual");
    if (!visual) return;

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
        visual.replaceChildren(image);
        visual.classList.add("has-cover");
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
    const current = document.querySelector(".project-lightbox");
    if (current) return current;

    const lightbox = document.createElement("div");
    lightbox.className = "project-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-labelledby", "project-lightbox-title");
    lightbox.innerHTML = `
      <div class="project-lightbox-backdrop" data-lightbox-close></div>
      <button class="project-lightbox-close" type="button" aria-label="Galeriyi kapat" data-lightbox-close><span aria-hidden="true">×</span></button>
      <button class="project-lightbox-arrow project-lightbox-prev" type="button" aria-label="Önceki projeyi göster"><span aria-hidden="true">‹</span></button>
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
      <button class="project-lightbox-arrow project-lightbox-next" type="button" aria-label="Sonraki projeyi göster"><span aria-hidden="true">›</span></button>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
  };

  const lightbox = createLightbox();
  const panel = lightbox.querySelector(".project-lightbox-panel");
  const displayImage = lightbox.querySelector(".project-lightbox-image");
  const loading = lightbox.querySelector(".project-lightbox-loading");
  const title = lightbox.querySelector("#project-lightbox-title");
  const category = lightbox.querySelector(".project-lightbox-category");
  const counter = lightbox.querySelector(".project-lightbox-counter");
  const company = lightbox.querySelector(".project-lightbox-company");
  const logo = lightbox.querySelector(".project-lightbox-logo");
  const prevButton = lightbox.querySelector(".project-lightbox-prev");
  const nextButton = lightbox.querySelector(".project-lightbox-next");
  const closeButton = lightbox.querySelector(".project-lightbox-close");

  let activeIndex = 0;
  let lastFocusedElement = null;

  const updateArrowState = () => {
    const enabled = brandProjects.length > 1;
    prevButton.disabled = !enabled;
    nextButton.disabled = !enabled;
    prevButton.classList.toggle("is-hidden", !enabled);
    nextButton.classList.toggle("is-hidden", !enabled);
  };

  const renderProject = (index) => {
    activeIndex = (index + brandProjects.length) % brandProjects.length;
    const project = brandProjects[activeIndex];

    panel.scrollTop = 0;
    lightbox.classList.add("is-loading");
    loading.hidden = false;
    displayImage.removeAttribute("src");
    displayImage.alt = project.alt;
    title.textContent = project.title;
    category.textContent = project.category;
    counter.textContent = `${activeIndex + 1} / ${brandProjects.length}`;
    company.textContent = project.company;
    logo.textContent = project.logo;

    const preloader = new Image();
    preloader.decoding = "async";
    preloader.referrerPolicy = "no-referrer";
    preloader.onload = () => {
      displayImage.src = project.image;
      lightbox.classList.remove("is-loading");
      loading.hidden = true;
    };
    preloader.onerror = () => {
      lightbox.classList.remove("is-loading");
      loading.hidden = true;
      displayImage.alt = `${project.alt} yüklenemedi`;
    };
    preloader.src = project.image;
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

  const showPrevious = () => {
    if (brandProjects.length > 1) renderProject(activeIndex - 1);
  };

  const showNext = () => {
    if (brandProjects.length > 1) renderProject(activeIndex + 1);
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

  prevButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  lightbox.querySelectorAll("[data-lightbox-close]").forEach((element) => {
    element.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    } else if (event.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button:not([disabled])")].filter(
        (element) => !element.classList.contains("is-hidden")
      );
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
