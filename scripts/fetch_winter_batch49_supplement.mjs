import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch49() {
  console.log('🔄 [バッチ49 補完] 未取得アイテムをシンプル検索クエリで再取得します...');
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch49_items.json', 'utf8'));

  // --- テーマ1: 不足2アイテムの取得 ---
  console.log('\n=== テーマ1 補完 ===');
  const innerSupp = [
    { brand: 'shiseido_the_collagen', name: '資生堂 ザ・コラーゲン ドリンク 50ml×10本 美容特許成分配合', query: 'ザ コラーゲン ドリンク 10本' },
    { brand: 'taisho_alfe_deep_essence', name: '大正製薬 アルフェ ディープエッセンス 50ml×10本 セラミド 鉄分', query: 'アルフェ ディープエッセンス' }
  ];
  for (const cfg of innerSupp) {
    if (!current.theme1_inner.find(x => x.brandKey === cfg.brand)) {
      try {
        const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
        const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
        if (valid) {
          valid.brandKey = cfg.brand;
          valid.displayBrand = cfg.name;
          current.theme1_inner.push(valid);
          console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
        }
      } catch (e) {
        console.error(`エラー (${cfg.brand}):`, e.message);
      }
      await sleep(1300);
    }
  }

  // もし10個に満たない場合は追加アイテム
  if (current.theme1_inner.length < 10) {
    const extraInner = [
      { brand: 'meiji_amino_collagen_premium', name: '明治 アミノコラーゲン プレミアム 缶 196g セラミド ヒアルロン酸 コエンザイムQ10', query: 'アミノコラーゲン プレミアム 缶' },
      { brand: 'rohto_episteme_stem_drink', name: 'ロート製薬 エピステーム ステムサイエンスドリンク 10本 美容飲料', query: 'エピステーム ステムサイエンス ドリンク' }
    ];
    for (const cfg of extraInner) {
      if (current.theme1_inner.length >= 10) break;
      try {
        const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
        const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
        if (valid) {
          valid.brandKey = cfg.brand;
          valid.displayBrand = cfg.name;
          current.theme1_inner.push(valid);
          console.log(`✅ [追加] [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
        }
      } catch (e) {}
      await sleep(1300);
    }
  }

  // --- テーマ2: 不足6アイテムの取得 ---
  console.log('\n=== テーマ2 補完 ===');
  const claySupp = [
    { brand: 'innisfree_super_volcanic_clay', name: 'innisfree イニスフリー ヴォルカニック ポア クレイマスク 100ml 火山灰 毛穴角栓クリア', query: 'イニスフリー ヴォルカニック クレイマスク' },
    { brand: 'decorte_clay_blanc', name: 'コスメデコルテ クレイ ブラン ホワイトクレイ洗顔料', query: 'コスメデコルテ クレイブラン' },
    { brand: 'three_balancing_clay_mask', name: 'THREE スリー バランシング ステム クレイマスク', query: 'THREE バランシング クレイ' },
    { brand: 'drcilabo_vc100_hot_peel', name: 'ドクターシーラボ VC100 ホットピール クレンジングゲル 温感毛穴ケア', query: 'シーラボ ホットピール' },
    { brand: 'sabon_dead_sea_mask', name: 'SABON サボン デッドシー 3in1 フェイシャル マスク スクラブ', query: 'SABON デッドシー マスク' },
    { brand: 'rosette_yumemiru_clay_balm', name: 'ロゼット 夢みるバーム 海泥スムースモイスチャー クレイバーム 毛穴ケア', query: '夢みるバーム 海泥' },
    { brand: 'kiehls_rare_earth_clay_mask', name: 'KIEHL\'S キールズ レアアース マスク 125ml アマゾンホワイトクレイ', query: 'キールズ レアアース マスク 125ml' },
    { brand: 'mediheal_tea_tree_clay_mask', name: 'MEDIHEAL メディヒール ティーツリー カーミング クレイパック', query: 'メディヒール クレイマスク' }
  ];
  for (const cfg of claySupp) {
    if (current.theme2_clay.length >= 10) break;
    if (!current.theme2_clay.find(x => x.brandKey === cfg.brand)) {
      try {
        const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
        const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
        if (valid) {
          valid.brandKey = cfg.brand;
          valid.displayBrand = cfg.name;
          current.theme2_clay.push(valid);
          console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
        }
      } catch (e) {
        console.error(`エラー (${cfg.brand}):`, e.message);
      }
      await sleep(1300);
    }
  }

  // --- テーマ3: 不足4アイテムの取得 ---
  console.log('\n=== テーマ3 補完 ===');
  const scalpSupp = [
    { brand: 'aveda_pramasana_scalp', name: 'AVEDA アヴェダ プラマサナ ピュリファイング スカルプ クレンザー 150ml', query: 'アヴェダ プラマサナ' },
    { brand: 'loccitane_scalp_scrub', name: 'L\'OCCITANE ロクシタン ファイブハーブス ピュアフレッシュネス スカルプスクラブ', query: 'ロクシタン スカルプ' },
    { brand: 'thebodyshop_scalp_scrub', name: 'THE BODY SHOP ザ・ボディショップ リフレッシング スカルプスクラブ フジグリーンティ', query: 'ボディショップ スカルプスクラブ' },
    { brand: 'lebel_theo_scalp', name: 'LebeL ルベル ジオ スキャルプフレックス 頭皮クレンジング', query: 'ルベル ジオ スキャルプ' },
    { brand: 'clayence_scalp_clay_shampoo', name: 'clayence クレイエンス クレイスパ ヘッドスパ シャンプー', query: 'クレイエンス クレイスパ' },
    { brand: 'cricket_scalp_brush_spa', name: 'エトヴォス リラクシングマッサージブラシ 頭皮マッサージ ハード', query: 'エトヴォス リラクシングマッサージブラシ' }
  ];
  for (const cfg of scalpSupp) {
    if (current.theme3_scalp.length >= 10) break;
    if (!current.theme3_scalp.find(x => x.brandKey === cfg.brand)) {
      try {
        const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
        const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
        if (valid) {
          valid.brandKey = cfg.brand;
          valid.displayBrand = cfg.name;
          current.theme3_scalp.push(valid);
          console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
        }
      } catch (e) {
        console.error(`エラー (${cfg.brand}):`, e.message);
      }
      await sleep(1300);
    }
  }

  console.log(`\n🎉 補完後集計:`);
  console.log(`- テーマ1: ${current.theme1_inner.length}/10`);
  console.log(`- テーマ2: ${current.theme2_clay.length}/10`);
  console.log(`- テーマ3: ${current.theme3_scalp.length}/10`);

  fs.writeFileSync('scratch/rakuten_winter_batch49_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch49_items.json を更新しました！');
}

supplementBatch49().catch(err => {
  console.error('補完エラー:', err);
  process.exit(1);
});
