import { RakutenProductArticle } from '../types';

/**
 * 楽天の検索結果ページURL（search.rakuten.co.jp）または不整合URLを、
 * 対象商品の個別商品ページ直リンクに安全に補正・ガードする関数
 */
export function getCleanAffiliateLink(article: RakutenProductArticle): string {
  const affiliateLink = article.affiliateLink || (article as any).affiliateUrl;
  const { originalUrl, itemCode } = article;
  
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

export interface MallLinkInfo {
  mall: 'yahoo' | 'amazon' | 'rakuten';
  name: string;
  url: string;
  badge: string;
  priceNote: string;
  ctaText: string;
  buttonColor: string;
}

export interface ThreeMallLinks {
  yahoo?: MallLinkInfo;
  amazon: MallLinkInfo;
  rakuten: MallLinkInfo;
  ordered: MallLinkInfo[];
}

/**
 * 楽天・Amazon・Yahoo!ショッピングのモール比較リンクを生成する関数
 * Yahooボタンは正式なアフィリエイトリンク(yahooAffiliateUrl)が存在する場合のみ生成・表示。
 * 未設定時はボタン自体を完全非表示にする。
 */
export function getMallLinks(article: Partial<RakutenProductArticle>): ThreeMallLinks {
  const rawTitle = article.productName || article.title || 'コスメ';
  const cleanKeyword = rawTitle
    .replace(/【.*?】/g, ' ')
    .replace(/\[.*?\]/g, ' ')
    .replace(/(最新|限定|正規品|公式|徹底検証|口コミ|送料無料|評判|最安値)/g, ' ')
    .trim()
    .split(/\s+/)[0] || rawTitle.slice(0, 20);

  const encodedKeyword = encodeURIComponent(cleanKeyword);

  // Amazon アソシエイトリンク（タグ: mattan0290c-22）
  const asin = (article as any)?.asin;
  const amazonAffiliateUrl = (article as any)?.amazonAffiliateUrl;
  const amazonUrl = amazonAffiliateUrl || (asin
    ? `https://www.amazon.co.jp/dp/${asin}?tag=mattan0290c-22`
    : `https://www.amazon.co.jp/s?k=${encodedKeyword}&tag=mattan0290c-22`);

  // 楽天市場 アフィリエイトリンク
  const rakutenUrl = getCleanAffiliateLink(article as RakutenProductArticle);

  const amazon: MallLinkInfo = {
    mall: 'amazon',
    name: 'Amazon',
    url: amazonUrl,
    badge: 'プライム翌日配送対象あり',
    priceNote: '通常配送2,000円以上またはPrime会員で送料無料',
    ctaText: 'Amazonで最新価格を見る',
    buttonColor: 'bg-[#ff9900] hover:bg-[#e68a00] text-slate-900 font-extrabold'
  };

  const rakuten: MallLinkInfo = {
    mall: 'rakuten',
    name: '楽天市場',
    url: rakutenUrl,
    badge: '楽天ポイント最大16倍',
    priceNote: '3,980円以上購入で送料無料ライン対象店舗多数',
    ctaText: '楽天市場で最安値をチェック',
    buttonColor: 'bg-[#bf0000] hover:bg-[#a60000] text-white'
  };

  const ordered: MallLinkInfo[] = [];

  // Yahoo!ショッピング: 正式なアフィリエイトリンク(yahooAffiliateUrl)が登録されている場合のみ表示
  let yahoo: MallLinkInfo | undefined = undefined;
  const yahooAffiliateUrl = (article as any)?.yahooAffiliateUrl;
  if (yahooAffiliateUrl && typeof yahooAffiliateUrl === 'string' && yahooAffiliateUrl.trim().length > 0) {
    yahoo = {
      mall: 'yahoo',
      name: 'Yahoo!ショッピング',
      url: yahooAffiliateUrl.trim(),
      badge: 'PayPayポイント還元',
      priceNote: '送料無料条件・付与ポイントは各出店ストアにより異なります',
      ctaText: 'Yahoo!ショッピングで見る',
      buttonColor: 'bg-[#ff0033] hover:bg-[#e6002e] text-white'
    };
    ordered.push(yahoo);
  }

  // 楽天・Amazonを追加
  ordered.push(amazon);
  ordered.push(rakuten);

  return {
    yahoo,
    amazon,
    rakuten,
    ordered
  };
}
