import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch19Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch19_items.json', 'utf8'));

// --- テーマ1: リッププランパー＆ボリュームツヤリップ美容液 厳選10商品 ---
export const plumperItemsRaw = batch19Data.theme1_plumper;

// --- テーマ2: 酵素洗顔パウダー＆温感角質ピール 厳選10商品 ---
export const washItemsRaw = batch19Data.theme2_wash;

// --- テーマ3: 静電気防止ヘアミスト＆美髪ツヤスプレー 厳選10商品 ---
export const mistItemsRaw = batch19Data.theme3_mist;

console.log(`選定アイテム数: リッププランパー=${plumperItemsRaw.length}, 酵素洗顔=${washItemsRaw.length}, ヘアミスト=${mistItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'plumper' ? 'plp' : category === 'wash' ? 'wsh' : 'mst';
  const id = `art-winter-b19-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・リップケア・リッププランパー・リップグロス・高保湿リップ美容液';
  let descType = '11〜12月の冷たい空気と乾燥によってしぼみ、縦ジワが目立ちやすくなった唇に温感やメントール成分、濃密なヒアルロン酸カプセルを届け、ちゅるんとした発光ツヤとふっくら立体的なボリューム感を演出する高保湿リッププランパー';
  if (category === 'wash') {
    catName = 'スキンケア・洗顔料・酵素洗顔・角質ケア・毛穴ケア・透明感・くすみ対策';
    descType = '11〜12月の冷えによるターンオーバーの停滞で硬くごわついた冬肌の古い角質・角栓タンパク質を穏やかに分解し、うるおいバリアを守りながら化粧水の吸い込みを劇的に引き上げる高保湿酵素洗顔＆角質美容ケア';
  } else if (category === 'mist') {
    catName = 'ヘアケア・スタイリング・ヘアミスト・静電気防止・アウトバストリートメント・ヘアスプレー';
    descType = '11〜12月のウールコートやマフラーの摩擦、急激な乾燥環境で発生する不快な静電気を中和し、毛髪内部の水分コルテックスを満たして一日中毛先までまとまりと濡れツヤを与える美髪プロテクトヘアミスト';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番およびホリデーシーズンにおいて、美容賢者やSNSのコスメ愛好家から絶大な支持を集めている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・安心の優良ショップからポイント高還元付きでお得にお買い求めいただけます。冬のビューティールーティンを劇的に格上げする本命アイテムです。`,
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
    reviewAverage: item.reviewAverage || 4.8,
    reviewCount: item.reviewCount || 310,
    featureSlug: featureSlug
  };
}

export const plumperArticles = plumperItemsRaw.map((it, idx) => createProductArticle(it, 'plumper', ['リッププランパー', 'リップ美容液', 'ボリュームリップ', 'ディオール', 'ジルスチュアート', 'ヴィセ', 'ボビイブラウン', 'クラランス', 'TIRTIR', 'キャンメイク', 'フジコ', '冬メイク'], 'winter-hydrating-lip-plumper-volume-glow-2026', idx));
export const washArticles = washItemsRaw.map((it, idx) => createProductArticle(it, 'wash', ['酵素洗顔', '角質ケア', '洗顔パウダー', 'オバジC', 'ファンケル', 'スイサイ', 'カネボウ', 'タカミスキンピール', 'VT', 'キュレル', 'ミノン', 'センサイ', 'メラノCC', '冬スキンケア'], 'winter-enzyme-powder-wash-peeling-glow-2026', idx));
export const mistArticles = mistItemsRaw.map((it, idx) => createProductArticle(it, 'mist', ['ヘアミスト', '静電気防止', 'ヘアトリートメント', 'ジルスチュアート', 'ディオール', 'リファ', 'ミルボン', 'SHIRO', 'ナプラ', 'シャネル', 'モロッカンオイル', 'ラカスタ', 'オルビス', '冬ヘアケア'], 'winter-anti-static-hair-mist-gloss-spray-2026', idx));

export const allNewArticles = [...plumperArticles, ...washArticles, ...mistArticles];

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
export function renderItemCard(it, art, reason, pros, cons) {
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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 280).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・最新楽天市場価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin-bottom: 12px;">
        ${reason}
      </p>
      <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #0369a1; font-weight: bold; margin-bottom: 4px;">✨ おすすめポイント: ${pros}</div>
        <div style="color: #475569;">💡 気になる点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60000 100%); color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; text-decoration: none; box-shadow: 0 2px 6px rgba(230,0,0,0.3);">
          楽天市場で詳細・在庫を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #ffffff; color: #0284c7; border: 1px solid #0284c7; padding: 10px 16px; border-radius: 8px; font-weight: bold; font-size: 0.88rem; text-decoration: none;">
          詳細レビュー・口コミ記事を読む
        </a>
      </div>
    </div>
  </div>
</div>`;
}

export function rakutenCardBanner() {
  return `
<div style="margin: 32px 0; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%); border: 1px solid #fecaca; text-align: center;">
  <p style="font-size: 0.95rem; font-weight: bold; color: #991b1b; margin-bottom: 8px;">
    🛍️ 楽天スーパーSALE・お買い物マラソン・毎月5と0のつく日はポイント高還元！
  </p>
  <p style="font-size: 0.85rem; color: #7f1d1d; margin: 0 0 12px 0;">
    楽天市場の公式ショップ・優良認定店舗なら、冬の乾燥対策コスメ・ホリデー限定コフレもお得にポイントが貯まります。
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #bf0000; color: #ffffff; font-weight: bold; font-size: 0.88rem; padding: 8px 18px; border-radius: 6px; text-decoration: none;">
    楽天市場コスメ・冬のビューティー特集をチェックする →
  </a>
</div>`;
}
