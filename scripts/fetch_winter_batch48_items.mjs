import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch48Items() {
  console.log('❄️ [11-12月冬コスメ 第48弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬ホリデー限定】クリスマスコフレ＆ホリデー限定メイクアップパレット 10選 ---
  console.log('\n=== テーマ1: クリスマスコフレ＆ホリデー限定メイクパレット ===');
  const holidayConfigs = [
    { brand: 'jillstuart_holiday_coffret', name: 'ジルスチュアート クリスマスコフレ ホリデーコレクション アイカラー＆ポーチ限定セット', query: 'ジルスチュアート クリスマスコフレ 限定' },
    { brand: 'suqqu_holiday_eyeshadow', name: 'SUQQU スック シグニチャー カラー アイズ ホリデー限定 アイシャドウパレット 瞬く冬の煌めき', query: 'SUQQU ホリデー アイシャドウ 限定' },
    { brand: 'decorte_holiday_coffret', name: 'コスメデコルテ クリスマスコフレ ホリデーコレクション メイクアップ コフレ 限定品', query: 'コスメデコルテ クリスマスコフレ 限定' },
    { brand: 'dior_holiday_eyeshadow_palette', name: 'DIOR ディオールショウ サンク クルール ホリデー限定 エクラン アイシャドウ パレット', query: 'ディオール ホリデー アイシャドウ 限定' },
    { brand: 'lunasol_holiday_eye_color', name: 'LUNASOL ルナソル アイカラーレーション ホリデー限定 パレット 多彩なパールと光沢', query: 'ルナソル ホリデー アイシャドウ 限定' },
    { brand: 'ysl_holiday_couture_mini_clutch', name: 'イヴ・サンローラン クチュール ミニ クラッチ ホリデー限定 ジュエルアイシャドウ', query: 'イヴサンローラン クチュール ミニ クラッチ 限定' },
    { brand: 'nars_holiday_eyeshadow_palette', name: 'NARS ナーズ アンラップド オーデイシャス ホリデー限定 アイシャドウパレット', query: 'NARS ホリデー アイシャドウ 限定' },
    { brand: 'bobbi_brown_holiday_eyeshadow', name: 'BOBBI BROWN ボビイ ブラウン リュクス アイシャドウ パレット ホリデー限定 リッチメタル', query: 'ボビイブラウン ホリデー アイシャドウ 限定' },
    { brand: 'chanel_holiday_les_4_ombres', name: 'CHANEL シャネル レ キャトル オンブル ホリデー限定 特別限定品 アイシャドウ パレット', query: 'シャネル レキャトルオンブル 限定' },
    { brand: 'clio_holiday_pro_eye_palette', name: 'CLIO クリオ プロ アイ パレット エアー ホリデー限定 グリッター＆マット 多幸感パレット', query: 'クリオ プロアイパレット 限定' }
  ];

  const holidayItems = [];
  for (const cfg of holidayConfigs) {
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
        holidayItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・暖房砂漠でも粉吹きゼロ＆うるおい発光】高保湿美容液ファンデーション＆水光セラムクッション 10選 ---
  console.log('\n=== テーマ2: 高保湿美容液ファンデーション＆水光クッション ===');
  const foundationConfigs = [
    { brand: 'shiseido_revitalessence_glow', name: 'SHISEIDO 資生堂 エッセンス スキングロウ ファンデーション 30ml 美容液処方 ナイアシンアミド配合', query: '資生堂 エッセンス スキングロウ ファンデーション 30ml' },
    { brand: 'cledepeau_teint_creme_eclat', name: 'クレ・ド・ポー ボーテ タンクレームエクラ n 25g 贅沢なトリートメントクリームファンデーション サテンの艶', query: 'クレドポーボーテ タンクレームエクラ n' },
    { brand: 'tirtir_red_cushion_foundation', name: 'TIRTIR ティルティル マスクフィット レッドクッション 18g 美容成分高配合 72時間潤い密着ツヤ', query: 'TIRTIR マスクフィット レッドクッション' },
    { brand: 'decorte_zen_wear_glow', name: 'コスメデコルテ ゼン ウェア グロウ 30ml みずみずしい上品な光沢 梅エキス高保湿美容液ファンデ', query: 'コスメデコルテ ゼン ウェア グロウ' },
    { brand: 'laura_mercier_flawless_lumiere', name: 'ローラ メルシエ フローレス ルミエール ラディアンス パーフェクティング ファンデーション 30ml', query: 'ローラメルシエ フローレス ルミエール ファンデーション' },
    { brand: 'bobbi_brown_intensive_serum_foundation', name: 'BOBBI BROWN ボビイ ブラウン インテンシブ セラム ファンデーション SPF40 冬虫夏草 美容液ファンデ', query: 'ボビイブラウン インテンシブ セラム ファンデーション' },
    { brand: 'suqqu_the_foundation', name: 'SUQQU スック ザ ファンデーション 30g 移り変わる艶 13種の国産美容エキス配合 至高のクリーム', query: 'SUQQU ザ ファンデーション 30g' },
    { brand: 'clio_kill_cover_mesh_glow', name: 'CLIO クリオ キルカバー メッシュ グロー クッション 15g スキンケア成分配合 水分あふれる生ツヤ', query: 'クリオ キルカバー メッシュグロー クッション' },
    { brand: 'mac_studio_radiance_serum_foundation', name: 'M・A・C スタジオ ラディアンス セラム ファンデーション 30ml 80%スキンケアベース 潤い持続', query: 'MAC スタジオ ラディアンス セラム ファンデーション' },
    { brand: 'haku_botanical_essence_foundation', name: 'HAKU 薬用 美容液クッション コンパクト 12g 4MSK配合 メイクしながら美白＆乾燥ケア', query: 'HAKU 美容液クッションコンパクト' }
  ];

  const foundationItems = [];
  for (const cfg of foundationConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
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

  // --- テーマ3: 【2026冬・角層バリア崩壊を救う】ヒト型セラミド原液＆高濃度セラミド導入美容液 10選 ---
  console.log('\n=== テーマ3: ヒト型セラミド原液＆高濃度セラミド美容液 ===');
  const ceramideConfigs = [
    { brand: 'etvos_moisturizing_serum', name: 'ETVOS エトヴォス モイスチャライジングセラム 50ml 5種のヒト型セラミド 高濃度1本で美容液＋乳液', query: 'エトヴォス モイスチャライジングセラム 50ml' },
    { brand: 'toutvert_nanocelamide_essence', name: 'TOUT VERT トゥヴェール ナノエマルジョン 50ml 浸透湿潤セラミド10% 高濃度インナードライ対策乳液', query: 'トゥヴェール ナノエマルジョン 50ml' },
    { brand: 'curel_deep_moisture_spray', name: '花王 キュレル ディープモイスチャースプレー 250g 微細化セラミド機能成分配合 顔・全身潤い補給', query: 'キュレル ディープモイスチャースプレー 250g' },
    { brand: 'matsuyama_hadauru_moisture_serum', name: '松山油脂 肌をうるおす保湿スキンケア 保湿美容液 30ml 5種類のヒト型セラミド配合 無添加・低刺激', query: '肌をうるおす 保湿美容液 30ml' },
    { brand: 'kiso_ceramide_pure_essence', name: 'KISO キソ 原液美容液 セラミド 20ml ヒト型セラミド原液 原料そのまま角層ダイレクト補給', query: 'KISO セラミド 原液 美容液' },
    { brand: 'tunemakers_ceramide_200', name: 'チューンメーカーズ TUNEMAKERS 原液 セラミド200 20ml 高濃度ナノセラミド 肌のバリア機能を整える', query: 'チューンメーカーズ セラミド 200 20ml' },
    { brand: 'ink_ceramide_essence', name: 'ink. インク モイストエッセンス 50ml 5種のヒト型セラミド 原液高配合 肌荒れ・乾燥肌ケア', query: 'ink セラミド エッセンス 50ml' },
    { brand: 'ceracolla_moisture_lotion', name: '明色化粧品 セラコラ 保湿乳液 145ml トリプルセラミド＆ナノコラーゲン 肌バリアを密着保護', query: 'セラコラ 保湿乳液 145ml' },
    { brand: 'care_cera_ap_barrier_milk', name: 'ケアセラ AP フェイス＆ボディ乳液 200ml 天然型セラミド7種配合 乾燥性敏感肌のバリア回復', query: 'ケアセラ AP 乳液 200ml' },
    { brand: 'astatlift_jelly_aquarysta', name: '富士フイルム アスタリフト ジェリー アクアリスタ 40g 世界最小Wヒト型ナノセラミド 先行導入ジェリー', query: 'アスタリフト ジェリー アクアリスタ 40g' }
  ];

  const ceramideItems = [];
  for (const cfg of ceramideConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        ceramideItems.push(valid);
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
    theme1_holiday: holidayItems,
    theme2_foundation: foundationItems,
    theme3_ceramide: ceramideItems,
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch48_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計アイテム取得数: テーマ1=${holidayItems.length}, テーマ2=${foundationItems.length}, テーマ3=${ceramideItems.length}`);
  console.log('scratch/rakuten_winter_batch48_items.json に保存完了しました！');
}

fetchWinterBatch48Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
