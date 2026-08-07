import fs from 'fs';

const newSummerTopics = [
  `  - id: topic-suncare-kanebo-veilofday
    category: suncare
    keyword: "KANEBO ヴェイル オブ デイ"
    title_template: "【夕方まで乾かない美容液UV】{product_name} 猛暑でも継続する圧倒的水分補給と紫外線カット"
    target_audience: "日焼け止めで肌が乾燥・きしむのが嫌な保湿重視派"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-kose-clearpeel
    category: skincare
    keyword: "ONE BY KOSÉ クリアピール セラム"
    title_template: "【夏の毛穴・角栓づまりリセット】{product_name} 拭き取り美容液でツルツル透明美肌検証"
    target_audience: "夏の皮脂づまり・毛穴の黒ずみ・ザラつきを解消したい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-decorte-zenwear
    category: makeup
    keyword: "コスメデコルテ ZEN ウェア フルイド"
    title_template: "【24時間崩れない鉄壁リキッド】{product_name} 猛暑の汗・皮脂・擦れに耐え抜くスミ肌ファンデ"
    target_audience: "夏の汗・皮脂でファンデがドロドロに崩れるのを防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-elixir-tsuyadama
    category: skincare
    keyword: "エリクシール つや玉ミスト"
    title_template: "【日中の乾燥＆崩れブロック】{product_name} きめ細かいオイル入りミストでいつでもツヤ肌復活"
    target_audience: "エアコンの乾燥や日中のメイク崩れ・くすみが気になる方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-dior-foreverliquid
    category: lip
    keyword: "ルージュ ディオール フォーエヴァー リキッド"
    title_template: "【マスク・グラスにつかない】{product_name} 高発色＆高密着のマット高耐久リップ"
    target_audience: "夏の飲食やマスク着用でも色落ちしない高発色リップを求める方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-addiction-uvcontrol
    category: suncare
    keyword: "アディクション ザ UV プロテクター カラーコントロール"
    title_template: "【ノーファンデ夏の勝負UV】{product_name} 色ムラ補正＆高い紫外線カットで澄んだ肌へ"
    target_audience: "夏場にファンデを塗りたくない・自然なトーンアップとUVカットを求める方"
    is_hall_of_fame: true`,

  `  - id: topic-body-houseofrose-ohbaby
    category: bodycare
    keyword: "ハウス オブ ローゼ ボディ スムーザー N"
    title_template: "【温泉水ペーストでツルツル】{product_name} ひじ・ひざ・お尻のザラつきを本気ケア"
    target_audience: "露出が増える夏に向けて全身のザラつき・ゴワつきを滑らかにしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-uka-kenzan
    category: haircare
    keyword: "uka スカルプブラシ ケンザン"
    title_template: "【夏頭皮のニオイ＆コリ撃退】{product_name} お風呂でのサロン級シリコンブラシ体験"
    target_audience: "夏の頭皮の汗・ニオイ・ベタつき・頭皮のコリを改善したい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-celvoke-uv
    category: suncare
    keyword: "Celvoke UVプロテクトエッセンス"
    title_template: "【天然由来100%のみずみずしさ】{product_name} 紫外線吸収剤フリーで肌に優しい夏UV"
    target_audience: "敏感肌・オーガニック派で高いUV効果と優しい使用感を求める方"
    is_hall_of_fame: false`,

  `  - id: topic-makeup-excel-realclose
    category: makeup
    keyword: "エクセル リアルクローズシャドウ"
    title_template: "【夏の日差しに映えるツヤ感】{product_name} 捨て色なしの絶妙グラデーションパレット"
    target_audience: "プチプラで上品な夏目元グラデーションを作りたい方"
    is_hall_of_fame: true`
];

function addSummerTopics() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  if (settingsIdx === -1) {
    console.error('settings: が見つかりませんでした。');
    return;
  }

  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newSummerTopics.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('夏の人気実力派コスメ10商品を articles.yml に追加しました。');
}

addSummerTopics();
