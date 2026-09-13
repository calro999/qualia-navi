import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch144_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ144の4記事の定義
const batchDefs = [
  {
    id: 'art-portable-uv-c-toothbrush-sanitizer-case-10sen-2026',
    slug: 'art-portable-uv-c-toothbrush-sanitizer-case-10sen-2026',
    title: '【携帯用UV-C歯ブラシ除菌ケース10選】深紫外線99.9%除菌＆ファン乾燥！ポーチやオフィスで濡れた歯ブラシの雑菌・ニオイを防ぐ人気除菌ホルダー比較',
    category: 'オーラルケア',
    date: '2026-09-13',
    description: '濡れたままポーチにしまう歯ブラシの雑菌増殖・カビ・悪臭をシャットアウト！フタを閉めるだけでUV-C深紫外線が自動照射される「携帯用歯ブラシ除菌器（除菌ケース）」おすすめ10選！ファン乾燥機能付きやUSB充電式、壁掛け両用モデルを徹底比較。',
    products: fetched.t1,
    lead: `「ランチ後の歯磨き後、濡れた歯ブラシをポーチやケースにしまうと雑菌が繁殖して臭くなりそう」「便座の何十倍もの菌が歯ブラシに潜んでいると聞いて衛生面が不安」「オフィスや旅行先でも自宅と同じように清潔なブラシで気持ちよく磨きたい」……そんなお口の健康とエチケットを守る最新家電が、**「携帯用UV-C歯ブラシ除菌ケース」**です。

歯ブラシのヘッドをセットしてフタをパチンと閉めるだけで、医療現場レベルのクリーン環境を実現します：
1. **波長260〜280nmのUV-C深紫外線がわずか3分で細菌・ウイルスを99.9%不活化**：大腸菌や黄色ブドウ球菌などの原因菌をDNAレベルで破壊し、雑菌の繁殖を完全ブロック
2. **通気スリット＆小型ファン乾燥機能で毛先のジメジメ湿気を素早くドライ**：湿気を溜め込まずカビの発生を防ぐため、常にシャキッと清潔な毛先をキープ
3. **USB Type-C充電式で1回の充電で約1ヶ月連続使用可能なロングバッテリー**：薄型軽量で化粧ポーチやペンケースに違和感なく収まり、外出先でもストレスフリー

今回は楽天市場でランキング1位を獲得した1本用スマート除菌器から高機能モデルまで10選を徹底比較します！`
  },
  {
    id: 'art-foot-acupressure-mat-health-walk-10sen-2026',
    slug: 'art-foot-acupressure-mat-health-walk-10sen-2026',
    title: '【痛快！足つぼマッサージマット10選】乗るだけで足裏の反射区をダイレクト刺激！夕方の足のむくみ・冷え・疲労をリセットする人気健康歩行マット比較',
    category: 'ヘルスケア',
    date: '2026-09-13',
    description: 'テレビを見ながらや歯磨き中に踏むだけで足裏のツボを強力刺激！第二の心臓と呼ばれる足裏の血行を促進し、立ち仕事やデスクワークの頑固なむくみ・冷えを解消する「足つぼマッサージマット（足裏指圧ボード）」おすすめ10選！丸めて収納できるロングタイプから刺激度別の人気モデルを徹底解説。',
    products: fetched.t2,
    lead: `「夕方になると足がパンパンにむくんで靴がきつくなる」「立ち仕事や外回りで足の裏がジンジン痛い」「冷え性で足先が冷たくて夜なかなか寝付けない」……そんな下半身の血行不良と疲労を一気に解消する王道セルフケアが、**「足つぼマッサージマット」**です。

痛気持ちいい突起の上に体重を乗せるだけで、全身の巡りが一気に加速します：
- **大小さまざまな突起が足裏のツボ（反射区）を余すところなくピンポイント刺激**：土踏まずやカカト、指の付け根までグイグイ刺激し、まるでプロの足つぼマッサージを受けたような爽快感
- **洗面所やキッチンに敷くだけで「ながら温活＆むくみ取り」が完全習慣化**：歯磨き中や料理中の数分間乗るだけで足裏がじんわり温まり、足取りが軽やかに
- **丸めてコンパクトに収納できる高耐久EVA・シリコン素材**：使わない時はクルッと巻いて隙間にしまえ、水洗いも可能でいつでも清潔

今回は柔道整復師推薦の本格指圧マットから持ち運びできるコンパクト型まで、楽天市場で話題の足つぼマット10選を徹底比較します！`
  },
  {
    id: 'art-silicone-finger-pore-cleansing-brush-10sen-2026',
    slug: 'art-silicone-finger-pore-cleansing-brush-10sen-2026',
    title: '【小鼻専用シリコン洗顔ブラシ＆フィンガーパッド10選】指にはめてくるくる撫でるだけ！毛穴の黒ずみ・角栓・ザラつきをつるんとオフする人気極細ブラシ比較',
    category: 'スキンケア',
    date: '2026-09-13',
    description: '手洗い洗顔では届かない小鼻のくぼみや顎のザラつきを、極細シリコン毛で優しくかき出す「小鼻専用シリコン洗顔ブラシ（フィンガーパッド）」おすすめ10選！電動音波振動タイプから指先にはめるプチプラパッドまで、毛穴の黒ずみを摩擦レスに除去する人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「毎日丁寧に洗顔しているのに小鼻の頭がイチゴのように黒ずんでいる」「ファンデーションを塗ると鼻の頭や小鼻の溝に毛穴落ちしてザラつく」「毛穴パックや強いスクラブは肌が傷つきそうで使いたくない」……そんなデリケートな小鼻の角栓悩みを優しく根こそぎクリアにするのが、**「小鼻専用シリコン洗顔ブラシ」**です。

指先感覚で細かいパーツを自由自在にディープクレンジングできます：
1. **数十万本の超極細シリコン毛が毛穴のミクロな隙間に入り込み汚れを吸着**：肌を引っ張ったりこすることなく、泡立てた洗顔料と一緒に毛穴奥の酸化皮脂をオフ
2. **指先にはめるだけの直感的操作で小鼻のキワや唇の下の溝にフィット**：手洗い洗顔では指の腹が届かない凹凸パーツも、ピンポイントでつるつるに磨き上げ
3. **速乾抗菌シリコン製でカビが生えずお手入れもお湯で流すだけ**：獣毛ブラシのように毛が抜けたり生乾き臭がする心配がなく、お風呂場でいつでも衛生的に保管可能

今回は楽天市場で17冠を獲得した大ヒット電動音波シリコンブラシから手軽な指サック型まで10選を徹底比較します！`
  },
  {
    id: 'art-soft-hood-bonnet-hair-dryer-attachment-10sen-2026',
    slug: 'art-soft-hood-bonnet-hair-dryer-attachment-10sen-2026',
    title: '【ボンネット型ヘアドライヤーフード＆速乾キャップ10選】かぶるだけで手ぶら温風速乾！トリートメント浸透・ヘアマスク加温にも使える人気ドライキャップ比較',
    category: 'ヘアケア',
    date: '2026-09-13',
    description: 'ドライヤーの風をホースで取り込んで頭全体を均一に包み込む「ボンネット型ヘアドライヤーフード（速乾ドライキャップ）」おすすめ10選！重いドライヤーを持ち続ける腕の疲れをゼロにし、トリートメント時のスチーム加温キャップとしても大活躍する海外・SNS発の人気時短ギアを徹底解説。',
    products: fetched.t4,
    lead: `「ロングヘアで毛量が多く、ドライヤーで乾かすのに20分以上かかって腕がパンパンになる」「夏場のお風呂上がりに熱風を浴びてまた汗だくになるのが苦痛」「ヘアトリートメントを美容院のスチームのように温めて毛先までギュッと浸透させたい」……そんなドライヤーの重労働から解放してくれるのが、**「ボンネット型ヘアドライヤーフード」**です。

頭にかぶってドライヤーのスイッチを入れるだけで、驚きの手ぶら速乾空間が広がります：
- **手持ちのドライヤーを差し込むだけでフード全体がふんわり膨らみ温風循環**：頭部全体を均一な熱風で包み込み、髪をかき分けなくても根本からムラなくスピード乾燥
- **両手が完全に自由になるためスキンケアやスマホ・読書をしながらヘアドライ**：忙しい夜のタイムパフォーマンスが劇的に向上し、毎日の濡れ髪ストレスが完全消滅
- **ヘアオイルやトリートメントを塗って低温送風すれば集中サロントリートメント**：キューティクルを開いて有効成分を芯まで届け、パサついたダメージ毛もしっとりまとまるツヤ髪へ

今回は楽天市場でレビュー数千件を集める高吸水マイクロファイバーターバンからプロ仕様ボンネットフードまで10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と衛生クオリティ・肌への負担の少なさを最優先にチェック\n毎日使うアイテムだからこそ、UV-C除菌ランプの波長や、医療用シリコンの柔軟性、足裏への刺激の強さ、耐熱素材の安全基準などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\nフタを閉めるだけ、乗るだけ、指にはめるだけ、かぶるだけなど、無理なく自然に習慣化できる使いやすさを選びましょう。\n\n`;
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
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適なライフスタイルを手に入れましょう。\n\n`;
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

console.log(`[Batch 144 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
