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
      tone: 'coral'
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
        <div class="event-showcase-frame" aria-label="5. Türkiye Denizcilik Zirvesi proje görselleri">
          <img class="event-showcase-image" src="assets/event-projects/turkiye-denizcilik-zirvesi/01-ana-mockup.webp" alt="5. Türkiye Denizcilik Zirvesi organizasyon tasarımlarının toplu mockup sunumu">
          <img class="event-showcase-image" src="assets/event-projects/turkiye-denizcilik-zirvesi/02-neta-sea-etkinlik.webp" alt="5. Türkiye Denizcilik Zirvesi etkinlik alanında sergilenen Neta Sea Kabotaj özel sayısı">
          <img class="event-showcase-image" src="assets/event-projects/turkiye-denizcilik-zirvesi/03-zirve-katilimcilari.webp" alt="5. Türkiye Denizcilik Zirvesi katılımcıları etkinlik salonunda">
        </div>
      </div>
    </article>`;
  document.body.appendChild(modal);

  const listView = modal.querySelector('[data-event-list-view]');
  const detailView = modal.querySelector('[data-event-detail-view]');
  const title = modal.querySelector('.event-showcase-title');
  const backButton = modal.querySelector('[data-event-showcase-back]');
  const closeButton = modal.querySelector('.event-showcase-close');
  const frame = modal.querySelector('.event-showcase-frame');
  const dialog = modal.querySelector('.event-showcase-dialog');
  const imagesReady = Promise.all([...frame.querySelectorAll('img')].map((image) => (
    image.complete
      ? Promise.resolve()
      : new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        })
  )));

  const showList = () => {
    detailView.hidden = true;
    listView.hidden = false;
    backButton.hidden = true;
    title.textContent = 'Organizasyon Projeleri';
    dialog.scrollTop = 0;
  };

  const showProject = () => {
    listView.hidden = true;
    detailView.hidden = false;
    backButton.hidden = false;
    title.textContent = '5. Türkiye Denizcilik Zirvesi';
    dialog.scrollTop = 0;
    imagesReady.then(() => requestAnimationFrame(() => {
      frame.scrollTo({ left: 0, behavior: 'auto' });
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
  modal.querySelector('[data-event-project="turkiye-denizcilik-zirvesi"]')?.addEventListener('click', showProject);
  backButton.addEventListener('click', showList);
  modal.querySelectorAll('[data-event-showcase-close]').forEach((item) => item.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (modal.hidden || event.key !== 'Escape') return;
    event.preventDefault();
    if (!detailView.hidden) {
      showList();
      backButton.focus({ preventScroll: true });
      return;
    }
    close();
  });
})();