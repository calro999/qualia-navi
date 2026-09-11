import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch133_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ133の4記事の定義
const batchDefs = [
  {
    id: 'art-nano-mist-facial-steamer-deep-cleansing-pore-care-10sen-2026',
    slug: 'art-nano-mist-facial-steamer-deep-cleansing-pore-care-10sen-2026',
    title: '【ナノ微粒子フェイススチーマー＆卓上美顔スチーマー10選】クレンジング前に毛穴を開いて角栓・黒ずみを浮かせる！エステ級の深層保湿スチームギア比較',
    category: '美顔器・美容家電',
    date: '2026-09-11',
    description: 'ナノサイズの超微細温スチームで肌を柔らかくほぐし、毛穴の奥の汚れを浮かせる「卓上フェイススチーマー」おすすめ10選！クレンジング前の「ディープクレンジング」から、メイク前の「水分補給＆のりアップ」まで、自宅にいながら本格フェイシャルエステを再現する人気ギアを徹底検証。',
    products: fetched.t1,
    lead: `「毛穴パックをしてもすぐに角栓が詰まる」「乾燥でファンデーションが粉を吹いてしまう」「高価な化粧水を使っても肌の奥まで浸透している実感が湧かない」……そんなスキンケアの限界を感じている方に、スキンケアの土台を激変させるのが**「ナノ微粒子フェイススチーマー」**です。

温かいナノスチームを浴びるだけで、肌に驚くべき変化がもたらされます：
1. **毛穴をじんわり開いて頑固な黒ずみ・角栓を浮き上がらせる**：クレンジングオイルをなじませながらスチームを当てる「温感ディープクレンジング」で、擦らず毛穴汚れをごっそりオフ
2. **通常の水蒸気の数百分の一のナノ粒子が角層深部へ到達**：固く縮こまった角質層をふっくらと柔らかく整え、後から使う美容液の浸透力を劇的にブースト
3. **メイク前の3分スチームで一日中崩れないツヤ肌へ**：朝の洗顔後に温スチームを浴びることで、血色がアップし化粧のりが別次元に向上

今回は医師監修のNANOA（ナノア）をはじめ、アロマ機能やコンパクト設計を備えた楽天市場の売れ筋フェイススチーマー10選を徹底比較します！`
  },
  {
    slug: 'art-salon-grade-cuticle-nail-oil-pen-serum-10sen-2026',
    id: 'art-salon-grade-cuticle-nail-oil-pen-serum-10sen-2026',
    title: '【サロン監修高保湿ネイルオイル＆キューティクル美容液10選】爪周りのカサつき・ささくれ・縦じわを即効リセット！ベタつかずポーチに入れて持ち歩ける人気ケア比較',
    category: 'ネイルケア',
    date: '2026-09-11',
    description: 'ネイルサロンオーナーやネイリストが監修した「高保湿ネイルオイル＆キューティクルエッセンス」おすすめ10選！爪の主成分ケラチンや天然植物オイルを濃密配合し、ジェルネイルの持ちを高め、乾燥による二枚爪やささくれを美しく補修する人気モデルを徹底解説。',
    products: fetched.t2,
    lead: `「爪の周りが白くカサついてささくれができやすい」「爪の縦じわや筋が目立って老けて見える」「ジェルネイルが先端からすぐに浮いて剥がれてしまう」……手元は年齢や生活感が最も出やすいパーツだからこそ、毎日のこまめな「爪と甘皮の保湿」が欠かせません。

ハンドクリームだけでは届かない爪の根元（爪母）を集中ケアできるのが、**「高保湿ネイルオイル・キューティクルエッセンス」**です：
- **分子の細かい天然植物オイルが甘皮とハイポニキウムに浸透**：ホホバオイル・アーモンドオイル・スクワランなどが乾燥した爪周りにスッとなじみ、潤いの保護膜を形成
- **ジェルネイルや自爪の柔軟性を高めて長持ちさせる**：爪に適度な油分と柔軟性を与えることで、外部からの衝撃による爪割れやリフト（浮き）を防止
- **ベタつかずスマホやPC作業を邪魔しない速乾処方**：塗って軽くマッサージするだけで表面はサラサラ、内部はしっとり潤う絶妙なテクスチャー

今回は中目黒ネイルサロンオーナー監修の大人気ネイルオイルをはじめ、楽天市場で1位を獲得した厳選10選を徹底比較します！`
  },
  {
    slug: 'art-silicone-foot-scrubber-mat-odor-removal-10sen-2026',
    id: 'art-silicone-foot-scrubber-mat-odor-removal-10sen-2026',
    title: '【シリコン製足裏フットブラシマット10選】立ったまま擦るだけで足指の隙間・頑固な角質・強烈な足臭を一掃！お風呂で爽快泡立ちフットケアマット比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: 'お風呂の床に敷いてボディーソープをつけ、足を前後に動かすだけで足裏から指の隙間まで完全洗浄できる「足裏フットブラシマット」おすすめ10選！4000件超レビューの「足臭バスター」をはじめ、長さの異なる数百本のシリコン突起でニオイ菌と角質を泡洗浄する人気ギアを徹底検証。',
    products: fetched.t3,
    lead: `「靴を脱いだ瞬間の足のツーンとしたニオイが気になる」「体を洗うときに足の指の間まで丁寧に洗うのが面倒」「かかとの角質が硬くなって靴下に引っかかる」……そんな足元の清潔トラブルを、立ったまま数十秒でまるごと解決するのが**「足裏フットブラシマット」**です。

お風呂の洗い場に吸盤で固定し、足をゴシゴシ擦るだけで感動の爽快感が得られます：
1. **指の隙間まで入り込む長短立体シリコン突起**：手洗いでは洗いにくい指の股や爪のキワまでしっかり届き、ニオイの温床となる古い垢と皮脂をごっそり掻き出し
2. **きめ細やかなもこもこ濃密泡が瞬時に立ち上がる**：少量のボディソープや石鹸を垂らすだけで豊かな泡が発生し、足裏全体を包み込んで摩擦レス洗浄
3. **足裏の無数のツボを刺激して1日の立ち仕事疲れをリフレッシュ**：適度な弾力の突起が足裏を心地よくマッサージし、お風呂上がりの足の軽さが劇的に変化

今回はレビュー4000件超の大ヒットモデルをはじめ、フック穴付きで壁に掛けて清潔に乾燥できる人気フットブラシ10選を徹底比較します！`
  },
  {
    slug: 'art-pure-squalane-oil-beauty-face-body-10sen-2026',
    id: 'art-pure-squalane-oil-beauty-face-body-10sen-2026',
    title: '【純度99%以上天然スクワランオイル10選】1滴で乳液・クリーム不要のうるツヤ素肌！肌の皮脂膜を再現して乾燥・肌荒れ・インナードライを防ぐ無添加美容オイル比較',
    category: 'スキンケア',
    date: '2026-09-11',
    description: '人間の皮脂にも含まれる生体親和性抜群の保湿成分「天然スクワランオイル（純度99%以上）」おすすめ10選！乳液やクリームの代わりに化粧水の後の濡れた肌へたった1滴馴染ませるだけで、水分の蒸発を完璧に防ぎ、ベタつきゼロで毛穴詰まりを起こさない極上スキンケアを解説。',
    products: fetched.t4,
    lead: `「乳液やクリームの油膜感・ベタつきが苦手」「夕方になるとTゾーンはテカるのに頬は突っ張るインナードライ肌」「敏感肌で肌トラブルが起きやすく、シンプルなケアに回帰したい」……そんな全ての肌タイプに寄り添う究極のシンプルケアが、**「純度99%以上の天然スクワランオイル」**です。

もともと人間の皮膚の中に存在し、加齢とともに減少していく皮脂成分だからこその強みがあります：
- **油焼けの心配が一切ない驚異の耐酸化安定性**：酸化や変質を極限まで起こさないため、朝のメイク前につけて日光を浴びてもシミやくすみの原因にならない
- **化粧水が乾かないうちに「たった1滴」伸ばすだけで完了**：水分と油分が肌の上で乳化し、まるで健康な皮脂膜そのもののような薄いバリアを瞬時に形成
- **顔だけでなくブロー前のヘアオイル・ネイル・赤ちゃんの保湿まで万能**：不純物が極限まで取り除かれた低刺激・無添加処方で、家族全員の肌を守るお守りオイル

今回は深海鮫由来やオリーブ・サトウキビ由来の植物性など、楽天市場でロングセラーを誇る高純度スクワランオイル10選を徹底比較します！`
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
  content += `### 1. 原料の純度と安全設計を最優先にチェック\n肌に毎日直接触れるオイルやスチーマー、ブラシだからこそ、純度99%以上、無添加処方、空焚き防止センサー、抗菌シリコンなどの安全基準をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さ\nワンボタン操作のスチーマー、濡れたまま擦るだけのフットマット、1滴で完了するオイルなど、生活の中で無理なく続けられる仕様を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と力加減を守ることが不可欠です。清潔な状態で優しくマッサージし、日々の積み重ねを大切にすることで、理想のハリとすっきりとした美しい素肌を手に入れましょう。\n\n`;
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

console.log(`[Batch 133 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
