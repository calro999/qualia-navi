import { useState, useEffect } from 'react';
import { RakutenProductArticle } from '../types';
import { getFavoriteIds, toggleFavorite } from '../utils/favorites';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { Heart, X, ShoppingCart, ExternalLink, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

export function FavoritesModal({ isOpen, onClose, articles, onNavigate }: FavoritesModalProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

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
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 font-serif-brand">
                お気に入りコスメ・保存リスト
              </h3>
              <p className="text-[11px] text-slate-500">
                気になるアイテムをキープ中 ({favoriteArticles.length}件)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {favoriteArticles.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-300">
                <Heart className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-700">お気に入りに登録されたコスメはありません</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                商品詳細ページや一覧で「♡ お気に入り」を押すとここにキープされます。
              </p>
            </div>
          ) : (
            favoriteArticles.map((item) => (
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
                    <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-rose-600 transition-colors mt-1">
                      {item.productName || item.title}
                    </h4>
                    <p className="text-xs font-black text-rose-600 mt-0.5">
                      {item.rakutenPrice || item.priceRange}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <a
                    href={item.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-rose-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>※ 保存データはお使いのブラウザに保存されます</span>
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
