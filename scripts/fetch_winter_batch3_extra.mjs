import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch3Extra() {
  console.log('❄️ [11-12月コスメ 第3弾 追加分] 楽天OpenAPI検索...');

  const extraQueries = [
    // ラメ＆ハイライト補強
    { category: 'glitter', query: 'シャネル ボーム エサンシエル ハイライト' },
    { category: 'glitter', query: 'セザンヌ パールグロウハイライト' },
    { category: 'glitter', query: 'CLIO クリオ プロ シングル シャドウ ラメ' },
    { category: 'glitter', query: 'ロムアンド リキッド グリッター' },
    // 入浴剤＆ボディケア補強
    { category: 'bath', query: 'ローラメルシエ ホイップトボディクリーム アンバーバニラ' },
    { category: 'bath', query: 'クナイプ バスソルト 保湿 冬' },
    { category: 'bath', query: 'イソップ レゾルート ボディバーム' },
    { category: 'bath', query: 'ヴェレダ ホワイトバーチ ボディオイル' },
    { category: 'bath', query: 'タカミ スキンピールボディ 角質ケア' }
  ];

  let extraGlitter = [];
  let extraBath = [];

  for (const item of extraQueries) {
    try {
      const res = await searchRakutenDirect(item.query, 6, '-reviewCount');
      if (item.category === 'glitter') {
        extraGlitter.push(...res);
      } else {
        extraBath.push(...res);
      }
    } catch (err) {
      console.warn(`検索エラー (${item.query}):`, err.message);
    }
    await sleep(1500);
  }

  const existing = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch3_items.json', 'utf8'));

  function dedupe(existingList, newList) {
    const seen = new Set(existingList.map(it => it.itemCode));
    const result = [...existingList];
    for (const it of newList) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり')) continue;
      if (!seen.has(it.itemCode)) {
        seen.add(it.itemCode);
        result.push(it);
      }
    }
    return result;
  }

  existing.theme2_glitter = dedupe(existing.theme2_glitter, extraGlitter);
  existing.theme3_bath = dedupe(existing.theme3_bath, extraBath);

  fs.writeFileSync('scratch/rakuten_winter_batch3_items.json', JSON.stringify(existing, null, 2), 'utf8');
  console.log('✅ 追加商品データを scratch/rakuten_winter_batch3_items.json に統合しました！');
  console.log(`- ラメ＆ハイライト合計: ${existing.theme2_glitter.length}件`);
  console.log(`- 入浴剤＆ボディケア合計: ${existing.theme3_bath.length}件`);
}

fetchWinterBatch3Extra().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
