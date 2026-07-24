import React from 'react';
import { INITIAL_COMPARISONS, INITIAL_ARTICLES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { ShoppingCart, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';

interface ProductComparisonPageProps {
  compareId: string;
  onNavigate: (path: string) => void;
}

export function ProductComparisonPage({ compareId, onNavigate }: ProductComparisonPageProps) {
  const comparison = INITIAL_COMPARISONS.find((c) => c.id === compareId || c.slug === compareId) || INITIAL_COMPARISONS[0];

  const itemA = INITIAL_ARTICLES.find((a) => a.itemCode === comparison.productItemCodeA || a.id === comparison.productItemCodeA) || INITIAL_ARTICLES[0];
  const itemB = INITIAL_ARTICLES.find((a) => a.itemCode === comparison.productItemCodeB || a.id === comparison.productItemCodeB) || INITIAL_ARTICLES[2];

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: `${comparison.title} | Qualia Navi`,
      description: comparison.subtitle,
      urlPath: `/compare/${comparison.id}`
    });
  }, [comparison]);

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>トップ一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition">
              コスメTOP
            </button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px]">
              VS対決比較
            </span>
          </nav>

          {/* Title Header */}
          <div className="space-y-3">
            <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-md inline-block">
              ターゲット: {comparison.targetUserCategory}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-serif-brand">
              {comparison.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {comparison.subtitle}
            </p>
          </div>

          {/* Verdict Summary Block */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-3">
            <div className="text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-serif-brand">
              <ShieldCheck className="w-4 h-4" />
              <span>QUALIA BEAUTY VERDICT (対決結論)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              {comparison.verdictSummary}
            </p>
          </div>

          {/* VS 2 Item Match Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Item A */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <img src={getRakutenOptimizedImageUrl(itemA.imageUrl)} alt={itemA.title} onError={handleImageError} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base font-serif-brand">{itemA.productName || itemA.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{itemA.introText}</p>
              </div>
              <a
                href={itemA.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rakuten-btn w-full py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{itemA.productName} 楽天最安値を見る</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Item B */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                  <img src={getRakutenOptimizedImageUrl(itemB.imageUrl)} alt={itemB.title} onError={handleImageError} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base font-serif-brand">{itemB.productName || itemB.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{itemB.introText}</p>
              </div>
              <a
                href={itemB.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rakuten-btn w-full py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{itemB.productName} 楽天最安値を見る</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Comparison Points Matrix */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 font-serif-brand">使用シーン別・勝者判定マトリクス</h3>
            <div className="space-y-3">
              {comparison.comparisonPoints.map((pt, idx) => (
                <div key={idx} className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 space-y-1">
                  <div className="text-xs font-bold text-rose-800">【シーン】{pt.scene}</div>
                  <div className="text-xs font-normal text-slate-700">{pt.reason}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="prose max-w-none text-slate-800 leading-relaxed border-t border-slate-200 pt-8 font-normal">
            <MarkdownRenderer content={comparison.contentMarkdown} onNavigate={onNavigate} />
          </div>
        </article>
      </div>
    </div>
  );
}
