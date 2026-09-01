import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('トーンアップ 化粧下地')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 top distinct items:
  // 1. ラ ロッシュ ポゼ UVイデア XL プロテクショントーンアップ (idx: 0)
  // 2. シュウ ウエムラ アンリミテッド ブロック:ブースター (idx: 3)
  // 3. ランコム UV エクスペール トーン アップ ローズ N (idx: 7)
  // 4. クレ・ド・ポー ボーテ ヴォワールコレクチュールn (idx: 22)
  // 5. コスメデコルテ サンシェルター マルチプロテクション トーンアップCC (idx: 4)
  // 6. ETVOS ミネラルインナートリートメントベース (idx: 12)
  // 7. アスタリフト D-UVシールド トーンアップ (idx: 2)
  // 8. TIRTIR マスクフィット トーンアップシリーズ (idx: 11)
  // 9. Ririmew リリミュウ トーンアップカラープライマー (idx: 6)
  // 10. Yunth 生VCトーンアップUV (idx: 24)
  const pickedIndices = [0, 3, 7, 22, 4, 12, 2, 11, 6, 24];

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
  id: 'art-tone-up-primer-base-makeup-10sen-2026',
  queryTarget: 'トーンアップ 化粧下地 おすすめ 10選',
  title: '【2026年最新】ノーファンデ派も絶賛！透明感爆上がりの最強トーンアップ化粧下地おすすめ10選！くすみ・毛穴・崩れ防止完全比較',
  description: 'くすみ・色ムラ・毛穴を一瞬で消し去り、ひと塗りで素肌そのものが発光するような透明感美肌をつくる最強トーンアップ化粧下地10選を徹底比較！デパコス・プチプラ・敏感肌向けまで楽天市場の実売データから厳選。',
  category: 'makeup',
  tags: ['トーンアップ下地', '化粧下地', 'ノーファンデ', 'くすみ改善', 'UV下地', 'ラロッシュポゼ', 'デパコス下地', '日焼け止め下地', '最新コスメ10選'],
  author: '橘 えりか',
  featured: true,
  intro: `「ファンデーションを厚塗りしなくても、下地だけでパッと明るい透明美肌をつくりたい」「夕方の黄ぐすみや毛穴落ちを一日中防ぎたい」――そんな願いを叶えるのが進化した『**トーンアップ化粧下地**』です。\n\n光の乱反射効果で色ムラを補正し、美容液成分をたっぷり含んだ最新のトーンアップ下地は、ノーファンデでも美肌見えするクオリティを誇ります。本記事では、楽天市場でリアルタイムに圧倒的支持を集めるトーンアップ下地の中から、補正力・崩れにくさ・UVカット力を基準に**本当におすすめできる厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '王道にして頂点！敏感肌にもやさしく自然な血色ピンクでくすみを一掃する大ベストセラー', label: '殿堂入り・透明感No.1' },
    { rank: '2位', point: '肌の凹凸をなめらかに整え、ファンデーションの密着度と持ちを最大化するプロ御用達プライマー', label: '毛穴補正・ブースターNo.1' },
    { rank: '3位', point: '最高峰スキンケア成分配合！みずみずしいツヤと上質なバラ色の血色感を宿す名品デパコス下地', label: 'デパコス最高峰・極上ツヤ' },
    { rank: '4位', point: 'ひと塗りで極上のなめらか肌へ！小ジワ・毛穴・色ムラをリセットする名実ともに最高峰の下地', label: '最高峰ラグジュアリー' },
    { rank: '5位', point: '高いUVカット力とナチュラルなカバー力を両立！デイリー使いに最適な高コスパCC下地', label: '高UVカット・デイリーCC' },
    { rank: '6位', point: '美容液のように溶け込む植物オイル配合！石鹸オフ対応でインナードライ肌を救うトリートメント下地', label: '敏感肌・石鹸オフNo.1' },
    { rank: '7位', point: 'ディープ紫外線まで徹底ブロック！肌の奥からのハリ低下を防ぎながら澄んだ透明感を与える', label: '徹底UV防御・ハリケア' },
    { rank: '8位', point: '韓国発の圧倒的密着力！ベタつかずマスク崩れに強い水光トーンアップ下地', label: '韓国水光ツヤ・高密着' },
    { rank: '9位', point: '指原莉乃さんプロデュース！絶妙なコントロールカラーでパーソナルカラーに合わせた透明感を演出', label: 'カラー補正・プチプラ神' },
    { rank: '10位', point: '生ビタミンC配合のスキンケア発想！紫外線対策と同時に美白ケアを叶えるハイブリッドUV', label: '生ビタミンC・美白ケア' }
  ],
  sections: [
    {
      h: '肌悩み・パーソナルカラー別「トーンアップカラー」の選び方',
      body: `| カラー | 主な効果・補正力 | 向いている肌悩み・パーソナルカラー |\n|:---|:---|:---|\n| **ローズ・ピンク** | 血色感をプラスし、いきいきとした健康的な明るさに | イエベ春・ブルベ夏・血色感のない青白い肌 |\n| **ホワイト・クリア** | 素肌そのもののトーンを均一に引き上げ透明感を演出 | 全肌質・自然なトーンアップを求める方 |\n| **ラベンダー・パープル** | 黄ぐすみを相殺して圧倒的な白肌・透明感を付与 | 黄ぐすみが気になる方・ブルベ冬 |\n| **ベージュ・ティント** | 赤みや色ムラを整え自然にカバー | ノーファンデ派・色ムラが気になる肌 |`
    },
    {
      h: 'トーンアップ下地をムラなく白浮きさせない「美肌塗りの極意」',
      body: `- **1回の適量を守る**: パール粒1個分を手の甲に取り、両頬・おでこ・鼻先・あごの5点に置きます。\n- **中心から外側へ薄く伸ばす**: 顔の中心はしっかりカバーし、フェイスラインに向かって薄くフェードアウトさせることで自然な立体感が生まれます。\n- **小鼻や目元は余った下地で**: ヨレやすい目周りや小鼻のキワは、指に残った少量をポンポンと馴染ませるだけに留めるのが崩れ防止の秘訣です。`
    },
    {
      h: 'UVカット数値（SPF/PA）と日常使いのバランス',
      body: `最新のトーンアップ下地はSPF50+/PA++++の高機能なものが多く、日焼け止めを別途重ね塗りしなくてもこれ1本で紫外線対策が完結します。日常の通勤やリモートワークならSPF30程度、長時間の外出や真夏のレジャーにはSPF50+を使い分けるのが理想的です。`
    }
  ],
  faqs: [
    {
      q: 'トーンアップ下地だけでファンデーションを塗らなくても大丈夫ですか？',
      a: 'はい、十分綺麗に仕上がります。特に最近のトーンアップ下地は光拡散パウダーや毛穴ぼかし効果が高いため、下地＋フェイスパウダーだけで自然な「ノーファンデ美肌」が完成します。'
    },
    {
      q: '日焼け止めと下地を両方使う場合はどちらが先ですか？',
      a: '【スキンケア → 日焼け止め → トーンアップ下地】の順が基本です。ただし、トーンアップ下地に十分なSPF値がある場合は、下地1本のみで済ませる方がメイク崩れを防げます。'
    },
    {
      q: '夕方になると白浮きや毛穴落ちしませんか？',
      a: '皮脂崩れ防止パウダーや保湿成分がバランス良く配合されたアイテムを選べば白浮きや毛穴落ちは防げます。全顔に厚塗りせず、Tゾーンは薄めに塗るのがポイントです。'
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

本記事では、くすみ・毛穴を飛ばして素肌そのものを美しく見せる「**最強のトーンアップ化粧下地**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

ご自身の肌質やお好みの仕上がり（血色ピンク・圧倒的透明感・素肌カバー）に合わせて最適なトーンアップ下地を選び、毎日のメイクの透明感と崩れにくさを格上げしてみてください。

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
  console.log('🎉 トーンアップ下地10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
