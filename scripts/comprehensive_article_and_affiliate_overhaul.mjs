import fs from 'fs';
import path from 'path';

const APP_ID = "1a3cdfd9-2aec-4b42-8290-1c53603b0012";
const ACCESS_KEY = "pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5";
const AFF_ID = "54d2a438.4bc4abc2.54d2a439.aa1be583";

// 楽天APIから直接商品情報を取得し、正確なアフィリエイトURL（hb.afl.rakuten.co.jp）を生成する関数
async function fetchRakutenAffiliateDirect(itemUrlOrKeyword) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      let queryParam = "";
      if (itemUrlOrKeyword.includes("item.rakuten.co.jp")) {
        const clean = itemUrlOrKeyword.replace(/\?.*$/, "");
        const parts = clean.split("/").filter(Boolean);
        const shop = parts[parts.length - 2];
        const item = parts[parts.length - 1];
        queryParam = `shopCode=${shop}&keyword=${encodeURIComponent(item)}`;
      } else {
        queryParam = `keyword=${encodeURIComponent(itemUrlOrKeyword)}`;
      }

      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFF_ID}&${queryParam}&hits=1`;
      const res = await fetch(url);
      if (res.ok) {
        const d = await res.json();
        const it = d.Items?.[0]?.Item;
        if (it) {
          return it.affiliateUrl || it.itemUrl;
        }
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 600));
  }

  // フォールバック: 確実に報酬が発生する正規hb.afl直リンクを構築
  const targetUrl = itemUrlOrKeyword.startsWith("http") ? itemUrlOrKeyword.replace(/\?.*$/, "") : `https://item.rakuten.co.jp/search?k=${encodeURIComponent(itemUrlOrKeyword)}`;
  return `https://hb.afl.rakuten.co.jp/hgc/${AFF_ID}/?pc=${encodeURIComponent(targetUrl)}&m=${encodeURIComponent(targetUrl)}`;
}

// タイトルの最適化（ベネフィットを前頭部に、成分・カテゴリ・おすすめを後部に配置）
function optimizeTitle(title) {
  if (!title) return title;
  
  // パターン1: 【成分・カテゴリ10選】ベネフィット
  const m1 = title.match(/^【(.*?)10選】(.*)$/);
  if (m1) {
    const ingredientOrCat = m1[1].trim();
    let benefit = m1[2].trim().replace(/^[！!・\s]+/, '');
    return `${benefit}！${ingredientOrCat}おすすめ10選`;
  }

  // パターン2: 【ターゲット専用】ベネフィット10選
  const m2 = title.match(/^【(.*?)専用】(.*?)10選$/);
  if (m2) {
    const target = m2[1].trim();
    const benefit = m2[2].trim().replace(/^[！!・\s]+/, '');
    return `${benefit}！【${target}】おすすめコスメ10選`;
  }

  return title;
}

// ディスクリプションの最適化（知りたいベネフィットを先頭に）
function optimizeDescription(desc, title) {
  if (!desc) return desc;
  // すでにベネフィット先行の場合はそのまま
  if (desc.startsWith("【2026年最新】") || desc.includes("毛穴の開き") || desc.includes("たるみ")) {
    return desc;
  }
  return `【2026年最新】${desc}`;
}

// 記事レイアウトの再構成: ランキング10選を冒頭に配置し、詳細な成分講義やFAQを後方に配置
function reorderArticleFlow(content) {
  const rankStartMatch = content.match(/\n(## (?:厳選！|2026年最新|.*おすすめ.*10選|.*徹底比較.*)[\s\S]*)/);
  if (!rankStartMatch) return content;

  const rankSectionFull = rankStartMatch[1];
  const beforeRank = content.slice(0, content.indexOf(rankSectionFull)).trim();

  const lines = beforeRank.split("\n");
  const h1AndIntro = [];
  const chapters = [];
  let foundFirstChapter = false;

  for (const line of lines) {
    if (line.startsWith("## 1.") || line.startsWith("## なぜ") || line.startsWith("## 目次")) {
      foundFirstChapter = true;
    }
    if (foundFirstChapter) {
      chapters.push(line);
    } else {
      h1AndIntro.push(line);
    }
  }

  if (chapters.length === 0) return content;

  return `${h1AndIntro.join("\n").trim()}\n\n${rankSectionFull.trim()}\n\n---\n\n## 専門家が解説する成分メカニズム＆選び方・効果的な使い方\n\n${chapters.join("\n").trim()}`;
}

// 各商品ブロックの配置順序修正: 商品名＋画像＋価格 ➔ 【専門家・愛用者目線の詳細レビュー＆おすすめポイント】 ➔ ショップ情報＋アフィリンク
function reorderItemBlocks(content) {
  const lines = content.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (/^###\s*第\d+位：/.test(line)) {
      // Collect the entire item block until next heading or divider
      const itemHeading = line;
      i++;
      let imgLine = "";
      let priceLine = "";
      let shopLine = "";
      let linkLine = "";
      let reviewHeading = "";
      let reviewText = "";

      while (i < lines.length && !lines[i].startsWith('### ') && !lines[i].startsWith('## ') && lines[i].trim() !== '---') {
        const cur = lines[i];
        if (cur.startsWith('![')) {
          imgLine = cur;
        } else if (cur.startsWith('- **価格**:')) {
          priceLine = cur;
        } else if (cur.startsWith('- **取扱ショップ**:')) {
          shopLine = cur;
        } else if (cur.includes('楽天市場で詳細')) {
          linkLine = cur;
        } else if (cur.includes('【専門家・愛用者目線')) {
          reviewHeading = cur;
        } else if (reviewHeading && !reviewText && cur.trim() && !cur.startsWith('- ')) {
          reviewText = cur;
        }
        i++;
      }

      // Reassemble in optimal UX order:
      // 1. 商品見出し
      result.push(itemHeading);
      result.push("");
      // 2. 商品画像
      if (imgLine) {
        result.push(imgLine);
        result.push("");
      }
      // 3. 価格（最も知りたい情報）
      if (priceLine) {
        result.push(priceLine);
        result.push("");
      }
      // 4. 【専門家・愛用者目線の詳細レビュー＆おすすめポイント】（商品の効果・魅力）
      if (reviewHeading) {
        result.push(reviewHeading);
        if (reviewText) result.push(reviewText);
        result.push("");
      }
      // 5. ショップ情報
      if (shopLine) {
        result.push(shopLine);
      }
      // 6. 楽天公式直行アフィリエイトボタン・リンク
      if (linkLine) {
        result.push(linkLine);
      }
      result.push("");
      result.push("---");
      result.push("");
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join('\n');
}

async function runOverhaul() {
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  console.log(`🚀 全記事総点検＆UXファースト・アフィリエイトリンク完全適正化を開始します（総記事数: ${articles.length}）...`);

  let fixedLinkCount = 0;
  let optimizedArticleCount = 0;

  for (let aIdx = 0; aIdx < articles.length; aIdx++) {
    const art = articles[aIdx];
    if (!art.content) continue;

    let modified = false;

    // 1. タイトルの最適化（ベネフィット先行）
    const origTitle = art.title;
    const newTitle = optimizeTitle(origTitle);
    if (newTitle !== origTitle) {
      art.title = newTitle;
      modified = true;
    }

    // 2. ディスクリプションの最適化
    const newDesc = optimizeDescription(art.description, art.title);
    if (newDesc !== art.description) {
      art.description = newDesc;
      modified = true;
    }

    // 3. アフィリエイトリンク（直接item.rakuten.co.jpになっているもの）の完全適正化
    // non-hb links: [楽天市場で詳細...](https://item.rakuten.co.jp/...)
    const nonHbRegex = /\[(.*?)\]\((https:\/\/item\.rakuten\.co\.jp\/[^\)]+)\)/g;
    let match;
    const linksToFix = [];
    while ((match = nonHbRegex.exec(art.content)) !== null) {
      linksToFix.push({ full: match[0], text: match[1], url: match[2] });
    }

    if (linksToFix.length > 0) {
      for (const item of linksToFix) {
        const affiliateUrl = await fetchRakutenAffiliateDirect(item.url);
        art.content = art.content.replace(item.full, `[${item.text}](${affiliateUrl})`);
        fixedLinkCount++;
      }
      modified = true;
    }

    // 4. ランキング記事（10選など）の構成順序を最適化（ランキングを冒頭へ、レビューを価格直下へ）
    if (art.content.includes("### 第1位：") || art.content.includes("### 【第1位】") || art.id.includes("10sen")) {
      const beforeContent = art.content;
      
      // レビューを価格直下へ再配置
      let reordered = reorderItemBlocks(art.content);
      // ランキング10選を冒頭へ移動
      reordered = reorderArticleFlow(reordered);

      if (reordered !== beforeContent) {
        art.content = reordered;
        modified = true;
        optimizedArticleCount++;
      }
    }

    if (modified) {
      articles[aIdx] = art;
    }
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');

  console.log(`\n🎉 全記事の総点検が完了しました！`);
  console.log(`- 最適化した記事数（タイトル/構成）: ${optimizedArticleCount} 記事`);
  console.log(`- 修正・適用した楽天公式アフィリエイトリンク数: ${fixedLinkCount} 箇所`);
}

runOverhaul().catch(console.error);
