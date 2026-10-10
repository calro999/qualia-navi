import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch75Items() {
  console.log('❄️ [11-12月冬コスメ 第75弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【2026クリスマスコフレ＆ホリデー限定アイシャドウパレット＆メイクキット】 10選 ---
  console.log('\n=== テーマ1: ホリデー限定アイシャドウパレット＆メイクアップコフレ ===');
  const holidayConfigs = [
    { brand: 'dior_diorshow_5_couleurs_holiday', name: 'クリスチャンディオール Dior ディオールショウ サンク クルール アイシャドウ ホリデー 限定 クリスマス デパコス', query: 'ディオール サンク クルール アイシャドウ' },
    { brand: 'lunasol_eye_coloration_holiday', name: 'カネボウ ルナソル LUNASOL アイカラーレーション アイシャドウ パレット ホリデー 限定 クリスマス 濡れツヤ デパコス', query: 'ルナソル アイカラーレーション' },
    { brand: 'decorte_eye_glow_gem_coffret', name: 'コスメデコルテ DECORTÉ アイグロウジェム スキングロウ または クリスマスコフレ ホリデー メイクアップ コフレ 限定', query: 'コスメデコルテ アイグロウジェム' },
    { brand: 'chanel_les_4_ombres_holiday', name: 'シャネル CHANEL レ キャトル オンブル 4色アイシャドウ パレット ホリデー 限定 クリスマス 高級デパコス', query: 'シャネル レ キャトル オンブル' },
    { brand: 'suqqu_signature_color_eyes', name: 'スック SUQQU シグニチャー カラー アイズ アイシャドウ パレット 贅沢ラメ 上品 重ね色 ホリデー デパコス', query: 'SUQQU シグニチャー カラー アイズ' },
    { brand: 'jill_stuart_holiday_collection', name: 'ジルスチュアート JILL STUART クリスマスコフレ ホリデーコレクション メイクアップ キット 限定 パレット リップ', query: 'ジルスチュアート コフレ' },
    { brand: 'cle_de_peau_ombre_couleur_quadri', name: '資生堂 クレ・ド・ポー ボーテ オンブルクルールクアドリ アイシャドウ ホリデー 限定 最高峰デパコス', query: 'クレ・ド・ポー ボーテ オンブルクルールクアドリ' },
    { brand: 'ysl_couture_mini_clutch', name: 'イヴ・サンローラン YSL クチュール ミニ クラッチ 4色アイシャドウ パレット 高密着 パール ラメ デパコス', query: 'イヴサンローラン クチュール ミニ クラッチ' },
    { brand: 'addiction_the_eyeshadow_palette', name: 'アディクション ADDICTION ザ アイシャドウ パレット ホリデー 限定 煌めき パール デパコス', query: 'アディクション ザ アイシャドウ パレット' },
    { brand: 'rmk_synchromatic_eyeshadow_palette', name: 'RMK シンクロマティック アイシャドウパレット 4色 パレット ホリデー 限定 絶妙レイヤード デパコス', query: 'RMK シンクロマティック アイシャドウパレット' }
  ];

  const holidayItems = [];
  for (const cfg of holidayConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (holidayItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !holidayItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        holidayItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【冬のくすみ肌にじゅわっと多幸感を宿す高保湿リキッド＆クリームチーク】 10選 ---
  console.log('\n=== テーマ2: 高保湿リキッドチーク＆生ツヤクリームチーク ===');
  const blushConfigs = [
    { brand: 'nars_afterglow_liquid_blush', name: 'NARS ナーズ アフターグロー リキッドブラッシュ 7ml スキンケア発想 リキッドチーク ヒアルロン酸 濡れツヤ デパコス', query: 'NARS アフターグロー リキッドブラッシュ' },
    { brand: 'decorte_cream_blush', name: 'コスメデコルテ DECORTÉ クリーム ブラッシュ 6g しっとり 生ツヤ 透け感 ハリ 立体感 デパコス チーク', query: 'コスメデコルテ クリーム ブラッシュ' },
    { brand: 'addiction_the_blush_nuancer', name: 'アディクション ADDICTION ザ ブラッシュ ニュアンサー / パール / マット チーク 多幸感 デパコス', query: 'アディクション ザ ブラッシュ' },
    { brand: 'fwee_lip_and_cheek_blurry_pudding', name: 'fwee フィー リップアンドチーク ブラーリー プリンポット ふんわり マシュマロ スフレ 韓国コスメ チーク リップ', query: 'fwee プリンポット' },
    { brand: 'cezanne_face_glow_color', name: 'セザンヌ CEZANNE フェイスグロウカラー 生ぷに質感 ハイライト チーク うるみツヤ プチプラ名品', query: 'セザンヌ フェイスグロウカラー' },
    { brand: 'canmake_cream_cheek', name: 'キャンメイク CANMAKE クリームチーク むちっとジェル じゅわっと血色感 プチプラ チーク', query: 'キャンメイク クリームチーク' },
    { brand: 'hince_true_dimension_radiance_balm', name: 'hince ヒンス トゥルーディメンション ラディアンスバーム スティック チーク ハイライト 生ツヤ 韓国コスメ', query: 'hince ラディアンスバーム' },
    { brand: 'dior_rosy_glow_blush', name: 'クリスチャンディオール Dior ロージー グロウ チーク pH反応 水分量 桜色 血色感 デパコス', query: 'ディオール ロージー グロウ' },
    { brand: 'elegance_sleek_face_n', name: 'エレガンス Elegance スリーク フェイス N クリームチーク みずみずしい 透けツヤ デパコス', query: 'エレガンス スリーク フェイス' },
    { brand: 'three_shimmering_glow_duo', name: 'THREE スリー シマリング グロー デュオ パレット チーク ハイライト 自然なツヤ 立体感 デパコス', query: 'スリー シマリング グロー デュオ' }
  ];

  const blushItems = [];
  for (const cfg of blushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (blushItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !blushItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        blushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【マフラー摩擦・静電気パサつきを鉄壁ガードする濃密補修ヘアオイル＆高保湿ヘアミルク】 10選 ---
  console.log('\n=== テーマ3: 濃密補修ヘアオイル＆うるおい高保湿ヘアミルク ===');
  const hairConfigs = [
    { brand: 'milbon_elujuda_emulsion_plus', name: 'ミルボン ディーセス エルジューダ エマルジョン+ 120g ヘアミルク 保湿 洗い流さないトリートメント サロン専売品', query: 'ミルボン エルジューダ エマルジョン+' },
    { brand: 'kerastase_elixir_ultime_oil', name: 'ケラスターゼ KERASTASE ユイルスブリム または フルイド オレオ リラックス 100ml 最高峰 ヘアオイル くせ毛 乾燥', query: 'ケラスターゼ フルイド オレオ リラックス 100ml' },
    { brand: 'moroccanoil_treatment_original', name: 'モロッカンオイル トリートメント 100ml ポンプ付き アルガンオイル 洗い流さないヘアオイル 保湿 まとまり 名品', query: 'モロッカンオイル トリートメント 100ml' },
    { brand: 'refa_lock_oil_treatment', name: 'ReFa リファ ロックオイル または ロックオイル ライト 100ml ヒートケア アイロン前 スタイリング ツヤ 束感', query: 'リファ ロックオイル 100ml' },
    { brand: 'orbis_essence_in_hair_milk', name: 'オルビス ORBIS エッセンスインヘアミルク 140g 洗い流さないトリートメント 美容液ミルク 無香料 プチプラ名品', query: 'オルビス エッセンスインヘアミルク' },
    { brand: 'track_oil_no3_kinmokusei', name: 'トラック オイル track oil No.3 ナンバースリー 90ml 金木犀の香り 天然由来99.19% 重めウェット ツヤ サロン専売品', query: 'トラック オイル No.3 90ml' },
    { brand: 'napla_n_dot_polish_oil_sc', name: 'ナプラ N. エヌドット ポリッシュオイル 150ml マンダリンオレンジまたはセージ＆クローブ シアバター 天然由来 ツヤ束感', query: 'エヌドット ポリッシュオイル 150ml' },
    { brand: 'and_honey_deep_moist_hair_oil', name: 'アンドハニー &honey ディープモイスト ヘアオイル 3.0 100ml はちみつ 保湿 乾燥 パサつき うねり', query: 'アンドハニー ディープモイスト ヘアオイル' },
    { brand: 'loretta_base_care_oil', name: 'ロレッタ Loretta ベースケアオイル 120ml 洗い流さないトリートメント ローズの香り さらさら 指通り', query: 'ロレッタ ベースケアオイル 120ml' },
    { brand: 'milbon_elujuda_sun_treatment_serum', name: 'ミルボン エルジューダ MO または FO または グレイスオン セラム 120ml 洗い流さないトリートメント ヘアオイル まとまり', query: 'ミルボン エルジューダ MO' }
  ];

  const hairItems = [];
  for (const cfg of hairConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hairItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !hairItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 取得完了結果:`);
  console.log(`- テーマ1 (ホリデー限定コフレ): ${holidayItems.length}件`);
  console.log(`- テーマ2 (高保湿チーク): ${blushItems.length}件`);
  console.log(`- テーマ3 (補修ヘアオイル＆ミルク): ${hairItems.length}件`);

  const outputData = {
    theme1_holiday_makeup_coffret: holidayItems,
    theme2_hydrating_cream_liquid_blush: blushItems,
    theme3_deep_repair_hair_oil_milk: hairItems,
    fetchedAt: new Date().toISOString()
  };

  const outDir = path.resolve('scratch');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, 'rakuten_winter_batch75_items.json');
  fs.writeFileSync(outFile, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`💾 scratch/rakuten_winter_batch75_items.json に保存完了しました！`);
}

fetchWinterBatch75Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
