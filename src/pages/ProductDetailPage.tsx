import React from 'react';
import { RakutenProductArticle } from '../types';
import { AUTHOR_PROFILES } from '../data';
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
      <div className="max-w-4xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-amber-200 font-serif-brand">
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
  const relatedProducts = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>厳選コスメ一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-amber-500/30">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-amber-300 transition">
              コスメTOP
            </button>
            <span>/</span>
            <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md text-xs border border-amber-500/20">
              {article.categoryLabel || article.category}
            </span>
            <span>/</span>
            <span className="text-slate-200 font-bold truncate max-w-[200px]">
              {article.productName || article.title}
            </span>
          </nav>

          {/* Title Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                {article.categoryLabel || article.category}
              </span>
              <span className="px-3 py-1 qualia-gold-gradient text-slate-950 text-xs font-black rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                {article.starRating.toFixed(1)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight font-serif-brand qualia-gold-text">
              {article.title}
            </h1>
          </div>

          {/* Reviewer Meta Banner */}
          <div 
            onClick={() => onNavigate(`/authors/${reviewer.id}`)}
            className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/20 flex items-center justify-between cursor-pointer hover:border-amber-400/50 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={reviewer.avatarUrl}
                alt={reviewer.name}
                className="w-12 h-12 rounded-xl object-cover border border-amber-400"
              />
              <div>
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 検証アナリスト: {reviewer.name}
                </p>
                <p className="text-[11px] text-slate-400">{reviewer.role} （専門: {reviewer.specialty}）</p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-bold hidden sm:inline">プロフィールを見る ➔</span>
          </div>

          {/* Direct Answer Summary Block */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-xl space-y-3">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {article.introText}
            </p>
          </div>

          {/* Product Visual & Buy Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-slate-950/60 p-6 rounded-2xl border border-amber-500/20">
            <div className="col-span-1 md:col-span-5 rounded-2xl overflow-hidden border border-amber-500/20 shadow-lg aspect-square bg-slate-950 relative">
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
                <h2 className="text-xl font-extrabold text-white mb-2 font-serif-brand">
                  {article.productName || article.title}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {article.introText}
                </p>
              </div>

              {/* Selling Points */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-serif-brand">
                  注目検証ポイント
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {article.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rakuten Affiliate Link CTA Button */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">楽天市場参考価格:</span>
                  <span className="font-extrabold text-amber-300 text-base">{article.rakutenPrice}</span>
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

          {/* Full Markdown Review Article Body */}
          <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed border-t border-amber-500/20 pt-8 font-light">
            <MarkdownRenderer content={article.reviewBody} onNavigate={onNavigate} />
          </div>

          {/* Pros and Cons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-amber-500/30 space-y-3">
              <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2 font-serif-brand">
                <span className="text-amber-400">👍</span> 美容効果・おすすめポイント
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {article.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">・</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-amber-500/30 space-y-3">
              <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2 font-serif-brand">
                <span className="text-amber-400">💡</span> 選ぶ際の留意点
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {article.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">・</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Recommended Products */}
          <div className="pt-10 border-t border-amber-500/20 space-y-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-white font-serif-brand">
              関連厳選コスメ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate(`/articles/${rel.id}`)}
                  className="bg-slate-950 p-4 rounded-2xl border border-amber-500/20 hover:border-amber-400/50 transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900 border border-amber-500/10">
                    <img
                      src={getRakutenOptimizedImageUrl(rel.imageUrl)}
                      alt={rel.productName || rel.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-xs text-slate-200 font-bold group-hover:text-amber-300 transition flex items-center justify-between font-serif-brand">
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
