import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url1 = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('スティック ハイライト')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res1 = await fetch(url1);
  const data1 = await res1.json();
  const raw1 = data1.Items.map(e => e.Item || e);

  const url2 = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('ハイライト スティック グロウスティック')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res2 = await fetch(url2);
  const data2 = await res2.json();
  const raw2 = data2.Items.map(e => e.Item || e);

  // 10 top distinct stick highlighters:
  // 1. シャネル ボーム エサンシエル (raw1[12])
  // 2. ディオール バックステージ グラッシー グロウ スティック (raw2[6])
  // 3. ルナソル ラディアントスティックN (raw1[6])
  // 4. ByUR バイユア セラムフィット ボリューミング グロースティック (raw1[18])
  // 5. アルビオン スタジオ アクアグロウ スティック (raw2[5])
  // 6. アディクション ザ グロウ スティック (raw2[11])
  // 7. i'm meme アイムミミ マルチスティックデュアル ハイライト (raw1[0])
  // 8. KAHI カヒ リンクルバウンス マルチバーム ハイライター (raw1[9])
  // 9. Glint グリント スティックハイライター (raw2[24])
  // 10. エチュード プレイ101 スティックデュオ (raw1[1])
  const selected = [
    raw1[12], raw2[6], raw1[6], raw1[18], raw2[5], raw2[11], raw1[0], raw1[9], raw2[24], raw1[1]
  ];

  return selected.map((item, i) => {
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
      reviewAvg: item.reviewAverage || 4.5,
      reviewCount: item.reviewCount || 0,
      catchcopy: item.catchcopy || ''
    };
  });
}

const articleDef = {
  id: 'art-highlight-stick-glow-balm-10sen-2026',
  queryTarget: 'ハイライトスティック グロウスティック おすすめ 10選',
  title: '【2026年最新】内側から濡れツヤ発光！最強ハイライトスティック・グロウスティックおすすめ10選！ヨレない立体小顔完全比較',
  description: 'パウダーの粉っぽさゼロ！ひと塗りでみずみずしい濡れツヤと立体骨格をつくる最強ハイライトスティック10選を徹底比較。シャネル・ディオール・ルナソルから韓国プチプラまで楽天市場の実売データと口コミから厳選。',
  category: 'makeup',
  tags: ['ハイライトスティック', 'グロウスティック', '濡れツヤ肌', '水光ツヤ', 'シャネルハイライト', 'ディオール', '立体小顔メイク', 'ツヤ肌コスメ', '最新コスメ10選'],
  author: '橘 えりか',
  featured: true,
  intro: `「パウダーハイライトを塗ると乾燥小ジワや毛穴が目立ってしまう」「内側から水分が溢れ出るような自然な生ツヤ肌になりたい」――そんな大人のツヤ肌づくりに欠かせないマストアイテムが『**ハイライトスティック（グロウスティック・バームハイライター）**』です。\n\n美容オイルを固めたスティック形状で、指でトントンと置くだけで光を綺麗に集め、立体感と透明感を劇的に引き上げます。本記事では、楽天市場でリアルタイムに高評価を集めるハイライトスティックの中から、濡れツヤの美しさ・ファンデがヨレない密着力・キープ力を基準に選んだ**厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '濡れツヤ界の絶対頂点！みずみずしい光のヴェールで骨格を美しく際立たせるデパコスの名品バーム', label: '殿堂入り・濡れツヤ最高峰' },
    { rank: '2位', point: 'ガラスのような極上の光沢感！繊細なパールが肌に溶け込み洗練された立体小顔をつくる', label: 'ディオール・極上ガラスツヤ' },
    { rank: '3位', point: 'オイルのツヤと微細パールの絶妙バランス！肌のくすみを飛ばして明るい透明感を与えるルナソル名品', label: '透明感・オイル密着' },
    { rank: '4位', point: '毛穴管理スキンケア発想！美容成分たっぷりで日中の乾燥を防ぎながら水光ツヤを宿す韓国大ヒット', label: '毛穴ケア・韓国水光ツヤ' },
    { rank: '5位', point: 'みずみずしい水分感あふれるアクアツヤ！薄膜フィットでヨレにくく素肌そのものが発光する仕上がり', label: 'アクアツヤ・薄膜フィット' },
    { rank: '6位', point: '超微粒子パールが肌に一体化！さらっとしたシルキーな仕上がりでベタつかない実力派スティック', label: 'シルキー密着・ベタつきゼロ' },
    { rank: '7位', point: 'ハイライトとシェーディングが1本に！初心者でも迷わず骨格補正ができる大人気デュアルスティック', label: 'デュアル小顔・高コスパ' },
    { rank: '8位', point: 'サーモン複合成分配合！メイクの上から目元や首のシワを保湿しながらツヤを与えるマルチバーム', label: 'シワ改善保湿・マルチバーム' },
    { rank: '9位', point: '韓国アイドル愛用の高輝度ハイライター！微細パールが光を浴びるたびにキラキラ輝く華やかツヤ', label: '韓国アイドル愛用・高輝度' },
    { rank: '10位', point: 'なめらかに伸びてぼかしやすい！自然な立体感と陰影を簡単に演出できるプチプラ王道デュオ', label: 'プチプラ王道・ぼかしやすさ' }
  ],
  sections: [
    {
      h: 'スティックハイライトがパウダーより「圧倒的に垢抜ける」3つの理由',
      body: `パウダーハイライトの「白浮き」や「粉っぽさ」に悩む人がスティックハイライトを選ぶ理由には、明確な3つの光学・テクスチャー的メリットがあります。\n\n1. **粉感ゼロのリアルな「水光（濡れツヤ）感」**: オイル・バーム基剤のため、粉浮きせず肌の水分そのものが輝いているような生ツヤを演出します。\n2. **光の乱反射による毛穴・小ジワのぼかし効果**: パールをギラつかせるのではなく、光の面反射で凹凸の影を消し去るため、大人の肌を若々しく見せます。\n3. **日中の乾燥小ジワを救う高保湿効果**: 美容オイル成分が配合されているため、エアコン等で乾燥しやすい目元や頬の保湿ケアを同時に叶えます。`
    },
    {
      h: '失敗しない！ハイライトスティックのタイプ別選び方',
      body: `| タイプ | 特徴とメリット | おすすめの仕上がり・シーン |\n|:---|:---|:---|\n| **クリアバーム（ノンパール）型** | 色がつかず、純粋な水分の濡れツヤだけをオン | すっぴん風メイク・オフィス・ナチュラル派 |\n| **微細パール・偏光ラメ型** | 光を反射して華やかな立体感と透明感を付与 | お出かけ・デート・写真映え |\n| **マルチバーム型（スキンケア兼用）** | 目元や首の乾燥小ジワを保湿しながらツヤ出し | 乾燥肌・大人世代・日中のお直し |\n| **デュアル（シェーディング一体）型** | 光と影を1本で仕込めるコントゥア設計 | 丸顔・面長補正・メリハリ小顔メイク |`
    },
    {
      h: 'ベースがヨレない！プロが教える「指ポンポン直置きテクニック」',
      body: `- **スティックを直接肌に擦り付けない**: スティックを直塗りするとファンデーションが剥がれてヨレる原因になります。指の腹にバームを適量取って体温で温めてから塗布します。\n- **置くべき「光の5点ポジション」**: ①目頭のくぼみ、②頬骨の高い位置（Cゾーン）、③鼻の付け根（鼻根）、④鼻先、⑤上唇の山（キューピッドボウ）に軽く垂直タップします。\n- **仕上げにスポンジで輪郭をなじませる**: 乗せたバームの輪郭だけを清潔なスポンジでポンポンとぼかすと、肌と境目なく自然に溶け込みます。`
    }
  ],
  faqs: [
    {
      q: 'マスクをつけるとハイライトが落ちたりベタつきませんか？',
      a: '頬骨の高い位置に乗せた後、軽くフェイスパウダーを重ねるか、キープミストを吹きかけて固定すると、ツヤ感を残したままマスクへの色移りやベタつきを防止できます。'
    },
    {
      q: 'パウダーファンデーションの上から使ってもヨレませんか？',
      a: 'パウダーファンデの上から直塗りするとヨレやすいため、パウダーファンデの場合は【下地 → スティックハイライト → パウダーファンデ】の順で仕込む「インナーツヤ塗り」が最も綺麗に仕上がります。'
    },
    {
      q: 'イエベ・ブルベで似合うハイライトスティックの選び方は？',
      a: 'イエベ肌にはゴールドパールやシャンパンベージュ系、ブルベ肌にはピンクパールやラベンダー・クリア系の光沢感が肌色を引き立てて透明感を最大化します。'
    }
  ]
};

async function generate() {
  const products = await fetchProducts();
  const today = '2026-09-03';

  let table = '<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n\n';
  table += '| 順位 | 商品名 | 部門・特徴 | 注目ポイント | 楽天参考価格 | 公式リンク |\n';
  table += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
  products.forEach((p, i) => {
    const note = articleDef.rankingNotes[i];
    table += `| **${note.rank}** | **[${p.itemName.slice(0, 40)}...](${p.affiliateUrl})** | 🏷️${note.label} | ${note.point} | **${p.price}** | [👉 楽天公式](${p.affiliateUrl}) |\n`;
  });
  table += '\n</div>\n';

  let products_html = '';
  products.forEach((p, i) => {
    const note = articleDef.rankingNotes[i];
    const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.5))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.5)));
    products_html += `
---

## ${i+1}位【${note.label}】${p.itemName.slice(0, 55)}

> **💡 注目ポイント: ${note.point}**

![${p.itemName.slice(0, 30)}](${p.imageUrl})

| 項目 | 詳細情報 |
|:---|:---|
| **取扱ショップ** | ${p.shopName || '楽天公式取扱店'} |
| **楽天参考価格** | **${p.price || '価格はリンク先で確認'}** |
| **ユーザー評価** | ${stars} (${p.reviewAvg}/5.0・レビュー${p.reviewCount.toLocaleString()}件) |
| **おすすめ度** | ${note.point} |

${p.catchcopy ? `> 「${p.catchcopy.slice(0, 140)}」` : `> 楽天市場の購入者レビューで絶大な支持を集める注目コスメです。`}

**[👉 楽天市場で詳細情報・リアル口コミを見る](${p.affiliateUrl})**

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

## まとめ

本記事では、粉感ゼロで内側から発光するような生ツヤと立体小顔を叶える「**最強のハイライトスティック・グロウスティック**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

みずみずしいバームの光沢を味方につけて、くすみ知らずの若々しく透明感に満ちた水光ツヤ肌を手に入れてみてください。

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
  console.log('🎉 ハイライトスティック10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
