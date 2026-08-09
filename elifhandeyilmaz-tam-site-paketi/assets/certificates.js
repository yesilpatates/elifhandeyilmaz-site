(() => {
  const dialog = document.getElementById("certificate-lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const image = dialog.querySelector("img");
  const title = dialog.querySelector("h2");
  const closeButton = dialog.querySelector("[data-certificate-close]");
  let lastTrigger = null;

  const closeDialog = () => {
    dialog.close();
  };

  document.querySelectorAll("[data-certificate-src]").forEach((card) => {
    card.addEventListener("click", () => {
      lastTrigger = card;
      const certificateTitle = card.dataset.certificateTitle || "Sertifika";
      image.src = card.dataset.certificateSrc;
      image.alt = `${certificateTitle} sertifikasının büyük görünümü`;
      title.textContent = certificateTitle;
      dialog.showModal();
      document.body.classList.add("certificate-lightbox-open");
    });
  });

  closeButton?.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("certificate-lightbox-open");
    image.src = "";
    lastTrigger?.focus({ preventScroll: true });
  });
})();
