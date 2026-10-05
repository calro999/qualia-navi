import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch45Items() {
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch45_items.json', 'utf8'));

  // テーマ1: 9と10を差し替え
  console.log('--- テーマ1 高額セットを単品人気コスメに差し替え ---');
  // 9: ドクターペプチ
  const rDrPepti = await searchRakutenDirect('ドクターペプチ ペプチド ボリューム マスター エッセンス', 3);
  const vDrPepti = rDrPepti.find(x => x.imageUrl && x.itemPrice > 0 && !x.itemName.includes('中古'));
  if (vDrPepti) {
    vDrPepti.brandKey = 'dr_pepti_peptide_volume_master_essence';
    vDrPepti.displayBrand = 'DR.PEPTI ドクターペプチ ペプチド ボリューム マスター エッセンス 105ml 濃密バブル酸素ペプチド ハリツヤ';
    current.theme1_microneedle[8] = vDrPepti;
    console.log(`✅ [T1-9差替] ドクターペプチ: ${vDrPepti.itemName.slice(0, 35)} (${vDrPepti.priceFormatted})`);
  }
  await sleep(1300);

  // 10: TGセラム マイクロニードルクリーム スピキュール
  const rTg = await searchRakutenDirect('TGセラム マイクロニードルクリーム スピキュール', 3);
  const vTg = rTg.find(x => x.imageUrl && x.itemPrice > 0 && !x.itemName.includes('中古'));
  if (vTg) {
    vTg.brandKey = 'tg_serum_microneedle_cream_spicule';
    vTg.displayBrand = 'TGセラム マイクロニードルクリーム スピキュール 塗る針エステ 天然微細針 15g ハリツヤ集中';
    current.theme1_microneedle[9] = vTg;
    console.log(`✅ [T1-10差替] TGセラム: ${vTg.itemName.slice(0, 35)} (${vTg.priceFormatted})`);
  }
  await sleep(1300);

  // テーマ2: 4のエリクシールふるさと納税を通常品に差し替え
  console.log('--- テーマ2 エリクシール通常品に差し替え ---');
  const rElixir = await searchRakutenDirect('資生堂 エリクシール リフトモイスト エマルジョン SP II', 5);
  const vElixir = rElixir.find(x => x.imageUrl && x.itemPrice > 0 && !x.itemName.includes('ふるさと納税') && !x.itemName.includes('中古'));
  if (vElixir) {
    vElixir.brandKey = 'elixir_lift_moist_emulsion_sp';
    vElixir.displayBrand = 'ELIXIR エリクシール シュペリエル リフトモイスト エマルジョン SP II 130ml 薬用高保湿乳液 つや玉';
    current.theme2_emulsion[3] = vElixir;
    console.log(`✅ [T2-4差替] エリクシール通常品: ${vElixir.itemName.slice(0, 35)} (${vElixir.priceFormatted})`);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch45_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log('🎉 差し替え完了！');
}

refineBatch45Items().catch(console.error);
