import { useState, useMemo, useEffect } from 'react';
import { RakutenProductArticle } from '../types';
import { CATEGORIES, INITIAL_COMPARISONS } from '../data';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, ShoppingCart, ExternalLink, Star, Search } from 'lucide-react';

interface ProductListPageProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductListPage({ articles, onNavigate }: ProductListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updateSeoGeoMetadata({
      title: 'Qualia Navi (クオリア・ナビ) - 最新コスメ＆美容トレンド比較ガイド',
      description: '楽天市場で高評価の最新スキンケア、デパコス・プチプラ、話題の韓国コスメを徹底検証！',
      urlPath: '/'
    });
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat =
        selectedCategory === 'all' || art.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.productName && art.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.introText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Hero Section (Pastel Sky & Purple Aesthetic) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>2026 BEAUTY & COSMETICS NAVI</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight">
            透明感を研ぎ澄ます。<br className="hidden sm:inline" />話題のコスメ＆美容トレンドナビ
          </h1>
          <p className="text-sky-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            楽天市場でリアルに売れている最新スキンケア・デパコス・韓国コスメをお届け。最安値＆ポイント還元情報をリアルタイムナビゲート。
          </p>
        </div>
      </div>

      {/* VS Comparison Featured Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2 border-l-4 border-purple-500 pl-3">
            <span>⚔️ ガチンコ美容検証・ガチンコ対決</span>
          </h2>
          <span className="text-xs text-purple-600 font-bold">
            目的別で徹底選定
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INITIAL_COMPARISONS.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/compare/${comp.id}`)}
              className="qualia-glass-card p-5 rounded-2xl cursor-pointer transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 bg-purple-100 text-purple-700 text-[11px] font-bold rounded-md">
                  {comp.targetUserCategory}
                </span>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug group-hover:text-purple-600 transition-colors">
                  {comp.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-sky-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">
                <span>VS勝者と徹底検証結果を見る</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-sky-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-gradient-to-r from-sky-500 to-purple-600 text-white shadow-md'
                    : 'bg-sky-50/70 text-slate-600 hover:bg-sky-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="コスメ名・キーワードで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-sky-100 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Product Grid - Mobile First Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="qualia-glass-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image & Badges */}
            <div 
              className="relative aspect-[4/3] bg-sky-50 overflow-hidden cursor-pointer"
              onClick={() => onNavigate(`/articles/${art.id}`)}
            >
              <img
                src={getRakutenOptimizedImageUrl(art.imageUrl)}
                alt={art.productName || art.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {art.isHallOfFame && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-extrabold text-[11px] rounded-lg shadow-md flex items-center gap-1">
                  👑 殿堂入りコスメ
                </span>
              )}

              <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 text-amber-500 font-black text-xs rounded-md shadow-xs flex items-center gap-0.5 backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {art.starRating.toFixed(1)}
              </span>
            </div>

            {/* Product Info & Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div 
                className="space-y-2 cursor-pointer"
                onClick={() => onNavigate(`/articles/${art.id}`)}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
                    {art.categoryLabel || art.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-800 text-base leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                  {art.productName || art.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {art.introText}
                </p>
              </div>

              {/* Price & Rakuten Direct Affiliate Link CTA */}
              <div className="pt-3 border-t border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">楽天市場参考価格:</span>
                  <span className="text-sm font-extrabold text-purple-700">{art.rakutenPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl transition text-center"
                  >
                    詳細を見る
                  </button>
                  <a
                    href={art.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rakuten-btn py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>楽天でチェック</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 qualia-glass-card rounded-3xl">
          <p className="text-slate-500 font-bold text-sm">
            検索条件に一致するコスメ・美容アイテムが見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
}
