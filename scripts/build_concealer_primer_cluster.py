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

# コンシーラー5テーマ＋化粧下地6テーマ＝計11テーマ（各10商品＝計110商品）
concealer_primer_definitions = {
    # --- コンシーラー特集（5テーマ） ---
    # 1. クマ隠しコンシーラー10選
    'feature-concealer-dark-circles-10': {
        'title': '【クマ消し】クマ隠しコンシーラーおすすめ10選！青クマ・茶クマ・黒クマを瞬時に飛ばす神アイテム徹底比較',
        'category': 'concealer',
        'categoryLabel': '👁️ 【目元悩み特化】クマ隠しコンシーラー10選',
        'concern': '青クマ・茶クマ・黒クマ・目元のくすみや影の完全補正',
        'items': [
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー', 'fb': 'ディオール コンシーラー', 'id': 'cc-kuma-dior'},
            {'kw': 'コスメデコルテ トーンパーフェクティング パレット', 'fb': 'コスメデコルテ パレット コンシーラー', 'id': 'cc-kuma-decorte'},
            {'kw': 'ルナソル シームレスコンシーリングコンパクト', 'fb': 'ルナソル コンシーラー', 'id': 'cc-kuma-lunasol'},
            {'kw': 'アンドビー ファンシーラー', 'fb': '&be ファンシーラー', 'id': 'cc-kuma-andbe'},
            {'kw': 'NARS ラディアント クリーミー コンシーラー', 'fb': 'NARS コンシーラー', 'id': 'cc-kuma-nars'},
            {'kw': 'セザンヌ ストレッチコンシーラー 30 オレンジ系', 'fb': 'セザンヌ ストレッチコンシーラー', 'id': 'cc-kuma-cezanne'},
            {'kw': 'ザセム カバーパーフェクション チップコンシーラー', 'fb': 'ザセム コンシーラー', 'id': 'cc-kuma-thesaem'},
            {'kw': 'キャンメイク カラーミキシングコンシーラー 03', 'fb': 'キャンメイク コンシーラー 03', 'id': 'cc-kuma-canmake'},
            {'kw': 'エトヴォス ミネラルコンシーラーパレット', 'fb': 'エトヴォス コンシーラー', 'id': 'cc-kuma-etvos'},
            {'kw': 'イプサ クリエイティブコンシーラーe', 'fb': 'IPSA コンシーラー', 'id': 'cc-kuma-ipsa'}
        ]
    },
    # 2. ニキビ跡を隠すコンシーラー10選
    'feature-concealer-acne-scars-10': {
        'title': '【赤み・跡消し】ニキビ跡を隠すコンシーラー10選！赤み・凹凸をピタッと密着カバーする名品徹底比較',
        'category': 'concealer',
        'categoryLabel': '🎯 【肌トラブル特化】ニキビ跡を隠すコンシーラー10選',
        'concern': 'ニキビ跡の赤み・色素沈着・クレーター凹凸の密着カバー',
        'items': [
            {'kw': 'ザセム カバーパーフェクション チップコンシーラー', 'fb': 'ザセム チップコンシーラー', 'id': 'cc-acne-thesaem'},
            {'kw': '資生堂 スポッツカバー ファウンデイション', 'fb': 'スポッツカバー ファウンデイション', 'id': 'cc-acne-spotscover'},
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー', 'fb': 'ディオール コンシーラー', 'id': 'cc-acne-dior'},
            {'kw': 'NARS ソフトマット 完全コンシーラー コンプリートコンシーラー', 'fb': 'NARS ソフトマット コンシーラー', 'id': 'cc-acne-nars-pot'},
            {'kw': 'ケイト スティックコンシーラーA', 'fb': 'KATE スティックコンシーラー', 'id': 'cc-acne-kate-stick'},
            {'kw': 'ヴィセ レッドトリック アイコンシーラー', 'fb': 'ヴィセ レッドトリック', 'id': 'cc-acne-visee-red'},
            {'kw': 'dプログラム 薬用 スキンケア＆カバーチューブ', 'fb': 'dプログラム コンシーラー', 'id': 'cc-acne-dprogram'},
            {'kw': 'CLIO キルカバー エアリーフィット コンシーラー', 'fb': 'CLIO コンシーラー', 'id': 'cc-acne-clio'},
            {'kw': 'キャンメイク カバー＆ストレッチコンシーラー UV', 'fb': 'キャンメイク カバー ストレッチ', 'id': 'cc-acne-canmake-uv'},
            {'kw': 'セザンヌ 毛穴レスコンシーラー クリア', 'fb': 'セザンヌ 毛穴レスコンシーラー', 'id': 'cc-acne-cezanne-pore'}
        ]
    },
    # 3. 毛穴を隠すコンシーラー10選
    'feature-concealer-pore-blur-10': {
        'title': '【毛穴レス】毛穴を隠すコンシーラーおすすめ10選！開き毛穴や凹凸をフラットに埋めるポアプライマー徹底比較',
        'category': 'concealer',
        'categoryLabel': '✨ 【凹凸補正特化】毛穴を隠すコンシーラー10選',
        'concern': 'すり鉢毛穴・たるみ毛穴・黒ずみ毛穴のフラット化とぼかし補正',
        'items': [
            {'kw': 'セザンヌ 毛穴レスコンシーラー クリア', 'fb': 'セザンヌ 毛穴レスコンシーラー', 'id': 'cc-pore-cezanne'},
            {'kw': 'マキアージュ ポアパーフェクトカバー', 'fb': 'マキアージュ ポアパーフェクト', 'id': 'cc-pore-maquillage'},
            {'kw': 'イヴサンローラン ラディアント タッチ', 'fb': 'YSL ラディアントタッチ', 'id': 'cc-pore-ysl-touch'},
            {'kw': 'クリニーク エアブラシ コンシーラー', 'fb': 'クリニーク コンシーラー', 'id': 'cc-pore-clinique'},
            {'kw': 'コスメデコルテ トーンパーフェクティング パレット', 'fb': 'コスメデコルテ コンシーラーパレット', 'id': 'cc-pore-decorte'},
            {'kw': 'NARS ラディアント クリーミー コンシーラー', 'fb': 'NARS ラディアントクリーミー', 'id': 'cc-pore-nars'},
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト', 'fb': 'ディオール スキンコレクト', 'id': 'cc-pore-dior'},
            {'kw': 'キャンメイク ポアレスエアリーベース', 'fb': 'キャンメイク ポアレス', 'id': 'cc-pore-canmake-base'},
            {'kw': 'タイムシークレット ミネラル 薬用プレストパウダー', 'fb': 'タイムシークレット プレストパウダー', 'id': 'cc-pore-timesecret'},
            {'kw': 'エクセル サイレントカバー コンシーラー', 'fb': 'エクセル コンシーラー', 'id': 'cc-pore-excel'}
        ]
    },
    # 4. 崩れにくいコンシーラー10選
    'feature-concealer-long-lasting-10': {
        'title': '【密着キープ】崩れにくいコンシーラーおすすめ10選！汗・皮脂・表情ジワでもヨレない耐久性徹底比較',
        'category': 'concealer',
        'categoryLabel': '🔒 【高耐久特化】崩れにくいコンシーラー10選',
        'concern': '笑いジワ・まばたき・皮脂によるひび割れやヨレ・崩れの防止',
        'items': [
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー', 'fb': 'ディオール コンシーラー', 'id': 'cc-stay-dior'},
            {'kw': 'NARS ラディアント クリーミー コンシーラー', 'fb': 'NARS コンシーラー', 'id': 'cc-stay-nars'},
            {'kw': 'ザセム カバーパーフェクション チップコンシーラー', 'fb': 'ザセム コンシーラー', 'id': 'cc-stay-thesaem'},
            {'kw': 'ローラメルシエ シークレット カモフラージュ ブライト アンド コレクト', 'fb': 'ローラメルシエ コンシーラー', 'id': 'cc-stay-lauramercier'},
            {'kw': 'コスメデコルテ トーンパーフェクティング パレット', 'fb': 'デコルテ コンシーラー', 'id': 'cc-stay-decorte'},
            {'kw': 'KATE スティックコンシーラーA', 'fb': 'KATE コンシーラー', 'id': 'cc-stay-kate'},
            {'kw': 'メイベリン フィットミー コンシーラー', 'fb': 'メイベリン コンシーラー', 'id': 'cc-stay-maybelline'},
            {'kw': 'セザンヌ ストレッチコンシーラー', 'fb': 'セザンヌ ストレッチコンシーラー', 'id': 'cc-stay-cezanne'},
            {'kw': 'CLIO キルカバー エアリーフィット コンシーラー', 'fb': 'クリオ コンシーラー', 'id': 'cc-stay-clio'},
            {'kw': 'キャンメイク カラーミキシングコンシーラー', 'fb': 'キャンメイク コンシーラー', 'id': 'cc-stay-canmake'}
        ]
    },
    # 5. 乾燥しにくいコンシーラー10選
    'feature-concealer-moisturizing-dry-10': {
        'title': '【高保湿・目元用】乾燥しにくいコンシーラー10選！夕方でもパサつかない美容液仕立て徹底比較',
        'category': 'concealer',
        'categoryLabel': '💧 【保湿ケア特化】乾燥しにくいコンシーラー10選',
        'concern': '目元・口元の粉ふき・ちりめんジワ・乾燥によるひび割れ防止',
        'items': [
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー', 'fb': 'ディオール コンシーラー', 'id': 'cc-moist-dior'},
            {'kw': 'ルナソル シームレスコンシーリングコンパクト', 'fb': 'ルナソル コンシーラー', 'id': 'cc-moist-lunasol'},
            {'kw': 'アンドビー ファンシーラー', 'fb': '&be ファンシーラー', 'id': 'cc-moist-andbe'},
            {'kw': 'エトヴォス ミネラルコンシーラーパレット', 'fb': 'エトヴォス コンシーラー', 'id': 'cc-moist-etvos'},
            {'kw': 'イヴサンローラン ラディアント タッチ', 'fb': 'YSL ラディアントタッチ', 'id': 'cc-moist-ysl'},
            {'kw': 'RMK フローレスカバーコンシーラー', 'fb': 'RMK コンシーラー', 'id': 'cc-moist-rmk'},
            {'kw': 'コスメデコルテ トーンパーフェクティング パレット', 'fb': 'デコルテ コンシーラー', 'id': 'cc-moist-decorte'},
            {'kw': 'セザンヌ パレットコンシーラー ハイカバー', 'fb': 'セザンヌ パレットコンシーラー', 'id': 'cc-moist-cezanne'},
            {'kw': 'エクセル サイレントカバー コンシーラー', 'fb': 'エクセル コンシーラー', 'id': 'cc-moist-excel'},
            {'kw': 'アディクション スキンリフレクト フレッシュ コンシーラー', 'fb': 'アディクション コンシーラー', 'id': 'cc-moist-addiction'}
        ]
    },

    # --- 化粧下地特集（6テーマ） ---
    # 6. 毛穴をカバーする化粧下地10選
    'feature-primer-pore-cover-smooth-10': {
        'title': '【毛穴カバー下地】毛穴をカバーする化粧下地10選！凹凸フラット＆サラサラ陶器肌を叶える名品徹底比較',
        'category': 'primer',
        'categoryLabel': '✨ 【毛穴補正特化】毛穴をカバーする化粧下地10選',
        'concern': '開き毛穴・黒ずみ毛穴・凹凸を埋めてフラットに整える',
        'items': [
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'マキアージュ スキンセンサーベース', 'id': 'pr-pore-maquillage'},
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー 下地', 'id': 'pr-pore-pauljoe'},
            {'kw': 'コスメデコルテ サンシェルター トーンアップCC', 'fb': 'サンシェルター トーンアップCC', 'id': 'pr-pore-decorte-cc'},
            {'kw': 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', 'fb': 'プリマヴィスタ 下地', 'id': 'pr-pore-primavista'},
            {'kw': 'RMK スムースフィット ポアレスベース', 'fb': 'RMK ポアレスベース', 'id': 'pr-pore-rmk-pore'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地 保湿タイプ', 'fb': 'セザンヌ 皮脂テカリ防止下地', 'id': 'pr-pore-cezanne'},
            {'kw': 'キャンメイク ポアレスエアリーベース', 'fb': 'キャンメイク ポアレスベース', 'id': 'pr-pore-canmake'},
            {'kw': 'シュウウエムラ アンリミテッド ブロックブースター', 'fb': 'シュウウエムラ 下地', 'id': 'pr-pore-shuuemura'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー 下地', 'id': 'pr-pore-cledepeau'},
            {'kw': 'エクセル モチベートユアスキン', 'fb': 'エクセル 下地', 'id': 'pr-pore-excel'}
        ]
    },
    # 7. テカリ防止下地10選
    'feature-primer-oil-control-matte-10': {
        'title': '【皮脂テカリ防止】テカリ防止下地おすすめ10選！過剰皮脂を吸着して一日中サラサラ肌キープ徹底比較',
        'category': 'primer',
        'categoryLabel': '🔥 【皮脂抑制特化】テカリ防止下地10選',
        'concern': 'Tゾーン・小鼻のテカリ・ベタつき・油浮きの完全抑制',
        'items': [
            {'kw': 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', 'fb': 'プリマヴィスタ 皮脂くずれ防止下地', 'id': 'pr-oil-primavista'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地 ピンクベージュ', 'fb': 'セザンヌ 皮脂テカリ防止下地', 'id': 'pr-oil-cezanne-pink'},
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'ドラマティックスキンセンサーベース', 'id': 'pr-oil-maquillage'},
            {'kw': 'キス マットシフォン UVホワイトニングベース', 'fb': 'キス マットシフォン 下地', 'id': 'pr-oil-kiss'},
            {'kw': 'エテュセ フェイスエディション スキンベース フォーオイリースキン', 'fb': 'エテュセ オイリー 下地', 'id': 'pr-oil-ettusais'},
            {'kw': 'イニスフリー ノーセバム ブラープライマー', 'fb': 'イニスフリー プライマー', 'id': 'pr-oil-innisfree'},
            {'kw': 'シュウウエムラ アンリミテッド ブロックブースター', 'fb': 'シュウウエムラ ブロックブースター', 'id': 'pr-oil-shuuemura'},
            {'kw': 'キャンメイク オイルブロックミネラルパウダー', 'fb': 'キャンメイク オイルブロック', 'id': 'pr-oil-canmake'},
            {'kw': 'ソフィーナiP スキンケアUV 01 皮脂がでやすい肌', 'fb': 'ソフィーナiP UV', 'id': 'pr-oil-sofinaip'},
            {'kw': 'キュレル 皮脂トラブルケア 保湿ジェル', 'fb': 'キュレル 皮脂トラブルケア', 'id': 'pr-oil-curel'}
        ]
    },
    # 8. 崩れにくい化粧下地10選
    'feature-primer-long-lasting-stay-10': {
        'title': '【鉄壁密着】崩れにくい化粧下地おすすめ10選！マスク・汗・摩擦でもファンデが密着キープ徹底比較',
        'category': 'primer',
        'categoryLabel': '🔒 【密着キープ特化】崩れにくい化粧下地10選',
        'concern': 'ファンデーションの密着力向上・ヨレや色移りの防止',
        'items': [
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'マキアージュ 下地', 'id': 'pr-stay-maquillage'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー 下地', 'id': 'pr-stay-cledepeau'},
            {'kw': 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', 'fb': 'プリマヴィスタ 下地', 'id': 'pr-stay-primavista'},
            {'kw': 'コスメデコルテ サンシェルター トーンアップCC', 'fb': 'サンシェルターCC', 'id': 'pr-stay-decorte'},
            {'kw': 'シュウウエムラ アンリミテッド ブロックブースター', 'fb': 'シュウウエムラ 下地', 'id': 'pr-stay-shuuemura'},
            {'kw': 'ポール＆ジョー プロテクティング ファンデーション プライマー', 'fb': 'ポールアンドジョー プロテクティング', 'id': 'pr-stay-pauljoe'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地', 'fb': 'セザンヌ 下地', 'id': 'pr-stay-cezanne'},
            {'kw': 'アンドビー UVプライマー', 'fb': '&be UVプライマー', 'id': 'pr-stay-andbe'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ', 'fb': 'ラロッシュポゼ トーンアップ', 'id': 'pr-stay-larocheposay'},
            {'kw': 'コーセー メイクキープ下地', 'fb': 'メイクキープ プライマー', 'id': 'pr-stay-kose'}
        ]
    },
    # 9. 乾燥肌向け化粧下地10選
    'feature-primer-dry-skin-moisture-10': {
        'title': '【乾燥肌向け】化粧下地おすすめ10選！美容液80%以上で一日中潤い・粉ふき知らずの保湿下地徹底比較',
        'category': 'primer',
        'categoryLabel': '💧 【高保湿特化】乾燥肌向け化粧下地10選',
        'concern': '粉ふき・皮むけ・日中のつっぱり感防止と濃密保湿',
        'items': [
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー モイスチュア 下地', 'id': 'pr-dry-pauljoe'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー ヴォワールコレクチュール', 'id': 'pr-dry-cledepeau'},
            {'kw': 'コスメデコルテ フローレススキン グロウライザー', 'fb': 'コスメデコルテ グロウライザー', 'id': 'pr-dry-decorte-glow'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ', 'fb': 'ラロッシュポゼ ローズ', 'id': 'pr-dry-larocheposay-rose'},
            {'kw': 'アンドビー UVプライマー', 'fb': '&be UVプライマー', 'id': 'pr-dry-andbe'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース', 'fb': 'エトヴォス トリートメントベース', 'id': 'pr-dry-etvos-inner'},
            {'kw': 'カネボウ クリーム イン デイ', 'fb': 'KANEBO クリームインデイ', 'id': 'pr-dry-kanebo-cream'},
            {'kw': 'ダルバ ウォータフルトーンアップサンクリーム', 'fb': 'ダルバ トーンアップ サンクリーム', 'id': 'pr-dry-dalba'},
            {'kw': 'セザンヌ グロウスキンベース', 'fb': 'セザンヌ 下地 グロウ', 'id': 'pr-dry-cezanne-glow'},
            {'kw': 'キュレル 潤浸保湿 色づくベースミルク', 'fb': 'キュレル ベースミルク', 'id': 'pr-dry-curel'}
        ]
    },
    # 10. 混合肌向け化粧下地10選
    'feature-primer-combination-skin-balance-10': {
        'title': '【混合肌向け】化粧下地おすすめ10選！Tゾーンのテカリと頬の乾燥を同時に整えるバランス下地徹底比較',
        'category': 'primer',
        'categoryLabel': '⚖️ 【水分油分バランス特化】混合肌向け化粧下地10選',
        'concern': 'Tゾーンのテカリ防止とUゾーンの乾燥対策の黄金両立',
        'items': [
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'ドラマティックスキンセンサーベース', 'id': 'pr-comb-maquillage'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー 下地', 'id': 'pr-comb-cledepeau'},
            {'kw': 'コスメデコルテ サンシェルター トーンアップCC', 'fb': 'サンシェルターCC', 'id': 'pr-comb-decorte'},
            {'kw': 'シュウウエムラ アンリミテッド ブロックブースター', 'fb': 'シュウウエムラ 下地', 'id': 'pr-comb-shuuemura'},
            {'kw': 'ポール＆ジョー プロテクティング ファンデーション プライマー', 'fb': 'ポールアンドジョー 下地', 'id': 'pr-comb-pauljoe'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ クリア', 'fb': 'ラロッシュポゼ クリア', 'id': 'pr-comb-larocheposay-clear'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地 保湿タイプ', 'fb': 'セザンヌ 下地 保湿', 'id': 'pr-comb-cezanne-moist'},
            {'kw': 'RMK スムースフィット ポアレスベース', 'fb': 'RMK ポアレスベース', 'id': 'pr-comb-rmk'},
            {'kw': 'エクセル モチベートユアスキン', 'fb': 'エクセル 下地', 'id': 'pr-comb-excel'},
            {'kw': 'ミシャ M クッションベース ミント', 'fb': 'ミシャ クッションベース', 'id': 'pr-comb-missha'}
        ]
    },
    # 11. トーンアップ下地10選
    'feature-primer-tone-up-bright-10': {
        'title': '【透明感・美白見え】トーンアップ下地おすすめ10選！くすみを飛ばしてパッと明るい発光肌を作る名品徹底比較',
        'category': 'primer',
        'categoryLabel': '✨ 【透明感・トーンアップ特化】トーンアップ下地10選',
        'concern': '黄ぐすみ・茶ぐすみ・血色感不足を解消し澄んだ透明感を与える',
        'items': [
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ', 'fb': 'ラロッシュポゼ ローズ', 'id': 'pr-tone-larocheposay-rose'},
            {'kw': 'コスメデコルテ サンシェルター トーンアップCC 01', 'fb': 'サンシェルター トーンアップCC', 'id': 'pr-tone-decorte-cc'},
            {'kw': 'ポール＆ジョー ラトゥー エクラ ファンデーション プライマー N', 'fb': 'ラトゥーエクラ プライマー', 'id': 'pr-tone-pauljoe-latout'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'ヴォワールコレクチュールn', 'id': 'pr-tone-cledepeau'},
            {'kw': 'アンドビー UVプライマー ピーチグロウ', 'fb': '&be UVプライマー', 'id': 'pr-tone-andbe'},
            {'kw': 'ジルスチュアート ルーセントシフォン トーンアップ プライマー', 'fb': 'ジルスチュアート 下地', 'id': 'pr-tone-jillstuart'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地 ライトブルー', 'fb': 'セザンヌ 下地 ブルー', 'id': 'pr-tone-cezanne-blue'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース ラベンダーベージュ', 'fb': 'エトヴォス ラベンダー', 'id': 'pr-tone-etvos-lavender'},
            {'kw': 'ナンバーズイン 3番 ノーファンデ陶器肌トーンアップクリーム', 'fb': 'ナンバーズイン 3番 トーンアップ', 'id': 'pr-tone-numbuzin3'},
            {'kw': 'キャンメイク マーメイドスキンジェルUV C01 CICAミント', 'fb': 'マーメイドスキンジェル CICA', 'id': 'pr-tone-canmake-mermaid'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_cp_items = {}

for theme_id, theme_meta in concealer_primer_definitions.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_cp_items:
            all_unique_cp_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique concealer & primer products to fetch: {len(all_unique_cp_items)}")

cp_database = {}
if os.path.exists('scratch/rakuten_api_concealer_primer_db.json'):
    with open('scratch/rakuten_api_concealer_primer_db.json') as f:
        cp_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_cp_items.items():
    if unique_id in cp_database:
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
                    
                    cp_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_concealer_primer_db.json', 'w', encoding='utf-8') as f:
                        json.dump(cp_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_concealer_primer_db.json', 'w', encoding='utf-8') as f:
    json.dump(cp_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total Concealer/Primer DB items: {len(cp_database)} / {len(all_unique_cp_items)}")
