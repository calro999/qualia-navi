import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch78Items() {
  console.log('❄️ [11-12月冬コスメ 第78弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【冬の寒冷クマ＆乾燥小じわ・赤みを消し去る】高密着コンシーラーパレット＆マルチカラー補正コンシーラー 10選 ---
  console.log('\n=== テーマ1: コンシーラーパレット＆マルチカラー補正コンシーラー ===');
  const concealerConfigs = [
    { brand: 'decorte_tone_perfecting_palette', name: 'コスメデコルテ トーンパーフェクティング パレット 4色 パレットコンシーラー 美容液成分', query: 'コスメデコルテ トーンパーフェクティング パレット' },
    { brand: 'andbe_fancylar_palette', name: '&be アンドビー ファンシーラー ファンデーション コンシーラー 2色 ベージュ オレンジ 河北裕介', query: '&be ファンシーラー' },
    { brand: 'ipsa_creative_concealer_e', name: 'イプサ IPSA クリエイティブコンシーラーe 4.5g SPF25 PA+++ 光コントロール 3色パレット', query: 'イプサ クリエイティブコンシーラーe' },
    { brand: 'excel_silent_cover_concealer', name: 'エクセル excel サイレントカバー コンシーラー 3色 パレット 高密着 血色感 カバー', query: 'エクセル サイレントカバー コンシーラー' },
    { brand: 'canmake_color_mixing_concealer', name: 'キャンメイク CANMAKE カラーミキシングコンシーラー 3色 パレット 保湿 SPF50 PA++++', query: 'キャンメイク カラーミキシングコンシーラー' },
    { brand: 'dasique_pro_concealer_palette', name: 'デイジーク dasique プロコンシーラーパレット 9色 マルチカラー補正 韓国コスメ', query: 'デイジーク プロコンシーラーパレット' },
    { brand: 'tirtir_mask_fit_all_cover_dual', name: 'TIRTIR ティルティル マスクフィット コンシーラー パレット または デュアルコンシーラー', query: 'TIRTIR コンシーラー パレット' },
    { brand: 'cezanne_palette_concealer_moist', name: 'セザンヌ CEZANNE パレットコンシーラー ハイカバー うるおい 3色パレット', query: 'セザンヌ パレットコンシーラー' },
    { brand: 'kate_parts_smash_concealer', name: 'KATE ケイト リアルカバーリキッド または 3色 パレット コンシーラー', query: 'KATE コンシーラー パレット' },
    { brand: 'dior_backstage_flash_concealer', name: 'クリスチャン ディオール Dior バックステージ フラッシュ パーフェクター コンシーラー または パレット', query: 'ディオール バックステージ コンシーラー' }
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

  // --- テーマ2: 【冬の暖房ムレ頭皮のニオイ＆夕方のペタンコ前髪を一瞬でリセット】高機能ドライシャンプー＆頭皮リフレッシュスプレー・パウダー 10選 ---
  console.log('\n=== テーマ2: 高機能ドライシャンプー＆頭皮リフレッシュスプレー・パウダー ===');
  const dryShampooConfigs = [
    { brand: 'diane_perfect_beauty_dry_shampoo', name: 'モイストダイアン パーフェクトビューティー ドライシャンプー 95g / 40g 水なし スプレー ニオイ 頭皮スッキリ', query: 'ダイアン ドライシャンプー' },
    { brand: 'fujiko_fpp_powder_ponpon', name: 'Fujiko フジコ FPPパウダー ポンポンパウダー 8.5g 前髪復活 頭皮の脂 べたつき ボリューム', query: 'フジコ FPPパウダー' },
    { brand: 'stephen_knoll_dry_shampoo_n', name: 'コーセー スティーブンノル ドライシャンプー N 80g 地肌 さらさら ふんわり 清潔感', query: 'スティーブンノル ドライシャンプー' },
    { brand: 'product_dry_shampoo_hair_skin', name: 'ザ・プロダクト product ドライシャンプー 115ml ダマスクローズ オーガニック ペパーミント', query: 'プロダクト ドライシャンプー' },
    { brand: 'colab_dry_shampoo_spray', name: 'コーラボ COLAB ドライシャンプー 200ml イギリス発 白くならない フローラル フルーティ', query: 'コーラボ ドライシャンプー' },
    { brand: 'innisfree_no_sebum_mineral_powder', name: 'イニスフリー innisfree ノーセバム ミネラルパウダー N 5g 皮脂くずれ防止 前髪 さらさら', query: 'イニスフリー ノーセバム ミネラルパウダー' },
    { brand: 'squse_me_dry_shampoo_spray', name: 'スキューズミー ドライシャンプー ロータスフラワー または フルーティブーケ 50g 静電気防止', query: 'スキューズミー ドライシャンプー' },
    { brand: 'tsubaki_dry_shampoo_room', name: '資生堂 TSUBAKI お部屋でみずみずしく香る 爽快 頭皮ジェル または スプレー ドライシャンプー', query: 'TSUBAKI お部屋でシャンプー' },
    { brand: 'naturelab_to_be_fresh_dry_shampoo', name: 'Diane Bonheur ダイアンボヌール オーガニック ドライシャンプー 120ml ミント シトラス', query: 'ダイアンボヌール ドライシャンプー' },
    { brand: 'biore_zero_sheet_powder_spray', name: 'ビオレZERO お風呂場いらず シート または ドライシャンプー ミスト', query: 'ビオレ ドライシャンプー' }
  ];

  const dryShampooItems = [];
  for (const cfg of dryShampooConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (dryShampooItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !dryShampooItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        dryShampooItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【冬の乾燥まぶたを擦らずスルンと落とす】マスカラリムーバー＆高保湿ポイントメイクリムーバー 10選 ---
  console.log('\n=== テーマ3: マスカラリムーバー＆高保湿ポイントメイクリムーバー ===');
  const mascaraRemoverConfigs = [
    { brand: 'heroine_make_speedy_mascara_remover', name: 'ヒロインメイク スピーディーマスカラリムーバー 6.6ml 伊勢半 コーム型 強力ウォータープルーフ 摩擦ゼロ', query: 'ヒロインメイク スピーディーマスカラリムーバー' },
    { brand: 'canmake_quick_lash_curler_remover', name: 'キャンメイク CANMAKE クイックラッシュカーラーリムーバー コームタイプ まつ毛保護成分', query: 'キャンメイク クイックラッシュカーラーリムーバー' },
    { brand: 'bifesta_micellar_eye_makeup_remover', name: 'マンダム ビフェスタ ミセラー アイメイクアップリムーバー 145ml 2層式 ビタミンB・E配合 保湿', query: 'ビフェスタ アイメイクアップリムーバー' },
    { brand: 'lancome_bi_facil_eye_remover', name: 'ランコム LANCOME ビファシル 125ml ポイントメイクアップリムーバー 2層式 デパコス 名品', query: 'ランコム ビファシル 125ml' },
    { brand: 'clinique_take_the_day_off_lids_lips', name: 'クリニーク CLINIQUE テイク ザ デイ オフ ポイントメイクアップ リムーバー 125ml 低刺激', query: 'クリニーク テイク ザ デイ オフ リムーバー' },
    { brand: 'fasio_mascara_remover_easy', name: 'コーセー ファシオ FASIO イージー マスカラ リムーバー 植物由来オイル ウォータープルーフ', query: 'ファシオ マスカラ リムーバー' },
    { brand: 'kate_lash_former_remover', name: 'カネボウ KATE ケイト ラッシュフォーマーリムーバー ポイントメイク リムーバー', query: 'KATE ラッシュフォーマーリムーバー' },
    { brand: 'decorte_eye_lip_makeup_remover', name: 'コスメデコルテ アイ＆リップ メイクアップ リムーバー 100ml 美容液2層式 摩擦レス', query: 'コスメデコルテ アイ＆リップ メイクアップ リムーバー' },
    { brand: 'softymo_super_point_makeup_remover', name: 'コーセー ソフティモ スーパー ポイントメイクアップ リムーバー Na 230ml ヒアルロン酸 うるおい', query: 'ソフティモ スーパーポイントメイクアップリムーバー' },
    { brand: 'ettusais_eye_edition_mascara_remover', name: 'エテュセ ettusais アイエディション マスカラリムーバー コーム型 植物オイル 高密着', query: 'エテュセ マスカラリムーバー' }
  ];

  const mascaraRemoverItems = [];
  for (const cfg of mascaraRemoverConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 300) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (mascaraRemoverItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 300 && !it.itemName.includes('中古') && !mascaraRemoverItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        mascaraRemoverItems.push(valid);
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
    theme1_concealer_palette_color_correcting: concealerItems,
    theme2_refresh_dry_shampoo_scalp_powder_mist: dryShampooItems,
    theme3_gentle_mascara_remover_point_cleanse: mascaraRemoverItems
  };

  const outputPath = 'scratch/rakuten_winter_batch78_items.json';
  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');

  console.log(`\n🎉 [取得完了] 30アイテムの取得結果を ${outputPath} に保存しました。`);
  console.log(`- テーマ1 (コンシーラーパレット): ${concealerItems.length}件`);
  console.log(`- テーマ2 (ドライシャンプー＆前髪パウダー): ${dryShampooItems.length}件`);
  console.log(`- テーマ3 (マスカラリムーバー＆ポイントリムーバー): ${mascaraRemoverItems.length}件`);
}

fetchWinterBatch78Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
