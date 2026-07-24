import { useState, useMemo, useEffect } from 'react';
import { RakutenProductArticle } from '../types';
import { CATEGORIES, INITIAL_COMPARISONS } from '../data';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, ShoppingCart, ExternalLink, Star, Search, ShieldCheck } from 'lucide-react';

interface ProductListPageProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductListPage({ articles, onNavigate }: ProductListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updateSeoGeoMetadata({
      title: 'Qualia Navi (クオリア・ナビ) - デパコス＆厳選美容アイテム比較ガイド',
      description: '楽天市場で高評価の最新デパコス、スキンケア、話題の韓国コスメをQualia美容分析室（12名）が徹底検証！',
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
    <div className="space-y-10 pb-16">
      {/* Hero Section (Haute-Couture Luxury Cosmetic Styling) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 font-serif-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 LUXURY BEAUTY & COSMETICS SELECTION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-wide font-serif-brand qualia-gold-text">
            透明感を研ぎ澄ます。<br className="hidden sm:inline" />最高峰デパコス＆美容ナビ
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
            Qualia 美容分析室（統括編集長・美容編集長・日本人コスメコレクター10名）が実地テスト。楽天市場のリアルタイム最安値＆公式限定ポイント還元情報をナビゲートします。
          </p>
        </div>
      </div>

      {/* VS Comparison Featured Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-amber-200 flex items-center gap-2.5 border-l-4 border-amber-400 pl-3">
            <span>⚔️ ガチンコ美容検証・デパコス vs 韓国コスメ比較</span>
          </h2>
          <span className="text-xs text-amber-400 font-bold font-serif-brand">
            目的別で徹底選定
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INITIAL_COMPARISONS.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/compare/${comp.id}`)}
              className="qualia-glass-card p-6 rounded-2xl cursor-pointer hover:border-amber-400/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block px-3 py-0.5 qualia-gold-gradient text-slate-950 text-[11px] font-black rounded-md">
                  {comp.targetUserCategory}
                </span>
                <h3 className="font-bold text-slate-100 text-base leading-snug group-hover:text-amber-300 transition-colors font-serif-brand">
                  {comp.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>VS勝者と徹底検証結果を見る</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="qualia-glass-card p-5 rounded-2xl border border-amber-500/20 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'gold-btn'
                    : 'bg-slate-900/80 text-amber-100/70 hover:bg-slate-800 border border-amber-500/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="コスメ名・キーワード検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950/90 border border-amber-500/30 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="qualia-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-amber-400/60 transition-all duration-300"
          >
            {/* Product Image & Badges */}
            <div 
              className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer border-b border-amber-500/20"
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
                <span className="absolute top-3 left-3 px-3 py-1 qualia-gold-gradient text-slate-950 font-black text-[11px] rounded-lg shadow-lg flex items-center gap-1">
                  👑 殿堂入りコスメ
                </span>
              )}

              <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-slate-950/90 text-amber-300 font-black text-xs rounded-md border border-amber-500/30 shadow-xs flex items-center gap-1 backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {art.starRating.toFixed(1)}
              </span>
            </div>

            {/* Product Info & Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div 
                className="space-y-2 cursor-pointer"
                onClick={() => onNavigate(`/articles/${art.id}`)}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                    {art.categoryLabel || art.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                    <ShieldCheck className="w-3 h-3 text-amber-400" /> {art.reviewerName || 'Qualia 美容分析室'}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-100 text-base leading-snug group-hover:text-amber-300 transition-colors line-clamp-2 font-serif-brand">
                  {art.productName || art.title}
                </h3>
                <p className="text-xs text-slate-300/80 leading-relaxed line-clamp-2">
                  {art.introText}
                </p>
              </div>

              {/* Price & Rakuten Direct Affiliate Link CTA */}
              <div className="pt-4 border-t border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">楽天市場参考価格:</span>
                  <span className="font-extrabold text-amber-300 text-sm">{art.rakutenPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-amber-200 font-bold text-xs rounded-xl border border-amber-500/20 transition text-center"
                  >
                    詳細レビュー
                  </button>
                  <a
                    href={art.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rakuten-btn py-2.5 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>楽天で見る</span>
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
          <p className="text-slate-400 font-bold text-sm">
            検索条件に一致するデパコス・美容アイテムが見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
}
