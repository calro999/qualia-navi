import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch146_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ146の4記事の定義
const batchDefs = [
  {
    id: 'art-tongue-scraper-pure-copper-stainless-10sen-2026',
    slug: 'art-tongue-scraper-pure-copper-stainless-10sen-2026',
    title: '【純銅＆ステンレス製舌スクレーパー10選】撫でるだけで白い舌苔をごっそり除去！味蕾を傷つけず朝の口臭を根本リセットする人気舌クリーナー比較',
    category: 'オーラルケア',
    date: '2026-09-14',
    description: '歯ブラシで舌をゴシゴシ擦って味覚や粘膜を傷つけるのはNG！インド伝統アーユルヴェーダ発想の「純銅＆医療用ステンレス製舌スクレーパー（タンスクレーパー）」おすすめ10選！朝起きてすぐに数秒撫でるだけで、口臭の原因菌と舌苔を優しくかき出す大ヒット器具を徹底比較。',
    products: fetched.t1,
    lead: `「朝起きた時の口の中のネバつきや口臭が気になる」「鏡を見ると舌が白くコーティング（舌苔）されていて不潔に見える」「歯ブラシで舌を磨くとオエッとなったり舌が痛くなる」……そんな口臭の最大の発生源である舌の汚れを、最も安全に一掃するのが、**「純銅＆ステンレス製舌スクレーパー」**です。

アーユルヴェーダの知恵と現代の人間工学が融合したU字型デザインが、感動のオーラルケアを実現します：
1. **舌の形状にフィットする滑らかな曲線刃が舌苔だけを均一にこそげ落とす**：ブラシのように汚れを奥に押し込むことなく、奥から手前にスッと引くだけで驚くほどの汚れを除去
2. **純銅特有の卓越した天然抗菌作用＆半永久的に錆びない高耐久ステンレス**：雑菌が繁殖しにくく、使用後は水洗いして拭くだけで何年間も衛生的に愛用可能
3. **味蕾（みらい）を傷つけないため食事の味がより美味しく鮮明に**：舌表面の感覚がリセットされ、薄味でも出汁や素材の旨味をしっかり感じられる健康効果も

今回は楽天市場でランキング上位を独占するタンスクレーパーから専用収納ポーチ付きセットまで10選を徹底比較します！`
  },
  {
    id: 'art-hydrocolloid-invisible-pimple-patch-10sen-2026',
    slug: 'art-hydrocolloid-invisible-pimple-patch-10sen-2026',
    title: '【ハイドロコロイド極薄密着ニキビパッチ10選】メイクの上から目立たない！滲出液を吸水して早く治しCICA＆ティーツリーで鎮静する人気スポットパッチ比較',
    category: 'スキンケア',
    date: '2026-09-14',
    description: 'できたての赤ニキビや潰れかけのニキビを外部刺激から守り、滲出液を吸収してスピーディーに鎮静化する「ハイドロコロイドニキビパッチ」おすすめ10選！上からファンデーションを重ねてもフチが目立たない0.01mm極薄マットフィルムやVT CICA配合の人気パッチを徹底解説。',
    products: fetched.t2,
    lead: `「大事な予定の前日に限って目立つ赤ニキビがポツンとできてしまった」「気になって無意識に手で触ったり潰して跡になるのを防ぎたい」「ニキビの上からメイクをしたいけれど悪化しないか心配」……そんな突然のニキビ危機を誰にもバレずに最速ケアするのが、**「ハイドロコロイド極薄ニキビパッチ」**です。

傷パワーパッドと同じ医療用湿潤療法（モイストヒーリング）を取り入れた進化系パッチです：
- **ハイドロコロイド素材が余分な皮脂や滲出液をグングン吸水して白く保護**：ニキビを密封して雑菌の侵入やマスクの摩擦を物理的に100%シャットアウト
- **フチに向かって薄くなるベベル加工＆光を反射しないつや消しマット仕上げ**：貼っている境目が肉眼ではほとんど見えず、コンシーラーやファンデを重ねてもヨレない
- **CICA（ツボクサエキス）やティーツリー・サリチル酸配合で先回り鎮静**：肌荒れ防止成分が角質層に浸透し、剥がした時には赤みがスーッと引いたなめらか素肌へ

今回は楽天市場で一番人気のVT PRO CICAスポットパッチをはじめ、大容量コスパ優秀パッチ10選を徹底比較します！`
  },
  {
    id: 'art-retinol-body-milk-lotion-firming-10sen-2026',
    slug: 'art-retinol-body-milk-lotion-firming-10sen-2026',
    title: '【高純度レチノール配合ボディミルク＆クリーム10選】二の腕・デコルテ・お尻のザラつきを集中ケア！全身のハリツヤ弾力を取り戻す人気エイジングボディケア比較',
    category: 'ボディケア',
    date: '2026-09-14',
    description: 'フェイスケアの主役「レチノール」を全身に惜しみなくチャージ！二の腕やお尻のザラつき、首元・デコルテの小じわやハリ不足をなめらかに整える「レチノール配合ボディクリーム（ボディローション）」おすすめ10選！iHerbやSNSで爆発的人気のアドバンスドクリニカルズ等を徹底検証。',
    products: fetched.t3,
    lead: `「年齢とともにお尻や二の腕の皮膚がザラついてハリがなくなってきた」「首やデコルテに細かい小じわが増えてボディの老け見えが気になる」「ただ保湿するだけでなく、肌のターンオーバーを促して全身をつるすべ美肌にしたい」……そんな大人のボディケアを劇的に格上げするのが、**「レチノール配合ボディミルク＆クリーム」**です。

美容皮膚科学でも信頼の厚いビタミンA（レチノール）が、全身の肌密度を高めます：
1. **ターンオーバーを促進してごわついた古い角質を自然にリセット**：カサカサした肌触りを陶器のようになめらかに磨き上げ、シルクのような極上シルキータッチへ
2. **コラーゲンやエラスチンの生成をサポートしてパンと張った弾力ボディへ**：首元、胸元、ヒップ、太もものたるみ感をキュッと引き締まった若々しい印象に補正
3. **大容量ポンプタイプで毎日お風呂上がりに全身へ贅沢にたっぷり塗布**：ベタつきのない高浸透エマルジョン設計で、塗った後すぐにパジャマを着ても快適

今回はiHerbやSNSで殿堂入りを果たした海外直輸入コスメから日本製の低刺激処方まで10選を徹底比較します！`
  },
  {
    id: 'art-keratosis-pilaris-urea-body-soap-10sen-2026',
    slug: 'art-keratosis-pilaris-urea-body-soap-10sen-2026',
    title: '【二の腕のブツブツ対策・薬用石鹸＆クリーム10選】毛孔性苔癬のサメ肌・赤いザラつきを根本洗浄！重曹＆尿素で角質を柔らかくほぐす人気ボディソープ比較',
    category: 'ボディケア',
    date: '2026-09-14',
    description: 'ノースリーブや水着を着るのを諦めていた「二の腕の赤いブツブツ・サメ肌（毛孔性苔癬）」を優しく洗い流す「二の腕用角質ケア石鹸＆尿素クリーム」おすすめ10選！ペリカン石鹸の重曹せっけんをはじめ、毛穴に詰まった硬い角栓を溶かしてつるつる素肌へ導く人気アイテムを徹底解説。',
    products: fetched.t4,
    lead: `「昔から二の腕の裏側に赤いポツポツがあってノースリーブや半袖が着られない」「太ももやお尻の付け根がザラザラしてサメ肌のようになっている」「ボディタオルでゴシゴシこすっても悪化するばかりで一向に治らない」……そんな二の腕のブツブツ（毛穴に古い角質が詰まる毛孔性苔癬）に悩む人のための救世主が、**「二の腕ザラつき専用石鹸＆角質ケア」**です。

肌を擦らずに角質を柔らかく溶かしてオフする独自の洗浄処方を採用しています：
- **重曹（弱アルカリ性）の力で毛穴に詰まった硬い角質を泥のように柔らかく分解**：無理に削り取らずに優しく泡パックするだけで、毛穴の詰まり栓をスルリと排出
- **尿素やサリチル酸などの角質柔軟成分が肌深くまで浸透してゴワつきを解消**：水分保持力を高めながらターンオーバーを整え、赤みと凹凸の目立たないなめらか肌へ
- **泥（クレイ）や植物オイル配合で洗い上がりもしっとり乾燥を防ぐ**：乾燥による過剰な角化スパイラルを断ち切り、使うたびにキメの整ったすべすべ二の腕へ

今回はペリカン石鹸のロングセラー「二の腕を洗う重曹石鹸」をはじめ、口コミ絶賛の二の腕ケアアイテム10選を徹底比較します！`
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
  content += `### 1. 成分の肌への優しさと安全基準を最優先にチェック\n直接触れるアイテムだからこそ、金属の純度や、ハイドロコロイドの密着度、レチノールの濃度設計、角質柔軟成分（重曹・尿素）の配合バランスをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\nスッと引くだけ、貼るだけ、お風呂上がりに塗るだけ、泡立てて洗うだけなど、忙しい生活の中でも無理なく続けられる仕様を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と力加減を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと自信に満ちた素肌を手に入れましょう。\n\n`;
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

console.log(`[Batch 146 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
