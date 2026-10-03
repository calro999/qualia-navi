import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch26Items() {
  console.log('❄️ [11-12月コスメ 第26弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 薬用美白・シワ改善ハンドセラム＆手元エイジングケア美容液 10選 ---
  console.log('\n=== テーマ1: 薬用美白・シワ改善ハンドセラム＆手元エイジングケア美容液 ===');
  const handSerumConfigs = [
    { brand: 'attenir_hand_treatment', name: 'アテニア ハンドトリートメント ホワイト＆リンクル 医薬部外品', query: 'アテニア ハンドトリートメント' },
    { brand: 'obagi_derma_hand_serum', name: 'ロート製薬 オバジ ダーマパワーX ハンドセラム', query: 'オバジ ダーマパワーX ハンドセラム' },
    { brand: 'decorte_aq_hand_essence', name: 'コスメデコルテ AQ ハンドエッセンス', query: 'コスメデコルテ AQ ハンドエッセンス' },
    { brand: 'aesop_resurrection_hand_balm', name: 'Aesop イソップ レスレクション ハンドバーム / アンドラム', query: 'イソップ レスレクション ハンドバーム 75ml' },
    { brand: 'sabon_hand_serum', name: 'SABON サボン ハンドセラム デリケート・ジャスミン / パチュリ', query: 'SABON ハンドセラム' },
    { brand: 'orbis_release_hand_treatment', name: 'オルビス リリースバイタッチ ハンドトリートメント', query: 'オルビス リリースバイタッチ ハンドトリートメント' },
    { brand: 'macchia_label_hand_serum', name: 'マキアレイベル 薬用クリアエステハンドセラム', query: 'マキアレイベル 薬用クリアエステハンドセラム' },
    { brand: 'fancl_whitening_hand_serum', name: 'ファンケル 美白＆エイジングケア ハンドセラム 医薬部外品', query: 'ファンケル 美白 エイジングケア ハンドセラム' },
    { brand: 'shiro_white_lily_hand_serum', name: 'SHIRO シロ ホワイトリリー ハンド美容液', query: 'SHIRO ホワイトリリー ハンド美容液' },
    { brand: 'loccitane_immortelle_hand_serum', name: 'ロクシタン イモーテル オーバーナイトリセット ハンドセラム', query: 'ロクシタン シア ハンドセラム' }
  ];

  const handSerumItems = [];
  for (const cfg of handSerumConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handSerumItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 濡れた肌にそのまま塗るインバスボディミルク＆高保湿ボディトリートメント 10選 ---
  console.log('\n=== テーマ2: 濡れた肌にそのまま塗るインバスボディミルク＆高保湿ボディトリートメント ===');
  const inbathMilkConfigs = [
    { brand: 'curel_bath_time_moist_barrier', name: '花王 キュレル バスタタイム モイストバリアクリーム 医薬部外品', query: 'キュレル バスタイム モイストバリアクリーム' },
    { brand: 'biore_u_bath_moist_milk', name: '花王 ビオレu ぬれた肌に使うお風呂で使ううるおいミルク', query: 'ビオレu お風呂で使ううるおいミルク' },
    { brand: 'nivea_in_shower_body_milk', name: '花王 ニベア スキンミルク クリーミィ / インシャワー', query: 'ニベア スキンミルク クリーミィ 200g' },
    { brand: 'barth_premium_body_cream_bath', name: 'BARTH プレミアムボディクリーム at bath time', query: 'BARTH プレミアムボディクリーム' },
    { brand: 'minon_whole_body_moist_milk', name: '第一三共ヘルスケア ミノン 全身保湿ミルク 医薬部外品', query: 'ミノン 全身保湿ミルク 400ml' },
    { brand: 'lush_ro_argan_body_conditioner', name: 'LUSH ラッシュ ロウン アルガン ボディスクラブ / コンディショナー', query: 'ラッシュ ボディコンディショナー' },
    { brand: 'sabon_body_conditioner', name: 'SABON サボン ボディローション / コンディショナー', query: 'サボン ボディローション デリケートジャスミン' },
    { brand: 'weleda_skin_food_body_milk', name: 'WELEDA ヴェレダ スキンフード ボディミルク', query: 'ヴェレダ スキンフード ボディミルク' },
    { brand: 'and_honey_deep_moist_body_milk', name: '&honey アンドハニー ディープモイスト ボディミルク', query: 'アンドハニー ボディミルク 500ml' },
    { brand: 'johnson_dreamy_skin_body_lotion', name: 'ジョンソンボディケア ドリーミースキン アロマローション', query: 'ジョンソン ドリーミースキン アロマローション' }
  ];

  const inbathMilkItems = [];
  for (const cfg of inbathMilkConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        inbathMilkItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 冬の温もりオードパルファン＆ホリデー限定フレグランス 10選 ---
  console.log('\n=== テーマ3: 冬の温もりオードパルファン＆ホリデー限定フレグランス ===');
  const fragranceConfigs = [
    { brand: 'jomalone_english_pear_cologne', name: 'ジョー マローン ロンドン イングリッシュ ペアー ＆ フリージア コロン', query: 'ジョーマローン イングリッシュペアー 30ml' },
    { brand: 'maison_margiela_by_the_fireplace', name: 'メゾン マルジェラ レプリカ バイ ザ ファイヤープレイス オードトワレ', query: 'マルジェラ バイザファイヤープレイス' },
    { brand: 'diptyque_orpheon_eau_de_parfum', name: 'diptyque ディプティック オードパルファン オルフェオン / タムダオ', query: 'ディプティック オルフェオン 75ml' },
    { brand: 'shiro_white_lily_eau_de_parfum', name: 'SHIRO シロ ホワイトリリー オードパルファン', query: 'SHIRO ホワイトリリー オードパルファン 40ml' },
    { brand: 'ysl_libre_eau_de_parfum', name: 'イヴ・サンローラン リブレ オーデパルファム', query: 'イヴサンローラン リブレ オーデパルファム 30ml' },
    { brand: 'dior_miss_dior_parfum', name: 'ディオール ミス ディオール パルファン / ブルーミングブーケ', query: 'ミス ディオール ブルーミングブーケ 30ml' },
    { brand: 'chanel_chance_eau_tendre', name: 'シャネル チャンス オー タンドゥル オードゥ パルファム', query: 'シャネル チャンス オー タンドゥル 35ml' },
    { brand: 'tomford_tobacco_vanille', name: 'トム フォード ビューティ タバコ バニラ / ロスト チェリー オード パルファム', query: 'トムフォード タバコバニラ' },
    { brand: 'kilian_angels_share', name: 'キリアン パルファム エンジェルズ シェア オード パルファム', query: 'キリアン エンジェルズシェア' },
    { brand: 'byredo_gypsy_water', name: 'BYREDO バイレード ジプシー ウォーター オードパルファン', query: 'バイレード ジプシーウォーター 50ml' }
  ];

  const fragranceItems = [];
  for (const cfg of fragranceConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        fragranceItems.push(valid);
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
    theme1_handserum: handSerumItems,
    theme2_inbathmilk: inbathMilkItems,
    theme3_fragrance: fragranceItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch26_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: ハンドセラム=${handSerumItems.length}/10, インバスミルク=${inbathMilkItems.length}/10, フレグランス=${fragranceItems.length}/10`);
  console.log('scratch/rakuten_winter_batch26_items.json に保存しました！');
}

fetchWinterBatch26Items().catch(console.error);
