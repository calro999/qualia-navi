import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch70Items() {
  console.log('❄️ [11-12月冬コスメ 第70弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【極上とろける温感クレンジングバーム＆生ホットバーム】 10選 ---
  console.log('\n=== テーマ1: 温感クレンジングバーム＆生ホットバーム ===');
  const hotCleansingConfigs = [
    { brand: 'duo_the_cleansing_balm_hot', name: 'DUO デュオ ザ クレンジングバーム ホット 温感 毛穴 角栓 黒ずみ W洗顔不要 とろけるバーム 保湿', query: 'DUO クレンジングバーム ホット' },
    { brand: 'manara_hot_cleansing_gel_massage_plus', name: 'マナラ MANARA ホットクレンジングゲル マッサージプラス 温感 毛穴 角栓 美容液クレンジング メイク落とし', query: 'マナラ ホットクレンジングゲル' },
    { brand: 'rafra_balm_orange_warm_cleansing', name: 'ラフラ RAFRA バームオレンジ 温感 クレンジングバーム 天然オレンジ精油 毛穴 黒ずみ 角栓', query: 'ラフラ バームオレンジ' },
    { brand: 'attenir_skin_clear_cleanse_oil_balm', name: 'アテニア Attenir スキンクリア クレンズ オイル アロマタイプ クレンジング 毛穴 角栓 くすみ くすみオフ', query: 'アテニア クレンジング オイル' },
    { brand: 'lululun_cleansing_balm_rich_moist_hot', name: 'ルルルン LuLuLun クレンジングバーム リッチモイスト 温感 毛穴ケア 保湿 クレンジング バーム メイク落とし', query: 'ルルルン クレンジングバーム' },
    { brand: 'ink_cleansing_balm_pore_moist', name: 'ink. インク クレンジングバーム 無香料 シトラス クレイ 毛穴 潤い とろけるバーム W洗顔不要 保湿', query: 'ink クレンジングバーム' },
    { brand: 'perfect_one_focus_smooth_cleansing_balm', name: 'パーフェクトワン フォーカス スムースクレンジングバーム 毛穴 黒ずみ 角栓 ビタミンC クレンジング W洗顔不要', query: 'パーフェクトワン フォーカス クレンジングバーム' },
    { brand: 'cleansing_research_hot_gel_cleansing', name: 'クレンジングリサーチ ホットジェルクレンジング AHA 温感 毛穴 角栓 角質ケア メイク落とし 洗顔 フルーツ酸', query: 'クレンジングリサーチ ホットジェル' },
    { brand: 'botanical_warm_cleansing_balm_clay', name: '温感 クレンジングバーム 毛穴 黒ずみ 角栓 温感ホットバーム クレイ 泥 W洗顔不要 メイク落とし 保湿', query: 'クレンジングバーム 温感 毛穴' },
    { brand: 'kose_softymo_warm_cleansing_gel_balm', name: 'ソフティモ ラチェスカ ホットジェルクレンジング 温感 ジェル クレンジング 毛穴 黒ずみ コーセー', query: 'ソフティモ ホットジェル クレンジング' }
  ];

  const hotCleansingItems = [];
  for (const cfg of hotCleansingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 900) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hotCleansingItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 900 && !it.itemName.includes('中古') && !hotCleansingItems.some(e => e.itemCode === it.itemCode));

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

  // --- テーマ2: 【薬用スカルプ保湿ローション＆頭皮用セラミド美容液】 10選 ---
  console.log('\n=== テーマ2: 薬用スカルプ保湿ローション＆頭皮用セラミド美容液 ===');
  const scalpLotionConfigs = [
    { brand: 'curel_scalp_moisture_lotion_ceramide', name: 'キュレル Curel 頭皮保湿ローション セラミド 頭皮 乾燥 フケ かゆみ 敏感肌 薬用 スカルプケア 花王', query: 'キュレル 頭皮保湿ローション' },
    { brand: 'angfa_scalp_d_beaute_medical_estrology', name: 'スカルプD ボーテ メディカルエストロジー スカルプセラム 女性用 育毛剤 頭皮 美容液 薬用 抜け毛 ボリューム', query: 'スカルプD ボーテ メディカルエストロジー' },
    { brand: 'aujua_moistcalm_moisture_lotion_scalp', name: 'ミルボン オージュア モイストカーム モイスチュアローション 地肌用化粧水 頭皮 保湿 かゆみ 乾燥 スカルプケア', query: 'オージュア モイストカーム ローション' },
    { brand: 'minon_medicated_scalp_care_lotion', name: 'ミノン 薬用 スカルプ 保湿 ローション 頭皮 フケ かゆみ 乾燥肌 敏感肌 第一三共 スカルプケア エッセンス', query: 'ミノン 頭皮 保湿' },
    { brand: 'fancl_scalp_essence_medicated_tonic', name: 'ファンケル FANCL スカルプエッセンス 薬用 育毛剤 頭皮 美容液 無添加 エイジングケア 抜け毛 薄毛 ハリコシ', query: 'ファンケル スカルプエッセンス' },
    { brand: 'rohto_mentholatum_mediquick_h_scalp_lotion', name: 'ロート製薬 メディクイックH 頭皮しっとりローション 薬用 乾燥 フケ 頭皮 かゆみ 保湿 乳液 医薬部外品', query: 'メディクイックH 頭皮しっとりローション' },
    { brand: 'weleda_rosemary_scalp_cleansing_essence', name: 'ヴェレダ WELEDA オーガニック スカルプエッセンス ローズマリー 頭皮用美容液 頭皮 保湿 マッサージ ハーブ', query: 'ヴェレダ スカルプエッセンス' },
    { brand: 'product_dry_shampoo_scalp_care_lotion', name: 'ザ プロダクト product ドライシャンプー スカルプエッセンス 頭皮 保湿 リフレッシュ ペパーミント オーガニック', query: 'プロダクト ドライシャンプー' },
    { brand: 'milbon_cronna_scalp_spa_serum_essence', name: 'ミルボン クロナ スカルプ スパ セラム 頭皮用美容液 炭酸 保湿 地肌ケア 頭皮 引き締め ハリ エイジング', query: 'ミルボン 頭皮 美容液' },
    { brand: 'medicated_ceramide_scalp_repair_essence', name: '薬用 頭皮 保湿 ローション セラミド ヒアルロン酸 フケ かゆみ 育毛 スカルプエッセンス 無添加 スカルプ', query: '頭皮 保湿 ローション セラミド' }
  ];

  const scalpLotionItems = [];
  for (const cfg of scalpLotionConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (scalpLotionItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !scalpLotionItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scalpLotionItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【生ツヤ発光ハイライトスティック＆マルチグロウバーム】 10選 ---
  console.log('\n=== テーマ3: 生ツヤ発光ハイライトスティック＆マルチグロウバーム ===');
  const highlighterConfigs = [
    { brand: 'chanel_baume_essentiel_glow_stick', name: 'シャネル CHANEL ボーム エサンシエル フェイスカラー ハイライト スティック 濡れツヤ スカルプティング トランスパラン', query: 'シャネル ボーム エサンシエル' },
    { brand: 'hince_true_dimension_radiance_balm', name: 'hince ヒンス トゥルーディメンション ラディアンス バーム ハイライター スティック 濡れツヤ 水光肌 チーク 韓国コスメ', query: 'hince ラディアンスバーム' },
    { brand: 'dior_backstage_glow_face_palette_stick', name: 'ディオール Dior バックステージ フェイス グロウ パレット ハイライト チーク イルミネーション 立体感 ツヤ肌', query: 'ディオール フェイス グロウ パレット' },
    { brand: 'cezanne_face_glow_color_gel_highlighter', name: 'セザンヌ CEZANNE フェイスグロウカラー 生ぷに質感 ハイライト チーク うるみツヤ プチプラ 血色感', query: 'セザンヌ フェイスグロウカラー' },
    { brand: 'cosme_decorte_dip_in_glow_highlighter', name: 'コスメデコルテ DECORTÉ ディップイン グロウ クリームハイライター オーガニック ムルムルバター 生ツヤ 保湿', query: 'コスメデコルテ ディップイングロウ' },
    { brand: 'etvos_mineral_radiant_skin_balm', name: 'エトヴォス ETVOS ミネラルラディアントスキンバーム ハイライト バーム 美容オイル ツヤ肌 石けんオフ 敏感肌', query: 'エトヴォス ラディアントスキンバーム' },
    { brand: 'rmk_glow_stick_highlighter_pearl', name: 'RMK グロースティック ハイライト スティック パウダー パール 立体感 ヌードツヤ 自然なツヤ', query: 'RMK グロースティック' },
    { brand: 'byur_serum_fit_voluming_glow_stick', name: 'ByUR バイユア セラムフィット ボリューミング グロースティック 水光ツヤ ハイライト 保湿 バーム 韓国コスメ 毛穴', query: 'バイユア グロースティック' },
    { brand: 'cle_de_peau_le_rehausseur_declat', name: 'クレ・ド・ポー ボーテ ル・レオスールデクラ ハイライティング パウダー 宝石の輝き プレシャスオパール 圧倒的透明感', query: 'ル レオスールデクラ' },
    { brand: 'canmake_muchi_puru_glow_highlighter', name: 'キャンメイク むにゅっとハイライター 濡れツヤ 立体感 プチプラ ハイライト パール パール肌 保湿 高密着', query: 'キャンメイク むにゅっとハイライター' }
  ];

  const highlighterItems = [];
  for (const cfg of highlighterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (highlighterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !highlighterItems.some(e => e.itemCode === it.itemCode));

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

  console.log(`\n取得完了結果:`);
  console.log(`- 温感クレンジングバーム: ${hotCleansingItems.length}件`);
  console.log(`- 薬用スカルプ保湿ローション: ${scalpLotionItems.length}件`);
  console.log(`- ハイライトスティック＆バーム: ${highlighterItems.length}件`);

  const outputData = {
    theme1_hot_cleansing_balm: hotCleansingItems,
    theme2_scalp_moisture_lotion: scalpLotionItems,
    theme3_glow_highlighter_balm: highlighterItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch70_items.json', JSON.stringify(outputData, null, 2), 'utf8');
  console.log('🎉 scratch/rakuten_winter_batch70_items.json に全アイテムを保存しました！');
}

fetchWinterBatch70Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
