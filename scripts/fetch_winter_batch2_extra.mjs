import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch2Extra() {
  console.log('❄️ [11-12月コスメ 第2弾 補完取得] 楽天OpenAPI直接検索を開始します...');

  // 1. リップケア＆マスクの補完
  console.log('\n--- リップケア＆マスク補完 ---');
  const lipQueries = [
    'リップ スリーピングマスク',
    'リッププランパー',
    'ラネージュ リップ',
    'リップバーム 乾燥',
    'リップ トリートメント 高保湿'
  ];
  let extraLip = [];
  for (const q of lipQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    extraLip.push(...res);
    await sleep(1500);
  }

  // 2. ヘアオイル＆ヘアマスクの補完
  console.log('\n--- ヘアオイル＆ヘアマスク補完 ---');
  const hairQueries = [
    'ヘアオイル 洗い流さない',
    'ヘアオイル 保湿',
    'ヘアマスク サロン',
    'ミルボン エルジューダ',
    'フィーノ プレミアムタッチ',
    'モロッカンオイル'
  ];
  let extraHair = [];
  for (const q of hairQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    extraHair.push(...res);
    await sleep(1500);
  }

  // ハンドケアも主要ブランドを追加補完（ロクシタン、Aesop、ジルスチュアート等）
  console.log('\n--- ハンドケア補完 ---');
  const handQueries = [
    'ロクシタン ハンドクリーム',
    'ハンドクリーム ギフト 名入れ',
    'ユースキン ハンドクリーム'
  ];
  let extraHand = [];
  for (const q of handQueries) {
    const res = await searchRakutenDirect(q, 10, '-reviewCount');
    extraHand.push(...res);
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

  // 既存のデータをマージ
  const prevData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch2_items.json', 'utf8'));

  const mergedHand = dedupe([...prevData.theme1_hand, ...extraHand]);
  const mergedLip = dedupe([...prevData.theme2_lip, ...extraLip]);
  const mergedHair = dedupe([...prevData.theme3_hair, ...extraHair]);

  console.log(`\n統合後集計:`);
  console.log(`- ハンド＆ネイルケア: ${mergedHand.length}件`);
  console.log(`- リップケア＆マスク: ${mergedLip.length}件`);
  console.log(`- ヘアオイル＆マスク: ${mergedHair.length}件`);

  const output = {
    theme1_hand: mergedHand,
    theme2_lip: mergedLip,
    theme3_hair: mergedHair,
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch2_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch2_items.json を更新しました！');
}

fetchWinterBatch2Extra().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
