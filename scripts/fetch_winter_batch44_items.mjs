import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch44Items() {
  console.log('❄️ [11-12月冬コスメ 第44弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬・乾燥くすみ＆毛穴開きを打破する高濃度ビタミンC】高浸透ビタミンC美容液＆浸透型VC誘導体セラム 10選 ---
  console.log('\n=== テーマ1: 高浸透ビタミンC美容液＆浸透型VC誘導体セラム ===');
  const vitaminCConfigs = [
    { brand: 'obagi_c25_serum_neo', name: 'Obagi オバジC25セラム ネオ 12ml 極限濃度ピュアビタミンC ハリ・毛穴・くすみ全方位ケア', query: 'オバジ C25セラム ネオ 12ml' },
    { brand: 'yunth_pure_vitamin_c_whitening_essence', name: 'Yunth ユンス 生ビタミンC 美白美容液 1ml×28包 個包装 ピュアビタミンC アスコルビン酸 導入液', query: 'Yunth 生ビタミンC 美白美容液' },
    { brand: 'dr_ci_labo_vc100_double_repair_serum', name: 'ドクターシーラボ VC100 ダブルリペアセラム 30ml 高浸透ビタミンC APPS × 高濃度セラミド 2層式', query: 'ドクターシーラボ VC100 ダブルリペアセラム 30ml' },
    { brand: 'melano_cc_premium_spot_essence', name: 'メラノCC 薬用 プレミアムしみ集中対策美容液 20ml ピュアビタミンC × 3種のビタミンC誘導体', query: 'メラノCC 薬用 プレミアムしみ集中対策美容液' },
    { brand: 'takami_essence_ce_vitamin', name: 'TAKAMI タカミ エッセンスCE 30ml ビタミンC・E配合 機能性美容液 毛穴キメ透明感ケア', query: 'タカミ エッセンスCE 30ml' },
    { brand: 'astalift_sparkle_tight_serum', name: 'ASTALIFT アスタリフト スパークル タイト セラム 50g 泡立つビタミンC誘導体 引き締め美容液', query: 'アスタリフト スパークル タイト セラム' },
    { brand: 'missha_vita_c_plus_ampoule', name: 'MISSHA ミシャ ビタシープラス 美容液 30ml リポソーム化ビタミンC カプセル ナイアシンアミド', query: 'ミシャ ビタシープラス 美容液 30ml' },
    { brand: 'innisfree_vitamin_c_green_tea_enzyme', name: 'innisfree イニスフリー ビタC グリーンティーエンザイム ブライト セラム 30ml 酵素×ビタミンC ガラス玉肌', query: 'イニスフリー ビタC グリーンティーエンザイム' },
    { brand: 'cosrx_the_vitamin_c_23_serum', name: 'COSRX ザ・ビタミンC23 セラム 20g 高濃度純粋ビタミンC 23% ヒアルロン酸 弾力・毛穴ケア', query: 'COSRX ビタミンC23 セラム 20g' },
    { brand: 'unlabel_lab_v_essence_vitamin_c', name: 'アンレーベル ラボ V エッセンス 50ml 超高圧浸透型ビタミンC誘導体 毛穴・くすみ集中アプローチ', query: 'アンレーベル ラボ V エッセンス 50ml' }
  ];

  const vitaminCItems = [];
  for (const cfg of vitaminCConfigs) {
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
        vitaminCItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・洗顔後のツッパリ＆粉ふき砂漠肌を完全阻止】高保湿モイスト洗顔フォーム＆濃密アミノ酸クッション泡洗顔 10選 ---
  console.log('\n=== テーマ2: 高保湿モイスト洗顔フォーム＆濃密アミノ酸クッション泡洗顔 ===');
  const cleanserConfigs = [
    { brand: 'kanebo_comfort_stretchy_wash', name: 'KANEBO カネボウ コンフォート ストレッチィ ウォッシュ 130g 糸引く濃密とろみ泡 保湿ヴェール洗顔', query: 'カネボウ コンフォート ストレッチィ ウォッシュ 130g' },
    { brand: 'orbis_u_dot_foaming_wash', name: 'ORBIS オルビス ユードット フォーミングウォッシュ 120g 医薬部外品 濃密クッション泡 くすみ吸着', query: 'オルビス ユードット フォーミングウォッシュ 120g' },
    { brand: 'obagi_x_frame_lift_mousse_wash', name: 'Obagi オバジX フレームリフト ムースウォッシュ 150g 炭酸マイクロ泡洗顔 ハリ肌土台づくり', query: 'オバジX フレームリフト ムースウォッシュ' },
    { brand: 'pola_ba_wash_n', name: 'POLA ポーラ B.A ウォッシュ N 100g 最高峰濃密泡 潤いを守りながら透き通るような洗い上がり', query: 'ポーラ BA ウォッシュ N 100g' },
    { brand: 'decorte_clay_blanc_cleanser', name: 'DECORTÉ コスメデコルテ クレイ ブラン 171g 天然ホワイトクレイ配合 すっきりなめらか透明感洗顔', query: 'コスメデコルテ クレイ ブラン 171g' },
    { brand: 'covermark_mineral_wash', name: 'COVERMARK カバーマーク ミネラルウォッシュ 125g ミネラルクレイ 濃密もっちり泡 乾燥肌用', query: 'カバーマーク ミネラルウォッシュ 125g' },
    { brand: 'fancl_mud_gel_facial_wash', name: 'FANCL ファンケル 泥ジェル洗顔 120g 泡立て不要 クレイ×黒ずみ毛穴ケア 保湿ジェル', query: 'ファンケル 泥ジェル洗顔 120g' },
    { brand: 'minon_amino_moist_gentle_wash_whip', name: 'MINON ミノン アミノモイスト ジェントルウォッシュ ホイップ 150ml アミノ酸系泡洗顔 敏感肌・乾燥肌', query: 'ミノン アミノモイスト ジェントルウォッシュ ホイップ' },
    { brand: 'est_clarifying_gel_wash', name: 'est エスト クラリファイイング ジェル ウォッシュ 130g くすみ角栓崩壊 濃密温感モイストジェル洗顔', query: 'エスト クラリファイイング ジェル ウォッシュ 130g' },
    { brand: 'etvos_moist_amino_foam', name: 'ETVOS エトヴォス モイストアミノフォーム 90g 植物性アミノ酸系洗浄成分 セラミド保護 低刺激', query: 'エトヴォス モイストアミノフォーム 90g' }
  ];

  const cleanserItems = [];
  for (const cfg of cleanserConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cleanserItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・極上おこもり美容＆翌朝の発光水光肌】濃密ハイドロゲルマスク＆高密着モデリングマスク 10選 ---
  console.log('\n=== テーマ3: 濃密ハイドロゲルマスク＆高密着モデリングマスク ===');
  const hydrogelConfigs = [
    { brand: 'biodance_bio_collagen_real_deep_mask', name: 'BIODANCE バイオダンス バイオコラーゲン リアルディープマスク 4枚入り 貼って寝る超密着ハイドロゲル 白から透明へ', query: 'バイオダンス バイオコラーゲン リアルディープマスク 4枚' },
    { brand: 'numbuzin_no4_sos_cooling_sheet_mask', name: 'numbuzin ナンバーズイン 4番 ひんやりクーリングシートマスク / ゲルマスク 毛穴引き締め 高密着', query: 'ナンバーズイン 4番 パック' },
    { brand: 'lindsay_modeling_mask_cup_pack', name: 'LINDSAY リンゼイ モデリングマスク カップパック 28g 自宅エステ 珪藻土 クールティーツリー 高保湿', query: 'リンゼイ モデリングマスク カップパック' },
    { brand: 'mediheal_hydrogel_mask_sheet', name: 'MEDIHEAL メディヒール コラーゲン インパクト ゲルマスク / アンプルマスク 高密着 水分爆弾', query: 'メディヒール コラーゲン アンプル パック' },
    { brand: 'torriden_dive_in_low_molecular_hyaluronic_mask', name: 'Torriden トリデン ダイブイン 低分子ヒアルロン酸 フェイスマスク 10枚 水分鎮静 ぷるぷる保湿', query: 'トリデン ダイブイン マスク 10枚' },
    { brand: 'anua_heartleaf_77_soothing_sheet_mask', name: 'Anua アヌア ドクダミ 77% スージングシートマスク 10枚 水分密着パック 肌荒れ鎮静', query: 'アヌア ドクダミ 77 シートマスク 10枚' },
    { brand: 'vt_reedle_shot_hydrogel_mask', name: 'VT リードルショット ハイドロゲル マスク 4枚入り CICA マイクロニードル技術 うるおい浸透', query: 'VT リードルショット マスク' },
    { brand: 'centellian24_madeca_derma_mask', name: 'Centellian24 センテリアン24 マデカ ダーマ マスク 10枚 TECA 高濃度ツボクサエキス 弾力・保湿', query: 'センテリアン24 マデカ マスク' },
    { brand: 'abib_gummy_sheet_mask_collagen', name: 'Abib アビブ コラーゲン ゲル マスク セダム / ガムシートマスク 高密着 水分密閉', query: 'アビブ コラーゲン ゲル マスク' },
    { brand: 'dr_jart_cryo_rubber_mask', name: 'Dr.Jart+ ドクタージャルト クライオ ラバー マスク 40g+4g 冷感ゴムマスク 高密着集中水分アンプル', query: 'ドクタージャルト クライオ ラバー マスク' }
  ];

  const hydrogelItems = [];
  for (const cfg of hydrogelConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hydrogelItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log('\n--- 取得結果サマリー ---');
  console.log(`テーマ1 (ビタミンC美容液): ${vitaminCItems.length}/10 アイテム取得`);
  console.log(`テーマ2 (高保湿洗顔フォーム): ${cleanserItems.length}/10 アイテム取得`);
  console.log(`テーマ3 (ハイドロゲル・モデリングマスク): ${hydrogelItems.length}/10 アイテム取得`);

  const result = {
    theme1_vitamin_c: vitaminCItems,
    theme2_cleanser: cleanserItems,
    theme3_hydrogel: hydrogelItems,
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch44_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('🎉 scratch/rakuten_winter_batch44_items.json に保存完了しました！');
}

fetchWinterBatch44Items().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
