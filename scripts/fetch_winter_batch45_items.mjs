import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch45Items() {
  console.log('❄️ [11-12月冬コスメ 第45弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬・浸透しないゴワつき砂漠肌を突き破る針美容】塗るマイクロニードル美容液＆スピキュール導入セラム 10選 ---
  console.log('\n=== テーマ1: 塗るマイクロニードル美容液＆スピキュール導入セラム ===');
  const microneedleConfigs = [
    { brand: 'vt_reedle_shot_100', name: 'VT リードルショット 100 50ml CICA 天然マイクロニードル 導入美容液 チクチク美肌 毛穴キメ', query: 'VT リードルショット 100 50ml' },
    { brand: 'vt_reedle_shot_300', name: 'VT リードルショット 300 50ml CICA シカ 集中ニードルケア 浸透ブースター エイジングケア', query: 'VT リードルショット 300 50ml' },
    { brand: 'vt_reedle_shot_700', name: 'VT リードルショット 700 30ml 超高密度ニードル 週1集中スペシャルケア 毛穴・ハリ', query: 'VT リードルショット 700 30ml' },
    { brand: 'vt_pdrn_reedle_shot_100', name: 'VT PDRN リードルショット 100 50ml 植物性PDRN × マイクロニードル 水光肌 高保湿ハリ弾力', query: 'VT PDRN リードルショット 100' },
    { brand: 'medicube_zero_one_shot_spicule', name: 'medicube メディキューブ ゼロワンショット アンプル 30ml 微細針スピキュール 毛穴引き締め', query: 'メディキューブ ゼロワンショット 30ml' },
    { brand: 'presist_v_fix_amazing_cream', name: 'PRESIST プレジスト V fix アメージングクリーム 50g イノスピキュール 針美容クリーム ハリツヤ', query: 'プレジスト V fix アメージングクリーム' },
    { brand: 'numbuzin_no9_secret_firming_spicule', name: 'numbuzin ナンバーズイン 9番 ボリュームハリ アンプル / スピキュール美容液 エラスチン', query: 'ナンバーズイン 9番 ボリューム 美容液' },
    { brand: 'unlabel_lab_retinol_needle_serum', name: 'アンレーベル ラボ R エッセンス レチノール / ニードルセラム 高浸透 ハリ 乾燥小じわケア', query: 'アンレーベル ラボ レチノール エッセンス 50ml' },
    { brand: 'innisfree_retinol_cica_repair_ampoule', name: 'innisfree イニスフリー レチノール シカ リペア セラム 30ml 毎日使える低刺激 つるんとなめらか肌', query: 'イニスフリー レチノール シカ リペア セラム 30ml' },
    { brand: 'dr_ci_labo_enrich_lift_needle_serum', name: 'ドクターシーラボ エンリッチ メディカリフト ニードルセラム 15g マイクロニードル 目元口元 集中ケア', query: 'ドクターシーラボ メディカリフト ニードルセラム' }
  ];

  const microneedleItems = [];
  for (const cfg of microneedleConfigs) {
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
        microneedleItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・化粧水が逃げない潤いシールド＆極上もち肌】高保湿乳液＆濃密バリアエマルジョン 10選 ---
  console.log('\n=== テーマ2: 高保湿乳液＆濃密バリアエマルジョン ===');
  const emulsionConfigs = [
    { brand: 'decorte_hydra_clarity_emulsion', name: 'DECORTÉ コスメデコルテ イドラクラリティ コンディショニング トリートメント ソフナー 200ml 先行乳液', query: 'コスメデコルテ イドラクラリティ 乳液 200ml' },
    { brand: 'decorte_liposome_advanced_repair_cream_or_milk', name: 'DECORTÉ コスメデコルテ リポソーム アドバンスト リペアセラム 50ml / エマルジョン 多重層バイオリポソーム', query: 'コスメデコルテ リポソーム アドバンスト 50ml' },
    { brand: 'albion_flarune_bright_moyst_milk', name: 'ALBION アルビオン フラルネ フルリファイン ミルク M / EM 200g 濃厚先行乳液 もちもち肌', query: 'アルビオン フラルネ ミルク 200g' },
    { brand: 'elixir_lift_moist_emulsion_sp', name: 'ELIXIR エリクシール シュペリエル リフトモイスト エマルジョン SP II 130ml 薬用高保湿乳液 ハリ つや玉', query: 'エリクシール リフトモイスト エマルジョン SP 130ml' },
    { brand: 'minon_amino_moist_charge_milk', name: 'MINON ミノン アミノモイスト モイストチャージ ミルク 100g 敏感肌・乾燥肌 保湿乳液 アミノ酸', query: 'ミノン アミノモイスト モイストチャージ ミルク 100g' },
    { brand: 'curel_moisture_facial_milk', name: 'Curel キュレル 潤浸保湿 乳液 120ml セラミド機能成分 医薬部外品 肌荒れ・カサつき防止', query: 'キュレル 潤浸保湿 乳液 120ml' },
    { brand: 'pola_ba_milk_n', name: 'POLA ポーラ B.A ミルク N 80ml 最高峰ハリ弾力 濃密オイルエマルジョン ハリ感ヴェール', query: 'ポーラ BA ミルク N 80ml' },
    { brand: 'sisley_ecological_compound_advanced', name: 'sisley シスレー エコロジカル コムパウンド アドバンスト 60ml 美容乳液 バランスケア 高機能植物成分', query: 'シスレー エコロジカル コムパウンド 60ml' },
    { brand: 'ipsa_me_metabolizer_moist_milk', name: 'IPSA イプサ ME センシティブ / レギュラー 175ml ひとりひとりの酸素レベルに合わせる化粧液 乳液', query: 'イプサ ME 乳液 175ml' },
    { brand: 'avene_hydrance_deep_moist_emulsion', name: 'Avene アベンヌ イドラランス スキン トリートメント エマルジョン 40ml 深層保湿乳液 温泉水', query: 'アベンヌ ミルク 乳液 40ml' }
  ];

  const emulsionItems = [];
  for (const cfg of emulsionConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        emulsionItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・ホリデーギフト＆手肌を労わる贅沢アロマケア】高保湿フレグランスハンドソープ＆濃密リキッドハンドウォッシュ 10選 ---
  console.log('\n=== テーマ3: 高保湿フレグランスハンドソープ＆濃密リキッドハンドウォッシュ ===');
  const handwashConfigs = [
    { brand: 'aesop_resurrection_aromatique_hand_wash', name: 'Aesop イソップ レスレクション アロマティック ハンドウォッシュ 500ml マンダリン ローズマリー 手肌を乾燥させない', query: 'イソップ レスレクション ハンドウォッシュ 500ml' },
    { brand: 'jo_malone_english_pear_hand_body_wash', name: 'Jo Malone ジョー マローン イングリッシュ ペアー ＆ フリージア ボディ ＆ ハンド ウォッシュ 250ml', query: 'ジョーマローン ハンドウォッシュ 250ml' },
    { brand: 'shiro_savon_clay_hand_soap', name: 'SHIRO シロ サボン クレイハンドソープ 145ml 火山灰スクラブ 細かな汚れ 保湿アロエヴェラ', query: 'SHIRO サボン クレイハンドソープ' },
    { brand: 'shiro_white_lily_hand_soap', name: 'SHIRO シロ ホワイトリリー クレイハンドソープ 145ml 清潔感あふれるユリの香り 保湿成分配合', query: 'SHIRO ホワイトリリー クレイハンドソープ' },
    { brand: 'baum_aromatic_hand_wash', name: 'BAUM バウム アロマティック ハンドウォッシュ 300ml 森林浴の香り 樹木由来の保水力 清潔感', query: 'BAUM アロマティック ハンドウォッシュ 300ml' },
    { brand: 'loccitane_shea_liquid_soap_verbena', name: 'L\'OCCITANE ロクシタン シア リキッド ハンドソープ ヴァーベナ / ラベンダー 300ml シアバター高保湿', query: 'ロクシタン シア リキッド ハンドソープ 300ml' },
    { brand: 'molton_brown_orange_bergamot_hand_wash', name: 'MOLTON BROWN モルトンブラウン オレンジ＆ベルガモット ファインリキッド ハンドウォッシュ 300ml 英国王室御用達', query: 'モルトンブラウン ハンドウォッシュ 300ml' },
    { brand: 'thann_aromatic_wood_hand_wash', name: 'THANN タン ハンドウォッシュ AW アロマティックウッド 250ml コメヌカ油 オーガニックカモミール 高級スパ', query: 'THANN ハンドウォッシュ 250ml' },
    { brand: 'diptyque_softening_hand_wash', name: 'diptyque ディプティック エクスフォリエイティング / ソフニング ハンドウォッシュ 350ml ラベンダー オリーブシード', query: 'ディプティック ハンドウォッシュ 350ml' },
    { brand: 'le_labo_hinoki_hand_soap', name: 'LE LABO ル ラボ ハンドソープ ヒノキ / バジル 250ml 植物由来 高保湿 贅沢な余韻', query: 'LE LABO ハンドソープ 250ml' }
  ];

  const handwashItems = [];
  for (const cfg of handwashConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handwashItems.push(valid);
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
  console.log(`テーマ1 (マイクロニードル・スピキュール針美容液): ${microneedleItems.length}/10 アイテム取得`);
  console.log(`テーマ2 (高保湿乳液・エマルジョン): ${emulsionItems.length}/10 アイテム取得`);
  console.log(`テーマ3 (フレグランスハンドソープ・ハンドウォッシュ): ${handwashItems.length}/10 アイテム取得`);

  const result = {
    theme1_microneedle: microneedleItems,
    theme2_emulsion: emulsionItems,
    theme3_handwash: handwashItems,
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch45_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('🎉 scratch/rakuten_winter_batch45_items.json に保存完了しました！');
}

fetchWinterBatch45Items().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
