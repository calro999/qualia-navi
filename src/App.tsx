import { useState, useEffect } from 'react';
import { INITIAL_ARTICLES } from './data';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ProductComparisonPage } from './pages/ProductComparisonPage';
import { AuthorListPage } from './pages/AuthorListPage';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { Sparkles, ShoppingBag, Users, Award } from 'lucide-react';
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
    <div className="min-h-screen qualia-luxury-bg text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Navigation (Luxury Haute Couture Styling) */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-amber-500/20 sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group" 
            onClick={() => navigateTo('/')}
          >
            <div className="qualia-gold-gradient text-slate-950 font-black text-2xl sm:text-3xl px-4 py-1 rounded-xl tracking-wider shadow-lg shadow-amber-500/10 group-hover:scale-102 transition-transform duration-300 font-serif-brand">
              Qualia Navi
            </div>
            <div className="border-l border-amber-500/30 pl-3">
              <p className="text-xs text-amber-200/90 font-serif-brand tracking-widest uppercase">
                クオリア・ナビ
              </p>
              <p className="text-[11px] text-slate-400 font-light">美しさを研ぎ澄ますデパコス＆美容メディア</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => navigateTo('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isArticlesTab
                  ? 'gold-btn'
                  : 'bg-slate-900/80 text-amber-100/80 hover:bg-slate-800 border border-amber-500/20'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>厳選デパコス・コスメ</span>
            </button>

            <button
              onClick={() => navigateTo('/blogs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isBlogsTab
                  ? 'gold-btn'
                  : 'bg-slate-900/80 text-amber-100/80 hover:bg-slate-800 border border-amber-500/20'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>美肌特集・SEO研究ブログ</span>
            </button>

            <button
              onClick={() => navigateTo('/authors')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isAuthorsTab
                  ? 'gold-btn'
                  : 'bg-slate-900/80 text-amber-100/80 hover:bg-slate-800 border border-amber-500/20'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Qualia 美容分析室 メンバー (12名)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>

      {/* Footer (Haute-Couture Premium Footer) */}
      <footer className="bg-slate-950 border-t border-amber-500/20 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <span className="qualia-gold-gradient text-slate-950 font-extrabold px-4 py-1.5 rounded-lg text-sm font-serif-brand tracking-wider">
              Qualia Navi
            </span>
          </div>
          <p className="text-xs text-amber-200/70 font-serif-brand tracking-widest">
            HAUTE COUTURE BEAUTY & COSMETICS NAVIGATION
          </p>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            【Qualia 美容分析室】統括編集長・コスメ美容編集長および日本人コスメコレクター10名による客観的実証メディア。
            掲載されている商品情報は楽天市場APIとリアルタイム連携し、最安値＆高還元ポイントをナビゲートします。
          </p>
          <p className="text-[11px] text-slate-600 pt-2">© 2026 Qualia Navi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
