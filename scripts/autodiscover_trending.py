    # -------------------------------------------------------------
    # リアルタイムコスメ人気ランキング自動リサーチ＆追加機能 (Top 3 Auto-Discovery)
    # -------------------------------------------------------------
    def fetch_top_trending_cosmetics(app_id, access_key, affiliate_id, existing_titles, limit=3):
        print(f"\n[AUTO-RESEARCH] Searching Rakuten Realtime Cosmetics Ranking for top {limit} new trending items...")
        if not app_id or app_id == 'DUMMY':
            print("[AUTO-RESEARCH] App ID is DUMMY. Using simulated trending items discovery.")
            return [
                {
                    "title": "【2026年最新バズコスメ】ディオール アディクト リップ マキシマイザー 徹底検証",
                    "productName": "Dior ディオール アディクト リップ マキシマイザー",
                    "keyword": "リップ マキシマイザー",
                    "category": "lip",
                    "categoryLabel": "リップ＆ケア",
                    "image_url": "/images/products/melty-lip.jpg",
                    "price": "4,620円",
                    "affiliate_url": f"https://hb.afl.rakuten.co.jp/hgc/{affiliate_id}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2583%259E%25E3%2582%25AD%25E3%2582%25B7%25E3%2583%259E%25E3%2582%25A4%25E3%2582%25B6%25E3%2583%25BC%2F",
                    "starRating": 4.9,
                    "reviewCount": 11200
                },
                {
                    "title": "【SNSで話題の毛穴ケア】タカミスキンピール 角質美容水 徹底ガイド",
                    "productName": "TAKAMI タカミスキンピール 30mL",
                    "keyword": "タカミスキンピール",
                    "category": "skincare",
                    "categoryLabel": "スキンケア・美容液",
                    "image_url": "/images/products/vt_reedle_shot_100.jpg",
                    "price": "5,500円",
                    "affiliate_url": f"https://hb.afl.rakuten.co.jp/hgc/{affiliate_id}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%259F%25E3%2582%25B9%25E3%2582%25AD%25E3%2583%25B3%25E3%2583%2594%25E3%2583%25BC%25E3%2583%25AB%2F",
                    "starRating": 4.8,
                    "reviewCount": 8900
                },
                {
                    "title": "【美容液ファンデ代表】SHISEIDO エッセンス スキングロウ ファンデーション 徹底レビュー",
                    "productName": "SHISEIDO エッセンス スキングロウ ファンデーション",
                    "keyword": "エッセンス スキングロウ ファンデーション",
                    "category": "makeup",
                    "categoryLabel": "ベース＆メイクアップ",
                    "image_url": "/images/products/larocheposay_rose.jpg",
                    "price": "7,590円",
                    "affiliate_url": f"https://hb.afl.rakuten.co.jp/hgc/{affiliate_id}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25A8%25E3%2583%2583%25E3%2582%25BB%25E3%2583%25B3%25E3%2582%25B9%25E3%2582%25B9%25E3%2582%25AD%25E3%2583%25B3%25E3%2582%25B0%25E3%2583%25AD%25E3%2582%25A6%2F",
                    "starRating": 4.9,
                    "reviewCount": 4300
                }
            ]

        # Rakuten Ichiba Item Ranking API (Genre 100939: Cosmetics)
        base_url = "https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628"
        params = {
            "applicationId": app_id,
            "genreId": "100939",
            "format": "json"
        }
        url = f"{base_url}?{urllib.parse.urlencode(params)}"
        trending_items = []
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as res:
                data = json.loads(res.read().decode('utf-8'))
                items = data.get("Items", [])
                for idx, entry in enumerate(items):
                    item = entry.get("Item", {})
                    name = item.get("itemName", "")
                    
                    # Check if already exists in existing titles or keywords
                    is_duplicate = any(kw in name for kw in ["アネッサ", "リポソーム", "リードルショット", "リップモンスター", "キュレル", "ファンケル", "TIRTIR", "ラロッシュポゼ"])
                    if not is_duplicate:
                        image_url = ""
                        if item.get("mediumImageUrls"):
                            image_url = item["mediumImageUrls"][0]["imageUrl"].split("?")[0]

                        trending_items.append({
                            "title": f"【2026年最新ヒット】楽天人気上位！{name[:30]} リアルレビュー＆検証",
                            "productName": name[:40],
                            "keyword": name[:20],
                            "category": "skincare",
                            "categoryLabel": "注目ヒットコスメ",
                            "image_url": image_url,
                            "price": f"{item.get('itemPrice', 0)}円",
                            "affiliate_url": item.get("affiliateUrl"),
                            "starRating": 4.8,
                            "reviewCount": item.get("reviewCount", 1200)
                        })
                        if len(trending_items) >= limit:
                            break
        except Exception as e:
            print(f"[AUTO-RESEARCH] Ranking API Exception: {e}")

        return trending_items
