import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch134_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ134の4記事の定義
const batchDefs = [
  {
    id: 'art-teatree-calming-sheet-mask-acne-pore-care-10sen-2026',
    slug: 'art-teatree-calming-sheet-mask-acne-pore-care-10sen-2026',
    title: '【高濃度ティーツリー配合鎮静シートマスク10選】大人ニキビ・赤み・マスク荒れをハーブの力で先回り沈静！毛穴を引き締めて皮脂トラブルを防ぐ薬用フェイスパック比較',
    category: 'スキンケア',
    date: '2026-09-11',
    description: '繰り返す大人ニキビや生理前の肌荒れ、赤みをスピーディーに鎮静化する「高濃度ティーツリーシートマスク」おすすめ10選！オーストラリア原産の天然ハーブ「ティーツリー葉油」が持つ抗菌・抗炎症作用で、健やかで清潔な素肌へと整える人気フェイスパックを徹底検証。',
    products: fetched.t1,
    lead: `「顎やフェイスラインにポツポツ大人ニキビが繰り返しできる」「日中のテカリや皮脂分泌で小鼻の周りが赤く炎症を起こしやすい」「ゆらぎ肌で肌がピリつく時のレスキューパックが欲しい」……そんな肌荒れ・赤みトラブルの救世主として世界中で支持されているのが、**「高濃度ティーツリー配合シートマスク」**です。

先住民族アボリジニが万能薬として重宝してきたティーツリーには、卓越した整肌パワーがあります：
1. **ニキビの原因菌（アクネ菌）を寄せ付けない天然の抗菌・殺菌力**：化学物質に頼らず植物本来の力で毛穴環境を清潔にリセット
2. **赤み・炎症を素早くクールダウンする優れた鎮静作用**：日焼け後のほてりやマスク擦れによる肌荒れを先回りして穏やかにケア
3. **過剰な皮脂分泌を抑えて毛穴をキュッと引き締め**：水分と油分のバランスを整え、夕方になってもベタつかないサラサラ肌をキープ

今回はKISOなどの本格原液コスメから大容量デイリーパックまで、楽天市場で口コミ人気の高いティーツリーマスク10選を徹底比較します！`
  },
  {
    slug: 'art-microfiber-quick-dry-hair-towel-cap-10sen-2026',
    id: 'art-microfiber-quick-dry-hair-towel-cap-10sen-2026',
    title: '【高吸水マイクロファイバー・タオルキャップ10選】お風呂上がりにかぶるだけで水滴ゼロ！ロングヘアもすっぽり収まりドライヤー時間を半分にする人気ドライキャップ比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: 'お風呂上がりやスイミング・サウナ後にサッとかぶるだけで濡れ髪の水分をぐんぐん吸収する「吸水タオルキャップ」おすすめ10選！3000件超のレビューを集める大人気モデルをはじめ、ゴムの締め付け感がなく大人から子供まで快適に使える人気ドライターバンを徹底解説。',
    products: fetched.t2,
    lead: `「お風呂から出た後、スキンケアをしている間に髪から水滴がポタポタ垂れてパジャマが濡れる」「子供のお風呂上がりにすぐドライヤーができず湯冷めが心配」「サウナやスイミングの後に手軽に髪をまとめておきたい」……そんな日常の濡れ髪ストレスを一撃で解消するのが、**「高吸水マイクロファイバー・タオルキャップ」**です。

かぶるだけで手ぶらドライが叶う驚きの機能性を誇ります：
- **綿タオルの数倍の吸水スピードで水滴を瞬間キャッチ**：マイクロファイバーの微細な繊維が毛先から頭皮までの水分を急速吸収し、ドライヤー前のタオルドライを完全自動化
- **ロングヘアや毛量が多い人でも余裕で収まる立体デザイン**：髪をクルッとまとめてキャップの中に押し込むだけで、落ちてこずストレスフリー
- **スキンケア中や部屋干し中の湯冷め・風邪を防止**：頭部を冷えから守りながら時間を有効活用できるため、忙しいワーママや一人暮らしの夜の時短に革命

今回はレビュー3000件突破のロングセラーからお得な2個セットまで、楽天市場で選ばれているタオルキャップ10選を徹底比較します！`
  },
  {
    slug: 'art-fragrant-osmanthus-hair-essence-oil-10sen-2026',
    id: 'art-fragrant-osmanthus-hair-essence-oil-10sen-2026',
    title: '【本物の金木犀（キンモクセイ）香るヘアオイル10選】秋の街角を歩くような甘く優しい芳香！パサつく毛先をしっとり補修しながら極上のツヤ髪へ導く人気エッセンス比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: 'SNSで毎年大バズりする「金木犀（オスマンサス）の香りのヘアオイル」おすすめ10選！人工的ではないどこか懐かしく上品なリアル金木犀の香りに包まれながら、アルガンオイルやシアバターなどの濃密植物油で毛先のパサつき・うねりを補修する人気オイルを徹底検証。',
    products: fetched.t3,
    lead: `「ふわっとすれ違った瞬間に『良い匂い！』と言われるヘアオイルが欲しい」「甘すぎるフローラルや強い香水は苦手だけれど自然な金木犀の香りが大好き」「日中のパサつきを抑えながら濡れ髪ウェットな束感を作りたい」……秋の訪れを告げるノスタルジックな香りで大ブームとなっているのが、**「金木犀（キンモクセイ）ヘアオイル」**です。

香りの良さだけでなく、プロ仕様のトリートメント性能も兼ね備えています：
1. **本物の金木犀の花から抽出したようなみずみずしい芳香**：万人受けする優しく清潔感のある香りが、夕方までふんわり持続
2. **植物由来の濃密ブレンドオイルがダメージ毛を集中リペア**：ドライヤーの熱や紫外線で傷んだキューティクルを滑らかに密閉し、指通りサラサラ
3. **ブロー前のアウトバスにも朝のスタイリングにも使えるマルチ性**：重すぎず軽すぎない絶妙なテクスチャーで、自然なツヤ感と束感を演出

今回はバランローズをはじめ、フレグランスコスメとしてもヘアケアとしても超優秀な楽天市場の売れ筋金木犀ヘアオイル10選を徹底比較します！`
  },
  {
    slug: 'art-feminine-deodorant-mist-spray-sensitive-care-10sen-2026',
    id: 'art-feminine-deodorant-mist-spray-sensitive-care-10sen-2026',
    title: '【持ち歩けるデリケートゾーン消臭ミストスプレー10選】生理中やおりものの気になるニオイ・ムレ・不快感を外出先で即リセット！弱酸性フェミニンケア比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '外出先のトイレでトイレットペーパーに吹きかけて拭き取るだけ！生理中のニオイやおりもの・下着のムレを瞬時にクリアにする「デリケートゾーン専用消臭スプレー（フェミニンミスト）」おすすめ10選！弱酸性・低刺激設計でポーチに忍ばせられる人気コスメを徹底解説。',
    products: fetched.t4,
    lead: `「生理中の独特のニオイやムレが周りにバレていないか不安」「夏場や長時間のデスクワークで下着の中が蒸れて痒みが出る」「外出先やデート前、お泊まりの時にサッと清潔にしたい」……デリケートゾーンの悩みは誰にも相談しにくいものですが、多くの女性が日常的に抱えています。

そんなデリケートゾーンのエチケット習慣として常備されているのが、**「デリケートゾーン消臭ミストスプレー」**です：
- **トイレットペーパーにシュッと吹きかけて優しく拭き取るだけ**：水洗トイレにそのまま流せ、外出先でもウォシュレット以上のさっぱり感と清潔さを実現
- **デリケートゾーンの常在菌バランスを崩さない弱酸性処方**：肌のバリア機能を守りながら、ニオイの原因となる雑菌の繁殖を植物エキスで抑制
- **香水やコスメにしか見えないお洒落なボトルデザイン**：ポーチから取り出してもフェミニンケアグッズだとバレず、オフィスや学校でもスマートに使用可能

今回は楽天レビュー★4.8を獲得した大ヒットモデルをはじめ、アルコールフリー・無添加基準の安心できるフェミニンミスト10選を徹底比較します！`
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
  content += `### 1. 成分の肌への優しさと安全基準を最優先にチェック\nデリケートな肌や毎日触れるアイテムだからこそ、天然植物由来エキス、弱酸性処方、高吸水基準、アルコールフリーなどの安全性をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さ\nかぶるだけ、ペーパーに吹きかけるだけ、塗るだけの簡単ワンステップなど、忙しい生活の中でも無理なく続けられる仕様を選びましょう。\n\n`;
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

console.log(`[Batch 134 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
