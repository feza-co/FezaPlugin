<!-- generated from shared/input-discovery.md — do not edit -->
# Ortak Girdi Toplama Deseni (Input Discovery)

Bu prosedür **tüm FezaPlugin skill'leri** tarafından çağrılır. Skill çıktısı üretmeye başlamadan önce projenin bağlamını şu sıraya göre toplar:

## Adım A — Brief / Fikir Dosyası Ara

Glob/Read ile şu dosyaları sırayla ara:

1. Kök dizinde: `IDEA.md`, `BRIEF.md`, `FIKIR.md`, `PROJE.md`, `PROJECT.md`, `OVERVIEW.md`, `VIZYON.md`, `VISION.md`
2. `docs/` altında: `docs/idea.md`, `docs/brief.md`, `docs/overview.md`, `docs/vision.md`
3. `README.md` içinde şu başlıklardan biri varsa o bölümü çıkar:
   - "## Proje Fikri", "## Fikir", "## Açıklama", "## Vizyon", "## Hakkında"
   - "## About", "## Overview", "## Description", "## Vision", "## Project Idea"

Bulunan ilk geçerli kaynak (en az 3 cümle / 100 karakter) **kanonik brief** olarak kabul edilir. Tümünü oku, ama kanonik olanı önceleyerek kullan.

## Adım B — Önceki FezaPlugin Çıktıları

Skill bağımlıysa, daha önce üretilmiş kardeş dosyaları oku (varsa):

| Skill | Beklediği önceki dosyalar |
|-------|---------------------------|
| `wbs` | `SCOPE_*.md` |
| `estimate` | `WBS_*.md` |
| `budget` | `ESTIMATES_*.md`, `WBS_*.md` |
| `activity-sequence` | `WBS_*.md` |
| `swot` | `SCOPE_*.md` (varsa) |
| `risk-register` | `SWOT_*.md`, `SCOPE_*.md` |
| `raci` | `WBS_*.md`, `STAKEHOLDERS_*.md` |
| `comm-plan` | `STAKEHOLDERS_*.md` |
| `srs-generate` | `SCOPE_*.md` (varsa) |

Eksik bağımlı dosya KRİTİKSE (örn. `wbs` için `SCOPE_*.md` yok), kullanıcıya bildir ama otomatik üretmeyi DENE — brief varsa scope'u zihinden tahmin edip devam et.

## Adım C — Brief Yoksa Tek Soruyla İste

Adım A'da hiç brief bulunamadıysa **tek** `AskUserQuestion` çağır:

- **Soru:** "Bu skill bir proje fikrine ihtiyaç duyuyor. Kısa bir brief paylaşır mısın? (proje adı + 1 cümle tanım + 3-10 ana fonksiyon)"
- **Header:** "Proje brief"
- **Seçenek 1:** "Şimdi yazacağım" — `description`: "Other ile proje adı, tanımı ve ana fonksiyonları yaz."
- **Seçenek 2:** "Örnek bir senaryo üret" — `description`: "Sektörel bir örnek proje (ör. e-ticaret iade yönetimi) üzerinden tam çıktı hazırla."

Kullanıcı brief verirse:
- Brief'i `BRIEF.md` olarak proje köküne **kaydet** (gelecekteki çağrılarda Adım A'da bulunsun).
- Devam et.

Kullanıcı "örnek senaryo" seçerse:
- Şu özgün senaryolardan birini kullan: e-ticaret iade yönetimi, SaaS ekip abonelik yönetimi, mobil bankacılık fatura ödeme, klinik randevu planlama, akıllı otopark rezervasyonu.
- "Bu örnek `BRIEF_EXAMPLE.md` olarak kaydedildi" notu düş.

## Adım D — Gri Nokta Tespiti

Brief eline geçtikten sonra (kaynaktan veya kullanıcıdan), skill'in başarıyla çalışması için **kritik** olan boşlukları tespit et. Her skill kendine özel "gri nokta listesini" tanımlar (SKILL.md içinde).

Kontrol kuralları:

1. Brief metninde her gri noktanın cevabını ARA. Bulduysan ✓ işaretle.
2. Bulunamayan gri noktaları **önem sırasına** diz.
3. **EN FAZLA 3 ADET** kritik gri nokta için TEK `AskUserQuestion` çağrısında topluca sor:
   - Her soru için 2-4 yanıt seçeneği üret (yaygın/öneri ilki + recommended).
   - Sorulara `multiSelect: false` (tek seçim) varsayılan.
   - Skip + Other otomatik var.
4. Az önemli boşluklar için soru SORMA — çıktıda `TBD — [açık ifade]` yaz.
5. Kullanıcı "Skip" seçerse → varsayım kullan + çıktıda "Varsayım: ..." notu.

## Adım E — Dil Tespiti

- Brief Türkçeyse → çıktı Türkçe (resmî, teknik ton; terimler parantezde İngilizce).
- Brief İngilizceyse → çıktı İngilizce.
- Karışıksa → kullanıcının son mesajının dili.
- Komutta `--lang=tr` veya `--lang=en` varsa o ezer.

## Sınırlar

- Toplam soru sayısı **MAX 4** olabilir (1 brief + 3 gri nokta).
- Brief zaten varsa SADECE gri nokta sor; brief yoksa SADECE brief sor + gri noktaları "TBD" bırak (kullanıcıyı yormayalım).
- Aynı soruyu farklı kelimelerle 2 kez sorma.
- Kullanıcı brief vermek istemezse "örnek senaryo" yoluyla ilerle, durma.
