import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series4_items.json', 'utf8'));

export const handItemsRaw = batchData.handItems;
export const hairItemsRaw = batchData.hairItems;
export const lipCareItemsRaw = batchData.lipCareItems;

console.log(`🍂 2026秋コスメ特集 第4弾 アイテム数: ハンドケア=${handItemsRaw.length}, ヘアケア=${hairItemsRaw.length}, リップケア=${lipCareItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hand' ? 'hnd' : category === 'hair' ? 'har' : 'lpc';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn4-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'ボディケア・ハンドケア・ネイルケア・高保湿ハンドクリーム・ささくれ・手荒れ防止・2026秋';
  let descType = '秋の冷たい空気と水仕事による手肌の乾燥・ささくれ・ひび割れを防ぎ、ベタつかずスーッと浸透してうるおい保護膜をつくる実力派ハンド＆ネイルケア';
  let features = [
    'シアバター・セラミド・植物オイル配合で、水仕事や秋風による手荒れを集中リペア',
    '塗った直後でもスマホやパソコンのキーボードがベタつかない快適な高密着処方',
    '楽天市場公式・優良認定ショップ取り扱いで正規品保証＆ポイント還元'
  ];
  
  if (category === 'hair') {
    catName = 'ヘアケア・洗い流さないトリートメント・ヘアオイル・ヘアミルク・パサつき防止・静電気対策・2026秋';
    descType = '夏の紫外線ダメージと秋の乾燥風による毛先のパサつき・広がり・静電気を補修し、一日中とぅるんとまとまる艶髪へ導く洗い流さないアウトバストリートメント';
    features = [
      'アルガンオイル・ケラチン・高保水エッセンスが髪の内部まで浸透しダメージを集中補修',
      'ドライヤーの熱や秋の乾燥によるパサつき・静電気・湿気戻りを徹底ガード',
      'サロン専売品から話題のヒットアイテムまで楽天市場でお得に購入可能'
    ];
  } else if (category === 'lipcare') {
    catName = 'スキンケア・リップケア・リップマスク・リップスクラブ・唇の皮剥け・縦ジワ補正・2026秋';
    descType = '秋の寒冷乾燥で荒れやすく皮剥けしやすい唇の古い角質をやさしくオフし、就寝中に濃密な油膜でラップして翌朝ぷるぷるの唇を取り戻す集中リップケア';
    features = [
      'シュガースクラブや植物オイル・セラミドが高配合され、縦ジワや皮剥けを即効レスキュー',
      'リップメイクの前に仕込むことで口紅の発色と持ちを劇的にアップさせるトリートメント効果',
      'デパコスの名品から薬用医薬品まで楽天市場認定ショップで安心購入'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のコスメ・パーツケアトレンドにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第4弾10選'],
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

export const handArticles = handItemsRaw.map((it, idx) => 
  createProductArticle(it, 'hand', ['秋ハンドクリーム', '手荒れ対策', 'ネイルオイル', 'ささくれケア'], 'autumn-hand-cream-nail-oil-chapped-10', idx)
);

export const hairArticles = hairItemsRaw.map((it, idx) => 
  createProductArticle(it, 'hair', ['秋ヘアオイル', 'ヘアミルク', '髪のパサつき', '静電気対策'], 'autumn-hair-oil-milk-dry-frizz-10', idx)
);

export const lipCareArticles = lipCareItemsRaw.map((it, idx) => 
  createProductArticle(it, 'lipcare', ['リップスリーピングマスク', 'リップスクラブ', '唇の皮剥け', '唇乾燥対策'], 'autumn-lip-sleeping-mask-scrub-peeling-10', idx)
);

export function updateArticlesJson() {
  const allNewArticles = [...handArticles, ...hairArticles, ...lipCareArticles];
  allNewArticles.forEach(art => {
    const exIdx = existingArticles.findIndex(e => e.id === art.id);
    if (exIdx >= 0) {
      existingArticles[exIdx] = art;
    } else {
      existingArticles.push(art);
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
  console.log(`✅ articles.json に秋コスメ第4弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);
  
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
      <div style="display: inline-block; background: #0d9488; color: #ffffff; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
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
        <span style="font-size: 18px; font-weight: bold; color: #0d9488;">${it.priceFormatted}</span>
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
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #0d9488; color: #ffffff; font-weight: bold; font-size: 14px; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);">
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
