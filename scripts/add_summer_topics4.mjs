import fs from 'fs';

const newSummerTopics4 = [
  `  - id: topic-skincare-sk2-mask
    category: skincare
    keyword: "SK-II フェイシャル トリートメント マスク"
    title_template: "【日焼け後の緊急レスキュー】{product_name} 集中ピテラ補給で感動の透明感と集中保湿"
    target_audience: "夏の紫外線ダメージ、乾燥、くすみを即効集中ケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-astalift-deepuv
    category: suncare
    keyword: "アスタリフト D-UVクリア ホワイトソリューション"
    title_template: "【Deep紫外線までカット】{product_name} 笑っても喋っても伸びるUV膜で絶対焼かない"
    target_audience: "表情の動きによる日焼け止めの亀裂・隙間日焼けを防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-givenchy-prismelibre
    category: makeup
    keyword: "ジバンシイ プリズム リーブル"
    title_template: "【4色の光が織りなす至高の透明感】{product_name} 猛暑でも崩れ知らずの極上オーラ肌"
    target_audience: "デパコス至高のパウダーでくすみを飛ばし崩れない美肌を作りたい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-fino-hairmask
    category: haircare
    keyword: "fino プレミアムタッチ 浸透美容液ヘアマスク"
    title_template: "【夏の日差し・海水ダメージ集中補修】{product_name} とろけるように馴染みツルツルの指通りへ"
    target_audience: "夏の紫外線、プール、海水で傷んだパサつき髪を補修したい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-biore-powdersheet
    category: bodycare
    keyword: "ビオレ さらさらパウダーシート"
    title_template: "【汗のベタつき・ニオイを一拭き】{product_name} 長時間さらさら肌が持続する夏の必需品"
    target_audience: "外出先で汗のベタつきをオフし、さらさら肌を維持したい方"
    is_hall_of_fame: true`,

  `  - id: topic-supplement-fancl-vitc
    category: supplement
    keyword: "ファンケル ディープチャージ ビタミンC"
    title_template: "【内側からの紫外線＆透明感ケア】{product_name} 高吸収ビタミンCで夏のエイジング対策"
    target_audience: "日焼け後のシミ予防、内側から透明感を高めたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-cezanne-waterytint
    category: lip
    keyword: "セザンヌ ウォータリーティントリップ"
    title_template: "【濡れたようなツヤが続く】{product_name} コップにつきにくいプチプラ最強濡れツヤティント"
    target_audience: "プチプラでみずみずしいツヤ感と落ちにくさを両立したい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-transino-uvpowder
    category: suncare
    keyword: "トランシーノ 薬用UVパウダーn"
    title_template: "【メイク直し×UVカット×美白】{product_name} 汗・水に強く透明感を重ねる薬用プレストパウダー"
    target_audience: "日中の塗り直し用日焼け止め＆テカリ防止パウダーを探している方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-diane-repair
    category: haircare
    keyword: "モイストダイアン パーフェクトビューティー エクストラダメージリペア"
    title_template: "【紫外線で傷んだ髪を密着補修】{product_name} アルガンオイル配合で毛先まで潤うツヤ髪"
    target_audience: "夏の紫外線乾燥で毛先が毛羽立つ・傷む髪をケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-fasio-waterproof
    category: makeup
    keyword: "ファシオ パーマネントカール マスカラ WP"
    title_template: "【海・プールでも絶対下がらない】{product_name} 強力ウォータープルーフで上向きカール持続"
    target_audience: "夏の汗・水・湿気でまつ毛が下がるのを絶対に防ぎたい方"
    is_hall_of_fame: true`
];

function addSummerTopics4() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  if (settingsIdx === -1) {
    console.error('settings: が見つかりませんでした。');
    return;
  }

  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newSummerTopics4.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('夏の人気実力派コスメ第4弾 10商品を articles.yml に追加しました。');
}

addSummerTopics4();
