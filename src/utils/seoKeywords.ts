import { RakutenProductArticle, BlogPost, ProductComparison } from '../types';

/**
 * コスメ商品の特徴やカテゴリから、検索流入（ロングテールSEO）に最適なタイトルを生成
 */
export function generateOptimizedProductTitle(article: RakutenProductArticle): string {
  const name = article.productName || article.title;
  const category = article.categoryLabel || article.category || '';
  
  // 既に十分リッチなタイトルの場合
  if (name.includes('【') && name.includes('】') && name.length > 30) {
    return `${name} | Qualia Navi`;
  }

  // カテゴリや特徴に応じたキーワード選定
  let benefitKw = '口コミ評判・最安値';
  if (category.includes('スキンケア') || category.includes('skincare')) {
    benefitKw = '口コミ・保湿効果・最安値本音レビュー';
  } else if (category.includes('UV') || category.includes('日焼け止め') || category.includes('suncare')) {
    benefitKw = '焼けない？口コミ・落とし方・最安値検証';
  } else if (category.includes('リップ') || category.includes('メイク') || category.includes('makeup')) {
    benefitKw = '色持ち・口コミ・パーソナルカラー別最安値';
  } else if (category.includes('ヘアケア') || category.includes('haircare')) {
    benefitKw = 'ツヤ・まとまり口コミ・最安値比較';
  }

  // 30〜35文字前後の検索特化タイトル
  return `【2026年最新】${name}の${benefitKw} | Qualia Navi`;
}

/**
 * 検索クリック率（CTR）を高めるメタディスクリプションを生成
 */
export function generateOptimizedProductDescription(article: RakutenProductArticle): string {
  const name = article.productName || article.title;
  const price = article.rakutenPrice ? `参考価格: ${article.rakutenPrice}。` : '';
  const pros = article.pros && article.pros.length > 0 ? `注目ポイント: ${article.pros.slice(0, 2).join('、')}。` : '';
  const intro = article.introText || '';

  return `【2026最新】${name}のリアルな口コミ・使い心地・成分特徴をQualia美容分析室が徹底検証！${pros}${price}楽天市場の最安値・在庫情報をリアルタイムでお届けします。`.slice(0, 155);
}

/**
 * 比較記事（VS対決）のロングテール最適化タイトル
 */
export function generateOptimizedComparisonTitle(comp: ProductComparison): string {
  if (comp.title.includes('【') && comp.title.includes('】')) {
    return `${comp.title} | Qualia Navi`;
  }
  return `【2026最新比較】${comp.title} どっちがおすすめ？違い・成分・コスパを徹底検証 | Qualia Navi`;
}
