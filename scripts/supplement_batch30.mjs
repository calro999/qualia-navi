import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch30() {
  console.log('🔄 楽天APIから不足アイテムを補充取得します...');
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch30_items.json', 'utf8'));

  // テーマ1: あと2件必要 (現在8件)
  const curlerSupQueries = [
    { brand: 'panasonic_matsuge_kurun_tsukema', name: 'Panasonic パナソニック まつげくるん つけまつげ用 EH-SE70', query: 'パナソニック まつげくるん EH-SE70' },
    { brand: 'rechargeable_electric_lash_curler_clip', name: 'クリップ式 ホットビューラー 充電式 まつ毛カーラー', query: 'ホットビューラー 充電式 クリップ' },
    { brand: 'usb_electric_lash_curler_stand', name: 'ホットビューラー USB充電式 快速予熱 まつ毛カーラー', query: 'ホットビューラー USB充電式' }
  ];

  for (const cfg of curlerSupQueries) {
    if (data.theme1_curler.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme1_curler.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_curler.push(valid);
        console.log(`✅ [テーマ1補充] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // テーマ2: あと2件必要 (現在8件)
  const primerSupQueries = [
    { brand: 'urban_decay_eyeshadow_primer_potion', name: 'URBAN DECAY アーバンディケイ アイシャドウ プライマー ポーション', query: 'アーバンディケイ アイシャドウ プライマー' },
    { brand: 'canmake_eye_color_primer_pearl', name: 'キャンメイク アイカラー プライマー / ベース', query: 'キャンメイク アイカラー プライマー' },
    { brand: 'excel_eye_shadow_base_moist', name: 'エクセル スキニーリッチ / アイシャドウベース 目元保湿下地', query: 'エクセル アイシャドウベース' },
    { brand: 'cezanne_eye_make_base', name: 'CEZANNE セザンヌ アイメイクベース 目元用密着下地', query: 'セザンヌ アイメイクベース' }
  ];

  for (const cfg of primerSupQueries) {
    if (data.theme2_primer.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme2_primer.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_primer.push(valid);
        console.log(`✅ [テーマ2補充] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // テーマ3: あと3件必要 (現在7件)
  const patchSupQueries = [
    { brand: 'kitano_miken_deep_patch', name: '北の快適工房 ミケンディープパッチ 眉間用マイクロニードル', query: 'ミケンディープパッチ' },
    { brand: 'kitano_odeko_deep_patch', name: '北の快適工房 オデコディープパッチ 額用マイクロニードル', query: 'オデコディープパッチ' },
    { brand: 'hyaluronic_acid_micro_needle_eye_patch', name: 'マイクロニードル ヒアルロン酸 パッチ 目元用 針シート', query: 'マイクロニードル パッチ 目元' },
    { brand: 'quanis_dermafiller_target', name: 'クオニス ダーマフィラー 目元口元用 マイクロニードル 針美容', query: 'クオニス ダーマフィラー' }
  ];

  for (const cfg of patchSupQueries) {
    if (data.theme3_patch.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme3_patch.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_patch.push(valid);
        console.log(`✅ [テーマ3補充] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch30_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補充完了！最終アイテム数:`);
  console.log(`- ホットビューラー: ${data.theme1_curler.length}件`);
  console.log(`- アイシャドウベース: ${primerItemsCount(data)}件`);
  console.log(`- ニードルパッチ: ${patchItemsCount(data)}件`);
}

function primerItemsCount(data) { return data.theme2_primer.length; }
function patchItemsCount(data) { return data.theme3_patch.length; }

supplementBatch30().catch(err => {
  console.error(err);
  process.exit(1);
});
