import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch41Items() {
  console.log('❄️ [11-12月コスメ 第41弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬ホリデー・聖夜の煌めき＆透明感】限定アイシャドウパレット＆冬のジュエルラメ・濡れツヤシャドウ 10選 ---
  console.log('\n=== テーマ1: ホリデー限定アイシャドウパレット＆冬のジュエルラメシャドウ ===');
  const eyeshadowConfigs = [
    { brand: 'dior_diorshow_5_couleurs_eyeshadow', name: 'Christian Dior ディオールショウ サンク クルール アイシャドウ パレット 7g 高発色 サテン マット ベルベット', query: 'ディオールショウ サンク クルール' },
    { brand: 'suqqu_signature_color_eyes_palette', name: 'SUQQU スック シグニチャー カラー アイズ 6.2g アイシャドウ パレット 上品 パール 濡れツヤ', query: 'SUQQU シグニチャー カラー アイズ' },
    { brand: 'lunasol_eye_coloration_palette', name: 'LUNASOL ルナソル アイカラーレーション 6.7g アイシャドウ パレット 多色ラメ 濡れツヤ 透け感', query: 'ルナソル アイカラーレーション' },
    { brand: 'tom_ford_eye_color_quad_eyeshadow', name: 'TOM FORD BEAUTY トム フォード ビューティ アイ カラー クォード 9g 高級 ラグジュアリー', query: 'トムフォード アイカラークォード' },
    { brand: 'chanel_les_4_ombres_eyeshadow_palette', name: 'CHANEL シャネル レ キャトル オンブル 2g 4色 アイシャドウ パレット 定番 ホリデー', query: 'シャネル レキャトルオンブル' },
    { brand: 'addiction_the_eyeshadow_palette_sparkle', name: 'ADDICTION アディクション ザ アイシャドウ パレット + 6.5g ベルベット スパークル 繊細ラメ', query: 'アディクション アイシャドウ パレット' },
    { brand: 'decorte_eye_glow_gem_skin_shadow', name: 'コスメデコルテ アイグロウジェム スキンシャドウ 6g 単色 アイシャドウ 濡れツヤ 密着', query: 'コスメデコルテ アイグロウジェム スキンシャドウ' },
    { brand: 'dasique_shadow_palette_holiday_glitter', name: 'dasique デイジーク シャドウパレット 9色 アイシャドウ パレット 韓国コスメ ミュート グリッター', query: 'デイジーク シャドウパレット' },
    { brand: 'clio_pro_eye_palette_air_kbeauty', name: 'CLIO クリオ プロ アイ パレット エアー 12色 アイシャドウ 韓国コスメ 多質感 高密着', query: 'クリオ プロ アイ パレット エアー' },
    { brand: 'canmake_silky_souffle_eyes_petit_palette', name: 'CANMAKE キャンメイク シルキースフレアイズ / プティパレットアイズ プチプラ 透けツヤ 高密着', query: 'キャンメイク シルキースフレアイズ' }
  ];

  const eyeshadowItems = [];
  for (const cfg of eyeshadowConfigs) {
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
        eyeshadowItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・ガサガサ手荒れ＆あかぎれを即効リペア】薬用高保湿ハンドクリーム＆冬ギフトに喜ばれる極上フレグランスハンドセラム 10選 ---
  console.log('\n=== テーマ2: 薬用高保湿ハンドクリーム＆極上フレグランスハンドセラム ===');
  const handCareConfigs = [
    { brand: 'loccitane_shea_butter_hand_cream_150ml', name: 'L\'OCCITANE ロクシタン シア ハンドクリーム 150ml / 30ml シアバター20% 保湿の王道', query: 'ロクシタン シア ハンドクリーム 150ml' },
    { brand: 'chanel_la_creme_main_hand_cream', name: 'CHANEL シャネル ラ クレーム マン 50ml ハンドクリーム 卵型デザイン 上品 保湿 ギフト', query: 'シャネル ラクレームマン' },
    { brand: 'aesop_resurrection_aromatique_hand_balm', name: 'Aesop イソップ レスレクション ハンドバーム 75ml アンドラム アロマ シトラス ウッディ', query: 'イソップ レスレクション ハンドバーム 75ml' },
    { brand: 'shiro_sabon_hand_serum_hydrating', name: 'SHIRO シロ サボン ハンド美容液 30g がごめ昆布 シアバター 高保湿 みずみずしい', query: 'SHIRO サボン ハンド美容液' },
    { brand: 'buly_pommade_concrete_hand_cream', name: 'OFFICINE UNIVERSELLE BULY オフィシーヌ・ユニヴェルセル・ビュリー ポマード・コンクレット 75g', query: 'ビュリー ポマード コンクレット' },
    { brand: 'dior_miss_dior_hand_cream_scented', name: 'Christian Dior ディオール ミス ディオール ハンド クリーム 50ml ローズウォーター 香り ギフト', query: 'ミス ディオール ハンド クリーム' },
    { brand: 'atrix_beauty_charge_night_superior_cream', name: 'atrix アトリックス ビューティーチャージ ナイトスペリア 98g 美容液カプセル 夜用ハンドケア', query: 'アトリックス ビューティーチャージ ナイトスペリア' },
    { brand: 'yuskin_medicated_cream_moisturizer_120g', name: 'ユースキン 120g ポンプ / ボトル 医薬部外品 ビタミンB2 C ひび あかぎれ 手荒れ治療', query: 'ユースキン 120g' },
    { brand: 'curel_intensive_moisture_hand_cream_50g', name: 'Curel キュレル 潤浸保湿 ハンドクリーム 50g 医薬部外品 セラミド機能成分 敏感肌 手荒れ', query: 'キュレル ハンドクリーム 50g' },
    { brand: 'locobase_repair_cream_hard_barrier_30g', name: 'ロコベースリペア クリーム 30g 第一三共ヘルスケア ハードタイプ 密着シールド 水仕事 あかぎれ', query: 'ロコベースリペア クリーム 30g' }
  ];

  const handCareItems = [];
  for (const cfg of handCareConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handCareItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・暖房乾燥でもひび割れ知らずの生ツヤ美肌】高保湿美容液クッションファンデ＆濃厚バームファンデーション 10選 ---
  console.log('\n=== テーマ3: 高保湿美容液クッションファンデ＆濃厚バームファンデーション ===');
  const cushionConfigs = [
    { brand: 'cle_de_peau_teint_cushion_eclat_lumineux', name: 'Clé de Peau Beauté クレ・ド・ポー ボーテ タンクッションエクラ ルミヌ SPF25 PA+++ 美容液ツヤ肌', query: 'クレドポーボーテ タンクッションエクラ ルミヌ' },
    { brand: 'dior_diorskin_forever_skin_glow_cushion', name: 'Christian Dior ディオールスキン フォーエヴァー グロウ クッション SPF50 PA+++ 潤い持続', query: 'ディオールスキン フォーエヴァー グロウ クッション' },
    { brand: 'tirtir_mask_fit_crystal_mesh_cushion', name: 'TIRTIR ティルティル マスクフィット クリスタルメッシュクッション / オーラクッション 水光肌 ツヤ', query: 'TIRTIR クリスタルメッシュクッション' },
    { brand: 'jungsaemmool_essential_skin_nuder_cushion', name: 'JUNG SAEM MOOL ジョンセンムル エッセンシャル スキン ヌーダー クッション 韓国コスメ 密着ツヤ', query: 'ジョンセンムル スキンヌーダー クッション' },
    { brand: 'laura_mercier_flawless_lumiere_cushion', name: 'laura mercier ローラ メルシエ フローレス ルミエール ラディアンス パーフェクティング クッション', query: 'ローラメルシエ フローレス ルミエール クッション' },
    { brand: 'decorte_zen_wear_glow_liquid_cushion', name: 'コスメデコルテ ゼン ウェア グロウ SPF20 PA++ 30ml / クッション 高密着 上品ツヤ肌', query: 'コスメデコルテ ゼンウェア グロウ' },
    { brand: 'rmk_liquid_foundation_flawless_coverage', name: 'RMK リクイドファンデーション フローレスカバレッジ 30ml みずみずしい 素肌美 密着保湿', query: 'RMK リクイドファンデーション フローレスカバレッジ' },
    { brand: 'covermark_flawless_fit_compact_foundation', name: 'COVERMARK カバーマーク フローレス フィット SPF35 PA+++ エマルジョンパクト 生肌ヴェール', query: 'カバーマーク フローレスフィット' },
    { brand: 'haku_botanic_science_serum_cushion', name: 'HAKU メラノフォーカス 美容液クッション コンパクト / ボタニックサイエンス オーバル シミカバー 薬用', query: 'HAKU クッションコンパクト' },
    { brand: 'missha_m_cushion_foundation_neo_cover', name: 'MISSHA ミシャ M クッション ファンデーション ネオカバー SPF50+ PA+++ 光のヴェール プチプラ', query: 'ミシャ クッションファンデ ネオカバー' }
  ];

  const cushionItems = [];
  for (const cfg of cushionConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cushionItems.push(valid);
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
    theme1_eyeshadow: eyeshadowItems,
    theme2_handcare: handCareItems,
    theme3_cushion: cushionItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch41_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${eyeshadowItems.length}件, テーマ2: ${handCareItems.length}件, テーマ3: ${cushionItems.length}件 を scratch/rakuten_winter_batch41_items.json に保存しました。`);
}

fetchWinterBatch41Items().catch(console.error);
