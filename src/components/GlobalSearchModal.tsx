import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RakutenProductArticle } from '../types';
import { INITIAL_BLOG_POSTS, INITIAL_COMPARISONS } from '../data';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { Search, X, Sparkles, Swords, ShoppingBag, Flame, Star, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

const TRENDING_KEYWORDS = [
  'クリスマスコフレ',
  'ホリデーギフト',
  'アドベントカレンダー',
  'セラミド',
  '導入美容液',
  'ハンドクリーム',
  '入浴剤',
  'アイクリーム',
  '美顔器',
  'ドライヤー',
  'リップモンスター',
  'リードルショット',
];

export function GlobalSearchModal({ isOpen, onClose, articles, onNavigate }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return { products: [], features: [], comparisons: [] };
    }

    const products = articles
      .filter(
        (a) =>
          !a.isContentArticle &&
          !a.id.includes('10sen') &&
          !(a.title && a.title.includes('10選')) &&
          (`${a.productName || ''} ${a.title || ''} ${a.introText || ''} ${a.categoryLabel || ''} ${(a.tags || []).join(' ')}`
            .toLowerCase()
            .includes(normalizedQuery))
      )
      .slice(0, 6);

    const blogFeatures = INITIAL_BLOG_POSTS.filter((b) =>
      `${b.title} ${b.subtitle || ''} ${b.introText || ''}`.toLowerCase().includes(normalizedQuery)
    )
      .slice(0, 4)
      .map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle || b.introText,
        image: b.coverImage,
        path: `/features/${b.id}`,
      }));

    const contentFeatures = articles
      .filter(
        (a) =>
          ((a as any).isContentArticle || a.id.includes('10sen') || a.title.includes('10選')) &&
          `${a.title || ''} ${a.introText || ''} ${a.description || ''}`.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 4)
      .map((a) => ({
        id: a.id,
        title: a.title,
        subtitle: a.introText || a.description || '',
        image: a.imageUrl,
        path: `/articles/${a.id}`,
      }));

    const features = [...blogFeatures, ...contentFeatures].slice(0, 5);

    const comparisons = INITIAL_COMPARISONS.filter((c) =>
      `${c.title} ${c.subtitle || ''} ${c.targetUserCategory || ''}`.toLowerCase().includes(normalizedQuery)
    ).slice(0, 4);

    return { products, features, comparisons };
  }, [articles, normalizedQuery]);

  if (!isOpen) return null;

  const totalMatches = results.products.length + results.features.length + results.comparisons.length;

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[82vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center gap-3 bg-rose-50/40">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="コスメ名・ブランド・成分（レチノール、CICA等）・お悩みで横断検索..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-lg bg-slate-100 font-bold cursor-pointer"
            >
              クリア
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trending Tags */}
        <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-extrabold text-rose-600 flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 fill-rose-500" />
            人気ワード:
          </span>
          {TRENDING_KEYWORDS.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer border ${
                query === kw
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-200'
              }`}
            >
              #{kw}
            </button>
          ))}
        </div>

        {/* Search Results Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {!normalizedQuery ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                上の人気ワードをタップするか、気になるコスメ名・成分を入力してください
              </p>
              <p className="text-[11px] text-slate-400">
                コスメ図鑑（3,074件）・特集10選（315件）・VS比較対決（229件）を一括検索します
              </p>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-bold text-slate-700">
                「{query}」に一致する記事が見つかりませんでした
              </p>
              <p className="text-xs text-slate-400">
                別のキーワードや上のトレンドタグから再度お試しください
              </p>
            </div>
          ) : (
            <>
              {/* Products */}
              {results.products.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
                      <span>個別コスメ検証レビュー</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {results.products.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect(`/articles/${art.id}`)}
                        className="p-3 rounded-2xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/30 flex items-center gap-3 cursor-pointer transition group"
                      >
                        <img
                          src={getRakutenOptimizedImageUrl(art.imageUrl)}
                          alt={art.productName || art.title}
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                          className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-100 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 truncate font-serif-brand">
                            {art.productName || art.title}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            <span className="font-black text-amber-500 flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {(art.starRating || 4.8).toFixed(1)}
                            </span>
                            <span className="font-extrabold text-rose-600">{art.rakutenPrice}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparisons */}
              {results.comparisons.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                    <Swords className="w-3.5 h-3.5 text-purple-600" />
                    <span>VSガチンコ対決比較</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {results.comparisons.map((comp) => (
                      <div
                        key={comp.id}
                        onClick={() => handleSelect(`/comparisons/${comp.id}`)}
                        className="p-3 rounded-2xl border border-purple-100 hover:border-purple-300 bg-purple-50/20 hover:bg-purple-50/50 flex items-center justify-between gap-3 cursor-pointer transition group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-purple-600 text-white font-black text-[10px] rounded">
                              VS対決
                            </span>
                            <span className="text-[10px] font-bold text-purple-700">
                              {comp.targetUserCategory}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-purple-700 truncate mt-1 font-serif-brand">
                            {comp.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {results.features.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>特集・厳選10選ガイド</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {results.features.map((feat) => (
                      <div
                        key={feat.id}
                        onClick={() => handleSelect(feat.path)}
                        className="p-3 rounded-2xl border border-amber-100 hover:border-amber-300 bg-amber-50/20 hover:bg-amber-50/50 flex items-center justify-between gap-3 cursor-pointer transition group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-amber-800 line-clamp-1 font-serif-brand">
                            {feat.title}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {feat.subtitle}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
