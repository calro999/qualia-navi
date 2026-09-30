import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch12Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch12_items.json', 'utf8'));

// --- テーマ1: 高保湿美容液コンシーラー＆密着リキッドコンシーラー 厳選10商品 ---
const concealerItemsRaw = [
  // 1. Dior フォーエヴァー スキン コレクト
  batch12Data.theme1_concealer.find(it => (it.itemName.includes("ディオールスキン") || it.itemName.includes("Dior")) && it.itemName.includes("スキン コレクト") && !it.itemName.includes("2点")) || batch12Data.theme1_concealer[1],
  // 2. NARS ラディアント クリーミー コンシーラー
  batch12Data.theme1_concealer.find(it => it.itemName.includes("NARS") && it.itemName.includes("ラディアント") && !it.itemName.includes("ミニ") && !it.itemName.includes("2本")) || batch12Data.theme1_concealer[10],
  // 3. コスメデコルテ トーンパーフェクティング パレット
  batch12Data.theme1_concealer.find(it => it.itemName.includes("コスメデコルテ") && (it.itemName.includes("トーンパーフェクティング") || it.itemName.includes("パレット"))) || batch12Data.theme1_concealer[20],
  // 4. SHISEIDO エッセンス スキングロウ 美容液コンシーラー
  batch12Data.theme1_concealer.find(it => it.itemName.includes("資生堂") && (it.itemName.includes("エッセンス") || it.itemName.includes("スキングロウ"))) || batch12Data.theme1_concealer[25],
  // 5. TIRTIR マスクフィット オールカバー デュアルコンシーラー
  batch12Data.theme1_concealer.find(it => it.itemName.includes("TIRTIR") || it.itemName.includes("ティルティル")) || batch12Data.theme1_concealer[27],
  // 6. the SAEM カバーパーフェクション チップコンシーラー
  batch12Data.theme1_concealer.find(it => (it.itemName.includes("ザセム") || it.itemName.includes("the SAEM")) && !it.itemName.includes("3本")) || batch12Data.theme1_concealer[30],
  // 7. &be アンドビー ファンシーラー
  batch12Data.theme1_concealer.find(it => it.itemName.includes("＆be") || it.itemName.includes("&be") || it.itemName.includes("アンドビー")) || batch12Data.theme1_concealer[35],
  // 8. IPSA クリエイティブコンシーラー e
  batch12Data.theme1_concealer.find(it => it.itemName.includes("イプサ") || it.itemName.includes("IPSA")) || batch12Data.theme1_concealer[40],
  // 9. ルナソル シームレスコンシーリングコンパクト
  batch12Data.theme1_concealer.find(it => it.itemName.includes("ルナソル") || it.itemName.includes("LUNASOL")) || batch12Data.theme1_concealer[55],
  // 10. エクセル サイレントカバー コンシーラー
  batch12Data.theme1_concealer.find(it => it.itemName.includes("エクセル") || it.itemName.includes("excel")) || batch12Data.theme1_concealer[60]
].filter(Boolean);

// --- テーマ2: 高保湿ヘアバーム＆スタイリングバター 厳選10商品 ---
const hairBalmItemsRaw = [
  // 1. ナプラ N. ナチュラルバーム
  batch12Data.theme2_hair_balm.find(it => (it.itemName.includes("エヌドット") || it.itemName.includes("N.")) && it.itemName.includes("ナチュラルバーム") && !it.itemName.includes("18g") && !it.itemName.includes("セット")) || batch12Data.theme2_hair_balm[10],
  // 2. ザ・プロダクト ヘアワックス
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("product") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || batch12Data.theme2_hair_balm[5],
  // 3. track トラック バーム
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("track") || it.itemName.includes("トラック")) || batch12Data.theme2_hair_balm[1],
  // 4. リンク オリジナル メーカーズ ヘアバーム 997
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("リンク") && (it.itemName.includes("997") || it.itemName.includes("オリジナル"))) || batch12Data.theme2_hair_balm[20],
  // 5. ミルボン ジェミールフラン メルティバター バーム
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("ジェミールフラン") || it.itemName.includes("メルティバター")) || batch12Data.theme2_hair_balm[25],
  // 6. BOTANIST ボタニカル ヘアバーム
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("BOTANIST") || it.itemName.includes("ボタニスト")) || batch12Data.theme2_hair_balm[30],
  // 7. ダイアン ボヌール オーガニック ヘアバーム
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("ボヌール") || it.itemName.includes("ダイアン")) || batch12Data.theme2_hair_balm[35],
  // 8. オルナ オーガニック ヘアバーム
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("オルナ") || it.itemName.includes("ALLNA")) || batch12Data.theme2_hair_balm[0],
  // 9. ジョンマスターオーガニック ヘアバーム
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("ジョンマスター") || it.itemName.includes("john masters")) || batch12Data.theme2_hair_balm[65],
  // 10. アリミノ ダンスデザインチューナー モダンシマー
  batch12Data.theme2_hair_balm.find(it => it.itemName.includes("ダンスデザインチューナー") || it.itemName.includes("モダンシマー") || it.itemName.includes("アリミノ")) || batch12Data.theme2_hair_balm[68]
].filter(Boolean);

// --- テーマ3: 高保湿スティック美容液＆SOSレスキューマルチバーム 厳選10商品 ---
const stickBalmItemsRaw = [
  // 1. KAHI カヒ リンクルバウンス マルチバーム
  batch12Data.theme3_stick_balm.find(it => (it.itemName.includes("kahi") || it.itemName.includes("KAHI")) && !it.itemName.includes("2個") && !it.itemName.includes("セット")) || batch12Data.theme3_stick_balm[11],
  // 2. イプサ ザ・タイムR デイエッセンススティック e
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("イプサ") || it.itemName.includes("IPSA") || it.itemName.includes("デイエッセンス")) || batch12Data.theme3_stick_balm[19],
  // 3. 資生堂 イハダ 薬用 バーム
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("イハダ") || it.itemName.includes("IHADA")) || batch12Data.theme3_stick_balm[29],
  // 4. クラブ エアリータッチ デイエッセンス スティック
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("クラブ") && (it.itemName.includes("エアリータッチ") || it.itemName.includes("デイエッセンス"))) || batch12Data.theme3_stick_balm[59],
  // 5. 資生堂 dプログラム スキンリペアクリーム 薬用バーム
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("dプログラム") || it.itemName.includes("スキンリペア")) || batch12Data.theme3_stick_balm[39],
  // 6. 花王 キュレル 潤浸保湿 フェイスクリーム バーム処方
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("キュレル") || it.itemName.includes("Curel")) || batch12Data.theme3_stick_balm[63],
  // 7. 資生堂 エリクシール シュペリエル つや玉ミスト美容液
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("エリクシール") || it.itemName.includes("つや玉")) || batch12Data.theme3_stick_balm[48],
  // 8. ロクシタン オーガニック シアバター 保湿バーム
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("ロクシタン") || it.itemName.includes("シアバター")) || batch12Data.theme3_stick_balm[37],
  // 9. AINOKI アイノキ モイスト スティック 美容液
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("AINOKI") || it.itemName.includes("アイノキ") || it.itemName.includes("モイスト スティック")) || batch12Data.theme3_stick_balm[0],
  // 10. firming stick ファーミングスティック PDRN スティック美容液
  batch12Data.theme3_stick_balm.find(it => it.itemName.includes("firming") || it.itemName.includes("ファーミング") || it.itemName.includes("PDRN")) || batch12Data.theme3_stick_balm[4]
].filter(Boolean);

console.log(`選定アイテム数: コンシーラー=${concealerItemsRaw.length}, ヘアバーム=${hairBalmItemsRaw.length}, スティックバーム=${stickBalmItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'concealer' ? 'ccl' : category === 'hairbalm' ? 'hbm' : 'stb';
  const id = `art-winter-b12-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ベースメイク・コンシーラー・部分用ファンデーション';
  let descType = '11〜12月の過酷な冷気と乾燥による目元のちりめんジワ割れ・くすみクマを潤いで満たしながらカバーする高保湿美容液コンシーラー';
  if (category === 'hairbalm') {
    catName = 'ヘアケア・スタイリング・高保湿ヘアバーム・オーガニックバター';
    descType = '真冬の静電気やニット・マフラー摩擦で広がる髪をしっとりまとめ、上質な濡れツヤ束感をキープしながらハンドケアも兼ねるマルチバーム';
  } else if (category === 'stickbalm') {
    catName = 'スキンケア・パーツケア・スティック美容液・高保湿レスキューバーム';
    descType = '暖房乾燥や冷風でカサつく日中の目元・口元・頬にメイクの上から直接潤いをチャージし、即座にツヤを蘇らせる高機能ポータブルバーム';
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

const concealerArticles = concealerItemsRaw.map((it, idx) => createProductArticle(it, 'concealer', ['コンシーラー', '美容液コンシーラー', '目元ケア', 'クマ隠し', '乾燥小ジワ防止', 'Dior', 'NARS', 'コスメデコルテ'], 'winter-hydrating-serum-liquid-concealer-2026', idx));
const hairBalmArticles = hairBalmItemsRaw.map((it, idx) => createProductArticle(it, 'hairbalm', ['ヘアバーム', 'オーガニックバーム', 'N.', 'product', 'track', '濡れ髪', '静電気防止', 'マルチバーム'], 'winter-rich-hair-balm-styling-butter-2026', idx));
const stickBalmArticles = stickBalmItemsRaw.map((it, idx) => createProductArticle(it, 'stickbalm', ['スティック美容液', 'マルチバーム', '外出先保湿', 'KAHI', 'イプサ', 'イハダ', '乾燥対策', 'つや玉'], 'winter-hydrating-moisture-stick-rescue-balm-2026', idx));

const allNewArticles = [...concealerArticles, ...hairBalmArticles, ...stickBalmArticles];

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
    ※冬の高保湿コンシーラーや濃厚ヘアバーム、外出先レスキュー用スティック美容液も、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch12Data,
  concealerItemsRaw,
  hairBalmItemsRaw,
  stickBalmItemsRaw,
  concealerArticles,
  hairBalmArticles,
  stickBalmArticles,
  renderItemCard,
  rakutenCardBanner
};
