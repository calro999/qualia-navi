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
  s = s.replace(/^(?:レチノール\s+クリーム\s+純\s+ハイドロキノン\s+5%\s+)/, "");
  s = s.replace(/^(?:針スピキュール\d+本配合\s+エクソソーム\s+クリーム\s+)/, "");

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

async function fetchRakutenWithRetry(keyword, shopCode) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&keyword=${encodeURIComponent(keyword)}&hits=1`;
      if (shopCode) {
        url += `&shopCode=${shopCode}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.Items && data.Items.length > 0) {
          const it = data.Items[0].Item;
          let img = it.mediumImageUrls?.[0]?.imageUrl || it.smallImageUrls?.[0]?.imageUrl || "";
          if (img.includes("?_ex=")) {
            img = img.split("?_ex=")[0] + "?_ex=600x600";
          }
          return {
            itemName: it.itemName,
            imageUrl: img,
            affiliateUrl: it.affiliateUrl || it.itemUrl
          };
        }
      }
    } catch (e) {
      // retry
    }
    await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

async function processAllRemainingArticles() {
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  const targetIds = [
    'art-cool-winter-cool-icy-silver-makeup-10sen-2026',
    'art-peptide-panthenol-female-scalp-essence-10sen-2026',
    'art-ultrasonic-thermal-cold-skin-scrubber-10sen-2026',
    'art-warm-autumn-elegant-terracotta-makeup-10sen-2026',
    'art-ceramide-silk-body-milk-dry-skin-10sen-2026',
    'art-ultrasonic-ems-scalp-electric-brush-10sen-2026',
    'art-high-purity-azelaic-acid-20-sebum-acne-10sen-2026',
    'art-cool-summer-fresh-icy-blue-makeup-10sen-2026',
    'art-natural-henna-indigo-gray-hair-dye-10sen-2026',
    'art-ultrasonic-cavitation-ems-slimming-10sen-2026',
    'art-tranexamic-niacinamide-whitening-emulsion-10sen-2026',
    'art-warm-autumn-straight-bronze-terracotta-makeup-10sen-2026',
    'art-peptide-stem-cell-eyelash-serum-10sen-2026',
    'art-rf-ems-neck-lift-double-chin-10sen-2026',
    'art-high-purity-cbd-cica-calming-balm-10sen-2026',
    'art-cool-winter-wave-plum-berry-makeup-10sen-2026',
    'art-hematin-color-keep-anti-gray-shampoo-10sen-2026',
    'art-ultrasonic-water-peeling-pore-cleansing-10sen-2026',
    'art-liposome-glutathione-whitening-serum-10sen-2026',
    'art-warm-spring-active-cute-poppy-red-makeup-10sen-2026',
    'art-silk-night-cap-pillowcase-hair-care-10sen-2026',
    'art-ultrasonic-thermal-eye-massager-fatigue-10sen-2026',
    'art-pdrn-salmon-ampoule-pore-wrinkle-repair-10sen-2026',
    'art-cool-summer-natural-smoky-lavender-makeup-10sen-2026',
    'art-keratin-acid-heat-treatment-hair-repair-10sen-2026',
    'art-ultrasonic-nano-mist-steamer-dry-skin-10sen-2026',
    'art-bakuchiol-eye-cream-sensitive-wrinkle-10sen-2026',
    'art-warm-autumn-cute-apricot-terracotta-makeup-10sen-2026',
    'art-carbonated-scalp-cleansing-sebum-odor-10sen-2026',
    'art-retinol-neck-patch-microneedle-lift-10sen-2026',
    'art-high-concentration-ceramide-balm-barrier-repair-10sen-2026'
  ];

  console.log(`🚀 開始: 残り ${targetIds.length} 記事の全商品画像を楽天APIから直接取得します...`);

  for (let aIdx = 0; aIdx < targetIds.length; aIdx++) {
    const artId = targetIds[aIdx];
    const art = articles.find(a => a.id === artId);
    if (!art || !art.content) continue;

    console.log(`\n--------------------------------------------------`);
    console.log(`[${aIdx + 1}/${targetIds.length}] 記事処理中: ${art.title.slice(0, 40)}...`);

    const lines = art.content.split('\n');
    const items = [];
    let curItem = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^### 第(\d+)位：(.*)$/);
      if (match) {
        if (curItem) items.push(curItem);
        curItem = { rank: parseInt(match[1]), rawTitle: match[2].trim(), lines: [] };
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

    console.log(`  見つかった商品数: ${items.length}件`);

    let updatedContent = art.content;
    let firstItemImg = null;

    for (const it of items) {
      const cleaned = cleanProductName(it.rawTitle);
      const searchKw = cleaned.split(' ').slice(0, 3).join(' ');
      
      let fetched = await fetchRakutenWithRetry(searchKw);
      if (!fetched) {
        const shortKw = cleaned.split(' ').slice(0, 2).join(' ');
        fetched = await fetchRakutenWithRetry(shortKw);
      }

      const imgUrl = fetched?.imageUrl;
      if (imgUrl && !firstItemImg) {
        firstItemImg = imgUrl;
      }

      console.log(`  [第${it.rank}位] ${cleaned.slice(0, 30)}... => ${imgUrl ? '画像取得成功' : '画像なし'}`);

      const oldHeading = `### 第${it.rank}位：${it.rawTitle}`;
      const newHeading = `### 第${it.rank}位：${cleaned}`;

      if (imgUrl) {
        updatedContent = updatedContent.replace(oldHeading, `${newHeading}\n\n![${cleaned}](${imgUrl})`);
      } else {
        updatedContent = updatedContent.replace(oldHeading, newHeading);
      }

      await new Promise(r => setTimeout(r, 600));
    }

    art.content = updatedContent;
    if (firstItemImg && !art.imageUrl) {
      art.imageUrl = firstItemImg;
    }
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log('\n🎉 全31記事の楽天API直接画像取得および商品名正規化が完了しました！');
}

processAllRemainingArticles().catch(console.error);
