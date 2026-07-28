import json
import random
from datetime import datetime, timedelta

target_file = 'src/data/articles.json'

CATEGORIES = [
    {"id": "skincare", "label": "スキンケア", "brands": ["SK-II", "ランコム", "資生堂", "コスメデコルテ", "無印良品", "キュレル"]},
    {"id": "makeup", "label": "メイクアップ", "brands": ["ディオール", "シャネル", "NARS", "MAC", "キャンメイク", "セザンヌ"]},
    {"id": "suncare", "label": "サンケア", "brands": ["アネッサ", "アリー", "ビオレ", "ラロッシュポゼ", "スキンアクア"]},
    {"id": "lip", "label": "リップ", "brands": ["KATE", "ロムアンド", "オペラ", "YSL", "ジルスチュアート"]},
    {"id": "device", "label": "美容家電", "brands": ["パナソニック", "ヤーマン", "サロニア", "リファ", "ダイソン"]},
    {"id": "k-beauty", "label": "韓国コスメ", "brands": ["VT", "イニスフリー", "クリオ", "ティルティル", "ミシャ"]},
    {"id": "bodycare", "label": "ボディケア", "brands": ["サボン", "ロクシタン", "ニベア", "ジョンソン", "ボディショップ"]},
    {"id": "haircare", "label": "ヘアケア", "brands": ["モロッカンオイル", "ミルボン", "アンドハニー", "ボタニスト", "YOLU"]}
]

PRODUCT_TYPES = ["エッセンス", "セラム", "ローション", "クリーム", "ジェル", "ミルク", "オイル", "バーム", "ミスト", "パウダー", "リキッド", "ティント"]
BENEFITS = ["高保湿", "美白", "エイジングケア", "毛穴レス", "トーンアップ", "シワ改善", "肌荒れ防止", "ツヤ肌", "マット", "崩れにくい"]

def generate_rich_review(product_name, category):
    return f"""## 【徹底検証】SNSで話題騒然の「{product_name}」の実力をチェック！

美容マニアの間で「もうこれ以外使えない」とまで言わしめているこのアイテム。今回はQualia美容編集部が、その圧倒的な実力とバズっている理由を徹底的にレビューします。

### 1. 驚きの使用感とテクスチャー

実際に肌にのせてまず驚くのは、その独自のテクスチャーです。伸びが良く、肌にピタッと密着する感覚は、毎日のケアやメイクアップをワンランク上の体験へと引き上げてくれます。ベタつかずにしっかりと役割を果たすため、朝の忙しい時間帯でも夜のじっくりケアでも大活躍間違いなしです。

### 2. 独自の成分アプローチで本質的なケアを

このアイテムが他と一線を画す最大の理由は、こだわりの成分構成にあります。長年の研究に基づき、必要な成分をダイレクトに届けるアプローチは、表面的な美しさだけでなく、本質的なケアを求める方に最適です。

### 3. 実際のユーザーからの口コミ・評価

SNSや口コミサイトを調査すると、「もっと早く出会いたかった」「リピート確定」といった絶賛の声が溢れています。もちろん個人差はありますが、多くの方が短期間で明確な良い変化を感じているようです。価格以上の価値を提供する、まさに「神コスパ」な優秀アイテムと言えるでしょう。

### 4. 編集部からの総評：こんな方におすすめ！

総じて、「{product_name}」は、現代の忙しい女性が求める「手軽さ」と「高いパフォーマンス」を見事に両立させた傑作です。
毎日の美容ルーティンを格上げしたい方、本当に自分に合うものを探している方に、自信を持っておすすめします！
"""

def generate_faqs(product_name):
    return [
        {
            "question": f"{product_name}はどこで購入するのが一番お得ですか？",
            "answer": "楽天市場での購入が、ポイント還元率やキャンペーンを含めると最もお得になるケースが多いです。公式ショップや正規取扱店での購入をおすすめします。"
        },
        {
            "question": "敏感肌でも使用できますか？",
            "answer": "多くの方が問題なく使用されていますが、肌質には個人差があるため、まずは少量を試すパッチテストを行うことを推奨いたします。"
        },
        {
            "question": "どれくらいの期間で使い切りますか？",
            "answer": "標準的な使用量の場合、およそ1ヶ月半〜2ヶ月程度持つ方が多いようです。コストパフォーマンスは非常に高いと言えます。"
        }
    ]

def generate_mock_articles(num_articles):
    articles = []
    start_date = datetime(2026, 6, 1)
    
    # We cycle through existing product images from the codebase
    images = [
        '/images/products/ipsa_aqua.jpg',
        '/images/products/fujiko_mayutint.jpg',
        '/images/products/pauljoe_primer.jpg',
        '/images/products/larocheposay_rose.jpg',
        '/images/products/canmake_uv.jpg'
    ]
    
    for i in range(num_articles):
        cat = random.choice(CATEGORIES)
        brand = random.choice(cat["brands"])
        p_type = random.choice(PRODUCT_TYPES)
        benefit = random.choice(BENEFITS)
        
        display_name = f"{brand} {benefit} {p_type} EX {i+1000}"
        item_code = f"mock-{cat['id']}-{i+1000}"
        article_id = f"art-{cat['id']}-{i+1000}"
        
        created_at = start_date + timedelta(hours=i % 1000)
        price = random.randint(10, 150) * 100
        
        article = {
            "id": article_id,
            "title": f"【2026年最新】{display_name} 徹底比較レビュー",
            "itemCode": item_code,
            "productName": display_name,
            "category": cat["id"],
            "categoryLabel": cat["label"],
            "imageUrl": images[i % len(images)],
            "starRating": round(random.uniform(3.8, 4.9), 1),
            "reviewCount": random.randint(50, 3000),
            "introText": f"人気の「{display_name}」について、実際の使用感や成分を詳しく解説します。",
            "features": [benefit, "話題の成分配合", "リピーター多数"],
            "pros": ["使用感が非常に良い", "コストパフォーマンスが高い", benefit],
            "cons": ["人気すぎて品薄になりやすい", "香りの好みが分かれる可能性がある"],
            "reviewBody": generate_rich_review(display_name, cat["label"]),
            "ctaTitle": f"楽天でお得に購入する",
            "affiliateLink": f"https://hb.afl.rakuten.co.jp/hgc/dummy/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F{urllib.parse.quote(display_name)}%2F",
            "rakutenPrice": f"¥{price:,}",
            "createdAt": created_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "estimatedPV": random.randint(1000, 50000),
            "clicks": random.randint(50, 1000),
            "earnings": random.randint(500, 20000),
            "aiModelUsed": "Qualia Editorial Engine",
            "isHallOfFame": random.choice([True, False, False]),
            "verificationDays": random.randint(7, 30),
            "reviewerName": random.choice(["蓮見 拓真", "松本 結衣", "長谷川 花", "橘 えりか"]),
            "reviewerRole": "Qualia 美容編集部",
            "summaryKeyPoints": ["コスパの良さ", "継続しやすい", "人気アイテム"],
            "priceRange": f"約{price}円",
            "buyIntentKeywords": ["評判", "口コミ", "レビュー"],
            "faqs": generate_faqs(display_name)
        }
        articles.append(article)
        
    return articles

if __name__ == "__main__":
    import urllib.parse
    
    existing_data = []
    try:
        with open(target_file, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        pass
        
    print(f"Existing articles: {len(existing_data)}")
    
    # Generate 10,000 articles
    new_articles = generate_mock_articles(10000)
    
    # Merge, keeping existing
    existing_ids = {art.get("id") for art in existing_data if art.get("id")}
    for art in new_articles:
        if art["id"] not in existing_ids:
            existing_data.append(art)
            
    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully generated 10,000 SEO-optimized articles.")
    print(f"Total articles in database: {len(existing_data)}")
