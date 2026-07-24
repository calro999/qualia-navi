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
          className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>美肌ブログ一覧へ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-amber-500/30">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 flex-wrap">
            <button onClick={() => onNavigate('/')} className="hover:text-amber-300 transition">
              コスメTOP
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('/blogs')} className="hover:text-amber-300 transition">
              ブログ一覧
            </button>
            <span>/</span>
            <span className="text-slate-200 font-bold truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Article Title Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight font-serif-brand qualia-gold-text">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
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
                className="w-11 h-11 rounded-xl border border-amber-400 object-cover group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> 執筆・検証: {author.name} ({author.role})
                </div>
                <div className="text-[11px] text-slate-400">{post.createdAt} ・ 読了目安約{post.readTimeMinutes}分</div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-amber-500/20">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Recommended Products Quick Links Grid */}
          {recommendedItems.length > 0 && (
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-amber-500/30 space-y-4">
              <h3 className="text-sm font-extrabold text-amber-200 flex items-center gap-2 font-serif-brand">
                <span>🛍️ この検証記事で紹介している注目神コスメ</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 p-4 rounded-xl border border-amber-500/20 shadow-md flex flex-col justify-between space-y-3"
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={getRakutenOptimizedImageUrl(item.imageUrl)}
                        alt={item.productName || item.title}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-amber-500/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-extrabold text-white truncate font-serif-brand">
                          {item.productName || item.title}
                        </div>
                        <div className="text-[11px] text-amber-300 font-extrabold">{item.rakutenPrice}</div>
                      </div>
                    </div>
                    <a
                      href={item.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rakuten-btn w-full py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>楽天で見る</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed border-t border-amber-500/20 pt-8 font-light">
            <MarkdownRenderer content={post.contentMarkdown} onNavigate={onNavigate} />
          </div>
        </article>
      </div>
    </div>
  );
}
