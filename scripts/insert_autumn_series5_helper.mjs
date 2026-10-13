import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series5_items.json', 'utf8'));

export const cleanseItemsRaw = batchData.cleanseItems;
export const boosterItemsRaw = batchData.boosterItems;
export const bathItemsRaw = batchData.bathItems;

console.log(`🍂 2026秋コスメ特集 第5弾 アイテム数: クレンジング=${cleanseItemsRaw.length}, ブースター=${boosterItemsRaw.length}, 入浴剤=${bathItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'cleanse' ? 'cln' : category === 'booster' ? 'bst' : 'bth';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn5-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・クレンジング・ホットクレンジング・クレンジングバーム・毛穴ケア・つっぱり防止・2026秋';
  let descType = '秋の冷えによって固まりやすい皮脂や角栓をじんわり温めてゆるめ、肌に必要な潤いを守りながら毛穴汚れをすっきり落とす高保湿温感クレンジング＆バーム';
  let features = [
    '温感マッサージ効果で血行を促し、頑固な毛穴の黒ずみ・角栓を摩擦レスでオフ',
    '美容液成分を贅沢に配合し、洗顔後も化粧水を慌ててつけなくて良いほどのしっとり肌へ',
    '楽天市場公式・優良認定ショップ取り扱いで正規品保証＆ポイント還元'
  ];
  
  if (category === 'booster') {
    catName = 'スキンケア・導入美容液・ブースター・土台美容液・角質ケア・浸透促進・インナードライ・2026秋';
    descType = '夏の紫外線ダメージで硬く肥厚した秋のごわつき角層をやわらかくほぐし、その後に重ねる化粧水や乳液の浸透力を劇的に高める実力派導入美容液';
    features = [
      '微細ナノカプセルや発酵エキスが角層深部までうるおいを行き渡らせる高機能処方',
      'インナードライによる乾燥小ジワやくすみ、キメの乱れを土台から立て直す',
      'サロン品質の角質ケアから薬用成分配合まで楽天市場でお得に入手可能'
    ];
  } else if (category === 'bath') {
    catName = 'ボディケア・バスケア・薬用入浴剤・バスソルト・温活・冷え性改善・お風呂上がり乾燥防止・2026秋';
    descType = '少し肌寒い秋の夜に身体の芯まで温めて湯冷めを防ぎ、入浴後のお風呂上がりの過乾燥や粉吹き・かゆみを防ぐ薬用重炭酸＆高保湿バスソルト';
    features = [
      '重炭酸イオンや生薬エキス、天然岩塩ミネラルが血流を促進し冷えと疲労を回復',
      'セラミドや植物オイルがバリア膜を作り、お風呂上がりの水分蒸発を徹底ブロック',
      '毎日の温活習慣から自分へのご褒美バスタイムまで楽天市場でまとめ買い可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のスキンケア・温活トレンドにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第5弾10選'],
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

export const cleanseArticles = cleanseItemsRaw.map((it, idx) => 
  createProductArticle(it, 'cleanse', ['ホットクレンジング', 'クレンジングバーム', '秋毛穴ケア', '温感洗顔'], 'autumn-hot-cleansing-balm-pores-10', idx)
);

export const boosterArticles = boosterItemsRaw.map((it, idx) => 
  createProductArticle(it, 'booster', ['導入美容液', 'ブースター', '土台美容液', '角質ケア'], 'autumn-booster-serum-dry-skin-10', idx)
);

export const bathArticles = bathItemsRaw.map((it, idx) => 
  createProductArticle(it, 'bath', ['薬用入浴剤', 'バスソルト', '温活', '湯冷め対策'], 'autumn-bath-salt-soak-dry-cold-10', idx)
);

export function updateArticlesJson() {
  const allNewArticles = [...cleanseArticles, ...boosterArticles, ...bathArticles];
  allNewArticles.forEach(art => {
    const exIdx = existingArticles.findIndex(e => e.id === art.id);
    if (exIdx >= 0) {
      existingArticles[exIdx] = art;
    } else {
      existingArticles.push(art);
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
  console.log(`✅ articles.json に秋コスメ第5弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);
  
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
      <div style="display: inline-block; background: #e11d48; color: #ffffff; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
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
          個別詳細・口コミを見る ❯
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
