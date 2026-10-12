import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch85Items() {
  console.log('❄️ [11-12月冬コスメ 第85弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 高保湿濃密泡洗顔料＆アミノ酸ホイップ洗顔フォーム 10選 ---
  console.log('\n=== テーマ1: 高保湿濃密泡洗顔料＆アミノ酸ホイップ洗顔フォーム ===');
  const cleanserConfigs = [
    { brand: 'kanebo_comfort_stretchy_wash', name: 'KANEBO カネボウ コンフォート ストレッチィ ウォッシュ 糸引く濃密泡 保湿 洗顔料 美容液洗顔', query: 'KANEBO コンフォート ストレッチィ ウォッシュ' },
    { brand: 'sofina_ip_renew_mousse_wash', name: 'ソフィーナiP リニュームース ウォッシュ 炭酸 濃密マイクロ泡 洗顔料 洗顔フォーム 美容液', query: 'ソフィーナiP リニュームースウォッシュ' },
    { brand: 'orbis_u_foaming_wash', name: 'オルビスユー フォーミングウォッシュ オルビス ORBIS モロッコ溶岩クレイ 吸着泡 洗顔フォーム', query: 'オルビスユー フォーミングウォッシュ' },
    { brand: 'curel_foaming_facial_wash', name: 'キュレル 潤浸保湿 泡洗顔料 セラミドケア 消炎剤 敏感肌 乾燥肌 低刺激 医薬部外品', query: 'キュレル 潤浸保湿 泡洗顔料' },
    { brand: 'obagi_x_frame_lift_mousse_wash', name: 'オバジX フレームリフト ムースウォッシュ 炭酸泡洗顔 オバジ Obagi ロート製薬', query: 'オバジX フレームリフト ムースウォッシュ' },
    { brand: 'minon_gentle_wash_whip', name: 'ミノン アミノモイスト ジェントルウォッシュ ホイップ 泡洗顔料 アミノ酸 第一三共ヘルスケア', query: 'ミノン ジェントルウォッシュ ホイップ' },
    { brand: 'dprogram_essence_in_cleansing_foam', name: 'dプログラム エッセンスイン クレンジングフォーム 資生堂 薬用洗顔フォーム 敏感肌用', query: 'dプログラム エッセンスイン クレンジングフォーム' },
    { brand: 'acseine_reset_wash', name: 'アクセーヌ ACSEINE リセット ウォッシュ 泡状洗顔料 角質柔軟 低刺激 無香料', query: 'アクセーヌ リセット ウォッシュ' },
    { brand: 'fancl_mud_gel_facial_wash', name: 'ファンケル FANCL 泥ジェル洗顔 または 泥ジェル 泡立て不要 毛穴 クレイ 洗顔', query: 'ファンケル 泥ジェル洗顔' },
    { brand: 'decorte_hydra_clarity_wash', name: 'コスメデコルテ イドラクラリティ トリートメント ジェルウォッシュ または ウォッシュ 美肌糖', query: 'コスメデコルテ イドラクラリティ ジェルウォッシュ' }
  ];

  const cleanserItems = [];
  for (const cfg of cleanserConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (cleanserItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !cleanserItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cleanserItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿カラーリップバーム＆ティントルージュ 10選 ---
  console.log('\n=== テーマ2: 高保湿カラーリップバーム＆ティントルージュ ===');
  const lipBalmConfigs = [
    { brand: 'nivea_rich_care_color_lip', name: 'ニベア リッチケア＆カラー リップ 美容オイル配合 UVカット 高保水 リップクリーム 口紅', query: 'ニベア リッチケア カラーリップ' },
    { brand: 'dior_addict_lip_glow_balm', name: 'ディオール アディクト リップ グロウ リップバーム Dior 自然由来 チェリーオイル 血色感', query: 'ディオール リップグロウ' },
    { brand: 'chanel_rouge_coco_baume', name: 'シャネル ルージュ ココ ボーム リップボーム リップクリーム CHANEL 保湿 高発色', query: 'シャネル ルージュ ココ ボーム' },
    { brand: 'bobbibrown_extra_lip_tint', name: 'ボビイ ブラウン エクストラ リップ ティント ボビイブラウン オイルイン リップバーム', query: 'ボビイブラウン エクストラ リップ ティント' },
    { brand: 'mentholatum_lip_fondue', name: 'メンソレータム リップフォンデュ ロート製薬 とろける ラップ 美容液リップ 高密着ツヤ', query: 'メンソレータム リップフォンデュ' },
    { brand: 'kate_personal_lip_cream', name: 'KATE ケイト パーソナルリップクリーム カネボウ 血色感 UVカット 縦ジワ補正', query: 'ケイト パーソナルリップクリーム' },
    { brand: 'canmake_muchipuru_tint_rouge', name: 'キャンメイク CANMAKE むちぷるティント プランパー ワセリン配合 粘膜カラー リップ', query: 'キャンメイク むちぷるティント' },
    { brand: 'opera_sheer_tint_rouge', name: 'オペラ OPERA リップティント N スクワラン 高保湿 シアー ティントオイルルージュ', query: 'オペラ リップティント N' },
    { brand: 'innisfree_dewy_tint_lip_balm', name: 'イニスフリー innisfree デューイ ティント リップバーム ヒアルロン酸 水光 うるおい', query: 'イニスフリー デューイ ティント リップバーム' },
    { brand: 'ettusais_lip_edition_tint', name: 'エテュセ リップエディション ティントルージュ エテュセ ettusais 血色ティント 美容液リップ', query: 'エテュセ リップエディション ティントルージュ' }
  ];

  const lipBalmItems = [];
  for (const cfg of lipBalmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 350) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipBalmItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 350 && !it.itemName.includes('中古') && !lipBalmItems.some(e => e.itemCode === it.itemCode));

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

  // --- テーマ3: 高保湿薬用ボディミルク＆セラミドボディローション 10選 ---
  console.log('\n=== テーマ3: 高保湿薬用ボディミルク＆セラミドボディローション ===');
  const bodyMilkConfigs = [
    { brand: 'curel_moisture_body_milk', name: 'キュレル 潤浸保湿 モイスチャーミルク ボディローション 乳液 セラミド機能成分 医薬部外品', query: 'キュレル モイスチャーミルク' },
    { brand: 'carte_hd_face_and_body_lotion', name: 'カルテHD モイスチュア フェイス＆ボディローション ヘパリン類似物質 全身用乳液 乾燥肌', query: 'カルテHD ボディローション' },
    { brand: 'neutrogena_cica_body_emulsion', name: 'ニュートロジーナ ノルウェー フォーミュラ インテンスリペア CICA エマルジョン ボディミルク', query: 'ニュートロジーナ CICA ボディエマルジョン' },
    { brand: 'minon_medicated_body_milk', name: 'ミノン 全身保湿ミルク 第一三共ヘルスケア アミノ酸 敏感肌 乾燥肌 大容量 ポンプ', query: 'ミノン 全身保湿ミルク' },
    { brand: 'cetaphil_moisturizing_lotion', name: 'セタフィル モイスチャライジング ローション 高保湿 ナイアシンアミド 敏感肌 全身 乳液', query: 'セタフィル モイスチャライジング ローション' },
    { brand: 'nivea_premium_body_milk_moist', name: 'ニベア プレミアム ボディミルク モイスチャー 高保水 ヒアルロン酸 花王 全身用乳液', query: 'ニベア プレミアム ボディミルク モイスチャー' },
    { brand: 'weleda_skin_food_body_milk', name: 'ヴェレダ WELEDA スキンフード ボディミルク オーガニック ハーブ 乾燥肌 保湿乳液', query: 'ヴェレダ スキンフード ボディミルク' },
    { brand: 'biore_u_the_body_wet_skin_milk', name: 'ビオレu ザ ボディ ぬれた肌に使うボディ乳液 つりさげパック 摩擦レス 花王 濡れた肌', query: 'ビオレu ぬれた肌に使うボディ乳液' },
    { brand: 'muji_sensitive_body_milk', name: '無印良品 敏感肌用 ボディミルク 大容量 保湿 スキンケア 植物エキス 低刺激', query: '無印良品 ボディミルク' },
    { brand: 'johnsons_body_care_lasting_moist', name: 'ジョンソンボディケア ラスティングモイスチャー アロマミルク シアバター ホホバ油 高保湿', query: 'ジョンソンボディケア ラスティングモイスチャー' }
  ];

  const bodyMilkItems = [];
  for (const cfg of bodyMilkConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (bodyMilkItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !bodyMilkItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bodyMilkItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n取得集計: 洗顔料=${cleanserItems.length}/10, リップバーム=${lipBalmItems.length}/10, ボディミルク=${bodyMilkItems.length}/10`);

  const outputData = {
    cleanserItems,
    lipBalmItems,
    bodyMilkItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = path.resolve('scratch/winter_batch85_items.json');
  fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`💾 取得データを保存しました: ${outPath}`);
}

fetchWinterBatch85Items().catch(console.error);
