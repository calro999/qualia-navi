import fs from 'fs';

const newDeoTopics = [
  `  - id: topic-body-deoco-bodywash
    category: bodycare
    keyword: "デオコ 薬用ボディクレンズ"
    title_template: "【体臭・加齢臭・汗のニオイ除去】{product_name} 年齢とともに変化する大人肌のニオイを洗浄"
    target_audience: "体臭・加齢臭・汗の嫌なニオイを毎日のバスタイムで落としたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-agdeo24-spray
    category: bodycare
    keyword: "エージーデオ24 パウダースプレー"
    title_template: "【ニオイ菌を24時間殺菌】{product_name} 高密着パウダーで汗臭・ワキガ臭を鉄壁ガード"
    target_audience: "全身の汗臭・ワキガ臭をひと吹きで予防したい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-mens-gatsby-paper
    category: bodycare
    keyword: "ギャツビー バイオコア デオドラント ボディペーパー"
    title_template: "【強烈な汗臭・男の体臭を殺菌】{product_name} 拭き取り後もニオイ菌の繁殖を防ぐ極冷ペーパー"
    target_audience: "運動後や炎天下での強力な汗臭・体臭を速攻オフしたい男性・女性"
    is_hall_of_fame: true`,

  `  - id: topic-body-8x4-rollon
    category: bodycare
    keyword: "8×4 アロマスイッチ ロールオン"
    title_template: "【汗をかくたび香りが再発香】{product_name} 摩擦と汗に反応する高機能デオドラント"
    target_audience: "汗のニオイを抑えながら一日中良い香りをまといたい方"
    is_hall_of_fame: true`,

  `  - id: topic-oral-nonio-mouthwash
    category: oralcare
    keyword: "NONIO 薬用マウスウォッシュ"
    title_template: "【口臭原因菌を長時間殺菌】{product_name} 息をクリアにしてクリアな吐息を持続"
    target_audience: "会話中の口臭や夏の口内のネバつき・ニオイを防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-pelican-hipsoap
    category: bodycare
    keyword: "ペリカン石鹸 薬用柿渋デオドラント石鹸"
    title_template: "【天然柿渋エキスで体臭ブロック】{product_name} 汗臭・加齢臭・足のニオイをさっぱり殺菌洗顔"
    target_audience: "石鹸派で全身の汗臭・足のニオイをしっかり洗いたい方"
    is_hall_of_fame: false`,

  `  - id: topic-hair-diane-dryshampoo
    category: haircare
    keyword: "ダイアン パーフェクトビューティー ドライシャンプー"
    title_template: "【水なしで頭皮の汗・ニオイリセット】{product_name} ベタつく髪を瞬時に洗い立てのふんわり髪へ"
    target_audience: "外出先で頭皮の汗臭さや髪のベタつきをリフレッシュしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-oldspice-deodorant
    category: bodycare
    keyword: "オールドスパイス ピュアスポーツ"
    title_template: "【海外大ヒットの強力消臭力】{product_name} ワキガ・強烈な汗臭を一日中消臭キープ"
    target_audience: "日本のデオドラントでは物足りない・強力な消臭効果を求める方"
    is_hall_of_fame: true`,

  `  - id: topic-body-ban-sweatblock
    category: bodycare
    keyword: "Ban 汗ブロック プラチナロールオン"
    title_template: "【ワキ汗の出口にフタをする】{product_name} 汗ジミとワキガ臭を根本からブロック"
    target_audience: "服の汗ジミやワキガ臭を本気で防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-oral-propolinse-wash
    category: oralcare
    keyword: "プロポリンス マウスウォッシュ"
    title_template: "【お口の汚れが固まって見える】{product_name} プロポリスエキスで強力口臭予防"
    target_audience: "目に見える効果で口内のタンパク質汚れと口臭をしっかり除去したい方"
    is_hall_of_fame: true`
];

function addDeoTopics() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  if (settingsIdx === -1) {
    console.error('settings: が見つかりませんでした。');
    return;
  }

  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newDeoTopics.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('汗臭さ・消臭特化コスメ10商品を articles.yml に追加しました。');
}

addDeoTopics();
