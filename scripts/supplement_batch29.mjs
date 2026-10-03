import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplement() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch29_items.json', 'utf8'));

  // テーマ1: 1品補充 (CipiCipiグリッターライナー または ミュード)
  console.log('\n--- テーマ1 補充 ---');
  const aegyoQuery = [
    { brand: 'cipicipi_glitter_liner', name: 'CipiCipi シピシピ グリッターイルミネーションライナー R', query: 'シピシピ グリッター イルミネーションライナー' },
    { brand: 'mude_glace_lip_tint_or_pencil', name: 'mude ミュード ドリーミーモーメント アイシャドウスティック 涙袋', query: 'ミュード 涙袋' }
  ];
  for (const cfg of aegyoQuery) {
    if (data.theme1_aegyosal.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme1_aegyosal.push(valid);
      console.log(`✅ [テーマ1補充] ${valid.itemName.slice(0, 35)}`);
    }
    await sleep(1300);
  }

  // テーマ2: 2品補充 (ヒロインメイク マスカラ下地、マジョリカマジョルカ ラッシュセラムカーラー)
  console.log('\n--- テーマ2 補充 ---');
  const lashQuery = [
    { brand: 'heroine_make_curl_keep_mascara_base', name: 'ヒロインメイク カールキープ マスカラベース クリア', query: 'ヒロインメイク カールキープ マスカラベース' },
    { brand: 'majolica_majorca_lash_serum_curler', name: 'マジョリカ マジョルカ ラッシュセラムカーラー マスカラ下地', query: 'マジョリカマジョルカ ラッシュセラムカーラー' },
    { brand: 'clio_kill_lash_superproof', name: 'CLIO クリオ キルラッシュ スーパープルーフ マスカラ', query: 'クリオ キルラッシュ マスカラ' }
  ];
  for (const cfg of lashQuery) {
    if (data.theme2_lashcoating.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme2_lashcoating.push(valid);
      console.log(`✅ [テーマ2補充] ${valid.itemName.slice(0, 35)}`);
    }
    await sleep(1300);
  }

  // テーマ3: キャンメイクの誤検知を削除して4品補充
  console.log('\n--- テーマ3 補充 ---');
  // トゥインクルジュエリープランパーを除外
  data.theme3_lipliner = data.theme3_lipliner.filter(it => !it.itemName.includes('プランパー'));
  console.log(`テーマ3のクリーンアップ後件数: ${data.theme3_lipliner.length}`);

  const lipQueries = [
    { brand: 'integrate_lip_forming_liner', name: 'インテグレート リップフォルミングライナー くり出し式', query: 'インテグレート リップフォルミングライナー' },
    { brand: 'chifure_lip_liner', name: 'ちふれ リップ ライナー くり出し式', query: 'ちふれ リップ ライナー' },
    { brand: 'cezanne_lip_color_shield_or_liner', name: 'セザンヌ ライナー リップ', query: 'セザンヌ リップライナー' },
    { brand: 'rimmel_lasting_finish_lip_liner', name: 'リンメル ラスティングフィニッシュ リップライナー', query: 'リンメル リップライナー' },
    { brand: 'visee_avant_lip_eye_pencil', name: 'ヴィセ アヴァン リップ＆アイカラー ペンシル', query: 'ヴィセ アヴァン リップ＆アイカラー ペンシル' },
    { brand: 'dior_contour_lip_liner', name: 'Dior ディオール コントゥール リップライナー ペンシル', query: 'ディオール コントゥール' },
    { brand: 'kate_lip_monster', name: 'KATE ケイト リップモンスター', query: 'ケイト リップモンスター' }
  ];
  for (const cfg of lipQueries) {
    if (data.theme3_lipliner.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme3_lipliner.push(valid);
      console.log(`✅ [テーマ3補充] ${valid.itemName.slice(0, 35)}`);
    }
    await sleep(1300);
  }

  // それぞれ10個ちょうどにトリム
  data.theme1_aegyosal = data.theme1_aegyosal.slice(0, 10);
  data.theme2_lashcoating = data.theme2_lashcoating.slice(0, 10);
  data.theme3_lipliner = data.theme3_lipliner.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch29_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 最終確認:`);
  console.log(`テーマ1 (涙袋): ${data.theme1_aegyosal.length}件`);
  console.log(`テーマ2 (まつ毛コーティング): ${data.theme2_lashcoating.length}件`);
  console.log(`テーマ3 (リップライナー): ${data.theme3_lipliner.length}件`);
}

supplement().catch(console.error);
