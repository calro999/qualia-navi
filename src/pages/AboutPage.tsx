import React from 'react';
import { ArrowLeft, Sparkles, Target, Users, BookOpen, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>トップページへ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          <div className="space-y-3 border-b border-rose-100 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Qualia Navi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-brand">
              当サイトについて（運営指針・検証基準）
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Qualia Navi（クオリア・ナビ）は、成分・処方設計・使用感スペック・主要モールの実売価格を多角的に分析し、納得して選べるコスメ情報をお届けする専門検証メディアです。
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-600" />
                私たちのミッション
              </h2>
              <p>
                インターネット上には無数のコスメやスキンケアがあふれ、どれが本当に自分に合っているのか、どこで買うのが納得できるのかを判断することが難しくなっています。Qualia Naviは、「誇大広告や曖昧なランキングに惑わされない、誠実で根拠のあるコスメ選び」を支援することを使命としています。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-600" />
                コンテンツ制作・検証ポリシー
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li><strong>成分・処方の公開データに基づく客観分析：</strong>全成分表示や配合濃度、メーカー公式公開スペックを徹底的に調査し、科学的知見に基づいた解説を行います。</li>
                <li><strong>薬機法および景表法の厳格遵守：</strong>化粧品の標榜可能効能（56項目）の範囲内で表現を行い、誇大表現・即効性・治療効果の断定は一切行いません。</li>
                <li><strong>公平な価格比較（3モール比較）：</strong>楽天市場、Amazon、Yahoo!ショッピングの価格・送料・ポイント還元条件を比較提示し、読者が最もお得かつ安全に購入できる導線を提供します。</li>
                <li><strong>透明性のあるPR・広告開示：</strong>アフィリエイト広告が含まれる全記事の冒頭に分かりやすいPR表記を明示し、消費者の誤認防止に努めています。</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-600" />
                編集チーム・アナリストについて
              </h2>
              <p>
                コスメコンシェルジュ、スキンケアアドバイザー、化粧品成分に精通したアナリストが記事の監修・執筆を行っています。詳しくは
                <button
                  onClick={() => onNavigate('/authors')}
                  className="text-rose-600 font-bold underline hover:text-rose-800 mx-1 cursor-pointer"
                >
                  アナリスト一覧ページ
                </button>
                をご覧ください。
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
