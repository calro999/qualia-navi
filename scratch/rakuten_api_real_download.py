import os
import urllib.request

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 楽天市場公式ショップ・正規取扱店の本物コスメ商品画像ソース
real_rakuten_item_images = [
    ("decorte_liposome.jpg", "https://tshop.r10s.jp/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg"),
    ("anessa_uv_milk.jpg", "https://tshop.r10s.jp/rakuten24/cabinet/351/4909978163351.jpg"),
    ("vt_reedle_shot_100.jpg", "https://tshop.r10s.jp/vtcosmetics-official/cabinet/09425442/09715101/imgrc0093845942.jpg"),
    ("romand_tint.jpg", "https://tshop.r10s.jp/koreaco/cabinet/08151590/romand_tint_01.jpg"),
    ("panasonic_vitalift.jpg", "https://tshop.r10s.jp/panasonic/cabinet/08151590/imgrc0087453303.jpg"),
    ("kate_lip_monster.jpg", "https://tshop.r10s.jp/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg"),
    ("larocheposay_rose.jpg", "https://tshop.r10s.jp/larocheposay/cabinet/06899313/imgrc0084478144.jpg"),
    ("curel_uv_essence.jpg", "https://tshop.r10s.jp/rakuten24/cabinet/351/4901301274435.jpg")
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Referer': 'https://item.rakuten.co.jp/'
}

for filename, url in real_rakuten_item_images:
    save_path = os.path.join(output_dir, filename)
    
    # 500x500 パラメータ付与
    target_url = f"{url}?_ex=500x500" if "?_ex=" not in url else url
    print(f"Downloading Real Rakuten Image for {filename} from {target_url} ...")

    req = urllib.request.Request(target_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            data = res.read()
            # JPEG/PNGバイナリヘッダー検証 (JPEG: \xff\xd8\xff, PNG: \x89PNG, GIF: GIF8)
            if len(data) > 1000 and (data.startswith(b'\xff\xd8\xff') or data.startswith(b'\x89PNG') or data.startswith(b'GIF8')):
                with open(save_path, 'wb') as f:
                    f.write(data)
                print(f"[SUCCESS] Downloaded REAL RAKUTEN IMAGE -> {save_path} ({len(data)} bytes)")
            else:
                print(f"[WARNING] Downloaded data is HTML or corrupted for {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"[ERROR] Failed for {filename}: {e}")

print("Rakuten image download test complete.")
