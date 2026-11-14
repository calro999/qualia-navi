// scripts/fetch_november_24genres_items.mjs
import fs from 'fs';
import path from 'path';
import {
  searchRakutenRich,
  extractCoreKey,
  extractSpamTokenSignature,
  isEligibleProduct
} from './lib/rakuten_hub_client.mjs';

const TARGET_PER_GENRE = 20;

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const onlySlugs = onlyArg
    ? new Set(onlyArg.slice('--only='.length).split(',').map((s) => s.trim()).filter(Boolean))
    : null;

  const genresPath = path.resolve('content/hub-genres.json');
  const genres = JSON.parse(fs.readFileSync(genresPath, 'utf8'));
  const outputPath = path.resolve('content/november_2026_raw_480.json');

  const existingGenres = (onlySlugs && fs.existsSync(outputPath))
    ? (JSON.parse(fs.readFileSync(outputPath, 'utf8')).genres || {})
    : {};

  const result = {
    fetchedAt: new Date().toISOString(),
    month: '2026-11',
    targetPerGenre: TARGET_PER_GENRE,
    genres: { ...existingGenres }
  };

  let totalItems = 0;

  for (const genre of genres) {
    if (onlySlugs && !onlySlugs.has(genre.slug)) {
      totalItems += result.genres[genre.slug]?.items?.length || 0;
      continue;
    }

    console.log(`\n📦 [${genre.index}/24] ${genre.name} (${genre.slug}) の20商品を厳格取得中...`);
    const collected = [];
    const seenCodes = new Set();
    const seenCoreKeys = new Set();
    const seenSpamSigs = new Set();
    const candidatePool = [];

    const plans = [];
    for (const kw of genre.searchKeywords) {
      plans.push({ kw, sort: '-reviewCount', page: 1 });
    }
    plans.push({ kw: genre.searchKeywords[0], sort: '-reviewCount', page: 2 });
    if (genre.searchKeywords[1]) {
      plans.push({ kw: genre.searchKeywords[1], sort: '-reviewCount', page: 2 });
    }
    plans.push({ kw: genre.searchKeywords[0], sort: '-reviewCount', page: 3 });

    for (const plan of plans) {
      if (candidatePool.length >= 150) break;
      try {
        const raw = await searchRakutenRich(plan.kw, {
          hits: 30,
          page: plan.page,
          sort: plan.sort
        });
        candidatePool.push(...raw);
      } catch (err) {
        console.warn(`  ⚠️ クエリ失敗 (${plan.kw}): ${err.message}`);
      }
    }

    // Pass 1: レビュー件数3件以上を最優先で収集
    // Pass 2: 足りなければ1件以上
    // Pass 3: それでも足りなければ0件（ただし同一ショップ連打・スパム重複除外）
    for (const minReviews of [3, 1, 0]) {
      if (collected.length >= TARGET_PER_GENRE) break;
      for (const item of candidatePool) {
        if (collected.length >= TARGET_PER_GENRE) break;
        if (!isEligibleProduct(item, genre, minReviews)) continue;
        if (seenCodes.has(item.itemCode)) continue;

        const coreKey = extractCoreKey(item.itemName);
        if (!coreKey || seenCoreKeys.has(coreKey)) continue;

        const spamSig = extractSpamTokenSignature(item.itemName);
        if (spamSig && seenSpamSigs.has(spamSig)) continue;

        seenCodes.add(item.itemCode);
        seenCoreKeys.add(coreKey);
        if (spamSig) seenSpamSigs.add(spamSig);
        collected.push(item);
      }
    }

    const zeroRevCount = collected.filter((i) => i.reviewCount === 0).length;
    console.log(`  ✅ ${genre.slug}: ${collected.length}件取得完了 (うちレビュー0件: ${zeroRevCount}件)`);
    result.genres[genre.slug] = {
      genreName: genre.name,
      count: collected.length,
      items: collected
    };
    totalItems += collected.length;
  }

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 全24ジャンル取得完了: 合計 ${totalItems} 件 → ${outputPath}`);

  const insufficient = Object.entries(result.genres)
    .filter(([, v]) => v.count < TARGET_PER_GENRE)
    .map(([k, v]) => `${k}(${v.count})`);
  if (insufficient.length > 0) {
    console.warn(`⚠️ 20件未満のジャンルがあります: ${insufficient.join(', ')}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
