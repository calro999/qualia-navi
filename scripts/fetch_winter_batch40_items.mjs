import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch40Items() {
  console.log('❄️ [11-12月コスメ 第40弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬ホリデー・聖夜の濡れツヤ発光】極上スティックハイライト＆生ツヤリキッドハイライター 10選 ---
  console.log('\n=== テーマ1: 極上スティックハイライト＆生ツヤリキッドハイライター ===');
  const highlighterConfigs = [
    { brand: 'chanel_baume_essentiel_glow_stick', name: 'CHANEL シャネル ボーム エサンシエル スカルプティング / トランスパラン 8g フェイスカラー', query: 'シャネル ボーム エサンシエル' },
    { brand: 'dior_forever_glow_maximizer_liquid', name: 'Christian Dior ディオールスキン フォーエヴァー グロウ マキシマイザー 11ml リキッドハイライター', query: 'ディオールスキン フォーエヴァー グロウ マキシマイザー' },
    { brand: 'hince_true_dimension_radiance_balm', name: 'hince ヒンス トゥルーディメンション ラディアンスバーム 10g ハイライト スティック', query: 'hince トゥルーディメンション ラディアンスバーム' },
    { brand: 'decorte_dip_in_glow_cream_highlighter', name: 'コスメデコルテ ディップイン グロウ クリームハイライター 6g 立体ツヤ肌', query: 'コスメデコルテ ディップイングロウ' },
    { brand: 'etvos_mineral_radiant_skin_balm', name: 'ETVOS エトヴォス ミネラルラディアントスキンバーム 4.8g 低刺激 植物オイル ツヤ肌', query: 'エトヴォス ミネラルラディアントスキンバーム' },
    { brand: 'bobbi_brown_highlighting_powder_pink_glow', name: 'BOBBI BROWN ボビイ ブラウン ハイライティング パウダー ピンクグロウ 8g / ミニ', query: 'ボビイブラウン ハイライティングパウダー ピンクグロウ' },
    { brand: 'suqqu_reflect_highlighter_sakura', name: 'SUQQU スック リフレクト ハイライター 102 サクラ クウォーツ / フェイスカラー ツヤ肌', query: 'SUQQU ハイライター' },
    { brand: 'jillstuart_couture_mix_glow_highlighter', name: 'JILL STUART ジルスチュアート クチュール ミックス グロウ ハイライター チーク ホリデー限定', query: 'ジルスチュアート ハイライト' },
    { brand: 'cezanne_pearl_glow_highlight_01', name: 'CEZANNE セザンヌ パールグロウハイライト 01 シャンパンベージュ 発光ツヤ', query: 'セザンヌ パールグロウハイライト 01' },
    { brand: 'canmake_munyutto_highlighter_cream', name: 'CANMAKE キャンメイク むにゅっとハイライター 生ツヤ 水光肌 プチプラ', query: 'キャンメイク むにゅっとハイライター' }
  ];

  const highlighterItems = [];
  for (const cfg of highlighterConfigs) {
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
        highlighterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・一晩でしぼみ肌をふっくら押し返す】高機能リッチナイトクリーム＆濃密エイジングケアクリーム 10選 ---
  console.log('\n=== テーマ2: 高機能リッチナイトクリーム＆濃密エイジングケアクリーム ===');
  const nightCreamConfigs = [
    { brand: 'kanebo_cream_in_night_moisture_balm', name: 'KANEBO カネボウ クリーム イン ナイト 40g 夜用リフレッシングクリーム 夜間集中保湿', query: 'カネボウ クリーム イン ナイト 40g' },
    { brand: 'decorte_liposome_advanced_repair_cream', name: 'コスメデコルテ リポソーム アドバンスト リペアクリーム 50g ナイトクリーム バイオリポソーム', query: 'コスメデコルテ リポソーム アドバンスト リペアクリーム' },
    { brand: 'elixir_total_v_firming_cream_aging', name: 'ELIXIR エリクシール シュペリエル トータルV ファーミングクリーム 50g ハリ エイジングケア', query: 'エリクシール トータルV ファーミングクリーム' },
    { brand: 'sk2_skinpower_advanced_cream', name: 'SK-II エスケーツー スキンパワー アドバンスト クリーム 80g / 50g ピテラ 弾力 ハリツヤ', query: 'SK-II スキンパワー アドバンスト クリーム' },
    { brand: 'lancome_absolue_soft_cream_regenerating', name: 'LANCOME ランコム アプソリュ ソフトクリーム 60ml ローズ エキス プレミアム', query: 'ランコム アプソリュ ソフトクリーム' },
    { brand: 'kiehls_ultra_facial_cream_ufc', name: 'KIEHL\'S キールズ クリーム UFC 50ml / 125ml スクワラン 糖タンパク質 高保湿シールド', query: 'キールズ クリーム UFC 50ml' },
    { brand: 'astalift_advanced_cream_astaxanthin', name: 'ASTALIFT アスタリフト アドバンスドクリーム 30g アスタキサンチン ナノリコピン ハリ保湿', query: 'アスタリフト アドバンスドクリーム' },
    { brand: 'obagi_x_derma_advanced_lift_cream', name: 'Obagi オバジX ダーマアドバンスドリフト 50g 張力 弾力 コラーゲン リフトクリーム', query: 'オバジX ダーマアドバンスドリフト 50g' },
    { brand: 'curel_intensive_moisture_care_facial_cream', name: 'Curel キュレル 潤浸保湿フェイスクリーム 40g 医薬部外品 セラミド機能成分 敏感肌', query: 'キュレル 潤浸保湿フェイスクリーム 40g' },
    { brand: 'bioheal_boh_probioderm_3d_lifting_cream', name: 'BIOHEAL BOH バイオヒールボ プロバイオダーム 3D リフティングクリーム 50ml タンタンクリーム 韓国', query: 'バイオヒールボ プロバイオダーム 3D リフティングクリーム' }
  ];

  const nightCreamItems = [];
  for (const cfg of nightCreamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nightCreamItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・極上おうちスパ＆冷え・乾燥肌を至福の香りでほぐす】薬用重炭酸入浴剤＆高保湿バスミルク・ホリデーバスオイル 10選 ---
  console.log('\n=== テーマ3: 薬用重炭酸入浴剤＆高保湿バスミルク・ホリデーバスオイル ===');
  const bathCareConfigs = [
    { brand: 'ayura_meditation_bath_t_liquid', name: 'AYURA アユーラ メディテーションバスt 300ml 薬用入浴剤 アロマティックハーブ 安らぎ', query: 'アユーラ メディテーションバスt' },
    { brand: 'barth_neutral_bicarbonate_bath_tablet', name: 'BARTH バース 薬用 中性重炭酸入浴剤 30錠 / 90錠 炭酸泉 疲労回復 冷え性 温活', query: 'BARTH 中性重炭酸入浴剤 30錠' },
    { brand: 'weleda_fir_pine_bath_milk_warming', name: 'WELEDA ヴェレダ モミ バスミルク 200ml / アルニカ バスミルク 森林浴 冷え 保湿', query: 'ヴェレダ モミ バスミルク' },
    { brand: 'shiro_sabon_bath_oil_hydrating', name: 'SHIRO シロ サボン バスオイル 200ml シアバター ヒマワリ種子油 高保湿 入浴剤', query: 'SHIRO サボン バスオイル' },
    { brand: 'jomalone_english_pear_freesia_bath_oil', name: 'Jo Malone London ジョー マローン ロンドン イングリッシュ ペアー ＆ フリージア バス オイル 250ml', query: 'ジョーマローン イングリッシュペアー バスオイル' },
    { brand: 'kneipp_bath_salt_vanilla_honey', name: 'Kneipp クナイプ バスソルト バニラ＆ハニーの香り 850g 天然岩塩 ハチミツエキス 高保湿 温活', query: 'クナイプ バスソルト バニラ ハニー' },
    { brand: 'sea_crystals_epsom_salt_original', name: 'シークリスタルス エプソムソルト オリジナル 2.2kg マグネシウム温浴 硫酸マグネシウム 発汗', query: 'シークリスタルス エプソムソルト 2.2kg' },
    { brand: 'loccitane_shea_shower_oil_bath', name: 'L\'OCCITANE ロクシタン シア シャワーオイル 250ml 高保湿 ボディ洗浄 バスオイル', query: 'ロクシタン シア シャワーオイル' },
    { brand: 'sabon_bath_salt_green_rose', name: 'SABON サボン バスソルト 300g グリーン・ローズ 死海ミネラル塩 保湿 温浴', query: 'サボン バスソルト ローズ' },
    { brand: 'kikiyu_fine_heat_smart_model_bath', name: 'きき湯 ファインヒート スマートモデル 400g 薬用入浴剤 トウガラシエキス 炭酸ガス 温活 発汗', query: 'きき湯 ファインヒート スマートモデル' }
  ];

  const bathCareItems = [];
  for (const cfg of bathCareConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bathCareItems.push(valid);
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
    theme1_highlighter: highlighterItems,
    theme2_night_cream: nightCreamItems,
    theme3_bath_care: bathCareItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch40_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${highlighterItems.length}件, テーマ2: ${nightCreamItems.length}件, テーマ3: ${bathCareItems.length}件 を scratch/rakuten_winter_batch40_items.json に保存しました。`);
}

fetchWinterBatch40Items().catch(console.error);
