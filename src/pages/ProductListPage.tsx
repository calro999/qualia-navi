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
  const [showAllComparisons, setShowAllComparisons] = useState<boolean>(false);
  const [visibleProductCount, setVisibleProductCount] = useState<number>(12);

  useEffect(() => {
    updateSeoGeoMetadata({
      title: '【2026年最新】Qualia Navi - プチプラ・デパコス・韓国コスメのリアル比較検証',
      description: '人気コスメ、スキンケア、プチプラ・ドラコス・韓国コスメをQualia美容分析室が実地検証！失敗しないコスメ選びをサポートします。',
      urlPath: '/',
      jsonLdSchema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Qualia Navi (クオリア・ナビ)',
          url: 'https://qualia-navi.vercel.app',
          logo: 'https://qualia-navi.vercel.app/favicon.svg'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Qualia Navi (クオリア・ナビ)',
          url: 'https://qualia-navi.vercel.app',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://qualia-navi.vercel.app/?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    });
  }, []);

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((art) => {
      const matchCat =
        selectedCategory === 'all' || art.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.productName && art.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.introText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });

    // 常に新しく追加した商品（articles配列の末尾にあるもの）が上に来るように元の順序を反転
    return filtered.reverse();
  }, [articles, selectedCategory, searchQuery]);

  const displayedComparisons = showAllComparisons ? INITIAL_COMPARISONS : INITIAL_COMPARISONS.slice(0, 4);
  const displayedArticles = filteredArticles.slice(0, visibleProductCount);
  const hasMoreProducts = visibleProductCount < filteredArticles.length;

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white p-8 sm:p-10 shadow-lg space-y-3">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>2026 BEAUTY & COSMETICS TREND NAVI</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight font-serif-brand">
            自分にピッタリが見つかる。<br />プチプラ・デパコス・韓国コスメ徹底比較
          </h1>
          <p className="text-rose-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            Qualia 美容分析室のコレクター＆編集部が実際に試して比較検証。楽天市場のリアルタイム価格と限定ポイント還元情報をナビゲートします。
          </p>
        </div>
        
      </div>

      {/* VS Comparison Featured Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2 border-l-4 border-rose-500 pl-3">
            <span>⚔️ 目的別コスメガチンコ比較</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayedComparisons.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/comparisons/${comp.id}`)}
              className="qualia-glass-card p-5 rounded-2xl cursor-pointer hover:border-rose-300 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 bg-rose-100 text-rose-700 text-xs font-bold rounded-md">
                  {comp.targetUserCategory}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-rose-600 transition-colors font-serif-brand">
                  {comp.title}
                </h3>
              </div>

              <div className="pt-3 mt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                <span>比較結果を見る</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
        {!showAllComparisons && INITIAL_COMPARISONS.length > 4 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAllComparisons(true)}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-colors flex items-center gap-2"
            >
              ＋ 他の比較を見る
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs space-y-4">
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
                    : 'bg-slate-100 text-slate-700 hover:bg-rose-50 border border-slate-200'
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
              placeholder="コスメ名・キーワード検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>
        </div>
        
        {/* Category SEO Enhancement Text */}
        {selectedCategory !== 'all' && (
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 text-xs text-slate-700 leading-relaxed font-medium">
            <h3 className="font-bold text-rose-700 mb-1">
              {CATEGORIES.find(c => c.slug === selectedCategory)?.name}カテゴリについて
            </h3>
            {selectedCategory === 'skincare' && '保湿力や成分の安全性、浸透力を徹底検証。肌悩みに合わせた最適なスキンケアアイテムを厳選しています。'}
            {selectedCategory === 'base-makeup' && 'カバー力、崩れにくさ、仕上がりの美しさを評価。長時間キープできる優秀なベースメイクアイテムをご紹介します。'}
            {selectedCategory === 'point-makeup' && 'トレンド感、発色、色持ちを重視。毎日のメイクを格上げするポイントメイクアイテムをピックアップしました。'}
            {selectedCategory === 'haircare' && 'まとまり、ツヤ感、香りをチェック。サロン級の仕上がりを叶えるヘアケアアイテムを比較検証しています。'}
            {selectedCategory === 'uv-care' && '紫外線防御力はもちろん、白浮きしない使い心地や落としやすさまで。日常使いからレジャーまで活躍するUVケアアイテム。'}
            {!['skincare', 'base-makeup', 'point-makeup', 'haircare', 'uv-care'].includes(selectedCategory) && `${CATEGORIES.find(c => c.slug === selectedCategory)?.name}の最新トレンドアイテムをQualia美容分析室が独自基準で徹底検証。`}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((art) => (
          <div
            key={art.id}
            className="qualia-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-rose-300 transition-all duration-300"
          >
            {/* Product Image & Badges */}
            <div 
              className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 via-rose-50/20 to-pink-50/30 p-4 flex items-center justify-center overflow-hidden cursor-pointer border-b border-rose-100"
              onClick={() => onNavigate(`/articles/${art.id}`)}
            >
              <img
                src={getRakutenOptimizedImageUrl(art.imageUrl)}
                alt={art.productName || art.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
              
              {art.isHallOfFame && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-lg shadow-md flex items-center gap-1">
                  👑 殿堂入り
                </span>
              )}

              <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/95 text-rose-600 font-extrabold text-xs rounded-md shadow-xs flex items-center gap-1 backdrop-blur-sm border border-rose-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {art.starRating.toFixed(1)}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div 
                className="space-y-2 cursor-pointer"
                onClick={() => onNavigate(`/articles/${art.id}`)}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                    {art.categoryLabel || art.category}
                  </span>
                  <span className="text-slate-500 font-medium text-[11px]">
                    担当: {art.reviewerName || 'Qualia 美容分析室'}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-2 font-serif-brand">
                  {art.productName || art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                  {art.introText}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">楽天市場最安値参考:</span>
                  <span className="font-extrabold text-rose-600 text-sm">{art.rakutenPrice}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition text-center"
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

      {/* Load More Button (Bottom) */}
      {hasMoreProducts && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setVisibleProductCount((prev) => prev + 12)}
            className="px-8 py-3 bg-white border border-rose-200 hover:border-rose-400 text-rose-600 font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <span className="text-lg">＋</span>
            <span>さらに読み込む</span>
          </button>
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 qualia-glass-card rounded-3xl">
          <p className="text-slate-600 font-bold text-sm">
            検索条件に一致するコスメアイテムが見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
}
