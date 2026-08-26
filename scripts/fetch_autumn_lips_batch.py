# -*- coding: utf-8 -*-
import os
import urllib.request
import urllib.parse
import json
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

if os.path.exists('.env'):
    with open('.env') as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                os.environ[k] = v

app_id = os.environ.get('RAKUTEN_APP_ID')
affiliate_id = os.environ.get('RAKUTEN_AFFILIATE_ID')
access_key = os.environ.get('RAKUTEN_ACCESS_KEY')
base_url = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401'

# 18テーマの秋リップ特化商品リスト（各テーマの代表・重要アイテム）
lip_themes_items = {
    # 1. 2026秋リップおすすめ10選
    'autlip-rec-suqqu-moisture-glaze': {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fallback': 'スック リップ'},
    # 2. 秋におすすめのブラウンリップ10選
    'autlip-brown-kate-dark-fig': {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fallback': 'リップモンスター 05'},
    # 3. 秋におすすめのローズリップ10選
    'autlip-rose-chanel-rouge-allure-laque-75': {'kw': 'シャネル ルージュ アリュール ラック 75', 'fallback': 'シャネル リップ 75'},
    # 4. 秋におすすめのピンクリップ10選
    'autlip-pink-dior-maximizer-020': {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fallback': 'ディオール マキシマイザー 020'},
    # 5. 秋におすすめの赤リップ10選
    'autlip-red-ysl-candy-glaze-bourbon': {'kw': 'イヴサンローラン ルージュ ヴォリュプテ キャンディグレーズ', 'fallback': 'キャンディグレーズ'},
    # 6. 秋におすすめの粘膜リップ10選
    'autlip-nenmaku-visee-fake-pk850': {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fallback': 'ネンマクフェイク ルージュ PK850'},
    # 7. 秋におすすめのプチプラリップ10選
    'autlip-petit-cezanne-lip-color-shield-05': {'kw': 'セザンヌ リップカラーシールド 05', 'fallback': 'セザンヌ リップカラーシールド'},
    # 8. 秋におすすめのデパコスリップ10選
    'autlip-depa-celvoke-dignified-lips-09': {'kw': 'セルヴォーク ディグニファイド リップス 09', 'fallback': 'セルヴォーク 09'},
    # 9. 秋におすすめの韓国リップ10選
    'autlip-korea-romand-juicy-lasting-13': {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fallback': 'ジューシーラスティングティント 13'},
    # 10. ブルベ夏 秋リップ10選
    'autlip-pc-summer-romand-dewyful-06': {'kw': 'ロムアンド デュイフル ウォーター ティント 06', 'fallback': 'ロムアンド 06'},
    # 11. ブルベ冬 秋リップ10選
    'autlip-pc-winter-kate-lip-monster-07': {'kw': 'KATE リップモンスター 07 ラスボス', 'fallback': 'リップモンスター 07'},
    # 12. イエベ春 秋リップ10選
    'autlip-pc-spring-fujiko-nuance-wrap-03': {'kw': 'フジコ ニュアンスラップティント 03', 'fallback': 'フジコ ニュアンスラップティント'},
    # 13. イエベ秋 秋リップ10選
    'autlip-pc-autumn-laka-bonding-glow-201': {'kw': 'Laka ボンディンググロウリップスティック', 'fallback': 'Laka リップ'},
    # 14. 落ちにくい秋リップ10選
    'autlip-func-stay-kate-lip-monster-10': {'kw': 'KATE リップモンスター 10 地底探索', 'fallback': 'リップモンスター 10'},
    # 15. 色持ちのいい秋リップ10選
    'autlip-func-tint-opera-lip-tint-n-terracotta': {'kw': 'オペラ リップティント N 09 テラコッタ', 'fallback': 'オペラ リップティント テラコッタ'},
    # 16. ツヤ系秋リップ10選
    'autlip-func-gloss-hince-raw-glow-gel-tint': {'kw': 'hince ロウグロウジェルティント', 'fallback': 'hince ティント'},
    # 17. マット系秋リップ10選
    'autlip-func-matte-mac-powder-kiss-devoted': {'kw': 'MAC パウダー キス リップスティック', 'fallback': 'MAC リップスティック'},
    # 18. 乾燥しにくい秋リップ10選
    'autlip-func-moist-dior-addict-lip-glow-pink': {'kw': 'ディオール アディクト リップ グロウ 001', 'fallback': 'ディオール リップグロウ'}
}

os.makedirs('public/images/products', exist_ok=True)
all_fetched = {}
headers = {'User-Agent': 'Mozilla/5.0'}

print('=== Fetching 18 Autumn Lip Theme Representative Items from Rakuten OpenAPI ===')
for item_id, item_meta in lip_themes_items.items():
    kw = item_meta['kw']
    fallback_kw = item_meta['fallback']
    
    found = False
    for search_query in [kw, fallback_kw]:
        time.sleep(1.2)
        params = {
            'applicationId': app_id,
            'accessKey': access_key,
            'keyword': search_query,
            'hits': 1,
            'format': 'json'
        }
        if affiliate_id:
            params['affiliateId'] = affiliate_id
        
        url = f'{base_url}?{urllib.parse.urlencode(params)}'
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=10) as res:
                data = json.loads(res.read().decode('utf-8'))
                items_res = data.get('Items', [])
                if items_res:
                    it = items_res[0].get('Item', {})
                    item_name = it.get('itemName')
                    item_price = it.get('itemPrice')
                    shop_name = it.get('shopName')
                    affiliate_url = it.get('affiliateUrl') or it.get('itemUrl')
                    
                    medium_images = it.get('mediumImageUrls', [])
                    img_url = None
                    if medium_images:
                        if isinstance(medium_images[0], dict):
                            img_url = medium_images[0].get('imageUrl')
                        else:
                            img_url = medium_images[0]
                    
                    local_img_path = f'public/images/products/{item_id}.jpg'
                    if img_url:
                        high_res_url = img_url.split('?_ex=')[0] + '?_ex=500x500' if '?_ex=' in img_url else img_url + '?_ex=500x500'
                        try:
                            img_req = urllib.request.Request(high_res_url, headers=headers)
                            with urllib.request.urlopen(img_req, context=ctx, timeout=10) as img_res:
                                img_data = img_res.read()
                                if len(img_data) > 500:
                                    with open(local_img_path, 'wb') as img_f:
                                        img_f.write(img_data)
                                    print(f'  [IMG OK] {local_img_path} ({len(img_data)} bytes)')
                        except Exception as img_err:
                            print(f'  [IMG ERR] {img_err}')
                    
                    all_fetched[item_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{item_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {item_id} -> {item_name[:35]} | {item_price}円 ({shop_name})')
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {item_id}')

print(f'\nTotal successfully fetched: {len(all_fetched)} / {len(lip_themes_items)}')
with open('scratch/rakuten_api_autumn_lips_cluster.json', 'w', encoding='utf-8') as f:
    json.dump(all_fetched, f, ensure_ascii=False, indent=2)
