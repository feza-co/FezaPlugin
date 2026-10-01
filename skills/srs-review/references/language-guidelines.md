<!-- generated from plugins/feza-requirements/skills/srs-generate/references/language-guidelines.md — do not edit -->
# Gereksinim Dil Rehberi (ISO/IEC/IEEE 29148:2018, Madde 5.2.4 ve 5.2.7)

Bu rehber, SRS içindeki her gereksinim cümlesinin nasıl yazılacağını tanımlar. Tüm gereksinimler bu kurallara uymak zorundadır.

## 1. Modal Fiil Kullanımı

| Fiil | Anlamı | Ne zaman? |
|------|--------|-----------|
| **shall** | Bağlayıcı yükümlülük, zorunlu yetenek | **Her FR/NFR'de varsayılan** |
| **should** | Önerilen, arzu edilen | İyi-olur özellikler, best-practice |
| **may / can** | İzin verilen, opsiyonel | Tasarımcının takdirine bırakılan |
| **will** | Sistem dışı tarafların yapacakları | Çevre, yan sistem yükümlülükleri |

**Türkçe karşılıklar:**
- "shall" → "**-acaktır / -ecektir**" (örn. "Sistem … doğrulayacaktır.")
- "should" → "**önerilir / -malıdır**" (örn. "Arayüz Material Design rehberini takip etmelidir.")
- "may" → "**-abilir / -ebilir**"

## 2. Kaçınılacak Terimler

Bu kelimeler ölçülemez/öznel olduğundan **doğrulanamaz**. Skill, çıktıda bunları **görmemelidir**:

- easy, fast, user-friendly, efficient, robust, flexible
- intuitive, seamless, modern, scalable (sayısal eşik olmadan)
- usually, generally, often, typically, mostly
- maybe, perhaps, possibly
- as appropriate, as needed, as required (sayısal/koşullu kriter olmadan)
- and/or (cümleyi ikiye böl)

**Türkçe yasak liste:**
- kullanıcı dostu, kolay, hızlı, esnek, modern, sağlam
- genellikle, çoğunlukla, gerektiğinde
- olabilir, belki, mümkünse
- ve/veya (ikiye böl)

## 3. Cümle Şablonu

Her gereksinim aşağıdaki şablonlardan birine uymalıdır:

### FR Şablonu

```
[Sistem | Bileşen | Aktör] [koşul varsa: when/while/where ...]
shall [eylem] [nesne] [performans/kısıt: within X seconds, with Y accuracy].
```

Örnekler:
- "The system shall authenticate users within 3 seconds."
- "Sistem, geçersiz bir parola girildiğinde kullanıcıyı 1 saniye içinde uyaracaktır."

### NFR Şablonu

```
[Sistem] shall [kalite niteliği] [ölçülebilir eşik] [koşul].
```

Örnekler:
- "The system shall maintain 99.9% uptime during business hours (08:00–18:00 UTC+3)."
- "Sistem, 100 eşzamanlı kullanıcıya kadar yanıt süresini 500 ms altında tutacaktır."

## 4. Numaralandırma Şeması

- **FR-XXX** — Functional Requirements (FR-001, FR-002, …)
- **NFR-XXX** — Non-Functional Requirements (NFR-001, …)
- **CON-XXX** — Constraints (Design Constraints)
- **IF-XXX** — Interface Requirements

Numaralar **silinmez, yeniden kullanılmaz**. Bir gereksinim iptal olursa "DEPRECATED" olarak işaretlenir, numarası boş kalır.

## 5. Pozitif İfade Kuralı

Mümkün olduğunca pozitif yaz:
- ✗ "Sistem 5 saniyeden uzun yanıt vermeyecektir."
- ✓ "Sistem, yanıtı 5 saniye içinde dönecektir."

İstisna: güvenlik/yasak davranışlar pozitif yazılamaz; o zaman negatif kabul.

## 6. Tek Cümle Kuralı

Bir gereksinim **bir** cümleden oluşur. Detaylar varsa "Açıklama" sütununa veya "Notlar" alt-maddesine gider.
