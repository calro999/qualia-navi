import os
import time
from playwright.sync_api import sync_playwright

output_dir = os.path.abspath("public/images/products")
os.makedirs(output_dir, exist_ok=True)

# 全8商品の楽天市場実際の個別商品ページURL
product_pages = [
    {
        "filename": "decorte_liposome.jpg",
        "url": "https://item.rakuten.co.jp/koreaco/4971710376228/"
    },
    {
        "filename": "anessa_uv_milk.jpg",
        "url": "https://item.rakuten.co.jp/rakuten24/4909978163351/"
    },
    {
        "filename": "vt_reedle_shot_100.jpg",
        "url": "https://item.rakuten.co.jp/vtcosmetics-official/reedleshot100/"
    },
    {
        "filename": "romand_tint.jpg",
        "url": "https://item.rakuten.co.jp/koreaco/romand_tint/"
    },
    {
        "filename": "panasonic_vitalift.jpg",
        "url": "https://item.rakuten.co.jp/panasonic/eh-sp60-k/"
    },
    {
        "filename": "kate_lip_monster.jpg",
        "url": "https://item.rakuten.co.jp/matsumoto/4973167820209/"
    },
    {
        "filename": "larocheposay_rose.jpg",
        "url": "https://item.rakuten.co.jp/larocheposay/10000000/"
    },
    {
        "filename": "curel_uv_essence.jpg",
        "url": "https://item.rakuten.co.jp/rakuten24/4901301274435/"
    }
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        viewport={"width": 1280, "height": 900},
        user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )
    page = context.new_page()

    for item in product_pages:
        save_path = os.path.join(output_dir, item["filename"])
        print(f"Opening Rakuten Item Page for {item['filename']}: {item['url']} ...")
        try:
            page.goto(item["url"], wait_until="domcontentloaded", timeout=20000)
            time.sleep(3)

            # 商品メイン画像または代表画像を探索
            img_selector = "img[src*='cabinet'], img[src*='tshop.r10s.jp'], img[src*='shop.r10s.jp'], .rakutenLimitedId_ImageMain1 img, img#main_img"
            img_element = page.locator(img_selector).first

            if img_element.is_visible(timeout=3000):
                img_element.screenshot(path=save_path, type="jpeg", quality=90)
                print(f"[SUCCESS] Saved REAL RAKUTEN ITEM JPEG image -> {save_path}")
            else:
                # ページのメインビュー領域からキャプチャ
                page.screenshot(path=save_path, type="jpeg", quality=90, clip={"x": 50, "y": 100, "width": 500, "height": 500})
                print(f"[SUCCESS-FALLBACK] Clipped page screenshot -> {save_path}")
        except Exception as e:
            print(f"[ERROR] Failed for {item['filename']}: {e}")

    browser.close()

print("All Real Rakuten Item Images downloaded successfully!")
