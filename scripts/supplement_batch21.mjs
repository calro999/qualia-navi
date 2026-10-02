import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch21() {
  console.log('🔄 不足アイテムの楽天API補完取得を開始します...');
  const currentData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch21_items.json', 'utf8'));

  // テーマ1の補完: エレガンス（キーワードを「エレガンス プードル」に変更）、ジバンシイ プリズムリーブル プレスト
  const powderSupplements = [
    { brand: 'elegance_powder', name: 'エレガンス ラ プードル オートニュアンス', query: 'エレガンス プードル フェイスパウダー' },
    { brand: 'givenchy_powder', name: 'ジバンシイ プリズム リーブル プレストパウダー', query: 'ジバンシイ プリズム リーブル プレストパウダー' }
  ];

  for (const cfg of powderSupplements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme1_powder.push(valid);
        console.log(`✅ [補完・パウダー: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 補完見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ2の補完: クレ・ド・ポー ボーテ（キーワードを「クレドポー クレームアンタンシヴ」）、オバジ（「オバジ ダーマパワーX クリーム」）
  const creamSupplements = [
    { brand: 'cledepeau_creme', name: 'クレ・ド・ポー ボーテ クレームアンタンシヴ n', query: 'クレドポー クレームアンタンシヴ 夜用クリーム' },
    { brand: 'obagi_stem_cream', name: 'オバジ ダーマパワーX ステムリフト クリーム', query: 'オバジ ダーマパワーX ステムリフト' }
  ];

  for (const cfg of creamSupplements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme2_cream.push(valid);
        console.log(`✅ [補完・クリーム: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 補完見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 10アイテムずつにスライス
  currentData.theme1_powder = currentData.theme1_powder.slice(0, 10);
  currentData.theme2_cream = currentData.theme2_cream.slice(0, 10);
  currentData.theme3_cleanse = currentData.theme3_cleanse.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch21_items.json', JSON.stringify(currentData, null, 2), 'utf8');
  console.log(`🎉 補完完了！各テーマ10アイテム（計30アイテム）確認:
- パウダー: ${currentData.theme1_powder.length}アイテム
- クリーム: ${currentData.theme2_cream.length}アイテム
- クレンジング: ${currentData.theme3_cleanse.length}アイテム`);
}

supplementBatch21().catch(err => {
  console.error('補完エラー:', err);
  process.exit(1);
});
