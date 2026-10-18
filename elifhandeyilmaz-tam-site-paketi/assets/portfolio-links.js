// Direct arrow links navigate normally without opening a gallery on their parent.
document.addEventListener('click', (event) => {
  if (event.target.closest('a[data-portfolio-route]')) event.stopPropagation();
}, true);
