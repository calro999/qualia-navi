import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch34Items() {
  console.log('❄️ [11-12月コスメ 第34弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 温感ホットクレンジングジェル＆温感マッサージ洗顔 10選 ---
  console.log('\n=== テーマ1: 温感ホットクレンジングジェル＆温感マッサージ洗顔 ===');
  const hotCleansingConfigs = [
    { brand: 'manara_hot_cleansing_gel_massage_plus', name: 'MANARA マナラ ホットクレンジングゲル マッサージプラス 美容液クレンジング', query: 'マナラ ホットクレンジングゲル マッサージプラス' },
    { brand: 'skinvill_hot_cleansing_gel', name: 'skinvill スキンビル ホットクレンジングジェル 温感毛穴ケア', query: 'スキンビル ホットクレンジングジェル' },
    { brand: 'duo_the_cleansing_balm_hot', name: 'DUO デュオ ザ クレンジングバーム ホット 温感とろけるバーム', query: 'DUO クレンジングバーム ホット' },
    { brand: 'lululun_cleansing_balm_hot', name: 'LuLuLun ルルルン クレンジング 温感バーム / アロマ', query: 'ルルルン クレンジング 温感' },
    { brand: 'benefique_hot_cleansing_gel', name: '資生堂 ベネフィーク ホットクレンジング 温感ジェル', query: 'ベネフィーク ホットクレンジング' },
    { brand: 'unlabel_lab_hot_cleansing_gel', name: 'unlabel LAB アンレーベル ラボ 超高圧 浸透型クレンジングジェル / ホットバーム', query: 'アンレーベル ラボ クレンジング' },
    { brand: 'kose_softymo_lachesca_hot_gel', name: 'KOSE コーセー ソフティモ ラチェスカ ホットジェル クレンジング', query: 'ラチェスカ ホットジェル' },
    { brand: 'bifesta_carbonated_hot_foam', name: 'Bifesta ビフェスタ 炭酸泡洗顔 温感 / モイスト 濃密炭酸泡', query: 'ビフェスタ 泡洗顔 温感' },
    { brand: 'rafra_warm_cleansing_balm_orange', name: 'RAFRA ラフラ バームオレンジ 温感アロマ クレンジングバーム', query: 'ラフラ バームオレンジ' },
    { brand: 'elixir_warm_cleansing_gel', name: 'ELIXIR エリクシール クリアホットクレンジングジェル AD 資生堂', query: 'エリクシール ホットクレンジング' }
  ];

  const hotCleansingItems = [];
  for (const cfg of hotCleansingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hotCleansingItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 塗るボトックス＆ペプチド・コラーゲン濃密弾力アンプル美容液 10選 ---
  console.log('\n=== テーマ2: 塗るボトックス＆ペプチド・コラーゲン濃密弾力アンプル美容液 ===');
  const peptideAmpouleConfigs = [
    { brand: 'medi_peel_bor_tox_peptide_ampoule', name: 'MEDI-PEEL メディピール ボルフィリン ボルフォックス＆ペプチド9 アンプル 塗るボトックス', query: 'メディピール ボルフィリン アンプル' },
    { brand: 'bioheal_boh_probioderm_3d_lifting_ampoule', name: 'BIOHEAL BOH バイオヒールボ プロバイオダーム 3D リフティング アンプル タンタン弾力', query: 'バイオヒールボ リフティング アンプル' },
    { brand: 'vt_collagen_reedle_shot', name: 'VT COSMETICS コラーゲン リードルショット 100 / 300 低分子コラーゲン', query: 'VT コラーゲン リードルショット' },
    { brand: 'numbuzin_no3_skin_softening_serum', name: 'numbuzin ナンバーズイン 3番 すべすべキメケアセラム ガラクトミセス×ビフィズス菌', query: 'ナンバーズイン 3番 セラム' },
    { brand: 'the_ordinary_multi_peptide_ha_serum', name: 'The Ordinary ジ オーディナリー マルチペプチド + HA セラム 多機能エイジングケア', query: 'The Ordinary マルチペプチド' },
    { brand: 'kahi_wrinkle_bounce_collagen_mist_ampoule', name: 'KAHI カヒ リンクルバウンス コラーゲン アンプルミスト 鮭由来コラーゲン', query: 'KAHI コラーゲン ミスト' },
    { brand: 'biodance_pore_tightening_collagen_serum', name: 'BIODANCE バイオダンス コラーゲン ポアタイトニング アンプル 毛穴弾力セラム', query: 'バイオダンス コラーゲン セラム' },
    { brand: 'drcilabo_aqua_collagen_gel_enrich_lift_ex', name: 'Dr.Ci:Labo ドクターシーラボ アクアコラーゲンゲル エンリッチリフト EX ハリ肌', query: 'ドクターシーラボ エンリッチリフトEX' },
    { brand: 'est_gp_conditioning_serum', name: 'est エスト G.P. コンディショニングセラム 高保湿マイクロペプチド美容液', query: 'エスト コンディショニングセラム' },
    { brand: 'innisfree_collagen_peptide_firming_ampoule', name: 'innisfree イニスフリー コラーゲン グリーンティー セラミド バウンス アンプル / クリーム', query: 'イニスフリー コラーゲン アンプル' }
  ];

  const peptideAmpouleItems = [];
  for (const cfg of peptideAmpouleConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        peptideAmpouleItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 寒冷刺激・マスク擦れ救済！パンテノール＆シカ B5レスキューリペアバーム 10選 ---
  console.log('\n=== テーマ3: 寒冷刺激・マスク擦れ救済！パンテノール＆シカ B5レスキューリペアバーム ===');
  const b5CicaConfigs = [
    { brand: 'laroche_posay_cicaplast_balm_b5_plus', name: 'LA ROCHE-POSAY ラ ロッシュ ポゼ シカプラスト リペアバーム B5+ 濃密バリアケア', query: 'ラロッシュポゼ シカプラスト B5' },
    { brand: 'avene_cicalfate_plus_restorative_protective_cream', name: 'Avene アベンヌ シカルファットプラス リペアクリーム 敏感肌用保湿クリーム', query: 'アベンヌ シカルファットプラス' },
    { brand: 'bioheal_boh_panthenol_cica_barrier_cream', name: 'BIOHEAL BOH バイオヒールボ パンテノール シカ バリアクリーム ゆらぎ肌レスキュー', query: 'バイオヒールボ パンテノール シカ' },
    { brand: 'dr_jart_cicapair_cream', name: 'Dr.Jart+ ドクタージャルト シカペア クリーム 第2世代 ツボクサエキス高配合', query: 'ドクタージャルト シカペア クリーム' },
    { brand: 'ihada_medicated_balm', name: 'IHADA イハダ 薬用バーム 医薬部外品 高精製ワセリン・抗肌荒れ有効成分', query: 'イハダ 薬用バーム' },
    { brand: 'vt_cica_cream', name: 'VT COSMETICS CICA シカクリーム ジェルタイプ うるおい鎮静バリア', query: 'VT シカクリーム' },
    { brand: 'apieu_madecassoside_cica_balm', name: 'A\'pieu アピュー マデカソ CICA バーム / クリーム 高純度マデカッソシド', query: 'アピュー マデカソ バーム' },
    { brand: 'torriden_dive_in_soothing_cream', name: 'Torriden トリデン ダイブイン スージングクリーム 5D複合低分子ヒアルロン酸', query: 'トリデン スージングクリーム' },
    { brand: 'real_barrier_extreme_cream', name: 'Real Barrier リアルバリア エクストリーム クリーム 特許MLE肌バリア高保湿', query: 'リアルバリア エクストリーム クリーム' },
    { brand: 'innisfree_bija_cica_balm', name: 'innisfree イニスフリー ビジャ シカバーム EX センテラアジアティカ抽出バリア', query: 'イニスフリー ビジャ シカバーム' }
  ];

  const b5CicaItems = [];
  for (const cfg of b5CicaConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        b5CicaItems.push(valid);
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
    theme1_hot_cleansing: hotCleansingItems,
    theme2_peptide_ampoule: peptideAmpouleItems,
    theme3_b5_cica_balm: b5CicaItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch34_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch34_items.json`);
  console.log(`- テーマ1 (温感ホットクレンジング): ${hotCleansingItems.length}件`);
  console.log(`- テーマ2 (ペプチド・コラーゲンアンプル): ${peptideAmpouleItems.length}件`);
  console.log(`- テーマ3 (パンテノール＆シカB5バーム): ${b5CicaItems.length}件`);
}

fetchWinterBatch34Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
