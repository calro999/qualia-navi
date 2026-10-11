import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch83() {
  const jsonPath = path.resolve('scratch/rakuten_winter_batch83_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ1の不足分（目標: 10件）
  console.log(`テーマ1 現件数: ${data.theme1_biphasic_oil_lotion.length}/10`);
  if (data.theme1_biphasic_oil_lotion.length < 10) {
    const backupQueries1 = [
      { brand: 'haba_squalane_oil_lotion', name: 'HABA ハーバー スクワラン または Gローション 保湿 オイル スキンケア', query: 'HABA 高品位 スクワラン 15ml' },
      { brand: 'chant_a_charm_oil', name: 'チャントアチャーム モイスト オイル 美容液', query: 'チャントアチャーム' }
    ];
    for (const b of backupQueries1) {
      if (data.theme1_biphasic_oil_lotion.length >= 10) break;
      const res = await searchRakutenDirect(b.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !data.theme1_biphasic_oil_lotion.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = b.brand;
        valid.displayBrand = b.name;
        data.theme1_biphasic_oil_lotion.push(valid);
        console.log(`✅ テーマ1追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  // 2. テーマ2の不足分（目標: 10件）
  console.log(`テーマ2 現件数: ${data.theme2_warming_head_spa.length}/10`);
  const backupQueries2 = [
    { brand: 'weleda_rosemary_scalp_cleansing', name: 'ヴェレダ WELEDA ローズマリー スカルプクレンジング 3in1 頭皮 クレンジング マッサージ', query: 'ヴェレダ ローズマリー スカルプクレンジング' },
    { brand: 'clayence_scalp_cleansing', name: 'クレイエンス clayence クレイスパ スカルプケア トリートメント ヘッドスパ', query: 'クレイエンス スカルプ' },
    { brand: 'milbon_cronna_sparkling_spa_shampoo', name: 'ミルボン クロナ スパークリング スパシャンプー 炭酸 スカルプ 頭皮 クレンジング', query: 'ミルボン 炭酸 スパシャンプー' },
    { brand: 'haru_kurokami_scalp_shampoo', name: 'haru ハル kurokami スカルプ シャンプー 天然由来 頭皮 ケア ハリ コシ エイジング', query: 'haru kurokami スカルプ' },
    { brand: 'loccitane_purifying_freshness_scalp_scrub', name: 'ロクシタン L\'OCCITANE ファイブハーブス ピュアフレッシュネス スカルプ スクラブ 頭皮', query: 'ロクシタン スカルプ スクラブ' }
  ];

  for (const b of backupQueries2) {
    if (data.theme2_warming_head_spa.length >= 10) break;
    const res = await searchRakutenDirect(b.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !data.theme2_warming_head_spa.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = b.brand;
      valid.displayBrand = b.name;
      data.theme2_warming_head_spa.push(valid);
      console.log(`✅ テーマ2追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 3. テーマ3の不足分（目標: 10件）
  console.log(`テーマ3 現件数: ${data.theme3_magnetic_gel_nail.length}/10`);
  const backupQueries3 = [
    { brand: 'nail_koubou_magnet_gel', name: 'ネイル工房 マグネットネイル キャッツアイ 微粒子 ラメ カラージェル ホリデー セルフネイル', query: 'ネイル工房 マグネット' },
    { brand: 'nailtown_magnet_gel_irogel', name: 'ネイルタウン irogel マグネットジェル キャッツアイ パウダー 微粒子 うるうる', query: 'ネイルタウン マグネット' },
    { brand: 'gracegel_cats_eye_magnet', name: 'グレースジェル キャッツアイ マグネット ジェルネイル 艶 高発色 プロ仕様', query: 'グレースジェル キャッツアイ' },
    { brand: 'gel_nail_starter_kit_uv_led', name: 'ジェルネイル スターターキット 初心者 UV LED ネイルライト カラージェル セット', query: 'ジェルネイル キット 初心者' },
    { brand: 'nail_parfait_magnet_gel', name: 'ネイルパフェ マグネットジェル または OPI ネイル ラッカー', query: 'OPI ネイル インフィニットシャイン' }
  ];

  for (const b of backupQueries3) {
    if (data.theme3_magnetic_gel_nail.length >= 10) break;
    const res = await searchRakutenDirect(b.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.theme3_magnetic_gel_nail.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = b.brand;
      valid.displayBrand = b.name;
      data.theme3_magnetic_gel_nail.push(valid);
      console.log(`✅ テーマ3追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 第83弾 不足補完完了！`);
  console.log(`テーマ1 (2層式オイルイン化粧水): ${data.theme1_biphasic_oil_lotion.length}/10`);
  console.log(`テーマ2 (温感ヘッドスパ): ${data.theme2_warming_head_spa.length}/10`);
  console.log(`テーマ3 (マグネットネイル): ${data.theme3_magnetic_gel_nail.length}/10`);
}

fillMissingBatch83().catch(console.error);
