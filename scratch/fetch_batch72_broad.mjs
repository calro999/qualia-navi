import fs from 'fs';

const RAKUTEN_APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const RAKUTEN_ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const RAKUTEN_AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const API_ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

const queries = [
  { group: 1, keywords: ["トナーパッド", "拭き取り パッド", "角質 パッド", "毛穴 パッド"] },
  { group: 3, keywords: ["白髪染め トリートメント", "カラー トリートメント 白髪", "白髪染め ヘナ", "ヘアカラー トリートメント"] },
  { group: 4, keywords: ["リップ コーラル", "口紅 コーラル", "リップティント コーラル", "コーラルピンク 口紅"] }
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
    console.error(`Error: ${txt}`);
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
  for (const q of queries) {
    const valid = [];
    const seenTitles = new Set();

    for (const kw of q.keywords) {
      if (valid.length >= 10) break;
      await sleep(1500);
      console.log(`Group ${q.group}: Searching "${kw}"...`);
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

    console.log(`>>> Group ${q.group} verified: ${valid.length}`);
    fs.writeFileSync(`scratch/rakuten_batch72_g${q.group}_verified.json`, JSON.stringify(valid, null, 2));
  }
}

run().catch(console.error);
