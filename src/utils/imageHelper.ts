import React from 'react';

/**
 * 楽天市場の画像URLを最適化して返却
 * 不要なドメイン書き換えによる404エラーを回避し、有効な画像URLをそのまま安全に使用します。
 */
export function getRakutenOptimizedImageUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80';
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80';
  }

  // URL末尾の不要なリサイズクエリ (?_ex=...) があれば削除してオリジナル高画質画像を取得
  if (trimmed.includes('?_ex=')) {
    return trimmed.split('?_ex=')[0];
  }

  return trimmed;
}

/**
 * 画像読み込みエラー（404/403）発生時の確実な自動フォールバック処理
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
