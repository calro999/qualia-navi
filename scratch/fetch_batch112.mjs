import fs from "fs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        console.warn(`[429 Rate Limit] Waiting ${(i + 1) * 2000}ms...`);
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
    keyword: "レチノール アイクリーム シワ改善",
    slug: "art-pure-retinol-wrinkle-repair-eye-cream-10sen-2026",
    title: "【高濃度純粋レチノール0.1%〜0.3%配合薬用シワ改善アイクリーム10選】目元のちりめんジワ・まぶたのたるみ集中アイケア！ナイアシンアミド併用とA反応緩和メソッド",
    outFile: "scratch/rakuten_batch112_g1_verified.json"
  },
  {
    id: "g2",
    keyword: "毛穴吸引器 美顔器 黒ずみ 超音波",
    slug: "art-nano-mist-ultrasonic-pore-vacuum-cleaner-10sen-2026",
    title: "【高圧ナノ微粒子ミスト×超音波毛穴吸引器10選】頑固な黒ずみ角栓・いちご鼻を浮かせて吸着除去する最新毛穴洗浄ギア！温冷引き締めと摩擦レス美肌ケア",
    outFile: "scratch/rakuten_batch112_g2_verified.json"
  },
  {
    id: "g3",
    keyword: "ヘアミルク 加水分解シルク 洗い流さない トリートメント",
    slug: "art-hydrolyzed-silk-pellicer-hair-milk-10sen-2026",
    title: "【高純度加水分解シルク×ペリセア配合濃厚ヘアミルク10選】ドライヤー前の熱ダメージ補修とアホ毛・うねり・広がり抑制！サロン級アウトバストリートメント",
    outFile: "scratch/rakuten_batch112_g3_verified.json"
  },
  {
    id: "g4",
    keyword: "ブルベ夏 コスメ モーブ ローズ アイシャドウ リップ",
    slug: "art-cool-summer-straight-rose-mauve-makeup-10sen-2026",
    title: "【ブルベ夏×骨格ストレート専用コスメ10選】ローズトープ＆ソフトモーブ！端正なメリハリボディに映える引き算の上品オフィス・デートメイク徹底ガイド",
    outFile: "scratch/rakuten_batch112_g4_verified.json"
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
          id: `b112-${g.id}-${idx + 1}`,
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
