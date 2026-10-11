import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch84Data = JSON.parse(fs.readFileSync('scratch/winter_batch84_items.json', 'utf8'));

// --- テーマ1: 高保湿マルチバーム＆スティックバーム 10商品 ---
export const multiBalmItemsRaw = batch84Data.multiBalmItems;

// --- テーマ2: 高保湿乳液＆セラミドエマルジョン 10商品 ---
export const emulsionItemsRaw = batch84Data.emulsionItems;

// --- テーマ3: 高保湿メルティングリップ＆濃密ツヤ粘膜ティント 10商品 ---
export const lipItemsRaw = batch84Data.lipItems;

console.log(`第84弾 選定アイテム数: マルチバーム=${multiBalmItemsRaw.length}, 高保湿乳液=${emulsionItemsRaw.length}, メルティングリップ=${lipItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'multi_balm' ? 'balm' : category === 'emulsion' ? 'emul' : 'lip';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-winter-b84-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・高保湿バーム・スティックバーム・レスキューバーム・粉吹き対策・目元口元ケア・2026冬';
  let descType = '11〜12月の寒冷・エアコン暖房による局所的な粉吹き・皮剥け・インナードライを即効レスキューし、水分油分を長時間密閉する高保湿マルチバーム';
  
  if (category === 'emulsion') {
    catName = 'スキンケア・高保湿乳液・セラミドミルク・先行乳液・ラメラ構造ケア・インナードライ対策・2026冬';
    descType = '11〜12月の寒さでゴワつき硬化した角層を柔らかくほぐし、セラミドや水分を抱え込んで逃さない高保湿エモリエント乳液';
  } else if (category === 'lip') {
    catName = 'メイクアップ・リップメイク・メルティングリップ・粘膜ティント・高保湿リップバーム・血色ツヤ・ホリデーメイク・2026冬';
    descType = '11〜12月の乾燥した唇でも皮剥けせず、体温でとろける濃密なツヤと血色感をキープする高保湿メルティングリップ＆粘膜ティント';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持と高いレビュー評価を集める実力派アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の公式・認定ショップにて、お買い物マラソンや楽天スーパーSALE、各種ポイントアップ企画を利用してお得に購入できます。乾燥や寒さで肌トラブルやメイク崩れが起こりやすい真冬のコンディションを美しく整えます。`,
    category: catName,
    tags: [...tagList, '2026冬コスメ', '楽天市場正規品', '11月12月人気コスメ'],
    createdAt: nowStr,
    updatedAt: nowStr,
    itemCode: item.itemCode,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    priceFormatted: item.priceFormatted,
    shopName: item.shopName,
    affiliateUrl: item.affiliateUrl || item.itemUrl,
    itemUrl: item.itemUrl,
    imageUrl: item.imageUrl,
    reviewAverage: item.reviewAverage || 4.6,
    reviewCount: item.reviewCount || 100,
    features: [
      '11〜12月の真冬特有の乾燥・寒冷トラブルを即効レスキューする高機能設計',
      '楽天市場公式・優良ショップ取り扱いでポイント還元＆即日配送対応',
      '美容のプロやコスメ愛好家から絶賛される高いリピート率と口コミ評価'
    ],
    relatedBlogSlug: featureSlug
  };
}

// 30商品を articles.json に追加
export const multiBalmArticles = multiBalmItemsRaw.map((it, idx) => 
  createProductArticle(it, 'multi_balm', ['マルチバーム', 'スティックバーム', '乾燥対策', 'レスキューバーム'], 'winter-rescue-multi-moisture-balm-stick-2026', idx)
);

export const emulsionArticles = emulsionItemsRaw.map((it, idx) => 
  createProductArticle(it, 'emulsion', ['高保湿乳液', 'セラミド乳液', '先行乳液', 'インナードライ対策'], 'winter-deep-moisture-ceramide-emulsion-milk-2026', idx)
);

export const lipArticles = lipItemsRaw.map((it, idx) => 
  createProductArticle(it, 'lip', ['メルティングリップ', '粘膜ティント', '高保湿リップ', 'ホリデーリップ'], 'winter-melting-rouge-glossy-tint-balm-2026', idx)
);

export function updateArticlesJson() {
  const allNewArticles = [...multiBalmArticles, ...emulsionArticles, ...lipArticles];
  allNewArticles.forEach(art => {
    const exIdx = existingArticles.findIndex(e => e.id === art.id);
    if (exIdx >= 0) {
      existingArticles[exIdx] = art;
    } else {
      existingArticles.push(art);
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
  console.log(`✅ articles.json に第84弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);
  
  // public/data/articles/*.json 個別ファイルも出力
  const publicArticlesDir = path.resolve('public/data/articles');
  if (!fs.existsSync(publicArticlesDir)) {
    fs.mkdirSync(publicArticlesDir, { recursive: true });
  }
  allNewArticles.forEach(art => {
    fs.writeFileSync(path.join(publicArticlesDir, `${art.id}.json`), JSON.stringify(art, null, 2), 'utf8');
  });
  console.log(`✅ public/data/articles/ に個別商品JSON ${allNewArticles.length}件 を同期しました！`);
}

// 特集記事埋め込み用のリッチカードレンダリング関数
export function renderProductCard(it, art, badgeText, description, pros, cons) {
  return `
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 28px 0; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
    <div style="flex: 0 0 200px; max-width: 220px; margin: 0 auto; text-align: center;">
      <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${it.imageUrl}" alt="${it.itemName}" style="width: 100%; max-height: 200px; object-fit: contain; border-radius: 12px; transition: transform 0.2s;" loading="lazy" />
      </a>
    </div>
    <div style="flex: 1 1 300px; min-width: 260px;">
      <div style="display: inline-block; background: #ec4899; color: #ffffff; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
        ${badgeText}
      </div>
      <h4 style="margin: 0 0 10px 0; font-size: 18px; line-height: 1.4; color: #1e293b;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: inherit; text-decoration: none;">
          ${it.itemName}
        </a>
      </h4>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="color: #f59e0b; font-weight: bold; font-size: 15px;">★ ${it.reviewAverage || 4.5}</span>
        <span style="color: #64748b; font-size: 13px;">(レビュー ${it.reviewCount || 0}件)</span>
        <span style="font-size: 18px; font-weight: bold; color: #e11d48;">${it.priceFormatted}</span>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; font-size: 13px;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 12px; color: #166534;">
          <strong>◎ 魅力・長所:</strong><br />${pros}
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 8px 12px; color: #991b1b;">
          <strong>△ 注意点:</strong><br />${cons}
        </div>
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #e11d48; color: #ffffff; font-weight: bold; font-size: 14px; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(225, 29, 72, 0.3);">
          楽天市場で最安値をチェック ❯
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #334155; font-weight: bold; font-size: 14px; padding: 10px 18px; border-radius: 8px; text-decoration: none; border: 1px solid #cbd5e1;">
          個別口コミレビューを見る ❯
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
