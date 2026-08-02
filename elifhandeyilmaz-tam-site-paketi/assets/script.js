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
    moduleScript.src = "assets/editorial-flipbook-loader.js?v=20260802-neta-sea-81";
    document.body.appendChild(moduleScript);
  };

  const coreScript = document.createElement("script");
  coreScript.src = "https://cdn.jsdelivr.net/gh/yesilpatates/elifhandeyilmaz-site@b3008c81c72e3b72de0c51ad7f13d4f9da6a72a1/elifhandeyilmaz-tam-site-paketi/assets/script.js";
  coreScript.onload = () => window.setTimeout(loadEditorialFlipbook, 450);
  coreScript.onerror = () => {
    console.error("Ana site betiği yüklenemedi.");
    loadEditorialFlipbook();
  };
  document.body.appendChild(coreScript);
})();
