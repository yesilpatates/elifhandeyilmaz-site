(() => {
  const card = [...document.querySelectorAll('.project-card')].find((item) => {
    const title = item.querySelector('.project-body h3')?.textContent?.toLocaleLowerCase('tr-TR') || '';
    return title.includes('etkinlik') && title.includes('organizasyon');
  });
  if (!card || card.dataset.eventShowcaseReady === 'true') return;
  card.dataset.eventShowcaseReady = 'true';
  card.classList.add('has-event-showcase');

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
        <div>
          <span class="event-showcase-kicker">Etkinlik & Organizasyon Tasarımı</span>
          <h2 class="event-showcase-title" id="event-showcase-title">5. Türkiye Denizcilik Zirvesi</h2>
        </div>
        <button class="event-showcase-close" type="button" aria-label="Pencereyi kapat" data-event-showcase-close>×</button>
      </header>
      <div class="event-showcase-frame" aria-label="Proje görseli">
        <img class="event-showcase-image" src="assets/event-projects/turkiye-denizcilik-zirvesi/01-ana-mockup.webp" alt="5. Türkiye Denizcilik Zirvesi organizasyon tasarımlarının toplu mockup sunumu">
      </div>
    </article>`;
  document.body.appendChild(modal);

  const trigger = document.createElement('button');
  trigger.className = 'event-showcase-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', '5. Türkiye Denizcilik Zirvesi proje görselini aç');
  card.appendChild(trigger);

  let lastFocused = null;
  const open = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('event-showcase-open');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      modal.querySelector('.event-showcase-close').focus({ preventScroll: true });
    });
  };
  const close = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('event-showcase-open');
    window.setTimeout(() => {
      modal.hidden = true;
      lastFocused?.focus?.({ preventScroll: true });
    }, 220);
  };

  trigger.addEventListener('click', open);
  modal.querySelectorAll('[data-event-showcase-close]').forEach((item) => item.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (modal.hidden || event.key !== 'Escape') return;
    event.preventDefault();
    close();
  });
})();
