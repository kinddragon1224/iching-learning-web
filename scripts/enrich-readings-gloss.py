#!/usr/bin/env python3
import json
import re
import time
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORPUS = ROOT / "data" / "hexagram_corpus.generated.json"
UNIHAN_ZIP = ROOT / "data" / "Unihan.zip"
UNIHAN_URL = "https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip"


def ensure_unihan_zip():
    if UNIHAN_ZIP.exists():
        return
    print("[enrich] downloading Unihan.zip ...")
    UNIHAN_ZIP.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(UNIHAN_URL, timeout=30) as r:
        UNIHAN_ZIP.write_bytes(r.read())


def load_hangul_map():
    ensure_unihan_zip()
    m = {}
    with zipfile.ZipFile(UNIHAN_ZIP) as z:
        text = z.read("Unihan_Readings.txt").decode("utf-8", "ignore").splitlines()
    for ln in text:
        if "\tkHangul\t" not in ln:
            continue
        cp, _, val = ln.split("\t", 2)
        # ex) 잠:0E  or 가,각:0A
        first = val.split()[0].split(",")[0].split(":")[0].strip()
        if not first:
            continue
        ch = chr(int(cp[2:], 16))
        m[ch] = first
    return m


def hanja_to_reading_ko(text, cmap):
    if not text:
        return ""
    out = []
    for ch in text:
        if ch in cmap:
            out.append(cmap[ch])
        elif ch in "，。；：、！？":
            out.append({"，": ", ", "。": ". ", "；": "; ", "：": ": ", "、": ", ", "！": "! ", "？": "? "}[ch])
        elif ch in "（）()《》「」『』":
            # skip heavy brackets in reading line
            continue
        elif re.match(r"\s", ch):
            out.append(" ")
        else:
            # keep non-hanja char minimally
            out.append(ch)
    s = "".join(out)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def tr_en(text, cache):
    t = (text or "").strip()
    if not t:
        return ""
    if t in cache:
        return cache[t]
    url = (
        "https://translate.googleapis.com/translate_a/single?client=gtx"
        "&sl=zh-CN&tl=en&dt=t&q=" + urllib.parse.quote(t)
    )
    try:
        with urllib.request.urlopen(url, timeout=12) as r:
            arr = json.loads(r.read().decode("utf-8", "ignore"))
        out = "".join(seg[0] for seg in arr[0]).strip()
    except Exception:
        out = ""
    cache[t] = out
    time.sleep(0.03)
    return out


def main():
    data = json.loads(CORPUS.read_text(encoding="utf-8"))
    cmap = load_hangul_map()
    cache = {}

    for h in data.get("hexagrams", []):
        g = h.get("gua_text", {})
        original = g.get("original", "")
        g["reading_ko"] = hanja_to_reading_ko(original, cmap)
        g["gloss_en"] = tr_en(original, cache)
        h["gua_text"] = g

        for line in h.get("lines", []):
            o = line.get("original", "")
            line["reading_ko"] = hanja_to_reading_ko(o, cmap)
            line["gloss_en"] = tr_en(o, cache)

    meta = data.get("meta", {})
    meta["enrichedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    meta["enrichment"] = "kHangul-reading + gtx-en-gloss"
    data["meta"] = meta

    CORPUS.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[enrich] done. cache={len(cache)}")


if __name__ == "__main__":
    main()
