import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch24Items() {
  console.log('❄️ [11-12月コスメ 第24弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: ヘパリン類似物質＆高精製ワセリン配合コスメ 10選 ---
  console.log('\n=== テーマ1: ヘパリン類似物質＆高精製ワセリン配合コスメ ===');
  const heparinConfigs = [
    { brand: 'carte_hd_all_in_one', name: 'カルテHD モイスチュア インストール 高保湿オールインワン', query: 'カルテHD 高保湿オールインワン' },
    { brand: 'ihada_medicated_balm', name: '資生堂 イハダ 薬用バーム', query: 'イハダ 薬用バーム 20g' },
    { brand: 'heparmild_cream', name: '健栄製薬 ヒルマイルド クリーム', query: 'ヒルマイルド クリーム 60g' },
    { brand: 'sunwhite_p1', name: '日興リカ サンホワイト P-1 高精製ワセリン', query: 'サンホワイト P-1 50g' },
    { brand: 'hepatreat_lotion', name: 'ヘパトリート 薬用保湿化粧水', query: 'ヘパトリート 薬用保湿化粧水 385ml' },
    { brand: 'carte_hd_emulsion', name: 'カルテHD モイスチュア エマルジョン 高保湿乳液', query: 'カルテHD 高保湿乳液' },
    { brand: 'ihada_night_pack', name: '資生堂 イハダ 薬用ナイトパック', query: 'イハダ 薬用ナイトパック' },
    { brand: 'carecera_ap_emulsion', name: 'ロート製薬 ケアセラ AP 高保湿先行バリア乳液', query: 'ケアセラ AP バリア乳液' },
    { brand: 'sahne_cream', name: 'エーザイ ザーネクリーム 医薬部外品', query: 'ザーネクリーム 100g' },
    { brand: 'curel_deep_moisture_spray', name: 'キュレル ディープモイスチャースプレー', query: 'キュレル ディープモイスチャースプレー 250g' }
  ];

  const heparinItems = [];
  for (const cfg of heparinConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        heparinItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高濃度炭酸泡パック＆炭酸土台美容液 10選 ---
  console.log('\n=== テーマ2: 高濃度炭酸泡パック＆炭酸土台美容液 ===');
  const carbonicConfigs = [
    { brand: 'sofina_ip_base_care_serum', name: 'ソフィーナiP ベースケア セラム 土台美容液', query: 'ソフィーナiP ベースケア セラム 土台美容液 90g' },
    { brand: 'medion_spaoxy_gel', name: 'ドクターメディオン スパオキシジェル 炭酸パック', query: 'ドクターメディオン スパオキシジェル' },
    { brand: 'kanebo_scrubbing_mud_wash', name: 'KANEBO スクラビング マッド ウォッシュ', query: 'KANEBO カネボウ スクラビング マッド ウォッシュ 130g' },
    { brand: 'ekato_precious_gel_pack', name: 'EKATO エカト プレシャスジェルパック 炭酸ガスパック', query: 'EKATO プレシャスジェルパック' },
    { brand: 'shikari_seiryu_wash', name: 'SHIKARI シカリ ブライトニングウォッシュ 洗顔パック', query: 'SHIKARI ブライトニングウォッシュ' },
    { brand: 'yunth_carbonic_foam_wash', name: 'Yunth ユンス マイクロ炭酸泡洗顔', query: 'Yunth マイクロ炭酸泡洗顔' },
    { brand: 'tns_carbonic_mist', name: 'タカミ スパークリングパック / 炭酸ミスト', query: '炭酸ミスト 炭酸スプレー コスメ' },
    { brand: 'hada_nature_cleansing', name: '肌ナチュール 炭酸クレンジング', query: '肌ナチュール 炭酸クレンジング 100g' },
    { brand: 'astatlift_sparkler_foam', name: 'アスタリフト スパークル タイト セラム 炭酸泡美容液', query: 'アスタリフト スパークル タイト セラム' },
    { brand: 'transino_clear_wash', name: 'トランシーノ 薬用クリアウォッシュEX / 泡洗顔', query: 'トランシーノ クリアウォッシュ' }
  ];

  const carbonicItems = [];
  for (const cfg of carbonicConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        carbonicItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高保湿ティントリップバーム＆カラーリップトリートメント 10選 ---
  console.log('\n=== テーマ3: 高保湿ティントリップバーム＆カラーリップトリートメント ===');
  const lipBalmConfigs = [
    { brand: 'dior_addict_lip_glow', name: 'ディオール アディクト リップ グロウ', query: 'ディオール アディクト リップ グロウ' },
    { brand: 'chanel_rouge_coco_baume', name: 'シャネル ルージュ ココ ボーム', query: 'シャネル ルージュ ココ ボーム' },
    { brand: 'opera_lip_tint', name: 'オペラ リップティント N', query: 'オペラ リップティント N' },
    { brand: 'nars_afterglow_lip_balm', name: 'NARS アフターグロー リップバーム', query: 'NARS アフターグロー リップバーム' },
    { brand: 'canmake_stay_on_balm_rouge', name: 'キャンメイク ステイオンバームルージュ', query: 'キャンメイク ステイオンバームルージュ' },
    { brand: 'mentholatum_lip_fondue', name: 'メンソレータム リップフォンデュ', query: 'メンソレータム リップフォンデュ' },
    { brand: 'bobbibrown_extra_lip_tint', name: 'ボビイ ブラウン エクストラ リップ ティント', query: 'ボビイブラウン エクストラ リップ ティント' },
    { brand: 'romand_glasting_melting_balm', name: 'ロムアンド グラスティング メルティングバーム', query: 'ロムアンド グラスティング メルティングバーム' },
    { brand: 'laka_bonding_glow_lipstick', name: 'Laka ラカ ボンディンググロウ リップスティック', query: 'Laka ボンディンググロウ' },
    { brand: 'torriden_ceramide_lip_tint', name: 'トリデン ソリッドイン セラミド リップエッセンス / リップバーム', query: 'トリデン ソリッドイン セラミド リップエッセンス' }
  ];

  const lipBalmItems = [];
  for (const cfg of lipBalmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipBalmItems.push(valid);
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
    theme1_heparin: heparinItems,
    theme2_carbonic: carbonicItems,
    theme3_lipbalm: lipBalmItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch24_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: ヘパリン＆ワセリン=${heparinItems.length}/10, 炭酸泡パック=${carbonicItems.length}/10, ティントリップバーム=${lipBalmItems.length}/10`);
  console.log('scratch/rakuten_winter_batch24_items.json に保存しました！');
}

fetchWinterBatch24Items().catch(console.error);
