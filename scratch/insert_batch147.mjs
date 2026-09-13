import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch147_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ147の4記事の定義
const batchDefs = [
  {
    id: 'art-anti-fog-glasses-cloth-cleaner-10sen-2026',
    slug: 'art-anti-fog-glasses-cloth-cleaner-10sen-2026',
    title: '【メガネくもり止めクロス＆ジェル10選】拭くだけで24時間視界クリア！マスク・温かい食事・寒暖差でも白く曇らない人気曇り止めクロス比較',
    category: 'アイケア・アイウェア',
    date: '2026-09-14',
    description: 'マスク着用時の呼吸やラーメン等の温かい食事、満員電車での「メガネが真っ白に曇る」ストレスを完全にゼロにする「メガネ用くもり止めクロス（曇り止めクロス）」おすすめ10選！拭くだけで約600回繰り返し使え、約24時間クリアな視界が持続する人気商品を徹底比較。',
    products: fetched.t1,
    lead: `「マスクをしていると吐いた息が隙間から上がってメガネが真っ白にくもる」「温かいラーメンやコーヒーを飲むたびに前が見えなくなる」「冬場の満員電車や屋内に入った瞬間のくもりをサッと解消したい」……メガネユーザーなら誰もが日常的に直面する最大のイライラを解消するのが、**「メガネくもり止めクロス」**です。

レンズをハァーッと息を吹きかけてサッと拭くだけで、劇的な親水被膜を形成します：
1. **特殊界面活性剤が水滴を均一な超薄膜にして光の乱反射（白いくもり）を完全防止**：スプレーのように液垂れせず、外出先でもわずか10秒でクリアな視界が復活
2. **1枚で約600回〜繰り返し使えて数ヶ月持続する圧倒的コスパ**：チャック付き密封パックで乾燥を防ぎ、ポケットやメガネケースに入れて手軽に携帯可能
3. **サングラス・花粉メガネ・カメラのレンズ・スマホ画面にも幅広くマルチ対応**：レンズのコーティングを傷めず、指紋や皮脂汚れも一緒に拭き取れる高機能マイクロファイバー

今回は楽天市場でレビュー3,000件超えの殿堂入りクロスから長持ち大判タイプまで10選を徹底比較します！`
  },
  {
    id: 'art-natural-solid-shampoo-bar-organic-10sen-2026',
    slug: 'art-natural-solid-shampoo-bar-organic-10sen-2026',
    title: '【オーガニック固形シャンプーバー10選】液体シャンプー3本分の美容成分を濃縮！頭皮スッキリ＆キシまないエシカルな人気石鹸シャンプー比較',
    category: 'ヘアケア',
    date: '2026-09-14',
    description: 'プラスチックボトルを排除し、水分を抜いて有効成分だけをギュッと固めた「固形シャンプーバー（固形石鹸シャンプー）」おすすめ10選！従来の石鹸シャンプーのようなキシキシ感がなく、植物由来アミノ酸と濃密泡で頭皮の毛穴汚れをすっきり洗い上げる人気バーを徹底解説。',
    products: fetched.t2,
    lead: `「バスルームのプラスチックボトルを減らしてスッキリとお洒落にまとめたい」「旅行やジム、サウナに重い液体シャンプーのボトルを持ち歩きたくない」「頭皮のベタつきや毛穴詰まりを植物の力で優しくディープクレンジングしたい」……世界的なサステナブル美容トレンドとして熱狂的な支持を集めているのが、**「固形シャンプーバー」**です。

一般的な液体シャンプー（約80%が水分）と違い、有用成分を濃縮した驚きのメリットがあります：
- **手のひらサイズ1個で液体シャンプー約2〜3本分に相当するロングライフ設計**：驚くほど長持ちし、ゴミが出ないゼロウェイストで地球にもお財布にも優しい
- **弱酸性・アミノ酸洗浄成分配合で「固形＝髪がキシむ」という常識を完全打破**：濡らした髪に直接滑らせるだけでモコモコ濃密泡が立ち、指通りなめらかなサロン級の仕上がり
- **天然精油やシアバター・アルガンオイルの豊かな香りと保湿力**：バスルームいっぱいに広がる上質なアロマで、毎日のシャワータイムが極上の癒やしスパへ

今回はマックス石鹸のTheBARをはじめ、楽天市場で口コミ絶賛の固形シャンプー＆コンディショナー10選を徹底比較します！`
  },
  {
    id: 'art-ceramic-cuticle-pusher-stone-pen-10sen-2026',
    slug: 'art-ceramic-cuticle-pusher-stone-pen-10sen-2026',
    title: '【セラミックキューティクルプッシャー10選】オイルインで爪を傷つけない！爪の根元の頑固なルーズスキンを削り落とす甘皮処理ストーンペン比較',
    category: 'ネイルケア',
    date: '2026-09-14',
    description: '金属のプッシャーで自爪をガリッと削る心配なし！セラミック（軽石）の適度な研磨力で甘皮とルーズスキンを優しく削りオフする「セラミックキューティクルプッシャー（オイルインストーンペン）」おすすめ10選！ジェルネイルの密着度を劇的に高める人気ツールを徹底検証。',
    products: fetched.t3,
    lead: `「セルフジェルネイルをしても根元から数日で浮いてきてペロンと剥がれてしまう」「金属のキューティクルプッシャーだと爪の表面まで削ってしまいそうで怖い」「甘皮の処理をどうやっていいか分からない初心者でも失敗しない道具が欲しい」……そんなネイルの下準備（プレパレーション）に革命を起こすのが、**「セラミックキューティクルプッシャー」**です。

ネイルサロンでも下処理の定番として愛用される安心・確実な設計を誇ります：
1. **適度なザラつきを持つセラミックヘッドが爪に張り付いたルーズスキンだけを削り落とす**：爪を痛めずに不要な角質だけを粉状にスルスル除去し、ネイルベッドの輪郭を拡大
2. **ペンシル型デザインで鉛筆を持つように安定して甘皮を押し上げ可能**：斜めカットされた先端が爪のカーブにシンデレラフィットし、利き手と逆側の手でもブレずに操作
3. **植物オイルが染み出すタイプなら爪を保湿しながら痛みのないスムーズなケアを実現**：摩擦による乾燥を防ぎ、何も塗っていない自爪も美しく整った清潔感ある指先へ

今回はネイル工房など人気ネイルショップの定番モデルからプロ愛用のストーンプッシャー10選を徹底比較します！`
  },
  {
    id: 'art-collagen-plumping-lip-sleeping-mask-10sen-2026',
    slug: 'art-collagen-plumping-lip-sleeping-mask-10sen-2026',
    title: '【コラーゲン配合スリーピングリップマスク10選】寝ている間に縦じわ・ガサガサ皮剥けを集中密閉補修！翌朝ぷるぷる唇を叶える夜用リップパック比較',
    category: 'リップケア',
    date: '2026-09-14',
    description: 'リップクリームをいくら塗っても乾く頑固な乾燥唇に！寝る前にたっぷり塗って寝ている間に水分を閉じ込め、翌朝ぷるんとした弾力唇へと導く「スリーピングリップマスク（夜用リップパック）」おすすめ10選！ハニーやベリー、コラーゲン配合の人気リップケアを徹底解説。',
    products: fetched.t4,
    lead: `「冬やエアコンの乾燥で唇がカサカサになり皮がむけて血がにじむ」「口紅を塗ると縦じわが目立ってマットリップが綺麗に乗らない」「日中に何度もリップクリームを塗り直すのが面倒」……そんな唇の皮剥け・縦じわ悩みを一晩でぷるぷるに蘇らせるのが、**「スリーピングリップマスク」**です。

夜寝ている間のゴールデンタイムに集中トリートメントする贅沢な処方を採用しています：
- **高粘度の濃密バームが唇表面に潤いシールドを形成して水分蒸発を完全ガード**：朝起きるまでしっとり感が持続し、乾燥した古い角質を睡眠中に柔らかくふやかす
- **コラーゲン・ヒアルロン酸・ペプチドが角質層に浸透して内側からふっくらプランプ効果**：気になる縦じわの溝を押し上げ、生まれたてのようなボリューム感のある血色リップへ
- **翌朝軽くティッシュオフするだけで不要な角質がポロポロ剥がれてつるすべに**：朝のメイク乗りが劇的に向上し、ティントやリップグロスが吸い付くように密着

今回はSNSで話題のKyogokuスリーピングリップマスクをはじめ、楽天市場で口コミ絶賛の夜用リップトリートメント10選を徹底比較します！`
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
  content += `### 1. 成分の肌への優しさと安全基準を最優先にチェック\n直接触れるアイテムだからこそ、レンズへの傷つき防止性や、アミノ酸系洗浄成分の優しさ、セラミック研磨面の均一性、リップの保湿密閉力をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n拭くだけ、撫でるだけ、くるくる押し上げるだけ、寝る前に塗るだけなど、忙しい生活の中でも無理なく続けられる仕様を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と力加減を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 147 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
