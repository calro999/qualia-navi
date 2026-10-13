import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnCosmeItems() {
  console.log('🍂 [2026秋コスメ特集] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の最新リップ10選 ---
  console.log('\n=== テーマ1: 秋の最新リップ10選 ===');
  const lipConfigs = [
    { brand: 'kate_lip_monster_autumn', name: 'KATE ケイト リップモンスター 深みブラウン 秋カラー 落ちにくい 高発色 口紅', query: 'ケイト リップモンスター' },
    { brand: 'romand_juicy_lasting_tint', name: 'rom&nd ロムアンド ジューシーラスティングティント イチジク ナツメ 秋カラー 粘膜リップ', query: 'ロムアンド ジューシーラスティングティント' },
    { brand: 'laka_bonding_glow_lipstick', name: 'Laka ラカ ボンディンググロウ リップスティック 水光ツヤ ガラス玉 秋リップ', query: 'Laka ボンディンググロウ' },
    { brand: 'mac_lustreglass_lipstick', name: 'M・A・C マック ラスターガラス リップスティック シアー 高保湿 秋リップ MAC', query: 'MAC ラスターガラス リップスティック' },
    { brand: 'suqqu_moisture_glaze_lip', name: 'SUQQU スック モイスチャー グレイズ リップスティック 濃密ツヤ むっちり秋色', query: 'SUQQU モイスチャー グレイズ リップスティック' },
    { brand: 'dior_rouge_forever_liquid', name: 'Dior ディオール ルージュ ディオール フォーエヴァー リキッド 落ちない秋マット', query: 'ディオール ルージュ ディオール フォーエヴァー リキッド' },
    { brand: 'canmake_muchipuru_tint_autumn', name: 'キャンメイク むちぷるティント プランパー 粘膜リップ テラコッタ 秋カラー', query: 'キャンメイク むちぷるティント' },
    { brand: 'opera_lip_tint_autumn', name: 'オペラ OPERA リップティント N 透け感オイルルージュ 秋新色 透けバーガンディ', query: 'オペラ リップティント N' },
    { brand: 'cezanne_lip_color_shield', name: 'セザンヌ リップカラーシールド ジェル膜 落ちにくい フィグブラウン 秋カラー', query: 'セザンヌ リップカラーシールド' },
    { brand: 'chanel_rouge_allure_laque', name: 'CHANEL シャネル ルージュ アリュール ラック リクィッド リップカラー 鮮やかツヤ', query: 'シャネル ルージュ アリュール ラック' }
  ];

  const lipItems = [];
  for (const cfg of lipConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !lipItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の最新チーク10選 ---
  console.log('\n=== テーマ2: 秋の最新チーク10選 ===');
  const cheekConfigs = [
    { brand: 'cezanne_cheek_blush', name: 'セザンヌ チークブラッシュ なめらか密着 スキントーン ベージュ シナモン 秋チーク', query: 'セザンヌ チークブラッシュ' },
    { brand: 'nars_blush_afterglow', name: 'NARS ナーズ アフターグロー リキッドブラッシュ または パウダーブラッシュ 秋血色', query: 'NARS ブラッシュ' },
    { brand: 'clinique_cheek_pop', name: 'クリニーク CLINIQUE チークポップ ベイクドパウダー ガーベラ ヌードポップ フィグポップ', query: 'クリニーク チークポップ' },
    { brand: 'canmake_cream_cheek', name: 'キャンメイク CANMAKE むにゅっとハイライター クリームチーク パール 透けツヤ', query: 'キャンメイク クリームチーク' },
    { brand: 'romand_better_than_cheek', name: 'rom&nd ロムアンド ベターザンチーク ふんわり毛穴ブラー 儚げ秋くすみカラー', query: 'ロムアンド ベターザンチーク' },
    { brand: 'fwee_lip_and_cheek_pudding_pot', name: 'fwee フィー リップアンドチーク ブラーリー プリンポット ふんわりマット 秋スフレ', query: 'fwee リップアンドチーク プリンポット' },
    { brand: 'suqqu_pure_color_blush', name: 'SUQQU スック ピュア カラー ブラッシュ または ブラーリング カラー ブラッシュ グラデーション', query: 'SUQQU ブラッシュ' },
    { brand: 'hince_true_dimension_glow_cheek', name: 'hince ヒンス トゥルーディメンション グロウチーク シアー 透明ツヤ 水光ハイライトチーク', query: 'hince トゥルーディメンション グロウチーク' },
    { brand: 'laura_mercier_blush_color_infusion', name: 'ローラメルシエ ブラッシュ カラー インフュージョン チャイ ジンジャー 秋ベージュ', query: 'ローラメルシエ ブラッシュ カラー インフュージョン' },
    { brand: 'chanel_joues_contraste', name: 'CHANEL シャネル ジュ コントゥラスト パウダー チーク 上品な秋の血色感', query: 'シャネル ジュ コントゥラスト' }
  ];

  const cheekItems = [];
  for (const cfg of cheekConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (cheekItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !cheekItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cheekItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の最新ネイルチップ＆秋ネイル10選 ---
  console.log('\n=== テーマ3: 秋の最新ネイルチップ＆秋ネイル10選 ===');
  const nailConfigs = [
    { brand: 'dashing_diva_magic_press_autumn', name: 'ダッシングディバ DASHING DIVA マジックプレス 秋ネイル べっ甲 マグネット ワンタッチ貼るだけ', query: 'ダッシングディバ マジックプレス' },
    { brand: 'finger_suit_nail_tips', name: 'フィンガースーツ FINGER SUIT プレミアム ネイルチップ 水光マグネット ニュアンス 秋デザイン', query: 'フィンガースーツ ネイルチップ' },
    { brand: 'ohora_semi_cured_gel_autumn', name: 'ohora オホーラ セミキュアジェル ネイルシール 秋コレクション べっ甲 キャメル 深紅', query: 'ohora ネイル' },
    { brand: 'gelato_factory_nail_tip', name: 'ジェラートファクトリー GELATO FACTORY パーフェクトフィット ネイルチップ 秋カラー', query: 'ジェラートファクトリー ネイル' },
    { brand: 'handmade_tortoiseshell_nail_tips', name: 'ハンドメイド べっ甲 ネイルチップ 秋ネイル ブラウン ニュアンス ゴールド 成人式 前撮り', query: 'べっ甲 ネイルチップ' },
    { brand: 'magnet_galaxy_nail_tips', name: 'マグネットネイル チップ キャッツアイ 秋カラー ボルドー ブラウン ぷっくり ニュアンス', query: 'マグネット ネイルチップ' },
    { brand: 'terracotta_autumn_nuance_tips', name: 'テラコッタ ニュアンス ネイルチップ 秋 くすみカラー ミラーネイル シェル 天然石風', query: 'テラコッタ ネイルチップ' },
    { brand: 'bordeaux_gold_french_tips', name: 'ボルドー ワインレッド ネイルチップ フレンチ ミラーゴールド 秋 上品 大人ネイル', query: 'ボルドー ネイルチップ' },
    { brand: 'cafe_latte_nuance_nail_tips', name: 'カフェオレ ニュアンス ネイルチップ マーブル もやもや ラテネイル 淡色 秋コーデ', query: '淡色 ネイルチップ' },
    { brand: 'mat_check_autumn_nail_tips', name: 'マット チェック ネイルチップ 秋ネイル アーガイル ニットネイル くすみカラー', query: 'チェック ネイルチップ 秋' }
  ];

  const nailItems = [];
  for (const cfg of nailConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (nailItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !nailItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nailItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const resultData = {
    lipItems,
    cheekItems,
    nailItems
  };

  const outputPath = path.resolve('scratch/autumn_batch_items.json');
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 楽天APIより取得完了！保存先: ${outputPath}`);
  console.log(`取得商品数: リップ=${lipItems.length}件, チーク=${cheekItems.length}件, ネイルチップ=${nailItems.length}件`);
}

fetchAutumnCosmeItems().catch(console.error);
