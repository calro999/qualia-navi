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
              <span>記事特集</span>
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
      <footer className="bg-slate-50 border-t border-rose-100 mt-20 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left mb-12">
          
          {/* About Us */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="qualia-rose-gradient text-white font-extrabold px-4 py-1.5 rounded-xl text-sm font-serif-brand">
                Qualia Navi
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">当サイトについて</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Qualia Navi（クオリア・ナビ）は、プチプラからデパコス、韓国コスメまで、最新の美容・コスメアイテムを専門アナリストが実地検証・比較する本音レビューメディアです。<br/><br/>
              読者の皆様が本当に自分に合ったアイテムを見つけられるよう、忖度のない検証結果を発信しています。
            </p>
          </div>

          {/* Legal & Disclaimer */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-sm font-bold text-slate-800">免責事項・プライバシーポリシー</h4>
            <div className="text-[11px] text-slate-500 leading-relaxed space-y-2">
              <p>
                <strong>免責事項:</strong> 当サイトに掲載しているコスメの使用感や効果に関するレビューは、Qualia美容分析室メンバー個人の実体験に基づくものであり、すべての方に同一の効果を保証するものではありません。成分や肌への適合性については、ご使用前に必ずメーカー公式情報やパッケージの記載をご確認の上、自己責任でご使用ください。万が一、肌トラブル等が発生した場合、当サイトは一切の責任を負いかねます。
              </p>
              <p>
                <strong>アフィリエイトプログラムについて:</strong> 当サイトは、楽天アフィリエイトなどのアフィリエイトプログラムに参加しています。掲載商品は楽天市場の販売ページへリンクしており、当サイトが直接販売・発送を行うものではありません。商品に関するお問い合わせは、リンク先の各販売店へ直接お願いいたします。
              </p>
              <p>
                <strong>アクセス解析ツールについて:</strong> 当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center border-t border-slate-200 pt-8">
          <p className="text-[11px] text-slate-400 font-bold tracking-wider">
            © 2026 Qualia Navi. All rights reserved.
          </p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
