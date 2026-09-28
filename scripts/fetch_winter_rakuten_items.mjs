import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterCosmetics() {
  console.log('❄️ [11-12月コスメ] 楽天OpenAPI直接検索を開始します...');

  // 1. クリスマスコフレ＆ホリデー限定
  console.log('\n--- テーマ1: クリスマスコフレ＆ホリデー限定 ---');
  const coffretQueries = [
    'クリスマスコフレ コフレ ギフト セット',
    'ホリデー コフレ メイク パレット 限定',
    'コスメ コフレ アドベントカレンダー スキンケア'
  ];
  let coffretItems = [];
  for (const q of coffretQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    coffretItems.push(...res);
    await sleep(1500);
  }

  // 2. 真冬の徹底高保湿・セラミド＆バリアクリーム
  console.log('\n--- テーマ2: 真冬の高保湿・セラミド＆バリアクリーム ---');
  const moistureQueries = [
    'ヒト型セラミド クリーム 高保湿 乾燥肌',
    '高保湿 フェイスクリーム バリア機能 敏感肌',
    '濃厚 保湿クリーム インナードライ うるおい'
  ];
  let moistureItems = [];
  for (const q of moistureQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    moistureItems.push(...res);
    await sleep(1500);
  }

  // 3. 冬の美容液ファンデ＆高保湿下地
  console.log('\n--- テーマ3: 冬の美容液ファンデ＆高保湿下地 ---');
  const baseQueries = [
    '美容液ファンデーション 高保湿 ツヤ肌 リキッド',
    '保湿 化粧下地 乾燥肌 うるおい プライマー',
    'クリームファンデーション 美容液成分 乾燥崩れ防止'
  ];
  let baseItems = [];
  for (const q of baseQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    baseItems.push(...res);
    await sleep(1500);
  }

  // 重複除去関数（itemCodeまたはitemNameでユニーク化）
  function dedupe(items) {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      // 中古品や無関係なものを除外
      if (it.itemName.includes('中古') || it.itemName.includes('古着')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  const cleanCoffret = dedupe(coffretItems);
  const cleanMoisture = dedupe(moistureItems);
  const cleanBase = dedupe(baseItems);

  console.log(`\n取得結果集計:`);
  console.log(`- クリスマスコフレ: ${cleanCoffret.length}件`);
  console.log(`- 高保湿セラミドクリーム: ${cleanMoisture.length}件`);
  console.log(`- 冬ベースメイク: ${cleanBase.length}件`);

  const output = {
    theme1_coffret: cleanCoffret.slice(0, 15),
    theme2_moisture: cleanMoisture.slice(0, 15),
    theme3_base: cleanBase.slice(0, 15),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_2026_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_2026_items.json に保存しました！');
}

fetchWinterCosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
