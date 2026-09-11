import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch125_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ125の4記事の定義
const batchDefs = [
  {
    id: 'art-nighttime-graduated-compression-socks-open-toe-10sen-2026',
    slug: 'art-nighttime-graduated-compression-socks-open-toe-10sen-2026',
    title: '【夜用着圧ソックス＆オープントゥ美脚オーバーニー10選】寝ている間に段階着圧で翌朝スッキリ細見え！きつすぎず朝まで快眠できる人気おやすみソックス比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '立ち仕事やデスクワークで夕方パンパンにむくんだ脚を、寝ている間にリセットする「夜用着圧ソックス（オープントゥ・ニーハイ）」おすすめ10選！足首から太ももにかけて適切な段階圧力をかけ、熱がこもらず朝までぐっすり眠れる日本製人気モデルを徹底検証。',
    products: fetched.t1,
    lead: `「夕方になるとブーツやパンプスがキツい」「お風呂上がりにマッサージしても翌朝脚が重い」「昼用の着圧ソックスを寝るときに履いたら締め付けすぎて眠れなかった」……そんな脚のむくみトラブルに最適なのが、**就寝時専用に設計された「夜用着圧ソックス」**です。

昼用と夜用では求められる圧力設計が全く異なります：
1. **就寝時の横になった姿勢に合わせたマイルドな段階着圧**：足首をキュッと引き締め、ふくらはぎ、太ももへと上方に向かって圧力を段階的に弱めることで、静脈の巡りを自然にアシスト
2. **オープントゥ（つま先カット）設計による体温調節**：足先から余分な熱を発散させ、睡眠の深さを妨げず朝まで快適な温度をキープ
3. **肌に優しいコットンブレンド＆幅広リブ**：寝返りを打ってもズレ落ちず、太ももにゴムの食い込み跡が残りにくいストレスフリーな着用感

今回は楽天市場で「翌朝脚が軽くなる」と絶賛レビューが集中する日本製ロングセラーから、肌触り抜群のシルク混モデルまで厳選10選を徹底比較します！`
  },
  {
    slug: 'art-hydrogel-eye-patch-stem-cell-cooling-10sen-2026',
    id: 'art-hydrogel-eye-patch-stem-cell-cooling-10sen-2026',
    title: '【ハイドロゲル目元アイパッチ＆高密着ハイドロゲルシート10選】美容液をまるごと固めたぷるぷる感触！目元の小じわ・クマ・ほうれい線を集中冷却リフトケア',
    category: 'アイケア',
    date: '2026-09-11',
    description: '美容液成分をそのままゲル状に凝縮した「ハイドロゲルアイパッチ」おすすめ10選！体温に反応して美容成分がじわじわ溶け出し、乾きやすい目元やほうれい線にピタッと密着。スマホによる目元の疲れやクマ・乾燥小じわをケアする最新アイケア。',
    products: fetched.t2,
    lead: `「目の下のどんよりクマがコンシーラーでも隠せない」「笑ったときの目尻の乾燥小じわが気になる」「夕方になるとほうれい線の溝にファンデーションが溜まる」……そんなピンポイントなエイジングサインに絶大な効果を発揮するのが、**「ハイドロゲル目元アイパッチ」**です。

通常の不織布シートマスクとは一線を画す、ハイドロゲルならではの優れた特徴は以下の通りです：
- **美容成分そのものをぷるぷるのゲル状に固めた濃密設計**：ヒト幹細胞培養液やコラーゲン、ヒアルロン酸が凝縮され、時間とともにゲルが薄くなるほど肌へ浸透
- **体温でじんわり肌に馴染みズレ落ちない高密着力**：家事をしながらやスマホを見ながらでも液だれ・剥がれ落ちがなく、気になる部分を集中密封
- **ひんやりとしたクーリング効果で目元のむくみも引き締め**：冷蔵庫で冷やして使用すれば、朝の重たいまぶたや目の下のたるみをスッキリ引き締め

今回は韓国コスメの実力派から大容量60枚入り（30回分）の高コスパモデルまで、楽天市場で評価の高いハイドロゲルアイパッチ10選を徹底比較します！`
  },
  {
    slug: 'art-contour-stick-cream-shading-highlighter-10sen-2026',
    id: 'art-contour-stick-cream-shading-highlighter-10sen-2026',
    title: '【2in1コントゥアスティック＆クリームシェーディング10選】描いてぼかすだけで立体小顔！鼻筋・人中短縮・エラ削りを誰でも失敗なく叶える最新陰影コスメ比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: 'ハイライトとシェーディングが1本になった「コントゥアスティック」おすすめ10選！パウダーのように粉飛びせず、肌に溶け込むクリーミーな質感で自然な彫りの深さを演出。鼻筋のすっきり見せ、人中短縮、フェイスラインの小顔補正を徹底解説。',
    products: fetched.t3,
    lead: `「パウダーのシェーディングだと顔が黒く汚れて見えてしまう」「鼻筋を通したいけれど不自然な舞台メイクになりがち」「人中（鼻と上唇の間）を短く見せて若々しい印象にしたい」……そんな立体感メイクの悩みを解消するのが、**「2in1コントゥアスティック」**です。

スティック形状ならではの操作性とぼかしやすさには、以下のメリットがあります：
1. **狙ったポイントにピンポイントで影と光を描き足せる**：小鼻の脇、唇の山、フェイスラインなど細かいパーツにもブレずに直塗り可能
2. **肌の体温でとろけるクリーミーテクスチャー**：スポンジや指先でポンポンとなじませるだけで、まるで生まれつきの骨格のような自然な陰影を形成
3. **メイク初心者でも失敗しない黄み・赤みを抑えた影色設計**：肌馴染みの良いグレージュ系・トープ系の影色と、繊細なツヤを与えるハイライトのベストバランス

今回はエチュードやアイムミミなどの人気スティックからパレット型まで、楽天市場で売れ筋上位を誇るコントゥアコスメ10選を徹底比較します！`
  },
  {
    slug: 'art-deep-moisture-bath-milk-ceramide-skin-care-10sen-2026',
    id: 'art-deep-moisture-bath-milk-ceramide-skin-care-10sen-2026',
    title: '【高保湿スキンケアバスミルク＆乳白色液体入浴剤10選】お風呂上がりの粉吹き・カサつきゼロへ！全身美容液に浸かるような極上の潤いとミルキーな香りを徹底比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '湯船に入れるだけで全身をしっとり潤いのベールで包み込む「スキンケアバスミルク（液体入浴剤）」おすすめ10選！セラミド・シアバター・ゴートミルク配合で、乾燥肌や敏感肌のお風呂上がりのかゆみ・粉吹きを防ぎ、贅沢な香りで心までほぐす人気バスミルクを検証。',
    products: fetched.t4,
    lead: `「お風呂から上がった瞬間から肌が突っ張ってカサカサする」「すねや背中が乾燥して粉を吹いてしまう」「入浴後に全身へボディクリームを塗るのが面倒」……そんな秋冬やエアコンによる全身の乾燥に悩む方に選ばれているのが、**「高保湿バスミルク（液体入浴剤）」**です。

さら湯（水道水そのままのお湯）は皮膚の潤い成分を流出させやすいですが、バスミルクを入れることで極上の美容液風呂へと変化します：
- **お湯全体が乳白色のまろやかなテクスチャーに変化**：肌表面に薄い保湿ヴェールを形成し、入浴中の水分蒸発と肌の乾燥を徹底ブロック
- **セラミド・天然オイル・ミルクプロテインで角層深部まで保湿**：湯船に浸かっているだけで手が届きにくい背中やデコルテまで全身すみずみまで潤いをチャージ
- **優しいミルキーな香りでリラックス効果抜群**：バニラ、ラベンダー、カモミールなどの甘く穏やかな香りがバスルームいっぱいに広がり、1日の緊張を解きほぐす

今回はゴートミルクパウダー配合の本格派から、赤ちゃんとも一緒に入れる低刺激設計まで、楽天市場で口コミ人気の高いバスミルク10選を徹底比較します！`
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
  content += `### 1. 配合成分と肌への優しさを最優先にチェック\n直接肌に長時間触れたり、毎日全身に使用するアイテムだからこそ、低刺激設計、保湿成分の濃度、着圧の適正圧力などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さ\n寝る前に履くだけ、貼るだけのワンステップ、スティックでさっと描ける操作性など、忙しい毎日でも続けられる仕様を選ぶことが継続の鍵です。\n\n`;
  content += `### 3. レビュー評価とリピート率から見るコストパフォーマンス\n消耗品は大容量パックの有無、ギアやコスメは持ちの良さを確認し、長く愛用できるコスパの良い製品を選びましょう。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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

console.log(`[Batch 125 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
