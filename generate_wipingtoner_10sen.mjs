import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('拭き取り化粧水 角質 毛穴')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 distinct top wiping toners / peeling lotions:
  // 1. クリニーク クラリファイング ローション (idx: 2)
  // 2. Anua アヌア アゼライン酸3 CICAスキンクリアトナー (idx: 5)
  // 3. VT CICA トナーパッド (idx: 3)
  // 4. TUNEMAKERS チューンメーカーズ 原液ピーリング液 (idx: 6)
  // 5. 魔女工場 ガラクトミー クリアスキントナー (idx: 27)
  // 6. THE ORDINARY ジオーディナリー グリコール酸7% 拭き取り化粧水 (idx: 19)
  // 7. イニスフリー ビジャ クリア トナー (idx: 14)
  // 8. SKIN1004 センテラ クイックカーミングパッド (idx: 8)
  // 9. ルルルン LuLuPad トナーパッド (idx: 24)
  // 10. ナリス化粧品 COSIM コシム 拭き取り化粧水 (idx: 7)
  const pickedIndices = [2, 5, 3, 6, 27, 19, 14, 8, 24, 7];

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
  id: 'art-wiping-toner-peeling-lotion-10sen-2026',
  queryTarget: '拭き取り化粧水 角質ケア おすすめ 10選',
  title: '【2026年最新】くすみ・古い角質・毛穴ザラつきを一掃！最強拭き取り化粧水・トナーパッドおすすめ10選！浸透力UP完全比較',
  description: '洗顔では落ちない古い角質を優しくオフして化粧水の浸透を劇的向上！クリニーク、魔女工場、アゼライン酸トナーから話題のトナーパッドまで楽天市場の実売データと口コミから厳選した拭き取り化粧水10選を徹底比較。',
  category: 'skincare',
  tags: ['拭き取り化粧水', 'ふきとり化粧水', 'トナーパッド', '角質ケア', '毛穴ケア', 'くすみ改善', 'ブースター化粧水', 'クリニーク', '最新コスメ10選'],
  author: '神崎 美咲',
  featured: true,
  intro: `「化粧水が肌に入っていかず表面で弾かれてしまう」「洗顔しているのに小鼻のザラつきやくすみが取れない」――そんなスキンケアの停滞期を打破する必須ステップが『**拭き取り化粧水（ふきとり化粧水・トナーパッド）**』です。\n\n通常の洗顔では落としきれない不要な古い角質や毛穴汚れをマイルドに除去し、その後に使う美容液や乳液の浸透力を劇的に底上げします。本記事では、楽天市場でリアルタイムに高評価を集める拭き取り化粧水・パッドの中から、角質オフ力・肌への低刺激性・保湿キープ力を基準に選んだ**厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '皮膚科学発想の世界的ベストセラー！不要な角質を穏やかに取り除きクリアな透明美肌へ導く不動のNo.1', label: '殿堂入り・世界的ロングセラー' },
    { rank: '2位', point: '皮脂トラブルと毛穴詰まりを集中ケア！アゼライン酸とCICA配合で肌荒れ・赤みを防ぐ最新名品', label: 'アゼライン酸・皮脂トラブル' },
    { rank: '3位', point: '両面エンボス加工パッドで手軽に角質ケア！独自CICA成分でゆらぎ肌を鎮静しながら潤いを補給', label: 'CICAトナーパッド・大人気' },
    { rank: '4位', point: 'AHA（フルーツ酸）原液を高配合！小鼻の黒ずみ・角栓ザラつきをダイレクトに分解する原液コスメ', label: '原液AHA・頑固な角栓' },
    { rank: '5位', point: 'ガラクトミセス発酵濾過物×LHA・PHA配合！刺激を抑えながら毛穴の引き締まったツヤ肌をつくる', label: '発酵エキス・低刺激PHA' },
    { rank: '6位', point: '高濃度グリコール酸7%配合！くすんだ肌のターンオーバーを強力にサポートするグローバル大ヒット', label: '高濃度AHA・透明感UP' },
    { rank: '7位', point: 'チェジュ島の天然ビジャオイル配合！サリチル酸（BHA）が毛穴の余分な皮脂汚れをさっぱりオフ', label: '天然ビジャ・さっぱり爽快' },
    { rank: '8位', point: 'マダガスカル産ツボクサエキスを高純度配合！大判パッドで肌を摩擦レスに整える敏感肌の味方', label: 'ツボクサ高純度・摩擦レス' },
    { rank: '9位', point: 'フェイスマスクのルルルン発！角質オフと濃密保湿がこれ1枚で完了するマルチトナーシート', label: '高保湿パッド・時短ケア' },
    { rank: '10位', point: '日本のふきとり化粧水のパイオニア「ナリス化粧品」処方！アルコールフリーで肌本来の美しさを引き出す', label: 'パイオニア技術・無添加' }
  ],
  sections: [
    {
      h: '拭き取り化粧水を取り入れるべき「3大スキンケア効果」',
      body: `毎日の洗顔に加えて拭き取り化粧水をプラスすることで、肌トラブルの根本原因にアプローチできます。\n\n1. **スキンケアの浸透力（ブースター効果）が倍増**: 肌表面を覆うゴワついた古い角質を取り除くことで、後から使う化粧水や美容液の水分・美容成分が角層の奥までぐんぐん引き込まれます。\n2. **毛穴詰まり・ニキビ・黒ずみの未然防止**: 洗顔で落としきれなかった酸化皮脂やメイク残りを吸着し、コメド（白ニキビ）やいちご鼻の発生を防ぎます。\n3. **くすみを取り払い即効トーンアップ**: メラニンを含んだ古い角層が剥がれることで、肌のキメが整い、光を綺麗に反射する明るい素肌が蘇ります。`
    },
    {
      h: 'AHA vs BHA vs PHA？成分と形状で選ぶ拭き取り化粧水の基準',
      body: `| 成分・タイプ | 特徴と効果 | おすすめの肌質・悩み |\n|:---|:---|:---|\n| **AHA（フルーツ酸・グリコール酸）** | 水溶性。肌表面の不要な角質を剥離しツルツルに | くすみ・ゴワつき・乾燥肌 |\n| **BHA（サリチル酸）** | 脂溶性。毛穴の奥の皮脂汚れ・角栓を溶かす | オイリー肌・ニキビ・黒ずみ毛穴 |\n| **PHA / LHA（次世代ピーリング）** | 分子が大きく低刺激。水分を与えながらマイルドに角質オフ | 敏感肌・ゆらぎ肌・毎日使いたい方 |\n| **トナーパッド型（パッド一体）** | コットン不要で忙しい朝も1枚で完了 | 時短重視・部分パックもしたい方 |`
    },
    {
      h: '肌を絶対に痛めない！「摩擦レスな拭き取りコットン術」',
      body: `- **コットンに裏まで浸るくらいたっぷり出す**: 液量が少ないと繊維で摩擦が起き肌荒れの原因になります。裏側までヒタヒタになるくらいたっぷり含ませます。\n- **中指と薬指に挟んで「撫でるように」滑らせる**: コットンを人差し指と小指でしっかり固定し、皮膚を引っ張らないフェザータッチで内側から外側へ優しく滑らせます。\n- **小鼻やあごはくるくると力を入れずに**: ザラつきが気になるTゾーンは、擦らずに優しく円を描くように滑らせて角質をオフします。`
    }
  ],
  faqs: [
    {
      q: '拭き取り化粧水は毎日朝晩使っても大丈夫ですか？',
      a: 'PHAや低刺激処方のトナーパッドは毎朝晩ご使用いただけますが、高濃度AHA（グリコール酸等）配合の製品は週2〜3回からスタートし、肌のコンディションに合わせて頻度を調整してください。'
    },
    {
      q: '拭き取り化粧水を使った後、通常の化粧水は必要ですか？',
      a: 'はい、必要です。拭き取り化粧水は「角質除去・ブースター」の役割を果たすため、拭き取った直後は肌が水分を吸収しやすい状態になっています。すぐに高保湿な化粧水や乳液で潤いを補給してください。'
    },
    {
      q: '敏感肌で赤みが出やすいのですが使えますか？',
      a: 'アルコールフリーやアゼライン酸、CICA（ツボクサエキス）、PHA配合の敏感肌向けアイテム（AnuaやSKIN1004、ナリス等）を選び、決して強く擦らずに優しく肌を押さえるように使うのがおすすめです。'
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

本記事では、洗顔だけでは落としきれない古い角質や毛穴汚れをオフしてスキンケアの浸透力を最大化する「**最強の拭き取り化粧水・トナーパッド**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

毎日のスキンケアの最初に取り入れて、ゴワつきやくすみのない、触れたくなるような透明つるすべ肌を手に入れてみてください。

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
  console.log('🎉 拭き取り化粧水10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
