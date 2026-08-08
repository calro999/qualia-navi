import React from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_ARTICLES, AUTHOR_PROFILES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { generateBlogPostJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { ShoppingCart, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';

interface BlogPostPageProps {
  postId: string;
  onNavigate: (path: string) => void;
}

export function BlogPostPage({ postId, onNavigate }: BlogPostPageProps) {
  const post = INITIAL_BLOG_POSTS.find((p) => p.id === postId || p.slug === postId) || INITIAL_BLOG_POSTS[0];

  React.useEffect(() => {
    if (post) {
      const jsonLd = generateBlogPostJsonLd(post as any, window.location.origin);
      updateSeoGeoMetadata({
        title: `${post.title} | Qualia Navi`,
        description: post.introText,
        imageUrl: post.coverImage,
        urlPath: `/blogs/${post.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [post]);

  const recommendedItems = INITIAL_ARTICLES.filter((item) =>
    post.recommendedItemCodes?.includes(item.itemCode) || post.recommendedItemCodes?.includes(item.id)
  );

  const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId || a.name === post.authorName) || AUTHOR_PROFILES[0];

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/blogs')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>美肌ブログ一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-rose-600 transition">
              コスメTOP
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('/blogs')} className="hover:text-rose-600 transition">
              ブログ一覧
            </button>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight font-serif-brand">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {post.subtitle}
            </p>

            {/* Author Tag */}
            <div 
              onClick={() => onNavigate(`/authors/${author.id}`)}
              className="flex items-center gap-3 pt-2 cursor-pointer group"
            >
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
          </div>

          {/* Cover Image (Clean Horizontal Aspect Ratio) */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-contain bg-white"
            />
          </div>

          {/* Article Body Content */}
          <div className="prose max-w-none text-slate-800 leading-relaxed border-t border-slate-200 pt-8">
            <MarkdownRenderer content={post.contentMarkdown || ''} onNavigate={onNavigate} />
          </div>

          {/* 📌 記事本文の「完全な最下部（まとめの下）」に「🛍️ この検証記事で紹介している注目コスメ」を設置！ */}
          {recommendedItems.length > 0 && (
            <div className="bg-rose-50/60 p-6 rounded-2xl border border-rose-100 space-y-4 mt-12 pt-8 border-t-2 border-rose-200">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-serif-brand">
                <span>🛍️ この検証記事で紹介している注目コスメ ({recommendedItems.length}選)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-white p-4 rounded-xl border border-rose-100 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={getRakutenOptimizedImageUrl(item.imageUrl)}
                        alt={item.productName || item.title}
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                        className="w-14 h-14 rounded-lg object-contain p-1 bg-slate-50 border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-extrabold text-slate-900 truncate font-serif-brand">
                          #{idx + 1} {item.productName || item.title}
                        </div>
                        <div className="text-[11px] text-rose-600 font-extrabold mt-0.5">{item.rakutenPrice || item.priceRange}</div>
                      </div>
                    </div>
                    <a
                      href={item.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rakuten-btn w-full py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 shadow-sm hover:shadow transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>商品ページへ直行 ↗</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
