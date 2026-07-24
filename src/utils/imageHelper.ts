import React from 'react';

/**
 * 楽天市場の各種画像URLをブラウザで100%表示可能な形式に最適化
 */
export function getRakutenOptimizedImageUrl(rawUrl: string): string {
  if (!rawUrl) {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80';
  }

  let url = rawUrl.strip ? rawUrl.strip() : rawUrl.trim();

  // 1. thumbnail.image.rakuten.co.jp/@0_mall/SHOP/cabinet/...
  if (url.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
    let cleaned = url.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/');
    if (cleaned.includes('?_ex=')) {
      cleaned = cleaned.split('?_ex=')[0];
    }
    return cleaned;
  }

  // 2. tshop.r10s.jp
  if (url.includes('tshop.r10s.jp/')) {
    return url.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
  }

  // 3. image.rakuten.co.jp
  if (url.includes('image.rakuten.co.jp/@0_mall/')) {
    return url.replace('https://image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/');
  }

  return url;
}

/**
 * 画像読み込みエラー（404/403）時の安全なフォールバック
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
) {
  const target = e.currentTarget;
  if (target.dataset.hasError === 'true') {
    return;
  }
  target.dataset.hasError = 'true';
  target.src = fallbackSrc;
}
