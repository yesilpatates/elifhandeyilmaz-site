(() => {
  const covers = [
    {
      src: "https://at.adobe.com/ufiqB66wHJRAswSX",
      alt: "Marka ve Kurumsal Kimlik Tasarımı kapak görseli"
    },
    {
      src: "https://at.adobe.com/zvF3n3Q17egUXpiR",
      alt: "Editoryal Tasarım kapak görseli"
    },
    {
      src: "https://at.adobe.com/hguOld174sEQhlKx",
      alt: "Etkinlik ve Organizasyon Tasarımı kapak görseli"
    },
    {
      src: "https://at.adobe.com/B3srmMwoUvQfru2c",
      alt: "Tanıtım ve İletişim Tasarımı kapak görseli"
    },
    {
      src: "https://at.adobe.com/ec8nszziADbmVHkt",
      alt: "Sosyal Medya Tasarımı kapak görseli"
    },
    {
      src: "https://at.adobe.com/vCPmsaZrLIa0TN9Q",
      alt: "Web ve Arayüz Tasarımı kapak görseli"
    },
    {
      src: "https://at.adobe.com/TYb10FnMlNsmuouV",
      alt: "Video ve Animasyon Tasarımı kapak görseli"
    }
  ];

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

    image.addEventListener("load", () => {
      visual.innerHTML = "";
      visual.classList.add("has-cover");
      visual.appendChild(image);
    }, { once: true });
  });

  const projectIntro = document.querySelector("#projeler .section-heading p");
  if (projectIntro?.textContent.includes("Proje görselleri eklendiğinde")) {
    projectIntro.textContent = "Grafik tasarımın farklı alanlarında geliştirdiğim seçili çalışmalar ve uzmanlık kategorileri.";
  }
})();
