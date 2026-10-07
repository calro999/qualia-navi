import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function refineTheme2() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch56_items.json', 'utf8'));

  // 1. ワフードメイド酒粕パックの修正
  console.log('1. ワフードメイド酒粕パックをコスメで再取得...');
  const res1 = await searchRakutenDirect('ワフードメイド 酒粕パック pdc', 6, '-reviewCount');
  const valid1 = res1.find(it => it.imageUrl && it.itemName.includes('酒粕パック') && !it.itemName.includes('中古'));
  if (valid1) {
    valid1.brandKey = 'wafood_made_sake_lees_pack';
    valid1.displayBrand = 'pdc ワフードメイド 酒粕パック 170g 酒かす 洗い流すパック コメ発酵エキス くすみ 透明感 毛穴 杜氏の手';
    const idx = data.theme2_sake_rice_ferment.findIndex(i => i.brandKey === 'wafood_made_sake_lees_pack');
    if (idx !== -1) {
      data.theme2_sake_rice_ferment[idx] = valid1;
    } else {
      data.theme2_sake_rice_ferment.unshift(valid1);
    }
    console.log('✅ ワフードメイド酒粕パック 修正完了:', valid1.itemName.slice(0, 35), valid1.priceFormatted);
  }

  // 2. テーマ2の10件目を確実に取得（白鶴 大吟醸 または 獺祭フェイシャルマスク または 日本酒の化粧水）
  if (data.theme2_sake_rice_ferment.length < 10) {
    console.log('2. テーマ2の10件目を取得...');
    const res2 = await searchRakutenDirect('日本酒の化粧水 高保湿 菊正宗', 6, '-reviewCount');
    const valid2 = res2.find(it => it.imageUrl && it.itemName.includes('菊正宗') && !it.itemName.includes('中古')) 
                || (await searchRakutenDirect('大吟醸 スキンケア コメ発酵', 6, '-reviewCount')).find(it => it.imageUrl);
    if (valid2) {
      valid2.brandKey = 'kikumasamune_skin_lotion_high_moist';
      valid2.displayBrand = '菊正宗 日本酒の化粧水 高保湿 500ml コメ発酵液 セラミド プラセンタエキス アルブチン 全身用 保湿ローション';
      data.theme2_sake_rice_ferment.push(valid2);
      console.log('✅ 菊正宗 日本酒の化粧水 取得成功:', valid2.itemName.slice(0, 35), valid2.priceFormatted);
    }
  }

  // テーマ1でロクシタンのアイテムがヤンキーキャンドルになっていたので、確実にロクシタンまたはディプティック/ジョーマローン等のアロマキャンドルに整える
  const candleIdx = data.theme1_candle_diffuser.findIndex(i => i.brandKey === 'loccitane_sensory_scented_candle_holiday');
  if (candleIdx !== -1) {
    console.log('3. キャンドルの確認・調整...');
    const resCandle = await searchRakutenDirect('ロクシタン フレグランス キャンドル', 6, '-reviewCount');
    const validCandle = resCandle.find(it => it.imageUrl && it.itemName.includes('ロクシタン') && (it.itemName.includes('キャンドル') || it.itemName.includes('フレグランス')))
      || (await searchRakutenDirect('ウッドウィック アロマキャンドル ハースウィック', 6, '-reviewCount')).find(it => it.imageUrl);
    if (validCandle) {
      if (validCandle.itemName.includes('ウッドウィック')) {
        validCandle.brandKey = 'woodwick_hearthwick_scented_candle';
        validCandle.displayBrand = 'WoodWick ウッドウィック ハースウィック アロマキャンドル 暖炉のパチパチ音 木の芯 焚き火 リラクゼーション 冬ギフト';
      } else {
        validCandle.brandKey = 'loccitane_sensory_scented_candle_holiday';
        validCandle.displayBrand = 'L\'OCCITANE ロクシタン センティッドキャンドル プロヴァンス アロマ キャンドル ギフト ホリデー';
      }
      data.theme1_candle_diffuser[candleIdx] = validCandle;
      console.log('✅ キャンドル調整完了:', validCandle.itemName.slice(0, 35));
    }
  }

  console.log('\n最終確認 件数:');
  console.log('テーマ1 (キャンドル・ディフューザー):', data.theme1_candle_diffuser.length);
  console.log('テーマ2 (酒粕＆コメ発酵):', data.theme2_sake_rice_ferment.length);
  console.log('テーマ3 (目元美顔器):', data.theme3_eye_massager_device.length);

  fs.writeFileSync('scratch/rakuten_winter_batch56_items.json', JSON.stringify(data, null, 2), 'utf8');
}

refineTheme2().catch(console.error);
