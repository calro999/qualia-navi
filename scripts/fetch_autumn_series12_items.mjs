import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries12Items() {
  console.log('🍂 [2026秋コスメ特集 第12弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の深まる乾燥と冷え込みから全身を守る高保湿ボディミルク＆ボディバター10選 ---
  console.log('\n=== テーマ1: 秋の高保湿ボディミルク＆ボディバター10選 ===');
  const bodyConfigs = [
    { brand: 'cerave_moisturizing_cream', name: 'セラヴィ モイスチャライジング クリーム 453g セラミド 保湿 CeraVe', query: 'セラヴィ モイスチャライジング' },
    { brand: 'loccitane_shea_ultra_rich_body_cream', name: 'ロクシタン シア リッチ ボディクリーム 200ml 保湿 シアバター LOCCITANE', query: 'ロクシタン シア ボディクリーム' },
    { brand: 'bioderma_atoderm_intensive_baume', name: 'ビオデルマ アトデルム インテンシブ バーム 500ml 乾燥肌 敏感肌 BIODERMA', query: 'ビオデルマ アトデルム バーム' },
    { brand: 'la_roche_posay_lipikar_baume_ap_plus_m', name: 'ラロッシュポゼ リピカ バーム AP+M 400ml 保湿クリーム 乾燥肌', query: 'ラロッシュポゼ リピカ バーム' },
    { brand: 'nivea_premium_body_milk_moist', name: 'ニベア プレミアムボディミルク モイスト 200g 高保湿 うるおい NIVEA', query: 'ニベア プレミアムボディミルク モイスト' },
    { brand: 'shiro_white_lily_body_milk', name: 'SHIRO シロ ホワイトリリー ボディミルク 保湿 乳液 シアバター', query: 'SHIRO ホワイトリリー ボディミルク' },
    { brand: 'kiehls_creme_de_corps', name: 'キールズ クレム ドゥ コール ボディクリーム 250ml シアバター KIEHL\'S', query: 'キールズ クレム ドゥ コール' },
    { brand: 'vaseline_advanced_repair_body_lotion', name: 'ヴァセリン アドバンスドリペア ボディローション 400ml 無香料 保湿', query: 'ヴァセリン アドバンスドリペア' },
    { brand: 'johnson_extra_care_aroma_milk', name: 'ジョンソン ボディケア エクストラケア アロマミルク ローズとジャスミン', query: 'ジョンソン ボディケア アロマミルク' },
    { brand: 'the_body_shop_shea_body_butter', name: 'ザボディショップ ボディバター シア 200ml 保湿クリーム THE BODY SHOP', query: 'ボディショップ ボディバター シア' }
  ];

  const bodyItems = [];
  for (const cfg of bodyConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (bodyItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !bodyItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bodyItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の乾燥・摩擦でデリケートになった目元を守る低刺激ポイントメイクリムーバー10選 ---
  console.log('\n=== テーマ2: 秋の低刺激ポイントメイクリムーバー10選 ===');
  const removerConfigs = [
    { brand: 'bifesta_eye_makeup_remover', name: 'ビフェスタ アイメイクアップリムーバー 145ml ポイントメイクリムーバー Bifesta', query: 'ビフェスタ アイメイクアップリムーバー' },
    { brand: 'lancome_bi_facil_eye_makeup_remover', name: 'ランコム ビファシル 125ml ポイントメイクアップ リムーバー LANCOME', query: 'ランコム ビファシル' },
    { brand: 'clinique_take_the_day_off_lids_lashes_lips', name: 'クリニーク テイク ザ デイ オフ リッド スマッシュ リップ CLINIQUE', query: 'クリニーク テイクザデイオフ' },
    { brand: 'chanel_demaquillant_yeux_intense', name: 'シャネル デマキヤン ユー アンタンス 100ml アイメイクリムーバー CHANEL', query: 'シャネル デマキヤン ユー アンタンス' },
    { brand: 'shiseido_eye_and_lip_makeup_remover', name: '資生堂 アイ＆リップ メーキャップリムーバー 120ml SHISEIDO ポイントメイク', query: '資生堂 メーキャップリムーバー' },
    { brand: 'canmake_quick_lash_curler_remover', name: 'キャンメイク クイックラッシュカーラーリムーバー まつ毛リムーバー CANMAKE', query: 'クイックラッシュカーラーリムーバー' },
    { brand: 'heroine_make_speedy_mascara_remover', name: 'ヒロインメイク スピーディーマスカラリムーバー 伊勢半 ウォータープルーフ', query: 'スピーディーマスカラリムーバー' },
    { brand: 'kate_eye_makeup_remover', name: 'KATE アイメイクアップ リムーバー または メイク落とし ケイト', query: 'ケイト リムーバー' },
    { brand: 'fancl_mild_cleansing_oil', name: 'ファンکل マイルドクレンジングオイル または ポイントメイクリムーバー FANCL', query: 'ファンケル マイルドクレンジングオイル' },
    { brand: 'la_roche_posay_respectissime_eye_makeup_remover', name: 'ラロッシュポゼ レスペクティッシム ポイントメイクアップリムーバー 敏感肌', query: 'ラロッシュポゼ クレンジングウォーター' }
  ];

  const removerItems = [];
  for (const cfg of removerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (removerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !removerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        removerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の乾燥によるかゆみ・カサカサ肌を潤す高保湿ボディウォッシュ＆入浴ボディソープ10選 ---
  console.log('\n=== テーマ3: 秋の高保湿ボディウォッシュ10選 ===');
  const washConfigs = [
    { brand: 'hadakara_body_soap_moist', name: 'ハダカラ hadakara ボディソープ 泡 または 液体 高保湿 ライオン LION', query: 'ハダカラ ボディソープ 泡' },
    { brand: 'bouncia_body_soap_premium', name: 'バウンシア ボディソープ 濃密泡 高保湿 牛乳石鹸 Bouncia', query: 'バウンシア ボディソープ' },
    { brand: 'curel_foam_body_wash', name: 'キュレル 泡ボディウォッシュ 450ml セラミドケア 敏感肌 花王 Curel', query: 'キュレル 泡ボディウォッシュ' },
    { brand: 'minon_whole_body_shampoo_moist', name: 'ミノン 全身シャンプー しっとりタイプ 450ml 第一三共 敏感肌 薬用', query: 'ミノン 全身シャンプー しっとり' },
    { brand: 'dove_body_wash_rich_care', name: 'ダヴ ボディウォッシュ リッチケア シアバター または 濃密泡 ユニリーバ', query: 'ダヴ ボディウォッシュ 泡' },
    { brand: 'care_cera_foam_body_wash', name: 'ケアセラ 泡の高保湿ボディウォッシュ セラミド ロート製薬 CareCera', query: 'ケアセラ 泡の高保湿ボディウォッシュ' },
    { brand: 'sabon_shower_oil_patchouli', name: 'SABON シャワーオイル 500ml ボディスクラブ 保湿 サボン ボディソープ', query: 'SABON シャワーオイル 500ml' },
    { brand: 'loccitane_almond_shower_oil', name: 'ロクシタン アーモンド モイスチャライジング シャワーオイル 250ml LOCCITANE', query: 'ロクシタン アーモンド シャワーオイル' },
    { brand: 'botanist_botanical_body_soap', name: 'BOTANIST ボタニカル ボディソープ ディープモイスト 保湿 ボタニスト', query: 'ボタニスト ボディーソープ' },
    { brand: 'aesop_geranium_leaf_body_cleanser', name: 'イソップ ゼラニウム ボディクレンザー 500ml Aesop ボディソープ', query: 'イソップ ボディクレンザー' }
  ];

  const washItems = [];
  for (const cfg of washConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (washItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !washItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        washItems.push(valid);
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
    bodyItems,
    removerItems,
    washItems
  };

  fs.writeFileSync('scratch/autumn_series12_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第12弾 楽天API取得完了: ボディクリーム=${bodyItems.length}件, リムーバー=${removerItems.length}件, ボディウォッシュ=${washItems.length}件`);
}

fetchAutumnSeries12Items().catch(console.error);
