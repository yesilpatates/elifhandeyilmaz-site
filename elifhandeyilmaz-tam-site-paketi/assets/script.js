(() => {
  const addStylesheet = (id, href) => {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
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
    addStylesheet("web-projects-styles", "assets/web-projects.css?v=20260802-pilavyeri-template-v1");
    if (document.getElementById("web-projects-script")) return;
    const webScript = document.createElement("script");
    webScript.id = "web-projects-script";
    webScript.src = "assets/web-projects.js?v=20260802-pilavyeri-template-v1";
    webScript.defer = true;
    document.body.appendChild(webScript);
  };

  const loadEnhancements = () => {
    disableEditorialSection();
    window.setTimeout(loadWebProjects, 450);
  };

  disableEditorialSection();

  const coreScript = document.createElement("script");
  coreScript.src = "assets/core-script.js?v=20260802-local-v1";
  coreScript.defer = true;
  coreScript.onload = loadEnhancements;
  coreScript.onerror = () => {
    console.error("Yerel ana site betiği yüklenemedi.");
    loadEnhancements();
  };
  document.body.appendChild(coreScript);
})();