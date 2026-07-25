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

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Mappings of original link -> search keyword
link_to_keyword = {
    'https://search.rakuten.co.jp/search/mall/%E3%82%A2%E3%83%8D%E3%83%83%E3%82%B5%20%E3%83%91%E3%83%BC%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88UV%20%E3%82%B9%E3%82%AD%E3%83%B3%E3%82%B1%E3%82%A2%E3%83%9F%E3%83%AB%E3%82%AF%20NA%20(%E9%87%91%E3%83%9F%E3%83%AB%E3%82%AF)/': 'アネッサ パーフェクトUV スキンケアミルク NA',
    'https://www.rakuten.co.jp/s?k=%E3%83%93%E3%82%AA%E3%83%ACUV%20%E3%82%A2%E3%82%AF%E3%82%A2%E3%83%AA%E3%83%83%E3%83%81%20%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%BF%E3%83%AA%E3%83%BC%E3%82%A8%E3%83%83%E3%82%BB%E3%83%B3%E3%82%B9&tag=mattan0290c-22': 'ビオレUV アクアリッチ ウォータリーエッセンス',
    'https://search.rakuten.co.jp/search/mall/%E3%82%B3%E3%82%B9%E3%83%A1%E3%83%87%E3%82%B3%E3%83%AB%E3%83%86%20%E3%83%AA%E3%83%9D%E3%82%BD%E3%83%BC%E3%83%A0%20%E3%82%A2%E3%83%89%E3%83%90%E3%83%B3%E3%82%B9%E3%83%88%20%E3%83%AA%E3%83%9A%E3%82%A2%E3%82%BB%E3%83%A9%E3%83%A0/': 'コスメデコルテ リポソーム アドバンスト リペアセラム',
    'https://search.rakuten.co.jp/search/mall/%E3%82%A2%E3%83%8D%E3%83%83%E3%82%B5%20%E3%83%91%E3%83%BC%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88UV%20%E3%82%B9%E3%82%AD%E3%83%B3%E3%82%B1%E3%82%A2%E3%83%9F%E3%83%AB%E3%82%AF%20NA/': 'アネッサ パーフェクトUV スキンケアミルク NA',
    'https://search.rakuten.co.jp/search/mall/VT%20%E3%83%AA%E3%83%BC%E3%83%89%E3%83%AB%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%20100/': 'VT リードルショット 100',
    # Bodysheet PC URLs inside affiliate tags
    'https://item.rakuten.co.jp/kao/biore-sara-powder/': 'ビオレ さらさらパウダーシート',
    'https://item.rakuten.co.jp/gatsby/gatsby-ice-body-paper/': 'ギャツビー アイスデオドラント ボディペーパー',
    'https://item.rakuten.co.jp/shiseido-cosme/agdeo24-sheet/': 'エージーデオ24 クリアシャワーシート',
    'https://item.rakuten.co.jp/sabon/s0282/': 'SABON リフレッシング ワイプス',
    'https://item.rakuten.co.jp/curel/curel-skincare-sheet/': 'キュレル スキンケア汗ふきシート',
    'https://item.rakuten.co.jp/kenko-lab/seabreeze-bodysheet/': 'シーブリーズ ボディシート',
    'https://item.rakuten.co.jp/rohto/mentholatum-meo-sheet/': 'メンソレータム ミーオ ビタミンC ボディシート',
    'https://item.rakuten.co.jp/kao/biorhez-sheet/': 'ビオレZ さらさらさっぱりシート',
    'https://item.rakuten.co.jp/muji/muji-asesheet/': '無印良品 汗ふきシート',
    'https://item.rakuten.co.jp/kenko-lab/clearclean-body-sheet/': '除菌 ボディウエットシート'
}

for old_link, keyword in link_to_keyword.items():
    print(f"Searching for: {keyword}")
    real_url = search_rakuten(keyword)
    if real_url:
        print(f"Found: {real_url}")
        if 'search.rakuten.co.jp' in old_link or 'www.rakuten.co.jp/s?' in old_link:
            # Replace direct search links with affiliate links
            aff_link = make_aff(real_url)
            content = content.replace(old_link, aff_link)
        else:
            # Replace the inner pc URL for bodysheet items
            content = content.replace(old_link, real_url)
    else:
        print(f"FAILED to find real URL for {keyword}")
    time.sleep(1)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done updating src/data.ts")
