import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch39Items() {
  console.log('❄️ [11-12月コスメ 第39弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬ホリデー・聖夜を彩る温もりと洗練の香り】ホリデー限定フレグランス＆冬のプレミアム香水・ヘアミスト 10選 ---
  console.log('\n=== テーマ1: ホリデーフレグランス＆冬香水・ヘアミスト ===');
  const fragranceConfigs = [
    { brand: 'jomalone_wood_sage_sea_salt_cologne', name: 'Jo Malone London ジョー マローン ロンドン ウッド セージ ＆ シー ソルト コロン 30ml / 50ml / 100ml', query: 'ジョーマローン ウッドセージ＆シーソルト コロン' },
    { brand: 'maison_margiela_replica_by_the_fireplace', name: 'Maison Margiela REPLICA メゾン マルジェラ レプリカ オードトワレ バイ ザ ファイヤープレイス 100ml', query: 'メゾンマルジェラ レプリカ バイザファイヤープレイス' },
    { brand: 'diptyque_orpheon_eau_de_parfum', name: 'diptyque ディプティック オードパルファン オルフェオン 75ml 香水', query: 'ディプティック オルフェオン オードパルファン' },
    { brand: 'shiro_freesia_mist_eau_de_parfum', name: 'SHIRO シロ パフューム FREESIA MIST フリージア ミスト オードパルファン 50ml / 100ml', query: 'SHIRO フリージアミスト オードパルファン' },
    { brand: 'chanel_chance_eau_tendre_hair_mist', name: 'CHANEL シャネル チャンス オー タンドゥル ヘア ミスト 35ml', query: 'シャネル チャンス オータンドゥル ヘアミスト' },
    { brand: 'dior_miss_dior_parfum_hair_mist', name: 'Christian Dior クリスチャンディオール ミス ディオール ヘア ミスト 30ml', query: 'ミスディオール ヘアミスト 30ml' },
    { brand: 'aux_paradis_winter_berry_eau_de_parfum', name: 'AUX PARADIS オゥパラディ ウィンターベリー オードパルファム 冬季限定 香水', query: 'オゥパラディ ウィンターベリー' },
    { brand: 'le_labo_santal_33_eau_de_parfum', name: 'LE LABO ル ラボ サンタル 33 SANTAL 33 オード パルファム 50ml / 100ml', query: 'ルラボ サンタル 33 オードパルファム' },
    { brand: 'byredo_gypsy_water_eau_de_parfum', name: 'BYREDO バイレード ジプシー ウォーター オードパルファン 50ml / 100ml', query: 'バイレード ジプシーウォーター オードパルファン' },
    { brand: 'chloe_eau_de_parfum_signature', name: 'Chloé クロエ オードパルファム 50ml / 75ml クラシック ローズ', query: 'クロエ オードパルファム 50ml' }
  ];

  const fragranceItems = [];
  for (const cfg of fragranceConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 0) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (cfg.filter && !cfg.filter(it)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
      
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        fragranceItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・ひび割れ・皮剥け唇を寝ている間に集中リペア】夜用リップスリーピングマスク＆高保湿リップトリートメントバーム 10選 ---
  console.log('\n=== テーマ2: 夜用リップスリーピングマスク＆高保湿リップトリートメントバーム ===');
  const lipMaskConfigs = [
    { brand: 'laneige_lip_sleeping_mask_berry', name: 'LANEIGE ラネージュ リップスリーピングマスク ベリー 20g 夜用リップパック 角質ケア', query: 'ラネージュ リップスリーピングマスク ベリー' },
    { brand: 'obagi_derma_power_x_lip_essence', name: 'Obagi オバジ ダーマパワーX リップ エッセンス 10g コラーゲン エラスチン 保湿', query: 'オバジ ダーマパワーX リップエッセンス' },
    { brand: 'curel_moisture_lip_care_cream_balm', name: 'Curel キュレル リップケア バーム 4.2g 医薬部外品 セラミド 消炎剤 濃密パック', query: 'キュレル リップケア バーム' },
    { brand: 'takami_lip_essence_treatment', name: 'TAKAMI タカミリップ 7g 唇用美容液 保湿 トリートメント 縦じわ 荒れ予防', query: 'タカミリップ 美容液' },
    { brand: 'torriden_solid_in_ceramide_lip_essence', name: 'Torriden トリデン ソリッドイン セラミド リップエッセンス 11ml 濃密高保湿 5D複合セラミド', query: 'トリデン ソリッドイン セラミド リップエッセンス' },
    { brand: 'tocobo_glow_ritual_lip_sleeping_mask', name: 'TOCOBO トコボ ビタグレーズド リップマスク 20ml 角質ケア 保湿 ナイトパック', query: 'トコボ リップマスク' },
    { brand: 'cnp_laboratory_propolis_lipcerin', name: 'CNP Laboratory プロポリス リップセリン 15ml 高保湿 保湿持続 プロポリス抽出物', query: 'CNP リップセリン' },
    { brand: 'shiseido_moilip_medicinal_lip_treatment', name: 'モアリップ 医薬品 リップクリーム 8g 口唇炎 口角炎 ビタミンE ビタミンB6', query: 'モアリップ 8g' },
    { brand: 'clarins_lip_comfort_oil_treatment', name: 'CLARINS クラランス リップ コンフォート オイル 7ml 植物オイルトリートメント ツヤ 保湿', query: 'クラランス リップコンフォートオイル' },
    { brand: 'dior_addict_lip_glow_butter_balm', name: 'Christian Dior クリスチャンディオール アディクト リップ グロウ リップバーム 3.2g', query: 'ディオール アディクト リップグロウ リップバーム' }
  ];

  const lipMaskItems = [];
  for (const cfg of lipMaskConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipMaskItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬ホリデー・指先から溢れる上品な輝き＆徹底保湿】ホリデー限定ネイルカラー＆高保湿ネイルオイル・甘皮ハンドケア名品 10選 ---
  console.log('\n=== テーマ3: ホリデー限定ネイルカラー＆高保湿ネイルオイル・ハンドケア ===');
  const nailCareConfigs = [
    { brand: 'uka_nail_oil_2445_holiday_care', name: 'uka ウカ ネイルオイル 24:45 5ml オーガニック バニラ ラベンダー オレンジ 甘皮ケア', query: 'uka ネイルオイル 24:45' },
    { brand: 'dior_vernis_creme_abricot_cuticle_cream', name: 'Christian Dior クリスチャンディオール クレーム アブリコ 10g ネイルクリーム 甘皮ケア 爪補修', query: 'ディオール クレーム アブリコ' },
    { brand: 'chanel_le_vernis_longwear_nail_colour', name: 'CHANEL シャネル ヴェルニ ロング トゥニュ ネイル エナメル マニキュア', query: 'シャネル ヴェルニ ロング トゥニュ' },
    { brand: 'opi_nail_envy_strengthener_treatment', name: 'O.P.I オーピーアイ ネイルエンビー NAIL ENVY 15ml 爪強化剤 二枚爪 割れ爪補修 トリートメント', query: 'OPI ネイルエンビー 15ml' },
    { brand: 'lcn_diamond_power_nail_hardener', name: 'LCN エルシーエヌ ダイヤモンドパワー 16ml トップコート ベースコート ダイヤモンド粒子 爪補強', query: 'LCN ダイヤモンドパワー 16ml' },
    { brand: 'canmake_foundation_colors_sheer_nail', name: 'CANMAKE キャンメイク ファンデーションカラーズ ネイルカラー シアー 美爪 血色ネイル', query: 'キャンメイク ファンデーションカラーズ' },
    { brand: 'excel_nail_holic_holiday_glossy_coat', name: 'excel エクセル ネイルポリッシュ N 10ml ニュアンスカラー 透け感 高発色 速乾', query: 'エクセル ネイルポリッシュ N' },
    { brand: 'loccitane_shea_nail_cuticle_oil', name: 'L\'OCCITANE ロクシタン シア ネイルオイル 7.5ml シアバター 甘皮保湿 ブラシタイプ', query: 'ロクシタン シア ネイルオイル' },
    { brand: 'shiseido_maquillage_glossy_nail_color', name: 'マキアージュ グロッシー ネイルカラー 速乾 トップコート つや 美爪', query: 'マキアージュ ネイル' },
    { brand: 'koizumi_sound_wave_nail_polisher_care', name: 'KOIZUMI コイズミ 電動ネイルケア 爪やすり 爪磨き ネイルポリッシャー', query: 'コイズミ ネイルポリッシャー' }
  ];

  const nailCareItems = [];
  for (const cfg of nailCareConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nailCareItems.push(valid);
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
    theme1_fragrance: fragranceItems,
    theme2_lip_mask: lipMaskItems,
    theme3_nail_care: nailCareItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch39_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${fragranceItems.length}件, テーマ2: ${lipMaskItems.length}件, テーマ3: ${nailCareItems.length}件 を保存しました。`);
}

fetchWinterBatch39Items().catch(console.error);
