import fs from "fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        await sleep((i + 1) * 2000);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1500);
    }
  }
}

const groups = [
  {
    id: "g1",
    keyword: "舌ブラシ タンクリーナー 口臭 舌磨き",
    slug: "art-tongue-cleaner-brush-gel-oral-care-10sen-2026",
    outFile: "scratch/rakuten_batch120_g1_verified.json"
  },
  {
    id: "g2",
    keyword: "レディースシェーバー フェイスシェーバー 鼻毛 眉毛",
    slug: "art-ladies-electric-face-and-nose-trimmer-10sen-2026",
    outFile: "scratch/rakuten_batch120_g2_verified.json"
  },
  {
    id: "g3",
    keyword: "手汗 制汗剤 ジェル 手掌多汗症 制汗",
    slug: "art-hand-sweat-antiperspirant-gel-cream-10sen-2026",
    outFile: "scratch/rakuten_batch120_g3_verified.json"
  },
  {
    id: "g4",
    keyword: "卵殻膜 美容液 原液 ハリ 弾力 コラーゲン",
    slug: "art-hydrolyzed-egg-shell-membrane-serum-10sen-2026",
    outFile: "scratch/rakuten_batch120_g4_verified.json"
  }
];

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";

async function main() {
  for (const g of groups) {
    console.log(`Fetching items for: ${g.keyword}...`);
    const encoded = encodeURIComponent(g.keyword);
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encoded}&hits=15&imageFlag=1&sort=%2BreviewCount`;
    
    try {
      const data = await fetchWithRetry(url);
      const items = (data.Items || []).map((wrap, idx) => {
        const item = wrap.Item || wrap;
        const img = (item.mediumImageUrls && item.mediumImageUrls[0]) || (item.smallImageUrls && item.smallImageUrls[0]) || "";
        const highResImg = typeof img === "object" ? (img.imageUrl || "") : String(img);
        return {
          id: `b120-${g.id}-${idx + 1}`,
          name: item.itemName,
          brand: item.shopName || "公式ショップ",
          price: item.itemPrice ? `¥${Number(item.itemPrice).toLocaleString()}` : "オープン価格",
          rating: Number(item.reviewAverage || 4.5),
          features: [item.catchcopy ? item.catchcopy.slice(0, 35) : "高評価人気アイテム", "正規取扱店", "即納対応"],
          affiliateUrl: item.affiliateUrl || item.itemUrl,
          imageUrl: highResImg.replace("?_ex=128x128", "?_ex=500x500")
        };
      }).filter(it => it.imageUrl).slice(0, 10);

      fs.writeFileSync(g.outFile, JSON.stringify(items, null, 2));
      console.log(`Saved ${items.length} items to ${g.outFile}`);
    } catch (err) {
      console.error(`Error fetching ${g.keyword}:`, err.message);
    }
    await sleep(1500);
  }
}

main();
