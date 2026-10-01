# HCI Prensipleri

Kaynaklar: ISO 9241-210:2019 (insan merkezli tasarım), Dix, Finlay, Abowd & Beale "Human-Computer Interaction" (usability prensipleri), Nielsen 1994 (heuristics), WCAG 2.1.

## ISO 9241-210 — Human-Centred Design (eski ISO 13407)

### Prensipler
- **Active involvement of users** — kullanıcı süreç boyunca dahil
- **Appropriate allocation of function** — insan ve sistem arasında doğru görev paylaşımı
- **Iteration of design solutions** — tasarım iteratif
- **Multidisciplinary design teams** — farklı disiplin

### Temel Aktiviteler
1. Kullanım bağlamını anla ve belirle
2. Kullanıcı ve organizasyonel gereksinimleri belirle
3. Tasarım çözümleri üret (prototip)
4. Tasarımları kullanıcılarla gereksinimlere karşı değerlendir

## Dix et al. — Usability Principles (3 ana çatı)

### 1. Learnability (Öğrenilebilirlik)

| Prensip | Anlamı | Kontrol |
|---------|--------|---------|
| **Predictability** | Geçmişteki etkileşim → gelecekteki sonucu tahmin edebilme | Aynı işlem aynı sonucu mu veriyor? |
| **Synthesizability** | Geçmiş aksiyonların etkisini görebilme | Yapılan değişiklikler ekranda yansıyor mu? |
| **Familiarity** | Önceki bilgiyi yeni sisteme aktarabilme | Standart icon/jest/menü mü? |
| **Generalizability** | Bir bağlamdaki bilgiyi başka bağlamda uygulama | Ekranlar arası tutarlı pattern? |
| **Consistency** | Benzer durumlarda benzer davranış | Buton stili/yerleşimi her yerde aynı mı? |

### 2. Flexibility (Esneklik)

| Prensip | Anlamı |
|---------|--------|
| **Dialog initiative** | Hem kullanıcı hem sistem konuşmayı başlatabilir |
| **Multithreading** | Birden çok görevi eş zamanlı yürütme |
| **Task migratability** | Görevi insan/sistem arasında taşıyabilme |
| **Substitutivity** | Aynı bilgiyi farklı yollarla girip alabilme |
| **Customizability** | Kullanıcının arayüzü uyarlayabilmesi |

### 3. Robustness (Sağlamlık)

| Prensip | Anlamı |
|---------|--------|
| **Observability** | Kullanıcı sistemin durumunu gözlemleyebilir |
| **Recoverability** | Hatadan dönebilme (undo, redo) |
| **Responsiveness** | Sistem yanıt süresi ve geri bildirim |
| **Task conformance** | Sistem görevin doğasına uygun |

## Ekip Bilgi Düzeyi Varsayımı

Yazılım ekiplerinin önemli bir kısmı resmi HCI eğitimi almamıştır ve doğal kullanıcı arayüzlerine (dokunmatik, ses, jest) deneyimsizdir. Bu nedenle inceleme yapılırken ekibin bu seviyede olabileceği varsayılır; öneriler jargondan arındırılmış, uygulanabilir ve erişilebilir tonda yazılır.

## Sezgisel Kontrol Listesi (özetle 15 madde)

1. Sistem durumu görünürlüğü (loading, success, error states)
2. Sistem-gerçek dünya eşleşmesi (terminoloji, ikonlar)
3. Kullanıcı kontrolü ve özgürlüğü (undo, escape)
4. Tutarlılık ve standartlar
5. Hata önleme
6. Tanıma > hatırlama
7. Esneklik ve verim (shortcut'lar)
8. Estetik ve minimal tasarım
9. Hata mesajları (anlaşılır + çözüm öneren)
10. Yardım ve dokümantasyon
11. Affordance (görsel ipucu — basılabilir mi anlaşılıyor mu)
12. Feedback (her aksiyon için)
13. Feedforward (gelecek aksiyon ipucu)
14. Erişilebilirlik (keyboard, screen reader, kontrast)
15. Performans (algılanan hız, gerçek hız)
