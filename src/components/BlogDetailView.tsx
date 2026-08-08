import { BlogPost, RakutenProductArticle, AuthorProfile } from '../types';
import { ArrowLeft, Star, ExternalLink, Check, Calendar, Clock, ShoppingCart } from 'lucide-react';

const CoverImage = ({ src, alt, className, loading }: { src: string | string[], alt: string, className?: string, loading?: 'lazy' | 'eager' }) => {
  if (Array.isArray(src)) {
    return (
      <div className={`grid grid-cols-2 gap-0.5 w-full h-full bg-slate-100 ${className}`}>
        {src.map((url, i) => (
          <img key={i} src={url} alt={`${alt} ${i+1}`} className="w-full h-full object-cover" loading={loading} />
        ))}
      </div>
    );
  }
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className || ''}`} loading={loading} />;
};

interface BlogDetailViewProps {
  post: BlogPost;
  recommendedArticles: RakutenProductArticle[];
  author?: AuthorProfile;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
}

export function BlogDetailView({ post, recommendedArticles, author, onBack, onSelectArticle }: BlogDetailViewProps) {
  // HTMLマークダウンをレンダリングするための整形（改行をbrに置換しつつHTMLブロック保持）
  const formattedHtml = (post.contentMarkdown || '')
    .replace(/\n\n/g, '<br/><br/>');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 戻るボタン */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 group transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>特集ブログ一覧へ戻る</span>
      </button>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-white font-bold ${
            post.targetGender === 'men' ? 'bg-blue-600' : 'bg-rose-600'
          }`}>
            {post.targetGender === 'men' ? '👨 男性用 特集10選' : '👩 女性用 特集10選'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.createdAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            読了時間 約{post.readTimeMinutes}分
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-slate-600 font-medium text-base sm:text-lg mb-6 border-l-4 border-indigo-500 pl-4">
          {post.subtitle}
        </p>

        {/* 著者プロフ */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-sm bg-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{post.authorName}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  ★ コスメ部長
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-0.5">{post.authorRole}</p>
            </div>
          </div>
          <div className="hidden sm:block text-xs text-slate-500 font-medium">
            実体験検証おすすめ
          </div>
        </div>
      </div>

      {/* 4分割コラージュサムネイル画像 */}
      <div className="rounded-2xl overflow-hidden mb-8 border border-slate-200 shadow-sm aspect-video bg-slate-50 p-2 flex items-center justify-center">
        <CoverImage
          src={post.coverImage}
          alt={post.title}
          className="max-h-full max-w-full object-contain rounded-xl"
        />
      </div>

      {/* この特集について */}
      <div className="bg-indigo-50/60 rounded-2xl p-6 sm:p-8 mb-10 border border-indigo-100 text-slate-800 text-sm sm:text-base leading-relaxed">
        <h2 className="text-base font-bold text-indigo-900 mb-3 flex items-center gap-2">
          <span>💡 この特集について</span>
        </h2>
        <p>{post.introText}</p>
      </div>

      {/* 本格解説メインコンテンツ（Markdown / HTML） */}
      <div className="prose prose-slate max-w-none mb-16 prose-headings:font-black prose-h2:text-2xl prose-h2:text-slate-900 prose-h2:border-b-2 prose-h2:border-indigo-500 prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-6 prose-h3:text-xl prose-h3:text-indigo-950 prose-h3:mt-8 prose-h3:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
      </div>

      {/* 記事の一番最後：特集で紹介した注目コスメ一覧 */}
      {recommendedArticles && recommendedArticles.length > 0 && (
        <div className="space-y-8 mt-16 pt-8 border-t-2 border-slate-200">
          <div className="border-b-2 border-indigo-600 pb-3 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              🛒 本特集で紹介した注目コスメ一覧 ({recommendedArticles.length}選)
            </h2>
            <span className="text-xs text-slate-500 font-medium">公式・正規取扱店リンク付き</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recommendedArticles.map((art, index) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-4 p-2">
                    <span className="absolute top-2 left-2 bg-slate-900 text-white font-black text-xs px-2.5 py-1 rounded-md z-10 shadow-md">
                      #{index + 1}
                    </span>
                    <img
                      src={art.imageUrl}
                      alt={art.productName || art.title}
                      className="w-full h-full object-contain bg-white"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                      <span>{art.starRating}</span>
                    </div>
                    <span className="text-xs text-slate-400">| 参考価格: {art.priceRange || '適正価格'}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectArticle(art.id)}
                    className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer leading-snug mb-2 line-clamp-2"
                  >
                    {art.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                    {art.introText}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto">
                  <button
                    onClick={() => onSelectArticle(art.id)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    検証レビュー
                  </button>
                  
                  <a
                    href={art.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer no-underline"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>楽天で見る ↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
