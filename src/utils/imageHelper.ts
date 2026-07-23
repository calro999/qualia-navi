import React from 'react';

/**
 * 楽天市場の各種画像ドメイン（thumbnail.image.rakuten.co.jp, tshop.r10s.jp 等）を
 * ブラウザで直リンクエラー（404/403）を起こさずに表示できる確定CDNドメイン（shop.r10s.jp）等に変換・最適化します。
 */
export function getRakutenOptimizedImageUrl(rawUrl: string): string {
  if (!rawUrl) {
    return 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80';
  }

  // 1. thumbnail.image.rakuten.co.jp/@0_mall/SHOP/cabinet/PATH を shop.r10s.jp/SHOP/cabinet/PATH に変換
  if (rawUrl.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
    let cleaned = rawUrl.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/');
    if (cleaned.includes('?_ex=')) {
      cleaned = cleaned.split('?_ex=')[0];
    }
    return cleaned;
  }

  // 2. tshop.r10s.jp/SHOP/cabinet/PATH を shop.r10s.jp/SHOP/cabinet/PATH に変換
  if (rawUrl.includes('tshop.r10s.jp/')) {
    return rawUrl.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
  }

  // 3. image.rakuten.co.jp/@0_mall/SHOP/cabinet/PATH を shop.r10s.jp/SHOP/cabinet/PATH に変換
  if (rawUrl.includes('image.rakuten.co.jp/@0_mall/')) {
    return rawUrl.replace('https://image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/');
  }

  return rawUrl;
}

/**
 * 画像読み込みエラー時のフォールバック処理
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80'
) {
  const target = e.currentTarget;
  if (target.dataset.hasError === 'true') {
    return;
  }
  target.dataset.hasError = 'true';
  target.src = fallbackSrc;
}
