import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch84() {
  console.log('🔄 不足アイテムの追加取得を開始します...');
  const jsonPath = path.resolve('scratch/winter_batch84_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. マルチバーム補充 (3件)
  const balmMissingQueries = [
    { brand: 'cow_red_box_beauty_cream', name: '牛乳石鹸 カウブランド 赤箱 ビューティクリーム ミルクバター スクワラン 顔 体 マルチバーム 高保湿', query: '赤箱 ビューティクリーム' },
    { brand: 'matsukiyo_hirumenaide_ointment', name: 'ヒルメナイド 油性クリーム ヘパリン類似物質配合 乾燥肌治療薬 高保湿 マルチバーム', query: 'ヒルメナイド 油性クリーム' },
    { brand: 'vt_cica_moisture_balm', name: 'VT COSMETICS シカモイスチャー バーム CICA スティックバーム ツボクサ 高保湿 レスキューバーム', query: 'VT CICA バーム' }
  ];

  for (const cfg of balmMissingQueries) {
    if (data.multiBalmItems.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.multiBalmItems.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.multiBalmItems.push(valid);
      console.log(`✅ [マルチバーム補充成功: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 2. リップ補充 (1件)
  if (data.lipItems.length < 10) {
    const lipQuery = { brand: 'bbia_glow_lip_tint', name: 'ピアー BBIA ローティント グロウ 水光ティント ぷるぷる 密着 水分 光沢 落ちにくい 粘膜リップ', query: 'BBIA ローティント' };
    const res = await searchRakutenDirect(lipQuery.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.lipItems.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = lipQuery.brand;
      valid.displayBrand = lipQuery.name;
      data.lipItems.push(valid);
      console.log(`✅ [リップ補充成功: ${lipQuery.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  }

  console.log(`\n最終集計: マルチバーム=${data.multiBalmItems.length}/10, 乳液=${data.emulsionItems.length}/10, リップ=${data.lipItems.length}/10`);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('💾 データ更新完了！');
}

fillMissingBatch84().catch(console.error);
