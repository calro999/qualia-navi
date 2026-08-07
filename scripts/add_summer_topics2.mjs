import fs from 'fs';

const newSummerTopics2 = [
  `  - id: topic-suncare-shiseido-urbantriple
    category: suncare
    keyword: "SHISEIDO アーバン トリプル プロテクション"
    title_template: "【都会派強力UVプロテクト】{product_name} 紫外線・PM2.5・乾燥から肌をトリプルガード"
    target_audience: "屋外・街中での強い紫外線や空気中の汚れから肌を守りたい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-obagi-cpowder
    category: skincare
    keyword: "オバジC 酵素洗顔パウダー"
    title_template: "【夏の毛穴黒ずみ分解】{product_name} ビタミンC×酵素の力でザラつき知らずのつるり肌"
    target_audience: "夏場に目立つ毛穴の詰まり・黒ずみ・角栓をスッキリ洗い流したい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-pauljoe-settingpowder
    category: makeup
    keyword: "ポール＆ジョー セッティング パウダー"
    title_template: "【すっぴん風透明素肌】{product_name} 崩れを防ぎふんわりトップコート効果"
    target_audience: "ファンデのヨレを防ぎ、自然なツヤとサラサラ質感を両立したい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-bioderma-sensibio
    category: skincare
    keyword: "ビオデルマ サンシビオ H2O"
    title_template: "【夏の汗・ドロドロメイクオフ】{product_name} 敏感肌にも優しい帰宅後即クレンジング水"
    target_audience: "帰宅後すぐ汗やメイクを優しく落としたい・クレンジングの刺激が気になる方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-napla-ndot
    category: haircare
    keyword: "ナプラ N. ポリッシュオイル"
    title_template: "【湿気・汗に負けないウェット髪】{product_name} 天然由来成分100%で一日中まとまりキープ"
    target_audience: "夏場の湿気や汗で広がる髪をまとめ、ツヤ感を与えたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-hince-rawglow
    category: lip
    keyword: "hince ロウグロウジェルティント"
    title_template: "【夏のぷるつや粘膜リップ】{product_name} 清涼感あるツヤとベタつかない持続力"
    target_audience: "韓国トレンドの潤いツヤ感と落ちにくさを両立したい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-andbe-uvmilk
    category: suncare
    keyword: "&be UVミルク"
    title_template: "【河北メイク直伝トーンアップ】{product_name} ノンケミカル処方でヘルシーなツヤ肌へ"
    target_audience: "肌に優しく自然なトーンアップと日焼け止め効果を求める方"
    is_hall_of_fame: true`,

  `  - id: topic-body-loccitane-verbena
    category: bodycare
    keyword: "ロクシタン ヴァーベナ アイシー"
    title_template: "【ひんやり極上の冷感ボディケア】{product_name} 爽やかなレモンの香りで夏の汗ばむ肌を速攻冷却"
    target_audience: "お風呂上がりや外出先で涼しく快適にボディケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-drcilabo-vc100
    category: skincare
    keyword: "ドクターシーラボ VC100エッセンスローションEX"
    title_template: "【高浸透ビタミンC化粧水】{product_name} 夏の紫外線ダメージ・毛穴・くすみに濃密アプローチ"
    target_audience: "日焼け後のシミ予防や毛穴の引き締めを実感したい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-heroinemake-eyeliner
    category: makeup
    keyword: "ヒロインメイク スムースリキッドアイライナー スーパーキープ"
    title_template: "【真夏の滝汗でもにじまない】{product_name} 極細筆で夜までくっきり美ラインを維持"
    target_audience: "目元の汗・涙・皮脂でアイラインが滲む・消えるのを防ぎたい方"
    is_hall_of_fame: true`
];

function addSummerTopics2() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  if (settingsIdx === -1) {
    console.error('settings: が見つかりませんでした。');
    return;
  }

  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newSummerTopics2.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('夏の人気実力派コスメ第2弾 10商品を articles.yml に追加しました。');
}

addSummerTopics2();
