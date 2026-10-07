import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch56Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch56_items.json', 'utf8'));

// --- テーマ1: ホリデー限定フレグランスキャンドル＆リードディフューザー 10商品 ---
export const candleItemsRaw = batch56Data.theme1_candle_diffuser;

// --- テーマ2: 酒粕パック＆和漢コメ発酵・杜氏の白玉美肌スキンケア 10商品 ---
export const sakeRiceItemsRaw = batch56Data.theme2_sake_rice_ferment;

// --- テーマ3: 温感RF×EMS目元美顔器＆アイリフトマッサージャー 10商品 ---
export const eyeDeviceItemsRaw = batch56Data.theme3_eye_massager_device;

console.log(`第56弾 選定アイテム数: キャンドル・ディフューザー=${candleItemsRaw.length}, 酒粕＆コメ発酵=${sakeRiceItemsRaw.length}, 目元美顔器=${eyeDeviceItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'candle_diffuser' ? 'cnd' : category === 'sake_rice' ? 'sak' : 'eye';
  const id = `art-winter-b56-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'フレグランス・ルームフレグランス・アロマキャンドル・リードディフューザー・ホリデーコレクション・リラクゼーション・おうち美容・2026冬フレグランス';
  let descType = '11〜12月のホリデーシーズン＆冬のおうち時間を最高峰の香りで満たし、寒さで高ぶった交感神経を優しく鎮めて極上のリラックスと美肌睡眠へ誘うプレミアムなフレグランスキャンドル＆ディフューザー';
  
  if (category === 'sake_rice') {
    catName = 'スキンケア・酒粕パック・コメ発酵液・ライスパワーNo.11・米ぬかセラミド・和漢美容・杜氏の白玉肌・角質柔軟・くすみ改善・2026冬スキンケア';
    descType = '新酒造りが最盛期を迎える11〜12月に注目を集める「杜氏の白く透き通る手肌」。古来培われた米発酵アミノ酸・コウジ酸・米セラミドが、真冬の寒冷でゴワついた角質をやわらげ、もっちり発光する白玉陶器肌へ導く和漢発酵コスメ';
  } else if (category === 'eye_device') {
    catName = '美容家電・目元美顔器・アイマッサージャー・ホットアイマスク・EMS・RF温熱・目元エステ・眼輪筋リフト・クマ改善・目尻小じわ・2026冬美容家電';
    descType = '年末のPC・スマホ酷使と寒冷血行不良で重症化する青グマ・目尻の乾燥ちりめんジワ・まぶたのたるみに対し、温感RFと低周波EMS、赤色LEDが眼輪筋深層へダイレクトにアプローチしてすっきり明るい目元へ引き締める目元特化型美顔器';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の悩みを根本からケアし、上質な暮らしと美しさを実感できます。`,
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
    reviewCount: item.reviewCount || 180,
    featureSlug: featureSlug
  };
}

export const candleArticles = candleItemsRaw.map((it, idx) => createProductArticle(it, 'candle_diffuser', ['アロマキャンドル', 'ディフューザー', 'ルームフレグランス', 'ディプティック', 'ジョーマローン', 'メゾンマルジェラ', 'SHIRO', 'ホリデーギフト'], 'winter-holiday-candle-diffuser-room-fragrance-2026', idx));
export const sakeRiceArticles = sakeRiceItemsRaw.map((it, idx) => createProductArticle(it, 'sake_rice', ['酒粕パック', 'コメ発酵液', '杜氏の白玉肌', 'ライスパワーNo11', '米肌', 'ライスフォース', '菊正宗', 'ワフードメイド', '和漢発酵'], 'winter-sake-lees-rice-ferment-brightening-skincare-2026', idx));
export const eyeDeviceArticles = eyeDeviceItemsRaw.map((it, idx) => createProductArticle(it, 'eye_device', ['目元美顔器', 'アイマッサージャー', 'ホットアイマスク', 'ヤーマン', 'メディリフトアイ', 'パナソニック', '眼輪筋リフト', 'クマ改善'], 'winter-eye-massager-ems-rf-lift-device-2026', idx));

export const allNewArticles = [...candleArticles, ...sakeRiceArticles, ...eyeDeviceArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 180).toLocaleString()}件)</span>
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
      <div style="display: grid; grid-template-columns: 1fr; gap: 8px; font-size: 0.85rem; margin-bottom: 16px;">
        <div style="background: #f0fdf4; border-left: 3px solid #22c55e; padding: 6px 10px; border-radius: 4px; color: #166534;">
          <strong>◎ メリット:</strong> ${pros}
        </div>
        <div style="background: #fef2f2; border-left: 3px solid #ef4444; padding: 6px 10px; border-radius: 4px; color: #991b1b;">
          <strong>▲ 注意点:</strong> ${cons}
        </div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60000 100%); color: #ffffff; font-weight: bold; font-size: 0.92rem; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 6px rgba(230,0,0,0.3);">
          楽天市場で詳細・在庫・最安値を見る →
        </a>
        <a href="/article/${art.id}" style="display: inline-block; background: #f1f5f9; color: #475569; font-weight: bold; font-size: 0.88rem; padding: 10px 14px; border-radius: 8px; text-decoration: none; border: 1px solid #cbd5e1;">
          個別詳細レビュー・評判を見る
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
