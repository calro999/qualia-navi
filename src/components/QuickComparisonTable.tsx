import React from 'react';
import { RakutenProductArticle } from '../types';
import { getCleanAffiliateLink } from '../utils/productUtils';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { ShoppingCart, Star, Award, ArrowRight } from 'lucide-react';
import { useRakutenPromoMicrocopy } from './InlineProductCtaBox';

interface QuickComparisonTableProps {
  items: RakutenProductArticle[];
  title?: string;
  onNavigate?: (path: string) => void;
}

/**
 * 10選記事・特集記事の冒頭（1回目のCTAゾーン）に設置する即決比較早見表
 */
export function QuickComparisonTable({ items, title = '今回比較・検証した厳選コスメ早見表', onNavigate }: QuickComparisonTableProps) {
  const promo = useRakutenPromoMicrocopy();

  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 bg-white border-2 border-rose-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-200 shrink-0" />
          <h3 className="text-sm sm:text-base font-extrabold font-serif-brand">
            {title}（全{items.length}選）
          </h3>
        </div>
        <span className="text-[11px] bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full font-bold text-amber-100 self-start sm:self-auto">
          {promo.badge}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr className="bg-rose-50/70 border-b border-rose-100 text-[11px] font-extrabold text-slate-600">
              <th className="py-2.5 px-3 w-12 text-center">順位</th>
              <th className="py-2.5 px-3">コスメ名・主な特徴</th>
              <th className="py-2.5 px-3 w-24 text-center">評価・参考価格</th>
              <th className="py-2.5 px-3 w-40 text-center">最安値・詳細</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {items.slice(0, 10).map((item, idx) => {
              const cleanUrl = getCleanAffiliateLink(item);
              const name = item.productName || item.title;
              const rating = (typeof item.starRating === 'number' ? item.starRating : 4.8).toFixed(1);
              const highlightPoint =
                (item.pros && item.pros[0]) ||
                (item.features && item.features[0]) ||
                item.introText?.slice(0, 45) ||
                '高評価の注目コスメ';

              return (
                <tr key={item.id || idx} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-3 px-3 text-center align-middle">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-black text-xs shadow-2xs ${
                        idx === 0
                          ? 'bg-amber-400 text-slate-950'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-900'
                          : idx === 2
                          ? 'bg-amber-700/80 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-3 align-middle">
                    <div className="flex items-center gap-3">
                      <img
                        src={getRakutenOptimizedImageUrl(item.imageUrl)}
                        alt={name}
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                        onClick={() => onNavigate && onNavigate(`/articles/${item.id}`)}
                        className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <button
                          onClick={() => onNavigate && onNavigate(`/articles/${item.id}`)}
                          className="font-extrabold text-slate-900 hover:text-rose-600 transition-colors text-left line-clamp-1 font-serif-brand cursor-pointer"
                        >
                          {name}
                        </button>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          ✦ {highlightPoint}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center align-middle whitespace-nowrap">
                    <div className="inline-flex items-center gap-0.5 font-black text-amber-500 text-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {rating}
                    </div>
                    <div className="font-extrabold text-rose-600 text-xs mt-0.5">
                      {item.rakutenPrice || item.priceRange || 'オープン価格'}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center align-middle">
                    <div className="flex flex-col gap-1.5">
                      <a
                        href={cleanUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="rakuten-btn py-2 px-3 rounded-xl text-[11px] font-black text-center flex items-center justify-center gap-1 shadow-2xs hover:shadow transition-all whitespace-nowrap"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>楽天で見る ↗</span>
                      </a>
                      {onNavigate && (
                        <button
                          onClick={() => onNavigate(`/articles/${item.id}`)}
                          className="text-[10px] font-bold text-slate-500 hover:text-rose-600 flex items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <span>検証レビュー</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
