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

  if (s.includes("｜")) s = s.split("｜")[0];
  if (s.includes("│")) s = s.split("│")[0];

  s = s.trim().replace(/\s+/g, " ");
  const tokens = s.split(" ");
  let keepTokens = [];
  let foundCapacity = false;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    keepTokens.push(t);
    if (/^\d+(\.\d+)?(g|ml|mL|本|枚|個|包|粒|色)$/i.test(t)) {
      foundCapacity = true;
      break;
    }
  }

  if (foundCapacity && keepTokens.length >= 2) {
    s = keepTokens.join(" ");
  } else {
    s = tokens.slice(0, 7).join(" ");
  }

  return s.trim();
}

async function searchRakutenDirect(keyword, usedImageUrls, hits = 15) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&keyword=${encodeURIComponent(keyword)}&hits=${hits}`;
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
                itemPrice: it.itemPrice ? `約 ${it.itemPrice.toLocaleString()} 円（税込）` : null,
                shopName: it.shopName
              };
            }
          }
        }
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

async function fixDuplicateArticles() {
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  const targetArticles = [];
  for (const a of articles) {
    if (!a.content) continue;
    const lines = a.content.split("\n");
    const imgs = [];
    for (const l of lines) {
      const m = l.match(/!\[.*?\]\((https:\/\/thumbnail\.image\.rakuten\.co\.jp\/[^\)]+)\)/);
      if (m) imgs.push(m[1].split("?")[0]);
    }
    if (imgs.length > 0) {
      const unique = new Set(imgs);
      if (imgs.length > unique.size) {
        targetArticles.push(a.id);
      }
    }
  }

  console.log(`🔍 重複画像を含む記事を ${targetArticles.length} 件検出しました。楽天APIから完全重複なしの個別商品を取得します...`);

  for (let aIdx = 0; aIdx < targetArticles.length; aIdx++) {
    const artId = targetArticles[aIdx];
    const art = articles.find(a => a.id === artId);
    if (!art) continue;

    console.log(`\n--------------------------------------------------`);
    console.log(`[${aIdx + 1}/${targetArticles.length}] 重複解消中: ${art.id} (${art.title.slice(0, 30)}...)`);

    const lines = art.content.split('\n');
    const items = [];
    let curItem = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^###\s*(?:第(\d+)位：|【第(\d+)位】)(.*)$/);
      if (match) {
        if (curItem) items.push(curItem);
        const rank = parseInt(match[1] || match[2]);
        const titleText = (match[3] !== undefined ? match[3] : match[2] || "").trim();
        curItem = { rank, rawHeading: line, rawTitle: titleText, lines: [] };
      } else if (curItem) {
        if (line.startsWith('## ')) {
          items.push(curItem);
          curItem = null;
        } else {
          curItem.lines.push(line);
        }
      }
    }
    if (curItem) items.push(curItem);

    const usedImagesInArticle = new Set();
    let updatedContent = art.content;

    for (const item of items) {
      const imgLine = item.lines.find(l => l.includes('thumbnail.image.rakuten.co.jp'));
      let existingImg = null;
      if (imgLine) {
        const m = imgLine.match(/!\[.*?\]\((https:\/\/thumbnail\.image\.rakuten\.co\.jp\/[^\)]+)\)/);
        if (m) existingImg = m[1];
      }

      const existingBase = existingImg ? existingImg.split("?")[0] : null;

      if (!existingImg || (existingBase && usedImagesInArticle.has(existingBase))) {
        console.log(`  ⚠️ 第${item.rank}位 "${item.rawTitle.slice(0, 25)}" に重複画像または画像欠損あり。楽天APIから別商品を再検索...`);

        let q = cleanProductName(item.rawTitle);
        let fresh = await searchRakutenDirect(q, usedImagesInArticle, 15);
        if (!fresh) {
          const shortQ = q.split(' ').slice(0, 2).join(' ');
          fresh = await searchRakutenDirect(shortQ, usedImagesInArticle, 15);
        }
        if (!fresh) {
          const broadQ = art.title.replace(/【.*?】/g, '').split(' ')[0] || "コスメ";
          fresh = await searchRakutenDirect(broadQ, usedImagesInArticle, 20);
        }

        if (fresh && fresh.imageUrl) {
          const cleanFreshName = cleanProductName(fresh.itemName);
          const newImgBase = fresh.imageUrl.split("?")[0];
          usedImagesInArticle.add(newImgBase);

          console.log(`    ✅ 新商品画像を取得: ${cleanFreshName.slice(0, 25)} -> ${fresh.imageUrl.slice(0, 60)}...`);

          const newHeading = `### 第${item.rank}位：${cleanFreshName}`;
          if (imgLine) {
            updatedContent = updatedContent.replace(item.rawHeading, newHeading);
            updatedContent = updatedContent.replace(imgLine, `![${cleanFreshName}](${fresh.imageUrl})`);
          } else {
            updatedContent = updatedContent.replace(item.rawHeading, `${newHeading}\n\n![${cleanFreshName}](${fresh.imageUrl})`);
          }
        }
      } else {
        usedImagesInArticle.add(existingBase);
        console.log(`  ✔️ 第${item.rank}位: 画像ユニーク確認OK (${existingBase.slice(0, 50)}...)`);
      }

      await new Promise(r => setTimeout(r, 600));
    }

    art.content = updatedContent;
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log('\n🎉 全記事の重複商品・重複画像解消が完了しました！');
}

fixDuplicateArticles().catch(console.error);
