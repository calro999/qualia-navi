import React from 'react';
import { INITIAL_COMPARISONS, INITIAL_ARTICLES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { ShoppingCart, ExternalLink, ShieldCheck } from 'lucide-react';

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
      <article className="max-w-4xl mx-auto qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-purple-600 transition">
            コスメTOP
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-[200px]">
            VS対決比較
          </span>
        </nav>

        {/* Title Header */}
        <div className="space-y-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
            ターゲット: {comparison.targetUserCategory}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {comparison.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            {comparison.subtitle}
          </p>
        </div>

        {/* Verdict Summary Block */}
        <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-3">
          <div className="text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>QUALIA BEAUTY VERDICT (対決結論)</span>
          </div>
          <p className="text-xs sm:text-sm text-white leading-relaxed font-medium">
            {comparison.verdictSummary}
          </p>
        </div>

        {/* VS 2 Item Match Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item A */}
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-square bg-sky-50 rounded-xl overflow-hidden">
                <img src={itemA.imageUrl} alt={itemA.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{itemA.productName || itemA.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{itemA.introText}</p>
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
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-square bg-sky-50 rounded-xl overflow-hidden">
                <img src={itemB.imageUrl} alt={itemB.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{itemB.productName || itemB.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{itemB.introText}</p>
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
        <div className="space-y-4 pt-4 border-t border-sky-100">
          <h3 className="text-lg font-extrabold text-slate-900">使用シーン別・勝者判定マトリクス</h3>
          <div className="space-y-3">
            {comparison.comparisonPoints.map((pt, idx) => (
              <div key={idx} className="bg-purple-50/70 p-4 rounded-xl border border-purple-100 space-y-1">
                <div className="text-xs font-bold text-purple-700">【シーン】{pt.scene}</div>
                <div className="text-xs font-medium text-slate-800">{pt.reason}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed border-t border-sky-100 pt-8">
          <MarkdownRenderer content={comparison.contentMarkdown} onNavigate={onNavigate} />
        </div>
      </article>
    </div>
  );
}
