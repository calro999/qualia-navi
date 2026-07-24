import os
import json
import urllib.request
import urllib.parse

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 楽天デモ/パブリック AppID
APP_ID = "1018743187422030097"

target_products = [
    {
        "filename": "decorte_liposome.jpg",
        "keyword": "コスメデコルテ リポソーム アドバンスト リペアセラム"
    },
    {
        "filename": "anessa_uv_milk.jpg",
        "keyword": "アネッサ パーフェクトUV スキンケアミルク"
    },
    {
        "filename": "vt_reedle_shot_100.jpg",
        "keyword": "VT リードルショット 100"
    },
    {
        "filename": "romand_tint.jpg",
        "keyword": "ロムアンド ジューシーラスティングティント"
    },
    {
        "filename": "panasonic_vitalift.jpg",
        "keyword": "パナソニック バイタリフト ブラシ"
    },
    {
        "filename": "kate_lip_monster.jpg",
        "keyword": "KATE リップモンスター 03"
    },
    {
        "filename": "larocheposay_rose.jpg",
        "keyword": "ラロッシュポゼ トーンアップ ローズ"
    },
    {
        "filename": "curel_uv_essence.jpg",
        "keyword": "キュレル UVエッセンス"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

api_base_url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"

fetched_results = {}

for product in target_products:
    filename = product["filename"]
    keyword = product["keyword"]
    save_path = os.path.join(output_dir, filename)

    query_params = {
        "applicationId": APP_ID,
        "keyword": keyword,
        "hits": 1,
        "format": "json"
    }

    url = f"{api_base_url}?{urllib.parse.urlencode(query_params)}"
    print(f"Calling Rakuten Official API for [{keyword}] ...")

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as res:
            data = json.loads(res.read().decode('utf-8'))
            items = data.get("Items", [])
            if items:
                item_info = items[0].get("Item", {})
                item_name = item_info.get("itemName")
                affiliate_url = item_info.get("affiliateUrl") or item_info.get("itemUrl")
                
                medium_images = item_info.get("mediumImageUrls", [])
                img_url = None
                if medium_images:
                    if isinstance(medium_images[0], dict):
                        img_url = medium_images[0].get("imageUrl")
                    else:
                        img_url = medium_images[0]

                print(f"  Item: {item_name[:30]}...")
                print(f"  Affiliate URL: {affiliate_url}")
                print(f"  Image URL: {img_url}")

                if img_url:
                    if "?_ex=" in img_url:
                        high_res_url = img_url.split("?_ex=")[0] + "?_ex=500x500"
                    else:
                        high_res_url = img_url + "?_ex=500x500"

                    img_req = urllib.request.Request(high_res_url, headers=headers)
                    with urllib.request.urlopen(img_req, timeout=10) as img_res:
                        img_bytes = img_res.read()
                        with open(save_path, 'wb') as f:
                            f.write(img_bytes)
                        print(f"  [SUCCESS] Saved REAL RAKUTEN JPEG ({len(img_bytes)} bytes) -> {save_path}")

                fetched_results[filename] = {
                    "affiliate_url": affiliate_url,
                    "img_url": f"/images/products/{filename}",
                    "item_name": item_name
                }
            else:
                print(f"  [WARNING] No items found for {keyword}")
    except Exception as e:
        print(f"  [ERROR] API Call failed for {keyword}: {e}")

print("\nProcessing complete!")
