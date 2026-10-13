import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries2Items() {
  console.log('🍂 [2026秋コスメ特集 第2弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の最新アイシャドウ10選 ---
  console.log('\n=== テーマ1: 秋の最新アイシャドウ10選 ===');
  const eyeshadowConfigs = [
    { brand: 'lunasol_eye_coloration', name: 'ルナソル アイカラーレーション カネボウ LUNASOL 4色 アイシャドウパレット 秋カラー', query: 'ルナソル アイカラーレーション' },
    { brand: 'suqqu_signature_color_eyes', name: 'SUQQU スック シグニチャー カラー アイズ 4色 アイシャドウ 重ね色 深み秋色', query: 'SUQQU シグニチャー カラー アイズ' },
    { brand: 'dior_diorshow_5_couleurs', name: 'ディオール サンク クルール クチュール または ディオールショウ 5色 アイシャドウ Dior', query: 'ディオール サンク クルール' },
    { brand: 'excel_real_close_shadow', name: 'エクセル リアルクローズシャドウ サナ excel 4色 アイシャドウ 透け感 重ねツヤ 秋', query: 'エクセル リアルクローズシャドウ' },
    { brand: 'canmake_petit_palette_eyes', name: 'キャンメイク プティパレットアイズ 8色 アイシャドウ パレット CANMAKE 秋メイク', query: 'キャンメイク プティパレットアイズ' },
    { brand: 'clio_pro_eye_palette', name: 'CLIO クリオ プロ アイ パレット エアー 韓国コスメ 高密着 捨て色なし 秋ブラウン', query: 'クリオ プロ アイ パレット' },
    { brand: 'dasique_shadow_palette', name: 'デイジーク dasique アイシャドウ パレット 9色 ミュートトーン 秋カフェカラー', query: 'デイジーク アイシャドウ パレット' },
    { brand: 'decorte_eye_glow_gem', name: 'コスメデコルテ アイグロウジェム スキンシャドウ 濡れツヤ 単色アイシャドウ DECORTE', query: 'コスメデコルテ アイグロウジェム' },
    { brand: 'kate_designing_brown_eyes', name: 'KATE ケイト デザイニングブラウンアイズ 目幅拡張 ブラウン 抜け感カラー カネボウ', query: 'ケイト デザイニングブラウンアイズ' },
    { brand: 'addiction_the_eyeshadow_palette', name: 'アディクション ADDICTION ザ アイシャドウ パレット + タイムレス 美発色 重ねツヤ', query: 'アディクション アイシャドウ パレット' }
  ];

  const eyeshadowItems = [];
  for (const cfg of eyeshadowConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyeshadowItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !eyeshadowItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeshadowItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の最新ベースメイク・高保湿下地＆ツヤファンデ10選 ---
  console.log('\n=== テーマ2: 秋の最新ベースメイク・高保湿下地＆ツヤファンデ10選 ===');
  const basemakeConfigs = [
    { brand: 'paul_and_joe_moisturizing_primer', name: 'ポール＆ジョー モイスチュアライジング ファンデーション プライマー 美容液下地 保湿', query: 'ポール&ジョー モイスチュアライジング プライマー' },
    { brand: 'cle_de_peau_voile_correcteur_n', name: 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn 資生堂 プレメイクアップ 化粧下地', query: 'ヴォワールコレクチュールn' },
    { brand: 'decorte_sun_shelter_primer', name: 'コスメデコルテ サンシェルター マルチ プロテクション トーンアップCC 下地 日焼け止め', query: 'コスメデコルテ サンシェルター トーンアップCC' },
    { brand: 'tirtir_mask_fit_crystal_mesh_cushion', name: 'TIRTIR ティルティル マスクフィット クリスタルメッシュ クッション ファンデーション 水光ツヤ', query: 'TIRTIR クリスタルメッシュ クッション' },
    { brand: 'andbe_uv_primer', name: '＆be アンドビー UVプライマー 日焼け止め 化粧下地 ツヤ肌 微細パール 河北裕介', query: 'アンドビー UVプライマー' },
    { brand: 'kanebo_comfort_skin_wear', name: 'KANEBO カネボウ コンフォート スキン ウェア 美容液ファンデーション 素肌感 ツヤ', query: 'カネボウ コンフォート スキン ウェア' },
    { brand: 'maquillage_dramatic_skin_sensor_base', name: 'マキアージュ ドラマティックスキンセンサーベース NEO 資生堂 毛穴レス くずれ防止 下地', query: 'ドラマティックスキンセンサーベース NEO' },
    { brand: 'espoir_pro_tailor_be_glow', name: 'エスポア espoir プロテーラー ビーグロウ クッション または ファンデーション 水光肌', query: 'エスポア プロテーラー ビーグロウ' },
    { brand: 'rmk_lasting_gel_creamy_foundation', name: 'RMK ラスティング ジェルクリーミィファンデーション 透明感 カバー力 セミマット', query: 'RMK ラスティング ジェルクリーミィファンデーション' },
    { brand: 'laura_mercier_pure_canvas_primer', name: 'ローラメルシエ ピュア キャンバス プライマー 保湿 ハイドレーティング 化粧下地', query: 'ローラメルシエ ピュア キャンバス プライマー' }
  ];

  const basemakeItems = [];
  for (const cfg of basemakeConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (basemakeItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !basemakeItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        basemakeItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の最新ニュアンスカラーアイメイク・マスカラ＆アイブロウ10選 ---
  console.log('\n=== テーマ3: 秋の最新ニュアンスカラーアイメイク・マスカラ＆アイブロウ10選 ===');
  const eyeAccConfigs = [
    { brand: 'dejavu_lash_knockout_extra_volume', name: 'デジャヴュ 塗るつけまつげ ラッシュアップ または フィルムマスカラ モーブ クランベリー 秋', query: 'デジャヴュ 塗るつけまつげ' },
    { brand: 'heroine_make_long_and_curl_mascara', name: 'ヒロインメイク ロング＆カールマスカラ アドバンストフィルム 伊勢半 お湯落ち 秋ブラウン', query: 'ヒロインメイク ロング＆カールマスカラ' },
    { brand: 'canmake_creamy_touch_liner', name: 'キャンメイク クリーミータッチライナー 超極細 ジェルアイライナー CANMAKE とろける', query: 'キャンメイク クリーミータッチライナー' },
    { brand: 'love_liner_liquid_eyeliner', name: 'ラブ・ライナー リキッド アイライナー msh 繊細 高密着 描きやすい ニュアンスブラウン', query: 'ラブライナー リキッドアイライナー' },
    { brand: 'cezanne_nose_eyebrow_powder', name: 'セザンヌ ノーズ＆アイブロウパウダー 彫深立体眉 ニュアンスカラー モーブ オリーブ', query: 'セザンヌ ノーズ＆アイブロウパウダー' },
    { brand: 'kate_3d_eyebrow_color_z', name: 'KATE ケイト 3DアイブロウカラーZ 眉マスカラ 脱色級 高発色 ふんわり カネボウ', query: 'ケイト 3Dアイブロウカラー' },
    { brand: 'romand_han_all_brow_cara', name: 'rom&nd ロムアンド ハンオール ブロウカラ 眉マスカラ 自眉隠し アッシュ くすみカラー', query: 'ロムアンド ハンオールブロウカラ' },
    { brand: 'whomee_eyebrow_powder', name: 'WHOMEE フーミー アイブロウパウダー イガリシノブ 抜け感 おしゃれ眉 赤み秋ニュアンス', query: 'フーミー アイブロウパウダー' },
    { brand: 'ettusais_eye_edition_mascara_base', name: 'エテュセ アイエディション マスカラベース まつ毛用化粧下地 カールキープ シアーブラック', query: 'エテュセ アイエディション マスカラベース' },
    { brand: 'dup_silky_liquid_eyeliner', name: 'D-UP ディーアップ シルキーリキッドアイライナー 極細 ペンシル 美発色 ピスタチオ シフォン', query: 'ディーアップ シルキーリキッドアイライナー' }
  ];

  const eyeAccItems = [];
  for (const cfg of eyeAccConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyeAccItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !eyeAccItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeAccItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const resultData = {
    eyeshadowItems,
    basemakeItems,
    eyeAccItems
  };

  const outputPath = path.resolve('scratch/autumn_series2_items.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 第2弾 楽天APIより取得完了！保存先: ${outputPath}`);
  console.log(`取得商品数: アイシャドウ=${eyeshadowItems.length}件, ベースメイク=${basemakeItems.length}件, カラーアイメイク=${eyeAccItems.length}件`);
}

fetchAutumnSeries2Items().catch(console.error);
