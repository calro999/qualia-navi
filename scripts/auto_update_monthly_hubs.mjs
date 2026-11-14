// scripts/auto_update_monthly_hubs.mjs
import fs from 'fs';
import path from 'path';
import {
  searchRakutenRich,
  extractCoreKey,
  extractSpamTokenSignature,
  isEligibleProduct
} from './lib/rakuten_hub_client.mjs';
import { ensureMonthlyHubPages } from './lib/month_templates.mjs';
import { readHubItemsFromDir, stringifyHubItemMd } from './lib/md_item_parser.mjs';
import { synthesizeProductMdData } from './lib/product_review_synthesizer.mjs';
import { compileAllMonthlyHubs } from './compile_monthly_hubs.mjs';

/**
 * 利用可能・最新Geminiモデル規則:
 * Gemini 1.5系は完全廃止済みのため絶対使用禁止。以下の最新対応モデルをローテーション利用する。
 */
const GEMINI_ROTATION_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
  'gemini-3-flash',
  'gemini-3.1-pro',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-3.7-flash'
];

const BANNED_PHRASES = [
  'と言えるでしょう',
  '徹底的に追求',
  '極上のひととき',
  'いかがでしたでしょうか',
  'ぜひお試しください',
  '魅力的です',
  'ワンランク上',
  '手放せません',
  '必見です',
  'マストアイテム'
];

function loadDotEnvIfPresent() {
  const envPath = path.resolve('.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

function getJstNowParts() {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const iso = jst.toISOString();
  return {
    month: iso.slice(0, 7),
    date: iso.slice(0, 10)
  };
}

function parseCliArgs() {
  const jst = getJstNowParts();
  let month = jst.month;
  let date = jst.date;
  let maxGenres = 3;
  let dryRun = false;

  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--month=')) month = arg.slice('--month='.length).trim() || month;
    else if (arg.startsWith('--date=')) date = arg.slice('--date='.length).trim() || date;
    else if (arg.startsWith('--max-genres=')) {
      const n = parseInt(arg.slice('--max-genres='.length), 10);
      if (Number.isFinite(n) && n > 0) maxGenres = n;
    } else if (arg === '--dry-run') {
      dryRun = true;
    }
  }

  return { month, date, maxGenres, dryRun };
}

function sanitizeFileSlug(code) {
  return String(code || 'item')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
}

function cleanGeminiText(str) {
  let out = String(str || '');
  for (const bad of BANNED_PHRASES) {
    out = out.replaceAll(bad, '');
  }
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Gemini API による独立商品レビューJSON生成（失敗時は即 null を返しローカル合成にフォールバック）
 */
async function tryGenerateWithGeminiRotation(item, genre, baseData, rotationOffset) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { data: null, billingBlocked: true };

  const startIdx = rotationOffset % GEMINI_ROTATION_MODELS.length;
  const captionSnippet = String(item.itemCaption || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 900);

  const prompt = `あなたは日本のコスメ雑誌で活躍する検証エディターです。以下の楽天市場実データに基づき、他商品と表現や構成が重複しない完全独立のレビューJSONを出力してください。

【絶対ルール】
- AI定型文（${BANNED_PHRASES.join('、')} 等）は一切使わない。
- 事実ベースのみ記述（データにない数値・成分を捏造しない）。
- reviewParagraphs はプレインテキスト2段落（Markdown記法やHTMLタグを使わない）。

【対象ジャンル】${genre.name}
【商品名】${item.cleanName}
【価格】${baseData.price}（送料フラグ: ${item.postageFlag === 0 ? '送料無料ライン等対応' : '別途確認'}、ポイント${item.pointRate}倍）
【ショップ】${item.shopName}
【星評価】★${item.reviewAverage}（${item.reviewCount}件）
【特徴抜粋】${captionSnippet || item.catchcopy || item.itemName}

以下のJSON形式のみで返答してください:
{
  "badge": "18文字以内の端的なバッジ名",
  "featurePoint": "35文字以内の具体スペック要約",
  "skinOrColorType": "向いている肌質・悩み・カラー傾向（25文字以内）",
  "texture": "質感・仕上がり描写（28文字以内）",
  "pros": ["具体的メリット1", "具体的メリット2", "具体的メリット3"],
  "cons": ["購入前の正直な注意点1", "購入前の正直な注意点2"],
  "reviewParagraphs": ["第1段落(140〜200字)", "第2段落(120〜180字)"]
}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    const model = GEMINI_ROTATION_MODELS[(startIdx + attempt) % GEMINI_ROTATION_MODELS.length];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.75,
            responseMimeType: 'application/json'
          }
        })
      });
      clearTimeout(timer);

      if (res.status === 402 || res.status === 403) {
        return { data: null, billingBlocked: true, status: res.status, model };
      }
      if (!res.ok) {
        console.warn(`  ⚠️ Gemini (${model}) HTTP ${res.status} -> 次モデルへローテーション/フォールバック`);
        continue;
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText);
      if (
        !Array.isArray(parsed.reviewParagraphs) ||
        parsed.reviewParagraphs.length < 2 ||
        !Array.isArray(parsed.pros) ||
        parsed.pros.length < 2 ||
        !Array.isArray(parsed.cons) ||
        parsed.cons.length < 2
      ) {
        continue;
      }

      const merged = {
        ...baseData,
        badge: cleanGeminiText(parsed.badge) || baseData.badge,
        featurePoint: cleanGeminiText(parsed.featurePoint) || baseData.featurePoint,
        skinOrColorType: cleanGeminiText(parsed.skinOrColorType) || baseData.skinOrColorType,
        texture: cleanGeminiText(parsed.texture) || baseData.texture,
        pros: parsed.pros.slice(0, 3).map(cleanGeminiText).filter(Boolean),
        cons: parsed.cons.slice(0, 2).map(cleanGeminiText).filter(Boolean),
        reviewMarkdown: cleanGeminiText(parsed.reviewParagraphs.join('\n\n'))
      };

      if (merged.pros.length < 2) merged.pros = baseData.pros;
      if (merged.cons.length < 2) merged.cons = baseData.cons;
      if (merged.reviewMarkdown.length < 160) return { data: null, billingBlocked: false };

      return { data: merged, billingBlocked: false, model };
    } catch {
      clearTimeout(timer);
    }
  }

  return { data: null, billingBlocked: false };
}

async function fetchNewUniqueItemForGenre(genre, existingItems) {
  const seenCodes = new Set(existingItems.map((it) => it.itemCode).filter(Boolean));
  const seenCoreKeys = new Set(
    existingItems.map((it) => extractCoreKey(it.productName || it.cleanName)).filter(Boolean)
  );
  const seenSpamSigs = new Set(
    existingItems.map((it) => extractSpamTokenSignature(it.productName || it.cleanName)).filter(Boolean)
  );

  const plans = [];
  for (const kw of genre.searchKeywords || []) {
    plans.push({ kw, sort: '-reviewCount', page: 1 });
    plans.push({ kw, sort: '-reviewCount', page: 2 });
  }
  if (genre.searchKeywords?.[0]) {
    plans.push({ kw: genre.searchKeywords[0], sort: '-updateTimestamp', page: 1 });
    plans.push({ kw: genre.searchKeywords[0], sort: 'standard', page: 1 });
  }

  for (const minReviews of [1, 0]) {
    for (const plan of plans) {
      let candidates = [];
      try {
        candidates = await searchRakutenRich(plan.kw, {
          hits: 30,
          page: plan.page,
          sort: plan.sort
        });
      } catch (err) {
        console.warn(`  ⚠️ 楽天API取得失敗 (${genre.slug} / ${plan.kw}): ${err.message}`);
        continue;
      }

      for (const item of candidates) {
        if (!isEligibleProduct(item, genre, minReviews)) continue;
        if (seenCodes.has(item.itemCode)) continue;

        const coreKey = extractCoreKey(item.itemName);
        if (!coreKey || seenCoreKeys.has(coreKey)) continue;

        const spamSig = extractSpamTokenSignature(item.itemName);
        if (spamSig && seenSpamSigs.has(spamSig)) continue;

        return item;
      }
    }
  }

  return null;
}

async function main() {
  loadDotEnvIfPresent();
  const { month, date, maxGenres, dryRun } = parseCliArgs();
  console.log(`\n🚀 [Auto Monthly Hub Updater] targetMonth=${month}, targetDate=${date}, maxGenres=${maxGenres}, dryRun=${dryRun}`);

  const genresPath = path.resolve('content/hub-genres.json');
  const genres = JSON.parse(fs.readFileSync(genresPath, 'utf8'));

  let createdRolloverPages = 0;
  if (!dryRun) {
    createdRolloverPages = ensureMonthlyHubPages(month, genres);
    if (createdRolloverPages > 0) {
      console.log(`🗓️ 新規月次フォルダ自動生成完了: ${month} (${createdRolloverPages} ジャンル分の meta.json 作成)`);
    }
  } else {
    const pagesDir = path.resolve('content/hub-pages', month);
    console.log(`ℹ️ [dry-run] 月次ディレクトリ確認: ${pagesDir} (存在=${fs.existsSync(pagesDir)})`);
  }

  // 全24ジャンルの当日更新済み状況をチェック
  const candidates = [];
  for (const genre of genres) {
    const itemDir = path.resolve('content/hub-items', month, genre.slug);
    const existingItems = readHubItemsFromDir(itemDir);
    const updatedToday = existingItems.some((it) => it.addedDate === date);
    if (!updatedToday) {
      candidates.push({
        genre,
        itemDir,
        existingItems,
        count: existingItems.length
      });
    }
  }

  if (candidates.length === 0) {
    console.log(`✅ ${date} 分の全${genres.length}ジャンル日次更新はすでに完了しています。`);
    if (createdRolloverPages > 0 && !dryRun) {
      compileAllMonthlyHubs();
    }
    return;
  }

  // 件数が少ないジャンルを優先し、同数ならジャンルインデックス順でバランスよく毎日1周する
  candidates.sort((a, b) => {
    if (a.count !== b.count) return a.count - b.count;
    return a.genre.index - b.genre.index;
  });

  const selected = candidates.slice(0, maxGenres);
  console.log(
    `📋 本日未更新 ${candidates.length}ジャンル中、今回処理対象 (${selected.length}件): ${selected.map((s) => `${s.genre.slug}(現${s.count}件)`).join(', ')}`
  );

  const dayOffset = parseInt(date.replace(/-/g, ''), 10) || 0;
  let geminiBillingBlocked = false;
  let addedCount = 0;

  for (const target of selected) {
    const { genre, itemDir, existingItems } = target;
    console.log(`\n🔍 [${genre.slug}] 新規アイテム検索中...`);
    const picked = await fetchNewUniqueItemForGenre(genre, existingItems);
    if (!picked) {
      console.warn(`  ⚠️ [${genre.slug}] 新規未掲載の適格商品が見つからなかったためスキップします。`);
      continue;
    }

    const baseData = synthesizeProductMdData(picked, genre, existingItems.length, date);
    let finalData = baseData;
    let generatorSource = 'local-synthesizer';

    if (!geminiBillingBlocked && process.env.GEMINI_API_KEY) {
      const gRes = await tryGenerateWithGeminiRotation(picked, genre, baseData, dayOffset + genre.index);
      if (gRes.billingBlocked) {
        geminiBillingBlocked = true;
        console.log(`  ℹ️ Gemini API 課金/権限ステータス (HTTP ${gRes.status || 'none'}) によりローカル実データ合成モードへ自動切替`);
      } else if (gRes.data) {
        finalData = gRes.data;
        generatorSource = `gemini:${gRes.model}`;
      }
    }

    const { reviewMarkdown, ...frontmatterData } = finalData;
    const nextNum = String(existingItems.length + 1).padStart(2, '0');
    const filename = `${nextNum}-${sanitizeFileSlug(picked.itemCode)}.md`;
    const destPath = path.join(itemDir, filename);

    if (dryRun) {
      console.log(`  🧪 [dry-run] 生成予定ファイル: ${path.relative(process.cwd(), destPath)}`);
      console.log(`     生成ソース: ${generatorSource} | ★${finalData.starRating} (${finalData.reviewCount}件) | ${finalData.price}`);
      console.log(`     商品名: ${finalData.cleanName}`);
      console.log(`     冒頭抜粋: ${reviewMarkdown.split('\n\n')[0].slice(0, 90)}...`);
    } else {
      fs.mkdirSync(itemDir, { recursive: true });
      const mdContent = stringifyHubItemMd(frontmatterData, reviewMarkdown);
      fs.writeFileSync(destPath, mdContent, 'utf8');
      console.log(`  ✅ 追加完了 (${generatorSource}): ${filename} — ${finalData.cleanName} (★${finalData.starRating})`);
      addedCount++;
    }
  }

  if (!dryRun && (addedCount > 0 || createdRolloverPages > 0)) {
    console.log(`\n🛠️ 月次ハブページ再コンパイル中 (追加 ${addedCount}件 / 新規作成 ${createdRolloverPages}ジャンル)...`);
    compileAllMonthlyHubs();
  } else if (dryRun) {
    console.log(`\n✅ [dry-run] テスト正常終了（実ファイルへの書き込み・コンパイルは未実行）`);
  }
}

main().catch((err) => {
  console.error('❌ Auto Update Error:', err);
  process.exit(1);
});
