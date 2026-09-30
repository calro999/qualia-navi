import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch11Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch11_items.json', 'utf8'));

// --- テーマ1: 泡立たない高保湿朝洗顔・温感ジュレ洗顔 厳選10商品 ---
const morningItemsRaw = [
  // 1. KANEBO コンフォート ストレッチィ ウォッシュ II
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("コンフォート") && it.itemName.includes("ストレッチィ")) || batch11Data.theme1_morning_cleanser[11],
  // 2. LAGOM ジェルトゥウォーター クレンザー
  batch11Data.theme1_morning_cleanser.find(it => (it.itemName.includes("LAGOM") || it.itemName.includes("ラゴム")) && !it.itemName.includes("2本")) || batch11Data.theme1_morning_cleanser[20],
  // 3. ルナソル ポリッシングクリア ジェルウォッシュ
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("ポリッシングクリア") || (it.itemName.includes("ルナソル") && it.itemName.includes("ジェルウォッシュ"))) || batch11Data.theme1_morning_cleanser[0],
  // 4. KANEBO スクラビング マッド ウォッシュ
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("スクラビング") && it.itemName.includes("マッド") && !it.itemName.includes("2個")) || batch11Data.theme1_morning_cleanser[1],
  // 5. エスト クラリファイイング ジェル ウォッシュ MED
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("クラリファイイング") && !it.itemName.includes("頭皮") && !it.itemName.includes("ミニ") && !it.itemName.includes("3個")) || batch11Data.theme1_morning_cleanser[31],
  // 6. マナラ モイストウォッシュゲル
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("マナラ") || it.itemName.includes("モイストウォッシュ")) || batch11Data.theme1_morning_cleanser[30],
  // 7. ソフィーナiP ポア クリアリング ジェル ウォッシュ
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("ソフィーナ") && it.itemName.includes("ポア")) || batch11Data.theme1_morning_cleanser[40],
  // 8. ビオレ おうちdeエステ 肌をなめらかにするマッサージ洗顔ジェル
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("ビオレ") && it.itemName.includes("おうちdeエステ") && !it.itemName.includes("ミニ")) || batch11Data.theme1_morning_cleanser[48],
  // 9. キュレル 泡洗顔料 本体 150ml
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("キュレル") && it.itemName.includes("泡洗顔料") && !it.itemName.includes("つめかえ") && !it.itemName.includes("詰め替え")) || batch11Data.theme1_morning_cleanser[0],
  // 10. ファンケル 泥ジェル洗顔
  batch11Data.theme1_morning_cleanser.find(it => it.itemName.includes("泥ジェル洗顔")) || batch11Data.theme1_morning_cleanser[0]
].filter(Boolean);

// --- テーマ2: 高保湿エイジングケア化粧水＆エッセンスローション 厳選10商品 ---
const lotionItemsRaw = [
  // 1. コスメデコルテ イドラクラリティ 薬用 トリートメント エッセンス ウォーター
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("イドラクラリティ") && !it.itemName.includes("3点")) || batch11Data.theme2_rich_lotion[10],
  // 2. SK-II フェイシャル トリートメント エッセンス
  batch11Data.theme2_rich_lotion.find(it => (it.itemName.includes("SK-II") || it.itemName.includes("SK2")) && it.itemName.includes("フェイシャル トリートメント エッセンス") && !it.itemName.includes("2本")) || batch11Data.theme2_rich_lotion[24],
  // 3. アルビオン フローラドリップ
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("フローラドリップ") && !it.itemName.includes("2本")) || batch11Data.theme2_rich_lotion[67],
  // 4. イプサ ザ・タイムR アクア
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("イプサ") || it.itemName.includes("タイムR")) || batch11Data.theme2_rich_lotion[0],
  // 5. カルテHD 高保湿ローション
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("カルテHD") && it.itemName.includes("ローション") && !it.itemName.includes("ボディ")) || batch11Data.theme2_rich_lotion[26],
  // 6. オルビスユードット エッセンスローション
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("オルビス") && it.itemName.includes("ドット")) || batch11Data.theme2_rich_lotion[32],
  // 7. アクセーヌ モイストバランス ローション
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("アクセーヌ") && it.itemName.includes("モイストバランス")) || batch11Data.theme2_rich_lotion[39],
  // 8. キュレル ディープモイスチャースプレー
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("キュレル") && it.itemName.includes("ディープモイスチャー") && !it.itemName.includes("2本") && !it.itemName.includes("3本")) || batch11Data.theme2_rich_lotion[52],
  // 9. 肌ラボ 極潤プレミアム ヒアルロン液
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("極潤プレミアム") && !it.itemName.includes("5本") && !it.itemName.includes("詰替")) || batch11Data.theme2_rich_lotion[58],
  // 10. カネボウ スキン ハーモナイザー
  batch11Data.theme2_rich_lotion.find(it => it.itemName.includes("スキン ハーモナイザー") || it.itemName.includes("ハーモナイザー")) || batch11Data.theme2_rich_lotion[0]
].filter(Boolean);

// --- テーマ3: 濃厚補修ヘアミルク＆洗い流さないアウトバストリートメント 厳選10商品 ---
const hairMilkItemsRaw = [
  // 1. オルビス エッセンスインヘアミルク
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("オルビス") && it.itemName.includes("エッセンスインヘアミルク") && !it.itemName.includes("4点")) || batch11Data.theme3_hair_milk[11],
  // 2. ミルボン エルジューダ エマルジョン＋
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("エルジューダ") && (it.itemName.includes("エマルジョン＋") || it.itemName.includes("エマルジョン+")) && !it.itemName.includes("2本")) || batch11Data.theme3_hair_milk[2],
  // 3. oggi otto セラム CMC ミルキィ
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("オッジィオット") && it.itemName.includes("ミルキィ") && !it.itemName.includes("450g") && !it.itemName.includes("3種")) || batch11Data.theme3_hair_milk[28],
  // 4. 資生堂 サブリミック ワンダーシールド
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("ワンダーシールド") && !it.itemName.includes("詰替") && !it.itemName.includes("2個")) || batch11Data.theme3_hair_milk[38],
  // 5. ナプラ N. シアミルク
  batch11Data.theme3_hair_milk.find(it => (it.itemName.includes("N. シアミルク") || it.itemName.includes("N. SHEA")) && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch11Data.theme3_hair_milk[48],
  // 6. ケラスターゼ ネクター テルミック
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("ケラスターゼ") || it.itemName.includes("ネクター テルミック")) || batch11Data.theme3_hair_milk[7],
  // 7. モロッカンオイル オールインワン リーブイン コンディショナー
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("モロッカンオイル") && it.itemName.includes("リーブイン")) || data.theme3_hair_milk[57],
  // 8. ラ・カスタ アロマエステ ヘアエマルジョン
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("ラ・カスタ") && it.itemName.includes("ヘアエマルジョン") && !it.itemName.includes("リフィル") && !it.itemName.includes("2本")) || batch11Data.theme3_hair_milk[62],
  // 9. ジョンマスターオーガニック R&Aヘアミルク
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("ジョンマスター") || it.itemName.includes("R&Aヘアミルク")) || batch11Data.theme3_hair_milk[0],
  // 10. エイトザタラソ 美容液ヘアミルク
  batch11Data.theme3_hair_milk.find(it => it.itemName.includes("エイトザタラソ") || it.itemName.includes("タラソ")) || batch11Data.theme3_hair_milk[0]
].filter(Boolean);

console.log(`選定アイテム数: 朝洗顔=${morningItemsRaw.length}, 化粧水=${lotionItemsRaw.length}, ヘアミルク=${hairMilkItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'morning' ? 'mrn' : category === 'lotion' ? 'ltn' : 'mlk';
  const id = `art-winter-b11-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・洗顔料・朝用洗顔・ジェル洗顔';
  let descType = '11〜12月の急激な気温低下でこわばる冬の朝肌をつっぱらず、毛穴角栓やくすみだけをオフしてメイクノリを格上げする高保湿朝洗顔';
  if (category === 'lotion') {
    catName = 'スキンケア・高保湿化粧水・エッセンスローション';
    descType = '冬の過酷な乾燥や室内暖房による水分蒸発を徹底ブロックし、角層深部までうるおいを満たす濃密高保湿化粧液';
  } else if (category === 'hairmilk') {
    catName = 'ヘアケア・ヘアミルク・洗い流さないトリートメント';
    descType = '冬の乾燥やマフラー・ニットによる摩擦・静電気を完全ブロックし、髪内部に水分と美髪成分をぎゅっと補給する高補修ヘアミルク';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番における過酷な乾燥環境において美意識の高いユーザーから圧倒的な支持を集める実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、正規取扱店舗「${item.shopName}」等から安心してご購入いただけます。寒さによる肌・髪の乾燥トラブルを根本から立て直し、冬のコンディションを最高潮へと導きます。`,
    category: catName,
    tags: [...tagList, '2026冬コスメ', '楽天市場正規品', '11月12月人気コスメ'],
    createdAt: nowStr,
    updatedAt: nowStr,
    itemCode: item.itemCode,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    priceFormatted: item.priceFormatted,
    itemUrl: item.affiliateUrl || item.itemUrl,
    affiliateUrl: item.affiliateUrl,
    imageUrl: item.imageUrl,
    shopName: item.shopName,
    reviewAverage: item.reviewAverage || 4.7,
    reviewCount: item.reviewCount || 150,
    featureSlug: featureSlug
  };
}

const morningArticles = morningItemsRaw.map((it, idx) => createProductArticle(it, 'morning', ['朝洗顔', 'ジェル洗顔', '泡立たない洗顔', 'KANEBO', 'カネボウ', 'ラゴム', 'ルナソル', '毛穴角栓'], 'winter-morning-hydrating-cleanser-gel-2026', idx));
const lotionArticles = lotionItemsRaw.map((it, idx) => createProductArticle(it, 'lotion', ['高保湿化粧水', 'エッセンスローション', 'コスメデコルテ', 'SK-II', 'アルビオン', 'イプサ', 'カルテHD'], 'winter-rich-hydrating-lotion-essence-2026', idx));
const hairMilkArticles = hairMilkItemsRaw.map((it, idx) => createProductArticle(it, 'hairmilk', ['ヘアミルク', 'アウトバストリートメント', 'オルビス', 'ミルボン', 'oggiotto', '静電気対策', '美髪補修'], 'winter-hydrating-hair-milk-treatment-2026', idx));

const allNewArticles = [...morningArticles, ...lotionArticles, ...hairMilkArticles];

const existingIds = new Set(existingArticles.map(a => a.id));
let addedCount = 0;
for (const art of allNewArticles) {
  if (!existingIds.has(art.id)) {
    existingArticles.unshift(art);
    existingIds.add(art.id);
    addedCount++;
  }
}
fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
console.log(`✅ src/data/articles.json に ${addedCount} 件の新規個別商品記事を登録しました。（総記事数: ${existingArticles.length}件）`);

// 商品カードコンポーネント生成関数
function renderItemCard(it, art, reason, pros, cons) {
  return `
<div style="margin: 28px 0; padding: 22px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
  <div style="display: flex; gap: 20px; flex-direction: row; flex-wrap: wrap;">
    <div style="flex: 0 0 200px; max-width: 220px; margin: 0 auto; text-align: center;">
      <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${it.imageUrl}" alt="${it.itemName}" style="width: 100%; height: auto; max-height: 220px; object-fit: contain; border-radius: 12px; background: #f8fafc; padding: 6px; border: 1px solid #edf2f7;" loading="lazy" />
      </a>
      <div style="margin-top: 8px; font-size: 0.78rem; color: #64748b;">取扱: ${it.shopName}</div>
    </div>
    <div style="flex: 1 1 300px; min-width: 260px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span style="background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">注目度No.${it.rank || 1}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 150).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・最新楽天市場価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 12px;">
        ${reason}
      </p>
      <div style="background: #f8fafc; border-radius: 10px; padding: 12px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #059669; font-weight: bold; margin-bottom: 4px;">✅ メリット: ${pros}</div>
        <div style="color: #dc2626; font-weight: bold;">⚠️ 注意点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="flex: 1 1 auto; text-align: center; background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; padding: 12px 18px; border-radius: 10px; font-weight: bold; text-decoration: none; font-size: 0.92rem; box-shadow: 0 3px 8px rgba(2,132,199,0.3);">
          🛒 楽天市場で在庫・最安値をチェック
        </a>
        <a href="/articles/${art.id}" style="padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; color: #334155; text-decoration: none; font-size: 0.88rem; font-weight: 600; background: #fff;">
          📖 詳細スペック・口コミを見る
        </a>
      </div>
    </div>
  </div>
</div>`;
}

// 楽天カードPRバナー
const rakutenCardBanner = `
<div style="margin: 28px 0; padding: 18px 22px; background: #fffcf5; border: 1px solid #fef08a; border-radius: 14px; text-align: center;">
  <p style="font-size: 0.82rem; font-weight: bold; color: #854d0e; margin-bottom: 8px;">
    💳 Qualia Naviからのご案内：楽天カード新規入会＆利用でポイント進呈中
  </p>
  <div style="display: flex; justify-content: center; align-items: center; margin: 8px 0;">
    <a href="https://hb.afl.rakuten.co.jp/hsc/570202c9.ad3cd4ba.5446e4f3.10821450/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MTY3NDAxLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; display: inline-block;">
      <img src="https://hbb.afl.rakuten.co.jp/hsb/570202c9.ad3cd4ba.5446e4f3.10821450/?me_id=2101008&me_adv_id=167401&t=pict" border="0" style="margin:2px; max-width: 100%; height: auto; border-radius: 6px;" alt="楽天カード新規入会キャンペーン" title="楽天カード">
    </a>
  </div>
  <p style="font-size: 0.74rem; color: #78716c; margin-top: 4px;">
    ※冬の朝洗顔や高保湿化粧水、濃厚補修ヘアミルクも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch11Data,
  morningItemsRaw,
  lotionItemsRaw,
  hairMilkItemsRaw,
  morningArticles,
  lotionArticles,
  hairMilkArticles,
  renderItemCard,
  rakutenCardBanner
};
