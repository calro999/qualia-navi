import fs from "fs";

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTo10(targetFile, keywords, minPrice = 800) {
  let existing = [];
  if (fs.existsSync(targetFile)) {
    try {
      existing = JSON.parse(fs.readFileSync(targetFile, "utf8"));
    } catch (e) {
      existing = [];
    }
  }
  const seenCodes = new Set(existing.map(x => x.itemCode));

  for (const kw of keywords) {
    if (existing.length >= 10) break;
    const url = new URL(ENDPOINT);
    url.searchParams.append("applicationId", APP_ID);
    url.searchParams.append("accessKey", ACCESS_KEY);
    url.searchParams.append("affiliateId", AFFILIATE_ID);
    url.searchParams.append("keyword", kw);
    url.searchParams.append("hits", "30");
    url.searchParams.append("minPrice", minPrice.toString());
    url.searchParams.append("imageFlag", "1");
    url.searchParams.append("availability", "1");

    console.log(`Searching for ${targetFile} with: ${kw}...`);
    const res = await fetch(url.toString());
    if (!res.ok) continue;
    const data = await res.json();
    const raw = data.Items || [];

    for (const entry of raw) {
      const item = entry.Item || entry;
      if (!item.itemCode || seenCodes.has(item.itemCode)) continue;
      seenCodes.add(item.itemCode);

      let imageUrl = "";
      if (item.mediumImageUrls && item.mediumImageUrls.length > 0) {
        imageUrl = typeof item.mediumImageUrls[0] === "string" ? item.mediumImageUrls[0] : item.mediumImageUrls[0].imageUrl;
      } else if (item.smallImageUrls && item.smallImageUrls.length > 0) {
        imageUrl = typeof item.smallImageUrls[0] === "string" ? item.smallImageUrls[0] : item.smallImageUrls[0].imageUrl;
      }
      if (imageUrl) imageUrl = imageUrl.replace(/^http:/, "https:");

      existing.push({
        itemCode: item.itemCode,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemUrl: item.affiliateUrl || item.itemUrl,
        imageUrl,
        shopName: item.shopName,
        reviewAverage: item.reviewAverage || 0,
        reviewCount: item.reviewCount || 0
      });
      if (existing.length === 10) break;
    }
    await sleep(1500);
  }

  fs.writeFileSync(targetFile, JSON.stringify(existing, null, 2), "utf8");
  console.log(`Saved ${existing.length} items to ${targetFile}`);
}

async function main() {
  // G1: CICA パンテノール シカクリーム
  await fetchTo10("scratch/rakuten_batch98_g1_verified.json", [
    "CICA クリーム シカ パンテノール 鎮静",
    "シカクリーム 肌荒れ ツボクサエキス",
    "リペア クリーム CICA 敏感肌"
  ], 1200);

  // G2: 目元美顔器 EMS マイクロカレント
  await fetchTo10("scratch/rakuten_batch98_g2_verified.json", [
    "目元美顔器 EMS マイクロカレント クマ",
    "アイケア 美顔器 目元 たるみ",
    "目元 美顔器 温熱 振動"
  ], 2500);

  // G3: 頭皮 クレンジング バーム ホホバ スカルプ
  await fetchTo10("scratch/rakuten_batch98_g3_verified.json", [
    "頭皮 クレンジング バーム スカルプ",
    "頭皮 クレンジング オイル 毛穴 ニオイ",
    "スカルプ クレンジング ジェル 頭皮ケア"
  ], 1500);

  // G4: アイシャドウ テラコッタ マスタード イエベ秋
  await fetchTo10("scratch/rakuten_batch98_g4_verified.json", [
    "アイシャドウ テラコッタ ブラウン イエベ秋",
    "アイシャドウ パレット マスタード イエロー ブラウン",
    "アイシャドウ アンバー テラコッタ"
  ], 800);

  console.log("All Batch 98 items fetched successfully!");
}

main().catch(console.error);
