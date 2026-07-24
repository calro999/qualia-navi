import os
import urllib.request

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 8商品の楽天市場で稼働している実物画像URLリスト
test_urls = [
    ("decorte_liposome.jpg", "https://tshop.r10s.jp/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg?fitin=500%3A500"),
    ("anessa_uv_milk.jpg", "https://tshop.r10s.jp/rakuten24/cabinet/351/4909978163351.jpg?fitin=500%3A500"),
    ("vt_reedle_shot_100.jpg", "https://tshop.r10s.jp/vtcosmetics-official/cabinet/09425442/09715101/imgrc0093845942.jpg?fitin=500%3A500"),
    ("romand_tint.jpg", "https://tshop.r10s.jp/koreaco/cabinet/08151590/romand_tint_01.jpg?fitin=500%3A500"),
    ("panasonic_vitalift.jpg", "https://tshop.r10s.jp/panasonic/cabinet/08151590/imgrc0087453303.jpg?fitin=500%3A500"),
    ("kate_lip_monster.jpg", "https://tshop.r10s.jp/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg?fitin=500%3A500"),
    ("larocheposay_rose.jpg", "https://tshop.r10s.jp/larocheposay/cabinet/06899313/imgrc0084478144.jpg?fitin=500%3A500"),
    ("curel_uv_essence.jpg", "https://tshop.r10s.jp/rakuten24/cabinet/351/4901301274435.jpg?fitin=500%3A500")
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Referer': 'https://search.rakuten.co.jp/'
}

for filename, url in test_urls:
    save_path = os.path.join(output_dir, filename)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            data = res.read()
            with open(save_path, 'wb') as f:
                f.write(data)
            print(f"[SUCCESS] Downloaded {filename} -> {len(data)} bytes")
    except Exception as e:
        print(f"[ERROR] {filename}: {e}")
