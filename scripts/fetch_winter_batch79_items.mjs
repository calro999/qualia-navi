import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch79Items() {
  console.log('❄️ [11-12月冬コスメ 第79弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 高保湿ルースパウダー＆美容液フェイスパウダー 10選 ---
  console.log('\n=== テーマ1: 高保湿ルースパウダー＆美容液フェイスパウダー ===');
  const powderConfigs = [
    { brand: 'decorte_loose_powder', name: 'コスメデコルテ ルース パウダー 20g 美容液パウダー しっとり 保湿 ツヤ肌 生ツヤ', query: 'コスメデコルテ ルース パウダー' },
    { brand: 'kanebo_milano_collection', name: 'カネボウ ミラノコレクション フェースアップパウダー 高機能 保湿 プレミアム パウダー', query: 'ミラノコレクション フェースアップパウダー' },
    { brand: 'nars_light_reflecting_setting_powder', name: 'NARS ナーズ ライトリフレクティングセッティングパウダー プレスト N 10g リフ粉', query: 'NARS ライトリフレクティングセッティングパウダー' },
    { brand: 'elegance_la_poudre_haute_nuance', name: 'エレガンス Elegance ラ プードル オートニュアンス 8.8g プレストパウダー 仕上げ', query: 'エレガンス ラ プードル オートニュアンス' },
    { brand: 'givenchy_prisme_libre', name: 'ジバンシイ GIVENCHY プリズム・リーブル 4色 ルースパウダー 透明感 オーラ肌', query: 'ジバンシイ プリズム リーブル' },
    { brand: 'chacott_finishing_powder_matte_moist', name: 'チャコット チャコット・コスメティクス フィニッシングパウダー モイスト 20g 美容液パウダー', query: 'チャコット フィニッシングパウダー モイスト' },
    { brand: 'canmake_marshmallow_finish_powder', name: 'キャンメイク CANMAKE マシュマロフィニッシュパウダー Abloom イルミネイティング 保湿', query: 'キャンメイク マシュマロフィニッシュパウダー Abloom' },
    { brand: 'cezanne_moist_loose_powder', name: 'セザンヌ CEZANNE うるふわ仕上げパウダー ルースパウダー セミマット 保湿パウダー', query: 'セザンヌ うるふわ仕上げパウダー' },
    { brand: 'innisfree_pore_blur_powder', name: 'イニスフリー innisfree ポアブラー パウダー または モイスチャー ルースパウダー', query: 'イニスフリー パウダー 保湿' },
    { brand: 'suqqu_oil_rich_glow_loose_powder', name: 'SUQQU スック オイル リッチ グロウ ルース パウダー 15g 美容オイル配合 濡れツヤ', query: 'SUQQU オイル リッチ グロウ ルース パウダー' }
  ];

  const powderItems = [];
  for (const cfg of powderConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (powderItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !powderItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        powderItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿トーンアップカラー下地＆コントロールカラー 10選 ---
  console.log('\n=== テーマ2: 高保湿トーンアップカラー下地＆コントロールカラー ===');
  const baseConfigs = [
    { brand: 'larocheposay_toneup_rose_clear', name: 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ クリア SPF50+ PA++++ 保湿 美容液下地', query: 'ラロッシュポゼ トーンアップ ローズ' },
    { brand: 'decorte_sun_shelter_toneup_cc', name: 'コスメデコルテ サンシェルター マルチ プロテクション トーンアップCC 35g 日焼け止め 化粧下地', query: 'コスメデコルテ サンシェルター トーンアップCC' },
    { brand: 'elegance_modeling_color_up_base', name: 'エレガンス Elegance モデリング カラーアップ ベース SPF25 PA++ 30g カラー補正', query: 'エレガンス モデリング カラーアップ ベース' },
    { brand: 'jillstuart_bright_smooth_primer', name: 'ジルスチュアート ルーセントシフォン または イルミネイティング セラムプライマー ラベンダー ピンク', query: 'ジルスチュアート イルミネイティング セラムプライマー' },
    { brand: 'dalba_waterfull_toneup_suncream', name: 'ダルバ dAlba ウォータフル トーンアップ サンクリーム 50ml ピンク パープル 日焼け止め 下地 水光肌', query: 'ダルバ ウォータフル トーンアップ サンクリーム' },
    { brand: 'whomee_control_color_base_plus', name: 'WHOMEE フーミー コントロールカラーベースN イガリシノブ パープル イエロー ピンク 保湿下地', query: 'フーミー コントロールカラーベース' },
    { brand: 'paul_and_joe_protecting_foundation_primer', name: 'ポール＆ジョー ポールアンドジョー プロテクティング / モイスチュアライジング ファンデーション プライマー', query: 'ポール＆ジョー モイスチュアライジング ファンデーション プライマー' },
    { brand: 'cezanne_skin_conditioner_base', name: 'セザンヌ CEZANNE 皮脂テカリ防止下地 保湿タイプ オレンジベージュ または トーンアップベース ピンク', query: 'セザンヌ トーンアップベース' },
    { brand: 'excel_skin_tint_serum_base', name: 'エクセル excel モチベートユアスキン または ラスティングタッチベース 保湿 トーンアップ 美容液下地', query: 'エクセル モチベートユアスキン' },
    { brand: 'curel_bb_milk_bright_base', name: 'キュレル Curel 潤浸保湿 色づくベースミルク 敏感肌 セラミドケア トーンアップ', query: 'キュレル 色づくベースミルク' }
  ];

  const baseItems = [];
  for (const cfg of baseConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (baseItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !baseItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        baseItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高濃度まつ毛美容液＆まつ毛トリートメント 10選 ---
  console.log('\n=== テーマ3: 高濃度まつ毛美容液＆まつ毛トリートメント ===');
  const lashConfigs = [
    { brand: 'lashaddict_eyelash_conditioning_serum', name: 'ラッシュアディクト Lashaddict アイラッシュ コンディショニング セラム 5ml まつ毛美容液 サロン専売 正規品', query: 'ラッシュアディクト アイラッシュ コンディショニング セラム' },
    { brand: 'emaked_eyelash_serum', name: 'エマーキット EMAKED 2ml まつ毛美容液 水橋保寿堂製薬 高濃度 美まつ毛', query: 'エマーキット まつ毛美容液' },
    { brand: 'scalpd_beaute_eyelash_premium', name: 'スカルプD ボーテ ピュアフリーアイラッシュセラム プレミアム 4ml アンファー まつ毛美容液 高保湿', query: 'スカルプD まつ毛美容液 プレミアム' },
    { brand: 'phoebe_beauty_up_eyelash_serum', name: 'PHOEBE BEAUTY UP フィービー アイラッシュセラム 5ml ヒト幹細胞培養液 まつ毛美容液', query: 'PHOEBE アイラッシュセラム' },
    { brand: 'cosnori_long_active_eyelash_serum', name: 'コスノリ COSNORI ロングアクティブ アイラッシュセラム 韓国コスメ 低刺激 まつ毛美容液', query: 'コスノリ まつ毛美容液' },
    { brand: 'majolica_majorca_lash_jelly_drop', name: 'マジョリカ マジョルカ ラッシュジェリードロップ EX プレミアム 資生堂 まつ毛美容液 ハリコシ', query: 'マジョリカマジョルカ ラッシュジェリードロップ EX' },
    { brand: 'revitalash_advanced_japan', name: 'リバイタラッシュ アドバンス ジャパン 2ml まつげ美容液 正規品 濃密 ハリコシ', query: 'リバイタラッシュ アドバンス' },
    { brand: 'uz_by_flowfushi_eyelash_serum', name: 'UZU BY FLOWFUSHI まつげ美容液 指塗り アイゾーンケア 保湿', query: 'UZU まつげ美容液' },
    { brand: 'cezanne_eyelash_essence_ex', name: 'セザンヌ CEZANNE まつげ美容液EX まつ毛・まぶた・眉毛 3in1 保湿 エッセンス', query: 'セザンヌ まつげ美容液EX' },
    { brand: 'canmake_quick_lash_curler_clear', name: 'キャンメイク CANMAKE ラッシュケアエッセンス または クイックラッシュカーラー まつ毛保護', query: 'キャンメイク ラッシュケアエッセンス' }
  ];

  const lashItems = [];
  for (const cfg of lashConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lashItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !lashItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lashItems.push(valid);
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
    theme1_hydrating_face_powder: powderItems,
    theme2_toneup_color_primer: baseItems,
    theme3_nourishing_eyelash_serum: lashItems
  };

  const outputPath = 'scratch/rakuten_winter_batch79_items.json';
  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計アイテム取得完了: パウダー=${powderItems.length}件, 下地=${baseItems.length}件, まつ毛美容液=${lashItems.length}件`);
  console.log(`保存先: ${outputPath}`);
}

fetchWinterBatch79Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
