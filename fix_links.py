import json
import urllib.parse
import os

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

affiliate_id = os.environ.get('RAKUTEN_AFFILIATE_ID', '54d2a438.4bc4abc2.54d2a439.aa1be583')

for item in data:
    if not item.get('affiliateLink'):
        name = item.get('productName') or item.get('title')
        item['affiliateLink'] = f"https://hb.afl.rakuten.co.jp/hgc/{affiliate_id}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F{urllib.parse.quote(name)}%2F"

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
