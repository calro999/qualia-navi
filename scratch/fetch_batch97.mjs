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
  // G1: PHA ピーリング グルコノラクトン 美容液
  await fetchTo10("scratch/rakuten_batch97_g1_verified.json", [
    "PHA ピーリング 美容液 グルコノラクトン",
    "PHA セラム 水光肌",
    "グルコノラクトン 美容液 敏感肌"
  ], 1200);

  // G2: 脱毛器 サファイア 冷却 IPL 光美容器
  await fetchTo10("scratch/rakuten_batch97_g2_verified.json", [
    "脱毛器 サファイア 冷却 IPL 光美容器",
    "家庭用 脱毛器 冷却 VIO",
    "光脱毛器 サファイア クーリング"
  ], 8000);

  // G3: 酸熱 トリートメント ナイト ヘアマスク
  await fetchTo10("scratch/rakuten_batch97_g3_verified.json", [
    "酸熱 トリートメント ナイト ヘアマスク",
    "夜用 ヘアパック ケラチン うねり",
    "スリーピング ヘアパック 髪質改善"
  ], 1500);

  // G4: アイシャドウ プラム ベリー ブルベ冬
  await fetchTo10("scratch/rakuten_batch97_g4_verified.json", [
    "アイシャドウ プラム ベリー ブルベ",
    "アイシャドウ パレット パープル ベリー",
    "アイシャドウ ブルベ冬 プラム"
  ], 800);

  console.log("All Batch 97 items fetched successfully!");
}

main().catch(console.error);
