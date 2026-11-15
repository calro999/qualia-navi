// scripts/gemini_batch_rewrite_reviews.mjs
import fs from 'fs';
import path from 'path';
import { readHubItemsFromDir, stringifyHubItemMd } from './lib/md_item_parser.mjs';
import { compileAllMonthlyHubs } from './compile_monthly_hubs.mjs';

function loadDotEnvIfPresent() {
  const envPath = path.resolve('.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
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
}

loadDotEnvIfPresent();

const GEMINI_ROTATION_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-pro',
  'gemini-2.0-flash-lite'
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

function cleanGeminiText(str) {
  let out = String(str || '');
  for (const bad of BANNED_PHRASES) {
    out = out.replaceAll(bad, '');
  }
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

async function callGeminiForReview(item, genreName, modelIdx) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const prompt = `あなたは日本のコスメ雑誌で活躍する中立で鋭い検証エディターです。以下の楽天市場実データに基づき、ショップの広告文やテンプレを完全に排除した、読者が購入判断できるオリジナル検証レビューJSONを出力してください。

【絶対遵守ルール】
- AI定型文（${BANNED_PHRASES.join('、')} など）は絶対に使わないこと。
- 事実ベースのみ記述（データにない成分・数値を捏造しない）。
- ショップの注意書き（発送方法、転売禁止、営業日、お問合せ先、注目カテゴリなど）を混入させない。
- reviewParagraphs はプレインテキスト2段落（1段落目: 処方・スペックと価格・評価の客観分析、2段落目: 実際の使い心地・仕上がり・注意点の検証アドバイス）。

【対象ジャンル】${genreName}
【商品名】${item.cleanName || item.productName}
【価格】${item.price}（送料・ポイント状況確認済み）
【ショップ】${item.shopName}
【星評価】★${item.starRating}（${item.reviewCount}件の購入者レビュー）
【既存抜粋・特徴】${item.featurePoint || ''} / 質感: ${item.texture || ''}

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

  for (let i = 0; i < GEMINI_ROTATION_MODELS.length; i++) {
    const model = GEMINI_ROTATION_MODELS[(modelIdx + i) % GEMINI_ROTATION_MODELS.length];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!res.ok) {
        console.warn(`  ⚠️ Gemini (${model}) HTTP ${res.status}`);
        if (res.status === 402 || res.status === 403) {
          throw new Error(`API_KEY_ERROR_${res.status}`);
        }
        continue;
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const parsed = JSON.parse(rawText);
      if (!Array.isArray(parsed.reviewParagraphs) || parsed.reviewParagraphs.length < 2) continue;

      return {
        badge: cleanGeminiText(parsed.badge) || item.badge,
        featurePoint: cleanGeminiText(parsed.featurePoint) || item.featurePoint,
        skinOrColorType: cleanGeminiText(parsed.skinOrColorType) || item.skinOrColorType,
        texture: cleanGeminiText(parsed.texture) || item.texture,
        pros: Array.isArray(parsed.pros) && parsed.pros.length >= 2 ? parsed.pros.map(cleanGeminiText) : item.pros,
        cons: Array.isArray(parsed.cons) && parsed.cons.length >= 2 ? parsed.cons.map(cleanGeminiText) : item.cons,
        reviewMarkdown: cleanGeminiText(parsed.reviewParagraphs.join('\n\n')),
        model
      };
    } catch (err) {
      if (err.message?.startsWith('API_KEY_ERROR')) throw err;
      console.warn(`  Gemini request error (${model}): ${err.message}`);
    }
  }

  return null;
}

async function main() {
  const genresFile = path.resolve('content/hub-genres.json');
  const genres = JSON.parse(fs.readFileSync(genresFile, 'utf8'));

  const targetMonth = process.argv.find(a => a.startsWith('--month='))?.slice('--month='.length) || '2026-11';
  const targetGenre = process.argv.find(a => a.startsWith('--genre='))?.slice('--genre='.length) || null;
  const limit = parseInt(process.argv.find(a => a.startsWith('--limit='))?.slice('--limit='.length) || '500', 10);

  console.log(`🤖 Gemini Review Rewriter: month=${targetMonth}, genre=${targetGenre || 'all'}, limit=${limit}`);

  let updatedCount = 0;
  let modelIdx = 0;

  for (const g of genres) {
    if (targetGenre && g.slug !== targetGenre) continue;
    const genreDir = path.resolve(`content/hub-items/${targetMonth}/${g.slug}`);
    if (!fs.existsSync(genreDir)) continue;

    const files = fs.readdirSync(genreDir).filter(f => f.endsWith('.md')).sort();
    console.log(`\n📂 [${g.name} (${g.slug})] ${files.length} ファイルをチェック中...`);

    for (const f of files) {
      if (updatedCount >= limit) break;
      const filePath = path.join(genreDir, f);
      const rawContent = fs.readFileSync(filePath, 'utf8');

      // 既にgeminiで作成されたものや、ノイズのないものを判定
      // ユーザーが指摘した「注目カテゴリ」やショップキャプション混入、あるいは全置換
      const needsRewrite = rawContent.includes('注目カテゴリ') ||
                           rawContent.includes('リリーアンナ') ||
                           rawContent.includes('株式会社') ||
                           rawContent.includes('定休日') ||
                           process.argv.includes('--force-all');

      if (!needsRewrite) continue;

      const items = readHubItemsFromDir(genreDir).filter(i => i._filename === f);
      if (items.length === 0) continue;
      const item = items[0];

      console.log(`  🔄 リライト中: ${f} (${item.cleanName})`);
      try {
        const geminiResult = await callGeminiForReview(item, g.name, modelIdx++);
        if (geminiResult) {
          item.badge = geminiResult.badge;
          item.featurePoint = geminiResult.featurePoint;
          item.skinOrColorType = geminiResult.skinOrColorType;
          item.texture = geminiResult.texture;
          item.pros = geminiResult.pros;
          item.cons = geminiResult.cons;
          item.reviewMarkdown = geminiResult.reviewMarkdown;

          fs.writeFileSync(filePath, stringifyHubItemMd(item), 'utf8');
          console.log(`    ✅ 成功 (${geminiResult.model}): ${f}`);
          updatedCount++;
        }
      } catch (err) {
        console.error(`    ❌ 失敗: ${err.message}`);
        if (err.message?.startsWith('API_KEY_ERROR')) {
          console.error(`Gemini APIキーのクォータまたは権限エラーのため終了します。`);
          process.exit(1);
        }
      }
    }
  }

  console.log(`\n🎉 リライト完了: ${updatedCount} 件更新`);
  if (updatedCount > 0) {
    compileAllMonthlyHubs(targetMonth);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
