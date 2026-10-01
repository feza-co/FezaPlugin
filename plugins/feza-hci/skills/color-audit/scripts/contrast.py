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

pairs.json biçimi:
    [{"name": "text/bg", "fg": "#1B2430", "bg": "#FFFFFF", "min": 4.5}, ...]

fg/bg değerleri `var(--color-text)` ya da `--color-text` biçimindeyse ve `--css`
verilmişse token değeri CSS'ten çözülür.

Renk biçimleri: #RGB, #RRGGBB, #RRGGBBAA. Alpha varsa önce zemin üzerine
(alpha compositing) karıştırılır, sonra hesaplanır.

Çıkış kodları:
    0  tüm çiftler eşiği geçti (ya da eşik verilmedi)
    1  en az bir çift eşiğin altında
    2  girdi hatası (geçersiz renk, eksik dosya, çözülemeyen token)
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
# Raporlama
# --------------------------------------------------------------------------- #

def _fmt_ratio(ratio):
    return "%.2f:1" % ratio


def _print_table(rows, has_theme):
    if has_theme:
        header = "%-28s %-6s %10s  %-4s  %s" % ("çift", "tema", "oran", "sonuç", "eşik")
    else:
        header = "%-28s %10s  %-4s  %s" % ("çift", "oran", "sonuç", "eşik")
    print(header)
    print("-" * len(header))
    for row in rows:
        verdict = "OK" if row["ok"] else "FAIL"
        threshold = ">= %s" % row["min"] if row["min"] is not None else "-"
        if has_theme:
            print(
                "%-28s %-6s %10s  %-4s  %s"
                % (row["name"], row["theme"] or "-", _fmt_ratio(row["ratio"]), verdict, threshold)
            )
        else:
            print(
                "%-28s %10s  %-4s  %s"
                % (row["name"], _fmt_ratio(row["ratio"]), verdict, threshold)
            )


def _build_row(name, fg, bg, minimum, theme, tokens):
    fg_val = to_color_value(fg, tokens) if tokens is not None else fg
    bg_val = to_color_value(bg, tokens) if tokens is not None else bg
    ratio = contrast_ratio(fg_val, bg_val)
    ok = True if minimum is None else ratio >= minimum
    return {
        "name": name,
        "theme": theme,
        "fg": fg_val,
        "bg": bg_val,
        "ratio": ratio,
        "min": minimum,
        "ok": ok,
    }


def _load_pairs(path):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
    except OSError as exc:
        raise ColorError("pairs dosyası okunamadı: %s (%s)" % (path, exc))
    except json.JSONDecodeError as exc:
        raise ColorError("pairs JSON geçersiz: %s (%s)" % (path, exc))
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


def main(argv=None):
    parser = argparse.ArgumentParser(
        description="WCAG 2.1 kontrast oranı hesaplayıcısı",
        add_help=True,
    )
    parser.add_argument("colors", nargs="*", help="ön plan ve zemin renkleri (#RRGGBB)")
    parser.add_argument("--pairs", help="çiftleri içeren JSON dosyası")
    parser.add_argument("--css", help="token tanımlarını okuyacak CSS dosyası")
    parser.add_argument(
        "--theme",
        choices=["light", "dark", "both"],
        default="both",
        help="CSS token teması (varsayılan: both)",
    )
    parser.add_argument("--min", type=float, default=None, help="tek çift için eşik")
    parser.add_argument("--json", action="store_true", help="sonucu JSON olarak yazdır")
    args = parser.parse_args(argv)

    try:
        tokens = load_css_tokens(args.css) if args.css else None
    except ColorError as exc:
        print("Hata: %s" % exc, file=sys.stderr)
        return 2

    try:
        if args.pairs:
            if args.colors:
                raise ColorError("--pairs ile konumsal renk birlikte kullanılamaz")
            pairs = _load_pairs(args.pairs)
            themes = ["light", "dark"] if (tokens and args.theme == "both") else [args.theme]
            if not tokens:
                themes = [None]
            rows = []
            for theme in themes:
                theme_tokens = tokens[theme] if tokens and theme else None
                for pair in pairs:
                    rows.append(
                        _build_row(
                            pair["name"],
                            pair["fg"],
                            pair["bg"],
                            pair["min"],
                            theme,
                            theme_tokens,
                        )
                    )
        else:
            if len(args.colors) != 2:
                raise ColorError(
                    "iki renk gerekli: contrast.py <fg> <bg> (ya da --pairs dosya.json)"
                )
            themes = ["light", "dark"] if (tokens and args.theme == "both") else [args.theme]
            if not tokens:
                themes = [None]
            rows = []
            for theme in themes:
                theme_tokens = tokens[theme] if tokens and theme else None
                rows.append(
                    _build_row(
                        "text/bg",
                        args.colors[0],
                        args.colors[1],
                        args.min,
                        theme,
                        theme_tokens,
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
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        _print_table(rows, has_theme)

    return 1 if any_fail else 0


if __name__ == "__main__":
    sys.exit(main())
