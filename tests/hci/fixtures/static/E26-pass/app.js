// E26 PASS — yerel ayara duyarlı dönüşüm; düz metin için dönüşüm yapılmaz.
function normalizeEmail(value) {
  return value.toLocaleLowerCase('tr-TR');
}
