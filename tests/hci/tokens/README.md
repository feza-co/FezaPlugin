# DTCG token kabul testi (Faz 7)

`plugins/feza-hci/skills/hci-execute/scripts/contrast.py` betiğinin DTCG
(Design Tokens Community Group, Format Module 2025.10) token dosyası desteğini
doğrulayan örnekler. Amaç: **aynı değerleri taşıyan** bir DTCG dosyası
(`*.tokens.json`) ile bir CSS token dosyası (`--color-...`) aynı kontrast
oranlarını vermelidir.

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `sample.tokens.json` | DTCG örnek: `$type` kalıtımı, `$description`, `$deprecated`, alias `{color.primary}`, yapısal renk nesnesi (srgb), srgb dışı colorSpace + `hex`, renk dışı türler |
| `sample.css` | `sample.tokens.json` ile **aynı** değerleri taşıyan `:root{--color-...}` tanımları |
| `sample-dark.tokens.json` | İsteğe bağlı koyu tema geçersiz kılma (`--tokens-dark`) |
| `pairs.json` | Aynı çift listesi (`{"pairs": [...]}` sarmalı; CSS değişkeni biçiminde, DTCG tarafında da kabul edilir) |
| `cyclic.tokens.json` | Döngülü alias örneği; çıkış kodu 2 beklenir |

## Nasıl çalıştırılır

Betik, bu dosyadan göreli olarak şu yolla çağrılır
(`<repo>/plugins/feza-hci/skills/hci-execute/scripts/contrast.py`):

```bash
# DTCG token dosyası
python ../../../plugins/feza-hci/skills/hci-execute/scripts/contrast.py \
  --tokens sample.tokens.json --pairs pairs.json --json

# Aynı değerleri taşıyan CSS token dosyası
python ../../../plugins/feza-hci/skills/hci-execute/scripts/contrast.py \
  --css sample.css --pairs pairs.json --json
```

İki çıktıdaki `results[].ratio` değerleri **birebir eşit** olmalıdır:

```bash
python ../../../plugins/feza-hci/skills/hci-execute/scripts/contrast.py \
  --tokens sample.tokens.json --pairs pairs.json --json > /tmp/t.json 2>/dev/null
python ../../../plugins/feza-hci/skills/hci-execute/scripts/contrast.py \
  --css sample.css --pairs pairs.json --json > /tmp/c.json
python -c "import json;a=json.load(open('/tmp/t.json'));b=json.load(open('/tmp/c.json'));\
print(all(abs(x['ratio']-y['ratio'])<1e-12 for x,y in zip(a['results'],b['results'])))"
# -> True
```

## Diğer kontroller

```bash
# Koyu tema geçersiz kılma (light + dark iki geçiş)
python ../../../plugins/feza-hci/skills/hci-execute/scripts/contrast.py \
  --tokens sample.tokens.json --tokens-dark sample-dark.tokens.json --pairs pairs.json

# Döngülü alias -> çıkış kodu 2 ("alias döngüsü: ...")
python ../../../plugins/feza-hci/skills/hci-execute/scripts/contrast.py \
  --tokens cyclic.tokens.json --pairs pairs.json
echo $?   # -> 2
```

`pairs.json` içinde `fg`/`bg` için üç biçim de kabul edilir:

- DTCG referansı: `{color.text}`
- DTCG noktalı yol: `color.text`
- CSS değişkeni: `--color-text` ya da `var(--color-text)`

Aynı `pairs.json`'ın her iki token kaynağıyla da çalışabilmesi için dosyada CSS
değişkeni biçimi kullanılmıştır. `contrast.py` hem düz liste (`[...]`) hem de
`{"pairs": [...]}` sarmalını kabul eder (sarmal, depodaki `validate.py` JSON kökünün
obje olması kuralıyla uyumludur).

## Desteklenen DTCG alt kümesi

`contrast.py --help` çıktısında da yazılıdır: **color, dimension, duration,
cubicBezier, shadow, typography**. Diğer türler (ör. `fontFamily`) kapsam
dışıdır; ayrıştırılır ama kontrast hesabına girmez. Renk dışı türler token
olarak tanınır, yalnız `ok:null` durumunda değil, hiç sonuç satırı üretmez.
