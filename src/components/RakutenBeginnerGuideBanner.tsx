import React from 'react';
import { HelpCircle, ShieldCheck, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';

interface RakutenBeginnerGuideBannerProps {
  onNavigate: (path: string) => void;
  className?: string;
}

export const RAKUTEN_BEGINNER_GUIDE_ID = 'art-rakuten-cosme-beginner-complete-guide-2026';
export const RAKUTEN_BEGINNER_GUIDE_PATH = `/articles/${RAKUTEN_BEGINNER_GUIDE_ID}`;

export function RakutenBeginnerGuideBanner({ onNavigate, className = '' }: RakutenBeginnerGuideBannerProps) {
  return (
    <div className={`my-8 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 border-2 border-rose-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-36 h-36 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-rose-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> 楽天でお買い物したことがない方へ
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> 安心ショッピング・正規品保証
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug font-serif-brand">
            「楽天市場でコスメを買うのは初めてで不安…」という方へ
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            楽天市場でお得にコスメを買うための<strong>「ポイント還元を最大化する買い方」「公式ショップの見分け方」「対応決済手段」「返品・返金ルール」</strong>を初心者向けに分かりやすくまとめた完全解説ガイドをご用意しています。
          </p>

          <div className="flex items-center gap-3 sm:gap-6 pt-1 text-[11px] font-bold text-slate-600 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 実店舗より30%以上お得な理由
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 5と0のつく日＆マラソン攻略
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 万が一の全額補償制度
            </span>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={() => onNavigate(RAKUTEN_BEGINNER_GUIDE_PATH)}
            className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-rose-200" />
            <span>【初心者必読】楽天市場の買い方完全ガイドを見る</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
