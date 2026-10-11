import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch81() {
  console.log('🔧 [第81弾 補完] 未取得の3アイテムを楽天OpenAPIから再取得します...');
  const jsonPath = 'scratch/rakuten_winter_batch81_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. クレ・ド・ポー ボーテ ル・レオスールデクラ
  try {
    const resCpb = await searchRakutenDirect('クレドポーボーテ レオスールデクラ', 6, '-reviewCount');
    const validCpb = resCpb.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古'));
    if (validCpb) {
      validCpb.brandKey = 'cle_de_peau_le_rehausseur_declat';
      validCpb.displayBrand = 'クレ・ド・ポー ボーテ ル・レオスールデクラ フェイスカラー ハイライト パウダー 資生堂';
      data.theme1_radiant_glow_highlighter.splice(3, 0, validCpb);
      console.log(`✅ [cle_de_peau_le_rehausseur_declat] 補完完了: ${validCpb.itemName.slice(0, 35)} (${validCpb.priceFormatted})`);
    }
  } catch (e) {
    console.error('クレドポー取得エラー:', e.message);
  }
  await sleep(1500);

  // 2. アディクション ザ グロウ スティック
  try {
    const resAdd = await searchRakutenDirect('アディクション ザグロウスティック', 6, '-reviewCount');
    const validAdd = resAdd.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古')) ||
                     (await searchRakutenDirect('アディクション ハイライト', 6, '-reviewCount')).find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古'));
    if (validAdd) {
      validAdd.brandKey = 'addiction_the_glow_stick';
      validAdd.displayBrand = 'アディクション ADDICTION ザ グロウスティック ハイライト スティック 濡れツヤ 超高密着';
      data.theme1_radiant_glow_highlighter.push(validAdd);
      console.log(`✅ [addiction_the_glow_stick] 補完完了: ${validAdd.itemName.slice(0, 35)} (${validAdd.priceFormatted})`);
    }
  } catch (e) {
    console.error('アディクション取得エラー:', e.message);
  }
  await sleep(1500);

  // 3. ナプラ N. または フジコ 色っぽスティック または アホ毛スティック
  try {
    const resHair = await searchRakutenDirect('フジコ 色っぽスティック', 6, '-reviewCount');
    let validHair = resHair.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古'));
    if (!validHair) {
      const resAlt = await searchRakutenDirect('アホ毛 スティック', 6, '-reviewCount');
      validHair = resAlt.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.theme2_hair_point_repair_stick.some(e => e.itemCode === it.itemCode));
    }
    if (validHair) {
      validHair.brandKey = 'fujiko_iroppo_stick';
      validHair.displayBrand = 'Fujiko フジコ 色っぽスティック コーム型 ヘアワックス アホ毛 浮き毛 ツヤ出し';
      data.theme2_hair_point_repair_stick.splice(7, 0, validHair);
      console.log(`✅ [fujiko_iroppo_stick] 補完完了: ${validHair.itemName.slice(0, 35)} (${validHair.priceFormatted})`);
    }
  } catch (e) {
    console.error('ヘアスティック補完エラー:', e.message);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`🎉 補完完了！各テーマ件数:
- テーマ1: ${data.theme1_radiant_glow_highlighter.length}件
- テーマ2: ${data.theme2_hair_point_repair_stick.length}件
- テーマ3: ${data.theme3_lavender_pink_color_primer.length}件`);
}

fillMissingBatch81().catch(e => {
  console.error(e);
  process.exit(1);
});
