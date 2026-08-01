(() => {
  const covers = [
    {
      src: "images/projects/marka-kurumsal-kimlik.png",
      alt: "Marka ve Kurumsal Kimlik Tasarımı kapak görseli"
    },
    {
      src: "images/projects/editoryal-tasarim.png",
      alt: "Editoryal Tasarım kapak görseli"
    },
    {
      src: "images/projects/etkinlik-organizasyon.png",
      alt: "Etkinlik ve Organizasyon Tasarımı kapak görseli"
    },
    {
      src: "images/projects/tanitim-iletisim.png",
      alt: "Tanıtım ve İletişim Tasarımı kapak görseli"
    },
    {
      src: "images/projects/sosyal-medya.png",
      alt: "Sosyal Medya Tasarımı kapak görseli"
    },
    {
      src: "images/projects/web-arayuz.png",
      alt: "Web ve Arayüz Tasarımı kapak görseli"
    },
    {
      src: "images/projects/video-animasyon.png",
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

    image.addEventListener("load", () => {
      visual.innerHTML = "";
      visual.classList.add("has-cover");
      visual.appendChild(image);
    }, { once: true });
  });
})();
