import React from 'react';
import { Compass, Swords, Sparkles, ArrowRight, DollarSign } from 'lucide-react';

interface NextActionGuideProps {
  currentCategory?: string;
  onNavigate: (path: string) => void;
}

export function NextActionGuide({ currentCategory = 'all', onNavigate }: NextActionGuideProps) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-rose-900/50">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-black uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>WHAT TO EXPLORE NEXT</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-black font-serif-brand">
          この記事を読んだあなたにおすすめの「次の一手」
        </h3>
        <p className="text-xs text-rose-100/80">
          まだ購入を迷っている・他の選択肢も比較したい方へ。目的別に最適なアプローチを選べます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Option 1: VS Comparison */}
        <div
          onClick={() => onNavigate('/comparisons')}
          className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-amber-400/60 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 group-hover:scale-105 transition-transform">
              <Swords className="w-5 h-5 text-purple-300" />
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors font-serif-brand">
              ライバル商品とのガチンコ白黒比較を見る
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              「AとB、どっちが自分の肌・年齢に合う？」スペック表と勝敗判定マトリクスで迷いをゼロにします。
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-black text-amber-300 pt-2 border-t border-white/10">
            <span>VS対決記事一覧へ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Option 2: 3-Tap Diagnosis */}
        <div
          onClick={() => {
            onNavigate('/');
            window.scrollTo({ top: 380, behavior: 'smooth' });
          }}
          className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-rose-400/60 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-400/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-rose-300" />
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-rose-300 transition-colors font-serif-brand">
              30秒パーソナル肌診断でベスト3を判定
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              肌質（乾燥・敏感・混合・脂性）× 悩み × 予算の3タップで、3,074品からあなた専属の最適解をAI抽出。
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-black text-rose-300 pt-2 border-t border-white/10">
            <span>肌診断ウィジェットへ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Option 3: Budget Filter */}
        <div
          onClick={() => {
            const catQuery = currentCategory && currentCategory !== 'all' ? `category=${currentCategory}` : '';
            onNavigate(`/?${catQuery}`);
          }}
          className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-emerald-400/60 rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between gap-3 group"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5 text-emerald-300" />
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors font-serif-brand">
              同ジャンルの注目コスメ図鑑を一覧比較
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              プチプラ（1,500円以下）からデパコス実力派まで、同じ悩みを解決するライバルコスメを一覧チェック。
            </p>
          </div>
          <div className="flex items-center justify-between text-xs font-black text-emerald-300 pt-2 border-t border-white/10">
            <span>コスメ図鑑で探す</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
