# HCI fixture test seti (Faz 2 + Faz 4)

`plugins/feza-hci/skills/hci-execute/scripts/verify-ui.mjs` tarafından ölçülen E kodlarının
her biri için bir **fail** ve bir **pass** örnek sayfası; ayrıca çoklu ihlal (`bad.html`) ve
sıfır ihlal (`good.html`) sayfaları. Koşucu, her fixture'ı verify-ui ile çalıştırıp beklenen
çıkış kodunu ve `ok:false` olan E kodlarını `expected.json` ile karşılaştırır.

## Nasıl çalıştırılır

```bash
node --check tests/hci/run.mjs      # sözdizimi
node tests/hci/run.mjs              # tüm fixture'lar (varsayılan --jobs 2)
echo $?                             # 0 = tümü uyumlu, 1 = uyuşmazlık, 2 = araç yok / girdi hatası
```

Seçenekler:

- `--expected <dosya>` — başka bir beklenti dosyası (mutasyon kontrolü için).
- `--only <desen>` — yalnız adı desene uyan fixture'lar (alt dizge ya da regex).
- `--jobs N` — eşzamanlı fixture sayısı (varsayılan 2).

Koşucu, her fixture için verify-ui'yi `--json --out <os.tmpdir() altı geçici dizin>` ile çalıştırır;
depoya çıktı bırakmaz. verify-ui bağımlılıkları (playwright, @axe-core/playwright) kendi önbellek
dizininden çözer: Linux/macOS'ta `~/.cache/feza-ui-check`, Windows'ta
`%LOCALAPPDATA%\feza-ui-check`. `FEZA_UI_CHECK_NO_INSTALL=1` ayarlıysa kurulum denenmez.

## Beklenti biçimi (`expected.json`)

```json
{
  "static": ["E9", "E10", "E11", "E19", "E20"],
  "E3-fail.html": { "exit": 1, "fail": ["E3"] },
  "E18-fail.html": { "exit": 0, "fail": [], "null": ["E9", "E10", "E11", "E17", "E18", "E19", "E20"], "note": "gerekçe" },
  "static/E23-fail": { "mode": "static", "exit": 1, "fail": ["E23"] }
}
```

- Anahtar fixture dosyası adıdır (`<ad>.html`) ya da statik fixture için `static/<ad>` dizinidir; değer
  `{ exit, fail, null?, mode?, note? }`.
- `fail` — `ok:false` olması beklenen E kodlarının **tam kümesi** (fazlası da eksiği de uyuşmazlık).
- `null` — `ok:null` olması beklenen kodlar (çıkış kodunu bozmaz); verildiğinde **tam küme** olarak
  karşılaştırılır (her zaman `ok:null` dönen statik/ölçülemeyen kodlar da yazılır). Ör. E18 karma.
- `mode: "static"` — fixture bir dizindir ve `verify-ui.mjs --static <dizin>` ile çalıştırılır; çıkış kodu
  ve `ok:false`/`ok:null` davranışı aynıdır. Anahtar `static/` ile başlıyorsa `mode` yazılmasa da statik sayılır.
- `note` — kaçınılmaz çakışmanın (ör. E2 axonun serious `color-contrast` kuralından E1 de düşer)
  gerekçesi. Faz 4'teki örnekler: E16↔E25, E6↔E21.
- `static` — verify-ui'nin render modunda ölçmediği statik kodların listesi (E9, E10, E11, E19, E20);
  fixture yazılmaz. E26/E27/E23/E24 statik taramada `--static` dizinleriyle temsil edilir.

Koşucu, beklentide olup dosyası/dizini olmayan ya da tersine, dosyası/dizini olup beklentisi olmayan
fixture'ı hata sayar.

## Yeni fixture nasıl eklenir

1. **Render fixture'ı:** `tests/hci/fixtures/` altına `<kod>-fail.html` ve `<kod>-pass.html` ekle. Sayfalar küçük,
   kendi içinde (inline CSS/JS) ve mümkünse yalnız hedef kodu bozacak şekilde olsun. TR ve EN metin karışık kullanılabilir.
2. **Statik fixture'ı:** `tests/hci/fixtures/static/<kod>-fail/` ve `-pass/` dizinleri aç; içine `index.html`
   (ve gerekiyorsa `app.css`, `app.js`) koy. `expected.json` girdisinde `"mode": "static"` kullan.
3. Fixture'ı verify-ui ile çalıştır ve **gerçek** sonucu gör:

   ```bash
   node plugins/feza-hci/skills/hci-execute/scripts/verify-ui.mjs tests/hci/fixtures/<kod>-fail.html --json --out /tmp/hci-probe
   node plugins/feza-hci/skills/hci-execute/scripts/verify-ui.mjs --static tests/hci/fixtures/static/<kod>-fail --json --out /tmp/hci-probe
   ```

4. `report.json` içindeki `results.<E>` alanlarına bakıp `ok:false` kodlarının tam kümesini
   `expected.json`'a yaz. Kaçınılmaz bir çakışma varsa `note` alanında gerekçelendir.
5. `node tests/hci/run.mjs --only <kod>` ile doğrula; sonra tam seti çalıştır.

## Mutasyon kontrolü

Beklentinin gerçekten denetlendiğini kanıtlamak için, çalışma ağacı dışında geçici bir dizinde
beklentinin bir kopyasını boz ve `--expected` ile ver:

```bash
cp tests/hci/expected.json /tmp/hci-expected-mutated.json
# ör. E3-fail.html beklentisini boz: "fail": ["E3"] -> "fail": ["E2"]
node tests/hci/run.mjs --expected /tmp/hci-expected-mutated.json
echo $?   # 1 olmalı (uyuşmazlık)
```

Koşucu bozulan beklentiyi uyuşmazlık olarak raporlar ve çıkış **1** verir; beklenti dosyası doğru
olduğunda çıkış **0**'dır.

## CI

`.github/workflows/ci.yml` içindeki `hci-fixtures` işi bu seti çalıştırır: checkout → `actions/setup-node@v4`
(Node 20) → verify-ui önbellek dizinine (`$HOME/.cache/feza-ui-check`) playwright + @axe-core/playwright
kurulumu ve `playwright install --with-deps chromium` → `node tests/hci/run.mjs`
(`FEZA_UI_CHECK_NO_INSTALL=1`). Yerelde tam set ~4-5 dakikadır (`--jobs 2`; yerel ölçüme dayalı tahmin); CI'da kurulum dahil tahmini
süre 10 dakikanın altında kaldığı için iş ana `ci.yml`'e konmuştur, ayrı bir workflow'a taşınmamıştır.
Süre büyürse iş `.github/workflows/hci-fixtures.yml` olarak `workflow_dispatch` + haftalık `schedule`
ile ayrılabilir.

## Doğrulama kapısı bağlantısı

Fix modu (`shared/packages/feza-hci/fix-mode.md` §6) düzeltme sonrası ihlal sayısının kesin
azalmasını şart koşar; bu set o kapının regresyon temelidir: `bad.html` birden çok ihlali, `good.html`
sıfır ihlali temsil eder.
