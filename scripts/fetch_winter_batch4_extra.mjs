import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraBatch4() {
  console.log('❄️ [11-12月コスメ 第4弾] ピンポイント追加検索を開始します...');
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch4_items.json', 'utf8'));

  // テーマ1: ミスト追加
  const mistQueries = [
    'クラランス フィックス メイクアップ 50ml',
    'エリクシール つや玉ミスト 80ml',
    'CNP プロポリス アンプル ミスト 100ml',
    'キュレル ディープモイスチャースプレー 150g',
    'RMK グローミスト',
    'MAC フィックス+ プレッププライム'
  ];
  let extraMist = [];
  for (const q of mistQueries) {
    try {
      const res = await searchRakutenDirect(q, 5, '-reviewCount');
      extraMist.push(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  // テーマ2: クレンジング追加
  const cleansingQueries = [
    'バニラコ クレンジングバーム 100ml',
    'スキンビル ホットクレンジングジェル 200g',
    'ルルルン クレンジングバーム CLEAR BLACK',
    'カネボウ メロウ オフ ヴェイル 160g',
    'ベネフィーク ホットクレンジング'
  ];
  let extraCleansing = [];
  for (const q of cleansingQueries) {
    try {
      const res = await searchRakutenDirect(q, 5, '-reviewCount');
      extraCleansing.push(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  // テーマ3: フレグランス・練り香水追加
  const fragranceQueries = [
    'ディプティック オードトワレ タムダオ',
    'ディプティック オードトワレ フィロシコス',
    'SHIRO 練り香水 サボン ホワイトリリー',
    'AUX PARADIS ウィンターベリー',
    'ローラメルシエ オードトワレ アンバーバニラ 50ml',
    'イヴサンローラン リブレ オーデパルファム'
  ];
  let extraFragrance = [];
  for (const q of fragranceQueries) {
    try {
      const res = await searchRakutenDirect(q, 5, '-reviewCount');
      extraFragrance.push(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
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

  const allMist = dedupe([...current.theme1_mist, ...extraMist]);
  const allCleansing = dedupe([...current.theme2_cleansing, ...extraCleansing]);
  const allFragrance = dedupe([...current.theme3_fragrance, ...extraFragrance]);

  current.theme1_mist = allMist;
  current.theme2_cleansing = allCleansing;
  current.theme3_fragrance = allFragrance;
  current.updatedAt = new Date().toISOString();

  fs.writeFileSync('scratch/rakuten_winter_batch4_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log(`✅ 保存完了！ 合計 - ミスト: ${allMist.length}件, クレンジング: ${allCleansing.length}件, 香水: ${allFragrance.length}件`);
}

fetchExtraBatch4().catch(err => {
  console.error('エラー:', err);
  process.exit(1);
});
