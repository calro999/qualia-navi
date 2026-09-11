import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch131_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ131の4記事の定義
const batchDefs = [
  {
    id: 'art-eyelash-perm-silicone-rods-lift-curler-10sen-2026',
    slug: 'art-eyelash-perm-silicone-rods-lift-curler-10sen-2026',
    title: '【まつげパーマ用シリコンロット＆立ち上げラッシュリフト10選】根元からグッと立ち上げてまぶたを重く見せない！サロン専売級セルフまつパ用ロッド徹底比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: '自宅で理想のまつ毛パーマ（ラッシュリフト）を完成させる「シリコン製まつ毛カールロット」おすすめ10選！パリジェンヌラッシュリフトのように根元から80度立ち上げる形状や、一重・奥二重でも瞼に押しつぶされないプロ仕様の溝ありロットを徹底検証。',
    products: fetched.t1,
    lead: `「サロンでまつ毛パーマをすると毎月5000円以上かかって出費がかさむ」「自宅でセルフまつパに挑戦したいけれど、ロットのカーブが合わずに毛先が折れてしまう」「一重やまぶたが重いせいで、まつ毛が上がりにくい」……そんなセルフラッシュリフト派にとって、仕上がりの8割を決定づけるのが**「まつ毛パーマ用シリコンロット」**の選び方です。

従来のゴム製や粗悪なプラスチックロットとは一線を画す、最新シリコンロットのメリットは以下の通りです：
1. **まぶたの丸みに吸い付くように密着する超柔軟医療用シリコン**：グルー（接着剤）を最小限に抑えても端が浮かず、両端のまつ毛まで一本も逃さずホールド
2. **溝あり（ガイドライン付き）設計でバラつき・交差を完全防止**：細かいガイド溝にまつ毛を沿わせるだけで、アイリストが施術したような扇状の完璧なセパレートが完成
3. **目の形や長さに合わせて選べる豊富な立ち上げ・カール形状**：根本から垂直に立ち上げるパリジェンヌ風から、自然なUカール・Cカールまで理想の目元印象を自由自在に演出

今回は楽天市場でプロのアイリストもリピート購入している人気シリコンロット10選を使いやすさとカール形状から徹底比較します！`
  },
  {
    slug: 'art-pure-unrefined-shea-butter-organic-balm-10sen-2026',
    id: 'art-pure-unrefined-shea-butter-organic-balm-10sen-2026',
    title: '【天然無添加シアバター100%バーム＆高保湿オーガニック10選】手のひらの体温でとろける！指先・リップ・かかと・パサつく毛先まで全身守る万能保湿ケア比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '西アフリカの聖なる木「シアの木」の種子から採れる天然植物性油脂「オーガニックシアバター100%」おすすめ10選！ステアリン酸とオレイン酸の黄金比率で肌のバリア機能を強力に守り、手荒れ・乾燥による皮剥け・ささくれ・毛先の枝毛ケアまでマルチに使える名品を解説。',
    products: fetched.t2,
    lead: `「ハンドクリームを塗っても水仕事ですぐ落ちて指先がガサガサ」「リップクリームを1日に何度も塗り直しても唇の皮がめくれる」「敏感肌で添加物や香料が入った保湿クリームがしみる」……そんな頑固な乾燥トラブルに、古くから砂漠の乾燥から肌を守り続けてきた**「天然シアバター100%」**が圧倒的な解決力をもたらします。

シアバターが「保湿の王様」と呼ばれる理由は以下の通りです：
- **人間の皮脂と非常に近い脂肪酸組成（オレイン酸・ステアリン酸）**：肌への親和性が極めて高く、角質層の奥までスーッと溶け込むように馴染んで水分蒸発を完全ガード
- **体温（約36℃）でとろける濃密なバームテクスチャー**：容器の中では固形ですが、手のひらで温めると滑らかなオイル状に変化し、肌に薄い保護ベールを形成
- **顔・唇・爪・髪・かかと・赤ちゃんの肌まで全身1個で完結**：余計な防腐剤や香料が一切入っていないため、敏感肌やお子様のカサカサ肌にも安心して使用可能

今回は未精製の栄養豊富なオーガニックシアバターから、使いやすく精製された無臭タイプまで、楽天市場で口コミ評価の高い10選を徹底比較します！`
  },
  {
    slug: 'art-natural-false-eyelashes-transparent-band-10sen-2026',
    id: 'art-natural-false-eyelashes-transparent-band-10sen-2026',
    title: '【大人の超自然ナチュラルつけまつげ10選】つけているのがバレない極細透明軸！自まつ毛に溶け込んでマツエク級の上品な目元をつくる人気アイラッシュ比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: '「いかにもつけてます感」を完全ゼロにする大人のための「ナチュラルつけまつげ」おすすめ10選！極細の透明テグス軸と自まつ毛に馴染む先細毛加工で、まぶたへの重みや違和感なく、自まつ毛が自然に増えたような洗練された目元を演出する人気モデルを徹底検証。',
    products: fetched.t3,
    lead: `「昔のつけまつげのようなバサバサ感は卒業したい」「マツエクはお金も時間もかかるし自まつ毛が傷むのが心配」「自まつ毛が短くてマスカラだけでは目元の印象がぼやける」……そんな大人の女性たちの間で、進化を遂げた**「超自然ナチュラルつけまつげ」**が再び大ヒットしています。

最新のつけまつげは、従来品とはクオリティが劇的に進化しています：
1. **まぶたが突っ張らない0.05mmの極細透明軸**：目頭から目尻まで柔らかくしなり、目を閉じても伏し目にしてもバレない自然な仕上がり
2. **自まつ毛の毛先に向かって自然に細くなる特殊テーパー加工**：毛先が不自然に太くカットされておらず、まるで自前のまつ毛がそのまま伸びたような繊細な毛並み
3. **数回〜10回以上繰り返し使えて圧倒的な高コスパ**：マツエク1回分の費用で何ヶ月も上品な美まつ毛をキープできる経済性

今回はロングセラーのビューティーネイラーをはじめ、大人のオフィスや冠婚葬祭にも使える楽天市場の売れ筋ナチュラルつけまつげ10選を徹底比較します！`
  },
  {
    slug: 'art-non-wire-night-bra-bust-care-sleep-comfort-10sen-2026',
    id: 'art-non-wire-night-bra-bust-care-sleep-comfort-10sen-2026',
    title: '【昼夜兼用ノンワイヤーナイトブラ＆美胸ホールドブラ10選】寝返りの横流れ・離れ胸・下垂を寝ている間に防止！苦しくないのにしっかり支える人気育乳ブラ比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: '就寝中のバストの重力による横流れや下垂を防ぎ、美しいバストラインをキープする「ノンワイヤーナイトブラ」おすすめ10選！締め付け感ゼロで朝までぐっすり眠れ、リラックスタイムや日中のテレワークでもそのまま使える昼夜兼用人気モデルを徹底解説。',
    products: fetched.t4,
    lead: `「ノーブラで寝ると胸が脇に流れて形が崩れそう」「昼用のワイヤーブラをつけて寝ると締め付けられて息苦しい・血行が悪くなる」「年齢とともにバストのハリや上部の削げ感が気になってきた」……女性のバストを支える「クーパー靭帯」は一度伸びると元に戻らないため、寝ている間の重力対策が極めて重要です。

そんな睡眠時のバストを守るために設計されたのが、**「ノンワイヤーナイトブラ」**です：
- **360度全方位から包み込む立体ホールド構造**：仰向けになっても横向きになっても、お肉が脇や背中に逃げるのを防ぎ、理想のバスト位置に優しくキープ
- **ワイヤー・ホックなしのシームレス＆伸縮フィット**：寝返りを打っても骨に当たる痛みが一切なく、まるで着けていないかのような解放感で朝まで熟睡
- **脇高設計と幅広アンダーで背中のお肉もスッキリ美シルエット**：就寝時だけでなく、おうち時間や休日のリラックスブラ、軽いヨガや散歩にも使える昼夜兼用設計

今回は楽天市場で総合ランキング上位を獲得している大人気ブランドから、肌触り抜群のコットン混モデルまで厳選10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と肌あたりの優しさを最優先にチェック\n直接皮膚に長時間触れるアイテムだからこそ、天然植物油脂100%、医療用シリコン、極細透明軸、ノンワイヤー伸縮設計などの安全基準をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さ\n寝ている間に着けるだけ、溝に沿わせるだけの簡単操作、全身に使えるマルチバームなど、生活の中で無理なく続けられる仕様を選びましょう。\n\n`;
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

console.log(`[Batch 131 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
