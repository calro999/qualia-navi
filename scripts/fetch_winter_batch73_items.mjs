import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch73Items() {
  console.log('❄️ [11-12月冬コスメ 第73弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【濃密高保湿フェイスクリーム＆水分密閉ナイトクリーム】 10選 ---
  console.log('\n=== テーマ1: 濃密高保湿フェイスクリーム＆水分密閉ナイトクリーム ===');
  const creamConfigs = [
    { brand: 'kiehls_ultra_facial_cream_ufc', name: 'キールズ クリーム UFC 50ml または 125ml 高保湿 フェイスクリーム オリーブ由来スクワラン 敏感肌 うるおい', query: 'キールズ UFC クリーム 50ml' },
    { brand: 'curel_intensive_moisture_facial_cream', name: 'キュレル 潤浸保湿 フェイスクリーム 40g 医薬部外品 セラミド機能成分 消炎剤 乾燥性敏感肌 花王', query: 'キュレル 潤浸保湿フェイスクリーム 40g' },
    { brand: 'decorte_liposome_advanced_repair_cream', name: 'コスメデコルテ リポソーム アドバンスト リペアクリーム 50g ナイトクリーム 多重層バイオリポソーム ハリ 弾力', query: 'コスメデコルテ リポソーム アドバンスト リペアクリーム' },
    { brand: 'laroche_posay_cicaplast_baume_b5_plus', name: 'ラロッシュポゼ シカプラスト リペアクリーム B5+ 40ml または 100ml CICA パンテノール 肌荒れ 保湿バリア', query: 'ラロッシュポゼ シカプラスト B5+' },
    { brand: 'matsuyama_hadauru_moisturizing_cream', name: '松山油脂 肌をうるおす保湿スキンケア 保湿クリーム 50g 5種のヒト型セラミド 大豆胚芽抽出液 無香料', query: '松山油脂 肌をうるおす 保湿クリーム' },
    { brand: 'elixir_total_v_firming_cream', name: '資生堂 エリクシール シュペリエル トータルV ファーミングクリーム 50g ハリ エイジングケア 濃密クリーム', query: 'エリクシール トータルV ファーミングクリーム' },
    { brand: 'bioheal_boh_probioderm_3d_lifting_cream', name: 'BIOHEAL BOH バイオヒールボ プロバイオダーム 3D リフティングクリーム 50ml 韓国コスメ ペプチド タンタンクリーム', query: 'バイオヒールボ プロバイオダーム リフティングクリーム' },
    { brand: 'cle_de_peau_creme_intensive_n', name: 'クレ・ド・ポー ボーテ クレームアンタンシヴ n 50g 夜用 エマルジョン 乳液 クリーム ハリ 保湿 デパコス 最高峰', query: 'クレ・ド・ポー ボーテ クレームアンタンシヴ n' },
    { brand: 'astalift_advanced_cream_rich', name: '富士フイルム アスタリフト アドバンスドクリーム 30g ナノアスタキサンチン ナノリコピン 高保湿 コラーゲン ハリ', query: 'アスタリフト アドバンスドクリーム' },
    { brand: 'innisfree_collagen_green_tea_ceramide_cream', name: 'イニスフリー innisfree コラーゲン グリーンティー セラミド バウンス クリーム 50ml 低分子コラーゲン 弾力 保湿', query: 'イニスフリー コラーゲン セラミド クリーム' }
  ];

  const creamItems = [];
  for (const cfg of creamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (creamItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !creamItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        creamItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【濃密うるおいミルククレンジング＆極上クレンジングクリーム】 10選 ---
  console.log('\n=== テーマ2: 濃密うるおいミルククレンジング＆極上クレンジングクリーム ===');
  const cleansingConfigs = [
    { brand: 'covermark_treatment_cleansing_milk', name: 'カバーマーク トリートメント クレンジング ミルク 200g または 400g 美容液成分89% まつエクOK 保湿 潤い うる落ち', query: 'カバーマーク トリートメント クレンジング ミルク 200g' },
    { brand: 'decorte_aq_cleansing_cream', name: 'コスメデコルテ AQ クレンジングクリーム 116g まろやか 白樺水 保湿 ハリ メイク落とし デパコス', query: 'コスメデコルテ AQ クレンジングクリーム' },
    { brand: 'kanebo_mellow_off_veil_cleansing', name: 'カネボウ KANEBO メロウ オフ ヴェイル 160g とろけるクレンジングクリーム オフクリーム 美容液 うるおい', query: 'カネボウ メロウ オフ ヴェイル' },
    { brand: 'cow_brand_additive_free_cleansing_milk', name: 'カウブランド 無添加 メイク落としミルク 150ml または ポンプ 敏感肌 セラミド 低刺激 牛乳石鹸 保湿', query: 'カウブランド 無添加 メイク落としミルク' },
    { brand: 'orbis_off_cream_makeup_remover', name: 'オルビス ORBIS オフクリーム 100g クレンジングクリーム うるおい 保湿 とろける なめらか セラミド', query: 'オルビス オフクリーム 100g' },
    { brand: 'parado_skincare_cleansing_milk', name: 'パラドゥ ParaDo スキンケアクレンジング ミルク 120g または 大容量 美容液成分90% すっきり うるおい', query: 'パラドゥ スキンケアクレンジング' },
    { brand: 'acseine_milky_cleanse_up', name: 'アクセーヌ ACSEINE ミルキィ クレンズアップ 120g または 200g 低刺激 乳化 毛穴 角質 敏感肌 メイク落とし', query: 'アクセーヌ ミルキィ クレンズアップ' },
    { brand: 'sisley_lyslait_cleansing_milk', name: 'シスレー sisley リィスレ デマキアン 250ml クレンジングミルク 白ゆりエキス 敏感肌 乾燥肌 高級デパコス', query: 'シスレー リィスレ デマキアン' },
    { brand: 'chant_a_charm_cleansing_milk', name: 'チャントアチャーム chant a charm クレンジングミルク 130ml オーガニック 天然由来100% オイル化 うるおい', query: 'チャントアチャーム クレンジングミルク' },
    { brand: 'albion_excia_cleansing_cream', name: 'アルビオン ALBION エクシア クレンジングクリーム 150g または アンベアージュ 濃密トリートメント メイク落とし', query: 'アルビオン エクシア クレンジングクリーム' }
  ];

  const cleansingItems = [];
  for (const cfg of cleansingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (cleansingItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !cleansingItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cleansingItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【濡れツヤ単色アイシャドウ＆ジュエリーパール・グリッター】 10選 ---
  console.log('\n=== テーマ3: 濡れツヤ単色アイシャドウ＆ジュエリーパール・グリッター ===');
  const glitterConfigs = [
    { brand: 'decorte_eye_glow_gem_skin_shadow', name: 'コスメデコルテ アイグロウジェム スキンシャドウ 1色 単色アイカラー 濡れツヤ スフレ 透明感 デパコス', query: 'コスメデコルテ アイグロウジェム スキンシャドウ' },
    { brand: 'addiction_the_eyeshadow_sparkle', name: 'アディクション ADDICTION ザ アイシャドウ スパークル 1g 単色 アイシャドウ 高輝度ラメ 偏光 キラキラ', query: 'アディクション ザ アイシャドウ スパークル' },
    { brand: 'bobbi_brown_luxe_eye_shadow_moonstone', name: 'ボビイ ブラウン BOBBI BROWN リュクス アイシャドウ リッチスパークル ムーンストーン 宝石級ラメ 濡れツヤ', query: 'ボビイブラウン リュクス アイシャドウ ムーンストーン' },
    { brand: 'wonjungyo_metal_shower_pencil', name: 'ウォンジョンヨ Wonjungyo メタルシャワーペンシル 涙袋 アイライナー グリッター 高密着 韓国コスメ', query: 'ウォンジョンヨ メタルシャワーペンシル' },
    { brand: 'clio_pro_single_shadow_g10', name: 'クリオ CLIO プロ シングル シャドウ G10 パールフェクション 単色 ラメ アイシャドウ 濡れツヤ 韓国コスメ', query: 'クリオ プロ シングル シャドウ G10' },
    { brand: 'romand_liquid_glitter_shadow', name: 'ロムアンド rom&nd リキッド グリッター シャドウ 大粒ラメ 六角ホログラム 涙袋 アイメイク 韓国コスメ', query: 'ロムアンド リキッド グリッター シャドウ' },
    { brand: 'cipicipi_glitter_illumination_liner_r', name: 'シピシピ CipiCipi グリッター イルミネーションライナー R 涙袋ライナー 高密着パール 微細ラメ', query: 'シピシピ グリッター イルミネーションライナー R' },
    { brand: 'excel_gleam_on_fit_shadow', name: 'エクセル excel グリームオンフィットシャドウ スティックアイシャドウ 濡れツヤ 高密着 ウォータープルーフ', query: 'エクセル グリームオンフィットシャドウ' },
    { brand: 'chanel_ombre_essentielle_single_shadow', name: 'シャネル CHANEL オンブル エサンシエル 単色 アイシャドウ または オンブル プルミエール ラメ ツヤ デパコス', query: 'シャネル 単色 アイシャドウ' },
    { brand: 'tom_ford_cream_and_powder_eye_color', name: 'トムフォード TOM FORD クリーム アンド パウダー アイ カラー 2層式 アイシャドウ ゴールデンピーチ ネイキッドブロンズ', query: 'トムフォード クリーム アンド パウダー アイカラー' }
  ];

  const glitterItems = [];
  for (const cfg of glitterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 600) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (glitterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 600 && !it.itemName.includes('中古') && !glitterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        glitterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log('\n=======================================');
  console.log(`取得完了結果: 保湿クリーム=${creamItems.length}/10, クレンジング=${cleansingItems.length}/10, アイシャドウ/ラメ=${glitterItems.length}/10`);
  console.log('=======================================');

  const outputData = {
    theme1_rich_moisturizing_face_cream: creamItems,
    theme2_rich_milk_cream_cleansing: cleansingItems,
    theme3_holiday_sparkle_glitter_eyeshadow: glitterItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch73_items.json');
  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`🎉 最新アイテムデータを ${outPath} に保存しました！`);
}

fetchWinterBatch73Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
