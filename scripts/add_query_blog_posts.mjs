import fs from 'fs';

const queryBasedBlogPosts = [
  {
    id: 'blog-scalp-care-summer',
    slug: 'scalp-care-summer',
    title: '夏の頭皮のニオイ・ベタつき・皮脂詰まりを解消！自宅でできる頭皮クレンジング＆スカルプケア特集',
    subtitle: '頭皮の汗臭さやベタつきにサヨナラ。ヘッドスクラブ・スカルプブラシ・ドライシャンプーで頭皮環境を爽快リセット。',
    targetGender: 'unisex',
    coverImage: '/images/products/sabon_headscrub.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-07',
    readTimeMinutes: 11,
    introText: '2026年最新の美容分析室検証に基づく！夏の汗・皮脂による頭皮の嫌なニオイや毛穴詰まりをリセットするヘッドスクラブ・クレンジング・スカルプブラシのおすすめと正しいケア手順を徹底解説。',
    recommendedItemCodes: ["art-topic-hair-sabon", "art-topic-hair-uka-kenzan", "art-topic-hair-yolu-nightrepair"],
    isHallOfFame: true,
    contentMarkdown: `## なぜ夏の頭皮は「ニオイ」「ベタつき」が起こりやすいのか？

頭皮の皮脂腺は、なんと**顔のTゾーンの約2倍**も存在します。猛暑で大量の汗と皮脂が分泌されると、皮脂が常在菌によって分解・酸化され、嫌な頭皮臭やベタつき、毛穴詰まりの原因になります。

### 夏の頭皮ストレスをリセットする3STEP
1. **シャンプー前の頭皮スクラブ**で毛穴の固まった皮脂を浮かせる
2. **シリコンスカルプブラシ**で頭皮のコリをほぐしながら毛穴の汚れを掻き出す
3. **日中のドライシャンプー**で出先でも汗とニオイを瞬間オフ

---

### おすすめスカルプケアアイテム
- **サボン ヘッドスクラブ**: 死海の塩が古い角質と毛穴汚れをすっきりオフ
- **uka スカルプブラシ ケンザン**: お風呂で頭皮のツボ押し＆毛穴クレンジング
- **YOLU カームナイトリペア**: 睡眠中の摩擦と乾燥ダメージから髪と頭皮を保護
`
  },
  {
    id: 'blog-shine-control-makeup',
    slug: 'shine-control-makeup',
    title: '夕方のドロドロテカリ・Tゾーンの崩れを防ぐ！皮脂吸着＆お直しコスメ特集',
    subtitle: '朝のサラサラ感が一日中続く。皮脂吸着パウダー・冷感お直しミスト・あぶらとり紙不要コスメ全解説。',
    targetGender: 'women',
    coverImage: '/images/products/innisfree_powder.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-07',
    readTimeMinutes: 10,
    introText: '2026年夏のリアルな口コミと検証で選ばれた！朝の仕込みから夕方のメイク直しまで、皮脂テカリを瞬時に抑えてサラサラ素肌をキープするパウダー・ミスト・あぶらとりパウダーを徹底比較。',
    recommendedItemCodes: ["art-topic-makeup-innisfree", "art-topic-skincare-ipsa-aqua", "art-topic-skincare-elixir-tsuyadama", "art-topic-makeup-pauljoe-settingpowder"],
    isHallOfFame: true,
    contentMarkdown: `## 夕方になると顔がテカる・ファンデがヨレる悩みの原因

テカリの最大の原因は「皮脂過多」と「インナードライ（肌内部の水分不足）」。水分が不足すると、肌は水分を逃がさないように過剰な皮脂を分泌してしまいます。

### 崩れないサラツヤ肌を作るテクニック
- **朝の仕込み**: 軽やかな水分プレ化粧水でしっかり水分補給した後に皮脂吸着パウダーを軽く抑える
- **夕方のお直し**: あぶらとり紙でゴシゴシ拭かず、ティッシュで軽く押さえてから保湿ミスト＋パウダーを重ねる

---

### テカリ防止＆お直し厳選アイテム
- **イニスフリー ノーセバム ミネラルパウダー N**: 皮脂吸着力No.1！瞬間サラサラ肌へ
- **イプサ ザ タイムR アクア**: 水分バリアを整えインナードライテカリを防ぐ
- **エリクシール つや玉ミスト**: 美容オイル入りの超微細ミストでメイク直し時の保湿
- **ポール＆ジョー セッティング パウダー**: トップコート効果で仕上がりを長時間キープ
`
  },
  {
    id: 'blog-after-sun-care',
    slug: 'after-sun-care',
    title: '日焼けした後のヒリヒリ・赤み・乾燥を鎮静！シミを防ぐアフターサンケア特集',
    subtitle: 'うっかり日焼けも諦めない。冷却鎮静ミスト・濃密ビタミンC・ピテラマスクでダメージを最速リカバリー。',
    targetGender: 'unisex',
    coverImage: '/images/products/avene_water.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-07',
    readTimeMinutes: 10,
    introText: '2026年の猛暑・強烈な紫外線に負けない！うっかり日焼けしてしまった肌の火照りを冷まし、うるおい補給とビタミンCでシミ・肌荒れを防ぐアフターケア＆美容液特集。',
    recommendedItemCodes: ["art-topic-skincare-avene-water", "art-topic-skincare-melanocc-premium", "art-topic-skincare-sk2-mask", "art-topic-supplement-fancl-vitc"],
    isHallOfFame: true,
    contentMarkdown: `## うっかり日焼けした直後の「72時間」が勝負！

日光（紫外線）を大量に浴びた肌は、軽いやけどを負っている状態です。メラニンが過剰生成されてシミや肌荒れになる前に、適切なステップでケアすることが大切です。

### アフターサンケアの鉄則3ステップ
1. **冷やす・水分補給**: 温感や赤みがある時はアベンヌウォーター等でまず肌温度を下げる
2. **抗炎症・ビタミンC**: 火照りが鎮まったらメラノCC等の抗炎症＆ビタミンC美容液を注入
3. **インナーケア**: ビタミンCサプリメントで体の中からメラニン生成を抑える

---

### アフターケア厳選コスメ
- **アベンヌ ウォーター**: 100%温泉水で火照った肌をクールダウン＆鎮静
- **メラノCC 薬用しみ集中対策 プレミアム美容液**: ビタミンCと抗炎症成分でシミ・ニキビ跡ケア
- **SK-II フェイシャル トリートメント マスク**: 日焼け後のゴワつき肌をピテラで緊急集中補修
- **ファンケル ディープチャージ ビタミンC**: 内側から体内のビタミンC濃度を高める
`
  }
];

function addQueryBasedPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(queryBasedBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('検索クエリ起爆型ブログ記事3件を src/data.ts に追加しました。');
}

addQueryBasedPosts();
