#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ボディーシート商品の画像をスクレイプしてローカル保存し、
articles.jsonのimageUrlをローカルパスに更新する
"""
import json
import urllib.request
import urllib.parse
import ssl
import os
import time
from html.parser import HTMLParser

ssl._create_default_https_context = ssl._create_unverified_context

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
    'Referer': 'https://www.rakuten.co.jp/',
}

IMG_DIR = 'public/images/products'
os.makedirs(IMG_DIR, exist_ok=True)

class RakutenImgParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
        self.item_links = []
        
    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'img' and 'src' in attr_dict:
            src = attr_dict['src']
            if 'thumbnail.image.rakuten.co.jp' in src or ('shop.r10s.jp' in src and '.jpg' in src):
                self.images.append(src)
        if tag == 'a' and 'href' in attr_dict:
            href = attr_dict['href']
            if 'item.rakuten.co.jp' in href and href not in self.item_links:
                self.item_links.append(href.split('?')[0])

def search_rakuten(keyword):
    """楽天検索から最初の商品の画像URLとアフィリエイトリンクを取得"""
    encoded = urllib.parse.quote(keyword)
    url = f"https://search.rakuten.co.jp/search/mall/{encoded}/"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as r:
            html = r.read().decode('utf-8', errors='ignore')
        parser = RakutenImgParser()
        parser.feed(html)
        img_url = parser.images[0] if parser.images else None
        item_url = parser.item_links[0] if parser.item_links else None
        return img_url, item_url
    except Exception as e:
        print(f"  Error fetching {keyword}: {e}")
        return None, None

def download_image(url, filename):
    """画像をダウンロードしてローカル保存"""
    local_path = os.path.join(IMG_DIR, filename)
    if os.path.exists(local_path) and os.path.getsize(local_path) > 5000:
        print(f"  Already exists: {filename}")
        return f"/images/products/{filename}"
    
    try:
        # サイズを大きくする
        dl_url = url.split('?')[0]
        req = urllib.request.Request(dl_url, headers={**HEADERS, 'Referer': 'https://search.rakuten.co.jp/'})
        with urllib.request.urlopen(req, timeout=10) as r:
            data = r.read()
        with open(local_path, 'wb') as f:
            f.write(data)
        print(f"  Saved: {filename} ({len(data)} bytes)")
        return f"/images/products/{filename}"
    except Exception as e:
        print(f"  Download failed {filename}: {e}")
        return None

AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583"

BODYSHEET_SEARCHES = {
    "art-bodysheet-01": ("ビオレ さらさらパウダーシート", "biore_powder_sheet.jpg"),
    "art-bodysheet-02": ("ギャツビー アイスデオドラント ボディペーパー", "gatsby_ice_body.jpg"),
    "art-bodysheet-03": ("エージーデオ24 クリアシャワーシート", "agdeo24_clear_sheet.jpg"),
    "art-bodysheet-04": ("SABON リフレッシング ワイプス", "sabon_wipes.jpg"),
    "art-bodysheet-05": ("キュレル スキンケア汗ふきシート", "curel_ase_sheet.jpg"),
    "art-bodysheet-06": ("シーブリーズ ボディシート", "seabreeze_body_sheet.jpg"),
    "art-bodysheet-07": ("メンソレータム ミーオ ビタミンC ボディシート", "mentholatum_meo_sheet.jpg"),
    "art-bodysheet-08": ("ビオレZ さらさらさっぱりシート", "biorез_sarasara.jpg"),
    "art-bodysheet-09": ("無印良品 汗ふきシート", "muji_ase_sheet.jpg"),
    "art-bodysheet-10": ("清潔感 除菌 ボディウエットシート", "clearclean_body_wipe.jpg"),
}

def main():
    with open('src/data/articles.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)
    
    updated = 0
    for art in articles:
        if art['id'] not in BODYSHEET_SEARCHES:
            continue
        keyword, filename = BODYSHEET_SEARCHES[art['id']]
        print(f"\n[{art['id']}] Searching: {keyword}")
        
        img_url, item_url = search_rakuten(keyword)
        
        if img_url:
            local = download_image(img_url, filename)
            if local:
                art['imageUrl'] = local
                updated += 1
        
        if item_url:
            encoded_item = urllib.parse.quote(item_url, safe='')
            aff_link = f"https://hb.afl.rakuten.co.jp/hgc/{AFFILIATE_ID}/?pc={encoded_item}"
            art['affiliateLink'] = aff_link
            print(f"  Affiliate: {aff_link[:80]}...")
        
        time.sleep(0.8)  # rate limit
    
    with open('src/data/articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    
    print(f"\nDone! Updated {updated} articles.")

if __name__ == '__main__':
    main()
