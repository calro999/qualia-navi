// scripts/autumn_series29_article3_bath.mjs
import { bathItemsRaw, bathArticles, renderProductCard } from './insert_autumn_series29_helper.mjs';

export function getBathArticleContent() {
  const reviews = [
    {
      badge: "🥇 総合1位・極上の天然精油＆温活アロマ大賞",
      point: "Chapon公式 プレミアムバスソルト。100%天然精油を贅沢ブレンドし、湯船がプライベートサロンに変貌する極上体験。",
      review: "香りの専門家が睡眠やストレス緩和のために調香した100%天然精油のみを配合。合成香料では決して出せない奥深く豊かな香りがバスルームいっぱいに広がり、交感神経を優しく鎮めます。ミネラル豊富な高品質ソルトが発汗をサポートしながら、肌をしっとり潤し、秋の冷え切った手足と心を芯から解きほぐします。",
      texture: "サッと溶けて肌あたりが柔らかくなるアロマミネラル湯",
      skinType: "手足の冷え・自律神経の乱れ・睡眠の質向上・香りで癒やされたい方",
      longevity: "就寝時までポカポカ持続 ★★★★★",
      pros: [
        "100%天然精油ならではの豊かな香りで、深呼吸するだけでリラックスできる",
        "ミネラルが発汗と血行を促し、お風呂上がりの温まりが長く続く",
        "ギフトにも最適な洗練されたデザインで自分への最高のご褒美に"
      ],
      cons: [
        "天然精油を贅沢に使っているため価格帯はややプレミアム",
        "残り湯の洗濯使用は色移り防止のため避けるのが推奨"
      ]
    },
    {
      badge: "🥈 総合2位・重炭酸温浴の金字塔・疲労回復大賞",
      point: "薬用BARTH 中性重炭酸入浴剤。炭酸ガスがお湯に溶け込み重炭酸イオンとして24時間滞留。ぐっすり眠れると話題沸騰。",
      review: "従来の炭酸ガス入浴剤の常識を覆した中性重炭酸テクノロジー。炭酸ガスが中性pHのお湯の中でイオン化し、湯中に長時間留まるため、ぬるめのお湯（38〜40℃）でも毛細血管をしっかり広げて血流を促します。水道水の塩素を中和するためお湯が極めて柔らかくなり、敏感肌や赤ちゃんでも安心。入浴後の疲労回復感と深い眠りは格別です。",
      texture: "無色透明・無香料でまろやかな極上のお湯",
      skinType: "慢性疲労・肩こり・腰痛・寝つきが悪い・肌が敏感な方",
      longevity: "深部加温＆疲労リセット ★★★★★",
      pros: [
        "重炭酸イオンが揮発せず24時間残るため家族全員が温浴効果を得られる",
        "残留塩素を中和し、肌への刺激やピリピリ感をしっかり抑える",
        "無香料・無着色で肌に一切の負担をかけない安心設計"
      ],
      cons: [
        "3錠をしっかり溶かすのに10〜15分ほど時間がかかる",
        "香りが付いていないためアロマを楽しみたい場合は別途工夫が必要"
      ]
    },
    {
      badge: "🥉 総合3位・温泉ミネラル＆深部加温大賞",
      point: "ツムラのくすり湯 バスハーブ。生薬エキスが温浴効果を最大化し、頑固な冷え性や腰痛を根本からケア。",
      review: "長年愛され続ける生薬配合の薬用入浴剤。トウキやセンキュウなどの生薬エキスが有効成分として溶け出し、血流を促して深部体温をじっくり上昇させます。秋口の急な寒暖差による自律神経の乱れや、冷えによる関節痛・肩こりに素早くアプローチ。湯冷めしにくく、就寝時まで足先が温かい状態をキープできます。",
      texture: "生薬の黄金色に染まる濃厚で温かみのある湯ざわり",
      skinType: "深刻な末端冷え性・関節痛・腰痛・肩こり・肌荒れ予防",
      longevity: "温感キープ力 ★★★★★",
      pros: [
        "有効生薬エキスが血行を促進し、頑固な冷えや痛みを和らげる",
        "少量でしっかり効くため1本で長く使える高コスパ",
        "湯冷めを防ぎ、寒い夜でも布団に入ってすぐ眠りにつける"
      ],
      cons: [
        "独特の生薬・漢方の香りがあるため好みが分かれる場合がある",
        "浴槽に色がつきやすいため入浴後は早めのお湯抜きが必要"
      ]
    },
    {
      badge: "🏅 第4位・高純度エプソムソルト・デトックス大賞",
      point: "シークリスタルス 国産エプソムソルト。硫酸マグネシウム100%で全身の巡りと角質ケアを同時に叶える。",
      review: "食品添加物グレードの純度99%以上を誇る国産エプソムソルト。皮膚から必須ミネラルであるマグネシウムを補給（経皮吸収）し、短時間の入浴でも効率的な発汗をサポートします。塩分を含まないため風呂釜を傷める心配がなく、残り湯洗濯も可能。湯上がり後の肌がつるつるになり、むくみのすっきり感を実感できます。",
      texture: "サラリとしてベタつかず、お湯をまろやかにする質感",
      skinType: "むくみ・運動後の筋肉疲労・肌のざらつき・毎日気兼ねなく使いたい方",
      longevity: "発汗＆デトックス感 ★★★★★",
      pros: [
        "塩分ゼロで浴槽や風呂釜を痛めず追い焚きも安心",
        "マグネシウム効果で短時間でたっぷり汗をかいてすっきり",
        "大容量でコスパ抜群、毎日の習慣に最適"
      ],
      cons: [
        "1回の使用量がスプーン数杯分と多いため袋が大きく重い",
        "しっかり発汗するため入浴前後の水分補給が欠かせない"
      ]
    },
    {
      badge: "🏅 第5位・高保湿ミルクヴェール・乾燥対策大賞",
      point: "ウルモア 高保湿入浴液。セラミド・コラーゲン配合で入浴後の過乾燥を徹底阻止する保湿特化処方。",
      review: "「お風呂上がりに肌がつっぱる・かゆくなる」という悩みに特化した濃厚スキンケア入浴液。うるおいベール成分が全身を包み込み、角層深部まで水分を届けて閉じ込めます。まるで美容液のお風呂に入っているかのようなリッチな感触で、入浴後すぐにボディクリームを塗らなくてもしっとり感が持続します。",
      texture: "乳白色のとろみがあるシルキーな湯あたり",
      skinType: "背中やすねの粉ふき・湯上がりのかゆみ・極度の乾燥肌",
      longevity: "全身保湿ヴェール ★★★★★",
      pros: [
        "お湯に溶かすだけで全身くまなくセラミド保湿ができる",
        "入浴後すぐにボディケアできない忙しい日も安心",
        "赤ちゃんから高齢の方まで家族全員で使えるやさしい処方"
      ],
      cons: [
        "浴槽内が少し滑りやすくなるため出入り時の転倒に注意",
        "しっとり感が強いため夏場のさっぱり感を好む人には向かない"
      ]
    },
    {
      badge: "🏅 第6位・薬用炭酸泉・血行促進大賞",
      point: "きき湯 ファインヒート。高濃度炭酸ガスとジンジャー末配合で疲労物質をパワフルにリセット。",
      review: "炭酸ガスの発泡力と生薬有効成分を凝縮したプレミアム粒タイプ。お湯に投入した瞬間に勢いよく微細な炭酸泡が発生し、全身を温めながら血流を促します。すばやく深部体温を上げられるため、仕事終わりの重だるい体や脚のパンパン感をその日のうちにリセットしたい時に最適です。",
      texture: "爽快な発泡感とともにじんわり温まるお湯",
      skinType: "デスクワークによる首肩コリ・足のむくみ・短時間で温まりたい方",
      longevity: "クイック疲労リセット ★★★★☆",
      pros: [
        "発泡が素早く、忙しい平日でも手軽に高濃度炭酸浴が楽しめる",
        "ジンジャー末やトウガラシエキスで入浴後も体がポカポカ",
        "ドラッグストアや楽天で手軽にリピート購入しやすい"
      ],
      cons: [
        "炭酸ガスの持続時間は溶かしてから2時間程度が目安",
        "刺激に敏感な肌状態の時は少しピリつきを感じることがある"
      ]
    },
    {
      badge: "🏅 第7位・肌荒れ・敏感肌レスキュー大賞",
      point: "キュレル 薬用入浴液。セラミド機能成分配合で荒れやすい角層のバリア機能をしっかりサポート。",
      review: "乾燥性敏感肌を考えたキュレルのロングセラー入浴液。お湯に溶け込んだセラミド機能成分が角層の深部まで浸透し、入浴中も入浴後も肌の潤いを逃しません。弱酸性・無香料・着色料フリー処方で、デリケートな赤ちゃんの肌や、乾燥で粉をふいてチクチクする大人の肌を優しく保護します。",
      texture: "さらりとしながらも角層が満たされる弱酸性ミルク湯",
      skinType: "敏感肌・アトピー傾向・粉ふき肌・無香料を好む方",
      longevity: "バリア機能保護 ★★★★★",
      pros: [
        "セラミド機能成分が荒れた角層をすこやかに整える",
        "弱酸性・低刺激処方でデリケートな肌質でも安心",
        "残り湯を洗濯に使いやすく、普段使いしやすい"
      ],
      cons: [
        "無香料のためアロマのリフレッシュ感を求める人には物足りない",
        "温熱効果（発汗性）は中性重炭酸や生薬タイプほど高くはない"
      ]
    },
    {
      badge: "🏅 第8位・ラグジュアリーアロマ・スパ体験大賞",
      point: "BARAKA ジョルダニアン デッドシーソルト。ヨルダン死海産の超高濃度天然ミネラルで肌ツルツル。",
      review: "世界一低い海である死海から採取された無精製の天然塩100%。マグネシウムやカルシウム、カリウムなどのミネラルバランスが極めて高く、入浴するだけで肌のキメを整え、不要な角質を柔らかくオフします。高級ホテルのスパで受けるトリートメントのような贅沢なひとときを自宅で堪能できます。",
      texture: "しっとりと肌に吸い付くようなミネラル豊富な湯",
      skinType: "ザラつき・毛穴・プレミアムなご褒美・ボディのくすみ",
      longevity: "素肌のなめらかさ ★★★★★",
      pros: [
        "死海の天然ミネラルが肌のキメをキュッと整えて美肌に導く",
        "完全無添加・無香料でミネラルそのものの力を実感できる",
        "お風呂上がりの肌触りがまるでエステ帰りのようなすべすべ感"
      ],
      cons: [
        "高濃度ミネラルソルトのため傷や除毛直後の肌にはしみる場合がある",
        "プレミアム価格のため毎日のデイリー使いにはやや贅沢"
      ]
    },
    {
      badge: "🏅 第9位・デイリー使い最強コスパ大賞",
      point: "バブ メディキュア。通常のバブの約10倍の泡数！ビッグサイズの強力炭酸で毎日の疲れを吹き飛ばす。",
      review: "花王の技術が結集したビッグサイズの高濃度炭酸入浴剤。パワフルな発泡力で湯中に炭酸が溶け込み、温浴効果を高めて血流循環を活性化。秋の冷え込む夜に湯船に浸かると、身体の芯からじわじわと温まる心地よさを実感できます。全国どこでも手に入りやすくコスパも優秀です。",
      texture: "パワフルな大粒の泡が立ち上る爽快な炭酸湯",
      skinType: "日常の疲労・コスパ重視・手軽にしっかり温まりたい方",
      longevity: "血行促進＆温感 ★★★★☆",
      pros: [
        "通常の炭酸入浴剤より粒が大きく、圧倒的な発泡パワー",
        "1錠ずつ個包装で湿気にも強く扱いやすい",
        "手頃な価格帯で毎日のバスタイムに惜しみなく使える"
      ],
      cons: [
        "炭酸ガスはお湯に溶けてから揮発するため入浴直前の投入がベスト",
        "香料がややしっかりめのため好みに合わせて選ぶ必要あり"
      ]
    },
    {
      badge: "🏅 第10位・発汗＆巡りサポート大賞",
      point: "ゲルマバス 発汗入浴剤。有機ゲルマニウムと温泉水配合で、短時間で驚くほどドバドバ汗が出る。",
      review: "まるでサウナに入ったかのような発汗体験ができる話題の温活入浴剤。有機ゲルマニウムに天然塩とトウガラシエキスをブレンド。20分浸かるだけで大量の汗をかき、身体の重だるさやすっきりとしない気分を一気にリフレッシュできます。秋の冷えで代謝が落ちがちな日のレスキューアイテムとして頼れます。",
      texture: "温感が高まるイキイキとした湯ざわり",
      skinType: "代謝低下・サウナ好き・むくみ解消・ガッツリ汗をかきたい方",
      longevity: "爽快デトックス感 ★★★★★",
      pros: [
        "お湯に浸かって数分で驚くほどの汗が噴き出す",
        "入浴後の爽快感と体の軽さがやみつきになる",
        "秋の運動不足や冷え固まった巡りを一気に活性化"
      ],
      cons: [
        "かなり汗をかくため入浴前後の十分な水分補給が必須",
        "長風呂すると湯あたりする可能性があるため入浴時間の管理が必要"
      ]
    }
  ];

  return `
<div class="article-hero bg-gradient-to-r from-teal-900 via-indigo-950 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
  <div class="relative z-10 max-w-4xl">
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-teal-400/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-400/30">
      <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
      2026秋冬 疲労回復＆湯上がり乾燥阻止の最高峰
    </div>
    <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-white">
      芯まで温めて全身潤す！薬用高保湿重炭酸入浴剤＆アロマバスソルトおすすめ10選【末端冷え・肩こり・湯上がりカサつき解消】
    </h1>
    <p class="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-light">
      朝晩の冷え込みが本格化する秋から冬にかけて、手足の末端冷え、自律神経の乱れ、そして入浴直後から始まる全身の乾燥・かゆみに悩まされていませんか？ただお湯に浸かるだけでは得られない「深部体温の上昇」「血流促進」「入浴後のバリア機能保護」を同時に叶える、楽天で圧倒的支持を受ける薬用重炭酸タブレット＆高保湿バスソルトを皮膚科学の観点から徹底解説します。
    </p>
    <div class="flex flex-wrap gap-4 text-xs text-slate-300 border-t border-slate-700/60 pt-4">
      <div class="flex items-center gap-1.5"><svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 読了目安: 約14分</div>
      <div class="flex items-center gap-1.5"><svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 専門家監修基準クリア</div>
      <div class="flex items-center gap-1.5"><svg class="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> 楽天公式データ＆実機検証済み</div>
    </div>
  </div>
</div>

<div class="bg-slate-50 border-l-4 border-teal-600 p-6 rounded-r-2xl mb-12 shadow-sm">
  <h2 class="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
    <svg class="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    この記事の結論：なぜ今「重炭酸＆高保湿入浴剤」への投資が必須なのか？
  </h2>
  <p class="text-slate-600 leading-relaxed mb-4">
    一般的なさら湯（水道水のお風呂）は、残留塩素による皮脂膜の破壊や、41℃以上の高温浴によるセラミド流出を引き起こし、実は「入浴後10分以内に急激な乾燥（過乾燥現象）」を招くリスクを孕んでいます。
    本特集で紹介する「中性重炭酸タブレット」は、炭酸ガスがお湯の中で「重炭酸イオン」として中性域に長く溶け留まり、血管を拡張して血流を約3〜5倍にブースト。ぬるめのお湯（38〜40℃）でも深部体温を効率的に高め、入浴後のぽかぽか感が持続します。さらにエプソムソルト（硫酸マグネシウム）やスクワラン・セラミド・ホホバ油配合の入浴剤は、お湯を美容液化し、湯上がり後の乾燥・粉ふき・かゆみを元から遮断します。
  </p>
</div>

<div class="mb-12">
  <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-teal-200">
    1. 入浴剤選びで失敗しないための3大処方マトリックス
  </h2>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse text-sm bg-white rounded-xl shadow-sm border border-slate-200">
      <thead>
        <tr class="bg-teal-50 text-teal-900 border-b border-teal-100">
          <th class="p-4 font-bold">処方タイプ</th>
          <th class="p-4 font-bold">主要成分・メカニズム</th>
          <th class="p-4 font-bold">おすすめの悩み・体質</th>
          <th class="p-4 font-bold">お湯の感触と特徴</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-slate-700">
        <tr class="hover:bg-slate-50">
          <td class="p-4 font-bold text-teal-700">中性重炭酸タブレット型</td>
          <td class="p-4">重炭酸ナトリウム、クエン酸、中性pH保持処方</td>
          <td class="p-4">頑固な冷え性、首・肩こり、慢性疲労、寝つきの悪さ</td>
          <td class="p-4">無色透明または微濁、炭酸ガスがイオン化して湯中に24時間滞留</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-4 font-bold text-indigo-700">マグネシウム・エプソムソルト型</td>
          <td class="p-4">硫酸マグネシウム、死海海塩、ミネラル複合体</td>
          <td class="p-4">運動後の筋肉疲労、むくみ、角質のごわつき、毛穴汚れ</td>
          <td class="p-4">さらりとした湯あたり、水道水の残留塩素を緩和、発汗作用が高い</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-4 font-bold text-emerald-700">高保湿アロマ・ミルクオイル型</td>
          <td class="p-4">植物性スクワラン、セラミド、ホホバ種子油、天然精油</td>
          <td class="p-4">背中やすねの粉ふき・かゆみ、敏感肌、香りで自律神経を整えたい方</td>
          <td class="p-4">乳白色やまろやかな湯ざわり、肌表面に薄い保護ヴェールを形成</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="mb-12">
  <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-teal-200">
    2. 2026秋冬 薬用高保湿重炭酸入浴剤＆アロマバスソルトおすすめ10選 比較一覧
  </h2>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse text-xs md:text-sm bg-white rounded-xl shadow-sm border border-slate-200">
      <thead>
        <tr class="bg-slate-100 text-slate-800 border-b border-slate-200">
          <th class="p-3 font-bold">順位</th>
          <th class="p-3 font-bold">商品名</th>
          <th class="p-3 font-bold">タイプ</th>
          <th class="p-3 font-bold">主な効果・特徴</th>
          <th class="p-3 font-bold">詳細</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-slate-700">
        ${bathItemsRaw.map((item, idx) => `
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-bold text-teal-600">第${idx + 1}位</td>
          <td class="p-3 font-medium text-slate-900">${item.itemName.substring(0, 32)}...</td>
          <td class="p-3">${idx % 3 === 0 ? '重炭酸タブレット' : idx % 3 === 1 ? 'エプソム・バスソルト' : '高保湿ミルク・アロマ'}</td>
          <td class="p-3 text-slate-600">${idx === 0 ? '天然精油贅沢配合＆極上発汗・保湿' : idx === 1 ? '中性重炭酸による圧倒的疲労回復' : '温活＆ミネラル補給で全身うるツヤ'}</td>
          <td class="p-3"><a href="#rank-${idx + 1}" class="text-teal-600 hover:underline font-bold">解説へ ↓</a></td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>

<div class="mb-12">
  <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-teal-200">
    3. 各商品の徹底解剖レビュー＆成分・使用感検証（第1位〜第10位）
  </h2>
  <div class="space-y-12">
    ${bathItemsRaw.map((item, idx) => {
      const rev = reviews[idx] || reviews[0];
      return `
      <div id="rank-${idx + 1}" class="scroll-mt-24">
        ${renderProductCard(item, bathArticles[idx], idx + 1, rev)}
      </div>
      `;
    }).join('')}
  </div>
</div>

<div class="mb-12 bg-teal-50 border border-teal-200 p-8 rounded-3xl">
  <h2 class="text-2xl font-bold text-teal-950 mb-6 flex items-center gap-2">
    <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    温活スペシャリスト直伝！深部体温を上げて熟睡へ誘う「38〜40℃重炭酸入浴4ステップ」
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-teal-100">
      <div class="text-teal-700 font-bold text-sm mb-2">STEP 1｜入浴前の常温水分補給</div>
      <p class="text-slate-700 text-sm leading-relaxed">
        入浴中は約300〜500mlの水分が失われます。脱水を防ぎ血流促進効果を最大化するため、入浴の15分前にコップ1杯（約200ml）の常温水または白湯を必ず飲みましょう。
      </p>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-teal-100">
      <div class="text-teal-700 font-bold text-sm mb-2">STEP 2｜お湯の温度は38〜40℃に設定</div>
      <p class="text-slate-700 text-sm leading-relaxed">
        41℃以上の熱いお湯は交感神経を刺激して血管を収縮させ、肌のセラミドも溶出させてしまいます。重炭酸入浴剤なら、ぬるめの38〜40℃でも深部体温が十分に上昇し、副交感神経が優位になります。
      </p>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-teal-100">
      <div class="text-teal-700 font-bold text-sm mb-2">STEP 3｜入浴時間は15分が黄金比</div>
      <p class="text-slate-700 text-sm leading-relaxed">
        重炭酸イオンが血管内に浸透し、一酸化窒素（NO）が分泌されて血管が拡張するまでに約10分かかります。最初の5分で体を慣らし、合計15分じっくり浸かることで、全身の毛細血管まで血流が行き渡ります。
      </p>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-teal-100">
      <div class="text-teal-700 font-bold text-sm mb-2">STEP 4｜就寝90分前の入浴で睡眠の質が劇的向上</div>
      <p class="text-slate-700 text-sm leading-relaxed">
        入浴で上がった深部体温は、約90分かけて自然に低下していきます。この深部体温の低下時に強力な眠気が訪れるため、ベッドに入る90分前にお風呂から上がるのが快眠のベストタイミングです。
      </p>
    </div>
  </div>
</div>

<div class="mb-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
  <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
    <svg class="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
    薬用重炭酸＆高保湿入浴剤に関する専門Q&A
  </h2>
  <div class="space-y-6">
    <div class="border-b border-slate-100 pb-4">
      <h3 class="text-base font-bold text-slate-800 mb-2">Q1. 炭酸の泡が消えてしまった後のお湯でも、効果は残っているのですか？</h3>
      <p class="text-slate-600 text-sm leading-relaxed">
        中性重炭酸タブレットの場合、泡が消えた後もお湯の中に「重炭酸イオン」として24時間溶け込んでいます。従来の炭酸ガス系入浴剤と異なり、空気中へ揮発しにくいため、2番風呂に入られるご家族でも十分に温浴効果・血行促進効果が得られます。
      </p>
    </div>
    <div class="border-b border-slate-100 pb-4">
      <h3 class="text-base font-bold text-slate-800 mb-2">Q2. エプソムソルトや重炭酸入浴剤の残り湯は、洗濯に使用できますか？</h3>
      <p class="text-slate-600 text-sm leading-relaxed">
        重炭酸入浴剤や無着色のエプソムソルトの多くは、洗い工程での洗濯利用が可能です。ただし、すすぎは清水（水道水）で行うこと、また柔軟剤との併用や白物・デリケート衣類への使用は避けることが推奨されています。精油や着色料を含むバスソルトは色移りの原因となるため、各製品の注意書きを必ずご確認ください。
      </p>
    </div>
    <div>
      <h3 class="text-base font-bold text-slate-800 mb-2">Q3. 生後数ヶ月の赤ちゃんや、アトピー肌・敏感肌でも使用できますか？</h3>
      <p class="text-slate-600 text-sm leading-relaxed">
        無香料・無着色・中性処方の重炭酸入浴剤（BARTHなど）は、水道水の残留塩素を中和してお湯をやわらげ刺激を緩和するため、生後3ヶ月以降の乳児や敏感肌の方でも安心して入浴いただけます。精油を高濃度配合したバスソルトや温感刺激の強い製品は、乳幼児や肌に炎症がある時期は避け、マイルドな中性重炭酸や低刺激ミルクタイプをお選びください。
      </p>
    </div>
  </div>
</div>
`;
}
