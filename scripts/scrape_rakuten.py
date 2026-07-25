import json
import urllib.request
import urllib.parse
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
from html.parser import HTMLParser
import time

products = [
    "ビオレ さらさらパウダーシート せっけんの香り",
    "ギャツビー アイスデオドラント ボディペーパー アイスシトラス",
    "エージーデオ24 クリアシャワーシート 無香料",
    "SABON リフレッシング ワイプス パチュリ ラベンダー バニラ",
    "キュレル スキンケアシート",
    "シーブリーズ フェイス＆ボディシート ヴァーベナクール",
    "ビオレZ ディープクリアシート ハーブミントの香り",
    "無印良品 汗ふきシート シトラスの香り",
    "マンダム ハッピーデオ ボディシート うるサラ 花せっけんの香り",
    "ハウスオブローゼ ミントリープ クール ボディシート"
]

class RakutenParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.item_url = None
        self.img_url = None
        self.in_item = False
        self.found = False

    def handle_starttag(self, tag, attrs):
        if self.found: return
        attr_dict = dict(attrs)
        
        # Rakuten search results usually have class "searchresultitem" or similar, 
        # or we can just look for the first link that looks like an item URL.
        if tag == 'a' and 'href' in attr_dict:
            href = attr_dict['href']
            if 'item.rakuten.co.jp' in href and not self.item_url:
                # Strip out tracking params
                self.item_url = href.split('?')[0]
                self.in_item = True
        
        if self.in_item and tag == 'img' and 'src' in attr_dict:
            src = attr_dict['src']
            if 'thumbnail.image.rakuten.co.jp' in src or 'shop.r10s.jp' in src:
                self.img_url = src
                self.found = True
                self.in_item = False

def fetch_rakuten_data(query):
    encoded = urllib.parse.quote(query)
    url = f"https://search.rakuten.co.jp/search/mall/{encoded}/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8', errors='ignore')
            parser = RakutenParser()
            parser.feed(html)
            return parser.item_url, parser.img_url
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return None, None

def main():
    json_path = 'src/data/articles.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        articles = json.load(f)
    
    affiliate_id = "54d2a438.4bc4abc2.54d2a439.aa1be583"
    
    # We only want to update the first 10 products which are the bodysheets
    count = 0
    for art in articles:
        if art['id'].startswith('art-bodysheet-'):
            print(f"Fetching: {art['productName']}")
            item_url, img_url = fetch_rakuten_data(art['productName'])
            if item_url and img_url:
                # High-res image tweak
                img_url = img_url.replace('?_ex=128x128', '?_ex=500x500')
                img_url = img_url.replace('?_ex=300x300', '?_ex=500x500')
                
                # Affiliate URL
                encoded_item = urllib.parse.quote(item_url)
                aff_url = f"https://hb.afl.rakuten.co.jp/hgc/{affiliate_id}/?pc={encoded_item}"
                
                print(f" -> Found! URL: {item_url} | Img: {img_url}")
                art['imageUrl'] = img_url
                art['affiliateLink'] = aff_url
            else:
                print(f" -> Failed to find data.")
            time.sleep(1)
            count += 1
            if count >= 10:
                break
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    print("Done updating.")

if __name__ == '__main__':
    main()
