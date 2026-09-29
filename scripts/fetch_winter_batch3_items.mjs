import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch3Cosmetics() {
  console.log('❄️ [11-12月コスメ 第3弾] 楽天OpenAPI直接検索を開始します...');

  // 1. アドベントカレンダー（コスメ・デパコス）
  console.log('\n--- テーマ1: コスメアドベントカレンダー ---');
  const calendarQueries = [
    'アドベントカレンダー コスメ 2026',
    'アドベントカレンダー コスメ デパコス',
    'ロクシタン アドベントカレンダー',
    'ポールアンドジョー アドベントカレンダー',
    'キールズ アドベントカレンダー',
    'SABON アドベントカレンダー'
  ];
  let calendarItems = [];
  for (const q of calendarQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      calendarItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1500);
  }

  // 2. ラメアイシャドウ＆密着ハイライト（イルミネーション・ホリデーメイク）
  console.log('\n--- テーマ2: ラメアイシャドウ＆密着ハイライト ---');
  const glitterQueries = [
    'ラメ アイシャドウ 濡れツヤ デパコス',
    'ハイライト ツヤ 密着 イルミネーション',
    'グリッター アイシャドウ 大粒ラメ',
    'アディクション アイシャドウ スパークル',
    'ボビイブラウン リュクス アイシャドウ',
    'ディオール フェイス グロウ パレット'
  ];
  let glitterItems = [];
  for (const q of glitterQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      glitterItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1500);
  }

  // 3. 冬の極上温活バスタイム＆高保湿ボディケア（入浴剤・スクラブ・ボディクリーム）
  console.log('\n--- テーマ3: 冬の入浴剤＆ボディケア ---');
  const bathQueries = [
    '入浴剤 高保湿 重炭酸 ギフト 温活',
    'BARTH 入浴剤 中性重炭酸',
    'アユーラ メディテーションバス',
    'SABON ボディスクラブ 保湿 ギフト',
    'ボディクリーム 高保湿 乾燥肌 ギフト',
    'ローラメルシエ アンバーバニラ ボディクリーム'
  ];
  let bathItems = [];
  for (const q of bathQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      bathItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1500);
  }

  function dedupe(items) {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  const cleanCalendar = dedupe(calendarItems);
  const cleanGlitter = dedupe(glitterItems);
  const cleanBath = dedupe(bathItems);

  console.log(`\n取得結果集計:`);
  console.log(`- アドベントカレンダー: ${cleanCalendar.length}件`);
  console.log(`- ラメ＆ハイライト: ${cleanGlitter.length}件`);
  console.log(`- 入浴剤＆ボディケア: ${cleanBath.length}件`);

  const output = {
    theme1_calendar: cleanCalendar.slice(0, 30),
    theme2_glitter: cleanGlitter.slice(0, 30),
    theme3_bath: cleanBath.slice(0, 30),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch3_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch3_items.json に保存しました！');
}

fetchWinterBatch3Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
