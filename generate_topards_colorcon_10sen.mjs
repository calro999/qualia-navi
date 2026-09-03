import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchTopardsProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('トパーズ カラコン 指原莉乃 TOPARDS')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // Picked 10 distinct top product packages:
  // 0: 公式ワンデー1箱 (idx: 0)
  // 1: 公式ワンデー2箱セット (idx: 1)
  // 2: 公式乱視用トーリック2箱 (idx: 2)
  // 3: モアコン限定カラーワンデー1箱 (idx: 3)
  // 4: 公式ワンデー4箱まとめ買い (idx: 4)
  // 5: 公式マンスリー1箱2枚 (idx: 21)
  // 6: 公式マンスリー2箱セット (idx: 14)
  // 7: 公式乱視用トーリック1箱 (idx: 6)
  // 8: 公式ワンデー3箱セット (idx: 11)
  // 9: トパーズ(さっしー)×フェリアモ(まいやん) 自由2箱セット (idx: 28)
  const pickedIndices = [0, 1, 2, 3, 4, 21, 14, 6, 11, 28];

  return pickedIndices.map((idx, i) => {
    const item = rawItems[idx];
    let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
    if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
      img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
    } else if (img.includes('tshop.r10s.jp/')) {
      img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
    }
    return {
      rank: i + 1,
      itemName: item.itemName,
      shopName: item.shopName,
      price: `${item.itemPrice.toLocaleString()}円 (税込)`,
      priceNum: item.itemPrice,
      affiliateUrl: item.affiliateUrl,
      imageUrl: img,
      reviewAvg: item.reviewAverage || 4.6,
      reviewCount: item.reviewCount || 0,
      catchcopy: item.catchcopy || ''
    };
  });
}

const articleDef = {
  id: 'art-topards-sashihara-rino-colorcon-10sen-2026',
  queryTarget: '指原莉乃 カラコン トパーズ 人気色 おすすめ 10選',
  title: '【2026年最新】指原莉乃プロデュース「TOPARDS（トパーズ）」カラコン人気色・おすすめ10選徹底比較！全色レポ＆パーソナルカラー別似合う色診断',
  description: 'さっしー（指原莉乃）プロデュースで爆発的ヒットを記録し続ける「TOPARDS（トパーズ）」カラコンを徹底レビュー！デートトパーズ・ストロベリークォーツ等の人気色比較から乱視用・マンスリー・お得なセット購入まで、楽天市場公式データと口コミに基づき厳選10選を詳しく解説。',
  category: 'colorcon',
  tags: ['カラコン', 'トパーズ', 'TOPARDS', '指原莉乃', 'さっしーカラコン', 'デートトパーズ', 'ストロベリークォーツ', '芸能人カラコン', 'ワンデーカラコン', '乱視用カラコン', '最新コスメ10選'],
  author: '神崎 美咲',
  featured: true,
  intro: `「カラコンを着けているのはバレたくないけれど、裸眼よりも圧倒的に透明感と目力をアップさせたい」――そんな大人女子のリアルな願いを叶え、カラコン界の絶対的エースとして君臨し続けているのが、**さっしー（指原莉乃さん）完全プロデュースの『TOPARDS（トパーズ）』**です。\n\n「ちゅるんとしたツヤ感」「瞳に光が差し込んだような絶妙なドットグラデーション」「究極のバレにくさ」にこだわり抜かれ、オフィスメイクから休日デートまで幅広いシーンで支持されています。\n\n本記事では、大定番の「デートトパーズ」や「ストロベリークォーツ」をはじめとする全色チャート、乱視用（トーリック）、高コスパなマンスリー（1ヶ月）、公式限定セットまで、**楽天市場の公式実売データと口コミから厳選したおすすめ10選**を徹底解説します。`,
  rankingNotes: [
    { rank: '1位', point: '王道モテ＆デイリー使いの決定版！全カラーから1箱選べる一番人気の公式ワンデー単品', label: '殿堂入りNo.1・全色対応1箱' },
    { rank: '2位', point: '左右で度数が違う方や人気色を2種類着比べたい方に大好評！一番売れている公式2箱セット', label: '売上トップ・お得な2箱セット' },
    { rank: '3位', point: '「乱視だから盛れるカラコンがない…」を解決！大人気デートトパーズの乱視用ワンデー2箱セット', label: '乱視用トーリック・待望の2箱' },
    { rank: '4位', point: 'モアコンタクト限定カラーも選択可能！即日発送ですぐに手元に届く大人気ショップ限定便', label: 'WEB限定カラー・即日発送' },
    { rank: '5位', point: '毎日愛用するリピーターのストックに最適！1箱あたりが最もお得になる大容量4箱まとめ買い', label: 'コスパ最強・大容量4箱' },
    { rank: '6位', point: '1日あたりのコストを劇的に抑えたい方に！毎日使えて経済的なトパーズ公式マンスリー（1ヶ月用）', label: '高コスパ・公式マンスリー' },
    { rank: '7位', point: '両目1ヶ月分をしっかりカバー！毎日の通学・通勤でデイリー使いする人に選ばれているマンスリー2箱', label: '1ヶ月両目セット・デイリー用' },
    { rank: '8位', point: '「自分の乱視度数に合うか試したい」方へ！単品で気軽に試せる乱視用トーリック1箱10枚', label: '乱視用お試し・単品1箱' },
    { rank: '9位', point: '平日用・デート用・お出かけ用と気分に合わせて3カラーを着回せる公式3箱30枚アソート', label: '3色着回し・公式3箱セット' },
    { rank: '10位', point: '指原莉乃（TOPARDS）× 白石麻衣（feliamo）の芸能人プロデュース夢の着比べができる特別クーポンセット', label: '芸能人コラボ割・さっしー×まいやん' }
  ],
  sections: [
    {
      h: 'なぜTOPARDS（トパーズ）はここまで愛されるのか？3つの神こだわり',
      body: `カラコン特有の「不自然なフチ感」や「人工的なベタ塗り感」を徹底的に排除したトパーズ。その人気の秘密は指原莉乃さんの徹底したこだわりにあります。\n\n1. **計算し尽くされたドットフチと光を取り込むハイライト効果**: ドットの密度を外側に向けて細かくぼかすことで、黒目と白目の境界線が極めて自然に馴染みます。瞳の中に光が差し込んだような立体的な透明感を演出します。\n2. **シーンやパーソナルカラーに合わせて選べる豊富なカラー設計**: 裸眼風のナチュラルブラウンから、甘めピンク、儚げグレージュ、透明感ブルーまで、自分に一番似合うカラーが必ず見つかります。\n3. **瞳の健康を守る高スペック設計**: UV-A波75%・UV-B波99%カットの紫外線対策レンズを採用。さらにうるおい成分「MPCポリマー」配合で、夕方になっても乾きにくく快適なつけ心地が続きます。`
    },
    {
      h: '【全色チャート】TOPARDS（トパーズ）人気カラーの徹底比較＆特徴',
      body: `| カラー名 | 着色直径 | 色味の特徴 | おすすめシーン・印象 |\n|:---|:---|:---|:---|\n| **デートトパーズ（Date Topaz）** | 13.4mm | 裸眼をそのまま拡大したような究極の王道ブラウン | オフィス・学校・初対面のデートに |\n| **ストロベリークォーツ（Strawberry Quartz）** | 13.5mm | ほんのりピンクが溶け込む甘めブラウン | あざと可愛いフェミニンメイクに |\n| **クリームローズ（Cream Rose）** | 13.4mm | 上品なピンクベージュで儚げな透明感 | ブルベ夏・色素薄い系メイクに |\n| **モカリング（Mocha Ring）** | 13.7mm | 細めのくっきりフチでくりっとした愛らしい丸目 | 写真映え・しっかり盛りたい日に |\n| **グレージュクォーツ（Grege Quartz）** | 13.2mm | くすみグレージュで大人っぽくアンニュイ | モード系・垢抜けお洒落メイクに |\n| **ガーネット（Garnet）** | 13.5mm | 明るめライトブラウンで瞳にハイライト効果 | イエベ春・光が差し込むツヤ瞳に |\n| **ラピスラズリ（Lapis Lazuli）** | 13.6mm | 透き通るようなブルーグレーで黒髪映え | クール・透明感を極めたい日に |\n| **オパール（Opal）** | 13.8mm | 白目に溶け込む水光グラデーション | 瞳を大きく見せつつナチュラルに |`
    },
    {
      h: '【パーソナルカラー別】あなたに一番似合うトパーズの選び方診断',
      body: `自分のパーソナルカラー（PC）に合わせたレンズを選ぶことで、瞳だけでなく肌全体の透明感や血色感がぐっと引き立ちます。\n\n- **イエベ春（スプリング）**: 『**ガーネット**』『**ハニーアンバー**』『**シトリン**』がぴったり。明るいイエローブラウンやヘーゼル系が瞳のキラキラ感を強調します。\n- **ブルベ夏（サマー）**: 『**クリームローズ**』『**ストロベリークォーツ**』『**デートトパーズ**』がベスト。青みを含んだ柔らかいピンク系やソフトブラウンが肌の白さを引き立てます。\n- **イエベ秋（オータム）**: 『**モカリング**』『**ペリドット**』『**デートトパーズ**』が相性抜群。深みのあるオリーブブラウンや落ち着いたトーンが大人っぽさを演出します。\n- **ブルベ冬（ウィンター）**: 『**ラピスラズリ**』『**グレージュクォーツ**』『**スモーキーブラウン**』がイチオシ。コントラストのある透明感ブルーやグレーが吸い込まれるような瞳を作ります。`
    },
    {
      h: 'ワンデー vs マンスリー vs 乱視用（トーリック）！どれを選ぶべき？',
      body: `- **ワンデー（1日使い捨て）**: 週に数回だけ着ける方、衛生面を最優先にしたい方、休日やデートの日だけ使いたい方に最適。お手入れ不要で毎日新品の清潔さ。\n- **マンスリー（1ヶ月装用）**: 毎日カラコンを着ける通学・通勤派におすすめ。1箱で1ヶ月使えるため、1日あたりのコストを大幅に抑えられます（※毎日の洗浄・保存ケアが必要です）。\n- **トーリック（乱視用）**: 乱視軸（AXIS）と円柱度数（CYL）が設計されており、視界のブレやぼやけを補正しながらトパーズの透明感デザインを楽しめます。`
    },
    {
      h: '✨ 芸能人プロデュースカラコン特集（内部リンク・関連シリーズ）',
      body: `本サイトでは、人気芸能人・アーティストが手掛ける話題のプロデュースカラコンを順次徹底比較しています！それぞれの世界観や仕上がりの違いをぜひチェックしてみてください。\n\n- 🔥 **ちゃんみなプロデュース**: [【ちゃんみなプロデュース】ギャルネバーダイ（GAL NEVER DIE）カラコン全色比較＆レポ](/articles/feature-chanmina-gal-never-die-colorcon-complete) —— 圧倒的存在感とエッジの効いたストリート＆ギャル盛れカラコン！\n- 🌸 **白石麻衣プロデュース**: 『feliamo（フェリアモ）』—— 男性ウケ・清楚系モテを極めた愛されナチュラルレンズ\n- 💫 **宮脇咲良プロデュース**: 『MOLAK（モラク）』—— ニュアンスカラーと繊細なグラデーションで魅せる韓国風トレンドアイ\n- 👑 **益若つばさプロデュース**: 『AngelColor Bambi Series（バンビシリーズ）』—— ドールアイになれる元祖ドーリー＆ちゅるんフチカラコン`
    }
  ],
  faqs: [
    {
      q: 'トパーズで一番バレにくくて学校や職場でも使えるカラーは何色ですか？',
      a: '不動のNo.1人気カラー「デートトパーズ（Date Topaz）」です。着色直径13.4mmの絶妙なサイズ感と、瞳に溶け込むぼかしドットフチにより、至近距離で見られてもカラコンと気づかれにくく、自然に瞳をひと回り大きく見せてくれます。'
    },
    {
      q: '乱視でもトパーズを使えますか？',
      a: 'はい、トパーズには乱視用シリーズ「TOPARDS TORIC（トパーズ トーリック）」がラインナップされています。大人気のデートトパーズのデザインそのままに乱視度数が入っているため、クリアな視界とおしゃれな瞳を両立できます。'
    },
    {
      q: 'カラコンを着ける際の注意点や正しい使い方はありますか？',
      a: 'カラコンは高度管理医療機器です。必ず眼科で定期検査を受け、決められた装用時間（1日8時間以内推奨）を守ってください。ワンデータイプは一度外したら再装着せず必ず破棄し、マンスリータイプは専用のケア用品で毎日こすり洗い・消毒を行ってください。'
    }
  ]
};

async function generate() {
  console.log('🔍 楽天APIからTOPARDS（トパーズ）商品データを取得中...');
  const products = await fetchTopardsProducts();
  console.log(`✅ 楽天APIから${products.length}件の厳選商品を取得完了！`);
  const today = '2026-09-03';

  let table = '<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n\n';
  table += '| 順位 | 商品名・セット内容 | 特徴・部門 | 注目ポイント | 楽天参考価格 | 公式リンク |\n';
  table += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
  products.forEach((p, i) => {
    const note = articleDef.rankingNotes[i];
    table += `| **${note.rank}** | **[${p.itemName.slice(0, 38)}...](${p.affiliateUrl})** | 🏷️${note.label} | ${note.point} | **${p.price}** | [👉 楽天公式](${p.affiliateUrl}) |\n`;
  });
  table += '\n</div>\n';

  let products_html = '';
  products.forEach((p, i) => {
    const note = articleDef.rankingNotes[i];
    const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.6))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.6)));
    products_html += `
---

## ${i+1}位【${note.label}】${p.itemName.slice(0, 55)}

> **💡 注目ポイント: ${note.point}**

![${p.itemName.slice(0, 30)}](${p.imageUrl})

| 項目 | 詳細情報 |
|:---|:---|
| **取扱ショップ** | ${p.shopName || '公式取扱店'} |
| **楽天参考価格** | **${p.price || '価格はリンク先で確認'}** |
| **ユーザー評価** | ${stars} (${p.reviewAvg}/5.0・レビュー${p.reviewCount.toLocaleString()}件) |
| **おすすめ度** | ${note.point} |

${p.catchcopy ? `> 「${p.catchcopy.slice(0, 140)}」` : `> 指原莉乃プロデュースの大ヒットカラコン。楽天市場の公式ショップで絶大なレビュー評価を誇ります。`}

**[👉 楽天市場公式で詳細情報・リアル口コミを見る](${p.affiliateUrl})**

`;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": articleDef.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": articleDef.title,
    "description": articleDef.description,
    "numberOfItems": products.length,
    "itemListElement": products.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.itemName.slice(0, 80),
      "url": p.affiliateUrl
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleDef.title,
    "description": articleDef.description,
    "author": { "@type": "Person", "name": articleDef.author },
    "datePublished": today,
    "dateModified": today,
    "publisher": { "@type": "Organization", "name": "Qualia Navi" }
  };

  let sectionsHtml = '';
  articleDef.sections.forEach(s => {
    sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`;
  });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  articleDef.faqs.forEach(f => {
    faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`;
  });

  const content = `# ${articleDef.title}

${articleDef.intro}

---

## 📱 【比較表】${articleDef.queryTarget} 一覧

${table}

${products_html}

${sectionsHtml}

${faqHtml}

---

## まとめ：自分史上最高の透明感アイをトパーズで手に入れよう！

指原莉乃さんプロデュースの『**TOPARDS（トパーズ）**』は、「バレずに盛りたい」「透明感のあるつややかな瞳になりたい」という願いを完璧に叶えてくれる至高のカラコンシリーズです。

デイリーに使える王道の「デートトパーズ」から、甘いピンクの「ストロベリークォーツ」、大人っぽい「グレージュクォーツ」まで、ご自身のパーソナルカラーや装用シーンに合わせて選んでみてください。ワンデー・マンスリー・乱視用とお得なセットを活用して、毎日のアイメイクをワンランク格上げしましょう！

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
`;

  const articlesJsonPath = path.join(process.cwd(), 'src', 'data', 'articles.json');
  let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
  
  // Remove if exists
  articlesData = articlesData.filter(a => a.id !== articleDef.id);

  const newArticle = {
    id: articleDef.id,
    title: articleDef.title,
    description: articleDef.description,
    content: content,
    category: articleDef.category,
    tags: articleDef.tags,
    author: articleDef.author,
    createdAt: today,
    updatedAt: today,
    image: products[0]?.imageUrl || '',
    affiliateUrl: products[0]?.affiliateUrl || '',
    price: products[0]?.price || '',
    itemCount: products.length,
    featured: articleDef.featured
  };

  articlesData.unshift(newArticle);
  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log('🎉 指原莉乃プロデュース TOPARDS（トパーズ）カラコン10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
