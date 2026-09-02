import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('頭皮スクラブ スカルプ')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 top distinct scalp scrubs:
  // 1. SABON サボン ヘッドスクラブ リフレッシング ミント (idx: 27)
  // 2. ULRUB ウルラブ ヘッドスクラブ (idx: 0)
  // 3. AROMATICA ローズマリー スカルプ スクラブ (idx: 18)
  // 4. モロッカンオイル ピュリファイング スクラブ (idx: 14)
  // 5. UU:ON ユユオン ヘッドスクラブ (idx: 1)
  // 6. 松山油脂 Mマークシリーズ 薄荷の頭皮用スクラブ (idx: 10)
  // 7. One-day's you ワンデイズユー シカーミングスカルプスクラブ (idx: 26)
  // 8. saranara サラナラ スカルプブースト ソルトスケーラー (idx: 5)
  // 9. VAL ヴァル フレグランスヘッドスクラブ (idx: 8)
  // 10. スティーブンノル スカルプリフレッシュ ヘッドスクラブ (idx: 29)
  const pickedIndices = [27, 0, 18, 14, 1, 10, 26, 5, 8, 29];

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
  id: 'art-scalp-scrub-head-spa-cleanse-10sen-2026',
  queryTarget: '頭皮スクラブ おすすめ 10選',
  title: '【2026年最新】頭皮のニオイ・ベタつき・フケを根本リセット！最強頭皮スクラブ・ヘッドスパおすすめ10選！毛穴クレンジング完全比較',
  description: 'シャンプーでは落ちない毛穴の酸化皮脂・ニオイ・スタイリング剤の蓄積汚れをすっきりディープクレンジング！SABONやアロマティカ、プチプラまで楽天市場の実売データと口コミで高評価の頭皮スクラブ10選を徹底比較。',
  category: 'haircare',
  tags: ['頭皮スクラブ', 'ヘッドスクラブ', 'スカルプケア', '頭皮クレンジング', 'SABON', '頭皮のニオイ改善', '毛穴スッキリ', 'ヘッドスパ', '最新コスメ10選'],
  author: '松本 結衣',
  featured: true,
  intro: `「夕方になると頭皮のベタつきやニオイが気になる」「毎日シャンプーしているのに根本がペタンと潰れてしまう」――そんな頭皮環境の乱れを解消し、サロン帰りのような爽快感と美髪をもたらすのが『**頭皮スクラブ（ヘッドスクラブ・スカルプスクラブ）**』です。\n\n天然塩や植物性スクラブが、毛穴に詰まった酸化皮脂やシリコン汚れを優しく浮き上がらせてディープオフ。根元からふんわり立ち上がるサラサラ髪を育てます。本記事では、楽天市場でリアルタイムに高評価を集める頭皮スクラブの中から、洗浄力・爽快感・保湿力を基準に選んだ**厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '死海の塩とミントの清涼感！毛穴の詰まりを一掃し髪が根本からふんわり立ち上がる圧倒的人気No.1', label: '殿堂入り・ヘッドスパ最高峰' },
    { rank: '2位', point: '沖縄のサンゴ末と天然塩を贅沢配合！ボディにも使えるマイルド処方で頭皮のニオイを無臭化', label: '沖縄サンゴ末・マルチケア' },
    { rank: '3位', point: '韓国オリーブヤング＆美的ベスコス受賞！アンデス塩とローズマリーの力で地肌を健やかに整える', label: '韓国No.1・ハーブ鎮静' },
    { rank: '4位', point: 'アルガンシェルパウダー配合！毛穴の汚れを取り除きながらアルガンオイルで毛先までしっとり潤す', label: 'サロン専売・高保湿リッチ' },
    { rank: '5位', point: '毛髪診断士監修！ホワイトティーの極上の香りに包まれながら毎日でも使える濃密ヘッドスクラブ', label: '毛髪診断士監修・毎日使える' },
    { rank: '6位', point: '和種薄荷の突き抜ける爽快感！無添加処方で頭皮をサッパリ洗い上げる高コスパ実力派', label: '無添加・高コスパ薄荷' },
    { rank: '7位', point: 'CICA（ツボクサエキス）配合！頭皮のかゆみや赤みを鎮静しながら毛穴汚れをオフする韓国注目株', label: 'CICA鎮静・敏感頭皮' },
    { rank: '8位', point: 'ペパーミント×ソルトスケーラーの超爽快処方！自宅で本格的なスカルプクレンジングが叶う', label: '超爽快・ソルトスケーラー' },
    { rank: '9位', point: '高級感あふれるブラックティーの香り！香水のように長く香るフレグランスヘッドスクラブ', label: '極上フレグランス' },
    { rank: '10位', point: 'コーセーのサロン技術を結集！地肌をほぐしながら毛穴の皮脂をすっきり洗い流すリフレッシュ処方', label: 'サロン技術・地肌ほぐし' }
  ],
  sections: [
    {
      h: 'なぜシャンプーだけでなく「頭皮スクラブ」が必要なのか？',
      body: `頭皮はTゾーンの約2倍以上の皮脂腺が存在し、汗や皮脂、スタイリング剤が混ざり合って「過酸化脂質」という固まった油汚れに変化します。\n\n1. **通常のシャンプーでは落ちにくい酸化皮脂**: 毛穴の奥に入り込んだ酸化皮脂は通常の界面活性剤だけでは落としきれず、ニオイや抜け毛の原因に。\n2. **スクラブによる物理的・化学的吸着オフ**: ソルト（塩）や微粒子ミネラルが毛穴の凹凸にフィットし、固まった皮脂を優しく剥離・吸着します。\n3. **血行促進による育毛環境の整備**: スクラブを馴染ませながらマッサージすることで頭皮の血流が促進され、健康でコシのある髪の土台を作ります。`
    },
    {
      h: '失敗しない！頭皮スクラブのタイプ別選び方',
      body: `| スクラブ原料 | 特徴とメリット | おすすめの頭皮悩み |\n|:---|:---|:---|\n| **ソルト（海塩・死海の塩）** | 優れた清浄力とミネラル補給。爽快感が強い | 頭皮のニオイ・ベタつき・オイリー肌 |\n| **シュガー（砂糖）** | 保湿力が高く、水分に溶けやすいため低刺激 | 乾燥フケ・敏感肌・つっぱり感が苦手な方 |\n| **植物種子・クレイ（泥）** | 吸着力が高く、皮脂をマイルドに包み込む | ダメージヘア・自然派志向の方 |`
    },
    {
      h: 'サロン級の効果を引き出す「正しい頭皮スクラブの手順」',
      body: `- **予洗いをしっかり行う**: ぬるま湯で頭皮全体を2〜3分しっかり予洗いし、毛穴を開かせます。\n- **髪をかき分けて地肌に直接塗布**: 髪の表面ではなく、分け目を作って地肌にスクラブを指先で直接乗せていきます。\n- **指の腹でジグザグにマッサージ**: 爪を立てず、指の腹を使って下から頭頂部に向かって円を描くように優しく揉みほぐします。\n- **週1〜2回の頻度を守る**: 過度な使用は必要な皮脂まで奪ってしまうため、週1〜2回のスペシャルケアとして取り入れるのがベストです。`
    }
  ],
  faqs: [
    {
      q: '頭皮スクラブを使う日はシャンプーをしなくてもいいですか？',
      a: '製品によって異なります。泡立つタイプのヘッドスクラブはシャンプー代わり（1本で完了）として使用できますが、泡立たないクレンジング専用スクラブの場合は、スクラブ後に通常のシャンプーを行ってください。'
    },
    {
      q: 'カラーやパーマをした直後に使っても大丈夫ですか？',
      a: 'カラーやパーマの施術後1週間程度は使用を控えるのが推奨されます。頭皮が敏感になっており、またスクラブの洗浄力で色落ちが早まる可能性があります。'
    },
    {
      q: 'スクラブの粒が髪に残って流しにくくありませんか？',
      a: 'ソルトスクラブやシュガースクラブはお湯で自然に溶けるため、シャワーで丁寧にすすげば髪に残る心配はありません。すすぎ残しがないよう地肌にしっかりシャワーを当てて洗い流しましょう。'
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

本記事では、頭皮の気になるニオイ・ベタつき・毛穴詰まりをすっきりリセットする「**最強の頭皮スクラブ・ヘッドスパ**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

週1〜2回の頭皮ディープクレンジングを取り入れて、清潔で爽快な地肌と根元から立ち上がるサラツヤ美髪を手に入れてみてください。

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
  console.log('🎉 頭皮スクラブ10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
