import React from 'react';
import { INITIAL_COMPARISONS, INITIAL_ARTICLES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { InternalLinkMesh } from '../components/InternalLinkMesh';
import { useRakutenPromoMicrocopy } from '../components/InlineProductCtaBox';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata, generateComparisonJsonLd } from '../utils/seoGeo';
import { generateOptimizedComparisonTitle } from '../utils/seoKeywords';
import { getCleanAffiliateLink } from '../utils/productUtils';
import { ShoppingCart, ExternalLink, ShieldCheck, ArrowLeft, Trophy, ArrowRight, Star } from 'lucide-react';
import { RakutenBeginnerGuideBanner } from '../components/RakutenBeginnerGuideBanner';

interface ProductComparisonPageProps {
  compareId: string;
  onNavigate: (path: string) => void;
}

export function ProductComparisonPage({ compareId, onNavigate }: ProductComparisonPageProps) {
  const comparison = INITIAL_COMPARISONS.find((c) => c.id === compareId || c.slug === compareId);
  const promo = useRakutenPromoMicrocopy();

  const itemA = React.useMemo(() => {
    if (!comparison) return INITIAL_ARTICLES[0];
    return (
      INITIAL_ARTICLES.find(
        (a) => a.itemCode === comparison.productItemCodeA || a.id === comparison.productItemCodeA
      ) || INITIAL_ARTICLES[0]
    );
  }, [comparison]);

  const itemB = React.useMemo(() => {
    if (!comparison) return INITIAL_ARTICLES[1];
    return (
      INITIAL_ARTICLES.find(
        (a) => a.itemCode === comparison.productItemCodeB || a.id === comparison.productItemCodeB
      ) || INITIAL_ARTICLES[1]
    );
  }, [comparison]);

  React.useEffect(() => {
    if (comparison && itemA && itemB) {
      const jsonLd = generateComparisonJsonLd(comparison, itemA, itemB, window.location.origin);
      updateSeoGeoMetadata({
        title: generateOptimizedComparisonTitle(comparison),
        description: comparison.verdictSummary || comparison.subtitle,
        imageUrl: comparison.coverImage || itemA.imageUrl,
        urlPath: `/comparisons/${comparison.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [comparison, itemA, itemB]);

  if (!comparison) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl space-y-4 my-8 border border-rose-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif-brand">
          指定された対決比較ページが見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/comparisons')}
          className="gold-btn px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          比較一覧へ戻る
        </button>
      </div>
    );
  }

  const cleanUrlA = getCleanAffiliateLink(itemA);
  const cleanUrlB = getCleanAffiliateLink(itemB);
  const nameA = itemA.productName || itemA.title;
  const nameB = itemB.productName || itemB.title;

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/comparisons')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VS比較対決一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition cursor-pointer">
              コスメTOP
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('/comparisons')} className="hover:text-rose-600 transition cursor-pointer">
              VS対決比較
            </button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px]">
              {comparison.title}
            </span>
          </nav>

          {/* Title Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-extrabold rounded-full">
                ⚔️ ターゲット: {comparison.targetUserCategory}
              </span>
              <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-full">
                {promo.badge}
              </span>
            </div>
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
              <span>QUALIA BEAUTY VERDICT (3秒でわかる対決結論)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              {comparison.verdictSummary}
            </p>
          </div>

          {/* 【CTA 1（冒頭）】VS 2 Item Match Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Item A */}
            <div className="bg-white p-6 rounded-2xl border-2 border-rose-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-rose-600 text-white font-black text-[11px] rounded-full">
                    ENTRY A
                  </span>
                  <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {(itemA.starRating || 4.8).toFixed(1)}
                  </span>
                </div>
                <div
                  onClick={() => onNavigate(`/articles/${itemA.id}`)}
                  className="aspect-square max-h-48 mx-auto bg-slate-50 rounded-xl overflow-hidden border border-slate-100 p-3 flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={getRakutenOptimizedImageUrl(itemA.imageUrl)}
                    alt={nameA}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="max-h-full max-w-full object-contain bg-white group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3
                  onClick={() => onNavigate(`/articles/${itemA.id}`)}
                  className="font-extrabold text-slate-900 hover:text-rose-600 text-base font-serif-brand cursor-pointer transition-colors"
                >
                  {nameA}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{itemA.introText}</p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">参考価格:</span>
                  <span className="font-black text-rose-600 text-sm">{itemA.rakutenPrice || 'オープン価格'}</span>
                </div>
                <a
                  href={cleanUrlA}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rakuten-btn w-full py-3 px-4 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>楽天市場で最安値・在庫を見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => onNavigate(`/articles/${itemA.id}`)}
                  className="w-full py-2 text-[11px] font-bold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <span>単体レビュー記事を読む</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Item B */}
            <div className="bg-white p-6 rounded-2xl border-2 border-indigo-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-black text-[11px] rounded-full">
                    ENTRY B
                  </span>
                  <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {(itemB.starRating || 4.8).toFixed(1)}
                  </span>
                </div>
                <div
                  onClick={() => onNavigate(`/articles/${itemB.id}`)}
                  className="aspect-square max-h-48 mx-auto bg-slate-50 rounded-xl overflow-hidden border border-slate-100 p-3 flex items-center justify-center cursor-pointer group"
                >
                  <img
                    src={getRakutenOptimizedImageUrl(itemB.imageUrl)}
                    alt={nameB}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="max-h-full max-w-full object-contain bg-white group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3
                  onClick={() => onNavigate(`/articles/${itemB.id}`)}
                  className="font-extrabold text-slate-900 hover:text-indigo-600 text-base font-serif-brand cursor-pointer transition-colors"
                >
                  {nameB}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{itemB.introText}</p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">参考価格:</span>
                  <span className="font-black text-indigo-600 text-sm">{itemB.rakutenPrice || 'オープン価格'}</span>
                </div>
                <a
                  href={cleanUrlB}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rakuten-btn w-full py-3 px-4 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>楽天市場で最安値・在庫を見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => onNavigate(`/articles/${itemB.id}`)}
                  className="w-full py-2 text-[11px] font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <span>単体レビュー記事を読む</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 【CTA 2（中盤）】High-Quality Spec Comparison Table (with CTA Row) */}
          <div className="space-y-4 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900 font-serif-brand text-center">スペック＆特徴 徹底比較表</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-sm text-left border-collapse min-w-[520px]">
                <thead>
                  <tr>
                    <th className="p-3.5 border-b-2 border-slate-300 bg-slate-50 w-1/4 text-slate-600 font-extrabold text-xs">比較項目</th>
                    <th className="p-3.5 border-b-2 border-rose-300 bg-rose-50/60 w-3/8 text-rose-900 font-extrabold text-center text-xs sm:text-sm">{nameA}</th>
                    <th className="p-3.5 border-b-2 border-indigo-300 bg-indigo-50/60 w-3/8 text-indigo-900 font-extrabold text-center text-xs sm:text-sm">{nameB}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td className="p-3.5 bg-slate-50 font-bold text-slate-700">参考価格</td>
                    <td className="p-3.5 text-center font-black text-rose-600">{itemA.rakutenPrice || 'オープン価格'}</td>
                    <td className="p-3.5 text-center font-black text-indigo-600">{itemB.rakutenPrice || 'オープン価格'}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 bg-slate-50 font-bold text-slate-700">ユーザー評価</td>
                    <td className="p-3.5 text-center text-amber-500 font-bold">★ {(itemA.starRating || 4.8).toFixed(1)} <span className="text-xs text-slate-400">({itemA.reviewCount || 120}件)</span></td>
                    <td className="p-3.5 text-center text-amber-500 font-bold">★ {(itemB.starRating || 4.8).toFixed(1)} <span className="text-xs text-slate-400">({itemB.reviewCount || 120}件)</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 bg-slate-50 font-bold text-slate-700">主な特徴</td>
                    <td className="p-3.5">
                      <ul className="text-xs space-y-1 list-disc pl-4 text-slate-600">
                        {itemA.features?.map((f: string, i: number) => <li key={i}>{f}</li>) || <li>{itemA.introText}</li>}
                      </ul>
                    </td>
                    <td className="p-3.5">
                      <ul className="text-xs space-y-1 list-disc pl-4 text-slate-600">
                        {itemB.features?.map((f: string, i: number) => <li key={i}>{f}</li>) || <li>{itemB.introText}</li>}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 bg-slate-50 font-bold text-slate-700">強み・メリット</td>
                    <td className="p-3.5 text-rose-700 text-xs font-semibold">
                      {itemA.pros?.join(' / ') || '高い保湿力と肌なじみの良さ'}
                    </td>
                    <td className="p-3.5 text-indigo-700 text-xs font-semibold">
                      {itemB.pros?.join(' / ') || '優れたコスパと続けやすい使用感'}
                    </td>
                  </tr>
                  <tr className="bg-rose-50/20">
                    <td className="p-3.5 bg-slate-50 font-extrabold text-slate-800">最安値・在庫確認</td>
                    <td className="p-3.5 text-center">
                      <a
                        href={cleanUrlA}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center justify-center gap-1 w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>楽天で見る ↗</span>
                      </a>
                    </td>
                    <td className="p-3.5 text-center">
                      <a
                        href={cleanUrlB}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center justify-center gap-1 w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-xs transition"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>楽天で見る ↗</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 目次 */}
          <TableOfContents content={comparison.contentMarkdown || ''} />

          {/* Comparison Points Matrix */}
          {comparison.comparisonPoints && comparison.comparisonPoints.length > 0 && (
            <div className="space-y-4 pt-8 border-t border-slate-200">
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
          )}

          {/* Article Body */}
          <div className="prose max-w-none text-slate-800 leading-relaxed border-t border-slate-200 pt-8 font-normal">
            <MarkdownRenderer content={comparison.contentMarkdown} onNavigate={onNavigate} />
          </div>

          {/* 【CTA 3（終盤）】記事読了直後の「最終勝敗ジャッジ＆2商品即決ボックス」 */}
          <div className="my-10 bg-gradient-to-br from-purple-50/70 via-white to-rose-50/70 border-2 border-purple-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-purple-100 pb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-base sm:text-xl font-black text-slate-900 font-serif-brand">
                  最終結論：あなたが選ぶべき1本はこっち！
                </h3>
              </div>
              <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                {promo.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-white/90 p-4 rounded-2xl border border-slate-200">
              {comparison.verdictSummary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-rose-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={getRakutenOptimizedImageUrl(itemA.imageUrl)}
                    alt={nameA}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-14 h-14 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black text-rose-600">ENTRY A</span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate font-serif-brand">{nameA}</h4>
                    <div className="text-xs font-black text-rose-600 mt-0.5">{itemA.rakutenPrice || 'オープン価格'}</div>
                  </div>
                </div>
                <a
                  href={cleanUrlA}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rakuten-btn w-full py-3 px-4 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{nameA.slice(0, 14)}...を楽天で見る ↗</span>
                </a>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-indigo-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={getRakutenOptimizedImageUrl(itemB.imageUrl)}
                    alt={nameB}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-14 h-14 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black text-indigo-600">ENTRY B</span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate font-serif-brand">{nameB}</h4>
                    <div className="text-xs font-black text-indigo-600 mt-0.5">{itemB.rakutenPrice || 'オープン価格'}</div>
                  </div>
                </div>
                <a
                  href={cleanUrlB}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="rakuten-btn w-full py-3 px-4 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{nameB.slice(0, 14)}...を楽天で見る ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* SNS Share & Bookmark */}
          <ShareButtons title={comparison.title} description={comparison.subtitle} />

          {/* 初めて楽天市場を利用する方向けの安心購入・攻略ガイドへの導線 */}
          <RakutenBeginnerGuideBanner onNavigate={onNavigate} />

          {/* 動的内部リンクメッシュ */}
          <InternalLinkMesh
            currentArticleId={itemA.id}
            category={itemA.category || 'skincare'}
            onNavigate={onNavigate}
          />
        </article>
      </div>
    </div>
  );
}
