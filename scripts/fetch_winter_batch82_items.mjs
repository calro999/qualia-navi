import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch82Items() {
  console.log('❄️ [11-12月冬コスメ 第82弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: スティックアイシャドウ＆涙袋グリッターペンシル 10選 ---
  console.log('\n=== テーマ1: スティックアイシャドウ＆涙袋グリッターペンシル ===');
  const eyeshadowConfigs = [
    { brand: 'lauramercier_caviar_stick', name: 'ローラメルシエ キャビアスティック アイカラー スティックアイシャドウ 高密着 濡れツヤ', query: 'ローラメルシエ キャビアスティック アイカラー' },
    { brand: 'bobbibrown_cream_shadow_stick', name: 'ボビイブラウン BOBBI BROWN ロングウェア クリーム シャドウ スティック ウォータープルーフ', query: 'ボビイブラウン ロングウェア クリーム シャドウ スティック' },
    { brand: 'wonjungyo_metal_shower_pencil', name: 'ウォンジョンヨ Wonjungyo メタルシャワーペンシル 涙袋 ぷっくり うるみ目 高密着', query: 'ウォンジョンヨ メタルシャワーペンシル' },
    { brand: 'excel_gleam_on_fit_shadow', name: 'エクセル excel グリームオンフィットシャドウ スティックアイシャドウ 濡れツヤ 密着', query: 'エクセル グリームオンフィットシャドウ' },
    { brand: 'cipicipi_glitter_illumination_liner', name: 'シピシピ CipiCipi グリッター イルミネーションライナー R 涙袋 うるうるラメ 極細筆', query: 'シピシピ グリッター イルミネーションライナー' },
    { brand: 'canmake_eyecolor_magician', name: 'キャンメイク CANMAKE アイカラーマジシャン リキッドアイシャドウ 濡れツヤ 速乾 密着', query: 'キャンメイク アイカラーマジシャン' },
    { brand: 'etude_kirakira_eyeshadow_stick', name: 'エチュード ETUDE キラキラ アイシャドウ スティック 涙袋 アイライナー 韓国コスメ', query: 'エチュード キラキラ アイシャドウ' },
    { brand: 'addiction_liquid_eyeshadow_sparkle', name: 'アディクション ADDICTION ザ リキッド アイシャドウ ウルトラスパークル ホリデー 輝き', query: 'アディクション ザ リキッド アイシャドウ ウルトラスパークル' },
    { brand: 'cosmedecorte_eye_glow_gem', name: 'コスメデコルテ アイグロウジェム スキンシャドウ クリーム アイシャドウ 濡れツヤ 透け感', query: 'コスメデコルテ アイグロウジェム スキンシャドウ' },
    { brand: 'kate_electric_shock_eyes', name: 'ケイト KATE エレクトリックショックアイズ 生ラメ 濡れツヤ 高密着 アイシャドウ', query: 'ケイト エレクトリックショックアイズ' }
  ];

  const eyeshadowItems = [];
  for (const cfg of eyeshadowConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyeshadowItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !eyeshadowItems.some(e => e.itemCode === it.itemCode));

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

  // --- テーマ2: 濃厚ボディバター＆高保湿モイスチャークリーム 10選 ---
  console.log('\n=== テーマ2: 濃厚ボディバター＆高保湿モイスチャークリーム ===');
  const bodyButterConfigs = [
    { brand: 'thebodyshop_body_butter_shea', name: 'ザボディショップ THE BODY SHOP ボディバター シア 200ml 高保湿 シアシールド 全身保湿', query: 'ボディショップ ボディバター シア 200ml' },
    { brand: 'loccitane_shea_ultra_rich_body_cream', name: 'ロクシタン L\'OCCITANE シア リッチボディクリーム 200ml シアバター25% 濃密バーム', query: 'ロクシタン シア リッチボディクリーム 200ml' },
    { brand: 'lauramercier_souffle_body_cream_amber_vanilla', name: 'ローラメルシエ スフレ ハンド＆ボディクリーム アンバーバニラ または ホイップトボディクリーム', query: 'ローラメルシエ アンバーバニラ ボディクリーム' },
    { brand: 'weleda_skinfood_body_butter', name: 'ヴェレダ WELEDA スキンフード ボディバター 150ml オーガニック 高保湿 集中ケア', query: 'ヴェレダ スキンフード ボディバター' },
    { brand: 'sabon_repair_body_cream', name: 'サボン SABON リペアボディクリーム 200ml ジェントルマン または パチュリ ラベンダー バニラ', query: 'サボン リペアボディクリーム' },
    { brand: 'aesop_resolute_hydrating_body_balm', name: 'イソップ Aesop レゾルート ハイドレーティング ボディバーム 500ml または 100ml 保湿', query: 'イソップ ボディバーム レゾルート' },
    { brand: 'cetaphil_moisturizing_cream', name: 'セタフィル Cetaphil モイスチャライジングクリーム 566g 大容量 高保湿 保湿クリーム', query: 'セタフィル モイスチャライジングクリーム' },
    { brand: 'neutrogena_norwegian_formula_intense_repair_balm', name: 'ニュートロジーナ ノルウェー フォーミュラ インテンスリペア リッチバーム CICA 純グリセリン', query: 'ニュートロジーナ インテンスリペア リッチバーム' },
    { brand: 'kiehls_creme_de_corps_body_cream', name: 'キールズ KIEHL\'S クレム ドゥ コール ボディクリーム 250ml または 500ml 保湿', query: 'キールズ クレム ドゥ コール ボディクリーム' },
    { brand: 'clarins_moisture_rich_body_lotion', name: 'クラランス CLARINS モイスチャー リッチ ボディ ローション 200ml シアバター 高保湿', query: 'クラランス モイスチャー リッチ ボディ ローション' }
  ];

  const bodyButterItems = [];
  for (const cfg of bodyButterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (bodyButterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !bodyButterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bodyButterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高密着アイブロウパウダー＆極細アイブロウペンシル 10選 ---
  console.log('\n=== テーマ3: 高密着アイブロウパウダー＆極細アイブロウペンシル ===');
  const eyebrowConfigs = [
    { brand: 'kate_designing_eyebrow_3d', name: 'ケイト KATE デザイニングアイブロウ3D パウダーアイブロウ ノーズシャドウ 立体眉', query: 'ケイト デザイニングアイブロウ3D' },
    { brand: 'jillstuart_nuance_brow_palette', name: 'ジルスチュアート ニュアンスブロウパレット アイブロウパウダー ロージー 抜け感眉', query: 'ジルスチュアート ニュアンスブロウパレット' },
    { brand: 'cezanne_nose_eyebrow_powder', name: 'セザンヌ CEZANNE ノーズ＆アイブロウパウダー 彫り深立体眉 落ちにくい ふんわり', query: 'セザンヌ ノーズ＆アイブロウパウダー' },
    { brand: 'celvoke_indicate_eyebrow_powder', name: 'セルヴォーク Celvoke インディケイト アイブロウパウダー おしゃれ垢抜け ニュアンス眉', query: 'セルヴォーク インディケイト アイブロウパウダー' },
    { brand: 'elegance_eyebrow_slim', name: 'エレガンス Elegance アイブロウ スリム カートリッジ 極細ペンシル 1本1本自眉再現', query: 'エレガンス アイブロウ スリム' },
    { brand: 'excel_powder_and_pencil_eyebrow_ex', name: 'エクセル excel パウダー＆ペンシル アイブロウEX 3in1 一体型 ふんわり立体眉', query: 'エクセル パウダー＆ペンシル アイブロウEX' },
    { brand: 'dejavu_powder_pencil_eyebrow', name: 'デジャヴュ dejavu パウダークリームアイブロウ ステイナチュラ 自眉質感 密着', query: 'デジャヴュ パウダーペンシル アイブロウ' },
    { brand: 'shuuemura_hard_formula_eyebrow_pencil', name: 'シュウ ウエムラ shu uemura ハード フォーミュラ ハード9 眉ペンシル 削り プロ御用達', query: 'シュウウエムラ ハード フォーミュラ' },
    { brand: 'addiction_pressed_duo_eyebrow', name: 'アディクション ADDICTION プレスド デュオ アイブロウ しっとり密着 自然な陰影', query: 'アディクション プレスド デュオ アイブロウ' },
    { brand: 'fujiko_magical_eyebrow_color_mascara', name: 'フジコ Fujiko マジカルアイブロウカラー または 眉ティント SVR 垢抜け ふんわり眉', query: 'フジコ マジカルアイブロウカラー' }
  ];

  const eyebrowItems = [];
  for (const cfg of eyebrowConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyebrowItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !eyebrowItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyebrowItems.push(valid);
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
    theme1_radiant_stick_eyeshadow: eyeshadowItems,
    theme2_rich_moisturizing_body_butter: bodyButterItems,
    theme3_fluffy_eyebrow_powder_pencil: eyebrowItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch82_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第82弾 30商品の最新データ保存完了: ${outPath}`);
  console.log(`テーマ1 (スティックアイシャドウ): ${eyeshadowItems.length}/10`);
  console.log(`テーマ2 (ボディバター): ${bodyButterItems.length}/10`);
  console.log(`テーマ3 (アイブロウパウダー＆ペンシル): ${eyebrowItems.length}/10`);
}

fetchWinterBatch82Items().catch(console.error);
