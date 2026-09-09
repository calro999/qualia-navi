import json, os, sys
from PIL import Image, ImageOps

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

# Collect high-quality local product images by category/theme
category_images = {}
for a in articles:
    cat = a.get('category', 'makeup')
    img = a.get('imageUrl', '')
    if img.startswith('/images/products/') and not 'decorte' in img.lower():
        full_p = os.path.join('public', img.lstrip('/'))
        if os.path.exists(full_p):
            category_images.setdefault(cat, []).append(full_p)

# Also collect theme-specific fallbacks
autumn_images = [
    'public/images/products/aut26-sub-lip-suqqu-moisture-glaze-rouge.jpg',
    'public/images/products/aut26-sub-eye-lunasol-eye-coloration-n.jpg',
    'public/images/products/aut26-sub-cheek-suqqu-pure-color-blush.jpg',
    'public/images/products/aut26-sub-found-shiseido-revitalessence-glow.jpg',
    'public/images/products/aut26-sub-petit-canmake-mushmallow-powder-abloom.jpg',
    'public/images/products/aut26-sub-korea-dasique-mood-shadow-palette-autumn.jpg',
    'public/images/products/aut26-sub-brownlip-kate-lip-monster-05-darkfig.jpg',
    'public/images/products/aut26-sub-pinklip-dior-addict-lip-glow-pink.jpg',
    'public/images/products/aut26-sub-kesshoku-cezanne-face-glow-color-01.jpg'
]
autumn_images = [p for p in autumn_images if os.path.exists(p)]

cleansing_images = [
    'public/images/products/combi-fancl-mild-cleansing-oil-black-pore.jpg',
    'public/images/products/budget-bifesta-micellar-cleansing-water.jpg',
    'public/images/products/art-wash-est-clarifying-cleansing-foam.jpg',
    'public/images/products/art-cleantowel-ito-cleansing-towel-roll.jpg'
]
cleansing_images = [p for p in cleansing_images if os.path.exists(p)]

target_features = [a for a in articles if a.get('id', '').startswith('feature-') and 'collage' not in a.get('imageUrl', '')]
print(f'Creating 4-in-1 collages for {len(target_features)} remaining feature articles...')

generated_count = 0
for feat in target_features:
    fid = feat['id']
    cat = feat.get('category', 'makeup')
    
    # 4 images selection
    selected_imgs = []
    if 'autumn' in fid:
        # Pick 4 from autumn pool uniquely rotated
        offset = (generated_count * 2) % len(autumn_images)
        for i in range(4):
            selected_imgs.append(autumn_images[(offset + i) % len(autumn_images)])
    elif cat == 'cleansing':
        selected_imgs = cleansing_images[:4]
    else:
        pool = category_images.get(cat, category_images.get('skincare', category_images.get('makeup', [])))
        if len(pool) >= 4:
            offset = (generated_count * 3) % len(pool)
            for i in range(4):
                selected_imgs.append(pool[(offset + i) % len(pool)])
        else:
            selected_imgs = (pool + category_images['makeup'])[:4]

    # Create 800x800 collage
    canvas = Image.new('RGB', (800, 800), (255, 255, 255))
    cell_w, cell_h = 400, 400
    pad = 12

    for i, p in enumerate(selected_imgs[:4]):
        x = (i % 2) * cell_w
        y = (i // 2) * cell_h
        im = Image.open(p).convert('RGB')
        fitted = ImageOps.fit(im, (cell_w - pad*2, cell_h - pad*2), Image.Resampling.LANCZOS)
        canvas.paste(fitted, (x + pad, y + pad))

    collage_filename = f'feature-collage-{fid}.jpg'
    out_rel = f'/images/features/{collage_filename}'
    out_full = os.path.join('public', 'images', 'features', collage_filename)
    canvas.save(out_full, 'JPEG', quality=95)

    feat['imageUrl'] = out_rel
    generated_count += 1
    print(f'[{generated_count}/30] Generated {collage_filename}')

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print(f'Done! Successfully generated all {generated_count} collages and updated articles.json.')