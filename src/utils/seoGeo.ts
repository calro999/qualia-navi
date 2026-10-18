import { RakutenProductArticle, BlogPost, AuthorProfile, ProductComparison } from '../types';
import { getCleanAffiliateLink } from './productUtils';

export interface SeoGeoOptions {
  title: string;
  description: string;
  imageUrl?: string;
  urlPath?: string;
  jsonLdSchema?: object | object[];
}

/**
 * Update dynamic head meta tags, OpenGraph, Twitter Cards, and JSON-LD schema for Qualia Navi SEO
 */
export function updateSeoGeoMetadata(config: SeoGeoOptions) {
  const rawPath = config.urlPath || window.location.pathname;
  // 正規URLの統一 (/blogs/ -> /features/, /compare/ -> /comparisons/)
  const normalizedPath = rawPath
    .replace(/^\/blogs\//, '/features/')
    .replace(/^\/blog\//, '/features/')
    .replace(/^\/compare\//, '/comparisons/');
  const fullUrl = `https://qualia-navi.vercel.app${normalizedPath}`;
  const fullImage = config.imageUrl
    ? (config.imageUrl.startsWith('http') ? config.imageUrl : `https://qualia-navi.vercel.app${config.imageUrl}`)
    : 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80';

  // 1. Update Document Title (重複付与防止)
  const cleanTitle = config.title.includes('Qualia Navi')
    ? config.title
    : `${config.title} | Qualia Navi (クオリア・ナビ)`;
  document.title = cleanTitle;

  // 2. Helper to set or update meta tag
  const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('meta[name="description"]', 'name', 'description', config.description);
  setMeta('meta[name="keywords"]', 'name', 'keywords', 'Qualia Navi,クオリアナビ,コスメ,美容,スキンケア,UVケア,韓国コスメ,デパコス,プチプラ,楽天市場,コスメ比較,口コミ検証');
  setMeta('meta[name="author"]', 'name', 'author', 'Qualia 美容分析室');

  // Open Graph (OGP) Meta Tags
  setMeta('meta[property="og:title"]', 'property', 'og:title', cleanTitle);
  setMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMeta('meta[property="og:image"]', 'property', 'og:image', fullImage);
  setMeta('meta[property="og:type"]', 'property', 'og:type', normalizedPath === '/' ? 'website' : 'article');
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Qualia Navi (クオリア・ナビ)');
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'ja_JP');

  // Twitter Cards
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', cleanTitle);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', fullImage);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullUrl);

  // 3. Inject JSON-LD Schema.org Data
  if (config.jsonLdSchema) {
    let scriptEl = document.querySelector('#geo-jsonld-schema') as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'geo-jsonld-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const schemas = Array.isArray(config.jsonLdSchema)
      ? config.jsonLdSchema
      : [config.jsonLdSchema];
    scriptEl.textContent = JSON.stringify(schemas, null, 2);
  }
}

/**
 * Generate Product / Article and Review JSON-LD Schema for Product Detail Page
 */
export function generateProductJsonLd(
  article: RakutenProductArticle,
  domain = 'https://qualia-navi.vercel.app'
) {
  const isContentArticle = Boolean(
    article.isContentArticle ||
    article.id.includes('10sen') ||
    article.id.startsWith('feat-') ||
    article.id.startsWith('blog-') ||
    /10選|総まとめ|完全ガイド/.test(article.title || '')
  );
  const imageUrl = (article.imageUrl && typeof article.imageUrl === 'string' && article.imageUrl.startsWith('http'))
    ? article.imageUrl
    : `${domain}${article.imageUrl || '/og-image.png'}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'コスメ図鑑TOP',
        item: domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.categoryLabel || article.category || 'コスメ検証',
        item: `${domain}/?category=${encodeURIComponent(article.category || 'all')}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.productName || article.title,
        item: `${domain}/articles/${article.id}`
      }
    ]
  };

  const schemas: any[] = [];

  if (isContentArticle) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description || article.introText || article.title,
      image: [imageUrl],
      datePublished: article.createdAt || '2026-10-01',
      dateModified: (article as any).updatedAt || article.createdAt || '2026-10-19',
      author: {
        '@type': 'Person',
        name: (article as any).author || article.reviewerName || '橘 えりか'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Qualia Navi (クオリア・ナビ)',
        logo: {
          '@type': 'ImageObject',
          url: `${domain}/favicon.svg`
        }
      },
      mainEntityOfPage: `${domain}/articles/${article.id}`
    });
  } else {
    const cleanPrice = String(article.rakutenPrice || (article as any).price || '2480').replace(/[^0-9]/g, '') || '2480';
    const cleanUrl = getCleanAffiliateLink(article);

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: article.productName || article.title,
      image: [imageUrl],
      description: article.introText || article.description || article.title,
      sku: article.itemCode || article.id,
      mpn: article.itemCode || article.id,
      brand: {
        '@type': 'Brand',
        name: (article as any).brandName || 'Qualia Verified Pick'
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: (article.starRating || 4.8).toString(),
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: article.reviewerName || 'Qualia 美容分析室'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Qualia Navi'
        },
        reviewBody: (article.reviewBody || article.introText || '').slice(0, 500)
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (article.starRating || 4.8).toString(),
        reviewCount: (article.reviewCount || 120).toString(),
        bestRating: '5'
      },
      offers: {
        '@type': 'Offer',
        url: cleanUrl,
        priceCurrency: 'JPY',
        price: cleanPrice,
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock'
      }
    });
  }

  schemas.push(breadcrumbSchema);

  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return schemas;
}

/**
 * Generate BlogPosting + ItemList JSON-LD Schema for Feature / Blog Posts
 */
export function generateBlogJsonLd(
  post: BlogPost,
  domain = 'https://qualia-navi.vercel.app',
  recommendedItems: RakutenProductArticle[] = []
) {
  const coverImg = Array.isArray(post.coverImage) ? post.coverImage[0] : post.coverImage;
  const fullImg = coverImg && typeof coverImg === 'string' && coverImg.startsWith('http')
    ? coverImg
    : `${domain}${coverImg || '/og-image.png'}`;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.introText || post.subtitle,
    image: [fullImg],
    datePublished: post.createdAt || '2026-10-01',
    dateModified: post.createdAt || '2026-10-19',
    author: {
      '@type': 'Person',
      name: post.authorName || '橘 えりか',
      jobTitle: post.authorRole || 'コスメ＆美容編集長',
      image: post.authorAvatar
    },
    publisher: {
      '@type': 'Organization',
      name: 'Qualia Navi (クオリア・ナビ)',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/favicon.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${domain}/features/${post.id}`
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'コスメ図鑑TOP', item: domain },
      { '@type': 'ListItem', position: 2, name: '特集記事一覧', item: `${domain}/features` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${domain}/features/${post.id}` }
    ]
  };

  const schemas: any[] = [blogSchema, breadcrumbSchema];

  if (recommendedItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${post.title} 厳選おすすめアイテム一覧`,
      numberOfItems: recommendedItems.length,
      itemListElement: recommendedItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.productName || item.title,
        url: `${domain}/articles/${item.id}`
      }))
    });
  }

  return schemas;
}

export const generateBlogPostJsonLd = generateBlogJsonLd;

/**
 * Generate Article + ItemList + BreadcrumbList JSON-LD Schema for VS Comparison Pages
 */
export function generateComparisonJsonLd(
  comp: ProductComparison,
  itemA: RakutenProductArticle,
  itemB: RakutenProductArticle,
  domain = 'https://qualia-navi.vercel.app'
) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comp.title,
    description: comp.verdictSummary || comp.subtitle,
    image: [comp.coverImage || itemA.imageUrl],
    datePublished: comp.createdAt || '2026-10-01',
    dateModified: '2026-10-19',
    author: {
      '@type': 'Organization',
      name: 'Qualia 美容分析室'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Qualia Navi (クオリア・ナビ)',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/favicon.svg`
      }
    },
    mainEntityOfPage: `${domain}/comparisons/${comp.id}`
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: comp.title,
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: itemA.productName || itemA.title,
        url: `${domain}/articles/${itemA.id}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: itemB.productName || itemB.title,
        url: `${domain}/articles/${itemB.id}`
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'コスメ図鑑TOP', item: domain },
      { '@type': 'ListItem', position: 2, name: 'VS比較対決一覧', item: `${domain}/comparisons` },
      { '@type': 'ListItem', position: 3, name: comp.title, item: `${domain}/comparisons/${comp.id}` }
    ]
  };

  return [articleSchema, itemListSchema, breadcrumbSchema];
}

/**
 * Generate Person JSON-LD Schema for Authors
 */
export function generateAuthorJsonLd(
  author: AuthorProfile,
  domain = 'https://qualia-navi.vercel.app'
) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        image: author.avatarUrl,
        knowsAbout: [author.specialty, ...(author.subDepartments || []), 'コスメ', '美容', 'スキンケア']
      }
    }
  ];
}
