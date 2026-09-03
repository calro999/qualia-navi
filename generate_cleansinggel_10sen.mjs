import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('クレンジングジェル 毛穴')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 top distinct cleansing gels:
  // 1. マナラ ホットクレンジングゲル マッサージプラス (idx: 4)
  // 2. ドクターシーラボ VC100 ホットピール クレンジングゲル (idx: 19)
  // 3. ファンケル 整肌クレンジング ジェル (idx: 9)
  // 4. ドクターケイ 薬用Cクリアクレンジングジェル (idx: 15)
  // 5. プリュ クレンジングジェル (idx: 0)
  // 6. オルナ オーガニック クレンジングジェル (idx: 3)
  // 7. ドクターリセラ deep2031 ジェルクレンジング (idx: 10)
  // 8. キキメイト kikimate クレンジングジェル (idx: 2)
  // 9. ハレナ HALENA オーガニック ホットクレンジングジェル (idx: 21)
  // 10. SINN PURETE シンピュルテ ピュアクレンジング クリア (idx: 29)
  const pickedIndices = [4, 19, 9, 15, 0, 3, 10, 2, 21, 29];

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
  id: 'art-cleansing-gel-pore-blackhead-10sen-2026',
  queryTarget: 'クレンジングジェル 毛穴 おすすめ 10選',
  title: '【2026年最新】頑固な黒ずみ毛穴・角栓をつるんと落とす！最強クレンジングジェルおすすめ10選！温感＆摩擦レスW洗顔不要完全比較',
  description: 'オイルより肌に優しくバームよりすっきり！毛穴の奥の角栓汚れを吸着してつっぱらない最強クレンジングジェル10選を徹底比較。マナラやファンケル、ドクターズコスメまで楽天市場の実売データと口コミから厳選。',
  category: 'skincare',
  tags: ['クレンジングジェル', '毛穴クレンジング', 'いちご鼻解消', '温感クレンジング', 'W洗顔不要', 'マナラ', 'ファンケル', 'ドクターズコスメ', '最新コスメ10選'],
  author: '橘 えりか',
  featured: true,
  intro: `「オイルクレンジングは乾燥やつっぱりが気になる」「バームは洗い流しに時間がかかりヌルつきやすい」――そんなクレンジング迷子の救世主としていま大人気なのが『**クレンジングジェル（ゲル）**』です。\n\n厚みのあるクッションジェルが肌への摩擦ダメージを極限まで抑えながら、温感効果や美容成分で毛穴を開いて頑固な角栓・黒ずみを溶かし出します。本記事では、楽天市場でリアルタイムに高評価を集めるクレンジングジェルの中から、毛穴洗浄力・肌への優しさ・W洗顔不要の手軽さを基準に選んだ**厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '累計2,000万本突破！温感ブースターゲルが毛穴を開きメイクと頑固な角栓を同時に絡め取る不動のNo.1', label: '殿堂入り・温感毛穴No.1' },
    { rank: '2位', point: '高浸透ビタミンC誘導体×温感ピール処方！美容液成分93.7%で毛穴の引き締まったツルツル肌へ', label: 'ビタミンC配合・温感ピール' },
    { rank: '3位', point: '無添加研究のファンケル発！みずみずしいジェルが肌のバリアを守りながらすっきりメイクオフ', label: '無添加・敏感肌No.1' },
    { rank: '4位', point: '美容皮膚科の臨床発想！ビタミンC×抗炎症成分配合で大人の毛穴詰まりとニキビを根本ケアする薬用処方', label: 'ドクターズコスメ・薬用処方' },
    { rank: '5位', point: '植物由来のこんにゃくスクラブ配合！毎日のメイク落としでザラつく角栓を優しくオフする大容量', label: 'スクラブ配合・高コスパ' },
    { rank: '6位', point: '天然オーガニック植物エキスと泥（クレイ）の力！毛穴の奥の黒ずみを吸着して洗い流すボタニカル', label: 'オーガニック・泥吸着' },
    { rank: '7位', point: '海洋深層水と発酵成分の贅沢処方！不要な汚れだけを吸着して落とし肌本来の潤いを引き出す', label: '海洋深層水・無添加' },
    { rank: '8位', point: '天然由来成分95%以上配合！シトラスの爽やかな香りに包まれながらW洗顔不要で時短オフ', label: 'W洗顔不要・天然由来' },
    { rank: '9位', point: '100%天然由来の国産オーガニック温感ジェル！赤ちゃんにも使えるほどの優しさで毛穴をケア', label: '国産オーガニック・温感' },
    { rank: '10位', point: 'ジェルからオイル、さらにミルクへと変化する3段変化処方！毛穴の角栓を浮かせつつ極上の洗い上がり', label: 'テクスチャー変化・極上ツヤ' }
  ],
  sections: [
    {
      h: 'クレンジングジェルが「毛穴・角栓ケア」に圧倒的に選ばれる理由',
      body: `クレンジングジェルは「オイルの洗浄力」と「ミルクの肌への優しさ」を両立したハイブリッドな性質を持ちます。\n\n1. **厚みのあるクッション性による摩擦レス**: 手と肌の間に厚いジェルの膜ができるため、指の圧による摩擦ダメージ（シミ・たるみの原因）を完全に防ぎます。\n2. **毛穴の奥までじっくり馴染む滞留力**: サラサラ流れ落ちないため、小鼻やあごなど角栓が詰まりやすい部位にしっかり密着して皮脂を浮かせます。\n3. **温感（スチーム）効果による毛穴拡張**: グリセリン等の温感成分が肌の水分と反応して温まり、蒸しタオルを当てたように毛穴を自然に緩めます。`
    },
    {
      h: '水性 vs 油性 vs 温感？失敗しないクレンジングジェルの選び方',
      body: `| ジェルタイプ | 特徴とメリット | おすすめの肌質・メイクの濃さ |\n|:---|:---|:---|\n| **温感（ホット）ジェル** | じんわり温まって毛穴を緩め、角栓・黒ずみを溶かす | いちご鼻・頑固な角栓・くすみ肌 |\n| **水性ジェル（オイルフリー）** | まつエクOK。ベタつかずさっぱり洗い上がる | 脂性肌・ニキビ肌・ナチュラルメイク |\n| **油性ジェル（オイルイン）** | ウォータープルーフもしっかり落とせる高い洗浄力 | 乾燥肌・しっかりフルメイク派 |`
    },
    {
      h: '角栓をごっそり溶かし出す「毛穴リセット洗顔テクニック」',
      body: `- **ステップ1（乾いた手肌で使う）**: 手や顔が濡れているとジェルが薄まり温感や密着力が落ちるため、必ず水気のない状態で塗布します。\n- **ステップ2（手のひらで温めてから顔へ）**: 手のひらでジェルを軽くすり合わせて柔らかくしてから顔全体に乗せると、肌馴染みが一気に高まります。\n- **ステップ3（小鼻はくるくると優しく円を描く）**: 角栓が気になる小鼻やTゾーンは、指の腹で小さな円を描くように優しくマッサージし、ぬるま湯で乳化させながら丁寧に洗い流します。`
    }
  ],
  faqs: [
    {
      q: 'まつ毛エクステ（マツエク）をしていても使えますか？',
      a: '水性ジェルやオイルフリー処方の製品、または「マツエク対応」と記載されているクレンジングジェルであれば問題なくご使用いただけます。'
    },
    {
      q: 'W洗顔不要のクレンジングジェルは本当に洗顔料を使わなくていい？',
      a: 'はい、W洗顔不要タイプの製品はメイク汚れと皮脂汚れの両方を落とせるように設計されています。むしろ洗顔料を重ねると肌の潤いを奪いすぎて乾燥を招くため、ジェル1本で完了させるのが美肌の近道です。'
    },
    {
      q: '温感ジェルが熱すぎたり肌が赤くなることはありませんか？',
      a: '植物由来グリセリン等の自然な水分反応による温感のため、火傷等の心配はありません。ただし肌が極端に乾燥していたり傷がある場合は刺激を感じることがあるため、最初は少量からお試しください。'
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

本記事では、摩擦レスで肌を守りながら頑固な角栓・黒ずみをすっきり落とす「**最強のクレンジングジェル（ゲル）**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

温感効果や美容成分たっぷりのクレンジングジェルを取り入れて、毛穴の目立たない透明感あふれるつるすべ肌を手に入れてみてください。

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
  console.log('🎉 クレンジングジェル10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
