import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch72() {
  console.log('🔄 [第72弾 補完] 未取得および差し替えアイテムを楽天APIから追加取得します...');
  const jsonPath = path.resolve('scratch/rakuten_winter_batch72_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. リンクルケア 不足3品
  const missingWrinkle = [
    { brand: 'pola_wrinkle_shot_medical_serum_n', name: 'POLA ポーラ リンクルショット メディカル セラム N 薬用シワ改善 美容液 ニールワン 有効成分 デパコス', query: 'ポーラ リンクルショット' },
    { brand: 'nameraka_wrinkle_eye_cream_n', name: 'なめらか本舗 リンクルアイクリーム ピュアレチノール 豆乳発酵液 ビタミンE誘導体 目元集中ケア サナ SANA', query: 'なめらか本舗 リンクルアイクリーム' },
    { brand: 'astalift_the_serum_wrinkle_repair', name: 'アスタリフト ザ セラム リンクルリペア 薬用シワ改善 美容液 ナイアシンアミド 富士フイルム アイクリーム', query: 'アスタリフト リンクルリペア' }
  ];

  for (const cfg of missingWrinkle) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_medicinal_wrinkle_cream.push(valid);
        console.log(`✅ [リンクル補完: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 取得失敗: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 2. ハンドケア 不足1品
  const missingHand = [
    { brand: 'atrix_beauty_charge_premium_hand_cream', name: 'アトリックス ビューティーチャージ プレミアム 薬用 ハンドクリーム 保湿 花王 コエンザイムQ10 ヒアルロン酸 桜色', query: 'アトリックス ビューティーチャージ プレミアム' }
  ];

  for (const cfg of missingHand) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_medicinal_hand_cream.push(valid);
        console.log(`✅ [ハンドケア補完: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 取得失敗: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 3. 入浴剤：ロクシタンを真の保湿バスミルク（ウルモア 高保湿 入浴液 または カウブランド ミルキィ）へ適正化
  const replaceBath = [
    { brand: 'urmoa_rich_moist_bath_liquid_ceramide', name: 'ウルモア 保湿入浴液 クリーミーフローラル セラミド コラーゲン シアバター 高保湿 乾燥肌 入浴料 アース製薬', query: 'ウルモア 保湿入浴液' }
  ];

  for (const cfg of replaceBath) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        // ロクシタンのボディミルク該当箇所を差し替え
        const idx = data.theme3_warmth_bicarbonate_bath_milk.findIndex(it => it.brandKey === 'loccitane_shea_baby_bath_milk' || it.itemName.includes('ボディミルク'));
        if (idx !== -1) {
          data.theme3_warmth_bicarbonate_bath_milk[idx] = valid;
        } else {
          data.theme3_warmth_bicarbonate_bath_milk.push(valid);
        }
        console.log(`✅ [入浴剤最適化: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log('\n=======================================');
  console.log(`補完完了結果: リンクルケア=${data.theme1_medicinal_wrinkle_cream.length}/10, ハンドケア=${data.theme2_medicinal_hand_cream.length}/10, 入浴料=${data.theme3_warmth_bicarbonate_bath_milk.length}/10`);
  console.log('=======================================');

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('🎉 30アイテムすべて正常に保存されました！');
}

fillMissingBatch72().catch(e => {
  console.error(e);
  process.exit(1);
});
