# Ekran okuyucu smoke testi (Guidepup)

Bu tarif **isteğe bağlıdır**, **varsayılan kapalıdır** ve **elle tetiklenir**.
Otomatik CI'da çalıştırılmaz: gerçek bir ekran okuyucu başlatır (NVDA / VoiceOver),
**headed** (görünür pencere) çalışır ve işletim sistemine bağımlıdır. Araç yoksa
veya ortam uygun değilse bu adım "n/a" ile atlanır; kalite kapısını ve çıkış kodunu bozmaz.

Kaynak API: Guidepup (`@guidepup/guidepup`) — https://github.com/guidepup/guidepup ·
https://www.guidepup.dev/docs/api/class-guidepup

## Ne zaman kullanılır

`references/evidence-rubric.md` §5'teki manuel kontrol listesindeki **"ekran okuyucuyla
deneme"** maddesinin somut yürütülmesidir. Otomatik araçların (axe, verify-ui) doğrulayamadığı
okuma sırası anlamı, erişilebilir ad kalitesi ve karmaşık bileşen klavye/okuma akışını
gerçek bir ekran okuyucunun **konuştuğu** metinden doğrular.

## Ortam kurulumu (bir kez)

Guidepup tek API ile **macOS'ta VoiceOver**, **Windows'ta NVDA** sürer. Git Bash / PowerShell
ya da Terminal'de:

```sh
npx @guidepup/setup setup      # makineyi hazırlar (izinler vb.)
npm install @guidepup/guidepup
npx @guidepup/setup install    # ekran okuyucu varlıklarını kurar
```

- **macOS:** VoiceOver kullanılır; Safari önerilir. Ekran kaydı/erişilebilirlik izinleri gerekir.
- **Windows:** NVDA kullanılır. NVDA önkoşulları için `npx @guidepup/setup setup` ve
  https://www.guidepup.dev/docs/guides/environment adımları izlenir.
- **Linux/CI:** desteklenmez; bu adım atlanır.

## Smoke test akışı

1. Sayfayı **headed** bir tarayıcıda aç (görünür pencere).
2. Ekran okuyucuyu başlat.
3. Başlık, ana bölge (landmark), ilk başlık, form alanları ve ana eylem düğmesini
   ekran okuyucunun **okuma sırasında** gez ve konuşulan metni kaydet.
4. Sonuçları `spokenPhraseLog` / `itemTextLog` ile karşılaştır.

Şablon (NVDA; VO için `nvda` yerine `voiceOver` kullan ve aynı API geçerlidir):

```ts
import { nvda } from "@guidepup/guidepup";

(async () => {
  // Windows'ta NVDA, macOS'ta VoiceOver başlatır.
  await nvda.start();

  // Sayfaya gezin (Playwright ile headed tarayıcı; bkz. examples/playwright-nvda).
  // navigateToWebContent() Playwright'a özgüdür: sayfa yüklendikten sonra çağrılır.
  await nvda.navigateToWebContent();

  // Başlıkları gez ve konuşulan metni logla.
  await nvda.nextHeading();
  console.log(await nvda.spokenPhraseLog());

  await nvda.stop();
})();
```

Kontrol edilecekler:

- [ ] Sayfa başlığı (`document.title`) ve `h1` mantıklı sırada okunuyor mu?
- [ ] Landmark'lar (banner/main/nav) ve form alanlarının **erişilebilir adı** anlamlı mı?
- [ ] Görsel olarak anlamlı her etkileşimli öğe okunuyor; yalnız süs öğeleri atlanıyor mu?
- [ ] Odak sırası görsel okuma sırasıyla tutarlı mı?
- [ ] Dinamik içerik (canlı bölge, hata mesajı) ekran okuyucuya duyuruluyor mu?

## Sınırlar

- Bu bir **smoke testtir**, tam uyum kanıtı değildir. "0 bulgu = erişilebilir" denmez.
- Sonuçlar kanıt türü **"erişilebilirlik ağacı"** ya da "ekran okuyucu" olarak bulgu tablosuna
  yazılır; ham `spokenPhraseLog` çıktısı eklenir.
- Tarayıcı/ekran okuyucu sürümü ve dil ayarı sonucu değiştirir; raporda bunlar belirtilir.
