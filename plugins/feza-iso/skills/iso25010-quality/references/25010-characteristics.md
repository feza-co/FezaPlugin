# ISO/IEC 25010:2023 — 9 Kalite Karakteristiği

ISO/IEC 25010:2023 ürün kalite modeli: karakteristikler, sub-characteristic'ler ve sektörel örnekler.

## 2023 Sürümünde Değişenler

- **Interaction Capability** — eski Usability'nin yeniden adlandırılmış ve genişletilmiş hâli.
- **Flexibility** — eski Portability'nin yeniden adlandırılmış ve genişletilmiş hâli (Scalability alt karakteristiği eklendi).
- **Safety** — yeni karakteristik.
- Toplam 9 ana karakteristik: Functional Suitability, Performance Efficiency, Compatibility, Interaction Capability, Reliability, Security, Maintainability, Flexibility, Safety. Portability 2023 modelinde ayrı bir karakteristik değildir.

## 1. Functional Suitability

| Sub-characteristic | Tanım | Örnek |
|---------------------|-------|----------------|
| Functional Completeness | Tüm specified fonksiyonları sağlama | E-ticaret uygulaması planlanan tüm ödeme yöntemlerini destekler (kart, havale, taksit) |
| Functional Correctness | Doğru sonuç üretme | Fatura modülü KDV'yi her zaman mevzuata uygun hesaplar |
| Functional Appropriateness | Görev tamamlamayı kolaylaştırma | – |

## 2. Performance Efficiency

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Time Behaviour | Response time + throughput | Ürün arama sonuçları 1 saniye altında listelenir |
| Resource Utilisation | Belirtilen kaynak içinde kullanım | Mobil bankacılık uygulaması arka planda aşırı pil/veri tüketmez |
| Capacity | Maksimum parametre limitleri | Kampanya gününde 100K eşzamanlı kullanıcı |

## 3. Compatibility

| Sub-char | Tanım |
|----------|-------|
| Co-existence | Aynı ortamda diğer ürünlerle çalışma |
| Interoperability | Diğer sistemlerle bilgi alışverişi |

## 4. Interaction Capability (eski Usability — 2023'te yeniden adlandırıldı)

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Appropriateness Recognizability | Kullanıcı uygunluğu tanır | "Satın Al" butonu ilk bakışta tıklanabilir |
| Learnability | Hızlı öğrenme | SaaS yönetim paneli 30 dk onboarding sonrası bağımsız kullanım |
| Operability | Operasyon kolaylığı | – |
| User Error Protection | Hata önleme | – |
| **Engagement** (yeni 2023) | Kullanıcıyı meşgul tutma | – |
| **Inclusivity** (yeni 2023) | Tüm kullanıcı çeşitliliği için | – |
| **Assistance** (yeni 2023) | Yardım sağlama | – |
| Self-descriptiveness | Kendini açıklayan UI | – |

## 5. Reliability

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Faultlessness | Normal operasyonda hatasız | Bordro sistemi hesap hatası üretmez |
| Availability | Gerektiğinde erişilebilir | Bulut depolama servisi %99.99 uptime SLA'sı |
| Fault Tolerance | Donanım/yazılım hatasına rağmen çalışma | – |
| Recoverability | Hatadan sonra veri/durum geri kazanım | – |

## 6. Security

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Confidentiality | Yetkili erişim | Mesajlaşma modülünde uçtan uca şifreleme |
| Integrity | Yetkisiz değişikliği engelleme | SHA-256 hash doğrulama |
| Non-repudiation | Aksiyon/olay kanıtı | – |
| Accountability | Aksiyonu entity'e bağlama | – |
| Authenticity | Konu kimliğini kanıtlama | – |
| **Resistance** (yeni 2023) | Saldırılara karşı dayanıklılık | – |

## 7. Maintainability

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Modularity | Bir bileşen değişimi diğerlerini etkilemez | Ödeme servisi güncellenir, sepet bozulmaz |
| Reusability | Birden çok sistemde kullanılabilir | – |
| Analysability | Etki analizi + arıza teşhisi | – |
| Modifiability | Defect getirmeden değiştirilebilir | – |
| Testability | Objektif test imkanı | – |

## 8. Flexibility (2023 — eski Portability'nin yeniden adlandırılmış ve genişletilmiş hâli)

Ürünün farklı ve değişen bağlamlara (donanım, yazılım, kullanım, ölçek) uyum sağlama kapasitesi.

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Adaptability | Farklı ya da değişen donanım, yazılım ve kullanım ortamlarına uyarlanabilme | Aynı sürüm hem bulut hem şirket içi kurulumda çalışır |
| **Scalability** (yeni 2023) | Değişen iş yüküne göre kapasiteyi artırıp azaltabilme | Ay sonu yoğunluğunda işçi sayısı otomatik artar |
| Installability | Belirli bir ortamda başarıyla kurulabilme / kaldırılabilme | Tek komutla konteyner kurulumu |
| Replaceability | Aynı amaçla başka bir ürünün yerine geçebilme | Eski raporlama modülünün veri formatı korunarak değiştirilmesi |

## 9. Safety (yeni — 2023)

Ürünün, tanımlı koşullarda insan hayatı, sağlık, mülk veya çevre için kabul edilemez risk oluşturmaması.

| Sub-char | Tanım | Örnek |
|----------|-------|-------|
| Operational Constraint | Tehlikeli durumda işletimi güvenli sınırlar içinde tutma | Araç takip uygulaması sürüş sırasında metin girişini kısıtlar |
| Risk Identification | Kabul edilemez riske yol açabilecek olayları belirleme | Sensör verisi tutarsızsa uyarı üretilir |
| Fail Safe | Arıza durumunda güvenli moda geçme | Bağlantı kesilince otomatik dozaj komutu durdurulur |
| Hazard Warning | Tehlike durumunda kullanıcıyı uyarma | Kritik eşik aşımında sesli ve görsel alarm |
| Safe Integration | Başka bileşenlerle birleştirildiğinde güvenliği koruma | Üçüncü taraf entegrasyonu güvenlik kilitlerini atlayamaz |

Safety, yazılımın fiziksel dünyayı etkilemediği ürünlerde "Uygulanamaz — gerekçe" olarak işaretlenebilir; atlanmaz.

## Skor Rubrik

| Skor | Etiket | Anlam |
|------|--------|-------|
| 5 | Mükemmel | Sub-char tüm kanıtlarla tam karşılanıyor |
| 4 | İyi | Çoğu kanıt var, küçük eksik |
| 3 | Orta | Yarısı var, geliştirme gerek |
| 2 | Zayıf | Az kanıt, ciddi eksik |
| 1 | Kritik | Hiç yok / hatalı uygulama |

## Karakteristik Bazlı Genel Hesap

```
Karakteristik skoru = (sub-char skorlarının ortalaması)
Ürün toplam skoru = (9 karakteristik skor ortalaması)
```

Hedef:
- ≥ 4.0: Production-ready
- 3.0 - 4.0: MVP, iyileştirilmeli
- < 3.0: Hazır değil

## Gerçek Dünya Başarısızlık Vurgusu

Kalite karakteristiklerinin ihmali sektörde sık görülen başarısızlıklara yol açar (ödeme kesintisi, hatalı hesaplama, veri sızıntısı). Her audit raporunda en zayıf karakteristiğin gerçek dünya etkisini bir cümleyle vurgula.

## Quality in Use vs Product Quality

ISO 25010 iki model tanımlar:
- **Product Quality Model** (BU SKILL'in kapsamı) — 9 karakteristik
- **Quality in Use Model** — Effectiveness, Efficiency, Satisfaction, Freedom from Risk, Context Coverage

Quality in Use için ayrı bir skill yol haritasında olabilir.
