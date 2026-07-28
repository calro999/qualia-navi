import { RakutenProductArticle, BlogPost, AuthorProfile } from '../types';

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
  const urlPath = config.urlPath || window.location.pathname;
  const fullUrl = `https://qualia-navi.vercel.app${urlPath}`;
  const fullImage = config.imageUrl
    ? (config.imageUrl.startsWith('http') ? config.imageUrl : `https://qualia-navi.vercel.app${config.imageUrl}`)
    : 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80';

  // 1. Update Document Title
  document.title = `${config.title} | Qualia Navi コスメ＆美容トレンドナビ`;

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
  setMeta('meta[name="keywords"]', 'name', 'keywords', 'Qualia Navi,クオリアナビ,コスメ,美容,スキンケア,UVケア,韓国コスメ,デパコス,プチプラ,楽天市場,コスメランキング');
  setMeta('meta[name="author"]', 'name', 'author', 'Qualia 美容分析室');

  // Open Graph (OGP) Meta Tags
  setMeta('meta[property="og:title"]', 'property', 'og:title', config.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMeta('meta[property="og:image"]', 'property', 'og:image', fullImage);
  setMeta('meta[property="og:type"]', 'property', 'og:type', urlPath.startsWith('/blogs') ? 'article' : 'website');
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Qualia Navi (クオリア・ナビ)');
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'ja_JP');

  // Twitter Cards
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
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
 * Generate Product and Review JSON-LD Schema for Product Detail Page
 */
export function generateProductJsonLd(
  article: RakutenProductArticle,
  domain = 'https://qualia-navi.vercel.app'
) {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: article.productName || article.title,
    image: [article.imageUrl.startsWith('http') ? article.imageUrl : `${domain}${article.imageUrl}`],
    description: article.introText,
    sku: article.itemCode || article.id,
    mpn: article.itemCode || article.id,
    brand: {
      '@type': 'Brand',
      name: 'Rakuten Pick'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: article.starRating.toString(),
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
      reviewBody: article.reviewBody
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: article.starRating.toString(),
      reviewCount: (article.reviewCount || 100).toString(),
      description: '楽天市場での実際のユーザー評価に基づく平均スコア',
      url: article.affiliateLink
    },
    offers: {
      '@type': 'Offer',
      url: article.affiliateLink,
      priceCurrency: 'JPY',
      price: article.rakutenPrice || '3980',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.productName || article.title,
        item: `${domain}/articles/${article.id}`
      }
    ]
  };

  const schemas: any[] = [productSchema, breadcrumbSchema];

  if (article.faqs && article.faqs.length > 0) {
    const faqSchema = {
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
    };
    schemas.push(faqSchema);
  }

  return schemas;
}

/**
 * Generate BlogPosting JSON-LD Schema for Blog Posts
 */
export function generateBlogJsonLd(
  post: BlogPost,
  domain = 'https://qualia-navi.vercel.app'
) {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.introText,
    image: [post.coverImage.startsWith('http') ? post.coverImage : `${domain}${post.coverImage}`],
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: {
      '@type': 'Person',
      name: post.authorName,
      jobTitle: post.authorRole,
      image: post.authorAvatar
    },
    publisher: {
      '@type': 'Organization',
      name: 'Qualia Navi (クオリア・ナビ)',
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${domain}/blogs/${post.id}`
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.blog-intro', '.blog-content']
    }
  };

  return [blogSchema];
}

export const generateBlogPostJsonLd = generateBlogJsonLd;

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
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: author.avatarUrl,
      knowsAbout: [author.specialty, 'コスメ', '美容', 'スキンケア']
    }
  ];
}

/**
 * Generate Organization JSON-LD Schema for the site
 */
export function generateOrganizationJsonLd(domain = 'https://qualia-navi.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Qualia Navi (クオリア・ナビ)',
    url: domain,
    logo: `${domain}/images/logo.png`,
    description: '最新のコスメ・デパコス・プチプラ・UVケアなどの美容系アイテムを本音で検証・解説する専門メディア',
    sameAs: [
      // Add social links here if available
    ]
  };
}

/**
 * Generate WebSite + SearchAction JSON-LD Schema
 */
export function generateWebSiteJsonLd(domain = 'https://qualia-navi.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Qualia Navi (クオリア・ナビ)',
    url: domain,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${domain}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate ItemList JSON-LD Schema for category/list pages
 */
export function generateItemListJsonLd(articles: any[], listUrl: string = 'https://qualia-navi.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: listUrl,
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        url: `${listUrl}/articles/${article.id}`,
        name: article.productName || article.title,
        image: article.imageUrl
      }
    }))
  };
}

/**
 * Generate HowTo JSON-LD Schema for tutorial content
 */
export function generateHowToJsonLd(steps: { name: string; text: string; image?: string; url?: string }[], title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    step: steps.map((step, index) => {
      const stepData: any = {
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text
      };
      if (step.image) stepData.image = step.image;
      if (step.url) stepData.url = step.url;
      return stepData;
    })
  };
}
