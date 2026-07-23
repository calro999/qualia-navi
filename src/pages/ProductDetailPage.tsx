import React from 'react';
import { RakutenProductArticle } from '../types';
import { AUTHOR_PROFILES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { generateProductJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { ShoppingCart, ExternalLink, Star, CheckCircle } from 'lucide-react';

interface ProductDetailPageProps {
  articleId: string;
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

export function ProductDetailPage({ articleId, articles, onNavigate }: ProductDetailPageProps) {
  const article = articles.find((a) => a.id === articleId || a.itemCode === articleId);

  React.useEffect(() => {
    if (article) {
      const jsonLd = generateProductJsonLd(article as any, window.location.origin);
      updateSeoGeoMetadata({
        title: `${article.productName || article.title} 口コミ・効果検証 | Qualia Navi`,
        description: article.introText,
        imageUrl: article.imageUrl,
        urlPath: `/articles/${article.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          指定されたコスメ・美容記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-bold rounded-xl transition shadow-md hover:opacity-95"
        >
          コスメ一覧へ戻る
        </button>
      </div>
    );
  }

  const reviewer = AUTHOR_PROFILES.find((a) => a.name === article.reviewerName) || AUTHOR_PROFILES[0];
  const relatedProducts = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="py-6 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-purple-600 transition">
            コスメTOP
          </button>
          <span>/</span>
          <span className="text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md text-xs">
            {article.categoryLabel || article.category}
          </span>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-[200px]">
            {article.productName || article.title}
          </span>
        </nav>

        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              {article.categoryLabel || article.category}
            </span>
            <span className="px-3 py-1 bg-amber-400 text-slate-900 text-xs font-black rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-slate-900" />
              {article.starRating.toFixed(1)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Direct Answer Summary Block */}
        <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-3">
          <p className="text-xs sm:text-sm text-white leading-relaxed font-medium">
            {article.introText}
          </p>
        </div>

        {/* Product Visual & Buy Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white/70 p-6 rounded-2xl border border-sky-100">
          <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden border border-sky-100 shadow-sm aspect-square bg-sky-50 relative">
            <img
              src={getRakutenOptimizedImageUrl(article.imageUrl)}
              alt={article.productName || article.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 md:col-span-7 space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-2">
                {article.productName || article.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {article.introText}
              </p>
            </div>

            {/* Selling Points */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                注目ポイント
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {article.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rakuten Affiliate Link CTA Button */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">楽天市場参考価格:</span>
                <span className="font-extrabold text-purple-700 text-sm">{article.rakutenPrice}</span>
              </div>
              <a
                href={article.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rakuten-btn w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{article.ctaTitle || '楽天市場で最新価格＆ポイントを見る'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Full Markdown Review Article Body */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed border-t border-sky-100 pt-8">
          <MarkdownRenderer content={article.reviewBody} onNavigate={onNavigate} />
        </div>

        {/* Pros and Cons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="bg-sky-50/80 p-5 rounded-2xl border border-sky-100 space-y-3">
            <h4 className="font-extrabold text-sky-900 text-sm flex items-center gap-2">
              <span className="text-sky-600 font-black">👍</span> 美容効果・おすすめポイント
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sky-950">
              {article.pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">・</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-100 space-y-3">
            <h4 className="font-extrabold text-purple-900 text-sm flex items-center gap-2">
              <span className="text-purple-600 font-black">💡</span> 選ぶ際のポイント
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-950">
              {article.cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">・</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Recommended Products */}
        <div className="pt-10 border-t border-sky-100 space-y-6">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            関連おすすめコスメ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/articles/${rel.id}`)}
                className="bg-white p-4 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-sky-50">
                  <img
                    src={getRakutenOptimizedImageUrl(rel.imageUrl)}
                    alt={rel.productName || rel.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-xs text-slate-800 font-bold group-hover:text-purple-600 transition flex items-center justify-between">
                  <span className="line-clamp-1">{rel.productName || rel.title}</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
