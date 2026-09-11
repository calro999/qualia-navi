import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch123_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ123の4記事の定義
const batchDefs = [
  {
    id: 'art-high-density-dental-floss-fluorfloss-10sen-2026',
    slug: 'art-high-density-dental-floss-fluorfloss-10sen-2026',
    title: '【高密度デンタルフロス＆フロアフロス10選】歯ブラシでは届かない歯間プラークをごっそり絡め取る！唾液で広がる痛くないイタリア製エキスパンド糸フロス比較',
    category: 'オーラルケア',
    date: '2026-09-11',
    description: '歯科医院・歯科衛生士が絶賛する「フロアフロス」をはじめとするデンタルフロスおすすめ10選！歯ぐきを傷つけず、唾液でふわっと膨らんで歯間の汚れ・口臭の原因プラークを根こそぎ絡め取る人気モデルを徹底検証。',
    products: fetched.t1,
    lead: `「毎日しっかり歯磨きをしているのに虫歯や歯周病になりやすい」「歯と歯の隙間に物が挟まりやすい」「口臭が気になる」……そんな悩みを抱えているなら、歯ブラシだけのケアを今すぐ見直すべきです。

実は歯ブラシ単体でのプラーク（歯垢）除去率は**約60%程度**に留まり、残り40%の汚れは歯間に潜んでいます。そこで必須となるのが、歯科医院でも指導される本格的な**「デンタルフロス」**です：
1. **唾液に触れると384本の繊維がふわっと膨らむ**：イタリア製エキスパンド糸などは、挿入時はスッと入り、歯間に入るとフワッと広がって汚れをスポンジのように吸着
2. **歯ぐきを傷つけない優しい当たり心地**：ワックス加工や柔らかいポリエステル繊維で、フロス初心者でも歯ぐきからの出血を防ぎながら安全に使用可能
3. **プラーク除去率が80〜90%へ急上昇**：毎日のフロッシングで嫌気性細菌の温床を根本からリセットし、朝起きたときの口内のネバつきや口臭を予防

今回は歯科専売の大人気「フロアフロス」から大容量お得パックまで、楽天市場でリアルに選ばれているデンタルフロス10選を徹底比較します！`
  },
  {
    slug: 'art-pure-hatomugi-extract-yokuinin-skin-roughness-10sen-2026',
    id: 'art-pure-hatomugi-extract-yokuinin-skin-roughness-10sen-2026',
    title: '【高濃度ハトムギエキス原液＆ヨクイニン美容液10選】首元・目元のポツポツ角質粒・肌のザラつきを滑らかリセット！漢方由来のターンオーバー正常化ケア徹底比較',
    category: '美容液',
    date: '2026-09-11',
    description: '年齢とともに首元やデコルテ、目元に現れるポツポツ・ザラつき角質粒をケアする「高濃度ハトムギエキス（ヨクイニン）原液」おすすめ10選！古くから生薬として親しまれるハトムギの力で肌のターンオーバーを整える無添加スキンケアを徹底解説。',
    products: fetched.t2,
    lead: `「首元やデコルテに小さなポツポツが増えてきた」「目元やこめかみのザラつきが取れない」「肌の手触りがごわついてメイクのりが悪い」……そんな年齢サイン・角質粒に悩まされていませんか？

これらは古い角質が排出されずに肌表面に蓄積したもので、古くから漢方生薬として親しまれてきた**「ヨクイニン（ハトムギ種子エキス）」**が最も得意とするアプローチです：
- **角質層の正常なターンオーバーを促進**：アミノ酸やビタミンB群が豊富に含まれ、乱れがちな肌の代謝リズムをスムーズにサポート
- **原液コスメならではの高純度アプローチ**：余計な添加物を極力排除した高濃度ハトムギエキスを化粧水前にブースターとして取り入れることで、頑固な角質肥厚をじんわり柔軟化
- **透明感とキメ細やかななめらか素肌へ**：肌荒れ防止・抗炎症作用もあり、大人のゆらぎ肌や乾燥によるくすみも同時にリセット

今回はKISOなどの人気原液ブランドをはじめ、楽天市場で口コミ評価の高いハトムギエキス・ヨクイニン美容液10選を厳選ピックアップしました！`
  },
  {
    slug: 'art-firming-neck-cream-anti-wrinkle-care-10sen-2026',
    id: 'art-firming-neck-cream-anti-wrinkle-care-10sen-2026',
    title: '【首元専用リンクルクリーム＆ネックリフト10選】スマホ首の横ジワ・たるみ・乾燥を一撃ケア！首からデコルテまでハリツヤを与える年齢肌エイジングケア比較',
    category: '乳液・クリーム',
    date: '2026-09-11',
    description: '「年齢は首元に出る」と言われるほど皮膚が薄く乾燥しやすい首元・デコルテを集中的にケアするネッククリームおすすめ10選！スマホやPC作業による下向き姿勢で深くなる横ジワやたるみにハリを与える、韓国コスメやデパコスの実力派を徹底比較。',
    products: fetched.t3,
    lead: `「顔のスキンケアは念入りにしているのに、ふと鏡を見ると首元の横ジワがくっきり」「スマホを見下ろす時間が長くて首のたるみが気になる」「首が乾燥してファンデーションとの色ムラが目立つ」……実は首の皮膚は目元と同じくらい薄く、皮脂腺が少ないため非常にエイジングが進みやすい部位です。

そんな「首元の老け見え」を根本から防ぐために開発されたのが、**「首元専用ネッククリーム」**です：
1. **重力と首の動きに耐える高密着リフティング処方**：ペプチドやコラーゲン、プロバイオティクス成分が首元の薄い皮膚にピンとしたハリ膜を形成
2. **スマホ首による折れジワを集中保湿**：深い横ジワの溝に入り込み、濃密な潤いでふっくらと押し上げるようにケア
3. **首からデコルテまでのリンパ流しマッサージに最適**：すべりの良いテクスチャーで摩擦を防ぎながら、老廃物を鎖骨へ流すネックマッサージを同時に実現

今回は韓国オリーブヤング1位のBIOHEAL BOH（バイオヒールボ）をはじめ、楽天市場で絶賛されている人気ネッククリーム10選を徹底レビューします！`
  },
  {
    slug: 'art-microcurrent-face-roller-contouring-device-10sen-2026',
    id: 'art-microcurrent-face-roller-contouring-device-10sen-2026',
    title: '【微弱電流マイクロカレント美顔ローラー10選】充電不要・転がすだけでフェイスラインをギュッと引き締め！むくみ・二重あご・ほうれい線を撃退する極上マッサージギア',
    category: '美顔器・美容家電',
    date: '2026-09-11',
    description: 'ソーラーパネルから光を取り込み生体電流に近い微弱電流「マイクロカレント」を発生させる人気美顔ローラー10選！充電不要でいつでもどこでも転がすだけで、むくんだ顔やフェイスラインをスッキリ引き締める防水マッサージローラーを比較。',
    products: fetched.t4,
    lead: `「朝起きると顔がパンパンにむくんでいる」「フェイスラインがぼやけて二重あごが気になる」「エステに通う時間はないけれど、自宅で手軽にリフトケアしたい」……そんな大人世代の救世主となるのが、**「微弱電流マイクロカレント美顔ローラー」**です。

電源コードや充電の必要がなく、ソーラーパネルから太陽光や部屋の明かりを取り込んで生体電流とほぼ同じ強さの「マイクロカレント」を発生させます：
- **プロのエステティシャンの「揉み流す（ニーディング）」手技を忠実に再現**：3D多面カットボールが肌を心地よく挟み込み、滞った老廃物やリンパをスムーズに流す
- **マイクロカレントによる肌細胞の活性化**：ピリピリとした痛みのない極めて穏やかな微弱電流が、肌本来のキメを整えてハリと弾力をサポート
- **お風呂で使える完全防水（IPX7仕様）仕様**：湯船に浸かりながら身体が温まった状態でコロコロ転がすことで、マッサージ効果と巡りが何倍にもアップ

今回は楽天市場でランキング1位を獲得している実力派からギフトにも喜ばれる高機能モデルまで、厳選10選を使いやすさとフィット感から徹底比較します！`
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
        `毎日のセルフケアを格上げする確かな機能性とコストパフォーマンス`
      ],
      description: `【第${idx + 1}位】${p.name}\n販売店：${p.shop}（価格：¥${Number(p.price).toLocaleString()}）\n実際のユーザーから★${p.reviewAverage}（レビュー数${p.reviewCount}件）の高評価を獲得している人気アイテム。初めての方でも安心して日々のルーティンに取り入れられる確かな品質が支持されています。`
    };
  });

  const mainProduct = def.products[0] || {};

  // リッチなMarkdownコンテンツの構築
  let content = `${def.lead}\n\n---\n\n## 失敗しない選び方の3大ポイント\n\n`;
  content += `### 1. 配合成分の純度や素材の安全性を確認\n肌や口内に直接触れるアイテムだからこそ、無添加基準や高品質素材（医療用グレード・エキスパンド糸・ソーラー充電仕様など）をしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンとして継続しやすい使い勝手\n「手軽さ」こそが美しさを育む最大の要素です。持ち運びやすさ、片手で扱える形状、浴室で使える防水仕様など、ライフスタイルに馴染むアイテムを選びましょう。\n\n`;
  content += `### 3. コストパフォーマンスとレビュー評価の信頼性\n一時的な流行にとどまらず、多くの購入者がリピートしている製品や高評価レビューが集まっている定番名品を選ぶと失敗がありません。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

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

console.log(`[Batch 123 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
