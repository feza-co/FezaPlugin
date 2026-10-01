# Scope Statement Template (PMBOK — Project Scope Management)

Aşağıdaki iskelet eksiksiz uygulanır. Boş bölüm bırakılmaz; bilgi yoksa "TBD — [neden]" yazılır.

## "Project" Tanımı (PMBOK Guide)

Bir Scope Statement yazılmadan önce, ürün gerçekten bir "project" mi kontrol et:
- **Temporary endeavor** (geçici, sonsuza dek değil)
- **Unique product, service, or result** (eşsiz çıktı)
- **Definite start date** ve genelde definite end date
- **Goals + Timeline + Resources + Stakeholders** dörtlüsü tanımlı

Eğer "daily operations" / "regular maintenance" / "daily backup" / "billing clients" tarzı bir iş ise → bu bir project DEĞİLDİR; kullanıcıya bildir, yine de istiyorsa devam et.

## İskelet

```markdown
> **Scope Statement** — <Proje Adı>
> Üretildi: <tarih>
> Üretici: FezaPlugin · /feza-pm:scope-statement
> Standart/Kaynak: PMBOK Guide — Project Scope Management

# 1. Project Definition (Proje Tanımı)

<Bir cümle: Ne yapıyor, kim için, neden.>

# 2. Goals (Hedefler)

| # | Hedef | Ölçüt |
|---|-------|-------|
| G1 | <Hedef cümlesi> | <Ölçülebilir kriter, ör. tarih/sayı/yüzde> |
| G2 | ... | ... |

# 3. Product Description (Ürün Tanımı)

<1-2 paragraf: ne tür bir yazılım/sistem, ana modüller, hangi platform, kullanıcı arayüzü tipi.>

# 4. Success Criteria (Başarı Kriterleri)

Proje "başarılı" sayılacaksa şu koşullar sağlanmış olmalı:
- <Kriter 1, ölçülebilir>
- <Kriter 2>
- ...

# 5. In Scope (Kapsam İçi)

| Item | Açıklama |
|------|----------|
| <Özellik/modül> | <Ne içerir> |

# 6. Out of Scope (Kapsam Dışı)

| Item | Neden hariç |
|------|-------------|
| <Özellik/modül> | <Açık gerekçe — sonraki sürüm? bütçe? zaman?> |

# 7. Assumptions (Varsayımlar)

1. <Varsayım — örn: "Kullanıcı bilgisayarında modern tarayıcı (Chrome/Firefox son 2 sürüm) bulunmaktadır.">
2. ...

# 8. Constraints (Kısıtlar — Triple Constraint)

Dörtlü kısıt çerçevesi (PMBOK):

| Boyut | Hedef | Açıklama |
|-------|-------|----------|
| **Time** | <fast/normal/relaxed> | <Tarih veya dönem> |
| **Cost** | <cheap/normal/high> | <Bütçe varsa rakam veya "iç proje — ek bütçe yok"> |
| **Quality** | <good/standard/MVP> | <Hedef kalite seviyesi> |
| **Scope** | <complete/MVP/iterative> | <Kapsam genişliği> |

**Triple Constraint Dengesi:** <Hangi ikisi öncelikli, hangisi feda? Örn: "MVP olduğu için Scope sınırlı tutuluyor; Quality ve Time öncelikli.">

# 9. Stakeholder Snapshot

Kısa liste — detay için `/feza-pm:stakeholder-map`:

| Rol | İlgi |
|-----|------|
| <Sponsor / Müşteri / Kullanıcı> | <Bir cümle> |

# 10. Bilinen Boşluklar

| # | Boşluk | Neden açık | Önerilen çözüm |
|---|--------|------------|----------------|
| 1 | ... | ... | ... |
```

## Örnekler

- **E-ticaret Sepet ve Ödeme Modülü**: Goals = "sepet + kupon + 3D Secure ödeme + sipariş onayı e-postası". Out of Scope = "çoklu satıcı komisyon hesabı (sonraki sürüm)".
- **Yemek Sipariş Uygulaması (mobil)**: Goals = "restoran listeleme + sepet + sipariş takibi". Out of Scope = "kurye atama / lojistik".
- **Online Kurs Aboneliği (SaaS)**: Goals = "abonelik başlatma + ödeme + erişim yönetimi". Out of Scope = "sertifika üretimi / kurumsal fatura entegrasyonu".

## Anti-Pattern'ler

- ✗ "Sistem kullanıcı dostu olacaktır" → Goals'da ölçülemez ifade YASAK.
- ✗ Out of Scope'u boş bırakmak → her zaman en az 2 item.
- ✗ Constraints'te 4 boyutu da "high priority" işaretlemek → triple constraint felsefesine aykırı; en az birinin esnek olması gerekir.
- ✗ "Project Definition"ı 3 paragraf yazmak → tek cümle, net.
