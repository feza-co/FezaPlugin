# HCI fixture test seti (Faz 2)

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
  "E18-fail.html": { "exit": 0, "fail": [], "null": ["E18"], "note": "gerekçe" }
}
```

- Anahtar fixture dosyası adıdır; değer `{ exit, fail, null?, note? }`.
- `fail` — `ok:false` olması beklenen E kodlarının **tam kümesi** (fazlası da eksiği de uyuşmazlık).
- `null` — `ok:null` olması beklenen kodlar (çıkış kodunu bozmaz); ör. E17 alan yoksa, E18 karma.
- `note` — kaçınılmaz çakışmanın (ör. E2 axonun serious `color-contrast` kuralından E1 de düşer)
  gerekçesi.
- `static` — verify-ui'nin ölçmediği statik kodların listesi (E9, E10, E11, E19, E20); fixture yazılmaz.
  E21–E29 sonraki fazlarda eklenecek; yapı yeni girdiye açıktır (yalnız yeni bir `"<kod>-fail.html"`
  anahtarı ve dosyası eklenir).

Koşucu, beklentide olup dosyası olmayan ya da dosyası olup beklentisi olmayan fixture'ı hata sayar.

## Yeni fixture nasıl eklenir

1. `tests/hci/fixtures/` altına `<kod>-fail.html` ve `<kod>-pass.html` ekle. Sayfalar küçük,
   kendi içinde (inline CSS/JS) ve mümkünse yalnız hedef kodu bozacak şekilde olsun. TR ve EN
   metin karışık kullanılabilir.
2. Fixture'ı verify-ui ile çalıştır ve **gerçek** sonucu gör:

   ```bash
   node plugins/feza-hci/skills/hci-execute/scripts/verify-ui.mjs tests/hci/fixtures/<kod>-fail.html --json --out /tmp/hci-probe
   ```

3. `report.json` içindeki `results.<E>` alanlarına bakıp `ok:false` kodlarının tam kümesini
   `expected.json`'a yaz. Kaçınılmaz bir çakışma varsa `note` alanında gerekçelendir.
4. `node tests/hci/run.mjs --only <kod>` ile doğrula; sonra tam seti çalıştır.

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
(`FEZA_UI_CHECK_NO_INSTALL=1`). Yerelde tam set ~3 dakikadır (`--jobs 2`); CI'da kurulum dahil tahmini
süre 10 dakikanın altında kaldığı için iş ana `ci.yml`'e konmuştur, ayrı bir workflow'a taşınmamıştır.
Süre büyürse iş `.github/workflows/hci-fixtures.yml` olarak `workflow_dispatch` + haftalık `schedule`
ile ayrılabilir.

## Doğrulama kapısı bağlantısı

Fix modu (`shared/packages/feza-hci/fix-mode.md` §6) düzeltme sonrası ihlal sayısının kesin
azalmasını şart koşar; bu set o kapının regresyon temelidir: `bad.html` birden çok ihlali, `good.html`
sıfır ihlali temsil eder.
