#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
楽天の商品ページからog:image / shop.r10s.jpを使って
全商品の画像とアフィリエイトリンクを完全修正するスクリプト
"""
import urllib.request
import urllib.parse
import ssl
import re
import json
import os
import time

ssl._create_default_https_context = ssl._create_unverified_context

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
    'Referer': 'https://www.rakuten.co.jp/',
}

AFF = '54d2a438.4bc4abc2.54d2a439.aa1be583'
IMG_DIR = 'public/images/products'
os.makedirs(IMG_DIR, exist_ok=True)


def get_html(url):
    req = urllib.request.Request(url, headers=HEADERS)
    return urllib.request.urlopen(req, timeout=15).read().decode('utf-8', 'ignore')


def search_item_url(keyword):
    """楽天検索で最初の個別商品URLを取得"""
    url = 'https://search.rakuten.co.jp/search/mall/' + urllib.parse.quote(keyword) + '/'
    html = get_html(url)
    links = re.findall(r'https://item\.rakuten\.co\.jp/[^/?"\s<>]+/[^/?"\s<>]+/', html)
    unique = []
    for l in links:
        if l not in unique:
            unique.append(l)
    return unique[0] if unique else None


def extract_image(html):
    """商品ページHTMLから実画像URLを抽出"""
    # og:image
    for pattern in [
        r'property="og:image"\s+content="([^"]+)"',
        r"property='og:image'\s+content='([^']+)'",
        r'content="([^"]+)"\s+property="og:image"',
        r"content='([^']+)'\s+property='og:image'",
    ]:
        m = re.search(pattern, html)
        if m and m.group(1).startswith('http'):
            return m.group(1)

    # JSON-LD
    for jld_text in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.DOTALL):
        try:
            d = json.loads(jld_text)
            img = d.get('image', '')
            if isinstance(img, list) and img:
                img = img[0]
            if isinstance(img, str) and img.startswith('http'):
                return img
        except:
            pass

    # shop.r10s.jp
    m = re.search(r'(https://shop\.r10s\.jp[^\s"\'<>&]+\.jpg)', html)
    if m:
        return m.group(1)

    # thumbnail.image.rakuten
    m = re.search(r'(https://thumbnail\.image\.rakuten\.co\.jp[^\s"\'<>&]+\.jpg)', html)
    if m:
        return m.group(1).split('?')[0]

    return None


def download_image(img_url, filename):
    local = os.path.join(IMG_DIR, filename)
    if os.path.exists(local) and os.path.getsize(local) > 20000:
        return f'/images/products/{filename}'
    clean = img_url.split('?')[0]
    data = urllib.request.urlopen(
        urllib.request.Request(clean, headers={**HEADERS, 'Referer': 'https://item.rakuten.co.jp/'}),
        timeout=15
    ).read()
    with open(local, 'wb') as f:
        f.write(data)
    print(f'    IMG: {filename} ({len(data)} bytes)')
    return f'/images/products/{filename}'


def make_aff(item_url):
    return f'https://hb.afl.rakuten.co.jp/hgc/{AFF}/?pc={urllib.parse.quote(item_url, safe="")}'


def main():
    with open('src/data/articles.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    # 修正対象: 空リンク + 検索結果リンク
    targets = [a for a in articles
               if not a.get('affiliateLink') or 'search.rakuten.co.jp' in a.get('affiliateLink', '')]

    print(f'修正対象: {len(targets)} 件\n')

    updated = 0
    failed = []

    for art in targets:
        product_name = art.get('productName') or art.get('title', '')
        display = product_name[:40] + '...' if len(product_name) > 40 else product_name
        print(f'[{art["id"]}] {display}')

        try:
            # 1. 商品URL検索
            item_url = search_item_url(product_name)
            if not item_url:
                print(f'  SKIP: 商品URL取得失敗')
                failed.append(art['id'])
                time.sleep(0.5)
                continue

            print(f'  URL: {item_url}')
            art['affiliateLink'] = make_aff(item_url)

            # 2. 商品ページから画像取得
            try:
                page_html = get_html(item_url)
                img_url = extract_image(page_html)
                if img_url:
                    fname = art['id'].replace('-', '_') + '.jpg'
                    local = download_image(img_url, fname)
                    art['imageUrl'] = local
                else:
                    print(f'  IMG: 画像URL取得失敗（リンクのみ更新）')
            except Exception as e:
                print(f'  IMG ERROR: {e}')

            updated += 1

        except Exception as e:
            print(f'  ERROR: {e}')
            failed.append(art['id'])

        time.sleep(0.8)

    # 保存
    with open('src/data/articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f'\n=== 完了 ===')
    print(f'更新: {updated} 件')
    print(f'失敗: {len(failed)} 件 {failed[:5] if failed else ""}')


if __name__ == '__main__':
    main()
