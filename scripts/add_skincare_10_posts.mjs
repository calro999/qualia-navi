import fs from 'fs';

const skincareBlogPosts = [
  {
    id: 'blog-skincare-toner-guide-by-concern',
    slug: 'skincare-toner-guide-by-concern',
    title: '乾燥・毛穴・ベタつき悩み別｜化粧水の選び方',
    subtitle: '乾燥・毛穴の目立ち・皮脂ベタつきなど、肌悩み別に最も効果的な化粧水の成分と選び方を徹底解説！',
    targetGender: 'unisex',
    coverImage: '/images/products/ipsa_aqua.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「自分の肌悩みに合った化粧水がわからない」とお悩みの方へ。カサつき乾燥・キメの乱れ毛穴・テカリベタつきなど、悩みに応じた成分設計とおすすめ化粧水を楽天API連携データで解説！',
    recommendedItemCodes: [
      "ipsa-the-time-r-aqua",
      "art-topic-skincare-drcilabo-vc100",
      "art-topic-skincare-albion-skincon",
      "orbis-u-essence-lotion"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 肌悩みに合わせた「成分と質感」の選び方

化粧水はスキンケアの基本！自分の肌状態に合わない化粧水を使っていると、乾燥が酷くなったり皮脂が過剰分泌したりする原因になります。

### 悩み別選び方の法則
1. **乾燥・カサつき**: ヒアルロン酸・セラミド・発酵液配合のとろみ保湿化粧水
2. **キメの乱れ・毛穴引き締め**: ビタミンC誘導体・アミノ酸配合の浸透ケア化粧水
3. **テカリ・ベタつき**: 薬用ハトムギ・アルコールフリーのサラッとみずみずしい化粧水

---

### 楽天API厳選！悩み別おすすめ化粧水
- **イプサ ザ タイムR アクア**: 肌表面に水分ベールを作り皮脂と水分のバランスを保つロングセラー
- **ドクターシーラボ VC100エッセンスローションEX**: 高浸透ビタミンCで毛穴をキュッと引き締め透明感をケア
- **アルビオン 薬用スキンコンディショナー N**: ハトムギオイル配合で肌荒れやベタつきを爽やかに防ぐ
`
  },
  {
    id: 'blog-skincare-toner-top10-comparison',
    slug: 'skincare-toner-top10-comparison',
    title: 'しっとり・さっぱり・高保湿｜人気化粧水10選を比較',
    subtitle: 'デパコス殿堂入り化粧水から実力派プチプラまで、テクスチャーと保湿力を徹底比較！',
    targetGender: 'unisex',
    coverImage: '/images/products/art-topic-skincare-albion-floradrip.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「しっとり系とさっぱり系、どっちが良い？」「話題の化粧水の実際の浸透感は？」人気化粧水10選の質感・保湿持続性・浸透感を徹底比較！',
    recommendedItemCodes: [
      "art-topic-skincare-albion-floradrip",
      "orbis-u-essence-lotion",
      "anua-heartleaf-77-soothing-toner",
      "shirojyun-premium-lotion"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 質感（しっとり・さっぱり・濃密）ごとの特徴と比較

- **しっとり濃密タイプ**: とろみのある液が角層まで浸透し、モチモチ肌へ導く
- **みずみずしいさっぱりタイプ**: バシャバシャ使えて肌にすっと馴染み、ベタつきゼロ

---

### テクスチャー別おすすめ化粧水
- **【濃密発酵液】アルビオン フローラドリップ**: 5種のハーブ発酵液がごわつく肌を解きほぐす
- **【みずみずしい沈静】Anua ドクダミ 77% スージングトナー**: バシャバシャ使えて火照りや赤みを優しく抑える
`
  },
  {
    id: 'blog-skincare-deep-moist-toner-top10',
    slug: 'skincare-deep-moist-toner-top10',
    title: '乾燥が気になる人向け｜高保湿化粧水10選',
    subtitle: '「夕方になってもカサつかない」砂漠肌・粉吹き肌を解きほぐす圧倒的高保湿化粧水10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/orbis_u.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「洗顔後すぐに肌が突っ張る」「重ね塗りしても乾燥する」頑固な乾燥にお悩みの方へ。角層まで潤いをチャージする高保湿化粧水10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "orbis-u-essence-lotion",
      "art-topic-skincare-albion-floradrip",
      "ipsa-the-time-r-aqua",
      "curel-face-cream"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 重ね塗りでうるおいバリアを作る高保湿ケア

超乾燥肌には、一度塗りだけでなく「2〜3回の重ねづけ」が効果的！水分と美容成分を段階的に浸透させることで、外部刺激に強いモチ肌が完成します。

---

### 高保湿おすすめ化粧水
- **オルビス ユー エッセンスローション**: 届けて・溜めて・閉じ込める「とろみ密着膜」で乾燥を防御
- **アルビオン フローラドリップ**: 濃厚なハーブ発酵エキスでしっとりキメの整った肌へ
`
  },
  {
    id: 'blog-skincare-fresh-light-toner-top10',
    slug: 'skincare-fresh-light-toner-top10',
    title: 'ベタつきが苦手な人へ｜さっぱり系化粧水10選',
    subtitle: '「塗った後すぐサラサラ」「油分によるニキビ・テカリを防ぐ」みずみずしいさっぱり化粧水10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/anua_toner.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「重いスキンケアはニキビができる」「ペタペタ感が嫌い」という方向け！水のように軽やかで素早く浸透し、肌をサラッと整えるさっぱり系化粧水10選を紹介！',
    recommendedItemCodes: [
      "anua-heartleaf-77-soothing-toner",
      "art-topic-skincare-albion-skincon",
      "orbis-clearful-lotion"
    ],
    isHallOfFame: true,
    contentMarkdown: `## さっぱり系でも水分補給はしっかり叶う！

「さっぱり＝うるおわない」は間違い。油分を抑えつつ水分のみをダイレクトに角層へ届ける化粧水なら、ベタつき感ゼロで整った透明肌になれます。

---

### さっぱりおすすめ化粧水
- **Anua ドクダミ 77% スージングトナー**: バシャバシャ使えて肌の赤みや皮脂トラブルを優しくケア
- **アルビオン 薬用スキンコンディショナー N**: 清涼感のある使い心地で毛穴を引き締め肌荒れ防止
`
  },
  {
    id: 'blog-skincare-emulsion-comparison',
    slug: 'skincare-emulsion-comparison',
    title: '毎日使いやすい？｜人気乳液を使用感で比較',
    subtitle: '化粧水の水分を閉じ込める！ベタつかず毎日の保湿に使いやすい人気乳液＆ミルク使用感比較。',
    targetGender: 'unisex',
    coverImage: '/images/products/neutrogena_body.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「乳液を塗るとメイクが崩れる」「塗らないと乾燥する」乳液選びに迷う方必見！みずみずしいミルクから濃厚エマルジョンまで、使用感と密着力で比較解説！',
    recommendedItemCodes: [
      "elixir-brightening-lotion-wt",
      "neutrogena-intense-repair-body-emulsion",
      "curel-face-cream"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 乳液の役割は「油分バリアで水分の蒸発を防ぐこと」

せっかく化粧水で水分を与えても、乳液で蓋をしなければ数分で乾燥してしまいます！すっと伸びてベタつかないミルクタイプがデイリー使いにおすすめです。

---

### おすすめ乳液＆保湿ミルク
- **エリクシール ブライトニング エマルジョン**: 潤いと透明感を与えながらハリのある肌へ導く
- **キュレル 潤浸保湿 クリーム**: 敏感肌にもやさしいセラミド配合の軽やか高保湿ケア
`
  },
  {
    id: 'blog-skincare-serum-selection-by-concern',
    slug: 'skincare-serum-selection-by-concern',
    title: '美容液はどう選ぶ？｜肌悩み別おすすめ美容液10選',
    subtitle: '乾燥・ハリ不足・毛穴ケア・キメの乱れに！悩み別で最もアプローチできる人気美容液10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/decorte_liposome.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「美容液って本当に必要？」「どれを買えばいいかわからない」お悩み集中ケアの主役である美容液の選び方とおすすめ10選を楽天API連携で徹底解説！',
    recommendedItemCodes: [
      "decorte-liposome-repair-serum",
      "art-topic-skincare-obagi-c25",
      "art-topic-skincare-anua-peachserum",
      "art-topic-skincare-vt-pdrnessence",
      "shiseido-ultimune-powerizing-concentrate"
    ],
    isHallOfFame: true,
    contentMarkdown: `## スキンケアの質を高める美容液の役割

美容液は、高濃度の有効成分や美容成分が凝縮された集中ケアアイテム。化粧水と乳液の間にプラスすることで、肌トラブルへの手応えが劇的に変わります。

---

### 悩み別おすすめ美容液
- **コスメデコルテ リポソーム アドバンスト リペアセラム**: 1滴に1兆個の微細カプセル！乾燥肌を根本から救う最高峰セラム
- **オバジC25セラム ネオ**: 高濃度ピュアビタミンCで毛穴・キメ・ハリに多角アプローチ
- **Anua 桃70％ナイアシンセラム**: 肌のキメを整えツヤあふれるなめらかな素肌へ
`
  },
  {
    id: 'blog-skincare-pore-dryness-texture-serum-guide',
    slug: 'skincare-pore-dryness-texture-serum-guide',
    title: '毛穴・乾燥・キメの乱れが気になる人へ｜美容液の選び方',
    subtitle: '乾燥による毛穴の目立ちやキメの乱れをケア！なめらかな素肌へ導く美容液の選び方ガイド。',
    targetGender: 'unisex',
    coverImage: '/images/products/vt_reedle.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「毛穴が目立つ」「肌のキメが乱れてメイクが乗らない」とお悩みの方へ。導入美容液や美容針成分配合のセラムなど、角層を整える効果的なケアを紹介！',
    recommendedItemCodes: [
      "vt-reedle-shot-100",
      "art-topic-skincare-takami-skinpeel",
      "art-topic-skincare-kose-clearpeel"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 毛穴目立ちやキメの乱れは「角層整肌ケア」がカギ！

肌の表面が固くゴワついていると、美容成分が奥まで入っていきません。角質をやさしくケアする角質美容水や針美容液を仕込むのが成功の近道です。

---

### キメ整えおすすめ美容液
- **VT リードルショット 100**: 美容針（シリカ）が美容成分の道を作り角層までダイレクト浸透
- **タカミスキンピール**: 剥がさない角質美容水で毎日優しくキメを整えて整肌ケア
`
  },
  {
    id: 'blog-skincare-morning-night-routine',
    slug: 'skincare-morning-night-routine',
    title: '朝と夜で使い分け｜スキンケアアイテムの選び方',
    subtitle: '朝は「紫外線防護＆崩れ防止」、夜は「ダメージ補修＆高保湿」使い分けで素肌力を底上げ！',
    targetGender: 'unisex',
    coverImage: '/images/products/saborino_morning.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「朝と夜、同じスキンケアを使っていいの？」実は朝と夜では肌が求める役割が異なります。朝・夜の目的に合わせた賢い使い分けテクニックを解説！',
    recommendedItemCodes: [
      "saborino-morning-mask",
      "decorte-liposome-repair-serum",
      "elixir-daycare-revolution-toneup"
    ],
    isHallOfFame: true,
    contentMarkdown: `## 朝と夜のスキンケアの目的の違い

- **朝のスキンケア**: 日中の紫外線・乾燥・刺激からの「保護」と「メイク崩れ防止」
- **夜のスキンケア**: 日中受けたダメージの「補修」と「濃密保湿による再生」

---

### 朝夜おすすめ時短＆集中ケア
- **【朝】サボリーノ 目ざまシート**: 洗顔＋スキンケア＋保湿下地が60秒で完了する時短朝マスク
- **【夜】コスメデコルテ リポソーム**: 睡眠中にカプセルが徐々に解き放たれ翌朝モチモチ肌へ
`
  },
  {
    id: 'blog-skincare-drugstore-top10',
    slug: 'skincare-drugstore-top10',
    title: 'ドラッグストアで人気｜使いやすいスキンケア10選',
    subtitle: 'ドラッグストアで手に入る！コスパ最強＆成分にこだわり抜かれた実力派スキンケア10選。',
    targetGender: 'unisex',
    coverImage: '/images/products/melanocc_premium.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 10,
    introText: '「手軽にドラッグストアで買いたい」「惜しみなくバシャバシャ使いたい」ドラッグストアで買える名品スキンケア10選を楽天API連携で紹介！',
    recommendedItemCodes: [
      "melanocc-concentrated-brightening-premium-serum",
      "shirojyun-premium-lotion",
      "curel-face-cream",
      "art-topic-skincare-obagi-cpowder"
    ],
    isHallOfFame: true,
    contentMarkdown: `## ドラッグストアコスメは成分進化が止まらない！

近年のドラッグストアコスメは、有効成分（ビタミンC誘導体・トラネキサム酸・セラミド等）が高濃度配合され、デパコス級の手応えを感じられる名品が揃っています。

---

### ドラッグストア人気おすすめアイテム
- **メラノCC プレミアム美容液**: ピュアビタミンC配合で気になる箇所を集中的にクリアケア
- **白潤プレミアム 薬用浸透美白化粧水**: 美白有効成分トラネキサム酸配合でうるおいと透明感を両立
- **オバジC 酵素洗顔パウダー**: ビタミンCと2つの酵素で毛穴の黒ずみ・角栓を分解洗浄
`
  },
  {
    id: 'blog-skincare-basic-steps-comparison',
    slug: 'skincare-basic-steps-comparison',
    title: '化粧水・乳液・美容液を比較｜スキンケアの基本の選び方',
    subtitle: '化粧水・乳液・美容液のそれぞれの役割と正しい塗る順番、効果を極限まで高める基礎ガイド！',
    targetGender: 'unisex',
    coverImage: '/images/products/fancl_cleansing.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-09',
    readTimeMinutes: 11,
    introText: '「スキンケアの塗る順番がわからない」「化粧水だけで済ませても良い？」クレンジングから美容液、乳液までの基本ステップと役割を分かりやすく解説！',
    recommendedItemCodes: [
      "fancl-mild-cleansing-oil",
      "ipsa-the-time-r-aqua",
      "decorte-liposome-repair-serum",
      "curel-face-cream"
    ],
    isHallOfFame: true,
    contentMarkdown: `## スキンケアの正しい基本ステップ

1. **クレンジング・洗顔**: 塗る前に汚れと不要な皮脂を落とす
2. **導入美容液 / 角質ケア**: 美容成分の浸透ルートを作る
3. **化粧水**: 角層へ水分をダイレクト補給
4. **美容液**: お悩みに合わせた成分を集中チャージ
5. **乳液・クリーム**: 油分膜で水分の蒸発を防ぎ密閉

---

### 基礎スキンケアのおすすめ組み合わせ
- **【クレンジング】ファンケル マイルドクレンジング オイル**: まつエクOK！毛穴の詰まりもスルスル落とす
- **【化粧水】イプサ ザ タイムR アクア**: みずみずしい水分膜で肌を整える
- **【乳液・クリーム】キュレル 潤浸保湿クリーム**: バリア機能をサポートしてしっかり密閉
`
  }
];

function addSkincareBlogPosts() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(skincareBlogPosts, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('スキンケア新規10記事を src/data.ts に追加しました。');
}

addSkincareBlogPosts();
