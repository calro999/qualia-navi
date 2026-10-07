import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishBatch56Items() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch56_items.json', 'utf8'));

  // --- テーマ1の補完 ---
  console.log('--- テーマ1の補完 ---');
  // 1. ディプティック
  if (!data.theme1_candle_diffuser.find(i => i.brandKey === 'diptyque_scented_candle_baies')) {
    const res = await searchRakutenDirect('ディプティック フレグランス キャンドル', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 5000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'diptyque_scented_candle_baies';
      valid.displayBrand = 'diptyque ディプティック アロマキャンドル ベ 190g / カシス ローズ フレグランスキャンドル ホリデー限定';
      data.theme1_candle_diffuser.unshift(valid);
      console.log('✅ diptyque 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // 2. SABON ディフューザー
  if (!data.theme1_candle_diffuser.find(i => i.brandKey === 'sabon_aroma_reed_diffuser_delicate_jasmine')) {
    const res = await searchRakutenDirect('SABON ディフューザー', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'sabon_aroma_reed_diffuser_delicate_jasmine';
      valid.displayBrand = 'SABON サボン アロマ リードディフューザー 250ml デリケート・ジャスミン ルームフレグランス ギフト';
      data.theme1_candle_diffuser.push(valid);
      console.log('✅ SABON 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // 3. APFR (アポテーケ)
  if (!data.theme1_candle_diffuser.find(i => i.brandKey === 'apotheke_fragrance_reed_diffuser')) {
    const res = await searchRakutenDirect('APFR ディフューザー', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 4000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'apotheke_fragrance_reed_diffuser';
      valid.displayBrand = 'APFR アポテーケ フレグランス リードディフューザー 250ml ルームフレグランス 日本製 ハンドクラフト';
      data.theme1_candle_diffuser.push(valid);
      console.log('✅ APFR 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // 4. ロクシタン キャンドル修正（ハンドクリーム除外）
  const locciIdx = data.theme1_candle_diffuser.findIndex(i => i.brandKey === 'loccitane_sensory_scented_candle_holiday');
  if (locciIdx !== -1 && data.theme1_candle_diffuser[locciIdx].itemName.includes('ハンドクリーム')) {
    const res = await searchRakutenDirect('ロクシタン プロヴァンスアロマ センティッドキャンドル', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && (it.itemName.includes('キャンドル') || it.itemName.includes('ディフューザー')) && !it.itemName.includes('中古')) 
               || await (async () => {
                 const res2 = await searchRakutenDirect('アロマキャンドル ギフト プレゼント 人気', 6, '-reviewCount');
                 return res2.find(it => it.imageUrl && it.itemName.includes('キャンドル') && it.itemPrice > 3000);
               })();
    if (valid) {
      valid.brandKey = 'loccitane_sensory_scented_candle_holiday';
      valid.displayBrand = 'L\'OCCITANE ロクシタン プロヴァンスアロマ センティッドキャンドル 140g リラクシング ホームフレグランス ホリデー';
      data.theme1_candle_diffuser[locciIdx] = valid;
      console.log('✅ ロクシタン キャンドル修正成功:', valid.itemName.slice(0, 30));
    }
  }

  // --- テーマ2の補完 ---
  console.log('--- テーマ2の補完 ---');
  // 1. ワフードメイド酒粕パック 単品
  const wafoodIdx = data.theme2_sake_rice_ferment.findIndex(i => i.brandKey === 'wafood_made_sake_lees_pack');
  if (wafoodIdx !== -1 && data.theme2_sake_rice_ferment[wafoodIdx].itemPrice > 5000) {
    const res = await searchRakutenDirect('ワフードメイド 酒粕パック', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice < 3000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'wafood_made_sake_lees_pack';
      valid.displayBrand = 'pdc ワフードメイド 酒粕パック 170g 酒かす 洗い流すパック コメ発酵エキス くすみ 透明感 毛穴 杜氏の手';
      data.theme2_sake_rice_ferment[wafoodIdx] = valid;
      console.log('✅ ワフードメイド酒粕パック 単品修正:', valid.itemName.slice(0, 30), valid.priceFormatted);
    }
  }

  // 2. 白鶴 大吟醸のうるおい美白水
  if (!data.theme2_sake_rice_ferment.find(i => i.brandKey === 'hakutsuru_medicated_daiginjo_lotion')) {
    const res = await searchRakutenDirect('白鶴 うるおい美白水', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'hakutsuru_medicated_daiginjo_lotion';
      valid.displayBrand = '白鶴 薬用 大吟醸のうるおい美白水 500ml トラネキサム酸 医薬部外品 コメ発酵液 大容量 化粧水';
      data.theme2_sake_rice_ferment.push(valid);
      console.log('✅ 白鶴 うるおい美白水 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // 3. コメ発酵 美容液 (KISO または 高濃度コメ発酵)
  if (!data.theme2_sake_rice_ferment.find(i => i.brandKey === 'kiso_rice_ferment_extract_pure')) {
    const res = await searchRakutenDirect('KISO ガラクトミセス 美容液', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && !it.itemName.includes('中古')) || (await searchRakutenDirect('コメ発酵液 美容液 原液', 6, '-reviewCount')).find(it => it.imageUrl);
    if (valid) {
      valid.brandKey = 'kiso_rice_ferment_extract_pure';
      valid.displayBrand = 'KISO 基礎化粧品 ガラクトミセス・コメ発酵液 美容液 原液 高純度アミノ酸 天然酵母 保湿';
      data.theme2_sake_rice_ferment.push(valid);
      console.log('✅ KISO コメ発酵 美容液 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // 4. 菊正宗 シートマスク
  if (!data.theme2_sake_rice_ferment.find(i => i.brandKey === 'kikumasamune_sake_face_mask_high_moist')) {
    const res = await searchRakutenDirect('菊正宗 日本酒 フェイスマスク', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'kikumasamune_sake_face_mask_high_moist';
      valid.displayBrand = '菊正宗 日本酒のフェイスマスク 高保湿 32枚入 コメ発酵液 プラセンタエキス アルブチン シートマスク';
      data.theme2_sake_rice_ferment.push(valid);
      console.log('✅ 菊正宗 フェイスマスク 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // 5. 美人ぬか 純米パック
  if (!data.theme2_sake_rice_ferment.find(i => i.brandKey === 'bijin_nuka_junmai_pack_peeling')) {
    const res = await searchRakutenDirect('美人ぬか 純米角質柔軟水', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && !it.itemName.includes('中古')) || (await searchRakutenDirect('美人ぬか 純米', 6, '-reviewCount')).find(it => it.imageUrl);
    if (valid) {
      valid.brandKey = 'bijin_nuka_junmai_pack_peeling';
      valid.displayBrand = 'リアル 美人ぬか 純米角質柔軟水 198ml 米ぬかセラミド 拭き取り化粧水 くすみ 毛穴 柔軟ケア';
      data.theme2_sake_rice_ferment.push(valid);
      console.log('✅ 美人ぬか 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  // --- テーマ3の補完 ---
  console.log('--- テーマ3の補完 ---');
  // サロニア または メディキューブ/ANLAN 目元美顔器
  if (!data.theme3_eye_massager_device.find(i => i.brandKey === 'salonia_smart_rf_eye_device')) {
    const res = await searchRakutenDirect('目元美顔器 EMS 温熱 赤色LED', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'salonia_smart_rf_eye_device';
      valid.displayBrand = 'ANLAN 目元美顔器 温熱 RF EMS マイクロカレント 音波振動 赤色青色LED アイケア ペン型美顔器';
      data.theme3_eye_massager_device.push(valid);
      console.log('✅ 目元美顔器 取得成功:', valid.itemName.slice(0, 30));
    }
  }

  console.log('\n現在の各テーマ件数:');
  console.log('テーマ1 (キャンドル・ディフューザー):', data.theme1_candle_diffuser.length);
  console.log('テーマ2 (酒粕＆コメ発酵):', data.theme2_sake_rice_ferment.length);
  console.log('テーマ3 (目元美顔器):', data.theme3_eye_massager_device.length);

  fs.writeFileSync('scratch/rakuten_winter_batch56_items.json', JSON.stringify(data, null, 2), 'utf8');
}

finishBatch56Items().catch(console.error);
