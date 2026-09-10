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

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const AFFILIATE_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";

async function fetchRakutenImage(keyword) {
  const cleanKeyword = keyword
    .replace(/[【】！!＆&・／/★☆+＋]/g, " ")
    .replace(/おすすめ\d+選.*$/, "")
    .replace(/おすすめ.*$/, "")
    .replace(/徹底比較.*$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 30);
  
  const encoded = encodeURIComponent(cleanKeyword);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encoded}&hits=5&imageFlag=1&sort=%2BreviewCount`;
  
  try {
    const data = await fetchWithRetry(url);
    if (data.Items && data.Items.length > 0) {
      for (const wrap of data.Items) {
        const item = wrap.Item || wrap;
        const img = (item.mediumImageUrls && item.mediumImageUrls[0]) || (item.smallImageUrls && item.smallImageUrls[0]) || "";
        const highResImg = typeof img === "object" ? (img.imageUrl || "") : String(img);
        if (highResImg) {
          return highResImg.replace("?_ex=128x128", "?_ex=500x500");
        }
      }
    }
  } catch (err) {
    console.warn(`Error fetching for "${cleanKeyword}":`, err.message);
  }
  return null;
}

async function main() {
  const raw = fs.readFileSync("src/data/articles.json", "utf-8");
  const data = JSON.parse(raw);
  let list = Array.isArray(data) ? data : data.articles;

  console.log("Total articles initially:", list.length);

  // 1. Remove truly broken/empty articles (length < 1000)
  const initialCount = list.length;
  list = list.filter(a => a.content && a.content.length >= 1000);
  console.log(`Removed ${initialCount - list.length} empty/broken articles. Remaining: ${list.length}`);

  // 2. Normalize and ensure `id` and `slug` are aligned
  for (const a of list) {
    if (!a.id && a.slug) a.id = a.slug;
    if (!a.slug && a.id) a.slug = a.id;
  }

  // 3. Extract missing images from content markdown
  let extractedFromContent = 0;
  for (const a of list) {
    if (!a.imageUrl && !a.image && a.content) {
      const match = a.content.match(/!\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/);
      if (match) {
        a.imageUrl = match[2];
        a.image = match[2];
        extractedFromContent++;
      }
    }
  }
  console.log(`Extracted ${extractedFromContent} images directly from article content markdown.`);

  // 4. For remaining items without images, fetch real Rakuten product images directly from Rakuten API
  const stillMissing = list.filter(a => !a.imageUrl && !a.image);
  console.log(`Found ${stillMissing.length} articles still needing Rakuten API image fetch.`);

  let apiSuccess = 0;
  for (let i = 0; i < stillMissing.length; i++) {
    const art = stillMissing[i];
    const kw = art.keywords && art.keywords.length > 0 ? art.keywords[0] : art.title;
    console.log(`[${i + 1}/${stillMissing.length}] Querying Rakuten API for: "${kw}"...`);
    const imgUrl = await fetchRakutenImage(kw);
    if (imgUrl) {
      art.imageUrl = imgUrl;
      art.image = imgUrl;
      apiSuccess++;
    } else {
      // Fallback to high quality generic cosmetics image if completely unreturned
      art.imageUrl = "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/841/4901872465841.jpg?_ex=500x500";
      art.image = art.imageUrl;
    }
    await sleep(600);
  }
  console.log(`Fetched ${apiSuccess} live images from Rakuten API.`);

  // 5. Save back to articles.json
  if (Array.isArray(data)) {
    fs.writeFileSync("src/data/articles.json", JSON.stringify(list, null, 2));
  } else {
    data.articles = list;
    fs.writeFileSync("src/data/articles.json", JSON.stringify(data, null, 2));
  }

  // 6. Resync all.txt
  const allTxt = list.map(a => a.slug || a.id).filter(Boolean).join("\n") + "\n";
  fs.writeFileSync("all.txt", allTxt);
  console.log(`Saved clean articles.json & all.txt! Total: ${list.length} high-quality articles.`);
}

main();
