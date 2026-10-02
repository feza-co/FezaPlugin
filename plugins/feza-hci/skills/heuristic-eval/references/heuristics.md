# Heuristic Reference (Nielsen 1994 + Dix et al.)

## Nielsen 10 Usability Heuristics

| # | Heuristic | Açıklama | Tipik bulgu örneği |
|---|-----------|----------|---------------------|
| H1 | **Visibility of system status** | Sistem her zaman ne olduğunu kullanıcıya bildirmeli (loading, success, error) | Yükleme göstergesi yok |
| H2 | **Match between system and real world** | Kullanıcı dilinde, gerçek dünya kavramları | Teknik jargon, yabancı simge |
| H3 | **User control and freedom** | Yanlış aksiyondan dönüş (undo/redo, cancel) | "Geri al" yok |
| H4 | **Consistency and standards** | Aynı kelime/durum/aksiyon = aynı şey | Buton stili sayfadan sayfaya değişiyor |
| H5 | **Error prevention** | Hata oluşmadan önle | Form gönderim öncesi validate yok |
| H6 | **Recognition rather than recall** | Hatırlatmadan tanı (görsel ipucu) | Kısayolu hatırlamak gerek |
| H7 | **Flexibility and efficiency of use** | Yeni kullanıcı için kolay, expert için hızlı (shortcut) | Klavye kısayolu yok |
| H8 | **Aesthetic and minimalist design** | Gereksiz bilgi yok | Çok kalabalık layout |
| H9 | **Help users recognize, diagnose, recover from errors** | Hata mesajı: ne, neden, nasıl düzelt | "Error 500" |
| H10 | **Help and documentation** | Yardıma erişilebilirlik | Help linki yok |

## Dix et al. Prensipleri (mapping)

| Dix et al. | Nielsen ile ilişki |
|----------|---------------------|
| Predictability | H1, H4 |
| Synthesizability | H1, H6 |
| Familiarity | H2, H6 |
| Generalizability | H4 |
| Consistency | H4 |
| Dialog initiative | H3, H7 |
| Multithreading | H7 |
| Task migratability | H7 |
| Substitutivity | H6, H7 |
| Customizability | H7 |
| Observability | H1 |
| Recoverability | H3, H9 |
| Responsiveness | H1 |
| Task conformance | H2 |

## WCAG 2.1 AA Eşikleri (sık ihlaller)

| Kriter | Eşik | Kontrol |
|--------|------|---------|
| Color contrast (text, normal) | ≥ 4.5:1 | Body text vs background |
| Color contrast (text, large 18pt+) | ≥ 3:1 | Heading vs background |
| Color contrast (UI, non-text) | ≥ 3:1 | Buton kenar, focus ring |
| Touch target size | ≥ 44×44 px | Mobile butonlar |
| Keyboard navigable | Tüm interaktif öğe | Tab tuşuyla erişilebilir mi |
| Focus visible | Görünür focus indicator | `outline: none` ile gizlenmemiş |
| ARIA labels | Tüm icon-only butonda | `aria-label` var mı |

## Severity Skalası (Nielsen)

Severity ölçeği (0-4) ve somut ankrajları `references/evidence-rubric.md` §2'de tanımlıdır; burada
tekrar edilmez. Özet: 4 = görev tamamlanamıyor / WCAG A-AA erişim engeli; 3 = ciddi gecikme veya
birden çok grubu etkileme; 2 = sürtünme; 1 = kozmetik; 0 = sorun değil. Kanıt türleri ve severity
3-4 için kanıt zorunluluğu aynı dosyadadır.

## Bulgu Cümle Şablonu

```
[Konum] içinde [gözlem] görüldü.
[Heuristic ihlali]: [hangi prensip].
Beklenen: [doğru davranış].
Önerilen düzeltme: [somut adım].
```

Örnek: "`pages/checkout.tsx` Submit butonu tıklandıktan sonra 3 saniye boyunca hiçbir değişiklik yok. H1 (Visibility of system status) ihlali. Beklenen: yükleme göstergesi + buton disabled state. Önerilen düzeltme: `<Button isLoading={loading}>` kullan, ek olarak inline `Spinner` ekle."
