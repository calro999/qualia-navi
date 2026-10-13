import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries4Items() {
  console.log('🍂 [2026秋コスメ特集 第4弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋のハンドクリーム＆ネイルオイル10選 ---
  console.log('\n=== テーマ1: 秋の高保湿ハンドクリーム＆ネイルオイル10選 ===');
  const handConfigs = [
    { brand: 'loccitane_shea_hand_cream', name: 'ロクシタン シア ハンドクリーム 30ml 75ml 保湿 シアバター 手荒れ L\'OCCITANE', query: 'ロクシタン シア ハンドクリーム' },
    { brand: 'jillstuart_hand_cream_white_floral', name: 'ジルスチュアート ハンドクリーム ホワイトフローラル 保湿 美容液 JILL STUART', query: 'ジルスチュアート ハンドクリーム' },
    { brand: 'aesop_resurrection_hand_balm', name: 'イソップ レスレクション アロマティック ハンドバーム Aesop ハンドクリーム', query: 'イソップ レスレクション ハンドバーム' },
    { brand: 'shiro_savon_hand_serum', name: 'SHIRO シロ サボン ハンド美容液 手肌 美容液 ハンドセラム 保湿', query: 'SHIRO ハンド美容液' },
    { brand: 'kneipp_hand_cream', name: 'クナイプ ハンドクリーム ホップ＆バレリアン バニラ ハーブ 保湿 Kneipp', query: 'クナイプ ハンドクリーム' },
    { brand: 'avene_cold_cream_hand', name: 'アベンヌ 薬用ハンドクリーム コールドクリーム 手荒れ ひび あかぎれ 敏感肌', query: 'アベンヌ 薬用ハンドクリーム' },
    { brand: 'curel_moisture_hand_cream', name: 'キュレル 潤浸保湿 ハンドクリーム セラミドケア 消炎剤 医薬部外品 花王', query: 'キュレル ハンドクリーム' },
    { brand: 'uka_nail_oil', name: 'uka ウカ ネイルオイル 7:15 13:00 24:45 ロールオン 保湿 オーガニック', query: 'uka ネイルオイル' },
    { brand: 'coenrich_q10_hand_cream', name: 'コエンリッチ 薬用ホワイトニング ハンドクリーム プレミアム ディープモイスチュア コーセー', query: 'コエンリッチ ハンドクリーム' },
    { brand: 'chanel_la_creme_main', name: 'CHANEL シャネル ラ クレーム マン ハンドクリーム 卵型 エレガント 保湿', query: 'シャネル ラ クレーム マン' }
  ];

  const handItems = [];
  for (const cfg of handConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (handItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !handItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の高保湿ヘアオイル＆ヘアミルク10選 ---
  console.log('\n=== テーマ2: 秋の高保湿ヘアオイル＆ヘアミルク10選 ===');
  const hairConfigs = [
    { brand: 'moroccanoil_treatment_original', name: 'モロッカンオイル トリートメント 100ml ポンプ付き アルガンオイル 正規品 ヘアオイル', query: 'モロッカンオイル トリートメント' },
    { brand: 'orbis_essence_in_hair_milk', name: 'オルビス エッセンスインヘアミルク 無香料 美容液 毛先補修 洗い流さない ORBIS', query: 'オルビス エッセンスインヘアミルク' },
    { brand: 'milbon_elujuda_emulsion_plus', name: 'ミルボン エルジューダ エマルジョン+ ヘアトリートメント 洗い流さない ヘアミルク', query: 'エルジューダ エマルジョン' },
    { brand: 'refa_lock_oil', name: 'ReFa リファ ロックオイル ヘアオイル アイロン前 カールキープ 熱ダメージ保護', query: 'リファ ロックオイル' },
    { brand: 'track_oil_no3', name: 'トラック オイル No.3 track oil 金木犀 天然由来 ナンバースリー ヘア＆ボディオイル', query: 'トラック オイル No.3' },
    { brand: 'yolu_calm_night_repair_oil', name: 'YOLU ヨル カームナイトリペア ヘアオイル ナイトケア 濃密補修 しっとりツヤ', query: 'YOLU カームナイトリペア ヘアオイル' },
    { brand: 'kerastase_elixir_ultime', name: 'ケラスターゼ フルイド オレオ リラックス または ユイルスブリム ヘアオイル ツヤ', query: 'ケラスターゼ オレオ リラックス' },
    { brand: 'andhoney_deep_moist_hair_oil', name: '＆honey アンドハニー ディープモイスト ヘアオイル3.0 ハチミツ 美容液オイル 保湿', query: 'アンドハニー ディープモイスト ヘアオイル' },
    { brand: 'fino_premium_touch_hair_oil', name: 'フィーノ fino プレミアムタッチ 浸透美容液ヘアオイル 集中補修 ヘアトリートメント', query: 'フィーノ プレミアムタッチ ヘアオイル' },
    { brand: 'napla_n_dot_shea_oil', name: 'N. エヌドット シアオイル 150ml ナプラ 洗い流さないトリートメント ヘアケア', query: 'エヌドット シアオイル' }
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

  // --- テーマ3: 秋の濃厚リップマスク＆リップスクラブ10選 ---
  console.log('\n=== テーマ3: 秋の濃厚リップマスク＆リップスクラブ10選 ===');
  const lipCareConfigs = [
    { brand: 'laneige_lip_sleeping_mask', name: 'LANEIGE ラネージュ リップスリーピングマスク ベリー 保湿 ナイトパック ぷるぷる', query: 'ラネージュ リップスリーピングマスク' },
    { brand: 'revlon_kiss_sugar_scrub', name: 'レブロン キス シュガー スクラブ リップスクラブ 角質ケア 洗い流し不要 REVLON', query: 'レブロン キス シュガー スクラブ' },
    { brand: 'torriden_solid_in_lip_essence', name: 'Torriden トリデン ソリッドイン セラミド リップエッセンス 高保湿 チューブ 韓国', query: 'トリデン リップエッセンス' },
    { brand: 'obagi_derma_power_x_lip_essence', name: 'オバジ ダーマパワーX リップエッセンス ロート製薬 コラーゲン エラスチン ハリ唇', query: 'オバジ ダーマパワーX リップエッセンス' },
    { brand: 'clarins_lip_comfort_oil', name: 'クラランス リップ コンフォート オイル 植物オイル ハニー 美容液オイル ツヤリップ', query: 'クラランス リップコンフォートオイル' },
    { brand: 'curel_lip_care_cream_balm', name: 'キュレル リップケア バーム または クリーム 潤浸保湿 セラミド 医薬部外品 ひび割れ', query: 'キュレル リップケア バーム' },
    { brand: 'takami_lip_essence', name: 'タカミリップ 7g 唇用美容液 保湿 エイジングケア TAKAMI 角質', query: 'タカミリップ' },
    { brand: 'chanel_hydra_beauty_lip_balm', name: 'シャネル イドゥラ ビューティ リップ バーム 保湿 CHANEL リップケア', query: 'シャネル イドゥラ ビューティ リップ バーム' },
    { brand: 'dior_addict_lip_maximizer_serum', name: 'ディオール アディクト リップ マキシマイザー セラム 美容液 リップケア Dior 保湿', query: 'ディオール リップ マキシマイザー セラム' },
    { brand: 'shiseido_moilip_medicated', name: '資生堂 モアリップ 医薬品 リップクリーム ビタミンE 口角炎 口唇炎 荒れ補修', query: 'モアリップ' }
  ];

  const lipCareItems = [];
  for (const cfg of lipCareConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipCareItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !lipCareItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipCareItems.push(valid);
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
    handItems,
    hairItems,
    lipCareItems
  };

  const outputPath = path.resolve('scratch/autumn_series4_items.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 第4弾 楽天APIより取得完了！保存先: ${outputPath}`);
  console.log(`取得商品数: ハンドケア=${handItems.length}件, ヘアケア=${hairItems.length}件, リップケア=${lipCareItems.length}件`);
}

fetchAutumnSeries4Items().catch(console.error);
