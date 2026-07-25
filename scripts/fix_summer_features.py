#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request, urllib.parse, ssl, re, os, time

ssl._create_default_https_context = ssl._create_unverified_context
HEADERS = {'User-Agent': 'Mozilla/5.0'}
AFF = '54d2a438.4bc4abc2.54d2a439.aa1be583'

def make_aff(url):
    return f'https://hb.afl.rakuten.co.jp/hgc/{AFF}/?pc={urllib.parse.quote(url, safe="")}'

def make_btn(url, title):
    return f'<a href="{make_aff(url)}" class="affiliate-btn" target="_blank" rel="nofollow noopener">【楽天】{title}の最安値・口コミをチェック ▶</a>'

def make_img(img_path, title):
    return f'![{title}]({img_path})'

def make_html(img_path, title, url):
    return f'\n\n{make_img(img_path, title)}\n\n{make_btn(url, title)}\n\n'

# Real scraped URLs and Images
data = {
    'anessa': ('アネッサ パーフェクトUV スキンケアミルク NA', '/images/products/topic_suncare_anessa.jpg', 'https://item.rakuten.co.jp/rakuten24/4909978147105/'),
    'biore': ('ビオレUV アクアリッチ ウォータリーエッセンス', '/images/products/topic_suncare_biore.jpg', 'https://item.rakuten.co.jp/elonline522/4027-000827/'),
    'elegance': ('エレガンス ラ プードル オートニュアンス', '/images/products/elegance_poudre.jpg', 'https://item.rakuten.co.jp/k-fleur/elegance-poudre-4/'),
    'lancome': ('ランコム タンイドル ウルトラ ウェア リキッド', '/images/products/lancome_teint.jpg', 'https://item.rakuten.co.jp/blanc-lapin/lanhl0000001/'),
    'maybelline': ('メイベリン スカイハイ', '/images/products/maybelline_skyhigh.jpg', 'https://item.rakuten.co.jp/rakuten24/4936968688463/'),
    'lipmonster': ('KATE リップモンスター', '/images/products/topic_makeup_lipmonster.jpg', 'https://item.rakuten.co.jp/matukiyo/4973167825227/'),
    'deonature': ('デオナチュレ ソフトストーンW', '/images/products/topic_body_deonature.jpg', 'https://item.rakuten.co.jp/rakuten24/4971825016582/'),
    'agdeo': ('エージーデオ24 パウダースプレー', '/images/products/topic_body_agdeo24.jpg', 'https://item.rakuten.co.jp/rakuten24/4550516493286/'),
    'decorte': ('コスメデコルテ リポソーム アドバンスト リペアセラム', '/images/products/topic_skincare_decorte.jpg', 'https://item.rakuten.co.jp/marble-inc/2915-000507/'),
    'vt': ('VT リードルショット 100', '/images/products/topic_kbeauty_vt.jpg', 'https://item.rakuten.co.jp/nextera2021/reedles/'),
}

# Image downloading for new images
import urllib.request
new_imgs = {
    '/images/products/elegance_poudre.jpg': 'https://thumbnail.image.rakuten.co.jp/@0_mall/k-fleur/cabinet/09930776/09988574/p-4.jpg',
    '/images/products/lancome_teint.jpg': 'https://thumbnail.image.rakuten.co.jp/@0_mall/blanc-lapin/cabinet/2018/lanhl0000001.jpg',
    '/images/products/maybelline_skyhigh.jpg': 'https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/463/4936968688463.jpg'
}
for path, url in new_imgs.items():
    local = f'/Users/calro/Downloads/raku-cosme/public{path}'
    if not os.path.exists(local):
        print(f"Downloading {url} to {local}")
        urllib.request.urlretrieve(url, local)

# Update data.ts
with open('src/data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update cover images
text = re.sub(
    r"(id:\s*'feature-summer-uv'.*?coverImage:\s*')[^']+(')",
    r"\1/images/products/topic_suncare_anessa.jpg\2",
    text, flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'feature-summer-cosmetics'.*?coverImage:\s*')[^']+(')",
    r"\1/images/products/topic_makeup_lipmonster.jpg\2",
    text, flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'feature-summer-body-odor'.*?coverImage:\s*')[^']+(')",
    r"\1/images/products/topic_body_deonature.jpg\2",
    text, flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'blog-001'.*?coverImage:\s*')[^']+(')",
    r"\1/images/products/topic_skincare_decorte.jpg\2",
    text, flags=re.DOTALL
)

# 2. Inject into blog-001
text = text.replace(
    '実質最安値級で入手可能。',
    '実質最安値級で入手可能。' + make_html(*data['decorte'])
)
text = text.replace(
    '落とせる肌への優しさも両立。',
    '落とせる肌への優しさも両立。' + make_html(*data['anessa'])
)
text = text.replace(
    'シートマスクの豪華プレゼントキャンペーンを実施中。',
    'シートマスクの豪華プレゼントキャンペーンを実施中。' + make_html(*data['vt'])
)

# 3. Inject into feature-summer-uv
text = text.replace(
    '選ぶことが重要です。',
    '選ぶことが重要です。' + make_html(*data['anessa'])
)
text = text.replace(
    '落とせる手軽さも重要です。',
    '落とせる手軽さも重要です。' + make_html(*data['biore'])
)
text = text.replace(
    '紫外線をブロックできます。',
    '紫外線をブロックできます。' + make_html(*data['elegance'])
)

# 4. Inject into feature-summer-cosmetics
text = text.replace(
    '密着力が段違いに上がります。',
    '密着力が段違いに上がります。' + make_html(*data['lancome'])
)
text = text.replace(
    '顔全体をサラサラの陶器肌に仕上げます。これが夏の皮脂を完全にブロックする要です。',
    '顔全体をサラサラの陶器肌に仕上げます。これが夏の皮脂を完全にブロックする要です。' + make_html(*data['elegance'])
)
text = text.replace(
    '防げます。',
    '防げます。' + make_html(*data['maybelline'])
)
text = text.replace(
    'コップへの色移りを完全に防ぐことができます。',
    'コップへの色移りを完全に防ぐことができます。' + make_html(*data['lipmonster'])
)

# 5. Inject into feature-summer-body-odor
text = text.replace(
    '絶対に臭わせません。',
    '絶対に臭わせません。' + make_html(*data['deonature'])
)
text = text.replace(
    'サラサラで無臭の空間を作り出すことができます。',
    'サラサラで無臭の空間を作り出すことができます。' + make_html(*data['agdeo'])
)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updates complete!")
