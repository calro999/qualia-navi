import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch71() {
  console.log('🔄 不足アイテムの追加取得を開始します...');
  const jsonPath = path.resolve('scratch/rakuten_winter_batch71_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // テーマ1で不足している2件を追加
  const missingLipQueries = [
    { brand: 'mentholatum_melty_cream_lip_moist', name: 'ロート製薬 メンソレータム メルティクリームリップ 高保湿 とろける 体温 唇 うるおい 乾燥 UVカット', query: 'メンソレータム メルティクリームリップ' },
    { brand: 'nivea_deep_moisture_lip_honey', name: 'ニベア ディープモイスチャー リップ はちみつの香り 高保湿 ビタミンE アミノ酸 薬用 唇荒れ ひび割れ 花王', query: 'ニベア ディープモイスチャー リップ' }
  ];

  for (const cfg of missingLipQueries) {
    if (data.theme1_medicinal_lip_balm_mask.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (data.theme1_medicinal_lip_balm_mask.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_medicinal_lip_balm_mask.push(valid);
        console.log(`✅ [追加リップ] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // テーマ3で不足している3件を追加
  const missingFragranceQueries = [
    { brand: 'fiancee_hair_fragrance_pure_shampoo', name: 'フィアンセ フレグランスヘアミスト ピュアシャンプーの香り うるおい 保湿 ツヤ トリートメント 爽やか プチプラ', query: 'フィアンセ ヘアフレグランス' },
    { brand: 'ysl_libre_hair_mist_perfume', name: 'イヴ・サンローラン YSL リブレ ヘアミスト ザクロエキス配合 保湿 ツヤ 上品な香り ラグジュアリー デパコス ギフト', query: 'イヴサンローラン リブレ ヘアミスト' },
    { brand: 'sabon_hair_mist_jasmine_delicate', name: 'SABON サボン ヘアミスト デリケート・ジャスミン ホホバオイル 潤い 静電気防止 ツヤ 保湿 フレグランス プレゼント', query: 'SABON ヘアミスト' }
  ];

  for (const cfg of missingFragranceQueries) {
    if (data.theme3_hair_fragrance_solid_perfume.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 700) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (data.theme3_hair_fragrance_solid_perfume.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_hair_fragrance_solid_perfume.push(valid);
        console.log(`✅ [追加フレグランス] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 不足分補充完了！`);
  console.log(`最新状況: テーマ1=${data.theme1_medicinal_lip_balm_mask.length}件, テーマ2=${data.theme2_serum_foundation_cushion.length}件, テーマ3=${data.theme3_hair_fragrance_solid_perfume.length}件`);
}

fillMissingBatch71().catch(console.error);
