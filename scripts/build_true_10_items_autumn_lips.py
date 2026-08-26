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

# 18テーマ × 各10商品 = 計180商品の定義
themes_10_items_definitions = {
    # 1. 2026秋リップおすすめ10選
    'feature-2026-autumn-lip-trends-top10': {
        'title': '【2026年最新】2026秋リップおすすめ10選！トレンドのむっちり濃密艶＆深みカラー名品ルージュ徹底比較',
        'categoryLabel': '💄 【秋リップ特集】2026秋リップおすすめ10選',
        'items': [
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'スック リップ', 'id': 'lip26-tr-suqqu'},
            {'kw': 'シャネル ルージュ アリュール ラック', 'fb': 'シャネル リップ', 'id': 'lip26-tr-chanel'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'キャンディグレーズ', 'id': 'lip26-tr-ysl'},
            {'kw': 'ディオール アディクト リップ マキシマイザー', 'fb': 'ディオール マキシマイザー', 'id': 'lip26-tr-dior'},
            {'kw': 'KATE リップモンスター 05', 'fb': 'リップモンスター 05', 'id': 'lip26-tr-kate'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09', 'fb': 'セルヴォーク 09', 'id': 'lip26-tr-celvoke'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fb': 'ジューシーラスティングティント 13', 'id': 'lip26-tr-romand'},
            {'kw': 'hince ロウグロウジェルティント', 'fb': 'hince リップ', 'id': 'lip26-tr-hince'},
            {'kw': 'Laka ボンディンググロウリップスティック', 'fb': 'Laka リップ', 'id': 'lip26-tr-laka'},
            {'kw': 'セザンヌ リップカラーシールド 05', 'fb': 'セザンヌ リップカラーシールド', 'id': 'lip26-tr-cezanne'}
        ]
    },
    # 2. 秋におすすめのブラウンリップ10選
    'feature-autumn-brown-lips-collection-10': {
        'title': '【2026年秋】秋におすすめのブラウンリップ10選！肌色を明るく魅せる垢抜けブラウン徹底比較',
        'categoryLabel': '🤎 【秋ブラウンリップ特集】秋におすすめのブラウンリップ10選',
        'items': [
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'lip26-br-kate05'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09', 'fb': 'セルヴォーク 09', 'id': 'lip26-br-celvoke09'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13 イートドトリ', 'fb': 'ジューシーラスティングティント 13', 'id': 'lip26-br-romand13'},
            {'kw': 'フジコ ニュアンスラップティント 03 珊瑚ブラウン', 'fb': 'フジコ ニュアンスラップティント 03', 'id': 'lip26-br-fujiko03'},
            {'kw': 'セザンヌ ウォータリーティントリップ 03 ベージュブラウン', 'fb': 'セザンヌ ウォータリーティントリップ 03', 'id': 'lip26-br-cezanne03'},
            {'kw': 'オペラ リップティント N 09 テラコッタ', 'fb': 'オペラ リップティント 09', 'id': 'lip26-br-opera09'},
            {'kw': 'Laka ボンディンググロウリップスティック 201', 'fb': 'Laka リップ 201', 'id': 'lip26-br-laka201'},
            {'kw': 'MAC リップスティック パラマウント', 'fb': 'MAC リップ パラマウント', 'id': 'lip26-br-mac-paramount'},
            {'kw': 'エテュセ リップエディション ティントルージュ 05', 'fb': 'エテュセ リップ 05', 'id': 'lip26-br-ettusais05'},
            {'kw': 'キャンメイク むちぷるティント 02 モモ', 'fb': 'むちぷるティント 02', 'id': 'lip26-br-canmake02'}
        ]
    },
    # 3. 秋におすすめのローズリップ10選
    'feature-autumn-rose-lips-collection-10': {
        'title': '【2026年秋】秋におすすめのローズリップ10選！上品なくすみローズで大人の品格を宿す名品徹底比較',
        'categoryLabel': '🌹 【秋ローズリップ特集】秋におすすめのローズリップ10選',
        'items': [
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75 フィデリテ', 'id': 'lip26-ro-chanel75'},
            {'kw': 'ディオール アディクト リップ グロウ 001 ピンク', 'fb': 'ディオール リップグロウ 001', 'id': 'lip26-ro-dior001'},
            {'kw': 'セザンヌ リップカラーシールド 05 アンティークローズ', 'fb': 'セザンヌ 05 アンティークローズ', 'id': 'lip26-ro-cezanne05'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fb': 'ヴィセ PK850', 'id': 'lip26-ro-visee850'},
            {'kw': 'ロムアンド デュイフル ウォーター ティント 06', 'fb': 'ロムアンド 06 チュリアン', 'id': 'lip26-ro-romand06'},
            {'kw': 'イヴサンローラン ルージュ ピュールクチュール ザ スリム', 'fb': 'YSL リップ ザスリム', 'id': 'lip26-ro-ysl-slim'},
            {'kw': 'コスメデコルテ ルージュ デコルテ', 'fb': 'コスメデコルテ リップ', 'id': 'lip26-ro-decorte-rouge'},
            {'kw': 'クレドポーボーテ ルージュアレーブル', 'fb': 'クレドポー リップ', 'id': 'lip26-ro-cledepeau'},
            {'kw': 'オペラ リップティント N 02 ピンク', 'fb': 'オペラ リップティント 02', 'id': 'lip26-ro-opera02'},
            {'kw': 'キャンメイク メルティールミナスルージュ', 'fb': 'キャンメイク リップ', 'id': 'lip26-ro-canmake-melty'}
        ]
    },
    # 4. 秋におすすめのピンクリップ10選
    'feature-autumn-pink-lips-collection-10': {
        'title': '【2026年秋】秋におすすめのピンクリップ10選！くすみピンク＆粘膜カラーで大人可愛く魅せる名品徹底比較',
        'categoryLabel': '💗 【秋ピンクリップ特集】秋におすすめのピンクリップ10選',
        'items': [
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール マキシマイザー 020', 'id': 'lip26-pi-dior020'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fb': 'ネンマクフェイク PK850', 'id': 'lip26-pi-visee850'},
            {'kw': 'ロムアンド ジューシーラスティングティント 25 ベアグレープ', 'fb': 'ロムアンド 25 ベアグレープ', 'id': 'lip26-pi-romand25'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'lip26-pi-fwee-pudding'},
            {'kw': 'KATE リップモンスター 02 Pink banana', 'fb': 'リップモンスター 02', 'id': 'lip26-pi-kate02'},
            {'kw': 'hince ムードインハンサー リキッドグロウ', 'fb': 'hince リキッドグロウ', 'id': 'lip26-pi-hince-glow'},
            {'kw': 'エクセル リップベルベティスト', 'fb': 'エクセル リップ', 'id': 'lip26-pi-excel-velvet'},
            {'kw': 'オペラ リップティント N 05 コーラルピンク', 'fb': 'オペラ リップティント 05', 'id': 'lip26-pi-opera05'},
            {'kw': 'キャンメイク むちぷるティント 01 バタースコッチ', 'fb': 'むちぷるティント 01', 'id': 'lip26-pi-canmake01'},
            {'kw': 'セザンヌ ウォータリーティントリップ 01 ナチュラルピンク', 'fb': 'セザンヌ 01 ピンク', 'id': 'lip26-pi-cezanne01'}
        ]
    },
    # 5. 秋におすすめの赤リップ10選
    'feature-autumn-red-lips-collection-10': {
        'title': '【2026年秋】秋におすすめの赤リップ10選！深みボルドー＆クラシックレッドで主役級の唇を作る名品徹底比較',
        'categoryLabel': '💋 【秋赤リップ特集】秋におすすめの赤リップ10選',
        'items': [
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'キャンディグレーズ', 'id': 'lip26-re-ysl-candy'},
            {'kw': 'KATE リップモンスター 07 ラスボス', 'fb': 'リップモンスター 07', 'id': 'lip26-re-kate07'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 106', 'fb': 'ルージュ ココ フラッシュ 106', 'id': 'lip26-re-chanel106'},
            {'kw': 'ディオール ルージュ ディオール 999', 'fb': 'ルージュディオール 999', 'id': 'lip26-re-dior999'},
            {'kw': 'MAC リップスティック ルビーウートーキョー', 'fb': 'MAC リップ ルビーウー', 'id': 'lip26-re-mac-ruby'},
            {'kw': 'ロムアンド ゼロベルベットティント 06 ディープソウル', 'fb': 'ゼロベルベットティント 06', 'id': 'lip26-re-romand06'},
            {'kw': 'オペラ リップティント N 01 レッド', 'fb': 'オペラ リップティント 01', 'id': 'lip26-re-opera01'},
            {'kw': 'セザンヌ ラスティング リップカラーN 407', 'fb': 'セザンヌ リップ 407', 'id': 'lip26-re-cezanne407'},
            {'kw': 'キャンメイク ステイオンバームルージュ 09', 'fb': 'ステイオンバームルージュ 09', 'id': 'lip26-re-canmake09'},
            {'kw': 'リンメル ラスティング フィニッシュ クリーミィ リップ', 'fb': 'リンメル リップ', 'id': 'lip26-re-rimmel'}
        ]
    },
    # 6. 秋におすすめの粘膜リップ10選
    'feature-autumn-mucous-lips-collection-10': {
        'title': '【2026年秋】秋におすすめの粘膜リップ10選！素の唇になりすます神粘膜カラー徹底比較',
        'categoryLabel': '🌸 【秋粘膜リップ特集】秋におすすめの粘膜リップ10選',
        'items': [
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850 うさぎの恋人', 'fb': 'ネンマクフェイク PK850', 'id': 'lip26-ne-visee850'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ OR250 海星の恋心', 'fb': 'ネンマクフェイク OR250', 'id': 'lip26-ne-visee250'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ RO650 チェリーの自惚れ', 'fb': 'ネンマクフェイク RO650', 'id': 'lip26-ne-visee650'},
            {'kw': 'セザンヌ リップカラーシールド 01 フィグブラウン', 'fb': 'リップカラーシールド 01', 'id': 'lip26-ne-cezanne01'},
            {'kw': 'セザンヌ リップカラーシールド 02 オランジュベージュ', 'fb': 'リップカラーシールド 02', 'id': 'lip26-ne-cezanne02'},
            {'kw': 'ロムアンド ジューシーラスティングティント 23 ヌカダミア', 'fb': 'ジューシーラスティングティント 23', 'id': 'lip26-ne-romand23'},
            {'kw': 'フジコ ニュアンスラップティント 01 珊瑚ピンク', 'fb': 'ニュアンスラップティント 01', 'id': 'lip26-ne-fujiko01'},
            {'kw': 'hince ロウグロウジェルティント R001 ベア', 'fb': 'hince ロウグロウ R001', 'id': 'lip26-ne-hince01'},
            {'kw': 'Laka ボンディンググロウリップスティック 204 ハヴ', 'fb': 'Laka 204', 'id': 'lip26-ne-laka204'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット ND01', 'fb': 'fwee プリンポット ND01', 'id': 'lip26-ne-fwee01'}
        ]
    },
    # 7. 秋におすすめのプチプラリップ10選
    'feature-autumn-budget-lips-collection-10': {
        'title': '【2026年秋】秋におすすめのプチプラリップ10選！1500円以下でデパコス級の秋色を叶える名品徹底比較',
        'categoryLabel': '💰 【秋プチプラリップ特集】秋におすすめのプチプラリップ10選',
        'items': [
            {'kw': 'セザンヌ リップカラーシールド 05 アンティークローズ', 'fb': 'セザンヌ リップカラーシールド 05', 'id': 'lip26-pu-cezanne05'},
            {'kw': 'キャンメイク むちぷるティント 02 モモ', 'fb': 'キャンメイク むちぷるティント 02', 'id': 'lip26-pu-canmake02'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'KATE リップモンスター 05', 'id': 'lip26-pu-kate05'},
            {'kw': 'ちふれ 口紅 詰替用 748 ブラウン系', 'fb': 'ちふれ 口紅 748', 'id': 'lip26-pu-chifure748'},
            {'kw': 'オペラ リップティント N 09 テラコッタ', 'fb': 'オペラ リップティント 09', 'id': 'lip26-pu-opera09'},
            {'kw': 'フジコ ニュアンスラップティント 03 珊瑚ブラウン', 'fb': 'フジコ 03 珊瑚ブラウン', 'id': 'lip26-pu-fujiko03'},
            {'kw': 'エテュセ リップエディション ティントルージュ', 'fb': 'エテュセ リップエディション', 'id': 'lip26-pu-ettusais'},
            {'kw': 'セザンヌ ウォータリーティントリップ 03 ベージュブラウン', 'fb': 'セザンヌ ウォータリーティント 03', 'id': 'lip26-pu-cezanne03'},
            {'kw': 'キャンメイク ステイオンバームルージュ 16', 'fb': 'ステイオンバームルージュ 16', 'id': 'lip26-pu-canmake16'},
            {'kw': 'マジョリカマジョルカ ピュア・ピュア・キッス NEO', 'fb': 'マジョリカマジョルカ リップ', 'id': 'lip26-pu-majolica'}
        ]
    },
    # 8. 秋におすすめのデパコスリップ10選
    'feature-autumn-luxury-depacos-lips-collection-10': {
        'title': '【2026年秋】秋におすすめのデパコスリップ10選！圧倒的な品格と極上テクスチャーを誇る最高峰ルージュ徹底比較',
        'categoryLabel': '💎 【秋デパコスリップ特集】秋におすすめのデパコスリップ10選',
        'items': [
            {'kw': 'セルヴォーク ディグニファイド リップス 09 テラコッタ', 'fb': 'セルヴォーク 09', 'id': 'lip26-de-celvoke09'},
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'スック リップ', 'id': 'lip26-de-suqqu'},
            {'kw': 'シャネル ルージュ アリュール ラック 75', 'fb': 'シャネル リップ 75', 'id': 'lip26-de-chanel75'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール マキシマイザー 020', 'id': 'lip26-de-dior020'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'lip26-de-ysl-candy'},
            {'kw': 'ルージュ エルメス ボーム ドゥ ソワン', 'fb': 'エルメス リップバーム', 'id': 'lip26-de-hermes'},
            {'kw': 'コスメデコルテ ルージュ デコルテ', 'fb': 'コスメデコルテ リップ', 'id': 'lip26-de-decorte'},
            {'kw': 'クレドポーボーテ ルージュアレーブル', 'fb': 'クレドポー リップ', 'id': 'lip26-de-cledepeau'},
            {'kw': 'MAC パウダー キス リップスティック', 'fb': 'MAC リップ', 'id': 'lip26-de-mac'},
            {'kw': 'RMK デューイーメルト リップカラー', 'fb': 'RMK リップ', 'id': 'lip26-de-rmk'}
        ]
    },
    # 9. 秋におすすめの韓国リップ10選
    'feature-autumn-korean-lips-collection-10': {
        'title': '【2026年秋】秋におすすめの韓国リップ10選！果汁シロップツヤ＆オータムミュートカラー徹底比較',
        'categoryLabel': '🇰🇷 【秋韓国リップ特集】秋におすすめの韓国リップ10選',
        'items': [
            {'kw': 'ロムアンド ジューシーラスティングティント 13 イートドトリ', 'fb': 'ロムアンド 13', 'id': 'lip26-ko-romand13'},
            {'kw': 'ロムアンド デュイフル ウォーター ティント 06 チュリアン', 'fb': 'ロムアンド 06', 'id': 'lip26-ko-romand06'},
            {'kw': 'hince ロウグロウジェルティント', 'fb': 'hince リップ', 'id': 'lip26-ko-hince'},
            {'kw': 'Laka ボンディンググロウリップスティック', 'fb': 'Laka リップ', 'id': 'lip26-ko-laka'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'lip26-ko-fwee'},
            {'kw': 'ペリペラ インク ムード ドロップ ティント', 'fb': 'ペリペラ ティント', 'id': 'lip26-ko-peripera'},
            {'kw': 'クリオ クリスタル グラム ティント', 'fb': 'クリオ ティント', 'id': 'lip26-ko-clio'},
            {'kw': '3CE ムード レシピ リップ カラー', 'fb': '3CE リップ', 'id': 'lip26-ko-3ce'},
            {'kw': 'エチュード フィクシングティント', 'fb': 'エチュード ティント', 'id': 'lip26-ko-etude'},
            {'kw': 'LANEIGE リップスリーピングマスク ベリー', 'fb': 'ラネージュ リップ', 'id': 'lip26-ko-laneige'}
        ]
    },
    # 10. ブルベ夏 秋リップ10選
    'feature-autumn-lips-cool-summer-10': {
        'title': '【ブルベ夏向け】秋リップおすすめ10選！くすみモーヴ＆ダスティローズで透明感を際立たせる名品徹底比較',
        'categoryLabel': '❄️ 【ブルベ夏特集】ブルベ夏 秋リップ10選',
        'items': [
            {'kw': 'ロムアンド デュイフル ウォーター ティント 06 チュリアン', 'fb': 'ロムアンド 06', 'id': 'lip26-cs-romand06'},
            {'kw': 'ロムアンド ジューシーラスティングティント 25 ベアグレープ', 'fb': 'ロムアンド 25', 'id': 'lip26-cs-romand25'},
            {'kw': 'セザンヌ リップカラーシールド 05 アンティークローズ', 'fb': 'セザンヌ 05', 'id': 'lip26-cs-cezanne05'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850 うさぎの恋人', 'fb': 'ヴィセ PK850', 'id': 'lip26-cs-visee850'},
            {'kw': 'ディオール アディクト リップ グロウ 001 ピンク', 'fb': 'ディオール 001', 'id': 'lip26-cs-dior001'},
            {'kw': 'KATE リップモンスター 02 Pink banana', 'fb': 'リップモンスター 02', 'id': 'lip26-cs-kate02'},
            {'kw': 'オペラ リップティント N 02 ピンク', 'fb': 'オペラ 02', 'id': 'lip26-cs-opera02'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 90', 'fb': 'シャネル 90', 'id': 'lip26-cs-chanel90'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット RS01', 'fb': 'fwee RS01', 'id': 'lip26-cs-fwee-rs01'},
            {'kw': 'hince ロウグロウジェルティント R006 ベアプラム', 'fb': 'hince R006', 'id': 'lip26-cs-hince06'}
        ]
    },
    # 11. ブルベ冬 秋リップ10選
    'feature-autumn-lips-cool-winter-10': {
        'title': '【ブルベ冬向け】秋リップおすすめ10選！深紅ボルドー＆ダークチェリーで圧倒的オーラを放つ名品徹底比較',
        'categoryLabel': '❄️ 【ブルベ冬特集】ブルベ冬 秋リップ10選',
        'items': [
            {'kw': 'KATE リップモンスター 07 ラスボス', 'fb': 'リップモンスター 07', 'id': 'lip26-cw-kate07'},
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75', 'id': 'lip26-cw-chanel75'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'lip26-cw-ysl'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020 マホガニー', 'fb': 'ディオール 020', 'id': 'lip26-cw-dior020'},
            {'kw': 'MAC リップスティック ルビーウー', 'fb': 'MAC ルビーウー', 'id': 'lip26-cw-mac-ruby'},
            {'kw': 'ロムアンド ゼロベルベットティント 06 ディープソウル', 'fb': 'ロムアンド 06 ディープソウル', 'id': 'lip26-cw-romand06'},
            {'kw': 'ロムアンド ジューシーラスティングティント 17 プラムコーク', 'fb': 'ロムアンド 17', 'id': 'lip26-cw-romand17'},
            {'kw': 'セザンヌ ラスティング リップカラーN 407', 'fb': 'セザンヌ 407', 'id': 'lip26-cw-cezanne407'},
            {'kw': 'オペラ リップティント N 01 レッド', 'fb': 'オペラ 01', 'id': 'lip26-cw-opera01'},
            {'kw': 'キャンメイク むちぷるティント 03 ワインベリー', 'fb': 'むちぷるティント 03', 'id': 'lip26-cw-canmake03'}
        ]
    },
    # 12. イエベ春 秋リップ10選
    'feature-autumn-lips-warm-spring-10': {
        'title': '【イエベ春向け】秋リップおすすめ10選！温もりコーラルブラウン＆テラコッタで多幸感を彩る名品徹底比較',
        'categoryLabel': '🌼 【イエベ春特集】イエベ春 秋リップ10選',
        'items': [
            {'kw': 'フジコ ニュアンスラップティント 03 珊瑚ブラウン', 'fb': 'フジコ 03', 'id': 'lip26-ws-fujiko03'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ OR250 海星の恋心', 'fb': 'ヴィセ OR250', 'id': 'lip26-ws-visee250'},
            {'kw': 'KATE リップモンスター 03 陽炎', 'fb': 'リップモンスター 03', 'id': 'lip26-ws-kate03'},
            {'kw': 'セザンヌ リップカラーシールド 02 オランジュベージュ', 'fb': 'セザンヌ 02', 'id': 'lip26-ws-cezanne02'},
            {'kw': 'ロムアンド ジューシーラスティングティント 23 ヌカダミア', 'fb': 'ロムアンド 23', 'id': 'lip26-ws-romand23'},
            {'kw': 'オペラ リップティント N 03 アプリコット', 'fb': 'オペラ 03', 'id': 'lip26-ws-opera03'},
            {'kw': 'キャンメイク むちぷるティント 01 バタースコッチ', 'fb': 'むちぷるティント 01', 'id': 'lip26-ws-canmake01'},
            {'kw': 'hince ロウグロウジェルティント R001 ベア', 'fb': 'hince R001', 'id': 'lip26-ws-hince01'},
            {'kw': 'Laka ボンディンググロウリップスティック 204 ハヴ', 'fb': 'Laka 204', 'id': 'lip26-ws-laka204'},
            {'kw': 'エテュセ リップエディション ティントルージュ 04', 'fb': 'エテュセ 04', 'id': 'lip26-ws-ettusais04'}
        ]
    },
    # 13. イエベ秋 秋リップ10選
    'feature-autumn-lips-warm-autumn-10': {
        'title': '【イエベ秋向け】秋リップおすすめ10選！マスタードブラウン＆深みテラコッタで魅せる決定版徹底比較',
        'categoryLabel': '🍂 【イエベ秋特集】イエベ秋 秋リップ10選',
        'items': [
            {'kw': 'セルヴォーク ディグニファイド リップス 09 テラコッタ', 'fb': 'セルヴォーク 09', 'id': 'lip26-wa-celvoke09'},
            {'kw': 'Laka ボンディンググロウリップスティック 201', 'fb': 'Laka 201', 'id': 'lip26-wa-laka201'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'lip26-wa-kate05'},
            {'kw': 'KATE リップモンスター 10 地底探索', 'fb': 'リップモンスター 10', 'id': 'lip26-wa-kate10'},
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'スック リップ', 'id': 'lip26-wa-suqqu'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13 イートドトリ', 'fb': 'ロムアンド 13', 'id': 'lip26-wa-romand13'},
            {'kw': 'オペラ リップティント N 09 テラコッタ', 'fb': 'オペラ 09', 'id': 'lip26-wa-opera09'},
            {'kw': 'セザンヌ ウォータリーティントリップ 03 ベージュブラウン', 'fb': 'セザンヌ 03', 'id': 'lip26-wa-cezanne03'},
            {'kw': 'ちふれ 口紅 詰替用 748 ブラウン系', 'fb': 'ちふれ 748', 'id': 'lip26-wa-chifure748'},
            {'kw': 'MAC リップスティック パラマウント', 'fb': 'MAC パラマウント', 'id': 'lip26-wa-mac-paramount'}
        ]
    },
    # 14. 落ちにくい秋リップ10選
    'feature-autumn-lips-long-lasting-stay-10': {
        'title': '【落ちにくい】秋リップおすすめ10選！マスク・飲食でも色ツヤが絶対に消えない最強リップ徹底比較',
        'categoryLabel': '🔒 【機能特化特集】落ちにくい秋リップ10選',
        'items': [
            {'kw': 'KATE リップモンスター 10 地底探索', 'fb': 'リップモンスター 10', 'id': 'lip26-st-kate10'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'lip26-st-kate05'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fb': 'ヴィセ PK850', 'id': 'lip26-st-visee850'},
            {'kw': 'セザンヌ リップカラーシールド 05', 'fb': 'セザンヌ 05', 'id': 'lip26-st-cezanne05'},
            {'kw': 'シャネル ルージュ アリュール ラック 75', 'fb': 'シャネル 75', 'id': 'lip26-st-chanel75'},
            {'kw': 'フジコ ニュアンスラップティント 03', 'fb': 'フジコ 03', 'id': 'lip26-st-fujiko03'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fb': 'ロムアンド 13', 'id': 'lip26-st-romand13'},
            {'kw': 'エチュード フィクシングティント', 'fb': 'エチュード フィクシングティント', 'id': 'lip26-st-etude'},
            {'kw': 'メイベリン SPステイ ヴィニルインク', 'fb': 'メイベリン ヴィニルインク', 'id': 'lip26-st-maybelline'},
            {'kw': 'オペラ リップティント N 09', 'fb': 'オペラ 09', 'id': 'lip26-st-opera09'}
        ]
    },
    # 15. 色持ちのいい秋リップ10選
    'feature-autumn-lips-tint-color-retention-10': {
        'title': '【色持ち抜群】秋リップおすすめ10選！ティント処方で自然な血色が夕方まで持続する名品徹底比較',
        'categoryLabel': '✨ 【機能特化特集】色持ちのいい秋リップ10選',
        'items': [
            {'kw': 'オペラ リップティント N 09 テラコッタ', 'fb': 'オペラ 09', 'id': 'lip26-ti-opera09'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fb': 'ロムアンド 13', 'id': 'lip26-ti-romand13'},
            {'kw': 'ロムアンド デュイフル ウォーター ティント 06', 'fb': 'ロムアンド 06', 'id': 'lip26-ti-romand06'},
            {'kw': 'フジコ ニュアンスラップティント 03', 'fb': 'フジコ 03', 'id': 'lip26-ti-fujiko03'},
            {'kw': 'セザンヌ ウォータリーティントリップ 03', 'fb': 'セザンヌ 03', 'id': 'lip26-ti-cezanne03'},
            {'kw': 'hince ロウグロウジェルティント', 'fb': 'hince ティント', 'id': 'lip26-ti-hince'},
            {'kw': 'キャンメイク むちぷるティント 02', 'fb': 'むちぷるティント 02', 'id': 'lip26-ti-canmake02'},
            {'kw': 'ペリペラ インク ムード ドロップ ティント', 'fb': 'ペリペラ ティント', 'id': 'lip26-ti-peripera'},
            {'kw': 'クリオ クリスタル グラム ティント', 'fb': 'クリオ ティント', 'id': 'lip26-ti-clio'},
            {'kw': 'エテュセ リップエディション ティントルージュ', 'fb': 'エテュセ リップ', 'id': 'lip26-ti-ettusais'}
        ]
    },
    # 16. ツヤ系秋リップ10選
    'feature-autumn-lips-glossy-glow-10': {
        'title': '【ツヤ系】秋リップおすすめ10選！ぷるんと弾む水光ガラス玉ツヤで魅せる名品徹底比較',
        'categoryLabel': '💎 【機能特化特集】ツヤ系秋リップ10選',
        'items': [
            {'kw': 'hince ロウグロウジェルティント', 'fb': 'hince ティント', 'id': 'lip26-gl-hince'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'lip26-gl-ysl'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール 020', 'id': 'lip26-gl-dior020'},
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'スック リップ', 'id': 'lip26-gl-suqqu'},
            {'kw': 'Laka ボンディンググロウリップスティック', 'fb': 'Laka リップ', 'id': 'lip26-gl-laka'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fb': 'ロムアンド 13', 'id': 'lip26-gl-romand13'},
            {'kw': 'キャンメイク むちぷるティント 01', 'fb': 'むちぷるティント 01', 'id': 'lip26-gl-canmake01'},
            {'kw': 'フジコ ニュアンスラップティント 03', 'fb': 'フジコ 03', 'id': 'lip26-gl-fujiko03'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 106', 'fb': 'シャネル 106', 'id': 'lip26-gl-chanel106'},
            {'kw': 'セザンヌ リップカラーシールド 05', 'fb': 'セザンヌ 05', 'id': 'lip26-gl-cezanne05'}
        ]
    },
    # 17. マット系秋リップ10選
    'feature-autumn-lips-matte-velvet-10': {
        'title': '【マット系】秋リップおすすめ10選！ふんわりスフレ＆ベルベット質感でシックに魅せる名品徹底比較',
        'categoryLabel': '🖤 【機能特化特集】マット系秋リップ10選',
        'items': [
            {'kw': 'MAC パウダー キス リップスティック', 'fb': 'MAC リップ', 'id': 'lip26-ma-mac'},
            {'kw': 'イヴサンローラン ルージュ ピュールクチュール ザ スリム', 'fb': 'YSL ザスリム', 'id': 'lip26-ma-ysl-slim'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'lip26-ma-fwee'},
            {'kw': 'ロムアンド ゼロベルベットティント 06', 'fb': 'ロムアンド ゼロベルベット', 'id': 'lip26-ma-romand06'},
            {'kw': '3CE ムード レシピ リップ カラー', 'fb': '3CE リップ', 'id': 'lip26-ma-3ce'},
            {'kw': 'エクセル リップベルベティスト', 'fb': 'エクセル ベルベティスト', 'id': 'lip26-ma-excel'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09', 'fb': 'セルヴォーク 09', 'id': 'lip26-ma-celvoke09'},
            {'kw': 'エチュード フィクシングティント', 'fb': 'エチュード フィクシングティント', 'id': 'lip26-ma-etude'},
            {'kw': 'ペリペラ インク ベルベット', 'fb': 'ペリペラ インクベルベット', 'id': 'lip26-ma-peripera'},
            {'kw': 'リンメル マシュマロルック リップスティック', 'fb': 'リンメル リップ', 'id': 'lip26-ma-rimmel'}
        ]
    },
    # 18. 乾燥しにくい秋リップ10選
    'feature-autumn-lips-moisturizing-care-10': {
        'title': '【乾燥しにくい】秋リップおすすめ10選！高保湿トリートメント成分で一日中皮むけを防ぐ神リップ徹底比較',
        'categoryLabel': '💧 【機能特化特集】乾燥しにくい秋リップ10選',
        'items': [
            {'kw': 'ディオール アディクト リップ グロウ 001', 'fb': 'ディオール 001', 'id': 'lip26-mo-dior001'},
            {'kw': 'SUQQU モイスチャー グレイズ ルージュ', 'fb': 'スック リップ', 'id': 'lip26-mo-suqqu'},
            {'kw': 'ルージュ エルメス ボーム ドゥ ソワン', 'fb': 'エルメス リップバーム', 'id': 'lip26-mo-hermes'},
            {'kw': 'LANEIGE リップスリーピングマスク ベリー', 'fb': 'ラネージュ リップ', 'id': 'lip26-mo-laneige'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール 020', 'id': 'lip26-mo-dior020'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'lip26-mo-ysl'},
            {'kw': 'シャネル ルージュ ココ ボーム', 'fb': 'シャネル リップボーム', 'id': 'lip26-mo-chanel-baume'},
            {'kw': 'オペラ リップティント N 09', 'fb': 'オペラ 09', 'id': 'lip26-mo-opera09'},
            {'kw': 'エトヴォス ミネラルシアールージュ', 'fb': 'エトヴォス リップ', 'id': 'lip26-mo-etvos'},
            {'kw': 'キュレル リップケアバーム', 'fb': 'キュレル リップ', 'id': 'lip26-mo-curel'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_items_to_fetch = {}

for theme_id, theme_data in themes_10_items_definitions.items():
    for item in theme_data['items']:
        unique_id = item['id']
        if unique_id not in all_unique_items_to_fetch:
            all_unique_items_to_fetch[unique_id] = {
                'kw': item['kw'],
                'fb': item['fb']
            }

print(f"Total unique products to fetch from Rakuten OpenAPI: {len(all_unique_items_to_fetch)}")

fetched_database = {}
if os.path.exists('scratch/rakuten_api_autumn_lips_full_db.json'):
    with open('scratch/rakuten_api_autumn_lips_full_db.json') as f:
        fetched_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_items_to_fetch.items():
    if unique_id in fetched_database:
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
                    
                    fetched_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    # 毎回都度ファイルに保存して完了を保証
                    with open('scratch/rakuten_api_autumn_lips_full_db.json', 'w', encoding='utf-8') as f:
                        json.dump(fetched_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_autumn_lips_full_db.json', 'w', encoding='utf-8') as f:
    json.dump(fetched_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total fetched in DB: {len(fetched_database)} / {len(all_unique_items_to_fetch)}")
