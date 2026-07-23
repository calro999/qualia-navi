import { useState, useEffect } from 'react';
import { INITIAL_ARTICLES } from './data';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProductComparisonPage } from './pages/ProductComparisonPage';
import { AuthorListPage } from './pages/AuthorListPage';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { Sparkles, ShoppingBag, Heart } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-purple-50/50 to-indigo-50/40 text-slate-800 font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigateTo('/')}
          >
            <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white font-black text-2xl px-4 py-1.5 rounded-2xl tracking-tight shadow-md group-hover:shadow-lg transition-all duration-300">
              Qualia Navi
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">透明感を研ぎ澄ます コスメ＆美容トレンドナビ</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => navigateTo('/')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isArticlesTab
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm'
                  : 'bg-white/80 text-slate-600 hover:bg-sky-50 border border-sky-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>注目コスメ</span>
            </button>

            <button
              onClick={() => navigateTo('/blogs')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isBlogsTab
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>美肌特集ブログ</span>
            </button>

            <button
              onClick={() => navigateTo('/authors')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isAuthorsTab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-indigo-500" />
              <span>Qualia 美容分析室</span>
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Route Content Rendering */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-sky-100 mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 space-y-3">
          <div className="flex justify-center items-center gap-2">
            <span className="bg-gradient-to-r from-sky-500 to-purple-600 text-white font-bold px-3 py-1 rounded-lg text-sm">Qualia Navi</span>
          </div>
          <p className="font-medium text-slate-600">透明感を研ぎ澄ます美容・コスメ選びの総合ナビゲーション</p>
          <p>© 2026 Qualia Navi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
