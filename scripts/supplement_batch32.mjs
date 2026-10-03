import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function supplementBatch32() {
  console.log('🔄 テーマ1とテーマ3の不足各1件を楽天APIから補完取得します...');
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch32_items.json', 'utf8'));

  // 1. アドベントカレンダー補充: イヴ・サンローラン ホリデー / YSL
  if (data.theme1_advent.length < 10) {
    console.log('テーマ1の補充取得中...');
    const res1 = await searchRakutenDirect('イヴサンローラン ホリデー コフレ', 6, '-reviewCount');
    const valid1 = res1.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
    if (valid1) {
      valid1.brandKey = 'ysl_holiday_advent_coffret';
      valid1.displayBrand = 'YSL イヴ・サンローラン ホリデー コレクション コフレ / アドベントギフト';
      data.theme1_advent.push(valid1);
      console.log(`✅ [ysl_holiday] ${valid1.itemName.slice(0, 35)} (${valid1.priceFormatted})`);
    } else {
      // 代替: シュウウエムラ ホリデー コフレ
      const res1alt = await searchRakutenDirect('シュウウエムラ ホリデー コフレ', 6, '-reviewCount');
      const valid1alt = res1alt.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
      if (valid1alt) {
        valid1alt.brandKey = 'shu_uemura_holiday_coffret';
        valid1alt.displayBrand = 'shu uemura シュウ ウエムラ ホリデー コレクション 限定コフレ';
        data.theme1_advent.push(valid1alt);
        console.log(`✅ [shu_uemura] ${valid1alt.itemName.slice(0, 35)} (${valid1alt.priceFormatted})`);
      }
    }
  }

  // 2. ベルベットマットリップ補充: peripera ペリペラ インク ベルベット
  if (data.theme3_velvet_lip.length < 10) {
    console.log('テーマ3の補充取得中...');
    const res3 = await searchRakutenDirect('ペリペラ インクベルベット', 6, '-reviewCount');
    const valid3 = res3.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
    if (valid3) {
      valid3.brandKey = 'peripera_ink_velvet_matte_lip';
      valid3.displayBrand = 'peripera ペリペラ インク ベルベット リップティント';
      data.theme3_velvet_lip.push(valid3);
      console.log(`✅ [peripera_ink_velvet] ${valid3.itemName.slice(0, 35)} (${valid3.priceFormatted})`);
    }
  }

  fs.writeFileSync('scratch/rakuten_winter_batch32_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！`);
  console.log(`- テーマ1 (アドベントカレンダー): ${data.theme1_advent.length}件`);
  console.log(`- テーマ2 (カラーコントロール下地): ${data.theme2_color_correct.length}件`);
  console.log(`- テーマ3 (ベルベットマットリップ): ${data.theme3_velvet_lip.length}件`);
}

supplementBatch32().catch(err => {
  console.error('エラー:', err);
  process.exit(1);
});
