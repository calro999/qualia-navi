import React, { useState, useMemo } from 'react';
import { RakutenProductArticle } from '../types';
import { getCleanAffiliateLink } from '../utils/productUtils';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { Sparkles, ShoppingCart, ArrowRight, RotateCcw, Star, CheckCircle2 } from 'lucide-react';

interface CosmeDiagnosisWidgetProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

const STEP1_OPTIONS = [
  { id: 'skincare', label: '💧 スキンケア・美容液', desc: '毛穴・乾燥・透明感・鎮静ケア' },
  { id: 'makeup', label: '💄 ベース＆ポイントメイク', desc: '崩れない下地・ファンデ・リップ' },
  { id: 'suncare', label: '☀️ UVケア・日焼け止め', desc: '絶対焼かない＆トーンアップUV' },
  { id: 'haircare', label: '✨ ヘアケア・美容家電', desc: 'サロン級ツヤ髪・本格ホームケア' },
];

const STEP2_OPTIONS: Record<string, { id: string; label: string; keywords: string[] }[]> = {
  skincare: [
    { id: 'pore', label: '毛穴・黒ずみ・皮脂テカリ', keywords: ['毛穴', 'アゼライン', 'ビタミンC', '炭', 'クレンジング', '角栓', '皮脂'] },
    { id: 'dry', label: '超乾燥・インナードライ・保湿', keywords: ['保湿', 'セラミド', 'ヒアルロン', '乾燥', 'クリーム', 'バーム', 'オイル'] },
    { id: 'cica', label: '肌荒れ・赤み鎮静・敏感肌', keywords: ['CICA', 'シカ', 'ドクダミ', '鎮静', '敏感', 'パンテノール', 'バリア'] },
    { id: 'aging', label: 'ハリ不足・小ジワ・くすみ透明感', keywords: ['レチノール', 'ナイアシンアミド', 'グルタチオン', '美白', 'シワ', 'アイクリーム', '導入'] },
  ],
  makeup: [
    { id: 'keep', label: '化粧崩れ・テカリ防止・毛穴カバー', keywords: ['崩れ', '下地', 'パウダー', 'コンシーラー', 'カバー', 'キープ', 'プライマー'] },
    { id: 'glow', label: 'ツヤ肌・トーンアップ・血色感', keywords: ['ツヤ', 'トーンアップ', 'クッション', 'ハイライト', 'チーク', 'ラロッシュポゼ'] },
    { id: 'lip', label: '落ちないリップ・ぷるんと保湿', keywords: ['リップ', 'ティント', 'プランパー', '粘膜', 'バーム', 'モンスター'] },
    { id: 'eye', label: '垢抜けアイメイク・まつ毛ケア', keywords: ['アイシャドウ', 'マスカラ', 'まつ毛', 'アイライナー', '涙袋', 'パレット'] },
  ],
  suncare: [
    { id: 'strong', label: '真夏・レジャーでも絶対焼かない', keywords: ['SPF50', 'アネッサ', '耐久', 'ウォータープルーフ', 'UV', '日焼け止め'] },
    { id: 'toneup', label: 'ノーファンデでも美肌トーンアップ', keywords: ['トーンアップ', 'ローズ', 'ラベンダー', '下地', 'ツヤ', '透明感'] },
    { id: 'mild', label: '敏感肌・石けん落ち・きしまない', keywords: ['敏感肌', '石けん', 'ノンケミカル', 'ジェル', '保湿', 'みずみずしい'] },
  ],
  haircare: [
    { id: 'frizz', label: 'パサつき・広がり・静電気ケア', keywords: ['ヘアオイル', 'ヘアミルク', 'しっとり', 'まとまり', 'ダメージ', 'トリートメント'] },
    { id: 'scalp', label: '頭皮ケア・抜け毛・リフトケア', keywords: ['スカルプ', '頭皮', 'ブラシ', 'ヘッドスパ', '育毛', 'シャンプー'] },
    { id: 'device', label: '美顔器・ドライヤー・ヘアアイロン', keywords: ['美顔器', 'EMS', 'LED', 'ドライヤー', 'アイロン', 'ReFa', 'リフト'] },
  ],
};

const STEP3_OPTIONS = [
  { id: 'all', label: '👑 評価・実力最優先（総合ベスト）', filterFn: () => true },
  { id: 'petit', label: '💰 コスパ・プチプラ重視（〜3,000円目安）', filterFn: (priceNum: number) => priceNum > 0 && priceNum <= 3200 },
  { id: 'kbeauty', label: '🇰🇷 トレンド韓国コスメ・バズ名品', filterFn: (_: number, text: string) => /韓国|VT|Anua|ロムアンド|魔女工場|メディヒール|ナンバーズイン|ダルバ|TIRTIR|コスアールエックス|バイユア/i.test(text) },
  { id: 'premium', label: '💎 本格派・ご褒美リッチケア', filterFn: (priceNum: number) => priceNum >= 3000 },
];

export function CosmeDiagnosisWidget({ articles, onNavigate }: CosmeDiagnosisWidgetProps) {
  const [step1, setStep1] = useState<string | null>(null);
  const [step2, setStep2] = useState<string | null>(null);
  const [step3, setStep3] = useState<string | null>(null);

  const parsePrice = (priceStr?: string): number => {
    if (!priceStr) return 2500;
    const num = parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 2500 : num;
  };

  const matchedProducts = useMemo(() => {
    if (!step1 || !step2 || !step3) return [];

    const s2Config = STEP2_OPTIONS[step1]?.find((o) => o.id === step2);
    const s3Config = STEP3_OPTIONS.find((o) => o.id === step3);
    const keywords = s2Config ? s2Config.keywords : [];

    // 個別商品のみ対象
    const candidates = articles.filter(
      (a) =>
        !(a as any).isContentArticle &&
        !a.id.includes('10sen') &&
        !a.title.includes('10選') &&
        !a.id.startsWith('feat-') &&
        !a.id.startsWith('blog-')
    );

    const scored = candidates.map((art) => {
      let score = 0;
      const fullText = `${art.productName || ''} ${art.title || ''} ${art.introText || ''} ${art.category || ''} ${art.categoryLabel || ''} ${(art.features || []).join(' ')} ${(art.pros || []).join(' ')}`;

      // Step 1 category match
      if (step1 === 'skincare' && (art.category === 'skincare' || fullText.includes('化粧水') || fullText.includes('美容液'))) score += 10;
      if (step1 === 'makeup' && (art.category === 'makeup' || art.category === 'lip' || fullText.includes('リップ') || fullText.includes('ファンデ') || fullText.includes('下地'))) score += 10;
      if (step1 === 'suncare' && (art.category === 'suncare' || fullText.includes('日焼け止め') || fullText.includes('UV'))) score += 12;
      if (step1 === 'haircare' && (art.category === 'haircare' || art.category === 'device' || fullText.includes('ヘア') || fullText.includes('美顔器'))) score += 10;

      // Step 2 keyword match
      for (const kw of keywords) {
        if (fullText.toLowerCase().includes(kw.toLowerCase())) {
          score += 8;
        }
      }

      // Step 3 preference match
      const priceNum = parsePrice(art.rakutenPrice);
      if (s3Config && s3Config.filterFn(priceNum, fullText)) {
        score += 6;
      }

      // Rating bonus
      score += (art.starRating || 4.5);
      if (art.isHallOfFame) score += 3;

      return { art, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((s) => s.art);
  }, [articles, step1, step2, step3]);

  const handleReset = () => {
    setStep1(null);
    setStep2(null);
    setStep3(null);
  };

  return (
    <section className="bg-gradient-to-br from-white via-rose-50/40 to-pink-50/60 rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xs shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                30秒パーソナル診断
              </span>
              <span className="text-[11px] text-slate-500 font-bold">全{articles.length.toLocaleString()}件から厳選</span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 font-serif-brand mt-0.5">
              あなたにぴったりの「運命のコスメ」3タップ診断
            </h2>
          </div>
        </div>

        {(step1 || step2 || step3) && (
          <button
            onClick={handleReset}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>最初からやり直す</span>
          </button>
        )}
      </div>

      {/* Step 1 */}
      <div className="space-y-2.5">
        <div className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] flex items-center justify-center font-black">1</span>
          <span>今いちばん探しているジャンルは？</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {STEP1_OPTIONS.map((opt) => {
            const active = step1 === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setStep1(opt.id);
                  setStep2(null);
                  setStep3(null);
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  active
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200'
                    : 'bg-white hover:bg-rose-50/70 text-slate-800 border-slate-200'
                }`}
              >
                <div className="text-xs sm:text-sm font-extrabold">{opt.label}</div>
                <div className={`text-[11px] mt-0.5 ${active ? 'text-rose-100' : 'text-slate-500'}`}>{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 */}
      {step1 && (
        <div className="space-y-2.5 animate-in fade-in duration-200">
          <div className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] flex items-center justify-center font-black">2</span>
            <span>最も解決したいお悩み・なりたい仕上がりは？</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(STEP2_OPTIONS[step1] || []).map((opt) => {
              const active = step2 === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setStep2(opt.id);
                    if (!step3) setStep3('all');
                  }}
                  className={`p-3 rounded-xl text-left border text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <span>{opt.label}</span>
                  <CheckCircle2 className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step1 && step2 && (
        <div className="space-y-2.5 animate-in fade-in duration-200">
          <div className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] flex items-center justify-center font-black">3</span>
            <span>こだわりの選び方・予算感は？（タップで即座に結果更新）</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {STEP3_OPTIONS.map((opt) => {
              const active = step3 === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setStep3(opt.id)}
                  className={`p-2.5 px-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Diagnosis Results */}
      {matchedProducts.length > 0 && (
        <div className="pt-4 border-t-2 border-rose-200 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm sm:text-base font-black text-rose-700 flex items-center gap-2 font-serif-brand">
              <span>🎉 あなたの肌悩み・条件にベストマッチした厳選コスメ Top 3</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-semibold">
              詳細レビューまたは楽天市場の最安値をチェック
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matchedProducts.map((item, idx) => {
              const cleanUrl = getCleanAffiliateLink(item);
              const name = item.productName || item.title;
              const rating = (typeof item.starRating === 'number' ? item.starRating : 4.8).toFixed(1);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border-2 border-rose-100 hover:border-rose-300 shadow-xs flex flex-col justify-between space-y-3 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[11px] rounded-full">
                        おすすめ #{idx + 1}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {rating}
                      </span>
                    </div>

                    <div
                      onClick={() => onNavigate(`/articles/${item.id}`)}
                      className="aspect-square w-full max-h-36 bg-slate-50 rounded-xl p-2 flex items-center justify-center cursor-pointer border border-slate-100 group"
                    >
                      <img
                        src={getRakutenOptimizedImageUrl(item.imageUrl)}
                        alt={name}
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div>
                      <h4
                        onClick={() => onNavigate(`/articles/${item.id}`)}
                        className="text-xs sm:text-sm font-extrabold text-slate-900 hover:text-rose-600 line-clamp-2 cursor-pointer font-serif-brand"
                      >
                        {name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {(item.pros && item.pros[0]) || item.introText}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">参考価格:</span>
                      <span className="font-black text-rose-600">{item.rakutenPrice || 'オープン価格'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onNavigate(`/articles/${item.id}`)}
                        className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 cursor-pointer transition"
                      >
                        <span>検証記事</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <a
                        href={cleanUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="rakuten-btn py-2 px-2 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>楽天最安値</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
