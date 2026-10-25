// scripts/generate_autumn_hub_article.mjs
import fs from 'fs';
import path from 'path';

const postsMeta = JSON.parse(fs.readFileSync('scripts/autumn_posts_meta.json', 'utf8'));

export function getAutumnHubArticleContent() {
  // カテゴリ別グループ化
  const categories = [
    {
      name: "乾燥・ゴワつき・血行不良くすみ・毛穴・角質肥厚【スキンケア・炭酸パック・ピーリング・ナイトケア】",
      desc: "夏の紫外線ダメージによる角質肥厚、10℃以上の寒暖差による土色くすみ、毛穴詰まりや深夜の過乾燥を根本から救う高濃度炭酸パック＆角質柔軟美容液＆濃厚ナイトリペアクリーム名品。",
      slugs: [
        "autumn-carbonated-pack-foam-dullness-pores-10",
        "autumn-dense-night-repair-cream-dry-lines-10",
        "autumn-mild-peeling-serum-smooth-pores-10",
        "autumn-hydrating-cleansing-milk-barrier-10",
        "autumn-pure-jojoba-multi-organic-oil-dry-10",
        "autumn-hydrating-facial-mist-spray-dry-skin-10",
        "autumn-moist-cleansing-gel-balm-pores-10",
        "autumn-warming-massage-gel-cream-dullness-10",
        "autumn-enzyme-face-wash-powder-pores-dullness-10",
        "autumn-booster-serum-stiff-skin-absorption-10",
        "autumn-booster-serum-dry-skin-10",
        "autumn-facial-oil-post-bath-dehydration-10",
        "autumn-cica-ceramide-calming-balm-10",
        "autumn-cica-soothing-sensitive-skin-10",
        "autumn-sleeping-mask-night-hydration-10",
        "autumn-sheet-mask-dryness-rescue-10",
        "autumn-whitening-sheet-mask-sun-spots-10",
        "autumn-multi-moist-stick-balm-10",
        "autumn-vitamin-c-dullness-pores-10"
      ]
    },
    {
      name: "木枯らし・眼精疲労・青クマ・首の横ジワ・抜け毛【アイ＆ネック特化ケア】",
      desc: "皮膚が薄く皮脂腺が極めて少ない目元や首元、秋風と乾燥で抜けやすく弱るまつ毛を保護・補修し、ハリを取り戻す特化ケア。",
      slugs: [
        "autumn-advanced-eye-cream-wrinkle-repair-10",
        "autumn-neck-decollete-firming-cream-10",
        "autumn-eyelash-nourishing-serum-damage-repair-10",
        "autumn-warming-eye-care-hot-mask-fatigue-10",
        "autumn-eye-cream-fine-lines-crow-feet-10",
        "autumn-eye-cream-wrinkles-dark-circles-10",
        "autumn-neck-decollete-cream-chapped-wrinkles-10",
        "autumn-eye-makeup-remover-frictionless-10",
        "autumn-hot-cleansing-balm-pores-10",
        "autumn-eyelash-serum-nourishing-lash-10"
      ]
    },
    {
      name: "皮剥け・縦ジワ・輪郭補正・くすみ【リップケア＆秋色トレンドリップ】",
      desc: "マスクや冷風で荒れ果てた唇を植物オイルとセラミドで満たし、ふっくら立体的な深み血色を演出するリップ特集。",
      slugs: [
        "autumn-hydrating-lip-sleeping-mask-chapped-10",
        "autumn-hydrating-lip-liner-plump-pencil-10",
        "autumn-intensive-lip-treatment-night-mask-10",
        "autumn-lip-scrub-gommage-peeling-flaky-lips-10",
        "autumn-lip-oil-plumper-cracked-lips-10",
        "autumn-lip-sleeping-mask-scrub-peeling-10",
        "autumn-best-lip-cosme-ranking-10",
        "autumn-multi-color-balm-lip-cheek-10"
      ]
    },
    {
      name: "パサつき・静電気・頭皮フケ・かゆみ・抜け毛【ヘア＆スカルプケア】",
      desc: "夏の紫外線ダメージの蓄積と湿度の急降下で傷んだ髪と硬くなった頭皮を、泡立たない高保湿クレイ・クリームシャンプーやスカルプエッセンスで集中リセット。",
      slugs: [
        "autumn-clay-cream-shampoo-dry-scalp-10",
        "autumn-scalp-lotion-dry-itch-dandruff-10",
        "autumn-hair-milk-emulsion-frizzy-dry-10",
        "autumn-hair-oil-milk-dry-frizz-10",
        "autumn-anti-static-hair-mist-frizzy-dry-10",
        "autumn-hair-stick-balm-flyaway-10",
        "autumn-scalp-essence-dry-itch-hair-loss-10",
        "autumn-scalp-care-hair-loss-dry-10"
      ]
    },
    {
      name: "爪の縦スジ・手肌血管浮き・かかとガサガサ・粉ふきボディ・湯冷め【ボディ・ハンド・ネイル・温活】",
      desc: "お湯での手洗いや入浴後の急激なツッパリ、爪の割れやすさ、手肌の小ジワや血管浮き、タイツが引っかかるかかと、粉ふきボディを薬用入浴剤・ネイルオイル・ハンドセラム・尿素かかとクリームで温め包み込む全身パーツケア。",
      slugs: [
        "autumn-medicinal-bicarbonate-bath-cold-dry-10",
        "autumn-medicinal-barrier-body-wash-dry-itch-10",
        "autumn-nail-strengthening-oil-serum-10",
        "autumn-intensive-heel-care-urea-cream-10",
        "autumn-anti-aging-hand-serum-whitening-wrinkle-10",
        "autumn-moist-bath-milk-dry-skin-body-10",
        "autumn-epsom-salt-magnesium-bath-cold-soak-10",
        "autumn-body-peeling-gel-rough-elbow-knee-10",
        "autumn-carbonic-acid-bath-tablet-cold-warm-10",
        "autumn-moist-bath-oil-body-care-cold-dry-10",
        "autumn-moist-foot-cream-cold-dry-heels-10",
        "autumn-hand-nail-cream-chapped-skin-10",
        "autumn-hand-cream-nail-oil-chapped-10",
        "autumn-nail-oil-hand-serum-dry-10",
        "autumn-best-nail-tips-trend-10",
        "autumn-body-milk-butter-flaky-skin-10",
        "autumn-moist-body-wash-dry-itch-10",
        "autumn-bath-salt-soak-dry-cold-10",
        "autumn-body-scrub-heel-cracked-dry-10"
      ]
    },
    {
      name: "眉尻消失・粉ふき＆テカリ・生ツヤ美肌・小ジワひび割れ【ベース＆カラーメイク】",
      desc: "高保湿美容液下地、生ツヤ高保湿クッションファンデ、最大7日間消えない眉ティント、内側からじゅわっと発色する美容液リキッドチーク、粉吹きとテカリを両立防止するプレストパウダー、夕方のシワ割れを防ぐスティックコンシーラー特集。",
      slugs: [
        "autumn-hydrating-serum-primer-flaky-skin-10",
        "autumn-hydrating-glow-cushion-foundation-10",
        "autumn-eyebrow-tint-coat-smudge-proof-10",
        "autumn-hydrating-liquid-blush-cheek-10",
        "autumn-hydrating-pressed-powder-dry-shine-10",
        "autumn-creamy-stick-concealer-fine-lines-10",
        "autumn-moist-liquid-eyeshadow-wet-glow-10",
        "autumn-moist-stick-eyeshadow-aegyo-sal-10",
        "autumn-hydrating-serum-primer-base-dry-skin-10",
        "autumn-hydrating-concealer-under-eye-dark-circles-10",
        "autumn-moist-liquid-cream-blush-cheek-10",
        "autumn-moist-makeup-setting-spray-dry-skin-10",
        "autumn-best-moist-basemake-foundation-10",
        "autumn-moist-concealer-color-correct-10",
        "autumn-setting-spray-powder-dry-shine-10",
        "autumn-highlight-shading-dry-skin-10",
        "autumn-best-eyeshadow-palette-10",
        "autumn-single-eyeshadow-wet-glow-10",
        "autumn-best-nuance-eye-accent-mascara-10",
        "autumn-best-blush-cheek-cosme-10"
      ]
    },
    {
      name: "秋の夜長の安眠・温もり癒し【ライフスタイル＆フレグランス】",
      desc: "冷え込む夜の心地よい眠りと、金木犀やウッディの香りで心身を解きほぐすウェルネス特集。",
      slugs: [
        "autumn-tea-fig-woody-fragrance-10",
        "autumn-fragrance-chilly-season-10",
        "autumn-pillow-mist-aroma-candle-relax-10"
      ]
    }
  ];

  let sectionContent = '';
  for (const cat of categories) {
    sectionContent += `
### 🍂 ${cat.name}
${cat.desc}

<div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
`;
    for (const slug of cat.slugs) {
      const meta = postsMeta.find(p => p.slug === slug);
      if (!meta) continue;
      sectionContent += `
  <div class="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 shadow-sm hover:shadow-md transition-all">
    <div class="flex items-center gap-2 mb-1.5">
      <span class="px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">第${meta.series}弾</span>
      <span class="text-xs text-stone-500 dark:text-stone-400 font-medium">${meta.category}</span>
    </div>
    <h4 class="font-bold text-base text-stone-900 dark:text-white leading-snug">
      <a href="/blog/${meta.slug}" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        ${meta.shortTitle}
      </a>
    </h4>
    <p class="text-xs text-stone-600 dark:text-stone-300 mt-1 line-clamp-2">
      お悩みフォーカス: <strong>${meta.concern}</strong>
    </p>
    <div class="mt-3">
      <a href="/blog/${meta.slug}" class="inline-flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline">
        特集記事を読む（厳選10商品比較） →
      </a>
    </div>
  </div>
`;
    }
    sectionContent += `</div>\n\n---\n`;
  }

  return `
# 【2026秋コスメ総まとめ】乾燥・寒暖差・パーツケア悩みを全方位解決する87大特集・870選コンプリートガイド

秋の深まりとともに、私たちの肌や髪、心身には季節特有の複雑な変化が押し寄せます。
「朝晩と日中の急激な寒暖差」「湿度の急低下によるバリア機能の乱れ」「夏の紫外線ダメージによる遅れてきた角質肥厚やくすみ」「暖房によるインナードライ」など、秋の悩みは多岐にわたります。

Qualia Navi編集部では、これまで第1弾から第29弾にわたり、読者の皆様から寄せられたリアルな季節の悩みに寄り添い、楽天市場の最新データ・プロの成分検証に基づいた**合計87の専門テーマ・全870商品**を徹底レビューしてきました。

本まとめページは、今まさにあなたが直面している「肌・髪・身体・心身の秋の悩み」から、最適な解決特集へと直感的にアクセスできる**総合インデックス・コンプリートハブ**です。

---

## 🍂 カテゴリ別・秋の87大特集インデックス

${sectionContent}

---

## 💡 美容編集長が教える！秋のお手入れで失敗しないための「3大美肌ルール」

1. **「夏仕様」のスキンケアを無理に続けない**
   さっぱりタイプの化粧水や皮脂吸着重視の下地を秋も使い続けていると、肌内部の水分蒸散が加速し、急激な乾燥小ジワや粉吹きの引き金になります。高保湿美容液下地やリップマスク、高機能アイクリームを1品プラスし、うるおいを抱え込む土台を作りましょう。

2. **「落とすケア・温めるケア」こそ最も高保湿なものへシフトする**
   秋の肌トラブルの大半は、洗顔・クレンジング・ボディソープ・熱いお風呂での皮脂奪いすぎに起因します。薬用重炭酸入浴剤や高保湿ボディソープ、泡立たないクリームシャンプーを肌と身体の状態に合わせて使い分け、バリア膜（セラミド・NMF）を死守することが肝心です。

3. **入浴後・洗顔後の「3分以内保湿」を徹底する**
   お湯に浸かった後の皮膚は、角質細胞の間隔が広がり最も水分が逃げやすい無防備な状態。高保湿バスミルクや重炭酸イオンで湯上がり乾燥を防ぎ、上がったら3分以内に導入美容液や濃厚ナイトリペアクリームをなじませて潤いのフタをしましょう。

---

## 📌 あなたにぴったりの特集を見つけて、秋の美しさをアップデート！

上記の各リンクから、各テーマごとの詳しい成分比較、使用感レビュー、楽天市場の最安値・ポイント還元情報をご覧いただけます。
季節の変わり目を健やかでツヤやかな美しい素肌で乗り切りましょう！
`;
}
