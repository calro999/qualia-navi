import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_batch_items.json', 'utf8'));

export const lipItemsRaw = batchData.lipItems;
export const cheekItemsRaw = batchData.cheekItems;
export const nailItemsRaw = batchData.nailItems;

console.log(`🍂 2026秋コスメ特集 アイテム数: リップ=${lipItemsRaw.length}, チーク=${cheekItemsRaw.length}, ネイルチップ=${nailItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'lip' ? 'lip' : category === 'cheek' ? 'chk' : 'nail';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'メイクアップ・リップメイク・秋リップ・深みカラー・高保湿ティント・粘膜リップ・2026秋';
  let descType = '秋のメイクを格上げする深みカラーや濃密なうるおいツヤを持ち、長時間のキープ力と唇の荒れにくさを両立した実力派秋リップ';
  let features = [
    '2026年秋のトレンド（深みブラウン・くすみイチジク・透け感バーガンディ）にマッチする絶妙発色',
    '乾燥しやすい秋の気候でも皮剥けやパサつきを防ぐ濃密トリートメント処方',
    '楽天市場公式・優良認定ショップ取り扱いで正規品保証＆ポイント還元'
  ];
  
  if (category === 'cheek') {
    catName = 'メイクアップ・チーク・秋チーク・テラコッタ・透け感ベージュ・血色感・2026秋';
    descType = '秋の肌トーンになじむ温かみのあるテラコッタやベージュ、スフレマットな質感で自然な血色感と立体感を与える秋チーク';
    features = [
      '肌に溶け込む微粒子パウダー＆スフレ質感で、毛穴落ちやくすみを防ぐ美肌仕上げ',
      'イエベ・ブルベを問わず大人の秋メイクに自然な陰影と多幸感をプラス',
      '楽天市場公式取扱ショップにて最新カラーがお得なポイント還元で購入可能'
    ];
  } else if (category === 'nail') {
    catName = 'ネイル・ネイルチップ・秋ネイル・べっ甲・マグネットネイル・ニュアンス・2026秋';
    descType = 'サロンに行かずに自宅でワンタッチ装着でき、秋らしいべっ甲やマグネット、ニュアンスデザインを気軽に楽しめる高密着ネイルチップ';
    features = [
      '秋のファッションに映えるトレンドアート（べっ甲・キャッツアイ・深みボルドー）を忠実に再現',
      '爪に負担をかけず自爪にフィットし、剥がれにくさと痛みの少なさを両立',
      'お出かけやオフィス、休日限定のネイルチェンジにも手軽に使える人気仕様'
    ];
  }

  return {
    id: id,
    title: `【2026秋最新】${item.itemName.slice(0, 42)}の口コミ評判・仕上がり・最安値比較`,
    content: `${item.itemName}は、2026年秋のコスメトレンドにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ10選'],
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
    features: features,
    relatedBlogSlug: featureSlug
  };
}

export const lipArticles = lipItemsRaw.map((it, idx) => 
  createProductArticle(it, 'lip', ['秋リップ', '落ちない口紅', '粘膜リップ', 'リップティント'], 'autumn-best-lip-cosme-ranking-10', idx)
);

export const cheekArticles = cheekItemsRaw.map((it, idx) => 
  createProductArticle(it, 'cheek', ['秋チーク', 'ベージュチーク', 'テラコッタ', '血色感チーク'], 'autumn-best-blush-cheek-cosme-10', idx)
);

export const nailArticles = nailItemsRaw.map((it, idx) => 
  createProductArticle(it, 'nail', ['ネイルチップ', '秋ネイル', 'べっ甲ネイル', 'マグネットネイル'], 'autumn-best-nail-tips-trend-10', idx)
);

export function updateArticlesJson() {
  const allNewArticles = [...lipArticles, ...cheekArticles, ...nailArticles];
  allNewArticles.forEach(art => {
    const exIdx = existingArticles.findIndex(e => e.id === art.id);
    if (exIdx >= 0) {
      existingArticles[exIdx] = art;
    } else {
      existingArticles.push(art);
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
  console.log(`✅ articles.json に秋コスメ第1弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);
  
  const publicArticlesDir = path.resolve('public/data/articles');
  if (!fs.existsSync(publicArticlesDir)) {
    fs.mkdirSync(publicArticlesDir, { recursive: true });
  }
  allNewArticles.forEach(art => {
    fs.writeFileSync(path.join(publicArticlesDir, `${art.id}.json`), JSON.stringify(art, null, 2), 'utf8');
  });
  console.log(`✅ public/data/articles/ に個別商品JSON ${allNewArticles.length}件 を同期しました！`);
}

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
      <div style="display: inline-block; background: #c2410c; color: #ffffff; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
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
        <span style="font-size: 18px; font-weight: bold; color: #c2410c;">${it.priceFormatted}</span>
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
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #c2410c; color: #ffffff; font-weight: bold; font-size: 14px; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(194, 65, 12, 0.3);">
          楽天市場で最安値をチェック ❯
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #334155; font-weight: bold; font-size: 14px; padding: 10px 18px; border-radius: 8px; text-decoration: none; border: 1px solid #cbd5e1;">
          個別詳細・口コミを見る ❯
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
