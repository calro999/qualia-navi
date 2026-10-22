// scripts/autumn_series18_article1_cleansing.mjs
import { cleansingItemsRaw, cleansingArticles, renderProductCard } from './insert_autumn_series18_helper.mjs';

export function getCleansingArticleContent() {
  const reviews = [
    {
      point: "海洋深層水と美容成分を贅沢に配合。とろみのあるジェルがメイクと毛穴の奥の角栓を包み込み、肌本来のバリアを奪わず洗い上げるサロン級クレンジング。",
      review: "秋の乾燥と夏の紫外線疲労が重なり、キメが乱れてターンオーバーが停滞した肌に最適。濃厚で厚みのあるジェルクッションが指先と肌の間の摩擦をゼロにし、洗い流した後はまるで美容液マスクを外した後のようなもっちりとした柔らかさが持続します。毛穴のざらつきが数日の使用でツルンとなめらかに整います。",
      texture: "厚みと弾力のある濃厚リッチジェル",
      skinType: "乾燥肌・年齢肌・ゆらぎ肌",
      longevity: "洗顔後もしっとりヴェール持続"
    },
    {
      point: "高保湿美容液成分を贅沢に抱え込んだウォータージェル設計。メイク浮きが素早く、秋の冷気で固まりがちな毛穴の皮脂づまりをやさしくほぐします。",
      review: "肌に乗せると体温で心地よくほどけ、ゴシゴシ擦らなくてもファンデーションやアイメイクがふわっと浮き上がります。オイルフリーまたは低刺激処方で、秋花粉や空気の乾燥で肌が過敏になっている日でもピリつきを感じず、うるおいをしっかりとキープ。洗顔後の急激なつっぱり感を完全にブロックします。",
      texture: "すっとなじむみずみずしいジェル",
      skinType: "敏感肌・乾燥ゆらぎ肌",
      longevity: "うるおいキープ度 ★★★★★"
    },
    {
      point: "ダブル洗顔不要で時短＆摩擦低減！大容量300mlで首元やデコルテまでたっぷり使える、毛穴・黒ずみ・角栓対策の決定版。",
      review: "秋は空気の乾燥だけでなく、夏の紫外線ダメージによる古い角質肥厚で毛穴が黒ずんで見えがち。このクレンジングは肌を柔軟にする植物エキスと保湿成分が絶妙にブレンドされており、ダブル洗顔不要のため肌の天然保湿因子（NMF）を流出させません。お風呂上がりの急激な乾燥つっぱりをしっかり防ぎます。",
      texture: "のびが良く摩擦レスな濃密ジェル",
      skinType: "毛穴悩み・乾燥混合肌",
      longevity: "毛穴引き締め感・保湿度 ★★★★★"
    },
    {
      point: "美容皮膚科医監修のハイドロジェル構造。カプセル化されたビタミンと薬用成分が毛穴の奥まで浸透し、肌荒れを防ぎながら透明感を底上げ。",
      review: "PLUESTならではのマンナンジェリーと毛穴クリア技術が融合。秋の乾燥肌に負担をかけずに、古い角質と過酸化脂質を吸着して絡め取ります。洗い流す際の水切れも抜群で、ぬめりを残さずもっちりとした後肌に。秋口のくすみが晴れ、スキンケアの浸透が格段に高まります。",
      texture: "ぷるぷるの弾力ジェリー",
      skinType: "くすみ・毛穴・敏感肌",
      longevity: "透明感・キメ整い持続"
    },
    {
      point: "キールズ伝統のボタニカル処方。毛穴の奥の微細な汚れや大気中微粒子までしっかり吸着オフしながら、植物由来グリセリンで濃密保湿。",
      review: "ジェルからキメ細やかな濃密泡へと変化するユニークなテクスチャー。肌の必要な皮脂膜を守り抜くため、秋風が吹き始める季節でも洗顔後のつっぱりが一切ありません。カレンデュラやボタニカル成分が秋の赤みやごわつきを穏やかに鎮静させ、健やかな素肌環境を整えてくれます。",
      texture: "みずみずしいジェルから微細泡へ",
      skinType: "乾燥肌・普通肌・赤み肌",
      longevity: "バリア機能保護 ★★★★★"
    },
    {
      point: "ヒト幹細胞培養液とリッチな美容オイル・保湿エキスを凝縮。クレンジングしながらエイジングケアを叶える次世代濃密クレンズジェル。",
      review: "秋の深刻なインナードライと乾燥小ジワに悩む大人の肌へ。肌に乗せた瞬間からリッチな美容液を塗っているかのような感触で、メイクとなじみながら肌の角層深部までうるおいを行き渡らせます。洗い上がりはまるでクリームで保湿ケアを終えた後のような濃密なハリとふっくら感を実感。",
      texture: "とろけるような美容液リッチジェル",
      skinType: "大人の乾燥肌・たるみ毛穴肌",
      longevity: "翌朝のハリ感持続"
    },
    {
      point: "ピュアで上質なオーガニックアロマの香りに包まれる至福のクレンジング。ジェルからオイル、ミルクへと3段階にテクスチャーが変化。",
      review: "SINN PURETE（シンピュルテ）ならではの香りと感触の心地よさ。秋の夜のスキンケア時間を極上のリラクゼーションに変えてくれます。肌の上でとろけるようにオイル化し、頑固な角栓やウォータープルーフメイクを摩擦ゼロでするりと溶解。最後に水分を加えると乳化してすっきり洗い流せ、しっとり上質な肌に仕上がります。",
      texture: "ジェル→オイル→ミルクの3層変化",
      skinType: "ゆらぎ肌・アロマ志向・乾燥肌",
      longevity: "アロマの癒やし＆高保湿キープ"
    },
    {
      point: "サロン・クリニック専売品質。全肌用として設計された低刺激・高機能処方で、秋の不安定なバリア機能を徹底的にサポート。",
      review: "刺激を感じやすい敏感肌やアトピー傾向の肌でも安心して使える、無添加・低刺激設計のクレンジングジェル。肌の皮脂バランスを整える植物エキスが豊富に含まれており、乾燥するのにTゾーンがテカるといった秋特有のアンバランスな肌質をすっきりと健やかに整えてくれます。滑らかな指すべりで摩擦の心配も無用です。",
      texture: "滑らかで厚みのある保護ジェル",
      skinType: "乾燥性敏感肌・インナードライ",
      longevity: "肌トラブル予防・高保湿"
    },
    {
      point: "ナノアスタキサンチンとリコピンの赤い美肌成分を凝縮。洗い流すたびに肌のサビつきをリセットし、みずみずしいハリと輝きを注入。",
      review: "富士フイルム独自のナノテクノロジーが息づく美容液クレンジング。鮮やかな赤のジェルが肌に密着し、毛穴に詰まったメイク汚れや酸化皮脂をすばやく浮かせます。すすいだ後は美容液をたっぷり馴染ませたかのようなしっとり感と弾力ハリ感が残り、秋の乾燥小ジワやくすみを一掃してくれます。",
      texture: "みずみずしく伸びる赤の美容ジェル",
      skinType: "くすみ・乾燥・エイジングケア",
      longevity: "ふっくらハリ感持続"
    },
    {
      point: "9つの無添加処方でデリケートな秋の肌をやさしくいたわる。クッション性に優れた濃密ジェルが摩擦を徹底ガードして毛穴汚れをオフ。",
      review: "界面活性剤の刺激を極力抑え、コラーゲンやヒアルロン酸などの保湿成分を高配合したアカランの人気ジェルクレンジング。秋の乾いた空気で敏感になった目元や口元にも染みることなく、穏やかにメイクを絡め取ります。大容量でコスパも抜群、毎日惜しみなくたっぷり使える頼もしい一本です。",
      texture: "ぷるんとした弾力クッションジェル",
      skinType: "敏感肌・乾燥肌・プチプラ重視",
      longevity: "やさしいうるおいバリア ★★★★★"
    }
  ];

  let cardsHtml = '';
  cleansingItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, cleansingArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #ea580c; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.08);">
    <h2 style="color: #9a3412; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋の乾燥と夏の紫外線疲れで「毛穴が開き・ごわつく」原因と対策</h2>
    <p style="margin: 0 0 14px 0; color: #431407; font-size: 15px;">
      朝晩の気温が急降下し、湿度が50%を下回る日が増える秋本番。「夏と同じクレンジングを使っていると、洗い上がりに肌がつっぱる」「毛穴の角栓が硬くなって黒ずみが目立つ」「肌の表面が硬くゴワついて化粧水が入っていかない」といった深刻なお悩みが急増します。<br>
      秋の肌は、<strong>【夏の紫外線による角質肥厚】</strong>と<strong>【外気の急激な乾燥によるバリア機能低下】</strong>という2重のダメージに直面しています。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fed7aa;">
      <strong style="color: #ea580c; display: block; margin-bottom: 6px;">💡 秋のクレンジング選びで絶対に譲れない3大基準:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #7c2d12;">
        <li><strong>クッション性の高い厚膜ジェル・バーム:</strong> 指先と肌が直接触れ合わない弾力テクスチャーで摩擦ダメージをゼロに。</li>
        <li><strong>うるおいバリア（セラミド・ヒアルロン酸・植物オイル）の保護:</strong> メイク汚れだけを浮かせて、肌本来のNMF（天然保湿因子）を残す選択洗浄性。</li>
        <li><strong>硬化した毛穴をほぐす角質柔軟効果:</strong> 冷えで硬くなった毛穴周辺の角層を柔らかくし、頑固な角栓・黒ずみを無理なくスルリとオフ。</li>
      </ul>
    </div>
  </div>

  <h2>秋の毛穴ごわつき・乾燥肌を救う！高保湿クレンジングジェル・バーム厳選10選</h2>
  <p>楽天市場の最新レビュー評価、毛穴汚れ落ちと保湿度を専門家が徹底検証したランキングをご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">
      ✨ 美容のプロ直伝！秋の毛穴をふっくら整える「蒸しタオル＆摩擦レスクレンジング法」
    </h3>
    <p>高保湿なクレンジングジェル・バームの効果を何倍にも引き出す、秋にこそ取り入れたいステップです：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>手のひらを温めてからスタート:</strong> 冷たい手でジェルを乗せると毛穴が引き締まってしまい汚れが落ちにくくなります。ぬるま湯で手を温めてからジェルを手に取りましょう。</li>
      <li><strong>5点置きからの「面」で伸ばす:</strong> 額・両頬・鼻・顎に置き、手のひら全体を使って優しく包み込むように広げます。指先だけでゴシゴシ擦るのは摩擦ジワの原因になります。</li>
      <li><strong>皮脂の気になる小鼻・Tゾーンは薬指でクルクル:</strong> 最も力の入りにくい薬指の腹を使って、円を描くように優しく角栓を浮かせます。</li>
      <li><strong>ぬるま湯（32〜34℃）で丁寧にすすぐ:</strong> 熱いお湯は肌の油分を奪い砂漠化を招きます。「ちょっとぬるいかな」と感じる人肌以下の温度ですすぐのが鉄則です。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋の美肌・保湿ケア特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-warming-massage-gel-cream-dullness-10" style="color: #b45309; font-weight: bold;">温感マッサージジェル10選【血行促進とくすみ抜け】</a></li>
      <li><a href="/article/feat-autumn-enzyme-face-wash-powder-pores-dullness-10" style="color: #b45309; font-weight: bold;">酵素洗顔パウダー10選【秋の毛穴黒ずみ・古い角質リセット】</a></li>
      <li><a href="/article/feat-autumn-sheet-mask-dry-skin-barrier-10" style="color: #b45309; font-weight: bold;">高保湿シートマスク10選【秋の集中水分補給】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
