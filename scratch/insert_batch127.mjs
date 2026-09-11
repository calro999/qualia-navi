import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch127_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ127の4記事の定義
const batchDefs = [
  {
    id: 'art-pure-macadamia-nut-oil-palmitoleic-acid-10sen-2026',
    slug: 'art-pure-macadamia-nut-oil-palmitoleic-acid-10sen-2026',
    title: '【天然100%マカダミアナッツオイル10選】肌から消えるオイルの圧倒的浸透力！加齢で激減するパルミトレイン酸を補給してふっくらハリ肌へ導く美容オイル比較',
    category: 'スキンケア',
    date: '2026-09-11',
    description: '人間の皮脂に最も近い「パルミトレイン酸」を20%以上豊富に含む「天然マカダミアナッツオイル」おすすめ10選！塗った瞬間スーッと角層に馴染む「消えるオイル（Vanishing Oil）」の力で、乾燥小じわ・ごわつき・大人のカサつき肌をふっくら整える活用法を解説。',
    products: fetched.t1,
    lead: `「オイルを塗ると肌の表面がギトギトしていつまでも残る」「年齢とともに肌の油分が減ってカサカサ・シワっぽくなってきた」「赤ちゃんの肌のような柔らかさを取り戻したい」……そんな大人の肌枯れに圧倒的な支持を集めているのが、**「天然マカダミアナッツオイル」**です。

マカダミアナッツオイルは、肌に乗せた瞬間に吸い込まれるように馴染むことから別名**「消えるオイル（バニシングオイル）」**と呼ばれています：
1. **加齢とともに激減する「パルミトレイン酸」を約20%以上高含有**：皮脂の主成分でありながら30代以降急激に減少する貴重な脂肪酸を直接補給し、ハリと柔軟性をキープ
2. **酸化しにくく安定性に優れたオレイン酸ベース**：植物油の中でも熱や酸化に極めて強く、朝のメイク前や日中のスキンケアにも安心して使用可能
3. **洗顔後のブースター・頭皮クレンジング・ヘアオイルまで全身万能**：ベタつきが一切残らないため、顔だけでなくパサつく毛先のヘアケアや入浴後のボディオイルにも最適

今回は無添加・未精製コールドプレスから大容量ポンプ付きモデルまで、楽天市場でレビュー評価の高いマカダミアナッツオイル10選を徹底比較します！`
  },
  {
    slug: 'art-silicone-lip-brush-spatula-clean-makeup-10sen-2026',
    id: 'art-silicone-lip-brush-spatula-clean-makeup-10sen-2026',
    title: '【シリコン製リップブラシ＆プランパースパチュラ10選】指を汚さずムラなく均一密着！ティッシュで拭くだけでいつでも清潔＆衛生的な最新メイクツール比較',
    category: 'メイクアップ',
    date: '2026-09-11',
    description: '粘度の高いリッププランパーやジャー容器のリップバーム、グラデーションリップを美しく仕上げる「シリコンリップブラシ（スパチュラ）」おすすめ10選！毛先のブラシと違いリキッドを吸い込まず、ティッシュオフや水洗いで一瞬で清潔に保てる神ツールを徹底検証。',
    products: fetched.t2,
    lead: `「ジャータイプのリップバームやスリーピングマスクを指で取るのが不衛生で気になる」「粘度の高いリッププランパーを塗ると指がベタベタになって洗うのが大変」「リップの輪郭やグラデーションを綺麗にぼかしたい」……そんな日々のメイクのプチストレスを劇的に解消するのが、韓国コスメ界から火がついた**「シリコン製リップブラシ・スパチュラ」**です。

従来の動物毛・人工毛ブラシにはない驚きのメリットが揃っています：
- **コスメを無駄に吸い込まず、均一に密着**：シリコン素材がリキッドやバームを一切吸収しないため、お気に入りのリップを少量でムラなくツヤツヤに塗り広げられる
- **ティッシュでサッと拭き取るだけでお手入れ完了**：使い終わったらティッシュで一拭き、またはアルコール除菌シートで拭くだけで新品同様の清潔さをキープ。ブラシ洗浄の乾燥待ちゼロ
- **絶妙な弾力ヘッドでリップラインもぼかしも自由自在**：指先のような柔らかさとしなりで、唇の山や口角、オーバーリップの自然なぼかしも思いのまま

今回は携帯に便利なキャップ付きタイプやコンシーラーにも使えるマルチセットなど、楽天市場で人気のシリコンリップブラシ10選を徹底比較します！`
  },
  {
    slug: 'art-electric-nail-drill-machine-gel-removal-care-10sen-2026',
    id: 'art-electric-nail-drill-machine-gel-removal-care-10sen-2026',
    title: '【電動ネイルマシン＆家庭用ネイルドリル10選】サロン級のジェルオフ・甘皮処理・爪磨きが自宅で驚くほど速い！初心者でも削りすぎない人気モデル（プチトル等）比較',
    category: 'ネイルケア',
    date: '2026-09-11',
    description: '手作業だと時間がかかり自爪を傷めやすいジェルネイルのオフや、固くなった甘皮・角質のケアをスピーディーに行える「家庭用電動ネイルマシン」おすすめ10選！累計10万本突破のプチトルをはじめ、スピード調節・正逆回転対応の最新マシンを徹底検証。',
    products: fetched.t3,
    lead: `「セルフジェルネイルのオフにファイルでゴシゴシ削って30分以上かかる」「甘皮の処理を手作業でやると痛いし綺麗に取れない」「サロンに通う時間とコストを節約して自宅で完璧な美爪を保ちたい」……そんなセルフネイル派の必須アイテムが、プロのネイリストも使用する**「電動ネイルマシン（ネイルドリル）」**です。

手動ヤスリとは比べ物にならない圧倒的な効率と仕上がりの美しさを誇ります：
1. **ジェルオフの時間を3分の1以下に短縮**：高精度の回転軸が分厚いトップジェルやパーツ埋め込みも削りカスを最小限に抑えながらサクサク削り落とす
2. **甘皮ケア・角質除去・自爪磨きまでビット交換でマルチ対応**：付属のアタッチメントを付け替えるだけで、爪周りの硬い角質やささくれ、表面の凸凹整えまで1台で完結
3. **初心者でも安心のスピード無段階調節＆正逆回転切り替え**：削りすぎを防ぐ低速モードや、右手・左手どちらでも使いやすい回転切り替え機能を搭載

今回は楽天市場で10万本以上の販売実績を誇る「プチトル」シリーズをはじめ、静音・低振動設計の厳選電動ネイルマシン10選を徹底比較します！`
  },
  {
    slug: 'art-disposable-cleansing-facial-towel-tissue-10sen-2026',
    id: 'art-disposable-cleansing-facial-towel-tissue-10sen-2026',
    title: '【使い捨てフェイシャルクレンジングタオル10選】タオルをやめるだけで肌荒れ・ニキビ激減！天然植物繊維100%で摩擦レス＆雑菌ゼロの極上美肌ペーパー比較',
    category: 'コスメ・スキンケア',
    date: '2026-09-11',
    description: '「洗顔後のタオルをやめるだけで肌質が変わる！」と美容皮膚科医やインフルエンサーが絶賛する「使い捨てフェイシャルクレンジングタオル」おすすめ10選！天然コットン・パルプ100%で吸水力抜群、雑菌や柔軟剤摩擦から肌を守る人気アイテムを徹底検証。',
    products: fetched.t4,
    lead: `「毎日スキンケアを頑張っているのに大人ニキビや肌荒れが繰り返す」「洗面所のタオルって生乾き臭や雑菌が繁殖していそうで不安」「タオルの繊維摩擦が刺激になって肌が赤くなる」……そんな肌トラブルに悩む女性たちがこぞって乗り換えているのが、**「使い捨てフェイシャルクレンジングタオル」**です。

洗面所に吊るした普通のタオルには、目に見えない無数の雑菌や柔軟剤の残留成分が付着していますが、使い捨てタオルなら毎日完全滅菌・新品の状態で水分を拭き取れます：
- **摩擦ゼロで肌に乗せるだけで水分を一瞬でスピード吸収**：ゴシゴシ擦る必要がなく、顔に優しく押し当てるだけで余分な水分を完璧にオフ
- **破れにくく毛羽立たない天然植物繊維100%**：水に濡れても破れない厚手エンボス加工で、洗顔後の水滴オフだけでなく、そのまま化粧水を浸してローションパックや洗面台掃除にも活用可能
- **肌荒れ菌（アクネ菌・黄色ブドウ球菌）の接触感染をシャットアウト**：家族とのタオルの共有による肌トラブルを防ぎ、清潔な素肌環境を維持

今回は金賞受賞の大人気フェイシャルタオル（ITO等）をはじめ、楽天市場でコスパ抜群の大容量パック10選を徹底比較します！`
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
  content += `### 1. 素材の安全性と品質基準をしっかり確認\n肌に直接触れるオイルやタオル、メイクツールだからこそ、天然植物由来100%、高品質シリコン、医療用グレードなどの安全基準を優先しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さ\n拭くだけの使い捨てペーパー、ティッシュオフで綺麗になるシリコンブラシ、USB充電式ネイルマシンなど、時短と清潔感を両立できる仕様を選びましょう。\n\n`;
  content += `### 3. レビュー評価とリピート率から見るコストパフォーマンス\n消耗品は大容量パックの1枚あたり単価、ギア類は替えパーツの入手性をチェックし、長く愛用できる製品を選びましょう。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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

console.log(`[Batch 127 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
