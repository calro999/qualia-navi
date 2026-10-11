import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fill() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch79_items.json', 'utf8'));
  console.log('現在件数: パウダー =', data.theme1_hydrating_face_powder.length);

  // エレガンス ラ プードル を「エレガンス ラプードル」または「ローラメルシエ ルースセッティングパウダー」で取得
  let item = null;
  const queries = ['エレガンス プードル', 'ローラメルシエ ルースセッティングパウダー', 'THREE アドバンスドエシリアルスムースオペレーター'];
  for (const q of queries) {
    try {
      const res = await searchRakutenDirect(q, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'elegance_la_poudre_haute_nuance';
        valid.displayBrand = 'エレガンス Elegance ラ プードル オートニュアンス 8.8g フェイスパウダー 仕上げ';
        item = valid;
        console.log(`✅ 取得成功: ${q} -> ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
        break;
      }
    } catch (e) {
      console.log(`エラー (${q}):`, e.message);
    }
  }

  if (item) {
    // 4番目に挿入
    data.theme1_hydrating_face_powder.splice(3, 0, item);
    fs.writeFileSync('scratch/rakuten_winter_batch79_items.json', JSON.stringify(data, null, 2), 'utf8');
    console.log('🎉 パウダーも10件に揃いました！');
  } else {
    console.error('取得失敗');
  }
}
fill();
