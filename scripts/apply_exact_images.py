import re

mapping = {
    # 特集・レビュー記事
    '2026-summer-skincare-guide': '/images/products/curel_uv_essence.jpg',
    '2026-summer-cosmetics': '/images/products/tirtir_red.jpg',
    '2026-summer-body-odor': '/images/products/deoco.jpg',
    '2026-summer-uv-care': '/images/products/anessa.jpg',
    'decorte-liposome-review': '/images/products/decorte_liposome.jpg',
    'anessa-uv-milk-review': '/images/products/anessa_uv_milk.jpg',
    'vt-reedle-shot-review': '/images/products/vt_reedle_shot_100.jpg',

    # 比較記事
    'decorte-vs-vt': '/images/products/decorte_liposome.jpg',
    'tirtir-vs-pauljoe': '/images/products/tirtir_red.jpg',
    'anessa-vs-nivea': '/images/products/anessa_uv_milk.jpg',
    'fancl-vs-kanebo': '/images/products/fancl_cleansing.jpg',
    'agdeo24-vs-deonature': '/images/products/ag24.jpg',
    'kate-vs-romand': '/images/products/kate_lip_monster.jpg',
    'fino-vs-tsubaki': '/images/products/art-b0073b9yj6.jpg',
    'decorte-vs-elegance': '/images/products/nars_powder.jpg',
    'duo-vs-banilaco': '/images/products/art-b07b4v48z1.jpg',
    'obagi-vs-melanocc': '/images/products/melanocc_premium.jpg',
    'kiehls-vs-innisfree': '/images/products/innisfree.jpg',
    'loveliner-vs-uzu': '/images/products/fasio_eyeliner.jpg',
    'skyhigh-vs-heroinemake': '/images/products/heroinemake_mascara.jpg',
    'lancome-vs-dior': '/images/products/excel_base.jpg',
    'lunasol-vs-excel': '/images/products/fujiko_mayutint.jpg',
    'skii-vs-missha': '/images/products/shirojyun_premium.jpg',
    'n-dot-vs-track-oil': '/images/products/sabon_headscrub.jpg',
    'lululun-vs-vtcica': '/images/products/lululun-green.jpg',
    'laroche-vs-paulandjoe': '/images/products/larocheposay_rose.jpg',
    'thesaem-vs-nars': '/images/products/innisfree_nosebum.jpg',
    'nars-vs-clinique': '/images/products/art-b089k8l6y2.jpg',
    'dior-vs-borica': '/images/products/melty-lip.jpg',
    'tangleteezer-vs-refa': '/images/products/scalp-d.jpg',
    'suisai-vs-obagi': '/images/products/art-b0842qz19p-2.jpg',
    'vtcica-vs-acneslabo': '/images/products/orbis_clearful.jpg',
    'yolu-vs-andhoney': '/images/products/diane_dryshampoo.jpg',
    'loccitane-vs-aesop': '/images/products/curel_cream.jpg',
}

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace each item's coverImage based on its slug
for slug, img_path in mapping.items():
    # Find block starting with slug: 'slug' and update coverImage inside it
    pattern = rf"(slug:\s*['\"]{re.escape(slug)}['\"].*?coverImage:\s*['\"])(.*?)(['\"])"
    content = re.sub(pattern, rf"\g<1>{img_path}\g<3>", content, flags=re.DOTALL)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Accurate image mapping complete!")
