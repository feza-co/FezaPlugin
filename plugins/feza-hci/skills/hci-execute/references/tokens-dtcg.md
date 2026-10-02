# DTCG Tasarım Token'ları — Ayrıntılı Notlar

Bu dosya `references/design-system-rules.md` §12'nin ayrıntı ekidir. §1 token mimarisi
ve §12'deki biçim kuralları esastır; burada yalnız dönüştürme akışı, araç sürümleri ve
sık yapılan hatalar yer alır.

Standart: **Design Tokens Community Group Format Module 2025.10** "first stable
version" (designtokens.org). Dönüştürme: **Style Dictionary 5.3+** (DTCG 2025.10
desteği doğrulanmış sürüm; daha eski sürümler bu biçimi desteklemez).

## 1. Neden DTCG?

`tokens.css` tek kaynaktır (§1) ama yalnız web'e özgüdür. DTCG biçimi aynı token
kümesini **platformdan bağımsız** taşır; CSS, JS/TS nesnesi ve tasarım aracı aynı
kaynaktan üretilebilir. Zorunlu değildir: istenirse üretilir ve `tokens.css` ile
değerleri birebir aynı tutulur.

## 2. Dosya yerleşimi

```text
<proje kökü>/
└── styles/
    ├── tokens.css             tek token kaynağı (açık + koyu tema) — §1
    └── tokens.tokens.json     isteğe bağlı DTCG karşılığı (aynı değerler)
```

`*.tokens.json` kalıbı `color-audit` Adım 0 ve `scripts/contrast.py --tokens`
tarafından tanınır.

## 3. Alt küme ve dönüştürme

`contrast.py` yalnız şu türleri anlar: `color`, `dimension`, `duration`,
`cubicBezier`, `shadow`, `typography`. Diğer türler (ör. `fontFamily`) kapsam
dışıdır; ayrıştırılır ama kontrast hesabına girmez.

Style Dictionary ile tek kaynaktan CSS üretimi (5.3+):

```jsonc
// sd.config.json (örnek yapı)
{
  "source": ["styles/tokens.tokens.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "styles/",
      "files": [{ "destination": "generated-tokens.css", "format": "css/variables" }]
    }
  }
}
```

- Bu akış kullanılırsa `tokens.css` **elle** yazılmaz; üretilen dosya kullanılır.
- Üretilen CSS ile DTCG dosyası arasındaki değer tutarlılığı `contrast.py` ile
  doğrulanır (aşağıda §4).
- Style Dictionary 5.3'ten eski sürüm DTCG 2025.10 biçimini okumaz; aracı
  sabitlersen sürümü belirt.

## 4. Doğrulama

DTCG dosyası ile CSS token dosyası **aynı oranları** vermelidir:

```bash
python scripts/contrast.py --tokens styles/tokens.tokens.json --pairs pairs.json --json
python scripts/contrast.py --css styles/tokens.css --pairs pairs.json --json
```

`results[].ratio` değerleri birebir eşit olmalıdır. Alias döngüsü ya da
desteklenmeyen renk değeri olduğunda betik çıkış kodu 2 ile anlaşılır hata verir.

Kabul örneği: `tests/hci/tokens/` (aynı değerleri taşıyan `sample.tokens.json` +
`sample.css`, alias ve yapısal renk örneği, döngülü dosya).

## 5. Sık yapılan hatalar

| Hata | Sonuç | Doğrusu |
|------|-------|---------|
| `tokens.css` ile DTCG değerlerinin ayrışması | İki kaynak çelişir; hangi değerin geçerli olduğu belirsiz | İkisi birlikte güncellenir; tek kaynak tercih ediliyorsa Style Dictionary kullanılır |
| Alias döngüsü (`a → b → a`) | Çözümleme başarısız (çıkış 2) | Zinciri ham token'da bitir |
| `$type`'ı her token'a yazmak | Gürültü; grup kalıtımı kullanılmıyor | Türü grup düzeyinde bir kez tanımla |
| srgb dışı `colorSpace`'te `hex` yok | Renk değeri çözülemez (çıkış 2) | `hex` alanını ekle ya da srgb kullan |
| Kullanımdan kalkan token'ı silmek | Tüketiciler kırılır | `$deprecated` ile işaretle, sonra kaldır |
