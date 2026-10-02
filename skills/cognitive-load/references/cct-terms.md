# Cognitive Complexity Theory — 6 Terim

Kaynaklar: Kieras & Polson 1985 (Cognitive Complexity Theory), Sweller 1988 (Cognitive Load Theory), Miller 1956, Norman "The Design of Everyday Things", Wertheimer/Koffka (Gestalt), Hick 1952 ve Hyman 1953 (seçenek sayısı–karar süresi), Fitts 1954 ve MacKenzie 1992 (hedef boyutu/mesafe–hedefleme süresi).

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

## 7. Hick–Hyman Yasası (seçenek sayısı → karar süresi)

Kaynak: Hick 1952; Hyman 1953.

- Model: `RT = a + b · log2(n + 1)` — RT karar süresi, n eşit olasılıklı seçenek sayısı.
- a ve b **bağlama özgüdür** (cihaz, görev, kullanıcı); bu dosyada ya da planda sabit katsayı
  verilmez, **sayı uydurulmaz**. Yalnız ilişki (logaritmik artış) kullanılır.
- Tasarım çıkarımı: seçenek sayısını azalt, seçenekleri grupla/kademelendir (progressive disclosure),
  sık seçileni öne çıkar.
- **Uygulanmayacağı durumlar (istisna):** alfabetik sıralı listeler, aranabilir listeler (arama
  kutusu olan menü) ve çok tanıdık/ezberlenmiş menüler (klavye kısayolları, sık kullanılan komutlar).
  Bu durumlarda seçenek sayısı artışı karar süresini bu modelle açıklanacak ölçüde artırmaz.

## 8. Fitts Yasası (hedef boyutu/mesafe → hedefleme süresi)

Kaynak: Fitts 1954; Shannon formu (MacKenzie 1992).

- Model: `MT = a + b · log2(D/W + 1)` — MT hedefleme süresi, D hedefe uzaklık, W hedef boyutu.
- İlişki: hedef küçüldükçe ya da uzaklaştıkça hedefleme süresi artar. a ve b bağlama özgüdür;
  **sayı uydurulmaz**.
- Tasarım çıkarımı: kritik hedefleri büyüt, ekran kenarı/köşesi gibi "sonsuz" hedeflerden yararlan,
  hedefi ilgili eylemin yakınına koy, aralarındaki mesafeyi azalt.
- Dokunma hedefi eşiğiyle bağ: boyut kuralı `references/thresholds.md` **E4** (≥ 44×44 birincil,
  en az 24×24 her yerde) ve **E15** (24 px aralık istisnası) ile birlikte değerlendirilir.

## 9. Ekran Karmaşıklığı Sütunları

Her ekran için iki sayı raporlanır:

| Sütun | Tanım | Değerlendirme |
|-------|-------|---------------|
| Eşzamanlı rakip öğe sayısı | Aynı anda dikkat çeken öğeler (vurgulu buton, rozet, uyarı, animasyon) | Miller 7±2 aralığına göre yorumla |
| Anlam taşıyan renk sayısı | Dekoratif değil, anlam kodlayan (durum/öncelik/kategori) renkler | Sayı + renk körlüğü ayırt ediciliği; anlam yalnız renkle veriliyorsa bulgu |

## 10. Türkçe Okunabilirlik — Sözel Kontrol

Türkçe okunabilirlik formülleri (Ateşman, Bezirci–Yılmaz vb.) birincil kaynaktan doğrulanmadığı için
**otomatik skor hesaplanmaz** ve katsayı yazılmaz. Bunun yerine sözel kontrol listesi uygulanır:

- Cümleler kısa ve tek fikirli mi?
- Yaygın/gündelik kelimeler mi; gereksiz teknik terim var mı?
- Edilgen yapı ve isimleştirme az mı? (Edilgen özneyi gizleyip yükü artırır.)
- Aynı kavram için tek terim mi kullanılıyor?
- Liste/tablo ile parçalama mümkün mü?

> **Not:** Türkçe okunabilirlik formülleri birincil kaynaktan doğrulanmadığı için skor hesaplanmaz;
> bu bölüm nitel bir kontrol listesidir.

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
