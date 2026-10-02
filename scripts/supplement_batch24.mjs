import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch24() {
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch24_items.json', 'utf8'));

  // 1. ヘパトリート補充
  if (current.theme1_heparin.length < 10) {
    console.log('テーマ1 補充検索: ヘパトリート...');
    const res = await searchRakutenDirect('ヘパトリート', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'hepatreat_medicated_lotion';
      valid.displayBrand = 'ヘパトリート 薬用保湿化粧水 医薬部外品';
      current.theme1_heparin.push(valid);
      console.log('✅ ヘパトリート 追加成功:', valid.itemName.slice(0, 30));
    }
  }

  // 2. 炭酸泡パック補充（2件）
  if (current.theme2_carbonic.length < 10) {
    console.log('テーマ2 補充検索1: 炭酸パック ソーダ...');
    const res1 = await searchRakutenDirect('炭酸パック フェイスマスク', 6, '-reviewCount');
    const valid1 = res1.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid1) {
      valid1.brandKey = 'sparkling_soda_pack_gel';
      valid1.displayBrand = '高濃度 炭酸ガスパック ジェル フェイスマスク';
      current.theme2_carbonic.push(valid1);
      console.log('✅ 炭酸パック1 追加成功:', valid1.itemName.slice(0, 30));
    }
    await sleep(1300);

    console.log('テーマ2 補充検索2: カネボウ 洗顔...');
    const res2 = await searchRakutenDirect('カネボウ コンフォート ストレッチィ ウォッシュ', 6, '-reviewCount');
    const valid2 = res2.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid2) {
      valid2.brandKey = 'kanebo_comfort_stretchy_wash';
      valid2.displayBrand = 'KANEBO カネボウ コンフォート ストレッチィ ウォッシュ 濃密糸引き泡洗顔';
      current.theme2_carbonic.push(valid2);
      console.log('✅ カネボウ濃密泡洗顔 追加成功:', valid2.itemName.slice(0, 30));
    }
  }

  // 3. ティントリップバーム補充（1件: オペラ）
  if (current.theme3_lipbalm.length < 10) {
    console.log('テーマ3 補充検索: オペラ リップティント...');
    const res = await searchRakutenDirect('オペラ リップティント', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'opera_lip_tint_rouge';
      valid.displayBrand = 'OPERA オペラ リップティント N 美発色ルージュ';
      current.theme3_lipbalm.push(valid);
      console.log('✅ オペラ 追加成功:', valid.itemName.slice(0, 30));
    }
  }

  fs.writeFileSync('scratch/rakuten_winter_batch24_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log(`\n🎉 補充後アイテム数:
- テーマ1 (ヘパリン＆ワセリン): ${current.theme1_heparin.length}/10
- テーマ2 (炭酸泡パック＆土台美容液): ${current.theme2_carbonic.length}/10
- テーマ3 (ティントリップバーム): ${current.theme3_lipbalm.length}/10`);
}

supplementBatch24().catch(console.error);
