// scripts/autumn_series18_article3_bathoil.mjs
import { bathOilItemsRaw, bathOilArticles, renderProductCard } from './insert_autumn_series18_helper.mjs';

export function getBathOilArticleContent() {
  const reviews = [
    {
      point: "秋の夜長を至福の癒やしに変える贅沢アロマバスミルク。お湯に入れた瞬間乳白色に広がり、全身をしっとり濃密なうるおいヴェールで包み込みます。",
      review: "乾燥した秋風にさらされた全身の肌をいたわる高保湿処方。湯船に浸かっている間中、厳選された植物エキスとエッセンシャルオイルが角層のすみずみまで浸透します。お風呂上がりはボディクリームを塗り忘れても粉をふかないほど、吸い付くようなすべすべ肌が長時間持続します。",
      texture: "ミルキーに溶け広がる濃密エッセンス",
      skinType: "乾燥肌・粉ふき肌・リラックス重視",
      longevity: "翌朝まで全身しっとり ★★★★★"
    },
    {
      point: "温活とむくみケアを同時に叶えるプレミアムセブンオイル。体を芯から温めて発汗を促し、秋の冷えで滞ったリンパと巡りを強力サポート。",
      review: "プロのエステサロンでも使用される高純度温活オイル。湯船の中でふくらはぎや太もも、デコルテを優しくマッサージすると、心地よい温感が持続し、入浴後の湯冷めをしっかり防止。冷え性で夜なかなか寝付けない秋の夜に、深い睡眠へと誘ってくれる極上アイテムです。",
      texture: "リッチで滑らかなマッサージオイル",
      skinType: "冷え性・むくみ・巡り不足",
      longevity: "ぽかぽか温感持続 ★★★../../"
    },
    {
      point: "ギフトにも大人気の贅沢バスミルクセット。上質な天然植物オイルをブレンドし、秋の乾いたお湯をやわらかくまろやかな肌あたりへ変化。",
      review: "水道水中のカルキ（残留塩素）によるピリピリ感を和らげ、まるで天然温泉に入っているかのようなまろやかな湯あたりを実現。ホワイトローズやシトラスの上品な香りが浴室いっぱいに広がり、一日の疲れと緊張をスーッとほぐしてくれます。入浴後の肌のつっぱり感が皆無になります。",
      texture: "シルキーでやさしい乳白ヴェール",
      skinType: "乾燥肌・敏感肌・プレゼント用途",
      longevity: "まろやか保湿キープ ★★★★★"
    },
    {
      point: "木曽ひのき天然100%のエッセンシャルオイル配合。森林浴気分を自宅の浴室で味わいながら、高い殺菌・保湿・血行促進効果を体感。",
      review: "人口香料では決して出せない、本物のヒノキの深く清々しい香り。秋の深まりとともに冷え込む夜、まるで高級旅館の檜風呂に浸かっているかのような贅沢なひとときを演出します。ヒノキチオールが肌を清潔に保ちつつ、かさつきがちなすねや背中の乾燥を穏やかに鎮めます。",
      texture: "純粋な天然エッセンシャルオイル",
      skinType: "森林浴好き・リフレッシュ・肌荒れ予防",
      longevity: "天然ヒノキの香り＆温浴持続"
    },
    {
      point: "北海道の雄大な自然の恵み。和ハッカやカレンデュラなど北海道産植物原料を凝縮した、ナチュラルアイランドのこだわりアロマバスエッセンス。",
      review: "6種類の異なる香りを楽しめる個包装アソート。その日の気分や疲れ具合に合わせて選べるのが魅力です。肌にやさしい植物オイルベースで、敏感肌やお子様との入浴にも安心。入浴後も肌のキメが整い、カサカサしやすい肘や膝もしっとり滑らかに保たれます。",
      texture: "さらりと溶けるピュアエッセンス",
      skinType: "敏感肌・ファミリー・ナチュラル志向",
      longevity: "肌のやわらかさ持続 ★★★★★"
    },
    {
      point: "カプセルに入った植物性オイルが湯船で弾ける！見た目も華やかでギフトや自分へのプチご褒美に最適なパトモスのセブンハーツ。",
      review: "ハート型のカラフルなカプセルがお湯の中でゆっくり溶け出し、中からフレッシュなホホバオイルとアロマが広がります。カサつきが気になる部分に直接塗布してマッサージすることも可能。お風呂上がりは全身がしっとりツヤやかになり、思わず触れたくなる柔肌へと導かれます。",
      texture: "カプセルから溶け出すリッチオイル",
      skinType: "普通肌・乾燥肌・ギフト",
      longevity: "うるおいツヤ膜 ★★★★★"
    },
    {
      point: "ヘアケアでも圧倒的な支持を集めるKAMIKAのアロマバスオイル。厳選ハーブの香りと濃厚な美容オイルで、秋のバスタイムをサロン級に格上げ。",
      review: "ベルガモットやラベンダーなどのハーバルノートが心地よく香り、自律神経が乱れやすい秋の心身を穏やかに包み込みます。湯船から上がる際、肌の表面に薄く均一な保護ヴェールが形成されるため、浴室から出た瞬間の水分蒸散（過乾燥）を完璧に防いでくれます。",
      texture: "芳醇で滑らかな美容オイル",
      skinType: "乾燥肌・ストレス肌・香りにこだわる方",
      longevity: "湯上がりバリア持続 ★★★★★"
    },
    {
      point: "ホワイトローズの優雅な香りに包まれる高保湿バスミルク。ヒアルロン酸やコラーゲンなどの美容成分が角質層を満たす。",
      review: "優雅なバラの香りがバスルームを満たし、入浴中もお風呂上がりもリッチな気分に浸れる人気バスミルク。秋の冷えで乾燥し、かゆみが出やすい背中やすねもしっとり落ち着かせてくれます。お湯が白濁し、肌あたりがとても柔らかくなるため長湯したくなる心地よさです。",
      texture: "ミルキーなリッチミルク",
      skinType: "乾燥肌・ローズの香り好き",
      longevity: "しっとり感キープ ★★★★★"
    },
    {
      point: "手軽に試せる1,000円ポッキリお試しサイズ。高保湿バスミルクのうるおいと香りの実力を気軽に体験できるエントリーアイテム。",
      review: "「バスオイルは初めて」「香りを試してみたい」という方にぴったりの一品。少量でもお湯がしっかりと白濁し、保湿効果を実感できます。秋の旅行や出張への持ち運びにも便利で、旅先のホテルの乾燥したバスルームでも全身のうるおいを逃しません。",
      texture: "マイルドなバスミルク",
      skinType: "お試し派・乾燥肌・旅行用",
      longevity: "コスパ抜群のうるおい"
    },
    {
      point: "水道水の残留塩素を除去するアロマバスオイル。9種類の上質な精油ブレンドから選べ、肌への刺激をゼロに近づける設計。",
      review: "秋になると水道水の塩素で肌がピリピリ・ムズムズしやすいデリケート肌のための救世主。オイルが塩素を中和し、さらに厳選精油のアロマテラピー効果で深いリラックスをもたらします。入浴後の肌のカサつきや赤みを防ぎ、吸い付くようなすべすべ肌へと導きます。",
      texture: "軽やかで親水性の高いアロマオイル",
      skinType: "敏感肌・塩素刺激に弱い方・アロマ派",
      longevity: "塩素ブロック＆保湿 ★★★★★"
    }
  ];

  let cardsHtml = '';
  bathOilItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, bathOilArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #c2410c; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(194, 65, 12, 0.08);">
    <h2 style="color: #7c2d12; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋の冷え込みと「入浴後の急激な全身乾燥（過乾燥）」を防ぐ新常識</h2>
    <p style="margin: 0 0 14px 0; color: #431407; font-size: 15px;">
      10月〜11月は気温が一気に下がり、熱めのお風呂にゆっくり浸かりたくなる季節。しかし、ここに大きな落とし穴があります。<br>
      熱いお湯や長湯によって肌の角質層にあるセラミドや皮脂が流出し、浴室から出た瞬間から<strong>【入浴前よりも肌の水分量が減少する「過乾燥」】</strong>が起こるのです。特にすね・背中・腕などは粉をふいたり、就寝時にカユミが出やすくなります。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fed7aa;">
      <strong style="color: #c2410c; display: block; margin-bottom: 6px;">💡 秋のバスオイル・入浴美容液が選ばれる理由:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #7c2d12;">
        <li><strong>湯上がり「水分蒸散」の瞬間ブロック:</strong> 湯船から上がる際、微細なオイル粒子が全身の肌表面に均一な保護膜を形成。バスタオルで拭いた後も水分が蒸発しません。</li>
        <li><strong>水道水のカルキ（残留塩素）をまろやかに中和:</strong> 外気乾燥で敏感になった肌に刺さる水道水の刺激をやわらげ、ピリピリ感を防ぎます。</li>
        <li><strong>温浴効果の向上と湯冷め防止:</strong> オイルのヴェールが熱の放散を防ぎ、就寝時まで足先・指先のポカポカ感が持続。冷えによる睡眠の質の低下を防ぎます。</li>
      </ul>
    </div>
  </div>

  <h2>秋の冷え込みと全身乾燥を防ぐ！高保湿バスオイル・入浴液厳選10選</h2>
  <p>楽天ランキングで高評価を集める、極上のうるおいとアロマを誇る名品10選をご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #c2410c; padding-bottom: 8px;">
      ✨ 美容のプロ直伝！湯冷め＆乾燥知らずになる「秋の美肌入浴ルール」
    </h3>
    <p>高保湿バスオイルの効能を最大限に享受するための入浴法です：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>お湯の温度は「38℃〜40℃のぬるめ」が鉄則:</strong> 42℃以上の熱いお湯は肌の天然保湿成分を一気に溶かし出し、交感神経を刺激して湯冷めを早めます。ぬるめのお湯で15〜20分じっくり浸かるのがベストです。</li>
      <li><strong>バスオイルを入れたらよくかき混ぜる:</strong> お湯全体に均一にオイル粒子を行き渡らせることで、全身くまなくうるおいヴェールが密着します。</li>
      <li><strong>お風呂から上がる時はシャワーで流さない:</strong> 湯上がりにシャワーで全身を洗い流してしまうと、せっかく肌に密着した保湿保護膜まで流れてしまいます。そのまま上がりましょう。</li>
      <li><strong>バスタオルは「押さえるように」優しく水滴を吸う:</strong> ゴシゴシ擦ると摩擦で角質が傷つき、オイル膜も剥がれてしまいます。ポンポンと肌を押さえるように拭き取るのがプロの常識です。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋のボディケア＆温活特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-moist-foot-cream-cold-dry-heels-10" style="color: #b45309; font-weight: bold;">高保湿フットクリーム10選【冷えとかかとひび割れ防止】</a></li>
      <li><a href="/article/feat-autumn-body-cream-dry-skin-heels-10" style="color: #b45309; font-weight: bold;">高保湿ボディクリーム10選【秋の全身粉ふき・かゆみ防止】</a></li>
      <li><a href="/article/feat-autumn-warming-massage-gel-cream-dullness-10" style="color: #b45309; font-weight: bold;">温感マッサージジェル10選【血行促進とくすみ抜け】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
