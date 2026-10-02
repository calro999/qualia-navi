import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch22() {
  console.log('🔄 不足アイテムの楽天API補完取得を開始します...');
  const currentData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch22_items.json', 'utf8'));

  // テーマ1: シャネル、アディクション
  const paletteSupplements = [
    { brand: 'chanel_eyeshadow', name: 'シャネル レ キャトル オンブル', query: 'シャネル レキャトルオンブル' },
    { brand: 'addiction_eyeshadow', name: 'アディクション ザ アイシャドウ パレット ＋', query: 'アディクション アイシャドウパレット' }
  ];

  for (const cfg of paletteSupplements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme1_palette.push(valid);
        console.log(`✅ [補完・パレット: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 補完見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ2: リップオイル（2件補充）
  const lipOilSupplements = [
    { brand: 'cipicipi_lipoil', name: 'CipiCipi シピシピ ガラスプランパー', query: 'シピシピ ガラスプランパー' },
    { brand: 'hince_lipoil', name: 'hince ムードインハンサー リップグロス', query: 'hince リップグロス' }
  ];

  for (const cfg of lipOilSupplements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme2_lipoil.push(valid);
        console.log(`✅ [補完・リップオイル: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 補完見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ3: ギフト（3件補充）
  const giftSupplements = [
    { brand: 'dior_lebaume', name: 'ディオール ル ボーム (マルチクリーム)', query: 'ディオール ルボーム' },
    { brand: 'chanel_crememain', name: 'シャネル ラ クレーム マン (ハンドクリーム)', query: 'シャネル ラクレームマン' },
    { brand: 'jomalone_cologne', name: 'ジョー マローン ロンドン イングリッシュ ペアー コロン', query: 'ジョーマローン イングリッシュペアー コロン' }
  ];

  for (const cfg of giftSupplements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme3_gift.push(valid);
        console.log(`✅ [補完・ギフト: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 補完見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 各テーマぴったり10件にする
  currentData.theme1_palette = currentData.theme1_palette.slice(0, 10);
  currentData.theme2_lipoil = currentData.theme2_lipoil.slice(0, 10);
  currentData.theme3_gift = currentData.theme3_gift.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch22_items.json', JSON.stringify(currentData, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！ 各テーマ件数:`);
  console.log(`- パレット: ${currentData.theme1_palette.length}件`);
  console.log(`- リップオイル: ${currentData.theme2_lipoil.length}件`);
  console.log(`- ギフト: ${currentData.theme3_gift.length}件`);
}

supplementBatch22().catch(console.error);
