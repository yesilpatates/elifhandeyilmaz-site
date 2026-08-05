(() => {
  const card = document.querySelector('.project-card .project-visual.visual-event')?.closest('.project-card')
    || [...document.querySelectorAll('.project-card')].find((item) => {
      const title = item.querySelector('.project-body h3')?.textContent?.toLocaleLowerCase('tr-TR') || '';
      return title.includes('etkinlik') && title.includes('organizasyon');
    });
  if (!card || card.dataset.eventShowcaseReady === 'true') return;

  const projects = [
    {
      id: 'turkiye-denizcilik-zirvesi',
      number: '01',
      title: '5. Türkiye Denizcilik Zirvesi',
      short: 'TDZ',
      tone: 'navy',
      image: 'assets/event-projects/turkiye-denizcilik-zirvesi/01-ana-mockup.webp',
      available: true
    },
    {
      id: 'uluslararasi-denizci-kadinlar-gunu',
      number: '02',
      title: 'Uluslararası Denizci Kadınlar Günü',
      short: 'UDKG',
      tone: 'coral',
      image: 'assets/event-projects/uluslararasi-denizci-kadinlar-gunu/01-ana-mockup.webp',
      available: true
    },
    {
      id: 'yesil-donusum-zirvesi',
      number: '03',
      title: 'II. Yeşil Dönüşüm Zirvesi',
      short: 'YDZ',
      tone: 'green'
    },
    {
      id: 'gemi-yat-tasarim-yarismasi',
      number: '04',
      title: 'XIV. Ulusal Gemi ve Yat Tasarım Yarışması',
      short: 'GYTY',
      tone: 'sand'
    },
    {
      id: 'denizci-fenerbahceliler-dernegi',
      number: '05',
      title: 'Denizci Fenerbahçeliler Derneği',
      short: 'DFD',
      tone: 'yellow'
    }
  ];

  // Yeni fotoğraflar bu dizinin sonuna eklenir; mevcut sıra korunur.
  const summitPhotos = [
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/01-ana-mockup.webp',
      alt: '5. Türkiye Denizcilik Zirvesi organizasyon tasarımlarının toplu mockup sunumu'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/02-neta-sea-etkinlik.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik alanında sergilenen Neta Sea Kabotaj özel sayısı'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/03-zirve-katilimcilari.webp',
      alt: '5. Türkiye Denizcilik Zirvesi katılımcıları etkinlik salonunda'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/04-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 4'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/05-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 5'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/06-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 6'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/07-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 7'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/08-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 8'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/09-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 9'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/10-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 10'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/11-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 11'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/12-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 12'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/13-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 13'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/14-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 14'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/15-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 15'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/16-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 16'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/17-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 17'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/18-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 18'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/19-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 19'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/20-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 20'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/21-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 21'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/22-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 22'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/23-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 23'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/24-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 24'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/25-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 25'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/26-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 26'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/27-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 27'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/28-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 28'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/29-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 29'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/30-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 30'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/31-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 31'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/32-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 32'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/33-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 33'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/34-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 34'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/35-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 35'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/36-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 36'
    },
    {
      src: 'assets/event-projects/turkiye-denizcilik-zirvesi/37-etkinlik-fotografi.webp',
      alt: '5. Türkiye Denizcilik Zirvesi etkinlik fotoğrafı 37'
    }
  ];

  const womenDayPhotos = [
    {
      src: 'assets/event-projects/uluslararasi-denizci-kadinlar-gunu/01-ana-mockup.webp',
      alt: 'Uluslararası Denizci Kadınlar Günü organizasyon tasarımlarının toplu mockup sunumu'
    },
    {
      src: 'assets/event-projects/uluslararasi-denizci-kadinlar-gunu/02-ana-tasarim.webp',
      alt: 'Uluslararası Denizci Kadınlar Günü ana etkinlik tasarımı'
    },
    ...Array.from({ length: 7 }, (_, index) => ({
      src: `assets/event-projects/uluslararasi-denizci-kadinlar-gunu/${String(index + 3).padStart(2, '0')}-etkinlik-fotografi.webp`,
      alt: `Uluslararası Denizci Kadınlar Günü etkinlik fotoğrafı ${index + 1}`
    }))
  ];

  // Doğal görsel ölçüleri yükleme tamamlanmadan yer ayırır; açılışta sıra ve boşluk kaymasını önler.
  const applyPhotoSizes = (photos, sizes) => photos.forEach((photo, index) => {
    [photo.width, photo.height] = sizes[index];
  });

  applyPhotoSizes(summitPhotos, [
    [1672, 941], [1152, 2048], [2048, 1365], [1536, 1024], [795, 1127],
    [1536, 1024], [675, 1200], [675, 1200], [1800, 1013], [1536, 1024],
    [800, 1200], [1536, 1024], [675, 1200], [1536, 1024], [1536, 864],
    [1536, 1024], [675, 1200], [1536, 1024], [675, 1200], [1536, 864],
    [675, 1200], [1536, 864], [1536, 1024], [1536, 1024], [1536, 1024],
    [1536, 1024], [1536, 1024], [1536, 1024], [1536, 1024], [1536, 1024],
    [1536, 1024], [1536, 1024], [1536, 1024], [1800, 1200], [1536, 865],
    [960, 1200], [1536, 348]
  ]);

  applyPhotoSizes(womenDayPhotos, [
    [1536, 1024], [1536, 658], [1536, 1152], [1536, 1152], [1536, 1152],
    [1536, 1152], [1152, 1536], [1536, 1152], [1536, 1152]
  ]);

  const projectDetailsMarkup = {
    'turkiye-denizcilik-zirvesi': `
      <section class="event-project-details__section event-project-details__identity">
        <h3>Proje Künyesi</h3>
        <dl class="event-project-facts">
          <div>
            <dt>Müşteri / Kurum</dt>
            <dd>T.C. Ulaştırma ve Altyapı Bakanlığı / Denizcilik Genel Müdürlüğü</dd>
          </div>
          <div>
            <dt>Tarih</dt>
            <dd>2–3 Temmuz 2026</dd>
          </div>
          <div>
            <dt>Lokasyon</dt>
            <dd>Tersane İstanbul, Taşkızak Etkinlik Alanı</dd>
          </div>
        </dl>
      </section>

      <section class="event-project-details__section event-project-details__about">
        <h3>Etkinlik Hakkında</h3>
        <p>T.C. Ulaştırma ve Altyapı Bakanlığı / Denizcilik Genel Müdürlüğü tarafından düzenlenen 5. Türkiye Denizcilik Zirvesi; kamu, özel sektör ve uluslararası denizcilik temsilcilerini bir araya getiren kapsamlı bir organizasyondur. Kabotaj Kanunu’nun 100. yılına denk gelen zirvede; küresel deniz ticareti, sürdürülebilirlik, limancılık ve sektörün geleceğine yönelik stratejik yaklaşımlar ele alınmıştır.</p>
      </section>

      <section class="event-project-details__section event-project-details__role">
        <h3>Rolüm ve Tasarım Kapsamı</h3>
        <ul class="event-project-scope">
          <li><strong>Logo ve Kurumsal Kimlik:</strong> Zirve logosunun ve kurumsal kimlik kılavuzunun hazırlanması</li>
          <li><strong>Tema ve İllüstrasyon:</strong> Kabotaj Kanunu’nun 100. yılına özel desenlerin ve vektörel motiflerin tasarlanması</li>
          <li><strong>Mekân Giydirme:</strong> Giriş takları, yönlendirme totemleri, karşılama bankoları, backdrop ve sahne uygulamalarının tasarlanması</li>
          <li><strong>Basılı Materyaller:</strong> Yaka kartları, menüler, bayraklar, pankartlar, ödüller ve VIP hediyelerine yönelik tasarımların hazırlanması</li>
          <li><strong>Dijital Materyaller:</strong> Dijital davetiyeler, sosyal medya içerikleri ve ekran görsellerinin tasarlanması</li>
        </ul>
        <p class="event-project-summary">Projenin logo ve görsel konsept geliştirme aşamasından etkinlik alanındaki fiziksel uygulamalara kadar uzanan tüm görsel iletişim sürecini üstlendim. Basılı ve dijital materyallerin tasarımını hazırlayarak üretim ve uygulama süreçlerinin görsel bütünlük içinde ilerlemesini sağladım.</p>
      </section>

      <section class="event-project-details__section event-project-details__approach">
        <h3>Tasarım Yaklaşımı</h3>
        <p>Kabotaj Kanunu’nun 100. yılına özel geliştirilen görsel konseptte, geleneksel denizcilik motifleri modern geometrik grid sistemiyle bir araya getirildi. Lacivert ve altın tonlarından oluşan prestijli renk paletiyle zirvenin kurumsal ve protokol ağırlıklı yapısı vurgulanırken, çağdaş ve yenilikçi bir görsel dil oluşturuldu.</p>
      </section>`,
    'uluslararasi-denizci-kadinlar-gunu': `
      <section class="event-project-details__section event-project-details__identity">
        <h3>Proje Künyesi</h3>
        <dl class="event-project-facts">
          <div>
            <dt>Müşteri / Kurum</dt>
            <dd>T.C. Ulaştırma ve Altyapı Bakanlığı / Denizcilik Genel Müdürlüğü</dd>
          </div>
          <div>
            <dt>Tarih</dt>
            <dd>18 Mayıs 2026</dd>
          </div>
          <div>
            <dt>Lokasyon</dt>
            <dd>Karayolları Sosyal Tesisleri, Ortaköy – İstanbul</dd>
          </div>
        </dl>
      </section>

      <section class="event-project-details__section event-project-details__about">
        <h3>Etkinlik Hakkında</h3>
        <p>“Denizcilikte İz Bırakan Kadınlar” temasıyla gerçekleştirilen etkinlik, teknik operasyonlardan yönetim kademelerine kadar sektörün her alanındaki kadın emeğine ve başarılarına dikkat çeken kapsayıcı bir buluşmadır. Program; genç kadınları denizcilik kariyerlerine teşvik etmek, sektörde fırsat eşitliğini desteklemek ve sürdürülebilir gelişim vizyonunu paylaşmak amacıyla düzenlenmiştir.</p>
      </section>

      <section class="event-project-details__section event-project-details__role">
        <h3>Rolüm ve Tasarım Kapsamı</h3>
        <ul class="event-project-scope">
          <li><strong>Konsept ve İllüstrasyon:</strong> Etkinlik temasına özel ana illüstrasyonun ve tamamlayıcı görsel motiflerin hazırlanması</li>
          <li><strong>Görsel Kimlik:</strong> Etkinlik genelinde kullanılan renk, tipografi ve görsel iletişim standartlarının oluşturulması</li>
          <li><strong>Mekân Giydirme:</strong> Ana sahne backdrop’u, roll-up banner’lar ve alan yönlendirmelerinin tasarlanması</li>
          <li><strong>Basılı Materyaller:</strong> Etkinlik broşürü, program akışı, yaka kartları ve masaüstü bilgilendirme kartlarının hazırlanması</li>
          <li><strong>Katılımcı Materyalleri:</strong> Hediye kartı ve katılımcı teşekkür kartlarının tasarlanması</li>
        </ul>
        <p class="event-project-summary">Projenin görsel konsept geliştirme aşamasından etkinlik alanındaki fiziksel uygulamalara kadar uzanan tüm görsel iletişim sürecini üstlendim. Basılı ve dijital materyallerin tasarımını hazırlayarak üretim ve uygulama süreçlerinin bütüncül bir görsel dil içerisinde ilerlemesini sağladım.</p>
      </section>

      <section class="event-project-details__section event-project-details__approach">
        <h3>Tasarım Yaklaşımı</h3>
        <p>Görsel konsept, kadınların denizcilik sektöründeki güçlü varlığını ve vizyonunu temsil eden özgün bir illüstrasyon etrafında geliştirildi. Turkuaz ve mavi tonlarından oluşan renk paleti; denizcilik motifleri ve serif tipografiyle bir araya getirilerek ilham verici, güçlü ve kurumsal bir görsel dil oluşturuldu.</p>
      </section>`
  };

  const projectGalleries = {
    'turkiye-denizcilik-zirvesi': {
      title: '5. Türkiye Denizcilik Zirvesi',
      photos: summitPhotos,
      details: projectDetailsMarkup['turkiye-denizcilik-zirvesi']
    },
    'uluslararasi-denizci-kadinlar-gunu': {
      title: 'Uluslararası Denizci Kadınlar Günü',
      photos: womenDayPhotos,
      details: projectDetailsMarkup['uluslararasi-denizci-kadinlar-gunu']
    }
  };

  card.dataset.eventShowcaseReady = 'true';
  card.classList.add('has-event-showcase');

  const projectCards = projects.map((project) => {
    const visual = project.image
      ? `<img src="${project.image}" alt="${project.title} proje sunumu">`
      : `<span class="event-project-monogram" aria-hidden="true">${project.short}</span>`;
    const actionAttributes = project.available
      ? `type="button" data-event-project="${project.id}" aria-label="${project.title} projesini aç"`
      : `type="button" aria-label="${project.title}" disabled`;
    return `
      <button class="event-project-card event-project-card--${project.tone}" ${actionAttributes}>
        <span class="event-project-visual">${visual}<span class="event-project-number">${project.number}</span></span>
        <span class="event-project-info">
          <strong>${project.title}</strong>
          <small>Etkinlik & Organizasyon Tasarımı</small>
        </span>
        ${project.available ? '<span class="event-project-arrow" aria-hidden="true">↗</span>' : ''}
      </button>`;
  }).join('');

  const modal = document.createElement('div');
  modal.className = 'event-showcase';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'event-showcase-title');
  modal.innerHTML = `
    <div class="event-showcase-backdrop" data-event-showcase-close></div>
    <article class="event-showcase-dialog">
      <header class="event-showcase-header">
        <button class="event-showcase-back" type="button" data-event-showcase-back aria-label="Organizasyon listesine dön" hidden>
          <span aria-hidden="true">←</span> Listeye dön
        </button>
        <div class="event-showcase-heading">
          <span class="event-showcase-kicker">Etkinlik & Organizasyon Tasarımı</span>
          <h2 class="event-showcase-title" id="event-showcase-title">Organizasyon Projeleri</h2>
        </div>
        <button class="event-showcase-close" type="button" aria-label="Pencereyi kapat" data-event-showcase-close>×</button>
      </header>

      <div class="event-showcase-list-view" data-event-list-view>
        <div class="event-showcase-list-heading">
          <span>Organizasyon listesi</span>
          <small>5 proje</small>
        </div>
        <div class="event-project-grid">${projectCards}</div>
      </div>

      <div class="event-showcase-detail-view" data-event-detail-view hidden>
        <div class="event-showcase-carousel" data-event-carousel>
          <button class="event-showcase-nav event-showcase-nav--prev" type="button" aria-label="Önceki fotoğraf" data-event-prev>
            <span aria-hidden="true">‹</span>
          </button>
          <div class="event-showcase-frame" tabindex="0" aria-label="5. Türkiye Denizcilik Zirvesi proje görselleri; kaydırarak gezinebilirsiniz">
            <div class="event-showcase-track"></div>
          </div>
          <button class="event-showcase-nav event-showcase-nav--next" type="button" aria-label="Sonraki fotoğraf" data-event-next>
            <span aria-hidden="true">›</span>
          </button>
          <span class="event-showcase-counter" aria-live="polite" aria-atomic="true"></span>
        </div>

        <div class="event-project-details"></div>
      </div>
    </article>`;
  document.body.appendChild(modal);

  const listView = modal.querySelector('[data-event-list-view]');
  const detailView = modal.querySelector('[data-event-detail-view]');
  const title = modal.querySelector('.event-showcase-title');
  const backButton = modal.querySelector('[data-event-showcase-back]');
  const closeButton = modal.querySelector('.event-showcase-close');
  const frame = modal.querySelector('.event-showcase-frame');
  const track = modal.querySelector('.event-showcase-track');
  const previousButton = modal.querySelector('[data-event-prev]');
  const nextButton = modal.querySelector('[data-event-next]');
  const counter = modal.querySelector('.event-showcase-counter');
  const dialog = modal.querySelector('.event-showcase-dialog');
  const projectDetails = modal.querySelector('.event-project-details');

  const photoMarkup = (photo, index, copy) => `
    <img
      class="event-showcase-image"
      src="${photo.src}"
      alt="${copy === 1 ? photo.alt : ''}"
      width="${photo.width}"
      height="${photo.height}"
      data-photo-index="${index}"
      data-photo-copy="${copy}"
      ${copy === 1 ? '' : 'aria-hidden="true"'}
      decoding="async"
      draggable="false"
    >`;

  let activePhotos = summitPhotos;
  let slides = [];
  let imagesReady = Promise.resolve();
  let renderVersion = 0;

  const renderCarousel = (photos) => {
    renderVersion += 1;
    activePhotos = photos;
    // Üç aynı set, her iki yönde de son fotoğraftan ilk fotoğrafa kesintisiz geçiş sağlar.
    track.innerHTML = [0, 1, 2].map((copy) => (
      activePhotos.map((photo, index) => photoMarkup(photo, index, copy)).join('')
    )).join('');
    slides = [...track.querySelectorAll('.event-showcase-image')];
    imagesReady = Promise.all([...frame.querySelectorAll('img')].map((image) => (
      image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
          })
    )));
    setWidth = 0;
    activePhotoIndex = 0;
    carouselReady = false;
    navigationSlideIndex = null;
    counter.textContent = `1 / ${activePhotos.length}`;
    previousButton.disabled = true;
    nextButton.disabled = true;
    return renderVersion;
  };

  let setWidth = 0;
  let activePhotoIndex = 0;
  let carouselReady = false;
  let isRepositioning = false;
  let scrollRaf = 0;
  let scrollSettleTimer = 0;
  let resizeTimer = 0;
  let navigationSlideIndex = null;

  const updateCounter = (index) => {
    const normalizedIndex = (index + activePhotos.length) % activePhotos.length;
    if (normalizedIndex === activePhotoIndex && counter.textContent) return;
    activePhotoIndex = normalizedIndex;
    counter.textContent = `${activePhotoIndex + 1} / ${activePhotos.length}`;
  };

  const measureCarousel = () => {
    const firstSetStart = track.querySelector('[data-photo-copy="0"][data-photo-index="0"]');
    const middleSetStart = track.querySelector('[data-photo-copy="1"][data-photo-index="0"]');
    setWidth = middleSetStart.offsetLeft - firstSetStart.offsetLeft;
    return middleSetStart;
  };

  const getCenteredLeft = (slide) => (
    slide.offsetLeft - Math.max(0, (frame.clientWidth - slide.offsetWidth) / 2)
  );

  const releaseRepositioning = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      isRepositioning = false;
    }));
  };

  const centerSlide = (slide, behavior = 'smooth', update = true) => {
    if (!slide) return;
    if (behavior === 'auto') isRepositioning = true;
    frame.scrollTo({ left: getCenteredLeft(slide), behavior });
    if (update) updateCounter(Number(slide.dataset.photoIndex));
    if (behavior === 'auto') releaseRepositioning();
  };

  const resetCarousel = (index = 0) => {
    const middleSetStart = measureCarousel();
    const target = index === 0
      ? middleSetStart
      : track.querySelector(`[data-photo-copy="1"][data-photo-index="${index}"]`);
    centerSlide(target, 'auto');
  };

  const getNearestSlideIndex = () => {
    const frameCenter = frame.scrollLeft + frame.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - frameCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    return nearestIndex;
  };

  const moveCarousel = (direction) => {
    if (!carouselReady || !slides.length) return;
    const startIndex = navigationSlideIndex ?? getNearestSlideIndex();
    const targetIndex = startIndex + direction;
    if (!slides[targetIndex]) return;
    navigationSlideIndex = targetIndex;
    updateCounter(activePhotoIndex + direction);
    centerSlide(slides[targetIndex], 'smooth', false);
  };

  const normalizeLoopPosition = (slide) => {
    if (!slide || slide.dataset.photoCopy === '1') return;
    const middleSlide = track.querySelector(
      `[data-photo-copy="1"][data-photo-index="${slide.dataset.photoIndex}"]`
    );
    centerSlide(middleSlide, 'auto', false);
  };

  frame.addEventListener('scroll', () => {
    if (!carouselReady || isRepositioning) return;
    cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(() => {
      if (navigationSlideIndex !== null) return;
      const nearestSlide = slides[getNearestSlideIndex()];
      if (nearestSlide) updateCounter(Number(nearestSlide.dataset.photoIndex));
    });

    window.clearTimeout(scrollSettleTimer);
    scrollSettleTimer = window.setTimeout(() => {
      const nearestSlide = slides[getNearestSlideIndex()];
      if (!nearestSlide) return;

      const distanceToCenter = Math.abs(frame.scrollLeft - getCenteredLeft(nearestSlide));
      if (distanceToCenter > 2) {
        centerSlide(nearestSlide, 'smooth', navigationSlideIndex === null);
        return;
      }

      if (navigationSlideIndex !== null) {
        updateCounter(Number(nearestSlide.dataset.photoIndex));
      }
      navigationSlideIndex = null;
      normalizeLoopPosition(nearestSlide);
    }, 180);
  }, { passive: true });

  const beginManualNavigation = () => {
    navigationSlideIndex = null;
    window.clearTimeout(scrollSettleTimer);
  };
  frame.addEventListener('pointerdown', beginManualNavigation, { passive: true });
  frame.addEventListener('touchstart', beginManualNavigation, { passive: true });
  frame.addEventListener('wheel', beginManualNavigation, { passive: true });

  track.addEventListener('click', (event) => {
    const selectedSlide = event.target.closest('.event-showcase-image');
    if (selectedSlide) centerSlide(selectedSlide);
  });

  previousButton.addEventListener('click', () => moveCarousel(-1));
  nextButton.addEventListener('click', () => moveCarousel(1));

  frame.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveCarousel(event.key === 'ArrowLeft' ? -1 : 1);
  });

  window.addEventListener('resize', () => {
    if (modal.hidden || detailView.hidden) return;
    const currentIndex = activePhotoIndex;
    carouselReady = false;
    navigationSlideIndex = null;
    window.clearTimeout(scrollSettleTimer);
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        if (modal.hidden || detailView.hidden) return;
        resetCarousel(currentIndex);
        updateCounter(currentIndex);
        carouselReady = true;
      });
    }, 160);
  });

  const stopCarousel = () => {
    renderVersion += 1;
    carouselReady = false;
    isRepositioning = false;
    navigationSlideIndex = null;
    cancelAnimationFrame(scrollRaf);
    window.clearTimeout(scrollSettleTimer);
    window.clearTimeout(resizeTimer);
    previousButton.disabled = true;
    nextButton.disabled = true;
  };

  const showList = () => {
    stopCarousel();
    detailView.hidden = true;
    listView.hidden = false;
    backButton.hidden = true;
    title.textContent = 'Organizasyon Projeleri';
    dialog.scrollTop = 0;
  };

  const showProject = (event) => {
    const projectId = event.currentTarget.dataset.eventProject;
    const gallery = projectGalleries[projectId];
    if (!gallery) return;
    listView.hidden = true;
    detailView.hidden = false;
    backButton.hidden = false;
    title.textContent = gallery.title;
    frame.setAttribute('aria-label', `${gallery.title} proje görselleri; kaydırarak gezinebilirsiniz`);
    projectDetails.innerHTML = gallery.details || '';
    projectDetails.hidden = !gallery.details;
    projectDetails.setAttribute('aria-label', `${gallery.title} proje bilgileri`);
    const currentRender = renderCarousel(gallery.photos);
    dialog.scrollTop = 0;
    requestAnimationFrame(() => {
      if (currentRender === renderVersion) resetCarousel(0);
    });
    imagesReady.then(() => requestAnimationFrame(() => {
      if (currentRender !== renderVersion || detailView.hidden || modal.hidden) return;
      resetCarousel(0);
      updateCounter(0);
      carouselReady = true;
      previousButton.disabled = false;
      nextButton.disabled = false;
    }));
  };

  const trigger = document.createElement('button');
  trigger.className = 'event-showcase-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Etkinlik ve organizasyon projelerini aç');
  card.appendChild(trigger);

  let lastFocused = null;
  const open = () => {
    lastFocused = document.activeElement;
    showList();
    modal.hidden = false;
    document.body.classList.add('event-showcase-open');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      closeButton.focus({ preventScroll: true });
    });
  };
  const close = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('event-showcase-open');
    window.setTimeout(() => {
      modal.hidden = true;
      showList();
      lastFocused?.focus?.({ preventScroll: true });
    }, 220);
  };

  trigger.addEventListener('click', open);
  modal.querySelectorAll('[data-event-project]').forEach((projectCard) => projectCard.addEventListener('click', showProject));
  backButton.addEventListener('click', showList);
  modal.querySelectorAll('[data-event-showcase-close]').forEach((item) => item.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      if (!detailView.hidden) {
        showList();
        backButton.focus({ preventScroll: true });
        return;
      }
      close();
    }
  });
})();
