// Locale-aware formatting through Intl.
const nf = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });
const df = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

document.querySelector('.price').textContent = nf.format(1250);
document.querySelector('.date').textContent = df.format(Date.now());
