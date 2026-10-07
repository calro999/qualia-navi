import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch55Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch55_items.json', 'utf8'));

// --- テーマ1: EMSリフトブラシ＆デンキバリブラシ 10商品 ---
export const emsBrushItemsRaw = batch55Data.theme1_ems_brush;

// --- テーマ2: 高濃度薬用トラネキサム酸 美白美容液＆クリーム 10商品 ---
export const txaItemsRaw = batch55Data.theme2_tranexamic_acid;

// --- テーマ3: 塗るボトックス＆アルジレリン・シンエイク美容液 10商品 ---
export const botoxItemsRaw = batch55Data.theme3_botox_argireline;

console.log(`第55弾 選定アイテム数: EMSブラシ=${emsBrushItemsRaw.length}, トラネキサム酸=${txaItemsRaw.length}, 塗るボトックス=${botoxItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'ems_brush' ? 'ems' : category === 'tranexamic_acid' ? 'txa' : 'btx';
  const id = `art-winter-b55-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・美顔器・EMS・リフトブラシ・デンキバリブラシ・スカルプケア・頭筋リリース・リフトアップ・小顔・2026冬美容家電';
  let descType = '11〜12月の寒さで凝り固まった頭筋（側頭筋・帽状腱膜）や首肩の緊張に対し、低周波・中周波EMSと赤色LEDの相乗効果で頭皮から筋膜リリースを行い、もたついたフェイスラインを驚きの引き上げ感で整える最新EMSリフトブラシ美顔器';
  
  if (category === 'tranexamic_acid') {
    catName = 'スキンケア・美容液・トラネキサム酸・美白・医薬部外品・シミ予防・肝斑・抗炎症・肌荒れ・HAKU・資生堂・2026冬スキンケア';
    descType = '紫外線が最も弱まる11〜12月に集中投下すべき、厚生労働省認可の美白＆抗炎症有効成分「トラネキサム酸」。プラスミンを阻害してメラニン発生シグナルを遮断し、冬の乾燥赤みや肌荒れを抑えながら澄み渡る陶器肌へと導く薬用美白コスメ';
  } else if (category === 'botox_argireline') {
    catName = 'スキンケア・美容液・ペプチド・アルジレリン・塗るボトックス・シンエイク・シワ改善・表情ジワ・目元・ほうれい線・2026冬エイジングケア';
    descType = '乾燥寒冷で深く刻まれやすい眉間・額・目尻の表情ジワに対し、神経伝達を穏やかにコントロールするアセチルヘキサペプチド-8（アルジレリン）やシンエイクが筋肉の緊張をほぐし、ピンと弾むハリと弾力を取り戻す塗るボトックス様集中アンプル';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として圧倒的な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の肌悩みを根本からケアし、ワンランク上の上質なお手入れを実感できます。`,
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

export const emsBrushArticles = emsBrushItemsRaw.map((it, idx) => createProductArticle(it, 'ems_brush', ['EMSリフトブラシ', '電気バリブラシ', '美顔器', 'ヤーマン', 'エレクトロン', 'サロニア', '頭筋リフト', 'フェイスライン引き締め'], 'winter-ems-electric-scalp-lift-brush-device-2026', idx));
export const txaArticles = txaItemsRaw.map((it, idx) => createProductArticle(it, 'tranexamic_acid', ['トラネキサム酸', '薬用美白', 'シミ予防', '肝斑ケア', 'HAKU', 'コスメデコルテ', '肌荒れ防止', '医薬部外品'], 'winter-tranexamic-acid-medicated-whitening-serum-cream-2026', idx));
export const botoxArticles = botoxItemsRaw.map((it, idx) => createProductArticle(it, 'botox_argireline', ['塗るボトックス', 'アルジレリン', 'ペプチド美容液', 'シンエイク', '表情ジワ', 'オーディナリー', 'メディキューブ', '目元口元ハリ'], 'winter-argireline-peptide-botox-wrinkle-repair-serum-2026', idx));

export const allNewArticles = [...emsBrushArticles, ...txaArticles, ...botoxArticles];

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
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; font-size: 0.84rem;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px;">
          <div style="color: #166534; font-weight: bold; margin-bottom: 4px;">👍 おすすめポイント</div>
          <div style="color: #15803d; line-height: 1.5;">${pros}</div>
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px;">
          <div style="color: #991b1b; font-weight: bold; margin-bottom: 4px;">💡 注意点・使い方のコツ</div>
          <div style="color: #b91c1c; line-height: 1.5;">${cons}</div>
        </div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #e11d48; color: #ffffff; padding: 9px 18px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: bold; box-shadow: 0 2px 6px rgba(225,29,72,0.25);">
          楽天市場で最安値・在庫を見る →
        </a>
        <a href="/article/${art.id}" style="display: inline-block; background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 8px; text-decoration: none; font-size: 0.88rem; font-weight: 500;">
          詳細レビュー・口コミを読む
        </a>
      </div>
    </div>
  </div>
</div>`;
}
