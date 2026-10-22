// scripts/autumn_series18_article2_concealer.mjs
import { concealerItemsRaw, concealerArticles, renderProductCard } from './insert_autumn_series18_helper.mjs';

export function getConcealerArticleContent() {
  const reviews = [
    {
      point: "ドクダミやシカ成分などスキンケア成分を高配合。薄膜なのに驚異のカバー力で、秋の乾燥した目元や赤み・トラブル跡にピタッと密着。",
      review: "韓国コスメ界で爆発的人気を誇るダーマシンコンシーラー。秋の冷たい外気で乾燥し、ファンデーションが粉っぽくなりやすい目元にも驚くほど滑らかに伸び広がります。つけている間中スキンケアパックをしているかのような保湿感で、時間が経っても目尻や笑いジワにコンシーラーがめり込んでひび割れるトラブルを完璧に防ぎます。",
      texture: "極薄でしっとり伸びるリキッド",
      skinType: "乾燥肌・トラブル肌・敏感目元",
      longevity: "ひび割れゼロ持続 ★★★★★"
    },
    {
      point: "SPF50 PA++++の最高値UVカットを備えながら、石鹸で優しくオフ可能。天然由来ミネラルと植物オイルで毛穴・クマを自然にブラー。",
      review: "秋も油断できない紫外線A波から皮膚が薄い目元をガード。オレンジ寄りの補色設計で、秋の冷えによる血行不良青グマやくすみを一瞬で健康的で明るいトーンへ補正してくれます。クレンジング不要で石鹸落ちするため、秋のゆらぎ期で肌を休ませたい日にもストレスフリーで使用できます。",
      texture: "みずみずしく軽やかなリキッド",
      skinType: "青グマ・乾燥敏感肌・石鹸オフ派",
      longevity: "自然なツヤ＆密着キープ"
    },
    {
      point: "プロアクティブ開発の薬用処方。サリチル酸と美白有効成分配合で、ニキビや色素沈着（茶グマ・ニキビ跡）をケアしながら完璧カバー。",
      review: "秋口のホルモンバランスの乱れやマスク内の乾燥・ムレでできるポツポツニキビ、そして夏の紫外線ダメージによる茶グマやシミに。メイクしながら肌荒れを予防できる頼もしさがあります。ヨレにくく皮脂吸着パウダーが配合されているため、日中のメイク直しにも重宝します。",
      texture: "密着感の高いソフトマットリキッド",
      skinType: "大人ニキビ・茶グマ・脂性乾燥肌",
      longevity: "薬用カバー持続 ★★★★★"
    },
    {
      point: "スカーレットオレンジの強力な補色効果！頑固な青グマ・黒クマの影を一瞬で無力化するプロ仕様の高密着マットコンシーラー。",
      review: "コスプレイヤーや舞台メイク、映像関係者からも熱狂的な支持を受けるCOSCOS。目の下の濃い青グマや窪みによる黒クマに少量を点置きして指でトントン馴染ませるだけで、まるでプロのライティングを当てたかのように影が消え去ります。秋の乾燥にも耐えるよう保湿成分が強化されており、夕方まで崩れません。",
      texture: "高発色でピタッと止まる濃密フィット",
      skinType: "頑固な青グマ・黒クマ・凹凸悩み",
      longevity: "カバー持続力 ★★★★★"
    },
    {
      point: "サーモンエキスとPDRN（ポリデオキシリボヌクレオチド）配合。目元の小ジワに栄養を与えながらクマを自然にトーンアップ。",
      review: "目元専用ケアとして名高いスキンフードのサーモンシリーズ。サーモンピンクの絶妙な色味が秋のどんよりしたくすみをパッと晴れやかに。PDRNのうるおい弾力効果により、塗るたびに目元がふっくらと潤い、乾燥によるちりめんジワをふっくら持ち上げながらカバーします。",
      texture: "しっとりコクのあるクリーミー感触",
      skinType: "たるみクマ・目元乾燥小ジワ",
      longevity: "ふっくらハリ感キープ"
    },
    {
      point: "光拡散パウダーが凹凸と影を飛ばす「マジック」のような補正力。3種のヒアルロン酸・コラーゲン配合で目元のうるおいを死守。",
      review: "リニューアルでさらに保湿力と密着度がアップ。チップでチョンと置いて指でぼかすだけで、ほうれい線の影や目の下のゴルゴライン、秋のくすみがパッと明るく目立たなくなります。プチプラとは思えない粉質のキメ細かさで、ファンデーションと境目が美しく溶け込みます。",
      texture: "光を味方にするみずみずしいテクスチャー",
      skinType: "ほうれい線・くすみ・乾燥肌",
      longevity: "ハイライト効果 ★★★★★"
    },
    {
      point: "天然ミネラルと天然オイルだけで作られた24時間落とさなくてもOKな優しさ。デリケートな目元に負担をかけない国産オーガニックコスメ。",
      review: "肌が極度に敏感になり、ケミカルなコスメが染みやすい秋の乾燥期に最適。肌の温度でじんわり溶けて肌と一体化し、小ジワに粉っぽく溜まることがありません。石鹸やぬるま湯で簡単に落とせるため、目元の摩擦刺激を極限まで減らしたい大人の女性から絶大な人気を集めています。",
      texture: "体温でとろけるナチュラルバーム",
      skinType: "超敏感肌・アトピー傾向・ナチュラル志向",
      longevity: "やさしい保護ヴェール持続"
    },
    {
      point: "クマ隠しに特化したネオリンクSHINOBU。特殊な光反射偏光パールが青・黒・茶あらゆるタイプのクマの影を光で打ち消す。",
      review: "楽天ランキング1位常連の実力派。厚塗り感を出さずにクマを消す技術に優れており、素肌のような透明感を残したまま目元の印象を5歳若返らせます。秋の外気乾燥にも負けないスクワランやセラミド配合で、しっとりとしたうるおい膜が一日中目元を守り続けます。",
      texture: "軽やかで伸びの良いスムースリキッド",
      skinType: "全タイプのクマ・大人の目元悩み",
      longevity: "光ヴェール持続 ★★★★★"
    },
    {
      point: "透明感あふれるフローレスな肌へ導く3色パレット。植物由来の高密着オイルが溶け込み、クマ・赤み・シミを自在にブレンド調色。",
      review: "コスメキッチンでも大人気のto/one（トーン）。パレット内のイエロー・オレンジ・ベージュを秋の肌色やクマの濃さに合わせて手の甲でブレンドできます。上品なツヤ感が生まれ、コンシーラーを塗った部分だけが浮いてしまう失敗がありません。花々のエキスが目元をやさしく保湿します。",
      texture: "とろけるメルティフィットパレット",
      skinType: "色ムラ混合肌・ツヤ肌派・高保湿",
      longevity: "ブレンド密着度 ★★★★★"
    },
    {
      point: "密着フィルムを形成して夕方までヨレないシークレットカバー。乾燥崩れ・テカリ・毛穴落ちを3方向からブロック。",
      review: "秋の乾燥と暖房によるインナードライ崩れの両方に強い処方。速乾性がありながら肌の水分を奪わないため、目の下のまばたき運動にもしなやかに追従します。クマだけでなく小鼻の赤みや口角のくすみ補正にも万能に使え、ポーチに常備しておきたい頼もしい救世主アイテムです。",
      texture: "ピタッと密着するリキッドフィルム",
      skinType: "ヨレやすい目元・混合肌・くすみ",
      longevity: "崩れ防止持続 ★★★★★"
    }
  ];

  let cardsHtml = '';
  concealerItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, concealerArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); border-left: 6px solid #d97706; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.08);">
    <h2 style="color: #92400e; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋の冷えと乾燥で「目元のクマ・影・小ジワ」が深くなる理由</h2>
    <p style="margin: 0 0 14px 0; color: #451a03; font-size: 15px;">
      「秋になると夕方の鏡を見たとき、目の下のクマが濃く見える」「コンシーラーを塗ると、昼過ぎには小ジワにひび割れて余計に老けて見える」…そんな経験はありませんか？<br>
      目元の皮膚の厚さはわずか約0.5mm（卵の薄皮程度）しかなく、皮脂腺もほとんどありません。秋の気温低下で目元の毛細血管が収縮して血行不良（青グマ）が起きるだけでなく、湿度の低下によってコンシーラーの水分・油分が奪われ、ひび割れや粉浮きを起こしてしまうのです。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fde68a;">
      <strong style="color: #d97706; display: block; margin-bottom: 6px;">💡 秋のコンシーラー選び＆失敗しない3つの鉄則:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #78350f;">
        <li><strong>美容液・植物オイル高配合のリキッドまたはメルティバーム:</strong> 固練りのパレットや乾燥しやすいスティックは避け、しなやかに動く薄膜タイプを選ぶ。</li>
        <li><strong>青グマ・くすみには「オレンジ・サーモンピンク」の補色:</strong> ベージュだけで塗りつぶそうとするとグレーに濁るため、血色感のあるオレンジ系を仕込むのが正解。</li>
        <li><strong>まばたきに追従するストレッチ性:</strong> 1日数万回行われるまばたきの動きに耐える、ヨレにくいフィルム・高密着ポリマー配合設計。</li>
      </ul>
    </div>
  </div>

  <h2>秋の乾燥クマ・くすみ影を消す！高保湿リキッドコンシーラー厳選10選</h2>
  <p>楽天ランキング上位かつ高保湿・小ジワ割れ防止力に優れた名品を厳選してご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d97706; padding-bottom: 8px;">
      ✨ プロ直伝！秋の目元を「ひび割れさせない・ヨレさせない」コンシーラー塗りテクニック
    </h3>
    <p>せっかくの高保湿コンシーラーも、塗り方ひとつで持ちと自然さが劇的に変わります：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>アイクリームで土台をうるおす:</strong> スキンケアの段階で目元にしっかり油分・水分を補給し、ティッシュオフで表面の余分な油分だけを抑えてからメイクに入ります。</li>
      <li><strong>「キワ」には塗らず、涙袋の5mm下・三角ゾーンに置く:</strong> 目のキワぎりぎりまで塗ると目が小さく見え、瞬きで確実にシワにめり込みます。クマの一番暗い影の部分にチョンと点置きします。</li>
      <li><strong>薬指または水を含ませたスポンジで優しく叩き込む:</strong> 横に滑らせて伸ばすのではなく、垂直にトントンと軽く叩き込んで肌と一体化させます。</li>
      <li><strong>パウダーは「ブラシでふわっと最小限」:</strong> 目元にパウダーをパフで押し込むと乾燥崩れの原因になります。大きめの柔らかいブラシでフェイスパウダーの粉を一度手の甲で落とし、サッとひとはけするだけに留めましょう。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋の美肌・メイク特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-moist-liquid-cream-blush-cheek-10" style="color: #b45309; font-weight: bold;">リキッド＆クリームチーク10選【乾燥粉浮き防止・自然な血色ツヤ】</a></li>
      <li><a href="/article/feat-autumn-eye-cream-fine-lines-crow-feet-10" style="color: #b45309; font-weight: bold;">高保湿アイクリーム10選【目元の乾燥小ジワ・ハリ集中ケア】</a></li>
      <li><a href="/article/feat-autumn-moist-makeup-setting-spray-dry-skin-10" style="color: #b45309; font-weight: bold;">メイクキープミスト10選【秋の乾燥崩れ防止・ツヤ仕込み】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
