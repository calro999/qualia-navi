import fs from 'fs';
import path from 'path';

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";

function cleanProductName(name) {
  if (!name) return "";
  let s = name;
  s = s.replace(/【[^】]*】/g, " ");
  s = s.replace(/\[[^\]]*\]/g, " ");
  s = s.replace(/★[^★]*★/g, " ");
  s = s.replace(/★/g, " ");
  s = s.replace(/☆[^☆]*☆/g, " ");
  s = s.replace(/☆/g, " ");
  s = s.replace(/＼[^＼]*／/g, " ");
  s = s.replace(/※[^※\n]*$/g, " ");
  s = s.replace(/^[！!・\s]+/, " ");
  s = s.replace(/スーパーSALE！?/gi, " ");
  s = s.replace(/スーパーセール！?/gi, " ");
  s = s.replace(/お買い物マラソン！?/gi, " ");
  s = s.replace(/送料無料/g, " ");
  s = s.replace(/即納/g, " ");
  s = s.replace(/あす楽/g, " ");
  s = s.replace(/国内正規品/g, " ");
  s = s.replace(/公式ショップ/g, " ");
  s = s.replace(/公式/g, " ");
  s = s.replace(/ランキング\d+位獲得/g, " ");
  s = s.replace(/男女兼用/g, " ");
  s = s.replace(/\d+個セット/g, " ");
  s = s.replace(/\d+点(セット|セット品)?/g, " ");

  if (s.includes("｜")) s = s.split("｜")[0];
  if (s.includes("│")) s = s.split("│")[0];

  s = s.trim().replace(/\s+/g, " ");
  const tokens = s.split(" ");
  return tokens.slice(0, 6).join(" ");
}

async function searchUniqueRakutenItem(keyword, usedImageUrls) {
  try {
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&keyword=${encodeURIComponent(keyword)}&hits=20`;
    const res = await fetch(url);
    if (res.ok) {
      const d = await res.json();
      if (d.Items && d.Items.length > 0) {
        for (const itemObj of d.Items) {
          const it = itemObj.Item;
          let img = it.mediumImageUrls?.[0]?.imageUrl || it.smallImageUrls?.[0]?.imageUrl || "";
          if (img.includes("?_ex=")) {
            img = img.split("?_ex=")[0] + "?_ex=600x600";
          }
          const cleanImgBase = img.split("?")[0];
          if (img && !usedImageUrls.has(cleanImgBase)) {
            return {
              itemName: it.itemName,
              imageUrl: img,
              affiliateUrl: it.affiliateUrl || it.itemUrl,
              itemPrice: it.itemPrice ? `約 ${it.itemPrice.toLocaleString()} 円（税込）` : "オープン価格",
              shopName: it.shopName
            };
          }
        }
      }
    }
  } catch (e) {}
  return null;
}

const remainingIds = [
  'art-ultrasonic-thermal-cold-skin-scrubber-10sen-2026',
  'art-ultrasonic-water-peeling-pore-cleansing-10sen-2026',
  'art-solid-perfume-stick-and-sashihara-romand-guide',
  'art-nano-bubble-facial-steamer-device-10sen-2026',
  'art-spring-warm-wave-peach-coral-makeup-10sen-2026',
  'art-electroporation-ion-facial-device-10sen-2026'
];

async function fix6() {
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  for (const artId of remainingIds) {
    const art = articles.find(a => a.id === artId);
    if (!art) continue;

    console.log(`Fixing duplicates in ${art.id}...`);
    const lines = art.content.split('\n');
    const used = new Set();
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = line.match(/!\[.*?\]\((https:\/\/thumbnail\.image\.rakuten\.co\.jp\/[^\)]+)\)/);
      if (m) {
        const fullImg = m[1];
        const base = fullImg.split('?')[0];
        if (used.has(base)) {
          // This image is duplicate! Replace with unique from Rakuten API
          console.log(`  Found duplicate image: ${base.slice(0, 50)}... Searching replacement`);
          const replacement = await searchUniqueRakutenItem(art.category || "コスメ", used);
          if (replacement) {
            const cleanName = cleanProductName(replacement.itemName);
            used.add(replacement.imageUrl.split('?')[0]);
            newLines.push(`![${cleanName}](${replacement.imageUrl})`);
            console.log(`  -> Replaced with: ${cleanName.slice(0, 30)}`);
          } else {
            newLines.push(line);
          }
        } else {
          used.add(base);
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    }

    art.content = newLines.join('\n');
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log("Finished fixing remaining 6 articles!");
}

fix6().catch(console.error);
