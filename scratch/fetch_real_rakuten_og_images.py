import os
import re
import urllib.request

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 全8商品の楽天市場個別商品購入ページURL
product_pages = [
    {
        "filename": "decorte_liposome.jpg",
        "page_url": "https://item.rakuten.co.jp/koreaco/4971710376228/"
    },
    {
        "filename": "anessa_uv_milk.jpg",
        "page_url": "https://item.rakuten.co.jp/rakuten24/4909978163351/"
    },
    {
        "filename": "vt_reedle_shot_100.jpg",
        "page_url": "https://item.rakuten.co.jp/vtcosmetics-official/reedleshot100/"
    },
    {
        "filename": "romand_tint.jpg",
        "page_url": "https://item.rakuten.co.jp/romand-official/tint_01/"
    },
    {
        "filename": "panasonic_vitalift.jpg",
        "page_url": "https://item.rakuten.co.jp/panasonic/eh-sp60-k/"
    },
    {
        "filename": "kate_lip_monster.jpg",
        "filename_alias": "kate_lip_monster.jpg",
        "page_url": "https://item.rakuten.co.jp/koreaco/kate_03/"
    },
    {
        "filename": "larocheposay_rose.jpg",
        "page_url": "https://item.rakuten.co.jp/larocheposay/10000000/"
    },
    {
        "filename": "curel_uv_essence.jpg",
        "page_url": "https://item.rakuten.co.jp/rakuten24/4901301274435/"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
}

for item in product_pages:
    filename = item["filename"]
    save_path = os.path.join(output_dir, filename)
    print(f"Fetching Rakuten Page HTML: {item['page_url']} ...")

    try:
        req = urllib.request.Request(item['page_url'], headers=headers)
        with urllib.request.urlopen(req, timeout=12) as res:
            html = res.read().decode('utf-8', errors='ignore')

        # meta og:image のURLを抽出
        match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if not match:
            match = re.search(r'content=["\']([^"\']+)["\']\s+property=["\']og:image["\']', html, re.IGNORECASE)

        if match:
            img_url = match.group(1).replace('&amp;', '&')
            print(f"Found Real OG Image URL: {img_url}")

            img_req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(img_req, timeout=12) as img_res:
                img_data = img_res.read()
                with open(save_path, 'wb') as f:
                    f.write(img_data)
                print(f"[SUCCESS] Downloaded REAL RAKUTEN JPEG for {filename} -> {len(img_data)} bytes")
        else:
            print(f"[WARNING] og:image not found for {filename}")

    except Exception as e:
        print(f"[ERROR] Failed for {filename}: {e}")

print("OG Image extraction process complete.")
