#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import urllib.parse
import ssl
import re
import json
import os

ssl._create_default_https_context = ssl._create_unverified_context
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8',
    'Referer': 'https://www.rakuten.co.jp/',
}

def get_html(url):
    req = urllib.request.Request(url, headers=HEADERS)
    return urllib.request.urlopen(req, timeout=15).read().decode('utf-8', 'ignore')

def extract_image(html):
    # og:image (シングルクォート・ダブルクォート両対応)
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
    
    # thumbnail.image.rakuten.co.jp
    m = re.search(r'(https://thumbnail\.image\.rakuten\.co\.jp[^\s"\'<>&]+\.jpg)', html)
    if m:
        return m.group(1).split('?')[0]
    
    # shop.r10s.jp
    m = re.search(r'(https://shop\.r10s\.jp[^\s"\'<>&]+\.jpg)', html)
    if m:
        return m.group(1)
    
    return None

def download_image(img_url, filepath):
    clean = img_url.split('?')[0]
    data = urllib.request.urlopen(
        urllib.request.Request(clean, headers={**HEADERS, 'Referer': 'https://item.rakuten.co.jp/'}),
        timeout=15
    ).read()
    with open(filepath, 'wb') as f:
        f.write(data)
    print(f'  Saved {len(data)} bytes -> {filepath}')
    return True

# Test: ビオレZ の商品ページ
item_url = 'https://item.rakuten.co.jp/nanos-sr/9880096592891/'
print(f'Fetching: {item_url}')
html = get_html(item_url)
img_url = extract_image(html)
print(f'Image URL: {img_url}')

if img_url:
    dst = 'public/images/products/biore_z_sarasara.jpg'
    download_image(img_url, dst)
    print('SUCCESS')
else:
    print('FAILED to extract image URL')
    # HTMLの先頭500文字をデバッグ
    og_section = html[html.find('og:image')-50:html.find('og:image')+150] if 'og:image' in html else 'NOT FOUND'
    print('og:image context:', repr(og_section[:200]))
