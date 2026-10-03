import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch29Items() {
  console.log('❄️ [11-12月コスメ 第29弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 涙袋ライナー＆涙袋コンシーラー・影色ペンシル 10選 ---
  console.log('\n=== テーマ1: 涙袋ライナー＆涙袋コンシーラー・影色ペンシル ===');
  const aegyoConfigs = [
    { brand: 'bbia_last_auto_gel_eyeliner', name: 'BBIA ピアー ラストオートジェルアイライナー 涙袋カラー', query: 'BBIA ラストオートジェルアイライナー 涙袋' },
    { brand: 'wonjungyo_metal_shower_pencil', name: 'Wonjungyo ウォンジョンヨ メタルシャワーペンシル 涙袋', query: 'ウォンジョンヨ メタルシャワーペンシル' },
    { brand: 'canmake_plump_lip_care_scrub_or_eye', name: 'CANMAKE キャンメイク アイバッグコンシーラー 涙袋', query: 'キャンメイク アイバッグコンシーラー' },
    { brand: 'cezanne_drawing_double_eyelid_eyeliner', name: 'CEZANNE セザンヌ 描くふたえアイライナー 影用', query: 'セザンヌ 描くふたえアイライナー' },
    { brand: 'cipicipi_glitter_illumination_liner', name: 'CipiCipi シピシピ ポイントコンシーラー / グリッター', query: 'シピシピ ポイントコンシーラー' },
    { brand: 'kate_double_line_expert', name: 'KATE ケイト ダブルラインエキスパート 極薄ブラウン', query: 'ケイト ダブルラインエキスパート' },
    { brand: 'colorgram_all_in_one_aegyo_maker', name: 'colorgram カラーグラム オールインワン涙袋メーカー', query: 'カラーグラム 涙袋メーカー' },
    { brand: 'majolica_majorca_shadow_customize', name: 'マジョリカ マジョルカ シャドーカスタマイズ 涙袋 BE286', query: 'マジョリカマジョルカ BE286' },
    { brand: 'etude_blush_or_tear_eyeliner', name: 'ETUDE エチュード ティアーアイライナー 涙袋ライナー', query: 'エチュード ティアーアイライナー' },
    { brand: 'judydoll_tear_trough_dual_concealer', name: 'JUDYDOLL ジュディドール 涙袋ペン / スティック', query: 'ジュディドール 涙袋' }
  ];

  const aegyoItems = [];
  for (const cfg of aegyoConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        aegyoItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 束感まつ毛＆暖房乾燥ガード まつ毛パーマコーティング・クリアマスカラ 10選 ---
  console.log('\n=== テーマ2: まつ毛コーティング剤＆クリアマスカラ・ラッシュフィクサー ===');
  const lashConfigs = [
    { brand: 'phoenix_eyelash_support_gel', name: 'フェニックス アイラッシュサポートジェル まつ毛コーティング', query: 'フェニックス アイラッシュサポートジェル' },
    { brand: 'canmake_quick_lash_curler_transparent', name: 'CANMAKE キャンメイク クイックラッシュカーラー 透明タイプ', query: 'キャンメイク クイックラッシュカーラー 透明' },
    { brand: 'cezanne_clear_mascara_r', name: 'CEZANNE セザンヌ クリア マスカラR まつ毛保護', query: 'セザンヌ クリアマスカラ' },
    { brand: 'elegance_curl_lash_fixer', name: 'Elégance エレガンス カールラッシュ フィクサー マスカラ下地', query: 'エレガンス カールラッシュ フィクサー' },
    { brand: 'kate_lash_maximizer_or_former_clear', name: 'KATE ケイト ラッシュフォーマー クリア まつ毛下地', query: 'ケイト ラッシュフォーマー クリア' },
    { brand: 'ettusais_eye_edition_mascara_base', name: 'ettusais エテュセ アイエディション マスカラベース', query: 'エテュセ マスカラベース' },
    { brand: 'lashaddict_transcara_clear', name: 'ラッシュアディクト トランスカラ まつ毛コーティング', query: 'ラッシュアディクト トランスカラ' },
    { brand: 'odid_or_clio_kill_lash_clear', name: 'CLIO クリオ キルラッシュ スーパープルーフ マスカラ下地', query: 'クリオ キルラッシュ マスカラ リムーバー フィクサー' },
    { brand: 'uzu_mote_mascara_clear', name: 'UZU BY FLOWFUSHI モテマスカラ CLEAR クリア', query: 'UZU モテマスカラ CLEAR' },
    { brand: 'pimel_perfect_lash_coating', name: 'pdc ピメル パーフェクトカールロックベース / うそつきマスカラ下地', query: 'ピメル カールロックベース' }
  ];

  const lashItems = [];
  for (const cfg of lashConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lashItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 人中短縮＆ふっくら立体粘膜リップ リップライナー＆リップペンシル 10選 ---
  console.log('\n=== テーマ3: 人中短縮＆ふっくら立体粘膜リップ リップライナー＆ペンシル ===');
  const lipLinerConfigs = [
    { brand: 'bbia_last_auto_gel_eyeliner_lip', name: 'BBIA ピアー ラストオートジェルアイライナー オーバーリップペンシル', query: 'ピアー ラストオートジェルアイライナー リップ' },
    { brand: 'heart_percent_doto_on_mood_lip_pencil', name: 'Heart Percent ハートパーセント ドットオンムード リップペンシル', query: 'ハートパーセント リップペンシル' },
    { brand: 'romand_lip_mate_pencil', name: 'rom&nd ロムアンド リップメイトペンシル 人中短縮', query: 'ロムアンド リップメイトペンシル' },
    { brand: 'kate_lip_monster_lip_shaper', name: 'KATE ケイト リップモンスター リップシェイパー', query: 'ケイト リップシェイパー' },
    { brand: 'canmake_creamy_touch_or_lip', name: 'CANMAKE キャンメイク むちぷるティント / リップライナー', query: 'キャンメイク リップライナー' },
    { brand: 'shiseido_lip_liner_ink_artist', name: '資生堂 SHISEIDO リップライナーインクアーティスト', query: '資生堂 リップライナーインクアーティスト' },
    { brand: 'mac_lip_pencil', name: 'M・A・C マック リップ ペンシル スパイス / サブカルチャー', query: 'MAC リップペンシル' },
    { brand: 'excel_lip_suit', name: 'エクセル excel リップスーツ / リップペンシル', query: 'エクセル リップスーツ' },
    { brand: 'chanel_le_crayon_levres', name: 'CHANEL シャネル ル クレイヨン レーヴル リップライナー', query: 'シャネル ル クレイヨン レーヴル' },
    { brand: 'clio_velvet_lip_pencil', name: 'CLIO クリオ ベルベット リップペンシル オーバーリップ', query: 'クリオ ベルベット リップペンシル' }
  ];

  const lipLinerItems = [];
  for (const cfg of lipLinerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipLinerItems.push(valid);
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
    theme1_aegyosal: aegyoItems,
    theme2_lashcoating: lashItems,
    theme3_lipliner: lipLinerItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch29_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: 涙袋ライナー=${aegyoItems.length}/10, まつ毛コーティング=${lashItems.length}/10, リップライナー=${lipLinerItems.length}/10`);
  console.log('scratch/rakuten_winter_batch29_items.json に保存しました！');
}

fetchWinterBatch29Items().catch(console.error);
