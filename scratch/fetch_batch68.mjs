import fs from 'fs';

const RAKUTEN_APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const RAKUTEN_ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const RAKUTEN_AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const API_ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

const queries = [
  { group: 1, keyword: "ネッククリーム レチノール 首元 デコルテ" },
  { group: 2, keyword: "毛穴吸引器 ウォーターピーリング 超音波" },
  { group: 3, keyword: "ヘマチン ケラチン ヘアオイル トリートメント" },
  { group: 4, keyword: "コーラルピンク リップ チーク イエベ春" }
];

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

  console.log(`Searching for: ${keyword}`);
  const res = await fetch(url.toString());
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API Error ${res.status}: ${txt}`);
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
    const rawItems = await searchRakuten(q.keyword);
    console.log(`Group ${q.group} (${q.keyword}): Got ${rawItems.length} items`);
    
    const valid = [];
    const seenTitles = new Set();

    for (const itemWrapper of rawItems) {
      const it = itemWrapper.Item || itemWrapper;
      const title = (it.itemName || "").trim();
      const rawImg = it.mediumImageUrls?.[0]?.imageUrl || it.smallImageUrls?.[0]?.imageUrl || "";
      const img = cleanImageUrl(rawImg);
      const price = it.itemPrice;
      const url = it.affiliateUrl || it.itemUrl;
      const shopName = it.shopName || "";

      if (!title || !img || !price || !url) continue;
      const shortTitle = title.slice(0, 35);
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

    console.log(`Group ${q.group} verified items: ${valid.length}`);
    fs.writeFileSync(`scratch/rakuten_batch68_g${q.group}_verified.json`, JSON.stringify(valid, null, 2));
  }
  console.log("All groups fetched successfully!");
}

run().catch(console.error);
