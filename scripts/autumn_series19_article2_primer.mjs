// scripts/autumn_series19_article2_primer.mjs
import { primerItemsRaw, primerArticles, renderProductCard } from './insert_autumn_series19_helper.mjs';

export function getPrimerArticleContent() {
  const reviews = [
    {
      point: "SPF50+ PA++++の最高峰UVカットと美容液のようなリッチな保湿感を両立。秋の乾燥肌にみずみずしいツヤの薄膜を形成。",
      review: "高SPF特有のきしみ感や白浮き、乾燥によるパサつきが一切ない傑作UVプライマー。秋の外気乾燥にさらされても肌の水分量を長時間逃さず、ファンデーションの密着度を飛躍的に高めます。自然なツヤ肌仕上がりで、くすみがちな秋の肌を健康的でフレッシュな印象へ引き上げます。",
      texture: "みずみずしく伸びるうるおいミルク",
      skinType: "乾燥肌・普通肌・UV対策重視",
      longevity: "しっとりツヤ膜 ★★★★★"
    },
    {
      point: "美容液成分約90%配合！言わずと知れた名品ポール＆ジョーのモイスチュアライジングプライマー。オレンジフラワー水が角層を満たす。",
      review: "秋になると毎年爆発的な人気を誇るうるおい下地の決定版。まるでスキンケア美容液を馴染ませているかのような心地よい感触で、乾燥してキメが乱れた肌をツルンとなめらかに整えます。独自のスクレドール（シャンパンゴールドパール）が秋のくすみを飛ばし、内側から透き通るような発光肌を一日中演出してくれます。",
      texture: "とろけるような高保湿セラム",
      skinType: "乾燥肌・くすみ・透明感重視",
      longevity: "うるおい＆透明感持続 ★★★★★"
    },
    {
      point: "ピンクの血色感トーンアップとUV耐水性★★を兼備。秋の冷えで青白くなった肌にヘルシーな多幸感ツヤを与える。",
      review: "ほんのりピンクの色補正効果により、秋特有の顔色の悪さや疲労感を瞬時にリセット。毛穴や小ジワの凹凸を光の乱反射でぼかし、つるんとしたむき卵のような陶器肌をベースに仕込みます。日中の乾燥崩れを防ぎながら、マスクへの色移りも最小限に抑えてくれる頼もしい処方です。",
      texture: "滑らかにフィットするピンクエマルジョン",
      skinType: "血色不足・青白肌・毛穴悩み",
      longevity: "血色感キープ ★★★★★"
    },
    {
      point: "ミネラルと美容液成分で作られた敏感肌のためのシルキー下地。石鹸で優しくオフでき、秋のゆらぎ肌を紫外線と乾燥からガード。",
      review: "肌が敏感に傾き、ケミカルな成分でピリつきやすい秋の季節の救世主。毛穴の余分な皮脂だけを吸着しながら、セラミドや植物オイルが必要なうるおいをしっかり閉じ込めます。表面はサラリとしているのに内側はもっちり潤うシルキーな質感で、上から重ねるファンデーションの粉浮きを完全に防ぎます。",
      texture: "軽やかでなめらかなシルキークリーム",
      skinType: "敏感肌・乾燥ゆらぎ肌・石鹸オフ派",
      longevity: "バリア機能保護 ★★★★★"
    },
    {
      point: "日中のエイジングケアを兼ねた高機能UV美容液セラム。ナイアシンアミドや高保湿ペプチドが乾燥小ジワをふっくら持ち上げる。",
      review: "下地の枠を超えた本物のスキンケアセラム。肌に乗せた瞬間から角層深部までうるおいが満ち、夕方になっても目元や口元の乾燥小ジワが目立ちません。しっとりとした膜が一日中肌を守り抜き、秋風にさらされた後でもメイクを落とした肌が疲れていないことに驚かされます。",
      texture: "コクのあるリッチセラム",
      skinType: "乾燥肌・年齢肌・乾燥小ジワ悩み",
      longevity: "濃密保湿キープ ★★★★★"
    },
    {
      point: "水光肌の本場・韓国ミシャのグロウプライマー。肌に真珠のような濡れツヤと透明感を宿らせる大人気アイテム。",
      review: "乾燥でパサつき、光を反射しなくなった秋の肌に瞬時に濡れたような水光ツヤをチャージ。光を反射するパール粒子と保湿成分が肌表面をフラットに整え、ファンデーションのノリを劇的に向上させます。プチプラとは思えない高級感ある仕上がりで、若々しいハリツヤ肌が手に入ります。",
      texture: "みずみずしいグロウジェル",
      skinType: "乾燥肌・ツヤ肌好き・くすみ肌",
      longevity: "濡れツヤ持続 ★★★★★"
    },
    {
      point: "美容皮膚科・レカルカ発のスキンスムーサー。植物幹細胞やEGF様成分配合で、毛穴・小ジワの影を瞬時にフラット化。",
      review: "「塗るボトックス」とも称されるほどの高い毛穴・小ジワ補正力。乾燥でぽっかり開いてしまったたるみ毛穴やほうれい線の影に少量を馴染ませるだけで、まるでフィルターをかけたかのように凹凸が消え去ります。美容液成分が肌を乾燥から守り、夕方の毛穴落ちを完璧に防止します。",
      texture: "さらりと溶け込むスムースバーム",
      skinType: "たるみ毛穴・小ジワ・大人の凹凸悩み",
      longevity: "毛穴カバー持続 ★★★★★"
    },
    {
      point: "江原道伝統の発酵技術と温泉水ミネラルを融合。肌本来の生命力を目覚めさせ、乾燥知らずの健やかな素肌美を引き出す。",
      review: "映像業界のプロが信頼を寄せる江原道の下地。秋の空気の乾燥でごわついた肌にも均一に広がり、ファンデーションとの一体感を極限まで高めてくれます。肌呼吸を妨げない軽やかなつけ心地でありながら、夕方まで乾燥くすみや崩れを感じさせない端正な仕上がりが続きます。",
      texture: "みずみずしく軽やかな発酵エマルジョン",
      skinType: "乾燥肌・混合肌・ナチュラル素肌派",
      longevity: "端正な仕上がり持続 ★★★★★"
    },
    {
      point: "フィギュアスケーター本田真凜さんプロデュース。過酷なリンク上の乾燥と冷気にも負けない、極上のピュアグロウセラム処方。",
      review: "寒さと乾燥が厳しいリンク環境でも美しいツヤと透明感を維持するために開発された実力派プライマー。植物由来の美容オイルとヒアルロン酸が肌にうるおいを密着させ、光を美しく操ります。みずみずしい透明感が夕方まで持続し、秋の冷たい外気でも乾燥崩れを起こしません。",
      texture: "滑らかに伸びるウォータリーセラム",
      skinType: "乾燥肌・くすみ・透明感派",
      longevity: "ピュアツヤ持続 ★★★★★"
    },
    {
      point: "資生堂メーキャップ最高峰のスキンケア下地。ナイアシンアミドとケフィア発酵エキスGLを配合し、肌のバリアを育てながら輝かせる。",
      review: "世界中で数々のベストコスメを受賞したエッセンススキングロウシリーズ。もはや下地というよりも「色がつかない最高級美容液」。肌に乗せると体温でスッと溶け込み、美容液成分が角層を包み込みます。秋の深刻なインナードライを根本からケアし、みずみずしく生命力あふれるツヤ肌へ導きます。",
      texture: "極上のなめらかさを誇るエッセンス",
      skinType: "全肌質・深刻なインナードライ・美肌追求",
      longevity: "24時間スキンケア実感 ★★★★★"
    }
  ];

  let cardsHtml = '';
  primerItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, primerArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #d97706; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.08);">
    <h2 style="color: #92400e; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋の乾燥で「ファンデーションが粉浮き・毛穴落ちする」最大の原因</h2>
    <p style="margin: 0 0 14px 0; color: #451a03; font-size: 15px;">
      「秋になってからファンデを塗ると、鼻や頬が粉を吹いて毛穴が余計に目立つ」「昼過ぎになるとファンデが割れてシワに溜まる」「夕方の顔色が土色にくすむ」…その原因は、ファンデーションではなく<strong>【夏仕様の皮脂崩れ防止下地を使い続けていること】</strong>にあります。<br>
      夏用の下地は皮脂を強力に吸着するパウダーを多く含むため、秋の乾燥した環境下では肌に必要な水分・油分まで奪い取ってしまい、肌が砂漠化して粉浮きやひび割れを引き起こすのです。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fed7aa;">
      <strong style="color: #d97706; display: block; margin-bottom: 6px;">💡 秋の美容液プライマー選びで失敗しない3大チェックポイント:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #78350f;">
        <li><strong>美容液成分（ヒアルロン酸・セラミド・発酵エキス）80%以上配合:</strong> メイクしている間中、角層に水分を補給し続けるスキンケア発想処方。</li>
        <li><strong>光拡散パール・微細ピグメントによる凹凸補正:</strong> 厚塗りで毛穴を埋めるのではなく、光の乱反射で毛穴や小ジワの影を飛ばす処方。</li>
        <li><strong>ファンデーションを肌に吸い付かせる「モイスチャーマグネット処方」:</strong> 乾燥で浮きやすいパウダーやリキッドをピタッと密着させ、夕方までヨレを防ぐ。</li>
      </ul>
    </div>
  </div>

  <h2>秋の粉浮き・毛穴落ちを防ぐ！高保湿美容液プライマー厳選10選</h2>
  <p>楽天ランキング上位かつ保湿力・ツヤ持続力・毛穴補正力に優れた名品を厳選してご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #d97706; padding-bottom: 8px;">
      ✨ 美容プロ直伝！一日中崩れない「高保湿下地の仕込みテクニック」
    </h3>
    <p>高保湿プライマーのうるおい効果と持ちを最大限に引き出す塗り方のコツです：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>スキンケアの乳液・クリームが馴染んでから塗る:</strong> スキンケア直後のベタついた肌に下地を重ねるとムラづきの原因になります。1〜2分置いて肌表面が落ち着いてから下地を伸ばしましょう。</li>
      <li><strong>中心から外側へ「薄く均一に」伸ばす:</strong> 頬の中心や額に置き、外側に向かって放射状に薄く伸ばします。フェイスラインや髪の生え際はごく薄く仕上げるのが自然な立体感の秘訣です。</li>
      <li><strong>毛穴が気になる部分は「下から上へ」クルクル塗り込む:</strong> たるみ毛穴は下を向いているため、指の腹で下から上へと優しく入れ込むように馴染ませると凹凸が綺麗に消えます。</li>
      <li><strong>最後に手のひら全体でハンドプレス:</strong> 体温で下地を肌にしっかりと密着させることで、その後のファンデーションの吸い付きが格段にアップします。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋のベース＆メイク特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-hydrating-concealer-under-eye-dark-circles-10" style="color: #b45309; font-weight: bold;">高保湿リキッドコンシーラー10選【乾燥クマ・小ジワ影消し】</a></li>
      <li><a href="/article/feat-autumn-moist-makeup-setting-spray-dry-skin-10" style="color: #b45309; font-weight: bold;">メイクキープミスト10選【秋の乾燥崩れ防止・ツヤ仕込み】</a></li>
      <li><a href="/article/feat-autumn-best-moist-basemake-foundation-10" style="color: #b45309; font-weight: bold;">高保湿リキッドファンデ10選【秋のうるおい密着肌】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
