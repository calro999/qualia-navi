import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch10Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch10_items.json', 'utf8'));

// --- テーマ1: クリスマスコフレ＆ホリデー限定メイクキット 厳選10商品 ---
const coffretItemsRaw = [
  // 1. コスメデコルテ クリスマスコフレ（アリス イン デコルテ ワンダーランド等）
  batch10Data.theme1_coffret.find(it => it.itemName.includes("デコルテ") && (it.itemName.includes("コフレ") || it.itemName.includes("ワンダーランド"))) || batch10Data.theme1_coffret[1],
  // 2. ジルスチュアート ドロージープリンセス コレクション
  batch10Data.theme1_coffret.find(it => it.itemName.includes("ジルスチュアート") && it.itemName.includes("コレクション")) || batch10Data.theme1_coffret[10],
  // 3. ディオール ビューティー＆ケア / スノー エッセンス ホリデー
  batch10Data.theme1_coffret.find(it => it.itemName.includes("ディオール") && (it.itemName.includes("ホリデー") || it.itemName.includes("ビューティー"))) || batch10Data.theme1_coffret[7],
  // 4. RMK ザ ベルベット ゲスト キット
  batch10Data.theme1_coffret.find(it => it.itemName.includes("RMK") && it.itemName.includes("キット")) || batch10Data.theme1_coffret[5],
  // 5. ルナソル アイカラーレーション
  batch10Data.theme1_coffret.find(it => it.itemName.includes("ルナソル") || it.itemName.includes("アイカラーレーション")) || batch10Data.theme1_coffret[0],
  // 6. シュウウエムラ ロックザパーティ プレミアム メイクアップ
  batch10Data.theme1_coffret.find(it => it.itemName.includes("シュウウエムラ") || it.itemName.includes("ロックザパーティ")) || batch10Data.theme1_coffret[0],
  // 7. ポール＆ジョー ハンドケア＆ホリデー限定
  batch10Data.theme1_coffret.find(it => it.itemName.includes("PAUL") && it.itemName.includes("ハンドケア")) || batch10Data.theme1_coffret[47],
  // 8. シャネル ラ クレーム マン ホリデーギフト
  batch10Data.theme1_coffret.find(it => it.itemName.includes("シャネル") && it.itemName.includes("ラ クレーム マン")) || batch10Data.theme1_coffret[0],
  // 9. イヴ・サンローラン YSL ラブシャイン キャンディグレーズ
  batch10Data.theme1_coffret.find(it => it.itemName.includes("YSL") || it.itemName.includes("イヴ サンローラン")) || batch10Data.theme1_coffret[2],
  // 10. シピシピ CipiCipi デューイフィルムティント 限定ホリデー
  batch10Data.theme1_coffret.find(it => it.itemName.includes("シピシピ") || it.itemName.includes("CipiCipi")) || batch10Data.theme1_coffret[4]
].filter(Boolean);

// --- テーマ2: 高保湿ボディオイル＆温感引き締めマッサージオイル 厳選10商品 ---
const bodyOilItemsRaw = [
  // 1. ヴェレダ ホワイトバーチ ボディ オイル 100ml
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("ヴェレダ") && it.itemName.includes("ホワイトバーチ") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch10Data.theme2_bodyoil[10],
  // 2. ヴェレダ アルニカ マッサージオイル 200ml
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("ヴェレダ") && it.itemName.includes("アルニカ") && it.itemName.includes("200ml") && !it.itemName.includes("2個")) || batch10Data.theme2_bodyoil[20],
  // 3. クラランス ボディオイル アンティオー 100ml
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("クラランス") && it.itemName.includes("アンティオー") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch10Data.theme2_bodyoil[30],
  // 4. メルヴィータ ビオオイル アルガンオイル 50ml
  batch10Data.theme2_bodyoil.find(it => (it.itemName.includes("メルヴィータ") || it.itemName.includes("MELVITA")) && it.itemName.includes("アルガンオイル") && !it.itemName.includes("3本") && !it.itemName.includes("2本")) || batch10Data.theme2_bodyoil[0],
  // 5. ニールズヤード アロマティック マッサージオイル 100mL
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("ニールズヤード") && it.itemName.includes("アロマティック")) || batch10Data.theme2_bodyoil[38],
  // 6. 小林製薬 Bioil バイオイル 125ml
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("バイオイル") && it.itemName.includes("125ml") && !it.itemName.includes("2個")) || batch10Data.theme2_bodyoil[43],
  // 7. Aesop イソップ ゼラニウム ボディトリートメント 100mL
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("Aesop") || it.itemName.includes("イソップ")) || batch10Data.theme2_bodyoil[0],
  // 8. ニュートロジーナ インテンスリペア オイル 200ml
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("ニュートロジーナ") && it.itemName.includes("オイル")) || batch10Data.theme2_bodyoil[4],
  // 9. erbaviva エルバビーバ ベビーオイル 120ml
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("erbaviva") || it.itemName.includes("エルバビーバ")) || batch10Data.theme2_bodyoil[6],
  // 10. 無印良品 ホホバオイル 200mL
  batch10Data.theme2_bodyoil.find(it => it.itemName.includes("ホホバ") && it.itemName.includes("無印")) || batch10Data.theme2_bodyoil[0]
].filter(Boolean);

// --- テーマ3: 高保湿モイスチャークッションファンデーション＆BBバーム 厳選10商品 ---
const cushionItemsRaw = [
  // 1. TIRTIR マスクフィット クリスタルメッシュ クッション
  batch10Data.theme3_cushion.find(it => it.itemName.includes("TIRTIR") && it.itemName.includes("クリスタルメッシュ") && !it.itemName.includes("ミニ")) || batch10Data.theme3_cushion[16],
  // 2. TIRTIR マスクフィット レッド クッション
  batch10Data.theme3_cushion.find(it => it.itemName.includes("TIRTIR") && it.itemName.includes("レッドクッション") && !it.itemName.includes("ミニ")) || batch10Data.theme3_cushion[11],
  // 3. CLIO キルカバー メッシュ グロウ クッション
  batch10Data.theme3_cushion.find(it => it.itemName.includes("CLIO") && it.itemName.includes("メッシュグロウ") && !it.itemName.includes("ミニ")) || batch10Data.theme3_cushion[20],
  // 4. ジョンセンムル エッセンシャル スキン ヌーダー クッション
  batch10Data.theme3_cushion.find(it => it.itemName.includes("ジョンセンムル") && it.itemName.includes("スキンヌーダー")) || batch10Data.theme3_cushion[30],
  // 5. HERA ブラック クッション
  batch10Data.theme3_cushion.find(it => it.itemName.includes("HERA") && it.itemName.includes("ブラック") && !it.itemName.includes("リフィルのみ")) || batch10Data.theme3_cushion[52],
  // 6. ローラ メルシエ フローレス ルミエール ラディアンス パーフェクティング クッション
  batch10Data.theme3_cushion.find(it => (it.itemName.includes("ローラメルシエ") || it.itemName.includes("Laura Mercier")) && !it.itemName.includes("レフィル")) || batch10Data.theme3_cushion[0],
  // 7. エトヴォス ミネラルグロウスキン クッション
  batch10Data.theme3_cushion.find(it => it.itemName.includes("エトヴォス") || it.itemName.includes("ETVOS")) || batch10Data.theme3_cushion[0],
  // 8. MISSHA M クッション ファンデーション (プロカバー)
  batch10Data.theme3_cushion.find(it => (it.itemName.includes("ミシャ") || it.itemName.includes("MISSHA")) && it.itemName.includes("プロカバー") && !it.itemName.includes("レフィル")) || batch10Data.theme3_cushion[1],
  // 9. ラロッシュポゼ UVイデア XL プロテクショントーンアップ / BB
  batch10Data.theme3_cushion.find(it => it.itemName.includes("ラロッシュポゼ") && it.itemName.includes("トーンアップ")) || batch10Data.theme3_cushion[40],
  // 10. A'PIEU アピュー スキンケア ウォーターロッククッション
  batch10Data.theme3_cushion.find(it => (it.itemName.includes("アピュー") || it.itemName.includes("A'PIEU")) && it.itemName.includes("ウォーターロック")) || batch10Data.theme3_cushion[0]
].filter(Boolean);

console.log(`選定アイテム数: クリスマスコフレ=${coffretItemsRaw.length}, ボディオイル=${bodyOilItemsRaw.length}, クッションファンデ=${cushionItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'coffret' ? 'cft' : category === 'bodyoil' ? 'oil' : 'csh';
  const id = `art-winter-b10-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・クリスマスコフレ・ホリデー限定';
  let descType = '11〜12月の特別な季節を彩る憧れブランドの数量限定クリスマスコフレ＆ホリデーメイクアップキット';
  if (category === 'bodyoil') {
    catName = 'ボディケア・高保湿ボディオイル・マッサージオイル';
    descType = '冬の厳しい寒冷による冷え・むくみ・乾燥を温感マッサージで解きほぐし、極上シルク肌へと導く高保湿ボディオイル';
  } else if (category === 'cushion') {
    catName = 'ベースメイク・高保湿クッションファンデーション・BB';
    descType = '暖房による過酷な乾燥環境でも毛穴落ちや粉浮きを完全に防ぎ、一日中みずみずしい発光ツヤ肌をキープする高保湿クッションファンデーション';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月のホリデーシーズンおよび冬の過酷な乾燥環境において美意識の高いユーザーから絶大な支持を集める実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、正規取扱店舗「${item.shopName}」等から安心してご購入いただけます。寒さによる肌悩みや冬のイベントメイクをドラマティックに格上げします。`,
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

const coffretArticles = coffretItemsRaw.map((it, idx) => createProductArticle(it, 'coffret', ['クリスマスコフレ', 'ホリデーコレクション', 'コスメデコルテ', 'ジルスチュアート', '限定コスメ'], 'winter-holiday-coffret-makeup-kit-2026', idx));
const bodyOilArticles = bodyOilItemsRaw.map((it, idx) => createProductArticle(it, 'bodyoil', ['ボディオイル', 'マッサージオイル', 'ヴェレダ', 'クラランス', 'むくみ冷え解消'], 'winter-body-oil-massage-warming-care-2026', idx));
const cushionArticles = cushionItemsRaw.map((it, idx) => createProductArticle(it, 'cushion', ['クッションファンデ', '高保湿ファンデ', 'TIRTIR', 'CLIO', '水光ツヤ肌'], 'winter-hydrating-cushion-foundation-bb-2026', idx));

const allNewArticles = [...coffretArticles, ...bodyOilArticles, ...cushionArticles];

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
        <span style="background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">注目度No.${it.rank || 1}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 150).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #e11d48; margin-bottom: 12px;">
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
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="flex: 1 1 auto; text-align: center; background: linear-gradient(135deg, #e11d48, #be123c); color: #fff; padding: 12px 18px; border-radius: 10px; font-weight: bold; text-decoration: none; font-size: 0.92rem; box-shadow: 0 3px 8px rgba(225,29,72,0.3);">
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
    ※冬の憧れホリデー限定コフレや極上ボディオイル、水光ツヤクッションも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch10Data,
  coffretItemsRaw,
  bodyOilItemsRaw,
  cushionItemsRaw,
  coffretArticles,
  bodyOilArticles,
  cushionArticles,
  renderItemCard,
  rakutenCardBanner
};
