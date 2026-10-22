import fs from 'fs';

const postsMeta = JSON.parse(fs.readFileSync('scripts/autumn_posts_meta.json', 'utf8'));

export function getAutumnHubArticleContent() {
  // カテゴリ別グループ化
  const categories = [
    {
      name: "乾燥・ゴワつき・バリア崩れ【スキンケア・導入・鎮静】",
      desc: "夏の紫外線ダメージによる角質肥厚、10℃以上の寒暖差、入浴後の過乾燥を根本から救うスキンケア名品。",
      slugs: [
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
      name: "木枯らし・摩擦シワ・老け見え【アイケア・ネック・クレンジング】",
      desc: "皮膚が薄く皮脂腺が極めて少ない目元・首元・唇を摩擦と風から守り抜くパーツ特化ケア。",
      slugs: [
        "autumn-eye-cream-fine-lines-crow-feet-10",
        "autumn-eye-cream-wrinkles-dark-circles-10",
        "autumn-neck-decollete-cream-chapped-wrinkles-10",
        "autumn-eye-makeup-remover-frictionless-10",
        "autumn-hot-cleansing-balm-pores-10",
        "autumn-eyelash-serum-nourishing-lash-10"
      ]
    },
    {
      name: "皮剥け・縦ジワ・くすみ【リップケア＆秋色トレンドリップ】",
      desc: "マスクや冷風で荒れ果てた唇を植物オイルとヒアルロン酸で満たし、深み血色を演出するリップ特集。",
      slugs: [
        "autumn-lip-scrub-gommage-peeling-flaky-lips-10",
        "autumn-lip-oil-plumper-cracked-lips-10",
        "autumn-lip-sleeping-mask-scrub-peeling-10",
        "autumn-best-lip-cosme-ranking-10",
        "autumn-multi-color-balm-lip-cheek-10"
      ]
    },
    {
      name: "パサつき・静電気・秋の抜け毛【ヘア＆スカルプケア】",
      desc: "夏の紫外線ダメージの蓄積と湿度の急降下で傷んだ髪と硬くなった頭皮を集中リセット。",
      slugs: [
        "autumn-hair-milk-emulsion-frizzy-dry-10",
        "autumn-hair-oil-milk-dry-frizz-10",
        "autumn-anti-static-hair-mist-frizzy-dry-10",
        "autumn-hair-stick-balm-flyaway-10",
        "autumn-scalp-essence-dry-itch-hair-loss-10",
        "autumn-scalp-care-hair-loss-dry-10"
      ]
    },
    {
      name: "手荒れ・ささくれ・粉吹き乾燥【ハンド・ネイル＆ボディケア】",
      desc: "お湯での手洗いや入浴後の急激なツッパリ、かかとのガサガサを濃密シアバターとセラミドで包み込む全身ケア。",
      slugs: [
        "autumn-hand-nail-cream-chapped-skin-10",
        "autumn-hand-cream-nail-oil-chapped-10",
        "autumn-nail-oil-hand-serum-dry-10",
        "autumn-best-nail-tips-trend-10",
        "autumn-body-milk-butter-flaky-skin-10",
        "autumn-moist-body-wash-dry-itch-10",
        "autumn-bath-salt-soak-dry-cold-10",
        "autumn-body-scrub-heel-cracked-dry-10",
        "autumn-moist-foot-cream-cold-dry-heels-10"
      ]
    },
    {
      name: "乾燥崩れ防止・垢抜け秋メイク【ベース＆カラーメイク】",
      desc: "粉吹きや毛穴落ちを防ぎ、しっとり濡れツヤと琥珀のような深みを両立する秋メイク特集。",
      slugs: [
        "autumn-moist-makeup-setting-spray-dry-skin-10",
        "autumn-best-moist-basemake-foundation-10",
        "autumn-moist-concealer-color-correct-10",
        "autumn-setting-spray-powder-dry-shine-10",
        "autumn-highlight-shading-dry-skin-10",
        "autumn-best-eyeshadow-palette-10",
        "autumn-single-eyeshadow-wet-glow-10",
        "autumn-best-nuance-eye-accent-mascara-10",
        "autumn-best-blush-cheek-cosme-10",
        "autumn-moist-liquid-cream-blush-cheek-10"
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
# 【2026秋コスメ総まとめ】乾燥・寒暖差・パーツケア悩みを全方位解決する51大特集・510選コンプリートガイド

秋の深まりとともに、私たちの肌や髪、体調には急激な変化が押し寄せてきます。
「朝晩の冷え込みで化粧水が弾かれるように浸透しない」「洗顔後や入浴後、脱衣所で肌がバリバリにつっぱる」「日中にふと鏡を見ると目元や首元に乾燥小ジワが浮き出ている」「セーターを脱ぐたびに髪がパチパチ爆発する」……。

秋は、**夏の紫外線ダメージの蓄積（メラニン沈着・角質肥厚）**に、**急激な湿度の低下（過乾燥）**と**10℃以上の寒暖差による自律神経の乱れ**が同時に直撃する、1年で最も過酷なビューティーの曲がり角です。

Qualia Navi編集部では、これまで第1弾から第15弾にわたり、美容皮膚科学とコスメ成分分析の観点から**「季節の具体的でリアルなお悩み」**に徹底フォーカスした51大特集・全510選の徹底検証を行ってきました。

本ページは、その全51記事を肌悩み・パーツ・シーン別に体系化した**「2026秋コスメ完全攻略ハブ（総合目次）」**です。
今あなたの肌や髪が発しているSOSサインに合わせて、最適な解決策と名品を見つけてください。

---

## 🧭 お悩み・パーツ別クイックナビゲーション

${sectionContent}

---

## 🍁 美容エディターが提言する「秋のスキンケア3原則」

### 1. 「水分の通り道」を確保してから与える（角質ほぐし・ブースター）
夏の紫外線で厚く硬くなった角質層には、どれほど高級な化粧水を与えても表面を滑り落ちてしまいます。まずは導入美容液や酵素洗顔、弱酸性柔軟水で角層をほぐし、うるおいの通り道を整えることがすべての基本です。

### 2. 「脱衣所0分」のスピード保湿（先行オイル・ミスト）
入浴後の肌は、浴室を出た瞬間から水分が急激に蒸散する「過乾燥ゾーン」へ突入します。体を拭く前に濡れた肌へ1〜2滴のスクワランやホホバオイルを馴染ませることで、入浴前の水分量を完全にキープできます。

### 3. デリケートパーツは「専用ラッピング」（アイ・ネック・リップ）
顔の他の部位に比べて皮膚が卵の薄皮のように薄い目元や首元、唇は、全顔用のクリームだけでは摩擦や乾燥風を耐えきれません。高密着なレチノール・ペプチド・シアバターの専用バームで厚めにラッピングする習慣が、5年後・10年後の若々しさを決定づけます。
`;
}
