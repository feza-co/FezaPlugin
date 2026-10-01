# WBS Template (PMBOK — Create WBS)

## Temel Kurallar

1. **3 seviye standart**, gerekirse 4. seviyeye in.
2. Numaralama: `1.0 → 1.1 → 1.1.1` (her seviye nokta ile ayrılır).
3. Her yaprak SOMUT bir deliverable üretir (dokümantasyon, modül, ekran, test seti…).
4. **100% Rule**: ana dalların TOPLAMI = projenin TAMAMI.
5. Yapraklar **eylem değil, ÇIKTI** ifade eder. ("Login sayfası kodlanır" değil → "Login sayfası modülü").

## İskelet

```markdown
> **WBS** — <Proje Adı>
> Kullanılan kapsam: <SCOPE_*.md / BRIEF.md / kullanıcı brief'i>
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-pm:wbs

## 1.0 <Ana Modül 1: örn. Authentication & Identity>

### 1.1 <Alt Modül: örn. Kullanıcı Kayıt>
- 1.1.1 Kayıt formu UI bileşeni
- 1.1.2 E-posta doğrulama akışı
- 1.1.3 Backend kayıt endpoint'i
- 1.1.4 Veritabanı user tablosu şeması

### 1.2 <Alt Modül: örn. Oturum Açma>
- 1.2.1 Login formu UI
- 1.2.2 JWT üretici servis
- 1.2.3 Şifre hashing modülü
- 1.2.4 Şifre sıfırlama akışı

## 2.0 <Ana Modül 2: örn. Catalog>
...

## 3.0 <Ana Modül 3: örn. Checkout>
...

## 4.0 Project Management (cross-cutting)

### 4.1 Planlama
- 4.1.1 Scope statement dokümanı
- 4.1.2 WBS dokümanı
- 4.1.3 Risk register

### 4.2 İzleme
- 4.2.1 Periyodik ilerleme raporu
- 4.2.2 Sprint demo takvimi

## 5.0 Quality Assurance (cross-cutting)

### 5.1 Test
- 5.1.1 Unit test paketi
- 5.1.2 Integration test paketi
- 5.1.3 UAT senaryoları

### 5.2 Dokümantasyon
- 5.2.1 README
- 5.2.2 API dokümantasyonu
- 5.2.3 Kullanıcı kılavuzu

## Özet

| Ana Dal | Yaprak Sayısı |
|---------|---------------|
| 1.0 ... | 8 |
| 2.0 ... | 12 |
| 3.0 ... | 6 |
| 4.0 Project Management | 5 |
| 5.0 Quality Assurance | 5 |
| **TOPLAM** | **36** |

## Bilinen Boşluklar

| # | Boşluk | Neden açık | Önerilen çözüm |
|---|--------|------------|----------------|
| 1 | ... | ... | ... |
```

## Tipik Cross-Cutting Dallar

Her yazılım projesinde genellikle bulunur:
- **Project Management**: planlama, izleme, raporlama, risk yönetimi
- **Quality Assurance**: test, dokümantasyon, code review
- **DevOps / Deployment**: CI/CD, ortam kurulumu, monitoring
- **UI/UX Design**: wireframe, prototip, usability testing
- **Data**: veri modeli, migration, seed data

Tüm cross-cutting dallar gerekli değildir; projeye uygun olanı seç.

## Anti-Pattern'ler

- ✗ Tek seviyeli liste (3 seviye olmalı).
- ✗ Yapraklar fiil cümlesi ("Login sayfasını kodla") → isim/çıktı olmalı ("Login sayfası modülü").
- ✗ Out of Scope item'ları WBS'e eklemek.
- ✗ Numaraları tutarsız bırakmak (1.1.1, sonra 1.2.A).
- ✗ Yaprak sayısı 5'in altında / 100'ün üstünde — bu seviyede WBS işlevsiz.
