import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fillMissingBatch85() {
  const filePath = path.resolve('scratch/winter_batch85_items.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. オペラ リップティント
  if (data.lipBalmItems.length < 10) {
    console.log('🔄 オペラ リップティントを再取得中...');
    const res = await searchRakutenDirect('OPERA リップティント', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'opera_sheer_tint_rouge';
      valid.displayBrand = 'オペラ OPERA リップティント N スクワラン 高保湿 シアー ティントオイルルージュ 美発色 落ちにくい';
      data.lipBalmItems.splice(7, 0, valid); // 8番目に挿入
      console.log(`✅ [opera_sheer_tint_rouge] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  }

  // 2. キュレル ボディローション / モイスチャーミルク
  if (data.bodyMilkItems.length < 10) {
    console.log('🔄 キュレル ボディローションを再取得中...');
    const res = await searchRakutenDirect('キュレル ローション', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'curel_moisture_body_milk';
      valid.displayBrand = 'キュレル 潤浸保湿 モイスチャーミルク ボディローション 乳液 セラミド機能成分 医薬部外品 全身用';
      data.bodyMilkItems.unshift(valid); // 先頭に挿入
      console.log(`✅ [curel_moisture_body_milk] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  }

  console.log(`最終集計: 洗顔料=${data.cleanserItems.length}/10, リップバーム=${data.lipBalmItems.length}/10, ボディミルク=${data.bodyMilkItems.length}/10`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('💾 scratch/winter_batch85_items.json を完全更新しました！');
}

fillMissingBatch85().catch(console.error);
