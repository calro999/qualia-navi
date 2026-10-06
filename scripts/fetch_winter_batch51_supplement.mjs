import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchSupplements() {
  console.log('🔄 [不足分補完リクエスト] 楽天OpenAPIから各テーマが確実に10選になるよう追加取得します...');

  const existingData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch51_items.json', 'utf8'));

  // --- テーマ1 補完 (目標10件) ---
  console.log(`\n--- テーマ1 補完 (現在 ${existingData.theme1_patch.length}/10) ---`);
  const patchSupp = [
    { brand: 'miken_deep_patch', name: '北の快適工房 ミケンディープパッチ 8枚入り 眉間専用 高濃度ヒアルロン酸マイクロニードル', query: 'ミケンディープパッチ' },
    { brand: 'dr_derma_needle_patch', name: 'ヒアルロン酸 マイクロパッチ 針美容 目元パック ほうれい線 集中ケア', query: 'マイクロパッチ 目元 ヒアルロン酸' },
    { brand: 'cica_reedle_patch_vt', name: 'VT リードルショット スポットパッチ CICA ツボクサ ニードル', query: 'VT リードルショット パッチ' }
  ];

  for (const cfg of patchSupp) {
    if (existingData.theme1_patch.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !existingData.theme1_patch.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        existingData.theme1_patch.push(valid);
        console.log(`✅ [テーマ1補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2 補完 (目標10件) ---
  console.log(`\n--- テーマ2 補完 (現在 ${existingData.theme2_co2.length}/10) ---`);
  const co2Supp = [
    { brand: 'est_serum_one_carbonic', name: '花王 エスト セラム ワン アドバンスド 90g 医薬部外品 高濃度マイクロ炭酸泡 美容液', query: 'エスト セラム ワン' },
    { brand: 'favorina_nano_aqua_pack', name: 'フェヴリナ 炭酸ジェルパック ナノアクア 炭酸パック 毛穴 キメ', query: 'ナノアクア 炭酸パック' },
    { brand: 'obagi_x_carbonic_foam', name: 'オバジX フレームリフト ムースウォッシュ 150g または 炭酸泡 エッセンス', query: 'オバジX ムースウォッシュ' },
    { brand: 'drcilabo_vc100_milk_peel', name: 'ドクターシーラボ VC100 ホットピール クレンジングゲル 炭酸 温感', query: 'VC100 ホットピール クレンジングゲル' }
  ];

  for (const cfg of co2Supp) {
    if (existingData.theme2_co2.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !existingData.theme2_co2.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        existingData.theme2_co2.push(valid);
        console.log(`✅ [テーマ2補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3 補完 (目標10件) ---
  console.log(`\n--- テーマ3 補完 (現在 ${existingData.theme3_ccbb.length}/10) ---`);
  const ccbbSupp = [
    { brand: 'lancome_uv_expert_bb', name: 'ランコム UV エクスペール BB 30ml 最高峰プロテクション 高保湿美容液BB', query: 'ランコム エクスペール BB' },
    { brand: 'dprogram_allerbarrier_bb', name: '資生堂 dプログラム アレルバリア エッセンス BB 30ml 敏感肌用 うるおいバリア', query: 'dプログラム アレルバリア BB' },
    { brand: 'maquillage_nude_jelly_bb', name: '資生堂 マキアージュ ドラマティック ヌードジェリー BB 30g マスクにつきにくい 美容液ジェリー', query: 'マキアージュ ドラマティック ヌードジェリー BB' },
    { brand: 'kanebo_freshel_bb_cream', name: 'カネボウ フレッシェル スキンケアBBクリーム モイスト 50g 高保湿 うるおい浸透', query: 'フレッシェル BBクリーム モイスト' }
  ];

  for (const cfg of ccbbSupp) {
    if (existingData.theme3_ccbb.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !existingData.theme3_ccbb.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        existingData.theme3_ccbb.push(valid);
        console.log(`✅ [テーマ3補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 補完後の最終アイテム数:`);
  console.log(`- テーマ1: ${existingData.theme1_patch.length}/10`);
  console.log(`- テーマ2: ${existingData.theme2_co2.length}/10`);
  console.log(`- テーマ3: ${existingData.theme3_ccbb.length}/10`);

  fs.writeFileSync('scratch/rakuten_winter_batch51_items.json', JSON.stringify(existingData, null, 2), 'utf8');
  console.log('💾 更新を scratch/rakuten_winter_batch51_items.json に保存しました！');
}

fetchSupplements().catch(err => {
  console.error('補完エラー:', err);
  process.exit(1);
});
