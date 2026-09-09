import fs from 'fs';

const RAKUTEN_APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const RAKUTEN_ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const RAKUTEN_AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";
const API_ENDPOINT = "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401";

// 検索ボリューム大・ロングテール直結キーワード
const groups = [
  { 
    group: 1, 
    keywords: ["ピーリングパッド", "トナーパッド 角質 毛穴", "AHA BHA パッド", "サリチル酸 パッド"] 
  },
  { 
    group: 2, 
    keywords: ["マイクロニードル 目元 パッチ", "ヒアルロン酸 パッチ 針", "目元 パッチ たるみ クマ", "マイクロニードルパッチ"] 
  },
  { 
    group: 3, 
    keywords: ["白髪染め トリートメント ジアミンフリー", "カラートリートメント 白髪 頭皮に優しい", "ヘナ 白髪染め トリートメント"] 
  },
  { 
    group: 4, 
    keywords: ["コーラル リップ イエベ", "アップルレッド リップ", "イエベ春 リップ コーラル", "リップスティック コーラルレッド"] 
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
  url.searchParams.set("genreId", "100938"); // コスメ・香水・美容
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
      console.log(`Batch 72 Group ${g.group}: Searching "${kw}"...`);
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

    console.log(`>>> Batch 72 Group ${g.group} verified: ${valid.length}`);
    fs.writeFileSync(`scratch/rakuten_batch72_g${g.group}_verified.json`, JSON.stringify(valid, null, 2));
  }
  console.log("Finished fetching all 4 groups for Batch 72!");
}

run().catch(console.error);
