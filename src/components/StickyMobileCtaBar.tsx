import React, { useState, useEffect } from 'react';
import { ShoppingCart, ExternalLink, Zap } from 'lucide-react';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { useRakutenPromoMicrocopy } from './InlineProductCtaBox';

interface StickyMobileCtaBarProps {
  title: string;
  imageUrl: string;
  price?: string;
  affiliateUrl: string;
  pointRate?: string;
}

/**
 * スマートフォン閲覧時（スクロール時）に画面下部に常駐する超高CVRフローティングCTAバー
 * ユーザーがページを読み進めている間、いつでも1タップで楽天市場の最安値・在庫確認へ誘導
 */
export function StickyMobileCtaBar({
  title,
  imageUrl,
  price = '最安値をチェック',
  affiliateUrl,
  pointRate
}: StickyMobileCtaBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const promo = useRakutenPromoMicrocopy();

  useEffect(() => {
    const handleScroll = () => {
      // 画面上部から300px以上スクロールした時に表示
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside 
      id="qualia-mobile-cta"
      aria-label="楽天市場 最安値確認クイックバー"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-rose-500 shadow-2xl p-2.5 sm:hidden transition-transform duration-300 animate-slide-up"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-12 h-12 rounded-xl bg-slate-50 p-1 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src={getRakutenOptimizedImageUrl(imageUrl)}
            alt={title}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-600 truncate">
            <Zap className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />
            <span className="truncate">{promo.badge.replace(/^[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/, '')}</span>
          </div>
          <p className="text-xs font-black text-slate-900 truncate">
            {title}
          </p>
          <div className="text-[11px] font-extrabold text-rose-600">
            {price}
          </div>
        </div>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-black text-xs rounded-xl shadow-md shadow-rose-300 flex items-center gap-1 active:scale-95 transition-transform"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>楽天で見る</span>
        </a>
      </div>
    </aside>
  );
}
