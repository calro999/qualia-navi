import fs from 'fs';

const lateSummerDryBlogPosts2 = [
  {
    id: 'blog-late-summer-lip-eye-care',
    slug: 'late-summer-lip-eye-care',
    title: '8-9月のエアコン乾燥でガサガサになる目元・唇を救う！ぷるぷる保湿集中ケア特集',
    subtitle: '「エアコンで砂漠化した唇が秒でぷるぷるになるとバズり中」全人類買うべき夜の集中ナイトパック＆バーム。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-laneige-lipsleeping.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '8-9月はエアコンの冷風と強烈な紫外線で、最も皮膚が薄い「唇」と「目元」から水分が脱水。「皮むけ」「縦ジワ」「かさつき」にお悩みの方へ、SNSでバズり中の高密着保湿ケアを楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-lip-laneige-lipsleeping",
      "art-topic-makeup-romand-meltbalm",
      "art-topic-lip-fwee-puddingpot",
      "kate-lip-monster-03"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-9月の「冷房脱水」で唇や目元がピンチ！

エアコンが効いた部屋に一日中いると、室内湿度は30%以下に低下！皮膚が薄く皮脂腺のないリップや目元は真っ先に乾燥して皮むけや小ジワの原因になります。

### ぷるぷる唇を取り戻すSNSバズりナイトケア
1. **夜寝る前のオーバーリップパック**: 厚めに塗り込んで一晩中うるおい密着
2. **日中の水光膜コーティング**: 乾きを感じたら即座に保湿バームで保護

---

### 楽天API厳選！8-9月神保湿リップ＆集中ケア
- **ラネージュ リップスリーピングマスク**: 「塗って寝るだけで翌朝の唇がぷるぷるの赤ん坊肌になる」と世界中でバズる伝説のナイトマスク
- **ロムアンド グラスティング メルトバーム**: 水光膜が唇を包み込み縦ジワを秒で消し去る密着バーム
- **fwee リップアンドチーク ブラーパンディングポット**: むにゅっと質感で乾燥を防ぎふんわり粘膜リップを維持
`
  },
  {
    id: 'blog-late-summer-body-dry-care',
    slug: 'late-summer-body-dry-care',
    title: '日焼け・エアコンで乾燥したボディを速攻保湿！8-9月に絶対使いたい高保湿ボディミルク＆オイル特集',
    subtitle: '「お風呂上がりに塗ると全身モッチリ肌になるとバズり中」デパコス級のしっとり感が一日中続く神ボディケア。',
    targetGender: 'unisex',
    coverImage: '/images/products/neutrogena_body.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '夏の紫外線ダメージを受けた素肌に冷房乾燥が追い討ちをかけ、脚や腕が粉を吹く8-9月。「お風呂上がりのカサつき」にお悩みの方へ、ベタつかず一日中吸い付くようなモチ肌になれる高保湿ボディケアを紹介！',
    recommendedItemCodes: [
      "neutrogena-intense-repair-body-emulsion",
      "nivea-skin-milk-stretch-mark",
      "art-topic-body-sabon-bodyscrub",
      "art-topic-body-loccitane-verbenamist"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-9月の身体は「粉吹き・ゴワつき」の危機！

「夏だからボディクリームは塗らなくていいや」は大間違い！紫外線を浴びた肌はバリア機能が低下しており、冷房にさらされると一気に水分が蒸発してカサカサ肌になってしまいます。

### ボディのうるおいを取り戻す2ステップ
- **週1回のオイルスクラブ**: 古い角質をやさしくオフしてツルツル肌へ
- **入浴直後の高保湿エマルジョン**: 水分が残った肌に即塗りして水分を閉じ込める

---

### 楽天API厳選！8-9月高保湿ボディケア
- **ニュートロジーナ インテンスリペア ボディエマルジョン**: 「超乾燥肌でも一塗りで一日中モチモチになる」と医療現場でも信頼される極上エマルジョン
- **ニベア スキンミルク**: 定番にして最強！うるおい持続成分配合で乾燥から肌を徹底ガード
- **SABON ボディスクラブ**: 死海の塩とボタニカルオイルで古い角質をオフし生まれたてのツルツル肌へ
`
  },
  {
    id: 'blog-late-summer-scalp-dry-care',
    slug: 'late-summer-scalp-dry-care',
    title: '夏の頭皮乾燥・かゆみ・ベタつきを同時にケア！8-9月に試したい頭皮保湿＆スカルプ美容液特集',
    subtitle: '「頭皮のカサつきとニオイが一瞬で消えるとTikTokで大バズり」美容室帰りのスッキリ感が自宅で手に入る。',
    targetGender: 'unisex',
    coverImage: '/images/products/sabon_headscrub.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '汗・皮脂と冷房風が交互に襲いかかる8-9月は、頭皮の乾燥による「フケ」「かゆみ」「ベタつき」が多発。美容室レベルの頭皮クレンジング＆保湿ケアで、健康な美髪が育つ土台を作りましょう！',
    recommendedItemCodes: [
      "sabon-head-scrub",
      "art-topic-hair-uka-kenzan",
      "art-topic-hair-tsubaki-dryshampoo",
      "art-topic-hair-diane-botanicaldry"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-9月の頭皮トラブルは「乾燥」が引き金！

頭皮が乾燥すると、肌は自衛のために過剰な皮脂を分泌します。「夕方に頭皮がベタつく・臭う」原因の多くは、実は頭皮の水分不足（インナードライ）です。

### 頭皮環境を復活させるスカルプケア
- **塩スクラブで毛穴詰まりをオフ**: 洗浄と同時にボタニカルオイルで頭皮を保湿
- **スカルプブラシで血行促進**: 硬くなった頭皮をほぐしてターンオーバーを正常化
- **出先の汗・ニオイはドライシャンプーで即リセット**: 頭皮環境を快適に保つ

---

### 楽天API厳選！頭皮レスキューアイテム
- **サボン ヘッドスクラブ**: 「頭皮の毛穴詰まりとニオイが消えて髪が根元から立ち上がる」とバズり中のスカルプスクラブ
- **uka スカルプブラシ ケンザン**: シリコン製の絶妙な圧で頭皮のコリをほぐし血行改善
- **TSUBAKI スプラッシュドライシャンプー**: 清涼感のある泡で出先の頭皮汗・ニオイを秒でリセット
`
  }
];

function addDryBlogPosts2() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(lateSummerDryBlogPosts2, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('8-9月夏枯れ・乾燥悩み解決ブログ記事第2弾3件を src/data.ts に追加しました。');
}

addDryBlogPosts2();
