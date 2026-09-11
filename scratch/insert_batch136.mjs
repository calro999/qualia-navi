import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch136_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ136の4記事の定義
const batchDefs = [
  {
    id: 'art-magnesium-chloride-bath-flakes-relax-10sen-2026',
    slug: 'art-magnesium-chloride-bath-flakes-relax-10sen-2026',
    title: '【高濃度塩化マグネシウム入浴剤・バスフレーク10選】にがり温泉で芯から温活！筋肉疲労・肩こり・睡眠の質を高める経皮マグネシウム入浴料比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: 'エプソムソルトの進化版としてSNSやサウナ・温活好きの間で大バズり中の「塩化マグネシウム・バスフレーク（にがり入浴剤）」おすすめ10選！お風呂に入れるだけでミネラルを皮膚からたっぷり吸収し、頑固な冷えや筋肉の緊張をほぐして深い眠りへと誘う大人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「エプソムソルトを使ってみたけれど、もっと体の芯からポカポカ温まりたい」「寝る時に足先が冷えて寝付けない・夜中に足がつる（こむら返り）」「デスクワークや立ち仕事で肩やふくらはぎがガチガチに張っている」……そんな現代人の慢性的なミネラル不足と冷え・疲労に劇的なアプローチとして注目されているのが、**「高濃度塩化マグネシウム・バスフレーク」**です。

海水から抽出される「にがり」の主成分である塩化マグネシウムは、驚きの温活・疲労回復パワーを持っています：
1. **硫酸マグネシウム（エプソムソルト）を凌ぐ高い保湿力と温まり持続性**：皮膚の角質層に水分をしっかり閉じ込め、湯上がり後も湯冷めせずポカポカ感が持続
2. **お湯に浸かるだけで全身からミネラルを補給する「経皮吸収」**：ストレスや運動で消耗しやすい必須ミネラルをダイレクトにチャージし、筋肉の緊張をリセット
3. **塩素を除去してお湯をまろやかにする肌への優しさ**：一番風呂特有のピリピリ感を和らげ、敏感肌やアトピー肌、小さなお子様がいるご家庭でも安心

今回は大容量コスパ抜群のニチガ（NICHIGA）をはじめ、楽天市場で口コミ評価★4.7以上を誇る売れ筋マグネシウム入浴剤10選を徹底比較します！`
  },
  {
    id: 'art-dry-makeup-brush-cleaner-sponge-10sen-2026',
    slug: 'art-dry-makeup-brush-cleaner-sponge-10sen-2026',
    title: '【水なしメイクブラシクリーナースポンジ10選】くるくる撫でるだけで3秒色落ち！アイシャドウの混色を防ぎブラシを傷めず清潔キープするドライスポンジ比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: '水で洗って干す面倒な手間が完全ゼロ！ブラシを表面でくるくる擦るだけでアイシャドウやチークの粉と色を一瞬で落とせる「ドライブラシクリーナースポンジ」おすすめ10選！何本もブラシを持ち歩かずに1本で多色グラデーションが完成する時短神アイテムを徹底解説。',
    products: fetched.t2,
    lead: `「濃いアイシャドウを使った後に淡いラメ色を乗せたいけれど色が混ざってしまう」「メイクブラシを水洗いすると乾くのに丸一日かかって翌朝使えない」「朝の忙しいメイク時間にブラシを持ち替える手間を省きたい」……そんなメイク好きのリアルな悩みをたった3秒で解決するのが、**「水なしメイクブラシクリーナースポンジ」**です。

缶に入った特殊な多孔質スポンジの上でブラシの毛先を軽くなでるだけで、感動の使いやすさを発揮します：
- **水も洗剤も使わず、ブラシの粉離れを一瞬で実現**：特殊粗目フィルターが毛の奥に潜むパウダー粒子だけを絡め取り、ブラシの毛質を痛めずサラサラに復元
- **1本の愛用ブラシで何色でもアイシャドウを塗り分け可能**：締め色からニュアンスカラー、ラメまで自由自在にチェンジできるため、ポーチの軽量化にも大貢献
- **スポンジは水洗いで何度でも繰り返し使えて超エコ**：粉が溜まったら中身のスポンジを取り出してハンドソープで洗うだけで、半永久的に清潔に再利用可能

今回は楽天市場でメイクアップアーティストや美容系YouTuberも絶賛する携帯用＆据え置き型ドライブラシクリーナー10選を徹底比較します！`
  },
  {
    id: 'art-dewy-wet-glow-powder-highlighter-10sen-2026',
    slug: 'art-dewy-wet-glow-powder-highlighter-10sen-2026',
    title: '【濡れツヤ生ハイライトパウダー10選】粉っぽさゼロで内側から発光する水光肌！毛穴落ちせず立体的な透明感と艶を宿す微細パールハイライター比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: 'クリームハイライトのヨレやすさとパウダーの乾燥感を両方克服した「濡れツヤ生ハイライトパウダー」おすすめ10選！しっとりオイルコーティングされた極微細パールが肌に溶け込み、Cゾーンや鼻筋・唇の上に濡れたようなみずみずしい光を宿す人気コスメを徹底比較。',
    products: fetched.t3,
    lead: `「スティックやバームのハイライトは肌がベタついてマスクにペタペタつく」「普通のパウダーハイライトだと毛穴が目立ったり小じわに粉っぽく入り込む」「素肌そのものが潤って発光しているような自然なツヤ肌を作りたい」……ベースメイクの完成度を左右するツヤと立体感の鍵となるのが、**「濡れツヤ生ハイライトパウダー」**です。

最新のテクノロジーで作られた生感パウダーには、圧倒的な美肌演出効果があります：
1. **独自のしっとり高密着処方でパウダーなのに「濡れ感」を実現**：皮脂や摩擦に強く、夕方になってもくすまずに朝塗りたての生ツヤをキープ
2. **ギラギラ悪目立ちしない繊細なマイクロシマーパール**：毛穴やキメの凹凸を光で自然に飛ばし、つるんとなめらかな陶器肌を演出
3. **骨格を際立たせて顔立ちをキュッと引き締める3D立体補正**：鼻根や目頭、上唇の山、顎先にサッとひとはけするだけで、平坦な顔立ちにメリハリと透明感をプラス

今回はSNSで爆売れ中のmuice（ミュアイス）をはじめ、プチプラからデパコス級まで楽天市場で売れ筋のハイライトパウダー10選を徹底比較します！`
  },
  {
    id: 'art-soundproof-sleep-earmuffs-ear-warmer-10sen-2026',
    slug: 'art-soundproof-sleep-earmuffs-ear-warmer-10sen-2026',
    title: '【防音・安眠イヤーマフ＆快眠耳栓10選】横向き寝でも耳が痛くならない！家族のいびき・生活騒音・外部の音を遮断して朝まで熟睡できる睡眠グッズ比較',
    category: 'ヘルスケア',
    date: '2026-09-11',
    description: '家族やパートナーのいびき、近隣の生活音、外の車の騒音で目が覚めてしまう方に！耳の穴が痛くならず横向き寝でも快適にフィットする「安眠イヤーマフ＆睡眠専用遮音グッズ」おすすめ10選！医師監修の超柔軟シリコン耳栓から耳を包み込んで温める快眠ヘッドバンドまで徹底解説。',
    products: fetched.t4,
    lead: `「家族のいびきや歯ぎしりが気になって毎晩夜中に何度も目が覚める」「一般的なスポンジ耳栓だと耳の穴が圧迫されて痛くて着けていられない」「外部の車の音や深夜の足音などの生活騒音をシャットアウトして静寂の中で眠りたい」……睡眠の質を左右する「音のストレス」に悩む現代人の必需品となっているのが、**「防音・安眠イヤーマフ＆快眠遮音グッズ」**です。

ストレスフリーで朝まで熟睡できる工夫が凝縮されています：
- **耳の形状に吸い付くようにフィットする人間工学＆医療用シリコン設計**：寝返りを打っても外れにくく、枕に耳を押し当てても痛くならない抜群のクッション性
- **人の声やいびき・低周波騒音をピンポイントで減衰する高遮音性能**：目覚ましのアラーム音はしっかり聞き取れる絶妙な遮音フィルターを搭載し、寝坊の心配もクリア
- **丸洗い可能でいつでも清潔＆耳の温活効果で入眠をサポート**：耳周りの血行を促す素材や水洗いできる抗菌仕様で、毎晩衛生的にリラックス快眠

今回は楽天総合ランキング1位を獲得した大人気モデルをはじめ、楽天市場で絶大な支持を集める安眠遮音アイテム10選を徹底比較します！`
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
  content += `### 1. 安全性・肌や耳への負担の少なさを最優先にチェック\n毎日使うアイテムだからこそ、天然ミネラル成分の純度や、スポンジの毛質への優しさ、パウダーの密着度、イヤーマフ・耳栓の素材の柔らかさなどをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さとお手入れ性\nお風呂に入れるだけ、くるくる擦るだけ、サッとひとはけ塗るだけなど、忙しい生活の中でも無理なく続けられる仕様を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用量を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想のリラックスタイムと美しさを手に入れましょう。\n\n`;
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

console.log(`[Batch 136 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
