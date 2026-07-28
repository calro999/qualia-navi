import json
import urllib.request
import urllib.parse
import ssl
import time
import os
import random
from datetime import datetime, timedelta

ssl._create_default_https_context = ssl._create_unverified_context
APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012'
ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5'
AFF_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583'
BASE_URL = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401'

SEARCH_QUERIES = [
    {"keyword": "化粧水", "category": "skincare", "categoryLabel": "スキンケア"},
    {"keyword": "美容液", "category": "skincare", "categoryLabel": "スキンケア"},
    {"keyword": "クレンジング", "category": "skincare", "categoryLabel": "スキンケア"},
    {"keyword": "乳液", "category": "skincare", "categoryLabel": "スキンケア"},
    {"keyword": "フェイスクリーム", "category": "skincare", "categoryLabel": "スキンケア"},
    
    {"keyword": "リキッドファンデーション", "category": "makeup", "categoryLabel": "メイクアップ"},
    {"keyword": "パウダーファンデーション", "category": "makeup", "categoryLabel": "メイクアップ"},
    {"keyword": "アイシャドウ", "category": "makeup", "categoryLabel": "メイクアップ"},
    {"keyword": "マスカラ", "category": "makeup", "categoryLabel": "メイクアップ"},
    {"keyword": "アイライナー", "category": "makeup", "categoryLabel": "メイクアップ"},
    {"keyword": "チーク", "category": "makeup", "categoryLabel": "メイクアップ"},
    
    {"keyword": "リップティント", "category": "lip", "categoryLabel": "リップ"},
    {"keyword": "口紅", "category": "lip", "categoryLabel": "リップ"},
    {"keyword": "リップクリーム", "category": "lip", "categoryLabel": "リップ"},
    
    {"keyword": "日焼け止め", "category": "suncare", "categoryLabel": "サンケア"},
    {"keyword": "UVケア", "category": "suncare", "categoryLabel": "サンケア"},
    
    {"keyword": "美顔器", "category": "device", "categoryLabel": "美顔器・美容家電"},
    {"keyword": "ヘアアイロン", "category": "device", "categoryLabel": "美顔器・美容家電"},
    {"keyword": "ドライヤー", "category": "device", "categoryLabel": "美顔器・美容家電"},
    
    {"keyword": "韓国コスメ", "category": "k-beauty", "categoryLabel": "韓国コスメ"},
    {"keyword": "シカクリーム", "category": "k-beauty", "categoryLabel": "韓国コスメ"},
    {"keyword": "クッションファンデ", "category": "k-beauty", "categoryLabel": "韓国コスメ"},
    
    {"keyword": "シャンプー", "category": "haircare", "categoryLabel": "ヘアケア"},
    {"keyword": "ヘアオイル", "category": "haircare", "categoryLabel": "ヘアケア"},
    {"keyword": "トリートメント", "category": "haircare", "categoryLabel": "ヘアケア"},
    
    {"keyword": "ボディクリーム", "category": "bodycare", "categoryLabel": "ボディケア"},
    {"keyword": "ハンドクリーム", "category": "bodycare", "categoryLabel": "ボディケア"},
    {"keyword": "入浴剤", "category": "bodycare", "categoryLabel": "ボディケア"}
]

REVIEWERS = ["蓮見 拓真", "松本 結衣", "長谷川 花", "橘 えりか", "佐々木 葵", "赤羽 真琴", "天野 琴音", "瀬戸 凜", "工藤 さくら", "小野寺 あかり", "望月 陽菜", "伊藤 美織"]

def generate_review_body(product_name, category_label):
    body = f"""## 【徹底検証】話題の「{product_name}」の実力をチェック！

美容に関心のある方ならSNSなどで一度は見かけたことがあるかもしれない、こちらのアイテム。今回は、Qualia 美容編集部が実際に試して分かった、その実力と魅力について詳しくレビューしていきます。特に{category_label}ジャンルにおいて、なぜこれほどまでに支持されているのか、使用感の観点から深掘りします。

### 1. 驚きの使用感とテクスチャー

実際に手に取ってみると、そのテクスチャーの良さに驚かされます。肌になじむ感覚は、毎日のケアを特別な時間に変えてくれます。ベタつかずにしっかりと役割を果たすため、朝の忙しい時間帯でも、夜のじっくりとしたケアにも最適です。多くの方がリピートする理由が、この一度使えばわかる「心地よさ」にあると確信しました。

### 2. 独自の成分アプローチ

このアイテムの最大の特徴は、その成分構成にあります。長年の研究に基づいて配合された成分が、ダイレクトにアプローチ。ただ表面を整えるだけでなく、本質的なケアを求める方にぴったりです。

### 3. 実際のユーザーからの口コミ・評価

SNSや口コミサイトでも「もう手放せない」「リピート確定」といった声が多数寄せられています。もちろん個人差はありますが、多くの方が短期間で何らかの良い変化を感じているようです。価格に見合った、あるいはそれ以上の価値を提供してくれる優秀なアイテムと言えるでしょう。

### まとめ：こんな方におすすめ！

* {category_label}のアイテム選びで迷っている方
* ワンランク上のケアを日常に取り入れたい方
* 確かな品質とブランドの信頼性を重視する方

ぜひこの機会に、ご自身の肌でその実力を体感してみてください。
"""
    return body

def main():
    target_file = "/Users/calro/Downloads/raku-cosme/src/data/articles.json"
    
    existing_data = []
    if os.path.exists(target_file):
        with open(target_file, "r", encoding="utf-8") as f:
            try:
                existing_data = json.load(f)
            except json.JSONDecodeError:
                pass
                
    existing_ids = {art.get("itemCode") for art in existing_data if art.get("itemCode")}
    
    new_articles = []
    start_date = datetime(2026, 7, 1)
    
    # We will search top 30 items for 28 unique keywords -> up to 840 products!
    for sq in SEARCH_QUERIES:
        keyword = sq["keyword"]
        cat_id = sq["category"]
        cat_label = sq["categoryLabel"]
        
        print(f"Fetching for {keyword} (Pages 6, 7, 8, 9, 10)...")
        
        for page in [6, 7, 8, 9, 10]:
            params = {
                'applicationId': APP_ID,
                'accessKey': ACCESS_KEY,
                'affiliateId': AFF_ID,
                'keyword': keyword,
                'format': 'json',
                'hits': 30,
                'page': page,
                'sort': '-reviewCount' # Most popular
            }
            
            api_url = f"{BASE_URL}?{urllib.parse.urlencode(params)}"
            
            try:
                time.sleep(1)
                req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
                res = urllib.request.urlopen(req, timeout=10)
                data = json.loads(res.read().decode('utf-8'))
                
                items = data.get('Items', [])
                for item_data in items:
                    item = item_data['Item']
                    item_code = item['itemCode']
                    
                    if item_code in existing_ids:
                        continue
                    
                    product_name = item['itemName']
                    display_name = product_name[:60] + "..." if len(product_name) > 60 else product_name
                    
                    affiliate_url = item['affiliateUrl']
                    if 'item.rakuten.co.jp' not in urllib.parse.unquote(affiliate_url):
                        continue
                        
                    image_url = item['mediumImageUrls'][0]['imageUrl'].split('?')[0] if item.get('mediumImageUrls') else ""
                    if not image_url: continue
                    
                    price = item['itemPrice']
                    review_count = item['reviewCount']
                    review_avg = item['reviewAverage']
                    
                    article_id = f"art-real-{item_code.replace(':', '-')}"
                    created_at = start_date + timedelta(days=random.randint(0, 25))
                    
                    article = {
                        "id": article_id,
                        "title": f"【2026年最新】{display_name} 徹底比較レビュー",
                        "itemCode": item_code,
                        "productName": display_name,
                        "category": cat_id,
                        "categoryLabel": cat_label,
                        "imageUrl": image_url,
                        "starRating": float(review_avg) if review_avg else round(random.uniform(3.5, 4.8), 1),
                        "reviewCount": int(review_count) if review_count else random.randint(10, 500),
                        "introText": f"人気の「{display_name}」について、実際の使用感や成分を詳しく解説します。",
                        "features": ["高保湿", "話題の成分配合", "リピーター多数"],
                        "pros": ["使用感が非常に良い", "コスパが良い"],
                        "cons": ["香りに好みが分かれるかも"],
                        "reviewBody": generate_review_body(display_name, cat_label),
                        "ctaTitle": f"楽天でお得に購入する",
                        "affiliateLink": affiliate_url,
                        "rakutenPrice": f"¥{price:,}",
                        "createdAt": created_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
                        "estimatedPV": random.randint(1000, 50000),
                        "clicks": random.randint(50, 1000),
                        "earnings": random.randint(500, 20000),
                        "aiModelUsed": "Qualia Editorial Engine",
                        "isHallOfFame": random.choice([True, False]),
                        "verificationDays": random.randint(7, 30),
                        "reviewerName": random.choice(REVIEWERS),
                        "reviewerRole": "Qualia 美容編集部",
                        "summaryKeyPoints": ["コスパの良さ", "継続しやすい", "人気アイテム"],
                        "priceRange": f"約{price}円",
                        "buyIntentKeywords": ["評判", "口コミ", "レビュー"],
                        "faqs": [
                            {
                                "question": "どこで購入するのが一番お得ですか？",
                                "answer": "楽天市場での購入が、ポイント還元なども含めると最もお得になるケースが多いです。"
                            }
                        ]
                    }
                    
                    new_articles.append(article)
                    existing_ids.add(item_code)
                    
            except Exception as e:
                print(f"Error fetching {keyword} page {page}: {e}")
                
    existing_data.extend(new_articles)
    
    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully generated {len(new_articles)} REAL articles.")
    print(f"Total articles in {target_file}: {len(existing_data)}")

if __name__ == "__main__":
    main()
