import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch71Items() {
  console.log('❄️ [11-12月冬コスメ 第71弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【薬用高保湿リップバーム＆夜用集中リップトリートメントマスク】 10選 ---
  console.log('\n=== テーマ1: 薬用高保湿リップバーム＆夜用集中リップトリートメントマスク ===');
  const lipBalmConfigs = [
    { brand: 'obagi_derma_power_x_lip_essence', name: 'オバジ Obagi ダーマパワーX リップエッセンス 高保湿 美容液 リップ エイジングケア ビタミンA エラスチン コラーゲン', query: 'オバジ ダーマパワーX リップエッセンス' },
    { brand: 'laneige_lip_sleeping_mask_berry', name: 'ラネージュ LANEIGE リップスリーピングマスク ベリー 高保湿 リップバーム 角質ケア 夜用 パック 韓国コスメ', query: 'ラネージュ リップスリーピングマスク' },
    { brand: 'curel_lip_care_balm_ceramide', name: 'キュレル Curel リップケアバーム セラミド 潤浸保湿 唇 ひび割れ 皮剥け 敏感肌 薬用 花王', query: 'キュレル リップケアバーム' },
    { brand: 'takami_lip_essence_ceramide', name: 'タカミ TAKAMI タカミリップ 唇用美容液 高保湿 セラミド 保湿 エイジングケア 縦じわ くすみ リップケア', query: 'タカミリップ' },
    { brand: 'torriden_solid_in_ceramide_lip_essence', name: 'トリデン Torriden ソリッドイン セラミド リップエッセンス 唇 保湿 ビーガン 集中保湿 韓国コスメ', query: 'トリデン セラミド リップエッセンス' },
    { brand: 'dior_addict_lip_maximizer_serum', name: 'ディオール Dior アディクト リップ マキシマイザー セラム リップ美容液 保湿 ヒアルロン酸 唇ふっくら', query: 'ディオール リップ マキシマイザー セラム' },
    { brand: 'canmake_plump_lip_care_scrub', name: 'キャンメイク CANMAKE プランプリップケアスクラブ 角質ケア 保湿 唇ケア シュガースクラブ 洗い流さない', query: 'キャンメイク プランプリップケアスクラブ' },
    { brand: 'rohto_mentholatum_moilip_medicated', name: '資生堂薬品 モアリップ 薬用リップクリーム 口唇炎 口角炎 ビタミンE アラントイン ひび割れ 医薬品', query: 'モアリップ 薬用リップクリーム' },
    { brand: 'and_honey_deep_moist_lip_oil_balm', name: 'アンドハニー and honey ディープモイスト リップバーム ハチミツ 高保湿 唇ケア 濃密 うるおい 保湿スティック', query: 'アンドハニー リップバーム' },
    { brand: 'ettusais_lip_edition_plumper', name: 'エテュセ ettusais リップエディション プランパー ヘルシースタイル グロス 美容液 リップ 高保湿 縦じわ補正', query: 'エテュセ リップエディション プランパー' }
  ];

  const lipBalmItems = [];
  for (const cfg of lipBalmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipBalmItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !lipBalmItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipBalmItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【高保湿・美容液ファンデーション＆生ツヤクッションファンデ】 10選 ---
  console.log('\n=== テーマ2: 高保湿・美容液ファンデーション＆生ツヤクッションファンデ ===');
  const foundationConfigs = [
    { brand: 'shiseido_essence_skinglow_foundation', name: 'SHISEIDO 資生堂 エッセンス スキングロウ ファンデーション 美容液ファンデ ツヤ肌 保湿 ナイアシンアミド ケフィア', query: 'SHISEIDO エッセンス スキングロウ ファンデーション' },
    { brand: 'tirtir_mask_fit_crystal_mesh_cushion', name: 'TIRTIR ティルティル マスクフィット クリスタル メッシュ クッション ファンデーション 水光肌 ツヤ クッション 韓国コスメ', query: 'TIRTIR クリスタル メッシュ クッション' },
    { brand: 'cle_de_peau_teint_cushion_eclat_lumineux', name: 'クレ・ド・ポー ボーテ タンクッションエクラ ルミヌ ファンデーション 保湿 美容液 ツヤ クッション 高級コスメ 資生堂', query: 'クレドポー タンクッションエクラ ルミヌ' },
    { brand: 'dior_forever_skin_glow_foundation', name: 'ディオール Dior ディオールスキン フォーエヴァー フルイド グロウ リキッドファンデーション 美容液 保湿 崩れにくい', query: 'ディオールスキン フォーエヴァー フルイド グロウ' },
    { brand: 'hince_second_skin_mesh_matte_glow_cushion', name: 'hince ヒンス セカンドスキン グロウ クッション メッシュ ファンデーション 薄膜 密着 ツヤ肌 韓国コスメ', query: 'hince セカンドスキン メッシュ クッション' },
    { brand: 'maquillage_dramatic_essence_liquid', name: 'マキアージュ MAQuillAGE ドラマティックエッセンスリキッド 美容液 リキッドファンデーション 毛穴補正 カバー 保湿 資生堂', query: 'マキアージュ ドラマティックエッセンスリキッド' },
    { brand: 'kanebo_lively_skin_wear_cream_foundation', name: 'カネボウ KANEBO ライブリースキン ウェア クリームファンデーション 素肌感 生ツヤ 保湿 カバー力 デパコス', query: 'カネボウ ライブリースキン ウェア' },
    { brand: 'missha_m_cushion_foundation_neo_cover', name: 'ミシャ MISSHA M クッション ファンデーション ネオカバー ハイカバー CICA 美容液 ツヤ感 プチプラ 韓国コスメ', query: 'ミシャ クッションファンデ ネオカバー' },
    { brand: 'rmk_liquid_foundation_flawless_coverage', name: 'RMK リクイドファンデーション フローレスカバレッジ うるおい カバー力 密着 素肌美 保湿 リキッド デパコス', query: 'RMK フローレスカバレッジ' },
    { brand: 'laura_mercier_flawless_lumiere_radiance', name: 'ローラ メルシエ フローレス ルミエール ラディアンス パーフェクティング クッション ファンデーション 保湿 生ツヤ 生肌感', query: 'ローラメルシエ フローレス ルミエール クッション' }
  ];

  const foundationItems = [];
  for (const cfg of foundationConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 900) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (foundationItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 900 && !it.itemName.includes('中古') && !foundationItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        foundationItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【極上ヘアフレグランスミスト＆練り香水（ソリッドパフューム）】 10選 ---
  console.log('\n=== テーマ3: 極上ヘアフレグランスミスト＆練り香水（ソリッドパフューム） ===');
  const fragranceConfigs = [
    { brand: 'miss_dior_hair_mist_parfum', name: 'ディオール Dior ミス ディオール ヘアミスト ヘアフレグランス 保湿 ツヤ ローズ フローラル 香水 ギフト', query: 'ミス ディオール ヘアミスト' },
    { brand: 'shiro_white_lily_hair_mist_savon', name: 'SHIRO シロ ホワイトリリー ヘアミスト 保湿 がごめ昆布 ユズ 保湿成分 香水 ヘアフレグランス 上品な香り', query: 'SHIRO ホワイトリリー ヘアミスト' },
    { brand: 'chanel_chance_eau_tendre_hair_mist', name: 'シャネル CHANEL チャンス オー タンドゥル ヘア ミスト フルーティ フローラル ヘアフレグランス デパコス ギフト', query: 'シャネル チャンス オー タンドゥル ヘアミスト' },
    { brand: 'jill_stuart_hair_mist_white_floral', name: 'ジルスチュアート JILL STUART トリートメント ヘアミスト ホワイトフローラル キューティクル補修 ツヤ うるおい プレゼント', query: 'ジルスチュアート ヘアミスト ホワイトフローラル' },
    { brand: 'diptyque_hair_fragrance_doson', name: 'ディプティック diptyque ヘアフレグランス ド ソン ヘアミスト カメリアオイル チュベローズ 高級香水 ギフト', query: 'ディプティック ヘアフレグランス ドソン' },
    { brand: 'shiro_solid_perfume_white_tea', name: 'SHIRO シロ 練り香水 ホワイトティー シアバター ミツロウ ソリッドパフューム 指先保湿 保湿バーム', query: 'SHIRO 練り香水' },
    { brand: 'canmake_make_me_happy_solid_perfume', name: 'キャンメイク CANMAKE メイクミーハッピー ソリッドパフューム 練り香水 ホホバオイル シアバター プチプラ 香水スティック', query: 'メイクミーハッピー ソリッドパフューム' },
    { brand: 'aesop_hair_hydrating_masque_mist', name: 'イソップ Aesop ヘアミスト ヘアハイドレーター 保湿 エッセンシャルオイル アロマ 植物由来 ボタニカル', query: 'イソップ ヘアミスト' },
    { brand: 'jo_malone_english_pear_hair_mist', name: 'ジョー マローン JO MALONE イングリッシュ ペアー ＆ フリージア ヘア ミスト アルガンオイル ツヤ 保湿', query: 'ジョーマローン ヘアミスト イングリッシュペアー' },
    { brand: 'loccitane_rose_hair_mist_perfume', name: 'ロクシタン L\'OCCITANE ローズ モイスチャライジング ヘアミスト 保湿 ツヤ フレッシュフローラル ギフト', query: 'ロクシタン ローズ ヘアミスト' }
  ];

  const fragranceItems = [];
  for (const cfg of fragranceConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 600) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (fragranceItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 600 && !it.itemName.includes('中古') && !fragranceItems.some(e => e.itemCode === it.itemCode));

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

  const outData = {
    theme1_medicinal_lip_balm_mask: lipBalmItems,
    theme2_serum_foundation_cushion: foundationItems,
    theme3_hair_fragrance_solid_perfume: fragranceItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch71_items.json');
  fs.writeFileSync(outPath, JSON.stringify(outData, null, 2), 'utf8');
  console.log(`\n🎉 第71弾 楽天API取得完了！保存先: ${outPath}`);
  console.log(`取得サマリー: リップケア=${lipBalmItems.length}件, ファンデーション=${foundationItems.length}件, ヘアフレグランス=${fragranceItems.length}件`);
}

fetchWinterBatch71Items().catch(e => {
  console.error('Fatal fetch error:', e);
  process.exit(1);
});
