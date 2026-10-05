import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch43Items() {
  console.log('❄️ [11-12月冬コスメ 第43弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬ホリデー・縦ジワ消滅＆ぷっくりボリュームアップ】高保湿リッププランパー＆美容液ボリュームグロス 10選 ---
  console.log('\n=== テーマ1: 高保湿リッププランパー＆美容液ボリュームグロス ===');
  const lipPlumperConfigs = [
    { brand: 'dior_addict_lip_maximizer', name: 'Dior ディオール アディクト リップ マキシマイザー 6ml ヒアルロン酸 カプサイシン ボリュームUP', query: 'ディオール アディクト リップ マキシマイザー 6ml' },
    { brand: 'jillstuart_crystal_bloom_lip_bouquet_serum', name: 'JILL STUART ジルスチュアート クリスタルブルーム リップブーケ セラム 6ml 花蜜リップ美容液 プランパー', query: 'ジルスチュアート リップブーケ セラム' },
    { brand: 'decorte_plumping_lip_serum', name: 'コスメデコルテ プランピング リップセラム 7ml 濃厚ツヤ 濃密うるおい ハリ感 ジンジャーエキス', query: 'コスメデコルテ プランピング リップセラム' },
    { brand: 'clarins_lip_comfort_oil', name: 'CLARINS クラランス リップコンフォートオイル 7ml 植物オイルトリートメント 高保湿プランプ', query: 'クラランス リップコンフォートオイル 7ml' },
    { brand: 'keybo_dotom_lip_plus_plumper', name: 'keybo キボ ドトム リッププラス プランパー 神レベルのピリピリ感 唇ふっくら 韓国コスメ', query: 'キボ リッププラス プランパー' },
    { brand: 'twany_lip_plumper_treatment', name: 'TWANY トワニー リッププランパー 美容液リップ ボリューム 縦ジワ補正 温感', query: 'トワニー リッププランパー' },
    { brand: 'romand_glasting_water_gloss', name: 'rom&nd ロムアンド グラスティング ウォーター グロス 水膜プランパー ミント成分配合 生ツヤ', query: 'ロムアンド グラスティング ウォーターグロス' },
    { brand: 'borica_lip_plumper_extra_rich', name: 'Borica ボリカ リッププランパー エクストラリッチ 美容液成分贅沢 縦ジワカバー ナイトケア兼用', query: 'ボリカ リッププランパー' },
    { brand: 'canmake_plump_lip_care_scrub', name: 'CANMAKE キャンメイク プランプリップケアスクラブ / プランパー 保湿 角質オフ プチプラ名品', query: 'キャンメイク プランプリップケアスクラブ' },
    { brand: 'tirtir_my_glow_plumping_lip_oil', name: 'TIRTIR ティルティル マイ グロウ プランピング リップオイル 濃密保湿ガラス玉ツヤ 韓国コスメ', query: 'TIRTIR リップオイル プランパー' }
  ];

  const lipPlumperItems = [];
  for (const cfg of lipPlumperConfigs) {
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
        lipPlumperItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・暖房による乾燥フケ・かゆみ＆頭皮冷えを根本ケア】高保湿スカルプエッセンス＆温感頭皮美容液 10選 ---
  console.log('\n=== テーマ2: 高保湿スカルプエッセンス＆温感頭皮美容液 ===');
  const scalpSerumConfigs = [
    { brand: 'aveda_invati_ultra_advanced_scalp_revitalizer', name: 'AVEDA アヴェダ インヴァティ ウルトラ アドバンス スカルプ エッセンス 150ml 植物幹細胞 頭皮環境改善', query: 'アヴェダ インヴァティ スカルプ エッセンス 150ml' },
    { brand: 'shiseido_adenovital_scalp_essence', name: '資生堂 アデノバイタル スカルプエッセンス 180ml 薬用育毛エッセンス アデノシン配合 根元ふんわり', query: '資生堂 アデノバイタル スカルプエッセンス' },
    { brand: 'aujua_moistcalm_moisture_lotion', name: 'Aujua オージュア モイストカーム モイスチュアローション 100ml 地肌用化粧水 乾燥フケかゆみ抑制', query: 'オージュア モイストカーム モイスチュアローション' },
    { brand: 'milbon_crona_scalp_sparkling_essence', name: 'MILBON ミルボン クロナ スカルプ スパークリング エッセンス 150g 炭酸スカルプ美容液 パチパチ温感血行促進', query: 'ミルボン クロナ スカルプ スパークリング エッセンス' },
    { brand: 'loccitane_anti_hairloss_scalp_serum', name: 'L\'OCCITANE ロクシタン 薬用 メディカル アンチヘアロス セラム 50ml 育毛スカルプエッセンス センブリエキス', query: 'ロクシタン 薬用 メディカル アンチヘアロス セラム' },
    { brand: 'uka_scalp_serum_hydrating', name: 'uka ウカ スカルプクレンジング Deep & Light / スカルプセラム バニリルブチル 温感ジンジャー 頭皮ケア', query: 'uka スカルプ クレンジング ディープ' },
    { brand: 'lacasta_aroma_este_scalp_repair_essence', name: 'La CASTA ラ・カスタ アロマエステ スカルプ リペア エッセンス 120ml オーガニックハーブ 頭皮保湿', query: 'ラカスタ スカルプ リペア エッセンス 120ml' },
    { brand: 'curel_scalp_moisturizing_lotion', name: 'Curel キュレル 頭皮保湿ローション 120ml 敏感肌用 セラミド機能成分 乾燥フケかゆみ撃退', query: 'キュレル 頭皮保湿ローション 120ml' },
    { brand: 'orbis_scalp_refining_essence', name: 'ORBIS オルビス スカルプリファイニング エッセンス 150ml 薬用頭皮美容液 医薬部外品 地肌のエイジングケア', query: 'オルビス スカルプリファイニング エッセンス' },
    { brand: 'sisley_hair_rituel_fortifying_serum', name: 'Sisley シスレー ヘア リチュアル フォーティファイング セラム フォー ザ スカルプ 60ml 最高峰頭皮美容液', query: 'シスレー ヘアリチュアル フォーティファイング セラム' }
  ];

  const scalpSerumItems = [];
  for (const cfg of scalpSerumConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scalpSerumItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・寒さで強張った角層を解きほぐす先行投資スキンケア】高保湿導入美容液＆濃密ブースターオイル 10選 ---
  console.log('\n=== テーマ3: 高保湿導入美容液＆濃密ブースターオイル ===');
  const boosterConfigs = [
    { brand: 'decorte_liposome_advanced_repair_serum', name: 'コスメデコルテ リポソーム アドバンスト リペアセラム 75ml / 50ml 多重層バイオリポソーム 王道ブースター', query: 'コスメデコルテ リポソーム アドバンスト リペアセラム 75ml' },
    { brand: 'sofina_ip_base_care_serum_carbonic', name: 'SOFINA iP ソフィーナiP ベースケア セラム 土台美容液 90g マイクロ炭酸泡 血流促進 うるおい浸透', query: 'ソフィーナip ベースケアセラム 土台美容液 90g' },
    { brand: 'lancome_genifique_advanced_n_serum', name: 'LANCOME ランコム ジェニフィック アドバンスト N 50ml / 100ml 美肌菌スキンケア 浸透先行美容液', query: 'ランコム ジェニフィック アドバンスト N 50ml' },
    { brand: 'rmk_w_treatment_oil_hydrating', name: 'RMK Wトリートメントオイル 50ml オイル層＆水層 2層式 先行オイルブースター 肌をやわらげる', query: 'RMK Wトリートメントオイル 50ml' },
    { brand: 'takami_skin_peel_water_peeling', name: 'TAKAMI タカミスキンピール 30ml 角質美容水 洗顔後すぐの肌習慣 キメ毛穴なめらか', query: 'タカミスキンピール 30ml' },
    { brand: 'kanebo_on_skin_essence_v_f', name: 'KANEBO カネボウ オン スキン エッセンス V / F 100ml 角層模倣ヴェール 瞬時に満たす化粧液', query: 'カネボウ オンスキン エッセンス 100ml' },
    { brand: 'albion_eclafutur_t_repair_serum', name: 'ALBION アルビオン エクラフチュール t 60ml 細胞修復先行美容液 ナノセスタBL なめらかツヤ', query: 'アルビオン エクラフチュール t 60ml' },
    { brand: 'attenir_primer_shot_ferment_serum', name: 'Attenir アテニア プライマーショット 30ml 高濃度発酵導入美容液 プルーン分解物 浸透ルート開拓', query: 'アテニア プライマーショット 30ml' },
    { brand: 'dr_ci_labo_vc100_double_repair_serum', name: 'ドクターシーラボ VC100 ダブルリペアセラム 30ml 高浸透ビタミンC APPS × セラミド 2層式ブースター', query: 'ドクターシーラボ VC100 ダブルリペアセラム' },
    { brand: 'muji_fermented_introductory_essence', name: '無印良品 発酵導入美容液 50ml 米ぬか発酵液 高保湿 プチプラ大バズり先行美容液', query: '無印良品 発酵導入美容液 50ml' }
  ];

  const boosterItems = [];
  for (const cfg of boosterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        boosterItems.push(valid);
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
    theme1_lipplumper: lipPlumperItems,
    theme2_scalpserum: scalpSerumItems,
    theme3_boosterserum: boosterItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch43_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${lipPlumperItems.length}件, テーマ2: ${scalpSerumItems.length}件, テーマ3: ${boosterItems.length}件 を scratch/rakuten_winter_batch43_items.json に保存しました。`);
}

fetchWinterBatch43Items().catch(console.error);
