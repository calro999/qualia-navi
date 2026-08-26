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

# 価格別特集 5テーマ（各10商品＝計50商品）
price_tier_definitions = {
    # 1. 1,000円以下なのにデパコス級のおすすめコスメ10選
    'feature-price-dupes-under-1000-10': {
        'title': '【1,000円以下】デパコス級おすすめコスメ10選！プチプラの常識を覆す神クオリティ名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '💰 【プチプラ限界突破】1,000円以下おすすめコスメ10選',
        'tier_name': '1,000円以下プチプラ',
        'dupe_appeal': '1,000円以下の価格帯でありながら、デパコスと見紛う粉質・発色・キープ力を誇る究極のコスパコスメ',
        'items': [
            {'kw': 'セザンヌ リップカラーシールド 05', 'fb': 'セザンヌ リップカラーシールド', 'id': 'pr1k-cezanne-lip'},
            {'kw': 'キャンメイク マシュマロフィニッシュパウダー', 'fb': 'マシュマロフィニッシュパウダー', 'id': 'pr1k-canmake-powder'},
            {'kw': 'セザンヌ パールグロウハイライト 01', 'fb': 'パールグロウハイライト 01', 'id': 'pr1k-cezanne-highlight'},
            {'kw': 'キャンメイク クリーミータッチライナー 02', 'fb': 'クリーミータッチライナー', 'id': 'pr1k-canmake-liner'},
            {'kw': 'ちふれ 口紅 詰替用 748', 'fb': 'ちふれ 口紅 748', 'id': 'pr1k-chifure-lip'},
            {'kw': 'キャンメイク むちぷるティント 02', 'fb': 'キャンメイク むちぷるティント', 'id': 'pr1k-canmake-tint'},
            {'kw': 'セザンヌ 超細芯アイブロウ 03', 'fb': 'セザンヌ 超細芯アイブロウ', 'id': 'pr1k-cezanne-eyebrow'},
            {'kw': 'キャンメイク シルキースフレアイズ 07', 'fb': 'シルキースフレアイズ', 'id': 'pr1k-canmake-eyeshadow'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地', 'fb': 'セザンヌ 下地', 'id': 'pr1k-cezanne-primer'},
            {'kw': 'マジョリカマジョルカ ラッシュエキスパンダー ロングロングロング', 'fb': 'マジョリカマジョルカ マスカラ', 'id': 'pr1k-majolica-mascara'}
        ]
    },
    # 2. 2,000円以下なのにデパコス級のおすすめコスメ10選
    'feature-price-dupes-under-2000-10': {
        'title': '【2,000円以下】デパコス級おすすめコスメ10選！ドラコス・韓国コスメの実力派名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '✨ 【高コスパ実力派】2,000円以下おすすめコスメ10選',
        'tier_name': '2,000円以下ミドルプチプラ',
        'dupe_appeal': '2,000円以下で手に入る、処方や使用感が数千円〜1万円のデパコスに匹敵する大ヒット実力派アイテム',
        'items': [
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'KATE リップモンスター 05', 'id': 'pr2k-kate-lipmonster'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fb': 'ヴィセ ネンマクフェイク ルージュ', 'id': 'pr2k-visee-nenmaku'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fb': 'ロムアンド ジューシーラスティングティント', 'id': 'pr2k-romand-juicy'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'pr2k-fwee-pudding'},
            {'kw': 'hince ロウグロウジェルティント', 'fb': 'hince ティント', 'id': 'pr2k-hince-rawglow'},
            {'kw': 'エクセル スキニーリッチシャドウ SR03', 'fb': 'エクセル スキニーリッチシャドウ', 'id': 'pr2k-excel-eyeshadow'},
            {'kw': 'フジコ ニュアンスラップティント 03', 'fb': 'フジコ ニュアンスラップティント', 'id': 'pr2k-fujiko-tint'},
            {'kw': 'ザセム カバーパーフェクション チップコンシーラー', 'fb': 'ザセム チップコンシーラー', 'id': 'pr2k-thesaem-concealer'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー ノーセバムパウダー', 'id': 'pr2k-innisfree-powder'},
            {'kw': 'CLIO プロアイパレット ミニ', 'fb': 'クリオ プロアイパレット ミニ', 'id': 'pr2k-clio-palette'}
        ]
    },
    # 3. 3,000円以下なのにデパコス級のおすすめコスメ10選
    'feature-price-dupes-under-3000-10': {
        'title': '【3,000円以下】デパコス級おすすめコスメ10選！プロも絶賛する上質クオリティ名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '💎 【プロ絶賛クオリティ】3,000円以下おすすめコスメ10選',
        'tier_name': '3,000円以下ハイクオリティ',
        'dupe_appeal': '3,000円以下でありながら、最高峰の美容液成分や高度な微粒子パウダー技術を採用したプロ愛用コスメ',
        'items': [
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'マキアージュ スキンセンサーベース NEO', 'id': 'pr3k-maquillage-base'},
            {'kw': 'マキアージュ ドラマティックパウダリー EX', 'fb': 'マキアージュ ドラマティックパウダリー', 'id': 'pr3k-maquillage-powder'},
            {'kw': 'TIRTIR マスクフィット レッド クッション', 'fb': 'TIRTIR 赤 クッション', 'id': 'pr3k-tirtir-red'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ', 'fb': 'ラロッシュポゼ トーンアップ ローズ', 'id': 'pr3k-larocheposay-rose'},
            {'kw': '&be (アンドビー) UVプライマー', 'fb': '&be UVプライマー', 'id': 'pr3k-andbe-primer'},
            {'kw': 'CLIO キルカバー メッシュグロウ クッション', 'fb': 'CLIO メッシュグロウ クッション', 'id': 'pr3k-clio-mesh'},
            {'kw': 'LANEIGE ネオクッション マット', 'fb': 'ラネージュ ネオクッション マット', 'id': 'pr3k-laneige-matte'},
            {'kw': 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', 'fb': 'プリマヴィスタ 皮脂くずれ防止', 'id': 'pr3k-primavista-base'},
            {'kw': 'dプログラム 薬用 スキンケアファンデーション', 'fb': 'dプログラム ファンデーション', 'id': 'pr3k-dprogram-fd'},
            {'kw': 'コスメデコルテ サンシェルター トーンアップCC', 'fb': 'サンシェルター トーンアップCC', 'id': 'pr3k-decorte-cc'}
        ]
    },
    # 4. 5,000円以下なのにデパコス級のおすすめコスメ10選
    'feature-price-dupes-under-5000-10': {
        'title': '【5,000円以下】デパコス級おすすめコスメ10選！贅沢トリートメント＆高級仕上がり名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '👑 【贅沢仕上がり】5,000円以下おすすめコスメ10選',
        'tier_name': '5,000円以下プレミアム',
        'dupe_appeal': '5,000円以下で手に入る、憧れデパコスのエントリーラインや最高峰トリートメントコスメ',
        'items': [
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー 下地', 'id': 'pr5k-pauljoe-primer'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09', 'fb': 'セルヴォーク 09', 'id': 'pr5k-celvoke-09'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール マキシマイザー 020', 'id': 'pr5k-dior-maximizer'},
            {'kw': 'ディオール アディクト リップ グロウ 001', 'fb': 'ディオール リップグロウ 001', 'id': 'pr5k-dior-lipglow'},
            {'kw': 'M・A・C ラスターガラス リップスティック', 'fb': 'MAC ラスターガラス', 'id': 'pr5k-mac-lipstick'},
            {'kw': 'コスメデコルテ ルース パウダー', 'fb': 'コスメデコルテ フェイスパウダー', 'id': 'pr5k-decorte-powder'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース', 'fb': 'エトヴォス 下地', 'id': 'pr5k-etvos-primer'},
            {'kw': 'RMK リクイドファンデーション フローレスカバレッジ', 'fb': 'RMK リクイドファンデーション', 'id': 'pr5k-rmk-foundation'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'pr5k-jillstuart-blush'},
            {'kw': 'ルナソル アイカラーレーション', 'fb': 'ルナソル アイシャドウ', 'id': 'pr5k-lunasol-shadow'}
        ]
    },
    # 5. 1万円以下の超大人気デパコス10選
    'feature-price-luxury-depacos-under-10000-10': {
        'title': '【1万円以下】超大人気デパコスおすすめ10選！圧倒的オーラと至高の美肌を宿す最高峰名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '💎 【最高峰デパコス】1万円以下超大人気デパコス10選',
        'tier_name': '1万円以下ラグジュアリーデパコス',
        'dupe_appeal': '1万円以下で手に入る、コスメ界の頂点に君臨する最高峰デパコスの殿堂入りラグジュアリーコスメ',
        'items': [
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー ヴォワールコレクチュール', 'id': 'pr10k-cledepeau-primer'},
            {'kw': 'SUQQU シグニチャー カラー アイズ', 'fb': 'SUQQU アイシャドウ', 'id': 'pr10k-suqqu-eyeshadow'},
            {'kw': 'シャネル ルージュ アリュール ラック 75', 'fb': 'シャネル ルージュアリュールラック', 'id': 'pr10k-chanel-laque'},
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 エッセンススキングロウ', 'id': 'pr10k-shiseido-fd'},
            {'kw': 'ディオールスキン フォーエヴァー フルイド グロウ', 'fb': 'ディオール スキングロウ', 'id': 'pr10k-dior-glow'},
            {'kw': 'エスティローダー ダブルウェア ステイインプレイス メークアップ', 'fb': 'エスティローダー ダブルウェア', 'id': 'pr10k-esteelauder-fd'},
            {'kw': 'コスメデコルテ AQ ミリオリティ フェイスパウダー n', 'fb': 'コスメデコルテ AQ パウダー', 'id': 'pr10k-decorte-aq-powder'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'pr10k-ysl-candy'},
            {'kw': 'トムフォード アイ カラー クォード', 'fb': 'トムフォード アイシャドウ', 'id': 'pr10k-tomford-quad'},
            {'kw': 'ルージュ エルメス ボーム ドゥ ソワン', 'fb': 'エルメス リップバーム', 'id': 'pr10k-hermes-lip'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_price_items = {}

for theme_id, theme_meta in price_tier_definitions.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_price_items:
            all_unique_price_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique price tier products to fetch from Rakuten OpenAPI: {len(all_unique_price_items)}")

price_database = {}
if os.path.exists('scratch/rakuten_api_price_tier_db.json'):
    with open('scratch/rakuten_api_price_tier_db.json') as f:
        price_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_price_items.items():
    if unique_id in price_database:
        continue
    
    kw = item_info['kw']
    fb = item_info['fb']
    found = False
    
    for search_query in [kw, fb]:
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
                    
                    local_img_path = f'public/images/products/{unique_id}.jpg'
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
                    
                    price_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_price_tier_db.json', 'w', encoding='utf-8') as f:
                        json.dump(price_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_price_tier_db.json', 'w', encoding='utf-8') as f:
    json.dump(price_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total Price Tier DB items: {len(price_database)} / {len(all_unique_price_items)}")
