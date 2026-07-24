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

  let url = trimmed;
  // 楽天の画像URLについているサイズ指定パラメータ（例：?_ex=128x128）を削除して、
  // オリジナルの高画質画像を取得する
  if (url.includes('?_ex=')) {
    url = url.split('?')[0];
  }

  return url;
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
