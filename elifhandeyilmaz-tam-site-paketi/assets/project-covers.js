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

  const cards = [...document.querySelectorAll(".project-card")];

  cards.forEach((card, index) => {
    const cover = covers[index];
    if (!cover) return;

    const title = card.querySelector(".project-body h3");
    const placeholderLabel = card.querySelector(".project-visual strong");

    if (title) title.textContent = cover.title;
    if (placeholderLabel) placeholderLabel.textContent = cover.label;

    if (index === 0 && !card.querySelector(".project-card-hitarea")) {
      card.style.position = "relative";
      const link = document.createElement("a");
      link.className = "project-card-hitarea";
      link.href = "projeler/marka-kurumsal-kimlik/";
      link.setAttribute("aria-label", "Marka ve Kurumsal Kimlik projelerini görüntüle");
      card.appendChild(link);
    }
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
    projectIntro.textContent = "Grafik tasarımın farklı alanlarında geliştirdiğim seçili çalışmalar ve uzmanlık kategorileri.";
  }
})();
