import React, { useMemo } from 'react';
import { INITIAL_ARTICLES, INITIAL_BLOG_POSTS, INITIAL_COMPARISONS } from '../data';
import { ArrowRight, Sparkles, Swords, BookOpen, Star } from 'lucide-react';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';

interface InternalLinkMeshProps {
  currentArticleId: string;
  category: string;
  onNavigate?: (path: string) => void;
}

export function InternalLinkMesh({ currentArticleId, category, onNavigate }: InternalLinkMeshProps) {
  const currentArticle = useMemo(() => {
    return INITIAL_ARTICLES.find(a => a.id === currentArticleId || a.itemCode === currentArticleId);
  }, [currentArticleId]);

  // 1. この商品が登場する比較記事（VS対決）を最優先で抽出
  const directComparisons = useMemo(() => {
    const itemCode = currentArticle?.itemCode || currentArticleId;
    return INITIAL_COMPARISONS.filter(c => 
      c.productItemCodeA === itemCode || 
      c.productItemCodeB === itemCode || 
      c.productItemCodeA === currentArticleId || 
      c.productItemCodeB === currentArticleId ||
      c.title.includes(currentArticle?.productName || '') ||
      c.title.includes(currentArticle?.title?.slice(0, 8) || '')
    );
  }, [currentArticle, currentArticleId]);

  // 関連する比較記事（該当商品が直接ない場合は同一カテゴリから抽出）
  const displayedComparisons = useMemo(() => {
    if (directComparisons.length >= 2) {
      return directComparisons.slice(0, 3);
    }
    const additional = INITIAL_COMPARISONS.filter(c => !directComparisons.includes(c));
    return [...directComparisons, ...additional].slice(0, 3);
  }, [directComparisons]);

  // 2. 同一カテゴリの関連コスメ（最大4件）
  const relatedArticles = useMemo(() => {
    return INITIAL_ARTICLES
      .filter(a => a.category === category && a.id !== currentArticleId)
      .slice(0, 4);
  }, [category, currentArticleId]);

  // 3. 関連する特集記事（最大2件）
  const relatedFeatures = useMemo(() => {
    return INITIAL_BLOG_POSTS.slice(0, 2);
  }, []);

  const handleClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-rose-100 space-y-12">
      {/* ⚔️ VS対決比較セクション (このコスメが登場する比較 or 注目比較) */}
      {displayedComparisons.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Swords className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
                  {directComparisons.length > 0 ? 'このコスメが登場するガチンコ対決比較' : '注目のガチンコVS対決比較'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  プロアナリストが使用感・成分・コスパを直接対決検証
                </p>
              </div>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/comparisons')}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
              >
                <span>比較一覧 (全227件)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {displayedComparisons.map((comp) => (
              <a
                key={comp.id}
                href={`/comparisons/${comp.id}`}
                onClick={(e) => handleClick(e, `/comparisons/${comp.id}`)}
                className="bg-white rounded-2xl p-4 border border-purple-100 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src={comp.coverImage}
                      alt={comp.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-white font-extrabold text-[10px] rounded-md shadow-xs">
                      VS対決
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mb-1">
                      {comp.targetUserCategory}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors font-serif-brand">
                      {comp.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>勝者判定を見る</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 🛍️ あわせて読みたい関連コスメ */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
                同カテゴリの注目コスメ
              </h3>
              <p className="text-[11px] text-slate-500">
                あわせて比較検討したい実力派アイテム
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedArticles.map((art) => (
              <a
                key={art.id}
                href={`/articles/${art.id}`}
                onClick={(e) => handleClick(e, `/articles/${art.id}`)}
                className="bg-white rounded-2xl p-3.5 border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                    <img
                      src={getRakutenOptimizedImageUrl(art.imageUrl)}
                      alt={art.productName || art.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-white/90 text-amber-500 font-black text-[10px] rounded-md flex items-center gap-0.5 shadow-2xs">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {(art.starRating || 4.8).toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                      {art.categoryLabel || art.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors mt-1">
                      {art.productName || art.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-rose-600">{art.rakutenPrice || art.priceRange}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-600 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 📖 編集部おすすめ特集記事 */}
      {relatedFeatures.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
                  編集部おすすめ特集記事
                </h3>
                <p className="text-[11px] text-slate-500">
                  プロがまとめる最新トレンド・選び方
                </p>
              </div>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/features')}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                <span>特集一覧</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedFeatures.map((feat) => (
              <a
                key={feat.id}
                href={`/features/${feat.id}`}
                onClick={(e) => handleClick(e, `/features/${feat.id}`)}
                className="bg-white rounded-2xl p-4 border border-amber-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex gap-4 items-center group cursor-pointer"
              >
                <img
                  src={feat.coverImage}
                  alt={feat.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    特集レポート
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors font-serif-brand">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {feat.subtitle || feat.introText}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
