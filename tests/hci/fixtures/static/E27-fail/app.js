// Elle para ve tarih biçimlendirme (yerel ayardan bağımsız).
const price = 1250;

function renderPrice() {
  document.querySelector('.price').textContent = price.toFixed(2) + ' TL';
}

function renderDate(value) {
  const d = new Date(value);
  const pattern = 'dd/MM/yyyy';
  document.querySelector('.date').textContent =
    String(d.getDate()).padStart(2, '0') +
    '/' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '/' +
    d.getFullYear() +
    ' (' +
    pattern +
    ')';
}

renderPrice();
renderDate(Date.now());
