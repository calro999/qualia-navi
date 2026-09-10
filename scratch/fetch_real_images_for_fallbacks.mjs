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

function cleanKeyword(text) {
  return text
    .replace(/[【】！!＆&・／/★☆+＋「」『』()（）]/g, " ")
    .replace(/おすすめ\d+選.*$/, "")
    .replace(/おすすめ.*$/, "")
    .replace(/徹底比較.*$/, "")
    .replace(/10選.*$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20);
}

async function fetchRakutenProductImage(keyword) {
  const kw = cleanKeyword(keyword);
  if (!kw) return null;
  const encoded = encodeURIComponent(kw);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encoded}&hits=3&imageFlag=1&sort=%2BreviewCount`;
  
  try {
    const data = await fetchWithRetry(url);
    if (data.Items && data.Items.length > 0) {
      for (const wrap of data.Items) {
        const item = wrap.Item || wrap;
        const img = (item.mediumImageUrls && item.mediumImageUrls[0]) || (item.smallImageUrls && item.smallImageUrls[0]) || "";
        const highResImg = typeof img === "object" ? (img.imageUrl || "") : String(img);
        if (highResImg && highResImg.startsWith("http")) {
          return highResImg.replace("?_ex=128x128", "?_ex=500x500");
        }
      }
    }
  } catch (err) {
    // ignore
  }
  return null;
}

async function main() {
  const raw = fs.readFileSync("src/data/articles.json", "utf-8");
  const data = JSON.parse(raw);
  let list = Array.isArray(data) ? data : data.articles;

  // 1. Fill missing descriptions
  let fixedDesc = 0;
  for (const a of list) {
    if (!a.description && !a.introText && a.content) {
      const plain = a.content
        .replace(/^#.*$/gm, "")
        .replace(/^>.*$/gm, "")
        .replace(/\*\*/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\n+/g, " ")
        .trim();
      a.description = plain.slice(0, 140) + "...";
      a.introText = a.description;
      fixedDesc++;
    }
  }
  console.log(`Filled ${fixedDesc} missing descriptions.`);

  // 2. Query Rakuten API with simplified queries for articles having dummy fallback images
  const fallbackTarget = "rakuten24/cabinet/841/4901872465841.jpg";
  const dummyArticles = list.filter(a => (a.imageUrl || "").includes(fallbackTarget));
  console.log(`Found ${dummyArticles.length} articles with temporary fallback images. Replacing with verified Rakuten items...`);

  let replacedCount = 0;
  for (let i = 0; i < dummyArticles.length; i++) {
    const art = dummyArticles[i];
    let query = art.category || "コスメ";
    if (art.title.includes("ブルベ")) query = "ブルベ アイシャドウ";
    else if (art.title.includes("イエベ")) query = "イエベ アイシャドウ";
    else if (art.title.includes("ヘアミルク")) query = "ヘアミルク";
    else if (art.title.includes("ヘアミスト")) query = "ヘアミスト";
    else if (art.title.includes("クレンジング")) query = "クレンジングバーム";
    else if (art.title.includes("スカルプ")) query = "スカルプ 美容液";
    else if (art.title.includes("アイクリーム")) query = "アイクリーム レチノール";
    else if (art.title.includes("美容液")) query = "美容液 エイジングケア";
    else if (art.title.includes("ハンドクリーム")) query = "ハンドクリーム";
    else if (art.title.includes("入浴剤")) query = "入浴剤 炭酸";
    else if (art.title.includes("洗顔")) query = "洗顔 泡 洗顔フォーム";
    else if (art.title.includes("チーク")) query = "チーク リキッド";
    else if (art.title.includes("マスカラ")) query = "マスカラ下地";
    else if (art.title.includes("リップ")) query = "リップ スリーピングマスク";
    else if (art.title.includes("パウダー")) query = "プレストパウダー フェイスパウダー";
    else if (art.title.includes("美顔器")) query = "美顔器 EMS";
    else if (art.title.includes("シャワー")) query = "シャワーヘッド 塩素除去";
    else query = cleanKeyword(art.title);

    const img = await fetchRakutenProductImage(query);
    if (img) {
      art.imageUrl = img;
      art.image = img;
      replacedCount++;
    }
    await sleep(400);
  }
  console.log(`Successfully replaced ${replacedCount} dummy images with real verified Rakuten product images.`);

  if (Array.isArray(data)) {
    fs.writeFileSync("src/data/articles.json", JSON.stringify(list, null, 2));
  } else {
    data.articles = list;
    fs.writeFileSync("src/data/articles.json", JSON.stringify(data, null, 2));
  }
  console.log("Database saved!");
}

main();
