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

# 年代別×悩み・コスメ多角展開 10テーマ（各10商品＝計100商品）
age_demographic_definitions = {
    # 1. 20代向けファンデーション10選
    'feature-age-20s-foundation-10': {
        'title': '【20代向け】ファンデーションおすすめ10選！毛穴レス＆崩れ知らずの素肌美を叶える神アイテム徹底比較',
        'category': 'foundation',
        'categoryLabel': '🌸 【20代ベースメイク】20代向けファンデーション10選',
        'generation': '20代',
        'demographic_appeal': '皮脂テカリ・毛穴の開き・マスク崩れを防ぎながら、透明感のあるツヤ肌とナチュラルな素肌感を両立するファンデーション',
        'items': [
            {'kw': 'TIRTIR マスクフィット レッド クッション', 'fb': 'TIRTIR 赤 クッション', 'id': 'ag-20s-fd-tirtir'},
            {'kw': 'CLIO キルカバー メッシュグロウ クッション', 'fb': 'CLIO メッシュグロウ', 'id': 'ag-20s-fd-clio'},
            {'kw': 'シュウウエムラ アンリミテッド ラスティング フルイド', 'fb': 'シュウウエムラ ファンデーション', 'id': 'ag-20s-fd-shuuemura'},
            {'kw': 'ディオールスキン フォーエヴァー フルイド マット', 'fb': 'ディオール フルイド マット', 'id': 'ag-20s-fd-dior'},
            {'kw': 'マキアージュ ドラマティックパウダリー EX', 'fb': 'マキアージュ パウダリー', 'id': 'ag-20s-fd-maquillage'},
            {'kw': 'KATE リアルカバーリキッド ライトグロウ', 'fb': 'KATE リアルカバーリキッド', 'id': 'ag-20s-fd-kate'},
            {'kw': 'メイベリン ルミマット リキッド ファンデーション', 'fb': 'メイベリン ルミマット', 'id': 'ag-20s-fd-maybelline'},
            {'kw': 'ラネージュ ネオクッション マット', 'fb': 'ラネージュ ネオクッション', 'id': 'ag-20s-fd-laneige'},
            {'kw': 'hince セカンドスキン ファンデーション', 'fb': 'hince ファンデーション', 'id': 'ag-20s-fd-hince'},
            {'kw': 'セザンヌ クッションファンデーション', 'fb': 'セザンヌ クッションファンデ', 'id': 'ag-20s-fd-cezanne'}
        ]
    },
    # 2. 30代向けファンデーション10選
    'feature-age-30s-foundation-10': {
        'title': '【30代向け】ファンデーションおすすめ10選！初期エイジング・乾燥・くすみを光で飛ばす名品徹底比較',
        'category': 'foundation',
        'categoryLabel': '🌿 【30代ベースメイク】30代向けファンデーション10選',
        'generation': '30代',
        'demographic_appeal': '30代特有の水分量低下によるインナードライ・小ジワ・夕方のくすみを贅沢な美容液成分と光拡散でカバーするファンデーション',
        'items': [
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 エッセンススキングロウ', 'id': 'ag-30s-fd-shiseido'},
            {'kw': 'コスメデコルテ ゼン ウェア フルイド', 'fb': 'コスメデコルテ ゼンウェア', 'id': 'ag-30s-fd-decorte'},
            {'kw': 'ランコム タンイドル ウルトラ ウェア リキッド N', 'fb': 'ランコム タンイドル N', 'id': 'ag-30s-fd-lancome'},
            {'kw': 'RMK リクイドファンデーション フローレスカバレッジ', 'fb': 'RMK フローレスカバレッジ', 'id': 'ag-30s-fd-rmk'},
            {'kw': 'カネボウ コンフォート スキン ウェア', 'fb': 'KANEBO コンフォートスキンウェア', 'id': 'ag-30s-fd-kanebo'},
            {'kw': 'ディオールスキン フォーエヴァー スキン グロウ', 'fb': 'ディオール スキングロウ', 'id': 'ag-30s-fd-dior-glow'},
            {'kw': 'マキアージュ ドラマティックエッセンスリキッド', 'fb': 'マキアージュ エッセンスリキッド', 'id': 'ag-30s-fd-maquillage-liq'},
            {'kw': 'エトヴォス ミネラルフレッシュスキンリキッド', 'fb': 'エトヴォス ファンデーション', 'id': 'ag-30s-fd-etvos'},
            {'kw': 'ローラメルシエ リアル フローレス ウェイトレス パーフェクティング ファンデーション', 'fb': 'ローラメルシエ ファンデーション', 'id': 'ag-30s-fd-lauramercier'},
            {'kw': 'dプログラム 薬用 スキンケアファンデーション リキッド', 'fb': 'dプログラム ファンデーション', 'id': 'ag-30s-fd-dprogram'}
        ]
    },
    # 3. 40代向けファンデーション10選（ユーザー指定）
    'feature-age-40s-foundation-10': {
        'title': '【40代向け】ファンデーションおすすめ10選！たるみ毛穴・深刻な乾燥・黄ぐすみをカバーする神コスメ徹底比較',
        'category': 'foundation',
        'categoryLabel': '👑 【40代ベースメイク】40代向けファンデーション10選',
        'generation': '40代',
        'demographic_appeal': '40代のたるみ毛穴・乾燥小ジワ・黄ぐすみを厚塗り感なく極上のツヤと高保湿美容成分で若々しく補正するファンデーション',
        'items': [
            {'kw': 'クレ・ド・ポー ボーテ タンフリュイドエクラ ナチュレル', 'fb': 'クレドポー タンフリュイドエクラ', 'id': 'ag-40s-fd-cledepeau'},
            {'kw': 'SUQQU ザ ファンデーション', 'fb': 'SUQQU ザ ファンデーション', 'id': 'ag-40s-fd-suqqu'},
            {'kw': 'SHISEIDO エッセンス スキングロウ ファンデーション', 'fb': '資生堂 エッセンススキングロウ', 'id': 'ag-40s-fd-shiseido'},
            {'kw': 'コスメデコルテ ゼン ウェア フルイド', 'fb': 'コスメデコルテ ゼンウェア', 'id': 'ag-40s-fd-decorte'},
            {'kw': 'エスティローダー ダブル ウェア ステイ イン プレイス メークアップ', 'fb': 'エスティローダー ダブルウェア', 'id': 'ag-40s-fd-esteelauder'},
            {'kw': 'ボビイブラウン インテンシブ スキン セラム ファンデーション', 'fb': 'ボビイブラウン セラムファンデーション', 'id': 'ag-40s-fd-bobbibrown'},
            {'kw': 'ディオールスキン フォーエヴァー スキン グロウ', 'fb': 'ディオール スキングロウ', 'id': 'ag-40s-fd-dior'},
            {'kw': 'マキアージュ ドラマティックエッセンスリキッド', 'fb': 'マキアージュ エッセンスリキッド', 'id': 'ag-40s-fd-maquillage'},
            {'kw': 'アンプリチュード ロングラスティング リキッドファンデーション', 'fb': 'リキッドファンデーション 美容液', 'id': 'ag-40s-fd-amplitude'},
            {'kw': 'カバーマーク フローレス フィット', 'fb': 'カバーマーク フローレスフィット', 'id': 'ag-40s-fd-covermark'}
        ]
    },
    # 4. 50代向けファンデーション10選
    'feature-age-50s-foundation-10': {
        'title': '【50代向け】ファンデーションおすすめ10選！シワに入り込まない・極上リフト艶肌を叶える最高峰徹底比較',
        'category': 'foundation',
        'categoryLabel': '💎 【50代ベースメイク】50代向けファンデーション10選',
        'generation': '50代',
        'demographic_appeal': '目元・口元の表情ジワに入り込まず、濃密な潤いヴェールでハリと気品ある艶を一日中維持するエイジングケアファンデーション',
        'items': [
            {'kw': 'クレ・ド・ポー ボーテ ル・フォンドゥタンn', 'fb': 'クレドポー ルフォンドゥタン', 'id': 'ag-50s-fd-cledepeau-fond'},
            {'kw': 'SUQQU ザ ファンデーション', 'fb': 'SUQQU ファンデーション', 'id': 'ag-50s-fd-suqqu'},
            {'kw': 'コスメデコルテ AQ ミリオリティ リペア トリートメント セラム ファンデーション', 'fb': 'コスメデコルテ AQ ファンデーション', 'id': 'ag-50s-fd-decorte-aq'},
            {'kw': 'カバーマーク フローレス フィット', 'fb': 'カバーマーク フローレスフィット', 'id': 'ag-50s-fd-covermark'},
            {'kw': 'SHISEIDO フューチャーソリューション LX トータル ラディアンス ファンデーション', 'fb': 'フューチャーソリューション LX ファンデーション', 'id': 'ag-50s-fd-shiseido-lx'},
            {'kw': 'エスト イルミネーティング パウダーファンデーション', 'fb': 'エスト ファンデーション', 'id': 'ag-50s-fd-est'},
            {'kw': 'ゲラン パリュール ゴールド スキン フルイド', 'fb': 'ゲラン パリュールゴールド', 'id': 'ag-50s-fd-guerlain'},
            {'kw': 'ディオール プレステージ ル フルイド タン ドゥ ローズ', 'fb': 'ディオール プレステージ ファンデーション', 'id': 'ag-50s-fd-dior-prestige'},
            {'kw': 'ボビイブラウン インテンシブ セラム ファンデーション', 'fb': 'ボビイブラウン ファンデーション', 'id': 'ag-50s-fd-bobbibrown'},
            {'kw': 'プリオール 美つやアップおしろい美白乳液 ファンデーション', 'fb': 'プリオール ファンデーション', 'id': 'ag-50s-fd-prior'}
        ]
    },
    # 5. 20代向けスキンケア10選
    'feature-age-20s-skincare-10': {
        'title': '【20代向け】スキンケアおすすめ10選！毛穴・ニキビ・水分油分バランスを整える美肌育成名品徹底比較',
        'category': 'skincare',
        'categoryLabel': '🌸 【20代スキンケア】20代向けスキンケア10選',
        'generation': '20代',
        'demographic_appeal': '皮脂トラブルや毛穴の黒ずみを防ぎ、みずみずしい透明感肌を土台から育てる20代向けスキンケア',
        'items': [
            {'kw': 'イプサ ザ・タイムR アクア', 'fb': 'IPSA タイムRアクア', 'id': 'ag-20s-sk-ipsa'},
            {'kw': 'VT COSMETICS リードルショット 100', 'fb': 'リードルショット 100', 'id': 'ag-20s-sk-vt-reedle'},
            {'kw': 'アヌア ドクダミ 77% スージングトナー', 'fb': 'Anua ドクダミトナー', 'id': 'ag-20s-sk-anua'},
            {'kw': 'メラノCC 薬用しみ集中対策 プレミアム美容液', 'fb': 'メラノCC プレミアム美容液', 'id': 'ag-20s-sk-melanocc'},
            {'kw': '魔女工場 ガラクナイアシン 2.0 エッセンス', 'fb': '魔女工場 ガラクナイアシン', 'id': 'ag-20s-sk-manyo'},
            {'kw': 'キュレル 潤浸保湿 化粧水 III とてもしっとり', 'fb': 'キュレル 化粧水 III', 'id': 'ag-20s-sk-curel'},
            {'kw': 'COSRX プロポリス シナジートナー', 'fb': 'COSRX プロポリステナー', 'id': 'ag-20s-sk-cosrx'},
            {'kw': 'ラロッシュポゼ エファクラ ピールケア セラム', 'fb': 'ラロッシュポゼ ピールケアセラム', 'id': 'ag-20s-sk-larocheposay'},
            {'kw': '無印良品 発酵導入美容液', 'fb': '無印良品 発酵導入美容液', 'id': 'ag-20s-sk-muji-ferment'},
            {'kw': 'イニスフリー グリーンティーシード ヒアルロン セラム', 'fb': 'イニスフリー セラム', 'id': 'ag-20s-sk-innisfree'}
        ]
    },
    # 6. 30代向けスキンケア10選
    'feature-age-30s-skincare-10': {
        'title': '【30代向け】スキンケアおすすめ10選！ファーストエイジング・くすみ・毛穴たるみを集中ケア徹底比較',
        'category': 'skincare',
        'categoryLabel': '🌿 【30代スキンケア】30代向けスキンケア10選',
        'generation': '30代',
        'demographic_appeal': 'ナイアシンアミド・ビタミンC・セラミドを高濃度補給し、30代のくすみ・小ジワ・たるみ毛穴を根本ケアするスキンケア',
        'items': [
            {'kw': 'コスメデコルテ リポソーム アドバンスト リペアセラム', 'fb': 'リポソーム アドバンスト リペアセラム', 'id': 'ag-30s-sk-decorte-lipo'},
            {'kw': 'タカミスキンピール', 'fb': 'タカミスキンピール 30ml', 'id': 'ag-30s-sk-takami'},
            {'kw': 'オバジ C25セラム ネオ', 'fb': 'オバジ C25セラム', 'id': 'ag-30s-sk-obagi25'},
            {'kw': 'エリクシール シュペリエル デザインタイム セラム', 'fb': 'エリクシール デザインタイムセラム', 'id': 'ag-30s-sk-elixir-design'},
            {'kw': 'カネボウ クリーム イン デイ', 'fb': 'KANEBO クリームインデイ', 'id': 'ag-30s-sk-kanebo-cream'},
            {'kw': 'SK-II フェイシャル トリートメント エッセンス', 'fb': 'SK-II 化粧水', 'id': 'ag-30s-sk-skii-fte'},
            {'kw': 'アスタリフト ジェリー アクアリスタ', 'fb': 'アスタリフト ジェリー', 'id': 'ag-30s-sk-astalift'},
            {'kw': 'ランコム ジェニフィック アドバンスト N', 'fb': 'ランコム ジェニフィック', 'id': 'ag-30s-sk-lancome-gen'},
            {'kw': 'オルビス ユードット フォーミングウォッシュ エッセンスローション', 'fb': 'オルビス ユードット ローション', 'id': 'ag-30s-sk-orbis-udot'},
            {'kw': 'エトヴォス アルティモイストローション', 'fb': 'エトヴォス アルティモイスト', 'id': 'ag-30s-sk-etvos-moist'}
        ]
    },
    # 7. 40代向けスキンケア10選
    'feature-age-40s-skincare-10': {
        'title': '【40代向け】スキンケアおすすめ10選！シワ改善・濃密ハリ・たるみ引き上げを叶える高機能名品徹底比較',
        'category': 'skincare',
        'categoryLabel': '👑 【40代スキンケア】40代向けスキンケア10選',
        'generation': '40代',
        'demographic_appeal': '純粋レチノール・ナイアシンアミド・浸透型リポソーム配合で、40代の深く刻まれるシワやハリ不足を全方位リペアするスキンケア',
        'items': [
            {'kw': 'エリクシール レチノパワー リンクルクリーム', 'fb': 'エリクシール リンクルクリーム', 'id': 'ag-40s-sk-elixir-retino'},
            {'kw': 'ポーラ リンクルショット メディカル セラム N', 'fb': 'リンクルショット メディカルセラム', 'id': 'ag-40s-sk-pola-wrinkle'},
            {'kw': 'コスメデコルテ リポソーム アドバンスト リペアクリーム', 'fb': 'リポソーム アドバンスト リペアクリーム', 'id': 'ag-40s-sk-decorte-cream'},
            {'kw': 'SHISEIDO アルティミューン パワライジング コンセントレート III', 'fb': '資生堂 アルティミューン', 'id': 'ag-40s-sk-shiseido-ulti'},
            {'kw': 'SK-II スキンパワー アドバンスト クリーム', 'fb': 'SK-II スキンパワー クリーム', 'id': 'ag-40s-sk-skii-skinpower'},
            {'kw': 'オバジ ダーマパワーX ステムリフト クリーム', 'fb': 'オバジ ステムリフトクリーム', 'id': 'ag-40s-sk-obagi-derma'},
            {'kw': 'ランコム アプソリュ プレシャスセル エマルジョン', 'fb': 'ランコム アプソリュ', 'id': 'ag-40s-sk-lancome-absolue'},
            {'kw': 'クレ・ド・ポー ボーテ ル・セラム', 'fb': 'クレドポー ルセラム', 'id': 'ag-40s-sk-cledepeau-serum'},
            {'kw': 'アスタリフト ザ セラム リンクルリペア', 'fb': 'アスタリフト リンクルリペア', 'id': 'ag-40s-sk-astalift-wrinkle'},
            {'kw': 'ドクターシーラボ アクアコラーゲンゲル エンリッチリフトEX', 'fb': 'アクアコラーゲンゲル エンリッチリフト', 'id': 'ag-40s-sk-drcilabo'}
        ]
    },
    # 8. 50代向けスキンケア10選
    'feature-age-50s-skincare-10': {
        'title': '【50代向け】スキンケアおすすめ10選！最高峰プレミアムエイジングケア＆濃密リッチ再生徹底比較',
        'category': 'skincare',
        'categoryLabel': '💎 【50代スキンケア】50代向けスキンケア10選',
        'generation': '50代',
        'demographic_appeal': '女性ホルモン低下に伴う深刻な乾燥・菲薄化・たるみに立ち向かう最高峰プレミアムプレステージスキンケア',
        'items': [
            {'kw': 'ポーラ B.A ローション N', 'fb': 'POLA BA ローション', 'id': 'ag-50s-sk-pola-ba-lot'},
            {'kw': 'ポーラ B.A クリーム N', 'fb': 'POLA BA クリーム', 'id': 'ag-50s-sk-pola-ba-crm'},
            {'kw': 'クレ・ド・ポー ボーテ ラ・クレーム', 'fb': 'クレドポー ラクレーム', 'id': 'ag-50s-sk-cledepeau-lacreme'},
            {'kw': 'コスメデコルテ AQ ミリオリティ インテンシブ トリートメント セット', 'fb': 'コスメデコルテ AQ ミリオリティ', 'id': 'ag-50s-sk-decorte-aq-sk'},
            {'kw': 'SK-II LXP アルティメイト パーフェクティング クリーム', 'fb': 'SK-II LXP クリーム', 'id': 'ag-50s-sk-skii-lxp'},
            {'kw': 'SHISEIDO フューチャーソリューション LX レジェンダリー EN クリーム', 'fb': 'フューチャーソリューション LX クリーム', 'id': 'ag-50s-sk-shiseido-lx-crm'},
            {'kw': 'ドゥ・ラ・メール クレーム ドゥ・ラ・メール', 'fb': 'ドゥラメール クリーム', 'id': 'ag-50s-sk-delamer'},
            {'kw': 'エスティローダー リニュートリィブ UL クリーム', 'fb': 'エスティローダー リニュートリィブ', 'id': 'ag-50s-sk-esteelauder-renutriv'},
            {'kw': 'カネボウ ザ クリーム', 'fb': 'KANEBO ザ クリーム', 'id': 'ag-50s-sk-kanebo-thecream'},
            {'kw': 'ディオール プレステージ ラ クレーム N', 'fb': 'ディオール プレステージ ラクレーム', 'id': 'ag-50s-sk-dior-prestige-crm'}
        ]
    },
    # 9. 40代向け化粧下地10選
    'feature-age-40s-primer-10': {
        'title': '【40代向け】化粧下地おすすめ10選！くすみ補正・小ジワ消し・極上ツヤ仕込み名品徹底比較',
        'category': 'primer',
        'categoryLabel': '👑 【40代化粧下地】40代向け化粧下地10選',
        'generation': '40代',
        'demographic_appeal': '夕方の黄ぐすみや乾燥小ジワを光反射で消し去り、ファンデの密着度と若見えリフトアップ効果を高める化粧下地',
        'items': [
            {'kw': 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', 'fb': 'クレドポー ヴォワールコレクチュール', 'id': 'ag-40s-pr-cledepeau'},
            {'kw': 'コスメデコルテ フローレススキン グロウライザー', 'fb': 'コスメデコルテ グロウライザー', 'id': 'ag-40s-pr-decorte-glow'},
            {'kw': 'ポール＆ジョー モイスチュアライジング プライマー', 'fb': 'ポールアンドジョー モイスチュア 下地', 'id': 'ag-40s-pr-pauljoe'},
            {'kw': 'カネボウ クリーム イン デイ', 'fb': 'KANEBO クリームインデイ', 'id': 'ag-40s-pr-kanebo-day'},
            {'kw': 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ', 'fb': 'ラロッシュポゼ ローズ', 'id': 'ag-40s-pr-larocheposay'},
            {'kw': 'エトヴォス ミネラルインナートリートメントベース', 'fb': 'エトヴォス 下地', 'id': 'ag-40s-pr-etvos'},
            {'kw': '&be (アンドビー) UVプライマー', 'fb': '&be UVプライマー', 'id': 'ag-40s-pr-andbe'},
            {'kw': 'シュウウエムラ アンリミテッド ブロックブースター', 'fb': 'シュウウエムラ ブロックブースター', 'id': 'ag-40s-pr-shuuemura'},
            {'kw': 'マキアージュ ドラマティックスキンセンサーベース NEO', 'fb': 'ドラマティックスキンセンサーベース', 'id': 'ag-40s-pr-maquillage'},
            {'kw': 'カバーマーク スキンブライト クリーム CC', 'fb': 'カバーマーク CCクリーム', 'id': 'ag-40s-pr-covermark'}
        ]
    },
    # 10. 40代向けアイシャドウ10選
    'feature-age-40s-eyeshadow-10': {
        'title': '【40代向け】アイシャドウおすすめ10選！くぼみ目・たるみまぶたを明るくリフトアップする名品徹底比較',
        'category': 'eyeshadow',
        'categoryLabel': '👑 【40代アイメイク】40代向けアイシャドウ10選',
        'generation': '40代',
        'demographic_appeal': '粉飛びせずしっとり密着し、くすみがちなまぶたに上品な艶と陰影を与えて若々しい目元を作るアイシャドウ',
        'items': [
            {'kw': 'SUQQU シグニチャー カラー アイズ 02 陽香色', 'fb': 'SUQQU シグニチャー 02', 'id': 'ag-40s-es-suqqu02'},
            {'kw': 'ルナソル アイカラーレーション 15 Flawless Clarity', 'fb': 'ルナソル アイカラーレーション 15', 'id': 'ag-40s-es-lunasol15'},
            {'kw': 'コスメデコルテ アイグロウジェム スキンシャドウ', 'fb': 'アイグロウジェム スキンシャドウ', 'id': 'ag-40s-es-decorte-gem'},
            {'kw': 'ディオールショウ サンク クルール 689 ミッツァ', 'fb': 'サンククルール 689', 'id': 'ag-40s-es-dior-cinq'},
            {'kw': 'トムフォード アイ カラー クォード 04A サスピション', 'fb': 'トムフォード アイカラークォード', 'id': 'ag-40s-es-tomford'},
            {'kw': 'シャネル レ キャトル オンブル 268', 'fb': 'レキャトルオンブル 268', 'id': 'ag-40s-es-chanel-ombre'},
            {'kw': 'エクセル スキニーリッチシャドウ SR03', 'fb': 'スキニーリッチシャドウ SR03', 'id': 'ag-40s-es-excel03'},
            {'kw': 'エトヴォス ミネラルクラッシィシャドウ', 'fb': 'エトヴォス アイシャドウ', 'id': 'ag-40s-es-etvos-shadow'},
            {'kw': 'マキアージュ ドラマティックスタイリングアイズS', 'fb': 'マキアージュ アイシャドウ', 'id': 'ag-40s-es-maquillage-es'},
            {'kw': 'キャンメイク シルキースフレアイズ 07', 'fb': 'シルキースフレアイズ 07', 'id': 'ag-40s-es-canmake-es'}
        ]
    }
}

os.makedirs('public/images/products', exist_ok=True)
all_unique_age_items = {}

for theme_id, theme_meta in age_demographic_definitions.items():
    for it in theme_meta['items']:
        uid = it['id']
        if uid not in all_unique_age_items:
            all_unique_age_items[uid] = {
                'kw': it['kw'],
                'fb': it['fb']
            }

print(f"Total unique age demographic products to fetch: {len(all_unique_age_items)}")

age_database = {}
if os.path.exists('scratch/rakuten_api_age_demographic_db.json'):
    with open('scratch/rakuten_api_age_demographic_db.json') as f:
        age_database = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0'}

for unique_id, item_info in all_unique_age_items.items():
    if unique_id in age_database:
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
                    
                    age_database[unique_id] = {
                        'query': search_query,
                        'itemName': item_name,
                        'itemPrice': item_price,
                        'shopName': shop_name,
                        'affiliateUrl': affiliate_url,
                        'imageUrl': f'/images/products/{unique_id}.jpg',
                        'rawImageUrl': img_url
                    }
                    print(f'[SUCCESS] {unique_id} -> {item_name[:30]} | {item_price}円 ({shop_name})')
                    
                    with open('scratch/rakuten_api_age_demographic_db.json', 'w', encoding='utf-8') as f:
                        json.dump(age_database, f, ensure_ascii=False, indent=2)
                        
                    found = True
                    break
        except Exception as e:
            print(f'[RETRY] {search_query} failed: {e}')
            time.sleep(2.0)
    
    if not found:
        print(f'[FAILED ALL] {unique_id}')

with open('scratch/rakuten_api_age_demographic_db.json', 'w', encoding='utf-8') as f:
    json.dump(age_database, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Total Age Demographic DB items: {len(age_database)} / {len(all_unique_age_items)}")
