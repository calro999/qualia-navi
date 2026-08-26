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

# パーソナルカラー×カラー特化リップ 9テーマ（各10商品＝計90商品）
pc_color_lip_definitions = {
    # 1. ブルベ夏 リップ10選
    'feature-personal-color-cool-summer-lip-10': {
        'title': '【ブルベ夏向け】おすすめリップ10選！透明感を引き立てる青みピンク＆くすみモーヴ徹底比較',
        'category': 'lip',
        'categoryLabel': '❄️ 【ブルベ夏特化】ブルベ夏 リップおすすめ10選',
        'pc_color_desc': '青みを含んだ明るく柔らかなパステルトーン・くすみモーヴ・シアーベリー',
        'items': [
            {'kw': 'ロムアンド デュイフル ウォーター ティント 06 チュリアン', 'fb': 'ロムアンド 06 チュリアン', 'id': 'pcl-cs-romand06'},
            {'kw': 'ロムアンド ジューシーラスティングティント 25 ベアグレープ', 'fb': 'ジューシーラスティングティント 25', 'id': 'pcl-cs-romand25'},
            {'kw': 'ディオール アディクト リップ グロウ 001 ピンク', 'fb': 'ディオール リップグロウ 001', 'id': 'pcl-cs-dior001'},
            {'kw': 'セザンヌ リップカラーシールド 05 アンティークローズ', 'fb': 'セザンヌ 05 アンティークローズ', 'id': 'pcl-cs-cezanne05'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850 うさぎの恋人', 'fb': 'ネンマクフェイク PK850', 'id': 'pcl-cs-visee850'},
            {'kw': 'KATE リップモンスター 02 Pink banana', 'fb': 'リップモンスター 02', 'id': 'pcl-cs-kate02'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 90', 'fb': 'ルージュ ココ フラッシュ 90', 'id': 'pcl-cs-chanel90'},
            {'kw': 'オペラ リップティント N 02 ピンク', 'fb': 'オペラ リップティント 02', 'id': 'pcl-cs-opera02'},
            {'kw': 'hince ロウグロウジェルティント R006 ベアプラム', 'fb': 'hince R006', 'id': 'pcl-cs-hince06'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット RS01', 'fb': 'fwee RS01', 'id': 'pcl-cs-fwee-rs01'}
        ]
    },
    # 2. ブルベ冬 リップ10選
    'feature-personal-color-cool-winter-lip-10': {
        'title': '【ブルベ冬向け】おすすめリップ10選！鮮烈なローズレッド＆深みワインボルドー徹底比較',
        'category': 'lip',
        'categoryLabel': '❄️ 【ブルベ冬特化】ブルベ冬 リップおすすめ10選',
        'pc_color_desc': 'コントラストの効いた鮮やかなルビーレッド・ダークチェリー・深紅ボルドー',
        'items': [
            {'kw': 'KATE リップモンスター 07 ラスボス', 'fb': 'リップモンスター 07', 'id': 'pcl-cw-kate07'},
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75 フィデリテ', 'id': 'pcl-cw-chanel75'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'pcl-cw-ysl-candy'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020 マホガニー', 'fb': 'ディオール マキシマイザー 020', 'id': 'pcl-cw-dior020'},
            {'kw': 'MAC ラスターガラス リップスティック ビジネスカジュアル', 'fb': 'MAC ラスターガラス', 'id': 'pcl-cw-mac-luster'},
            {'kw': 'ロムアンド ゼロベルベットティント 06 ディープソウル', 'fb': 'ゼロベルベットティント 06', 'id': 'pcl-cw-romand06'},
            {'kw': 'ロムアンド ジューシーラスティングティント 17 プラムコーク', 'fb': 'ジューシーラスティングティント 17', 'id': 'pcl-cw-romand17'},
            {'kw': 'セザンヌ ラスティング リップカラーN 407', 'fb': 'セザンヌ リップ 407', 'id': 'pcl-cw-cezanne407'},
            {'kw': 'オペラ リップティント N 01 レッド', 'fb': 'オペラ リップティント 01', 'id': 'pcl-cw-opera01'},
            {'kw': 'キャンメイク むちぷるティント 03 ワインベリー', 'fb': 'むちぷるティント 03', 'id': 'pcl-cw-canmake03'}
        ]
    },
    # 3. イエベ春 リップ10選
    'feature-personal-color-warm-spring-lip-10': {
        'title': '【イエベ春向け】おすすめリップ10選！多幸感あふれるコーラルピンク＆ジューシーオレンジ徹底比較',
        'category': 'lip',
        'categoryLabel': '🌼 【イエベ春特化】イエベ春 リップおすすめ10選',
        'pc_color_desc': '明るく澄んだコーラルピンク・アプリコットオレンジ・温もりピーチ',
        'items': [
            {'kw': 'フジコ ニュアンスラップティント 03 珊瑚ブラウン', 'fb': 'フジコ 03 珊瑚ブラウン', 'id': 'pcl-ws-fujiko03'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ OR250 海星の恋心', 'fb': 'ネンマクフェイク OR250', 'id': 'pcl-ws-visee250'},
            {'kw': 'KATE リップモンスター 03 陽炎', 'fb': 'リップモンスター 03 陽炎', 'id': 'pcl-ws-kate03'},
            {'kw': 'セザンヌ リップカラーシールド 02 オランジュベージュ', 'fb': 'セザンヌ 02 オランジュベージュ', 'id': 'pcl-ws-cezanne02'},
            {'kw': 'ロムアンド ジューシーラスティングティント 23 ヌカダミア', 'fb': 'ジューシーラスティングティント 23', 'id': 'pcl-ws-romand23'},
            {'kw': 'オペラ リップティント N 03 アプリコット', 'fb': 'オペラ 03 アプリコット', 'id': 'pcl-ws-opera03'},
            {'kw': 'キャンメイク むちぷるティント 01 バタースコッチ', 'fb': 'むちぷるティント 01', 'id': 'pcl-ws-canmake01'},
            {'kw': 'hince ロウグロウジェルティント R001 ベア', 'fb': 'hince R001', 'id': 'pcl-ws-hince01'},
            {'kw': 'Laka ボンディンググロウリップスティック 204 ハヴ', 'fb': 'Laka 204', 'id': 'pcl-ws-laka204'},
            {'kw': 'エテュセ リップエディション ティントルージュ 04', 'fb': 'エテュセ 04', 'id': 'pcl-ws-ettusais04'}
        ]
    },
    # 4. イエベ秋 リップ10選
    'feature-personal-color-warm-autumn-lip-10': {
        'title': '【イエベ秋向け】おすすめリップ10選！こっくりテラコッタ＆深みマスタードブラウン徹底比較',
        'category': 'lip',
        'categoryLabel': '🍂 【イエベ秋特化】イエベ秋 リップおすすめ10選',
        'pc_color_desc': '深みと温もりを湛えたこっくりテラコッタ・ブリックレッド・マスタードブラウン',
        'items': [
            {'kw': 'セルヴォーク ディグニファイド リップス 09 テラコッタ', 'fb': 'セルヴォーク 09 テラコッタ', 'id': 'pcl-wa-celvoke09'},
            {'kw': 'Laka ボンディンググロウリップスティック 201', 'fb': 'Laka 201', 'id': 'pcl-wa-laka201'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'pcl-wa-kate05'},
            {'kw': 'KATE リップモンスター 10 地底探索', 'fb': 'リップモンスター 10', 'id': 'pcl-wa-kate10'},
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'SUQQU リップ', 'id': 'pcl-wa-suqqu'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13 イートドトリ', 'fb': 'ジューシーラスティングティント 13', 'id': 'pcl-wa-romand13'},
            {'kw': 'オペラ リップティント N 09 テラコッタ', 'fb': 'オペラ 09 テラコッタ', 'id': 'pcl-wa-opera09'},
            {'kw': 'セザンヌ ウォータリーティントリップ 03 ベージュブラウン', 'fb': 'セザンヌ 03 ベージュブラウン', 'id': 'pcl-wa-cezanne03'},
            {'kw': 'ちふれ 口紅 詰替用 748 ブラウン系', 'fb': 'ちふれ 口紅 748', 'id': 'pcl-wa-chifure748'},
            {'kw': 'MAC リップスティック パラマウント', 'fb': 'MAC パラマウント', 'id': 'pcl-wa-mac-paramount'}
        ]
    },
    # 5. ブルベ夏 ピンクリップ10選
    'feature-cool-summer-pink-lips-10': {
        'title': '【ブルベ夏 × ピンク】おすすめピンクリップ10選！白みモーヴピンク＆くすみ桜色で儚げ透明感徹底比較',
        'category': 'lip',
        'categoryLabel': '💗 【ブルベ夏ピンク】ブルベ夏 ピンクリップ10選',
        'pc_color_desc': '黄みを含まないモーヴピンク・青み桜ピンク・シアーダスティピンク',
        'items': [
            {'kw': 'ロムアンド ジューシーラスティングティント 25 ベアグレープ', 'fb': 'ロムアンド 25', 'id': 'pcl-csp-romand25'},
            {'kw': 'ディオール アディクト リップ グロウ 001 ピンク', 'fb': 'ディオール リップグロウ 001', 'id': 'pcl-csp-dior001'},
            {'kw': 'KATE リップモンスター 02 Pink banana', 'fb': 'リップモンスター 02', 'id': 'pcl-csp-kate02'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850 うさぎの恋人', 'fb': 'ヴィセ PK850', 'id': 'pcl-csp-visee850'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット RS01', 'fb': 'fwee プリンポット RS01', 'id': 'pcl-csp-fwee-rs01'},
            {'kw': 'オペラ リップティント N 02 ピンク', 'fb': 'オペラ 02 ピンク', 'id': 'pcl-csp-opera02'},
            {'kw': 'セザンヌ ウォータリーティントリップ 01 ナチュラルピンク', 'fb': 'セザンヌ 01 ピンク', 'id': 'pcl-csp-cezanne01'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 90', 'fb': 'シャネル 90', 'id': 'pcl-csp-chanel90'},
            {'kw': 'hince ロウグロウジェルティント R006 ベアプラム', 'fb': 'hince R006', 'id': 'pcl-csp-hince06'},
            {'kw': 'キャンメイク むちぷるティント 02 モモ', 'fb': 'キャンメイク 02 モモ', 'id': 'pcl-csp-canmake02'}
        ]
    },
    # 6. ブルベ夏 ローズリップ10選
    'feature-cool-summer-rose-lips-10': {
        'title': '【ブルベ夏 × ローズ】おすすめローズリップ10選！上品なヴィンテージくすみローズで大人の品格徹底比較',
        'category': 'lip',
        'categoryLabel': '🌹 【ブルベ夏ローズ】ブルベ夏 ローズリップ10選',
        'pc_color_desc': '大人の肌を澄んで見せるダスティローズ・ミュートベリー・アッシュローズ',
        'items': [
            {'kw': 'セザンヌ リップカラーシールド 05 アンティークローズ', 'fb': 'セザンヌ 05 アンティークローズ', 'id': 'pcl-csr-cezanne05'},
            {'kw': 'ロムアンド デュイフル ウォーター ティント 06 チュリアン', 'fb': 'ロムアンド 06 チュリアン', 'id': 'pcl-csr-romand06'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ RO650 チェリーの自惚れ', 'fb': 'ネンマクフェイク RO650', 'id': 'pcl-csr-visee650'},
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75 フィデリテ', 'id': 'pcl-csr-chanel75'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020 マホガニー', 'fb': 'ディオール 020', 'id': 'pcl-csr-dior020'},
            {'kw': 'コスメデコルテ ルージュ デコルテ', 'fb': 'コスメデコルテ リップ', 'id': 'pcl-csr-decorte'},
            {'kw': 'クレドポーボーテ ルージュアレーブル', 'fb': 'クレドポー リップ', 'id': 'pcl-csr-cledepeau'},
            {'kw': 'エテュセ リップエディション ティントルージュ 05', 'fb': 'エテュセ 05', 'id': 'pcl-csr-ettusais05'},
            {'kw': 'キャンメイク メルティールミナスルージュ', 'fb': 'キャンメイク リップ', 'id': 'pcl-csr-canmake'},
            {'kw': 'イヴサンローラン ルージュ ピュールクチュール ザ スリム', 'fb': 'YSL リップ ザスリム', 'id': 'pcl-csr-ysl-slim'}
        ]
    },
    # 7. ブルベ冬 赤リップ10選
    'feature-cool-winter-red-lips-10': {
        'title': '【ブルベ冬 × 赤リップ】おすすめ赤リップ10選！ワインボルドー＆深紅チェリーで圧倒的オーラ徹底比較',
        'category': 'lip',
        'categoryLabel': '💋 【ブルベ冬赤リップ】ブルベ冬 赤リップ10選',
        'pc_color_desc': '青みを含んだ深紅のルビーレッド・ダークボルドー・真紅バーガンディ',
        'items': [
            {'kw': 'KATE リップモンスター 07 ラスボス', 'fb': 'リップモンスター 07', 'id': 'pcl-cwr-kate07'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'pcl-cwr-ysl-candy'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 106', 'fb': 'シャネル 106', 'id': 'pcl-cwr-chanel106'},
            {'kw': 'ディオール ルージュ ディオール 999', 'fb': 'ルージュディオール 999', 'id': 'pcl-cwr-dior999'},
            {'kw': 'MAC リップスティック ルビーウートーキョー', 'fb': 'MAC ルビーウー', 'id': 'pcl-cwr-mac-ruby'},
            {'kw': 'ロムアンド ゼロベルベットティント 06 ディープソウル', 'fb': 'ゼロベルベットティント 06', 'id': 'pcl-cwr-romand06'},
            {'kw': 'オペラ リップティント N 01 レッド', 'fb': 'オペラ 01 レッド', 'id': 'pcl-cwr-opera01'},
            {'kw': 'セザンヌ ラスティング リップカラーN 407', 'fb': 'セザンヌ リップ 407', 'id': 'pcl-cwr-cezanne407'},
            {'kw': 'キャンメイク むちぷるティント 03 ワインベリー', 'fb': 'キャンメイク 03 ワインベリー', 'id': 'pcl-cwr-canmake03'},
            {'kw': 'リンメル ラスティング フィニッシュ クリーミィ リップ', 'fb': 'リンメル リップ', 'id': 'pcl-cwr-rimmel'}
        ]
    },
    # 8. イエベ秋 ブラウンリップ10選
    'feature-warm-autumn-brown-lips-10': {
        'title': '【イエベ秋 × ブラウン】おすすめブラウンリップ10選！肌馴染み抜群のこっくりテラコッタ＆深みブラウン徹底比較',
        'category': 'lip',
        'categoryLabel': '🤎 【イエベ秋ブラウン】イエベ秋 ブラウンリップ10選',
        'pc_color_desc': '黄みと赤みのバランスが完璧なこっくりテラコッタ・マホガニー・ビターチョコブラウン',
        'items': [
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'pcl-wab-kate05'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09 テラコッタ', 'fb': 'セルヴォーク 09', 'id': 'pcl-wab-celvoke09'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13 イートドトリ', 'fb': 'ジューシーラスティングティント 13', 'id': 'pcl-wab-romand13'},
            {'kw': 'Laka ボンディンググロウリップスティック 201', 'fb': 'Laka 201', 'id': 'pcl-wab-laka201'},
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'SUQQU リップ', 'id': 'pcl-wab-suqqu'},
            {'kw': 'オペラ リップティント N 09 テラコッタ', 'fb': 'オペラ 09 テラコッタ', 'id': 'pcl-wab-opera09'},
            {'kw': 'セザンヌ ウォータリーティントリップ 03 ベージュブラウン', 'fb': 'セザンヌ 03', 'id': 'pcl-wab-cezanne03'},
            {'kw': 'ちふれ 口紅 詰替用 748 ブラウン系', 'fb': 'ちふれ 748', 'id': 'pcl-wab-chifure748'},
            {'kw': 'MAC リップスティック パラマウント', 'fb': 'MAC パラマウント', 'id': 'pcl-wab-mac-paramount'},
            {'kw': 'フジコ ニュアンスラップティント 03 珊瑚ブラウン', 'fb': 'フジコ 03', 'id': 'pcl-wab-fujiko03'}
        ]
    },
    # 9. イエベ春 オレンジリップ10選
    'feature-warm-spring-orange-lips-10': {
        'title': '【イエベ春 × オレンジ】おすすめオレンジリップ10選！フレッシュな果汁アプリコット＆透け感オレンジ徹底比較',
        'category': 'lip',
        'categoryLabel': '🍊 【イエベ春オレンジ】イエベ春 オレンジリップ10選',
        'pc_color_desc': '生き生きとした多幸感を宿すジューシーアプリコット・マンダリンオレンジ・コーラル',
        'items': [
            {'kw': 'ヴィセ ネンマクフェイク ルージュ OR250 海星の恋心', 'fb': 'ネンマクフェイク OR250', 'id': 'pcl-wso-visee250'},
            {'kw': 'KATE リップモンスター 03 陽炎', 'fb': 'リップモンスター 03', 'id': 'pcl-wso-kate03'},
            {'kw': 'セザンヌ リップカラーシールド 02 オランジュベージュ', 'fb': 'セザンヌ 02 オランジュベージュ', 'id': 'pcl-wso-cezanne02'},
            {'kw': 'オペラ リップティント N 03 アプリコット', 'fb': 'オペラ 03 アプリコット', 'id': 'pcl-wso-opera03'},
            {'kw': 'キャンメイク むちぷるティント 01 バタースコッチ', 'fb': 'むちぷるティント 01', 'id': 'pcl-wso-canmake01'},
            {'kw': 'ロムアンド ジューシーラスティングティント 23 ヌカダミア', 'fb': 'ロムアンド 23', 'id': 'pcl-wso-romand23'},
            {'kw': 'フジコ ニュアンスラップティント 03 珊瑚ブラウン', 'fb': 'フジコ 03', 'id': 'pcl-wso-fujiko03'},
            {'kw': 'hince ロウグロウジェルティント R001 ベア', 'fb': 'hince R001', 'id': 'pcl-wso-hince01'},
            {'kw': 'Laka ボンディンググロウリップスティック 204 ハヴ', 'fb': 'Laka 204', 'id': 'pcl-wso-laka204'},
            {'kw': 'エテュセ リップエディション ティントルージュ 04', 'fb': 'エテュセ 04', 'id': 'pcl-wso-ettusais04'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_pcl_items = {}

for theme_id, theme_meta in pc_color_lip_definitions.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_pcl_items:
            all_unique_pcl_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique PC-Color lip products to fetch from Rakuten OpenAPI: {len(all_unique_pcl_items)}")

pcl_database = {}
if os.path.exists('scratch/rakuten_api_pc_color_lip_db.json'):
    with open('scratch/rakuten_api_pc_color_lip_db.json') as f:
        pcl_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_pcl_items.items():
    if unique_id in pcl_database:
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
                    
                    pcl_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_pc_color_lip_db.json', 'w', encoding='utf-8') as f:
                        json.dump(pcl_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_pc_color_lip_db.json', 'w', encoding='utf-8') as f:
    json.dump(pcl_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total PC-Color Lip DB items: {len(pcl_database)} / {len(all_unique_pcl_items)}")
