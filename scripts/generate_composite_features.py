import json
import random
import os
import requests
from io import BytesIO
from PIL import Image

# Directories
BASE_DIR = "/Users/calro/Downloads/raku-cosme"
DATA_JSON_PATH = os.path.join(BASE_DIR, "src/data/articles.json")
DATA_TS_PATH = os.path.join(BASE_DIR, "src/data.ts")
IMAGES_DIR = os.path.join(BASE_DIR, "public/images/features")

os.makedirs(IMAGES_DIR, exist_ok=True)

# Load articles
with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
    articles = json.load(f)

# Group by category
categories = {}
for art in articles:
    cat = art.get("category")
    if cat not in categories:
        categories[cat] = []
    categories[cat].append(art)

# Pick 30 categories that have at least 4 items
valid_cats = [c for c in categories.keys() if len(categories[c]) >= 4]
chosen_cats = random.sample(valid_cats, min(30, len(valid_cats)))

blog_posts = []

def download_and_crop(url, size=(400, 400)):
    try:
        if url.startswith("http"):
            response = requests.get(url, timeout=5)
            img = Image.open(BytesIO(response.content)).convert("RGB")
        else:
            # Local path
            local_path = os.path.join(BASE_DIR, "public", url.lstrip("/"))
            img = Image.open(local_path).convert("RGB")
            
        # Crop to square
        w, h = img.size
        min_dim = min(w, h)
        left = (w - min_dim) / 2
        top = (h - min_dim) / 2
        right = (w + min_dim) / 2
        bottom = (h + min_dim) / 2
        img = img.crop((left, top, right, bottom))
        img = img.resize(size, Image.Resampling.LANCZOS)
        return img
    except Exception as e:
        print(f"Failed to process image {url}: {e}")
        # Return a blank white image as fallback
        return Image.new("RGB", size, (255, 255, 255))

for idx, cat in enumerate(chosen_cats):
    cat_items = random.sample(categories[cat], 4)
    cat_name = cat_items[0].get("categoryLabel", cat)
    
    print(f"Generating feature for: {cat_name}")
    
    # Generate 2x2 grid composite image
    img1 = download_and_crop(cat_items[0]["imageUrl"])
    img2 = download_and_crop(cat_items[1]["imageUrl"])
    img3 = download_and_crop(cat_items[2]["imageUrl"])
    img4 = download_and_crop(cat_items[3]["imageUrl"])
    
    # Create an 800x800 blank canvas
    composite = Image.new("RGB", (800, 800), (255, 255, 255))
    composite.paste(img1, (0, 0))
    composite.paste(img2, (400, 0))
    composite.paste(img3, (0, 400))
    composite.paste(img4, (400, 400))
    
    # Save the composite image
    image_filename = f"composite_{cat}_{idx}.jpg"
    image_path = os.path.join(IMAGES_DIR, image_filename)
    composite.save(image_path, quality=85)
    
    cover_image_url = f"/images/features/{image_filename}"
    
    # Prepare markdown content
    markdown = f"# {cat_name} 厳選アイテム大特集！\n\nQualia編集部が、現在最も注目の集まる「{cat_name}」カテゴリから、厳選した4アイテムを徹底解説します。\n\n"
    
    for item in cat_items:
        markdown += f"## {item['productName']}\n\n"
        markdown += f"**楽天参考価格:** {item.get('rakutenPrice', '価格未定')}  \n"
        markdown += f"**評価:** ⭐️ {item.get('starRating', '4.5')} ({item.get('reviewCount', 0)}件)  \n\n"
        markdown += f"{item.get('introText', '')}\n\n"
        
        features = item.get('features', [])
        if features:
            markdown += "### 注目のポイント\n"
            for feature in features:
                markdown += f"- {feature}\n"
            markdown += "\n"
            
    markdown += "---\n\n*この記事は自動生成されたまとめ記事です。各商品の詳細は詳細ページよりご確認ください。*\n"
    
    # Create BlogPost entry
    post_id = f"post-composite-{cat}-{idx}"
    blog_posts.append(f"""
  {{
    id: '{post_id}',
    title: '【2026最新】{cat_name} 人気アイテム4選！徹底比較',
    subtitle: '{cat_name}カテゴリで今一番売れている話題のアイテムを集めました。',
    slug: 'composite-{cat}-{idx}',
    targetGender: 'women',
    coverImage: '{cover_image_url}',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'Qualia メイク専属アナリスト',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-07-28',
    readTimeMinutes: 5,
    introText: 'Qualia編集部が厳選した{cat_name}のアイテムをご紹介します。',
    recommendedItemCodes: {json.dumps([item['itemCode'] for item in cat_items], ensure_ascii=False)},
    contentMarkdown: `{markdown}`
  }}""")

print(f"Generated {len(blog_posts)} blog posts.")

# Inject into src/data.ts
with open(DATA_TS_PATH, "r", encoding="utf-8") as f:
    data_ts_content = f.read()

# Find the end of INITIAL_BLOG_POSTS
target_pattern = "export const INITIAL_COMPARISONS"
if target_pattern in data_ts_content:
    injection = ",\n" + ",\n".join(blog_posts) + "\n];\n\n"
    # Find the last "];" before INITIAL_COMPARISONS
    parts = data_ts_content.split(target_pattern)
    before = parts[0]
    after = target_pattern + parts[1]
    
    # replace the last "];" in 'before' with our injection
    last_bracket = before.rfind("];")
    if last_bracket != -1:
        new_before = before[:last_bracket] + injection
        new_content = new_before + after
        with open(DATA_TS_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully injected new blog posts into data.ts")
    else:
        print("Could not find ]; before INITIAL_COMPARISONS")
