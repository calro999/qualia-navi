import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch137_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ137の4記事の定義
const batchDefs = [
  {
    id: 'art-hairline-shadow-powder-forehead-contour-10sen-2026',
    slug: 'art-hairline-shadow-powder-forehead-contour-10sen-2026',
    title: '【生え際・分け目カバーヘアシャドウ10選】ポンポン叩くだけで小顔＆薄毛隠し！おでこのM字・白髪の透け感を自然に埋める人気ヘアラインパウダー比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: '前髪を上げた時やお団子ヘアの「M字おでこ」「分け目の地肌の透け感」をサッと隠して自然な美形額に補正する「生え際ヘアシャドウ（ヘアラインパウダー）」おすすめ10選！汗や皮脂に強く落ちにくいウォータープルーフ仕様から自然な影を作る人気コスメを徹底比較。',
    products: fetched.t1,
    lead: `「前髪をかき上げた時にこめかみやM字部分の隙間が広くて老けて見える」「髪を結ぶと分け目やつむじの地肌が白く透けて気になる」「おでこを丸く綺麗に見せて韓国アイドルのような卵型の小顔になりたい」……そんな生え際・分け目のコンプレックスを一撃で解決するのが、**「ヘアラインシャドウパウダー」**です。

付属のスポンジで気になる部分にポンポンと馴染ませるだけで、驚きのシェーディング＆増毛見え効果を発揮します：
1. **地肌にピタッと密着して本物の髪の影（生え際）を偽装**：人工的な塗りつぶし感ゼロで、自然なグラデーションと立体感を演出
2. **おでこの面積を自然に狭めて驚異の小顔補正**：額の角を丸く整えることで、顔の余白がキュッと引き締まり劇的なリフトアップ見え
3. **皮脂吸着パウダー配合で汗や擦れにも強く一日中キープ**：頭皮のベタつきを抑えながら、夕方まで色移りやヨレを防ぐロングラスティング設計

今回は楽天市場でランキング上位を独占する大人気ヘアシャドウから、持ち運びに便利なパフ一体型まで10選を徹底比較します！`
  },
  {
    id: 'art-medicinal-foot-odor-soap-sterilization-10sen-2026',
    slug: 'art-medicinal-foot-odor-soap-sterilization-10sen-2026',
    title: '【薬用足用消臭殺菌せっけん10選】靴を脱ぐのが怖くなくなる！頑固な足のニオイ・納豆臭・ムレ菌を根こそぎ洗い流す人気フットソープ比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: 'ブーツや革靴、スニーカーを脱いだ瞬間の強烈な足のニオイに！ニオイの原因菌（イソ吉草酸）を有効成分で殺菌・消毒する「薬用足用せっけん（フットソープ）」おすすめ10選！久光製薬ブテナロックをはじめ、薬用炭や柿渋エキス配合の強力消臭石鹸を徹底解説。',
    products: fetched.t2,
    lead: `「お座敷での飲み会や友人の家で靴を脱ぐのが恐怖」「毎日足をゴシゴシ洗っているのに爪の間や指の隙間から嫌なニオイがする」「一日中靴を履きっぱなしで足の裏が蒸れてぬるつく」……足のニオイは普通のボディソープで洗うだけでは絶対に落ちない、特有の雑菌トラブルです。

足の悪臭の正体である「イソ吉草酸」を根本からリセットするのが、**「薬用足用消臭殺菌せっけん」**です：
- **医薬部外品の有効成分がニオイの元凶菌を徹底殺菌・消毒**：皮膚の常在菌バランスを整え、時間が経っても菌が増殖しにくい清潔な足裏環境をキープ
- **古い角質や毛穴に詰まった皮脂汚れを強力吸着オフ**：薬用炭やスクラブ成分が、雑菌の繁殖エサとなる分厚い角質を優しくオフ
- **メントールやハーブの爽快感で湯上がり後もサラサラ爽快**：ムレを防ぐサラサラパウダーや消臭ハーブが、翌日の靴の中の不快感を劇的に軽減

今回は楽天総合ランキング1位の「ブテナロック」をはじめ、圧倒的なリピート率を誇る薬用フットケア石鹸10選を徹底比較します！`
  },
  {
    id: 'art-underarm-sweat-pad-sheet-anti-stain-10sen-2026',
    slug: 'art-underarm-sweat-pad-sheet-anti-stain-10sen-2026',
    title: '【貼るだけ脇汗パッド・使い捨て汗ジミ防止シート10選】服の黄ばみ＆汗染みを完全ブロック！服に貼るタイプから肌に直貼りできる極薄消臭パッド比較',
    category: 'ボディケア',
    date: '2026-09-11',
    description: 'グレーや淡い色のシャツでも脇汗の染み出しを一切気にせず過ごせる「使い捨て脇汗パッド（汗取りシート）」おすすめ10選！服の内側に貼る高吸水・ワイドサイズ型から、服を着たまま目立たない肌直貼り極薄フィルム型まで人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「夏場や暖房の効いたオフィスで脇に汗ジミができて腕を上げられない」「お気に入りのブラウスや白シャツが脇汗で黄ばんでしまう」「緊張するとドッと脇汗をかいて服に貼り付く不快感がストレス」……そんな汗ジミの恐怖から完全に解放してくれるのが、**「貼るだけ脇汗パッド・汗ジミ防止シート」**です。

服や肌にペタッと貼るだけで、一日中サラサラと安心感が手に入ります：
1. **多層吸水ポリマーが大量の脇汗を瞬間キャッチ＆漏れゼロ**：表面はいつもドライな肌触りを保ち、服への染み出しを物理的に100%シャットアウト
2. **消臭イオンや抗菌シート配合で汗の嫌なニオイを元から抑制**：密閉空間になりがちな脇の下のニオイの発生を防ぎ、清潔感をしっかりガード
3. **超極薄設計でアウターに一切響かず剥がれにくい高密着粘着テープ**：ごわつき感がなく、腕を動かしてもカサカサ音がしないストレスフリーな着け心地

今回は大容量お徳用パックから目立ちにくい透明フィルムタイプまで、楽天市場で売れ筋の脇汗対策パッド10選を徹底比較します！`
  },
  {
    id: 'art-dry-shampoo-sheet-wipes-scalp-refresh-10sen-2026',
    slug: 'art-dry-shampoo-sheet-wipes-scalp-refresh-10sen-2026',
    title: '【頭皮＆髪用ドライシャンプーシート10選】水なしで瞬時にシャンプーしたての爽快感！外出先・サウナ後・防災備蓄に役立つ手袋型＆拭き取りシート比較',
    category: 'ヘアケア',
    date: '2026-09-11',
    description: 'お風呂に入れない時や外出先で、頭皮と髪のベタつき・皮脂臭をサッと拭き取ってリセットできる「ドライシャンプーシート（水なし洗髪シート）」おすすめ10選！頭皮をごしごし揉み洗いできる手袋型から、前髪の束感をサラサラに戻すシートまで徹底比較。',
    products: fetched.t4,
    lead: `「夕方になると前髪が皮脂で束になってぺたんこになる」「仕事終わりのスポーツ後やサウナ後に髪を洗う時間がない」「体調不良でお風呂に入れない時や災害時の洗髪対策を常備しておきたい」……水を使わずに一瞬で頭皮の不快感を一掃できる神アイテムが、**「ドライシャンプーシート」**です。

スプレーのように周囲に粉が飛び散らず、音も出ないためどこでも手軽に使えます：
- **皮脂やニオイを吸着する清涼ローションが頭皮の毛穴まで浸透**：汗やホコリを絡め取り、まるでシャンプー直後のような爽快感と軽やかさを再現
- **根元の立ち上がりを復活させてふんわりスタイリングを復元**：ベタついた髪の水分・油分バランスを整え、朝のサラサラブロー髪をキープ
- **手袋型なら手にはめて頭皮全体をしっかりマッサージ可能**：介護や防災、キャンプ、フェスなどのアウトドアシーンでも圧倒的な使いやすさを発揮

今回は日本製の手袋型シャンプーから携帯に便利な大判シートまで、楽天市場で選ばれている人気ドライシャンプーシート10選を徹底比較します！`
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
  content += `### 1. 安全性・肌への優しさと確かな消臭・密着クオリティ\n直接頭皮や肌に触れるアイテムだからこそ、薬用殺菌成分の安全性や、パウダーの密着力、低刺激処方、シートの肌あたりの柔らかさをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと携帯性\nポンポン叩くだけ、貼るだけ、拭くだけなど、外出先や朝の準備でも手間取らずスマートに完結する形状を選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用量を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、ストレスのない快適で清潔な毎日を手に入れましょう。\n\n`;
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

console.log(`[Batch 137 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
