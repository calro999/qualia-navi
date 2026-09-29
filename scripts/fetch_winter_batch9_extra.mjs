import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch9Extra() {
  console.log('❄️ [11-12月コスメ 第9弾 EXTRA] 楽天OpenAPI追加検索を開始します...');

  const extraData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch9_items.json', 'utf8'));

  // テーマ1追加: ロクシタン シア、ニベア スキンミルク
  console.log('\n--- テーマ1追加: ロクシタン、ニベア ---');
  const t1ExtraQueries = [
    'ロクシタン シア リッチ ボディローション',
    'ニベア スキンミルク クリーミィ'
  ];
  for (const q of t1ExtraQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      extraData.theme1_bodycream.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2追加: メンソレータム ヒビプロ、ベビーフット、資生堂 尿素10%
  console.log('\n--- テーマ2追加: ヒビプロ、ベビーフット、資生堂 尿素10% ---');
  const t2ExtraQueries = [
    'メンソレータム ヒビプロ',
    'ベビーフット イージーパック',
    '資生堂 尿素10%クリーム'
  ];
  for (const q of t2ExtraQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      extraData.theme2_footcream.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  function dedupe(items) {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり') || it.itemName.includes('アウトレット') || it.itemName.includes('ジャンク')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  extraData.theme1_bodycream = dedupe(extraData.theme1_bodycream);
  extraData.theme2_footcream = dedupe(extraData.theme2_footcream);
  extraData.theme3_sleepingmask = dedupe(extraData.theme3_sleepingmask);

  console.log(`\n追加マージ後集計:`);
  console.log(`- ボディクリーム＆バター: ${extraData.theme1_bodycream.length}件`);
  console.log(`- かかとフットクリーム: ${extraData.theme2_footcream.length}件`);
  console.log(`- スリーピングマスク: ${extraData.theme3_sleepingmask.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch9_items.json', JSON.stringify(extraData, null, 2), 'utf8');
  console.log('✅ EXTRAマージ完了！');
}

fetchWinterBatch9Extra().catch(err => {
  console.error('Fatal extra fetch error:', err);
  process.exit(1);
});
