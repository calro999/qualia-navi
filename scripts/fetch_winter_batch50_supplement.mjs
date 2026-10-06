import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch50() {
  console.log('🔄 [第50弾 補完] 各テーマが厳密に10商品ずつになるよう楽天APIから追加取得します...');
  const jsonPath = path.resolve('scratch/rakuten_winter_batch50_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // --- テーマ1: 不足分5件を補充 ---
  const t1Supplements = [
    { brand: 'paulas_choice_bha', name: 'ポーラチョイス スキン パーフェクティング 2% BHA リキッド 角質 毛穴ケア サリチル酸', query: 'ポーラチョイス BHA' },
    { brand: 'rohto_zarapro', name: 'ロート製薬 メンソレータム ザラプロA 35g 第3類医薬品 サメ肌 二の腕 尿素', query: 'メンソレータム ザラプロ' },
    { brand: 'house_of_rose_body_smoother', name: 'ハウスオブローゼ ボディ スムーザー N 570g 温泉水 スクラブ ひじ ひざ かかと', query: 'ハウスオブローゼ ボディ スムーザー' },
    { brand: 'nivea_royal_blue_body', name: 'ニベア ロイヤルブルーボディミルク 美白 200g 医薬部外品 ビタミンC誘導体 うるおい', query: 'ニベア ロイヤルブルー ボディミルク 美白' },
    { brand: 'yuskin_medicated_cream', name: 'ユースキン 120g ポンプ または ボトル 指定医薬部外品 ひび あかぎれ しもやけ 濃厚保湿', query: 'ユースキン 120g' },
    { brand: 'drci_body_pink_alt', name: 'ドクターシーラボ 薬用ボディ・ピンク 50g 医薬部外品 バストトップ ひじ ひざ くすみケア', query: '薬用ボディ ピンク' }
  ];

  for (const cfg of t1Supplements) {
    if (data.theme1_body_peel.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme1_body_peel.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_body_peel.push(valid);
        console.log(`✅ [テーマ1追加: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 不足分2件を補充 ---
  const t2Supplements = [
    { brand: 'pubicare_organic_wash', name: 'ピュビケア オーガニック フェミニン シフォン ソープ 220ml 弱酸性 濃密泡 デリケートソープ', query: 'ピュビケア フェミニン シフォン ソープ' },
    { brand: 'summers_eve_daily_wash', name: 'サマーズイブ フェミニンウォッシュ ノーマルスキン 237ml 弱酸性 デリケートゾーン ボディウォッシュ', query: 'サマーズイブ デリケートウォッシュ' },
    { brand: 'tres_maria_soap_alt', name: 'トレスマリア ソープ 180g デリケートゾーン用洗浄料 弱酸性', query: 'トレスマリア' }
  ];

  for (const cfg of t2Supplements) {
    if (data.theme2_fem_care.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme2_fem_care.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_fem_care.push(valid);
        console.log(`✅ [テーマ2追加: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 不足分4件を補充 ---
  const t3Supplements = [
    { brand: 'mynature_scalp_lotion', name: 'マイナチュレ 薬用育毛剤 120ml 医薬部外品 女性用 センブリエキス 薄毛 抜け毛 ハリコシ', query: 'マイナチュレ 育毛剤' },
    { brand: 'wicot_scalp_serum_supp', name: 'wicot 薬用スカルプセラム 100ml 医薬部外品 オーガニック認証 薬用育毛剤 女性用', query: 'wicot 育毛剤' },
    { brand: 'delmed_hair_essence', name: 'デルメッド ヘアエッセンス 120ml 医薬部外品 薬用育毛剤 女性用 セピアプロ配合 薄毛 抜け毛', query: 'デルメッド ヘアエッセンス 120ml' },
    { brand: 'mouga_l_essence', name: 'バスクリン モウガL 薬用育毛剤 60ml 医薬部外品 生薬有効成分 女性用 抜け毛予防', query: 'モウガL 60ml' },
    { brand: 'astalift_scalp_focus_essence', name: '富士フイルム アスタリフト スカルプフォーカス エッセンス 150ml ナノアスタキサンチン 頭皮美容液', query: 'アスタリフト スカルプフォーカス エッセンス' },
    { brand: 'kaminomoto_ladies_essence', name: '加美乃素 レディース加美乃素EX 150ml 医薬部外品 女性用薬用育毛剤 カミゲン 抜け毛', query: 'レディース加美乃素 150ml' }
  ];

  for (const cfg of t3Supplements) {
    if (data.theme3_hair_growth.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme3_hair_growth.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_hair_growth.push(valid);
        console.log(`✅ [テーマ3追加: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 10件ぴったりにトリミング
  data.theme1_body_peel = data.theme1_body_peel.slice(0, 10);
  data.theme2_fem_care = data.theme2_fem_care.slice(0, 10);
  data.theme3_hair_growth = data.theme3_hair_growth.slice(0, 10);

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 [補完完了] 全テーマ10商品ずつ確定しました！`);
  console.log(`テーマ1: ${data.theme1_body_peel.length}件, テーマ2: ${data.theme2_fem_care.length}件, テーマ3: ${data.theme3_hair_growth.length}件`);
}

supplementBatch50().catch(err => {
  console.error('Supplement error:', err);
  process.exit(1);
});
