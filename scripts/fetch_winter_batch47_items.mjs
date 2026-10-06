import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch47Items() {
  console.log('❄️ [11-12月冬コスメ 第47弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬・細胞レベルの肌再生＆しぼみ肌にハリ艶を注入】PDRN美容液＆濃密再生アンプル 10選 ---
  console.log('\n=== テーマ1: PDRN美容液＆濃密再生アンプル ===');
  const pdrnConfigs = [
    { brand: 'vt_pdrn_essence_100', name: 'VT ブイティー PDRN エッセンス 100 30ml 植物性サーモンPDRN エイジングケア ハリツヤ毛穴レス', query: 'VT PDRN エッセンス 100 30ml' },
    { brand: 'rejuran_dual_effect_ampoule', name: 'REJURAN リジュラン デュアル エフェクト アンプル 30ml c-PDRN 美容クリニック発想 肌再生ツヤ', query: 'リジュラン デュアルエフェクト アンプル 30ml' },
    { brand: 'medicube_pdrn_pink_peptide_ampoule', name: 'MEDICUBE メディキューブ PDRN ピンク ペプチド アンプル 30ml 高濃縮サーモン ハリ・弾力・トーンアップ', query: 'メディキューブ PDRN アンプル 30ml' },
    { brand: 'anua_pdrn_hyaluronic_capsule_serum', name: 'Anua アヌア PDRN ヒアルロン酸 カプセル 100 セラム 30ml 水光肌 弾力保湿 うるおい満ちる', query: 'アヌア PDRN セラム 30ml' },
    { brand: 'iope_pdrn_caffeine_shot', name: 'IOPE アイオペ PDRN カフェイン ショット 50ml バイオPDRN フェイスライン引き締め むくみケア', query: 'IOPE PDRN カフェイン ショット' },
    { brand: 'cnp_laboratory_pdrn_derma_serum', name: 'CNP Laboratory プロP PDRN ダーマ リペア セラム 30ml プロポリス×PDRN 濃厚バリア回復', query: 'CNP PDRN セラム' },
    { brand: 'manyo_pdrn_rejuvenating_ampoule', name: '魔女工場 manyo PDRN リジュベネーティング アンプル 50ml サーモン発酵DNA ハリ弾力集中ケア', query: '魔女工場 PDRN アンプル' },
    { brand: 'dr_althea_pdrn_skin_repair_essence', name: 'Dr.Althea ドクターエルシア PDRN スキンブースター エッセンス 30ml 敏感肌集中リペア ツヤ美肌', query: 'ドクターエルシア PDRN' },
    { brand: 'derma_laser_pdrn_sheet_mask', name: 'クオリティファースト ダーマレーザー スーパーPDRN 美容液 30ml 高濃度サーモンDNA レーザー発想浸透', query: 'ダーマレーザー PDRN 美容液' },
    { brand: 'kiso_pdrn_serum', name: 'KISO キソ サーモンPDRN アンプルエッセンス 30ml 高純度DNA-Na 原料無添加処方 国産集中ケア', query: 'KISO PDRN 美容液' }
  ];

  const pdrnItems = [];
  for (const cfg of pdrnConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 0) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        pdrnItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・体温でとろけて縦ジワ消滅＆一日中高密着保湿】メルティングリップバーム＆粘膜プランプリップ 10選 ---
  console.log('\n=== テーマ2: メルティングリップバーム＆粘膜プランプリップ ===');
  const lipConfigs = [
    { brand: 'kanebo_rouge_star_vibrant', name: 'KANEBO カネボウ ルージュスターヴァイブラント 3.7g 生命感あふれる血色ツヤ 落ちにくい高保湿ルージュ', query: 'カネボウ ルージュスターヴァイブラント' },
    { brand: 'romand_glasting_melting_balm', name: 'rom&nd ロムアンド グラスティング メルティング バーム 3.5g 水膜ガラスツヤ 粘膜カラー 高保湿リップ', query: 'ロムアンド グラスティングメルティングバーム' },
    { brand: 'dasique_melting_candy_balm', name: 'dasique デイジーク メルティング キャンディー バーム 1.5g 飴玉のようなジューシー光沢 とろけるバーム', query: 'デイジーク メルティングキャンディバーム' },
    { brand: 'kate_lip_monster_tsuya_verse', name: 'KATE ケイト リップモンスター ツヤバース 1.5g とろけて密着 肉厚ツヤジェル膜 落ちない生ツヤ', query: 'ケイト リップモンスター ツヤバース' },
    { brand: 'opera_glow_lip_tint', name: 'OPERA オペラ グロウリップティント 3.9g 水滴のような透明感 潤い持続 粘膜カラーティント', query: 'オペラ グロウリップティント' },
    { brand: 'nature_republic_honey_melting_lip', name: 'NATURE REPUBLIC ネイチャーリパブリック ハニーメルティングリップ 2.7g はちみつオイル ノック式とろツヤ', query: 'ネイチャーリパブリック ハニーメルティングリップ' },
    { brand: 'laka_bonding_glow_lipstick', name: 'Laka ラカ ボンディング グロウ リップスティック 3.7g ガラス玉のような輝き 唇に密着するヴィーガン', query: 'ラカ ボンディンググロウリップスティック' },
    { brand: 'tirtir_waterism_glow_melting_balm', name: 'TIRTIR ティルティル ウォーターリズム グロウ メルティング バーム 2.7g ぷるぷる保湿 粘膜ボリューム', query: 'TIRTIR メルティングバーム' },
    { brand: 'dior_addict_lip_glow', name: 'DIOR クリスチャンディオール アディクト リップ グロウ 3.2g 97%自然由来成分 唇本来の血色感を引き出す', query: 'ディオール アディクト リップ グロウ 3.2g' },
    { brand: 'fujiko_nolook_lip', name: 'Fujiko フジコ ノールックリップ 2.4g 鏡を見ずに瞬時にうるツヤ 保湿バームルージュ', query: 'フジコ ノールックリップ' }
  ];

  const lipItems = [];
  for (const cfg of lipConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・目元・口元の乾燥小じわをピンと伸ばす】高機能レチノール＆バクチオール リンクルアイクリーム 10選 ---
  console.log('\n=== テーマ3: 高機能レチノール＆バクチオール リンクルアイクリーム ===');
  const eyeConfigs = [
    { brand: 'elixir_retinopower_wrinkle_cream', name: '資生堂 エリクシール レチノパワー リンクルクリーム 15g 薬用しわ改善 純粋レチノール配合', query: 'エリクシール レチノパワー リンクルクリーム 15g' },
    { brand: 'decorte_ipshot_pluripotent_youth', name: 'コスメデコルテ iP.Shot プルリポテント ユース コンセントレイト 20g シワ改善 高機能目元美容液', query: 'コスメデコルテ iP.Shot 20g' },
    { brand: 'sana_nameraka_wrinkle_eye_cream', name: 'サナ なめらか本舗 リンクルアイクリーム N 20g 豆乳イソフラボン ピュアレチノール 乾燥小じわ目立たせない', query: 'なめらか本舗 リンクルアイクリーム N 20g' },
    { brand: 'vt_cica_retia_eye_cream', name: 'VT シカレチA アイクリーム 30ml CICA×レチノール 低刺激 毛穴・目元小じわ集中ケア', query: 'VT シカレチA アイクリーム' },
    { brand: 'toutvert_retinoshot_cream', name: 'TOUT VERT トゥヴェール レチノショット 0.1 30g ピュアレチノール グラナクティブレチノイド 濃密夜用', query: 'トゥヴェール レチノショット 0.1 30g' },
    { brand: 'innisfree_retinol_cica_serum', name: 'innisfree イニスフリー レチノール シカ リペア セラム 30ml 毎日使えるマイルド低刺激 レチノール美容液', query: 'イニスフリー レチノール シカ リペア セラム 30ml' },
    { brand: 'kiso_super_wrinkle_cream_va', name: 'KISO キソ スーパーリンクルクリーム VA 50g 純粋レチノール ハイドロキノン誘導体 濃厚ナイトパック', query: 'KISO レチノール クリーム 50g' },
    { brand: 'manyo_retinol_eye_cream', name: '魔女工場 manyo 4GF アイ ラディエンス クリーム 30ml レチノール EGF ペプチド 目元クマ・小じわ', query: '魔女工場 アイクリーム 30ml' },
    { brand: 'dr_ci_labo_enrich_lift_eye_cream', name: 'ドクターシーラボ エンリッチリフト アイクリーム EX 15g コラーゲン ナイアシンアミド 目元引き締め', query: 'ドクターシーラボ アイクリーム 15g' },
    { brand: 'd_program_vitalizing_eye_cream', name: '資生堂 dプログラム バイタライジング アイクリーム 15g 敏感肌用 薬用シワ改善 濃密保湿', query: 'dプログラム バイタライジング アイクリーム' }
  ];

  const eyeItems = [];
  for (const cfg of eyeConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const result = {
    batch: 47,
    fetchedAt: new Date().toISOString(),
    theme1_pdrn: pdrnItems,
    theme2_lip: lipItems,
    theme3_eye: eyeItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch47_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${pdrnItems.length}件, テーマ2: ${lipItems.length}件, テーマ3: ${eyeItems.length}件 を scratch/rakuten_winter_batch47_items.json に保存しました！`);
}

fetchWinterBatch47Items().catch(console.error);
