(() => {
  const promoCard = document.querySelector('.project-card .project-visual.visual-promo')?.closest('.project-card')
    || [...document.querySelectorAll('.project-card')].find((item) => {
      const heading = item.querySelector('.project-body h3')?.textContent?.toLocaleLowerCase('tr-TR') || '';
      return heading.includes('tanıtım') && heading.includes('iletişim');
    });

  if (!promoCard || promoCard.dataset.promoGalleryReady === 'true') return;

  // Yeni 16:9 mockuplar bu diziye eklenir; her çalışma kendi açıklamasıyla birlikte gösterilir.
  const projects = [
    {
      title: 'Grand Seyahat – Afiş Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Afiş ve Açık Hava Reklamı',
      image: 'assets/promo-projects/grand-seyahat-afis.webp',
      alt: 'Grand Seyahat için hazırlanan afiş tasarımının havaalanı reklam panosu mockupı',
      about: 'Grand Seyahat için hazırlanan çalışma; seyahat planlama, rezervasyon ve rehberlik hizmetlerini tek bir tanıtım afişinde anlaşılır biçimde sunmak üzere kurgulandı. Tasarım, yoğun yolcu trafiğine sahip havaalanı gibi kamusal alanlarda mesajın kısa sürede algılanmasını hedefler.',
      approach: 'Mor ve yeşil renk paletiyle güçlü bir kontrast oluşturuldu; sarı vurgu, kampanya mesajını odak noktasına taşıdı. Dairesel fotoğraf alanları ve rota çizgisi seyahat temasını desteklerken, başlık–hizmet–iletişim hiyerarşisi hızlı okunabilirlik sağlayacak şekilde düzenlendi.',
      roles: [
        'Konsept ve görsel dil geliştirme',
        'Afiş tasarımı ve sayfa düzeni',
        'Tipografi ve renk sistemi',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Special Burger – Afiş Tasarımı',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Ürün Tanıtımı ve Mekân İçi Reklam',
      image: 'assets/promo-projects/special-burger-afis.webp',
      alt: 'Special Burger için hazırlanan ürün afişinin restoran içi ışıklı reklam panosu mockupı',
      about: 'Special Burger için hazırlanan çalışma; ürünün iştah açıcı görselini, fiyat bilgisini ve sipariş kanalını tek bir güçlü tanıtım afişinde bir araya getirir. Restoran içinde uzaktan fark edilecek ve kısa sürede okunacak bir iletişim dili hedeflenmiştir.',
      approach: 'Siyah zemin ve sarı vurgu rengiyle yüksek kontrast oluşturuldu. Ürünün fotoğraf ve illüstrasyon arasında bölünen ana görseli afişin odağına yerleştirildi; fiyat, slogan ve sipariş bilgileri net bir hiyerarşiyle desteklendi.',
      roles: [
        'Konsept ve görsel dil geliştirme',
        'Afiş tasarımı ve sayfa düzeni',
        'Fotoğraf manipülasyonu ve illüstrasyon',
        'Mockup sunumu'
      ]
    },
    {
      title: 'Eğitim Zamanı – Etkinlik Afişi',
      category: 'Tanıtım & İletişim Tasarımı',
      subtitle: 'Etkinlik Duyurusu ve Kurumsal İletişim',
      image: 'assets/promo-projects/egitim-zamani-afis.webp',
      alt: 'Eğitim Zamanı için hazırlanan etkinlik afişinin kurumsal mekân içi ışıklı pano mockupı',
      about: 'Eğitim Zamanı için hazırlanan etkinlik afişi; eğitmen buluşmasını, etkinlik tarihini ve ana mesajı kurumsal bir duyuru diliyle aktarır. Çalışma, eğitim ve seminer alanlarında hızlı fark edilmek üzere kurgulanmıştır.',
      approach: 'Siyah, beyaz ve sarıdan oluşan sınırlı renk paleti kurumsal ve güçlü bir görünüm sağlar. Siyah-beyaz portre kolajı etkinliğin çok sesli yapısını vurgularken; kavisli alanlar ve büyük başlık tarih, saat ve etkinlik adını belirgin bir okuma sırasına taşır.',
      roles: [
        'Konsept ve görsel dil geliştirme',
        'Etkinlik afişi tasarımı',
        'Portre kolajı ve tipografik düzen',
        'Mockup sunumu'
      ]
    }
  ];

  const modal = document.createElement('div');
  modal.className = 'project-lightbox promo-project-lightbox';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'promo-lightbox-title');
  modal.innerHTML = `
    <div class="project-lightbox-backdrop" data-promo-close></div>
    <article class="project-lightbox-panel">
      <header class="project-lightbox-heading">
        <div>
          <span class="project-lightbox-category"></span>
          <h2 id="promo-lightbox-title"></h2>
          <p class="promo-lightbox-subtitle"></p>
        </div>
        <button class="project-lightbox-close" type="button" aria-label="Projeyi kapat" data-promo-close><span aria-hidden="true">×</span></button>
      </header>
      <div class="project-lightbox-body">
        <div class="project-lightbox-media">
          <div class="project-lightbox-loading" aria-hidden="true"></div>
          <img class="project-lightbox-image" alt="">
        </div>
        <aside class="project-lightbox-details">
          <span class="project-lightbox-counter" aria-live="polite"></span>
          <section><h3>Proje Hakkında</h3><p class="promo-lightbox-about"></p></section>
          <section><h3>Tasarım Yaklaşımı</h3><p class="promo-lightbox-approach"></p></section>
          <section class="project-lightbox-role-section"><h3>Projedeki Rolüm</h3><ul class="project-lightbox-roles"></ul></section>
        </aside>
      </div>
    </article>
    <button class="project-lightbox-arrow project-lightbox-prev" type="button" aria-label="Önceki projeyi göster"><span aria-hidden="true">‹</span></button>
    <button class="project-lightbox-arrow project-lightbox-next" type="button" aria-label="Sonraki projeyi göster"><span aria-hidden="true">›</span></button>`;
  document.body.appendChild(modal);

  const panel = modal.querySelector('.project-lightbox-panel');
  const image = modal.querySelector('.project-lightbox-image');
  const loading = modal.querySelector('.project-lightbox-loading');
  const title = modal.querySelector('#promo-lightbox-title');
  const category = modal.querySelector('.project-lightbox-category');
  const subtitle = modal.querySelector('.promo-lightbox-subtitle');
  const counter = modal.querySelector('.project-lightbox-counter');
  const about = modal.querySelector('.promo-lightbox-about');
  const approach = modal.querySelector('.promo-lightbox-approach');
  const roles = modal.querySelector('.project-lightbox-roles');
  const previousButton = modal.querySelector('.project-lightbox-prev');
  const nextButton = modal.querySelector('.project-lightbox-next');
  const closeButton = modal.querySelector('.project-lightbox-close');
  let activeIndex = 0;
  let lastFocusedElement = null;

  const updateNavigation = () => {
    const enabled = projects.length > 1;
    previousButton.disabled = !enabled;
    nextButton.disabled = !enabled;
    previousButton.classList.toggle('is-hidden', !enabled);
    nextButton.classList.toggle('is-hidden', !enabled);
  };

  const renderProject = (index) => {
    activeIndex = (index + projects.length) % projects.length;
    const project = projects[activeIndex];
    panel.scrollTop = 0;
    modal.classList.add('is-loading');
    loading.hidden = false;
    image.removeAttribute('src');
    image.alt = project.alt;
    title.textContent = project.title;
    category.textContent = project.category;
    subtitle.textContent = project.subtitle;
    counter.textContent = `${activeIndex + 1} / ${projects.length}`;
    about.textContent = project.about;
    approach.textContent = project.approach;
    roles.replaceChildren(...project.roles.map((role) => {
      const item = document.createElement('li');
      const check = document.createElement('span');
      check.setAttribute('aria-hidden', 'true');
      check.textContent = '✓';
      item.append(check, document.createTextNode(role));
      return item;
    }));

    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.onload = () => {
      image.src = project.image;
      modal.classList.remove('is-loading');
      loading.hidden = true;
    };
    preloader.onerror = () => {
      modal.classList.remove('is-loading');
      loading.hidden = true;
      image.alt = `${project.alt} yüklenemedi`;
    };
    preloader.src = project.image;
    updateNavigation();
  };

  const openModal = (index = 0) => {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('project-lightbox-open');
    renderProject(index);
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      closeButton.focus({ preventScroll: true });
    });
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('project-lightbox-open');
    window.setTimeout(() => {
      modal.hidden = true;
      lastFocusedElement?.focus?.({ preventScroll: true });
    }, 220);
  };

  const showPrevious = () => projects.length > 1 && renderProject(activeIndex - 1);
  const showNext = () => projects.length > 1 && renderProject(activeIndex + 1);

  promoCard.dataset.promoGalleryReady = 'true';
  promoCard.style.position = 'relative';
  promoCard.classList.add('has-project-modal');
  promoCard.querySelectorAll('.project-card-hitarea, .promo-card-modal-trigger').forEach((element) => element.remove());
  const trigger = document.createElement('button');
  trigger.className = 'project-card-modal-trigger promo-card-modal-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Tanıtım & İletişim Tasarımı projelerini galeride görüntüle');
  trigger.addEventListener('click', () => openModal(0));
  promoCard.appendChild(trigger);

  previousButton.addEventListener('click', showPrevious);
  nextButton.addEventListener('click', showNext);
  modal.querySelectorAll('[data-promo-close]').forEach((element) => element.addEventListener('click', closeModal));

  let swipeStart = null;
  panel.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    swipeStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  panel.addEventListener('touchend', (event) => {
    if (!swipeStart || event.changedTouches.length !== 1) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStart.x;
    const deltaY = touch.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
    deltaX > 0 ? showPrevious() : showNext();
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    } else if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button:not([disabled])')]
        .filter((element) => !element.classList.contains('is-hidden'));
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
