// scripts/autumn_series23_article2_lash.mjs
import { lashItemsRaw, lashArticles, renderProductCard } from './insert_autumn_series23_helper.mjs';

export function getLashArticleContent() {
  const reviews = [
    {
      point: "SNSで大反響！ビオルチアの本格アイラッシュセラム。お試ししやすいハーフサイズでまつ毛の根本からハリ・コシを育成。",
      review: "毛髪診断士が開発した頭髪ケア発想の本格まつ毛美容液。デリケートな目元に配慮した低刺激処方で、目に染みにくいのが最大の特徴。秋の乾燥やマスカラオフによる摩擦で抜けやすくなっていたまつ毛が、使い続けるうちに根元からピンと立ち上がるようなハリと力強さを取り戻します。",
      texture: "まつ毛の生え際にピタッと密着するジェルセラム",
      skinType: "まつ毛の抜け毛・まばら・初心者お試し",
      longevity: "ハリ・コシ実感度 ★★★★★"
    },
    {
      point: "韓国コスメ発祥の超人気まつ毛美容液！極細チップ＆Cカーブブラシのデュアル構造で、短いまつ毛も下まつ毛も余すことなくキャッチ。",
      review: "毎日のアイメイクでダメージを受けた自まつ毛を強力補修。丸い先端チップで根元の地肌に美容液をトントンと置くように塗布でき、スクリューブラシで毛先までコーティングできる設計が極めて機能的。ペプチドやヒアルロン酸が濃密に配合され、ツヤやかで存在感のある美まつ毛へと導きます。",
      texture: "塗りやすさ抜群の2WAYデュアルブラシ",
      skinType: "まつ毛パーマ・マツエク対応・プチプラ優秀",
      longevity: "毛先補修＆ツヤ持続 ★★★★★"
    },
    {
      point: "サロン発！仕上がりや用途で選べるオメメラッシュセラム。まつ毛パーマの持ちを高め、美しい束感とツヤを一日中キープ。",
      review: "アイラッシュサロンで指名買いされる実力派。昼はクリアマスカラや束感メイクのスタイリング剤として、夜は集中トリートメントとして使えるマルチな設計。秋の乾燥でパサついて散らばるまつ毛を、サロン帰りのような艶やかな毛流れに美しく整えてくれます。",
      texture: "束感スタイリングもできるクリアホールド",
      skinType: "まつパ束感メイク・サロン品質・カール持続",
      longevity: "スタイリング＆補修 ★★★★★"
    },
    {
      point: "美ルル発のアイラッシュジャム。濃密なジェルジャムテクスチャーがまつ毛を包み込み、ワイドラッシュ成分でボリュームケア。",
      review: "液だれしにくいジャム状の濃密テクスチャーが目に入りにくく、夜のスキンケアの最後に安心して使えます。ハリコシを与えるワイドラッシュ成分を贅沢に配合。ビューラーで上がりにくくなっていた秋のへたりまつ毛を、根元からグッと上向きに支えてくれます。",
      texture: "液だれ知らずの高密着ジャム状ジェル",
      skinType: "液だれが苦手・まつ毛のボリューム不足・敏感目元",
      longevity: "密着ラッピング ★★★★☆"
    },
    {
      point: "楽天ランキング1位常連！リピーター続出のアイラッシュセラムお得なまとめ買いセット。毎日の贅沢まつ育習慣に最適。",
      review: "まつ毛ケアは継続が命。2本セットやまとめ買いでストックしておくことで、途切れることなく毛周期に合わせたケアを継続できます。目元の皮膚を保湿する美容成分も豊富で、まぶたのキメを整えてアイメイクのノリまで底上げしてくれます。",
      texture: "サラリとなじむ高浸透エッセンス",
      skinType: "リピーター・毎日の継続ケア・高コスパ",
      longevity: "毛周期集中アプローチ ★★★★★"
    },
    {
      point: "毛髪のパイオニア「アデランス」が開発！ベネファージュ・アイラッシュブロウエッセンス。まつ毛と眉毛の両方をトータルケア。",
      review: "育毛研究のノウハウを凝縮した最高峰セラム。秋になると眉毛の隙間やまぶたのキワが寂しくなってきた大人世代に最適です。ハリとコシを与える独自成分が毛根環境を整え、薄くなりがちな目元にしっかりとした濃さと存在感を取り戻してくれます。",
      texture: "眉毛・まつ毛の地肌に届く浸透リキッド",
      skinType: "大人の薄毛悩み・まつ毛＆眉毛・本格頭髪研究",
      longevity: "地肌と毛根アプローチ ★★★★★"
    },
    {
      point: "セルフまつげパーマ・マツエク後のダメージケア専用セラム。薬剤で傷んだキューティクルを急速集中補修。",
      review: "パーマやカラーのアルカリダメージを中和し、パサついた毛先を速攻でなめらかに修復。毛先がチリついたり折れ曲がったりする秋のトラブルを徹底予防します。高濃度ケラチン配合で、まつ毛1本1本が太くしなやかな弾力を取り戻します。",
      texture: "毛髪補修ケラチンリッチリキッド",
      skinType: "まつパ直後のダメージ・切れ毛予防・キューティクル補修",
      longevity: "ダメージ集中リペア ★★★★★"
    },
    {
      point: "ヒト型幹細胞培養液×リンゴ幹細胞エキス配合！サロン専売品アイズ・アイラッシュリポゾーン。15gの大容量で長持ち。",
      review: "最先端の幹細胞テクノロジーを搭載したアイラッシュトリートメント。15gという大容量で惜しみなく使え、コスパも最高です。ブラシタイプで毛の根本から毛先まで均一に塗布でき、秋の乾燥からまつ毛を保護。朝のメイク前に塗ることでマスカラ下地としても大活躍します。",
      texture: "軽やかで速乾性のあるトリートメントコート",
      skinType: "幹細胞サイエンス・大容量・マスカラ下地兼用",
      longevity: "キューティクル保護 ★★★★★"
    },
    {
      point: "サロン導入多数の実力派Eyeris（アイリス）。5mlの贅沢容量で、自まつ毛本来のポテンシャルを極限まで引き出すサロンクオリティ。",
      review: "まつ毛サロンのプロが絶賛する高濃度処方。目元の血行が滞りがちな秋でも、高純度ペプチドが毛周期をしっかりサポート。抜けにくく太い健康的なまつ毛を育み、マツエクを卒業して自まつ毛メイクへ移行したい方にも熱烈におすすめできる1本です。",
      texture: "ピンポイントで塗れる極細ブラシ",
      skinType: "サロンクオリティ・自まつ毛派・高濃度ペプチド",
      longevity: "根元補強・抜け毛防止 ★★★★★"
    },
    {
      point: "人気ブランドOmeme.cosmeのデイリーケア用リニューアル品。日中の外的刺激（紫外線・乾燥・摩擦）からまつ毛をガード。",
      review: "ベルガモットの爽やかな香りが広がる癒しの使用感。紫外線ダメージが蓄積した秋のまつ毛をいたわり、程よいホールド力で日中のカールをしっかりキープしてくれます。白くならず自然なツヤ感が出るため、すっぴん風メイクの日の目元盛りにも最適。",
      texture: "香り豊かなリフレッシュジェル",
      skinType: "日中ガード・UVケア・ナチュラルメイク派",
      longevity: "日中カールキープ ★★★★☆"
    }
  ];

  let cardsHtml = '';
  lashItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, lashArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border-left: 6px solid #c026d3; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(192, 38, 211, 0.08);">
    <h2 style="color: #86198f; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋に「まつ毛が大量に抜ける・スカスカになる」2大原因</h2>
    <p style="margin: 0 0 14px 0; color: #701a75; font-size: 15px;">
      「クレンジングのときにまつ毛が何本も抜けてショック…」「秋になったらビューラーをしてもまつ毛が上がらず、隙間が目立つようになった」と感じていませんか？実は、<strong>1年の中で最もまつ毛が抜けやすく弱るのが【秋】</strong>です。<br>
      その原因は、<strong>①夏の強力な紫外線ダメージの蓄積</strong>による毛根弱体化と、<strong>②秋の急激な空気の乾燥＆冷えによるまぶたの血行不良</strong>です。秋風にさらされたまつ毛は水分を奪われてパサつき、キューティクルが剥がれてわずかな摩擦でポロポロと抜けてしまいます。放置すると冬に向けてまつ毛がますます細く短くなってしまいます。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #f5d0fe;">
      <strong style="color: #c026d3; display: block; margin-bottom: 6px;">💡 秋のまつ毛ダメージを救う「まつ毛美容液」の選び方基準:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #86198f;">
        <li><strong>ペプチド・幹細胞培養液など「毛根環境を整える成分」配合:</strong> 抜け毛を防ぎ、太くコシのある強い毛を育てる。</li>
        <li><strong>加水分解ケラチン・パンテノールなど「キューティクル補修成分」配合:</strong> 乾燥でパサつく毛先をコーティングし、切れ毛を防ぐ。</li>
        <li><strong>敏感な目元にも染みにくい「低刺激・オイルフリー・界面活性剤フリー処方」:</strong> まつ毛パーマやマツエクをしている方でも安心して使える処方。</li>
      </ul>
    </div>
  </div>

  <h2>秋の抜け毛・ダメージ補修！高濃度まつ毛美容液厳選10選</h2>
  <p>楽天でリアルタイムに売れている人気アイテムから、育毛実感度・低刺激性・ブラシの塗りやすさ・パーマキープ力を徹底評価しました。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #c026d3; padding-bottom: 8px;">
      ✨ アイリスト直伝！まつ毛が2倍伸びる「正しい塗り方＆NG行為」
    </h3>
    <p>効果を最大限に発揮させるための正しいケア方法です：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>夜の洗顔直後、スキンケアの「最初」に塗る:</strong> 化粧水や乳液の油分がまぶたについていると美容液が弾かれて浸透しません。清潔な素肌に塗るのが鉄則です。</li>
      <li><strong>アイラインを引く要領で「生え際の皮膚」に塗る:</strong> まつ毛そのものだけでなく、毛根があるまぶたのキワに成分を届けることが大切です。</li>
      <li><strong>毛先へはブラシを回しながら優しくとかす:</strong> まつ毛のキューティクルに沿って下から持ち上げるように塗布し、日中の乾燥から毛先を守ります。</li>
      <li><strong>【NG】目頭のキワギリギリや粘膜には塗らない:</strong> 目に入って充血やかゆみの原因になります。生え際から1mmほど離して塗るのが安全です。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋のアイゾーン集中ケア特集</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-eye-cream-fine-lines-crow-feet-10" style="color: #b45309; font-weight: bold;">濃密アイクリーム10選【目元の乾燥小ジワ・カラスの足跡撃退】</a></li>
      <li><a href="/article/feat-autumn-liquid-eyeliner-waterproof-smudge-10" style="color: #b45309; font-weight: bold;">密着リキッドアイライナー10選【夕方のパンダ目・滲み防止】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
