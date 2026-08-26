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

# ギフト・プレゼント特化コスメ 10テーマ（各10商品＝計100商品）
gift_cosme_definitions = {
    # 1. 女性へのプレゼントコスメ10選
    'feature-gift-for-women-cosmetics-10': {
        'title': '【女性が喜ぶ】プレゼントコスメおすすめ10選！絶対に外さない名品デパコス＆人気ギフト徹底比較',
        'category': 'gift',
        'categoryLabel': '🎁 【女性向けギフト】女性へのプレゼントコスメ10選',
        'target_recipient': 'すべての女性（同僚・知人・お世話になった方）',
        'gift_appeal': 'パッケージの美しさ、使いやすさ、実用性を兼ね備え、受け取った瞬間に気分が高揚する王道ギフトコスメ',
        'items': [
            {'kw': 'ディオール アディクト リップ マキシマイザー 001', 'fb': 'ディオール リップ マキシマイザー', 'id': 'gf-wom-dior-maximizer'},
            {'kw': 'シャネル ルージュ ココ ボーム 912', 'fb': 'シャネル リップクリーム', 'id': 'gf-wom-chanel-baume'},
            {'kw': 'ジルスチュアート ハンドクリーム ホワイトフローラル', 'fb': 'ジルスチュアート ハンドクリーム', 'id': 'gf-wom-jill-hand'},
            {'kw': 'コスメデコルテ ルース パウダー 00', 'fb': 'コスメデコルテ パウダー', 'id': 'gf-wom-decorte-powder'},
            {'kw': 'SHIRO サボン オードパルファン', 'fb': 'SHIRO サボン 香水', 'id': 'gf-wom-shiro-savon'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'gf-wom-ysl-candy'},
            {'kw': 'Jo Malone ロンドン イングリッシュペアー＆フリージア コロン', 'fb': 'ジョーマローン 香水 30ml', 'id': 'gf-wom-jomalone'},
            {'kw': 'ロクシタン シア ハンドクリーム 30ml', 'fb': 'ロクシタン ハンドクリーム', 'id': 'gf-wom-loccitane'},
            {'kw': 'エルメス ルージュ エルメス リップケアバーム', 'fb': 'エルメス リップバーム', 'id': 'gf-wom-hermes-lip'},
            {'kw': 'クレ・ド・ポー ボーテ マニフィカトゥールレーブルn', 'fb': 'クレドポー リップバーム', 'id': 'gf-wom-cledepeau-lip'}
        ]
    },
    # 2. 友達へのプレゼントコスメ10選
    'feature-gift-for-friends-cosmetics-10': {
        'title': '【友達・同僚へ】プレゼントコスメおすすめ10選！気兼ねなく渡せてセンス抜群のギフト徹底比較',
        'category': 'gift',
        'categoryLabel': '👭 【女友達・同僚】友達へのプレゼントコスメ10選',
        'target_recipient': '仲の良い女友達・職場の同僚・お礼ギフト',
        'gift_appeal': '相手に気を遣わせない価格感とおしゃれなパッケージで、センスの良さが際立つ実力派ギフト',
        'items': [
            {'kw': 'ジルスチュアート リップバーム ホワイトフローラル', 'fb': 'ジルスチュアート リップバーム', 'id': 'gf-frd-jill-lip'},
            {'kw': 'SHIRO ハンド美容液 ホワイトリリー', 'fb': 'SHIRO ハンド美容液', 'id': 'gf-frd-shiro-hand'},
            {'kw': 'ディオール アディクト リップ グロウ 001', 'fb': 'ディオール リップグロウ 001', 'id': 'gf-frd-dior-lipglow'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'gf-frd-fwee-pudding'},
            {'kw': 'ロクシタン ハンドクリーム シア＆ローズ ミニセット', 'fb': 'ロクシタン ミニセット', 'id': 'gf-frd-loccitane-set'},
            {'kw': 'コスメデコルテ キモノ ユズ オードトワレ ミニ', 'fb': 'コスメデコルテ キモノ 香水', 'id': 'gf-frd-decorte-kimono'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー パウダー', 'id': 'gf-frd-innisfree-pow'},
            {'kw': 'ポール＆ジョー リップスティック トリートメント レフィル', 'fb': 'ポールアンドジョー 猫 リップ', 'id': 'gf-frd-pauljoe-cat'},
            {'kw': 'Laka ボンディンググロウリップスティック', 'fb': 'Laka リップ', 'id': 'gf-frd-laka-lip'},
            {'kw': 'サボン (SABON) ハンドクリーム パチュリ・ラベンダー・バニラ', 'fb': 'SABON ハンドクリーム', 'id': 'gf-frd-sabon-hand'}
        ]
    },
    # 3. 彼女へのプレゼントコスメ10選
    'feature-gift-for-girlfriend-cosmetics-10': {
        'title': '【彼女へ贈る】プレゼントコスメおすすめ10選！本命に喜ばれる憧れデパコス＆刻印名品徹底比較',
        'category': 'gift',
        'categoryLabel': '💍 【彼女・パートナー】彼女へのプレゼントコスメ10選',
        'target_recipient': '本命彼女・妻・パートナー・記念日',
        'gift_appeal': '女性が一度は憧れるハイブランドのラグジュアリーコスメで、特別感と愛情が伝わる最高峰ギフト',
        'items': [
            {'kw': 'シャネル ルージュ ココ フラッシュ 90', 'fb': 'シャネル ココフラッシュ 90', 'id': 'gf-gf-chanel-flash'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール マキシマイザー 020', 'id': 'gf-gf-dior-maximizer'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'gf-gf-ysl-candy'},
            {'kw': 'エルメス ルージュ エルメス ボーム ドゥ ソワン', 'fb': 'エルメス リップバーム', 'id': 'gf-gf-hermes-baume'},
            {'kw': 'SUQQU シグニチャー カラー アイズ 02 陽香色', 'fb': 'SUQQU 陽香色', 'id': 'gf-gf-suqqu-shadow'},
            {'kw': 'トムフォード アイ カラー クォード 04A', 'fb': 'トムフォード アイカラークォード', 'id': 'gf-gf-tomford-quad'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'gf-gf-jill-blush'},
            {'kw': 'Jo Malone ロンドン ピオニー＆ブラッシュ スエード コロン', 'fb': 'ジョーマローン ピオニー 香水', 'id': 'gf-gf-jomalone-peony'},
            {'kw': 'クレ・ド・ポー ボーテ ル・レオスールデクラ', 'fb': 'レオスールデクラ ハイライト', 'id': 'gf-gf-cledepeau-high'},
            {'kw': 'コスメデコルテ AQ ミリオリティ フェイスパウダー n', 'fb': 'コスメデコルテ AQ パウダー', 'id': 'gf-gf-decorte-aq'}
        ]
    },
    # 4. 20代女性へのプレゼントコスメ10選
    'feature-gift-for-20s-women-cosmetics-10': {
        'title': '【20代女性へ】プレゼントコスメおすすめ10選！トレンド感＆映え抜群の話題デパコス徹底比較',
        'category': 'gift',
        'categoryLabel': '🌸 【20代向けギフト】20代女性へのプレゼントコスメ10選',
        'target_recipient': '20代女性（大学生・新社会人・20代後半女性）',
        'gift_appeal': 'SNSで話題のトレンドコスメや、持っているだけで気分が上がるパッケージ映え抜群のコスメ',
        'items': [
            {'kw': 'ディオール アディクト リップ マキシマイザー 001', 'fb': 'ディオール マキシマイザー', 'id': 'gf-20s-dior-max'},
            {'kw': 'ジルスチュアート リップグロウ セラムバーム', 'fb': 'ジルスチュアート リップバーム', 'id': 'gf-20s-jill-balm'},
            {'kw': 'シャネル ルージュ ココ ボーム 912', 'fb': 'シャネル リップクリーム', 'id': 'gf-20s-chanel-baume'},
            {'kw': 'SHIRO サボン ヘアオイル', 'fb': 'SHIRO ヘアオイル', 'id': 'gf-20s-shiro-oil'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット RS01', 'fb': 'fwee プリンポット RS01', 'id': 'gf-20s-fwee-pudding'},
            {'kw': 'ロムアンド ジューシーラスティングティント 25 ベアグレープ', 'fb': 'ジューシーラスティングティント 25', 'id': 'gf-20s-romand-grape'},
            {'kw': 'CLIO プロ アイ パレット エアー', 'fb': 'クリオ アイシャドウ パレット', 'id': 'gf-20s-clio-palette'},
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー 下地', 'id': 'gf-20s-pauljoe-base'},
            {'kw': 'コスメデコルテ ルース パウダー 00', 'fb': 'コスメデコルテ パウダー', 'id': 'gf-20s-decorte-powder'},
            {'kw': 'イヴサンローラン ルージュ ヴォリュプテ キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'gf-20s-ysl-candy'}
        ]
    },
    # 5. 30代女性へのプレゼントコスメ10選
    'feature-gift-for-30s-women-cosmetics-10': {
        'title': '【30代女性へ】プレゼントコスメおすすめ10選！上質スキンケア＆大人の品格デパコス徹底比較',
        'category': 'gift',
        'categoryLabel': '🌿 【30代向けギフト】30代女性へのプレゼントコスメ10選',
        'target_recipient': '30代女性（アラサー・働く女性・ママ・友人）',
        'gift_appeal': '肌への優しさと確かな効果を実感できる上質なスキンケアや、大人の洗練された品格を引き立てるデパコス',
        'items': [
            {'kw': 'コスメデコルテ リポソーム アドバンスト リペアセラム 50ml', 'fb': 'リポソーム アドバンスト リペアセラム', 'id': 'gf-30s-decorte-lipo'},
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 エッセンススキングロウ', 'id': 'gf-30s-shiseido-fd'},
            {'kw': 'カネボウ クリーム イン デイ', 'fb': 'KANEBO クリームインデイ', 'id': 'gf-30s-kanebo-day'},
            {'kw': 'SUQQU シグニチャー カラー アイズ 02 陽香色', 'fb': 'SUQQU 陽香色', 'id': 'gf-30s-suqqu-shadow'},
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75 フィデリテ', 'id': 'gf-30s-chanel-laque'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー 下地', 'id': 'gf-30s-cledepeau-base'},
            {'kw': 'タカミスキンピール 30ml', 'fb': 'タカミスキンピール', 'id': 'gf-30s-takami'},
            {'kw': 'Jo Malone ロンドン イングリッシュペアー＆フリージア ハンドクリーム', 'fb': 'ジョーマローン ハンドクリーム', 'id': 'gf-30s-jomalone-hand'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース', 'fb': 'エトヴォス 下地', 'id': 'gf-30s-etvos-base'},
            {'kw': 'ディオール バックステージ アイ パレット 001', 'fb': 'ディオール アイパレット 001', 'id': 'gf-30s-dior-palette'}
        ]
    },
    # 6. 40代女性へのプレゼントコスメ10選
    'feature-gift-for-40s-women-cosmetics-10': {
        'title': '【40代女性へ】プレゼントコスメおすすめ10選！贅沢エイジングケア＆最高峰プレステージ名品徹底比較',
        'category': 'gift',
        'categoryLabel': '👑 【40代向けギフト】40代女性へのプレゼントコスメ10選',
        'target_recipient': '40代女性（母・先輩・上司・大切なパートナー）',
        'gift_appeal': '純粋レチノールや高機能美容液など、本物志向の大人女性が心から満足する最高峰プレステージコスメ',
        'items': [
            {'kw': 'ポーラ リンクルショット メディカル セラム N', 'fb': 'リンクルショット メディカルセラム', 'id': 'gf-40s-pola-wrinkle'},
            {'kw': 'クレ・ド・ポー ボーテ ル・セラム 50ml', 'fb': 'クレドポー ルセラム', 'id': 'gf-40s-cledepeau-serum'},
            {'kw': 'エリクシール レチノパワー リンクルクリーム L', 'fb': 'エリクシール リンクルクリーム', 'id': 'gf-40s-elixir-retino'},
            {'kw': 'コスメデコルテ AQ ミリオリティ フェイスパウダー n', 'fb': 'コスメデコルテ AQ パウダー', 'id': 'gf-40s-decorte-aq-pow'},
            {'kw': 'SUQQU ザ ファンデーション', 'fb': 'SUQQU ザ ファンデーション', 'id': 'gf-40s-suqqu-fd'},
            {'kw': 'SK-II フェイシャル トリートメント エッセンス 230ml', 'fb': 'SK-II 化粧水 230ml', 'id': 'gf-40s-skii-fte'},
            {'kw': 'エルメス ルージュ エルメス リップケアバーム', 'fb': 'エルメス リップバーム', 'id': 'gf-40s-hermes-lip'},
            {'kw': 'シャネル レ キャトル オンブル 268', 'fb': 'シャネル レキャトルオンブル', 'id': 'gf-40s-chanel-quad'},
            {'kw': 'ランコム アプソリュ ソフトクリーム 60ml', 'fb': 'ランコム アプソリュ クリーム', 'id': 'gf-40s-lancome-absolue'},
            {'kw': 'ゲラン アベイユ ロイヤル アドバンスト ウォータリー オイル', 'fb': 'ゲラン ウォータリーオイル', 'id': 'gf-40s-guerlain-oil'}
        ]
    },
    # 7. 3,000円以下のプレゼントコスメ10選
    'feature-gift-under-3000-cosmetics-10': {
        'title': '【3,000円以下】プレゼントコスメおすすめ10選！お返し・プチギフトに最適な高見え名品徹底比較',
        'category': 'gift',
        'categoryLabel': '💰 【3,000円以下ギフト】3,000円以下プレゼントコスメ10選',
        'target_recipient': 'プチギフト・誕生日お返し・ホワイトデー・ちょっとしたお礼',
        'gift_appeal': '3,000円以下の手頃な予算で、有名ブランドの高級感とおしゃれさを両立したスマートギフト',
        'items': [
            {'kw': 'ジルスチュアート ハンドクリーム ホワイトフローラル 30g', 'fb': 'ジルスチュアート ハンドクリーム', 'id': 'gf-u3k-jill-hand'},
            {'kw': 'ジルスチュアート リップバーム ホワイトフローラル', 'fb': 'ジルスチュアート リップバーム', 'id': 'gf-u3k-jill-lip'},
            {'kw': 'SHIRO サボン クレイハンドソープ', 'fb': 'SHIRO ハンドソープ', 'id': 'gf-u3k-shiro-soap'},
            {'kw': 'ロクシタン ハンドクリーム 30ml ギフトボックス', 'fb': 'ロクシタン ハンドクリーム ギフト', 'id': 'gf-u3k-loccitane'},
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'gf-u3k-fwee-pudding'},
            {'kw': 'サボン (SABON) ハンドクリーム 30ml', 'fb': 'SABON ハンドクリーム 30ml', 'id': 'gf-u3k-sabon-hand'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ミニ', 'fb': 'ラロッシュポゼ トーンアップ', 'id': 'gf-u3k-larocheposay'},
            {'kw': 'ポール＆ジョー ハンドクリーム I', 'fb': 'ポールアンドジョー ハンドクリーム', 'id': 'gf-u3k-pauljoe-hand'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'gf-u3k-kate-lip'},
            {'kw': 'ロムアンド ジューシーラスティングティント 25', 'fb': 'ロムアンド 25', 'id': 'gf-u3k-romand-tint'}
        ]
    },
    # 8. 5,000円以下のプレゼントコスメ10選
    'feature-gift-under-5000-cosmetics-10': {
        'title': '【5,000円以下】プレゼントコスメおすすめ10選！人気デパコスの本命ライン＆王道ギフト徹底比較',
        'category': 'gift',
        'categoryLabel': '👑 【5,000円以下ギフト】5,000円以下プレゼントコスメ10選',
        'target_recipient': '友人への誕生日プレゼント・お祝い・お礼ギフト',
        'gift_appeal': '5,000円前後の予算で手に入る、憧れデパコスのリップやフェイスパウダーなど王道の大人気アイテム',
        'items': [
            {'kw': 'ディオール アディクト リップ マキシマイザー 001', 'fb': 'ディオール マキシマイザー', 'id': 'gf-u5k-dior-max'},
            {'kw': 'シャネル ルージュ ココ ボーム 912', 'fb': 'シャネル リップクリーム', 'id': 'gf-u5k-chanel-baume'},
            {'kw': 'コスメデコルテ ルース パウダー 00', 'fb': 'コスメデコルテ パウダー', 'id': 'gf-u5k-decorte-pow'},
            {'kw': 'SHIRO サボン オードパルファン 40ml', 'fb': 'SHIRO サボン 香水', 'id': 'gf-u5k-shiro-parfum'},
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー 下地', 'id': 'gf-u5k-pauljoe-base'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'gf-u5k-ysl-candy'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09', 'fb': 'セルヴォーク 09', 'id': 'gf-u5k-celvoke-09'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'gf-u5k-jill-blush'},
            {'kw': 'M・A・C ラスターガラス リップスティック', 'fb': 'MAC ラスターガラス', 'id': 'gf-u5k-mac-luster'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース', 'fb': 'エトヴォス 下地', 'id': 'gf-u5k-etvos-base'}
        ]
    },
    # 9. 誕生日プレゼントにおすすめのコスメ10選
    'feature-gift-birthday-special-cosmetics-10': {
        'title': '【誕生日プレゼント】おすすめコスメ10選！特別な日に贈る感動デパコス＆記念ギフト徹底比較',
        'category': 'gift',
        'categoryLabel': '🎂 【誕生日ギフト】誕生日プレゼントおすすめコスメ10選',
        'target_recipient': '誕生日を迎える女性・友人・彼女・家族',
        'gift_appeal': '年に一度の特別な誕生日を華やかに彩り、特別感とサプライズを届ける殿堂入りデパコス',
        'items': [
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール マキシマイザー 020', 'id': 'gf-bday-dior-max'},
            {'kw': 'シャネル ルージュ ココ フラッシュ 90', 'fb': 'シャネル ココフラッシュ 90', 'id': 'gf-bday-chanel-flash'},
            {'kw': 'Jo Malone ロンドン イングリッシュペアー＆フリージア コロン 30ml', 'fb': 'ジョーマローン 香水 30ml', 'id': 'gf-bday-jomalone'},
            {'kw': 'SUQQU シグニチャー カラー アイズ 02 陽香色', 'fb': 'SUQQU 陽香色', 'id': 'gf-bday-suqqu-shadow'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'gf-bday-ysl-candy'},
            {'kw': 'コスメデコルテ ルース パウダー', 'fb': 'コスメデコルテ パウダー', 'id': 'gf-bday-decorte-powder'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'gf-bday-jill-blush'},
            {'kw': 'エルメス ルージュ エルメス リップケアバーム', 'fb': 'エルメス リップバーム', 'id': 'gf-bday-hermes-lip'},
            {'kw': 'クレ・ド・ポー ボーテ ル・レオスールデクラ', 'fb': 'クレドポー ハイライト', 'id': 'gf-bday-cledepeau-high'},
            {'kw': 'ルナソル アイカラーレーション 15', 'fb': 'ルナソル 15', 'id': 'gf-bday-lunasol-15'}
        ]
    },
    # 10. クリスマスプレゼントにおすすめのコスメ10選
    'feature-gift-christmas-holiday-cosmetics-10': {
        'title': '【クリスマス・ホリデー】プレゼントコスメおすすめ10選！冬の特別感を演出する限定＆最高峰ギフト徹底比較',
        'category': 'gift',
        'categoryLabel': '🎄 【クリスマス・ホリデー】クリスマスプレゼントコスメ10選',
        'target_recipient': 'クリスマスギフト・冬のボーナスご褒美・大切な人への贈り物',
        'gift_appeal': '冬の街のイルミネーションに負けない華やかな輝きと、ロマンチックな特別感を演出するホリデーコスメ',
        'items': [
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75 フィデリテ', 'id': 'gf-xmas-chanel-laque'},
            {'kw': 'ディオール アディクト リップ マキシマイザー 020 マホガニー', 'fb': 'ディオール マキシマイザー 020', 'id': 'gf-xmas-dior-max'},
            {'kw': 'SUQQU シグニチャー カラー アイズ', 'fb': 'SUQQU アイシャドウ', 'id': 'gf-xmas-suqqu-shadow'},
            {'kw': 'トムフォード アイ カラー クォード', 'fb': 'トムフォード アイシャドウ', 'id': 'gf-xmas-tomford-quad'},
            {'kw': 'コスメデコルテ AQ ミリオリティ フェイスパウダー n', 'fb': 'コスメデコルテ AQ パウダー', 'id': 'gf-xmas-decorte-aq'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'gf-xmas-ysl-candy'},
            {'kw': 'Jo Malone ロンドン ピオニー＆ブラッシュ スエード コロン', 'fb': 'ジョーマローン 香水', 'id': 'gf-xmas-jomalone'},
            {'kw': 'クレ・ド・ポー ボーテ ル・レオスールデクラ', 'fb': 'レオスールデクラ', 'id': 'gf-xmas-cledepeau-high'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'gf-xmas-jill-blush'},
            {'kw': 'エルメス ルージュ エルメス ボーム ドゥ ソワン', 'fb': 'エルメス リップバーム', 'id': 'gf-xmas-hermes-baume'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_gift_items = {}

for theme_id, theme_meta in gift_cosme_definitions.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_gift_items:
            all_unique_gift_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique gift cosmetics to fetch: {len(all_unique_gift_items)}")

gift_database = {}
if os.path.exists('scratch/rakuten_api_gift_cosme_db.json'):
    with open('scratch/rakuten_api_gift_cosme_db.json') as f:
        gift_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_gift_items.items():
    if unique_id in gift_database:
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
                    
                    gift_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_gift_cosme_db.json', 'w', encoding='utf-8') as f:
                        json.dump(gift_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_gift_cosme_db.json', 'w', encoding='utf-8') as f:
    json.dump(gift_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total Gift Cosme DB items: {len(gift_database)} / {len(all_unique_gift_items)}")
