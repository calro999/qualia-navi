import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAdditionalItems() {
  console.log('🔍 追加候補アイテムのピンポイント検索を開始...');
  const existing = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch11_items.json', 'utf8'));

  const additionalQueries = [
    // Theme 1
    { key: 'theme1_morning_cleanser', q: 'ルナソル スムージングジェルウォッシュ' },
    { key: 'theme1_morning_cleanser', q: 'オルビス アクアニスト ジェルウォッシュ' },
    { key: 'theme1_morning_cleanser', q: 'FANCL 泥ジェル洗顔' },
    // Theme 2
    { key: 'theme2_rich_lotion', q: 'イプサ ザ・タイムR アクア 200ml' },
    { key: 'theme2_rich_lotion', q: 'コスメデコルテ リポソーム トリートメント リキッド' },
    { key: 'theme2_rich_lotion', q: 'カネボウ スキン ハーモナイザー 化粧水' },
    // Theme 3
    { key: 'theme3_hair_milk', q: 'ジョンマスター ヘアミルク R&A' },
    { key: 'theme3_hair_milk', q: 'エイトザタラソ ヘアミルク' }
  ];

  for (const item of additionalQueries) {
    try {
      const res = await searchRakutenDirect(item.q, 5, '-reviewCount');
      existing[item.key].push(...res);
    } catch (e) {
      console.warn(`検索スキップ (${item.q}):`, e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch11_items.json', JSON.stringify(existing, null, 2), 'utf8');
  console.log('✅ 追加検索完了！');
}

fetchAdditionalItems().catch(console.error);
