import React from 'react';

/**
 * 商品画像URLの取得と安全性チェック
 */
export function getRakutenOptimizedImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return '/images/products/decorte_liposome.jpg';
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return '/images/products/decorte_liposome.jpg';
  }

  return trimmed;
}

/**
 * 画像読み込みエラー発生時のローカル本物画像フォールバック処理
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = '/images/products/decorte_liposome.jpg'
) {
  const target = e.currentTarget;
  if (target.dataset.hasError === 'true') {
    return;
  }
  target.dataset.hasError = 'true';
  target.src = fallbackSrc;
}
