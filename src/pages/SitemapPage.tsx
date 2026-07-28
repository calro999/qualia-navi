import { useEffect, useState } from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_COMPARISONS, INITIAL_ARTICLES } from '../data';
import articlesJson from '../data/articles.json';
import { ChevronRight, Map, BookOpen, Sparkles, ShoppingBag } from 'lucide-react';
import { RakutenProductArticle } from '../types';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export function SitemapPage({ onNavigate }: SitemapPageProps) {
  const [allArticles, setAllArticles] = useState<RakutenProductArticle[]>([]);

  useEffect(() => {
    // Merge INITIAL_ARTICLES with articlesJson, ensuring no duplicates by ID
    const articleMap = new Map<string, RakutenProductArticle>();
    
    INITIAL_ARTICLES.forEach(a => {
      if (a.id) articleMap.set(a.id, a);
    });
    
    // Check if articlesJson is an array before iterating
    if (Array.isArray(articlesJson)) {
      (articlesJson as RakutenProductArticle[]).forEach(a => {
        if (a.id && !articleMap.has(a.id)) {
          articleMap.set(a.id, a);
        }
      });
    }

    setAllArticles(Array.from(articleMap.values()));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-rose-50 text-rose-500 rounded-full mb-2">
          <Map className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-800 font-serif-brand">サイトマップ</h1>
        <p className="text-slate-500 text-sm">Qualia Naviの全コンテンツ一覧</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Features section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold text-slate-800">特集記事</h2>
          </div>
          <ul className="space-y-3">
            <li>
              <button 
                onClick={() => onNavigate('/features')}
                className="text-left hover:text-rose-600 transition-colors flex items-start gap-2 group text-sm"
              >
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 mt-0.5 shrink-0" />
                <span className="font-bold">特集記事トップ</span>
              </button>
            </li>
            {INITIAL_BLOG_POSTS.map(post => (
              <li key={post.id}>
                <button 
                  onClick={() => onNavigate(`/features/${post.id}`)}
                  className="text-left hover:text-rose-600 transition-colors flex items-start gap-2 group text-sm text-slate-600"
                >
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 mt-0.5 shrink-0" />
                  <span>{post.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Comparisons section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-slate-800">比較検証記事</h2>
          </div>
          <ul className="space-y-3">
            <li>
              <button 
                onClick={() => onNavigate('/comparisons')}
                className="text-left hover:text-purple-600 transition-colors flex items-start gap-2 group text-sm"
              >
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 mt-0.5 shrink-0" />
                <span className="font-bold">比較検証トップ</span>
              </button>
            </li>
            {INITIAL_COMPARISONS.map(comp => (
              <li key={comp.id}>
                <button 
                  onClick={() => onNavigate(`/comparisons/${comp.id}`)}
                  className="text-left hover:text-purple-600 transition-colors flex items-start gap-2 group text-sm text-slate-600"
                >
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 mt-0.5 shrink-0" />
                  <span>{comp.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Products section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
          <ShoppingBag className="w-5 h-5 text-teal-500" />
          <h2 className="text-xl font-bold text-slate-800">コスメアイテム一覧</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allArticles.map(art => (
            <button 
              key={art.id}
              onClick={() => onNavigate(`/articles/${art.id}`)}
              className="text-left hover:text-teal-600 transition-colors flex items-start gap-2 group text-xs text-slate-600 truncate-2-lines"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500 mt-0.5 shrink-0" />
              <span className="line-clamp-2 leading-tight">{art.productName || art.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Other Pages */}
      <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4">その他のページ</h2>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => onNavigate('/')}
              className="text-left text-slate-600 hover:text-rose-600 transition-colors text-sm underline underline-offset-2"
            >
              トップページ
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavigate('/authors')}
              className="text-left text-slate-600 hover:text-rose-600 transition-colors text-sm underline underline-offset-2"
            >
              Qualia 美容分析室 (専門アナリスト一覧)
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
