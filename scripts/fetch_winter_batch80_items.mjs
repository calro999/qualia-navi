import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch80Items() {
  console.log('❄️ [11-12月冬コスメ 第80弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 高保湿リッププランパー＆濃密リップ美容液 10選 ---
  console.log('\n=== テーマ1: 高保湿リッププランパー＆濃密リップ美容液 ===');
  const plumperConfigs = [
    { brand: 'dior_lip_maximizer', name: 'クリスチャンディオール ディオール アディクト リップ マキシマイザー 6ml リッププランパー', query: 'ディオール アディクト リップ マキシマイザー' },
    { brand: 'jillstuart_lip_bouquet_serum', name: 'ジルスチュアート クリスタルブルーム リップブーケ セラム 6ml リップ美容液 プランパー', query: 'ジルスチュアート リップブーケ セラム' },
    { brand: 'visee_essence_lip_plumper', name: 'ヴィセ エッセンス リッププランパー 5.5ml コーセー SP001 シアーピンク 保湿', query: 'ヴィセ エッセンス リッププランパー' },
    { brand: 'laneige_lip_sleeping_mask', name: 'ラネージュ LANEIGE リップスリーピングマスク 20g ベリー 保湿 ナイトケア リップバーム', query: 'ラネージュ リップスリーピングマスク' },
    { brand: 'torriden_solid_in_lip_essence', name: 'トリデン Torriden ソリッドイン セラミド リップエッセンス 11ml 高保湿 リップトリートメント', query: 'トリデン リップエッセンス セラミド' },
    { brand: 'clarins_lip_comfort_oil', name: 'クラランス CLARINS リップコンフォートオイル 7ml 美容液リップ 植物オイル 保湿 ツヤ', query: 'クラランス リップコンフォートオイル' },
    { brand: 'romand_glasting_water_gloss', name: 'ロムアンド rom&nd グラスティング ウォーター グロス プランパー 水光ティント 透明感', query: 'ロムアンド グラスティング ウォーター グロス' },
    { brand: 'fujiko_plumping_lip', name: 'Fujiko フジコ プランピーリップ または 朝可愛リップ 美容液 プランパー オイル', query: 'フジコ プランピーリップ' },
    { brand: 'keybo_lip_plus_plumper', name: 'キボ keybo リッププラス プランパー マスター 神 プランパー ボリューム 高保湿', query: 'keybo リッププランパー' },
    { brand: 'obagi_derma_power_x_lip', name: 'オバジ ダーマパワーX リップ エッセンス 10g ロート製薬 高機能 美容液リップ エイジングケア', query: 'オバジ ダーマパワーX リップエッセンス' }
  ];

  const plumperItems = [];
  for (const cfg of plumperConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (plumperItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !plumperItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        plumperItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿シートマスク＆濃密フェイスパック 10選 ---
  console.log('\n=== テーマ2: 高保湿シートマスク＆濃密フェイスパック ===');
  const maskConfigs = [
    { brand: 'lululun_precious_red_moist', name: 'ルルルンプレシャス RED モイスト 32枚入 高保湿 エイジングケア フェイスマスク', query: 'ルルルン プレシャス RED 32枚' },
    { brand: 'derma_laser_super_teatree100', name: 'クオリティファースト ダーマレーザー スーパー VC100 または セラミド100 シートマスク 7枚入', query: 'クオリティファースト ダーマレーザー VC100' },
    { brand: 'mediheal_n_m_f_ampoule_mask', name: 'メディヒール MEDIHEAL N.M.F アクア アンプルマスク JEX 3枚入 保湿 フェイスパック 韓国', query: 'メディヒール NMF アクア アンプルマスク' },
    { brand: 'torriden_dive_in_low_molecular_mask', name: 'トリデン Torriden ダイブイン 低分子ヒアルロン酸 マスクパック 10枚入 水分 保湿 シートマスク', query: 'トリデン ダイブイン マスクパック' },
    { brand: 'minon_amino_moist_mask', name: 'ミノン アミノモイスト ぷるぷるしっとり肌マスク 4枚入 第一三共ヘルスケア 敏感肌 乾燥肌 パック', query: 'ミノン アミノモイスト ぷるぷるしっとり肌マスク' },
    { brand: 'anua_heartleaf_cream_mask', name: 'Anua アヌア ドクダミ 77 または セラミド モイスチャー パック シートマスク 鎮静 保湿', query: 'アヌア ドクダミ パック シートマスク' },
    { brand: 'vt_cica_daily_soothing_mask', name: 'VT COSMETICS シカ デイリー スージングマスク 30枚入 または リードルショット マスク CICA', query: 'VT シカ デイリー スージングマスク' },
    { brand: 'kose_clear_turn_gomenne_bare_skin', name: 'コーセー クリアターン ごめんね素肌 クマひっそりアイマスク または 集中リペア キュア シートマスク', query: 'クリアターン ごめんね素肌 シートマスク' },
    { brand: 'hada_labo_gokujyun_premium_mask', name: '肌ラボ 極潤プレミアム ヒアルロンマスク または 極潤 濃密フェイスマスク ロート製薬 高保湿', query: '肌ラボ 極潤 プレミアム マスク' },
    { brand: 'keana_nadeshiko_rice_mask', name: '毛穴撫子 お米のマスク 10枚入 石澤研究所 ライスセラム 毛穴 保湿 うるおい シートマスク', query: '毛穴撫子 お米のマスク' }
  ];

  const maskItems = [];
  for (const cfg of maskConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (maskItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !maskItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        maskItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 濃厚ヘアマスク＆高保湿集中トリートメント 10選 ---
  console.log('\n=== テーマ3: 濃厚ヘアマスク＆高保湿集中トリートメント ===');
  const hairMaskConfigs = [
    { brand: 'fino_premium_touch_hair_mask', name: 'フィーノ fino プレミアムタッチ 浸透美容液ヘアマスク 230g ファイントゥデイ ダメージ補修', query: 'フィーノ プレミアムタッチ 浸透美容液ヘアマスク' },
    { brand: 'tsubaki_premium_repair_mask', name: '資生堂 TSUBAKI プレミアム EX リペアマスク 180g 待ち時間0秒 サロン帰り ツヤ 補修 ヘアパック', query: 'TSUBAKI プレミアムEX リペアマスク' },
    { brand: 'milbon_grand_linkage_treatment', name: 'ミルボン グランドリンケージ 4+ 4x サロントリートメント 4連 または ウィローリュクス ヘアトリートメント', query: 'ミルボン グランドリンケージ 4' },
    { brand: 'kerastase_masque_therapiste', name: 'ケラスターゼ KERASTASE レジスタンス マスク セラピュート または マスク クロノロジスト ヘアマスク', query: 'ケラスターゼ ヘアマスク クロノロジスト' },
    { brand: 'olaplex_no8_bond_intense_moisture', name: 'オラプレックス No.8 ボンド インテンス モイスチャーマスク 100ml ダメージ補修 サロン専売', query: 'オラプレックス No.8 モイスチャーマスク' },
    { brand: 'moroccanoil_intense_hydrating_mask', name: 'モロッカンオイル MOROCCANOIL インテンス ハイドレーティング マスク 250ml アルガンオイル 高保湿', query: 'モロッカンオイル ハイドレーティング マスク' },
    { brand: 'yolu_deep_night_repair_treatment', name: 'YOLU ヨル ディープナイトリペア ヘアトリートメント または ジェルヘアマスク ナイトケア 濃厚補修', query: 'YOLU ディープナイトリペア トリートメント' },
    { brand: 'ululis_water_booster_hair_pack', name: 'ウルリス ululis ウォーターブースター ヘアパック または ウォーターコンク リペア トリートメント', query: 'ウルリス ウォーターブースター ヘアパック' },
    { brand: 'plus_eau_point_repair_treatment', name: 'プリュスオー plus eau メロウリュクスマスク 200g または ハイドロミスト ヘアマスク サロン品質', query: 'プリュスオー メロウリュクスマスク' },
    { brand: 'diane_perfect_beauty_miracle_hair_mask', name: 'ダイアン パーフェクトビューティー ミラクルユー エクストラダメージリペア ヘアマスク オーガニックアルガンオイル', query: 'ダイアン ミラクルユー ヘアマスク' }
  ];

  const hairMaskItems = [];
  for (const cfg of hairMaskConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hairMaskItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !hairMaskItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairMaskItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const resultData = {
    theme1_hydrating_lip_plumper: plumperItems,
    theme2_nourishing_sheet_mask: maskItems,
    theme3_deep_repair_hair_mask: hairMaskItems,
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch80_items.json', JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 [完了] 3テーマの楽天実勢アイテム情報（計: プランパー=${plumperItems.length}, パック=${maskItems.length}, ヘアマスク=${hairMaskItems.length}）を scratch/rakuten_winter_batch80_items.json に保存しました！`);
}

fetchWinterBatch80Items().catch(e => {
  console.error('Fatal fetch error:', e);
  process.exit(1);
});
