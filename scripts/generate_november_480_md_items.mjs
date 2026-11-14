// scripts/generate_november_480_md_items.mjs
import fs from 'fs';
import path from 'path';
import { stringifyHubItemMd } from './lib/md_item_parser.mjs';
import { synthesizeProductMdData } from './lib/product_review_synthesizer.mjs';

const TARGET_MONTH = '2026-11';

function sanitizeFileSlug(code) {
  return String(code || 'item')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
}

function assignAddedDate(idx, genreIndex) {
  // 2026-11-01 〜 2026-11-15 に自然な日次追加履歴を割り振り、各ジャンル2〜3件が 2026-11-15 になるよう分散
  if (idx === 1 || idx === 8 || (idx === 15 && genreIndex % 2 === 0)) {
    return '2026-11-15';
  }
  const day = ((idx * 5 + genreIndex * 3) % 14) + 1;
  return `${TARGET_MONTH}-${String(day).padStart(2, '0')}`;
}

function main() {
  const genresPath = path.resolve('content/hub-genres.json');
  const rawPath = path.resolve('content/november_2026_raw_480.json');
  const genres = JSON.parse(fs.readFileSync(genresPath, 'utf8'));
  const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

  let totalWritten = 0;
  const bodySeen = new Set();
  let duplicateBodyCount = 0;

  for (const genre of genres) {
    const genreEntry = rawData.genres?.[genre.slug];
    const items = Array.isArray(genreEntry?.items) ? genreEntry.items : [];
    if (items.length === 0) {
      throw new Error(`No items found for genre: ${genre.slug}`);
    }

    const dir = path.resolve('content/hub-items', TARGET_MONTH, genre.slug);
    fs.mkdirSync(dir, { recursive: true });

    // Clean any stale .md files before writing exact 20
    for (const existing of fs.readdirSync(dir)) {
      if (existing.endsWith('.md')) {
        fs.unlinkSync(path.join(dir, existing));
      }
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const addedDate = assignAddedDate(i, genre.index);
      const synthesized = synthesizeProductMdData(item, genre, i, addedDate);
      const { reviewMarkdown, ...frontmatterData } = synthesized;

      if (bodySeen.has(reviewMarkdown)) {
        duplicateBodyCount++;
      } else {
        bodySeen.add(reviewMarkdown);
      }

      const mdContent = stringifyHubItemMd(frontmatterData, reviewMarkdown);
      const num = String(i + 1).padStart(2, '0');
      const safeCode = sanitizeFileSlug(item.itemCode);
      const filename = `${num}-${safeCode}.md`;
      fs.writeFileSync(path.join(dir, filename), mdContent, 'utf8');
      totalWritten++;
    }

    console.log(`  ✅ [${String(genre.index).padStart(2, '0')}/24] ${genre.slug}: ${items.length} .md files generated`);
  }

  console.log(`\n🎉 完了: 全 ${totalWritten} 件の独立 .md 商品ファイルを生成しました (重複本文: ${duplicateBodyCount}件)`);
  if (duplicateBodyCount > 0) {
    process.exitCode = 1;
  }
}

main();
