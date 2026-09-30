import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraBatch12Items() {
  console.log('❄️ [Batch 12 補強検索] 楽天OpenAPI直接検索を開始します...');
  const jsonPath = 'scratch/rakuten_winter_batch12_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Theme 1 extra
  const t1Queries = [
    'ルナソル コンシーラー シームレスカバー',
    'エクセル サイレントカバー コンシーラー',
    'キャンメイク カラーミキシング コンシーラー',
    'ケイト パーツリサイズ コンシーラー'
  ];
  for (const q of t1Queries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      data.theme1_concealer.push(...res);
    } catch (e) {
      console.warn('Err:', q, e.message);
    }
    await sleep(1300);
  }

  // Theme 2 extra
  const t2Queries = [
    'ジョンマスター ヘアバーム',
    'ダンスデザインチューナー モダンシマー',
    'mm ミリ バーム ヘアスタイリング',
    'bojico ボジコ オーガニック ヘアワックス バーム'
  ];
  for (const q of t2Queries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      data.theme2_hair_balm.push(...res);
    } catch (e) {
      console.warn('Err:', q, e.message);
    }
    await sleep(1300);
  }

  // Theme 3 extra
  const t3Queries = [
    'キュレル 潤浸保湿 モイストバーム 70g',
    'クラブ デイエッセンス スティック',
    'dプログラム 薬用 スキンリペアクリーム',
    'エリクシール つや玉ミスト 80ml',
    'RMK グローミスト モイスチャー'
  ];
  for (const q of t3Queries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      data.theme3_stick_balm.push(...res);
    } catch (e) {
      console.warn('Err:', q, e.message);
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

  data.theme1_concealer = dedupe(data.theme1_concealer);
  data.theme2_hair_balm = dedupe(data.theme2_hair_balm);
  data.theme3_stick_balm = dedupe(data.theme3_stick_balm);

  console.log(`\n=== 補強後サマリー ===`);
  console.log(`テーマ1: ${data.theme1_concealer.length}件`);
  console.log(`テーマ2: ${data.theme2_hair_balm.length}件`);
  console.log(`テーマ3: ${data.theme3_stick_balm.length}件`);

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('🎉 補強データを scratch/rakuten_winter_batch12_items.json に反映しました！');
}

fetchExtraBatch12Items().catch(err => {
  console.error('Fatal extra fetch error:', err);
  process.exit(1);
});
