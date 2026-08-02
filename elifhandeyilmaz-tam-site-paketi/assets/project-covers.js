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

  const brandProjects = [
    {
      title: "Sağlığım Burada",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/i3gTkcW18diXU4vk",
      alt: "Sağlığım Burada marka kimliği sunumu",
      company: `Sağlığım Burada, bireylerin daha sağlıklı ve dengeli bir yaşam sürmesine destek olmak amacıyla hizmet veren modern bir sağlık ve danışmanlık markasıdır. Güvenilir bilgi, uzman yaklaşımı ve kolay erişilebilir çözümlerle sağlığı hayatın doğal bir parçası hâline getirmeyi hedefler.`,
      logo: `Sağlığım Burada logosu; insan figürü, yaprak ve dairesel formları bir araya getirerek sağlıklı yaşamı, gelişimi ve bütüncül iyilik hâlini simgeler. Mavi tonlar güveni ve profesyonelliği, turkuaz ise yenilenmeyi, canlılığı ve sağlığı temsil eder. Akıcı yazı karakteri markaya samimi ve ulaşılabilir bir kimlik kazandırır.`
    },
    {
      title: "La Douceur",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/GsfR5p3nDymqlbfR",
      alt: "La Douceur butik tatlı markası kimlik sunumu",
      company: `La Douceur, Fransız pastacılık geleneğinden ilham alan butik bir tatlı markasıdır. Özenle hazırlanan tatlıları, kaliteli malzemeleri ve zarif sunum anlayışıyla her lokmayı unutulmaz bir lezzet deneyimine dönüştürmeyi hedefler.`,
      logo: `La Douceur logosu, zarafeti ve Fransız esintisini yansıtan akıcı kaligrafik bir tipografiyle tasarlanmıştır. Yumuşak pembe tonları tatlılığın ve şıklığın simgesi olurken, sıcak kahve tonları markanın kalite ve samimiyet anlayışını vurgular. Logo, butik lezzetleri estetik bir kimlikle buluşturan sofistike marka karakterini yansıtır.`
    },
    {
      title: "Special Burger",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/T6t6WRq31UnKl9nn",
      alt: "Special Burger marka kimliği sunumu",
      company: `Special Burger, kaliteli malzemeler ve özenle hazırlanan tarifleri bir araya getiren modern bir burger restoranıdır. Taptaze içerikler, doyurucu lezzetler ve hızlı servis anlayışıyla her misafirine keyifli bir burger deneyimi sunmayı hedefler.`,
      logo: `Special Burger logosu, markanın temel ürünü olan hamburgeri modern ve akılda kalıcı bir simgeye dönüştürür. Burger formuna entegre edilen “S” harfi, markanın kimliğini güçlü bir şekilde vurgularken; sıcak sarı tonları lezzeti, kahverengi güveni ve doğallığı, kırmızı ise iştahı ve enerjiyi temsil eder. Logo, lezzet, kalite ve samimiyeti yansıtan güçlü bir marka karakteri oluşturur.`
    },
    {
      title: "Pilavyeri",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/xmKGqJUsYPRsAOhe",
      alt: "Pilavyeri restoran marka kimliği sunumu",
      company: `Pilavyeri, geleneksel pilav lezzetini modern sunum ve hızlı servis anlayışıyla buluşturan bir restoran markasıdır. Günlük ve taze malzemelerle hazırlanan özel pilav çeşitlerini, kaliteli hizmet anlayışıyla sunarak her öğünü lezzetli ve doyurucu bir deneyime dönüştürmeyi hedefler.`,
      logo: `Pilavyeri logosu, markanın ana ürünü olan pilavı simgeleyen kaşık figürünü modern ve akılda kalıcı bir tasarımla bütünleştirir. Turkuaz renk tazeliği, güveni ve hijyeni temsil ederken; dinamik tipografi markanın samimi ve ulaşılabilir karakterini yansıtır. Logo, geleneksel lezzeti çağdaş bir marka kimliğiyle buluşturan özgün bir görsel dil oluşturur.`
    },
    {
      title: "Fikir Atölyesi",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/udOYRbgFbkkqvvmW",
      alt: "Fikir Atölyesi yaratıcı iletişim ajansı marka kimliği sunumu",
      company: `Fikir Atölyesi, markaların hikâyelerini etkileyici senaryolar ve yaratıcı içeriklerle buluşturan bir yaratıcı iletişim ajansıdır. Televizyon reklamları, dijital kampanyalar, tanıtım filmleri ve kurumsal projeler için özgün fikirler geliştirir; senaryo yazımından yaratıcı konsept oluşturmaya kadar tüm süreci profesyonel bir yaklaşımla yönetir. Her projede hedef kitleye dokunan, akılda kalıcı ve güçlü anlatılar üretmeyi amaçlar.`,
      logo: `Fikir Atölyesi logosu, yaratıcılığı ve hikâye anlatımını simgeleyen kalem tüyü ile fikirlerin sürekli gelişimini temsil eden dairesel formu bir araya getirir. Mavi ve mor tonları güveni, hayal gücünü ve üretkenliği yansıtırken, yıldız detayları ilhamın ve yaratıcı fikirlerin doğuşunu simgeler. Logo, markanın özgün senaryolar üreten, güçlü hikâyeler anlatan ve yaratıcı iletişim odaklı kimliğini yansıtır.`
    },
    {
      title: "Coko Pet Shop",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/D31xs4KCQZHVF6RA",
      alt: "Coko Pet Shop marka kimliği sunumu",
      company: `Coko Pet Shop, evcil dostların sağlıklı, mutlu ve konforlu bir yaşam sürmesi için kaliteli ürünler ve güvenilir hizmet sunan modern bir pet shop markasıdır. Mama, oyuncak, bakım ürünleri ve temel ihtiyaçları özenle seçerek kedi, köpek ve diğer evcil hayvan sahiplerine güvenilir alışveriş deneyimi sunmayı hedefler.`,
      logo: `Coko Pet Shop logosu, köpek, kedi ve tavşan figürlerini tek bir akıcı çizgide birleştirerek farklı evcil dostlara duyulan sevgi ve özeni simgeler. Turkuaz renk güveni, hijyeni ve canlılığı temsil ederken, modern tipografi markanın samimi ve ulaşılabilir karakterini yansıtır. Logo, evcil hayvanlarla kurulan güçlü bağı ve bakım odaklı hizmet anlayışını modern bir görsel kimlikle ifade eder.`
    },
    {
      title: "Minik Dünya Kreşi",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/PyD5VPTQRV0BRMTj",
      alt: "Minik Dünya Kreşi marka kimliği sunumu",
      company: `Minik Dünya Kreşi, çocukların güvenli, sevgi dolu ve destekleyici bir ortamda gelişimini önemseyen bir okul öncesi eğitim kurumudur. Oyun temelli eğitim yaklaşımıyla çocukların sosyal, duygusal ve zihinsel becerilerini destekleyerek keşfeden, öğrenen ve özgüvenli bireyler olmalarını hedefler.`,
      logo: `Minik Dünya Kreşi logosu; doğayı, gelişimi ve çocukların güvenli dünyasını simgeleyen ağaç formu üzerine kurulmuştur. Ağaç içindeki çocuk figürleri oyun, öğrenme ve huzurlu gelişimi temsil eder. Yeşil tonlar doğallığı ve büyümeyi; kahverengi tonlar ise güveni, sıcaklığı ve sağlamlığı yansıtır.`
    },
    {
      title: "Coffee Point",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/MaDktMEGW14xswb1",
      alt: "Coffee Point kahve markası kimlik sunumu",
      company: `Coffee Point, kaliteli kahveyi sıcak bir atmosferle buluşturan modern bir kahve markasıdır. Özenle seçilen kahve çekirdekleri ve özenli sunum anlayışıyla her fincanda keyifli bir kahve deneyimi sunmayı hedefler. Günün her anında lezzetli molalar için misafirlerini samimi bir ortamda ağırlar.`,
      logo: `Coffee Point logosu, buharı tüten kahve fincanını sade ve modern çizgilerle yorumlayarak tazelik, sıcaklık ve kaliteyi simgeler. Kahve tonları doğallığı, samimiyeti ve zengin aromayı temsil ederken, dairesel form birlikteliği ve keyifli buluşmaları ifade eder. Minimal tasarımıyla logo, markanın sıcak, modern ve davetkâr kimliğini yansıtır.`
    },
    {
      title: "Damla Doğal Kaynak Suyu",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/uHiqeeRLQfnDNW9u",
      alt: "Damla Doğal Kaynak Suyu marka kimliği sunumu",
      company: `Damla Doğal Kaynak Suyu, doğal kaynaklardan özenle elde edilen içme suyunu, saflığını ve doğal mineral dengesini koruyarak tüketicilere ulaştıran güvenilir bir su markasıdır. Kalite, hijyen ve sürdürülebilir üretim anlayışıyla her damlada doğanın tazeliğini sunmayı hedefler.`,
      logo: `Damla logosu, su damlası formunu modern bir tasarımla birleştirerek saflığı, doğallığı ve yaşamı simgeler. Mavi tonlar temizliği, güveni ve ferahlığı temsil ederken, alttaki akış çizgisi doğal su kaynaklarının sürekliliğini ifade eder. Güçlü ve akıcı tipografiyle tamamlanan logo, markanın doğal, güvenilir ve kaliteli kimliğini yansıtır.`
    },
    {
      title: "SigortaGuru",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/Ftdy5QFpw4HLKGIM",
      alt: "SigortaGuru sigorta danışmanlığı marka kimliği sunumu",
      company: `SigortaGuru, bireylerin ve işletmelerin sigorta ihtiyaçlarına güvenilir, hızlı ve doğru çözümler sunan profesyonel bir sigorta danışmanlık markasıdır. Trafik, kasko, konut, sağlık ve iş yeri sigortaları başta olmak üzere farklı branşlarda, ihtiyaçlara uygun poliçe seçenekleriyle müşterilerinin yanında yer alır.`,
      logo: `SigortaGuru logosu, bilgeliği ve güveni simgeleyen baykuş figürünü modern bir tasarımla buluşturur. Baykuş, doğru yönlendirme ve uzman danışmanlığı temsil ederken; turkuaz tonları güveni, huzuru ve şeffaflığı, koyu mavi tonları ise profesyonelliği ve kurumsallığı ifade eder. Logo, markanın bilgiye dayalı, güven veren ve müşteri odaklı hizmet anlayışını yansıtır.`
    },
    {
      title: "Canvera",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/N4MBIg2TmUtWxaw7",
      alt: "Canvera sağlık markası kimlik sunumu",
      company: `Canvera, sağlık alanında güvenilir, yenilikçi ve insan odaklı çözümler sunan modern bir markadır. Kalite, erişilebilirlik ve güncel teknolojiyi bir araya getirerek kullanıcıların sağlık hizmetlerine duyduğu güveni güçlendirmeyi hedefler.`,
      logo: `Canvera logosu, markanın güven, sağlık ve yenilikçilik değerlerini yansıtan modern bir tasarıma sahiptir. Sembolde birleşen dinamik çizgiler gelişimi ve güçlü bağı temsil ederken; mavi tonlar güveni ve profesyonelliği, turuncu ise enerjiyi ve yenilikçi yaklaşımı simgeler.`
    },
    {
      title: "Techora",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/QFt6E184xLFFQmzv",
      alt: "Techora teknoloji markası kimlik sunumu",
      company: `Techora, yenilikçi bilgisayar donanımları ve akıllı teknoloji çözümleri geliştiren modern bir teknoloji markasıdır. Performans, dayanıklılık ve işlevselliği çağdaş tasarımla birleştirerek geleceğin dijital ihtiyaçlarına yönelik ürünler sunar.`,
      logo: `Techora logosu; teknoloji, bağlantı ve veri akışı kavramlarından ilham alır. Devre formundaki amblem elektronik sistemleri ve yeniliği simgelerken, pembe ve mavi tonlar markanın enerjik, güvenilir ve çağdaş karakterini yansıtır.`
    },
    {
      title: "Pixel Craft Studio",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/pJmqz6MEiCwRCw5z",
      alt: "Pixel Craft Studio animasyon stüdyosu marka kimliği sunumu",
      company: `Pixel Craft Studio, yaratıcı fikirleri etkileyici animasyonlara dönüştüren bir animasyon film stüdyosudur. 2D ve 3D animasyon, kısa film, motion graphics ve dijital görsel içerik alanlarında; özgün, estetik ve hikâye odaklı projeler üretir.`,
      logo: `Pixel Craft Studio logosu, piksel estetiğinden ilham alan modern ve geometrik bir tipografiye sahiptir. Kullanılan mavi tonlar dijital dünyayı, güveni ve yaratıcılığı temsil ederken; altın ve bej vurgu çizgileri markaya dengeli ve seçkin bir karakter kazandırır. Logo, stüdyonun yaratıcı üretim gücünü ve dijital ustalığını yansıtır.`
    },
    {
      title: "Velorie",
      category: "Marka & Kurumsal Kimlik",
      image: "https://at.adobe.com/rhHX2M0xiSuMdbiA",
      alt: "Velorie kadın giyim markası kimlik sunumu",
      company: `Velorie, modern kadının zarafetini ve özgüvenini yansıtan, şıklığı zamansız tasarımlarla buluşturan bir kadın giyim markasıdır. Kaliteli kumaşlar, özenli işçilik ve çağdaş çizgilerle hazırlanan koleksiyonlarıyla her stile estetik ve konfor sunmayı hedefler.`,
      logo: `Velorie logosu, markanın zarafet ve akıcılık anlayışını yansıtan modern bir tipografiyle tasarlanmıştır. “V” harfinden geçen dalga formu; kumaşın yumuşak hareketini, feminen zarafeti ve estetik akışı simgeler. Pudra ve rose gold tonları ise şıklığı, sıcaklığı ve lüksü temsil ederek markaya sofistike bir kimlik kazandırır.`
    }
  ];

  const cards = [...document.querySelectorAll(".project-card")];

  cards.forEach((card, index) => {
    const cover = covers[index];
    if (!cover) return;

    const title = card.querySelector(".project-body h3");
    const label = card.querySelector(".project-visual strong");
    if (title) title.textContent = cover.title;
    if (label) label.textContent = cover.label;

    const visual = card.querySelector(".project-visual");
    if (!visual) return;

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
        visual.replaceChildren(image);
        visual.classList.add("has-cover");
      },
      { once: true }
    );
  });

  const projectIntro = document.querySelector("#projeler .section-heading p");
  if (projectIntro?.textContent.includes("Proje görselleri eklendiğinde")) {
    projectIntro.textContent =
      "Grafik tasarımın farklı alanlarında geliştirdiğim seçili çalışmalar ve uzmanlık kategorileri.";
  }

  const createLightbox = () => {
    const current = document.querySelector(".project-lightbox");
    if (current) return current;

    const lightbox = document.createElement("div");
    lightbox.className = "project-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-labelledby", "project-lightbox-title");
    lightbox.innerHTML = `
      <div class="project-lightbox-backdrop" data-lightbox-close></div>
      <button class="project-lightbox-close" type="button" aria-label="Galeriyi kapat" data-lightbox-close><span aria-hidden="true">×</span></button>
      <button class="project-lightbox-arrow project-lightbox-prev" type="button" aria-label="Önceki projeyi göster"><span aria-hidden="true">‹</span></button>
      <article class="project-lightbox-panel">
        <div class="project-lightbox-media">
          <div class="project-lightbox-loading" aria-hidden="true"></div>
          <img class="project-lightbox-image" alt="">
        </div>
        <div class="project-lightbox-content">
          <div class="project-lightbox-heading">
            <div>
              <span class="project-lightbox-category"></span>
              <h2 id="project-lightbox-title"></h2>
            </div>
            <span class="project-lightbox-counter" aria-live="polite"></span>
          </div>
          <div class="project-lightbox-copy-grid">
            <section>
              <h3>Firma Hakkında</h3>
              <p class="project-lightbox-company"></p>
            </section>
            <section>
              <h3>Logo Tanımı</h3>
              <p class="project-lightbox-logo"></p>
            </section>
          </div>
        </div>
      </article>
      <button class="project-lightbox-arrow project-lightbox-next" type="button" aria-label="Sonraki projeyi göster"><span aria-hidden="true">›</span></button>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
  };

  const lightbox = createLightbox();
  const panel = lightbox.querySelector(".project-lightbox-panel");
  const displayImage = lightbox.querySelector(".project-lightbox-image");
  const loading = lightbox.querySelector(".project-lightbox-loading");
  const title = lightbox.querySelector("#project-lightbox-title");
  const category = lightbox.querySelector(".project-lightbox-category");
  const counter = lightbox.querySelector(".project-lightbox-counter");
  const company = lightbox.querySelector(".project-lightbox-company");
  const logo = lightbox.querySelector(".project-lightbox-logo");
  const prevButton = lightbox.querySelector(".project-lightbox-prev");
  const nextButton = lightbox.querySelector(".project-lightbox-next");
  const closeButton = lightbox.querySelector(".project-lightbox-close");

  let activeIndex = 0;
  let lastFocusedElement = null;

  const updateArrowState = () => {
    const enabled = brandProjects.length > 1;
    prevButton.disabled = !enabled;
    nextButton.disabled = !enabled;
    prevButton.classList.toggle("is-hidden", !enabled);
    nextButton.classList.toggle("is-hidden", !enabled);
  };

  const renderProject = (index) => {
    activeIndex = (index + brandProjects.length) % brandProjects.length;
    const project = brandProjects[activeIndex];

    panel.scrollTop = 0;
    lightbox.classList.add("is-loading");
    loading.hidden = false;
    displayImage.removeAttribute("src");
    displayImage.alt = project.alt;
    title.textContent = project.title;
    category.textContent = project.category;
    counter.textContent = `${activeIndex + 1} / ${brandProjects.length}`;
    company.textContent = project.company;
    logo.textContent = project.logo;

    const preloader = new Image();
    preloader.decoding = "async";
    preloader.referrerPolicy = "no-referrer";
    preloader.onload = () => {
      displayImage.src = project.image;
      lightbox.classList.remove("is-loading");
      loading.hidden = true;
    };
    preloader.onerror = () => {
      lightbox.classList.remove("is-loading");
      loading.hidden = true;
      displayImage.alt = `${project.alt} yüklenemedi`;
    };
    preloader.src = project.image;
    updateArrowState();
  };

  const openLightbox = (index = 0) => {
    lastFocusedElement = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("project-lightbox-open");
    renderProject(index);
    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
      closeButton.focus({ preventScroll: true });
    });
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("project-lightbox-open");
    window.setTimeout(() => {
      lightbox.hidden = true;
      lastFocusedElement?.focus?.({ preventScroll: true });
    }, 220);
  };

  const showPrevious = () => {
    if (brandProjects.length > 1) renderProject(activeIndex - 1);
  };

  const showNext = () => {
    if (brandProjects.length > 1) renderProject(activeIndex + 1);
  };

  const brandCard = cards[0];
  if (brandCard) {
    brandCard
      .querySelectorAll(".project-card-hitarea, .project-card-modal-trigger")
      .forEach((element) => element.remove());
    brandCard.style.position = "relative";
    brandCard.classList.add("has-project-modal");

    const trigger = document.createElement("button");
    trigger.className = "project-card-modal-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-label", "Marka & Kurumsal Kimlik projelerini galeride görüntüle");
    trigger.addEventListener("click", () => openLightbox(0));
    brandCard.appendChild(trigger);
  }

  prevButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);
  lightbox.querySelectorAll("[data-lightbox-close]").forEach((element) => {
    element.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    } else if (event.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button:not([disabled])")].filter(
        (element) => !element.classList.contains("is-hidden")
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
