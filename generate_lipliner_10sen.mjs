import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('リップライナー リップペンシル')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 distinct top lip liner products:
  // 1. rom&nd ロムアンド リップメイトペンシル (idx: 0)
  // 2. M・A・C リップ ペンシル (idx: 1)
  // 3. Heart Percent ハートパーセント ドットオンムード リップペンシル (idx: 3)
  // 4. CLIO クリオ ベルベット リップ ライナー (idx: 4)
  // 5. &be アンドビー ボリュームアップライナー (idx: 16)
  // 6. colorgram カラーグラム オールインワン オーバーリップメーカー (idx: 7)
  // 7. エチュード コントゥア オーバーリップメーカー (idx: 8)
  // 8. ボビイ ブラウン リップ ペンシル (idx: 14)
  // 9. エスティ ローダー ダブル ウェア ステイ イン プレイス リップ ライナー (idx: 22)
  // 10. ザセム カバーパーフェクション リップ ペンシル (idx: 19)
  const pickedIndices = [0, 1, 3, 4, 16, 7, 8, 14, 22, 19];

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
  id: 'art-lip-liner-pencil-overlip-10sen-2026',
  queryTarget: 'リップライナー リップペンシル おすすめ 10選',
  title: '【2026年最新】人中短縮＆ぽってり唇！最強リップライナー・リップペンシルおすすめ10選！落ちないオーバーリップ完全比較',
  description: '薄い唇や左右非対称な輪郭を補正して中顔面短縮！口紅のにじみを防ぎ、立体的なふっくらオーバーリップをつくる最強リップライナー10選を徹底比較。ロムアンド・M・A・C・＆be・クリオまで楽天市場の実売データから厳選。',
  category: 'lip',
  tags: ['リップライナー', 'リップペンシル', 'オーバーリップ', '人中短縮メイク', 'ロムアンド', 'アンドビー', '中顔面短縮', '落ちないリップ', '最新コスメ10選'],
  author: '松本 結衣',
  featured: true,
  intro: `「唇が薄くて幸が薄そうに見える」「鼻の下（人中）が長くて顔が間延びして見える」――そんな悩みを一瞬で解消し、トレンドの韓国風ぽってり唇を叶える必須コスメが『**リップライナー（リップペンシル・オーバーリップメーカー）**』です。\n\n唇の輪郭を1〜2mm自然に拡張して影をつくることで、小顔効果（人中短縮・中顔面短縮）を生み出し、口紅の色移りやにじみを鉄壁ガードします。本記事では、楽天市場でリアルタイムに高評価を集めるリップライナーの中から、肌馴染み発色・ぼかしやすさ・色持ち持続力を基準に選んだ**厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '指先ブラシ付きで境界線を誰でも自然にぼかせる！素の唇の色を忠実に再現した韓国オーバーリップの神', label: '殿堂入り・韓国オーバーリップNo.1' },
    { rank: '2位', point: 'プロのメイクアップアーティスト常備！滑らかな描き心地と圧倒的なカラバリで唇の立体感を際立たせる', label: 'プロ御用達・世界的名作' },
    { rank: '3位', point: 'リップベース・ライナー・チーク・ハイライトまで使えるマルチ設計！肌トーンに馴染む絶妙くすみカラー', label: 'マルチユース・絶妙くすみ色' },
    { rank: '4位', point: 'ベルベットのような極上シルキータッチ！専用シャープナー付きで常に精密なラインが描けるクリオ新作', label: 'ベルベット質感・高密着' },
    { rank: '5位', point: '河北裕介氏プロデュース！唇のぷっくり感を物理的に引き立てる大人気ボリュームアップライナー', label: '河北プロデュース・立体感' },
    { rank: '6位', point: '陰影ライナーとベースカラーが1本になったデュアルペン！これ1本で人中短縮メイクが即座に完成する', label: 'デュアル設計・人中短縮特化' },
    { rank: '7位', point: 'コントゥアリング発想で唇の山と口角に自然な影を仕込む！ぷっくり立体的なM字リップを演出', label: 'M字リップ・影色シェード' },
    { rank: '8位', point: 'クリーミーなフォーミュラで乾燥唇にもスルスル描ける！美しい輪郭を一日中キープするデパコスの王道', label: 'デパコス王道・クリーミー' },
    { rank: '9位', point: 'ダブルウェアならではの驚異のロングウェア処方！食事をしても輪郭が滲まず色褪せない最高峰ライナー', label: '鉄壁キープ・ロングウェア' },
    { rank: '10位', point: 'コンシーラーのカバーパーフェクション技術を応用！唇のくすみや赤みを綺麗に整える高コスパペンシル', label: 'くすみ消し・超高コスパ' }
  ],
  sections: [
    {
      h: 'リップライナーを使うことで「顔全体の印象が激変する」3つの理由',
      body: `リップライナーは単なる「輪郭取り」ではなく、骨格補正メイクとして圧倒的な効果を発揮します。\n\n1. **人中短縮・中顔面短縮による小顔効果**: 上唇の山を1〜2mmオーバーに描き、下唇の中央を少し厚くすることで、鼻から唇までの距離が縮まり、劇的な若見え・小顔効果を生み出します。\n2. **口紅のにじみ・色落ちの物理的ストッパー**: 口紅やグロスの油分が唇の外側の縦ジワへ流れ出す（ブリーディング）のを完全にブロックします。\n3. **唇の左右非対称・くすみの完璧補正**: 年齢とともにぼやけがちな唇の輪郭をシャープに整え、口角の上がった引き締まった表情を作ります。`
    },
    {
      h: '失敗しない！リップライナーのカラー選びとタイプ別基準',
      body: `| ライナータイプ | 特徴と効果 | おすすめの用途・仕上がり |\n|:---|:---|:---|\n| **粘膜ピンク・ベージュ系** | 素の唇の粘膜色に近く、最も自然にオーバーリップができる | 毎日のデイリーメイク・すっぴん風 |\n| **影色（シェーディング）系** | 唇の山の上や口角下に自然な陰影をつくり立体化 | 人中短縮・M字リップ・中顔面短縮 |\n| **ウォータープルーフ・ジェル型** | 密着度が高く、食事をしてもラインが残る | イベント・長時間メイク・マスク着用時 |\n| **デュアル（ベース＋影色）型** | 1本で光と影のオーバーリップが完成 | メイク初心者・時短重視派 |`
    },
    {
      h: '誰でも失敗しない！「韓国風オーバーリップ」の描き方ステップ',
      body: `- **ステップ1（唇の境界線をコンシーラーで軽く消す）**: ファンデやコンシーラーで唇の本来の輪郭を軽くポンポンとぼかします。\n- **ステップ2（上唇の山と下唇の中央だけ1mmオーバーに描く）**: 全体を大きく囲むのではなく、「上唇の山（M字部分）」と「下唇の真ん中」だけを1〜2mmはみ出して描きます。\n- **ステップ3（指やブラシで内側に向かってぼかす）**: 描いたラインの境界線を指先や付属ブラシで内側に向けてトントンとなじませ、内側に手持ちのリップを重ねてグラデーションを作ります。`
    }
  ],
  faqs: [
    {
      q: 'リップライナーだけを塗って口紅代わりにしてもいいですか？',
      a: 'はい、芯が太めのクレヨン・ペンシルタイプ（ロムアンドやハートパーセント等）は、唇全体を塗りつぶしてマットリップとして使うことも可能です。密着力が高いため非常に落ちにくくなります。'
    },
    {
      q: '昔のギャルメイクのように輪郭だけ浮いてしまいませんか？',
      a: '昔のリップライナーと違い、現在のトレンドは「素の粘膜カラー」や「影色（シェードカラー）」が主流です。ラインを引いた後に必ず内側へぼかすことで、境界線のない自然なふっくら唇に仕上がります。'
    },
    {
      q: 'イエベ・ブルベに合うリップライナーの選び方は？',
      a: 'イエベ肌にはサーモンベージュやピーチコーラル系、ブルベ肌にはモーブピンクやローズベージュ系を選ぶと、素の粘膜色と一体化して全く浮きません。'
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

本記事では、薄い唇や左右差を補正して人中短縮＆小顔効果を叶える「**最強のリップライナー・リップペンシル**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

粘膜カラーや影色ライナーをいつものリップメイクに1本プラスして、ふっくらぽってりとした魅力的なトレンド唇を手に入れてみてください。

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
  console.log('🎉 リップライナー10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
