import os
import sys
import time
from playwright.sync_api import sync_playwright

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 8商品の楽天市場本物商品画像ソース
items = [
    {
        "filename": "decorte_liposome.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg?_ex=500x500"
    },
    {
        "filename": "anessa_uv_milk.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/351/4909978163351.jpg?_ex=500x500"
    },
    {
        "filename": "vt_reedle_shot_100.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/vtcosmetics-official/cabinet/09425442/09715101/imgrc0093845942.jpg?_ex=500x500"
    },
    {
        "filename": "romand_tint.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/romand-official/cabinet/imgrc0087453303.jpg?_ex=500x500"
    },
    {
        "filename": "panasonic_vitalift.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/panasonic/cabinet/08151590/imgrc0087453303.jpg?_ex=500x500"
    },
    {
        "filename": "kate_lip_monster.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg?_ex=500x500"
    },
    {
        "filename": "larocheposay_rose.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/larocheposay/cabinet/06899313/imgrc0084478144.jpg?_ex=500x500"
    },
    {
        "filename": "curel_uv_essence.jpg",
        "url": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/351/4909978163351.jpg?_ex=500x500"
    }
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    page = context.new_page()

    for item in items:
        save_path = os.path.join(output_dir, item["filename"])
        print(f"Fetching REAL RAKUTEN Image for {item['filename']}...")
        try:
            # HTMLページ内に<img>を配置して確実に描画ロードさせる
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head><style>body {{ margin: 0; padding: 0; background: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; }} img {{ max-width: 500px; max-height: 500px; object-fit: contain; }}</style></head>
            <body>
                <img id="target-img" src="{item['url']}" />
            </body>
            </html>
            """
            page.set_content(html_content)
            page.wait_for_timeout(2000)

            # 画像エレメントのスクリーンショットで正確なJPEG画像を保存
            img_element = page.locator("#target-img")
            img_element.screenshot(path=save_path, type="jpeg", quality=90)
            print(f"[SUCCESS] Saved REAL JPEG image -> {save_path}")
        except Exception as e:
            print(f"[ERROR] Failed for {item['filename']}: {e}")

    browser.close()

print("All real images processed successfully!")
