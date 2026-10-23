// scripts/autumn_series20_article3_carbonic.mjs
import { carbonicItemsRaw, carbonicArticles, renderProductCard } from './insert_autumn_series20_helper.mjs';

export function getCarbonicArticleContent() {
  const reviews = [
    {
      point: "中性重炭酸のパイオニアBARTH。お湯を中性に保つことで炭酸ガスが揮発せず重炭酸イオンとして長時間お湯に溶け込み、芯まで温める。",
      review: "まるで美容液のお風呂に入っているかのような滑らかな湯あたり。無香料・無着色で、水道水中の塩素を中和するため、秋の乾燥でデリケートになった肌にも一切ピリつきを感じさせません。38℃〜40℃のぬるめのお湯に15分以上浸かるだけで、血管が拡張して体温が内側から上昇。お風呂上がりも湯冷めせず、寝床に入っても足先がポカポカ温かいまま至福の入眠へと誘われます。",
      texture: "滑らかで柔らかな無色無臭の極上湯",
      skinType: "冷え性・疲労困憊・不眠気味・乾燥敏感肌",
      longevity: "ポカポカ持続＆疲労回復 ★★★★★"
    },
    {
      point: "ナイトケアで絶大な人気を誇るYOLUが手がける重炭酸バスタブレット。心地よい天然アロマと重炭酸のダブル効果で深い安眠をサポート。",
      review: "心地よいリラックスアロマが浴室いっぱいに広がり、秋の夜長のバスタイムを上質なスパ体験へと昇華。重炭酸イオンが温浴効果を高めて一日の緊張とコリをほぐし、さらに配合された保湿美容成分が湯上がり後の肌を乾燥から守り抜きます。手軽に試せる価格設定も魅力的な人気商品です。",
      texture: "アロマ香る乳白トリートメント湯",
      skinType: "リラックス重視・乾燥肌・香りに癒やされたい方",
      longevity: "アロマの癒やし＆温熱キープ ★★★★★"
    },
    {
      point: "赤ちゃんや敏感肌のために作られた安心の無添加・中性重炭酸ベビタブ。塩素を完全除去し、入浴しながら全身の汚れも優しくオフ。",
      review: "界面活性剤や石鹸を使わなくても、重炭酸イオンの力で古い角質や余分な皮脂汚れを優しく浮き上がらせて洗い流す「重炭酸沐浴」。秋の空気の乾燥で肌がカサカサしやすいお子様や、アトピー肌・超乾燥肌の大人にも最適です。石鹸摩擦を減らせるため、肌本来のうるおいバリアを守り抜くことができます。",
      texture: "刺激ゼロのまろやか中性湯",
      skinType: "赤ちゃん・超敏感肌・乾燥性かゆみ",
      longevity: "うるおいバリア保護 ★★★★★"
    },
    {
      point: "重炭酸入浴剤の元祖ホットタブを気軽に試せる3種アソートセット。プレミアム・リカバリー・ウェルネスの効能の違いを体感。",
      review: "「どれを選べばいいか分からない」という初めての方にぴったりのトライアル。アスリートの疲労回復から美容目的まで、それぞれのシーンに合わせて使い分けが可能です。マイクロバブルの微細な泡が全身を包み込み、毛穴の奥まで重炭酸イオンが浸透して血行不良による冷えと肩こりを劇的にほぐしてくれます。",
      texture: "微細バブルが溶け込むクリア湯",
      skinType: "重炭酸初心者・冷え・疲労回復",
      longevity: "3種のお試し温活 ★★★★★"
    },
    {
      point: "毎日使える大容量180錠セット！医薬部外品として冷え症・肩こり・腰痛・疲労回復に正式認可された本格ホットタブ。",
      review: "秋から冬にかけての本格的な寒さ対策として、家族全員で毎晩贅沢に使える頼もしい定期ストック。重炭酸イオンは24時間以上お湯の中に溶け込み続けるため、家族の入浴時間がバラバラでも最後に入る人まで変わらぬ高濃度温熱効果を享受できます。毎日の入浴で風邪を引きにくい強い身体を作ります。",
      texture: "24時間効果が持続する本格重炭酸湯",
      skinType: "重度の冷え性・慢性的疲労・ファミリー",
      longevity: "24時間イオン持続 ★★★★★"
    },
    {
      point: "重炭酸×美容液成分が凝縮されたLUXURU。お風呂に入りながら全身を贅沢なスキンケア液に浸すラグジュアリー体験。",
      review: "まるで美容液の中に浸かっているかのようなリッチなとろみ感。コラーゲンやヒアルロン酸などの高保湿美容エキスがたっぷり溶け出し、入浴後の急激な肌のつっぱりや粉ふきを徹底ブロックします。温浴効果で血行を促しながら全身のキメを整え、触れたくなるようなもっちりすべすべ肌へと導きます。",
      texture: "とろけるような美容液リッチ湯",
      skinType: "全身乾燥・粉ふき・贅沢スキンケア",
      longevity: "全身もっちり保湿 ★★★★★"
    },
    {
      point: "生薬成分と重炭酸が融合した薬用ホットタブ重炭酸湯Classic。より高い温浴効果と温まりの持続性を追求した上位モデル。",
      review: "昔ながらの湯治場のような芯からの温まりを自宅で。秋の冷たい雨の日や冷え込みが厳しい夜でも、湯船に浸かって数分で手足の先からジワーッと熱が巡り始め、頑固な腰痛や背中のコリがスッと軽くなります。お風呂上がりの湯冷めを完全に防止し、深い睡眠をもたらします。",
      texture: "生薬エキスが溶け込む温活強化湯",
      skinType: "重度の腰痛・肩こり・頑固な冷え",
      longevity: "深部温熱持続 ★★★★★"
    },
    {
      point: "青汁や健康食品で有名なキューサイが開発したWELTAB。大人の女性の冷え・巡り・自律神経の乱れに寄り添う薬用重炭酸。",
      review: "大人のゆらぎ期や更年期の冷え・のぼせ・だるさにアプローチ。中性のまろやかなお湯が自律神経の交感神経から副交感神経への切り替えをスムーズにし、ストレスフルな一日を穏やかに締めくくります。10日分の使い切りパッケージで、ギフトや自分への集中ケアにも最適です。",
      texture: "肌をやさしく包み込むマイルド湯",
      skinType: "大人世代の冷え・自律神経の乱れ・だるさ",
      longevity: "巡りサポート ★★★★★"
    },
    {
      point: "ギフトにも大人気のモイスクル20錠入り。高純度炭酸と保湿成分が秋の冷えと肌荒れを同時に癒やすスタイリッシュ入浴剤。",
      review: "おしゃれなパッケージデザインで、大切な人への秋のプチギフトや誕生日プレゼントにも大好評。微細な炭酸がお湯に溶け込み、入浴後の肌をしっとりスベスベに保ちます。手頃な容量と価格で、週に2〜3回のスペシャル温活デー用として取り入れるのもおすすめです。",
      texture: "なめらかなうるおいヴェール湯",
      skinType: "冷え性・ギフト・おしゃれ重視",
      longevity: "しっとり温活 ★★★★☆"
    },
    {
      point: "肌荒れ対策に特化した薬用重炭酸SPA。有効成分がニキビ・あせも・ひび・あかぎれなどの肌トラブルを薬用ケア。",
      review: "秋口の肌荒れや背中ニキビ、乾燥による皮膚のひび割れに悩む方に。重炭酸の温浴効果で皮膚の血行を促し、新陳代謝を高めながら有効成分が炎症を鎮めます。湯上がり後は肌がすっきりと清潔に保たれ、乾燥やかゆみが落ち着いて滑らかな素肌へと整います。",
      texture: "すっきり清潔感のある薬用湯",
      skinType: "肌荒れ・背中ニキビ・乾燥性ひび割れ",
      longevity: "肌トラブル予防 ★★★★★"
    }
  ];

  let cardsHtml = '';
  carbonicItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, carbonicArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #b91c1c; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(185, 28, 28, 0.08);">
    <h2 style="color: #991b1b; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 なぜ秋は「ぬるめのお湯の重炭酸温浴」が手足の冷え・湯冷めに効くのか？</h2>
    <p style="margin: 0 0 14px 0; color: #450a0a; font-size: 15px;">
      10月下旬〜11月、手足の指先が氷のように冷たくなり、お風呂に入っても「上がった直後から冷えて足先が冷たい」「夜中に足が冷えて目が覚める」という方が急増します。<br>
      寒さのあまり42℃以上の熱いお湯に短時間浸かるのは逆効果。交感神経が刺激されて血管が収縮し、湯上がり直後に熱が一気に放散して急激な「湯冷め」を引き起こしてしまいます。<br>
      ここで活躍するのが<strong>【お湯に溶け込んだ重炭酸イオンによるぬるめ温浴】</strong>です。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fecaca;">
      <strong style="color: #b91c1c; display: block; margin-bottom: 6px;">💡 一般の炭酸入浴剤と「中性重炭酸」の決定的な違い:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #7f1d1d;">
        <li><strong>炭酸ガスは空気中に逃げるが、重炭酸イオンはお湯に留まる:</strong> 一般の炭酸ガスは泡が消えると効果が半減しますが、中性重炭酸はお湯にイオンとして24時間以上溶け込み続けます。</li>
        <li><strong>血管を広げるNO（一酸化窒素）の分泌を促進:</strong> 重炭酸イオンが皮膚から吸収されると、血管内皮細胞からNOが分泌され、毛細血管が劇的に拡張して血流量が数倍にアップ。</li>
        <li><strong>水道水のカルキ（塩素）を無害化:</strong> 中性のお湯は肌への刺激が極めて少なく、乾燥で荒れた肌や赤ちゃんのデリケートな皮膚もやさしく包み込みます。</li>
      </ul>
    </div>
  </div>

  <h2>秋の冷え・湯冷め・疲労を一掃！高濃度炭酸・重炭酸入浴剤厳選10選</h2>
  <p>楽天ランキング上位かつ中性重炭酸イオン濃度・温浴持続力・疲労回復力に優れた名品を厳選してご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #b91c1c; padding-bottom: 8px;">
      ✨ 美容プロ直伝！深部体温を上げて熟睡できる「重炭酸温浴のゴールデンルール」
    </h3>
    <p>重炭酸入浴剤の効能を100%引き出し、就寝時の冷えを完全克服する入浴ステップです：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>お湯の温度は「38℃〜40℃」に設定:</strong> 「ちょっとぬるいかな」と感じる温度がベスト。副交感神経が優位になり、血管が自然に拡張します。</li>
      <li><strong>重炭酸タブレットを入れて完全に溶かす:</strong> 錠剤が溶けきるまで約10分かかります。溶けきった後のお湯に重炭酸イオンが充満しています。</li>
      <li><strong>15分〜20分間、肩までじっくり浸かる:</strong> 10分を過ぎたあたりから手足の先からジワジワと発汗が始まり、血流が全身を駆け巡ります。</li>
      <li><strong>入浴後は「90分後」に就寝する:</strong> 入浴で上がった深部体温が約90分かけてゆっくり下がるタイミングで、最も深いノンレム睡眠（成長ホルモン分泌）が得られます。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋の温活＆ボディケア特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-moist-bath-oil-body-care-cold-dry-10" style="color: #b45309; font-weight: bold;">高保湿バスオイル10選【秋の冷え込み・過乾燥防止】</a></li>
      <li><a href="/article/feat-autumn-moist-foot-cream-cold-dry-heels-10" style="color: #b45309; font-weight: bold;">高保湿フットクリーム10選【足元の冷えとかかとひび割れ】</a></li>
      <li><a href="/article/feat-autumn-warming-massage-gel-cream-dullness-10" style="color: #b45309; font-weight: bold;">温感マッサージジェル10選【血行促進とくすみ抜け】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
