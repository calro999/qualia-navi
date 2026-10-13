import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries8Items() {
  console.log('🍂 [2026秋コスメ特集 第8弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋のゆらぎ肌・赤み・肌荒れレスキュー CICA＆ティーツリー・ドクダミケア10選 ---
  console.log('\n=== テーマ1: 秋のゆらぎ肌・赤み・肌荒れレスキュー CICA＆ドクダミケア10選 ===');
  const calmConfigs = [
    { brand: 'vt_cica_daily_soothing_mask', name: 'VT シカ デイリー スージング マスク 30枚 シートマスク CICA ツボクサ VTコスメティックス', query: 'VT シカ デイリースージングマスク' },
    { brand: 'laroche_posay_cicaplast_baum_b5', name: 'ラロッシュポゼ シカプラスト バーム B5+ 保湿クリーム 肌荒れ 敏感肌 CICA', query: 'ラロッシュポゼ シカプラスト' },
    { brand: 'anua_heartleaf_77_soothing_toner', name: 'Anua アヌア ドクダミ 77 スージングトナー 鎮静 化粧水 ゆらぎ肌', query: 'アヌア ドクダミ トナー' },
    { brand: 'torriden_dive_in_serum', name: 'トリデン ダイブイン セラム 低分子ヒアルロン酸 美容液 鎮静 水分 保湿 Torriden', query: 'トリデン ダイブイン セラム' },
    { brand: 'a_derma_dermalibour_repair_cream', name: 'アベンヌ シカルファットプラス リペアクリーム または Avene 敏感肌 保湿クリーム', query: 'アベンヌ シカルファット' },
    { brand: 'dr_jart_cicapair_cream', name: 'Dr.Jart+ ドクタージャルト シカペア クリーム 第2世代 鎮静 ツボクサ CICA', query: 'ドクタージャルト シカペア クリーム' },
    { brand: 'skin1004_madagascar_centella_ampoule', name: 'SKIN1004 マダガスカル センテラ アンプル 高純度ツボクサエキス 100% 美容液', query: 'SKIN1004 センテラ アンプル' },
    { brand: 'medicube_super_cica_pad', name: 'メディキューブ スーパーシカ パッド 70枚 トナーパッド 鎮静 毛穴 medicube', query: 'メディキューブ シカ パッド' },
    { brand: 'ihada_medicated_clear_balm', name: 'イハダ 薬用バーム または クリアバーム 高精製ワセリン 肌荒れ 医薬部外品 資生堂', query: 'イハダ 薬用バーム' },
    { brand: 'apieu_madecassoside_cica_gel', name: 'アピュー マデカソ CICA シカ シートマスク または アンプル 美容液 Apieu', query: 'アピュー マデカソ CICA' }
  ];

  const calmItems = [];
  for (const cfg of calmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (calmItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !calmItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        calmItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の乾燥小ジワ・色ムラを隠す保湿コンシーラー＆コントロールカラー10選 ---
  console.log('\n=== テーマ2: 秋の乾燥小ジワ・色ムラを隠す保湿コンシーラー＆コントロールカラー10選 ===');
  const concealerConfigs = [
    { brand: 'decorte_tone_perfecting_palette', name: 'コスメデコルテ トーンパーフェクティング パレット 4色 コンシーラー DECORTE', query: 'コスメデコルテ コンシーラー' },
    { brand: 'dior_forever_skin_correct_concealer', name: 'ディオールスキン フォーエヴァー スキン コレクト コンシーラー クリスチャンディオール', query: 'ディオール フォーエヴァー コンシーラー' },
    { brand: 'the_saem_cover_perfection_tip_concealer', name: 'ザセム カバーパーフェクション チップコンシーラー the SAEM 高密着 カバー力', query: 'ザセム チップコンシーラー' },
    { brand: 'nars_radiant_creamy_concealer', name: 'NARS ナーズ ラディアント クリーミー コンシーラー 光 保湿 カバー NARS', query: 'NARS ラディアントクリーミーコンシーラー' },
    { brand: 'excel_silent_cover_concealer', name: 'エクセル サイレントカバー コンシーラー 3色パレット 保湿 excel 常盤薬品', query: 'エクセル サイレントカバーコンシーラー' },
    { brand: 'luna_long_lasting_tip_concealer', name: 'LUNA ルナ ロングラスティング チップ コンシーラー フィクシング カバー 高密着', query: 'LUNA チップ コンシーラー' },
    { brand: 'cezanne_stretch_concealer', name: 'セザンヌ ストレッチコンシーラー または パレットコンシーラー ウォータープルーフ CEZANNE', query: 'セザンヌ コンシーラー' },
    { brand: 'tirtir_mask_fit_all_cover_dual_concealer', name: 'TIRTIR ティルティル マスクフィット オールカバー デュアル コンシーラー スティック リキッド', query: 'TIRTIR デュアル コンシーラー' },
    { brand: 'ipsa_creative_concealer_e', name: 'イプサ クリエイティブコンシーラーe 3色 パレット SPF25 PA+++ IPSA', query: 'イプサ クリエイティブコンシーラー' },
    { brand: 'canmake_color_stick_concealer', name: 'キャンメイク カラーミキシングコンシーラー 3色 パレット CANMAKE', query: 'キャンメイク カラーミキシングコンシーラー' }
  ];

  const concealerItems = [];
  for (const cfg of concealerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (concealerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !concealerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        concealerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の血色レス・くすみ顔を華やかに救う高保湿マルチカラーバーム＆リップ＆チーク10選 ---
  console.log('\n=== テーマ3: 秋の血色感アップ 高保湿マルチカラーバーム＆リップ＆チーク10選 ===');
  const tintConfigs = [
    { brand: 'chanel_lip_and_cheek_balm_n1', name: 'CHANEL シャネル リップ＆チーク ボーム N°1 ドゥ シャネル マルチバーム', query: 'シャネル リップ＆チーク ボーム' },
    { brand: 'fwee_lip_and_cheek_blurry_pudding_pot', name: 'fwee フィー リップアンドチーク ブラーリー プリンポット スフレ 質感 ふんわり 韓国', query: 'fwee プリンポット' },
    { brand: 'canmake_cream_cheek', name: 'キャンメイク クリームチーク 血色感 パール 透けツヤ CANMAKE', query: 'キャンメイク クリームチーク' },
    { brand: 'hince_true_dimension_radiance_balm', name: 'hince ヒンス トゥルーディメンション ラディアンス バーム ハイライト チーク', query: 'hince ラディアンスバーム' },
    { brand: 'three_shimmering_glow_duo', name: 'THREE スリー シマリング グロー デュオ ハイライト チーク 自然な血色感', query: 'THREE シマリング グロー デュオ' },
    { brand: 'kate_lip_monster_souffle_matte', name: 'KATE ケイト リップモンスター スフレマット または リップモンスター 口紅 血色感', query: 'KATE リップモンスター' },
    { brand: 'romand_glasting_color_gloss', name: 'ロムアンド グラスティング カラー グロス または デューイフル ウォーターティント rom&nd', query: 'ロムアンド カラーグロス' },
    { brand: 'cezanne_face_glow_color', name: 'セザンヌ フェイスグロウカラー ぷにぷに 生ぷに 質感 ハイライト チーク CEZANNE', query: 'セザンヌ フェイスグロウカラー' },
    { brand: 'daisy_doll_lip_and_cheek_stick', name: 'デイジードール リップ＆チーク または ポールアンドジョー ジェル ブラッシュ チーク', query: 'ポールアンドジョー チーク' },
    { brand: 'laka_bonding_glow_lipstick', name: 'Laka ラカ ボンディンググロウ リップスティック または フルーティーグラムティント 高密着ツヤ', query: 'Laka リップ' }
  ];

  const tintItems = [];
  for (const cfg of tintConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (tintItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !tintItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        tintItems.push(valid);
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
    calmItems,
    concealerItems,
    tintItems
  };

  fs.writeFileSync('scratch/autumn_series8_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第8弾 楽天API取得完了: ゆらぎ鎮静=${calmItems.length}件, 保湿コンシーラー=${concealerItems.length}件, 血色バーム=${tintItems.length}件`);
}

fetchAutumnSeries8Items().catch(console.error);
