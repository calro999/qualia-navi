import fs from 'fs';

const newDeoTopics2 = [
  `  - id: topic-body-gatsby-premium-rollon
    category: bodycare
    keyword: "ギャツビー プレミアムタイプ デオドラント ロールオン"
    title_template: "【男の汗・皮脂・ニオイ菌を殺菌】{product_name} 高密着処方で夜まで脇のニオイを発生させない"
    target_audience: "強力な脇汗・男性特有のニオイ菌を徹底殺菌したい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-ag24-foot-spray
    category: bodycare
    keyword: "エージーデオ24 フットスプレー"
    title_template: "【足の嫌なニオイ・雑菌を即殺菌】{product_name} 白くならない足専用デオスプレー"
    target_audience: "革靴やスニーカーの中の足汗・蒸れ・嫌なニオイをケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-oral-ora2-spray
    category: oralcare
    keyword: "オーラツー ブレスファイン マウススプレー"
    title_template: "【一吹きで息リフレッシュ】{product_name} 外出先やニンニク料理後の口臭を瞬時にクリア"
    target_audience: "仕事中や食後に一瞬で口臭ケアをしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-oral-denthealth-sp
    category: oralcare
    keyword: "デントヘルス 薬用ハミガキ SP"
    title_template: "【歯槽膿漏・ネバつき・口臭予防】{product_name} 薬用成分配合で朝の息を爽やかに"
    target_audience: "歯ぐきの悩みや気になる大人の口臭を根本ケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-lucido-middle-wash
    category: bodycare
    keyword: "ルシード 薬用デオドラントボディウォッシュ"
    title_template: "【40代からのミドル脂臭を洗浄】{product_name} ねっとりした汗・脂のニオイを洗う薬用ボディソープ"
    target_audience: "年齢とともに変化する後頭部や胸元の体臭・ミドル脂臭をケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-nivea-deo-stick
    category: bodycare
    keyword: "ニベア デオドラント アプローチ スティック"
    title_template: "【自然由来の殺菌成分で防臭】{product_name} ワキの汗とニオイを長時間遮断する密着スティック"
    target_audience: "肌への優しさと確かなデオドラント効果を両立したい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-orbis-scalp
    category: haircare
    keyword: "オルビス スカルプリファイニング シャンプー"
    title_template: "【頭皮の汗・フケ・かゆみ・ニオイ防ぐ】{product_name} アミノ酸系洗浄成分で頭皮環境を爽快リセット"
    target_audience: "夏場に頭皮が汗ばむ・ニオイや毛穴のベタつきが気になる方"
    is_hall_of_fame: false`,

  `  - id: topic-oral-reach-propolis
    category: oralcare
    keyword: "リーチ プロポリス マウスウォッシュ"
    title_template: "【口内のネバつき・口臭を長時間ブロック】{product_name} マイルドな使用感で息スッキリ"
    target_audience: "刺激が少なく長時間口臭を予防できる洗口液を探している方"
    is_hall_of_fame: true`,

  `  - id: topic-body-rexona-dryshield
    category: bodycare
    keyword: "レセナ ドライシールド パウダースティック"
    title_template: "【汗の出口をブロックして汗ジミ防止】{product_name} 汗とニオイを発生源から抑えるパウダースティック"
    target_audience: "ワキ汗の量を抑え、同時にワキガ臭を防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-deoco-deo-stick
    category: bodycare
    keyword: "デオコ 薬用デオドラント スティック"
    title_template: "【年齢とともに減る甘い香りを補う】{product_name} 女性の大人臭・汗臭をスウィートフローラルで殺菌防臭"
    target_audience: "若い頃の甘い香り成分ラクトンを補いながら汗臭を防ぎたい女性"
    is_hall_of_fame: true`
];

function addDeoTopics2() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const updatedContent = content.trim() + '\n\n' + newDeoTopics2.join('\n\n') + '\n';

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('消臭・エチケット特化コスメ第2弾 10商品を articles.yml に追加しました。');
}

addDeoTopics2();
