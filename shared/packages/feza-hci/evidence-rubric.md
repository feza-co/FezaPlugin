# Kanıt Rubriği ve Değerlendirme Standardı

Bu dosya feza-hci değerlendirme skill'lerinin (heuristic-eval, hci-review, color-audit, cognitive-load)
ortak kanıt, severity ve kapsam şeffaflığı standardıdır. Tek kaynaktır; skill'ler ona
`references/evidence-rubric.md` olarak atıf yapar. Severity ölçeği Nielsen (1994) şiddet
derecelendirmesini temel alır.

## 1. Kanıt Türleri

Her bulgu bir kanıt türü ve somut kanıt taşır. Kanıt türü şu dört değerden biridir.

| Kanıt türü | Ne zaman kullanılır | Nasıl yazılır (örnek hücre) |
|---|---|---|
| ekran görüntüsü | Görsel düzen, hizalama, boşluk, algı gibi kodla ölçülemeyen gözlemler | `screens/checkout-390.png` — "Ödemeye devam" ile "İptal" aynı görsel ağırlıkta |
| DOM seçici | Bir öğenin varlığı, metni, rolü, sırası, erişilebilir adı ve durumu | `#checkout form button[type="submit"]` — erişilebilir ad yok |
| erişilebilirlik ağacı | Rol/ad/durum yapısı, başlık seviyeleri, bölge sırası, okuma düzeni | `ariaSnapshot()`: `main` tek `h1` taşıyor; form alanı `textbox "Ad"` |
| verify-ui kodu | Ölçülebilir eşik: kontrast, hedef boyutu, odak, reflow, metin büyütme | `E2 FAIL, oran 3.9:1 (eşik 4.5:1)` — `node scripts/verify-ui.mjs checkout.html` |

Kurallar:

- Bir bulguda birden çok kanıt türü verilebilir; en güçlü olanı (verify-ui kodu > DOM seçici >
  erişilebilirlik ağacı > ekran görüntüsü) ilk yazılır.
- Kanıt hücresi tahmin içermez: dosya yolu, seçici, snapshot satırı ya da araç çıktısı verir.
- Araç çalıştırılamadıysa (tarayıcı/Node yok) bu durum "Otomatik doğrulanamayanlar" bölümüne yazılır;
  sessizce görsel tahmine düşülmez.

### 1.1 Her kanıt türü nasıl yazılır

- **ekran görüntüsü** — dosya adı + iki ekran genişliği (390 px telefon, 1280 px masaüstü) ve
  görüntüde neyin görüldüğü. Örnek: `screens/checkout-390.png`, `screens/checkout-1280.png` —
  "İki buton aynı genişlikte ve aynı doygunlukta; birincil eylem ayırt edilemiyor."
- **DOM seçici** — CSS seçici + öğenin ilgili özniteliği/durumu. Örnek:
  `form#signup input[name="email"]` — `aria-describedby` yok, hata metni bağlı değil.
- **erişilebilirlik ağacı** — `ariaSnapshot()` çıktısından alıntı ya da rol/ad/durum listesi.
  Örnek: snapshot `button "Gönder" [disabled]` satırı; neden devre dışı olduğu açıklanmıyor.
- **verify-ui kodu** — araç çıktısındaki E kodu, ölçülen değer ve eşik. Örnek:
  `E4 FAIL, min hedef 22 px (eşik 24 px)` — `node scripts/verify-ui.mjs settings.html`.

Aynı bulgu için elle hesaplanan kontrast oranı varsa `contrast.py` çıktısıyla birlikte verilir; elle
tutulan oran tek başına kanıt sayılmaz.

## 2. Severity Ölçeği (0-4)

| Skor | Anlam | Somut ankraj | Örnek |
|---|---|---|---|
| 4 | Görev tamamlanamıyor ya da WCAG A/AA ihlali ile erişim engeli | Akış bitirilemiyor; klavye/ekran okuyucu kullanıcısı içeriğe ulaşamıyor | Form gönderilemiyor; odak tuzağı kullanıcıyı diyalogdan çıkaramıyor |
| 3 | Görev ciddi gecikme veya hatayla tamamlanıyor ya da birden çok kullanıcı grubunu etkiliyor | Ek adım/geri dönüş gerekiyor; birden çok grubu birlikte etkiliyor | Kaydet durumu görünmüyor, kullanıcı iki kez gönderiyor; kontrast 3.9:1 |
| 2 | Görev tamamlanıyor ama sürtünme yaratıyor | Tek grupta küçük frustration; kozmetik değil | Yükleme metni yok ama içerik 0.4 s içinde geliyor |
| 1 | Kozmetik | Estetik, önceliği düşük; işlevi etkilemez | 2 px hizalama sapması |
| 0 | Sorun değil | Gözlem var ama kullanıcı etkisi yok | Beklenen davranış doğru, not olarak kalır |

- 3 ve 4 işlevsel engeldir; 2 ve altı sürtünme/estetiktir.
- Aynı bulgu birden çok grubu etkiliyorsa skor **en geniş etkilenen gruba** göre verilir.
- Severity yalnız bulgunun kendisine verilir; düzeltme maliyeti veya tahmini efor skoru etkilemez.
- Bir bulgu hem işlevsel engel (4) hem kozmetik görünüm (1) içeriyorsa bulgular ayrılır ya da en
  yüksek etki yazılır; "ortalama" alınmaz.

### 2.1 Sınır durumlar

- Kullanıcı hatayı fark edip geri dönebiliyorsa 4 değil 3'tür.
- Erişim engeli yalnız bir yardımcı teknolojiyle sınırlıysa ve alternatif yol varsa 3'tür.
- Birden çok A/AA kriteri tek kök nedenden ihlal ediliyorsa tek bulgu, en yüksek skorla yazılır.

## 3. Kanıt Zorunluluğu

- **Severity 3-4** bulgular için DOM seçici veya verify-ui kodu kanıtı **zorunludur**.
- Yalnız görsel tahmine (ekran görüntüsü yorumu) dayalı bulgu **en fazla severity 2** alır.
- Kanıt türü "ekran görüntüsü" olan bir bulgu, DOM seçici ya da verify-ui çıktısıyla
  desteklenmedikçe 2'nin üstüne çıkarılamaz.
- Severity 3-4 bulgu kanıtlanamıyorsa skor 2'ye indirilir ve gerekçe bulguya yazılır.

## 4. İkinci Geçiş (bağımsız yeniden puanlama)

- Severity ≥ 3 bulgular ikinci bir geçişte yeniden puanlanır.
- İkinci geçişe **yalnız bulgu metni + kanıt** verilir; ilk puan **gizlenir**.
- Geçiş ayrı bir bağlamda ya da mümkünse ayrı bir alt ajanla yapılır (bağımsızlık).
- İki puan eşitse nihai severity bu puandır.
- İki puan farklıysa bulgu **"elle doğrulanmalı"** işaretlenir ve raporda ayrı bir listede gösterilir.
- Fark varsa nihai severity **iki puanın büyüğüdür** (kullanıcı riskini küçümsememek için).

## 5. Kapsam Şeffaflığı

Her değerlendirme raporu bir "Otomatik doğrulanamayanlar" bölümü ve zorunlu manuel kontrol listesi
içerir:

- [ ] Okuma sırasının anlamı (ekran okuyucuda mantıklı mı)
- [ ] Alternatif metin kalitesi (varlık değil, anlam)
- [ ] Karmaşık bileşen klavye akışı (combobox, takvim, sürükle-bırak)
- [ ] Ekran okuyucu ile deneme (NVDA / VoiceOver / TalkBack)
- [ ] Hata mesajlarının anlamı ve kurtarma yolu

Kurallar:

- Manuel maddeler işaretlenmeden rapor **"teslim edilebilir" sayılmaz**.
- "0 ihlal = erişilebilir" ve benzeri ifadeler yasaktır: otomatik araçlar WCAG kriterlerinin yalnız
  bir kısmını ölçer. Kaynaksız yüzde verilmez.
- Otomatik araç yokluğunda da bulgular tahminle değil "doğrulanamadı" etiketiyle yazılır.
