#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request, urllib.parse, ssl, re, os, time

ssl._create_default_https_context = ssl._create_unverified_context
HEADERS = {'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36', 'Referer': 'https://www.rakuten.co.jp/'}
AFF = '54d2a438.4bc4abc2.54d2a439.aa1be583'

def search_rakuten(keyword):
    url = 'https://search.rakuten.co.jp/search/mall/' + urllib.parse.quote(keyword) + '/'
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8', 'ignore')
        links = re.findall(r'https://item\.rakuten\.co\.jp/[^/?"\s<>]+/[^/?"\s<>]+/', html)
        unique = []
        for l in links:
            if l not in unique:
                unique.append(l)
        return unique[0] if unique else None
    except Exception as e:
        print(f"Error fetching {keyword}: {e}")
        return None

def make_aff(item_url):
    return f'https://hb.afl.rakuten.co.jp/hgc/{AFF}/?pc={urllib.parse.quote(item_url, safe="")}'

def make_btn(item_url, title):
    aff = make_aff(item_url)
    return f'\n<a href="{aff}" class="affiliate-btn" target="_blank" rel="nofollow noopener">【楽天】{title}の最安値をチェック ▶</a>\n`'

# Products to find
queries = {
    'ipsa': ('イプサ ザ・タイムR アクア', 'イプサ ザ・タイムR アクア'),
    'suqqu': ('SUQQU シグニチャー カラー アイズ', 'SUQQU シグニチャー カラー アイズ'),
    'cledepeau': ('クレ・ド・ポー ボーテ ヴォワールコレクチュール n', 'クレ・ド・ポー ボーテ ヴォワールコレクチュール n')
}

links = {}
for key, (q, title) in queries.items():
    print(f"Searching {q}...")
    url = search_rakuten(q)
    if url:
        links[key] = make_btn(url, title)
        print(f"Found {url}")
    else:
        print(f"Failed {q}")
    time.sleep(1)

with open('src/data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix cover images
text = text.replace("id: 'post-ipsa-aqua',\n    title:", "id: 'post-ipsa-aqua',\n    title:") # dummy to find
text = re.sub(
    r"(id:\s*'post-ipsa-aqua'.*?coverImage:\s*')/images/products/shirojyun_premium\.jpg(')",
    r"\1/images/products/topic_skincare_ipsa.jpg\2",
    text, flags=re.DOTALL
)

text = re.sub(
    r"(id:\s*'post-suqqu-eyeshadow'.*?coverImage:\s*')/images/products/fujiko_mayutint\.jpg(')",
    r"\1/images/products/topic_makeup_suqqu.jpg\2",
    text, flags=re.DOTALL
)

text = re.sub(
    r"(id:\s*'post-cledepeau-base'.*?coverImage:\s*')/images/products/pauljoe_primer\.jpg(')",
    r"\1/images/products/topic_makeup_cledepeau.jpg\2",
    text, flags=re.DOTALL
)

# Append links to the end of contentMarkdown for the 3 posts
# IPSA
if 'ipsa' in links:
    text = re.sub(
        r"(id:\s*'post-ipsa-aqua'.*?限定コットン付きセットなども販売されています。)(`,)",
        r"\1\n\n" + links['ipsa'] + r",",
        text, flags=re.DOTALL
    )

# SUQQU
if 'suqqu' in links:
    text = re.sub(
        r"(id:\s*'post-suqqu-eyeshadow'.*?エントリーして購入するのが最安値への近道です。)(`,)",
        r"\1\n\n" + links['suqqu'] + r",",
        text, flags=re.DOTALL
    )

# Cle de peau
if 'cledepeau' in links:
    text = re.sub(
        r"(id:\s*'post-cledepeau-base'.*?口コミ件数や評価の高い信頼できるショップで購入しましょう。)(`,)",
        r"\1\n\n" + links['cledepeau'] + r",",
        text, flags=re.DOTALL
    )

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updates to src/data.ts complete!")
