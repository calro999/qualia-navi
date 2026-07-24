import React from 'react';
import { RakutenProductArticle } from '../types';
import { AUTHOR_PROFILES, INITIAL_COMPARISONS } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { generateProductJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { ShoppingCart, ExternalLink, Star, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';

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
        title: `${article.productName || article.title} 口コミ・最安値・使い方 | Qualia Navi`,
        description: article.introText,
        imageUrl: article.imageUrl,
        urlPath: `/articles/${article.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-serif-brand">
          指定されたコスメ・美容記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/')}
          className="gold-btn px-6 py-2.5 rounded-xl transition"
        >
          コスメ一覧へ戻る
        </button>
      </div>
    );
  }

  const reviewer = AUTHOR_PROFILES.find((a) => a.name === article.reviewerName) || AUTHOR_PROFILES[0];
  const relatedProducts = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  if (relatedProducts.length < 3) {
    const extra = articles.filter(a => a.id !== article.id && !relatedProducts.includes(a)).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extra);
  }

  const relatedComparison = INITIAL_COMPARISONS.find(
    (c) => c.productItemCodeA === article.itemCode || c.productItemCodeB === article.itemCode || c.productItemCodeA === article.id || c.productItemCodeB === article.id
  );

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>コスメ一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition">
              コスメTOP
            </button>
            <span>/</span>
            <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-md text-xs border border-rose-100">
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
              <span className="px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full">
                {article.categoryLabel || article.category}
              </span>
              <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                {article.starRating.toFixed(1)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-serif-brand">
              {article.title}
            </h1>
          </div>

          {/* Reviewer Meta Banner */}
          <div 
            onClick={() => onNavigate(`/authors/${reviewer.id}`)}
            className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 flex items-center justify-between cursor-pointer hover:bg-rose-100/80 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={reviewer.avatarUrl}
                alt={reviewer.name}
                className="w-12 h-12 rounded-xl object-cover border border-rose-300 shadow-xs"
              />
              <div>
                <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-600" /> レビュー担当: {reviewer.name}
                </p>
                <p className="text-[11px] text-slate-600 font-medium">担当部門: {reviewer.assignedDepartment || reviewer.role}</p>
              </div>
            </div>
            <span className="text-xs text-rose-700 font-bold hidden sm:inline">プロフィール ➔</span>
          </div>

          {/* Intro Block */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-2">
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              {article.introText}
            </p>
          </div>

          {/* Product Visual & Buy Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-square bg-white relative">
              <img
                src={getRakutenOptimizedImageUrl(article.imageUrl)}
                alt={article.productName || article.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-contain bg-white"
              />
            </div>

            <div className="col-span-1 md:col-span-7 space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-2 font-serif-brand">
                  {article.productName || article.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {article.introText}
                </p>
              </div>

              {/* Selling Points */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider font-serif-brand">
                  注目レビューポイント
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                  {article.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">楽天市場最安値参考:</span>
                  <span className="font-extrabold text-rose-600 text-base">{article.rakutenPrice}</span>
                </div>
                <a
                  href={article.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rakuten-btn w-full py-4 px-6 rounded-2xl text-center text-sm sm:text-base font-bold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{article.ctaTitle || '楽天市場で最新価格＆限定ポイントを見る'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Full Review Markdown (文章本文内に検索キーワード10選が散りばめられています) */}
          <div className="prose max-w-none text-slate-800 leading-relaxed border-t border-slate-200 pt-8">
            <MarkdownRenderer content={article.reviewBody} onNavigate={onNavigate} />
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 space-y-3">
              <h4 className="font-extrabold text-rose-700 text-sm flex items-center gap-2 font-serif-brand">
                <span>👍</span> 美容効果・おすすめポイント
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {article.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">・</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-slate-700 text-sm flex items-center gap-2 font-serif-brand">
                <span>💡</span> 選ぶ際の留意点
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {article.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 font-bold">・</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products & Comparison */}
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif-brand">
              関連おすすめコスメ
            </h3>
            
            {relatedComparison && (
              <div 
                onClick={() => onNavigate(`/compare/${relatedComparison.id}`)}
                className="mb-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 p-5 rounded-2xl cursor-pointer hover:shadow-md transition group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">VS対決</span>
                  <span className="text-rose-600 font-bold text-sm group-hover:underline">{relatedComparison.title}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{relatedComparison.subtitle}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/articles/${rel.id}`)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-rose-300 transition cursor-pointer flex flex-col justify-between group shadow-xs"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-100">
                    <img
                      src={getRakutenOptimizedImageUrl(rel.imageUrl)}
                      alt={rel.productName || rel.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-xs text-slate-900 font-bold group-hover:text-rose-600 transition flex items-center justify-between font-serif-brand">
                    <span className="line-clamp-1">{rel.productName || rel.title}</span>
                    <span>➔</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
