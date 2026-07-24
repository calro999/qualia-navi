import os
import urllib.request

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 実在する本物コスメ商品の直高画質JPEG画像URL
jpeg_targets = [
    ("decorte_liposome.jpg", "https://m.media-amazon.com/images/I/51H5S7zZzSL._AC_SL1000_.jpg"),
    ("anessa_uv_milk.jpg", "https://m.media-amazon.com/images/I/61j1U4Rz+AL._AC_SL1500_.jpg"),
    ("vt_reedle_shot_100.jpg", "https://m.media-amazon.com/images/I/61M6r-2o-HL._AC_SL1500_.jpg"),
    ("romand_tint.jpg", "https://m.media-amazon.com/images/I/51Xf-v-h+SL._AC_SL1000_.jpg"),
    ("panasonic_vitalift.jpg", "https://m.media-amazon.com/images/I/61Q60vD8cSL._AC_SL1500_.jpg"),
    ("kate_lip_monster.jpg", "https://m.media-amazon.com/images/I/51Tj5N-xYRL._AC_SL1000_.jpg"),
    ("larocheposay_rose.jpg", "https://m.media-amazon.com/images/I/61t9J9S0XBL._AC_SL1500_.jpg"),
    ("curel_uv_essence.jpg", "https://m.media-amazon.com/images/I/61u9K5Z+JRL._AC_SL1500_.jpg")
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
}

for filename, url in jpeg_targets:
    save_path = os.path.join(output_dir, filename)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            if res.status == 200:
                data = res.read()
                if len(data) > 5000:
                    with open(save_path, 'wb') as f:
                        f.write(data)
                    print(f"[SUCCESS] Saved Real JPEG for {filename} -> {len(data)} bytes")
    except Exception as e:
        print(f"[ERROR] Failed for {filename}: {e}")

print("High-Res JPEG download completed!")
