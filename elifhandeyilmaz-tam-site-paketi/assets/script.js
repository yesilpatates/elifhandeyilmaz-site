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
    title.innerHTML = '<span class="hero-title-first">Markalara karakter kazandıran</span><span class="hero-title-second">görsel kimlikler tasarlıyorum.</span>';
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
    addStylesheet("event-projects-styles", "assets/event-projects.css?v=20260808-green-transformation-v2");
    if (document.getElementById("event-projects-script")) return;
    const eventScript = document.createElement("script");
    eventScript.id = "event-projects-script";
    eventScript.src = "assets/event-projects.js?v=20260810-gemi-yat-gallery-v1";
    eventScript.defer = true;
    document.body.appendChild(eventScript);
  };

  const loadMotionProjects = () => {
    addStylesheet("motion-projects-styles", "assets/motion-projects.css?v=20260808-alfa-v1");
    if (document.getElementById("motion-projects-script")) return;
    const motionScript = document.createElement("script");
    motionScript.id = "motion-projects-script";
    motionScript.src = "assets/motion-projects.js?v=20260808-alfa-v1";
    motionScript.defer = true;
    document.body.appendChild(motionScript);
  };

  const loadEnhancements = () => {
    formatHeroTitle();
    window.setTimeout(loadWebProjects, 450);
    window.setTimeout(loadEventShowcase, 500);
    window.setTimeout(loadMotionProjects, 550);
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

  const brandImageScript = document.createElement("script");
  brandImageScript.src = "assets/brand-image-urls.js?v=20260803-brand-local-v1";
  brandImageScript.defer = true;
  brandImageScript.onload = loadCoreScript;
  brandImageScript.onerror = loadCoreScript;
  document.body.appendChild(brandImageScript);
})();

(() => {
  const modal = document.querySelector("#contact-modal");
  const form = modal?.querySelector(".contact-form");
  if (!modal || !form) return;

  const closeButton = modal.querySelector(".contact-modal-close");
  const submitButton = form.querySelector(".contact-form-submit");
  const status = form.querySelector(".contact-form-status");
  let lastFocused = null;

  const openModal = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-modal-open");
    status.textContent = "";
    status.className = "contact-form-status";
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      form.querySelector("input:not([type='hidden'])")?.focus();
    });
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-modal-open");
    window.setTimeout(() => {
      modal.hidden = true;
      lastFocused?.focus?.({ preventScroll: true });
    }, 220);
  };

  document.querySelectorAll("[data-contact-modal-open]").forEach((button) => button.addEventListener("click", openModal));
  modal.querySelectorAll("[data-contact-modal-close]").forEach((button) => button.addEventListener("click", closeModal));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = "Gönderiliyor…";
    status.textContent = "";
    status.className = "contact-form-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Form gönderilemedi");

      form.reset();
      status.textContent = "Mesajınız başarıyla gönderildi. Teşekkürler!";
      status.classList.add("is-success");
    } catch (error) {
      status.textContent = "Mesaj gönderilemedi. Lütfen WhatsApp seçeneğini deneyin.";
      status.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Mesajı Gönder";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
})();
