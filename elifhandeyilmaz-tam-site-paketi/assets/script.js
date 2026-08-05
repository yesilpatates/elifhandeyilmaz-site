(() => {
  const addStylesheet = (id, href) => {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  const formatHeroTitle = () => {
    const title = document.querySelector(".hero-copy h1");
    if (!title || title.dataset.formatted === "true") return;
    title.dataset.formatted = "true";
    title.innerHTML = '<span class="hero-title-first">Fikirleri güçlü ve tutarlı</span><span class="hero-title-second">görsel deneyimlere dönüştürüyorum.</span>';
  };

  const disableEditorialSection = () => {
    const editorialProjectCard = [...document.querySelectorAll(".project-card")].find((card) => {
      const title = card.querySelector(".project-body h3")?.textContent?.toLocaleLowerCase("tr-TR") || "";
      return title.includes("editoryal");
    });
    editorialProjectCard?.remove();

    const editorialMiniCard = [...document.querySelectorAll(".mini-project")].find((card) => {
      const title = card.querySelector("strong")?.textContent?.toLocaleLowerCase("tr-TR") || "";
      return title.includes("editoryal");
    });
    editorialMiniCard?.remove();

    const editorialService = [...document.querySelectorAll(".service-mini-grid > span")].find((item) => {
      return item.textContent?.toLocaleLowerCase("tr-TR").includes("editoryal");
    });
    editorialService?.remove();

    document.querySelectorAll(".project-grid .project-card").forEach((card, index) => {
      const number = String(index + 1).padStart(2, "0");
      const visualNumber = card.querySelector(".project-visual > span");
      const bodyNumber = card.querySelector(".project-number");
      if (visualNumber) visualNumber.textContent = number;
      if (bodyNumber) bodyNumber.textContent = number;
    });
  };

  const loadWebProjects = () => {
    addStylesheet("web-projects-styles", "assets/web-projects.css?v=20260803-fixed-height-v8");
    if (document.getElementById("web-projects-script")) return;
    const webScript = document.createElement("script");
    webScript.id = "web-projects-script";
    webScript.src = "assets/web-projects.js?v=20260804-featured-project-v10";
    webScript.defer = true;
    document.body.appendChild(webScript);
  };

  const loadEventShowcase = () => {
    addStylesheet("event-projects-styles", "assets/event-projects.css?v=20260805-three-images-v3");
    if (document.getElementById("event-projects-script")) return;
    const eventScript = document.createElement("script");
    eventScript.id = "event-projects-script";
    eventScript.src = "assets/event-projects.js?v=20260805-card-click-fix-v6";
    eventScript.defer = true;
    document.body.appendChild(eventScript);
  };

  const loadEnhancements = () => {
    formatHeroTitle();
    disableEditorialSection();
    window.setTimeout(loadWebProjects, 450);
    window.setTimeout(loadEventShowcase, 500);
  };

  const loadCoreScript = () => {
    const coreScript = document.createElement("script");
    coreScript.src = "assets/core-script.js?v=20260805-card-mapping-fix-v3";
    coreScript.defer = true;
    coreScript.onload = loadEnhancements;
    coreScript.onerror = () => {
      console.error("Yerel ana site betiği yüklenemedi.");
      loadEnhancements();
    };
    document.body.appendChild(coreScript);
  };

  addStylesheet("home-hero-polish", "assets/home-hero-polish.css?v=20260803-home-v3");
  formatHeroTitle();
  disableEditorialSection();

  const brandImageScript = document.createElement("script");
  brandImageScript.src = "assets/brand-image-urls.js?v=20260803-brand-local-v1";
  brandImageScript.defer = true;
  brandImageScript.onload = loadCoreScript;
  brandImageScript.onerror = loadCoreScript;
  document.body.appendChild(brandImageScript);
})();
