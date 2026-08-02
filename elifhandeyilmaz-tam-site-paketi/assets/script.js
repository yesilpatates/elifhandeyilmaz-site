(() => {
  const addStylesheet = (id, href) => {
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  const loadEditorialFlipbook = () => {
    addStylesheet("editorial-flipbook-styles", "assets/editorial-flipbook.css");
    if (document.getElementById("editorial-flipbook-script")) return;
    const moduleScript = document.createElement("script");
    moduleScript.id = "editorial-flipbook-script";
    moduleScript.type = "module";
    moduleScript.src = "assets/editorial-flipbook-loader.js?v=20260802-editorial-links-fix";
    document.body.appendChild(moduleScript);
  };

  const loadWebProjects = () => {
    addStylesheet("web-projects-styles", "assets/web-projects.css?v=20260802-pilavyeri");
    if (document.getElementById("web-projects-script")) return;
    const webScript = document.createElement("script");
    webScript.id = "web-projects-script";
    webScript.src = "assets/web-projects.js?v=20260802-pilavyeri";
    webScript.defer = true;
    document.body.appendChild(webScript);
  };

  const loadEnhancements = () => {
    window.setTimeout(loadEditorialFlipbook, 450);
    window.setTimeout(loadWebProjects, 650);
  };

  const coreScript = document.createElement("script");
  coreScript.src = "https://cdn.jsdelivr.net/gh/yesilpatates/elifhandeyilmaz-site@b3008c81c72e3b72de0c51ad7f13d4f9da6a72a1/elifhandeyilmaz-tam-site-paketi/assets/script.js";
  coreScript.onload = loadEnhancements;
  coreScript.onerror = () => {
    console.error("Ana site betiği yüklenemedi.");
    loadEnhancements();
  };
  document.body.appendChild(coreScript);
})();
