import React from 'react';
import { Sparkles, ArrowRight, UserCheck, Flame, Heart, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AgeDemographicNavProps {
  onNavigate: (path: string) => void;
}

interface DemographicCard {
  ageLabel: string;
  badge: string;
  badgeColor: string;
  gradientBg: string;
  icon: React.ReactNode;
  title: string;
  targetDescription: string;
  problemHighlights: string[];
  articleSlug: string;
  articleCount: string;
}

const DEMOGRAPHIC_CARDS: DemographicCard[] = [
  {
    ageLabel: '10代・20代 女性',
    badge: '可愛い×バズり実力派',
    badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-200 border-pink-200',
    gradientBg: 'from-pink-500/10 via-rose-500/5 to-transparent',
    icon: <Heart className="w-5 h-5 text-pink-500" />,
    title: 'かわいさ最強のサンリオコラボ×超実力派コスメでポーチを刷新！',
    targetDescription: '部活・通学やバイトで崩れやすいメイク、Tゾーンのテカリ、繰り返すポツポツニキビを徹底解決。持ってるだけでテンションの上がる可愛いパケやサンリオコラボコスメも大集結！',
    problemHighlights: ['サンリオ限定リップ＆ライナー', '前髪ベタつき＆皮脂吸着パウダー', 'VT CICA＆ドクダミ肌荒れ鎮静', 'Wonjungyo＆TIRTIR崩れないベース'],
    articleSlug: '10-20s-women-sanrio-trendy-cosmetics-guide',
    articleCount: '厳選11選'
  },
  {
    ageLabel: '10代・20代 男性',
    badge: '清潔感＝モテの絶対条件',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200 border-sky-200',
    gradientBg: 'from-sky-500/10 via-blue-500/5 to-transparent',
    icon: <Flame className="w-5 h-5 text-sky-600" />,
    title: '汗のニオイ・ベタつき・ボサ髪を根絶！清潔感で無双するモテ必須コスメ',
    targetDescription: '身だしなみは社会人のエチケットでありモテるための最強の武器！女子ウケ抜群の爽やかな香り、頭皮アブラ洗浄、自然な青ひげカバー、サロン級ヘアセットを低予算で完全網羅。',
    problemHighlights: ['8×4制汗＆ギャツビー強力皮脂オフ', '原宿OCEANワックス＆REDENスカルプ', '塗ってる感ゼロのNULL BBクリーム', '女子ウケ最強SHIROサボンの香り'],
    articleSlug: '10-20s-men-grooming-etiquette-dating-must-haves',
    articleCount: '厳選11選'
  },
  {
    ageLabel: '30代 男女（実体験）',
    badge: '低価格で老化恐怖を解決',
    badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border-amber-200',
    gradientBg: 'from-amber-500/10 via-orange-500/5 to-transparent',
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    title: '【実体験】カミソリ負け・乾燥・目元クマ・ほうれい線・抜け毛を救う楽天爆安メンズ美容',
    targetDescription: '「30代になって急激に老化が進んで怖い…」太いヒゲの流血、目の下のクマ、ほうれい線、抜け毛の恐怖を楽天APIから直撃した安くて大容量・高コスパアイテムで全身一撃解決したまとめ買い全記録！',
    problemHighlights: ['サクセス薬用ジェル＆貝印Xfitカミソリ', '500mlワンコイン全身保湿液', '120枚CICAアイマスク＆あずき温熱', 'RF温冷EMS美顔器＆薬用育毛トニック'],
    articleSlug: '30s-mens-anti-aging-budget-cosme-all-in-one',
    articleCount: '購入14品徹底解剖'
  },
  {
    ageLabel: '30代 男女（酒・二日酔い対策）',
    badge: '大人コスメ×プチプラ50:50',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-200',
    gradientBg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
    title: '老化加速＆お酒ダメージを同時攻略！大人コスメ×高コスパプチプラで立て直す処方箋',
    targetDescription: '飲み会や二日酔いで翌朝の肌がボロボロ、顔がパンパンに浮腫む…お酒による脱水・酸化ストレスを内と外からWブロック！デパコス級先行美容液と神プチプラを賢く使い分ける大人の新習慣。',
    problemHighlights: ['ヘパリーゼW箱買い＆クエン酸レモン', 'コスメデコルテ リポソーム美肌カプセル', 'タカミスキンピールで角質ケア', 'メラノCCプレミアム＆ファンケルマイクレ'],
    articleSlug: '30s-unisex-aging-alcohol-recovery-skincare',
    articleCount: '厳選11選'
  },
  {
    ageLabel: '40代 男女',
    badge: 'プチプラ3：デパコス7の黄金比',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border-purple-200',
    gradientBg: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    title: '深いシワ・たるみ・頑固なシミを本気で叩く！資生堂・SK-II・POLA最高峰エイジングケア',
    targetDescription: 'もう失敗できない40代の年齢肌を医学的エビデンスで押し戻す！百貨店店頭で買うより楽天公式でポイント10〜20倍還元＋限定セットを狙う方が圧倒的にお得な理由を完全力説。',
    problemHighlights: ['資生堂エリクシール純粋レチノール', 'POLAリンクルショット真皮修復', 'SK-IIピテラ90%エッセンス＆HAKU', '極潤ハリ化粧水でジャブジャブ土台作り'],
    articleSlug: '40s-anti-aging-depacos7-petit3-golden-ratio',
    articleCount: '厳選10選'
  },
  {
    ageLabel: '50代・60代 男女',
    badge: 'プチプラ8：デパコス2で全身解決',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 border-rose-200',
    gradientBg: 'from-rose-500/10 via-orange-500/5 to-transparent',
    icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
    title: '手足の冷え・頑固な乾燥・薄毛・更年期の不調を救う！1ページで全身の悩みを根本解決',
    targetDescription: '「もう歳だから…」と諦めるのはまだ早い！手足の芯からの冷え、ひび割れ粉吹き、分け目の透け見え、手指のこわばりまで、生活改善グッズと確固たるブランド技術で即効レスキュー。',
    problemHighlights: ['まるでこたつソックス＆ツムラ当帰芍薬散', '50の恵養潤液＆ユースキン大容量ポンプ', 'サクセス炭酸トニック＆大塚製薬エクエル', 'アスタリフト自己復元ナノジェリー'],
    articleSlug: '50-60s-senior-full-body-rescue-petit8-depacos2',
    articleCount: '厳選10選'
  }
];

export const AgeDemographicNav: React.FC<AgeDemographicNavProps> = ({ onNavigate }) => {
  return (
    <section className="my-10 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-gradient-to-b from-stone-50/80 to-white dark:from-stone-900/80 dark:to-stone-950 p-6 sm:p-8 shadow-sm">
      {/* セクションヘッダー */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>年代別・性別特化 年齢肌＆身だしなみ攻略ガイド</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            年代別のリアルなお悩み・解決策はこちらから！
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-3xl">
            10代・20代のニキビ・モテエチケットから、30代の老化恐怖・二日酔い、40代の深いシワたるみ、50・60代の冷え・更年期・薄毛まで。
            各世代特有の切実な悩みを、楽天APIから直撃した厳選アイテムと徹底解説で根本解決する特設ハブです。
          </p>
        </div>
        <button
          onClick={() => onNavigate('/features')}
          className="inline-flex items-center gap-1.5 text-xs font-black text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors shrink-0 cursor-pointer self-start md:self-auto"
        >
          <span>全特集ブログ一覧（320+本）を見る</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 年代別カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEMOGRAPHIC_CARDS.map((card) => (
          <div
            key={card.articleSlug}
            onClick={() => onNavigate(`/blog/${card.articleSlug}`)}
            className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* 上部グラデーションアクセント */}
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.gradientBg}`} />

            <div className="space-y-3">
              {/* 年代バッジ＆アイテム数 */}
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black border ${card.badgeColor}`}>
                  {card.icon}
                  <span>{card.ageLabel}</span>
                </span>
                <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                  {card.articleCount}
                </span>
              </div>

              {/* タイトル */}
              <h3 className="text-base font-black text-stone-900 dark:text-white leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {card.title}
              </h3>

              {/* ターゲット概要説明 */}
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                {card.targetDescription}
              </p>

              {/* ハイライトポイント */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  解決アイテム抜粋:
                </p>
                <div className="flex flex-wrap gap-1">
                  {card.problemHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="inline-block text-[11px] font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/70 border border-stone-200/60 dark:border-stone-700/60 px-2 py-0.5 rounded-md"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 下部アクションボタン */}
            <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform">
              <span>この年代の特集記事を読む</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
