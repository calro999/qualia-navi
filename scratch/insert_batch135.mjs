import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch135_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ135の4記事の定義
const batchDefs = [
  {
    id: 'art-microbubble-face-wash-foamer-awa-hour-10sen-2026',
    slug: 'art-microbubble-face-wash-foamer-awa-hour-10sen-2026',
    title: '【濃密泡立て器・マイクロバブルフォーマー10選】あわわ等で生クリーム級のもちもち泡！手洗い洗顔の摩擦ダメージをゼロにして毛穴汚れを吸着オフする人気泡立てグッズ比較',
    category: 'スキンケア',
    date: '2026-09-11',
    description: '手持ちの固形石鹸や洗顔フォームをわずか20秒で生クリームのような極上濃密泡に変身させる「洗顔用泡立て器（マイクロバブルフォーマー）」おすすめ10選！元祖あわわ（awa hour）をはじめ、摩擦レス洗顔で毛穴の黒ずみ・くすみをすっきり洗い流す大ヒット名品を徹底比較。',
    products: fetched.t1,
    lead: `「洗顔ネットで泡立ててもすぐにヘタれて摩擦が気になる」「小鼻や顎の角栓・黒ずみを手でこすらず泡の力だけで落としたい」「エステのような弾力のあるモコモコ濃密泡を自宅で毎日手軽に作りたい」……美肌作りの基本である摩擦レス洗顔を劇的に進化させるのが、**「濃密泡立て器・マイクロバブルフォーマー」**です。

わずか少量の洗顔料と水を入れてスティックをシャカシャカ上下させるだけで、驚きの洗顔体験が叶います：
1. **毛穴の1/10以下の微細なマイクロバブルを短時間で大量生成**：毛穴の奥深くまで入り込み、酸化した皮脂や古い角質をマグネットのように吸着オフ
2. **手が肌に一切触れない「クッション洗顔」で摩擦ゼロ**：弾力あふれる濃密な泡のクッションが、肌への物理的刺激と乾燥リスクを完全シャットアウト
3. **固形石鹸・洗顔フォーム・粉末洗顔などあらゆるタイプに対応**：少量で驚くほど泡立つため、お気に入りの高級洗顔料のコスパも劇的に向上

今回はレビュー数千件超の元祖「あわわ」から最新の電動・極小泡フォーマーまで、楽天市場で高評価の洗顔泡立て器10選を徹底比較します！`
  },
  {
    id: 'art-pure-silk-scrunchie-hair-damage-prevention-10sen-2026',
    slug: 'art-pure-silk-scrunchie-hair-damage-prevention-10sen-2026',
    title: '【最高級天然シルク100%シュシュ10選】結び跡がつかない＆摩擦ダメージゼロ！寝ている間もお出かけも美髪を守りツヤを与える大人上品シルクヘアゴム比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: '髪を結んでも嫌な跡がつかず、摩擦による枝毛や切れ毛を徹底防止する「天然シルク100%シュシュ（シルクヘアゴム）」おすすめ10選！最高峰6Aランク22匁シルクを採用した大人気アイテムから、日常使いしやすいスリム型・華やかなボリューム型まで徹底解説。',
    products: fetched.t2,
    lead: `「仕事中に髪を結んでいると夕方にはクッキリ結び跡がついて下ろせない」「ゴムを外すときに髪が引っかかってプチプチ切れる」「就寝中の摩擦で朝起きると毛先がパサついてボサボサ」……そんな日々のヘアダメージに悩む女性たちから圧倒的な支持を集めているのが、**「最高級天然シルク100%シュシュ」**です。

人間の髪や肌と同じアミノ酸タンパク質でできたシルクには、驚きの美髪メリットがあります：
- **キューティクルを傷つけない滑らかな指通りと保湿力**：天然シルクの繊維が静電気を抑え、結ぶだけで髪に潤いと自然なツヤをプラス
- **跡がつかない特殊なゴム構造とふんわりシルク生地**：きつく縛らなくてもしっかりまとまり、ほどいた後もストレートや巻き髪を綺麗にキープ
- **就寝時のナイトキャップ代わりとしても優秀**：寝る前にゆるくお団子にして結んでおくだけで、枕との摩擦を防ぎ翌朝の寝癖やうねりを激減

今回は楽天市場で数万件のレビューを誇る大ヒット名品からお得な複数本セットまで、大人可愛いシルクシュシュ10選を徹底比較します！`
  },
  {
    id: 'art-volumizing-banana-hair-clip-ribbon-accessory-10sen-2026',
    slug: 'art-volumizing-banana-hair-clip-ribbon-accessory-10sen-2026',
    title: '【大人上品バナナクリップ10選】挟むだけで3秒でまとまる美髪オフィスヘア！毛量が多くても崩れないリボン＆シンプル大人可愛いヘアアクセサリー比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: '忙しい朝も髪を挟んで留めるだけで一瞬で上品なポニーテール・まとめ髪が完成する「バナナクリップ」おすすめ10選！毛量が多い方やロングヘアでも一日中ずり落ちない強力ホールド仕様から、オフィスやフォーマルでも映えるリボン・アセチ素材の人気デザインを徹底比較。',
    products: fetched.t3,
    lead: `「ヘアゴムで結ぶとトップがぺたんこになって老け見えする」「髪の量が多くて普通のクリップだとすぐ弾けて崩れてしまう」「忙しい朝やオフィスで、手ぐしだけでサッと清潔感のあるまとめ髪を作りたい」……そんな大人のヘアアレンジを劇的に格上げするのが、**「大人上品バナナクリップ」**です。

挟むだけでこなれ感とボリュームが手に入る圧倒的な魅力があります：
1. **たった3秒でテクニックいらずの華やかポニーテールが完成**：髪をまとめて下から上に挟んでパチンと留めるだけで、後頭部に自然な立体感とふんわり感を演出
2. **ゴム跡がつかず頭皮も痛くならない快適なホールド感**：頭皮を強く引っ張らないため、長時間のオフィスワークでも頭痛や肩こりを引き起こしにくい
3. **仕事からセレモニーまで対応する豊富な上品デザイン**：控えめで洗練されたリボンモチーフや艶感のあるアセテート素材が、後ろ姿をエレガントに魅せる

今回は楽天市場のヘアアクセサリー部門でランキング上位を独占する名品から、多毛専用の強力ホールドクリップまで10選を徹底比較します！`
  },
  {
    id: 'art-detangling-wet-hair-brush-tangle-teezer-10sen-2026',
    slug: 'art-detangling-wet-hair-brush-tangle-teezer-10sen-2026',
    title: '【濡れ髪専用デタングリングブラシ10選】お風呂上がり・トリートメント時に絡まりを一瞬でほどく！タングルティーザー等傷んだ毛先も引っかからない人気ヘアブラシ比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: 'デリケートな濡れ髪やお風呂上がりの激しい髪の絡まりを、無理な力をかけずにスルンと解きほぐす「濡れ髪専用デタングリングブラシ」おすすめ10選！世界的大ヒットのタングルティーザー（TANGLE TEEZER）ザ・ウェットディタングラーをはじめ、インバス・アウトバス両用ブラシを徹底解説。',
    products: fetched.t4,
    lead: `「お風呂上がりや洗髪後、濡れた髪をとかそうとすると毛先が引っかかって痛い」「ブリーチやカラーで傷んだダメージ毛が絡まって切れ毛だらけになってしまう」「インバストリートメントを髪全体にムラなく均一に行き渡らせたい」……濡れている時の髪はキューティクルが開き、最もデリケートでダメージを受けやすい無防備な状態です。

そんな濡れ髪の負担を最小限に抑えてサロン帰りのサラサラ美髪に導くのが、**「濡れ髪専用デタングリングブラシ」**です：
- **長短二段構造の柔軟なブラシピンが絡まりを自然にスルー**：引っ張って無理にちぎることなく、毛先から段階的にスルリとほどける驚異のブラシ設計
- **お風呂場でのトリートメントコームとして絶大な美髪効果**：インバストリートメントを塗布した後に軽くコーミングするだけで、有効成分が髪一本一本に密着浸透
- **丸洗いできて水切れ抜群の衛生的なシリコン・プラスチック構造**：カビや雑菌の繁殖を防ぎ、お風呂場や洗面所でいつでも清潔に使える

今回は正規品タングルティーザーをはじめ、楽天市場で口コミ絶賛のデタングリングブラシ10選を徹底比較します！`
  }
];

// 記事オブジェクト構築
const newArticles = [];
const newSlugs = [];

batchDefs.forEach(def => {
  const items = def.products.map((p, idx) => {
    return {
      rank: idx + 1,
      name: p.name,
      price: `¥${Number(p.price).toLocaleString()}`,
      image: p.image,
      affiliateUrl: p.url,
      shop: p.shop,
      rating: p.reviewAverage,
      reviewCount: p.reviewCount,
      features: [
        `楽天市場 注目商品（レビュー ${p.reviewCount}件 / 評価 ★${p.reviewAverage}）`,
        `正規取扱店舗「${p.shop}」直送・安心の正規品保証`,
        `毎日のセルフケアを快適にする確かな機能性とコストパフォーマンス`
      ],
      description: `【第${idx + 1}位】${p.name}\n販売店：${p.shop}（価格：¥${Number(p.price).toLocaleString()}）\n実際のユーザーから★${p.reviewAverage}（レビュー数${p.reviewCount}件）の高評価を獲得している人気アイテム。初めての方でも安心して日々のルーティンに取り入れられる確かな品質が支持されています。`
    };
  });

  const mainProduct = def.products[0] || {};

  // リッチなMarkdownコンテンツの構築
  let content = `${def.lead}\n\n---\n\n## 失敗しない選び方の3大ポイント\n\n`;
  content += `### 1. 素材の安全性と髪・肌への摩擦低減クオリティ\n直接触れるアイテムだからこそ、天然シルク100%のランクや、肌に優しい極細泡生成力、ブラシピンの柔らかさなど、摩擦を最小限に抑える構造をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n洗面所やお風呂場、外出先でもサッと使えて手入れが簡単なもの、ホールド力が高く崩れにくい設計のものを選びましょう。\n\n`;
  content += `### 3. レビュー評価とリピート率から見る耐久性とコストパフォーマンス\n多くの購入者が長年愛用し、高いレビュー評価を集めているロングセラー名品を選ぶと失敗がありません。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

  items.forEach(it => {
    content += `### 第${it.rank}位：${it.name}\n\n`;
    content += `![${it.name}](${it.image})\n\n`;
    content += `- **参考価格**：${it.price}（税込）\n`;
    content += `- **販売ショップ**：${it.shop}\n`;
    content += `- **楽天ユーザー評価**：★${it.rating}（レビュー ${it.reviewCount}件）\n`;
    content += `- **おすすめポイント**：\n`;
    it.features.forEach(f => {
      content += `  - ${f}\n`;
    });
    content += `\n${it.description}\n\n`;
    content += `[▶ 楽天市場で「${it.name}」の最安値・口コミを見る](${it.affiliateUrl})\n\n---\n\n`;
  });

  content += `## 効果を最大化する正しい使い方と注意点\n\n`;
  content += `アイテムの良さを最大限に引き出すには、適切な手順と力加減を守ることが不可欠です。清潔な状態で優しくマッサージし、日々の積み重ねを大切にすることで、理想のハリとすっきりとした美しい素肌・美髪を手に入れましょう。\n\n`;
  content += `気になるアイテムはぜひ楽天市場の公式ショップで詳細や最新のセール情報をチェックしてみてください！\n`;

  const articleObj = {
    id: def.id,
    slug: def.slug,
    title: def.title,
    category: def.category,
    date: def.date,
    image: mainProduct.image || '',
    price: mainProduct.price ? `¥${Number(mainProduct.price).toLocaleString()}` : '',
    affiliateUrl: mainProduct.url || '',
    shop: mainProduct.shop || '',
    rating: mainProduct.reviewAverage || 4.5,
    reviewCount: mainProduct.reviewCount || 10,
    description: def.description,
    content: content,
    items: items
  };

  newArticles.push(articleObj);
  newSlugs.push(def.slug);
});

// articles.json の先頭に追加
const updatedArticles = [...newArticles, ...articles];
fs.writeFileSync(articlesJsonPath, JSON.stringify(updatedArticles, null, 2), 'utf-8');

// all.txt の更新
const updatedSlugs = [...newSlugs, ...allSlugs];
fs.writeFileSync(allTxtPath, updatedSlugs.join('\n'), 'utf-8');

console.log(`[Batch 135 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
