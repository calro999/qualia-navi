import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch50Items() {
  console.log('❄️ [11-12月冬コスメ 第50弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【高保湿PHA/AHAボディピーリング美容液＆角質柔軟ミルク・スクラブ】 10選 ---
  console.log('\n=== テーマ1: ボディ角質ケア・二の腕ザラつき・ひじひざ黒ずみ対策 ===');
  const bodyPeelConfigs = [
    { brand: 'takami_skinpeel_body', name: 'TAKAMI タカミスキンピールボディ 200g 塗る角質ケアゲル 首元 ひじ ひざ かかと 全身なめらか', query: 'タカミスキンピールボディ 200g' },
    { brand: 'paulas_choice_bha_body', name: 'ポーラチョイス 2% BHA ボディローション 210ml サリチル酸 毛穴ケア 二の腕ザラつき 角質', query: 'ポーラチョイス 2% BHA ボディローション' },
    { brand: 'rohto_zarapro_a', name: 'ロート製薬 メンソレータム ザラプロA 35g 第3類医薬品 尿素配合 サメ肌 二の腕ブツブツ軟化', query: 'ザラプロA 35g' },
    { brand: 'sabon_body_scrub_plv', name: 'SABON サボン ボディスクラブ パチュリ・ラベンダー・バニラ 600g 死海ソルト ボタニカルオイル', query: 'SABON ボディスクラブ 600g パチュリ ラベンダー バニラ' },
    { brand: 'drci_body_pink', name: 'ドクターシーラボ 薬用ボディ・ピンク 50g 医薬部外品 持続型ビタミンC 黒ずみ くすみケア', query: 'ドクターシーラボ 薬用ボディ ピンク 50g' },
    { brand: 'cleansing_research_body_soap', name: 'BCL クレンジングリサーチ ボディピールソープ 480ml AHAリンゴ酸配合 全身角質つるつる泡', query: 'クレンジングリサーチ ボディピールソープ' },
    { brand: 'nivea_royal_blue_whitening', name: 'ニベア ロイヤルブルーボディミルク 美白 200g 医薬部外品 ビタミンC誘導体 高保水 大人のくすみ', query: 'ニベア ロイヤルブルーボディミルク 美白 200g' },
    { brand: 'zahrne_cream_eisai', name: 'エーザイ ザーネクリーム 100g 医薬部外品 天然型ビタミンE グリチルリチン酸 肌荒れ ひじ ひざ', query: 'ザーネクリーム 100g' },
    { brand: 'house_of_rose_oh_baby', name: 'ハウスオブローゼ Oh! Baby ボディ スムーザー N 570g 温泉水 スクラブ 角質ケア ひじ ひざ', query: 'ハウスオブローゼ Oh Baby ボディ スムーザー N 570g' },
    { brand: 'curel_moisture_balm', name: 'キュレル モイスチャーバーム 70g 医薬部外品 セラミド機能成分 ひじ かかと 濃厚高密着バーム', query: 'キュレル モイスチャーバーム 70g' }
  ];

  const bodyPeelItems = [];
  for (const cfg of bodyPeelConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 0) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bodyPeelItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【高保湿フェミニンオイル＆低刺激薬用デリケートゾーンソープ（フェムケア）】 10選 ---
  console.log('\n=== テーマ2: 高保湿フェミニンオイル＆低刺激デリケートゾーンソープ ===');
  const femConfigs = [
    { brand: 'iroha_intimate_wash_foam', name: 'iroha INTIMATE CARE イロハ インティメートウォッシュ フォームタイプ 150ml 弱酸性 濃密泡ソープ', query: 'iroha インティメートウォッシュ フォームタイプ' },
    { brand: 'iroha_intimate_oil', name: 'iroha INTIMATE CARE イロハ インティメート デリケートオイル 30ml 植物性高保湿オイル', query: 'iroha インティメート オイル 30ml' },
    { brand: 'argital_delicate_hygiene_soap', name: 'ARGITAL アルジタル デリケートハイジーンソープ 250ml シチリア海泥 スキンピュア 天然精油', query: 'アルジタル デリケートハイジーンソープ 250ml' },
    { brand: 'intime_organique_rose_lotion', name: 'アンティーム オーガニック ローズローション 100g デリケートゾーン 保湿潤滑ジェル', query: 'アンティーム ローズローション 100g' },
    { brand: 'laugh_intimate_wash', name: 'laugh. ラフドット インティメートウォッシュ 100ml 弱酸性 デリケートゾーンケア フローラケア', query: 'ラフドット インティメートウォッシュ' },
    { brand: 'maputi_white_cream', name: 'MAPUTI マプティ オーガニック フレグランス ホワイトクリーム 100ml デリケートゾーン 黒ずみ 保湿', query: 'MAPUTI ホワイトクリーム 100ml' },
    { brand: 'collage_furfur_soap_pink', name: '持田ヘルスケア コラージュフルフル 泡石鹸 ピンク 300ml 医薬部外品 抗真菌 抗カビ 低刺激', query: 'コラージュフルフル 泡石鹸 ピンク 300ml' },
    { brand: 'tres_maria_soap', name: 'トレスマリア ソープ 180g デリケートゾーン専用 弱酸性 国産 低刺激 アミノ酸洗浄料', query: 'トレスマリア ソープ 180g' },
    { brand: 'uka_lip_nail_fem', name: 'ウカ uka オーガニック フェミニン オイル または ウォッシュ デリケートケア', query: 'uka デリケートケア' },
    { brand: 'laurier_delicate_foam', name: '花王 ロリエ デリケート泡ウォッシュ 150ml 弱酸性 もっちり泡 デリケートゾーン専用ソープ', query: 'ロリエ デリケート泡ウォッシュ 150ml' }
  ];

  const femItems = [];
  for (const cfg of femConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        femItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【女性用薬用育毛美容液＆高機能スカルプエッセンス】 10選 ---
  console.log('\n=== テーマ3: 女性用薬用育毛美容液＆高機能スカルプエッセンス ===');
  const hairGrowthConfigs = [
    { brand: 'shiseido_adenovital_powershot', name: '資生堂 サブリミック アデノバイタル スカルプ パワーショット 120ml 医薬部外品 薬用育毛エッセンス', query: 'アデノバイタル スカルプ パワーショット 120ml' },
    { brand: 'scalpd_beaute_medical_estrology', name: 'アンファー スカルプD ボーテ 薬用スカルプセラム メディカルエストロジー 80ml 女性ホルモン 育毛剤', query: 'スカルプD ボーテ メディカルエストロジー 80ml' },
    { brand: 'mynature_hair_growth_lotion', name: 'マイナチュレ 薬用育毛剤 120ml 医薬部外品 女性用 無添加 センブリエキス グリチルリチン酸', query: 'マイナチュレ 薬用育毛剤 120ml' },
    { brand: 'wicot_medicated_scalp_serum', name: 'wicot ウィコット 薬用スカルプセラム 100ml 医薬部外品 日本初COSMOSオーガニック認証 薬用育毛剤', query: 'wicot 薬用スカルプセラム 100ml' },
    { brand: 'regenne_scalp_essence', name: '大正製薬 リジェンヌ 薬用スカルプエッセンス 130g 医薬部外品 女性用 頭皮保湿 抜け毛予防', query: 'リジェンヌ 薬用スカルプエッセンス 130g' },
    { brand: 'ca101_hair_essence', name: 'CA101 薬用ブラックヘアハーブ 120ml 医薬部外品 頭皮用美容液 育毛 薄毛 抜け毛 ボリューム', query: 'CA101 薬用ブラックヘアハーブ 120ml' },
    { brand: 'aveda_invati_ultra_advanced_serum', name: 'AVEDA アヴェダ インヴァティ ウルトラ アドバンス スカルプ セラム 150ml エイジングスカルプケア', query: 'アヴェダ インヴァティ アドバンス スカルプ セラム 150ml' },
    { brand: 'kerastase_genesis_serum', name: 'KERASTASE ケラスターゼ GN ジェネシス セラム フォーティファイ 90ml スカルプ美容液 根元ケア', query: 'ケラスターゼ ジェネシス セラム フォーティファイ 90ml' },
    { brand: 'lebel_viege_medicate_essence', name: 'LebeL ルベル ヴィージェ メディケートエッセンス 100ml 医薬部外品 薬用育毛エッセンス 女性用', query: 'ルベル ヴィージェ メディケートエッセンス 100ml' },
    { brand: 'pola_growing_shot_bk', name: 'POLA ポーラ グローイングショット BK 170ml 医薬部外品 薬用育毛美容液 黒髪 美髪 ハリコシ', query: 'ポーラ グローイングショット BK 170ml' }
  ];

  const hairGrowthItems = [];
  for (const cfg of hairGrowthConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairGrowthItems.push(valid);
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
    theme1_body_peel: bodyPeelItems,
    theme2_fem_care: femItems,
    theme3_hair_growth: hairGrowthItems
  };

  const outputPath = path.resolve('scratch/rakuten_winter_batch50_items.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第50弾アイテムの楽天API取得が完了しました！ 保存先: ${outputPath}`);
  console.log(`取得件数: ボディ角質ケア=${bodyPeelItems.length}件, フェムケア=${femItems.length}件, 育毛スカルプ=${hairGrowthItems.length}件`);
}

fetchWinterBatch50Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
