import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { INITIAL_ARTICLES } from './data';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProductComparisonPage } from './pages/ProductComparisonPage';
import { AuthorListPage } from './pages/AuthorListPage';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { Sparkles, ShoppingBag, Users } from 'lucide-react';
import { RakutenProductArticle } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Router navigation helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine active tab for header highlighting
  const isArticlesTab = currentPath === '/' || currentPath.startsWith('/articles');
  const isBlogsTab = currentPath.startsWith('/blogs');
  const isAuthorsTab = currentPath.startsWith('/authors');

  const [articles] = useState<RakutenProductArticle[]>(INITIAL_ARTICLES);

  const renderCurrentPage = () => {
    if (currentPath.startsWith('/articles/')) {
      const articleId = currentPath.replace('/articles/', '');
      return (
        <ProductDetailPage
          articleId={articleId}
          articles={articles}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath === '/blogs') {
      return <BlogListPage onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/blogs/')) {
      const postId = currentPath.replace('/blogs/', '');
      return (
        <BlogPostPage
          postId={postId}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath.startsWith('/compare/')) {
      const compareId = currentPath.replace('/compare/', '');
      return (
        <ProductComparisonPage
          compareId={compareId}
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath === '/authors') {
      return <AuthorListPage onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/authors/')) {
      const authorId = currentPath.replace('/authors/', '');
      return (
        <AuthorDetailPage
          authorId={authorId}
          onNavigate={navigateTo}
        />
      );
    }

    return (
      <ProductListPage
        articles={articles}
        onNavigate={navigateTo}
      />
    );
  };

  return (
    <div className="min-h-screen qualia-light-bg text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b border-rose-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigateTo('/')}
          >
            <div className="qualia-rose-gradient text-white font-black text-2xl sm:text-3xl px-4 py-1 rounded-2xl tracking-tight shadow-md group-hover:scale-102 transition-transform duration-300 font-serif-brand">
              Qualia Navi
            </div>
            <div className="border-l border-rose-200 pl-3">
              <p className="text-xs text-rose-600 font-bold tracking-wider">クオリア・ナビ</p>
              <p className="text-[11px] text-slate-500 font-medium">プチプラ・デパコス・韓国コスメのトレンドガイド</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => navigateTo('/')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isArticlesTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>注目コスメ一覧</span>
            </button>

            <button
              onClick={() => navigateTo('/blogs')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isBlogsTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>美肌特集ブログ</span>
            </button>

            <button
              onClick={() => navigateTo('/authors')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isAuthorsTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span>Qualia 美容分析室 (12名)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <div className="flex justify-center items-center gap-2">
            <span className="qualia-rose-gradient text-white font-extrabold px-4 py-1 rounded-xl text-sm font-serif-brand">
              Qualia Navi
            </span>
          </div>
          <p className="text-xs font-bold text-slate-700">プチプラからデパコス・韓国コスメまで網羅する美容・コスメ比較メディア</p>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            Qualia 美容分析室の日本人コレクター＆編集部が実際に試して比較した本音レビューを掲載。
            掲載商品は楽天市場の公式・人気ショップのリアルタイム価格とアフィリエイトリンクでお届けします。
          </p>
          <p className="text-[11px] text-slate-400 pt-2">© 2026 Qualia Navi. All rights reserved.</p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
