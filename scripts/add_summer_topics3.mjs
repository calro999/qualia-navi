import fs from 'fs';

const newSummerTopics3 = [
  `  - id: topic-skincare-albion-floradrip
    category: skincare
    keyword: "アルビオン フローラドrip"
    title_template: "【夏枯れ肌の救世主】{product_name} 5種のハーブ発酵液が叶える万能濃密化粧液"
    target_audience: "夏の紫外線やエアコンでゴワつく・くすむ肌を復活させたい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-allie-toneup
    category: suncare
    keyword: "アリィー クロノビューティ トーンアップUV"
    title_template: "【擦れに強いフリクションプルーフ】{product_name} 汗・水に負けない血色感トーンアップUV"
    target_audience: "服やバッグへの色移りを防ぎ強力な日焼け止め効果を求める方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-decorte-loosepowder
    category: makeup
    keyword: "コスメデコルテ ルース パウダー"
    title_template: "【極上シルクの肌触り】{product_name} 光のフィルターで毛穴を消し去る伝説のパウダー"
    target_audience: "乾燥させずに毛穴・テカリを自然にカバーしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-milbon-elujuda-sun
    category: haircare
    keyword: "ミルボン エルジューダ サントリートメント"
    title_template: "【髪の日焼け止めUVオイル】{product_name} 紫外線ダメージを防ぎサロン帰りのサラサラ手触りへ"
    target_audience: "夏の紫外線による髪のパサつき・退色を防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-biore-hiyashisheet
    category: bodycare
    keyword: "ビオレ 冷シート"
    title_template: "【拭いた瞬間-3℃の衝撃】{product_name} 猛暑の汗・ベタつき・熱中症対策シート"
    target_audience: "外出先やスポーツ後に瞬間的に汗を拭き冷却したい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-sofinaip-carbonic
    category: skincare
    keyword: "SOFINA iP ベースケア セラム 土台美容液"
    title_template: "【毛穴より小さな炭酸泡】{product_name} 夏の夏バテ肌に血行促進＆うるおい浸透"
    target_audience: "ごわつき・くすみ・スキンケアの浸透の悪さに悩む方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-canmake-abloom
    category: makeup
    keyword: "キャンメイク マシュマロフィニッシュパウダー Abloom"
    title_template: "【5色の補正カラーで透明感】{product_name} 濁りのないふんわりフェースパウダー"
    target_audience: "プチプラでくすみ・色ムラを補正し透明感をアップしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-laneige-lipsleeping
    category: lip
    keyword: "ラネージュ リップスリーピングマスク"
    title_template: "【翌朝ぷるんぷるんの唇へ】{product_name} エアコン乾燥・紫外線ダメージを夜間集中ケア"
    target_audience: "夏の皮むけ・縦ジワ・唇の乾燥に悩む方"
    is_hall_of_fame: true`,

  `  - id: topic-body-deonature-foot
    category: bodycare
    keyword: "デオナチュレ 足指サラサラクリーム"
    title_template: "【足の蒸れ・ニオイを根本遮断】{product_name} 朝塗れば夜までサラサラ快適クリーム"
    target_audience: "サンダルや靴の中の足汗・嫌なニオイを確実に抑えたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-kate-lipmonster-base
    category: lip
    keyword: "KATE リップカラーコントロールベース"
    title_template: "【リップの持ちを限界突破】{product_name} くすみを補正し口紅の発色を高める鉄壁下地"
    target_audience: "手持ちのリップの色持ちや発色を劇的にアップさせたい方"
    is_hall_of_fame: true`
];

function addSummerTopics3() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  if (settingsIdx === -1) {
    console.error('settings: が見つかりませんでした。');
    return;
  }

  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newSummerTopics3.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('夏の人気実力派コスメ第3弾 10商品を articles.yml に追加しました。');
}

addSummerTopics3();
