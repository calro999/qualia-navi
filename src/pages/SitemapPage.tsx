import { useState, useMemo, useEffect } from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_COMPARISONS, INITIAL_ARTICLES, CATEGORIES } from '../data';
import { ChevronRight, Map as MapIcon, BookOpen, Sparkles, ShoppingBag, Search, Filter } from 'lucide-react';
import { RakutenProductArticle } from '../types';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export function SitemapPage({ onNavigate }: SitemapPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(60);

  useEffect(() => {
    updateSeoGeoMetadata({
      title: 'サイトマップ・全記事インデックス | Qualia Navi',
      description: 'Qualia Navi (クオリア・ナビ) のコスメ図鑑、特集記事、VS徹底比較、アナリスト紹介等の全ページ・全カテゴリ一覧。',
      urlPath: '/sitemap',
      jsonLdSchema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'コスメ図鑑TOP', item: 'https://qualia-navi.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'サイトマップ', item: 'https://qualia-navi.vercel.app/sitemap' }
        ]
      }
    });
  }, []);

  // INITIAL_ARTICLES (すでにcatalog.jsonから全3,500+件が軽量にロードされている)
  const articlesList: RakutenProductArticle[] = useMemo(() => {
    return Array.isArray(INITIAL_ARTICLES) ? INITIAL_ARTICLES : [];
  }, []);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return articlesList.filter(art => {
      const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const titleMatch = (art.title || '').toLowerCase().includes(q);
      const prodMatch = (art.productName || '').toLowerCase().includes(q);
      return titleMatch || prodMatch;
    });
  }, [articlesList, selectedCategory, searchQuery]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl shadow-xs">
          <MapIcon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 font-serif-brand">サイトマップ</h1>
          <p className="text-slate-500 text-sm mt-0.5">Qualia Naviの全コンテンツ・特集記事・比較検証・コスメ図鑑インデックス</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-10">
        {/* Features section */}
        <section className="bg-white p-6 sm:p-7 rounded-2xl shadow-xs border border-rose-100 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4 border-b border-rose-100/70 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">美肌＆コスメ特集記事 ({INITIAL_BLOG_POSTS.length}件)</h2>
            </div>
            <button
              onClick={() => onNavigate('/features')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 cursor-pointer"
            >
              特集TOP
            </button>
          </div>
          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {INITIAL_BLOG_POSTS.map(post => (
              <button
                key={post.id}
                onClick={() => onNavigate(`/features/${post.id}`)}
                className="w-full text-left hover:text-rose-600 hover:bg-rose-50/50 p-2 rounded-lg transition-colors flex items-start gap-2 group text-xs text-slate-700 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 mt-0.5 shrink-0" />
                <span className="line-clamp-2 leading-relaxed font-medium">{post.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Comparisons section */}
        <section className="bg-white p-6 sm:p-7 rounded-2xl shadow-xs border border-purple-100 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-4 border-b border-purple-100/70 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">VS対決・徹底比較検証 ({INITIAL_COMPARISONS.length}件)</h2>
            </div>
            <button
              onClick={() => onNavigate('/comparisons')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 underline underline-offset-2 cursor-pointer"
            >
              比較TOP
            </button>
          </div>
          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {INITIAL_COMPARISONS.map(comp => (
              <button
                key={comp.id}
                onClick={() => onNavigate(`/comparisons/${comp.id}`)}
                className="w-full text-left hover:text-purple-600 hover:bg-purple-50/50 p-2 rounded-lg transition-colors flex items-start gap-2 group text-xs text-slate-700 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 mt-0.5 shrink-0" />
                <span className="line-clamp-2 leading-relaxed font-medium">{comp.title}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Products section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/80 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">コスメアイテム図鑑</h2>
              <p className="text-xs text-slate-500">全 {articlesList.length.toLocaleString()} 件の検証済みコスメアイテム一覧</p>
            </div>
          </div>

          {/* Search bar inside sitemap */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(60);
              }}
              placeholder="アイテム名やキーワードで絞り込み..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-rose-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-3 mb-5">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          <button
            onClick={() => { setSelectedCategory('all'); setVisibleCount(60); }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            すべて ({articlesList.length})
          </button>
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const count = articlesList.filter(a => a.category === cat.slug).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.slug); setVisibleCount(60); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {displayedArticles.map(art => (
            <button
              key={art.id}
              onClick={() => onNavigate(`/articles/${art.id}`)}
              className="text-left hover:text-teal-700 hover:bg-teal-50/50 p-2.5 rounded-xl transition-colors flex items-start gap-2 group text-xs text-slate-700 border border-slate-100 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 mt-0.5 shrink-0" />
              <span className="line-clamp-2 leading-relaxed font-medium">
                {art.productName || art.title}
              </span>
            </button>
          ))}
        </div>

        {displayedArticles.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            該当するコスメアイテムが見つかりませんでした。
          </div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > visibleCount && (
          <div className="text-center mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => setVisibleCount(prev => prev + 60)}
              className="px-6 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs rounded-xl transition cursor-pointer border border-slate-200 hover:border-rose-200"
            >
              さらにコスメを表示する (残り {(filteredArticles.length - visibleCount).toLocaleString()} 件)
            </button>
          </div>
        )}
      </section>

      {/* Other Important Hub Pages */}
      <section className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80">
        <h2 className="text-sm font-bold text-slate-800 mb-3">主要ナビゲーション＆基本情報</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="text-left p-2.5 bg-white rounded-xl text-slate-700 hover:text-rose-600 transition text-xs font-bold border border-slate-200/60 flex items-center justify-between cursor-pointer"
          >
            <span>トップページ (コスメ図鑑)</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('/features')}
            className="text-left p-2.5 bg-white rounded-xl text-slate-700 hover:text-rose-600 transition text-xs font-bold border border-slate-200/60 flex items-center justify-between cursor-pointer"
          >
            <span>記事特集一覧</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('/comparisons')}
            className="text-left p-2.5 bg-white rounded-xl text-slate-700 hover:text-rose-600 transition text-xs font-bold border border-slate-200/60 flex items-center justify-between cursor-pointer"
          >
            <span>VS対決・徹底比較一覧</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('/authors')}
            className="text-left p-2.5 bg-white rounded-xl text-slate-700 hover:text-rose-600 transition text-xs font-bold border border-slate-200/60 flex items-center justify-between cursor-pointer"
          >
            <span>Qualia 美容分析室 (専門アナリスト一覧)</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('/ranking/autumn-cosme')}
            className="text-left p-2.5 bg-white rounded-xl text-slate-700 hover:text-rose-600 transition text-xs font-bold border border-slate-200/60 flex items-center justify-between cursor-pointer"
          >
            <span>秋コスメ総合ランキング</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={() => onNavigate('/ranking/holiday-coffret')}
            className="text-left p-2.5 bg-white rounded-xl text-slate-700 hover:text-rose-600 transition text-xs font-bold border border-slate-200/60 flex items-center justify-between cursor-pointer"
          >
            <span>クリスマスコフレ特集</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </section>
    </div>
  );
}
