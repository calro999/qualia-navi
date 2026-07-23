import React from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_ARTICLES, AUTHOR_PROFILES } from '../data';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { handleImageError } from '../utils/imageHelper';
import { generateBlogPostJsonLd, updateSeoGeoMetadata } from '../utils/seoGeo';
import { Heart, ShoppingCart, ExternalLink } from 'lucide-react';

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

  const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId) || AUTHOR_PROFILES[0];

  return (
    <div className="py-6 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-purple-600 transition">
            コスメTOP
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('/blogs')} className="hover:text-purple-600 transition">
            ブログ一覧
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {/* Article Title Header */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {post.subtitle}
          </p>

          {/* Author Tag */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover"
            />
            <div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-purple-600" /> {post.authorName} ({post.authorRole})
              </div>
              <div className="text-[11px] text-slate-400">{post.createdAt} ・ 読了目安 {post.readTimeMinutes}分</div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sm bg-sky-50">
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
          <div className="bg-sky-50/80 p-6 rounded-2xl border border-sky-100 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <span>🛍️ この記事で紹介している注目コスメアイテム</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-sky-100 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.productName || item.title}
                      className="w-12 h-12 rounded-lg object-cover bg-sky-50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-extrabold text-slate-800 truncate">
                        {item.productName || item.title}
                      </div>
                      <div className="text-[11px] text-purple-700 font-extrabold">{item.rakutenPrice}</div>
                    </div>
                  </div>
                  <a
                    href={item.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rakuten-btn w-full py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>楽天でチェック</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed border-t border-sky-100 pt-8">
          <MarkdownRenderer content={post.contentMarkdown} onNavigate={onNavigate} />
        </div>
      </article>
    </div>
  );
}
