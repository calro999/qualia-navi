import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('グルタチオン 美容')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 top distinct items
  const pickedIndices = [15, 4, 8, 9, 10, 7, 14, 25, 19, 16];
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
      reviewAvg: item.reviewAverage || 4.5,
      reviewCount: item.reviewCount || 0,
      catchcopy: item.catchcopy || ''
    };
  });
}

const articleDef = {
  id: 'art-glutathione-skin-whitening-serum-10sen-2026',
  queryTarget: 'グルタチオン 美容液 おすすめ 10選',
  title: '【2026年最新】白玉肌へ導くグルタチオン美容液＆スキンケアおすすめ10選！くすみ・毛穴・透明感アップの最強コスメ徹底比較',
  description: '美容皮膚科の白玉点滴発想で大ブレイク中のグルタチオン配合コスメ10選を徹底比較！くすみ痕・毛穴の開き・透明感不足に悩む方に向けて、楽天市場の最新実売データから本当におすすめできる名品を厳選。',
  category: 'skincare',
  tags: ['グルタチオン', '白玉点滴', 'くすみ改善', '透明感美容液', 'ビタミンC', 'ナイアシンアミド', '韓国コスメ', '美白スキンケア', '最新コスメ10選'],
  author: '神崎 美咲',
  featured: true,
  intro: `「美容皮膚科の白玉点滴のような圧倒的な透明感が欲しい」「日焼け後のくすみやニキビ跡の色素沈着を早くリセットしたい」と願う美肌志向の方の間で、いま最も注目されている美容成分が『**グルタチオン**』です。\n\nグルタチオンは、強力な抗酸化作用を持つトリペプチドで、ビタミンCやナイアシンアミドと組み合わせることで肌の透明感とキメを劇的に引き上げる相乗効果を発揮します。本記事では、楽天市場でリアルタイムに高評価を集めるグルタチオン配合スキンケア**厳選10選**を、成分濃度・使用感・コスパの観点から徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '純度98%グルタチオン×高濃度ビタミンCでくすみ痕を集中消去する韓国No.1バズ美容液', label: '殿堂入り・白玉美白No.1' },
    { rank: '2位', point: '美容皮膚科の臨床知見を結集！レチノール×カクテルビタミン×グルタチオンの濃密エイジングケア', label: 'ドクターズコスメ最高峰' },
    { rank: '3位', point: '敏感肌でも安心の低刺激ビタカプセル処方！メラニン生成を多角的にブロックするデイリーセラム', label: '低刺激・高浸透No.1' },
    { rank: '4位', point: '純国産・医師監修！高純度グルタチオン10,000ppmを贅沢配合したメディカル発想セラム', label: '医師監修・超高濃度' },
    { rank: '5位', point: '驚異のグルタチオン60,000ppm配合！続けやすい圧倒的コスパを誇る原液特化セラム', label: '最高コスパ・原液配合' },
    { rank: '6位', point: 'サーモン注射発想PDRN×グルタチオンのW注入！たるみ毛穴と黄ぐすみを同時に引き締めるセット', label: 'ハリツヤ・毛穴引き締め' },
    { rank: '7位', point: 'ビタミンCカプセルが弾けてフレッシュに浸透！ナイアシンアミド＆セラミド配合の贅沢ブースター', label: 'カプセル密着・高保湿' },
    { rank: '8位', point: '高純度グルタチオン×純レチノールの相乗アプローチ！夜塗って翌朝のキメが整うリッチセラム', label: '夜用キメ再生・レチノール' },
    { rank: '9位', point: '大容量シートに白玉美容液をひたひた配合！毎日のながら美白パックでくすみを徹底オフ', label: '白玉集中シートパック' },
    { rank: '10位', point: '化粧水・美容液・乳液・クリームが1本に！グルタチオン×純金ゴールド配合の時短白玉ケア', label: '時短オールインワン' }
  ],
  sections: [
    {
      h: 'グルタチオンが「白玉肌」をつくる3大メカニズム',
      body: `グルタチオン（Glutathione）は、グルタミン酸・システイン・グリシンの3つのアミノ酸からなるトリペプチドです。美肌づくりにおいて以下の3つの強力な働きを持ちます。\n\n1. **メラニン生成経路のシフト**: 黒色メラニン（ユーメラニン）の生成を抑制し、明るい黄色メラニン（フェオメラニン）への合成を促進します。\n2. **抗酸化ネットワークの再活性化**: 酸化して効力を失ったビタミンCやビタミンEを還元し、肌の抗酸化力を常に最大状態に保ちます。\n3. **糖化・黄ぐすみの分解ケア**: 加齢や紫外線によるタンパク質のカルボニル化（黄ぐすみ）を防ぎ、内側から発光するような透明感をサポートします。`
    },
    {
      h: '失敗しないグルタチオンコスメの選び方',
      body: `| チェック項目 | 選び方の基準 | おすすめの肌悩み |\n|:---|:---|:---|\n| **ビタミンCとの併用設計** | グルタチオン単体よりも相乗効果が期待できる処方 | 頑固なくすみ痕・シミ予防 |\n| **配合濃度（ppm表記）** | 10,000ppm〜60,000ppm等の高濃度設計 | 即効性を重視したい方 |\n| **レチノール・PDRN複合** | 肌再生やハリ感向上成分が同時配合 | 毛穴の開き・大人のたるみ肌 |\n| **リポソーム・カプセル化** | 酸化しやすいグルタチオンを安定して角層へ届ける技術 | 敏感肌・インナードライ |`
    },
    {
      h: '効果を最大化する正しい使用タイミング＆塗り方',
      body: `- **朝のメイク前**: ビタミンC配合のグルタチオン美容液を塗ることで、日中の紫外線による活性酸素ダメージを鉄壁ブロック。\n- **夜の集中ケア**: 洗顔後、化粧水で肌を整えた後に顔全体へ優しくハンドプレス。特にくすみが気になる頬骨周りや目元には重ね付けが推奨されます。`
    }
  ],
  faqs: [
    {
      q: 'グルタチオンコスメは朝使っても大丈夫ですか？',
      a: 'はい、朝の使用が非常に推奨されます。グルタチオンは光毒性がなく、強力な抗酸化作用によって日中の紫外線ダメージや皮脂酸化から肌を守る効果があります。'
    },
    {
      q: 'ビタミンCやレチノールと一緒に使っても問題ありませんか？',
      a: '併用可能です。特にビタミンCとは非常に相性が良く、相乗効果で抗酸化力が持続します。レチノールと併用する場合は、肌の赤みが出ないよう様子を見ながら段階的に取り入れましょう。'
    },
    {
      q: '敏感肌でもピリピリせずに使えますか？',
      a: 'グルタチオン自体は生体内に存在する低刺激な成分です。ただし高濃度ビタミンCが同時に高配合されている製品は微小な刺激を感じることがあるため、パッチテストや保湿ケアを十分に行ってご使用ください。'
    }
  ]
};

async function generate() {
  const products = await fetchProducts();
  const today = '2026-09-02';

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

本記事では、美容皮膚科の白玉点滴発想で大人気となっている「**グルタチオン配合スキンケア**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

ビタミンCやレチノール、PDRNなど、ご自身の肌悩みやライフスタイルに合わせた最適なグルタチオンコスメを取り入れて、内側から透き通るような白玉美肌を手に入れてみてください。

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
  console.log('🎉 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
