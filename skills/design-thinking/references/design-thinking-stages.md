# Design Thinking 5 Aşama

Kaynaklar: Stanford d.school "Design Thinking Bootcamp Bootleg", IDEO "Field Guide to Human-Centered Design", Brown 2008 (HBR "Design Thinking"), Constantine & Lockwood "Software for Use".

## Genel Felsefe

Design Thinking, **kullanıcı odaklı, iteratif, prototip-test döngüsüne dayalı** bir problem çözme yaklaşımıdır. Stanford d.school + IDEO modeli.

**Doğrusal değil — iteratif.** Test'ten Define'a, Prototype'tan Empathize'a dönmek normaldir.

## Aşama 1 — EMPATHIZE

### Amaç
Kullanıcının dünyasını anlamak. Kendi varsayımlarını askıya almak.

### Yöntemler
- **Observe** — kullanıcıyı doğal ortamında izle (ethnography, contextual inquiry)
- **Engage** — yapılandırılmış/yarı-yapılandırılmış mülakat
- **Immerse** — kullanıcının yerine geç (bir gün onun gibi yaşa)

### Çıktılar
- Mülakat notları + ses/video
- Empathy Map (Says / Thinks / Does / Feels)
- Direkt alıntı koleksiyonu
- Pain point listesi

### Tipik süre: 5-10 iş günü

### Araçlar
- Ses kayıt (transcript için Otter.ai)
- Empathy Map template (Miro, Mural, Notion)
- Soru rehberi (open-ended)

---

## Aşama 2 — DEFINE

### Amaç
Empathize çıktılarını **anlamlı bir problem ifadesine** dönüştür.

### Yöntemler
- **Synthesize** — sticky note kümeleme (affinity diagram)
- **Frame** — POV (Point of View) yaz
- **Articulate HMW** — How Might We soruları üret

### Çıktılar
- **Problem Statement** (1 cümle):
  ```
  [Kullanıcı] [ihtiyaç]'a sahip, çünkü [içgörü].
  ```
  Örnek: "Serbest çalışan bir kullanıcı, tekrarlayan faturalarını tek adımda ödemeye ihtiyaç duyar, çünkü her ay fatura kurumunu yeniden aramak zaman kaybettiriyor ve yanlış kuruma ödeme riski yaratıyor."

- **HMW (How Might We) Soruları** — ideation tetikleyicisi:
  - "How might we let users pay a saved bill in under 10 seconds?"
  - "How might we make the confirmation step feel safe without adding friction?"

- **Persona** — `/feza-hci:persona`
- **User Journey Map** — current state, fırsat noktaları

### Tipik süre: 3-5 gün

---

## Aşama 3 — IDEATE

### Amaç
Olabildiğince çok ve **çeşitli** çözüm üret. Yargıyı erteleyerek.

### Yöntemler
- **Brainstorm** — sözlü, hızlı
- **Brainwrite** — sessiz yazılı, herkes katılır
- **Crazy 8s** — 8 dakikada 8 farklı eskiz
- **SCAMPER** — Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse
- **Worst Possible Idea** — kötülerin tersini al

### Kurallar (IDEO brainstorming kuralları)
1. Defer judgment (eleştirmeden önce)
2. Encourage wild ideas
3. Build on others' ideas
4. Stay on topic
5. One conversation at a time
6. Be visual (eskizle)
7. Go for quantity

### Çıktı
- 30-100+ ham fikir → dot voting / impact-effort matrix → 5-10 promising

### Tipik süre: 2-3 gün

---

## Aşama 4 — PROTOTYPE

### Amaç
Fikirleri elle tutulur hale getir, test edilebilir kıl.

### Sıralama
**Sketch → Wireframe → Mockup → Prototype**

### Fidelity seviyesi
- **Low-fi** — kağıt eskiz, post-it, storyboard, wireframe (Balsamiq)
- **Mid-fi** — gri tonlu Figma wireframe, hover state'siz
- **Hi-fi** — Figma/Penpot interactive, gerçek renk + içerik

### Prototip nedir?
- Bir dizi ekran eskizi
- Storyboard (çizgi roman benzeri sahneler)
- Tıklanabilir sunum dosyası
- Kullanımı canlandıran video
- Karton maket
- Sınırlı işlevli yazılım

### Constantine & Lockwood notu
> "Software is the only engineering field that throws together prototypes and then attempts to sell them as delivered goods."

→ Prototip = öğrenme aracı, ürün değil.

### Tipik süre: 5-10 iş günü
### Skill bağlantısı: `/feza-hci:prototype-plan`

---

## Aşama 5 — TEST

### Amaç
Prototipi gerçek kullanıcılarla dene, geri bildirim al, iterate et.

### Yöntemler
- **Moderated user test** — yüz yüze + think-aloud
- **Unmoderated** — uzaktan, kayıt
- **A/B test** — iki versiyon karşılaştır
- **Cognitive walkthrough** — uzman, görev sırasına göre

### Çıktı
- Bulgu raporu (severity-rated)
- İyileştirme backlog'u
- Sonraki iterasyon planı

### Tipik süre: 5 iş günü
### Skill bağlantısı: `/feza-hci:usability-eval-plan`

---

## Örnek Senaryo: Mobil Bankacılıkta Fatura Ödeme

| Aşama | Yapılan |
|-------|---------|
| Empathize | Düzenli fatura ödeyen kullanıcılarla görüşme; "her ay aynı faturayı yeniden aramak" pain point'i |
| Define | Ana gereksinimler: kayıtlı fatura listesi, tek dokunuşla ödeme, makbuz paylaşımı |
| Ideate | Otomatik ödeme talimatı, kamerayla fatura okutma, hatırlatma bildirimi gibi seçenekler çeşitlenir |
| Prototype | **User journey flowchart** (giriş → fatura seç → onay → makbuz) + kağıt eskiz |
| Test | 5 kullanıcıyla görev testi; onay adımındaki güven sorunları Define'a geri besleme olur |

## Çıktı Şablonu

```markdown
> **Design Thinking Roadmap** — <Proje>
> Mevcut aşama: <hangi aşamada>
> Üretildi: <tarih>

## 1. Empathize
- Amaç: ...
- Aktiviteler: ...
- Çıktılar: ...
- Süre: ...
- Araçlar: ...

## 2. Define
...

## 3. Ideate
- ...
- HMW Soruları:
  - HMW ...
  - HMW ...

## 4. Prototype
- Fidelity sırası: Sketch → Wireframe → Mockup → Hi-fi
- Hangi araçla:

## 5. Test
- Yöntem:
- Katılımcı:

## İterasyon Notu
Bu süreç doğrusal değil — Test'ten Empathize'a, Prototype'tan Define'a dönmek normal.
```
