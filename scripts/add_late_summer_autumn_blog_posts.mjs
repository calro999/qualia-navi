import fs from 'fs';

const lateSummerAutumnBlogPosts = [
  {
    id: 'blog-late-summer-sweat-powder-care',
    slug: 'late-summer-sweat-powder-care',
    title: '8-10月の猛暑・残暑でも崩れない！皮脂テカリ・汗ヨレを抑える神パウダー＆ベースメイク特集',
    subtitle: '「滝汗をかいても夜までサラサラ肌が持続するとSNS大バズり」全人類使うべき皮脂吸着パウダー＆キープミスト。',
    targetGender: 'unisex',
    coverImage: '/images/products/innisfree_powder.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-03',
    readTimeMinutes: 10,
    introText: '8-10月は猛暑の汗と皮脂が混ざり合い、ドロドロのメイク崩れが起きやすい過酷な季節。「朝塗ってもお昼にテカる」とお悩みの方へ、SNSで一日中サラサラが続くと話題の神パウダー＆ミストを楽天API連携で紹介！',
    recommendedItemCodes: [
      "innisfree-no-sebum-mineral-powder",
      "art-topic-makeup-cezanne-keepmist",
      "art-topic-makeup-nars-reflecting",
      "art-topic-makeup-canmake-abloom"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-10月のドロドロ皮脂崩れを防ぐ仕込みテクニック

残暑の猛暑や室内の湿気で、Tゾーンや小鼻は皮脂が過剰分泌。そのまま放っておくとファンデが毛穴に落ちてドロドロ崩れの原因に！

### 崩れないベースメイクの鉄則3ポイント
1. **皮脂吸着パウダーをパフで圧着**: 小鼻やTゾーンにしっかりと叩き込む
2. **仕上げにキープミストをハンドプレス**: メイク膜を密着させて汗・皮脂を跳ね返す
3. **無色のルースパウダーで毛穴補正**: 乾燥させずにサラサラ質感を持続

---

### 楽天API厳選！8-10月崩れ防止神コスメ
- **イニスフリー ノーセバム ミネラルパウダー N**: 「前髪や小鼻のサラサラ感が一日中続く」と世界中でバズり中の皮脂吸着パウダー
- **セザンヌ メイクフィックスミスト**: ワンコインでデパコス級のキープ力を発揮する神フィックスミスト
- **キャンメイク マシュマロフィニッシュパウダー Abloom**: 5色のカラーでトーンアップしながらサラふわ肌へ
`
  },
  {
    id: 'blog-late-summer-hip-body-care',
    slug: 'late-summer-hip-body-care',
    title: '8-10月の水着・夏の摩擦ダメージをケア！お尻・太ももの黒ずみ・ザラつき解消ボディケア特集',
    subtitle: '「お風呂上がりに洗うだけでツツツルお尻になるとTikTokで大バズり」黒ずみ・角栓を一網打尽にする神スクラブ石鹸。',
    targetGender: 'female',
    coverImage: '/images/products/pelican_oshiri.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-03',
    readTimeMinutes: 11,
    introText: '8-10月は水着やショートパンツの着用、汗によるムレや下着の摩擦でお尻や太ももがザラザラ・黒ずみがちに。「触り心地を良くしたい」とお悩みの方へ、SNSで桃肌になると大バズり中のボディケアを紹介！',
    recommendedItemCodes: [
      "pelican-koisuru-oshiri-soap",
      "art-topic-body-houseofrose-ohbaby",
      "art-topic-body-sabon-bodyscrub",
      "art-topic-body-biore-powdersheet"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-10月のお尻・太ももは夏の摩擦ダメージが溜まっている！

「お尻のザラつきや黒ずみが気になる…」その原因は、デスクワークによる圧迫や汗のムレ、下着の角質増殖です。専用のピーリング石鹸やスクラブで優しくケアするのが美肌への近道！

### 桃のようなツルツルお尻を作るケア
- **スクラブ石鹸で直接クルクル洗い**: 古い角質をやさしくオフ
- **ソルトスクラブで週1回のスペシャルケア**: お尻から太ももまでツルツル肌へ

---

### 楽天API厳選！8-10月ボディ黒ずみ・ザラつきレスキュー
- **ペリカン石鹸 恋するおしり**: 「洗い流した瞬間にツルツルのお尻になる」とSNSでバズりまくっている人気石鹸
- **ハウス オブ ローゼ ボディ スムーザー N**: 「Oh! Baby」の愛称で親しまれる温泉水配合の全身つるつるスクラブ
- **SABON ボディスクラブ**: 死海の塩とオイルのダブル効果で透明感あふれるモチ肌へ
`
  },
  {
    id: 'blog-late-summer-after-uv-care',
    slug: 'late-summer-after-uv-care',
    title: '8-10月の強烈な紫外線・日焼け後シミを防ぐ！即効ビタミンC＆アフターUVレスキュー特集',
    subtitle: '「日焼け後の火照りが即静まり透明感が爆上がるとバズり中」シミ予備軍を撃退するビタミンC美容液＆サプリ。',
    targetGender: 'unisex',
    coverImage: '/images/products/melanocc_premium.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-09-03',
    readTimeMinutes: 10,
    introText: '8-10月は夏の強い紫外線のメラニン蓄積が表面化し、シミやアカンサスが目立ち始める警戒時期。「日焼けしちゃった」「シミを作りたくない」とお悩みの方へ、SNSで即効性抜群と大バズり中のWケアを楽天API連携で紹介！',
    recommendedItemCodes: [
      "melanocc-concentrated-brightening-premium-serum",
      "art-topic-supplement-fancl-vitc",
      "avene-thermal-spring-water",
      "art-topic-suncare-astalift-deepuv"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 8-10月の日焼け放置は「将来のシミ」に直結！

「夏が終わったから日焼けケアもおしまい」は大間違い！紫外線を浴びてからシミ（メラニン）が定着するまでには約72時間の猶予があります。この間に濃密ビタミンCを補給することが肝心です。

### 紫外線ダメージを即リセットするWケア
1. **高濃度ビタミンC美容液を即塗り**: メラニンの生成を抑えてシミ予防
2. **飲むビタミンCサプリで体内からアプローチ**: 継続的な透明感チャージ
3. **アベンヌウォーターで火照りをクールダウン**: 肌の炎症を即沈静

---

### 楽天API厳選！8-10月シミ・アフターUVケア
- **メラノCC 薬用しみ集中対策 プレミアム美容液**: 「ニキビ跡とシミ予備軍が消える」と大バズり中の実力派美容液
- **ファンケル ディープチャージ ビタミンC**: 体内への吸収率を高めた毎日飲みやすいビタミンCサプリ
- **アベンヌ ウォーター**: 温泉水100%でうっかり日焼けした肌の火照りをやさしく抑える温泉水ミスト
`
  }
];

function addLateSummerAutumnBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(lateSummerAutumnBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('8-10月季節特有お悩み解決ブログ記事3件を src/data.ts に追加しました。');
}

addLateSummerAutumnBlogPosts();
