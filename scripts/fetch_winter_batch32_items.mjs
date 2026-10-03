import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch32Items() {
  console.log('❄️ [11-12月コスメ 第32弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: コスメアドベントカレンダー＆ホリデー限定コフレ 10選 ---
  console.log('\n=== テーマ1: コスメアドベントカレンダー＆ホリデー限定コフレ ===');
  const adventConfigs = [
    { brand: 'loccitane_advent_calendar', name: 'L\'OCCITANE ロクシタン アドベントカレンダー ホリデー限定', query: 'ロクシタン アドベントカレンダー' },
    { brand: 'paul_and_joe_advent_calendar', name: 'PAUL & JOE ポール＆ジョー メイクアップ コレクション アドベントカレンダー', query: 'ポール&ジョー アドベントカレンダー' },
    { brand: 'kiehls_advent_calendar', name: 'Kiehl\'s キールズ アドベントカレンダー スキンケア コフレ', query: 'キールズ アドベントカレンダー' },
    { brand: 'the_body_shop_advent_calendar', name: 'THE BODY SHOP ザボディショップ アドベントカレンダー ホリデー', query: 'ボディショップ アドベントカレンダー' },
    { brand: 'sabon_advent_calendar', name: 'SABON サボン アドベントカレンダー ボディケア ホリデーギフト', query: 'SABON アドベントカレンダー' },
    { brand: 'dior_holiday_advent_coffret', name: 'Dior ディオール ホリデー オファー / アドベントカレンダー 限定コフレ', query: 'ディオール ホリデー コフレ' },
    { brand: 'clinique_advent_calendar', name: 'CLINIQUE クリニーク ホリデー アドベントカレンダー ギフトセット', query: 'クリニーク アドベントカレンダー' },
    { brand: 'clarins_advent_calendar', name: 'CLARINS クラランス アドベントカレンダー ホリデーコフレ', query: 'クラランス アドベントカレンダー' },
    { brand: 'jillstuart_holiday_gift_collection', name: 'JILL STUART ジルスチュアート ホリデーコレクション コフレ', query: 'ジルスチュアート ホリデー コフレ' },
    { brand: 'cosmedecorte_holiday_coffret', name: 'DECORTÉ コスメデコルテ メイクアップ コフレ ホリデー限定', query: 'コスメデコルテ メイクアップ コフレ' }
  ];

  const adventItems = [];
  for (const cfg of adventConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        adventItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 冬の赤み・青クマ・くすみ払拭！カラーコントロール下地＆補正ベース 10選 ---
  console.log('\n=== テーマ2: 冬の赤み・青クマ・くすみ払拭！カラーコントロール下地＆補正ベース ===');
  const colorCorrectConfigs = [
    { brand: 'elegance_modeling_color_up_base', name: 'Elégance エレガンス モデリング カラーアップ ベース UV', query: 'エレガンス モデリング カラーアップ ベース' },
    { brand: 'givenchy_prisme_libre_skin_corrector', name: 'GIVENCHY ジバンシイ プリズム リーブル スキンケアリング コレクター', query: 'ジバンシイ プリズム リーブル スキンケアリング コレクター' },
    { brand: 'cosmedecorte_sun_shelter_toneup_cc', name: 'DECORTÉ コスメデコルテ サンシェルター マルチ プロテクション トーンアップCC', query: 'コスメデコルテ トーンアップCC' },
    { brand: 'rmk_color_foundation_control_base', name: 'RMK ベーシック コントロールカラー N / カラーファンデーション', query: 'RMK コントロールカラー' },
    { brand: 'whomee_control_color_base', name: 'WHOMEE フーミー コントロールカラーベース イエロー / ブルー / ピンク', query: 'フーミー コントロールカラーベース' },
    { brand: 'ipsa_control_base_e', name: 'IPSA イプサ コントロールベイス e イエロー / ブルー / ピンク', query: 'イプサ コントロールベイス' },
    { brand: 'integrate_air_feel_maker', name: 'INTEGRATE インテグレート エアフィールメーカー ミントカラー / ラベンダーカラー', query: 'インテグレート エアフィールメーカー' },
    { brand: 'canmake_mermaid_skin_gel_uv_cica', name: 'CANMAKE キャンメイク マーメイドスキンジェルUV C01 CICAミント グリーン下地', query: 'マーメイドスキンジェル CICA' },
    { brand: 'kiss_control_color_base', name: 'kiss キス コントロールカラーベース / マットシフォン UV', query: 'キス コントロールカラーベース' },
    { brand: 'cezanne_skin_conditioner_uv_toneup', name: 'CEZANNE セザンヌ 皮脂テカリ防止下地 保湿タイプ オレンジベージュ / ソフトイエロー', query: 'セザンヌ 皮脂テカリ防止下地 保湿' }
  ];

  const colorCorrectItems = [];
  for (const cfg of colorCorrectConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        colorCorrectItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 乾燥しない！冬の高保湿ベルベットマットリップ＆スフレリップ 10選 ---
  console.log('\n=== テーマ3: 乾燥しない！冬の高保湿ベルベットマットリップ＆スフレリップ ===');
  const velvetLipConfigs = [
    { brand: 'kate_lip_monster_souffle_matte', name: 'KATE ケイト リップモンスター スフレマット 落ちにくい高発色', query: 'リップモンスター スフレマット' },
    { brand: 'romand_zero_velvet_tint', name: 'rom&nd ロムアンド ゼロ ベルベット ティント', query: 'ロムアンド ゼロベルベットティント' },
    { brand: '3ce_velvet_lip_tint', name: '3CE STYLENANDA ベルベット リップ ティント VELVET LIP TINT', query: '3CE ベルベット リップ ティント' },
    { brand: 'etude_fixing_tint', name: 'ETUDE エチュード フィクシングティント マスクにつきにくいマットリップ', query: 'エチュード フィクシングティント' },
    { brand: 'hince_mood_enhancer_liquid_matte', name: 'hince ヒンス ムードインハンサー リキッドマット', query: 'hince ムードインハンサー リキッドマット' },
    { brand: 'bidol_mutchi_lip', name: 'b idol ビーアイドル むっちリップ 吉田朱里プロデュース スフレマットリップ', query: 'ビーアイドル むっちリップ' },
    { brand: 'nars_air_matte_lip_color', name: 'NARS ナーズ エアーマット リップカラー', query: 'NARS エアーマット リップカラー' },
    { brand: 'mac_powder_kiss_liquid_lipcolour', name: 'M・A・C マック パウダー キス リキッド リップカラー', query: 'MAC パウダーキス リキッド' },
    { brand: 'laka_smooth_matte_lip_tint', name: 'Laka ラカ スムースマット リップティント / フルーティーグラム', query: 'Laka リップ' },
    { brand: 'maybelline_superstay_matte_ink', name: 'MAYBELLINE メイベリン SPステイ マットインク / ヴィニルインク', query: 'メイベリン SPステイ マットインク' }
  ];

  const velvetLipItems = [];
  for (const cfg of velvetLipConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        velvetLipItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 保存
  const result = {
    updatedAt: new Date().toISOString(),
    theme1_advent: adventItems,
    theme2_color_correct: colorCorrectItems,
    theme3_velvet_lip: velvetLipItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch32_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch32_items.json`);
  console.log(`- アドベントカレンダー: ${adventItems.length}件`);
  console.log(`- カラーコントロール下地: ${colorCorrectItems.length}件`);
  console.log(`- ベルベットマットリップ: ${velvetLipItems.length}件`);
}

fetchWinterBatch32Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
