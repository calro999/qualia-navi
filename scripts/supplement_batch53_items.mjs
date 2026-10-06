import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch53() {
  console.log('🔄 [第53弾 不足アイテム補充] 楽天OpenAPIから各テーマ10商品になるよう追加検索します...');

  const batch53Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch53_items.json', 'utf8'));

  // --- テーマ1 補完 (目標10件) ---
  console.log('\n--- テーマ1 (エクソソーム美容液) 補充 ---');
  const t1Queries = [
    { brand: 'kiso_stem_serum_japan', name: 'KISO 基礎化粧品 ステムセラム 30ml 国産ヒト幹細胞培養液 高濃度 原液美容液', query: 'KISO ステムセラム' },
    { brand: 'nanoa_stem_cell_serum', name: 'NANOA ナノア SCセラム 30ml 医師共同開発 ヒト幹細胞培養液 EGF FGF 配合美容液', query: 'NANOA 美容液' },
    { brand: 'dermlaser_exosome_serum', name: 'クオリティファースト ダーマレーザー ウルセラEX 30ml エクソソーム 高濃度ナノカプセル美容液', query: 'ダーマレーザー ウルセラ エクソソーム' },
    { brand: 'tokyo_cosmetics_exosome', name: 'ヒト幹細胞 エクソソーム 美容液 原液 導入美容液 30ml ハリ ツヤ 高保湿 エイジングケア', query: 'ヒト幹細胞 エクソソーム 美容液' }
  ];

  for (const q of t1Queries) {
    if (batch53Data.theme1_exosome_serum.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !batch53Data.theme1_exosome_serum.some(ex => ex.itemCode === valid.itemCode)) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        batch53Data.theme1_exosome_serum.push(valid);
        console.log(`✅ [テーマ1追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2 補完 (目標10件) ---
  console.log('\n--- テーマ2 (超音波トリートメントアイロン) 補充 ---');
  // ケアプロ重複やKiboer重複のチェックと除去
  const seenCodes = new Set();
  batch53Data.theme2_ultrasonic_iron = batch53Data.theme2_ultrasonic_iron.filter(item => {
    if (seenCodes.has(item.itemCode)) return false;
    seenCodes.add(item.itemCode);
    return true;
  });

  const t2Queries = [
    { brand: 'care_pro_bui01_salon', name: 'CARE PRO ケアプロ プロフェッショナル BUI-01 サロン専用 超音波トリートメント促進器', query: 'CARE PRO BUI-01' },
    { brand: 'ultrasonic_treatment_device_japan', name: '超音波 トリートメント アイロン ヘアケア 浸透 防水 コードレス サロン級 美髪', query: '超音波 トリートメント アイロン' },
    { brand: 'yaman_night_repair_iron', name: 'YA-MAN ヤーマン ナイトリペアアイロン YJHB4N ナイトケア トリートメント浸透 超音波低温ケア', query: 'ヤーマン ナイトリペアアイロン' },
    { brand: 'hair_treatment_penetration_iron', name: 'ヘア トリートメント 浸透 超音波 アイロン 美容家電 サロン仕様 LED 赤外線', query: '超音波 ヘアアイロン トリートメント' },
    { brand: 'bome_ultrasonic_hair_iron', name: 'プロフェッショナル 超音波 ヘアパック アイロン 浸透 美髪ケア IPX7防水 充電式', query: 'トリートメント 浸透 超音波' }
  ];

  for (const q of t2Queries) {
    if (batch53Data.theme2_ultrasonic_iron.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !batch53Data.theme2_ultrasonic_iron.some(ex => ex.itemCode === valid.itemCode)) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        batch53Data.theme2_ultrasonic_iron.push(valid);
        console.log(`✅ [テーマ2追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3 補完 (目標10件) ---
  console.log('\n--- テーマ3 (IPL光美容器) 補充 ---');
  // パナソニックがアタッチメント2160円の場合は除外して本体を探す
  batch53Data.theme3_ipl_device = batch53Data.theme3_ipl_device.filter(it => it.itemPrice > 10000);

  const t3Queries = [
    { brand: 'panasonic_smooth_epi_device', name: 'パナソニック 光エステ スムースエピ ES-WG0A ハイパワー照射 冷却スキンケア 美顔機能付き IPL光美容器', query: 'パナソニック スムースエピ ES-WG0A 本体' },
    { brand: 'refa_beautech_epi_official', name: 'ReFa リファ ビューテック エピ RE-AL-02A 光美容器 ハイパワー IPL ムダ毛ケア フェイス ボディ', query: 'ReFa エピ' },
    { brand: 'datsumo_labo_home_edition', name: '脱毛ラボ ホームエディション DL001 家庭用IPL光脱毛器 サロン品質 冷却クーリング', query: '脱毛ラボ ホームエディション' }
  ];

  for (const q of t3Queries) {
    if (batch53Data.theme3_ipl_device.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 10000 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !batch53Data.theme3_ipl_device.some(ex => ex.itemCode === valid.itemCode)) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        batch53Data.theme3_ipl_device.push(valid);
        console.log(`✅ [テーマ3追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  console.log(`\n最終アイテム件数:`);
  console.log(`- テーマ1: ${batch53Data.theme1_exosome_serum.length}件`);
  console.log(`- テーマ2: ${batch53Data.theme2_ultrasonic_iron.length}件`);
  console.log(`- テーマ3: ${batch53Data.theme3_ipl_device.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch53_items.json', JSON.stringify(batch53Data, null, 2), 'utf8');
}

supplementBatch53();
