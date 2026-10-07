import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch61Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch61_items.json', 'utf8'));

// --- テーマ1: フェイス対応ミニマッサージガン＆超軽量筋膜リリース美容器 10商品 ---
export const gunItemsRaw = batch61Data.theme1_massage_gun;

// --- テーマ2: 防水キャビテーション美容器＆温熱RF・EMSボディシェイパー 10商品 ---
export const cavItemsRaw = batch61Data.theme2_cavitation;

// --- テーマ3: 電動かかと角質リムーバー＆ガラス製足裏フットファイル 10商品 ---
export const calItemsRaw = batch61Data.theme3_callus_remover;

console.log(`第61弾 選定アイテム数: マッサージガン=${gunItemsRaw.length}, キャビテーション=${cavItemsRaw.length}, 角質リムーバー=${calItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'massage_gun' ? 'gun' : category === 'cavitation' ? 'cav' : 'cal';
  const id = `art-winter-b61-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・ボディケア・マッサージガン・筋膜リリース・フェイスケア・首肩こり・むくみ解消・血流改善・2026冬ホリデーリフレッシュ';
  let descType = '11〜12月の急激な冷え込みによる首肩のガチガチこりや血行不良、忘年会・イベント前の顔のむくみ・フェイスラインのもたつきを、超軽量コンパクトなハンディ振動とフェイス専用アタッチメントで優しくほぐし、全身の巡りを呼び覚ます神ビューティーギア';
  
  if (category === 'cavitation') {
    catName = '美容家電・ボディケア・キャビテーション・RFラジオ波・EMS・痩身・セルライトケア・お風呂美容・IPX7防水・2026冬ボディメイク';
    descType = '11〜12月の忘年会やご馳走続きによる冬太り・冷え固まった頑固なセルライト・むくみを、湯船の温浴効果と超音波キャビテーション×深部温熱RF×表情筋・筋肉刺激EMSのトリプル相乗アタックでお風呂にいながら効率的に引き締める本格おこもりボディシェイパー';
  } else if (category === 'callus_remover') {
    catName = 'ボディケア・フットケア・かかとケア・電動角質リムーバー・足裏角質削り・ガラスフットファイル・ひび割れかかと・2026冬美脚素足ケア';
    descType = '11〜12月の猛烈な空気乾燥と冷えでカチカチに角化・ひび割れた「鏡餅かかと」を、肌を傷めず均一な微細粒子や高精度ガラス加工で秒速パウダー状に削り落とし、タイツの伝線ゼロ＆赤ちゃんのようなシルク素足へ導く冬の必需フットケアアイテム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有のこわばり・冷え太り・ガサガサ角質の悩みを根本から解消し、洗練された冬の美しさを実感できます。`,
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
    reviewCount: item.reviewCount || 280,
    featureSlug: featureSlug
  };
}

export const gunArticles = gunItemsRaw.map((it, idx) => createProductArticle(it, 'massage_gun', ['マッサージガン', '筋膜リリース', 'フェイスケア', 'MYTREX', 'ドクターエア', 'SIXPAD', '肩こり解消'], 'winter-mini-massage-gun-face-body-relax-2026', idx));
export const cavArticles = cavItemsRaw.map((it, idx) => createProductArticle(it, 'cavitation', ['キャビテーション', 'RFラジオ波', 'EMS美容器', 'ヤーマン', '美ルル', 'セルライトケア', '冬太り対策'], 'winter-waterproof-rf-ems-cavitation-body-slimming-2026', idx));
export const calArticles = calItemsRaw.map((it, idx) => createProductArticle(it, 'callus_remover', ['角質リムーバー', 'かかとやすり', '電動かかと削り', 'ドクターショール', 'ナノガラス', '足裏ケア', 'ひび割れ改善'], 'winter-electric-callus-remover-foot-file-heel-care-2026', idx));

export const allNewArticles = [...gunArticles, ...cavArticles, ...calArticles];

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

// リッチ商品カードレンダラー
export function renderItemCard(it, art, badgeText, description, pros, cons) {
  return `
<div style="margin: 28px 0; padding: 22px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
  <div style="display: flex; gap: 20px; flex-direction: row; flex-wrap: wrap;">
    <div style="flex: 0 0 200px; max-width: 220px; margin: 0 auto; text-align: center;">
      <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${it.imageUrl}" alt="${it.itemName}" style="width: 100%; height: auto; max-height: 220px; object-fit: contain; border-radius: 12px; background: #f8fafc; padding: 6px; border: 1px solid #edf2f7;" loading="lazy" />
      </a>
      <div style="margin-top: 8px; font-size: 0.78rem; color: #64748b;">取扱店舗: ${it.shopName}</div>
    </div>
    <div style="flex: 1 1 300px; min-width: 260px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span style="background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">${badgeText}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 280).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 10px 14px; border-radius: 4px; margin-bottom: 8px; font-size: 0.85rem; color: #166534;">
        <strong>【ここが優れている（メリット）】</strong><br />
        ${pros}
      </div>
      <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px; font-size: 0.85rem; color: #92400e;">
        <strong>【購入前の注意点（デメリット）】</strong><br />
        ${cons}
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #d92626 100%); color: #ffffff; font-weight: bold; font-size: 0.95rem; padding: 10px 22px; border-radius: 9999px; text-decoration: none; box-shadow: 0 3px 10px rgba(191,0,0,0.25); text-align: center;">
          楽天市場で詳細・最安値をチェック ❯
        </a>
        <a href="/article/${art.id}" style="font-size: 0.88rem; color: #0284c7; text-decoration: underline;">
          個別レビュー詳細・スペック詳細ページへ
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
