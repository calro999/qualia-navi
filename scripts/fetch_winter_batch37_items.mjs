import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch37Items() {
  console.log('❄️ [11-12月コスメ 第37弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 【ホリデー限定＆冬ギフト本命】高級メイクブラシセット＆熊野筆・ホリデーコレクション 10選 ---
  console.log('\n=== テーマ1: 高級メイクブラシセット＆熊野筆・ホリデー限定ブラシ ===');
  const brushConfigs = [
    { brand: 'sixplus_holiday_makeup_brush_set', name: 'SIXPLUS シックスプラス 貴族のゴールド メイクブラシ 11本セット 専用ポーチ付き', query: 'SIXPLUS メイクブラシセット' },
    { brand: 'kumanofude_holiday_gift_box_set', name: '熊野筆 メイクブラシ 5本セット 高級山羊毛・灰リス フェイスブラシ ギフトボックス', query: '熊野筆 メイクブラシ セット ギフト' },
    { brand: 'refa_heart_brush_ray_holiday', name: 'ReFa リファ ハートブラシ レイ フェイスブラシ マルチファンデーションブラシ', query: 'リファ ファンデーションブラシ' },
    { brand: 'shiseido_daiya_fude_face_duo', name: 'SHISEIDO 資生堂 DAIYA FUDE フェイス デュオ ダイヤモンド型ジェルブレンダー＆ブラシ', query: '資生堂 DAIYA FUDE フェイス デュオ' },
    { brand: 'ancci_brush_ebony_series_set', name: 'Ancci brush アンシブラシ ebony エボニー 天然毛 アイメイク＆フェイスブラシ セット', query: 'アンシブラシ メイクブラシ' },
    { brand: 'real_techniques_everyday_essentials', name: 'Real Techniques リアルテクニクス エブリデイ エッセンシャルズ メイクブラシ スポンジ セット', query: 'リアルテクニクス エブリデイ エッセンシャルズ' },
    { brand: 'koyudo_kumano_flower_brush_gift', name: '晃祐堂 熊野筆 フラワー洗顔ブラシ・チークブラシ 伝統工芸品 ホリデーギフト', query: '晃祐堂 熊野筆 フラワー' },
    { brand: 'ducato_make_up_brush_stand_set', name: 'ROSY ROSA ロージーローザ マルチファンデブラシ ＆ アイシャドウブラシ プレミアムセット', query: 'ロージーローザ マルチファンデブラシ' },
    { brand: 'etvos_skin_fit_brush_foundation', name: 'ETVOS エトヴォス スキンフィットブラシ カブキブラシ 高級タクロン 敏感肌仕様', query: 'エトヴォス スキンフィットブラシ' },
    { brand: 'hakuhodo_basic_makeup_brush_selection', name: '白鳳堂 HAKUHODO ベーシック メイクブラシ 携帯用 筆 厳選セット', query: '白鳳堂 ブラシ セット' }
  ];

  const brushItems = [];
  for (const cfg of brushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        brushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【冬の乾燥崩れ・粉吹きを一日中防ぐ】美容液成分80%以上！高保湿モイストメイク下地・うるおいツヤ肌プライマー 10選 ---
  console.log('\n=== テーマ2: 高保湿モイストメイク下地・うるおいツヤ肌プライマー ===');
  const primerConfigs = [
    { brand: 'cledepeau_voile_correcteur_n', name: 'Clé de Peau Beauté クレ・ド・ポー ボーテ ヴォワールコレクチュールn SPF25 PA++', query: 'ヴォワールコレクチュールn' },
    { brand: 'decorte_flawless_skin_glow_raiser', name: 'DECORTÉ コスメデコルテ フローレススキン グロウライザー 保湿美容液下地', query: 'コスメデコルテ フローレススキン グロウライザー' },
    { brand: 'paul_joe_moisturizing_foundation_primer', name: 'PAUL & JOE ポール＆ジョー モイスチュアライジング プライマー 美容液下地 保湿', query: 'ポール&ジョー モイスチュアライジング プライマー' },
    { brand: 'kanebo_cream_in_day_morning', name: 'KANEBO カネボウ クリーム イン デイ 朝用クリーム 日中用美容液 SPF20 PA+++', query: 'カネボウ クリーム イン デイ' },
    { brand: 'dalba_waterfull_mild_sun_cream', name: 'd\'Alba ダルバ ウォータフル トーンアップ サンクリーム ホワイトトリュフ 高保湿化粧下地', query: 'ダルバ ウォータフル トーンアップ' },
    { brand: 'larocheposay_uvidea_xl_toneup_rose', name: 'La Roche-Posay ラ ロッシュ ポゼ UVイデア XL プロテクショントーンアップ ローズ', query: 'ラロッシュポゼ トーンアップ ローズ' },
    { brand: 'bobbi_brown_vitamin_enriched_face_base', name: 'BOBBI BROWN ボビイ ブラウン ビタミン エンリッチド フェイスベース 保湿プライマー', query: 'ボビイ ブラウン ビタミン エンリッチド フェイスベース' },
    { brand: 'espoir_water_splash_sun_cream_ceramide', name: 'espoir エスポア ウォータースプラッシュ サンクリーム セラミド 高保湿ツヤ下地', query: 'エスポア ウォータースプラッシュ サンクリーム' },
    { brand: 'excel_motif_fit_glow_serum_base', name: 'excel エクセル モチベートユアスキン オールインワン美容液下地 SPF48 PA+++', query: 'エクセル モチベートユアスキン' },
    { brand: 'cezanne_skin_conditioner_uv_base', name: 'CEZANNE セザンヌ 朝用スキンコンディショナー UVミルク モイストトーンアップベース', query: 'セザンヌ 朝用スキンコンディショナー' }
  ];

  const primerItems = [];
  for (const cfg of primerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        primerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【冬の静電気・マフラー摩擦で傷んだ髪を芯から再生】サロン級の髪質改善！高濃度ケラチン＆酸熱トリートメント・ヘアマスク 10選 ---
  console.log('\n=== テーマ3: サロン級ケラチン＆酸熱トリートメント・ヘアマスク ===');
  const hairTreatmentConfigs = [
    { brand: 'milbon_grand_linkage_hair_treatment', name: 'MILBON ミルボン グランドリンケージ サロントリートメント ホームケア 集中パック', query: 'ミルボン グランドリンケージ' },
    { brand: 'fino_premium_touch_hair_mask', name: 'fino フィーノ プレミアムタッチ 浸透美容液ヘアマスク 濃密Wリペア', query: 'フィーノ プレミアムタッチ ヘアマスク' },
    { brand: 'toushi_keratin_raw_liquid_essence', name: '原液ケラチン 美髪の素 高濃度生ケラチン トリートメント原液 髪質改善', query: 'ケラチン 原液 トリートメント' },
    { brand: 'plus_eau_point_repair_hair_mask', name: 'plus eau プリュスオー ハイドロミスト / メロウリュクスマスク 浸透補修 ケラチン', query: 'プリュスオー メロウリュクスマスク' },
    { brand: 'orbis_essence_in_hair_milk_pack', name: 'ORBIS オルビス エッセンスインヘアマスク リッチ ディープリペア 集中ヘアパック', query: 'オルビス エッセンスイン ヘアマスク' },
    { brand: 'unove_deep_damage_treatment_ex', name: 'UNOVE アノブ ディープダメージ トリートメント EX タンパク質3000%補給 ケラチン', query: 'UNOVE ディープダメージ トリートメント EX' },
    { brand: 'olaplex_no3_hair_perfector_bond', name: 'OLAPLEX オラプレックス No.3 ヘアパーフェクター ボンドサイエンス 毛髪結合補修', query: 'オラプレックス No.3' },
    { brand: 'kensei_acid_heat_treatment_mask', name: 'サロンムーン 酸熱トリートメント マスク グリオキシル酸 自宅髪質改善', query: '酸熱トリートメント マスク' },
    { brand: 'lebel_iau_deep_mask_repair', name: 'LebeL ルベル イオ ディープマスク 濃密リピッド ダメージ毛 集中ケア', query: 'ルベル イオ ディープマスク' },
    { brand: 'napla_n_dot_shea_treatment_mask', name: 'napla ナプラ N. エヌドット シアトリートメント モイスチャー 集中補修マスク', query: 'エヌドット シアトリートメント' }
  ];

  const hairTreatmentItems = [];
  for (const cfg of hairTreatmentConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairTreatmentItems.push(valid);
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
    theme1_brush: brushItems,
    theme2_primer: primerItems,
    theme3_hair_treatment: hairTreatmentItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch37_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${brushItems.length}件, テーマ2: ${primerItems.length}件, テーマ3: ${hairTreatmentItems.length}件 を保存しました。`);
}

fetchWinterBatch37Items().catch(console.error);
