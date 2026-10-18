import React, { useMemo } from 'react';
import { RakutenProductArticle } from '../types';
import { getCleanAffiliateLink } from '../utils/productUtils';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { ShoppingCart, Star, CheckCircle2, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';

interface InlineProductCtaBoxProps {
  article: RakutenProductArticle;
  variant?: 'mid' | 'final';
}

/**
 * 現在の日付に応じた楽天市場のお得な日・ポイント還元マイクロコピーを生成
 */
export function useRakutenPromoMicrocopy() {
  return useMemo(() => {
    const now = new Date();
    const day = now.getDate();
    const dayOfWeek = now.getDay(); // 0: Sun, 6: Sat

    if (day % 5 === 0) {
      return {
        badge: '🔥 本日は「5と0のつく日」ポイントUP対象日！',
        subText: '楽天カード利用でポイント最大4倍チャンス・公式ショップの限定クーポンも要チェック',
        isHotDay: true
      };
    }
    if (day === 1) {
      return {
        badge: '🎉 本日は「ワンダフルデー」全ショップポイント3倍！',
        subText: '月初めのまとめ買い・リピート購入に最適なポイントアップ開催中',
        isHotDay: true
      };
    }
    if (day === 18) {
      return {
        badge: '👑 本日は「いちばの日」ご愛顧感謝デー最大4倍！',
        subText: '保有ポイントを使ったお買い物でもポイントが貯まる特別優待日',
        isHotDay: true
      };
    }
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        badge: '✨ 週末限定クーポン・ポイント還元チェック！',
        subText: '楽天市場の公式・正規取扱ショップで最新価格と在庫状況を確認',
        isHotDay: false
      };
    }
    return {
      badge: '💡 楽天ポイント還元＆送料無料ライン対象ショップ多数',
      subText: '楽天市場でリアルタイムの最安値・購入者レビュー・限定クーポンを確認',
      isHotDay: false
    };
  }, []);
}

export function InlineProductCtaBox({ article, variant = 'mid' }: InlineProductCtaBoxProps) {
  const promo = useRakutenPromoMicrocopy();
  const cleanUrl = getCleanAffiliateLink(article);
  const productName = article.productName || article.title;
  const rating = (typeof article.starRating === 'number' ? article.starRating : 4.8).toFixed(1);
  const price = article.rakutenPrice || article.priceRange || 'オープン価格';

  // ② 記事中盤（メリット・デメリット確認直後）のコンパクト＆高視認性インラインCTA
  if (variant === 'mid') {
    return (
      <div className="my-8 bg-gradient-to-r from-rose-50/90 via-white to-pink-50/90 border-2 border-rose-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={getRakutenOptimizedImageUrl(article.imageUrl)}
              alt={productName}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-white p-1.5 border border-rose-100 shrink-0 shadow-2xs"
            />
            <div className="space-y-1 flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold">
                <span>{promo.badge}</span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1 font-serif-brand">
                {productName}
              </h4>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 font-black text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {rating}
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-600 font-bold">
                  参考価格: <strong className="text-rose-600 text-sm">{price}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-end gap-1">
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-rose-200/80 hover:shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>楽天市場で最安値・在庫を見る</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-[10px] text-slate-500 font-medium">
              {promo.subText}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ③ 記事終盤（レビュー本文の読了直後・まとめ直下）の決定版ファイナルCTAボックス
  return (
    <div className="my-10 bg-gradient-to-br from-white via-rose-50/50 to-pink-50/70 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-5 border-b border-rose-200/80">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-600 text-white font-black text-xs rounded-full flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            検証まとめ・最終チェック
          </span>
          <span className="text-xs font-extrabold text-rose-800 bg-rose-100/90 px-2.5 py-1 rounded-full">
            {promo.badge}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
          Qualia 美容分析室 検証済みアイテム
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-4 flex justify-center">
          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-white p-4 border border-rose-100 shadow-xs flex items-center justify-center">
            <img
              src={getRakutenOptimizedImageUrl(article.imageUrl)}
              alt={productName}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-rose-600">
                {article.categoryLabel || article.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                総合評価 {rating} / 5.0
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif-brand leading-snug">
              {productName}
            </h3>
          </div>

          {/* こんな人におすすめ要約 */}
          {(article.pros && article.pros.length > 0) && (
            <div className="bg-white/90 rounded-2xl p-4 border border-rose-100 space-y-2">
              <div className="text-xs font-extrabold text-rose-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <span>特にこんな方におすすめ（購入の決め手）</span>
              </div>
              <ul className="grid grid-cols-1 gap-1.5">
                {article.pros.slice(0, 3).map((pro, i) => (
                  <li key={i} className="text-xs text-slate-700 font-semibold flex items-start gap-2">
                    <span className="text-rose-500 font-black">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 価格＆特大CTA */}
          <div className="pt-1 space-y-2.5">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-600 font-bold">
                楽天市場 参考最安値: <strong className="text-lg sm:text-xl font-black text-rose-600 ml-1">{price}</strong>
              </span>
              <span className="text-[11px] text-rose-600 font-extrabold">
                {promo.subText}
              </span>
            </div>

            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{article.ctaTitle || '楽天市場で最安値・口コミ・在庫をチェックする 👉'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
