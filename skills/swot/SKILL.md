---
name: swot
description: >
  SWOT analizi üretir. PMBOK risk tanımlama tekniklerine uygun:
  Strengths / Weaknesses / Opportunities / Threats matrisi + her hücre için kanıt
  cümlesi. Önce projedeki BRIEF/IDEA/SCOPE/README'yi okur, yoksa kullanıcıdan tek
  soruyla brief alır. Kritik gri noktaları (max 3) sorar.
  Tetikleyici: "SWOT analizi", "SWOT yap", "swot çıkar", "/feza-pm:swot",
  "güçlü zayıf yönler".
allowed-tools: Read, Write, Glob, Grep, AskUserQuestion
---

# SWOT

Kanıt cümleli, TOWS çapraz stratejili SWOT matrisi.

## Tetikleyici

- "/feza-pm:swot"
- "SWOT analizi / SWOT çıkar"
- "güçlü ve zayıf yönler / fırsat ve tehditler"

## Adım 0 — Bağlamı Topla

`references/input-discovery.md` desenini uygula:
1. `SCOPE_*.md` (varsa öncelikli — proje karakterini gösterir).
2. `IDEA.md`/`BRIEF.md`/`PROJE.md`/`README.md`.
3. `package.json`/manifest — bağımlılıklar = teknik güçlü/zayıf yön ipucu.
4. Hiçbiri yoksa **TEK** `AskUserQuestion`:
   - **Soru:** "SWOT için bir proje fikrine ihtiyaç var. Kısa brief'i şimdi yazar mısın?"
   - **Header:** "Proje brief"
   - **Seçenek 1:** "Şimdi yazacağım" — Other ile yaz.
   - **Seçenek 2:** "Örnek senaryo üret" — kurgusal bir SaaS/e-ticaret projesiyle örnek.

## Adım 1 — Gri Nokta Tespiti

EN FAZLA 2 SORU:

| # | Gri nokta | Neden kritik |
|---|-----------|--------------|
| 1 | **Bilinen rakip(ler)** | Threats kalitesi için |
| 2 | **Hedef pazar / kullanıcı segmenti** | Opportunities odağı için |

Brief'te varsa SOR**MA**.

## Adım 2 — Bilgi Tabanı

- `references/swot-questions.md` — SWOT soru bankası.
- `references/output-conventions.md`.

## Adım 3 — Üret

4 hücreli matris + her hücrede 4-7 madde. Her madde **kanıt cümlesiyle**:

| Maddenin tipi | Kanıt formatı |
|---------------|---------------|
| Brief'ten geliyor | "(Kaynak: BRIEF.md)" |
| Koddan geliyor | "(Kaynak: package.json — react v18)" |
| Sektör bilgisi | "(Genel piyasa)" |
| Varsayım | "Varsayım: ..." |

### Strengths (Güçlü Yönler)

- Başkalarından daha iyi yaptığınız ne?
- İşinize değer katan unsurlar nelerdir?
- Sahip olduğunuz benzersiz/düşük maliyetli kaynaklar?

### Weaknesses (Zayıf Yönler)

- Neyi geliştirmeniz gerekiyor?
- Neden kaçınmalısınız?
- Müşterileriniz/pazar zayıflık olarak ne görüyor?

### Opportunities (Fırsatlar)

- Hangi açık fırsatları görüyorsunuz?
- Hangi trendleri yakalayabilirsiniz?

### Threats (Tehditler)

- Hangi engellerle karşılaşıyorsunuz?
- Rakipleriniz ne yapıyor?
- Kalite standartları / teknoloji değişiklikleri?
- Borç / nakit akışı sorunu?

## Adım 4 — TOWS Çapraz Analiz (bonus)

SWOT'un üstüne bir TOWS matrisi ekle: 4 kombinasyon stratejisi:

| | Opportunities | Threats |
|---|---|---|
| **Strengths** | SO: Maxi-Maxi (saldır) | ST: Maxi-Mini (savun) |
| **Weaknesses** | WO: Mini-Maxi (geliştir) | WT: Mini-Mini (azalt/çık) |

Her kombinasyon için 1-2 stratejik öneri.

## Adım 5 — Self-Check

- [ ] Her hücrede en az 4 madde var mı?
- [ ] Her madde kanıt etiketli mi?
- [ ] S/W iç faktör, O/T dış faktör olarak doğru sınıflanmış mı?
- [ ] TOWS bölümü dolu mu?
- [ ] "kullanıcı dostu", "modern", "esnek" gibi ölçülemez sözcükler YOK mu?

## Kalite Kapısı ve Teslim Formatı (yazmadan önce)

Üretim akışı: **taslak → gizli puanlama → revizyon → teslim**.

1. Dokümanı yukarıdaki adımlarla tam hâliyle **taslak** olarak üret; henüz dosyaya yazma.
2. Taslağı `references/quality-gate.md` prosedürüyle **feza-pm (Proje Yönetimi)** kriter setine göre 100 üzerinden puanla (eşik 85; engelleyiciler dahil).
3. Eşik geçilmediyse ya da engelleyici varsa bulgulara göre revize et ve yeniden puanla (en fazla 2 tur); kapanmayan içerik eksiklerini "Bilinen Boşluklar"a yaz.
4. Son sürümü `references/output-conventions.md` teslim formatında yaz (kapak, özet, içindekiler, kaynakça, Bilinen Boşluklar; ayrıntılı şablon: `references/delivery-format.md`). Kullanıcı sade format isterse üst bilgi bloğu kullanılır.
5. Puan, kriter tablosu ve revizyon notları kullanıcıya **gösterilmez**, dosyaya yazılmaz; kullanıcı raporu kalite puanı içermez.

## Adım 6 — Dosyaya Yaz

- Dosya: `SWOT_<proje>.md`
- Konum: cwd

## Adım 7 — Kullanıcıya Rapor

1. Dosya yolu.
2. Tek cümle: kaç S/W/O/T maddesi.
3. Kullanılan input.
4. Bilinen boşluk sayısı.
5. Sonraki adım: "Sırada `/feza-pm:risk-register` — SWOT'un Threats'ı doğrudan risk register'a beslenir."

## Sınırlar

- Max 3 soru (1 brief + 2 gri).
- Her madde tek cümle, çoklu cümle yok.
- Diyagram çizme — markdown tablo yeterli.
- Rakipleri uydurma — bilgi yoksa "Varsayım: doğrudan rakip belirsiz".
