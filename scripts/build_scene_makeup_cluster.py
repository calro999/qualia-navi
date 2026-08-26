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

# シーン別×秋コスメ多角展開 11テーマ（各10商品＝計110商品）
scene_makeup_definitions = {
    # 1. 秋のオフィスメイク向けコスメ10選
    'feature-autumn-office-makeup-10': {
        'title': '【オフィス・通勤】秋のオフィスメイク向けコスメ10選！知性・清潔感・好印象を叶える上品名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '💼 【オフィス・仕事】秋のオフィスメイク10選',
        'scene_name': 'オフィス・通勤・ビジネスシーン',
        'scene_appeal': '派手すぎず清潔感と信頼感を演出しながら、冷房や乾燥に負けない美肌と血色感をキープするオフィスコスメ',
        'items': [
            {'kw': 'ルナソル スキンモデリングアイズ 01 Beige Beige', 'fb': 'ルナソル スキンモデリングアイズ', 'id': 'sc-off-lunasol-skin'},
            {'kw': 'コスメデコルテ ルージュ デコルテ 08', 'fb': 'コスメデコルテ ルージュデコルテ', 'id': 'sc-off-decorte-lip'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー 下地', 'id': 'sc-off-cledepeau'},
            {'kw': 'エクセル スキニーリッチシャドウ SR03', 'fb': 'エクセル スキニーリッチシャドウ', 'id': 'sc-off-excel-shadow'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fb': 'ネンマクフェイク PK850', 'id': 'sc-off-visee-lip'},
            {'kw': 'シュウウエムラ アンリミテッド ラスティング フルイド', 'fb': 'シュウウエムラ ファンデーション', 'id': 'sc-off-shuuemura-fd'},
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'マキアージュ スキンセンサーベース', 'id': 'sc-off-maquillage-base'},
            {'kw': 'セザンヌ 超細芯アイブロウ 03 ナチュラルブラウン', 'fb': 'セザンヌ 超細芯アイブロウ', 'id': 'sc-off-cezanne-brow'},
            {'kw': 'コスメデコルテ ルース パウダー 00', 'fb': 'コスメデコルテ パウダー', 'id': 'sc-off-decorte-powder'},
            {'kw': 'オペラ リップティント N 05 コーラルピンク', 'fb': 'オペラ 05 コーラルピンク', 'id': 'sc-off-opera-lip'}
        ]
    },
    # 2. 秋のデートメイク向けコスメ10選
    'feature-autumn-date-makeup-10': {
        'title': '【デート・モテメイク】秋のデートメイク向けコスメ10選！思わず見惚れる多幸感ツヤ＆粘膜リップ徹底比較',
        'category': 'makeup',
        'categoryLabel': '💖 【デート・愛され】秋のデートメイク10選',
        'scene_name': 'デート・記念日・特別な日',
        'scene_appeal': 'ふんわり上気したような血色感、ちゅるんとした潤いツヤ唇、接近戦でも崩れない透明感を仕込む愛されコスメ',
        'items': [
            {'kw': 'ディオール アディクト リップ マキシマイザー 020', 'fb': 'ディオール マキシマイザー 020', 'id': 'sc-date-dior-max'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'sc-date-jill-blush'},
            {'kw': 'SUQQU シグニチャー カラー アイズ 02 陽香色', 'fb': 'SUQQU 陽香色', 'id': 'sc-date-suqqu-shadow'},
            {'kw': 'ロムアンド ジューシーラスティングティント 25 ベアグレープ', 'fb': 'ジューシーラスティングティント 25', 'id': 'sc-date-romand-grape'},
            {'kw': 'イヴサンローラン ラブシャイン キャンディグレーズ', 'fb': 'YSL キャンディグレーズ', 'id': 'sc-date-ysl-candy'},
            {'kw': 'CLIO キルカバー メッシュグロウ クッション', 'fb': 'CLIO メッシュグロウ', 'id': 'sc-date-clio-cushion'},
            {'kw': 'セザンヌ パールグロウハイライト 01', 'fb': 'パールグロウハイライト 01', 'id': 'sc-date-cezanne-high'},
            {'kw': 'キャンメイク むちぷるティント 02', 'fb': 'むちぷるティント 02', 'id': 'sc-date-canmake-tint'},
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー 下地', 'id': 'sc-date-pauljoe-base'},
            {'kw': 'ディーアップ シルキーリキッドアイライナー シフォンブラウン', 'fb': 'ディーアップ アイライナー', 'id': 'sc-date-dup-liner'}
        ]
    },
    # 3. 秋の学生向けコスメ10選
    'feature-autumn-students-school-makeup-10': {
        'title': '【学生・スクールメイク】秋の学生向けおすすめコスメ10選！校則OK＆プチプラ高見え名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '🎓 【学生・プチプラ】秋の学生向けコスメ10選',
        'scene_name': '学校・通学・休日学生メイク',
        'scene_appeal': 'お小遣いやバイト代で買えるプチプラ価格で、バレずに盛れるすっぴん風美肌と血色感を叶えるコスメ',
        'items': [
            {'kw': 'キャンメイク マシュマロフィニッシュパウダー', 'fb': 'マシュマロフィニッシュパウダー', 'id': 'sc-stu-canmake-powder'},
            {'kw': 'セザンヌ リップカラーシールド 01 フィグブラウン', 'fb': 'リップカラーシールド 01', 'id': 'sc-stu-cezanne-lip'},
            {'kw': 'キャンメイク クリーミータッチライナー 02', 'fb': 'クリーミータッチライナー 02', 'id': 'sc-stu-canmake-liner'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地 ピンクベージュ', 'fb': 'セザンヌ 下地 ピンク', 'id': 'sc-stu-cezanne-primer'},
            {'kw': 'ロムアンド ジューシーラスティングティント 13', 'fb': 'ジューシーラスティングティント 13', 'id': 'sc-stu-romand-tint'},
            {'kw': 'マジョリカマジョルカ ラッシュエキスパンダー ロングロングロング', 'fb': 'マジョマジョ マスカラ', 'id': 'sc-stu-majolica-mascara'},
            {'kw': 'ちふれ 口紅 詰替用 748', 'fb': 'ちふれ 口紅 748', 'id': 'sc-stu-chifure-lip'},
            {'kw': 'セザンヌ 超細芯アイブロウ 03', 'fb': 'セザンヌ アイブロウ 03', 'id': 'sc-stu-cezanne-brow'},
            {'kw': 'キャンメイク プティパレットアイズ 03', 'fb': 'キャンメイク アイシャドウ', 'id': 'sc-stu-canmake-palette'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー ノーセバムパウダー', 'id': 'sc-stu-innisfree-powder'}
        ]
    },
    # 4. 秋のナチュラルメイク向けコスメ10選
    'feature-autumn-natural-bare-makeup-10': {
        'title': '【素肌美・ナチュラル】秋のナチュラルメイク向けコスメ10選！すっぴん風なのに劇的垢抜け名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '🌿 【ナチュラル・すっぴん風】秋のナチュラルメイク10選',
        'scene_name': '普段使い・休日リラックス・すっぴん風メイク',
        'scene_appeal': '「元から肌や唇が綺麗」に見せる薄膜テクスチャーと透け感カラーで、大人の抜け感を演出するコスメ',
        'items': [
            {'kw': 'カネボウ コンフォート スキン ウェア', 'fb': 'KANEBO コンフォートスキンウェア', 'id': 'sc-nat-kanebo-comfort'},
            {'kw': 'ディオール アディクト リップ グロウ 001', 'fb': 'ディオール リップグロウ 001', 'id': 'sc-nat-dior-lipglow'},
            {'kw': 'コスメデコルテ アイグロウジェム スキンシャドウ', 'fb': 'アイグロウジェム スキンシャドウ', 'id': 'sc-nat-decorte-gem'},
            {'kw': '&be (アンドビー) ファンシーラー', 'fb': '&be ファンシーラー', 'id': 'sc-nat-andbe-concealer'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ', 'fb': 'ラロッシュポゼ ローズ', 'id': 'sc-nat-larocheposay'},
            {'kw': 'ヴィセ ネンマクフェイク ルージュ PK850', 'fb': 'ネンマクフェイク PK850', 'id': 'sc-nat-visee-nenmaku'},
            {'kw': 'エトヴォス ミネラルクラッシィシャドウ', 'fb': 'エトヴォス アイシャドウ', 'id': 'sc-nat-etvos-shadow'},
            {'kw': 'オペラ リップティント N 02 ピンク', 'fb': 'オペラ 02 ピンク', 'id': 'sc-nat-opera-pink'},
            {'kw': 'キャンメイク クイックラッシュカーラー 透明タイプ', 'fb': 'クイックラッシュカーラー 透明', 'id': 'sc-nat-canmake-curler'},
            {'kw': 'セザンヌ ナチュラル チークN 18', 'fb': 'セザンヌ チーク 18', 'id': 'sc-nat-cezanne-blush'}
        ]
    },
    # 5. 秋の韓国風メイク向けコスメ10選
    'feature-autumn-korean-trendy-makeup-10': {
        'title': '【韓国トレンド】秋の韓国風メイク向けコスメ10選！白湯メイク・水光肌・ミュートカラー徹底比較',
        'category': 'makeup',
        'categoryLabel': '🇰🇷 【韓国トレンド】秋の韓国風メイク10選',
        'scene_name': 'トレンドメイク・韓国アイドル風・お出かけ',
        'scene_appeal': '白湯メイクやミュートトーンの陰影、うるうるの水光ツヤ肌を再現する大人気韓国コスメ',
        'items': [
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット RS01', 'fb': 'fwee プリンポット RS01', 'id': 'sc-kor-fwee-pudding'},
            {'kw': 'CLIO キルカバー メッシュグロウ クッション', 'fb': 'CLIO メッシュグロウ', 'id': 'sc-kor-clio-mesh'},
            {'kw': 'ロムアンド ジューシーラスティングティント 23 ヌカダミア', 'fb': 'ロムアンド 23 ヌカダミア', 'id': 'sc-kor-romand-23'},
            {'kw': 'hince ロウグロウジェルティント', 'fb': 'hince ティント', 'id': 'sc-kor-hince-rawglow'},
            {'kw': 'Laka ボンディンググロウリップスティック 201', 'fb': 'Laka 201', 'id': 'sc-kor-laka-201'},
            {'kw': 'CLIO プロ アイ パレット エアー 02', 'fb': 'クリオ プロアイパレット エアー', 'id': 'sc-kor-clio-palette'},
            {'kw': 'TIRTIR マスクフィット オーラ クッション', 'fb': 'TIRTIR シルバー クッション', 'id': 'sc-kor-tirtir-silver'},
            {'kw': 'ナンバーズイン 3番 ノーファンデ陶器肌トーンアップクリーム', 'fb': 'ナンバーズイン 3番 下地', 'id': 'sc-kor-numbuzin3'},
            {'kw': 'ペリペラ オールテイク ムード パレット', 'fb': 'ペリペラ アイシャドウ パレット', 'id': 'sc-kor-peripera-palette'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー パウダー', 'id': 'sc-kor-innisfree-powder'}
        ]
    },
    # 6. 秋の結婚式・お呼ばれメイク向けコスメ10選
    'feature-autumn-wedding-party-makeup-10': {
        'title': '【結婚式・お呼ばれ】秋の結婚式メイク向けコスメ10選！写真映え＆長時間崩れない華やか名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '💍 【結婚式・お呼ばれ】秋の結婚式メイク10選',
        'scene_name': '結婚式・披露宴・パーティー・フォーマル',
        'scene_appeal': '涙や汗でも崩れず、フラッシュ撮影でも白浮きしない極上美肌と華やかなオーラを放つフォーマルコスメ',
        'items': [
            {'kw': 'エスティローダー ダブル ウェア ステイ イン プレイス メークアップ', 'fb': 'エスティローダー ダブルウェア', 'id': 'sc-wed-esteelauder-fd'},
            {'kw': 'SUQQU シグニチャー カラー アイズ 02', 'fb': 'SUQQU 陽香色', 'id': 'sc-wed-suqqu-shadow'},
            {'kw': 'シャネル ルージュ アリュール ラック 75', 'fb': 'シャネル 75 フィデリテ', 'id': 'sc-wed-chanel-laque'},
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー', 'fb': 'ディオール コンシーラー', 'id': 'sc-wed-dior-concealer'},
            {'kw': 'コスメデコルテ AQ ミリオリティ フェイスパウダー n', 'fb': 'コスメデコルテ AQ パウダー', 'id': 'sc-wed-decorte-aq'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー ヴォワールコレクチュール', 'id': 'sc-wed-cledepeau-base'},
            {'kw': 'ジルスチュアート ブルーム ミックスブラッシュ コンパクト', 'fb': 'ジルスチュアート チーク', 'id': 'sc-wed-jill-blush'},
            {'kw': 'ルナソル アイカラーレーション 15', 'fb': 'ルナソル 15', 'id': 'sc-wed-lunasol-15'},
            {'kw': 'ヒロインメイク ロング＆カールマスカラ アドバンストフィルム', 'fb': 'ヒロインメイク マスカラ', 'id': 'sc-wed-heroinemake'},
            {'kw': 'コーセー メイク キープ ミスト EX COOL', 'fb': 'メイクキープミスト EX', 'id': 'sc-wed-kose-mist'}
        ]
    },
    # 7. 秋のイベント・野外フェス向けコスメ10選
    'feature-autumn-festival-event-makeup-10': {
        'title': '【イベント・フェス】秋の野外イベント向けコスメ10選！汗・皮脂・激しい動きでも鉄壁キープ徹底比較',
        'category': 'makeup',
        'categoryLabel': '🎪 【野外イベント・フェス】秋のイベント向けコスメ10選',
        'scene_name': '野外フェス・ライブ・秋祭り・アウトドア',
        'scene_appeal': '強烈な汗・摩擦・長時間の直射日光に耐え、メイク直し不要で一日中鮮やかさを保つウォータープルーフコスメ',
        'items': [
            {'kw': 'TIRTIR マスクフィット レッド クッション', 'fb': 'TIRTIR 赤 クッション', 'id': 'sc-fes-tirtir-red'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'sc-fes-kate-lip'},
            {'kw': 'プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止', 'fb': 'プリマヴィスタ 下地', 'id': 'sc-fes-primavista'},
            {'kw': 'コーセー メイク キープ ミスト EX', 'fb': 'コーセー メイクキープミスト', 'id': 'sc-fes-kose-mist'},
            {'kw': 'キャンメイク クイックラッシュカーラー ブラック', 'fb': 'クイックラッシュカーラー 黒', 'id': 'sc-fes-canmake-mascara'},
            {'kw': 'ファシオ パワフルステイ アイブロウ ペンシル', 'fb': 'ファシオ アイブロウ', 'id': 'sc-fes-fasio-brow'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー パウダー', 'id': 'sc-fes-innisfree-pow'},
            {'kw': 'メイベリン SPステイ マットインク', 'fb': 'メイベリン マットインク', 'id': 'sc-fes-maybelline-ink'},
            {'kw': 'アネッサ パーフェクトUV スキンケアミルク NA', 'fb': 'アネッサ 日焼け止め', 'id': 'sc-fes-anessa-uv'},
            {'kw': 'ディーアップ シルキーリキッドアイライナー WP', 'fb': 'ディーアップ アイライナー WP', 'id': 'sc-fes-dup-liner'}
        ]
    },
    # 8. 秋の旅行に持っていきたいコスメ10選
    'feature-autumn-travel-trip-makeup-10': {
        'title': '【旅行・おでかけ】秋の旅行に持っていきたいコスメ10選！マルチユース・軽量＆高機能パッキング徹底比較',
        'category': 'makeup',
        'categoryLabel': '✈️ 【旅行・パッキング】秋の旅行向けコスメ10選',
        'scene_name': '国内旅行・海外旅行・秋の温泉旅',
        'scene_appeal': '荷物を最小限に抑えるマルチコスメや、旅先の気候変化・移動中の乾燥から肌を守るスマート名品',
        'items': [
            {'kw': 'fwee リップアンドチーク ブラーリー プリンポット', 'fb': 'fwee プリンポット', 'id': 'sc-trv-fwee-pudding'},
            {'kw': 'マキアージュ ドラマティックパウダリー EX コンパクト', 'fb': 'マキアージュ パウダリー', 'id': 'sc-trv-maquillage-pdr'},
            {'kw': 'コスメデコルテ サンシェルター トーンアップCC', 'fb': 'サンシェルター トーンアップCC', 'id': 'sc-trv-decorte-cc'},
            {'kw': '&be (アンドビー) ファンシーラー', 'fb': '&be ファンシーラー', 'id': 'sc-trv-andbe-conceal'},
            {'kw': 'キャンメイク プティパレットアイズ', 'fb': 'キャンメイク パレット', 'id': 'sc-trv-canmake-palette'},
            {'kw': 'ディオール アディクト リップ グロウ 001', 'fb': 'ディオール リップグロウ', 'id': 'sc-trv-dior-lipglow'},
            {'kw': 'VT COSMETICS CICA デイリースージングマスク', 'fb': 'VT CICA シートマスク', 'id': 'sc-trv-vt-cica-mask'},
            {'kw': 'カネボウ クリーム イン デイ', 'fb': 'KANEBO クリームインデイ', 'id': 'sc-trv-kanebo-day'},
            {'kw': 'キュレル 潤浸保湿 ミニセット', 'fb': 'キュレル ミニセット', 'id': 'sc-trv-curel-set'},
            {'kw': 'KATE リップモンスター 03 陽炎', 'fb': 'リップモンスター 03', 'id': 'sc-trv-kate-lip'}
        ]
    },
    # 9. 秋のお泊まりメイク向けコスメ10選
    'feature-autumn-overnight-stay-makeup-10': {
        'title': '【お泊まり・すっぴん風】秋のお泊まりメイク向けコスメ10選！24時間落とさなくてOK＆素肌詐欺名品徹底比較',
        'category': 'makeup',
        'categoryLabel': '🌙 【お泊まり・ナイト】秋のお泊まりメイク10選',
        'scene_name': 'お泊まりデート・女子会・温泉旅行の夜',
        'scene_appeal': 'つけたまま眠れるスキンケア処方で、毛穴やくすみを自然にカバーし「お風呂上がりも可愛い」を作るナイトコスメ',
        'items': [
            {'kw': 'クラブ すっぴんパウダー ホワイトフローラルブーケの香り', 'fb': 'すっぴんパウダー', 'id': 'sc-ovn-suppin-powder'},
            {'kw': 'クラブ すっぴんクリーム マシュマロマット', 'fb': 'すっぴんクリーム', 'id': 'sc-ovn-suppin-cream'},
            {'kw': 'ディオール アディクト リップ グロウ 001', 'fb': 'ディオール リップグロウ 001', 'id': 'sc-ovn-dior-lipglow'},
            {'kw': 'スノービューティー ブライトニング スキンケアパウダーA', 'fb': 'スノービューティー パウダー', 'id': 'sc-ovn-snowbeauty'},
            {'kw': 'キャンメイク シークレットビューティーパウダー', 'fb': 'シークレットビューティーパウダー', 'id': 'sc-ovn-canmake-secret'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース', 'fb': 'エトヴォス 下地', 'id': 'sc-ovn-etvos-base'},
            {'kw': 'フローフシ LIP38℃ リップトリートメント', 'fb': 'UZU リップトリートメント', 'id': 'sc-ovn-uzu-lip'},
            {'kw': 'キュレル 潤浸保湿 色づくベースミルク', 'fb': 'キュレル ベースミルク', 'id': 'sc-ovn-curel-milk'},
            {'kw': 'フジコ 眉ティント SVR 01 ショコラブラウン', 'fb': 'フジコ 眉ティント', 'id': 'sc-ovn-fujiko-tint'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー ノーセバム', 'id': 'sc-ovn-innisfree-pow'}
        ]
    },
    # 10. 秋の崩れにくいメイク向けコスメ10選
    'feature-autumn-long-lasting-makeup-10': {
        'title': '【鉄壁キープ】秋の崩れにくいメイクコスメ10選！寒暖差・皮脂・乾燥くずれを完全ブロック徹底比較',
        'category': 'makeup',
        'categoryLabel': '🔒 【高耐久・崩れ知らず】秋の崩れにくいメイク10選',
        'scene_name': '一日中外出・長時間の仕事・寒暖差のある日',
        'scene_appeal': '秋の激しい寒暖差やマスクの蒸れでもビクともしない、密着力と皮脂・水分コントロールを極めた高耐久コスメ',
        'items': [
            {'kw': 'エスティローダー ダブル ウェア ステイ イン プレイス メークアップ', 'fb': 'エスティローダー ダブルウェア', 'id': 'sc-stay-esteelauder-fd'},
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'ドラマティックスキンセンサーベース NEO', 'id': 'sc-stay-maquillage-base'},
            {'kw': 'KATE リップモンスター 05 ダークフィグ', 'fb': 'リップモンスター 05', 'id': 'sc-stay-kate-lip'},
            {'kw': 'コーセー メイク キープ ミスト EX', 'fb': 'コーセー メイクキープミスト EX', 'id': 'sc-stay-kose-mist'},
            {'kw': 'ランコム タンイドル ウルトラ ウェア リキッド N', 'fb': 'ランコム タンイドル N', 'id': 'sc-stay-lancome-fd'},
            {'kw': 'コスメデコルテ ゼン ウェア フルイド', 'fb': 'コスメデコルテ ゼンウェア', 'id': 'sc-stay-decorte-zen'},
            {'kw': 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー', 'fb': 'ディオール コンシーラー', 'id': 'sc-stay-dior-concealer'},
            {'kw': 'イニスフリー ノーセバム ミネラルパウダー N', 'fb': 'イニスフリー パウダー', 'id': 'sc-stay-innisfree-pow'},
            {'kw': 'キャンメイク クイックラッシュカーラー', 'fb': 'クイックラッシュカーラー', 'id': 'sc-stay-canmake-mascara'},
            {'kw': 'セザンヌ 皮脂テカリ防止下地 保湿タイプ', 'fb': 'セザンヌ 下地 保湿', 'id': 'sc-stay-cezanne-primer'}
        ]
    },
    # 11. 秋の大人っぽいメイク10選
    'feature-autumn-mature-chic-makeup-10': {
        'title': '【洗練シック】秋の大人っぽいメイク向けコスメ10選！深みテラコッタ＆上質陰影で品格美徹底比較',
        'category': 'makeup',
        'categoryLabel': '👑 【大人シック・洗練】秋の大人っぽいメイク10選',
        'scene_name': '大人のディナー・観劇・特別な夜のお出かけ',
        'scene_appeal': 'こっくりとした秋の深みカラーと繊細な光沢で、洗練された大人の気品と色気を宿すラグジュアリーコスメ',
        'items': [
            {'kw': 'SUQQU シグニチャー カラー アイズ 02 陽香色', 'fb': 'SUQQU 陽香色', 'id': 'sc-mat-suqqu-shadow'},
            {'kw': 'セルヴォーク ディグニファイド リップス 09 テラコッタ', 'fb': 'セルヴォーク 09 テラコッタ', 'id': 'sc-mat-celvoke-lip'},
            {'kw': 'シャネル ルージュ アリュール ラック 75 フィデリテ', 'fb': 'シャネル 75 フィデリテ', 'id': 'sc-mat-chanel-lip'},
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー ヴォワールコレクチュール', 'id': 'sc-mat-cledepeau-base'},
            {'kw': 'コスメデコルテ AQ ミリオリティ フェイスパウダー n', 'fb': 'コスメデコルテ AQ パウダー', 'id': 'sc-mat-decorte-aq'},
            {'kw': 'トムフォード アイ カラー クォード 04A サスピション', 'fb': 'トムフォード アイカラークォード', 'id': 'sc-mat-tomford-quad'},
            {'kw': 'ディオールスキン フォーエヴァー スキン グロウ', 'fb': 'ディオール スキングロウ', 'id': 'sc-mat-dior-glow'},
            {'kw': 'ローラメルシエ ブラッシュ カラー インフュージョン チャイ', 'fb': 'ローラメルシエ チーク チャイ', 'id': 'sc-mat-lauramercier-blush'},
            {'kw': 'MAC リップスティック パラマウント', 'fb': 'MAC パラマウント', 'id': 'sc-mat-mac-lip'},
            {'kw': 'Laka ボンディンググロウリップスティック 201', 'fb': 'Laka 201', 'id': 'sc-mat-laka-lip'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_scene_items = {}

for theme_id, theme_meta in scene_makeup_definitions.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_scene_items:
            all_unique_scene_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique scene makeup products to fetch: {len(all_unique_scene_items)}")

scene_database = {}
if os.path.exists('scratch/rakuten_api_scene_makeup_db.json'):
    with open('scratch/rakuten_api_scene_makeup_db.json') as f:
        scene_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_scene_items.items():
    if unique_id in scene_database:
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
                    
                    scene_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_scene_makeup_db.json', 'w', encoding='utf-8') as f:
                        json.dump(scene_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_scene_makeup_db.json', 'w', encoding='utf-8') as f:
    json.dump(scene_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total Scene Makeup DB items: {len(scene_database)} / {len(all_unique_scene_items)}")
