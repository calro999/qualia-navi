import React, { useMemo } from 'react';
import { INITIAL_ARTICLES, INITIAL_BLOG_POSTS, INITIAL_COMPARISONS } from '../data';
import { ArrowRight, Sparkles, Swords, BookOpen, Star } from 'lucide-react';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { deduplicateArticles } from '../utils/productUtils';

interface InternalLinkMeshProps {
  currentArticleId: string;
  category: string;
  onNavigate?: (path: string) => void;
}

export function InternalLinkMesh({ currentArticleId, category, onNavigate }: InternalLinkMeshProps) {
  const currentArticle = useMemo(() => {
    return INITIAL_ARTICLES.find(a => a.id === currentArticleId || a.itemCode === currentArticleId);
  }, [currentArticleId]);

  // 現在の記事から主要キーワードを抽出（動的マッチング用）
  const keywordTokens = useMemo(() => {
    const baseText = `${currentArticle?.productName || ''} ${currentArticle?.title || ''} ${category || ''}`;
    const kwCandidates = [
      'CICA', 'シカ', 'レチノール', 'ナイアシンアミド', 'アゼライン酸', 'ビタミンC', 'セラミド',
      'ヒアルロン酸', 'グルタチオン', 'ドクダミ', 'パンテノール', 'トラネキサム酸',
      '日焼け止め', 'UV', '下地', 'ファンデ', 'コンシーラー', 'パウダー', 'ハイライト', 'チーク',
      'リップ', 'ティント', 'プランパー', 'アイシャドウ', 'マスカラ', 'アイライナー', 'まつ毛',
      'クレンジング', '洗顔', '化粧水', '美容液', '乳液', 'クリーム', 'バーム', 'パック', 'マスク',
      'アイクリーム', '導入', 'ブースター', 'ヘアオイル', 'ヘアミルク', 'シャンプー', 'トリートメント',
      'スカルプ', '頭皮', 'ブラシ', '美顔器', 'スチーマー', 'ドライヤー', 'ハンドクリーム', 'ボディ'
    ];
    return kwCandidates.filter(kw => baseText.toLowerCase().includes(kw.toLowerCase()));
  }, [currentArticle, category]);

  // 1. この商品が登場する比較記事（VS対決）またはキーワードが最も近い比較記事を抽出
  const displayedComparisons = useMemo(() => {
    const itemCode = currentArticle?.itemCode || currentArticleId;
    const direct = INITIAL_COMPARISONS.filter(c => 
      c.productItemCodeA === itemCode || 
      c.productItemCodeB === itemCode || 
      c.productItemCodeA === currentArticleId || 
      c.productItemCodeB === currentArticleId ||
      (currentArticle?.productName && c.title.includes(currentArticle.productName.slice(0, 6)))
    );

    if (direct.length >= 3) {
      return direct.slice(0, 3);
    }

    // キーワード一致スコア順で補完
    const remaining = INITIAL_COMPARISONS.filter(c => !direct.includes(c)).map(c => {
      const text = `${c.title} ${c.subtitle} ${c.targetUserCategory}`;
      let score = 0;
      for (const kw of keywordTokens) {
        if (text.includes(kw)) score += 3;
      }
      return { comp: c, score };
    });
    remaining.sort((a, b) => b.score - a.score);
    return [...direct, ...remaining.map(r => r.comp)].slice(0, 3);
  }, [currentArticle, currentArticleId, keywordTokens]);

  // 2. 同一カテゴリ＋キーワード類似の個別コスメ（最大4件）
  const relatedArticles = useMemo(() => {
    const singleOnly = deduplicateArticles(
      INITIAL_ARTICLES.filter(
        a =>
          a.id !== currentArticleId &&
          !(a as any).isContentArticle &&
          !a.id.includes('10sen') &&
          !a.title.includes('10選')
      )
    );
    const sameCat = singleOnly.filter(a => a.category === category);
    const pool = sameCat.length >= 4 ? sameCat : singleOnly;

    const scored = pool.map(a => {
      const text = `${a.productName || ''} ${a.title || ''} ${a.introText || ''}`;
      let score = a.category === category ? 5 : 0;
      for (const kw of keywordTokens) {
        if (text.includes(kw)) score += 4;
      }
      score += (a.starRating || 4.5) * 0.5;
      return { art: a, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map(s => s.art);
  }, [category, currentArticleId, keywordTokens]);

  // 3. 現在の記事内容・カテゴリに完全連動した特集記事・10選記事（最大4件）
  const relatedFeatures = useMemo(() => {
    const scoredBlogs = INITIAL_BLOG_POSTS.filter(b => b.id !== currentArticleId).map(b => {
      const text = `${b.title} ${b.subtitle || ''} ${b.introText || ''}`;
      let score = 0;
      if (b.recommendedItemCodes?.includes(currentArticleId) || (currentArticle?.itemCode && b.recommendedItemCodes?.includes(currentArticle.itemCode))) {
        score += 20;
      }
      for (const kw of keywordTokens) {
        if (text.includes(kw)) score += 5;
      }
      if (category === 'skincare' && /化粧水|美容液|クリーム|パック|マスク|クレンジング|洗顔|毛穴|乾燥|CICA/.test(text)) score += 3;
      if ((category === 'makeup' || category === 'lip') && /メイク|下地|ファンデ|リップ|アイシャドウ|マスカラ|パウダー/.test(text)) score += 3;
      if (category === 'haircare' && /ヘア|髪|シャンプー|頭皮|スカルプ|ブラシ/.test(text)) score += 3;
      if (category === 'device' && /美顔器|スチーマー|EMS|LED|ギア|家電/.test(text)) score += 3;
      if (category === 'bodycare' && /ボディ|ハンド|ネイル|入浴|バス|フット/.test(text)) score += 3;
      return {
        id: b.id,
        title: b.title,
        subtitle: b.subtitle || b.introText,
        coverImage: b.coverImage,
        path: `/features/${b.id}`,
        score
      };
    });

    scoredBlogs.sort((a, b) => b.score - a.score);
    return scoredBlogs.slice(0, 4);
  }, [currentArticle, currentArticleId, category, keywordTokens]);

  const handleClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-rose-100 space-y-12">
      {/* ⚔️ VS対決比較セクション */}
      {displayedComparisons.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Swords className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
                  あわせてチェックしたいガチンコVS対決比較
                </h3>
                <p className="text-[11px] text-slate-500">
                  プロアナリストがライバル商品と使用感・成分・コスパを直接対決検証
                </p>
              </div>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/comparisons')}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
              >
                <span>比較一覧 (全{INITIAL_COMPARISONS.length}件)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {displayedComparisons.map((comp) => (
              <a
                key={comp.id}
                href={`/comparisons/${comp.id}`}
                onClick={(e) => handleClick(e, `/comparisons/${comp.id}`)}
                className="bg-white rounded-2xl p-4 border border-purple-100 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src={comp.coverImage}
                      alt={comp.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-white font-extrabold text-[10px] rounded-md shadow-xs">
                      VS対決
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mb-1">
                      {comp.targetUserCategory}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors font-serif-brand">
                      {comp.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>勝者判定を見る</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 📖 関連する特集・10選ガイド（記事テーマに動的連動） */}
      {relatedFeatures.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
                  このお悩み・テーマに関連する厳選特集レポート
                </h3>
                <p className="text-[11px] text-slate-500">
                  プロが徹底比較した「おすすめ10選」・選び方完全ガイド
                </p>
              </div>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('/features')}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                <span>特集一覧</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedFeatures.map((feat) => (
              <a
                key={feat.id}
                href={feat.path}
                onClick={(e) => handleClick(e, feat.path)}
                className="bg-white rounded-2xl p-4 border border-amber-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex gap-4 items-center group cursor-pointer"
              >
                <img
                  src={feat.coverImage}
                  alt={feat.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    厳選特集10選
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors font-serif-brand">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {feat.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 🛍️ あわせて読みたい関連コスメ */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
                同カテゴリで比較検討したい実力派コスメ
              </h3>
              <p className="text-[11px] text-slate-500">
                成分・コスパ・仕上がりが近い注目アイテム
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedArticles.map((art) => (
              <a
                key={art.id}
                href={`/articles/${art.id}`}
                onClick={(e) => handleClick(e, `/articles/${art.id}`)}
                className="bg-white rounded-2xl p-3.5 border border-rose-100 hover:border-rose-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                    <img
                      src={getRakutenOptimizedImageUrl(art.imageUrl)}
                      alt={art.productName || art.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-white/90 text-amber-500 font-black text-[10px] rounded-md flex items-center gap-0.5 shadow-2xs">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {(art.starRating || 4.8).toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                      {art.categoryLabel || art.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors mt-1">
                      {art.productName || art.title}
                    </h4>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-rose-600">{art.rakutenPrice || art.priceRange}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-600 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
