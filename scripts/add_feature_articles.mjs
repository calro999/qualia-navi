import fs from 'fs';

const newFeatureArticles = [
  {
    id: 'blog-summer-base-makeup-2026',
    slug: 'summer-base-makeup-2026',
    title: '【2026年最新】猛暑でも崩れない！鉄壁ベースメイク＆最強日焼け止め徹底比較特集',
    subtitle: '滝汗・皮脂蒸れ・擦れに耐え抜く！デパコス・プチプラの実力派UV＆ファンデーション全6商品をQualia美容分析室が実地検証。',
    targetGender: 'unisex',
    coverImage: '/images/products/anessa_gold_milk.jpg',
    authorId: 'author-tacma',
    authorName: '蓮見 拓真',
    authorRole: '統括編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-07',
    readTimeMinutes: 12,
    introText: '「夏の猛暑でファンデがドロドロ」「日焼け止めを塗っても焼ける・崩れる」とお悩みの方へ。Qualia美容分析室が実地検証で証明した、2026年最強の鉄壁ベースメイク＆日焼け止め特集をお届けします。',
    recommendedItemCodes: ["art-b0csb4y3c7", "art-topic-suncare-kanebo-veilofday", "art-topic-makeup-decorte-zenwear", "art-topic-makeup-nars-reflecting", "art-topic-makeup-pauljoe-settingpowder", "art-topic-makeup-cledepeau-voir"],
    isHallOfFame: true,
    contentMarkdown: `## 猛暑の汗・皮脂に負けない「鉄壁ベースメイク」の選び方

最高気温35℃を超える日本の猛暑。エアコンの乾燥と外気の皮脂・汗による「ダブルの崩れ」に耐えるには、UVカット膜の耐久性とパウダーの密着力が重要です。

### 特集厳選アイテム
- **アネッサ パーフェクトUV スキンケアミルク NA**: 汗・水・摩擦に強く猛暑日でも絶対焼かない
- **KANEBO ヴェイル オブ デイ**: 夕方まで乾かない圧倒的補水力と高UVカット
- **コスメデコルテ ZEN ウェア フルイド**: 24時間崩れないスミ肌仕上がり
- **NARS ライトリフレクティング パウダー**: テカリ・皮脂を無力化するサラサラ仕上がり
- **クレ・ド・ポー ボーテ ヴォワールコレクチュール n**: 塗った瞬間から美肌フィルターをかける至高の下地
`
  },
  {
    id: 'blog-pore-care-skincare-2026',
    slug: 'pore-care-skincare-2026',
    title: '【毛穴・角栓・テカリ撃退】2026年最新！実力派スキンケア＆酵素洗顔おすすめ大特集',
    subtitle: '黒ずみ毛穴・皮脂づまり・ザラつきを根本から解消。毛穴悩みに即効アプローチする美容液＆洗顔特集。',
    targetGender: 'women',
    coverImage: '/images/products/vt_reedle.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-07',
    readTimeMinutes: 10,
    introText: '夏場に急増する「毛穴の開き」「黒ずみ」「角栓詰まり」。話題のマイクロニードル美容液から酵素洗顔、高濃度ビタミンCまで、毛穴悩みをリセットする実力派アイテムを完全網羅。',
    recommendedItemCodes: ["art-topic-skincare-suisai-powder", "art-topic-skincare-obagi-cpowder", "art-topic-skincare-kose-clearpeel", "art-topic-skincare-obagi-c25", "art-topic-skincare-takami-skinpeel", "art-topic-kbeauty-vt-reedle"],
    isHallOfFame: true,
    contentMarkdown: `## 毛穴悩みの原因別・おすすめアプローチ

毛穴トラブルは「皮脂分泌過多」「角栓詰まり」「たるみ毛穴」に大別されます。

- **角栓・黒ずみ毛穴**: オバジC 酵素洗顔パウダー / suisai パウダーウォッシュ N
- **ゴワつき・拭き取り美容**: ONE BY KOSÉ クリアピール セラム / タカミスキンピール
- **キメ・美容成分浸透**: VT リードルショット 100 / オバジC25セラム ネオ
`
  },
  {
    id: 'blog-lip-tint-summer-2026',
    slug: 'lip-tint-summer-2026',
    title: '【落ちないツヤ唇】2026年最新おすすめリップ＆ティント厳選比較特集',
    subtitle: 'コップにつきにくい！マスク擦れや飲食でも美発色が続く大人気ツヤリップ＆バーム総まとめ。',
    targetGender: 'women',
    coverImage: '/images/products/kate_lipmonster.jpg',
    authorId: 'author-matsumoto',
    authorName: '松本 結衣',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-07',
    readTimeMinutes: 10,
    introText: '「食事のたびに塗り直すのが面倒」「縦ジワや乾燥が気になる」そんな悩みを解消する、色持ち＆潤いを両立した2026年最新のリップ特集。',
    recommendedItemCodes: ["art-topic-lip-kate-lipmonster", "art-topic-lip-romand-tint", "art-topic-lip-dior-lipmaximizer", "art-topic-lip-dior-foreverliquid", "art-topic-lip-hince-rawglow"],
    isHallOfFame: true,
    contentMarkdown: `## 落ちないツヤリップ比較一覧

落ちにくさ・ツヤ感・カラーバリエーションを総合評価した厳選リップ特集。

- **KATE リップモンスター**: 落ちにくさNo.1！ジェル膜が唇を密着カバー
- **ロムアンド ジューシーラスティングティント**: 果汁のようなみずみずしいツヤと発色
- **ディオール リップ マキシマイザー**: ヒアルロン酸配合でふっくらボリューム
- **hince ロウグロウジェルティント**: 清涼感のあるツヤと韓国トレンドの粘膜カラー
`
  }
];

function addFeatureArticlesToData() {
  const dataPath = '/Users/calro/Downloads/raku-cosme/src/data.ts';
  let content = fs.readFileSync(dataPath, 'utf-8');

  const targetStr = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const targetIdx = content.indexOf(targetStr);
  if (targetIdx === -1) {
    console.error('INITIAL_BLOG_POSTS が見つかりませんでした。');
    return;
  }

  const insertPos = targetIdx + targetStr.length;
  const jsonStr = JSON.stringify(newFeatureArticles, null, 2).slice(1, -1);

  const updatedContent = content.slice(0, insertPos) + '\n' + jsonStr + ',' + content.slice(insertPos);

  fs.writeFileSync(dataPath, updatedContent, 'utf-8');
  console.log('新規特集ブログ記事3件を src/data.ts に追加しました。');
}

addFeatureArticlesToData();
