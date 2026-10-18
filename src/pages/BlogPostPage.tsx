import React, { useMemo } from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_ARTICLES, AUTHOR_PROFILES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { QuickComparisonTable } from '../components/QuickComparisonTable';
import { InternalLinkMesh } from '../components/InternalLinkMesh';
import { useRakutenPromoMicrocopy } from '../components/InlineProductCtaBox';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { generateBlogPostJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { getCleanAffiliateLink, deduplicateArticles } from '../utils/productUtils';
import { ShoppingCart, ExternalLink, ShieldCheck, ArrowLeft, Star, ArrowRight } from 'lucide-react';
import { RakutenBeginnerGuideBanner } from '../components/RakutenBeginnerGuideBanner';
import { NextActionGuide } from '../components/NextActionGuide';

interface BlogPostPageProps {
  postId: string;
  onNavigate: (path: string) => void;
}

export function BlogPostPage({ postId, onNavigate }: BlogPostPageProps) {
  const post = INITIAL_BLOG_POSTS.find((p) => p.id === postId || p.slug === postId);
  const promo = useRakutenPromoMicrocopy();

  const recommendedItems = useMemo(() => {
    if (!post) return [];
    const direct = INITIAL_ARTICLES.filter(
      (item) =>
        post.recommendedItemCodes?.includes(item.itemCode) ||
        post.recommendedItemCodes?.includes(item.id)
    );
    if (direct.length > 0) return deduplicateArticles(direct);

    // recommendedItemCodesが未指定のハブ記事等の場合、タイトルキーワードに一致する個別コスメを抽出
    const singleOnly = deduplicateArticles(
      INITIAL_ARTICLES.filter(
        (a) =>
          !(a as any).isContentArticle &&
          !a.id.includes('10sen') &&
          !a.title.includes('10選')
      )
    );
    const titleText = `${post.title} ${post.subtitle || ''}`;
    const matched = singleOnly.filter((a) => {
      const pName = (a.productName || a.title || '').slice(0, 8);
      return pName && post.contentMarkdown?.includes(pName);
    });
    if (matched.length >= 3) return matched.slice(0, 10);

    // カテゴリ推定フォールバック
    const inferredCat = /メイク|ファンデ|下地|パウダー|コンシーラー/.test(titleText)
      ? 'makeup'
      : /リップ|ティント|プランパー/.test(titleText)
      ? 'lip'
      : /ヘア|髪|頭皮|スカルプ|シャンプー/.test(titleText)
      ? 'haircare'
      : /美顔器|スチーマー|ギア|ドライヤー/.test(titleText)
      ? 'device'
      : /ボディ|ハンド|ネイル|バス|入浴/.test(titleText)
      ? 'bodycare'
      : 'skincare';

    return singleOnly.filter((a) => a.category === inferredCat).slice(0, 6);
  }, [post]);

  const inferredCategory = useMemo(() => {
    if (!post) return 'skincare';
    const t = `${post.title} ${post.subtitle || ''}`;
    if (/メイク|ファンデ|下地|パウダー|コンシーラー|アイシャドウ|マスカラ/.test(t)) return 'makeup';
    if (/リップ|ティント|プランパー/.test(t)) return 'lip';
    if (/日焼け止め|UV/.test(t)) return 'suncare';
    if (/ヘア|髪|頭皮|スカルプ|シャンプー/.test(t)) return 'haircare';
    if (/美顔器|スチーマー|EMS|LED/.test(t)) return 'device';
    if (/ボディ|ハンド|ネイル|バス|入浴/.test(t)) return 'bodycare';
    return 'skincare';
  }, [post]);

  React.useEffect(() => {
    if (post) {
      const jsonLd = generateBlogPostJsonLd(post as any, window.location.origin, recommendedItems);
      updateSeoGeoMetadata({
        title: `${post.title} | Qualia Navi`,
        description: post.introText || post.subtitle,
        imageUrl: Array.isArray(post.coverImage) ? post.coverImage[0] : post.coverImage,
        urlPath: `/features/${post.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [post, recommendedItems]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl space-y-4 my-8 border border-rose-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif-brand">
          指定された特集記事が見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/features')}
          className="gold-btn px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          記事特集一覧へ戻る
        </button>
      </div>
    );
  }

  const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId || a.name === post.authorName) || AUTHOR_PROFILES[0];
  const coverImageSrc = Array.isArray(post.coverImage) ? post.coverImage[0] : post.coverImage;

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/features')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>記事特集一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition cursor-pointer">
              コスメTOP
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('/features')} className="hover:text-rose-600 transition cursor-pointer">
              記事特集
            </button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-rose-100 text-rose-800 font-extrabold text-xs rounded-full">
                徹底比較・厳選特集
              </span>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                {promo.badge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight font-serif-brand">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {post.subtitle}
            </p>

            {/* Author Tag */}
            <div 
              onClick={() => onNavigate(`/authors/${author.id}`)}
              className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 flex items-center justify-between cursor-pointer hover:bg-rose-100/80 transition group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={author.avatarUrl || post.authorAvatar}
                  alt={post.authorName}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-11 h-11 rounded-xl border border-rose-300 object-cover group-hover:scale-105 transition-transform shadow-xs"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-rose-600" /> 執筆・検証: {author.name} ({author.role})
                  </div>
                  <div className="text-[11px] text-slate-500">{post.createdAt} ・ 読了目安約{post.readTimeMinutes}分</div>
                </div>
              </div>
              <span className="text-xs text-rose-700 font-bold hidden sm:inline">プロフィール ➔</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
            <img
              src={coverImageSrc}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-contain bg-white"
            />
          </div>

          {/* 目次 (Table of Contents) */}
          <TableOfContents content={post.contentMarkdown || ''} />

          {/* 【CTA 1（冒頭）】厳選アイテム比較早見表（即決テーブル） */}
          {recommendedItems.length > 0 && (
            <QuickComparisonTable
              items={recommendedItems}
              title="この特集で厳選した注目コスメ比較早見表"
              onNavigate={onNavigate}
            />
          )}

          {/* Article Body Content（【CTA 2（中盤）】各商品の直行ボタンを含む） */}
          <div className="prose max-w-none text-slate-800 leading-relaxed border-t border-slate-200 pt-8">
            <MarkdownRenderer content={post.contentMarkdown || ''} onNavigate={onNavigate} />
          </div>

          {/* 【CTA 3（終盤）】記事最下部の「紹介している注目コスメ」購入＆詳細レビューカード */}
          {recommendedItems.length > 0 && (
            <div className="bg-gradient-to-br from-rose-50/70 via-white to-pink-50/60 p-6 sm:p-8 rounded-3xl border-2 border-rose-200 space-y-5 mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-200 pb-4">
                <div>
                  <span className="text-[11px] font-extrabold text-rose-600">
                    {promo.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2 font-serif-brand mt-0.5">
                    <span>🛍️ この検証記事で紹介している注目コスメ ({recommendedItems.length}選)</span>
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-bold">
                  最安値チェック＆個別レビュー記事へ直行
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedItems.map((item, idx) => {
                  const cleanUrl = getCleanAffiliateLink(item);
                  const rating = (typeof item.starRating === 'number' ? item.starRating : 4.8).toFixed(1);
                  return (
                    <div
                      key={item.id || idx}
                      className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs flex flex-col justify-between space-y-3 hover:border-rose-300 hover:shadow-md transition-all"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-slate-900 text-white font-black text-[10px] rounded-md">
                            Pick #{idx + 1}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs font-black text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {rating}
                          </span>
                        </div>
                        <div
                          onClick={() => onNavigate(`/articles/${item.id}`)}
                          className="flex gap-3 items-center cursor-pointer group"
                        >
                          <img
                            src={getRakutenOptimizedImageUrl(item.imageUrl)}
                            alt={item.productName || item.title}
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                            className="w-16 h-16 rounded-xl object-contain p-1 bg-slate-50 border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 line-clamp-2 font-serif-brand transition-colors">
                              {item.productName || item.title}
                            </div>
                            <div className="text-xs text-rose-600 font-black mt-1">
                              {item.rakutenPrice || item.priceRange || 'オープン価格'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <a
                          href={cleanUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="rakuten-btn w-full py-2.5 px-3 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1 shadow-xs hover:shadow transition-all"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>楽天市場で最安値を見る</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => onNavigate(`/articles/${item.id}`)}
                          className="w-full py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <span>個別検証レビューを見る</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SNS Share & Bookmark Buttons */}
          <ShareButtons title={post.title} description={post.subtitle} />

          {/* 初めて楽天市場を利用する方向けの安心購入・攻略ガイドへの導線 */}
          <RakutenBeginnerGuideBanner onNavigate={onNavigate} />

          {/* あなたにおすすめの次の一手（回遊・直帰防止） */}
          <NextActionGuide currentCategory={inferredCategory} onNavigate={onNavigate} />

          {/* 動的内部リンクメッシュ（関連VS比較・関連特集・関連コスメ） */}
          <InternalLinkMesh
            currentArticleId={post.id}
            category={inferredCategory}
            onNavigate={onNavigate}
          />
        </article>
      </div>
    </div>
  );
}
