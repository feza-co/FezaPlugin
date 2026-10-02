#!/usr/bin/env python3
"""WCAG 2.1 kontrast oranı hesaplayıcısı (yalnız Python standart kütüphanesi).

Göreli parlaklık formülü `references/design-system-rules.md` 2.4 ile aynıdır:
    C_lin = C / 12.92                      (C <= 0.04045)
    C_lin = ((C + 0.055) / 1.055) ** 2.4   (aksi hâlde)
    L = 0.2126*R_lin + 0.7152*G_lin + 0.0722*B_lin
    oran = (L_açık + 0.05) / (L_koyu + 0.05)

Oran yuvarlanmaz; karşılaştırma ham değerle yapılır. Ekrana 2 ondalık yazılır.

Kullanım:
    # Tek çift (eşiksiz)
    python contrast.py "#1B2430" "#FFFFFF"

    # Tek çift, eşik altıysa çıkış kodu 1
    python contrast.py "#1B2430" "#FFFFFF" --min 4.5

    # JSON dosyasındaki çiftler (tablo)
    python contrast.py --pairs pairs.json

    # CSS token dosyasından çözerek (açık/koyu tema)
    python contrast.py --css styles/tokens.css --pairs pairs.json
    python contrast.py --css styles/tokens.css --pairs pairs.json --theme dark
    python contrast.py --css styles/tokens.css --pairs pairs.json --json

    # DTCG tasarım token dosyasından çözerek (tek tema ya da açık/koyu tema)
    python contrast.py --tokens styles/tokens.tokens.json --pairs pairs.json --json
    python contrast.py --tokens light.tokens.json --tokens-dark dark.tokens.json --pairs pairs.json

pairs.json biçimi (düz liste ya da {"pairs": [...]} sarmalı):
    [{"name": "text/bg", "fg": "#1B2430", "bg": "#FFFFFF", "min": 4.5}, ...]

fg/bg değerleri `var(--color-text)` ya da `--color-text` biçimindeyse ve `--css`
verilmişse token değeri CSS'ten çözülür. `--tokens` verilmişse `{color.text}` ya da
`color.text` biçimindeki DTCG token referansı çözülür.

Renk biçimleri: #RGB, #RRGGBB, #RRGGBBAA. Alpha varsa önce zemin üzerine
(alpha compositing) karıştırılır, sonra hesaplanır.

APCA (isteğe bağlı `--apca`):
    `--apca` verilirse her çifte APCA-W3 (SAPC-8, sürüm 0.0.98G-4g) uyumlu Lc
    bilgi sütunu eklenir (`apca_lc`, tabloda "APCA Lc"). APCA **karşılaştırma
    değil bilgi** amaçlıdır: eşik karşılaştırmasına girmez, çıkış kodunu
    etkilemez ve işaret duyarlıdır (koyu metin/açık zemin pozitif, açık
    metin/koyu zemin negatif Lc). Sabitler ve formül Myndex/apca-w3 deposundan
    (SAPC-8 0.0.98G-4g) alınmıştır. Referans: #000/#fff ≈ +106, #fff/#000 ≈ −108.
    `--apca` olmadan çıktı birebir eskisi gibidir (geriye uyumlu).

DTCG desteği (Design Tokens Community Group, Format Module 2025.10):
    - Grup/token ayrımı: `$value` taşıyan düğüm token'dır.
    - `$type` gruptan kalıtılır; `$description` ve `$deprecated` okunur
      (`$deprecated` kullanılan token için uyarı yazılır).
    - Alias `{color.primary}` çözülür; döngü tespit edilirse çıkış kodu 2.
    - Renk değeri string hex ya da DTCG yapısal renk nesnesi olabilir:
      `{"colorSpace":"srgb","components":[r,g,b],"alpha":a,"hex":"#..."}`.
      srgb dışı colorSpace'te `hex` alanı kullanılır; yoksa çıkış kodu 2.
    - Desteklenen alt küme: color, dimension, duration, cubicBezier, shadow,
      typography. Diğer türler "kapsam dışı"dır: ayrıştırılır ama kontrast
      hesabına girmez.

Çıkış kodları:
    0  tüm çiftler eşiği geçti (ya da eşik verilmedi)
    1  en az bir çift eşiğin altında
    2  girdi hatası (geçersiz renk, eksik dosya, çözülemeyen token, alias döngüsü)
"""

from __future__ import annotations

import argparse
import json
import re
import sys

# --------------------------------------------------------------------------- #
# Renk ayrıştırma ve kontrast
# --------------------------------------------------------------------------- #

_HEX_RE = re.compile(r"^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$")


class ColorError(ValueError):
    """Geçersiz renk değeri."""


def parse_color(value):
    """'#RGB' | '#RRGGBB' | '#RRGGBBAA' -> (r, g, b, a) 0..1 float."""
    if value is None:
        raise ColorError("renk değeri boş")
    s = value.strip()
    m = _HEX_RE.match(s)
    if not m:
        raise ColorError(
            "geçersiz renk: %r (beklenen #RGB, #RRGGBB veya #RRGGBBAA)" % value
        )
    h = m.group(1)
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    r = int(h[0:2], 16) / 255.0
    g = int(h[2:4], 16) / 255.0
    b = int(h[4:6], 16) / 255.0
    a = int(h[6:8], 16) / 255.0 if len(h) == 8 else 1.0
    return (r, g, b, a)


def _over(fg, bg):
    """fg'yi opak bg üzerine alpha compositing ile bindir."""
    fr, fg_, fb, fa = fg
    br, bg_, bb = bg[:3]
    return (
        fa * fr + (1.0 - fa) * br,
        fa * fg_ + (1.0 - fa) * bg_,
        fa * fb + (1.0 - fa) * bb,
        1.0,
    )


def _opaque(color, fallback=(1.0, 1.0, 1.0)):
    """Alpha < 1 ise beyaz üzerine bindirerek opak renk elde et."""
    r, g, b, a = color
    if a >= 1.0:
        return (r, g, b, 1.0)
    return _over(color, fallback)


def _channel_lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(rgb):
    """0..1 kanallarından WCAG göreli parlaklık."""
    r, g, b = rgb[0], rgb[1], rgb[2]
    return (
        0.2126 * _channel_lin(r)
        + 0.7152 * _channel_lin(g)
        + 0.0722 * _channel_lin(b)
    )


def contrast_ratio(fg_value, bg_value):
    """İki renk değeri için ham (yuvarlanmamış) kontrast oranı."""
    fg = parse_color(fg_value)
    bg = parse_color(bg_value)
    bg_opaque = _opaque(bg)
    fg_opaque = _over(fg, bg_opaque) if fg[3] < 1.0 else fg
    l1 = relative_luminance(fg_opaque)
    l2 = relative_luminance(bg_opaque)
    hi, lo = (l1, l2) if l1 >= l2 else (l2, l1)
    return (hi + 0.05) / (lo + 0.05)


# --------------------------------------------------------------------------- #
# APCA-W3 (SAPC-8, 0.0.98G-4g) — isteğe bağlı bilgi sütunu
# --------------------------------------------------------------------------- #
#
# Kaynak: https://github.com/Myndex/apca-w3 (src/apca-w3.js), SAPC-8 0.0.98G-4g
# sabitleri ve sRGBtoY/APCAcontrast formülü birebir uygulanır. Lc işaret
# duyarlıdır: koyu metin / açık zemin pozitif, açık metin / koyu zemin negatif.
# Bağlayıcı değildir; eşik karşılaştırmasına girmez.

_APCA_MAIN_TRC = 2.4
_APCA_SR = 0.2126729
_APCA_SG = 0.7151522
_APCA_SB = 0.0721750
_APCA_NORM_BG = 0.56
_APCA_NORM_TXT = 0.57
_APCA_REV_TXT = 0.62
_APCA_REV_BG = 0.65
_APCA_BLK_THRS = 0.022
_APCA_BLK_CLMP = 1.414
_APCA_SCALE_BOW = 1.14
_APCA_SCALE_WOB = 1.14
_APCA_LO_BOW_OFFSET = 0.027
_APCA_LO_WOB_OFFSET = 0.027
_APCA_DELTA_Y_MIN = 0.0005
_APCA_LO_CLIP = 0.1


def apca_y(rgb):
    """sRGB 0..1 kanallarından APCA parlaklığı (Y), 2.4 üs ile."""
    r, g, b = rgb[0], rgb[1], rgb[2]
    return (
        _APCA_SR * (r ** _APCA_MAIN_TRC)
        + _APCA_SG * (g ** _APCA_MAIN_TRC)
        + _APCA_SB * (b ** _APCA_MAIN_TRC)
    )


def apca_contrast(txt_y, bg_y):
    """APCA Lc (işaretli). Kaynak fonksiyonuyla aynı adımlar."""
    txt_y = (
        txt_y
        if txt_y > _APCA_BLK_THRS
        else txt_y + (_APCA_BLK_THRS - txt_y) ** _APCA_BLK_CLMP
    )
    bg_y = (
        bg_y
        if bg_y > _APCA_BLK_THRS
        else bg_y + (_APCA_BLK_THRS - bg_y) ** _APCA_BLK_CLMP
    )
    if abs(bg_y - txt_y) < _APCA_DELTA_Y_MIN:
        return 0.0
    if bg_y > txt_y:  # normal polarite: koyu metin / açık zemin
        sapc = (bg_y ** _APCA_NORM_BG - txt_y ** _APCA_NORM_TXT) * _APCA_SCALE_BOW
        output = 0.0 if sapc < _APCA_LO_CLIP else sapc - _APCA_LO_BOW_OFFSET
    else:  # ters polarite: açık metin / koyu zemin
        sapc = (bg_y ** _APCA_REV_BG - txt_y ** _APCA_REV_TXT) * _APCA_SCALE_WOB
        output = 0.0 if sapc > -_APCA_LO_CLIP else sapc + _APCA_LO_WOB_OFFSET
    return output * 100.0


def apca_lc(fg_value, bg_value):
    """İki renk değeri (fg, bg) için APCA Lc bilgi değeri (işaretli)."""
    fg = parse_color(fg_value)
    bg = parse_color(bg_value)
    bg_opaque = _opaque(bg)
    fg_opaque = _over(fg, bg_opaque) if fg[3] < 1.0 else fg
    return apca_contrast(apca_y(fg_opaque), apca_y(bg_opaque))


# --------------------------------------------------------------------------- #
# CSS token çözümleme
# --------------------------------------------------------------------------- #

_VAR_NAME_RE = re.compile(r"^--[A-Za-z0-9_-]+$")
_VAR_USE_RE = re.compile(r"^var\(\s*(--[A-Za-z0-9_-]+)\s*(?:,\s*(.*))?\)$")


def _strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def _parse_blocks(css, dark=False):
    """CSS'i (selector, koyu_bayrağı, gövde) üçlülerine ayırır (özyinelemeli)."""
    out = []
    i = 0
    n = len(css)
    while i < n:
        j = css.find("{", i)
        if j == -1:
            break
        header = css[i:j].strip()
        depth = 1
        k = j + 1
        while k < n and depth:
            ch = css[k]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
            k += 1
        body = css[j + 1 : k - 1]
        low = header.lower()
        if low.startswith("@media"):
            flat = low.replace("\n", " ")
            is_dark = "prefers-color-scheme" in flat and "dark" in flat
            out.extend(_parse_blocks(body, dark=dark or is_dark))
        elif low.startswith("@"):
            # @supports, @layer vb.: içindeki blokları yine de tara
            out.extend(_parse_blocks(body, dark=dark))
        else:
            out.append((header, dark, body))
        i = k
    return out


def _parse_decls(body):
    decls = {}
    for part in body.split(";"):
        if ":" not in part:
            continue
        key, val = part.split(":", 1)
        key = key.strip()
        val = val.strip()
        if _VAR_NAME_RE.match(key) and val:
            decls[key] = val
    return decls


def _selector_is_dark(sel):
    s = sel.lower()
    return (
        'data-theme="dark"' in s
        or "data-theme='dark'" in s
        or re.search(r"data-theme\s*=\s*dark", s) is not None
    )


def load_css_tokens(css_path):
    """CSS dosyasından {'light': {...}, 'dark': {...}} token sözlükleri."""
    try:
        with open(css_path, "r", encoding="utf-8") as fh:
            css = fh.read()
    except OSError as exc:
        raise ColorError("CSS okunamadı: %s (%s)" % (css_path, exc))

    css = _strip_comments(css)
    light = {}
    dark_over = {}
    for selector, in_dark_media, body in _parse_blocks(css):
        decls = _parse_decls(body)
        if not decls:
            continue
        if _selector_is_dark(selector):
            dark_over.update(decls)
        elif in_dark_media:
            dark_over.update(decls)
        elif ":root" in selector:
            light.update(decls)

    dark = dict(light)
    dark.update(dark_over)
    return {"light": light, "dark": dark}


def _resolve_var(name, tokens, _seen=None):
    """var() zincirini çözer; bulunamazsa None döner."""
    if name not in tokens:
        return None
    seen = set() if _seen is None else _seen
    if name in seen:
        return None
    seen.add(name)
    val = tokens[name].strip()
    m = _VAR_USE_RE.match(val)
    if m:
        inner = _resolve_var(m.group(1), tokens, seen)
        if inner is not None:
            return inner
        if m.group(2) is not None:
            return m.group(2).strip()
        return None
    return val


def to_color_value(raw, tokens):
    """Pair değerini gerçek renk değerine çevir (gerekirse token çözer)."""
    v = (raw or "").strip()
    m = _VAR_USE_RE.match(v)
    if m:
        resolved = _resolve_var(m.group(1), tokens)
        if resolved is None:
            if m.group(2) is not None:
                return m.group(2).strip()
            raise ColorError("token çözülemedi: %s" % m.group(1))
        return resolved
    if _VAR_NAME_RE.match(v):
        resolved = _resolve_var(v, tokens)
        if resolved is None:
            raise ColorError("token çözülemedi: %s" % v)
        return resolved
    return v


# --------------------------------------------------------------------------- #
# DTCG tasarım token çözümleme (Design Tokens Community Group 2025.10)
# --------------------------------------------------------------------------- #

# Desteklenen DTCG $type alt kümesi (color, dimension, duration, cubicBezier,
# shadow, typography) help metninde ve `tests/hci/tokens/README.md`'de listelenir.
# Renk dışı türler ayrıştırılır ama kontrast hesabına girmez.

MAX_ALIAS_DEPTH = 32

_DTCG_BRACE_RE = re.compile(r"^\{\s*([^{}]+?)\s*\}$")
_DTCG_PATH_RE = re.compile(r"^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)+$")


def _dtcg_brace_ref(value):
    """Yalnız `{color.text}` (süslü parantezli) DTCG alias adını döndürür."""
    if not isinstance(value, str):
        return None
    m = _DTCG_BRACE_RE.match(value)
    if m:
        return m.group(1).strip()
    return None


def _dtcg_ref_name(value):
    """`{color.text}` ya da `color.text` biçimindeki DTCG referans adını döndürür.

    Süslü parantezli biçim her yerde geçerlidir; noktalı çıplak biçim yalnız
    `--pairs` fg/bg alanlarında kabul edilir (token değerlerinde `1.5rem` gibi
    ondalıklı bir değerin yanlışlıkla alias sayılmasını önlemek için).
    """
    brace = _dtcg_brace_ref(value)
    if brace is not None:
        return brace
    if _DTCG_PATH_RE.match(value):
        return value
    return None


def _bytes_from_components(components):
    if not isinstance(components, list) or len(components) != 3:
        raise ColorError("DTCG renk bileşenleri [r, g, b] olmalı")
    out = []
    for c in components:
        if isinstance(c, bool) or not isinstance(c, (int, float)):
            raise ColorError("DTCG renk bileşeni sayı olmalı: %r" % (c,))
        v = min(max(float(c), 0.0), 1.0)
        out.append(int(round(v * 255)))
    return out


def _hex_from_components(components, alpha):
    r, g, b = _bytes_from_components(components)
    if alpha is not None and not isinstance(alpha, bool) and isinstance(alpha, (int, float)):
        a = min(max(float(alpha), 0.0), 1.0)
        if a < 1.0:
            return "#%02X%02X%02X%02X" % (r, g, b, int(round(a * 255)))
    return "#%02X%02X%02X%02X" % (r, g, b, 255)


def _color_from_dtcg(value):
    """DTCG color değerini (#RRGGBB / #RRGGBBAA) hex stringine çevirir.

    String hex ya da yapısal renk nesnesi kabul edilir. srgb dışı colorSpace'te
    `hex` alanı varsa o kullanılır, yoksa desteklenmiyor hatası verilir.
    """
    if isinstance(value, str):
        if _HEX_RE.match(value.strip()):
            v = value.strip()
            return v if v.startswith("#") else "#" + v
        raise ColorError("desteklenmeyen DTCG renk değeri: %r" % value)
    if isinstance(value, dict):
        space = value.get("colorSpace")
        hex_value = value.get("hex")
        if space == "srgb":
            if "components" in value:
                return _hex_from_components(value.get("components"), value.get("alpha"))
            if isinstance(hex_value, str) and _HEX_RE.match(hex_value.strip()):
                v = hex_value.strip()
                return v if v.startswith("#") else "#" + v
            raise ColorError("srgb DTCG renk: components ya da hex yok")
        if isinstance(hex_value, str) and _HEX_RE.match(hex_value.strip()):
            v = hex_value.strip()
            return v if v.startswith("#") else "#" + v
        raise ColorError(
            "desteklenmeyen colorSpace: %r (hex yok)" % (space,)
        )
    raise ColorError("desteklenmeyen DTCG renk değeri: %r" % (value,))


def _walk_dtcg(node, path_parts, inherited_type, out):
    """DTCG ağacını gezip token'ları path -> {value, type} sözlüğüne toplar."""
    if not isinstance(node, dict):
        raise ColorError("DTCG düğümü nesne değil: %s" % (".".join(path_parts) or "<kök>"))
    node_type = node.get("$type", inherited_type)
    if "$value" in node:
        name = ".".join(path_parts)
        out[name] = {
            "value": node["$value"],
            "type": node_type,
            "deprecated": node.get("$deprecated"),
            "description": node.get("$description"),
        }
        return
    for key, child in node.items():
        if key.startswith("$"):
            continue
        _walk_dtcg(child, path_parts + [key], node_type, out)


def _resolve_dtcg_alias(name, tokens, stack):
    """Alias zincirini çözer; döngü ya da derinlik aşımında ColorError verir."""
    if len(stack) > MAX_ALIAS_DEPTH:
        raise ColorError("alias derinlik sınırı aşıldı (%d): %s" % (MAX_ALIAS_DEPTH, name))
    if name in stack:
        chain = " -> ".join(stack + [name])
        raise ColorError("alias döngüsü: %s" % chain)
    tok = tokens.get(name)
    if tok is None:
        raise ColorError("DTCG token bulunamadı: %s" % name)
    val = tok["value"]
    ref = _dtcg_brace_ref(val)
    if ref is not None:
        resolved, resolved_type = _resolve_dtcg_alias(
            ref, tokens, stack + [name]
        )
        return resolved, tok.get("type") or resolved_type
    return val, tok.get("type")


def load_dtcg_tokens(path):
    """DTCG JSON dosyasından {'light': {path: renk}} döndürür.

    Alias'lar çözülür; renk türündeki token'lar hex stringine indirgenir. Renk
    dışı (dimension, duration, cubicBezier, shadow, typography ve kapsam dışı
    türler) token'lar ayrıştırılır ama sonuç sözlüğüne girmez. `$deprecated`
    token'lar için stderr'e uyarı yazılır.
    """
    try:
        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
    except OSError as exc:
        raise ColorError("DTCG dosyası okunamadı: %s (%s)" % (path, exc))
    except json.JSONDecodeError as exc:
        raise ColorError("DTCG JSON geçersiz: %s (%s)" % (path, exc))
    if not isinstance(data, dict):
        raise ColorError("DTCG kökü nesne olmalı: %s" % path)

    raw = {}
    _walk_dtcg(data, [], None, raw)

    warnings = []
    colors = {}
    for name, tok in raw.items():
        if tok.get("deprecated"):
            warnings.append("$deprecated: %s (%s)" % (name, tok["deprecated"]))
    for name, tok in raw.items():
        ref = _dtcg_brace_ref(tok["value"])
        value, ttype = _resolve_dtcg_alias(name, raw, [])
        if ttype is None:
            ttype = tok.get("type")
        if ref is not None and ttype is None:
            target = _dtcg_brace_ref(raw.get(ref, {}).get("value"))
            ttype = raw.get(ref, {}).get("type")
            if ttype is None and target is not None:
                ttype = raw.get(target, {}).get("type")
        if ttype != "color":
            continue
        colors[name] = _color_from_dtcg(value)

    # Aynı pairs.json'ın CSS ve DTCG kaynaklarıyla paylaşılabilmesi için DTCG
    # yolunu CSS değişkeni biçimine de çevir (`color.text` -> `--color-text`).
    for name, value in list(colors.items()):
        css_name = "--" + name.replace(".", "-")
        colors.setdefault(css_name, value)

    for w in warnings:
        print("Uyarı: %s" % w, file=sys.stderr)
    return {"light": colors}


def merge_dtcg_themes(light_path, dark_path):
    """Açık temel + isteğe bağlı koyu geçersiz kılma ile tema sözlüğü üretir."""
    base = load_dtcg_tokens(light_path)["light"]
    dark = dict(base)
    if dark_path:
        over = load_dtcg_tokens(dark_path)["light"]
        dark.update(over)
    return {"light": base, "dark": dark}


def to_color_value_dtcg(raw, tokens):
    """Pair değerini DTCG token sözlüğünden hex değerine çevirir.

    `{color.text}` ve `color.text` referansları kabul edilir. Ayrıca aynı
    `pairs.json`'ın CSS (`--css`) ile paylaşılabilmesi için CSS değişkeni biçimi
    (`--color-text`, `var(--color-text)`) da kabul edilir; bu adlar DTCG
    yolundan türetilir. Token yoksa hata; referans değilse değer doğrudan renk
    olarak kullanılır.
    """
    v = (raw or "").strip()
    m = _VAR_USE_RE.match(v)
    if m:
        inner = m.group(1)
        if inner in tokens:
            return tokens[inner]
        if m.group(2) is not None:
            return m.group(2).strip()
        raise ColorError("DTCG token bulunamadı: %s" % inner)
    name = _dtcg_ref_name(v)
    if name is not None:
        if name not in tokens:
            raise ColorError("DTCG token bulunamadı: %s" % name)
        return tokens[name]
    if v in tokens:
        return tokens[v]
    return v


# --------------------------------------------------------------------------- #
# Raporlama
# --------------------------------------------------------------------------- #

def _fmt_ratio(ratio):
    return "%.2f:1" % ratio


def _print_table(rows, has_theme, has_apca=False):
    if has_theme:
        header = "%-28s %-6s %10s  %-4s  %s" % ("çift", "tema", "oran", "sonuç", "eşik")
    else:
        header = "%-28s %10s  %-4s  %s" % ("çift", "oran", "sonuç", "eşik")
    if has_apca:
        header += "  %10s" % "APCA Lc"
    print(header)
    print("-" * len(header))
    for row in rows:
        verdict = "OK" if row["ok"] else "FAIL"
        threshold = ">= %s" % row["min"] if row["min"] is not None else "-"
        if has_theme:
            line = "%-28s %-6s %10s  %-4s  %s" % (
                row["name"],
                row["theme"] or "-",
                _fmt_ratio(row["ratio"]),
                verdict,
                threshold,
            )
        else:
            line = "%-28s %10s  %-4s  %s" % (
                row["name"],
                _fmt_ratio(row["ratio"]),
                verdict,
                threshold,
            )
        if has_apca:
            line += "  %10s" % _fmt_apca(row.get("apca_lc"))
        print(line)


def _fmt_apca(lc):
    if lc is None:
        return "-"
    return "%+.1f" % lc


def _build_row(name, fg, bg, minimum, theme, resolver, with_apca=False):
    fg_val = resolver(fg) if resolver is not None else fg
    bg_val = resolver(bg) if resolver is not None else bg
    ratio = contrast_ratio(fg_val, bg_val)
    ok = True if minimum is None else ratio >= minimum
    row = {
        "name": name,
        "theme": theme,
        "fg": fg_val,
        "bg": bg_val,
        "ratio": ratio,
        "min": minimum,
        "ok": ok,
    }
    if with_apca:
        # JSON ile tablo aynı hassasiyette olsun: Lc bir ondalığa yuvarlanır.
        row["apca_lc"] = round(apca_lc(fg_val, bg_val), 1)
    return row


def _load_pairs(path):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
    except OSError as exc:
        raise ColorError("pairs dosyası okunamadı: %s (%s)" % (path, exc))
    except json.JSONDecodeError as exc:
        raise ColorError("pairs JSON geçersiz: %s (%s)" % (path, exc))
    if isinstance(data, dict) and isinstance(data.get("pairs"), list):
        data = data["pairs"]
    if not isinstance(data, list) or not data:
        raise ColorError("pairs JSON boş ya da liste değil: %s" % path)
    pairs = []
    for idx, item in enumerate(data):
        if not isinstance(item, dict):
            raise ColorError("pairs[%d] nesne değil" % idx)
        if "fg" not in item or "bg" not in item:
            raise ColorError("pairs[%d] içinde fg/bg yok" % idx)
        pairs.append(
            {
                "name": str(item.get("name") or "pair-%d" % (idx + 1)),
                "fg": item["fg"],
                "bg": item["bg"],
                "min": item.get("min"),
            }
        )
    return pairs


def _build_resolvers(args):
    """Token kaynağına göre {tema: resolver} ve tema sırasını döndürür.

    CSS ve DTCG aynı anda verilemez. Kaynak yoksa tek tema (None) döner.
    """
    if args.css and (args.tokens or args.tokens_dark):
        raise ColorError("--css ile --tokens birlikte kullanılamaz")
    if args.tokens_dark and not args.tokens:
        raise ColorError("--tokens-dark yalnız --tokens ile kullanılır")

    if args.tokens:
        themes = ["light", "dark"] if args.theme == "both" else [args.theme]
        token_maps = merge_dtcg_themes(args.tokens, args.tokens_dark)
        resolvers = {}
        for theme in themes:
            tmap = token_maps.get(theme, token_maps["light"])
            resolvers[theme] = (
                lambda value, _m=tmap: to_color_value_dtcg(value, _m)
            )
        return themes, resolvers

    if args.css:
        tokens = load_css_tokens(args.css)
        themes = ["light", "dark"] if args.theme == "both" else [args.theme]
        resolvers = {}
        for theme in themes:
            tmap = tokens[theme]
            resolvers[theme] = (
                lambda value, _m=tmap: to_color_value(value, _m)
            )
        return themes, resolvers

    return [None], {None: None}


def main(argv=None):
    parser = argparse.ArgumentParser(
        description=(
            "WCAG 2.1 kontrast oranı hesaplayıcısı (CSS ve DTCG token desteği)"
        ),
        add_help=True,
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "DTCG desteklenen alt küme: color, dimension, duration, cubicBezier, "
            "shadow, typography.\nDiğer türler kapsam dışıdır (ayrıştırılır, kontrast "
            "hesabına girmez).\nRenk değeri string hex ya da yapısal renk nesnesi "
            "olabilir; srgb dışı colorSpace 'hex' ile desteklenir."
        ),
    )
    parser.add_argument("colors", nargs="*", help="ön plan ve zemin renkleri (#RRGGBB)")
    parser.add_argument("--pairs", help="çiftleri içeren JSON dosyası")
    parser.add_argument("--css", help="token tanımlarını okuyacak CSS dosyası")
    parser.add_argument(
        "--tokens",
        help="DTCG tasarım token dosyası (.tokens.json); açık tema temeli",
    )
    parser.add_argument(
        "--tokens-dark",
        help="isteğe bağlı DTCG koyu tema dosyası (açık temayı geçersiz kılar)",
    )
    parser.add_argument(
        "--theme",
        choices=["light", "dark", "both"],
        default="both",
        help="token teması (varsayılan: both)",
    )
    parser.add_argument("--min", type=float, default=None, help="tek çift için eşik")
    parser.add_argument(
        "--apca",
        action="store_true",
        help="APCA-W3 (0.0.98G-4g) Lc bilgi sütunu ekle (bağlayıcı değil, çıkış kodunu etkilemez)",
    )
    parser.add_argument("--json", action="store_true", help="sonucu JSON olarak yazdır")
    args = parser.parse_args(argv)

    try:
        themes, resolvers = _build_resolvers(args)
    except ColorError as exc:
        print("Hata: %s" % exc, file=sys.stderr)
        return 2

    try:
        if args.pairs:
            if args.colors:
                raise ColorError("--pairs ile konumsal renk birlikte kullanılamaz")
            pairs = _load_pairs(args.pairs)
            rows = []
            for theme in themes:
                resolver = resolvers[theme]
                for pair in pairs:
                    rows.append(
                        _build_row(
                            pair["name"],
                            pair["fg"],
                            pair["bg"],
                            pair["min"],
                            theme,
                            resolver,
                            args.apca,
                        )
                    )
        else:
            if len(args.colors) != 2:
                raise ColorError(
                    "iki renk gerekli: contrast.py <fg> <bg> (ya da --pairs dosya.json)"
                )
            rows = []
            for theme in themes:
                resolver = resolvers[theme]
                rows.append(
                    _build_row(
                        "text/bg",
                        args.colors[0],
                        args.colors[1],
                        args.min,
                        theme,
                        resolver,
                        args.apca,
                    )
                )
    except ColorError as exc:
        print("Hata: %s" % exc, file=sys.stderr)
        return 2

    any_fail = any(not row["ok"] for row in rows)
    has_theme = any(row["theme"] for row in rows)

    if args.json:
        payload = {
            "css": args.css,
            "theme": args.theme if has_theme else None,
            "results": rows,
            "ok": not any_fail,
        }
        if args.apca:
            payload["apca"] = True
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        _print_table(rows, has_theme, args.apca)

    return 1 if any_fail else 0


if __name__ == "__main__":
    sys.exit(main())
