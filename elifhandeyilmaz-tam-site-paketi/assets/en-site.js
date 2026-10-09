(() => {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const setMenu = (open) => {
    toggle?.classList.toggle("open", open);
    nav?.classList.toggle("open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    toggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle?.addEventListener("click", () => setMenu(!nav?.classList.contains("open")));
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const modal = document.querySelector("#contact-modal");
  const form = modal?.querySelector(".contact-form");
  const openModal = () => {
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
  };
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-modal-open");
    window.setTimeout(() => { modal.hidden = true; }, 220);
  };
  document.querySelectorAll("[data-contact-modal-open]").forEach((button) => button.addEventListener("click", openModal));
  modal?.querySelectorAll("[data-contact-modal-close]").forEach((button) => button.addEventListener("click", closeModal));
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submit = form.querySelector(".contact-form-submit");
    const status = form.querySelector(".contact-form-status");
    submit.disabled = true;
    submit.textContent = "Sending…";
    try {
      const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      status.textContent = "Your message has been sent. Thank you!";
      status.classList.add("is-success");
    } catch {
      status.textContent = "Your message could not be sent. Please try WhatsApp instead.";
      status.classList.add("is-error");
    } finally {
      submit.disabled = false;
      submit.textContent = "Send Message";
    }
  });

  const grid = document.querySelector(".certificates-grid");
  const expand = document.querySelector(".certificates-toggle");
  expand?.addEventListener("click", () => {
    const opened = grid?.classList.toggle("is-expanded") ?? false;
    expand.setAttribute("aria-expanded", String(opened));
    expand.innerHTML = opened ? 'Show Less <span aria-hidden="true">↑</span>' : 'View All Certificates <span aria-hidden="true">↓</span>';
  });
  const dialog = document.getElementById("certificate-lightbox");
  if (dialog && typeof dialog.showModal === "function") {
    const image = dialog.querySelector("img");
    const title = dialog.querySelector("h2");
    document.querySelectorAll("[data-certificate-src]").forEach((card) => card.addEventListener("click", () => {
      const label = card.dataset.certificateTitle || "Certificate";
      image.src = card.dataset.certificateSrc;
      image.alt = `${label} certificate`;
      title.textContent = label;
      dialog.showModal();
    }));
    dialog.querySelector("[data-certificate-close]")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  }
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal?.hidden) closeModal(); });
})();
