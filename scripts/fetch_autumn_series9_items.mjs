import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries9Items() {
  console.log('🍂 [2026秋コスメ特集 第9弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋のパサつき・広がり・アホ毛を抑えるまとめ髪ヘアスティック＆高保湿ヘアバーム10選 ---
  console.log('\n=== テーマ1: 秋のパサつき・アホ毛を抑えるヘアスティック＆ヘアバーム10選 ===');
  const hairConfigs = [
    { brand: 'plus_eau_point_repair_hair_stick', name: 'プリュスオー ポイントリペア ヘアスティック アホ毛 前髪キープ pluseau', query: 'プリュスオー ポイントリペア' },
    { brand: 'utena_matomage_hair_styling_stick', name: 'ウテナ マトメージュ まとめ髪スティック レギュラー または スーパーホールド utena', query: 'マトメージュ まとめ髪スティック' },
    { brand: 'product_hair_wax_organic', name: 'ザ・プロダクト ヘアワックス 42g オーガニック シアバター product ヘアバーム', query: 'プロダクト ヘアワックス' },
    { brand: 'napla_n_dot_natural_balm', name: 'ナプラ N. エヌドット ナチュラルバーム 45g ハンドクリーム napla ヘアバーム', query: 'ナプラ エヌドット ナチュラルバーム' },
    { brand: 'fiancée_point_hair_stick', name: 'フィアンセ ポイントヘアスティック ピュアシャンプーの香り アホ毛直し', query: 'フィアンセ ポイントヘアスティック' },
    { brand: 'allna_organic_hair_balm', name: 'ALLNA ORGANIC オルナオーガニック ヘアバーム 48g シアバター 天然精油', query: 'オルナオーガニック ヘアバーム' },
    { brand: 'bojico_organic_essential_serum_balm', name: 'ボジコ オーガニック ヘアワックス バーム または アンドハニー ヘアスティック', query: 'アンドハニー マトメイク スティック' },
    { brand: 'clayence_styling_balm', name: 'クレオズ または ダイアン 前髪スティック パーフェクトビューティー', query: 'ダイアン 前髪スティック' },
    { brand: 'milbon_jemile_fran_melty_butter_balm', name: 'ミルボン ジェミールフラン メルティバター バーム 40g 洗い流さない', query: 'ジェミールフラン メルティバター バーム' },
    { brand: 'shiro_white_lily_hair_balm', name: 'SHIRO シロ ホワイトリリー ヘアバーム または サボン ヘアオイル スタイリング', query: 'SHIRO ヘアバーム' }
  ];

  const hairItems = [];
  for (const cfg of hairConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hairItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !hairItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の乾燥まぶたにピタッと密着！しっとり濡れツヤ単色アイシャドウ＆リキッドアイカラー10選 ---
  console.log('\n=== テーマ2: 秋の乾燥まぶたに密着！濡れツヤ単色アイシャドウ10選 ===');
  const eyeConfigs = [
    { brand: 'decorte_eye_glow_gem_skin_shadow', name: 'コスメデコルテ アイグロウジェム スキンシャドウ 濡れツヤ 単色アイシャドウ DECORTE', query: 'コスメデコルテ アイグロウジェム' },
    { brand: 'excel_illumi_couture_shadow', name: 'エクセル スキニーリッチシャドウ または イルミクチュールシャドウ 保湿 excel', query: 'エクセル スキニーリッチシャドウ' },
    { brand: 'etvos_mineral_eye_balm', name: 'エトヴォス ETVOS ミネラルアイバーム 保湿 美容クリーム単色アイシャドウ', query: 'エトヴォス ミネラルアイバーム' },
    { brand: 'addiction_the_eyeshadow_sparkle', name: 'アディクション ザ アイシャドウ スパークル または パール ADDICTION 単色', query: 'アディクション ザ アイシャドウ' },
    { brand: 'suqqu_liquid_luster_eyes', name: 'SUQQU スック リクイド ラスター アイズ リキッドアイシャドウ 濡れツヤ', query: 'スック リクイド ラスター アイズ' },
    { brand: 'canmake_eye_color_palette_single', name: 'キャンメイク シティライトアイズ または ジュエリーシャドウベール CANMAKE', query: 'キャンメイク シティライトアイズ' },
    { brand: 'hince_new_depth_eyeshadow', name: 'hince ヒンス ニューデップス アイシャドウ 単色 センシュアル グリッター', query: 'hince ニューデップス アイシャドウ' },
    { brand: 'cezanne_single_color_eyeshadow', name: 'セザンヌ シングルカラーアイシャドウ オイル配合 保湿 プチプラ CEZANNE', query: 'セザンヌ シングルカラーアイシャドウ' },
    { brand: 'laka_mono_eyeshadow', name: 'Laka ラカ モノアイシャドウ または ロムアンド リキッドグリッター', query: 'ロムアンド リキッドグリッター' },
    { brand: 'clio_pro_single_shadow', name: 'クリオ CLIO プロ シングル シャドウ G10 指原シャドウ 濡れツヤ', query: 'クリオ プロシングルシャドウ' }
  ];

  const eyeItems = [];
  for (const cfg of eyeConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyeItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !eyeItems.some(e => e.itemCode === it.itemCode));

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

  // --- テーマ3: 乾燥でしぼんだまつ毛・眉毛を育む濃密まつ毛美容液＆アイブロウセラム10選 ---
  console.log('\n=== テーマ3: 乾燥でしぼんだ目元を育む濃密まつ毛美容液＆アイブロウセラム10選 ===');
  const lashConfigs = [
    { brand: 'lashaddict_eyelash_conditioning_serum', name: 'ラッシュアディクト アイラッシュ コンディショニング セラム まつげ美容液 Lashaddict 正規品', query: 'ラッシュアディクト 正規品' },
    { brand: 'scalp_d_eyelash_serum_premium', name: 'スカルプD まつ毛美容液 プレミアム ピュアフリーアイラッシュセラム アンファー', query: 'スカルプD まつ毛美容液 プレミアム' },
    { brand: 'revitalash_advanced_japan', name: 'リバイタラッシュ アドバンス ジャパン まつげ美容液 眉毛 正規品 RevitaLash', query: 'リバイタラッシュ アドバンス' },
    { brand: 'majolica_majorca_lash_jelly_drop_ex', name: 'マジョリカ マジョルカ ラッシュジェリードロップ EX まつ毛美容液 資生堂', query: 'ラッシュジェリードロップ EX' },
    { brand: 'cezanne_eyelash_essence_ex', name: 'セザンヌ まつげ美容液EX ワイドラッシュ配合 まつ毛 まゆ毛 目元 CEZANNE', query: 'セザンヌ まつげ美容液EX' },
    { brand: 'canmake_quick_lash_curler_clear', name: 'キャンメイク クイックラッシュカーラー 透明 まつげ下地 トップコート カールキープ', query: 'キャンメイク クイックラッシュカーラー' },
    { brand: 'uz_flowfushi_mote_eyelash_serum', name: 'UZU ウズ まつげ美容液 指塗り 目元美容液 フローフシ FLOWFUSHI', query: 'UZU まつげ美容液' },
    { brand: 'd_up_eyelash_serum', name: 'ディーアップ アイラッシュ トリートメント エッセンス まつげ美容液 D-UP', query: 'ディーアップ まつげ美容液' },
    { brand: 'dhc_eyelash_tonic', name: 'DHC アイラッシュトニック まつげ美容液 植物エキス トリートメント DHC', query: 'DHC アイラッシュトニック' },
    { brand: 'phoebe_beauty_up_eyelash_serum', name: 'PHOEBE フィービー ビューティーアップ アイラッシュセラム ヒト幹細胞培養液 まつ毛美容液', query: 'フィービー まつ毛美容液' }
  ];

  const lashItems = [];
  for (const cfg of lashConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lashItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !lashItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lashItems.push(valid);
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
    hairItems,
    eyeItems,
    lashItems
  };

  fs.writeFileSync('scratch/autumn_series9_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第9弾 楽天API取得完了: ヘアスティック＆バーム=${hairItems.length}件, 単色アイシャドウ=${eyeItems.length}件, まつ毛美容液=${lashItems.length}件`);
}

fetchAutumnSeries9Items().catch(console.error);
