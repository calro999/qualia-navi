import fs from 'fs';

const bodyHairBeautyBlogPosts = [
  {
    id: 'blog-body-mist-top10-comparison',
    slug: 'body-mist-top10-comparison',
    title: '香り・使用感・持続力で比較｜人気ボディミスト10選',
    subtitle: 'ふんわり香ってひんやりうるおう！香り・使用感の良さ・持続力で選ぶボディミスト10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-body-loccitane-verbenamist.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「香水ほどきつくなく、ふんわり好印象な香りをまといたい」「涼感と保湿を同時に叶えたい」フレグランス感覚で全身に使える人気ボディミスト10選を楽天API連携データで比較！',
    recommendedItemCodes: [
      "art-topic-body-loccitane-verbenamist",
      "art-topic-body-loccitane-verbena",
      "avene-thermal-spring-water",
      "art-topic-body-biore-coolmist"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 香水より使いやすい！ボディミストの魅力

ボディミストは、ふんわり柔らかな香りと同時に素肌に水分補給ができるフレグランスケアアイテム。お風呂上がりやリフレッシュ、お仕事中にも重宝します。

---

### 香り＆持続力でおすすめのボディミスト
- **ロクシタン ヴァーベナ ボディミスト**: 柑橘系の清涼感あふれる爽やかな香りで瞬時に気分リフレッシュ
- **ロクシタン ヴァーベナ アイシー**: ひんやり冷感成分配合で夏の汗ばむ肌を速攻冷却
`
  },
  {
    id: 'blog-body-scent-long-lasting-top10',
    slug: 'body-scent-long-lasting-top10',
    title: 'いい香りを長く楽しみたい｜ボディケアアイテム10選',
    subtitle: '「すれ違った時に良い香りがする」と褒められる！香りが長時間持続する極上ボディケア10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-body-sabon-bodyscrub.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「ボディクリームやスクラブの香りを一日中漂わせたい」上質なボタニカル・アロマの香りで包み込み、潤いと良い香りを長時間キープするボディケア10選を紹介！',
    recommendedItemCodes: [
      "art-topic-body-sabon-bodyscrub",
      "art-topic-body-loccitane-verbena",
      "loccitane-shea-hand-cream",
      "art-topic-body-deoco-sheet"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 体温で温められてふんわり香る贅沢ボディケア

ボディミルクやスクラブをしっかり馴染ませることで、体温によって優しい香りが立ち上り、香水要らずで好印象を与えることができます。

---

### 香りが持続するおすすめアイテム
- **SABON ボディスクラブ パチュリ ラベンダー バニラ**: バスルームいっぱいに広がる豊かな香りとモチモチ肌の持続力
- **ロクシタン シア ハンドクリーム**: 優しいシアの香りで指先まで上質な潤いをキープ
`
  },
  {
    id: 'blog-body-cream-non-sticky-comparison',
    slug: 'body-cream-non-sticky-comparison',
    title: 'ベタつきにくさで比較｜人気ボディクリーム10選',
    subtitle: '「塗った直後に服が着られる」さらっと馴染んでしっかり潤う優秀ボディミルク比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/neutrogena_body.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ボディクリームのぬるぬる感が苦手」「お風呂上がりにすぐパジャマを着たい」という方へ。すっと素肌に浸透してベタつかない人気ボディエマルジョンを比較！',
    recommendedItemCodes: [
      "neutrogena-intense-repair-body-emulsion",
      "nivea-skin-milk-stretch-mark",
      "loccitane-shea-hand-cream"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 浸透技術で叶える「ベタつきゼロ×高保湿」

最新のボディミルクは、角層へ素早く浸透して表面に油膜を残さない水分ベース設計。塗ってすぐにパジャマを着ても張り付きません。

---

### ベタつかないおすすめボディミルク
- **ニュートロジーナ インテンスリペア ボディエマルジョン**: 超乾燥肌用なのに表面はサラッとなめらかに仕上がる
- **ニベア スキンミルク**: すっと伸びて肌に浸透し、しっとり感が一日中キープ
`
  },
  {
    id: 'blog-body-care-fresh-summer-top10',
    slug: 'body-care-fresh-summer-top10',
    title: '夏に使いやすい｜さらっと仕上がるボディケア10選',
    subtitle: '汗ばむ季節でも快適！ひんやり冷却ジェル＆さらさらパウダーシートで爽快ボディケア。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-body-loccitane-verbena.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「夏はボディケアすると汗でぬるつく」というお悩みを解消！清涼感のある冷却ジェルや、拭いた後さらさら肌が持続するボディシート10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-body-loccitane-verbena",
      "art-topic-body-biore-powdersheet",
      "art-topic-body-happydeo-sheet",
      "seabreeze-deo-and-water"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 夏のボディケアは「クールダウン×さらさら感」

夏のボディケアは、ひんやり冷感で火照りを抑えながら、パウダー処方で皮脂・汗のベタつきをシャットアウトするのが正解です。

---

### さらっと快適夏ボディアイテム
- **ロクシタン ヴァーベナ アイシー**: ひんやりジェルで汗ばむ身体を冷感ケア
- **ビオレ さらさらパウダーシート**: 拭くだけでベタつきを即オフし、サラサラ質感が続く
`
  },
  {
    id: 'blog-hair-oil-frizz-control-top10',
    slug: 'hair-oil-frizz-control-top10',
    title: '髪の広がりが気になる人へ｜人気ヘアオイル10選',
    subtitle: '「湿気や汗で広がる髪がすとんとまとまる」サロン級の束感＆まとまりを叶えるヘアオイル10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-hair-napla-ndot.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「湿気や乾燥で毛先が広がる・くせ毛が暴れる」とお悩みの方へ。天然由来オイルで湿気を弾き、一日中まとまりとツヤをキープするヘアオイル10選を徹底比較！',
    recommendedItemCodes: [
      "art-topic-hair-napla-ndot",
      "art-topic-hair-kerastase-oleo",
      "art-topic-hair-milbon-elujuda-sun",
      "art-topic-hair-yolu-nightrepair"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 髪の広がり・パサつきの原因は「水分の出入り」

髪が広がるのは、傷んだキューティクルから外気の湿気や水分が侵入するため。重めのオイルコーティングで髪内部の水分量を一定に保つのがカギです。

---

### 広がりを抑えるおすすめヘアオイル
- **ナプラ N. ポリッシュオイル**: 天然由来成分100%！トレンドのウェットな束感と重めのまとまりを維持
- **ケラスターゼ NU ソワン オレオ リラックス**: 頑固な広がり・くせ毛を素直なツヤ髪へ導くサロン最高峰オイル
`
  },
  {
    id: 'blog-hair-oil-selection-light-moist-shine',
    slug: 'hair-oil-selection-light-moist-shine',
    title: '軽め・しっとり・ツヤ感で比較｜ヘアオイルの選び方',
    subtitle: 'さらさら軽めから束感しっとりまで！髪質やスタイリングに合わせたヘアオイルの選び方ガイド。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-hair-kerastase-oleo.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ヘアオイルを使うとベタっとしてペタンこになる」「もっとサラサラに仕上げたい」髪質や硬さ、仕上がりの好みに応じたヘアオイルの選び方を分かりやすく解説！',
    recommendedItemCodes: [
      "art-topic-hair-napla-ndot",
      "art-topic-hair-kerastase-oleo",
      "art-topic-hair-milbon-elujuda-sun"
    ],
    isHallOfFame: false,
    contentMarkdown: `## 髪質別ヘアオイルのテクスチャー選び

### 1. 軽め・サラサラタイプ（細毛・軟毛・猫っ毛向け）
- **仕上がり**: ぺたんこにならず、指通りサラサラな自然なツヤ。

### 2. 重め・しっとりタイプ（多毛・硬毛・広がり毛向け）
- **仕上がり**: ウェットな束感と落ち着きのあるまとまり。
`
  },
  {
    id: 'blog-hair-mist-morning-styling-top10',
    slug: 'hair-mist-morning-styling-top10',
    title: '朝のスタイリングに使いやすい｜人気ヘアミスト10選',
    subtitle: '「寝ぐせ直しもUVカットもこれ1本！」忙しい朝のスタイリングを時短にする人気ヘアミスト10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-hair-diane-botanicaldry.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「朝の寝ぐせ直しを素早く済ませたい」「アイロン前の熱ダメージを防ぎたい」忙しい朝に吹きかけるだけでスルンとまとまる人気ヘアミスト10選を紹介！',
    recommendedItemCodes: [
      "mieufa-fragrance-uv-spray",
      "art-topic-hair-diane-botanicaldry",
      "art-topic-hair-tsubaki-dryshampoo"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 朝のヘアミストは「寝ぐせリセット×UVガード」

朝のスタイリングミストは、髪の芯まで浸透して寝ぐせを直すと同時に、日中の紫外線やドライヤーの熱から髪をガードしてくれます。

---

### 朝のおすすめスタイリングミスト
- **ミーファ フレグランスUVスプレー**: 髪の日焼けを防ぎながらサロン帰りの香りをまとえるUVスプレー
- **ダイアン ボタニカル ドライシャンプー**: 朝の根元のペタつきや寝ぐせを水なしで一瞬でふんわりリセット
`
  },
  {
    id: 'blog-hair-care-scent-top10',
    slug: 'hair-care-scent-top10',
    title: '香りで選ぶ｜毎日使いたい人気ヘアケア10選',
    subtitle: '「髪が揺れるたびいい香りが漂う」とSNSで話題！サロン級の香りと補修力を兼ね備えた10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-hair-yolu-nightrepair.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「髪から心地よい香らせたい」「香水未満の自然な香りをキープしたい」香りの良さで圧倒的支持を集めるシャンプー・トリートメント・ヘアマスク10選を厳選！',
    recommendedItemCodes: [
      "art-topic-hair-yolu-nightrepair",
      "art-topic-hair-fino-hairmask",
      "art-topic-hair-kerastase-oleo",
      "art-topic-hair-uka-kenzan"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 髪の香りは清潔感と好印象の決定打！

髪はニオイを吸着しやすい反面、上質なヘアケアアイテムを使うことで一日中柔らかい香りを漂わせることができます。

---

### 香りが大人気のヘアケアアイテム
- **YOLU カームナイトリペア シャンプー**: ナイトキャップ発想！アロマティックなナイトセラピーの香り
- **fino プレミアムタッチ 浸透美容液ヘアマスク**: フローラルブーケの上品な香りと極上の指通り
`
  },
  {
    id: 'blog-portable-beauty-items-top10',
    slug: 'portable-beauty-items-top10',
    title: '持ち運びやすさで比較｜外出先で使える美容アイテム10選',
    subtitle: '「仕事中・出先でのメイク直しやニオイ対策に」持ち運びに特化したコンパクト美容グッズ比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-hair-pluseau-pointrepair.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「外出先でのアホ毛やメイクヨレを秒で直したい」「バッグの中でもかさばらないコスメが欲しい」携帯性抜群のレスキュー美容アイテム10選を紹介！',
    recommendedItemCodes: [
      "art-topic-hair-pluseau-pointrepair",
      "fujiko-aburatoripowder",
      "art-topic-oral-ora2-spray",
      "art-topic-suncare-biore-uvmist"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 出先の美しさをキープするミニマム美容

バッグに1本入れておくだけで、夕方の浮き出るアホ毛、Tゾーンのテカリ、口臭をいつでも一瞬でリセットできます。

---

### 持ち運びおすすめレスキューグッズ
- **プリュスオー ポイントリペア**: マスカラタイプで浮き出るアホ毛や乱れた前髪を瞬時に固めず整える
- **フジコ あぶらとりパウダー**: あぶらとり紙＋お直しパウダーが合体！ポンポンするだけでサラサラ素肌へ
- **オーラツー ブレスファイン マウススプレー**: ポケットサイズで食後の口臭を一吹きリフレッシュ
`
  },
  {
    id: 'blog-pouch-beauty-essentials-top10',
    slug: 'pouch-beauty-essentials-top10',
    title: 'ポーチに入れておきたい｜外出先で使える美容アイテム10選',
    subtitle: '「これを入れておけば安心！」女子のポーチ常備マストな神お直し美容アイテム10選。',
    targetGender: 'female',
    coverImage: '/images/products/fujiko_aburatoripowder.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「急なデートや仕事終わりの予定にも完璧に対応したい」美容ライターのポーチの中に必ず入っている、出先のお直し神コスメ10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "fujiko-aburatoripowder",
      "art-topic-hair-pluseau-pointrepair",
      "art-topic-makeup-immeme-pepbalm",
      "art-topic-body-biore-coolmist"
    ],
    isHallOfFame: true,
    contentMarkdown: `## ポーチに入れておくべき「レスキュー4大コスメ」

1. **お直しパウダー / シート**: 皮脂と汗のテカリを抑えてサラツヤ肌復活
2. **アホ毛マスカラ**: ボサボサ髪を即リセット
3. **マルチカラーバーム**: リップにもチークにも使える時短お直し
4. **口臭スプレー / ひんやりミスト**: 好印象と涼しさをキープ

---

### ポーチ常備おすすめアイテム
- **フジコ あぶらとりパウダー**: ポンポンするだけで夕方のテカリ肌をサラサラお直し
- **アイムミミ マルチペップバーム**: リップ・チーク・目元に万能に使える絵の具バーム
`
  }
];

function addBodyHairBeautyBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(bodyHairBeautyBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('ボディ・ヘア・美容アイテム新規10記事を src/data.ts に追加しました。');
}

addBodyHairBeautyBlogPosts();
