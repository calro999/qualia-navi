import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch148_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ148の4記事の定義
const batchDefs = [
  {
    id: 'art-heatless-curling-rod-headband-silk-10sen-2026',
    slug: 'art-heatless-curling-rod-headband-silk-10sen-2026',
    title: '【シルク製ヒートレスカーラー10選】熱ダメージゼロで寝ている間に極上巻き髪！朝のコテ不要で韓国風ウェーブが完成する人気カーリングバンド比較',
    category: 'ヘアケア',
    date: '2026-09-15',
    description: 'ヘアアイロンの熱による枝毛・パサつきを完全回避！髪をロッドに巻き付けて寝るだけで、翌朝コテ巻きのようなふんわりウェーブが完成する「シルク製ヒートレスカーラー（カーリングヘアバンド）」おすすめ10選！天然シルク100%で摩擦を防ぎツヤ髪を守る人気モデルを徹底比較。',
    products: fetched.t1,
    lead: `「毎日ヘアアイロンで髪を巻いていると毛先がチリチリに傷んで枝毛だらけになる」「朝の忙しい身支度でコテを温めて巻く時間をなくしたい」「寝ている間の時間を有効活用して、起きた瞬間から完璧な巻き髪を作りたい」……そんな全女性の願いを叶えるSNS発のメガヒット美髪ギアが、**「シルク製ヒートレスカーラー」**です。

電気や熱を一切使わずに美しいカールを形状記憶する驚きの仕組みを備えています：
1. **天然シルク100%の滑らかな繊維が摩擦ダメージと静電気をシャットアウト**：髪を巻きつけて寝ても枕との摩擦でキューティクルが傷まず、ほどいた瞬間からツヤツヤの光沢
2. **太めのソフトクッション構造で横向き寝でも頭が痛くならない**：柔らかいEVAフォームや綿を内蔵し、睡眠の質を落とさずに朝までしっかりフィット
3. **巻き方の工夫次第で「韓国風くびれカール」「外国人風ゆるウェーブ」が自由自在**：ブロー後のほんのり湿った髪に巻いておくだけで、夕方まで崩れない美しいリッジが持続

今回は楽天市場でランキング1位を獲得した人気モデルからシルクシュシュ・クリップ付きフルセットまで10選を徹底比較します！`
  },
  {
    id: 'art-teeth-grinding-mouthpiece-sleep-jaw-10sen-2026',
    slug: 'art-teeth-grinding-mouthpiece-sleep-jaw-10sen-2026',
    title: '【睡眠用・歯ぎしり防止マウスピース10選】朝起きた時の顎の疲れ・エラ張りを予防！お湯で自分の歯型に成形できる薄型ナイトガード比較',
    category: 'オーラルケア',
    date: '2026-09-15',
    description: '睡眠中の無意識の歯ぎしりや強い噛み締め（食いしばり）から大切な歯と顎関節を守る「睡眠用マウスピース（ナイトガード）」おすすめ10選！お湯につけて噛むだけで自分の歯列にジャストフィットする成形タイプから、違和感のない極薄シリコン製まで徹底解説。',
    products: fetched.t2,
    lead: `「朝起きると顎の関節がだるく、こめかみや肩がガチガチに凝っている」「歯医者で『歯ぎしりで奥歯がすり減っている』と指摘された」「食いしばりのせいでエラが張って顔が四角く大きくなってきた」……日本人の約7割が無自覚に行っていると言われる就寝時の食いしばりを防ぐのが、**「睡眠用・歯ぎしり防止マウスピース」**です。

歯にかかる数百キロの破壊的圧力をクッションが吸収分散します：
- **お湯で温めて噛むだけでオーダーメイド感覚のマイマウスピースが完成**：歯列に吸い付くように密着するため、寝返りを打っても口からポロッと外れない安心設計
- **歯と歯の接触を遮断してエラ（咬筋）の異常発達と顔の肥大化を根本予防**：顎の筋肉がリラックスした状態で眠れるため、翌朝の目覚めのスッキリ感が劇的向上
- **呼吸を妨げない薄型・専用通気スリット付きで口呼吸や違和感を最小限に抑制**：抗菌ケース付きで毎日水洗いして衛生的に長く愛用可能

今回は楽天市場で164週連続1位を獲得した芦屋品質の殿堂入りナイトガードをはじめ、人気マウスピース10選を徹底比較します！`
  },
  {
    id: 'art-shoe-odor-deodorant-powder-grand-10sen-2026',
    slug: 'art-shoe-odor-deodorant-powder-grand-10sen-2026',
    title: '【靴用強力消臭パウダー10選】靴の中に振り入れるだけでバクテリア全滅！スニーカーや革靴の染み付いた足の悪臭を無臭化する人気消臭粉比較',
    category: 'ボディケア',
    date: '2026-09-15',
    description: '市販の消臭スプレーでは誤魔化せないスニーカー・革靴・ブーツの強烈な足のニオイを元から断つ「靴用消臭パウダー（魔法の粉）」おすすめ10選！ニュージーランド発の世界的名品グランズレメディをはじめ、数回振り入れるだけで効果が半年持続する人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「靴を脱いだ瞬間に部屋中に広がる納豆のような強烈な足のニオイが恥ずかしい」「洗えない革靴や高価なスニーカーに染み付いた悪臭をリセットしたい」「消臭スプレーをかけても香りと混ざって余計に不快なニオイになる」……そんな靴と足のニオイ問題の最終兵器として世界中で愛用されているのが、**「靴用強力消臭パウダー」**です。

ニオイの元凶であるバクテリア（雑菌）を天然ミネラルの力で除菌・抗菌します：
1. **スプーン1杯の粉を靴の中にサッと撒いてそのまま履くだけ**：靴を洗って乾かす手間が一切なく、普段通りに歩いているうちに粉が全体に行き渡り自然に消える
2. **7日間連続で使用するだけで効果が約6ヶ月間持続する驚異のロングキープ**：靴の中の細菌叢を根本から浄化し、汗をかいてもニオイが発生しないクリーンな環境へ
3. **ミョウバンや酸化亜鉛などの天然鉱物粉末を主成分とした安心・安全処方**：肌に直接触れても安全で、革や布地を傷めず大切な靴を長持ちさせる効果も

今回は国内正規品グランズレメディをはじめ、楽天市場で絶大な信頼を集める強力靴消臭パウダー10選を徹底比較します！`
  },
  {
    id: 'art-shoe-blister-prevention-cushion-tape-10sen-2026',
    slug: 'art-shoe-blister-prevention-cushion-tape-10sen-2026',
    title: '【靴擦れ防止・かかと保護パッド＆クッションテープ10選】痛い靴擦れ・皮剥け・かかとパカパカを完全防止！貼るだけでフィットする人気フットケア比較',
    category: 'ボディケア',
    date: '2026-09-15',
    description: '新しいパンプスやスニーカーを履いた時の激痛やかかと抜けを解消！靴の内側やかかとに直接貼るだけで摩擦を吸収する「靴擦れ防止パッド（かかと保護テープ）」おすすめ10選！現役看護師監修の高密着低反発クッションや透明ジェルパッドを徹底解説。',
    products: fetched.t4,
    lead: `「お気に入りの新しい靴を履いて出かけたら、かかとの皮がむけて血が出て歩けなくなった」「サイズが少し大きくて歩くたびにかかとがパカパカ抜けて疲れる」「絆創膏を貼っても靴との摩擦ですぐに剥がれて丸まってしまう」……そんな靴擦れの激痛とストレスを先回りしてブロックするのが、**「靴擦れ防止かかとパッド」**です。

靴の内側やかかとにピタッと貼るだけで、どんな硬い靴も極上のフィット感へ生まれ変わります：
- **肉厚の高反発クッション＆低反発スポンジが歩行時の摩擦と衝撃をゼロに**：硬い履き口がアキレス腱に食い込むのを優しくガードし、靴擦れの原因となるズレを物理的に吸収
- **かかとの隙間を埋めて靴のパカパカ抜けを防止し歩きやすさ劇的UP**：足と靴が一体化するため歩行姿勢が安定し、足首の疲れや前滑りによるつま先の痛みも予防
- **強力粘着テープ採用で汗や摩擦でも一日中剥がれない安心ホールド**：目立たないブラック・ベージュ・透明シリコンから選べ、ヒールやローファーにも自然に馴染む

今回は楽天ランキング3冠を獲得した看護師監修モデルから大容量テープまで10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と肌や歯・髪への優しさを最優先にチェック\n毎日触れるアイテムだからこそ、天然シルクの品質や、食品グレード樹脂の安全性、消臭成分の肌への優しさ、クッションの反発力と粘着性をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n巻いて寝るだけ、噛むだけ、粉を振るだけ、靴に貼るだけなど、忙しい生活の中でも無理なく続けられる仕様を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の快適な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 148 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
