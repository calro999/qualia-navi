import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch2Cosmetics() {
  console.log('❄️ [11-12月コスメ 第2弾] 楽天OpenAPI直接検索を開始します...');

  // 1. 高保湿ハンドクリーム＆ネイルケア（デパコスギフト＆医薬部外品）
  console.log('\n--- テーマ1: 高保湿ハンドクリーム＆ネイルケア ---');
  const handQueries = [
    'ハンドクリーム 高保湿 ギフト プレゼント',
    'ハンドクリーム 医薬部外品 手荒れ ひび割れ 保湿',
    'ネイルオイル ネイルケア キューティクルオイル 保湿'
  ];
  let handItems = [];
  for (const q of handQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    handItems.push(...res);
    await sleep(1500);
  }

  // 2. 高保湿リップケア＆ナイトリップマスク・プランパー
  console.log('\n--- テーマ2: リップケア＆ナイトリップマスク・プランパー ---');
  const lipQueries = [
    'リップスリーピングマスク リップパック 夜用 保湿',
    'リッププランパー 保湿 ふっくら ボリューム',
    'リップバーム 高保湿 唇荒れ 縦じわ'
  ];
  let lipItems = [];
  for (const q of lipQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    lipItems.push(...res);
    await sleep(1500);
  }

  // 3. 冬の高保湿ヘアオイル＆濃厚ヘアマスク・トリートメント
  console.log('\n--- テーマ3: 冬の高保湿ヘアオイル＆濃厚ヘアマスク ---');
  const hairQueries = [
    'ヘアオイル 高保湿 パサつき ダメージ補修 まとまり',
    'ヘアマスク 濃厚 トリートメント サロン専売 ダメージケア',
    'ヘアミルク 保湿 静電気 うねり'
  ];
  let hairItems = [];
  for (const q of hairQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    hairItems.push(...res);
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

  const cleanHand = dedupe(handItems);
  const cleanLip = dedupe(lipItems);
  const cleanHair = dedupe(hairItems);

  console.log(`\n取得結果集計:`);
  console.log(`- ハンド＆ネイルケア: ${cleanHand.length}件`);
  console.log(`- リップケア＆マスク: ${cleanLip.length}件`);
  console.log(`- ヘアオイル＆マスク: ${cleanHair.length}件`);

  const output = {
    theme1_hand: cleanHand.slice(0, 20),
    theme2_lip: cleanLip.slice(0, 20),
    theme3_hair: cleanHair.slice(0, 20),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch2_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch2_items.json に保存しました！');
}

fetchWinterBatch2Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
