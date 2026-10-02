# Usability Test Protocol

Kaynaklar: ISO 9241-11 (kullanılabilirlik tanımı), Nielsen 1993 "Usability Engineering", Virzi 1992, Brooke 1996 (SUS), Rubin & Chisnell "Handbook of Usability Testing".

## Demografik Bilgi Formu (şablon)

```
1. Yaş aralığı:        ☐ 18-24  ☐ 25-34  ☐ 35-44  ☐ 45-54  ☐ 55+
2. Meslek / rol:
3. Eğitim seviyesi:
4. Teknoloji kullanım düzeyi:  ☐ Başlangıç  ☐ Orta  ☐ İleri
5. Benzer ürünleri kullanma sıklığı: ☐ Hiç  ☐ Ara sıra  ☐ Düzenli
6. (İsteğe bağlı) Erişilebilirlik ihtiyacı / kullandığı yardımcı teknoloji:
```

Yalnızca analizde kullanılacak alanları sor; kişisel veriyi minimumda tut (KVKK/GDPR).

## Post-Test Anketi: SUS (System Usability Scale)

Her madde 1 (Kesinlikle katılmıyorum) - 5 (Kesinlikle katılıyorum):

```
1.  Bu sistemi sık sık kullanmak isterim.
2.  Sistemi gereksiz yere karmaşık buldum.
3.  Sistemin kullanımı kolaydı.
4.  Sistemi kullanabilmek için teknik destek alma ihtiyacı duyardım.
5.  Sistemdeki işlevlerin iyi bütünleştiğini düşündüm.
6.  Sistemde çok fazla tutarsızlık olduğunu düşündüm.
7.  Çoğu insanın bu sistemi çok hızlı öğreneceğini düşünüyorum.
8.  Sistemi kullanmayı çok hantal buldum.
9.  Sistemi kullanırken kendime güvendim.
10. Sistemi kullanmaya başlamadan önce çok şey öğrenmem gerekti.
```

**Skor:** tek numaralı maddeler (1,3,5,7,9) için `puan - 1`; çift numaralı maddeler (2,4,6,8,10) için `5 - puan`. Toplamı 2.5 ile çarp → 0-100. Ortalama ~68; 80+ iyi, 51 altı zayıf.

Açık uçlu ek sorular:
```
11. En çok zorlandığınız görev hangisiydi? Neden?
12. Eksik veya yanlış bulduğunuz bir şey var mı?
13. Bu ürünü bir meslektaşınıza nasıl anlatırdınız?
```

Opsiyonel görev sonrası tek soru: Single Ease Question (SEQ) — "Bu görevi tamamlamak ne kadar kolaydı?" (1-7).

## Pilot Test Kontrol Listesi

Gerçek testten önce en az 1-2 pilot oturum ile doğrula:
- [ ] Pre-test soruları net mi?
- [ ] Görevler iyi tanımlı mı?
- [ ] Kısa oryantasyon ne kadar sürüyor?
- [ ] Testi teknik olarak engelleyen bir koşul var mı (erişim, hesap, ağ)?
- [ ] Anket soruları net mi?
- [ ] Soru ve görev sırası uygun mu?

> Pilot sonrası kritik sorun çıkarsa test düzeni gözden geçirilmeli, ardından yeniden pilot yapılmalı.

## Katılımcı Sayısı Tartışması

- **Virzi 1992** — ilk 4-5 katılımcı kullanılabilirlik sorunlarının büyük kısmını (~%80-85) açığa çıkarır.
- **Nielsen & Landauer 1993** — sorun keşfi için matematiksel model; 5 kullanıcı tipik olarak ~%85.
- **Spool & Schroeder 2001** — karmaşık sitelerde 5 kullanıcı yetersiz kalabilir; uzmanlar arasında sayı tartışmalıdır.
- Öneri: sık / orta / ilk kez kullanıcı KARIŞIMI; farklı yaş ve eğitim profilleri. Birden çok kullanıcı segmenti varsa segment başına 3-4 katılımcı (Nielsen); niceliksel metrik için toplam ≥ 20 (`references/metrics.md` §5).

## Görev Senaryosu Yazma Kuralları

- Gerçek iş akışıyla uyumlu (yapay laboratuvar görevi değil)
- Kısa, atomik, anlaşılır
- Amaç açıklanır AMA ipucu verilmez
  - Kötü: "Sepet ikonuna tıklayıp ödeme sayfasına git."
  - İyi: "Seçtiğin iki ürünü satın almayı tamamla."
- En sık kullanılan + en zor görevler öncelikli
- Heuristic Walkthrough ile önce daraltılır (Albert & Tullis, "Measuring the User Experience")

## Test Ortamı

- İzole laboratuvar testleri gerçek davranıştan sapabilir (Brush, Ames & Davis 2004; Hertzum 1999)
- Mümkünse doğal çalışma ortamı: gerçek ağ hızı, gürültü/ışık, dikkat dağıtıcılar, iş kesintileri DAHİL
- Uzaktan test seçilirse ekran paylaşımı + ses kaydı + cihaz bilgisi toplanmalı

## Yürütme

```
a) Test amacını açıkla + gönüllü katılım ve kayıt onay formu
b) Demografik formu doldur
c) Kısa sistem tanıtımı (temel kullanım)
d) Test sırasında:
   - Görev başarı oranını kaydet
   - Görev süresini kaydet
   - Gözlem notları (sesli düşünme / think-aloud)
e) Post-test anketi (SUS + açık uçlu)
f) Açık uçlu kapanış sohbeti
```

## Metrikler

| Metrik | Hesap | Hedef |
|--------|-------|-------|
| Task completion rate | tamamlanan / toplam | ≥ %80 |
| Task time | saniye/görev | benchmark'a göre |
| Error rate | hata sayısı / kullanıcı | < 2 |
| SUS skoru | 0-100 | ≥ 68 (ortalama üstü) |
| Öznel memnuniyet | SEQ veya anket ortalaması | SEQ ≥ 5/7 |
