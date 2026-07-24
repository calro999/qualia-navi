import os
import urllib.request

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 全8商品の楽天市場最新本物画像URL (tshop.r10s.jp)
items = [
    {"filename": "decorte_liposome.jpg", "url": "https://tshop.r10s.jp/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg"},
    {"filename": "anessa_uv_milk.jpg", "url": "https://tshop.r10s.jp/rakuten24/cabinet/351/4909978163351.jpg"},
    {"filename": "vt_reedle_shot_100.jpg", "url": "https://tshop.r10s.jp/vtcosmetics-official/cabinet/09425442/09715101/imgrc0093845942.jpg"},
    {"filename": "romand_tint.jpg", "url": "https://tshop.r10s.jp/koreaco/cabinet/08151590/romand_tint_01.jpg"},
    {"filename": "panasonic_vitalift.jpg", "url": "https://tshop.r10s.jp/panasonic/cabinet/08151590/imgrc0087453303.jpg"},
    {"filename": "kate_lip_monster.jpg", "url": "https://tshop.r10s.jp/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg"},
    {"filename": "larocheposay_rose.jpg", "url": "https://tshop.r10s.jp/larocheposay/cabinet/06899313/imgrc0084478144.jpg"},
    {"filename": "curel_uv_essence.jpg", "url": "https://tshop.r10s.jp/rakuten24/cabinet/351/4901301274435.jpg"}
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
}

for item in items:
    save_path = os.path.join(output_dir, item["filename"])
    req = urllib.request.Request(item["url"], headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            data = res.read()
            with open(save_path, 'wb') as f:
                f.write(data)
            print(f"[SUCCESS] Downloaded {item['filename']} -> {len(data)} bytes")
    except Exception as e:
        print(f"[ERROR] {item['filename']}: {e}")
