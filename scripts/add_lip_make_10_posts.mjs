import fs from 'fs';

const lipMakeBlogPosts = [
  {
    id: 'blog-lip-top10-comparison-stay-shine',
    slug: 'lip-top10-comparison-stay-shine',
    title: '落ちにくさ・ツヤ・発色で比較｜人気リップ10本',
    subtitle: '「バズりすぎて入手困難」なバズリップからデパコス最高峰まで、落ちにくさ・ツヤ・発色を全方位比較！',
    targetGender: 'female',
    coverImage: '/images/products/kate_lipmonster.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「落ちない・荒れない・可愛い」を叶えるリップを探している方へ！SNSで社会現象となったバズリップから韓国ヒットティントまで、落ちにくさ・ツヤ・発色を楽天API連携データで徹底比較！',
    recommendedItemCodes: [
      "kate-lip-monster-03",
      "romand-juicy-lasting-tint",
      "art-topic-lip-dior-lipmaximizer",
      "art-topic-makeup-romand-meltbalm",
      "cezanne-lip-color-shield"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 落ちにくさ・ツヤ・発色を兼ね備えた「神リップ」の選び方

リップ選びで最も大切なのは、「つけたての美しさがどれくらい持続するか」と「乾かない保湿感」のバランスです。ジェル膜形成タイプや水光ティントがトレンドの主役！

---

### 楽天API連携！人気リップ比較
- **KATE リップモンスター 03 陽炎**: 吐息や水分を活かして密着ジェル膜に変える伝説の落ちないリップ
- **ロムアンド ジューシーラスティングティント**: 果汁のような高い発色とクリアなツヤ感が長時間持続
- **ディオール アディクト リップ マキシマイザー**: カプサイシン効果で唇をぷっくりボリュームアップ
`
  },
  {
    id: 'blog-lip-selection-shine-matte-tint',
    slug: 'lip-selection-shine-matte-tint',
    title: 'ツヤ・マット・ティントを比較｜自分に合うリップの選び方',
    subtitle: 'ツヤ感・マット・水光ティントの質感違いと魅力を徹底解剖！自分の唇に馴染む質感の見つけ方。',
    targetGender: 'female',
    coverImage: '/images/products/kate_souffle.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ツヤ系とマット系、どっちが似合う？」「ティントって乾燥しない？」リップの3大質感（ツヤ・マット・ティント）の仕上がり・向き不向きを比較解説！',
    recommendedItemCodes: [
      "kate-lip-monster-souffle-matte",
      "laka-bonding-glow-lipstick",
      "art-topic-lip-hince-rawglow"
    ],
    isHallOfFame: false,
    contentMarkdown: `## 3大質感（ツヤ・マット・ティント）のメリット＆選び方

### 1. ツヤ・バーム系（うるおい＆縦ジワ補正）
- **仕上がり**: むっちりぷるんとした立体感。
- **おすすめ**: 乾燥唇・縦ジワが気になる人、ナチュラルメイク派。

### 2. マット・スフレ系（すりガラスのような質感）
- **仕上がり**: じゅわっと滲むスタイリッシュな質感。
- **おすすめ**: 垢抜け韓国メイク・モードな雰囲気が好きな人。

### 3. 水光ティント系（高発色＆着色持続）
- **仕上がり**: 水滴を垂らしたようなシアーなツヤと着色力。
- **おすすめ**: 食事をしても色を残したい人・塗り直しができない日。
`
  },
  {
    id: 'blog-lip-long-lasting-top10',
    slug: 'lip-long-lasting-top10',
    title: '色持ち重視ならどれ？｜落ちにくいリップ10選',
    subtitle: '「飲み物を飲んでもカップに色移りしない」色持ち最強のロングラスティングリップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-dior-foreverliquid.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「塗り直す時間がない」「飲み会や仕事でも色を保ちたい」色持ちを何より重視する方のための落ちにくい高密着リップ10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "art-topic-lip-dior-foreverliquid",
      "kate-lip-monster-03",
      "bbia-low-tint",
      "opera-lip-tint-n",
      "cezanne-lip-color-shield"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 色持ち最強リップは「水分フィックス」と「ジェル膜密着」！

落ちないリップの最新トレンドは、塗った後数分置くことで唇の表面に透明なフィックス膜（オイル・水分ベール）が形成されるタイプです。

---

### 色持ち重視のおすすめリップ
- **ルージュ ディオール フォーエヴァー リキッド**: マスクやカップに絶対つかないと話題の落ちないデパコス最高峰
- **Bbia ローティント**: 水のように軽いのにティッシュオフしても色合いがずっと残る韓国バズりティント
- **オペラ リップティント N**: 唇の水分に反応して血色感をキープするオイルティント
`
  },
  {
    id: 'blog-lip-moisturizing-and-color-top10',
    slug: 'lip-moisturizing-and-color-top10',
    title: '乾燥しにくさ・発色で比較｜人気リップ10本',
    subtitle: '「皮むけしない・リップクリーム不要」保湿成分たっぷりのうるおい高発色リップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-laneige-lipsleeping.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ティントを使うと唇がカサつく」「乾燥で皮むけしやすい」とお悩みの方へ。美容液オイルやヒアルロン酸配合で、一日中潤いと美発色が続く高保湿リップ10選を比較！',
    recommendedItemCodes: [
      "art-topic-makeup-romand-meltbalm",
      "laka-bonding-glow-lipstick",
      "art-topic-lip-fwee-puddingpot",
      "art-topic-lip-cezanne-3djelly"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 乾燥させない高発色リップの絶対条件

「発色は欲しいけれど唇が荒れる」を防ぐには、アルガンオイルやヒアルロン酸、ワセリン級の保湿オイルがベースになっているバームリップが最適です。

---

### 乾燥しにくい高保湿バームリップ
- **ロムアンド グラスティング メルトバーム**: 保湿美容オイルが唇の上でとろけて潤い膜を形成
- **Laka ボンディンググロウリップスティック**: 体温でとろけるガラス玉のような輝きと濃密保湿
- **セザンヌ 3Dジェリーリップ**: 縦ジワを埋めるぷるぷるの厚みツヤ膜で唇を保護
`
  },
  {
    id: 'blog-lip-meal-proof-tint-comparison',
    slug: 'lip-meal-proof-tint-comparison',
    title: '食事をしても落ちにくい？｜人気ティントを比較',
    subtitle: 'ランチや飲み会でも血色感を死守！食事に強い人気水光ティント＆オイルティント比較。',
    targetGender: 'female',
    coverImage: '/images/products/romand_tint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「ご飯を食べたらリップが全部消えて血色がなくなった…」という悲劇を防止！油分や油分を含む食事でも色が残り続ける耐久ティントを徹底比較！',
    recommendedItemCodes: [
      "romand-juicy-lasting-tint",
      "bbia-low-tint",
      "art-topic-lip-hince-rawglow",
      "art-topic-lip-cezanne-waterytint"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 食事に強いティントの秘密は「角質着色効果」！

一般的な口唇表面にのせるだけのリップと異なり、ティントは角質層の水分に反応して発色するため、食べ物が触れても色が落ちにくい構造になっています。

---

### 食事に強いおすすめティント
- **ロムアンド ジューシーラスティングティント**: 食べ終わった後も自唇のような自然な血色感が残る
- **Bbia ローティント**: カスタムボトルが可愛い！軽やかな水フィックスで食事耐久テストクリア
- **セザンヌ ウォータリーティントリップ**: 濡れツヤ感が持続し、拭き取っても色合いキープ
`
  },
  {
    id: 'blog-lip-natural-top10-for-daily',
    slug: 'lip-natural-top10-for-daily',
    title: 'ナチュラル派におすすめ｜使いやすいリップ10選',
    subtitle: '「すっぴん風・オフィス・オフィスカジュアルに馴染む」元から血色が良い人に見せる粘膜リップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/opera_liptint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「濃いリップは浮いてしまう」「学校や職場でも自然に使いたい」ナチュラルメイク派のための、肌馴染み抜群なピンクベージュ・粘膜カラーのリップ10選を紹介！',
    recommendedItemCodes: [
      "opera-lip-tint-n",
      "cezanne-lip-color-shield",
      "kate-lip-monster-03",
      "art-topic-lip-kate-lipmonster-base"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 元から美唇に見せる「粘膜カラー」の選び方

ナチュラル派におすすめなのは、自分の元々の唇の色に近い「粘膜ピンク」「コーラルベージュ」です。鏡を見ずにサッと塗れて血色感を底上げしてくれます。

---

### ナチュラル使いやすいおすすめリップ
- **オペラ リップティント N**: 透けるような彩りで元から唇が綺麗な人に見せるシアーリップ
- **セザンヌ リップカラーシールド**: ワンコイン以下で手に入る！自然なツヤと血色感を与えるシアーカラー
- **KATE リップモンスター 03 陽炎**: 淡いロゼベージュでオフィスや日常使いに最適
`
  },
  {
    id: 'blog-lip-elegant-colors-for-adults',
    slug: 'lip-elegant-colors-for-adults',
    title: '大人っぽく仕上がる｜上品カラーのリップ10選',
    subtitle: '「くすみを払拭して洗練された大人顔へ」30代・40代にも似合う大人上品リップ10選。',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-dior-lipmaximizer.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「大人になるとこれまでのリップが似合わなくなった…」顔全体の印象を引き締め、肌のくすみを払拭する洗練された上品ローズ・ブラウンベージュリップ10選を紹介！',
    recommendedItemCodes: [
      "art-topic-lip-dior-lipmaximizer",
      "art-topic-lip-dior-foreverliquid",
      "kate-lip-monster-03",
      "laka-bonding-glow-lipstick"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 大人の口元を上品に美しく魅せるリップの法則

大人の唇は年齢とともにくすみやボリュームダウンが起こりがち。適度なツヤ感と、深みのあるローズブラウンやモーヴカラーを選ぶことで一気に洗練された印象になります。

---

### 大人上品おすすめリップ
- **ディオール アディクト リップ マキシマイザー**: 上品なツヤとハリ感を与え、大人の口元をボリューミーに補正
- **ルージュ ディオール フォーエヴァー リキッド**: マットなのに乾かず、洗練された大人のエレガンスを演出
`
  },
  {
    id: 'blog-lip-plump-shine-top10',
    slug: 'lip-plump-shine-top10',
    title: 'ツヤ感で選ぶ｜ぷるんと仕上がる人気リップ10選',
    subtitle: '「縦ジワ消滅・ぷるぷるガラス玉リップ」光を反射してぷっくり魅せる人気ツヤリップ10選！',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-lip-hince-rawglow.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「水滴を垂らしたような圧倒的ツヤ感が欲しい！」縦ジワを光で飛ばし、むっちりぷるんとした立体感を作るバズりツヤリップ10選を徹底比較！',
    recommendedItemCodes: [
      "art-topic-lip-hince-rawglow",
      "art-topic-makeup-romand-meltbalm",
      "art-topic-lip-cezanne-3djelly",
      "art-topic-lip-fwee-puddingpot"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 光を反射する「水光フィルム」で立体ツヤ唇

最新の韓国トレンドは、塗った瞬間にオイルのクリア層が浮き上がり、表面を膜で包み込む「ガラス膜ツヤ」です。

---

### ぷるぷるツヤ仕上がりおすすめリップ
- **hince ロウグロウジェルティント**: 澄んだ水光膜が包み込む、透明感あふれる最新ジェルティント
- **セザンヌ 3Dジェリーリップ**: ジェリーのようなぷっくり膜で縦ジワのないぷるん唇へ
`
  },
  {
    id: 'blog-lip-mask-proof-color-stay-comparison',
    slug: 'blog-lip-mask-proof-color-stay-comparison',
    title: 'マスクにつきにくい？｜人気リップを色持ちで比較',
    subtitle: '「マスクを外しても色がつかない・ベタつかない」落ちにくさ検証済みの人気リップ比較。',
    targetGender: 'female',
    coverImage: '/images/products/cezanne_liptint.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「マスクの内側にリップがつくのが嫌」「外した時に血色ゼロになるのを防ぎたい」マスク生活や仕事中でも色移りしない無敵リップを比較解説！',
    recommendedItemCodes: [
      "cezanne-lip-color-shield",
      "kate-lip-monster-03",
      "art-topic-lip-dior-foreverliquid"
    ],
    isHallOfFame: true,
    contentMarkdown: `## マスクにつかないリップの塗り方コツ

1. **リップを塗った後、2〜3分置く**: フィックス膜が形成されるまで触らない
2. **軽くティッシュオフ**: 余分な油分だけを除去し、着色層を残す

---

### マスクにつきにくいおすすめリップ
- **セザンヌ リップカラーシールド**: 油分と水分が反応して透明シールド膜を作り色移りを徹底防護
- **KATE リップモンスター**: マスクをつけても絶対に落ちないと大絶賛され続けるロングセラー
`
  },
  {
    id: 'blog-lip-daily-colors-top10-comparison',
    slug: 'lip-daily-colors-top10-comparison',
    title: '毎日使いやすい色は？｜人気リップ10本を比較',
    subtitle: '「1本持っておけば間違いない」オフィスカジュアル・休日・デートまで万能に使える人気色10選！',
    targetGender: 'female',
    coverImage: '/images/products/art-topic-makeup-immeme-pepbalm.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「毎朝のリップ選びで迷いたくない」「どんな服やメイクにも似合う1本が欲しい」毎日使えて絶対失敗しない万能王道カラー10選を比較紹介！',
    recommendedItemCodes: [
      "kate-lip-monster-03",
      "romand-juicy-lasting-tint",
      "opera-lip-tint-n",
      "art-topic-makeup-immeme-pepbalm"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 毎日使える「万能リップ」の条件とは？

- **パーソナルカラーを問わないコーラルピンク・粘膜ローズ**
- **鏡を見なくても塗れる程よい透け感と保湿力**

---

### 毎日使いたい万能王道リップ
- **KATE リップモンスター 03 陽炎**: どんな肌色・メイクにも馴染む万能ロゼベージュ
- **アイムミミ マルチペップバーム**: リップにもチークにも使えて1本で統一感のあるデイリーメイク完成
`
  }
];

function addLipMakeBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(lipMakeBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('リップ・メイク新規10記事を src/data.ts に追加しました。');
}

addLipMakeBlogPosts();
