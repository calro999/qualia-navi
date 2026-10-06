import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixBatch48Items() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch48_items.json', 'utf8'));

  console.log('🔄 テーマ2とテーマ3の不足分アイテムを楽天APIから追加取得します...');

  // テーマ2の補完 (2件)
  const suppTheme2 = [
    { brand: 'cledepeau_teint_creme_eclat', name: 'クレ・ド・ポー ボーテ タンクレームエクラ n 25g 贅沢なトリートメントクリームファンデーション サテンの艶', query: 'クレドポー ボーテ ファンデーション' },
    { brand: 'suqqu_the_foundation', name: 'SUQQU スック ザ ファンデーション 30g 移り変わる艶 13種の国産美容エキス配合 至高のクリーム', query: 'SUQQU ファンデーション クリーム' }
  ];

  for (const cfg of suppTheme2) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_foundation.push(valid);
        console.log(`✅ [追加/テーマ2] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('エラー:', e.message);
    }
    await sleep(1300);
  }

  // テーマ3の補完 (3件)
  const suppTheme3 = [
    { brand: 'toutvert_nanocelamide_essence', name: 'TOUT VERT トゥヴェール ナノエマルジョン 50ml 浸透湿潤セラミド10% 高濃度インナードライ対策乳液', query: 'トゥヴェール ナノエマルジョン' },
    { brand: 'curel_intensive_moisture_serum', name: '花王 キュレル 潤浸保湿 美容液 40g 潤浸セラミド機能成分 高保湿 ハリ 肌荒れ防止', query: 'キュレル 潤浸保湿 美容液' },
    { brand: 'hifmid_essence_cream', name: '小林製薬 ヒフミド エッセンスクリーム 22g 天然型セラミド配合 高保湿クリーム ハリ感', query: 'ヒフミド エッセンスクリーム' }
  ];

  for (const cfg of suppTheme3) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_ceramide.push(valid);
        console.log(`✅ [追加/テーマ3] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('エラー:', e.message);
    }
    await sleep(1300);
  }

  console.log(`\n最終アイテム数: テーマ1=${data.theme1_holiday.length}, テーマ2=${data.theme2_foundation.length}, テーマ3=${data.theme3_ceramide.length}`);
  fs.writeFileSync('scratch/rakuten_winter_batch48_items.json', JSON.stringify(data, null, 2), 'utf8');
}

fixBatch48Items();
