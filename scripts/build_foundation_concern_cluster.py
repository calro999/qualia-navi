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

# 8テーマ × 各10商品 = 計80商品の定義
foundation_concerns = {
    # 1. 毛穴を隠せるファンデーション10選
    'feature-foundation-pore-coverage-10': {
        'title': '【毛穴カバー】毛穴を隠せるファンデーション10選！凹凸フラット＆至高の陶器肌を叶える名品徹底比較',
        'categoryLabel': '✨ 【毛穴悩み特化】毛穴を隠せるファンデーション10選',
        'concern': '開き毛穴・たるみ毛穴・黒ずみ毛穴のカバー',
        'items': [
            {'kw': 'シュウウエムラ アンリミテッド ラスティング フルイド', 'fb': 'シュウウエムラ ファンデーション', 'id': 'fd-pore-shuuemura'},
            {'kw': 'ディオールスキン フォーエヴァー フルイド マット', 'fb': 'ディオール フォーエヴァー マット', 'id': 'fd-pore-dior-matte'},
            {'kw': 'エスティローダー ダブルウェア ステイインプレイス', 'fb': 'エスティローダー ダブルウェア', 'id': 'fd-pore-esteelauder'},
            {'kw': 'マキアージュ ドラマティックパウダリー EX', 'fb': 'マキアージュ パウダリー EX', 'id': 'fd-pore-maquillage'},
            {'kw': 'KATE リアルカバーリキッド ライトグロウ', 'fb': 'KATE リアルカバーリキッド', 'id': 'fd-pore-kate-realcover'},
            {'kw': 'メイベリン フィットミー リキッド ファンデーション R', 'fb': 'メイベリン フィットミー R', 'id': 'fd-pore-maybelline'},
            {'kw': 'ランコム タンイドル ウルトラ ウェア リキッド N', 'fb': 'ランコム タンイドル N', 'id': 'fd-pore-lancome'},
            {'kw': 'TIRTIR マスクフィット オールカバー クッション', 'fb': 'TIRTIR ピンク クッション', 'id': 'fd-pore-tirtir-pink'},
            {'kw': 'コスメデコルテ ゼン ウェア フルイド', 'fb': 'コスメデコルテ ゼンウェア', 'id': 'fd-pore-decorte-zen'},
            {'kw': 'キャンメイク マシュマロフィニッシュパウダー', 'fb': 'マシュマロフィニッシュパウダー', 'id': 'fd-pore-canmake-powder'}
        ]
    },
    # 2. 毛穴落ちしにくいファンデーション10選
    'feature-foundation-poreless-stay-10': {
        'title': '【毛穴落ち防止】毛穴落ちしにくいファンデーション10選！夕方でもドット状に崩れない密着美肌ルポ徹底比較',
        'categoryLabel': '🛡️ 【毛穴悩み特化】毛穴落ちしにくいファンデーション10選',
        'concern': '皮脂や表情の動きによる毛穴落ち・ドット崩れ防止',
        'items': [
            {'kw': 'ランコム タンイドル ウルトラ ウェア リキッド N', 'fb': 'ランコム タンイドル', 'id': 'fd-drop-lancome'},
            {'kw': 'コスメデコルテ ゼン ウェア フルイド', 'fb': 'ゼン ウェア フルイド', 'id': 'fd-drop-decorte'},
            {'kw': 'ローラメルシエ リアル フローレス ウェイトレス パーフェクティング', 'fb': 'ローラメルシエ ファンデーション', 'id': 'fd-drop-lauramercier'},
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'マキアージュ スキンセンサーベース', 'id': 'fd-drop-maquillage-base'},
            {'kw': 'エスティローダー ダブルウェア ステイインプレイス', 'fb': 'ダブルウェア ステイインプレイス', 'id': 'fd-drop-esteelauder'},
            {'kw': 'RMK ラスティング ジェルクリーミィファンデーション', 'fb': 'RMK ジェルクリーミィ', 'id': 'fd-drop-rmk-gel'},
            {'kw': 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', 'fb': 'プリマヴィスタ 皮脂くずれ防止', 'id': 'fd-drop-primavista'},
            {'kw': 'CLIO キルカバー ハイグロウ クッション', 'fb': 'CLIO キルカバー クッション', 'id': 'fd-drop-clio-killcover'},
            {'kw': 'KATE リップモンスター / カラーコントロール', 'fb': 'KATE ムーンプレスト パウダー', 'id': 'fd-drop-kate-powder'},
            {'kw': 'コーセー メイクキープミスト EX COOL', 'fb': 'メイクキープミスト EX', 'id': 'fd-drop-kose-keepmist'}
        ]
    },
    # 3. 崩れにくいファンデーション10選
    'feature-foundation-long-lasting-10': {
        'title': '【鉄壁キープ】崩れにくいファンデーション10選！猛暑・マスク・皮脂に負けない24時間ラスティング徹底比較',
        'categoryLabel': '🔒 【耐久特化】崩れにくいファンデーション10選',
        'concern': '汗・皮脂・摩擦によるメイク崩れ・テカリ・ヨレの防止',
        'items': [
            {'kw': 'エスティローダー ダブルウェア ステイインプレイス メークアップ', 'fb': 'エスティローダー ダブルウェア', 'id': 'fd-stay-esteelauder'},
            {'kw': 'TIRTIR マスクフィット レッド クッション', 'fb': 'TIRTIR 赤 クッション', 'id': 'fd-stay-tirtir-red'},
            {'kw': 'シュウウエムラ アンリミテッド ラスティング フルイド', 'fb': 'シュウウエムラ アンリミテッド', 'id': 'fd-stay-shuuemura'},
            {'kw': 'ディオールスキン フォーエヴァー フルイド マット', 'fb': 'ディオール フルイド マット', 'id': 'fd-stay-dior-matte'},
            {'kw': 'ランコム タンイドル ウルトラ ウェア リキッド N', 'fb': 'ランコム タンイドル リキッド', 'id': 'fd-stay-lancome'},
            {'kw': 'メイベリン SPステイ ルミマット リキッド ファンデーション', 'fb': 'メイベリン ルミマット', 'id': 'fd-stay-maybelline-lumimatte'},
            {'kw': 'KATE リアルカバーリキッド セミマット', 'fb': 'KATE リアルカバーリキッド', 'id': 'fd-stay-kate'},
            {'kw': 'マキアージュ ドラマティックパウダリー EX', 'fb': 'マキアージュ パウダリー', 'id': 'fd-stay-maquillage'},
            {'kw': 'CLIO メッシュグロウ クッション', 'fb': 'CLIO メッシュグロウ', 'id': 'fd-stay-clio-mesh'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー ノーセバム パウダー', 'id': 'fd-stay-innisfree-powder'}
        ]
    },
    # 4. 混合肌向けファンデーション10選
    'feature-foundation-combination-skin-10': {
        'title': '【混合肌向け】ファンデーションおすすめ10選！TゾーンのテカリとUゾーンの乾燥を両立ケアする名品徹底比較',
        'categoryLabel': '⚖️ 【肌質別特化】混合肌向けファンデーション10選',
        'concern': 'Tゾーンのベタつきと頬・口元の乾燥・カサつきのバランス調整',
        'items': [
            {'kw': 'コスメデコルテ ゼン ウェア フルイド', 'fb': 'コスメデコルテ ゼンウェア', 'id': 'fd-comb-decorte-zen'},
            {'kw': 'シュウウエムラ アンリミテッド ケア フルイド ファンデーション', 'fb': 'シュウウエムラ アンリミテッドケア', 'id': 'fd-comb-shuuemura-care'},
            {'kw': 'ディオールスキン フォーエヴァー スキン グロウ', 'fb': 'ディオール スキングロウ', 'id': 'fd-comb-dior-glow'},
            {'kw': 'マキアージュ ドラマティックエッセンスリキッド', 'fb': 'マキアージュ エッセンスリキッド', 'id': 'fd-comb-maquillage-essence'},
            {'kw': 'RMK リクイドファンデーション フローレスカバレッジ', 'fb': 'RMK フローレスカバレッジ', 'id': 'fd-comb-rmk-flawless'},
            {'kw': 'LANEIGE ネオクッション マット', 'fb': 'ラネージュ ネオクッション マット', 'id': 'fd-comb-laneige-matte'},
            {'kw': 'セザンヌ クッションファンデーション', 'fb': 'セザンヌ クッションファンデ', 'id': 'fd-comb-cezanne-cushion'},
            {'kw': 'MISSHA M クッション ファンデーション プロカバー', 'fb': 'ミシャ プロカバー', 'id': 'fd-comb-missha-pro'},
            {'kw': 'エクセル スキンテザリング ファンデーション', 'fb': 'エクセル ファンデーション', 'id': 'fd-comb-excel'},
            {'kw': 'カネボウ コンフォート スキン ウェア', 'fb': 'カネボウ コンフォートスキン', 'id': 'fd-comb-kanebo-comfort'}
        ]
    },
    # 5. 乾燥肌向けファンデーション10選
    'feature-foundation-dry-skin-moist-10': {
        'title': '【乾燥肌向け】ファンデーションおすすめ10選！美容液80%以上配合で一日中うるおい続く高保湿ルポ徹底比較',
        'categoryLabel': '💧 【肌質別特化】乾燥肌向けファンデーション10選',
        'concern': '粉ふき・皮むけ・カサつきを防ぐ濃密保湿＆うるおいキープ',
        'items': [
            {'kw': 'SUQQU ザ ファンデーション', 'fb': 'SUQQU ファンデーション', 'id': 'fd-dry-suqqu-the'},
            {'kw': 'クレ・ド・ポー ボーテ ル・フォンドゥタン n', 'fb': 'クレドポー ルフォンドゥタン', 'id': 'fd-dry-cledepeau'},
            {'kw': 'ボビイブラウン インテンシブ スキン セラム ファンデーション', 'fb': 'ボビイブラウン 美容液ファンデ', 'id': 'fd-dry-bobbibrown-serum'},
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 エッセンススキングロウ', 'id': 'fd-dry-shiseido-serum'},
            {'kw': 'ディオールスキン フォーエヴァー スキン グロウ', 'fb': 'ディオール フォーエヴァー グロウ', 'id': 'fd-dry-dior-glow'},
            {'kw': 'マキアージュ ドラマティックエッセンスリキッド', 'fb': 'ドラマティックエッセンスリキッド', 'id': 'fd-dry-maquillage-essence'},
            {'kw': 'エトヴォス ミネラルフレッシュスキンリキッド', 'fb': 'エトヴォス ミネラルリキッド', 'id': 'fd-dry-etvos-fresh'},
            {'kw': 'hince セカンドスキン メッシュマット クッション', 'fb': 'hince メッシュ クッション', 'id': 'fd-dry-hince-cushion'},
            {'kw': 'dプログラム 薬用 スキンケアファンデーション リキッド', 'fb': 'dプログラム リキッドファンデ', 'id': 'fd-dry-dprogram'},
            {'kw': 'キュレル 潤浸保湿 ベースメイク BBクリーム', 'fb': 'キュレル BBクリーム', 'id': 'fd-dry-curel-bb'}
        ]
    },
    # 6. 脂性肌向けファンデーション10選
    'feature-foundation-oily-skin-matte-10': {
        'title': '【脂性肌・オイリー肌向け】ファンデーションおすすめ10選！皮脂吸着パウダーでテカリ知らずのサラサラ肌徹底比較',
        'categoryLabel': '🔥 【肌質別特化】脂性肌向けファンデーション10選',
        'concern': '過剰皮脂によるテカリ・ドロドロ崩れ・ヌルつきの完全防止',
        'items': [
            {'kw': 'エスティローダー ダブルウェア ステイインプレイス', 'fb': 'ダブルウェア エスティローダー', 'id': 'fd-oily-esteelauder'},
            {'kw': 'シュウウエムラ アンリミテッド ラスティング フルイド', 'fb': 'シュウウエムラ アンリミテッド', 'id': 'fd-oily-shuuemura'},
            {'kw': 'メイベリン フィットミー リキッド ファンデーション R', 'fb': 'メイベリン フィットミー R', 'id': 'fd-oily-maybelline'},
            {'kw': 'ディオールスキン フォーエヴァー フルイド マット', 'fb': 'ディオール フォーエヴァー マット', 'id': 'fd-oily-dior-matte'},
            {'kw': 'KATE リアルカバーリキッド セミマット', 'fb': 'KATE リアルカバー セミマット', 'id': 'fd-oily-kate-matte'},
            {'kw': 'マキアージュ ドラマティックパウダリー EX', 'fb': 'マキアージュ ドラマティックパウダリー', 'id': 'fd-oily-maquillage'},
            {'kw': 'プリマヴィスタ ダブルエフェクト パウダー', 'fb': 'プリマヴィスタ パウダーファンデ', 'id': 'fd-oily-primavista'},
            {'kw': 'TIRTIR マスクフィット オールカバー クッション', 'fb': 'TIRTIR ピンク クッション', 'id': 'fd-oily-tirtir-pink'},
            {'kw': 'LANEIGE ネオクッション マット', 'fb': 'ラネージュ ネオクッション', 'id': 'fd-oily-laneige'},
            {'kw': 'イニスフリー ノーセバム パウダリー クッション', 'fb': 'イニスフリー クッションファンデ', 'id': 'fd-oily-innisfree'}
        ]
    },
    # 7. ツヤ肌になれるファンデーション10選
    'feature-foundation-dewy-glow-skin-10': {
        'title': '【水光・生ツヤ】ツヤ肌になれるファンデーションおすすめ10選！内側から発光する水光肌ルポ徹底比較',
        'categoryLabel': '💎 【仕上がり特化】ツヤ肌になれるファンデーション10選',
        'concern': 'みずみずしい光沢感・立体感・若々しい水光生ツヤ肌の実現',
        'items': [
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 エッセンススキングロウ', 'id': 'fd-glow-shiseido-serum'},
            {'kw': 'SUQQU ザ リクイド ファンデーション', 'fb': 'SUQQU リクイドファンデーション', 'id': 'fd-glow-suqqu-liquid'},
            {'kw': 'ディオールスキン フォーエヴァー スキン グロウ', 'fb': 'ディオール スキングロウ', 'id': 'fd-glow-dior-glow'},
            {'kw': 'CLIO キルカバー メッシュグロウ クッション', 'fb': 'CLIO メッシュグロウ', 'id': 'fd-glow-clio-mesh'},
            {'kw': 'TIRTIR マスクフィット オーラクッション', 'fb': 'TIRTIR シルバー クッション', 'id': 'fd-glow-tirtir-silver'},
            {'kw': 'RMK リクイドファンデーション フローレスカバレッジ', 'fb': 'RMK フローレスカバレッジ', 'id': 'fd-glow-rmk-flawless'},
            {'kw': 'hince セカンドスキン グロウ クッション', 'fb': 'hince グロウ クッション', 'id': 'fd-glow-hince-glow'},
            {'kw': 'ローラメルシエ フローレス ルミエール ラディアンス パーフェクティング', 'fb': 'ローラメルシエ クッション', 'id': 'fd-glow-lauramercier'},
            {'kw': 'エスポア プロテーラー ビーグロウ クッション', 'fb': 'エスポア ビーグロウ', 'id': 'fd-glow-espoir'},
            {'kw': 'セザンヌ クッションファンデーション', 'fb': 'セザンヌ クッションファンデ', 'id': 'fd-glow-cezanne'}
        ]
    },
    # 8. 素肌感のあるファンデーション10選
    'feature-foundation-natural-bare-skin-10': {
        'title': '【素肌感・薄膜】素肌感のあるファンデーションおすすめ10選！厚塗り感ゼロで元から美肌に見せる名品徹底比較',
        'categoryLabel': '🌿 【仕上がり特化】素肌感のあるファンデーション10選',
        'concern': '厚塗り感のない軽やかな薄膜密着・元から肌が綺麗な人のような仕上がり',
        'items': [
            {'kw': 'カネボウ コンフォート スキン ウェア', 'fb': 'KANEBO コンフォートスキンウェア', 'id': 'fd-bare-kanebo-comfort'},
            {'kw': 'RMK リクイドファンデーション フローレスカバレッジ', 'fb': 'RMK リクイドファンデーション', 'id': 'fd-bare-rmk-liquid'},
            {'kw': 'ローラメルシエ リアル フローレス ウェイトレス パーフェクティング', 'fb': 'ローラメルシエ ファンデーション', 'id': 'fd-bare-lauramercier'},
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 美容液ファンデ', 'id': 'fd-bare-shiseido'},
            {'kw': 'シュウウエムラ アンリミテッド ケア フルイド', 'fb': 'シュウウエムラ ケアフルイド', 'id': 'fd-bare-shuuemura'},
            {'kw': 'hince セカンドスキン ファンデーション', 'fb': 'hince セカンドスキン', 'id': 'fd-bare-hince-secondskin'},
            {'kw': 'エトヴォス ミネラルフレッシュスキンリキッド', 'fb': 'エトヴォス フレッシュスキン', 'id': 'fd-bare-etvos'},
            {'kw': 'マキアージュ ドラマティックエッセンスリキッド', 'fb': 'ドラマティックエッセンスリキッド', 'id': 'fd-bare-maquillage'},
            {'kw': '無印良品 UVリキッドファンデーション', 'fb': '無印良品 ファンデーション', 'id': 'fd-bare-muji'},
            {'kw': 'セザンヌ ラスティングカバーファンデーション', 'fb': 'セザンヌ リキッドファンデ', 'id': 'fd-bare-cezanne'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_fd_items = {}

for theme_id, theme_meta in foundation_concerns.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_fd_items:
            all_unique_fd_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique foundation products to fetch from Rakuten OpenAPI: {len(all_unique_fd_items)}")

fd_database = {}
if os.path.exists('scratch/rakuten_api_foundation_concerns_db.json'):
    with open('scratch/rakuten_api_foundation_concerns_db.json') as f:
        fd_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_fd_items.items():
    if unique_id in fd_database:
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
                    
                    fd_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_foundation_concerns_db.json', 'w', encoding='utf-8') as f:
                        json.dump(fd_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_foundation_concerns_db.json', 'w', encoding='utf-8') as f:
    json.dump(fd_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total Foundation DB items: {len(fd_database)} / {len(all_unique_fd_items)}")
