import yaml

new_topics = [
    {"topic": "summer_uv_spray_napla", "prompt": "ナプラ ミーファ フレグランスUVスプレー テンダーリリィ (ヘア＆ボディ用日焼け止め・夏・UV)"},
    {"topic": "summer_acne_rohto", "prompt": "ロート製薬 メンソレータム アクネス 薬用クリア化粧水 (夏・ニキビ・ふきとり化粧水)"},
    {"topic": "summer_scalp_shampoo", "prompt": "ミルボン プラーミア クリアスパフォーム (夏・頭皮のニオイ・炭酸シャンプー)"},
    {"topic": "summer_deodorant_shiseido", "prompt": "資生堂 エージーデオ24 プレミアム デオドラントスプレーDX (夏・汗・ワキガ・消臭)"},
    {"topic": "summer_cooling_body_lotion", "prompt": "ハウスオブローゼ ミントリープ ボディ クール ローション (夏・清涼感・ボディローション)"},
    {"topic": "summer_uv_lip_canmake", "prompt": "キャンメイク ステイオンバームルージュ (夏・UVカット・リップクリーム)"},
    {"topic": "summer_base_makeup_primavista", "prompt": "プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止 (夏・滝汗・テカリ防止下地)"},
    {"topic": "summer_sunscreen_suqqu", "prompt": "SUQQU プロテクティング デイ クリーム (夏・デパコス・日焼け止め・ツヤ肌)"},
    {"topic": "summer_acne_body_wash", "prompt": "オルビス クリアボディ スムースローション (夏・背中ニキビ・ボディローション)"},
    {"topic": "summer_cooling_mist", "prompt": "SHIRO サボン ボディコロン (夏・爽やかな香り・清涼感)"},
    {"topic": "summer_pore_cleansing_suisai", "prompt": "スイサイ ビューティクリア パウダーウォッシュ (夏・毛穴・酵素洗顔)"},
    {"topic": "summer_uv_hair_oil", "prompt": "エルジューダ サントリートメント セラム (夏・髪のUV対策・ヘアオイル)"},
    {"topic": "summer_deodorant_cream", "prompt": "クリニーク アンティ パースパイラント デオドラント ロールオン (夏・ワキ汗・制汗剤)"},
    {"topic": "summer_cooling_sheet", "prompt": "ビオレ さらさらパウダーシート (夏・汗拭きシート・清涼感)"},
    {"topic": "summer_acne_serum", "prompt": "エトヴォス 薬用 アクネVCクリームジェル (夏・ニキビ跡・ビタミンC)"},
    {"topic": "summer_sunscreen_allie", "prompt": "アリィー クロノビューティ カラーチューニングUV (夏・ノーファンデUV・日焼け止め)"},
    {"topic": "summer_base_makeup_mac", "prompt": "M・A・C プレップ プライム 24 アワー エクステンド アイ ベース (夏・アイメイク崩れ防止)"},
    {"topic": "summer_cooling_spray", "prompt": "無印良品 涼感ボディスプレー (夏・クールダウン・清涼感)"},
    {"topic": "summer_pore_pack", "prompt": "イニスフリー スーパーヴォルカニック ポア クレイマスク (夏・毛穴の黒ずみ・クレイパック)"},
    {"topic": "summer_uv_cushion", "prompt": "ジョンセンムル エッセンシャル スキン ヌーダー クッション (夏・崩れにくい・韓国コスメ・クッションファンデ)"},
    {"topic": "summer_deodorant_soap", "prompt": "柿渋石鹸 (夏・体臭・加齢臭・ボディソープ)"},
    {"topic": "summer_cooling_shampoo", "prompt": "アリミノ ミント シャンプー (夏・清涼感・クールシャンプー)"},
    {"topic": "summer_acne_patch", "prompt": "VT COSMETICS CICA スポットパッチ (夏・ニキビ隠し・ニキビパッチ)"},
    {"topic": "summer_sunscreen_bior", "prompt": "ビオレUV アスリズム スキンプロテクトエッセンス (夏・レジャー・落ちにくい日焼け止め)"},
    {"topic": "summer_base_makeup_cezzane", "prompt": "セザンヌ 皮脂テカリ防止下地 (夏・プチプラ・崩れ防止下地)"},
    {"topic": "summer_cooling_gel", "prompt": "ナチュリエ ハトムギ保湿ジェル (夏・日焼け後・鎮静ジェル)"},
    {"topic": "summer_pore_serum", "prompt": "タカミスキンピール (夏・角質ケア・毛穴レス)"},
    {"topic": "summer_uv_powder", "prompt": "イハダ 薬用フェイスプロテクトパウダー (夏・肌荒れ防止・UVパウダー)"},
    {"topic": "summer_deodorant_wipes", "prompt": "ギャツビー アイスデオドラント ボディペーパー (夏・超クール・汗拭きシート)"},
    {"topic": "summer_cooling_bath", "prompt": "クナイプ バスソルト スーパーミントの香り (夏・クール入浴剤)"},
    {"topic": "summer_acne_lotion", "prompt": "ドクターシーラボ 薬用ローション スーパーセンシティブEX (夏・敏感肌・肌荒れ)"},
    {"topic": "summer_sunscreen_shiseido", "prompt": "資生堂 サンケア ザ パーフェクト プロテクター (夏・スポーツ用・日焼け止め)"},
    {"topic": "summer_base_makeup_laura", "prompt": "ローラ メルシエ トランスルーセント ルース セッティング パウダー (夏・テカリ防止・おしろい)"},
    {"topic": "summer_cooling_eye", "prompt": "サナ なめらか本舗 目元ふっくらクリーム (夏・目元の乾燥・クマ)"},
    {"topic": "summer_pore_lotion", "prompt": "ドクターケイ 薬用Cクリアホワイトローション (夏・毛穴・ビタミンC化粧水)"},
    {"topic": "summer_uv_base", "prompt": "クレ・ド・ポー ボーテ ヴォワールコレクチュールn (夏・デパコス下地・UVカット)"},
    {"topic": "summer_deodorant_stick", "prompt": "レセナ ドライシールド パウダースティック (夏・ワキ汗・スティック制汗剤)"},
    {"topic": "summer_cooling_mask", "prompt": "ルルルン プレシャス GREEN (夏・肌の鎮静・シートマスク)"},
    {"topic": "summer_acne_cleansing", "prompt": "キュレル 潤浸保湿 泡洗顔料 (夏・ニキビ肌・敏感肌洗顔)"},
    {"topic": "summer_sunscreen_curel", "prompt": "キュレル UVカット デイバリアUVローション (夏・紫外線吸収剤フリー・日焼け止め)"},
    {"topic": "summer_base_makeup_nars", "prompt": "NARS ソフトマット コンプリートコンシーラー (夏・崩れないコンシーラー・ニキビ跡)"},
    {"topic": "summer_cooling_body_wash", "prompt": "シーブリーズ ボディシャンプー クール＆デオドラント (夏・清涼感・ボディソープ)"},
    {"topic": "summer_pore_cream", "prompt": "キールズ クリーム UFC (夏・インナードライ・軽めクリーム)"},
    {"topic": "summer_uv_spray_kohgen", "prompt": "江原道 クレンジングウォーター (夏・日焼け止め落とし・ふきとりクレンジング)"},
    {"topic": "summer_deodorant_foot", "prompt": "フットメジ 足用角質クリアハーブ石けん (夏・足のニオイ・角質ケア)"},
    {"topic": "summer_cooling_lip", "prompt": "メンソレータム ウォーターリップ (夏・ミント・リップクリーム)"},
    {"topic": "summer_acne_spot", "prompt": "dプログラム アレルバリア エッセンス BB (夏・ニキビ隠し・UVBBクリーム)"},
    {"topic": "summer_sunscreen_kose", "prompt": "雪肌精 スキンケア UV エッセンス ジェル (夏・美白・日焼け止めジェル)"},
    {"topic": "summer_base_makeup_dior", "prompt": "ディオールスキン フォーエヴァー スキン コレクト コンシーラー (夏・高密着コンシーラー)"},
    {"topic": "summer_hair_uv", "prompt": "大島椿 ヘアウォーター (夏・髪のパサつき・UVダメージケア)"}
]

def append_to_yaml():
    with open('articles.yml', 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    
    # Append the 50 new items
    if 'articles' not in data:
        data['articles'] = []
    
    data['articles'].extend(new_topics)
    
    with open('articles.yml', 'w', encoding='utf-8') as f:
        yaml.dump(data, f, allow_unicode=True, sort_keys=False)
        
    print(f"Appended 50 new articles. Total articles now: {len(data['articles'])}")

if __name__ == "__main__":
    append_to_yaml()
