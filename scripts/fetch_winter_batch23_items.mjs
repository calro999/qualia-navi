import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch23Items() {
  console.log('❄️ [11-12月コスメ 第23弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 高密着ジェル＆極細リキッドアイライナー ---
  console.log('\n=== テーマ1: 高密着ジェル＆極細リキッドアイライナー ===');
  const eyelinerConfigs = [
    { brand: 'canmake_gel_eyeliner', name: 'キャンメイク クリーミータッチライナー', query: 'キャンメイク クリーミータッチライナー' },
    { brand: 'loveliner_liquid_eyeliner', name: 'ラブ・ライナー リキッドアイライナーR4', query: 'ラブライナー リキッドアイライナー R4' },
    { brand: 'dup_silky_liquid_eyeliner', name: 'ディーアップ シルキーリキッドアイライナーWP', query: 'ディーアップ シルキーリキッドアイライナー' },
    { brand: 'kate_rare_fit_gel_eyeliner', name: 'ケイト レアフィットジェルペンシルN', query: 'ケイト レアフィットジェルペンシル' },
    { brand: 'dejavu_cream_pencil_eyeliner', name: 'デジャヴュ ラスティンファインE 極細クリームペンシル', query: 'デジャヴュ ラスティンファイン 極細クリームペンシル' },
    { brand: 'uzu_eye_opening_eyeliner', name: 'UZU アイオープニングライナー', query: 'UZU アイオープニングライナー' },
    { brand: 'ettusais_gel_eyeliner', name: 'エテュセ アイエディション ジェルライナー', query: 'エテュセ アイエディション ジェルライナー' },
    { brand: 'heroinemake_liquid_eyeliner', name: 'ヒロインメイク スムースリキッドアイライナー スーパーキープ', query: 'ヒロインメイク スムースリキッドアイライナー スーパーキープ' },
    { brand: 'celvoke_sureness_eyeliner', name: 'セルヴォーク シュアネス アイライナーペンシル', query: 'セルヴォーク シュアネス アイライナーペンシル' },
    { brand: 'chanel_stylo_yeux_eyeliner', name: 'シャネル スティロ ユー ウォータープルーフ N', query: 'シャネル スティロ ユー ウォータープルーフ' }
  ];

  const eyelinerItems = [];
  for (const cfg of eyelinerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyelinerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 低刺激リップスクラブ＆シュガースクラブ ---
  console.log('\n=== テーマ2: 低刺激リップスクラブ＆シュガースクラブ ===');
  const lipScrubConfigs = [
    { brand: 'revlon_sugar_lip_scrub', name: 'レブロン キス シュガー スクラブ', query: 'レブロン キス シュガー スクラブ' },
    { brand: 'dior_addict_lip_scrub', name: 'ディオール アディクト スクラブ＆バーム', query: 'ディオール アディクト スクラブ バーム' },
    { brand: 'canmake_plump_lip_scrub', name: 'キャンメイク プランプリップケアスクラブ', query: 'キャンメイク プランプリップケアスクラブ' },
    { brand: 'lush_lip_scrub', name: 'LUSH ラッシュ リップスクラブ', query: 'LUSH ラッシュ リップスクラブ' },
    { brand: 'sarahapp_lip_scrub', name: 'サラハップ リップスクラブ', query: 'サラハップ リップスクラブ' },
    { brand: 'laneige_lip_treatment_scrub', name: 'ラネージュ リップ スリーピングマスク / スクラブ', query: 'ラネージュ リップスリーピングマスク 20g' },
    { brand: 'etude_ginger_sugar_scrub', name: 'エチュード ジンジャーシュガー リップスクラブ', query: 'エチュード ジンジャーシュガー' },
    { brand: 'mac_lip_scrubtious', name: 'M・A・C リップ スクラブシャス / リップトリートメント', query: 'MAC リップ スクラブ' },
    { brand: 'loccitane_fruit_lip_scrub', name: 'ロクシタン デリシャス＆フルーティー リップスクラブ', query: 'ロクシタン リップスクラブ' },
    { brand: 'torriden_ceramide_lip_essence', name: 'トリデン ソリッドイン セラミド リップエッセンス / スクラブ', query: 'トリデン セラミド リップエッセンス 11ml' }
  ];

  const lipScrubItems = [];
  for (const cfg of lipScrubConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipScrubItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高密着スティック＆リキッドアイシャドウ ---
  console.log('\n=== テーマ3: 高密着スティック＆リキッドアイシャドウ ===');
  const stickEyeshadowConfigs = [
    { brand: 'bobbibrown_cream_shadow_stick', name: 'ボビイ ブラウン ロングウェア クリーム シャドウ スティック', query: 'ボビイブラウン ロングウェア クリーム シャドウ スティック' },
    { brand: 'lauramercier_caviar_stick', name: 'ローラ メルシエ キャビアスティック アイカラー', query: 'ローラメルシエ キャビアスティック アイカラー' },
    { brand: 'decorte_eyeglow_gem', name: 'コスメデコルテ アイグロウジェム スキンシャドウ', query: 'コスメデコルテ アイグロウジェム スキンシャドウ' },
    { brand: 'addiction_liquid_eyeshadow', name: 'アディクション ザ リキッド アイシャドウ ウルトラスパークル', query: 'アディクション ザ リキッド アイシャドウ' },
    { brand: 'cipicipi_glitter_liner', name: 'CipiCipi シピシピ グリッター イルミネーションライナー R', query: 'シピシピ グリッター イルミネーションライナー' },
    { brand: 'wonjungyo_metal_shower_pencil', name: 'Wonjungyo ウォンジョンヨ メタルシャワーペンシル', query: 'ウォンジョンヨ メタルシャワーペンシル' },
    { brand: 'dasique_starlit_liquid_glitter', name: 'デイジーク スターリット リキッド グリッター', query: 'デイジーク リキッド グリッター dasique' },
    { brand: 'elegance_rayon_gelee_eyes', name: 'エレガンス レヨン ジュレアイズ N', query: 'エレガンス レヨン ジュレアイズ' },
    { brand: 'etude_bling_bling_eyestick', name: 'エチュード キラキラ アイシャドウ', query: 'エチュード キラキラ アイシャドウ' },
    { brand: 'fujiko_shake_shadow', name: 'フジコ シェイクシャドウ SV', query: 'フジコ シェイクシャドウ' }
  ];

  const stickEyeshadowItems = [];
  for (const cfg of stickEyeshadowConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        stickEyeshadowItems.push(valid);
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
    theme1_eyeliner: eyelinerItems,
    theme2_lipscrub: lipScrubItems,
    theme3_stickeyeshadow: stickEyeshadowItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch23_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: アイライナー=${eyelinerItems.length}/10, リップスクラブ=${lipScrubItems.length}/10, スティックシャドウ=${stickEyeshadowItems.length}/10`);
  console.log('scratch/rakuten_winter_batch23_items.json に保存しました！');
}

fetchWinterBatch23Items().catch(console.error);
