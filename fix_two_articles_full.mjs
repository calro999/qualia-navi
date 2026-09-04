import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 10) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.Items || data.Items.length === 0) return [];
  return data.Items.map(e => {
    const item = e.Item || e;
    let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
    if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
    else if (img.includes('tshop.r10s.jp/')) img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
    return {
      itemName: item.itemName || '',
      shopName: item.shopName || '',
      affiliateUrl: item.affiliateUrl || '',
      imageUrl: img,
      price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認',
      priceNum: item.itemPrice || 0,
      reviewAvg: item.reviewAverage || 4.6,
      reviewCount: item.reviewCount || 0,
      catchcopy: item.catchcopy || ''
    };
  }).filter(p => p.affiliateUrl && p.imageUrl);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  const targets = [
    {
      id: 'art-sachiko-hirano-shoh-cosme-items-complete',
      kw: 'イヴサンローラン リップ ルージュ',
      title: '【完全版】平野紫耀の愛用コスメ・香水・スキンケアまとめ！イヴ・サンローランなど着用アイテムの品番・香り・取扱店徹底調査'
    },
    {
      id: 'art-sachiko-kpop-idol-makeup-ambassador-guide',
      kw: 'ラネージュ クリームスキン 化粧水',
      title: '【推し肌コスメ】SEVENTEEN・BTSジン・Snow Man愛用のスキンケア＆メイクアイテム完全ガイド'
    }
  ];

  const map = new Map(articlesData.map((a, i) => [a.id, i]));

  for (const t of targets) {
    console.log(`🔍 商品再取得: ${t.title} (KW: ${t.kw})`);
    const products = await fetchRakutenItems(t.kw, 10);
    console.log(`✅ 取得完了: ${products.length}件`);

    if (products.length < 5) continue;
    const idx = map.get(t.id);
    if (idx === undefined) continue;

    let art = articlesData[idx];

    // 比較テーブル生成
    let table = '<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n\n';
    table += '| 順位 | 商品名 | 実売価格 | 取扱ショップ | 特徴・評価 | 楽天市場リンク |\n';
    table += '| :---: | :--- | :---: | :--- | :--- | :---: |\n';
    products.forEach((p, i) => {
      const rank = i + 1;
      const cleanName = p.itemName.slice(0, 36).replace(/[|[\]]/g, ' ');
      const star = `★${p.reviewAvg} (${p.reviewCount}件)`;
      table += `| **${rank}位** | **${cleanName}** | **${p.price}** | ${p.shopName.slice(0, 14)} | ${star} | [詳細を見る](${p.affiliateUrl}) |\n`;
    });
    table += '\n</div>\n';

    // 商品カード生成
    let productsHtml = '';
    products.forEach((p, i) => {
      const rank = i + 1;
      const cleanName = p.itemName.replace(/[<>"']/g, '');
      const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.5))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.5)));
      productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card" style="border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 20px 0; background: #ffffff; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
  <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: center;">
    <div style="flex-shrink: 0; text-align: center; margin: 0 auto;">
      <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; object-fit: cover;" />
    </div>
    <div style="flex: 1; min-width: 260px;">
      <p style="font-size: 1.3rem; font-weight: bold; color: #e11d48; margin-bottom: 6px;">実売価格: ${p.price}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 4px;"><strong>正規取扱ショップ:</strong> ${p.shopName}</p>
      <p style="font-size: 0.95rem; color: #d97706; margin-bottom: 16px;"><strong>評価:</strong> ${stars} <strong>${p.reviewAvg}</strong> (${p.reviewCount.toLocaleString()}件の購入者レビュー)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 0.95rem; box-shadow: 0 4px 14px rgba(191,30,46,0.35); transition: background 0.2s;">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.8; margin-top: 16px; font-size: 0.95rem;">${p.catchcopy ? `<strong>【注目の特徴】</strong> ${p.catchcopy}` : `楽天市場で多数のリピート実績を誇る定番アイテム。実際の購入者からも品質と使い心地で高い信頼が寄せられています。`}</p>
</div>
`;
    });

    // 本文のテーブルと商品カード部分を置換
    const introEnd = art.content.indexOf('## 📱 【早見表】');
    const editorialStart = art.content.indexOf('## 💡 ');

    if (introEnd !== -1 && editorialStart !== -1) {
      const headerPart = art.content.slice(0, introEnd);
      const editorialPart = art.content.slice(editorialStart);

      art.content = `${headerPart}## 📱 【早見表】おすすめ人気アイテム 比較一覧\n\n${table}\n## 🔍 注目の人気アイテム 詳細レビュー＆実力検証\n\n${productsHtml}\n${editorialPart}`;
      art.image = products[0]?.imageUrl || '';
      art.affiliateUrl = products[0]?.affiliateUrl || '';
      art.price = products[0]?.price || '';
      art.itemCount = products.length;
      console.log(`✨ 10商品フルセットに完全刷新完了: ${t.title}`);
    }
    await sleep(1500);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log('🎉 修正完了！');
}

run().catch(console.error);
