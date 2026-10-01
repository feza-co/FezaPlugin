# Şikayet → 6.3 Süreç Eşleme Kataloğu (ISO/IEC/IEEE 12207:2017)

Bu katalog, ekipten gelen serbest metin şikayetlerini ISO/IEC/IEEE 12207:2017 Madde 6.3 Teknik Yönetim süreçlerine eşlemek için kullanılır. Her süreç için: sürecin amacı (kısa), belirti sinyalleri, tek bir örnek ve düzeltici aksiyon seçenekleri verilir.

## Referans Senaryo

Örneklerin tamamı aynı kurgusal bağlamdan gelir: **kurumsal müşterilere filo takip ve rota planlama hizmeti veren bir lojistik SaaS ürünü**. Üç ürün ekibi (Rota, Entegrasyon, Mobil Sürücü Uygulaması), bir veri platformu ekibi, müşteri başarı ve destek birimleri vardır. Örnekler yalnızca etiketleme biçimini gösterir; kullanıcının kendi şikayetleri her zaman önceliklidir.

## Eşleme Kartları

### 6.3.1 Project Planning

- **Amaç (özet):** Kapsamı, işi, kaynakları, takvimi ve sorumlulukları tanımlayan uygulanabilir planlar üretmek ve iletmek.
- **Belirti sinyalleri:** aynı işin iki ekipte görünmesi; sahipsiz iş kalemleri; kapasite hesabı yapılmadan verilen taahhütler; yol haritası ile backlog arasında kopukluk.
- **Örnek:** Ürün Yöneticisi (Rota ekibi): "Q3 yol haritasında 'çok duraklı rota optimizasyonu' epiği hem bizim ekibe hem Entegrasyon ekibine atanmış; iki ekip farklı tahminlerle işe başladı."
- **Düzeltici aksiyonlar:** epik bazında tek sahip kuralı; çeyrek planlamasında ekipler arası bağımlılık haritası; kapasite tabanlı taahhüt (`/feza-pm:wbs`, `/feza-pm:raci`).

### 6.3.2 Project Assessment and Control

- **Amaç (özet):** Planla gerçekleşeni karşılaştırmak, sapmaları değerlendirmek ve düzeltici aksiyonları sonuçlanana kadar izlemek.
- **Belirti sinyalleri:** alınan aksiyonların sahibi ya da bitiş tarihi olmaması; aynı sorunun tekrar tekrar gündeme gelmesi; sapma eşiklerinin tanımsız olması.
- **Örnek:** Platform Mühendisi: "Retrospektiflerde CI kuyruğundaki bekleme süresi için aldığımız aksiyonların hiçbirinin sorumlusu yok; konu dördüncü kez konuşuldu ve hâlâ açık."
- **Düzeltici aksiyonlar:** aksiyon kaydı (sahip, tarih, kapanış kanıtı); sapma eşikleri (ör. takvimde %10, efor tahmininde %20) ve eşik aşıldığında tetiklenen inceleme; `/feza-pm:activity-sequence` ile kritik yol takibi.

### 6.3.3 Decision Management

- **Amaç (özet):** Karar gerektiren durumları belirlemek, alternatifleri tanımlı ölçütlerle değerlendirmek ve kararı gerekçesiyle kaydetmek.
- **Belirti sinyalleri:** etkisi geniş kararların sohbet kanallarında alınması; etkilenen birimlerin karardan sonradan haberdar olması; alternatif ve gerekçe kaydının bulunmaması.
- **Örnek:** Finans Kontrolörü: "Fiyatlandırma 'araç başı' modele bir mesajlaşma kanalındaki kısa yazışmayla geçirildi; faturalama sisteminin değişmesi gerektiğini ilk kez bir müşterinin itirazından öğrendik."
- **Düzeltici aksiyonlar:** karar kaydı şablonu (bağlam, alternatifler, ölçütler, karar, etkilenen birimler); belirli eşiğin üzerindeki kararlar için zorunlu paydaş listesi; mimari kararlar için ADR klasörü.

### 6.3.4 Risk Management

- **Amaç (özet):** Riskleri sürekli olarak belirlemek, analiz etmek, ele almak ve izlemek.
- **Belirti sinyalleri:** tek tedarikçiye kritik bağımlılık; olasılık ve etkisi hiç değerlendirilmemiş dış bağımlılıklar; yedek planın yazılı olmaması.
- **Örnek:** Çözüm Mimarı: "En büyük üç kargo müşterimizin rota hesapları tek bir harici harita sağlayıcısına bağlı; sağlayıcı fiyatı artırırsa ya da kesinti yaşarsa uygulanabilir bir B planımız yok."
- **Düzeltici aksiyonlar:** risk kaydına tedarikçi bağımlılıklarını ekle (`/feza-pm:risk-register`); ikincil sağlayıcıyla soyutlama katmanı için fizibilite; sözleşmesel SLA ve çıkış maddeleri; çeyreklik risk gözden geçirmesi.

### 6.3.5 Configuration Management

- **Amaç (özet):** Sistem ve yazılım öğelerini tanımlamak, değişikliklerini kontrol etmek ve bütünlüğünü ömrü boyunca korumak.
- **Belirti sinyalleri:** sahada birden fazla sürümün izlenmeden çalışması; bileşenler arası uyumluluğun kayıt altında olmaması; yapılandırma öğelerinin tanımsız olması.
- **Örnek:** Mobil Ekip Lideri: "Sürücü uygulamasının sahada üç farklı sürümü çalışıyor ve hangi sürümün hangi API şema sürümüyle uyumlu olduğu hiçbir yerde kayıtlı değil."
- **Düzeltici aksiyonlar:** yapılandırma öğesi listesi (uygulama sürümü, API şeması, veri şeması); sürüm uyumluluk matrisi; minimum desteklenen sürüm politikası ve zorunlu güncelleme mekanizması; etiketli sürümler ve sürüm notları (`/feza-sqa:change-control`).

### 6.3.6 Information Management

- **Amaç (özet):** Belirlenen paydaşlara ilgili, zamanında, eksiksiz ve geçerli bilgiyi sağlamak.
- **Belirti sinyalleri:** aynı bilginin birden fazla sistemde çelişkili tutulması; kritik anda bilgiye erişilememesi; bilgi sahipliğinin belirsiz olması.
- **Örnek:** Destek Ekibi Lideri: "Müşteriye özel SLA istisnaları CRM notlarına, sözleşme dosyalarına ve destek makrolarına dağılmış; gece nöbetindeki mühendis hangi SLA'nın geçerli olduğunu bulamıyor."
- **Düzeltici aksiyonlar:** müşteri bazlı SLA için tek kayıt kaynağı ve sahibi; nöbet çalışma kitabına bağlantı; bilgi yaşam döngüsü (oluştur, gözden geçir, onayla, arşivle); `/feza-pm:comm-plan`.

### 6.3.7 Measurement

- **Amaç (özet):** Ürün, süreç ve proje bilgi ihtiyaçlarını karşılayan nesnel verileri toplamak, analiz etmek ve raporlamak.
- **Belirti sinyalleri:** aynı göstergenin birimler arasında farklı hesaplanması; ölçüm tanımının yazılı olmaması; verinin kaynağının ve toplama sıklığının belirsiz olması.
- **Örnek:** Müşteri Başarı Yöneticisi: "'Teslimat ETA doğruluğu' göstergesini ürün ekibi dakika cinsinden sapma olarak, biz yüzde isabet olarak hesaplıyoruz; aynı müşteri toplantısında iki farklı sayı sunuldu."
- **Düzeltici aksiyonlar:** gösterge tanım kartı (formül, veri kaynağı, sıklık, sahip, karar ölçütü); tek hesaplama noktası; `/feza-iso:iso15939-measure` ve `/feza-sqa:metrics-plan`.

### 6.3.8 Quality Assurance

- **Amaç (özet):** Kalite yönetim sürecinin ürün ve süreçlere etkin biçimde uygulandığına dair güvence sağlamak.
- **Belirti sinyalleri:** belirli değişiklik türlerinin inceleme ya da test kapısı olmadan üretime çıkması; kalite ölçütlerinin yalnızca uygulama koduna uygulanması.
- **Örnek:** Veri Mühendisi: "Veri boru hattındaki şema değişiklikleri hiçbir incelemeden ya da sözleşme testinden geçmeden üretime çıkıyor; geçen ay raporlama panoları iki gün boyunca yanlış mesafe gösterdi."
- **Düzeltici aksiyonlar:** veri şeması değişiklikleri için zorunlu inceleme ve sözleşme testleri; CI'da şema uyumluluk kapısı; Definition of Done'a veri kalitesi ölçütleri; `/feza-sqa:sqa-plan`.

## Eşleme Kuralları

1. **Belirti değil, eksik süreç etiketlenir.** "Panolar yanlış" bir 6.3.7 belirtisi gibi görünse de kök neden kontrolsüz şema değişikliğiyse birincil süreç 6.3.8 ya da 6.3.5'tir.
2. **Birincil ve ikincil süreç.** Bir şikayet iki sürece dokunuyorsa birincil (kök neden) ve ikincil (etkilenen) süreç ayrı sütunlarda yazılır.
3. **Kişi değil rol.** Tablo rol adlarıyla doldurulur; şikayet sahibinin adı çıktıya yazılmaz.
4. **Gerekçe zorunlu.** Her eşleme, sürecin amacındaki hangi çıktının eksik olduğunu bir cümleyle belirtir.

## Sinyal Sözlüğü (ön eleme için)

| Sinyal | Olası süreç |
|--------|-------------|
| sahip, atama, kapasite, yol haritası, taahhüt | 6.3.1 |
| sapma, eşik, aksiyon takibi, tekrar eden sorun | 6.3.2 |
| karar, onay, alternatif, gerekçe, kim karar verdi | 6.3.3 |
| bağımlılık, tedarikçi, kesinti, olasılık, B planı | 6.3.4 |
| sürüm, uyumluluk, şema, yapılandırma, sürüm notu | 6.3.5 |
| nerede, hangi belge, dağınık, güncel olan hangisi | 6.3.6 |
| gösterge, KPI, formül, veri kaynağı, farklı sayı | 6.3.7 |
| inceleme, test kapısı, kusur, kalite ölçütü | 6.3.8 |

Sözlük yalnızca ön elemedir; nihai eşleme Eşleme Kuralları'na göre yapılır.

## Çıktı Üst Bilgisi (sade format)

```markdown
> **Complaints to Compliance** — <Proje>
> Standart: ISO/IEC/IEEE 12207:2017 — 6.3 Technical Management
> Şikayet kaynağı: <CONFLICT_LOG.md / kullanıcı / brief>
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-iso:complaints-to-compliance
```
