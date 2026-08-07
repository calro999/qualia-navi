import fs from 'fs';

const odorQueryBlogPosts = [
  {
    id: 'blog-bad-breath-care',
    slug: 'bad-breath-care',
    title: '自分の口臭が気になる…原因と手軽にできる予防法＆おすすめ口臭ケア特集',
    subtitle: '朝のネバつきや会話中の不安をクリアに。殺菌マウスウォッシュ・薬用ハミガキ・持ち歩きスプレー全解説。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-oral-nonio-mouthwash.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-08',
    readTimeMinutes: 10,
    introText: '2026年最新の口腔ケア検証！朝起きたときの息のネバつきや会話中の口臭、マスク内のニオイの原因を徹底解説。即効性のあるマウスウォッシュや薬用ハミガキ、マウススプレーのおすすめを比較紹介。',
    recommendedItemCodes: [
      "art-topic-oral-nonio-mouthwash",
      "art-topic-oral-clinica-advantage",
      "art-topic-oral-ora2-spray",
      "art-topic-oral-denthealth-sp",
      "art-topic-oral-reach-propolis"
    ],
    isHallOfFame: true,
    contentMarkdown: `## なぜ自分の口臭は気になり、自分では気づきにくいのか？

人の鼻は自分の息のニオイに「順応（慣れ）」してしまうため、自分の口臭には気づきにくいという特徴があります。特に「朝起きた直後」「空腹時」「緊張したとき」は唾液の分泌が減り、口臭原因菌が増殖しやすくなります。

### 口臭の主な原因と対策3ポイント
1. **舌苔（ぜったい）と歯垢の細菌**: マウスウォッシュや殺菌ハミガキで細菌を殺菌・除去
2. **唾液不足による乾き**: マウススプレーなどで口内に潤いを与える
3. **歯周病・歯ぐきの炎症**: 薬用ハミガキで歯ぐきのケアと口臭予防を同時に行う

---

### 口臭対策のおすすめアイテム
- **NONIO 薬用マウスウォッシュ**: 口臭原因菌を長時間殺菌し、クリアな吐息を持続
- **オーラツー ブレスファイン マウススプレー**: 食後や会話前に一吹きで速攻口臭リフレッシュ
- **デントヘルス 薬用ハミガキ SP**: 歯槽膿漏・歯ぐきのネバつき・気になる大人の口臭を予防
`
  },
  {
    id: 'blog-body-odor-care',
    slug: 'body-odor-care',
    title: '体のニオイ・加齢臭・ミドル脂臭を根本から洗う！薬用ボディソープ＆石鹸特集',
    subtitle: '年齢とともに変わる体臭の悩みをバスタイムでリセット。薬用ボディクレンズ＆柿渋石鹸を徹底比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-deoco-bodywash.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-08',
    readTimeMinutes: 11,
    introText: '2026年のリアルな口コミで高評価！年齢とともに気になる体臭や加齢臭、後頭部・胸元のミドル脂臭の原因菌を殺菌洗浄する薬用ボディクレンズ＆柿渋石鹸のおすすめを徹底解説。',
    recommendedItemCodes: [
      "art-topic-body-deoco-bodywash",
      "art-topic-body-lucido-middle-wash",
      "art-topic-body-pelican-hipsoap",
      "art-topic-body-seabreeze-soap"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 年齢や部位で異なる「体臭・加齢臭・ミドル脂臭」の違い

「いつものボディソープで洗っても、夕方になると体のニオイが気になる」という場合、皮脂の種類とニオイ原因菌に合わせた洗い分けが必要です。

### ニオイの種類と特徴
- **加齢臭（2-ノネナール）**: 50代以降に多く、胸元や背中から発生する枯れ草のようなニオイ
- **ミドル脂臭（ジアセチル）**: 30〜40代に多く、後頭部や首の後ろから発生する古い油のようなニオイ
- **汗臭・皮脂臭**: 汗と皮脂が混ざり雑菌が繁殖して発生する酸っぱいニオイ

---

### 体臭予防のおすすめボディソープ
- **デオコ 薬用ボディクレンズ**: 年齢とともに減る甘い香り成分を補いながら大人臭を洗浄
- **ルシード 薬用デオドラントボディウォッシュ**: 40代からのねっとりしたミドル脂臭・汗臭を徹底洗浄
- **ペリカン石鹸 薬用柿渋石鹸**: 柿渋エキス配合で全身の汗臭・足のニオイをさっぱり殺菌
`
  },
  {
    id: 'blog-sweat-odor-care',
    slug: 'sweat-odor-care',
    title: '真夏の脇汗・汗臭さを発生源からブロック！強力デオドラント＆ボディシート特集',
    subtitle: '服の汗ジミ・ワキガ臭・ドロドロ汗にサヨナラ。直塗りスティック＆高密着スプレー厳選まとめ。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-ag24-foot-spray.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-08',
    readTimeMinutes: 10,
    introText: '2026年の猛暑でも安心！服の汗ジミやワキガ・汗臭さの原因菌を長時間シャットアウトする直塗りスティック・スプレー・ボディーシートのおすすめと正しい使い方を比較紹介。',
    recommendedItemCodes: [
      "art-topic-body-agdeo24-spray",
      "art-topic-body-ban-sweatblock",
      "art-topic-body-gatsby-premium-rollon",
      "art-topic-body-rexona-dryshield",
      "art-topic-body-mens-gatsby-paper"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 汗臭さ・ワキガ臭を防ぐ「防臭処方」の選び方

汗そのものは実は無臭です。皮膚表面の常在菌が汗や皮脂を分解することで、ツーンとする強烈な汗臭さやワキガ臭が発生します。

### 汗臭対策の3大ルール
1. **汗の出口を抑える（制汗成分）**: ナノイオン制汗成分などで汗の量を物理的に減らす
2. **ニオイ菌を殺菌する（殺菌成分）**: 殺菌成分配合のスティックやスプレーで菌の繁殖をストップ
3. **出先の汗を放置しない**: 汗をかいたら放置せず、消臭ボディシートで即座に拭き取る

---

### 強力汗臭対策アイテム
- **エージーデオ24 パウダースプレー**: 高密着パウダーで全身のニオイ菌を24時間殺菌
- **Ban 汗ブロック プラチナロールオン**: ナノイオンブロックでワキ汗の出口にフタをする
- **ギャツビー プレミアムタイプ ロールオン**: 男性特有の強い汗・皮脂ニオイ菌を夜までブロック
- **ギャツビー バイオコア ボディペーパー**: 拭いた後も殺菌効果が続きニオイ菌の繁殖を防ぐ
`
  }
];

function addOdorBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(odorQueryBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('消臭悩み特化型ブログ記事3件を src/data.ts に追加しました。');
}

addOdorBlogPosts();
