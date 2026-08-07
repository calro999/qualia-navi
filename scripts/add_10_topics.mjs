import fs from 'fs';

const newTopics = [
  `  - id: topic-skincare-albion-skincon
    category: skincare
    keyword: "アルビオン 薬用スキンコンディショナー エッセンシャル N"
    title_template: "【ロングセラーハトムギ化粧水】{product_name} 季節の変わり目の肌荒れ・ニキビを防ぐコンディショニング効果"
    target_audience: "肌荒れ・ニキビ・赤み・季節のトラブルに悩む方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-kerastase-oleo
    category: haircare
    keyword: "ケラスターゼ NU ソワン オレオ リラックス"
    title_template: "【くせ毛・パサつき解消】{product_name} 湿気でも広行かないまとまり美髪を検証"
    target_audience: "くせ毛、うねり、乾燥で広がる髪をまとめたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-nars-reflecting
    category: makeup
    keyword: "NARS ライトリフレクティング セッティングパウダー プレスト N"
    title_template: "【リフ粉の愛称で大バズり】{product_name} メイクの崩れ・テカリを無力化するサラサラ透明パウダー"
    target_audience: "マスク擦れや皮脂崩れを防ぎ透明感をキープしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-dior-lipmaximizer
    category: lip
    keyword: "ディオール アディクト リップ マキシマイザー"
    title_template: "【ふっくらボリュームリップ】{product_name} ヒアルロン酸とうるおいが叶えるぷるんとプランプ効果"
    target_audience: "唇の縦ジワ・乾燥をケアしボリュームを出したい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-obagi-c25
    category: skincare
    keyword: "オバジC25セラム ネオ"
    title_template: "【高濃度ビタミンCの最高峰】{product_name} 毛穴・くすみ・ハリ悩みにアプローチする即効美容液"
    target_audience: "頑固な毛穴・エイジングサイン・くすみを集中ケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-sabon-bodyscrub
    category: bodycare
    keyword: "SABON ボディスクラブ パチュリ ラベンダー バニラ"
    title_template: "【すべすべシルク肌へ】{product_name} 死海の塩と植物オイルで全身贅沢角質ケア"
    target_audience: "ひじ・ひざ・かかとのザラつきをツルツルにしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-skinaqua-toneup
    category: suncare
    keyword: "スキンアクア トーンアップUVエッセンス"
    title_template: "【プチプラ透明感UV】{product_name} ラベンダーカラーで血色感と肌補正を両立"
    target_audience: "手軽にデイリー使いできるトーンアップ日焼け止めを探している方"
    is_hall_of_fame: false`,

  `  - id: topic-kbeauty-clio-killcover
    category: k-beauty
    keyword: "CLIO キルカバー ザ ファンウェア クッション"
    title_template: "【圧倒的密着＆カバー】{product_name} 韓国アイドル級の陶器肌キープを検証"
    target_audience: "毛穴・赤みをしっかり隠し崩れないクッションファンデを求める方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-yolu-nightrepair
    category: haircare
    keyword: "YOLU カームナイトリペア シャンプー"
    title_template: "【ナイトキャップ発想】{product_name} 睡眠中の摩擦ダメージから髪を守るナイトケア"
    target_audience: "朝の寝ぐせ・髪のパサつき・摩擦ダメージを予防したい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-takami-skinpeel
    category: skincare
    keyword: "タカミスキンピール 角質美容水"
    title_template: "【角質ケアの定番】{product_name} 毎日使える優しさで毛穴・キメを整える習慣"
    target_audience: "毛穴の目立ち・ざらつき・肌のゴワつきをリセットしたい方"
    is_hall_of_fame: true`
];

function addTopicsToYaml() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  // settings: の前に追加する
  const settingsIdx = content.indexOf('settings:');
  if (settingsIdx === -1) {
    console.error('settings: が見つかりませんでした。');
    return;
  }

  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newTopics.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('新規トピック10個を articles.yml に追加しました。');
}

addTopicsToYaml();
