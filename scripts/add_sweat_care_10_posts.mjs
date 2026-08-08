import fs from 'fs';

const sweatCareBlogPosts = [
  {
    id: 'blog-sweat-care-guide-by-concern',
    slug: 'sweat-care-guide-by-concern',
    title: '汗・ニオイ悩み別｜制汗剤の選び方',
    subtitle: '「滝汗」「ワキガ臭」「服の汗ジミ」「足のニオイ」悩みに合わせた最強の制汗アプローチを徹底解説！',
    targetGender: 'unisex',
    coverImage: '/images/products/deonature_softstone.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「自分に合う制汗剤がわからない」とお悩みの方へ。汗の量・ニオイの強さ・服への汗ジミなど、お悩み別に最も効果的な制汗成分とタイプを楽天API連携商品から徹底比較解説！',
    recommendedItemCodes: [
      "deonature-soft-stone-w",
      "art-topic-body-ban-sweatblock",
      "art-topic-body-agdeo24-spray",
      "art-topic-body-deoco-deo-stick"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 汗・ニオイの悩みによって「選ぶべき制汗剤」は全く違う！

「ドラッグストアで適当に選んだ制汗剤を使っていても、汗やニオイが収まらない」という場合、悩みの種類と制汗剤のタイプが合っていない可能性が大です。

### 悩み別選び方の3大法則
1. **服の汗ジミ・ワキ汗の量が多い人**: 汗の出口にフタをする「ナノイオン制汗（ロールオン/スティック）」
2. **ツーンとする汗臭さ・ワキガ臭が気になる人**: ニオイ菌を強力殺菌する「直塗り高密着タイプ」
3. **全身のべたつき・広範囲の汗を抑えたい人**: 爽快感と制汗を両立する「パウダースプレー/シート」

---

### 楽天API厳選！悩み別おすすめ制汗剤
- **デオナチュレ ソフトストーンW**: 焼ミョウバンパワーでワキガ臭・汗臭を一日中根本防臭
- **Ban 汗ブロック プラチナロールオン**: 汗の出口にフタをして服の汗ジミを物理的にシャットアウト
- **エージーデオ24 パウダースプレー**: 高密着パウダーが全身のニオイ菌を24時間殺菌
`
  },
  {
    id: 'blog-sweat-care-top10-for-underarm',
    slug: 'sweat-care-top10-for-underarm',
    title: '脇汗・汗ジミ対策に｜タイプ別おすすめ制汗剤10選',
    subtitle: '「グレーの服を着ても汗ジミができない」とSNSで話題！ロールオン・スティック・スプレー厳選10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-ban-sweatblock.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「脇汗で服に黄色い汗ジミができる」「恥ずかしくて腕が上げられない」とお悩みの方へ。最新トレンドの高密着・即乾タイプの脇汗専用デオドラント10選をタイプ別に徹底比較！',
    recommendedItemCodes: [
      "art-topic-body-ban-sweatblock",
      "art-topic-body-gatsby-premium-rollon",
      "art-topic-body-rexona-dryshield",
      "art-topic-body-nivea-deo-stick",
      "deonature-soft-stone-w"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 脇汗・汗ジミ対策は「高密着・速乾」が勝ち筋！

脇は汗腺（アポクリン腺・エクリン腺）が集中しているため、汗の量もニオイも最も出やすい部位です。脇汗対策には、肌に直接密着して落ちにくいロールオンやスティックが最適です。

---

### タイプ別脇汗おすすめアイテム
- **【ロールオン】Ban 汗ブロック プラチナロールオン**: ナノイオン高密着ベールで脇汗の出口をブロック
- **【スティック】レセナ ドライシールド パウダースティック**: 汗をかく前にワキガ臭と汗ジミを根元遮断
- **【メンズ用】ギャツビー プレミアムタイプ ロールオン**: 男の強烈な汗・皮脂・ニオイ菌を密着殺菌
`
  },
  {
    id: 'blog-sweat-care-type-comparison',
    slug: 'sweat-care-type-comparison',
    title: 'ロールオン・スプレー・スティックを比較｜制汗剤の選び方',
    subtitle: 'ロールオン・スプレー・スティックの違いとメリット・デメリットを徹底解剖！',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-gatsby-premium-rollon.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ロールオン、スプレー、スティックって何が違うの？」それぞれの特徴、持続力、塗りやすさを分かりやすく徹底比較！自分の生活スタイルにぴったりのタイプがひと目でわかります。',
    recommendedItemCodes: [
      "art-topic-body-8x4-rollon",
      "art-topic-body-agdeo24-spray",
      "art-topic-body-deoco-deo-stick"
    ],
    isHallOfFame: false,
    contentMarkdown: `## 3大形状（ロールオン・スプレー・スティック）徹底徹底比較

### 1. ロールオン（液体直塗り）
- **メリット**: 液状でムラなく密着し、汗の出口をコーティング。
- **こんな人に手口**: 脇汗の量が多い人・服の汗ジミを防ぎたい人。

### 2. スティック（固形直塗り）
- **メリット**: 塗った瞬間サラサラ！白残りしにくく殺菌効果が長時間持続。
- **こんな人に手口**: ワキガ臭・汗臭さを一日中しっかり防ぎたい人。

### 3. スプレー（パウダー噴射）
- **メリット**: 広範囲を一瞬で冷却＆防臭。背中や胸元にも使いやすい。
- **こんな人に手口**: お出かけ前の全身ケア・スポーツ後のリフレッシュ。
`
  },
  {
    id: 'blog-sweat-care-heavy-sweaters',
    slug: 'sweat-care-heavy-sweaters',
    title: '汗をかきやすい人向け｜使いやすい制汗剤10選',
    subtitle: '「滝汗さん必須」「真夏でもサラサラが続く」と口コミ高評価！多汗・汗かき専用の強力制汗剤まとめ。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-8x4men-stick.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「人より汗をかきやすくてハンカチが手放せない」「汗流で制汗剤が流れてしまう」とお悩みの方へ。汗に強い耐水性・耐汗性を備えた高機能制汗剤10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-body-8x4men-stick",
      "art-topic-body-gatsby-ice-plug",
      "art-topic-body-rexona-dryshield",
      "art-topic-body-oldspice-deodorant"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 汗かきさんが選ぶべきは「ウォータープルーフ・耐汗ベール処方」！

汗を大量にかく人は、汗で制汗成分が流れ落ちてしまい効果が半減することがあります。汗に強く肌に強力密着する耐水処方の制汗剤を選ぶのがポイントです。

---

### 多汗さん向け強力制汗アイテム
- **8×4 MEN 激乾 デオドラントスティック**: 男の激汗でも流れない高密着激乾ベール
- **オールドスパイス ピュアスポーツ**: 海外大ヒット！大量の汗と強烈な汗臭を一日中シャットアウト
- **レセナ ドライシールド パウダースティック**: 汗の出口をブロックして汗の発生量そのものをカット
`
  },
  {
    id: 'blog-sweat-care-underarm-comparison',
    slug: 'sweat-care-underarm-comparison',
    title: '脇汗が気になる日に｜タイプ別デオドラント比較',
    subtitle: '大事な商談・デート・猛暑の外出日に！絶対に脇汗を見せたくない日の完璧デオドラント比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-nivea-deo-stick.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「今日は絶対に脇汗をかけない！」「グレーの服を着たい！」そんな特別な日におすすめの強力デオドラントをタイプ別に徹底比較解説。',
    recommendedItemCodes: [
      "art-topic-body-nivea-deo-stick",
      "art-topic-body-ban-sweatblock",
      "art-topic-body-deoco-deo-stick"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 脇汗を絶対防ぎたい日の勝利の方程式

緊張汗や猛暑の汗は、出る前に物理的に抑えるのが鉄則！朝の仕込みと日中のケアを組み合わせることで、汗ジミゼロをキープできます。

### 脇汗防止の決定版アイテム
- **ニベア デオドラント アプローチ スティック**: 自然由来の殺菌成分で肌にやさしく脇汗とニオイを遮断
- **Ban 汗ブロック プラチナロールオン**: ナノイオン技術で脇汗の出口をブロック
- **デオコ 薬用デオドラント スティック**: 女性の大人臭・汗臭をスウィートフローラルの香りで防臭
`
  },
  {
    id: 'blog-sweat-care-timing-and-usage',
    slug: 'sweat-care-timing-and-usage',
    title: '朝使う？夜使う？｜制汗剤の使い方と選び方',
    subtitle: '制汗剤の効果が3倍変わる！「夜のお風呂上がり塗り」が実は最強だった？正しい使い方完全ガイド。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-deonature-foot.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「制汗剤っていつ塗るのが一番効くの？」実は汗をかく前の「夜寝る前・お風呂上がり」に塗るのが最も効果的！専門家が教える正しい使い方と選び方を分かりやすくまとめました。',
    recommendedItemCodes: [
      "deonature-foot-sarasara-cream",
      "deonature-soft-stone-w",
      "art-topic-body-agdeo24-spray"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 制汗剤の真価を発揮する「最強のタイミング」とは？

多くの人は「汗をかいた朝や日中」に制汗剤を塗りますが、実はそれは間違い！汗をかいた後だと制汗成分が汗に弾かれて肌に密着しません。

### 制汗剤の正しい使用手順
1. **【ベストタイミング】夜のお風呂上がり・就寝前**: 肌が清潔で汗腺が休んでいる夜に塗ることで成分が奥まで浸透
2. **【朝のダブル仕込み】出掛ける直前**: 乾いた肌に重ね塗りして一日中ブロック
3. **【日中のリセット】汗を拭き取ってから使用**: ボディシートで汗を拭いてから使う

---

### 夜塗り・朝仕込みにおすすめのアイテム
- **デオナチュレ 足指サラサラクリーム**: お風呂上がりの乾いた足指に塗れば翌日一日中サラサラ
- **デオナチュレ ソフトストーンW**: 朝の出掛け前にサッとひと塗りで夜まで臭わない
`
  },
  {
    id: 'blog-sweat-care-scent-and-durability-top10',
    slug: 'sweat-care-scent-and-durability-top10',
    title: '香り・使用感・持続力で比較｜人気デオドラント10選',
    subtitle: '「いい香りがずっと続く」「ベタつかない使用感」で選ばれたSNS人気の最新デオドラント10選！',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-body-8x4-rollon.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '消臭効果だけでなく「香り」「使用感の良さ」「持続力」にもこだわりたい方必見！フレグランス感覚で使える人気デオドラント10選を徹底比較！',
    recommendedItemCodes: [
      "art-topic-body-8x4-rollon",
      "art-topic-body-deoco-deo-stick",
      "art-topic-body-loccitane-verbena",
      "art-topic-body-happydeo-sheet"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 香り×消臭持続力で選ぶ大人女子のデオドラント

「汗のニオイを抑えるだけでなく、ふんわりいい香りをまといたい」そんな願いを叶える高機能フレグランスデオドラントがトレンドです。

---

### 香り＆使用感で選ぶおすすめデオドラント
- **8×4 アロマスイッチ ロールオン**: 擦れや汗に反応して香りが再発香する高機能アロマデオドラント
- **デオコ 薬用デオドラント スティック**: 年齢とともに減る甘い香り成分ラクトンを補いスウィートフローラルが持続
- **ロクシタン ヴァーベナ アイシー**: 爽やかな清涼感あふれるシトラスの香りで夏の肌を冷却
`
  },
  {
    id: 'blog-sweat-care-non-sticky-summer',
    slug: 'sweat-care-non-sticky-summer',
    title: '夏の汗対策に｜ベタつきにくい制汗剤を比較',
    subtitle: '「塗った瞬間さらさら」「服が張り付かない」猛暑の汗ベタつきを一瞬で解消する制汗剤比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/seabreeze_deo.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「湿気と汗で肌がペタペタして気持ち悪い」とお悩みの方へ。塗った直後から素肌がサラサラになり、一日中快適に過ごせるさらさら成分配合の制汗剤を徹底比較！',
    recommendedItemCodes: [
      "seabreeze-deo-and-water",
      "art-topic-body-biore-powdersheet",
      "art-topic-body-happydeo-sheet",
      "innisfree-no-sebum-mineral-powder"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 汗のベタつきを解消するさらさらパウダー処方

猛暑の汗ベタつきは、不快感だけでなく服の摩擦によるかぶれやニオイの原因にもなります。さらさらパウダーや冷感成分配合のアイテムで瞬時にリフレッシュしましょう。

---

### ベタつき解消おすすめアイテム
- **シーブリーズ デオ＆ウォーター**: つけた瞬間すーっと爽快！全身の汗とベタつきを抑えるウォーター
- **ビオレ さらさらパウダーシート**: 独自開発の皮脂クリア処方で拭いた後もさらさら肌が持続
- **マンダム ハッピーデオ ボディシート**: 香りを楽しみながらベタつく肌をサッとリセット
`
  },
  {
    id: 'blog-sweat-care-no-white-cast-top10',
    slug: 'sweat-care-no-white-cast-top10',
    title: '白残りしにくい？｜使いやすさで選ぶ制汗剤10選',
    subtitle: '「ノースリーブや黒い服を着ても白くならない」使いやすさとキレイな仕上がりを両立した10選！',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-body-ag24-premium-sheet.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「制汗剤を塗ったら服に白い粉がついた」「黒い服が着られない」という失敗を防ぐ！透明パウダーや透明液体処方で、白残りしない使いやすさ抜群の制汗剤10選を紹介！',
    recommendedItemCodes: [
      "art-topic-body-ag24-premium-sheet",
      "art-topic-body-gatsby-spot-block",
      "art-topic-body-ban-sweatblock",
      "art-topic-body-ag24-foot-spray"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 服への「白残り」を防ぐ制汗剤の選び方

制汗スプレーやパウダースティックに含まれる白パウダーは、服のフチや黒いトップスに付着すると目立ってしまいます。透明ジェルや高密着透明ベール処方のアイテムを選びましょう。

---

### 白残りゼロのおすすめ制汗剤
- **エージーデオ24 プレミアム デオドラント シャワーシート**: 透明感ある高密着シートで白残りせずに全身防臭
- **ギャツビー プレミアム デオドラント ロールオン**: 透明液体で服に粉がつかない速攻密着ロールオン
- **エージーデオ24 フットスプレー h**: 白くならないクリア処方の足専用スプレー
`
  },
  {
    id: 'blog-sweat-care-stain-prevention-comparison',
    slug: 'sweat-care-stain-prevention-comparison',
    title: '汗ジミを防ぎたい人へ｜制汗剤をタイプ別に比較',
    subtitle: '「グレー・薄ピンクの服も怖くない！」脇汗ジミを徹底的に物理シャットアウトする制汗剤タイプ別比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-rexona-dryshield.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「脇の汗ジミが気になって着たい服が着られない」とお悩みの方へ。汗ジミ発生を防ぐ高機能制汗剤をタイプ別に徹底比較！',
    recommendedItemCodes: [
      "art-topic-body-rexona-dryshield",
      "art-topic-body-ban-sweatblock",
      "art-topic-body-gatsby-ice-plug",
      "deonature-soft-stone-w"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 服の汗ジミを防ぐなら「ナノイオン制汗」×「高密着」！

服に汗ジミができる原因は、汗の量そのものが脇から溢れ出してしまうためです。制汗成分（クロルヒドロキシアルミニウム等）が汗の出口で結晶化してフタをするタイプが極めて有効です。

---

### 汗ジミ防止徹底比較アイテム
- **【パウダースティック】レセナ ドライシールド**: 汗の出口をブロックして汗ジミとニオイを元から断つ
- **【密着ロールオン】Ban 汗ブロック プラチナ**: 物理的に汗を出さないナノイオン高密着ベール
- **【超耐久スティック】ギャツビー プレミアムタイプ スティック**: 猛暑の滝汗でも服を濡らさない強力高密着
`
  }
];

function addSweatCareBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(sweatCareBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('制汗・ニオイケア新規10記事を src/data.ts に追加しました。');
}

addSweatCareBlogPosts();
