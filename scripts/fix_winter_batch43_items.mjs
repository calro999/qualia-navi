import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixWinterBatch43Items() {
  const currentData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch43_items.json', 'utf8'));

  // テーマ1: 不足している2件を取得（ヴィセ エッセンス リッププランパー、シピシピ リッププランパー）
  console.log('--- テーマ1 不足分取得 ---');
  const t1FixConfigs = [
    { brand: 'visee_essence_lip_plumper_sp001', name: 'Visee ヴィセ エッセンス リッププランパー 5.5ml SP001 シアーピンク 温感 ピリピリ ボリューム', query: 'ヴィセ エッセンス リッププランパー' },
    { brand: 'cipicipi_lip_plumper_pyun', name: 'CipiCipi シピシピ リッププランパー ピリピリ感 保湿 ボリューム 縦ジワカバー ふっくら', query: 'シピシピ リッププランパー' }
  ];

  for (const cfg of t1FixConfigs) {
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      currentData.theme1_lipplumper.push(valid);
      console.log(`✅ テーマ1追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // テーマ3: 不足している3件を取得（ランコム ジェニフィック、アルビオン エクラフチュール、CNP プロポリスアンプル）
  console.log('--- テーマ3 不足分取得 ---');
  const t3FixConfigs = [
    { brand: 'lancome_genifique_advanced_n_serum', name: 'LANCOME ランコム ジェニフィック アドバンスト N 50ml 美肌菌 導入美容液 ブースター 浸透力UP', query: 'ランコム ジェニフィック 美容液 50ml' },
    { brand: 'albion_eclafutur_t_serum', name: 'ALBION アルビオン エクラフチュール t 60ml 美容液 ナノセスタBL 角層修復 うるおいキープ', query: 'アルビオン エクラフチュール 60ml' },
    { brand: 'cnp_laboratory_propolis_energy_ampule', name: 'CNP Laboratory プロポリス エナジー アンプル 35ml 濃密保湿 ハチミツ生ツヤ 導入ブースター', query: 'CNP プロポリス アンプル 35ml' }
  ];

  for (const cfg of t3FixConfigs) {
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      currentData.theme3_boosterserum.push(valid);
      console.log(`✅ テーマ3追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 10件に揃える
  currentData.theme1_lipplumper = currentData.theme1_lipplumper.slice(0, 10);
  currentData.theme2_scalpserum = currentData.theme2_scalpserum.slice(0, 10);
  currentData.theme3_boosterserum = currentData.theme3_boosterserum.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch43_items.json', JSON.stringify(currentData, null, 2), 'utf8');
  console.log(`\n🎉 最終確認: テーマ1=${currentData.theme1_lipplumper.length}件, テーマ2=${currentData.theme2_scalpserum.length}件, テーマ3=${currentData.theme3_boosterserum.length}件`);
}

fixWinterBatch43Items().catch(console.error);
