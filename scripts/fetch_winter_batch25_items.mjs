import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch25Items() {
  console.log('❄️ [11-12月コスメ 第25弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: まとめ髪スティック＆ポイントリペアヘアスティック 10選 ---
  console.log('\n=== テーマ1: まとめ髪スティック＆ポイントリペアヘアスティック ===');
  const hairStickConfigs = [
    { brand: 'plus_eau_point_repair', name: 'plus eau プリュスオー ポイントリペア ヘアスティック', query: 'プリュスオー ポイントリペア' },
    { brand: 'matomage_styling_stick_regular', name: 'ウテナ マトメージュ まとめ髪スティック レギュラー', query: 'マトメージュ まとめ髪スティック レギュラー' },
    { brand: 'matomage_styling_stick_strong', name: 'ウテナ マトメージュ まとめ髪スティック スーパーホールド', query: 'マトメージュ まとめ髪スティック スーパーホールド' },
    { brand: 'elujuda_point_care_stick', name: 'ミルボン エルジューダ ポイントケアスティック', query: 'ミルボン エルジューダ ポイントケアスティック' },
    { brand: 'fujiko_iroppoi_stick', name: 'Fujiko フジコ 色っぽいスティック / あほ毛スティック', query: 'フジコ あほ毛 スティック' },
    { brand: 'diane_maegami_stick', name: 'ダイアン パーフェクトビューティー マエガミスティック ナチュラル', query: 'ダイアン マエガミスティック' },
    { brand: 'and_honey_matome_stick', name: '&honey アンドハニー マトメイク スティック', query: 'アンドハニー マトメイクスティック' },
    { brand: 'uka_hair_oil_stick', name: 'uka ウカ ヘアオイルスティック / ヘアバーム', query: 'uka ヘアオイル スティック' },
    { brand: 'john_masters_hair_paste', name: 'ジョンマスターオーガニック スタイリングスティック / ヘアペースト', query: 'ジョンマスター ヘアスティック' },
    { brand: 'sleek_hair_fixer', name: 'スリーク by サラサロン ヘアリペア スティック / フィクサー', query: 'スリーク ヘアスティック' }
  ];

  const hairStickItems = [];
  for (const cfg of hairStickConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairStickItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 医薬品・薬用治療リップクリーム＆高保水リペア 10選 ---
  console.log('\n=== テーマ2: 医薬品・薬用治療リップクリーム＆高保水リペア ===');
  const healingLipConfigs = [
    { brand: 'shiseido_moilip', name: '資生堂 モアリップ 第3類医薬品', query: 'モアリップ 8g' },
    { brand: 'mentholatum_hibipro_lp', name: 'ロート製薬 メンソレータム ヒビプロ LP 第3類医薬品', query: 'ヒビプロ LP 6g' },
    { brand: 'yuskin_relip_cure', name: 'ユースキン リリップキュア 第3類医薬品', query: 'ユースキン リリップキュア 8.5g' },
    { brand: 'rohto_medical_lip', name: 'メンソレータム メディカルリップ 第3類医薬品', query: 'メンソレータム メディカルリップ' },
    { brand: 'obagi_derma_lip', name: 'オバジ ダーマパワーX リップエッセンス', query: 'オバジ ダーマパワーX リップエッセンス 10g' },
    { brand: 'curel_lip_care_balm', name: 'キュレル リップケアバーム 濃厚保湿 医薬部外品', query: 'キュレル リップケアバーム 4.2g' },
    { brand: 'kenei_baby_vaseline_lip', name: '健栄製薬 ベビーワセリンリップ 無香料', query: 'ベビーワセリンリップ 10g' },
    { brand: 'd_program_lip_moist_essence', name: '資生堂 dプログラム リップモイストエッセンス N 医薬部外品', query: 'dプログラム リップモイストエッセンス' },
    { brand: 'omi_menturm_medicated_stick', name: '近江兄弟社 メンターム 薬用メディカルリップバーム', query: 'メンターム メディカルリップ' },
    { brand: 'torriden_solid_in_lip', name: 'トリデン ソリッドイン セラミド リップエッセンス', query: 'トリデン セラミド リップエッセンス 11ml' }
  ];

  const healingLipItems = [];
  for (const cfg of healingLipConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        healingLipItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高保湿トナーパッド＆部分用リペア水分パッド 10選 ---
  console.log('\n=== テーマ3: 高保湿トナーパッド＆部分用リペア水分パッド ===');
  const tonerPadConfigs = [
    { brand: 'torriden_dive_in_pad', name: 'トリデン ダイブイン マルチパッド 低分子ヒアルロン酸', query: 'トリデン ダイブイン パッド' },
    { brand: 'numbuzin_no3_pad', name: 'ナンバーズイン 3番 すべすべキメケアシートマスク / トナーパッド', query: 'ナンバーズイン 3番 トナーパッド' },
    { brand: 'mediheal_madecassoside_pad', name: 'メディヒール マデカソサイド ブレミッシュパッド', query: 'メディヒール マデカソサイド パッド' },
    { brand: 'anua_heartleaf_pad', name: 'Anua アヌア ドクダミ77% クリアパッド', query: 'アヌア ドクダミ クリアパッド' },
    { brand: 'skinfood_carrot_pad', name: 'スキンフード キャロット カロテン カーミングウォーターパッド', query: 'スキンフード キャロットパッド' },
    { brand: 'numbuzin_no5_pad', name: 'ナンバーズイン 5番 白玉グルタチオンCふりかけパッド', query: 'ナンバーズイン 5番 パッド' },
    { brand: 'mediheal_tea_tree_pad', name: 'メディヒール ティーツリー トラブルパッド', query: 'メディヒール ティーツリー パッド' },
    { brand: 'manyo_panthetoin_pad', name: '魔女工場 パンテトイン エッセンストナーパッド', query: '魔女工場 トナーパッド' },
    { brand: 'vt_cica_pad', name: 'VT コスメティックス CICA マイルド トナーパッド', query: 'VT CICA トナーパッド 60枚' },
    { brand: 'bioheal_boh_lifting_pad', name: 'バイオヒールボ プロバイオダーム リフティングパッド', query: 'バイオヒールボ リフティング パッド' }
  ];

  const tonerPadItems = [];
  for (const cfg of tonerPadConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        tonerPadItems.push(valid);
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
    theme1_hairstick: hairStickItems,
    theme2_healinglip: healingLipItems,
    theme3_tonerpad: tonerPadItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch25_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: ヘアスティック=${hairStickItems.length}/10, 治療リップ=${healingLipItems.length}/10, トナーパッド=${tonerPadItems.length}/10`);
  console.log('scratch/rakuten_winter_batch25_items.json に保存しました！');
}

fetchWinterBatch25Items().catch(console.error);
