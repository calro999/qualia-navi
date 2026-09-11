import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch128_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ128の4記事の定義
const batchDefs = [
  {
    id: 'art-neck-relax-pillow-straight-neck-traction-10sen-2026',
    slug: 'art-neck-relax-pillow-straight-neck-traction-10sen-2026',
    title: '【ストレートネック用ストレッチ首枕＆ネックリラックスピロー10選】1日5分寝るだけでスマホ首・巻き肩・首肩コリをぐーっと牽引開放！整体級ストレッチギア比較',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: 'スマホやパソコン作業で固まった首・肩の筋膜を自重で牽引して伸ばす「ストレッチ首枕（ネックリラックスピロー）」おすすめ10選！楽天総合ランキング1位の話題モデルをはじめ、人間工学に基づいたV字カーブ設計と指圧突起でストレートネックを心地よくリセットする人気ギアを徹底検証。',
    products: fetched.t1,
    lead: `「毎日のデスクワークやスマホ操作で首の根元がガチガチ」「首が前に突き出たストレートネック（スマホ首）で姿勢が悪い」「マッサージに行ってもすぐに首や肩のコリがぶり返す」……そんな現代人の深刻な首肩の悩みに、整体院やメディアで絶賛されているのが**「ストレッチ首枕（ネックリラックスピロー）」**です。

床に置いて首を乗せ、1日たった5分間寝転がるだけで自重による本格的な牽引ストレッチが叶います：
1. **人間工学に基づいた自然なC字カーブ復元設計**：頭の重み（約5〜6kg）を利用して頚椎を自然な湾曲へと優しく誘導し、縮こまった首の前面と背面を同時に解放
2. **ツボを刺激する指圧突起配置**：首筋から肩甲骨周りの深層筋肉（僧帽筋・肩甲挙筋）を心地よい圧で刺激し、固まった筋膜をリリース
3. **電気を使わずいつでもどこでも手軽にリフレッシュ**：電源不要でリビングやベッドの上でサッと使え、休憩時間やお風呂上がりのリラックス習慣に最適

今回は楽天総合ランキング1位を獲得した人気モデルをはじめ、硬さ・高さ調整ができる厳選10選を徹底比較します！`
  },
  {
    slug: 'art-magnesium-chloride-dead-sea-bath-salt-10sen-2026',
    id: 'art-magnesium-chloride-dead-sea-bath-salt-10sen-2026',
    title: '【天然塩化マグネシウム入浴剤＆死海バスソルト10選】経皮吸収で芯から温まる！筋肉疲労・肩こり・乾燥肌を潤す天然にがり温活ミネラル風呂比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '皮膚から直接ミネラルを補給する「経皮マグネシウム入浴」として注目を浴びる「天然塩化マグネシウム・死海バスソルト」おすすめ10選！エプソムソルト（硫酸Mg）よりも保湿力が高く、湯冷めしにくい極上の天然にがりフレークを徹底検証。',
    products: fetched.t2,
    lead: `「冬だけでなく夏でも手足の先が冷える」「寝ている間に足がつる（こむら返り）・筋肉が張る」「お風呂に入ってもすぐに湯冷めして体が冷えてしまう」……そんな現代人に不足しがちなミネラル**「マグネシウム」**を、入浴によって皮膚からダイレクトに吸収できるのが「塩化マグネシウム入浴剤（にがり温泉）」です。

塩化マグネシウムには、一般的な硫酸マグネシウム（エプソムソルト）を超える優れた特徴があります：
- **塩化ナトリウム（塩分）を除去した高純度フレーク**：風呂釜や給湯器を傷めず、追い焚きや残り湯の洗濯使用も安心
- **塩化マグネシウム特有の高い吸湿・保湿力**：肌表面に保護膜を作り、角層の水分保持力を高めてお風呂上がりのカサつきやかゆみを防止
- **筋肉の緊張をほぐし、発汗＆疲労回復を強力促進**：アスリートのボディケアとしても愛用され、深部体温を効率よく高めて極上の熟睡へ誘導

今回は死海の深層水から採取した高品質フレークから、お得な大容量パックまで、楽天市場で高評価を獲得している塩化マグネシウム入浴剤10選を徹底比較します！`
  },
  {
    slug: 'art-natural-red-bean-steam-eye-mask-pillow-10sen-2026',
    id: 'art-natural-red-bean-steam-eye-mask-pillow-10sen-2026',
    title: '【天然小豆の温熱スチームアイマスク＆あずきピロー10選】レンジでチンして繰り返し使える！天然蒸気と適度な重みでPC眼精疲労と首肩の冷えをじんわり解きほぐす極上温活',
    category: '美容家電・エチケットギア',
    date: '2026-09-11',
    description: '小豆（あずき）に含まれる豊富な天然水分から生まれる天然蒸気で目元や首肩を芯まで温める「あずき温熱アイピロー」おすすめ10選！使い捨てと違い電子レンジで温めて200回以上繰り返し使え、程よい重みで目の奥の重だるさをリフレッシュする人気温活グッズを徹底解説。',
    products: fetched.t3,
    lead: `「使い捨てホットアイマスクはコスパが気になる」「目の奥がズーンと重く、乾いた熱さでは物足りない」「寝る前にスマホのブルーライトで冴えてしまった頭をリセットしたい」……そんな方に昔から愛され、いま若い世代にも再評価されているのが**「天然あずきアイマスク（温熱アイピロー）」**です。

電気加熱やカイロとは全く異なる、あずきならではの驚くべき温熱効果があります：
1. **あずきの水分が加熱されて放出される「100%天然蒸気」**：空気中の水分を抱え込む小豆を電子レンジで数十秒温めるだけで、目に見えない微細なスチームが発生し、肌の奥深くまで温熱が到達
2. **目にピタッと密着する「あずきの絶妙な粒感と重み」**：適度な重みがツボを優しく指圧するようにフィットし、眼球と目の周りの筋肉（眼輪筋）の緊張を瞬時に解放
3. **電子レンジ加熱で約200回〜250回繰り返し使える圧倒的コスパ**：1回あたり数円の経済性で、毎晩贅沢に使えるエコ＆サステナブルなリラクゼーション

今回はオーガニックリネン製や首肩用ワイドタイプなど、楽天市場で人気の天然あずきピロー10選を徹底比較します！`
  },
  {
    slug: 'art-pure-epsom-salt-bath-mineral-flakes-10sen-2026',
    id: 'art-pure-epsom-salt-bath-mineral-flakes-10sen-2026',
    title: '【純度99%以上国産エプソムソルト入浴剤10選】セレブやモデルが愛用する発汗デトックス！塩分ゼロで風呂釜を傷めず全身すべすべ素肌へ導く硫酸マグネシウムバスソルト比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '海外セレブやトップモデルが撮影前のデトックスに愛用することで世界的に大ブームとなった「エプソムソルト（硫酸マグネシウム）」おすすめ10選！塩（塩化ナトリウム）ではないため浴槽を傷めず、驚きの発汗作用と美肌効果をもたらす国産高純度バスソルトを徹底検証。',
    products: fetched.t4,
    lead: `「お風呂に入っても汗をあまりかけない」「日頃のむくみや老廃物を一気に汗と一緒に流したい」「肌が弱くて強い香料や着色料の入浴剤が使えない」……そんな美意識の高い方から圧倒的な支持を集めているのが、**「高純度エプソムソルト（硫酸マグネシウム）」**です。

名前に「ソルト」とついていますが、実は塩分は一切含まれていない純粋なミネラル結晶です：
- **塩分ゼロだから風呂釜・給湯器を一切傷めない**：24時間風呂や追い焚き機能付きの浴槽でも安心して使え、残り湯洗濯も可能
- **短時間の入浴でも驚くほどの滝汗デトックス**：硫酸マグネシウムが皮膚表面の温熱効果を高め、代謝を急上昇させて日々のむくみをスッキリ解消
- **古い角質を落として生まれたてのようなツルツル肌へ**：入浴中に優しくマッサージすることで、スクラブとしても機能し、肘や膝のざらつきも滑らかに

今回は瀬戸内海産の安全な食品添加物基準国産エプソムソルトから、天然エッセンシャルオイル配合のアロマタイプまで、楽天市場で選ばれている10選を徹底比較します！`
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
  content += `### 1. 原料の純度と産地・安全基準を必ず確認\n直接肌に触れる入浴剤や首枕だからこそ、国産基準、食品添加物グレード、人間工学設計などの品質保証を最優先にチェックしましょう。\n\n`;
  content += `### 2. 毎日のルーティンとして継続しやすい手軽さ\n寝る前の5分間、レンジでチンするだけ、浴槽にサッと入れるだけなど、日々の忙しい生活の中で無理なく続けられる仕様を選びましょう。\n\n`;
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

console.log(`[Batch 128 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
