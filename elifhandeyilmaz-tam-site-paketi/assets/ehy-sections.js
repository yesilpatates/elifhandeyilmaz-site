(() => {
  const english = document.documentElement.lang.startsWith('en');
  const more = document.getElementById('ehy-more');
  const timeline = document.getElementById('ehy-timeline');
  more?.addEventListener('click', () => {
    const expanded = timeline.classList.toggle('ehy-open');
    more.setAttribute('aria-expanded', String(expanded));
    more.textContent = expanded ? (english ? 'Show less ↑' : 'Daha az göster ↑') : (english ? 'Show 3 earlier roles ↓' : 'Önceki 3 deneyimi göster ↓');
  });
  const buttons = document.querySelectorAll('#ehy-filters button');
  buttons.forEach(button => {
    button.type = 'button';
    button.setAttribute('aria-pressed', String(button.classList.contains('ehy-on')));
    button.addEventListener('click', () => {
      buttons.forEach(other => {
        other.classList.toggle('ehy-on', other === button);
        other.setAttribute('aria-pressed', String(other === button));
      });
      document.querySelectorAll('#ehy-certs .ehy-cert').forEach(card => {
        card.classList.toggle('ehy-hide', button.dataset.f !== 'all' && card.dataset.c !== button.dataset.f);
      });
    });
  });
})();
