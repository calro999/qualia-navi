import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixAndSupplementBatch47() {
  console.log('🔧 [11-12月冬コスメ 第47弾] 欠損・不整合アイテムを補充＆精査取得します...');
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch47_items.json', 'utf8'));

  // --- テーマ1の不足分＆確認 ---
  // 現在取得済み: vt_pdrn_essence_100, rejuran_dual_effect_ampoule, medicube_pdrn_pink_peptide_ampoule, anua_pdrn_hyaluronic_capsule_serum, cnp_laboratory_pdrn_derma_serum, dr_althea_pdrn_skin_repair_essence, kiso_pdrn_serum (7件有効。IOPEはビタミンC混入のため差し替え)
  
  const pdrnFixConfigs = [
    { brand: 'genabelle_pdrn_rejuvenating_ampoule', name: 'GENABELLE ジェナベル PDRN リジュビネイティング アンプル 30ml サーモンDNA高含有 肌再生クリニック処方', query: 'ジェナベル PDRN アンプル' },
    { brand: 'derma_laser_pdrn_serum', name: 'クオリティファースト ダーマレーザー ウルセラPDRN 美容液 30ml サーモンDNA×ナイアシンアミド 集中浸透', query: 'クオリティファースト PDRN' },
    { brand: 'medipeel_pdrn_salmon_ampoule', name: 'MEDI-PEEL メディピール プロPDRN サーモン アンプル 30ml 濃密コラーゲンペプチド エイジングケア', query: 'メディピール PDRN' },
    { brand: 'iope_pdrn_caffeine_shot_pure', name: 'IOPE アイオペ バイオ PDRN カフェインショット 50ml 肌引き締め ハリ・フェイスライン集中ケア', query: 'IOPE カフェインショット' }
  ];

  const validTheme1 = current.theme1_pdrn.filter(it => it.brandKey !== 'iope_pdrn_caffeine_shot');
  for (const cfg of pdrnFixConfigs) {
    if (validTheme1.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        validTheme1.push(valid);
        console.log(`✅ テーマ1追加 [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3の不足分＆確認 ---
  // 現在取得済み: elixir, decorte, innisfree, kiso, d_program (toutvertはふるさと納税のため通常版に差し替え)
  const eyeFixConfigs = [
    { brand: 'sana_nameraka_wrinkle_eye_cream', name: 'サナ なめらか本舗 リンクルアイクリーム N 20g 豆乳イソフラボン×ピュアレチノール 目元乾燥小じわふっくら', query: 'なめらか本舗 リンクルアイクリーム' },
    { brand: 'vt_cica_retia_essence', name: 'VT ブイティー シカレチA エッセンス 0.1 30ml CICA×純粋レチノール 毛穴・目元キメ弾力アプローチ', query: 'VT シカレチA エッセンス 30ml' },
    { brand: 'toutvert_retinoshot_cream_regular', name: 'TOUT VERT トゥヴェール レチノショット 0.1 30g ピュアレチノール高濃度配合 ハリ・弾力特化ナイトクリーム', query: 'トゥヴェール レチノショット 0.1' },
    { brand: 'haruharu_wonder_bakuchiol_eye_cream', name: 'Haruharu WONDER ハルハルワンダー 黒米 バクチオール アイセラム 20ml 次世代レチノール 目元弾力・クマ', query: 'ハルハルワンダー バクチオール' },
    { brand: 'kracie_hadabisei_wrinkle_eye_cream', name: 'クラシエ 肌美精 ONE リンクルケア 濃密潤い美容液 目元・口元用 30ml レチノールエラスチン高保湿', query: '肌美精 ONE リンクルケア 目もと' },
    { brand: 'dr_ci_labo_enrich_lift_eye_ex', name: 'ドクターシーラボ エンリッチリフト アイクリームEX 15g 濃厚コラーゲン ナイアシンアミド 目元引き締めピン', query: 'シーラボ エンリッチリフト アイクリーム' }
  ];

  const validTheme3 = current.theme3_eye.filter(it => it.brandKey !== 'toutvert_retinoshot_cream');
  for (const cfg of eyeFixConfigs) {
    if (validTheme3.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり') && !it.itemName.includes('ふるさと納税'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        validTheme3.push(valid);
        console.log(`✅ テーマ3追加 [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  current.theme1_pdrn = validTheme1.slice(0, 10);
  current.theme2_lip = current.theme2_lip.slice(0, 10);
  current.theme3_eye = validTheme3.slice(0, 10);

  console.log(`\n最終確定件数: テーマ1(PDRN)=${current.theme1_pdrn.length}件, テーマ2(リップ)=${current.theme2_lip.length}件, テーマ3(アイクリーム)=${current.theme3_eye.length}件`);
  fs.writeFileSync('scratch/rakuten_winter_batch47_items.json', JSON.stringify(current, null, 2), 'utf8');
}

fixAndSupplementBatch47().catch(console.error);
