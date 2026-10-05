import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixAndCompleteBatch42Items() {
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch42_items.json', 'utf8'));

  console.log('🔄 不足アイテムの楽天API追加取得を開始します...');

  // テーマ1の不足分（4件追加して10件にする）
  const theme1Missing = [
    { brand: 'three_balancing_cleansing_oil', name: 'THREE スリー バランシング クレンジング オイル N 185ml 精油ブレンド オーガニック 洗い上がりしっとり', query: 'THREE クレンジングオイル' },
    { brand: 'cle_de_peau_cleansing_oil_luxury', name: 'Clé de Peau Beauté クレ・ド・ポー ボーテ ユイルデマキアントヴィサージュ 200ml 最高峰オイル 高保湿', query: 'クレドポーボーテ ユイルデマキアントヴィサージュ' },
    { brand: 'addiction_oil_cleansing_all_day_glow', name: 'ADDICTION アディクション オイルクレンジング オールデイ リセット 250ml まろやか厚みオイル 毛穴ケア', query: 'アディクション オイルクレンジング オールデイ' },
    { brand: 'cow_brand_mutenka_cleansing_oil', name: 'カウブランド 無添加 メイク落としオイル 150ml / 詰替 セラミド配合 敏感肌 低刺激 プチプラ名品', query: 'カウブランド メイク落としオイル' }
  ];

  for (const cfg of theme1Missing) {
    if (current.theme1_cleansingoil.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        current.theme1_cleansingoil.push(valid);
        console.log(`✅ [テーマ1追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ2の不足分（1件追加して10件にする）
  const theme2Missing = [
    { brand: 'tokio_ie_inkarami_platinum_set', name: 'TOKIO IE インカラミ プラチナム シャンプー ＆ トリートメント 各500ml フラーレン ケラチン結合 サロン級補修', query: 'TOKIO インカラミ プラチナム' },
    { brand: 'moroccanoil_moisture_repair_set', name: 'MOROCCANOIL モロッカンオイル モイスチャーリペア シャンプー ＆ コンディショナー 各250ml アルガンオイル 高保湿', query: 'モロッカンオイル シャンプー コンディショナー セット' }
  ];

  for (const cfg of theme2Missing) {
    if (current.theme2_salonhair.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        current.theme2_salonhair.push(valid);
        console.log(`✅ [テーマ2追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ3の不足分（1件追加して10件にする）
  const theme3Missing = [
    { brand: 'dprogram_allerbarrier_mist_sensitive', name: 'dプログラム アレルバリア ミスト N 57ml 資生堂 敏感肌 花粉 ちり ほこり 乾燥から守る 2層タイプ', query: 'dプログラム アレルバリア ミスト' },
    { brand: 'clarins_fix_make_up_setting_spray', name: 'CLARINS クラランス フィックス メイクアップ 50ml ミスト', query: 'クラランス フィックスメイクアップ' }
  ];

  for (const cfg of theme3Missing) {
    if (current.theme3_settingspray.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        current.theme3_settingspray.push(valid);
        console.log(`✅ [テーマ3追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // それぞれ10件に調整
  current.theme1_cleansingoil = current.theme1_cleansingoil.slice(0, 10);
  current.theme2_salonhair = current.theme2_salonhair.slice(0, 10);
  current.theme3_settingspray = current.theme3_settingspray.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch42_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${current.theme1_cleansingoil.length}件, テーマ2: ${current.theme2_salonhair.length}件, テーマ3: ${current.theme3_settingspray.length}件`);
}

fixAndCompleteBatch42Items().catch(console.error);
