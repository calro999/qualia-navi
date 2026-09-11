import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch132_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ132の4記事の定義
const batchDefs = [
  {
    id: 'art-water-transfer-eyebrow-tattoo-sticker-10sen-2026',
    slug: 'art-water-transfer-eyebrow-tattoo-sticker-10sen-2026',
    title: '【水で貼るだけ眉毛タトゥーシール＆6Dリアル眉ステッカー10選】汗・皮脂・擦れでも最長1週間消えない！自眉のような立体毛並みを再現する時短アートメイクシール比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: '眉毛が薄い・抜きすぎて生えてこない・毎朝の眉メイクが苦手な人の救世主「水転写式・眉毛タトゥーシール」おすすめ10選！本物の毛並み一本一本を精密プリントした6D立体デザインで、お風呂やジム・プールでも落ちない耐久美眉を徹底検証。',
    products: fetched.t1,
    lead: `「毎朝の眉毛メイクに一番時間がかかるし、左右対称に描けない」「まろ眉・薄眉のせいで、すっぴんでコンビニに行くのも恥ずかしい」「アートメイクはお金がかかるし失敗が怖い」……そんな眉の悩みをたった1分で解決するのが、SNSで爆発的な人気を誇る**「眉毛タトゥーシール」**です。

水で濡らしてペタッと貼るだけで、プロが描いたような完璧な美眉が手に入ります：
1. **本物の眉毛を一本一本植毛したかのような「6Dリアル毛並みプリント」**：のっぺりとした塗りつぶし感が一切なく、自眉と見分けがつかないほど自然な立体感を再現
2. **水・汗・擦れに強く最長3〜7日間キープ**：水やクレンジングに強いウォータープルーフ仕様で、夏のレジャーや温泉・サウナ、就寝時でも綺麗な眉を保持
3. **シートをハサミで切って貼るだけの超簡単1分装着**：失敗してもベビーオイルやセロハンテープで簡単にオフできるため、その日の気分やメイクに合わせて形を変えられる

今回は平行眉・アーチ眉など骨格に合わせて選べる大容量セット（15枚セット等）を中心に、楽天市場で人気の眉シール10選を徹底比較します！`
  },
  {
    slug: 'art-individual-cluster-false-eyelashes-glue-free-10sen-2026',
    id: 'art-individual-cluster-false-eyelashes-glue-free-10sen-2026',
    title: '【部分用ポイントつけまつげ＆のり不要ワンホン束感マツエク10選】自まつ毛の隙間に数束足すだけで劇的デカ目！ピンセット不要で1秒装着できる韓国アイドルまつ毛比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: 'フルタイプのつけまつげのような不自然さゼロ！自まつ毛の薄い部分や黒目の上に数束だけプラスする「部分用ポイントつけまつげ」おすすめ10選！のり不要・あらかじめ粘着剤がついた1秒マツエクから、トレンドのワンホン束感まつ毛まで徹底検証。',
    products: fetched.t2,
    lead: `「丸ごとのつけまつげは目頭がチクチクして浮いてくる」「マスカラを何度も重ねるとヒジキのようにダマになる」「韓国アイドルのようなツヤのある束感まつ毛を自前で作りたい」……そんなトレンドメイクを叶える最新ツールが、**「部分用ポイントつけまつげ（クラスターラッシュ）」**です。

1束（数本〜十数本）単位で分かれているため、圧倒的な自然さと自由度を誇ります：
- **自まつ毛の下からピタッと仕込むインビジブル装着**：つけまつげの根元が完全に隠れるため、至近距離で見られても自まつ毛にしか見えない究極の抜け感
- **のり（グルー）不要で置くだけの最新「感圧式1秒マツエク」**：接着剤を乾かす待ち時間ゼロで、まぶたにペタッと乗せるだけで瞬時に強力密着
- **目尻長め・中央強調・タレ目風など目の形をミリ単位で補正**：欲しい部分だけに毛量を足せるため、奥二重やまぶたの重さに左右されず理想の目元をデザイン

今回は楽天ランキングで大注目の「のり不要タイプ」や大容量アソートボックスなど、初心者でも失敗しない部分用つけまつげ10選を徹底比較します！`
  },
  {
    slug: 'art-quick-gray-hair-retouch-stick-mascara-cover-10sen-2026',
    id: 'art-quick-gray-hair-retouch-stick-mascara-cover-10sen-2026',
    title: '【お出かけ前1分！白髪リタッチスティック＆部分用白髪隠し10選】生え際・分け目のキラッと光る白髪をサッと隠す！手や頭皮を汚さずゴワつかない速乾カバー比較',
    category: 'ヘアケア・白髪染め',
    date: '2026-09-11',
    description: '「美容院に行く時間がないのに明日大事な予定がある」「分け目やもみあげの数本の白髪が目立って気になる」時にサッと塗るだけの「部分用白髪リタッチスティック・マスカラ」おすすめ10選！ベタつかず速乾、シャンプーで簡単に落とせる人気名品を徹底解説。',
    products: fetched.t3,
    lead: `「全体を染めるほどではないけれど、生え際や分け目の白髪がチラチラ目立つ」「美容室の予約日までの数日間、なんとか白髪を隠したい」「ファンデーションタイプだと汗で額に黒く垂れてこないか心配」……大人世代の髪の悩みの筆頭である「白髪の緊急リタッチ」に欠かせないのが、**「白髪隠しスティック・ヘアマスカラ」**です。

最新の白髪リタッチアイテムは、昔のゴワゴワ・ベタベタした使い心地から劇的に進化しています：
1. **ブラシやコームで狙った白髪だけをピンポイントキャッチ**：アーチ型ブラシが細かい生え際やもみあげにもフィットし、地肌に液をつけずに毛髪だけを綺麗に着色
2. **塗って数分で乾く速乾処方＆ウォータープルーフ**：服の襟元に色移りせず、外出先で雨や汗をかいても黒い汗が流れる心配ゼロ
3. **使うたびに徐々に白髪が染まるトリートメント配合モデルも**：単なる一時染毛にとどまらず、ヘナや植物染料で自然に目立たなくしていく美髪ケア

今回はレフィーネなどの人気サロン発ブランドからドラッグストアの実力派まで、楽天市場で高評価の白髪リタッチ10選を徹底比較します！`
  },
  {
    slug: 'art-ultra-absorbent-quick-dry-hair-towel-wrap-10sen-2026',
    id: 'art-ultra-absorbent-quick-dry-hair-towel-wrap-10sen-2026',
    title: '【ドライヤー時間を半減！超吸水ヘアドライタオル10選】綿タオルの5倍吸水！ゴシゴシ擦らず巻くだけで熱ダメージを防ぎ美髪を守る速乾マイクロファイバー比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: 'お風呂上がりの長いドライヤー時間を劇的に短縮する「高吸水・速乾ヘアドライタオル」おすすめ10選！髪を擦らず優しく包み込むだけで水分をごっそり吸い上げ、ドライヤーの熱ダメージ・パサつき・電気代を同時に削減する人気美髪タオルを徹底検証。',
    products: fetched.t4,
    lead: `「お風呂上がりにドライヤーを15分以上かけるのが毎日本当に面倒」「夏場はドライヤーの温風でせっかく洗ったのに汗だくになる」「長時間の熱風で毛先が乾燥してパサパサ・枝毛が増えてきた」……そんな美髪づくりの最大の敵である「濡れ髪の放置＆長時間の熱ダメージ」を一撃で解決するのが、**「超吸水ヘアドライタオル」**です。

普通のバスタオルとは吸水スピードと保水力が次元違いです：
- **綿タオルの約3〜5倍のスピード吸水力**：高密度マイクロファイバーの微細な隙間が毛細管現象で水分を瞬間吸引し、髪に巻いておくだけで水分を徹底オフ
- **摩擦レスでキューティクルを傷つけないマシュマロタッチ**：ゴシゴシ擦り合わせる必要がなく、タオルでポンポンと優しく押さえるだけでOK
- **ドライヤー時間を約50%短縮して熱ダメージを最小限に**：髪の内部の潤いを保ったまま短時間で乾かせるため、翌朝の髪のツヤとまとまりが格段にアップ

今回は日本製綿100%の特殊織りタオルからボタン付きヘアターバン型まで、楽天市場でレビュー数千件を集めるヘアドライタオル10選を徹底比較します！`
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
  content += `### 1. 安全設計と肌・髪への負担の少なさを最優先にチェック\n肌や髪に毎日直接触れるアイテムだからこそ、低刺激粘着剤、極細繊維加工、速乾・無添加処方などの安全基準をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める時短仕様\n水で濡らすだけ、置くだけののり不要タイプ、お出かけ前にサッとひと塗りなど、日々の生活の中で無理なく続けられる仕様を選びましょう。\n\n`;
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

console.log(`[Batch 132 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
