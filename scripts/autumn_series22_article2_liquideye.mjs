// scripts/autumn_series22_article2_liquideye.mjs
import { liquidEyeItemsRaw, liquidEyeArticles, renderProductCard } from './insert_autumn_series22_helper.mjs';

export function getLiquidEyeArticleContent() {
  const reviews = [
    {
      point: "美容保湿成分を贅沢に抱え込んだ石鹸オフ処方。敏感な秋のまぶたにみずみずしく伸び、ピタッと乾いて一日中シワ割れしないヴィーガンシャドウ。",
      review: "乾燥して粉を吹きやすい秋のまぶたに、驚くほど軽やかにフィットするウォーターリッチなリキッドカラー。植物エキスが目元をいたわりながら、微細な偏光パールが光を均一に反射。まぶたのくぼみや影を光のツヤでふっくら持ち上げ、夕方になっても二重幅に線が入る「ヨレ」を完全にブロックします。",
      texture: "みずみずしく軽やかなウォータリー薄膜",
      skinType: "乾燥肌・敏感肌・石鹸オフ派・小ジワ悩み",
      longevity: "薄膜密着＆シワ割れゼロ ★★★★★"
    },
    {
      point: "オーガニックコスメ・アクア・アクアの極上リキッドアイシャドウ。フルーツエキスとミネラルパウダーが目元をスキンケアしながら彩る。",
      review: "まぶたが乾燥でピリつきやすい秋の季節に最適な天然由来成分仕立て。肌に乗せるとサラリとしたパウダリー質感へ変化し、しっとりとしたうるおいを内側に閉じ込めます。絶妙なテラコッタやピンクブラウンは秋のトレンド感に満ち、指でサッとなじませるだけで洗練された立体アイが完成します。",
      texture: "リキッドからシルキーパウダーへ変化",
      skinType: "乾燥性ゆらぎ肌・オーガニック志向",
      longevity: "しっとりツヤ感キープ ★★★★★"
    },
    {
      point: "コラーゲン・ヒアルロン酸・エラスチン配合！DHCの美容液仕立てアイシャドウ。年齢によるまぶたのくすみを明るく補正。",
      review: "エイジングケア成分が高濃度に配合されたリッチなエッセンスイン設計。秋の寒さでどんよりしたまぶたに上品なツヤとハリを与え、目元の印象を5歳若返らせます。しっとりとした密着ヴェールが一日中目元を保湿保護し、乾いた空気の中でもパサつきを感じさせません。",
      texture: "うるおいあふれる美容液エッセンス",
      skinType: "大人のくすみ・乾燥小ジワ・ハリ不足",
      longevity: "美容液保湿キープ ★★★★★"
    },
    {
      point: "中国コスメ最高峰・花西子（FLORASIS）のクリーミーリキッド。伝統的な植物花エキスと極細パールが織りなす絹のような濡れツヤ。",
      review: "まるで工芸品のような芸術的な美しさと実力。肌の上を滑るように広がり、肌と一体化して上品なシルクの光沢を放ちます。秋の落ち着いた装いにマッチするアンティークゴールドやダスティローズが揃い、粉っぽさのない瑞々しい目元が夜まで長持ちします。",
      texture: "クリーミーで極上のシルキータッチ",
      skinType: "上品ツヤ・デパコス級・乾燥肌",
      longevity: "絹ツヤロングラスティング ★★★★★"
    },
    {
      point: "スフレのようにふんわり軽やかなつけ心地のヴィーガンリキッド。敏感肌のための石鹸オフ設計で目元の摩擦ストレスを排除。",
      review: "ムースのように柔らかなテクスチャーが目元にふんわり密着。秋の乾いた風に当たってもカサつかず、まばたきを繰り返してもヨレない柔軟なストレッチポリマーが配合されています。クレンジング不要で石鹸で優しくオフできるため、目元の皮膚を傷めずに毎日愛用できます。",
      texture: "ふわふわスフレの軽やかムース",
      skinType: "敏感肌・石鹸オフ・ナチュラルメイク",
      longevity: "ストレッチ密着 ★★★★★"
    },
    {
      point: "RMKのリッドインプレッションリクイド。みずみずしい濡れツヤの中に洗練されたモードな深みを秘めた名品。",
      review: "計算され尽くしたパールの輝きと透け感。ひと塗りでまぶたに濡れたようなみずみずしいツヤ膜を形成し、光の角度によって様々な表情を魅せます。秋のテラコッタやカーキなどのオータムカラーと相性抜群で、目元の乾燥を防ぎながらプロの仕上がりを再現できます。",
      texture: "みずみずしく透け感のあるリクイド",
      skinType: "ツヤ肌派・モードメイク・乾燥肌",
      longevity: "濡れツヤ膜持続 ★★★★★"
    },
    {
      point: "プチプラ3本セット！涙袋や目頭のハイライトにも最適な微細グリッターリキッド。うるおいウォーターベースで粉飛びなし。",
      review: "パウダーのラメと違い、ウォータージェルの中にラメ粒子がしっかり固定されているため、頬にラメが落ちる心配がありません。秋の乾燥した目元にしっとり密着し、瞬くたびにキラキラと上品な光を放ちます。3本セットで気分に合わせてカラーを使い分けられます。",
      texture: "高密着ウォーターグリッタージェル",
      skinType: "ラメ好き・涙袋ハイライト・プチプラ",
      longevity: "ラメ落ちゼロキープ ★★★★☆"
    },
    {
      point: "泣きはらした後のような儚げな濡れツヤを演出するクリームリキッド。アイホール全体から涙袋までマルチに活躍。",
      review: "光をうるんだように反射するうるみパールを配合。秋の大人女子が取り入れてもギラつかず、内側から潤んでいるかのようなピュアな透明感を引き出します。乾燥しやすい目元を保湿オイルがしっかり保護し、長時間の外出でもしっとり感が続きます。",
      texture: "しっとり艶やかなうるみクリーム",
      skinType: "透明感・涙袋・乾燥目元",
      longevity: "うるみツヤ持続 ★★★★☆"
    },
    {
      point: "速乾性がありながらパサつかない3本セットのマルチグリッター。アイメイクのアクセントにサッと足すだけで華やかさアップ。",
      review: "塗布後数十秒でピタッとフィックスし、擦れにも強いスマッジプルーフ仕様。秋のイベントや休日メイクに、まぶたの中央や黒目の下にチョンチョンと置くだけで、立体的な濡れツヤアイが瞬時に完成します。",
      texture: "速乾フィットグリッターリキッド",
      skinType: "イベント・華やかメイク・速乾派",
      longevity: "フィックス密着 ★★★★☆"
    },
    {
      point: "キスニューヨークのギャラクシーリキッドアイズ。ワンコインの驚異的コスパで深宇宙のような神秘的なメタリックツヤを体感。",
      review: "プチプラとは思えないメタリックな高発色と濡れツヤ感。薄膜で伸びが良いため、厚ぼったくならずに目元をすっきりと引き締めます。秋のダークトーンのリップやシックなニットに合わせるアクセントカラーとして大活躍します。",
      texture: "なめらかなメタリックリキッド",
      skinType: "コスパ重視・メタリックツヤ・お試し派",
      longevity: "高発色キープ ★★★★☆"
    }
  ];

  let cardsHtml = '';
  liquidEyeItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, liquidEyeArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #d97706; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.08);">
    <h2 style="color: #92400e; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋の乾燥したまぶたに「リキッドアイシャドウ」が絶対的な味方になる理由</h2>
    <p style="margin: 0 0 14px 0; color: #451a03; font-size: 15px;">
      秋になると、「アイシャドウを塗ってもツヤが出ずパサパサに見える」「夕方になると二重の溝にシャドウが固まって溜まる」「目尻のちりめんジワに粉が入り込んで余計にシワが目立つ」…そんな経験はありませんか？<br>
      皮脂腺が極めて少ないまぶたは、秋の乾燥気候に直面すると角質層の水分が急速に失われます。そこに粉体の多いパウダーを重ねると、まぶたの水分を奪い取って乾燥を加速させてしまうのです。<br>
      水分と美容オイルをベースにした<strong>【高保湿リキッドアイシャドウ】</strong>なら、乾燥したまぶたにうるおいを与えながら極薄の密着ヴェールを形成し、一日中シワ割れ知らずの濡れツヤをキープできます。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fed7aa;">
      <strong style="color: #d97706; display: block; margin-bottom: 6px;">💡 秋のリキッドアイシャドウ選びで失敗しない3つの鉄則:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #78350f;">
        <li><strong>美容液成分（ヒアルロン酸・植物オイル）高配合のウォーターベース:</strong> まぶたのうるおいを守り、乾いた後もパサつきやつっぱりを感じさせない処方。</li>
        <li><strong>光拡散パールによる「まぶたのくぼみ・くすみリフト効果」:</strong> 暗い影を厚塗りで隠すのではなく、光の乱反射で飛ばして若々しいハリ感を偽装。</li>
        <li><strong>数万回の瞬きに耐える「ストレッチ密着フィルム」:</strong> 塗った直後はぼかしやすく、数十秒でピタッと固まって二重幅にたまらない処方。</li>
      </ul>
    </div>
  </div>

  <h2>秋のまぶた乾燥・くぼみ影を救う！高保湿リキッドアイシャドウ厳選10選</h2>
  <p>楽天ランキング上位かつ濡れツヤ持続力・二重幅ヨレ防止力・保湿力に優れた名品をご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d97706; padding-bottom: 8px;">
      ✨ 美容プロ直伝！ヨレずに美しく仕上がる「リキッドシャドウの点置きブレンド術」
    </h3>
    <p>リキッドアイシャドウは、直接まぶたにベタ塗りせず「少量点置き」が成功の秘訣です：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>手の甲で液量を調整する:</strong> チップにたっぷり液がついたまま直接まぶたに乗せるとムラ付きの原因になります。一度手の甲にトントンと取って量を調整します。</li>
      <li><strong>まぶたの中央に「チョンチョンと3点置き」:</strong> 目のキワではなく、アイホールの中央付近に3点置きします。</li>
      <li><strong>薬指の腹で素早く左右・上に向かってワイパー状にぼかす:</strong> 乾く前の数秒の間に、指の腹を使ってワイパーのように左右に滑らせ、アイホール全体へグラデーションを作ります。</li>
      <li><strong>二重幅の溝に残った余分な液だけ綿棒でオフ:</strong> 二重の線の部分だけ軽く綿棒で押さえておくと、夕方になっても一切溝にたまらない完璧な仕上がりが続きます。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋のアイメイク＆ベース特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-moist-stick-eyeshadow-aegyo-sal-10" style="color: #b45309; font-weight: bold;">スティックアイシャドウ10選【大人のぷっくり涙袋メイク】</a></li>
      <li><a href="/article/feat-autumn-hydrating-concealer-under-eye-dark-circles-10" style="color: #b45309; font-weight: bold;">高保湿リキッドコンシーラー10選【乾燥クマ・小ジワ影消し】</a></li>
      <li><a href="/article/feat-autumn-hydrating-serum-primer-base-dry-skin-10" style="color: #b45309; font-weight: bold;">高保湿美容液プライマー10選【粉浮き・毛穴落ち防止】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
