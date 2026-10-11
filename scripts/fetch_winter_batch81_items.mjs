import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch81Items() {
  console.log('❄️ [11-12月冬コスメ 第81弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: スティックハイライト＆生ツヤハイライター 10選 ---
  console.log('\n=== テーマ1: スティックハイライト＆生ツヤハイライター ===');
  const highlighterConfigs = [
    { brand: 'chanel_baume_essentiel', name: 'シャネル CHANEL ボーム エサンシエル スカルプティング または スカルプティング トランスパラン ハイライト スティック', query: 'シャネル ボーム エサンシエル スカルプティング' },
    { brand: 'hince_radiance_balm', name: 'hince ヒンス トゥルーディメンション ラディアンス バーム 10g ハイライト スティック 水光ツヤ', query: 'hince トゥルーディメンション ラディアンスバーム' },
    { brand: 'dior_backstage_glow_face_palette', name: 'クリスチャンディオール ディオール バックステージ フェイス グロウ パレット ハイライト チーク', query: 'ディオール バックステージ フェイス グロウ パレット' },
    { brand: 'cle_de_peau_le_rehausseur_declat', name: 'クレ・ド・ポー ボーテ ル・レオスールデクラ フェイスカラー ハイライト パウダー 資生堂', query: 'クレドポーボーテ ル レオスールデクラ' },
    { brand: 'cezanne_pearl_glow_highlight', name: 'セザンヌ CEZANNE パールグロウハイライト 01 シャンパンベージュ または 04 シェルピンク 発光ツヤ肌', query: 'セザンヌ パールグロウハイライト' },
    { brand: 'canmake_munyutto_highlighter', name: 'キャンメイク CANMAKE むにゅっとハイライター むにゅっと質感 生ツヤ 落ちにくい 立体感', query: 'キャンメイク むにゅっとハイライター' },
    { brand: 'cosmedecorte_dip_in_glow', name: 'コスメデコルテ ディップイン グロウ クリームハイライター または ダズリング ジェム オーラツヤ', query: 'コスメデコルテ ディップイン グロウ' },
    { brand: 'lauramercier_highlighting_powder', name: 'ローラメルシエ フェイスイルミネーター ディボーション または ハイライティング パウダー', query: 'ローラメルシエ フェイスイルミネーター' },
    { brand: 'clio_prism_air_highlighter', name: 'CLIO クリオ プリズム エアー ハイライター 7g または グラス ハイライター 韓国コスメ 水光肌', query: 'クリオ プリズム エアー ハイライター' },
    { brand: 'addiction_the_glow_stick', name: 'アディクション ADDICTION ザ グロウスティック ハイライト スティック 濡れツヤ 超高密着', query: 'アディクション ザ グロウ スティック' }
  ];

  const highlighterItems = [];
  for (const cfg of highlighterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (highlighterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !highlighterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        highlighterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: まとめ髪ポイントリペアブラシ＆アホ毛キープスティック 10選 ---
  console.log('\n=== テーマ2: まとめ髪ポイントリペアブラシ＆アホ毛キープスティック ===');
  const hairStickConfigs = [
    { brand: 'plus_eau_point_repair', name: 'プリュスオー plus eau ポイントリペア 10ml アホ毛 スティック マスカラ ヘアキープ ブラシ', query: 'プリュスオー ポイントリペア' },
    { brand: 'and_honey_mato_make_stick', name: 'アンドハニー &honey マトメイク スティック 4.0 9g ヘアスティック アホ毛 スタイリングバーム', query: 'アンドハニー マトメイク スティック' },
    { brand: 'milbon_elujuda_point_care_stick', name: 'ミルボン エルジューダ ポイントケアスティック 15ml サロン専売 アホ毛直し トップコート', query: 'ミルボン エルジューダ ポイントケアスティック' },
    { brand: 'cezanne_hair_care_mascara', name: 'セザンヌ CEZANNE ヘアケアマスカラ 00 クリア アホ毛レスキュー 前髪キープ', query: 'セザンヌ ヘアケアマスカラ' },
    { brand: 'diane_perfect_beauty_bangs_stick', name: 'モイスト ダイアン パーフェクトビューティー 前髪スティック ナチュラルキープ ヘアマスカラ', query: 'ダイアン 前髪スティック' },
    { brand: 'matomage_styling_stick_regular', name: 'ウテナ マトメージュ まとめ髪スティック レギュラー または スーパーホールド 13g アホ毛', query: 'ウテナ マトメージュ まとめ髪スティック' },
    { brand: 'lucido_l_multi_arrange_stick', name: 'ルシードエル マルチアレンジスティック エクストラハード または ナチュラル 13g マンダム', query: 'ルシードエル マルチアレンジスティック' },
    { brand: 'stephen_knoll_madison58_hair_wand', name: 'スティーブンノル コーセー マディソン58 スタイリング ヘアワンド または ポイントキープ マスカラ', query: 'スティーブンノル ヘアワンド' },
    { brand: 'ichikami_hair_keep_wagokoro_stick', name: 'クラシエ いち髪 ヘアキープ 和草スティック 13g 和草オイル配合 パサつき・アホ毛防止', query: 'いち髪 和草スティック' },
    { brand: 'matomage_bangs_glue_keep', name: 'ウテナ マトメージュ 前髪グルー 5ml おでこに貼る 前髪キープ 液 浮き毛 アホ毛', query: 'マトメージュ 前髪グルー' }
  ];

  const hairStickItems = [];
  for (const cfg of hairStickConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hairStickItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !hairStickItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairStickItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: ラベンダー＆ピンク系コントロールカラー・トーンアップ化粧下地 10選 ---
  console.log('\n=== テーマ3: ラベンダー＆ピンク系コントロールカラー・トーンアップ化粧下地 ===');
  const primerConfigs = [
    { brand: 'cosmedecorte_sun_shelter_toneup_cc', name: 'コスメデコルテ サンシェルター マルチ プロテクション トーンアップCC 10 ラベンダーローズ 日焼け止め下地', query: 'コスメデコルテ サンシェルター トーンアップCC 10' },
    { brand: 'elegance_modeling_color_base_uv', name: 'エレガンス Elegance モデリング カラーアップ ベース UV LV660 ラベンダー または PK110 ピンク 化粧下地', query: 'エレガンス モデリング カラーアップ ベース LV660' },
    { brand: 'jillstuart_illuminating_serum_primer', name: 'ジルスチュアート イルミネイティング セラムプライマー 02 aurora lavender ラベンダー 美容液下地', query: 'ジルスチュアート イルミネイティング セラムプライマー 02' },
    { brand: 'dalba_waterfull_toneup_suncream_purple', name: 'ダルバ dAlba ウォータフルトーンアップ サンクリーム パープル 50ml 日焼け止め 化粧下地 黄ぐすみ補正', query: 'ダルバ トーンアップ サンクリーム パープル' },
    { brand: 'paul_joe_latout_eclat_primer', name: 'ポール＆ジョー ラトゥー エクラ ファンデーション プライマー N 01 ラベンダーパール 高保湿 光コントロール', query: 'ポール&ジョー ラトゥー エクラ プライマー' },
    { brand: 'cle_de_peau_voile_correcteur_n', name: 'クレ・ド・ポー ボーテ ヴォワールコレクチュール n 40g 化粧下地 トーンアップ 高保湿 資生堂', query: 'クレドポーボーテ ヴォワールコレクチュールn' },
    { brand: 'larocheposay_uv_idea_xl_toneup_rose', name: 'ラ ロッシュ ポゼ UVイデア XL プロテクショントーンアップ ローズ 30ml ピンク 血色感 敏感肌 日焼け止め', query: 'ラロッシュポゼ トーンアップ ローズ' },
    { brand: 'wonjungyo_tone_up_base_na', name: 'ウォンジョンヨ Wonjungyo トーンアップベース NA 02 ライムイエロー または 01 ピーチピンク 日韓共同開発 下地', query: 'ウォンジョンヨ トーンアップベース' },
    { brand: 'cezanne_uv_ultra_fit_base', name: 'セザンヌ UVウルトラフィットベースEX 01 くすみ肌向け ライトブルー または 02 ピーチピンク 高保湿', query: 'セザンヌ UVウルトラフィットベースEX' },
    { brand: 'canmake_mermaid_skin_gel_uv', name: 'キャンメイク マーメイドスキンジェルUV C01 または C03 ピュアパープル ナイアシンアミド配合 日焼け止めジェル下地', query: 'キャンメイク マーメイドスキンジェルUV パープル' }
  ];

  const primerItems = [];
  for (const cfg of primerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (primerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !primerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        primerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // scratch/ ディレクトリに保存
  const outputData = {
    batchNumber: 81,
    fetchedAt: new Date().toISOString(),
    theme1_radiant_glow_highlighter: highlighterItems,
    theme2_hair_point_repair_stick: hairStickItems,
    theme3_lavender_pink_color_primer: primerItems
  };

  const outputPath = 'scratch/rakuten_winter_batch81_items.json';
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`\n🎉 第81弾の30商品取得完了！保存先: ${outputPath}`);
  console.log(`- テーマ1 (生ツヤハイライター): ${highlighterItems.length}件`);
  console.log(`- テーマ2 (アホ毛キープスティック): ${hairStickItems.length}件`);
  console.log(`- テーマ3 (トーンアップ下地): ${primerItems.length}件`);
}

fetchWinterBatch81Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
