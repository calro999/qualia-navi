// scripts/autumn_series22_article3_bathmilk.mjs
import { bathMilkItemsRaw, bathMilkArticles, renderProductCard } from './insert_autumn_series22_helper.mjs';

export function getBathMilkArticleContent() {
  const reviews = [
    {
      point: "濃厚な保湿ミルクと美容オイルを贅沢にブレンドした大人気バスミルク。お湯に入れた瞬間に白濁し、シルクのような極上湯あたりへ。",
      review: "乾燥した秋風にさらされた肌を、まるで美容液のヴェールで優しく包み込むような心地よさ。お風呂上がりはボディクリームを慌てて塗らなくても、肌が吸い付くようにしっとりモチモチに保たれます。上品なホワイトフローラルの香りがバスルームを満たし、一日の疲れと緊張を穏やかに解きほぐします。",
      texture: "シルキーで濃密な乳白色トリートメント湯",
      skinType: "乾燥肌・粉ふき肌・リラックス・ギフト",
      longevity: "翌朝まで全身しっとり ★★★★★"
    },
    {
      point: "米ぬかと海藻の発酵液100%！ふるさと納税でも熱狂的なリピーターを抱える無添加入浴液「つるぽか特濃」大容量4L。",
      review: "化学物質や香料・着色料を一切使わず、国産米ぬかと海藻を長時間発酵熟成させた生きた酵素＆アミノ酸エキス。お湯が驚くほどまろやかになり、肌の古い角質をやさしく落としながら、必要なうるおいを全身に行き渡らせます。乾燥による背中やすねのかゆみ、アトピー肌のデリケートなケアにも最適です。",
      texture: "米ぬか発酵エキスのまろやかな自然湯",
      skinType: "超乾燥肌・敏感肌・かゆみ・無添加志向",
      longevity: "発酵酵素のうるおい持続 ★★★★★"
    },
    {
      point: "高級ヘアケアブランドoggi otto（オッジィオット）の贅沢バスミルク。エッセンシャルオイル配合でサロン級のスパタイムを演出。",
      review: "厳選された天然精油の香りと高保湿ミルクが融合。湯船に浸かりながら深呼吸するだけで、自律神経が整い深いリラクゼーションが得られます。肌のキメを整える植物エキスが豊富に含まれており、お風呂上がりの肌がワントーン明るく透明感に満ちた素肌へ整います。",
      texture: "芳醇なアロマが香るミルキーエッセンス",
      skinType: "ストレス・香りにこだわる方・上質ケア",
      longevity: "アロマの癒やし＆高保湿 ★★★★★"
    },
    {
      point: "牛乳石鹸でおなじみカウブランドの無添加保湿バスミルク。セラミド配合でデリケートな肌を乾燥から徹底ガード。",
      review: "着色料・香料・防腐剤・品質安定剤フリーの低刺激設計。天然由来セラミド（保湿成分）が角質層の奥深くまで浸透し、入浴後の急激な水分蒸散を防ぎます。赤ちゃんから高齢者まで家族みんなで安心して使える大容量パックで、毎日のデイリースキンケア入浴に最適です。",
      texture: "やさしくマイルドな乳白色湯",
      skinType: "敏感肌・赤ちゃん・ファミリー・無添加",
      longevity: "セラミド保護ヴェール ★★★★★"
    },
    {
      point: "ビオレuの角層まで浸透するバスミルク。ミルクのベールがお風呂上がりの急激な乾燥を防ぎ、すべすべ肌をキープ。",
      review: "素肌とおなじ弱酸性処方。シアバターやワセリンを配合した微細ミルクが全身にムラなく広がり、お湯から上がった後もタオルで拭いても保湿膜がしっかり残ります。ほのかに甘いパウダリーな香りが心安らぐバスタイムを演出します。",
      texture: "弱酸性のまろやかなミルク湯",
      skinType: "乾燥肌・デイリー使い・弱酸性",
      longevity: "うるおいベール持続 ★★★★☆"
    },
    {
      point: "ビオレuバスミルクの3個セット。秋から冬の乾燥本番に向けてストックしておきたい安心の大容量セット。",
      review: "毎日たっぷり使えて経済的なまとめ買い仕様。カサつきやすいひじ・ひざ・すねもしっとり落ち着き、入浴後の乾燥かゆみを防いでくれます。家族全員の肌を守る定番アイテムとして常備しておくと心強い存在です。",
      texture: "なめらかな弱酸性ミルク",
      skinType: "ファミリー・まとめ買い・乾燥肌",
      longevity: "デイリー保湿キープ ★★★★☆"
    },
    {
      point: "睡眠のプロが監修したスリープステップ。眠りへの導入を促す天然アロマと、肌をいたわる高保湿植物オイルの贅沢処方。",
      review: "ラベンダーやスイートオレンジの天然精油ブレンドが、秋の夜の寝付きの悪さを穏やかに解消。湯船から立ち上るアロマスチームが呼吸器を潤し、全身の皮膚をしっとり包み込みます。就寝前のベッドタイムルーティンに最適なナイトケア入浴液です。",
      texture: "極上の天然アロマが広がるミルク湯",
      skinType: "不眠気味・冷え性・アロマ安眠派",
      longevity: "心地よい入眠サポート ★★★★★"
    },
    {
      point: "濃厚しっとり入浴液の代名詞・薬用ソフレ。生薬有効成分と高濃度米ぬかオイル・ホホバオイル・アボカドオイル配合。",
      review: "医薬部外品として肌荒れや湿疹、ひび・あかぎれに正式対応。秋の空気の乾燥でスネや腕がカサカサして粉を吹く深刻なドライスキンを、濃厚な生薬ミルクが強力に救済します。湯上がりもしっとり感が長時間持続し、痒み知らずの滑らか素肌を保ちます。",
      texture: "とろりとした濃厚な薬用ミルク湯",
      skinType: "深刻な粉ふき・乾燥性かゆみ・ひびあかぎれ",
      longevity: "生薬うるおいバリア ★★★★★"
    },
    {
      point: "ソフレのマイルド・ミーシリーズ。サクラの優しい香りと弱酸性ミルクで、カサつく敏感肌を穏やかに包み込む。",
      review: "デリケート肌のための低刺激処方。ほんのり桜の香りが浴室を包み、春を待つような優しい気持ちに。カサつく肌のキメをふっくら整え、お風呂上がりの急激なツッパリを和らげてくれます。",
      texture: "ふんわり優しい弱酸性ミルク湯",
      skinType: "敏感肌・優しい香り・乾燥肌",
      longevity: "マイルド保湿 ★★★★☆"
    },
    {
      point: "カウブランド無添加保湿バスミルクの3個セット。セラミド高配合のやさしさを毎日惜しみなく使えるお得パック。",
      review: "肌に余計なものを一切入れない安心感。家族全員の肌を秋の乾燥トラブルから守り、お風呂上がりもしっとりすべすべの肌触りが続きます。詰め替え用も手に入りやすく、長く愛用できる信頼のブランドです。",
      texture: "無香料・低刺激の純粋ミルク湯",
      skinType: "無添加・赤ちゃん・超敏感肌",
      longevity: "低刺激セラミド持続 ★★★★★"
    }
  ];

  let cardsHtml = '';
  bathMilkItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, bathMilkArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #d97706; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.08);">
    <h2 style="color: #92400e; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 なぜ秋は「長風呂するほど肌が粉を吹いて痒くなる」のか？</h2>
    <p style="margin: 0 0 14px 0; color: #451a03; font-size: 15px;">
      肌寒くなると熱めのお風呂に長く浸かりたくなりますが、ここに秋特有の大きな落とし穴があります。<br>
      お湯に長く浸かることで、皮膚の角質細胞をつなぎ止めている「細胞間脂質（セラミド）」や「天然保湿因子（NMF）」がどんどんお湯の中へ溶け出してしまいます。その結果、浴室を出て体を拭いた瞬間から<strong>【入浴前よりも急激に水分が奪われる「過乾燥状態」】</strong>に陥り、すねや背中が粉を吹き、就寝時に激しい痒みが発生するのです。<br>
      この入浴中の水分・油分流出を完全に防ぐのが<strong>【スキンケア発想の薬用高保湿バスミルク】</strong>です。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fed7aa;">
      <strong style="color: #d97706; display: block; margin-bottom: 6px;">💡 秋のバスミルク入浴が乾燥肌を救う3大メカニズム:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #78350f;">
        <li><strong>お湯全体を「全身用乳液」へと変化させる乳化オイル技術:</strong> 微細化された植物オイルやセラミドがお湯全体に均一に溶け込み、全身の角層をくまなく保湿。</li>
        <li><strong>湯上がりの水分蒸散をブロックする「保護ベール形成」:</strong> 湯船から上がる際、肌表面に均一な油膜ヴェールが密着。バスタオルで拭いた後も水分が逃げない。</li>
        <li><strong>水道水のカルキ（残留塩素）をまろやかに中和:</strong> 外気乾燥で敏感になった肌に突き刺さる水道水のピリピリ感を排除し、肌あたりを極上に整える。</li>
      </ul>
    </div>
  </div>

  <h2>秋の全身粉ふき・乾燥かゆみを防ぐ！薬用高保湿バスミルク厳選10選</h2>
  <p>楽天ランキング上位かつ高保湿成分配合・湯上がりしっとり持続力・低刺激性に優れた名品をご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d97706; padding-bottom: 8px;">
      ✨ 美容プロ直伝！全身がもっちり潤う「バスミルク入浴の正しいマナー」
    </h3>
    <p>高保湿バスミルクの効果を余すことなく肌に定着させるための入浴ステップです：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>お湯の温度は「38℃〜40℃のぬるめ」が鉄則:</strong> 42℃以上の熱いお湯は肌のセラミドを一気に溶かし出します。ぬるめのお湯で15分ほどじっくり浸かりましょう。</li>
      <li><strong>バスミルクを入れたら湯船をよくかき混ぜる:</strong> 底に溜まらないようしっかり混ぜることで、微細な保湿粒子がお湯全体に均等に行き渡ります。</li>
      <li><strong>お風呂から上がる時に「シャワーで洗い流さない」:</strong> 湯上がりにシャワーを浴びてしまうと、せっかく肌に密着した保湿保護ベールまで流れてしまいます。そのまま上がりましょう。</li>
      <li><strong>バスタオルは「ポンポンと押さえるように」水滴を吸う:</strong> ゴシゴシ擦ると摩擦で角質が傷つき、保湿膜も剥がれてしまいます。優しくタオルを肌に当てて水分を吸い取るのが正解です。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋の入浴＆ボディケア特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-epsom-salt-magnesium-bath-cold-soak-10" style="color: #b45309; font-weight: bold;">エプソムソルト10選【秋の冷え・むくみ・深部発汗】</a></li>
      <li><a href="/article/feat-autumn-carbonic-acid-bath-tablet-cold-warm-10" style="color: #b45309; font-weight: bold;">重炭酸入浴剤10選【秋の冷え・湯冷め・疲労回復】</a></li>
      <li><a href="/article/feat-autumn-body-milk-butter-flaky-skin-10" style="color: #b45309; font-weight: bold;">濃密ボディミルク＆バター10選【粉ふき・全身高保湿】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
