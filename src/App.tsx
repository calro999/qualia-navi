import { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { INITIAL_ARTICLES, CATEGORIES } from './data';
import { Sparkles, ShoppingBag, Users, Heart, Search, Swords, Calendar } from 'lucide-react';
import { RakutenProductArticle } from './types';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { FavoritesModal } from './components/FavoritesModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { RakutenPointCalendarModal } from './components/RakutenPointCalendarModal';
import { getFavoriteIds } from './utils/favorites';

// ── 初期ロード高速化のためのコード分割（React.lazy） ──
const ProductListPage = lazy(() =>
  import('./pages/ProductListPage').then((m) => ({ default: m.ProductListPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const FeatureListPage = lazy(() =>
  import('./pages/FeatureListPage').then((m) => ({ default: m.FeatureListPage }))
);
const ComparisonListPage = lazy(() =>
  import('./pages/ComparisonListPage').then((m) => ({ default: m.ComparisonListPage }))
);
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage }))
);
const ProductComparisonPage = lazy(() =>
  import('./pages/ProductComparisonPage').then((m) => ({ default: m.ProductComparisonPage }))
);
const AuthorListPage = lazy(() =>
  import('./pages/AuthorListPage').then((m) => ({ default: m.AuthorListPage }))
);
const AuthorDetailPage = lazy(() =>
  import('./pages/AuthorDetailPage').then((m) => ({ default: m.AuthorDetailPage }))
);
const SitemapPage = lazy(() =>
  import('./pages/SitemapPage').then((m) => ({ default: m.SitemapPage }))
);

const PageLoadingFallback = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
    <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
    <p className="text-xs font-bold text-slate-500">最新コスメデータを読み込み中...</p>
  </div>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    setFavoriteCount(getFavoriteIds().length);
    const handleUpdate = () => {
      setFavoriteCount(getFavoriteIds().length);
    };
    window.addEventListener('qualia_favorites_updated', handleUpdate);
    return () => window.removeEventListener('qualia_favorites_updated', handleUpdate);
  }, []);

  // Shortcut Cmd+K / Ctrl+K to open global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Router navigation helper
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pathnameOnly = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Determine active tab for header highlighting
  const isArticlesTab = pathnameOnly === '/' || pathnameOnly.startsWith('/articles') || pathnameOnly.startsWith('/article/') || pathnameOnly.startsWith('/ranking');
  const isFeaturesTab = pathnameOnly.startsWith('/features') || pathnameOnly.startsWith('/blogs') || pathnameOnly.startsWith('/blog/');
  const isComparisonsTab = pathnameOnly.startsWith('/comparisons') || pathnameOnly.startsWith('/compare');
  const isAuthorsTab = pathnameOnly.startsWith('/authors');

  const [articles] = useState<RakutenProductArticle[]>(INITIAL_ARTICLES);

  const renderCurrentPage = () => {
    if (pathnameOnly.startsWith('/articles/')) {
      const articleId = pathnameOnly.replace('/articles/', '');
      return (
        <ProductDetailPage
          articleId={articleId}
          articles={articles}
          onNavigate={navigateTo}
        />
      );
    }

    if (pathnameOnly.startsWith('/article/')) {
      const articleId = pathnameOnly.replace('/article/', '');
      return (
        <ProductDetailPage
          articleId={articleId}
          articles={articles}
          onNavigate={navigateTo}
        />
      );
    }

    // ── 10〜1月 季節別SEOランキングハブ ──
    if (pathnameOnly === '/ranking/autumn-cosme') {
      return <BlogPostPage postId="feat-autumn-cosmetics-guide-45-series-hub" onNavigate={navigateTo} />;
    }
    if (pathnameOnly === '/ranking/holiday-coffret') {
      return <BlogPostPage postId="feat-winter-holiday-coffret-makeup-collection-2026" onNavigate={navigateTo} />;
    }
    if (pathnameOnly === '/ranking/gift-selection') {
      return <BlogPostPage postId="feat-winter-holiday-cosmetics-gift-guide-2026" onNavigate={navigateTo} />;
    }
    if (pathnameOnly === '/ranking/winter-skincare') {
      return <BlogPostPage postId="feat-winter-sheet-mask-face-pack-2026" onNavigate={navigateTo} />;
    }

    if (pathnameOnly === '/features' || pathnameOnly === '/blogs' || pathnameOnly === '/blog') {
      return <FeatureListPage articles={articles} onNavigate={navigateTo} />;
    }

    if (pathnameOnly.startsWith('/features/')) {
      const postId = pathnameOnly.replace('/features/', '');
      return <BlogPostPage postId={postId} onNavigate={navigateTo} />;
    }

    if (pathnameOnly.startsWith('/blogs/')) {
      const postId = pathnameOnly.replace('/blogs/', '');
      return <BlogPostPage postId={postId} onNavigate={navigateTo} />;
    }

    if (pathnameOnly.startsWith('/blog/')) {
      const postId = pathnameOnly.replace('/blog/', '');
      return <BlogPostPage postId={postId} onNavigate={navigateTo} />;
    }

    if (pathnameOnly === '/comparisons' || pathnameOnly === '/compare') {
      return <ComparisonListPage onNavigate={navigateTo} />;
    }

    if (pathnameOnly.startsWith('/comparisons/')) {
      const compareId = pathnameOnly.replace('/comparisons/', '');
      return <ProductComparisonPage compareId={compareId} onNavigate={navigateTo} />;
    }

    if (pathnameOnly.startsWith('/compare/')) {
      const compareId = pathnameOnly.replace('/compare/', '');
      return <ProductComparisonPage compareId={compareId} onNavigate={navigateTo} />;
    }

    if (pathnameOnly === '/authors') {
      return <AuthorListPage onNavigate={navigateTo} />;
    }

    if (pathnameOnly.startsWith('/authors/')) {
      const authorId = pathnameOnly.replace('/authors/', '');
      return <AuthorDetailPage authorId={authorId} onNavigate={navigateTo} />;
    }

    if (pathnameOnly === '/sitemap') {
      return <SitemapPage onNavigate={navigateTo} />;
    }

    return <ProductListPage articles={articles} onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen qualia-light-bg text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
      {/* 景品表示法・ステマ規制対応 PR / アフィリエイト広告開示バー */}
      <div className="bg-rose-50/90 border-b border-rose-100 text-slate-500 text-[11px] py-1.5 px-4 text-center leading-relaxed">
        <span>【PR】当サイトは楽天市場アフィリエイトプログラムに参加しており、適格販売により収入を得ています。掲載している商品価格・ポイント還元率・在庫状況等は記事作成・更新時点のものであり、各ショップの販売状況によって変動する場合があります。最新の正確な情報につきましては各楽天市場ページにてご確認ください。</span>
      </div>

      {/* 読了プログレスバー */}
      <ReadingProgressBar />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight font-serif-brand">
                Qualia Navi
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-extrabold bg-rose-50 text-rose-700 rounded-full border border-rose-100">
                クオリア・ナビ
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => navigateTo('/')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isArticlesTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              <span>コスメ図鑑</span>
            </button>

            <button
              onClick={() => navigateTo('/features')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isFeaturesTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>記事特集</span>
            </button>

            <button
              onClick={() => navigateTo('/comparisons')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isComparisonsTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-purple-500" />
              <span>VS比較</span>
            </button>

            <button
              onClick={() => navigateTo('/authors')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                isAuthorsTab
                  ? 'gold-btn'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/80'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span>分析室</span>
            </button>

            {/* 📅 楽天おトク日・ポイントカレンダー呼び出しボタン */}
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex-shrink-0 cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-2xs"
              title="楽天セール＆ポイント還元カレンダー"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>おトク日</span>
            </button>

            {/* 横断検索モーダル呼び出しボタン */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200"
              title="サイト内横断検索 (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-rose-500" />
              <span>検索</span>
            </button>

            {/* お気に入りモーダル呼び出しボタン */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
              title="お気に入りコスメリスト・横並び比較"
            >
              <Heart className={`w-3.5 h-3.5 ${favoriteCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`} />
              <span>キープ</span>
              {favoriteCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentPage()}
        </Suspense>
      </main>

      {/* 全サイト横断インクリメンタル検索モーダル */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onNavigate={navigateTo}
      />

      {/* キープ（お気に入り）一覧・横並びスペック比較モーダル */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        articles={articles}
        onNavigate={navigateTo}
      />

      {/* 📅 楽天おトク日・ポイント最大還元カレンダーモーダル */}
      <RakutenPointCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </div>
                <span className="font-extrabold text-white text-lg font-serif-brand">Qualia Navi</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                コスメ・美容アイテムの成分・使用感・リアルな口コミ・楽天市場の最安値をプロ目線で徹底検証・解説するコスメ情報データベース。
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">カテゴリ別コスメ図鑑</h4>
              <ul className="text-xs space-y-1.5 text-slate-400">
                {CATEGORIES.slice(0, 5).map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => navigateTo(`/?category=${cat.slug}`)}
                      className="hover:text-rose-400 transition cursor-pointer"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">秋冬・ホリデー特集</h4>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => navigateTo('/ranking/autumn-cosme')} className="hover:text-rose-400 transition cursor-pointer">
                    🍁 2026秋コスメ450選総まとめ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('/ranking/holiday-coffret')} className="hover:text-rose-400 transition cursor-pointer">
                    🎄 2026クリスマスコフレ10選
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('/ranking/gift-selection')} className="hover:text-rose-400 transition cursor-pointer">
                    🎁 予算別ホリデーギフト10選
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('/ranking/winter-skincare')} className="hover:text-rose-400 transition cursor-pointer">
                    🎍 真冬の超高保湿スキンケア10選
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsCalendarOpen(true)} className="hover:text-amber-400 transition cursor-pointer text-amber-300 font-bold">
                    📅 楽天おトク日・ポイントカレンダー
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">サイト情報</h4>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => navigateTo('/authors')} className="hover:text-rose-400 transition cursor-pointer">
                    専属ビューティーアナリスト一覧
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('/sitemap')} className="hover:text-rose-400 transition cursor-pointer">
                    サイトマップ・全記事インデックス
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
            <p className="max-w-3xl mx-auto text-[11px] text-slate-400 leading-relaxed">
              【免責事項・広告開示】当サイトは楽天市場アフィリエイトプログラムの参加者です。掲載している商品価格、ポイント倍率、送料、在庫状況等の情報は、記事作成または最終データ更新時点の調査に基づく参考情報です。各ショップのセールや価格改定により常に変動する可能性がありますので、ご購入の際は必ず遷移先の各楽天市場商品ページにて最新の販売条件をご確認ください。
            </p>
            <p>© 2026 Qualia Navi (クオリア・ナビ). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
