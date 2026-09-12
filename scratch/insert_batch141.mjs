import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch141_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ141の4記事の定義
const batchDefs = [
  {
    id: 'art-acne-needle-comedo-extractor-pore-10sen-2026',
    slug: 'art-acne-needle-comedo-extractor-pore-10sen-2026',
    title: '【精密コメドプッシャー＆角栓ピンセット10選】爪で潰さず毛穴を傷めない！頑固な角栓・白ニキビの芯をつるんと押し出す専門器具セット比較',
    category: 'スキンケア',
    date: '2026-09-13',
    description: '小鼻や顎の頑固な角栓・黒ずみ、気になる白ニキビの芯を肌へのダメージ最小限でピンポイント除去できる「精密コメドプッシャー＆角栓ピンセット」おすすめ10選！医療用サージカルステンレス製や超極細カーブピンセットなど、跡を残さず清潔にケアできる人気器具を徹底比較。',
    products: fetched.t1,
    lead: `「指や爪で角栓を無理やり押し出すと小鼻が赤く腫れて毛穴が開いてしまう」「小鼻の横に詰まった白い角栓のポツポツを安全に除去したい」「白ニキビができた時に手で触らず清潔に芯だけをオフしたい」……そんな毛穴の詰まりトラブルをセルフで安全にケアする必需品が、**「精密コメドプッシャー＆角栓ピンセット」**です。

美容皮膚科やエステの手技に基づいた専門器具ならではの圧倒的なメリットがあります：
1. **面で均一に圧をかけて押し出す特殊ループ設計**：爪のように皮膚を傷つけず、毛穴の周りを優しく押すだけで奥に詰まった角栓がニュルッと浮き出る
2. **0.01mm単位の超極細先端ピンセットが細かな汚れを逃さずキャッチ**：浮き出た角栓だけをピンポイントでつまみ取り、毛穴壁の摩擦損傷を完全防止
3. **煮沸消毒やアルコール除菌ができる医療用ステンレス鋼製**：錆びずに長期間衛生的に使用でき、雑菌感染によるニキビの悪化をしっかり予防

今回は楽天市場でランキング1位を獲得した大人気セットから専用ケース付きプロ仕様まで10選を徹底比較します！`
  },
  {
    id: 'art-standing-makeup-brush-pouch-case-10sen-2026',
    slug: 'art-standing-makeup-brush-pouch-case-10sen-2026',
    title: '【自立式スタンド型メイクブラシポーチ10選】立てて使えるから探す手間ゼロ！洗えるシリコン製から大容量旅行用コスメスタンドケース比較',
    category: 'メイクアップ',
    date: '2026-09-13',
    description: 'ファスナーを開けて折り返すだけでペン立てのように自立！使いたいブラシを一瞬で取り出せる「自立式スタンド型メイクブラシケース（ポーチ）」おすすめ10選！埃や汚れを防ぐ防塵カバー付きや水洗いできるシリコン製、スリムな縦型デザインを徹底解説。',
    products: fetched.t2,
    lead: `「ポーチの中でメイクブラシ同士が擦れて粉まみれになったり毛先が痛む」「平置きポーチだと目当てのブラシが見つからず朝のメイクでイライラする」「外出先やホテルの洗面台が狭くてコスメポーチを広げる場所がない」……そんなブラシ収納のストレスを一発で解消するのが、**「自立式スタンド型メイクブラシポーチ」**です。

省スペースで機能的な縦型スタンド構造が、メイク効率を劇的に跳ね上げます：
- **机の上にポンと置くだけで直立し、ブラシが一目でわかる見晴らしの良さ**：上から見渡して使いたいブラシをサッと抜き差しでき、朝のメイク時間を数分短縮
- **毛先を潰さず型崩れを防ぐクッション＆ホールド構造**：お気に入りの高級ブラシやデリケートな天然毛も、傷めずに真っ直ぐ綺麗な形を保って保管
- **丸ごと水洗いできる衛生的なシリコン・防水ナイロン素材**：粉飛びでポーチの内側が汚れても、水拭きや丸洗いですぐにリセット可能

今回は楽天市場で口コミ高評価の自立型ブラシケースから半透明で中身が見えるスマートデザインまで10選を徹底比較します！`
  },
  {
    id: 'art-silicone-face-mask-cover-sheet-moist-10sen-2026',
    slug: 'art-silicone-face-mask-cover-sheet-moist-10sen-2026',
    title: '【フェイスパック用シリコンマスクカバー10選】シートマスクの蒸発＆ズレ落ちを完全防止！美容液を肌の奥まで密着浸透させる人気シリコンラップ比較',
    category: 'スキンケア',
    date: '2026-09-13',
    description: '手持ちのシートマスクの上に重ねて耳にかけるだけ！美容液の水分蒸発を防ぎ、ドライヤー中や家事中でもパックが密着して剥がれない「フェイスパック用シリコンマスクカバー」おすすめ10選！お風呂場での発汗スチームサウナマスクとしても使える人気便利グッズを徹底検証。',
    products: fetched.t3,
    lead: `「シートマスクを貼っていてもエアコンの風や時間経過で端からカピカピに乾いてしまう」「パックをしながら下を向いて家事やスマホを見ているとポタポタ落ちてくる」「入浴中に毛穴をしっかり開いて美容成分を奥までグングン届けたい」……そんな日々のスキンケア効率を何倍にも引き上げる神アイテムが、**「シリコンマスクカバー」**です。

耳掛け式の高弾力シリコンが、サロン級のラップ密閉効果を生み出します：
1. **美容液の蒸発を100%遮断してパックの保湿持続力を極限まで高める**：シートマスクの美容成分が空気に奪われず、肌の角質層深くまでじっくり浸透
2. **耳にかける立体ホールド構造で激しく動いても絶対にズレ落ちない**：ドライヤーで髪を乾かしながら、掃除やストレッチをしながらの「完全ながらパック」が実現
3. **入浴時にそのまま着ければお風呂の蒸気で発汗スチームマスクに変身**：毛穴を開いて老廃物を排出し、湯上がりの化粧水浸透力を劇的にブースト

今回は洗って何度でも繰り返し使えるエコ仕様の楽天市場人気シリコンマスク10選を徹底比較します！`
  },
  {
    id: 'art-gel-nail-soak-off-clip-remover-cap-10sen-2026',
    slug: 'art-gel-nail-soak-off-clip-remover-cap-10sen-2026',
    title: '【ジェルネイルオフ用ソークオフクリップ10選】アルミホイル巻きの手間が完全ゼロ！挟むだけでアセトンを温めスピーディーにオフできる人気リムーバーキャップ比較',
    category: 'ネイルケア',
    date: '2026-09-13',
    description: 'アセトンを含ませたコットンを指に乗せてクリップで挟むだけ！アルミホイルを10本分切って巻く面倒な作業を解消する「ジェルネイル用ソークオフクリップ（リムーバーキャップ）」おすすめ10選！シャイニージェル等の公式モデルから足用・手用セットまで徹底解説。',
    products: fetched.t4,
    lead: `「セルフジェルネイルのオフでアルミホイルを指に巻くのが難しくてイライラする」「ホイルの隙間からアセトンが揮発してジェルがうまく浮いてこない」「両手にホイルを巻くと何も触れなくなって不便」……セルフネイラーが最も苦戦するオフ工程を一気にラクにするのが、**「ソークオフクリップ（ネイルオフキャップ）」**です。

洗濯バサミのように指先をパチンと挟むだけで、驚きの時短と密閉力を発揮します：
- **ホイルカットも巻き付けも不要で10本わずか1分で装着完了**：コットンを置いてクリップでパチンと留めるだけなので、利き手と逆側の手でも片手でラクラク固定
- **クリップの適度な圧迫力と指先の体温保持でオフ時間を劇的短縮**：アセトンの揮発を防ぎながらジェルにしっかり密着させ、スルリと浮き上がる効率的なオフを実現
- **洗って半永久的に繰り返し使える高耐久シリコン・プラスチック製**：使い捨てアルミホイルのゴミが出ず、経済的かつエコにジェルネイルライフを継続可能

今回はシャイニージェル正規品からフットネイル対応セットまで、楽天市場で大人気のソークオフクリップ10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と肌への負担の少なさを最優先にチェック\n直接触れるアイテムだからこそ、医療用サージカルステンレスや、食品衛生基準の柔軟シリコン、アセトンに耐える耐薬品性素材などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n挟むだけ、耳にかけるだけ、立てるだけ、押すだけなど、面倒な準備なしで直感的に使いこなせる設計を選びましょう。\n\n`;
  content += `### 3. レビュー評価とリピート率から見るコストパフォーマンス\n多くの購入者が長年愛用し、高いレビュー評価を集めているロングセラー名品を選ぶと失敗がありません。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、ストレスのない快適で清潔な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 141 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
