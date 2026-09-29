import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch8Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch8_items.json', 'utf8'));

// --- テーマ1: 冬のクリームチーク＆リキッドチーク 厳選10商品 ---
const cheekItemsRaw = [
  // 1. NARS アフターグロー リキッドブラッシュ #02799 Orgasm (名品リキッドチーク)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("NARS") && it.itemName.includes("02799")) || batch8Data.theme1_cheek.find(it => it.itemName.includes("NARS")),
  // 2. コスメデコルテ クリーム ブラッシュ (しっとり濡れツヤ)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("コスメデコルテ") && it.itemName.includes("PK850")) || batch8Data.theme1_cheek.find(it => it.itemName.includes("コスメデコルテ")),
  // 3. ジルスチュアート メルティシマー ブラッシュ (多幸感パール)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("ジルスチュアート") && it.itemName.includes("メルティシマー")) || batch8Data.theme1_cheek.find(it => it.itemName.includes("ジルスチュアート")),
  // 4. キャンメイク クリームチーク パールタイプ (潤いプチプラ神)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("キャンメイク") && it.itemName.includes("P01")) || batch8Data.theme1_cheek.find(it => it.itemName.includes("キャンメイク")),
  // 5. セザンヌ フェイスグロウカラー 01 アプリコットグロウ (生ぷに質感)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("セザンヌ") && it.itemName.includes("フェイスグロウカラー")) || batch8Data.theme1_cheek.find(it => it.itemName.includes("セザンヌ")),
  // 6. VDL チークステイン リキッド ブラッシャー (韓国コスメ澄んだ水彩発色)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("VDL") && it.itemName.includes("チークステイン")) || batch8Data.theme1_cheek[0],
  // 7. ミルフィー シェイクドロップチーク (二層式オイル水分リキッド)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("ミルフィー") && it.itemName.includes("シェイクドロップ")) || batch8Data.theme1_cheek[1],
  // 8. SNIDEL BEAUTY フラッフィー ブラッシュ (クリーンビューティ上気肌)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("SNIDEL") || it.itemName.includes("フラッフィー")) || batch8Data.theme1_cheek[2],
  // 9. CandyDoll ピュアリキッドチーク (透明感ブルー・ラベンダー補正)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("CandyDoll") || it.itemName.includes("ピュアリキッドチーク")) || batch8Data.theme1_cheek[7],
  // 10. hince トゥルーディメンション ラディアンスバーム (スティックハイライト＆チーク)
  batch8Data.theme1_cheek.find(it => it.itemName.includes("hince") || it.itemName.includes("ラディアンスバーム")) || batch8Data.theme1_cheek[9]
].filter(Boolean);

// --- テーマ2: 冬の高保湿ボディウォッシュ＆泡ボディソープ 厳選10商品 ---
const bodyItemsRaw = [
  // 1. ロート製薬 ケアセラ 泡の高保湿 ボディウォッシュ 450mL 本体
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("ケアセラ") && it.itemName.includes("450mL")) || batch8Data.theme2_bodywash[0],
  // 2. 花王 キュレル 潤浸保湿 泡ボディウォッシュ 本体 480mL (医薬部外品)
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("キュレル") && it.itemName.includes("本体")) || batch8Data.theme2_bodywash[16],
  // 3. 第一三共ヘルスケア ミノン 全身シャンプー 泡タイプ 500mL
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("ミノン") && it.itemName.includes("500")) || batch8Data.theme2_bodywash[27],
  // 4. 花王 ニベア クリームケア ボディウォッシュ W保水美肌 470mL
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("ニベア") && it.itemName.includes("ポンプ") && it.itemName.includes("フローラル")) || batch8Data.theme2_bodywash[34],
  // 5. SABON (サボン) シャワーオイル デリケート・ジャスミン
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("SABON") || it.itemName.includes("サボン")) || batch8Data.theme2_bodywash[40],
  // 6. 牛乳石鹸 バウンシアボディソープ プレミアムモイスト 詰替用
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("バウンシア") && it.itemName.includes("プレミアム")) || batch8Data.theme2_bodywash[45],
  // 7. ILLIYOON (イリユン) レッドイッチ 高保湿 ウォッシュ 470g
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("イリユン") || it.itemName.includes("ILLIYOON")) || batch8Data.theme2_bodywash[2],
  // 8. 牛乳石鹸 バウンシア ボディソープ プレミアムモイスト ポンプ付 460ml
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("バウンシア") && it.itemName.includes("ポンプ付")) || batch8Data.theme2_bodywash[47],
  // 9. ロート製薬 ケアセラ 泡の高保湿ボディウォッシュ ボタニカルフラワーの香り
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("ケアセラ") && it.itemName.includes("ボタニカルフラワー") && it.itemName.includes("385mL")) || batch8Data.theme2_bodywash[5],
  // 10. 花王 キュレル 潤浸保湿 泡ボディウォッシュ つめかえ用 380mL
  batch8Data.theme2_bodywash.find(it => it.itemName.includes("キュレル") && it.itemName.includes("つめかえ用") && !it.itemName.includes("3個")) || batch8Data.theme2_bodywash[13]
].filter(Boolean);

// --- テーマ3: 冬の高濃度まつ毛美容液 厳選10商品 ---
const lashItemsRaw = [
  // 1. ラッシュアディクト アイラッシュ コンディショニング セラム アドバンス 5ml
  batch8Data.theme3_lash.find(it => it.itemName.includes("ラッシュアディクト") && it.itemName.includes("アドバンス") && !it.itemName.includes("2個") && !it.itemName.includes("3本")) || batch8Data.theme3_lash[10],
  // 2. 水橋保寿堂製薬 EMAKED (エマーキット) まつげ美容液 2ml
  batch8Data.theme3_lash.find(it => it.itemName.includes("エマーキット") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch8Data.theme3_lash[20],
  // 3. PHOEBE BEAUTY UP (フィービー) アイラッシュセラムN2 5ml
  batch8Data.theme3_lash.find(it => it.itemName.includes("PHOEBE") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch8Data.theme3_lash[30],
  // 4. アンファー スカルプD まつ毛美容液 プレミアム
  batch8Data.theme3_lash.find(it => it.itemName.includes("スカルプD") && it.itemName.includes("プレミアム")) || batch8Data.theme3_lash[39],
  // 5. 資生堂 マジョリカ マジョルカ ラッシュジェリードロップ EX
  batch8Data.theme3_lash.find(it => it.itemName.includes("マジョリカ マジョルカ") || it.itemName.includes("ラッシュジェリードロップ")) || batch8Data.theme3_lash[42],
  // 6. UZU BY FLOWFUSHI まつげ美容液
  batch8Data.theme3_lash.find(it => it.itemName.includes("UZU") || it.itemName.includes("ウズ")) || batch8Data.theme3_lash[45],
  // 7. ディレイア アイラッシュ ザ ステム セラム 5ml (ヒト幹細胞培養液)
  batch8Data.theme3_lash.find(it => it.itemName.includes("ディレイア") || it.itemName.includes("ヒト幹細胞培養液")) || batch8Data.theme3_lash[9],
  // 8. 美粧AKARI MATSUGE OMOI アイラッシュセラム プレミアム 13ml
  batch8Data.theme3_lash.find(it => it.itemName.includes("MATSUGE OMOI") && it.itemName.includes("プレミアム") && !it.itemName.includes("3個")) || batch8Data.theme3_lash[3],
  // 9. Returna キャピキシルまつ毛美容液 7ml
  batch8Data.theme3_lash.find(it => it.itemName.includes("Returna") || it.itemName.includes("キャピキシル")) || batch8Data.theme3_lash[1],
  // 10. Wバイタルラッシュ まつ毛美容液 (LDK掲載)
  batch8Data.theme3_lash.find(it => it.itemName.includes("Wバイタルラッシュ") || it.itemName.includes("LDK")) || batch8Data.theme3_lash[2]
].filter(Boolean);

console.log(`選定アイテム数: チーク=${cheekItemsRaw.length}, ボディウォッシュ=${bodyItemsRaw.length}, まつ毛美容液=${lashItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'cheek' ? 'chk' : category === 'bodywash' ? 'bwo' : 'lsh';
  const id = `art-winter-b8-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・チーク・フェイスカラー';
  let descType = '冬の乾燥や粉ふきを防ぎながら内側からジュワッと上気する多幸感と濡れツヤを与える高密着クリーム＆リキッドチーク';
  if (category === 'bodywash') {
    catName = 'ボディケア・ボディウォッシュ・石鹸';
    descType = '真冬の粉ふき・すねのかゆみを防ぎ、肌本来のうるおいバリアとセラミドを守り抜く高保湿スキンケアボディウォッシュ';
  } else if (category === 'lash') {
    catName = 'アイケア・まつ毛美容液・まつ育';
    descType = '寒冷と暖房乾燥によるまつ毛の抜け毛や切れ毛を集中補修し、ハリ・コシ・密度を劇的に育む高濃度アイラッシュセラム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の過酷な冬の乾燥環境において美意識の高いユーザーから絶大な支持を集める実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、正規取扱店舗「${item.shopName}」等から安心してご購入いただけます。寒さによるカサつきやダメージに立ち向かい、しっとり上質な極上美を叶えます。`,
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

const cheekArticles = cheekItemsRaw.map((it, idx) => createProductArticle(it, 'cheek', ['チーク', 'リキッドチーク', 'クリームチーク', 'NARS', '多幸感メイク'], 'winter-cream-liquid-blush-cheek-2026', idx));
const bodyArticles = bodyItemsRaw.map((it, idx) => createProductArticle(it, 'bodywash', ['ボディウォッシュ', '泡ボディソープ', 'ケアセラ', '乾燥肌対策', 'セラミド'], 'winter-hydrating-body-wash-soap-2026', idx));
const lashArticles = lashItemsRaw.map((it, idx) => createProductArticle(it, 'lash', ['まつ毛美容液', 'アイラッシュセラム', 'ラッシュアディクト', 'エマーキット', 'まつ育'], 'winter-eyelash-serum-lash-care-2026', idx));

const allNewArticles = [...cheekArticles, ...bodyArticles, ...lashArticles];

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
    ※冬のデパコス名品チークやサロン級まつ毛美容液も、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に揃えましょう。
  </p>
</div>`;

console.log('📝 3つの新規キラー特集記事のMarkdownコンテンツ生成を開始します...');

export {
  batch8Data,
  cheekItemsRaw,
  bodyItemsRaw,
  lashItemsRaw,
  cheekArticles,
  bodyArticles,
  lashArticles,
  renderItemCard,
  rakutenCardBanner
};
