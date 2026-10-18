import React, { useState, useEffect, useMemo } from 'react';
import { RakutenProductArticle } from '../types';
import { AUTHOR_PROFILES, INITIAL_COMPARISONS, INITIAL_BLOG_POSTS } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { InternalLinkMesh } from '../components/InternalLinkMesh';
import { InlineProductCtaBox, useRakutenPromoMicrocopy } from '../components/InlineProductCtaBox';
import { QuickComparisonTable } from '../components/QuickComparisonTable';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { generateProductJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { generateOptimizedProductTitle, generateOptimizedProductDescription } from '../utils/seoKeywords';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { ShoppingCart, Star, CheckCircle, ShieldCheck, ArrowLeft, Heart, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { getCleanAffiliateLink, deduplicateArticles } from '../utils/productUtils';
import { RakutenBeginnerGuideBanner, RAKUTEN_BEGINNER_GUIDE_ID } from '../components/RakutenBeginnerGuideBanner';
import { NextActionGuide } from '../components/NextActionGuide';

interface ProductDetailPageProps {
  articleId: string;
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

/** Markdown+生HTML混在コンテンツをHTMLに変換する（テーブル・番号付きリスト・生HTML対応） */
function convertMixedContentToHtml(content: string): string {
  if (!content) return '';
  const lines = content.split('\n');
  const result: string[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (inTable && tableHeaders.length > 0) {
      let tableHtml = '<div style="overflow-x:auto;margin:24px 0;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 1px 3px rgba(0,0,0,0.05);"><table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.875rem;">';
      tableHtml += '<thead style="background:#f8fafc;border-bottom:2px solid #e2e8f0;"><tr>';
      tableHeaders.forEach(th => {
        tableHtml += `<th style="padding:10px 14px;font-weight:700;color:#334155;">${inlineMarkdown(th)}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';
      tableRows.forEach((row, rIdx) => {
        const bg = rIdx % 2 === 0 ? '#ffffff' : '#fdfaf9';
        tableHtml += `<tr style="background:${bg};border-bottom:1px solid #f1f5f9;">`;
        row.forEach(td => {
          tableHtml += `<td style="padding:10px 14px;color:#475569;vertical-align:top;">${inlineMarkdown(td)}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      result.push(tableHtml);
    }
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
      if (cells.every(c => c.replace(/[:\-]/g, '') === '')) {
        inTable = true;
        continue;
      }
      if (!inTable && tableHeaders.length === 0) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (!trimmed) {
      result.push('');
      continue;
    }

    if (trimmed.startsWith('<')) {
      result.push(line);
      continue;
    }

    if (trimmed.startsWith('# ')) {
      const text = trimmed.replace(/^#\s+/, '');
      result.push(`<h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin:2rem 0 1rem;padding-bottom:0.5rem;border-bottom:2px solid #f43f5e;">${inlineMarkdown(text)}</h2>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^##\s+/, '');
      result.push(`<h3 style="font-size:1.25rem;font-weight:800;color:#0f172a;margin:1.5rem 0 0.75rem;border-left:4px solid #f43f5e;padding-left:12px;">${inlineMarkdown(text)}</h3>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^###\s+/, '');
      result.push(`<h4 style="font-size:1.15rem;font-weight:700;color:#1e293b;margin:1.5rem 0 0.75rem;background:#fff1f2;padding:8px 14px;border-radius:10px;border-left:4px solid #f43f5e;">${inlineMarkdown(text)}</h4>`);
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      const text = trimmed.replace(/^####\s+/, '');
      result.push(`<h5 style="font-size:1.02rem;font-weight:700;color:#334155;margin:1.25rem 0 0.5rem;padding-bottom:4px;border-bottom:1px dashed #cbd5e1;display:flex;align-items:center;gap:6px;"><span style="color:#f43f5e;font-size:0.85em;">✦</span>${inlineMarkdown(text)}</h5>`);
      continue;
    }
    if (trimmed.startsWith('##### ')) {
      const text = trimmed.replace(/^#####\s+/, '');
      result.push(`<h6 style="font-size:0.95rem;font-weight:700;color:#475569;margin:1rem 0 0.5rem;">${inlineMarkdown(text)}</h6>`);
      continue;
    }

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      const num = numMatch[1];
      const text = numMatch[2];
      result.push(`<div style="display:flex;gap:10px;align-items:flex-start;padding:10px 14px;margin:6px 0;background:#ffffff;border-radius:12px;border:1px solid #fee2e2;box-shadow:0 1px 2px rgba(0,0,0,0.02);font-size:0.92rem;"><span style="background:#f43f5e;color:#ffffff;font-weight:800;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;flex-shrink:0;margin-top:2px;">${num}</span><span style="color:#1e293b;line-height:1.6;">${inlineMarkdown(text)}</span></div>`);
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('・')) {
      const text = trimmed.replace(/^[-*・]\s*/, '');
      result.push(`<div style="display:flex;gap:8px;align-items:flex-start;padding:8px 12px;margin:4px 0;background:#fff1f2;border-radius:10px;border:1px solid #fecdd3;font-size:0.9rem;"><span style="color:#f43f5e;font-weight:800;flex-shrink:0;">✦</span><span style="color:#334155;line-height:1.6;">${inlineMarkdown(text)}</span></div>`);
      continue;
    }

    if (trimmed.startsWith('> ')) {
      const text = trimmed.replace(/^>\s*/, '');
      result.push(`<blockquote style="border-left:4px solid #cbd5e1;background:#f8fafc;padding:12px 16px;margin:12px 0;border-radius:0 10px 10px 0;font-style:italic;color:#475569;font-size:0.9rem;">${inlineMarkdown(text)}</blockquote>`);
      continue;
    }

    if (trimmed === '---') {
      result.push('<hr style="border:none;border-top:2px dashed #fecdd3;margin:2rem 0;" />');
      continue;
    }

    if (trimmed.startsWith('```')) {
      continue;
    }

    result.push(`<p style="color:#334155;font-size:0.95rem;line-height:1.8;margin-bottom:1rem;">${inlineMarkdown(trimmed)}</p>`);
  }

  flushTable();
  return result.join('\n');
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:12px;margin:8px 0;" loading="lazy" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, (_, label, href) => {
      const isAffiliate = href.includes('rakuten') || href.includes('hb.afl');
      if (isAffiliate || label.includes('🛍️') || label.includes('楽天')) {
        return `<div style="margin:14px 0;"><div style="font-size:0.72rem;font-weight:800;color:#e11d48;margin-bottom:4px;">✨ 楽天ポイント還元・リアルタイム最安値＆口コミを確認</div><a href="${href}" target="_blank" rel="nofollow noopener noreferrer sponsored" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#f43f5e,#e11d48);color:#fff;font-weight:800;font-size:0.92rem;padding:12px 24px;border-radius:14px;text-decoration:none;box-shadow:0 4px 12px rgba(244,63,94,0.3);">🛒 ${label} ↗</a></div>`;
      }
      const isInternal = href.startsWith('/');
      const targetAttr = isInternal ? '' : 'target="_blank" rel="noopener noreferrer"';
      return `<a href="${href}" ${targetAttr} style="color:#e11d48;font-weight:700;text-decoration:underline;">${label}</a>`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:800;color:#0f172a;background:#ffe4e6;padding:1px 4px;border-radius:4px;">$1</strong>')
    .replace(/`(.*?)`/g, '<code style="font-family:monospace;font-size:0.85em;color:#e11d48;background:#fff1f2;padding:2px 6px;border-radius:4px;">$1</code>');
}

export function ProductDetailPage({ articleId, articles, onNavigate }: ProductDetailPageProps) {
  const catalogArticle = articles.find((a) => a.id === articleId || a.itemCode === articleId);
  const [article, setArticle] = useState<RakutenProductArticle | null>(catalogArticle || null);
  const [favorited, setFavorited] = useState(false);
  const promo = useRakutenPromoMicrocopy();

  useEffect(() => {
    const current = articles.find((a) => a.id === articleId || a.itemCode === articleId);
    if (current && (current.reviewBody || current.content)) {
      setArticle(current);
    } else {
      if (current) setArticle(current);
      fetch(`/data/articles/${articleId}.json`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setArticle(data);
          }
        })
        .catch(() => {
          // keep catalog fallback
        });
    }
  }, [articleId, articles]);

  useEffect(() => {
    if (article) {
      setFavorited(isFavorite(article.id) || (article.itemCode ? isFavorite(article.itemCode) : false));
    }
  }, [article]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!article) return;
    const targetId = article.id || article.itemCode;
    const nextState = toggleFavorite(targetId);
    setFavorited(nextState);
  };

  React.useEffect(() => {
    if (article) {
      try {
        const jsonLd = generateProductJsonLd(article as any, window.location.origin);
        const optTitle = generateOptimizedProductTitle(article);
        const optDesc = generateOptimizedProductDescription(article);
        updateSeoGeoMetadata({
          title: optTitle,
          description: optDesc,
          imageUrl: article.imageUrl || (article as any).image || '',
          urlPath: `/articles/${article.id}`,
          jsonLdSchema: jsonLd
        });
      } catch (e) {
        console.warn('[ProductDetailPage] SEO metadata generation failed:', e);
      }
    }
  }, [article]);

  const uniqueSingleArticles = useMemo(() => {
    return deduplicateArticles(
      articles.filter(
        a =>
          !(a as any).isContentArticle &&
          !a.id.includes('10sen') &&
          !a.title.includes('10選') &&
          !a.id.startsWith('feat-') &&
          !a.id.startsWith('blog-')
      )
    );
  }, [articles]);

  // コンテンツ型記事内での内部リンククリックをSPA遷移にハンドリング
  const handleHtmlBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as HTMLElement).closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        const normalized = href
          .replace(/^\/blog\//, '/features/')
          .replace(/^\/blogs\//, '/features/')
          .replace(/^\/compare\//, '/comparisons/');
        onNavigate(normalized);
      }
    }
  };

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-serif-brand">
          指定されたコスメ・美容記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/')}
          className="gold-btn px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          コスメ一覧へ戻る
        </button>
      </div>
    );
  }

  // ── コンテンツ型記事（10選・まとめ記事等）の場合は専用レイアウト ──
  const isContentArticle = Boolean(
    article.isContentArticle ||
    article.id.includes('10sen') ||
    article.id.startsWith('feat-') ||
    article.id.startsWith('blog-') ||
    /10選|総まとめ|完全ガイド/.test(article.title || '')
  );

  if (isContentArticle) {
    const ca = article as any;
    const reviewer2 = AUTHOR_PROFILES.find((a) => a.name === ca.author || a.name === ca.reviewerName) || AUTHOR_PROFILES[0];
    const quickTableItems = uniqueSingleArticles
      .filter((a) => a.id !== ca.id && (a.category === ca.category || !ca.category))
      .slice(0, 5);

    return (
      <div className="py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => onNavigate(article.id.includes('10sen') || article.title.includes('10選') ? '/features' : '/')}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{article.id.includes('10sen') || article.title.includes('10選') ? '特集記事一覧へ戻る' : 'コスメ図鑑へ戻る'}</span>
          </button>

          <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
            {/* Breadcrumb & Favorite */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
                <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition cursor-pointer">コスメTOP</button>
                <span>/</span>
                <button onClick={() => onNavigate('/features')} className="hover:text-rose-600 transition cursor-pointer">記事特集</button>
                <span>/</span>
                <button
                  onClick={() => onNavigate(`/?category=${encodeURIComponent(ca.category || 'all')}`)}
                  className="text-rose-700 font-bold bg-rose-50 hover:bg-rose-100 px-2.5 py-0.5 rounded-md text-xs border border-rose-100 cursor-pointer transition"
                >
                  {ca.categoryLabel || ca.category || 'コスメ特集'}
                </button>
                <span>/</span>
                <span className="text-slate-800 font-bold truncate max-w-[200px]">{ca.title}</span>
              </nav>

              <button
                onClick={handleToggleFavorite}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer border ${
                  favorited
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
                <span>{favorited ? 'キープ中' : 'キープ・お気に入り'}</span>
              </button>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  2026年10月 最新検証・価格情報更新
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight font-serif-brand">
                {ca.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">{ca.description || ca.introText}</p>
            </div>

            {/* Reviewer Meta */}
            <div
              onClick={() => onNavigate(`/authors/${reviewer2.id}`)}
              className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 flex items-center justify-between cursor-pointer hover:bg-rose-100/80 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={reviewer2.avatarUrl}
                  alt={reviewer2.name}
                  className="w-12 h-12 rounded-xl object-cover border border-rose-300 shadow-xs"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-600" /> 記事担当: {reviewer2.name}
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium">担当部門: {reviewer2.assignedDepartment || reviewer2.role}</p>
                </div>
              </div>
              <span className="text-xs text-rose-700 font-bold hidden sm:inline">プロフィール・担当記事 ➔</span>
            </div>

            {/* 目次 */}
            <TableOfContents content={ca.content || ''} />

            {/* 【CTA 1（冒頭）】即決比較早見表 */}
            {quickTableItems.length > 0 && (
              <QuickComparisonTable
                items={quickTableItems}
                title="このテーマで今すぐチェックしたい注目コスメ早見表"
                onNavigate={onNavigate}
              />
            )}

            {/* Main Content（内部に【CTA 2】各商品の楽天ボタンを含む） */}
            <div
              onClick={handleHtmlBodyClick}
              className="prose max-w-none text-slate-800 leading-relaxed font-normal content-article-body"
              dangerouslySetInnerHTML={{ __html: convertMixedContentToHtml(ca.content) }}
            />

            {/* SNS Share */}
            <ShareButtons title={ca.title} description={ca.description || ca.introText} />

            {/* 【CTA 3（終盤）】記事読了直後の注目コスメ購入＆詳細カードグリッド */}
            {quickTableItems.length > 0 && (
              <div className="pt-8 border-t-2 border-rose-200 space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif-brand">
                    🛍️ あわせて最安値をチェックしたい同カテゴリの名品コスメ
                  </h3>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                    {promo.badge}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickTableItems.slice(0, 3).map((rel) => (
                    <div
                      key={rel.id}
                      className="bg-white p-4 rounded-2xl border border-rose-100 hover:border-rose-300 transition flex flex-col justify-between group shadow-xs space-y-3"
                    >
                      <div
                        onClick={() => onNavigate(`/articles/${rel.id}`)}
                        className="cursor-pointer space-y-2"
                      >
                        <div className="relative aspect-square max-h-36 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                          <img
                            src={getRakutenOptimizedImageUrl(rel.imageUrl)}
                            alt={rel.productName || rel.title}
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                            className="max-h-full max-w-full object-contain bg-white group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="text-xs text-slate-900 font-extrabold group-hover:text-rose-600 transition line-clamp-2 font-serif-brand">
                          {rel.productName || rel.title}
                        </div>
                        <div className="text-xs font-black text-rose-600">
                          {rel.rakutenPrice || 'オープン価格'}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <a
                          href={getCleanAffiliateLink(rel)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="rakuten-btn w-full py-2.5 px-3 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>楽天最安値を見る ↗</span>
                        </a>
                        <button
                          onClick={() => onNavigate(`/articles/${rel.id}`)}
                          className="w-full py-1.5 text-[11px] font-bold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        >
                          詳細検証レビューを読む ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Beginner Guide Banner */}
            {ca.id !== RAKUTEN_BEGINNER_GUIDE_ID && (
              <RakutenBeginnerGuideBanner onNavigate={onNavigate} />
            )}

            <InternalLinkMesh currentArticleId={ca.id} category={ca.category} onNavigate={onNavigate} />
          </article>
        </div>
      </div>
    );
  }

  // ── 個別商品レビュー記事レイアウト（1記事内に3回のインラインCTAを最適配置） ──
  const reviewer = AUTHOR_PROFILES.find((a) => a.name === article.reviewerName) || AUTHOR_PROFILES[0];

  const relatedProducts = uniqueSingleArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  if (relatedProducts.length < 3) {
    const extra = uniqueSingleArticles.filter(a => a.id !== article.id && !relatedProducts.includes(a)).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extra);
  }

  const relatedComparison = INITIAL_COMPARISONS.find(
    (c) => c.productItemCodeA === article.itemCode || c.productItemCodeB === article.itemCode || c.productItemCodeA === article.id || c.productItemCodeB === article.id
  );

  // この個別商品が選出された10〜1月の親10選特集（または同カテゴリの秋冬10選特集）を特定
  const parentFeatureBlog = (article.parentFeatureSlug
    ? INITIAL_BLOG_POSTS.find(
        b => b.id === article.parentFeatureSlug || b.slug === article.parentFeatureSlug || b.id === `feat-${article.parentFeatureSlug}`
      )
    : undefined) ||
    INITIAL_BLOG_POSTS.find(
      b =>
        Array.isArray(b.recommendedItemCodes) &&
        (b.recommendedItemCodes.includes(article.itemCode) || b.recommendedItemCodes.includes(article.id))
    ) ||
    INITIAL_BLOG_POSTS.find(b => b.id === 'feat-autumn-cosmetics-guide-45-series-hub');

  const bodyMarkdown = article.reviewBody || article.content || article.introText || '';

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>コスメ一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          {/* Breadcrumb & Favorite */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
              <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition cursor-pointer">
                コスメTOP
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigate(`/?category=${encodeURIComponent(article.category || 'all')}`)}
                className="text-rose-700 font-bold bg-rose-50 hover:bg-rose-100 px-2.5 py-0.5 rounded-md text-xs border border-rose-100 cursor-pointer transition"
              >
                {article.categoryLabel || article.category}
              </button>
              <span>/</span>
              <span className="text-slate-800 font-bold truncate max-w-[200px]">
                {article.productName || article.title}
              </span>
            </nav>

            <button
              onClick={handleToggleFavorite}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer border ${
                favorited
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
              <span>{favorited ? 'キープ中' : 'キープ・お気に入り'}</span>
            </button>
          </div>

          {/* Title Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full">
                {article.categoryLabel || article.category}
              </span>
              <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                {(typeof article.starRating === 'number' ? article.starRating : 4.8).toFixed(1)}
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 ml-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                2026年10月 検証・最新価格チェック済
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
            <span className="text-xs text-rose-700 font-bold hidden sm:inline">プロフィール・担当記事 ➔</span>
          </div>

          {/* 目次 */}
          <TableOfContents content={article.reviewBody || ''} />

          {/* Intro Block */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-2">
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              {article.introText}
            </p>
          </div>

          {/* 【CTA 1（冒頭）】Product Visual & Buy Box */}
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
              {article.features && article.features.length > 0 && (
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
              )}

              {/* CTA 1 Button */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">楽天市場 最安値参考:</span>
                  <span className="font-extrabold text-rose-600 text-base">{article.rakutenPrice}</span>
                </div>
                <div className="flex flex-col gap-1.5 items-center">
                  <div className="text-rose-700 bg-rose-100/90 px-3 py-1 rounded-full font-black text-xs tracking-wide">
                    {promo.badge}
                  </div>
                  <a
                    href={getCleanAffiliateLink(article)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm rounded-2xl transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{article.ctaTitle || '楽天市場で現在の最安値をチェックする 👉'}</span>
                  </a>
                  <div className="text-slate-500 text-[10px] mt-1 font-bold flex items-center gap-1">
                    <span className="text-rose-500">※</span>{promo.subText}
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

          {/* 【CTA 2（中盤）】メリット・デメリット確認直後のインラインCTA */}
          <InlineProductCtaBox article={article} variant="mid" />

          {/* Expert Review Markdown */}
          <div className="prose max-w-none text-slate-800 leading-relaxed font-normal mt-8 pt-8 border-t border-slate-200">
            <MarkdownRenderer content={bodyMarkdown} onNavigate={onNavigate} />
          </div>

          {/* 🍁🎄 親10選特集への逆引きピラーバナー（個別記事→10〜1月特集への回遊強化） */}
          {parentFeatureBlog && (
            <div
              onClick={() => onNavigate(`/features/${parentFeatureBlog.id}`)}
              className="mt-8 bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border-2 border-rose-200 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wide">
                  <BookOpen className="w-3 h-3" />
                  <span>10-1月 秋冬・ホリデー10選比較ガイド掲載アイテム</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug font-serif-brand">
                  {parentFeatureBlog.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  このアイテムと他の人気ライバル商品を横並びで徹底比較した「厳選10選ガイド」はこちら
                </p>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-rose-600 group-hover:bg-rose-700 text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 shadow-xs transition">
                <span>10選比較を読む</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

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

          {/* 【CTA 3（終盤）】記事読了・FAQ確認直後の決定版ファイナルCTAボックス */}
          <InlineProductCtaBox article={article} variant="final" />

          {/* SNS Share & Bookmark Buttons */}
          <ShareButtons title={article.title} description={article.introText} />

          {/* 初めて楽天市場を利用する方向けの安心購入・攻略ガイドへの導線 */}
          {article.id !== RAKUTEN_BEGINNER_GUIDE_ID && (
            <RakutenBeginnerGuideBanner onNavigate={onNavigate} />
          )}

          {/* Related Comparison Banner (if available) */}
          {relatedComparison && (
            <div 
              onClick={() => onNavigate(`/comparisons/${relatedComparison.id}`)}
              className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-5 rounded-2xl cursor-pointer hover:shadow-md transition group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">⚔️ ライバル対決</span>
                <span className="text-purple-800 font-extrabold text-sm sm:text-base group-hover:underline font-serif-brand">
                  {relatedComparison.title}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{relatedComparison.subtitle}</p>
            </div>
          )}

          {/* あなたにおすすめの次の一手（回遊・直帰防止） */}
          <NextActionGuide currentCategory={article.category} onNavigate={onNavigate} />

          {/* Dynamic Internal Link Mesh (VS対決・関連特集・同カテゴリコスメ) */}
          <InternalLinkMesh currentArticleId={article.id} category={article.category} onNavigate={onNavigate} />
        </article>
      </div>
    </div>
  );
}
