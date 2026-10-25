import fs from 'fs';
import { updateArticlesJson, lipItemsRaw, primerItemsRaw, bathItemsRaw } from './insert_autumn_series29_helper.mjs';
import { getLipMaskArticleContent } from './autumn_series29_article1_lipmask.mjs';
import { getPrimerArticleContent } from './autumn_series29_article2_primer.mjs';
import { getBathArticleContent } from './autumn_series29_article3_bath.mjs';

async function main() {
  console.log('--- 第29弾 メイン統合スクリプト開始 ---');

  // 1. public/data/articles.json に30件反映
  updateArticlesJson();

  // ルートの articles.json にも同期
  const publicArticlesPath = 'public/data/articles.json';
  if (fs.existsSync(publicArticlesPath)) {
    const updatedArticles = fs.readFileSync(publicArticlesPath, 'utf8');
    fs.writeFileSync('articles.json', updatedArticles, 'utf8');
    console.log('✅ ルートの articles.json も同期完了しました！');
  }

  // 2. 3大キラー特集記事の生成
  const lipMaskFeature = {
    id: 'feat-autumn-hydrating-lip-sleeping-mask-chapped-10',
    title: '【2026秋冬】カサつき・縦ジワ即効レスキュー！高保湿リップスリーピングマスク＆濃厚リップバームおすすめ10選',
    date: '2026-10-25',
    category: 'リップケア・高保湿ケア',
    content: getLipMaskArticleContent(),
    imageUrl: lipItemsRaw[0]?.imageUrl || 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80',
    readTime: '15分',
    tags: ['リップケア', 'リップスリーピングマスク', 'リップバーム', '乾燥対策', '秋冬コスメ', '縦ジワ改善']
  };

  const primerFeature = {
    id: 'feat-autumn-hydrating-serum-primer-flaky-skin-10',
    title: '【2026秋冬】粉ふき・毛穴落ちゼロ！一日中うるおいが続く「高保湿美容液化粧下地」おすすめ10選',
    date: '2026-10-25',
    category: 'ベースメイク・化粧下地',
    content: getPrimerArticleContent(),
    imageUrl: primerItemsRaw[0]?.imageUrl || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    readTime: '15分',
    tags: ['化粧下地', '美容液下地', '乾燥肌', '粉ふき防止', '秋冬メイク', 'ツヤ肌']
  };

  const bathFeature = {
    id: 'feat-autumn-medicinal-bicarbonate-bath-cold-dry-10',
    title: '【2026秋冬】芯まで温めて全身潤す！薬用高保湿重炭酸入浴剤＆アロマバスソルトおすすめ10選【末端冷え・肩こり・湯上がりカサつき解消】',
    date: '2026-10-25',
    category: 'ボディケア・バスグッズ',
    content: getBathArticleContent(),
    imageUrl: bathItemsRaw[0]?.imageUrl || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    readTime: '14分',
    tags: ['入浴剤', '重炭酸入浴剤', 'バスソルト', '温活', '乾燥肌対策', '疲労回復']
  };

  const newFeatures = [lipMaskFeature, primerFeature, bathFeature];

  // 3. src/data.ts への挿入
  const dataTsPath = 'src/data.ts';
  let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

  // 既に挿入されているかチェック
  if (dataTsContent.includes('feat-autumn-hydrating-lip-sleeping-mask-chapped-10')) {
    console.log('⚠️ すでに src/data.ts に第29弾の記事が存在します。スキップします。');
  } else {
    const insertTarget = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
    if (!dataTsContent.includes(insertTarget)) {
      throw new Error('src/data.ts 内に INITIAL_BLOG_POSTS 定義が見つかりません');
    }

    const featureCodes = newFeatures.map(f => {
      return `  {
    id: ${JSON.stringify(f.id)},
    title: ${JSON.stringify(f.title)},
    date: ${JSON.stringify(f.date)},
    category: ${JSON.stringify(f.category)},
    content: ${JSON.stringify(f.content)},
    imageUrl: ${JSON.stringify(f.imageUrl)},
    readTime: ${JSON.stringify(f.readTime)},
    tags: ${JSON.stringify(f.tags)}
  },`;
    }).join('\n');

    dataTsContent = dataTsContent.replace(insertTarget, `${insertTarget}\n${featureCodes}`);
    fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
    console.log('✅ src/data.ts に第29弾の3大特集記事を正常に挿入しました！');
  }

  // 4. autumn_posts_meta.json に追加
  const metaPath = 'autumn_posts_meta.json';
  let metaList = [];
  if (fs.existsSync(metaPath)) {
    metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }
  const metaIds = new Set(metaList.map(m => m.id));

  for (const f of newFeatures) {
    if (!metaIds.has(f.id)) {
      metaList.unshift({
        id: f.id,
        title: f.title,
        date: f.date,
        category: f.category,
        imageUrl: f.imageUrl,
        readTime: f.readTime,
        tags: f.tags
      });
      metaIds.add(f.id);
    }
  }
  fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
  console.log('✅ autumn_posts_meta.json を更新しました！');

  console.log('--- 第29弾 メイン統合スクリプト完了 ---');
}

main().catch(err => {
  console.error('エラー発生:', err);
  process.exit(1);
});
