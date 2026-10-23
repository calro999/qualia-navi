// scripts/autumn_series22_article1_liner.mjs
import { linerItemsRaw, linerArticles, renderProductCard } from './insert_autumn_series22_helper.mjs';

export function getLinerArticleContent() {
  const reviews = [
    {
      point: "河北裕介氏プロデュースの&be。なめらかな描き心地で唇の輪郭を思い通りに補正し、自然な立体感とボリュームを演出する大人気ライナー。",
      review: "乾燥した唇にも引っかかることなく、とろけるようにスルスル描けるオイルリッチ処方。絶妙なスキントーンカラーが唇のくすみを消し去り、唇の山をわずかにオーバー気味に描くだけで、大人の人中短縮メイクが驚くほどナチュラルに完成します。口紅の輪郭にじみを防ぎ、一日中美形リップが持続します。",
      texture: "体温でとろけるスムースメルティ芯",
      skinType: "唇の輪郭ぼやけ・縦ジワ・人中短縮狙い",
      longevity: "輪郭キープ＆にじみ防止 ★★★★★"
    },
    {
      point: "スリムな極細芯で唇のキワや口角の細部まで精密に描けるプレミアムリップカラー。落ちにくく高発色なマット仕上がり。",
      review: "秋の深み色リップメイクに不可欠な精密ライナー。口角のくすんだ影をキュッと引き締めて上向きの口角を演出し、唇全体を上品で若々しい印象へ導きます。植物由来の保湿成分が配合されており、マットなのに唇が突っ張らず、時間が経ってもひび割れを起こしません。",
      texture: "精密にラインが引けるスリムクレヨン",
      skinType: "口角のくすみ・きれいめリップ・高発色",
      longevity: "高密着ロングラスティング ★★★★★"
    },
    {
      point: "リップスティックとリップライナーが1本になった便利な2in1仕様。全12色の豊富なカラーで秋のトーンに合わせた唇をクリエイト。",
      review: "ライナー側で輪郭を縁取り、リップ側で内側を埋めるだけで、誰でも簡単にグラデーションリップが完成。朝の忙しい時間でもポーチから何本も出す必要がなく時短に貢献。保湿バーム成分が含まれており、乾燥しやすい秋のオフィスでもカサつきを防ぎます。",
      texture: "滑らかにすべる2WAYペンシル",
      skinType: "時短メイク・グラデーション派・プチプラ",
      longevity: "発色持続力 ★★★★☆"
    },
    {
      point: "プロのメイクアップアーティストが現場で愛用する本格リップペンシル。唇の地色に溶け込む究極のヌードシェード。",
      review: "「もともと唇の形が綺麗な人」を完璧に偽装できるプロ仕様。柔らかすぎず硬すぎない絶妙な芯の硬度で、ブレずに安定したラインが引けます。乾燥してしぼんだ秋の唇を、ふっくらと弾力のある若々しいフォルムへと立体的にリメイクしてくれます。",
      texture: "プロ愛用の絶妙なしなやか芯",
      skinType: "プロ志向・唇の左右非対称悩み・大人の美唇",
      longevity: "にじみゼロ持続 ★★★★★"
    },
    {
      point: "削り不要の回転繰り出し式。ノンデッパー（にじまない・崩れない）技術を採用し、マスクやカップへの色移りを強力ブロック。",
      review: "口紅を塗ると唇の輪郭の外側へ色が滲んでしまうという秋の深刻な悩みを解決。唇の周りの皮膚にピタッと密着フィルムを形成し、リキッドルージュやグロスの油分が外へ漏れ出すのを防ぎます。いつ見ても端正で美しいリップラインが夕方まで続きます。",
      texture: "密着フィルムを形成するウォータープルーフ",
      skinType: "口紅のにじみ・色移り防止・デイリー",
      longevity: "滲みブロック ★★★★★"
    },
    {
      point: "お得な2本セット！スラント（斜めカット）タイプで唇のカーブにシンデレラフィット。しっとりマットで秋の深みを演出。",
      review: "唇の丸みに沿って自然にペン先がフィットするため、ラインがガタつく失敗がありません。落ち着いたテラコッタやベージュブラウンの秋色が揃っており、オーバーリップを描いてから指で内側にぼかすだけで、今っぽい抜け感のあるボリュームリップが仕上がります。",
      texture: "フィット感抜群のスラントカット",
      skinType: "オーバーリップ派・秋色ニュアンス・お得セット",
      longevity: "しっとりマットキープ ★★★★☆"
    },
    {
      point: "モードで洗練された抜け感を生み出すセルヴォークのドローイングペンシル。植物由来オイルが唇を潤しながら洒落感を注入。",
      review: "セルヴォークならではの絶妙なニュアンスカラー（03オレンジ系など）。単に輪郭を縁取るだけでなく、唇全体に塗り広げてセミマットなリップカラーとしても最高におしゃれです。ヒマワリ種子油やホホバ油が秋の乾いた唇をしっとり保護し、荒れやすい唇も健やかに彩ります。",
      texture: "上質な天然オイルが溶け込むクレヨン",
      skinType: "抜け感メイク・乾燥肌・デパコス",
      longevity: "洒落感＆保湿キープ ★★★★★"
    },
    {
      point: "SNS・TikTokでバズり中のオーバーリップ専用ライナー。影色を仕込んで立体的な人中短縮・M字リップを自在にクリエイト。",
      review: "下唇の影や上唇の山に自然な陰影をつけることで、ぷっくりとしたリアルな立体感を作り出します。軽くなめらかに伸び、指でポンポンとぼかすだけで境目が完全に馴染むため、至近距離で見られてもメイクで作ったとはバレない自然なふっくらリップに仕上がります。",
      texture: "ぼかしやすいソフトマットペンシル",
      skinType: "人中短縮・M字リップ・SNSトレンド派",
      longevity: "立体感持続 ★★★★★"
    },
    {
      point: "回転式で使いやすい落ちない2in1リップライナー。高発色ピグメントが瞬時に唇のくすみを覆い、鮮やかな血色を長時間固定。",
      review: "秋の冷えで血色が悪く、紫っぽくなった唇の輪郭を補正する高発色設計。唇の地色を美しくカバーしながら、口紅のベースとして仕込むことで、日中に口紅が落ちても輪郭と血色がそのままキープされ、ノーメイクのような寂しい顔立ちになるのを防ぎます。",
      texture: "滑らかな高発色リッチペンシル",
      skinType: "血色不良・色持ち重視・高カバー",
      longevity: "ロングラスティング ★★★★☆"
    },
    {
      point: "落ちにくいリップティントとペンシルの5本セット。その日のファッションや気分に合わせて秋のメイクを着せ替え可能。",
      review: "コストパフォーマンス抜群のバラエティセット。ティント処方で食事やお茶の後も色褪せず、秋の旅行や長時間のお出かけにも心強いアイテムです。唇を乾燥から守る保湿オイルも配合されており、ティント特有のパサつきを抑えてみずみずしさを維持します。",
      texture: "鮮やかに定着するティントペンシル",
      skinType: "イベント・長時間キープ・まとめ買い",
      longevity: "ティント発色持続 ★★★★☆"
    }
  ];

  let cardsHtml = '';
  linerItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, linerArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #e11d48; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(225, 29, 72, 0.08);">
    <h2 style="color: #9f1239; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋になると「唇の輪郭がぼやけ・口紅がにじんで老け見えする」理由</h2>
    <p style="margin: 0 0 14px 0; color: #4c0519; font-size: 15px;">
      「秋になって濃い色の口紅を塗ると、輪郭がガタついて綺麗に塗れない」「時間が経つと唇の縦ジワに沿って口紅が外側に滲み出してしまう」「唇が薄くなって人中（鼻の下）が長く見える」…こうしたお悩みは、秋の乾燥と冷えが引き金となっています。<br>
      外気温の低下で唇周辺の血流が滞ると、唇のフチの赤みが消えて皮膚との境目が曖昧になります。さらに、乾燥によって唇の縦ジワが深くなると、口紅の油分が毛細管現象のようにシワを伝って外側へ漏れ出し、<strong>【輪郭のにじみ・唇のしぼみ感・老け見え】</strong>を一気に加速させてしまうのです。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fecdd3;">
      <strong style="color: #e11d48; display: block; margin-bottom: 6px;">💡 秋こそリップライナーを取り入れるべき3つの美肌・メイク効果:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #881337;">
        <li><strong>口紅の油分漏れをブロックする「防波堤（シールド）効果」:</strong> ワックス配合のライナーが唇のキワに膜を張り、縦ジワ滲みを一日中完全阻止。</li>
        <li><strong>自然なオーバーリップによる「人中短縮＆ふっくら立体感」:</strong> 上唇の山を1mm外側に描くことで、顔の余白を埋めて若々しい印象を演出。</li>
        <li><strong>乾燥した唇でも引っかからない「植物オイル・ヒアルロン酸高配合処方」:</strong> スルスル滑らかに描け、デリケートな唇の皮膚を痛めない。</li>
      </ul>
    </div>
  </div>

  <h2>秋の唇しぼみ・滲みを防ぐ！高保湿リップライナー＆ペンシル厳選10選</h2>
  <p>楽天ランキング上位かつ描き心地の滑らかさ・高密着にじみ防止力・美形補活力に優れた名品をご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #e11d48; padding-bottom: 8px;">
      ✨ 美容プロ直伝！若々しく見せる「自然な大人のオーバーリップ術」
    </h3>
    <p>古臭くならず、今っぽい抜け感とふっくら感を両立するリップライナーの入れ方です：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>コンシーラーで唇の輪郭のくすみを軽く整える:</strong> 唇のフチの赤みやくすみをスポンジに残ったファンデ等で軽く抑え、綺麗なキャンバスを作ります。</li>
      <li><strong>「上唇の山」と「下唇の中央」だけ1mmオーバーに描く:</strong> 口角まで全部オーバーに描くと「たらこ唇」になってしまいます。中央の上下だけわずかに外側に描くのが大人の鉄則です。</li>
      <li><strong>口角はキュッと内側に入れて引き締める:</strong> 下唇の口角から中央に向かってラインを引くと、口角が上がって見え若々しい表情になります。</li>
      <li><strong>描いたラインを内側に向かって指で軽くぼかす:</strong> 境界線をぼかしてから口紅やグロスを中央に重ねると、内側からジュワッと発色したような美しい立体グラデーションが完成します。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋のリップ＆パーツケア特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-intensive-lip-treatment-night-mask-10" style="color: #b45309; font-weight: bold;">高保湿リップトリートメント10選【唇の皮剥け・縦ジワ集中補修】</a></li>
      <li><a href="/article/feat-autumn-best-lip-cosme-ranking-10" style="color: #b45309; font-weight: bold;">秋色トレンドリップ10選【深み血色と高保湿の両立】</a></li>
      <li><a href="/article/feat-autumn-lip-oil-plumper-cracked-lips-10" style="color: #b45309; font-weight: bold;">リップオイル＆プランパー10選【乾燥ひび割れ・濡れツヤ血色】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
