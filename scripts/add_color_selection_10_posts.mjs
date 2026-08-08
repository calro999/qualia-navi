import fs from 'fs';

const colorSelectionBlogPosts = [
  {
    id: 'blog-personal-color-warm-spring-lips',
    slug: 'personal-color-warm-spring-lips',
    title: 'イエベ春向け｜肌になじみやすいリップ10選',
    subtitle: '多幸感あふれるコーラルピンク＆明るいピーチ！イエベ春の肌を一番明るく魅せる人気リップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/kate_lipmonster.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「自分に似合うコーラルピンクが欲しい」「イエベ春にぴったりの明るいツヤリップが知りたい」イエローベース春（スプリング）タイプのくすみを飛ばし、多幸感溢れる華やかな口元を作る10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "kate-lip-monster-03",
      "romand-juicy-lasting-tint",
      "opera-lip-tint-n",
      "art-topic-makeup-romand-meltbalm"
    ],
    isHallOfFame: true,
    contentMarkdown: `## イエベ春（スプリング）が得意なカラーとツヤ感

イエベ春タイプは、黄みを感じる明るい暖色系と、透明感のあるツヤ感が大得意！くすんだ色や重いダークカラーは避け、多幸感のあるコーラル・ピンクベージュ・ピーチカラーを選びましょう。

---

### イエベ春おすすめ神リップ
- **KATE リップモンスター 03 陽炎**: イエベ春の粘膜カラー代表！淡いロゼベージュが肌に吸い付くように馴染む
- **ロムアンド ジューシーラスティングティント**: 果汁のようなフレッシュなコーラルツヤが持続
- **オペラ リップティント N**: 透けるようなコーラルピンクでピュアな血色感をプラス
`
  },
  {
    id: 'blog-personal-color-cool-summer-lips',
    slug: 'personal-color-cool-summer-lips',
    title: 'ブルベ夏向け｜透明感を引き出すリップ10選',
    subtitle: '青みピンク＆青みローズで肌の透明感が爆上がり！ブルベ夏に似合う上品シアーリップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-hince-rawglow.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「青みピンクを塗ると肌が白く見える」「ブルベ夏の透明感を最大限引き出したい」ブルーベース夏（サマー）タイプが得意なモーヴピンク・ローズ系リップ10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-lip-hince-rawglow",
      "laka-bonding-glow-lipstick",
      "art-topic-lip-fwee-puddingpot",
      "bbia-low-tint"
    ],
    isHallOfFame: true,
    contentMarkdown: `## ブルベ夏（サマー）の透明感を輝かせるカラー

ブルベ夏タイプは、青みを含んだ明るくソフトなカラーと、透け感のあるシアーなツヤ感が得意。黄みの強いオレンジやブラウンを塗ると顔がくすみやすいため、モーヴピンク・ラベンダーピンク・ローズ系が正解！

---

### ブルベ夏おすすめ神リップ
- **hince ロウグロウジェルティント**: 青みシアーピンクが肌の白さと透明感を劇的に引き立てる
- **Laka ボンディンググロウ**: ブルベ夏の肌に馴染む柔らかいモーヴピンクとガラス膜ツヤ
- **fwee リップアンドチーク ブラーパンディングポット**: じゅわっと滲むブルベ夏の粘膜チーク＆リップ
`
  },
  {
    id: 'blog-personal-color-warm-autumn-lips',
    slug: 'personal-color-warm-autumn-lips',
    title: 'イエベ秋向け｜大人っぽく仕上がるリップ10選',
    subtitle: 'テラコッタ・ブラウン・ブラウンレッドでこなれ感！イエベ秋を垢抜けさせるスタイリッシュ10選。',
    targetGender: 'female',
    coverImage: '/images/products/cezanne_liptint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「オシャレなブラウンリップを大人っぽく使いこなしたい」イエローベース秋（オータム）タイプの温かみのある深みカラー（テラコッタ・キャラメル・ブラウンレッド）厳選10選を比較紹介！',
    recommendedItemCodes: [
      "cezanne-lip-color-shield",
      "art-topic-makeup-romand-meltbalm",
      "kate-lip-monster-03",
      "art-topic-lip-cezanne-3djelly"
    ],
    isHallOfFame: true,
    contentMarkdown: `## イエベ秋（オータム）のシックで洗練されたカラー

イエベ秋タイプは、黄みを含んだ深みのあるカラーや、マット〜セミツヤの質感が最も美しく映えるタイプです。明るすぎる青みピンクは浮いてしまいがちなため、テラコッタ・ブラウン・柿色を選びましょう。

---

### イエベ秋おすすめ神リップ
- **セザンヌ リップカラーシールド**: イエベ秋に馴染む洗練されたブラウンオレンジが一日中密着
- **ロムアンド グラスティング メルトバーム**: 濃厚なキャラメルブラウンでリッチなツヤ感
`
  },
  {
    id: 'blog-personal-color-cool-winter-lips',
    slug: 'personal-color-cool-winter-lips',
    title: 'ブルベ冬向け｜華やかに映えるリップ10選',
    subtitle: 'ディープバーガンディ＆鮮やかプラム！ブルベ冬のクリアな肌に映える高発色人気リップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-dior-foreverliquid.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「パキッとしたドラマチックなリップが似合う」「ブルベ冬の存在感を高めるリップが欲しい」ブルーベース冬（ウィンター）が得意なワインレッド・プラム・鮮やかローズ10選を紹介！',
    recommendedItemCodes: [
      "art-topic-lip-dior-foreverliquid",
      "kate-lip-monster-souffle-matte",
      "bbia-low-tint",
      "art-topic-lip-dior-lipmaximizer"
    ],
    isHallOfFame: true,
    contentMarkdown: `## ブルベ冬（ウィンター）のクリアで華やかな存在感

ブルベ冬タイプは、青みを含んだ鮮やかで深みのある色が得意！コントラストの強いディープバーガンディ・プラム・チェリーレッドを塗ることで、肌の透明感と目力の強さが格段にアップします。

---

### ブルベ冬おすすめ神リップ
- **ルージュ ディオール フォーエヴァー リキッド**: 高発色なディープローズがブルベ冬の肌をクリアに魅せる
- **KATE リップモンスター スフレマット**: じゅわっと色づくプラム系のスフレマットで垢抜け
`
  },
  {
    id: 'blog-personal-color-lip-guide-warm-cool',
    slug: 'personal-color-lip-guide-warm-cool',
    title: 'イエベ・ブルベ別｜似合うリップカラーの選び方',
    subtitle: 'イエベ（黄み）とブルベ（青み）の見分け方と、パーソナルカラーに合わせた失敗しないリップ選び完全ガイド。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-makeup-immeme-pepbalm.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「買ったリップを塗ってみたら顔色が悪く見える…」その原因はベースカラー（イエベ・ブルベ）のミスマッチ！自分に本当に似合う色味と質感の選び方を分かりやすく解説！',
    recommendedItemCodes: [
      "kate-lip-monster-03",
      "romand-juicy-lasting-tint",
      "laka-bonding-glow-lipstick"
    ],
    isHallOfFame: true,
    contentMarkdown: `## イエベとブルベの基本とベースカラー判別

- **イエベ（イエローベース）**: 黄みのある温かい肌。ゴールドジュエリーやコーラル・オレンジが似合う。
- **ブルベ（ブルーベース）**: 青みのある涼しげな肌。シルバージュエリーや青みピンク・ローズが似合う。

---

### 失敗しない色の選び方
- イエベなら「コーラル・ピーチ・テラコッタ・ブラウン」
- ブルベなら「モーヴ・ラベンダーピンク・ローズ・バーガンディ」
`
  },
  {
    id: 'blog-personal-color-fail-proof-selection',
    slug: 'personal-color-fail-proof-selection',
    title: '失敗しにくいリップ選び｜肌色別おすすめカラー',
    subtitle: '「ネット通販で買っても失敗しない」肌トーン（明るめ・普通・健康的な肌）に馴染む万能カラー厳選！',
    targetGender: 'female',
    coverImage: '/images/products/opera_liptint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ネット通販でリップを買うと色が想像と違う」「誰にでも似合う万能な色が知りたい」肌の色味やトーンを問わずに誰でも失敗なく使える肌馴染み抜群リップを紹介！',
    recommendedItemCodes: [
      "opera-lip-tint-n",
      "kate-lip-monster-03",
      "cezanne-lip-color-shield"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 失敗しない「透け感粘膜カラー」が最強

色選びで失敗したくないときは、透け感のあるシアーな発色と、自唇の血色感を引き立てる粘膜ベージュ・ピンクを選ぶのが最大のポイントです。

---

### 失敗ゼロのおすすめ万能リップ
- **オペラ リップティント N**: 透ける発色でどんな肌色の人でも失敗なく血色感を足せる
- **KATE リップモンスター 03 陽炎**: 粘膜系ロゼベージュで誰が塗っても自然に美唇化
`
  },
  {
    id: 'blog-personal-color-pink-coral-brown-comparison',
    slug: 'personal-color-pink-coral-brown-comparison',
    title: 'ピンク・コーラル・ブラウン｜似合うリップを比較',
    subtitle: 'ピンク・コーラル・ブラウンの3大人気カラーの印象・肌映え効果と似合うタイプを徹底比較！',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-makeup-romand-meltbalm.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ピンク、コーラル、ブラウン、私にはどれが似合う？」3大王道カラーが与える印象と、パーソナルカラー別の似合わせ方を比較解説！',
    recommendedItemCodes: [
      "art-topic-makeup-romand-meltbalm",
      "romand-juicy-lasting-tint",
      "cezanne-lip-color-shield"
    ],
    isHallOfFame: false,
    contentMarkdown: `## 3大カラーが与える印象と向き不向き

1. **ピンク（可愛らしさ・青み透明感）**: ブルベ夏・ブルベ冬に映える王道カラー。
2. **コーラル（多幸感・健康的な明るさ）**: イエベ春・明るい肌に映える多幸感カラー。
3. **ブラウン（こなれ感・大人っぽさ）**: イエベ秋・おしゃれ派に映えるアンニュイカラー。
`
  },
  {
    id: 'blog-personal-color-office-makeup-top10',
    slug: 'personal-color-office-makeup-top10',
    title: 'オフィスメイクに使いやすい｜肌なじみリップ10選',
    subtitle: '「職場・面接・好印象メイクに必須」品良く浮かない肌馴染みローズ＆ピンクベージュ10選！',
    targetGender: 'female',
    coverImage: '/images/products/cezanne_liptint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「派手すぎる色はNGだけど血色感は欲しい」「オフィスで品良く好印象を与えたい」仕事用メイクにぴったりな好印象肌馴染みリップ10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "cezanne-lip-color-shield",
      "kate-lip-monster-03",
      "opera-lip-tint-n",
      "art-topic-lip-kate-lipmonster-base"
    ],
    isHallOfFame: true,
    contentMarkdown: `## オフィスメイクで選ぶべきリップの3条件

- **主張しすぎないコーラルベージュ・モーヴピンク**
- **マスクやグラスに色移りしにくい密着感**
- **乾燥したオフィスでも潤いが続く保湿力**

---

### オフィスメイクおすすめ品格リップ
- **セザンヌ リップカラーシールド**: 上品なツヤと肌馴染みカラーで仕事中も好印象をキープ
- **KATE リップモンスター 03 陽炎**: 派手にならず口元を美しく補正するオフィスの定番
`
  },
  {
    id: 'blog-personal-color-flush-blood-color-top10',
    slug: 'personal-color-flush-blood-color-top10',
    title: '血色感が欲しい人へ｜自然に仕上がるリップ10选',
    subtitle: '「すっぴん・ノーファンデでも浮かない」顔色を一瞬でパッと明るく見せる自然な血色リップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-fwee-puddingpot.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「唇の色が薄くて顔色が悪く見える」「ノーファンデの日でも血色感が欲しい」すっぴんや薄顔でも自然に血色感を底上げしてくれる優秀リップ10選を紹介！',
    recommendedItemCodes: [
      "art-topic-lip-fwee-puddingpot",
      "art-topic-makeup-immeme-pepbalm",
      "opera-lip-tint-n",
      "art-topic-lip-cezanne-3djelly"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 血色感を演出する「じゅわっと滲み出る発色」

すっぴんやナチュラルメイクで血色感を出すには、ベタッと塗るのではなく、唇の内側から血色が滲み出るようなバームやマルチバームが効果的です。

---

### 自然な血色感を与えるおすすめリップ
- **fwee リップアンドチーク ブラーパンディングポット**: 唇と頬にポンポン塗るだけでじゅわっと自然な血色感
- **アイムミミ マルチペップバーム**: リップ＆チークに使える絵の具バームで健康的な血色をチャージ
`
  },
  {
    id: 'blog-personal-color-brighten-complexion-comparison',
    slug: 'personal-color-brighten-complexion-comparison',
    title: '顔色が明るく見える？｜人気リップをカラー別に比較',
    subtitle: '「塗った瞬間に肌がワントーン明るくなる」くすみを飛ばすカラー別リップ明るさ比較！',
    targetGender: 'female',
    coverImage: '/images/products/romand_tint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「夕方になると肌がどんよりくすむ」「リップ1本で美肌に見せたい」肌のトーンアップ効果とくすみ飛ばし効果が高いリップカラーを比較まとめ！',
    recommendedItemCodes: [
      "romand-juicy-lasting-tint",
      "art-topic-lip-hince-rawglow",
      "kate-lip-monster-03",
      "art-topic-lip-dior-foreverliquid"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 肌が美しくトーンアップするリップのカラー補正力

リップのくすみ補正効果は絶大です！肌の黄色みが強い人はコーラルで血色を足し、肌の赤みやくすみが気になる人は青みローズで透明感をプラスすることで肌全体が明るく見えます。

---

### 肌を明るく魅せるおすすめカラー
- **【イエベ向け】ロムアンド ジューシーラスティングティント**: 鮮やかなコーラルで多幸感ある明度アップ
- **【ブルベ向け】hince ロウグロウジェルティント**: 青みシアーピンクで肌の透明感を底上げ
`
  }
];

function addColorSelectionBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(colorSelectionBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('パーソナルカラー・色選び新規10記事を src/data.ts に追加しました。');
}

addColorSelectionBlogPosts();
