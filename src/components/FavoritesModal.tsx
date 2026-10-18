import React, { useState, useEffect } from 'react';
import { RakutenProductArticle } from '../types';
import { getFavoriteIds, toggleFavorite } from '../utils/favorites';
import { getCleanAffiliateLink } from '../utils/productUtils';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { Heart, X, ShoppingCart, ExternalLink, Trash2, Swords, List, Star } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

export function FavoritesModal({ isOpen, onClose, articles, onNavigate }: FavoritesModalProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'compare'>('list');

  useEffect(() => {
    if (isOpen) {
      setFavoriteIds(getFavoriteIds());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      setFavoriteIds(getFavoriteIds());
    };
    window.addEventListener('qualia_favorites_updated', handleUpdate);
    return () => window.removeEventListener('qualia_favorites_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const favoriteArticles = articles.filter((a) =>
    favoriteIds.includes(a.id) || (a.itemCode && favoriteIds.includes(a.itemCode))
  );

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavoriteIds(getFavoriteIds());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-serif-brand">
                  キープ中のお気に入りコスメ ({favoriteArticles.length}件)
                </h3>
                <p className="text-[11px] text-slate-500">
                  気になるアイテムを保存して横並びでスペック・最安値比較ができます
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="sm:hidden w-8 h-8 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {favoriteArticles.length >= 2 && (
              <div className="flex bg-white p-1 rounded-xl border border-rose-200 shadow-2xs">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    viewMode === 'list' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:text-rose-600'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>リスト表示</span>
                </button>
                <button
                  onClick={() => setViewMode('compare')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    viewMode === 'compare' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-purple-600'
                  }`}
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>横並び比較表</span>
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="hidden sm:flex w-8 h-8 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {favoriteArticles.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-300">
                <Heart className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-700">キープされたコスメはまだありません</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                気になるコスメの「♡ キープ」ボタンを押すとここに保存され、複数アイテムのスペックや最安値を横並びで比較できます。
              </p>
            </div>
          ) : viewMode === 'compare' && favoriteArticles.length >= 2 ? (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left border-collapse min-w-[540px] text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 w-28 font-extrabold text-slate-600">比較項目</th>
                    {favoriteArticles.map((item) => (
                      <th key={item.id} className="p-3 min-w-[180px] border-l border-slate-200 align-top">
                        <div className="flex flex-col items-center text-center space-y-2">
                          <img
                            src={getRakutenOptimizedImageUrl(item.imageUrl)}
                            alt={item.productName || item.title}
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                            onClick={() => {
                              onNavigate(`/articles/${item.id}`);
                              onClose();
                            }}
                            className="w-20 h-20 object-contain bg-white rounded-xl p-1 border border-slate-100 cursor-pointer hover:scale-105 transition-transform"
                          />
                          <button
                            onClick={() => {
                              onNavigate(`/articles/${item.id}`);
                              onClose();
                            }}
                            className="font-extrabold text-slate-900 hover:text-rose-600 line-clamp-2 font-serif-brand cursor-pointer"
                          >
                            {item.productName || item.title}
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 bg-slate-50/70 font-bold text-slate-700">参考最安値</td>
                    {favoriteArticles.map((item) => (
                      <td key={item.id} className="p-3 text-center border-l border-slate-100 font-black text-rose-600 text-sm">
                        {item.rakutenPrice || item.priceRange || 'オープン価格'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50/70 font-bold text-slate-700">総合評価</td>
                    {favoriteArticles.map((item) => (
                      <td key={item.id} className="p-3 text-center border-l border-slate-100">
                        <span className="inline-flex items-center gap-1 font-black text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {(typeof item.starRating === 'number' ? item.starRating : 4.8).toFixed(1)}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50/70 font-bold text-slate-700">メリット・強み</td>
                    {favoriteArticles.map((item) => (
                      <td key={item.id} className="p-3 border-l border-slate-100 align-top">
                        <ul className="space-y-1 text-slate-700">
                          {(item.pros || item.features || [item.introText]).slice(0, 3).map((p, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-rose-500 font-bold">✓</span>
                              <span className="line-clamp-2">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50/70 font-bold text-slate-700">注意点</td>
                    {favoriteArticles.map((item) => (
                      <td key={item.id} className="p-3 border-l border-slate-100 align-top text-slate-500">
                        {(item.cons && item.cons[0]) || '特になし（肌質に合わせて使用量を調整）'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50/70 font-bold text-slate-700">最安値チェック</td>
                    {favoriteArticles.map((item) => (
                      <td key={item.id} className="p-3 border-l border-slate-100 text-center">
                        <a
                          href={getCleanAffiliateLink(item)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="rakuten-btn w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>楽天で見る ↗</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            favoriteArticles.map((item) => {
              const cleanUrl = getCleanAffiliateLink(item);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(`/articles/${item.id}`);
                    onClose();
                  }}
                  className="bg-white hover:bg-rose-50/30 p-4 rounded-2xl border border-slate-200 hover:border-rose-200 transition-all flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
                    <img
                      src={getRakutenOptimizedImageUrl(item.imageUrl)}
                      alt={item.productName || item.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-16 h-16 rounded-xl object-contain bg-slate-50 p-1 border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                          {item.categoryLabel || item.category}
                        </span>
                        <span className="flex items-center gap-0.5 text-[11px] font-black text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {(typeof item.starRating === 'number' ? item.starRating : 4.8).toFixed(1)}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-rose-600 transition-colors mt-1 font-serif-brand">
                        {item.productName || item.title}
                      </h4>
                      <p className="text-xs font-black text-rose-600 mt-0.5">
                        {item.rakutenPrice || item.priceRange}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                    <a
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      onClick={(e) => e.stopPropagation()}
                      className="rakuten-btn py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs hover:shadow"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>楽天で見る</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={(e) => handleRemove(item.id, e)}
                      title="お気に入りから削除"
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-rose-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            {favoriteArticles.length >= 2 && viewMode === 'list'
              ? '💡 右上の「横並び比較表」ボタンを押すとスペックを一括比較できます'
              : '※ 保存データはお使いのブラウザに保存されます'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
