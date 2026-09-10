import fs from "fs";

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const queries = [
  {
    group: "g1",
    keyword: "レチノール エクソソーム アイクリーム 目元",
    minPrice: 1500,
  },
  {
    group: "g2",
    keyword: "シャワーヘッド ナノバブル マイクロバブル 節水 塩素除去",
    minPrice: 3000,
  },
  {
    group: "g3",
    keyword: "エルカラクトン ヘアミスト ヒートプロテクト アイロン",
    minPrice: 1200,
  },
  {
    group: "g4",
    keyword: "アイシャドウ パレット ボルドー バーガンディ ブルベ冬",
    minPrice: 1000,
  }
];

async function fetchProducts(q) {
  const url = new URL(ENDPOINT);
  url.searchParams.append("applicationId", APP_ID);
  url.searchParams.append("accessKey", ACCESS_KEY);
  url.searchParams.append("affiliateId", AFFILIATE_ID);
  url.searchParams.append("keyword", q.keyword);
  url.searchParams.append("hits", "20");
  url.searchParams.append("minPrice", q.minPrice.toString());
  url.searchParams.append("imageFlag", "1");
  url.searchParams.append("availability", "1");
  url.searchParams.append("sort", "-reviewAverage");

  console.log(`Fetching ${q.group} with keyword: ${q.keyword}...`);
  const res = await fetch(url.toString());
  if (!res.ok) {
    const txt = await res.text();
    console.error(`Error fetching ${q.group}:`, res.status, txt);
    return [];
  }
  const data = await res.json();
  const rawItems = data.Items || [];
  console.log(`Got ${rawItems.length} raw items for ${q.group}`);

  const verified = [];
  const seenCodes = new Set();

  for (const entry of rawItems) {
    const item = entry.Item || entry;
    const itemCode = item.itemCode;
    if (!itemCode || seenCodes.has(itemCode)) continue;
    seenCodes.add(itemCode);

    let imageUrl = "";
    if (item.mediumImageUrls && item.mediumImageUrls.length > 0) {
      imageUrl = typeof item.mediumImageUrls[0] === "string" ? item.mediumImageUrls[0] : item.mediumImageUrls[0].imageUrl;
    } else if (item.smallImageUrls && item.smallImageUrls.length > 0) {
      imageUrl = typeof item.smallImageUrls[0] === "string" ? item.smallImageUrls[0] : item.smallImageUrls[0].imageUrl;
    }
    if (imageUrl) {
      imageUrl = imageUrl.replace(/^http:/, "https:");
    }

    const price = item.itemPrice;
    const affiliateUrl = item.affiliateUrl || item.itemUrl;
    const itemName = item.itemName;
    const shopName = item.shopName;

    verified.push({
      itemCode,
      itemName,
      itemPrice: price,
      itemUrl: affiliateUrl,
      imageUrl,
      shopName,
      reviewAverage: item.reviewAverage || 0,
      reviewCount: item.reviewCount || 0
    });

    if (verified.length === 10) break;
  }

  return verified;
}

async function main() {
  for (const q of queries) {
    const items = await fetchProducts(q);
    fs.writeFileSync(`scratch/rakuten_batch93_${q.group}_verified.json`, JSON.stringify(items, null, 2), "utf8");
    console.log(`Saved ${items.length} items for ${q.group}`);
    await sleep(1500);
  }
  console.log("All queries fetched for Batch 93!");
}

main().catch(console.error);
