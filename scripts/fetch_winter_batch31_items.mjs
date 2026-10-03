import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch31Items() {
  console.log('❄️ [11-12月コスメ 第31弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 大粒ラメ＆高密着リキッドグリッターライナー 10選 ---
  console.log('\n=== テーマ1: 大粒ラメ＆高密着リキッドグリッターライナー ===');
  const glitterConfigs = [
    { brand: 'cipicipi_glitter_illumination_liner', name: 'CipiCipi シピシピ グリッター イルミネーションライナー R', query: 'シピシピ グリッターイルミネーションライナー' },
    { brand: 'wonjungyo_diamond_liner', name: 'Wonjungyo ウォンジョンヨ ダイヤモンドライナー リキッドグリッター', query: 'ウォンジョンヨ ダイヤモンドライナー' },
    { brand: 'romand_liquid_glitter_shadow', name: 'rom&nd ロムアンド リキッド グリッター シャドウ', query: 'ロムアンド リキッド グリッター' },
    { brand: 'ririmew_pick_me_eyes_glitter', name: 'Ririmew リリミュウ ピックミーアイズグリッター 指原莉乃プロデュース', query: 'リリミュウ ピックミーアイズグリッター' },
    { brand: 'etude_tear_eyeliner_glitter', name: 'ETUDE エチュード ティア アイライナー 涙袋ライナー', query: 'エチュード ティアアイライナー' },
    { brand: 'clio_twinkle_pop_glitter', name: 'CLIO クリオ トゥインクルポップ グリッター レイヤリング アイパレット / スティック', query: 'クリオ トゥインクルポップ グリッター' },
    { brand: 'canmake_aurora_cocktail_glitter', name: 'CANMAKE キャンメイク オーロラカクテルグリッター ラメライナー', query: 'キャンメイク オーロラカクテルグリッター' },
    { brand: '3ce_eye_switch_glitter', name: '3CE STYLENANDA アイ スイッチ EYE SWITCH リキッドグリッター', query: '3CE アイ スイッチ' },
    { brand: 'milktouch_fairy_jewel_glitter', name: 'Milk Touch ミルクトッチ フェアリー ジュエル アイグリッター', query: 'ミルクタッチ アイグリッター' },
    { brand: 'peripera_sugar_twinkle_glitter', name: 'peripera ペリペラ シュガー トゥインクル リキッド グリッター', query: 'ペリペラ シュガートゥインクル グリッター' }
  ];

  const glitterItems = [];
  for (const cfg of glitterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        glitterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 最強カールキープマスカラ下地＆マスカラベース 10選 ---
  console.log('\n=== テーマ2: 最強カールキープマスカラ下地＆マスカラベース ===');
  const mascaraBaseConfigs = [
    { brand: 'elegance_curl_lash_fixer', name: 'Elégance エレガンス カールラッシュ フィクサー マスカラ下地', query: 'エレガンス カールラッシュフィクサー' },
    { brand: 'canmake_quick_lash_curler', name: 'CANMAKE キャンメイク クイックラッシュカーラー カールキープ下地', query: 'キャンメイク クイックラッシュカーラー' },
    { brand: 'ettusais_eye_edition_mascara_base', name: 'ettusais エテュセ アイエディション マスカラベース カール下地', query: 'エテュセ マスカラベース' },
    { brand: 'kate_lash_maximizer_base', name: 'KATE ケイト ラッシュマキシマイザー HP マスカラ下地', query: 'ケイト ラッシュマキシマイザー' },
    { brand: 'pmel_perfect_curl_lock_base', name: 'Pmel ピメル パーフェクトカールロックベース うそつき下地', query: 'ピメル パーフェクトカールロックベース' },
    { brand: 'heroine_make_curl_keep_mascara_base', name: 'ヒロインメイク カールキープ マスカラベース ブルーグレー', query: 'ヒロインメイク カールキープ マスカラベース' },
    { brand: 'majolica_majorca_lash_serum_curler', name: 'MAJOLICA MAJORCA マジョリカ マジョルカ ラッシュセラムカーラー', query: 'マジョリカマジョルカ ラッシュセラムカーラー' },
    { brand: 'dior_diorshow_maximizer_4d', name: 'Dior ディオール ディオールショウ マキシマイザー 4D マスカラ用ベース', query: 'ディオールショウ マキシマイザー 4D' },
    { brand: 'cezanne_durable_curl_mascara_base', name: 'CEZANNE セザンヌ 耐久カールマスカラ クリア カールキープ下地', query: 'セザンヌ 耐久カールマスカラ' },
    { brand: 'kose_curl_keep_magic', name: 'KOSE コーセー カールキープマジック クリアブラック マスカラ下地', query: 'コーセー カールキープマジック' }
  ];

  const mascaraBaseItems = [];
  for (const cfg of mascaraBaseConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        mascaraBaseItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 低刺激角質ピーリングジェル＆マイルドゴマージュ 10選 ---
  console.log('\n=== テーマ3: 低刺激角質ピーリングジェル＆マイルドゴマージュ ===');
  const peelingConfigs = [
    { brand: 'cure_natural_aqua_gel', name: 'Cure キュア ナチュラルアクアジェル 活性化水素水 角質ケア', query: 'キュア ナチュラルアクアジェル' },
    { brand: 'rosette_gommage_peeling_gel', name: 'ロゼット ゴマージュ 角質つるつるこするジェル AHA配合', query: 'ロゼット ゴマージュ' },
    { brand: 'orbis_aqua_peeling_gel', name: 'ORBIS オルビス アクアピーリングジェル 海洋深層水 角質ケア', query: 'オルビス アクアピーリングジェル' },
    { brand: 'detclear_bright_peel_peeling_jelly', name: 'DETクリア ブライト＆ピール ピーリングジェリー ミックスフルーツの香り', query: 'DETクリア ピーリングジェリー' },
    { brand: 'plus_aqua_moisture_peeling_gel', name: 'PLuS プリュ アクアモイスチュア ピーリングジェル 美容液角質ケア', query: 'プリュ ピーリングジェル' },
    { brand: 'natureine_aqua_peel_gel', name: 'ナチュレーヌ アクアピール モイスチャーピーリングジェル 薬用', query: 'ナチュレーヌ アクアピール' },
    { brand: 'hanajirushi_amino_acid_peeling_gel', name: '花印 HANAJIRUSHI アミノ酸 スキンピール ピーリングジェル', query: '花印 ピーリングジェル' },
    { brand: 'meishoku_detclear_unscented_peeling', name: '明色化粧品 DETクリア ピーリングジェリー 炭配合 / 敏感肌用', query: 'DETクリア 炭 ピーリング' },
    { brand: 'dr_ci_labo_vc100_peeling_gel', name: 'ドクターシーラボ VC100エッセンスローションEX ピールケア / ピーリングゲル', query: 'ドクターシーラボ ピーリングゲル' },
    { brand: 'kikumasamune_japanese_sake_peeling', name: '菊正宗 日本酒のマイルドピーリングジェル 酒粕・コメ発酵液配合', query: '菊正宗 ピーリングジェル' }
  ];

  const peelingItems = [];
  for (const cfg of peelingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        peelingItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 保存
  const result = {
    updatedAt: new Date().toISOString(),
    theme1_glitter: glitterItems,
    theme2_mascara_base: mascaraBaseItems,
    theme3_peeling: peelingItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch31_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch31_items.json`);
  console.log(`- リキッドグリッター: ${glitterItems.length}件`);
  console.log(`- マスカラ下地: ${mascaraBaseItems.length}件`);
  console.log(`- ピーリングジェル: ${peelingItems.length}件`);
}

fetchWinterBatch31Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
