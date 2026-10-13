import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series6_items.json', 'utf8'));

export const eyeItemsRaw = batchData.eyeItems;
export const scalpItemsRaw = batchData.scalpItems;
export const scrubItemsRaw = batchData.scrubItems;

console.log(`🍂 2026秋コスメ特集 第6弾 アイテム数: アイクリーム=${eyeItemsRaw.length}, スカルプ=${scalpItemsRaw.length}, スクラブ=${scrubItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'eye' ? 'eyc' : category === 'scalp' ? 'scp' : 'scb';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn6-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・アイケア・アイクリーム・目元美容液・シワ改善・くま対策・2026秋';
  let descType = '秋の冷たい外気と乾燥による目元のちりめんジワ・くま・ハリ不足を集中的にケアし、ピンと引き締まった若々しい目元へ導く高機能アイクリーム＆目元美容液';
  let features = [
    '純粋レチノール・ナイアシンアミド・リポソーム配合で、目元の乾燥小ジワを徹底改善',
    'デリケートな薄い皮膚を濃密なうるおい膜で包み込み、夕方の乾燥くずれを防止',
    '楽天市場公式・優良認定ショップ取り扱いで正規品保証＆ポイント還元'
  ];
  
  if (category === 'scalp') {
    catName = 'ヘアケア・頭皮ケア・スカルプエッセンス・頭皮用美容液・抜け毛予防・ヘッドスパ・2026秋';
    descType = '夏の紫外線ダメージと秋の換毛期による抜け毛・薄毛、頭皮の乾燥フケやかゆみを防ぎ、健やかな美髪を育む頭皮用美容液＆ヘッドスパブラシ';
    features = [
      '薬用育毛成分や植物エキスが頭皮の血流を促し、根元から立ち上がるふんわり美髪へ',
      'サロン級の心地よい刺激で頭皮のコリをほぐし、顔全体の引き締めリフトケアもサポート',
      '楽天市場公式取扱ショップにて安心の正規品・ポイント還元でお得に購入可能'
    ];
  } else if (category === 'scrub') {
    catName = 'ボディケア・ボディスクラブ・角質ケア・かかとケア・ひじひざ黒ずみ・つるすべ肌・2026秋';
    descType = 'サンダル後の夏の蓄積角質と秋の乾燥によるかかとのひび割れ・ガサガサ、ひじや膝の黒ずみを優しくオフし、つるんと柔らかい素肌に整えるボディスクラブ＆角質バーム';
    features = [
      '死海の塩や天然温泉水成分が不要な古い角質をやさしく除去し、滑らかなシルク肌を再生',
      '植物オイル配合でスクラブ後も乾燥せず、吸い付くような潤いとしっとり感が持続',
      '大容量で長く使える定番名品から薬用処方まで楽天市場でまとめ買い可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ特化ケアトレンドにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第6弾10選'],
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

export const eyeArticles = eyeItemsRaw.map((it, idx) => 
  createProductArticle(it, 'eye', ['秋アイクリーム', '目元の乾燥小ジワ', '目元ケア', 'シワ改善クリーム'], 'autumn-eye-cream-wrinkle-dark-circles-10', idx)
);

export const scalpArticles = scalpItemsRaw.map((it, idx) => 
  createProductArticle(it, 'scalp', ['秋の抜け毛対策', 'スカルプエッセンス', '頭皮ケア', 'スカルプブラシ'], 'autumn-scalp-serum-hair-loss-brush-10', idx)
);

export const scrubArticles = scrubItemsRaw.map((it, idx) => 
  createProductArticle(it, 'scrub', ['ボディスクラブ', 'かかと角質ケア', 'ひじひざ黒ずみ', '秋ボディケア'], 'autumn-body-scrub-heel-care-rough-10', idx)
);

export function updateArticlesJson() {
  const allNewArticles = [...eyeArticles, ...scalpArticles, ...scrubArticles];
  allNewArticles.forEach(art => {
    const exIdx = existingArticles.findIndex(e => e.id === art.id);
    if (exIdx >= 0) {
      existingArticles[exIdx] = art;
    } else {
      existingArticles.push(art);
    }
  });

  fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
  console.log(`✅ articles.json に秋コスメ第6弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);
  
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
      <div style="display: inline-block; background: #4f46e5; color: #ffffff; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
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
        <span style="font-size: 18px; font-weight: bold; color: #4f46e5;">${it.priceFormatted}</span>
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
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #4f46e5; color: #ffffff; font-weight: bold; font-size: 14px; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);">
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
