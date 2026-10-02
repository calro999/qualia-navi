import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch19() {
  console.log('🔄 [バッチ19 補完] 不足しているアイテムを楽天APIから直接再取得します...');
  const jsonPath = 'scratch/rakuten_winter_batch19_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ2不足分: メラノCC ディープクリア酵素洗顔
  if (data.theme2_wash.length < 10) {
    try {
      console.log('取得中: メラノCC ディープクリア酵素洗顔...');
      const res = await searchRakutenDirect('メラノCC ディープクリア酵素洗顔 130g', 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0);
      if (valid) {
        valid.brandKey = 'melano_cc';
        valid.displayBrand = 'メラノCC ディープクリア酵素洗顔';
        data.theme2_wash.push(valid);
        console.log(`✅ [melano_cc] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('メラノCC取得失敗:', e.message);
    }
  }

  // 2. テーマ3不足分1: ナプラ N.
  if (data.theme3_mist.length < 9) {
    try {
      console.log('取得中: ナプラ N. エヌドット シアオイル / スプレー...');
      const res = await searchRakutenDirect('ナプラ エヌドット シアオイル 150ml', 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0);
      if (valid) {
        valid.brandKey = 'napla';
        valid.displayBrand = 'ナプラ N. シアオイル / ベースヘアスプレー';
        data.theme3_mist.push(valid);
        console.log(`✅ [napla] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ナプラ取得失敗:', e.message);
    }
    await sleep(1300);
  }

  // 3. テーマ3不足分2: スティーブンノル モイスチュア リペアミスト
  if (data.theme3_mist.length < 10) {
    try {
      console.log('取得中: スティーブンノル ハイドロリニュー ミスト...');
      const res = await searchRakutenDirect('スティーブンノル モイスチュア リペアミスト', 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0);
      if (valid) {
        valid.brandKey = 'stephenknoll';
        valid.displayBrand = 'スティーブンノル モイスチュア リペアミスト';
        data.theme3_mist.push(valid);
        console.log(`✅ [stephenknoll] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        // オルビスのトリートメントヘアウォーター
        console.log('代替取得中: オルビス エッセンスインヘアミルク / ウォーター...');
        const res2 = await searchRakutenDirect('オルビス エッセンスインヘアミルク 140g', 5, '-reviewCount');
        const valid2 = res2.find(it => it.imageUrl && it.itemPrice > 0);
        if (valid2) {
          valid2.brandKey = 'orbis_hair';
          valid2.displayBrand = 'オルビス エッセンスインヘアミルク';
          data.theme3_mist.push(valid2);
          console.log(`✅ [orbis_hair] ${valid2.itemName.slice(0, 35)} (${valid2.priceFormatted})`);
        }
      }
    } catch (e) {
      console.error('スティーブンノル/代替取得失敗:', e.message);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！`);
  console.log(`- テーマ1 (リッププランパー): ${data.theme1_plumper.length}/10`);
  console.log(`- テーマ2 (酵素洗顔・角質ピール): ${data.theme2_wash.length}/10`);
  console.log(`- テーマ3 (静電気防止美髪ミスト): ${data.theme3_mist.length}/10`);
}

supplementBatch19().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
