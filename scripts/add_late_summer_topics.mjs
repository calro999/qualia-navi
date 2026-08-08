import fs from 'fs';

const lateSummerTopics = [
  // 1. 汗対策 (5件)
  `  - id: topic-body-gatsby-ice-plug
    category: bodycare
    keyword: "ギャツビー プレミアムタイプ デオドラント スティック"
    title_template: "【8-9月の戻り蒸れ＆ワキ汗遮断】{product_name} 密着ブロックで汗ジミ・汗臭を根本防臭"
    target_audience: "残暑の厳しい猛暑で服の汗ジミや脇のニオイをしっかり抑えたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-ag24-premium-sheet
    category: bodycare
    keyword: "エージーデオ24 プレミアム デオドラント シャワーシート"
    title_template: "【大人の汗臭・ストレス臭・ベタつき拭き取り】{product_name} プレミアム処方で速攻快適"
    target_audience: "8〜9月の汗ばむ季節に一拭きでニオイ菌とベタつきをリセットしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-loccitane-verbenamist
    category: bodycare
    keyword: "ロクシタン ヴァーベナ ボディミスト"
    title_template: "【残暑のほてりを瞬時にクールダウン】{product_name} ひんやり涼感＆柑橘の香りで爽快ケア"
    target_audience: "外出先での暑さ・汗ばむ身体を一瞬でひんやりリフレッシュしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-tsubaki-dryshampoo
    category: haircare
    keyword: "TSUBAKI お部屋でみずみずしく洗える スプラッシュドライシャンプー"
    title_template: "【夏終わりの頭皮の汗・ニオイを解消】{product_name} 水なしで根元からふんわりサラサラ髪"
    target_audience: "夕方になると頭皮が蒸れる・ペタンこ髪になるのを防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-8x4men-stick
    category: bodycare
    keyword: "8×4 MEN 激乾 デオドラントスティック"
    title_template: "【真夏の強いワキ汗・男のニオイを遮断】{product_name} 高密着制汗成分で一日中サラサラ"
    target_audience: "スポーツや営業活動での強烈な汗とニオイを抑えたい方"
    is_hall_of_fame: false`,

  // 2. コスメ (3件)
  `  - id: topic-skincare-kanebo-scrubwash
    category: skincare
    keyword: "KANEBO スクラビング マッド ウォッシュ"
    title_template: "【夏終わりのゴワつき・毛穴皮脂を吸着】{product_name} 重ためペーストが洗顔中に3変化"
    target_audience: "8-9月の肌のごわつき・ザラつき・古い角質をつるんと落としたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-excel-skintint
    category: makeup
    keyword: "エクセル スキンティント IC"
    title_template: "【夏終わりの乾燥を防ぐ美容液ファンデ】{product_name} 美容液81%配合で光を放つ素肌感"
    target_audience: "紫外線を浴びた肌をケアしながら素肌っぽい美肌を作りたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-cezanne-3djelly
    category: lip
    keyword: "セザンヌ 3Dジェリーリップ"
    title_template: "【夏秋の境目に映える立体ツヤ唇】{product_name} ぷっくりボリューミーな透明質感とぷるぷる感"
    target_audience: "プチプラで縦ジワを消し、立体的なぷるぷる唇をキープしたい方"
    is_hall_of_fame: true`,

  // 3. ネイルチップ (2件)
  `  - id: topic-nail-amber-nuance
    category: k-beauty
    keyword: "韓国風 べっこう 琥珀 シアー ニュアンスネイルチップ"
    title_template: "【8-9月トレンド手元】{product_name} 夏秋切り替え期に似合う透け感アンバーグラデ"
    target_audience: "初秋のファッションに合わせやすく上品でトレンド感のある手元を作りたい方"
    is_hall_of_fame: true`,

  `  - id: topic-nail-magnet-iceglass
    category: k-beauty
    keyword: "氷ガラス キャッツアイ マグネットネイルチップ"
    title_template: "【夏の終わりの光を捉える】{product_name} 角度で色が変わる極上のうるうる奥行きデザイン"
    target_audience: "サロン級のマグネット奥行き感と透明感ネイルを手軽に楽しみたい方"
    is_hall_of_fame: true`
];

function addLateSummerTopics() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const updatedContent = content.trim() + '\n\n' + lateSummerTopics.join('\n\n') + '\n';

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('8-9月に使いたい厳選トレンド10商品を articles.yml に追加しました。');
}

addLateSummerTopics();
