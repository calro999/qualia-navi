import fs from 'fs';

const RAKUTEN_APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const RAKUTEN_ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const RAKUTEN_AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const API_ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

// 検索ボリューム特大・高コンバージョン・超切実ロングテール
const groups = [
  { 
    group: 1, 
    keywords: ["アゼライン酸 美容液", "アゼライン酸 クリーム", "ティーツリー 美容液 皮脂", "アゼライン酸 毛穴"] 
  },
  { 
    group: 2, 
    keywords: ["シンエイク 美容液", "アルジレリン アイクリーム", "塗るボトックス 原液", "リンクルセラム 目元 口元"] 
  },
  { 
    group: 3, 
    keywords: ["炭酸シャンプー 頭皮", "炭酸 スカルプ クレンジング", "頭皮 臭い シャンプー サリチル酸", "炭酸 ヘッドスパ シャンプー"] 
  },
  { 
    group: 4, 
    keywords: ["テラコッタ リップ", "イエベ秋 アイシャドウ ブラウン", "イエベ秋 リップ マット", "テラコッタ チーク"] 
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchRakuten(keyword) {
  const url = new URL(API_ENDPOINT);
  url.searchParams.set("applicationId", RAKUTEN_APP_ID);
  url.searchParams.set("accessKey", RAKUTEN_ACCESS_KEY);
  url.searchParams.set("affiliateId", RAKUTEN_AFFILIATE_ID);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("hits", "30");
  url.searchParams.set("imageFlag", "1");
  url.searchParams.set("availability", "1");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());
  if (!res.ok) {
    const txt = await res.text();
    console.error(`Error for ${keyword}: ${res.status} ${txt}`);
    return [];
  }
  const data = await res.json();
  return data.Items || [];
}

function cleanImageUrl(rawUrl) {
  if (!rawUrl) return "";
  let clean = rawUrl.replace(/^https?:\/\/thumbnail\.image\.rakuten\.co\.jp\/@0_mall\//, "https://shop.r10s.jp/");
  clean = clean.split("?")[0];
  return clean;
}

async function run() {
  for (const g of groups) {
    const valid = [];
    const seenTitles = new Set();

    for (const kw of g.keywords) {
      if (valid.length >= 10) break;
      await sleep(1500);
      console.log(`Batch 70 Group ${g.group}: Searching "${kw}"...`);
      const items = await searchRakuten(kw);
      for (const itemWrapper of items) {
        const it = itemWrapper.Item || itemWrapper;
        const title = (it.itemName || "").trim();
        const rawImg = it.mediumImageUrls?.[0]?.imageUrl || it.smallImageUrls?.[0]?.imageUrl || "";
        const img = cleanImageUrl(rawImg);
        const price = it.itemPrice;
        const url = it.affiliateUrl || it.itemUrl;
        const shopName = it.shopName || "";

        if (!title || !img || !price || !url) continue;
        const shortTitle = title.slice(0, 30);
        if (seenTitles.has(shortTitle)) continue;
        seenTitles.add(shortTitle);

        valid.push({
          name: title,
          price: Number(price),
          image: img,
          url: url,
          shopName: shopName
        });

        if (valid.length >= 10) break;
      }
    }

    console.log(`>>> Batch 70 Group ${g.group} verified: ${valid.length}`);
    fs.writeFileSync(`scratch/rakuten_batch70_g${g.group}_verified.json`, JSON.stringify(valid, null, 2));
  }
  console.log("Finished fetching all 4 groups for Batch 70!");
}

run().catch(console.error);
