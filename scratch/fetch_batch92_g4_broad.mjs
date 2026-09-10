import fs from "fs";

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

async function fetchG4() {
  const existingFile = "scratch/rakuten_batch92_g4_verified.json";
  const existing = JSON.parse(fs.readFileSync(existingFile, "utf8"));
  const seenCodes = new Set(existing.map(x => x.itemCode));

  const url = new URL(ENDPOINT);
  url.searchParams.append("applicationId", APP_ID);
  url.searchParams.append("accessKey", ACCESS_KEY);
  url.searchParams.append("affiliateId", AFFILIATE_ID);
  url.searchParams.append("keyword", "アイシャドウ コーラル");
  url.searchParams.append("hits", "30");
  url.searchParams.append("minPrice", "700");
  url.searchParams.append("imageFlag", "1");
  url.searchParams.append("availability", "1");

  const res = await fetch(url.toString());
  if (!res.ok) return;
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
  fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), "utf8");
  console.log(`G4 now has ${existing.length} items`);
}

fetchG4().catch(console.error);
