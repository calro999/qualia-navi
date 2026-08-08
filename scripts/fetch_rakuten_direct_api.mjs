import fs from 'fs';
import path from 'path';

console.log('📡 [Rakuten API Live Direct Link Fetcher] 楽天公式APIから商品個別直リンクURLをリアルタイム取得中...');

const APP_ID = process.env.RAKUTEN_APP_ID || '1014761405021235308';
const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchDirectItemFromRakuten(keyword) {
  try {
    const query = encodeURIComponent(keyword.slice(0, 30));
    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&keyword=${query}&applicationId=${APP_ID}&affiliateId=${AFFILIATE_ID}&hits=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.Items && data.Items.length > 0) {
      const item = data.Items[0].Item;
      return {
        itemUrl: item.itemUrl,
        affiliateUrl: item.affiliateUrl,
        mediumImageUrl: item.mediumImageUrls?.[0]?.imageUrl || item.imageUrl,
        price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : null
      };
    }
  } catch (e) {
    console.warn(`API取得スキップ (${keyword}):`, e.message);
  }
  return null;
}

async function main() {
  let updatedCount = 0;

  for (let i = 0; i < articlesData.length; i++) {
    const art = articlesData[i];
    const keyword = art.productName || art.title;

    // 検索URLまたは直リンクでない場合にAPIから確定個別直リンクを取得
    if (!art.affiliateLink || art.affiliateLink.includes('search.rakuten.co.jp') || !art.affiliateLink.includes('item.rakuten.co.jp')) {
      const apiResult = await fetchDirectItemFromRakuten(keyword);
      if (apiResult && apiResult.affiliateUrl) {
        art.affiliateLink = apiResult.affiliateUrl;
        art.originalUrl = apiResult.affiliateUrl;
        if (apiResult.price) art.rakutenPrice = apiResult.price;
        updatedCount++;
        console.log(`[API直リンク取得 OK] #${i+1} ${keyword.slice(0, 20)} -> ${apiResult.affiliateUrl.slice(0, 50)}...`);
      }
      // レートリミット回避のためのウエイト
      await new Promise(r => setTimeout(r, 250));
    }
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`✅ [Rakuten API Live Direct Link Fetcher] 楽天APIより ${updatedCount} 件の確定個別直リンクURLを取得・更新完了！`);
}

main().catch(console.error);
