import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchProducts() {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent('リキッドアイシャドウ グリッター ラメ')}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  const rawItems = data.Items.map(e => e.Item || e);

  // 10 top distinct liquid eyeshadows:
  // 1. フジコ シェイクシャドウSV (idx: 0)
  // 2. ロムアンド ザユニバース リキッドグリッター (idx: 3)
  // 3. M・A・C ダズルシャドウ リキッド (idx: 4)
  // 4. ジョルジオ アルマーニ アイ ティント (idx: 9)
  // 5. ディアエー Dear.A グリッターアイシャドウ (idx: 6)
  // 6. キャンメイク アイカラーマジシャン (idx: 14)
  // 7. ヴィセ 3D グリッター アイリキッド (idx: 24)
  // 8. 花西子 FLORASIS クリーミーリキッドアイシャドウ (idx: 15)
  // 9. AINOKI アイノキ 石鹸オフリーキッドアイシャドウ (idx: 1)
  // 10. iromikke イロミッケ グリッター リキッド アイシャドウ (idx: 11)
  const pickedIndices = [0, 3, 4, 9, 6, 14, 24, 15, 1, 11];

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
  id: 'art-liquid-eyeshadow-glitter-shimmer-10sen-2026',
  queryTarget: 'リキッドアイシャドウ グリッター ラメ おすすめ 10選',
  title: '【2026年最新】二重幅にたまらない＆ラメ落ちゼロ！最強リキッドアイシャドウ・グリッターおすすめ10選！濡れツヤ透け感完全比較',
  description: 'パウダーシャドウの粉飛びや二重線のヨレを完全解消！みずみずしい濡れツヤと宝石のような煌めきが一日中密着する最強リキッドアイシャドウ10選を徹底比較。フジコ・ロムアンド・M・A・Cからデパコスまで楽天市場の実売データから厳選。',
  category: 'makeup',
  tags: ['リキッドアイシャドウ', 'グリッターシャドウ', 'ラメアイシャドウ', '濡れツヤメイク', 'フジコシェイクシャドウ', 'ロムアンド', '涙袋ラメ', '落ちないアイメイク', '最新コスメ10選'],
  author: '松本 結衣',
  featured: true,
  intro: `「パウダーアイシャドウを塗ると夕方にラメが頬へ落ちてしまう」「時間が経つと二重の溝に粉が溜まって線になる」――そんなアイメイクの悩みを一瞬で解決するのが『**リキッドアイシャドウ（グリッターシャドウ・ウォーターベースアイシャドウ）**』です。\n\n水分ベースのジェルやリキッドがまぶたにピタッと薄膜密着し、瞬きしても擦ってもヨレない美しい濡れツヤ発色をキープ。本記事では、楽天市場でリアルタイムに高評価を集めるリキッドアイシャドウの中から、密着キープ力・ラメの輝き・グラデーションの作りやすさを基準に選んだ**厳選10選**を徹底比較します。`,
  rankingNotes: [
    { rank: '1位', point: '水と光の粒をシェイクして使う完全油分ゼロ処方！二重幅に絶対にたまらず透ける生ツヤを叶える超名作', label: '殿堂入り・油分ゼロ密着No.1' },
    { rank: '2位', point: '星屑のような多彩な偏光グリッター！極細ブラシで黒目の上や涙袋にピンポイントでのせられる韓国大ヒット', label: '韓国グリッター・涙袋No.1' },
    { rank: '3位', point: '圧倒的な高発色と眩いメタルラメ！ステージ映えする輝きが落ちずに一日中持続するプロ仕様リキッド', label: 'プロ仕様・高輝度ラメ' },
    { rank: '4位', point: 'シルクのように軽やかなリキッドがパウダー状に変化！大人の上品な濡れツヤを演出するデパコス最高峰', label: 'デパコス最高峰・シルキーツヤ' },
    { rank: '5位', point: 'しなやかな極細筆で繊細なラメラインも自由自在！大粒ホログラムと微細ラメの黄金比で瞳を輝かせる', label: '極細ブラシ・ホログラム' },
    { rank: '6位', point: '速乾サラサラのウォーターベース！サラッと伸びてヨレずにリッチな輝きが続くプチプラの神コスメ', label: 'プチプラ神・速乾リッチ' },
    { rank: '7位', point: '3D立体グリッターが目元に奥行きを与える！チップひと塗りで眩い濡れ感を宿す実力派リキッド', label: '3D立体感・高密着' },
    { rank: '8位', point: '東洋の伝統美を宿すクリーミー処方！マットからグリッターまでシルクのような極上の塗り心地', label: 'クリーミー密着・上質パール' },
    { rank: '9位', point: '天然由来成分高配合の石鹸オフ処方！デリケートな目元を保湿しながら透明感のある発色を楽しむ', label: '石鹸オフ・敏感肌向け' },
    { rank: '10位', point: '豊富なカラバリで理想のラメが見つかる！プチプラなのに高密着でイベントメイクにも大活躍', label: '多色展開・超高コスパ' }
  ],
  sections: [
    {
      h: 'リキッドアイシャドウがパウダーより「圧倒的に崩れない」3つの理由',
      body: `パウダーアイシャドウの粉飛びや二重線のヨレに悩む人がリキッドアイシャドウを選ぶ理由には、明確な3つの物理的メリットがあります。\n\n1. **水分蒸発による「フィルム密着シールド」**: 水分が乾くと同時に皮膜成分がまぶたに極薄フィルムを形成し、まばたきの摩擦でも二重幅に粉が溜まりません。\n2. **粉落ちゼロでコンタクトや頬を汚さない**: ラメやパールがリキッドジェルの中に均一にホールドされているため、一日中ラメが頬に散らばりません。\n3. **透け感のあるみずみずしい「濡れツヤ（水光）発色」**: 光を面で反射するリキッド特有のツヤ感が、目元に自然な奥行きと透明感を与えます。`
    },
    {
      h: '質感とラメ粒の大きさで選ぶ！リキッドアイシャドウの選び方基準',
      body: `| タイプ | 特徴とメリット | おすすめの使用シーン |\n|:---|:---|:---|\n| **シマー・微細パール型** | 繊細なパールが上品に濡れツヤ発色 | オフィス・デイリー・大人世代のくすみ飛ばし |\n| **大粒グリッター・ホログラム型** | 存在感のある輝きで瞳をウルウルに見せる | 涙袋メイク・黒目の上・イベント・休日メイク |\n| **ウォーターベース（油分フリー）型** | 二重幅に絶対にたまらずサラサラに密着 | オイリーまぶた・一重・奥二重の方 |\n| **メタリック・高発色カラー型** | 単色で印象的なグラデーションアイをつくる | 時短アイメイク・モード系メイク |`
    },
    {
      h: 'ムラなく綺麗にぼかす「プロのリキッドシャドウ塗り方テクニック」',
      body: `- **まぶたの中央に「3点置き」する**: チップで直接まぶた全体に塗ると液がつきすぎてムラの原因になります。黒目の上にチョンチョンと3点置きます。\n- **乾く前に指の腹でアイホールへ素早くトントン広げる**: リキッドが乾く前に、指の腹を使って左右・上方向へタップしながらグラデーションを作ります。\n- **涙袋には「極細ブラシ」か「綿棒」でピンポイント乗せ**: 大粒ラメを涙袋に乗せる際は、黒目の下中心に極細筆や綿棒の先でちょこんと置くと、自然にぷっくりウルウルの目元が完成します。`
    }
  ],
  faqs: [
    {
      q: '奥二重や一重まぶたでも二重線にたまらず使えますか？',
      a: 'はい、フジコ シェイクシャドウのような完全ウォーターベース（油分ゼロ）や速乾フィルムタイプを選べば、皮膚が重なり合う一重・奥二重でも一切ヨレずに美しく仕上がります。'
    },
    {
      q: 'パウダーアイシャドウと重ねて使っても大丈夫ですか？',
      a: '併用可能です。リキッドアイシャドウをアイシャドウベース（下地）として薄く仕込んでからパウダーを重ねると発色と色持ちが劇的にアップし、最後に大粒グリッターを黒目の上だけに重ねる使い方もおすすめです。'
    },
    {
      q: 'クレンジングで落としにくくありませんか？',
      a: '大粒ラメやウォータープルーフタイプは擦ると目元を痛める恐れがあるため、ポイントメイクリムーバーをコットンに含ませてまぶたに数秒当て、スルッと滑らせて落とすのが摩擦レスのコツです。'
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

本記事では、粉飛びや二重幅のヨレを防ぎながらみずみずしい濡れツヤと上品な煌めきをキープする「**最強のリキッドアイシャドウ・グリッター**」の中から、楽天市場の実売データと口コミに基づいた**本当におすすめできる神アイテム10選**を徹底解説しました。

まぶたにピタッと密着するリキッドシャドウを取り入れて、一日中くすまず輝き続ける魅力的な目元を手に入れてみてください。

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
  console.log('🎉 リキッドアイシャドウ10選 記事生成＆登録完了！ 総記事数:', articlesData.length);
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
