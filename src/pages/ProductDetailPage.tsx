import React from 'react';
import { RakutenProductArticle } from '../types';
import { AUTHOR_PROFILES, INITIAL_COMPARISONS } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { InternalLinkMesh } from '../components/InternalLinkMesh';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { generateProductJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { ShoppingCart, ExternalLink, Star, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getCleanAffiliateLink, deduplicateArticles } from '../utils/productUtils';

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
        title: `【2026年最新】${article.productName || article.title}の口コミ・評判・最安値を徹底比較検証 | Qualia Navi`,
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
  const uniqueArticles = deduplicateArticles(articles);
  const relatedProducts = uniqueArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  if (relatedProducts.length < 3) {
    const extra = uniqueArticles.filter(a => a.id !== article.id && !relatedProducts.includes(a)).slice(0, 3 - relatedProducts.length);
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
                <div className="flex flex-col gap-1.5 items-center">
                  <div className="text-red-600 font-black text-xs animate-pulse tracking-wide">
                    ＼ 楽天ポイント大還元祭！限定クーポン配布中 ／
                  </div>
                  <a
                    href={getCleanAffiliateLink(article)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm rounded-2xl transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-5 h-5 animate-bounce" />
                    <span>{article.ctaTitle || '楽天市場で現在の最安値をチェックする 👉'}</span>
                  </a>
                  <div className="text-slate-500 text-[10px] mt-1 font-bold flex items-center gap-1">
                    <span className="text-red-500">※</span>人気商品のため、在庫がすぐになくなる場合があります
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
              <h3 className="text-rose-700 font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-sm">✓</span>
                編集部が感じたメリット (Pros)
              </h3>
              <ul className="space-y-2">
                {article.pros?.map((pro: string, i: number) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-blue-700 font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">△</span>
                気になるデメリット (Cons)
              </h3>
              <ul className="space-y-2">
                {article.cons?.map((con: string, i: number) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expert Review Markdown */}
          <div className="prose max-w-none text-slate-800 leading-relaxed font-normal mt-8 pt-8 border-t border-slate-200">
            <MarkdownRenderer content={article.reviewBody} onNavigate={onNavigate} />
          </div>
          {/* FAQ Section */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 font-serif-brand">よくある質問 (FAQ)</h3>
              <div className="space-y-4">
                {article.faqs.map((faq: any, i: number) => (
                  <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-slate-800 text-sm flex gap-3 mb-2">
                      <span className="text-rose-500 font-black">Q.</span>
                      {faq.question}
                    </h4>
                    <p className="text-sm text-slate-600 flex gap-3 pl-0.5">
                      <span className="text-blue-500 font-black">A.</span>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
          <InternalLinkMesh currentArticleId={article.id} category={article.category} />
        </article>
      </div>
    </div>
  );
}
