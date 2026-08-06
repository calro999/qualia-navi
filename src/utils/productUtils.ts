import { RakutenProductArticle } from '../types';

/**
 * 楽天の検索結果ページURL（search.rakuten.co.jp）または不整合URLを、
 * 対象商品の個別商品ページ直リンクに安全に補正・ガードする関数
 */
export function getCleanAffiliateLink(article: RakutenProductArticle): string {
  const { affiliateLink, originalUrl, itemCode } = article;
  
  if (originalUrl && originalUrl.includes('item.rakuten.co.jp')) {
    return originalUrl;
  }
  
  if (affiliateLink && !affiliateLink.includes('search.rakuten.co.jp')) {
    return affiliateLink;
  }
  
  if (itemCode && !itemCode.startsWith('autodiscover_')) {
    return `https://hb.afl.rakuten.co.jp/hgc/g00uq6dn.j9rug80d.g00uq6dn.j9ruh5c8/?pc=${encodeURIComponent(`https://item.rakuten.co.jp/rakuten24/${itemCode}/`)}`;
  }
  
  return affiliateLink || '#';
}

/**
 * 商品名・タイトルの表記揺れを吸収し正規化する関数
 */
export function normalizeProductName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[\s\u3000【】\[\]（）()]/g, '')
    .replace(/(公式|最安値|送料無料|正規品|人気|限定|徹底検証)/g, '');
}

/**
 * 記事・商品リストから同一商品を一つに統一（デデュプリケーション）する関数
 */
export function deduplicateArticles(articles: RakutenProductArticle[]): RakutenProductArticle[] {
  const seen = new Set<string>();
  const uniqueArticles: RakutenProductArticle[] = [];

  for (const art of articles) {
    const nameKey = normalizeProductName(art.productName || art.title);
    if (!nameKey || seen.has(nameKey)) {
      continue;
    }
    seen.add(nameKey);
    uniqueArticles.push({
      ...art,
      affiliateLink: getCleanAffiliateLink(art)
    });
  }

  return uniqueArticles;
}
