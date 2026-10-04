import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch38Items() {
  console.log('❄️ [11-12月コスメ 第38弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026年間ベストコスメ殿堂入り】美容のプロ・読者が選んだ神コスメ・スキンケア 10選 ---
  console.log('\n=== テーマ1: 年間ベストコスメ受賞・殿堂入り神コスメ ===');
  const bestcosmeConfigs = [
    { brand: 'decorte_liposome_advanced_repair_serum', name: 'コスメデコルテ リポソーム アドバンスト リペアセラム 75ml 美容液 殿堂入り', query: 'コスメデコルテ リポソーム アドバンスト リペアセラム 75ml' },
    { brand: 'cledepeau_le_serum_ii_booster', name: 'クレ・ド・ポー ボーテ ル・セラム 50ml 美容液 ブースター 導入液', query: 'クレ・ド・ポー ボーテ ル・セラム' },
    { brand: 'kanebo_rouge_star_vibrant_lip', name: 'KANEBO カネボウ ルージュスターヴァイブラント リップ 口紅 鼓動の赤', query: 'カネボウ ルージュスターヴァイブラント' },
    { brand: 'suqqu_the_foundation_luxury_cream', name: 'SUQQU スック ザ ファンデーション 30g 諭吉ファンデ クリームツヤ肌', query: 'SUQQU ファンデーション 30g', filter: it => it.itemPrice > 3000 },
    { brand: 'dior_addict_lip_maximizer_serum', name: 'Christian Dior クリスチャンディオール アディクト リップ マキシマイザー ヒアルロン酸 プランパー', query: 'ディオール アディクト リップ マキシマイザー' },
    { brand: 'lancome_genifique_ultimate_serum', name: 'LANCOME ランコム ジェニフィック アルティメ セラム 50ml 美肌菌 肌再生', query: 'ランコム ジェニフィック アルティメ' },
    { brand: 'esteelauder_advanced_night_repair_synchron', name: 'ESTEE LAUDER エスティローダー アドバンス ナイト リペア SMR コンプレックス 50ml', query: 'エスティローダー アドバンス ナイト リペア' },
    { brand: 'orbis_essence_in_hair_milk_leavein', name: 'ORBIS オルビス エッセンスインヘアミルク 洗い流さないトリートメント 無香料 美髪', query: 'オルビス エッセンスインヘアミルク' },
    { brand: 'covermark_treatment_cleansing_milk_moist', name: 'COVERMARK カバーマーク トリートメント クレンジング ミルク 200g 保湿クレンジング', query: 'カバーマーク トリートメント クレンジング ミルク' },
    { brand: 'pola_ba_eye_zone_cream_n_luxury', name: 'POLA ポーラ B.A アイゾーンクリーム N 26g 目元用エイジングケア アイクリーム', query: 'ポーラ アイゾーンクリーム' }
  ];

  const bestcosmeItems = [];
  for (const cfg of bestcosmeConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 0) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (cfg.filter && !cfg.filter(it)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
      
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bestcosmeItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【多幸感＆血色ツヤ肌】冬のくすみを一掃！ホリデー限定チーク＆ツヤ肌ハイライトパレット 10選 ---
  console.log('\n=== テーマ2: ホリデー限定チーク＆ツヤ肌ハイライトパレット ===');
  const blushHighlighterConfigs = [
    { brand: 'dior_backstage_face_glow_palette', name: 'Dior ディオール バックステージ フェイス グロウ パレット ハイライト チーク 4色', query: 'ディオール バックステージ フェイス グロウ パレット' },
    { brand: 'cledepeau_le_rehausseur_declat_glow', name: 'Clé de Peau Beauté クレ・ド・ポー ボーテ ル・レオスールデクラ ハイライティング パウダー', query: 'クレ・ド・ポー ボーテ ル・レオスールデクラ' },
    { brand: 'suqqu_pure_color_blush_gradation', name: 'SUQQU スック ピュア カラー ブラッシュ パウダーチーク グラデーション', query: 'SUQQU ピュア カラー ブラッシュ' },
    { brand: 'chanel_baume_essentiel_glow_stick', name: 'CHANEL シャネル ボーム エサンシエル スカルプティング フェイスカラー スティックハイライト', query: 'シャネル ボーム エサンシエル' },
    { brand: 'lauramercier_blush_colour_infusion', name: 'laura mercier ローラ メルシエ ブラッシュ カラー インフュージョン シアーチーク', query: 'ローラ メルシエ ブラッシュ カラー インフュージョン' },
    { brand: 'jillstuart_bloom_mix_blush_compact', name: 'JILL STUART ジルスチュアート ブルーム ミックスブラッシュ コンパクト 5色チーク', query: 'ジルスチュアート ブルーム ミックスブラッシュ' },
    { brand: 'rmk_pure_complexion_blush_glow', name: 'RMK ピュア コンプレクション ブラッシュ 透け感 チークカラー パウダー', query: 'RMK ピュア コンプレクション ブラッシュ' },
    { brand: 'nars_blush_n_talc_free_powder', name: 'NARS ナーズ ブラッシュ パウダーチーク タルクフリー 高発色', query: 'ナーズ ブラッシュ' },
    { brand: 'hince_true_dimension_glow_cheek', name: 'hince ヒンス トゥルーディメンショングロウチーク 水光チーク ハイライター', query: 'ヒンス トゥルーディメンショングロウチーク' },
    { brand: 'cezanne_face_glow_color_cushion_cheek', name: 'CEZANNE セザンヌ フェイスグロウカラー 生ぷに質感 ハイライト チーク 濡れツヤ', query: 'セザンヌ フェイスグロウカラー' }
  ];

  const blushHighlighterItems = [];
  for (const cfg of blushHighlighterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        blushHighlighterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【大切な彼やパートナーへ】失敗しない！メンズコスメ＆ジェンダーレス冬ギフト名品 10選 ---
  console.log('\n=== テーマ3: メンズコスメ＆ジェンダーレス冬ギフト名品 ===');
  const mensGiftConfigs = [
    { brand: 'shiseido_men_skincare_starter_kit', name: 'SHISEIDO MEN 資生堂メン アルティミューン パワライジング セラム 美容液 ギフト', query: 'SHISEIDO MEN アルティミューン 美容液' },
    { brand: 'aesop_resurrection_hand_body_gift_set', name: 'Aesop イソップ レスレクション ハンドバーム ハンドウォッシュ アンドラム アロマティック ギフトセット', query: 'イソップ ハンドバーム ギフトセット' },
    { brand: 'three_balancing_stem_mens_trial_kit', name: 'THREE スリー バランシングステム スキンケア ファーストキット ジェンダーレス', query: 'THREE バランシングステム キット' },
    { brand: 'bulkhomme_the_face_wash_toner_gift_box', name: 'BULK HOMME バルクオム THE FACE WASH 洗顔料 ＆ 化粧水 泡立てネット ギフトボックス', query: 'バルクオム ギフトセット' },
    { brand: 'loccitane_cedrat_homme_hand_shower_set', name: 'L\'OCCITANE ロクシタン セドラ / ケドラ オム ハンドクリーム シャワージェル ギフト', query: 'ロクシタン セドラ ギフト' },
    { brand: 'clinique_for_men_maximum_hydrator_set', name: 'CLINIQUE FOR MEN クリニーク フォーメン MX ハイドレーター 保湿ジェルクリーム', query: 'クリニーク フォーメン 保湿' },
    { brand: 'lab_series_max_ls_water_lotion_antiaging', name: 'LAB SERIES ラボ シリーズ マックス LS ウォーター ローション 200ml 高機能エイジングケア化粧水', query: 'ラボシリーズ マックス LS ローション' },
    { brand: 'diptyque_solid_perfume_holiday_gift', name: 'diptyque ディプティック ソリッドパフューム 練り香水 ドソン / オルフェオン / フィロシコス 高級ギフト', query: 'ディプティック ソリッドパフューム' },
    { brand: 'botchan_genderless_skincare_gift_set', name: 'BOTCHAN ボッチャン フォレストトナー ＆ ジェントルクレンザー ジェンダーレス スキンケアギフト', query: 'BOTCHAN ボッチャン スキンケア' },
    { brand: 'proudmen_suit_refresher_grooming_balm', name: 'PROUD MEN プラウドメン スーツリフレッシャー ＆ グルーミング 消臭 アロマ ギフト', query: 'プラウドメン スーツリフレッシャー' }
  ];

  const mensGiftItems = [];
  for (const cfg of mensGiftConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        mensGiftItems.push(valid);
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
    fetchedAt: new Date().toISOString(),
    theme1_bestcosme: bestcosmeItems,
    theme2_blush_highlighter: blushHighlighterItems,
    theme3_mens_gift: mensGiftItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch38_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${bestcosmeItems.length}件, テーマ2: ${blushHighlighterItems.length}件, テーマ3: ${mensGiftItems.length}件 を保存しました。`);
}

fetchWinterBatch38Items().catch(console.error);
