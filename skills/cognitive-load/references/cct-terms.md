# Cognitive Complexity Theory — 6 Terim

Kaynaklar: Kieras & Polson 1985 (Cognitive Complexity Theory), Sweller 1988 (Cognitive Load Theory), Miller 1956, Norman "The Design of Everyday Things", Wertheimer/Koffka (Gestalt).

## 1. Cognitive Load

Bir görevi tamamlamak için zihinsel kapasite tüketimi. Üç tür:
- **Intrinsic** — görevin kendi karmaşıklığı
- **Extraneous** — kötü tasarımdan gelen ekstra yük (HEDEFİMİZ: minimize)
- **Germane** — öğrenmeye katkı sağlayan yük (uygun seviyede tutulur)

**Miller's Law (7±2):** kısa süreli bellek aynı anda 5-9 öğeyi tutar. Ekrandaki rakip dikkat çeken öğe sayısını bu aralıkta tut.

## 2. Information Processing

Kullanıcı bilgiyi nasıl alır, işler, karar verir. Aşamalar:
1. **Perception** — duyulardan gelen veriyi alma
2. **Attention** — neye odaklanılacağını seçme
3. **Working memory** — geçici işleme alanı (sınırlı)
4. **Long-term memory** — kalıcı bilgi
5. **Decision & action**

Tasarım kararı: bu zinciri kısaltmak (recognition > recall, varsayılan değerler, ön doldurulmuş alanlar).

## 3. Perceptual Organization (Gestalt)

CCT, Gestalt psikolojisini referans alır: **bütün, parçaların toplamından farklıdır**.

### Gestalt Prensipleri (uygulamalı)

| Prensip | Anlamı | Tasarımda |
|---------|--------|-----------|
| **Proximity** | Yakın öğeler grup algılanır | İlişkili kontroller fiziksel yakın |
| **Similarity** | Benzer görünüm = benzer işlev | Aynı stil = aynı tür buton |
| **Closure** | Eksik şekli zihin tamamlar | Form sınırını ima etmek yeterli |
| **Continuity** | Devamlı çizgi takip edilir | Liste/akış yönü |
| **Figure-Ground** | Ön plan / arka plan ayrımı | Modal'a hover backdrop |
| **Common Fate** | Birlikte hareket eden öğeler grup | Animasyon birlikteliği |
| **Symmetry** | Simetrik öğeler bütün algılanır | Layout dengesi |

## 4. Affordances

Bir nesnenin "ne yapılabileceğini" ima eden görsel ipucu.

| Görsel ipucu | Ne diyor |
|--------------|----------|
| Yükseltilmiş gölge | "Basılabilir" |
| Underline + farklı renk | "Tıklanabilir link" |
| Kursor değişimi (pointer) | "Etkileşime açık" |
| Disabled gri ton | "Şu an erişilebilir değil" |
| Drag handle ikonu | "Sürüklenebilir" |

**Yanlış affordance** = en sık CCT ihlali. Örn: link gibi görünen şey aslında butondur.

## 5. Feedback ve Feedforward

| Türü | Ne zaman | Örnek |
|------|----------|-------|
| **Feedback** | Aksiyondan SONRA | "Kaydedildi" toast |
| **Feedforward** | Aksiyondan ÖNCE | Tooltip "Bu butona basarsan ne olur" |

Ayrım (Norman; Djajadiningrat et al.): feedforward kullanıcıya gelecekteki aksiyon hakkında bilgi verir; feedback aksiyonun sonucunu bildirir. İki ayrı düzlemdir.

**Feedback gecikmesi eşikleri:**
- < 0.1 s: anlık (sürükle, tıkla efekti)
- 0.1 - 1 s: doğal (form gönderimi)
- 1 - 10 s: yükleme göstergesi şart
- > 10 s: progress bar + iptal seçeneği

## 6. Skeuomorphism vs Flat Design

| Stil | Avantaj | Dezavantaj |
|------|---------|------------|
| **Skeuomorphic** (gerçek dünya benzetmesi) | Yeni kullanıcıya familiar, affordance net | Gereksiz dekoratif yük, modası geçmiş hissi |
| **Flat** (sade, ikonik) | Modern, hızlı tarama | Affordance kaybı (her şey 2D, neyin tıklanabilir olduğu belirsiz) |
| **Neumorphism / Material** | Karışım — flat + hafif derinlik | Tutarlılığı zor |

CCT açısından: **kullanıcı seviyesi düşük + ekran karmaşık → Skeuomorphic ipuçları yardımcı.** Expert + sık kullanım → flat verimlilik kazandırır.

## Reduce Cognitive Overload — Eylem Listesi

1. **Gruplama** (Gestalt prensipleriyle)
2. **Progressive disclosure** (kademeli açma)
3. **Recognition > Recall** (görsel ipucu, otomatik tamamlama)
4. **Affordance tutarlılığı** (aynı görünüm = aynı davranış)
5. **Feedback gecikmesi < 1s**
6. **Feedforward eklemek** (gelecek aksiyon ipucu)
7. **Anlamsız bilgi temizleme** (chartjunk, decorative noise)
8. **Mental model uyumu** (gerçek dünya kavramları)

## CCT Skor Rubriği

Her terim için 1-5:
- 1 = İhlal yok / mükemmel
- 2 = Hafif iyileştirme
- 3 = Orta sorun
- 4 = Ciddi sorun
- 5 = Kritik / kullanıcı engellenir

Toplam (6 terim × 5 max = 30):
- 6-12: Düşük yük
- 13-20: Orta yük
- 21-30: Yüksek yük (acil revize)

CCT skoru Nielsen 0-4 ölçeğine `references/fix-mode.md` eşleme tablosuyla çevrilir. Nielsen ölçeğinin
somut ankrajları, kanıt türleri ve severity 3-4 için kanıt zorunluluğu `references/evidence-rubric.md`
§1-§3'tedir; burada ayrı bir severity rubriği tanımlanmaz.
