import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch28() {
  const batch28 = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch28_items.json', 'utf8'));

  // テーマ1: 不足5件を補完
  console.log('=== テーマ1 補完 (目標 10件) ===');
  const t1Extra = [
    { brand: 'bambi_water_style_gel', name: 'BAMBI WATER バンビウォーター スタイルジェル / 温感レッグ', query: 'バンビウォーター' },
    { brand: 'melvita_lor_rose_oil', name: 'Melvita メルヴィータ ロルロズ ピンクフィット ボディオイル', query: 'メルヴィータ ロルロズ' },
    { brand: 'ayura_bicassa_plate_body', name: 'AYURA アユーラ ビカッサボディーセラム / アユーラ ボディ', query: 'アユーラ ビカッサ' },
    { brand: 'the_body_shop_spa_warm', name: 'THE BODY SHOP ザ・ボディショップ スパ スパオブザワールド / マッサージオイル', query: 'ボディショップ マッサージオイル' },
    { brand: 'dr_scholl_medi_qtto_warming', name: 'ドクターショール メディキュット 温感タイツ / 温熱ケア', query: '温感 マッサージジェル' },
    { brand: 'seven_break_gel_extra', name: 'クラランス クレーム マスヴェルト 200ml マッサージクリーム', query: 'クラランス マスヴェルト' },
    { brand: 'ilcorpo_body_shine_gel', name: 'イルコルポ ミネラルボディシャインジェル', query: 'イルコルポ' }
  ];

  for (const cfg of t1Extra) {
    if (batch28.theme1_warmingbody.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !batch28.theme1_warmingbody.some(b => b.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        batch28.theme1_warmingbody.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ スキップまたは未発見: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ2: 不足2件を補完
  console.log('\n=== テーマ2 補完 (目標 10件) ===');
  const t2Extra = [
    { brand: 'the_body_shop_shea_scrub', name: 'THE BODY SHOP ザ・ボディショップ ボディスクラブ シア 250ml', query: 'ボディショップ ボディスクラブ' },
    { brand: 'jillstuart_body_scrub_white_floral', name: 'JILL STUART ジルスチュアート ボディスクラブ ホワイトフローラル', query: 'ジルスチュアート ボディスクラブ' },
    { brand: 'innisfree_body_scrub_green_tea', name: 'innisfree イニスフリー グリーンティー ボディスクラブ', query: 'イニスフリー ボディスクラブ' },
    { brand: 'marks_and_web_herbal_scrub', name: 'MARKS&WEB マークスアンドウェブ ハーバルスクラブ ソルト/シュガー', query: 'マークスアンドウェブ ハーバルスクラブ' }
  ];

  for (const cfg of t2Extra) {
    if (batch28.theme2_sugarscrub.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !batch28.theme2_sugarscrub.some(b => b.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        batch28.theme2_sugarscrub.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ スキップまたは未発見: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ3: 不足1件を補完
  console.log('\n=== テーマ3 補完 (目標 10件) ===');
  const t3Extra = [
    { brand: 'peripera_ink_v_shading', name: 'peripera ペリペラ インク V シェーディング', query: 'ペリペラ シェーディング' },
    { brand: 'etude_contour_powder', name: 'ETUDE エチュード コントゥアパウダー クリエイター', query: 'エチュード コントゥアパウダー' },
    { brand: 'clio_shading_palette', name: 'CLIO クリオ シェーディング パレット', query: 'クリオ シェーディング' }
  ];

  for (const cfg of t3Extra) {
    if (batch28.theme3_shading.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !batch28.theme3_shading.some(b => b.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        batch28.theme3_shading.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ スキップまたは未発見: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 補完後の合計件数:`);
  console.log(`- 温感ボディマッサージ: ${batch28.theme1_warmingbody.length}/10`);
  console.log(`- スクラブ: ${batch28.theme2_sugarscrub.length}/10`);
  console.log(`- シェーディング: ${batch28.theme3_shading.length}/10`);

  fs.writeFileSync('scratch/rakuten_winter_batch28_items.json', JSON.stringify(batch28, null, 2), 'utf8');
}

supplementBatch28().catch(console.error);
