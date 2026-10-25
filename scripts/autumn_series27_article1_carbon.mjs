// scripts/autumn_series27_article1_carbon.mjs
import { carbonItemsRaw, carbonArticles, renderProductCard } from './insert_autumn_series27_helper.mjs';

export function getCarbonArticleContent() {
  const reviews = [
    {
      badge: "炭×海泥×高濃度炭酸・総合1位",
      point: "アートクライム公式「カーボンクレイソーダスパフォーム」。高濃度炭酸ガスに薬用炭と沖縄産マリンシルト（海泥）を掛け合わせた1本3役のスパフォーム。",
      review: "缶をよく振ってプッシュすると、真っ黒でモチのような超弾力泡がモコモコと出現します。逆さにしても1ミリも垂れない密度で肌に吸い付き、炭酸ガスが皮膚から浸透して毛細血管を拡張（ボーア効果）。秋の冷えで青白く淀んでいた頬が、パックして3分ほどで内側からジンワリ温まり、洗い流した瞬間には温泉上がりのようなバラ色の透明肌が現れます。同時に炭とクレイが小鼻の黒ずみ角栓をごっそり吸着してくれるため、毎日の洗顔兼・週2回の5分パックとして無敵の活躍を見せます。",
      pros: "混ぜる手間がないワンプッシュ泡タイプで、朝晩の洗顔ついでに毎日手軽に続けられる。毛穴の黒ずみと血行不良くすみが1回で抜ける。",
      cons: "炭とクレイの吸着力が高いため、超乾燥肌の人は5分以上放置せず、1〜2分のショートパックで洗い流すのがベスト。",
      texture: "指を押し返すほど弾力がある、漆黒の超濃密マイクロホイップ泡",
      skinType: "小鼻の黒ずみ・毛穴詰まり・朝の顔色の悪さ・むくみが気になる肌",
      longevity: "即時トーンアップ＆毛穴すっきり感 ★★★★★"
    },
    {
      badge: "特許技術・1剤式水光ジェル",
      point: "楽天ランキング1位！特許技術により「混ぜない1剤式」でありながら高濃度炭酸の発生を実現した「URU（ウル）炭酸パック」。",
      review: "従来の本格炭酸パックの最大の弱点だった「2つの液をカップで混ぜてヘラで塗り、終わった後に容器を洗うのが面倒くさい」という手間を特許技術で完全撤廃。チューブから出してそのまま乾いた肌に塗るだけで、空気と肌の水分に反応して微細な炭酸バブルが発生します。高保湿な美容成分がベースになっているため、洗い流した後の肌はまるで水光注射を打ったかのような「発光ツヤ玉」が出現。忙しいワーキングマザーやズボラさんでもサロン級の炭酸美容を挫折せず続けられます。",
      pros: "混ぜる手間・洗い物がゼロなのに、2剤式に匹敵するトーンアップと水光ツヤが出る。刺激がマイルドで毎日でも使いやすい。",
      cons: "肌が濡れていると発泡力が落ちるため、必ずお風呂に入る前や洗顔後にタオルでしっかり水気を拭き取ってから塗ること。",
      texture: "とろりとした透明ジェルが肌の上でシュワシュワの白い泡へと変化",
      skinType: "面倒な準備なしで本格炭酸ケアをしたい人・乾燥くすみ・ツヤ不足肌",
      longevity: "水光ツヤ玉＆しっとり感持続 ★★★★★"
    },
    {
      badge: "本格2剤式・サロン導入レベル",
      point: "エステサロンでも採用される本格2剤式炭酸ガスパック「PS PACK Plamine（プラミネ）」。1回分から本品7回分まで選べる高濃度ゲル。",
      review: "粉末（1剤）と濃厚美容ジェル（2剤）を直前に混ぜ合わせることで、作りたてのフレッシュかつ圧倒的濃度の炭酸ガスを20分間ノンストップで肌深部へ送り込む本格派。塗って15分ほど置くとジェルがプルプルのゴム状に固まるため、最後にペロンと一気に剥がすことができ、洗面台が汚れず拭き取りも超簡単です。剥がした瞬間の「フェイスラインのギュッとした引き締まり感」と「目の下の青クマの消え方」は、やはり2剤式ならではの感動体験です。",
      pros: "固まって綺麗に剥がせるピールオフ型なので、洗い流しが非常にラク。1回でエステ1回分（約1万円相当）の小顔・美肌効果がある。",
      cons: "2剤を混ぜるのに約30秒、放置に20分かかるため、時間がある夜や週末の集中ケア向き。",
      texture: "垂れずにピタッと密着し、20分後にプルプルに固まる高密度ゲル",
      skinType: "頬のたるみ・ほうれい線・頑固な青クマ・大事な予定の前に一発逆転したい人",
      longevity: "フェイスライン引き締め＆透明感 ★★★★★"
    },
    {
      badge: "大人の開き毛穴・ハリ注入",
      point: "あすなろわかさ発「シピエレガン 高濃度スパークリングパック」。年齢とともに縦長に広がる「たるみ毛穴」と「しぼみ肌」に特化。",
      review: "40代以降の毛穴が目立つ原因は、皮脂詰まりではなく「真皮のコラーゲン減少によって毛穴周りの皮膚が陥没すること」にあります。シピエレガンは高濃度炭酸で血流と代謝を呼び覚ますと同時に、大人肌に必要なハリ付与成分を角質層のすみずみまで圧入。くすんで影になっていた頬の毛穴が、パック後は内側からふっくらと持ち上がって目立たなくなり、ファンデーションが毛穴落ちしなくなります。",
      pros: "エイジング世代のたるみ毛穴・乾燥小ジワへのアプローチ力が極めて高い。洗い上がりがつっぱらずもっちり吸い付く。",
      cons: "血行が促進されて一時的に肌がほんのり赤くなる（フラッシング現象）ことがあるが、これは炭酸が効いている正常なサイン（数分で引きます）。",
      texture: "キメ細かくクリーミーで、肌を優しく包み込むリッチスパークリング",
      skinType: "30代後半〜50代のたるみ毛穴・しぼみ肌・夕方くすんで老けて見える肌",
      longevity: "毛穴ふっくら＆ハリ弾力キープ ★★★★★"
    },
    {
      badge: "顔〜頭皮マルチ・朝むくみ一掃",
      point: "洗顔・パック・頭皮ディープクレンジングまでこなすマルチ高濃度炭酸フォーム。秋の朝の「むくみ顔」を30秒でシャープに。",
      review: "秋になって朝起きるとまぶたや輪郭がむくんで重い、という日に朝の洗顔として使うと威力を発揮します。炭酸泡を顔全体とフェイスライン、さらに耳の後ろまで広げて30秒マッサージして流すだけで、滞っていたリンパと血流が一気に巡り、目がパッと大きく開いて顎のラインがシュッと引き締まります。さらに週1回、シャンプー前の頭皮に馴染ませれば、秋の頭皮の乾燥フケや皮脂臭も根こそぎリセットできる万能選手です。",
      pros: "顔だけでなく頭皮やデコルテにも使える大容量。朝の洗顔に使えばメイクのノリと小顔効果が劇的に上がる。",
      cons: "エアゾール缶（スプレー缶）のため、捨てる際はガスを完全に抜いてから自治体の区分に従って廃棄すること。",
      texture: "シュワッと爽快感があり、泡切れも抜群のシルキーホイップ",
      skinType: "朝の顔のむくみ・頭皮のベタつきや乾燥・時短で血行促進したい人",
      longevity: "朝のむくみ解消＆スッキリ感 ★★★★☆"
    },
    {
      badge: "韓国クリニック級・超高濃度70,000ppm",
      point: "韓国発のモンスター級ヒット「カーボキシー（CARBOXY）炭酸パック 5回分セット」。一般的な炭酸パックの約5〜7倍に達する超高濃度。",
      review: "美容クリニックやエステサロンで「毛穴の消しゴム」として絶大な人気を誇るカーボキシーのホームケア用（50,000〜70,000ppmクラス）。黒い菊花エキス配合ゲルを顔にたっぷり塗り、付属の専用シートを乗せた瞬間、「パチパチパチッ！」と激しい音とともに超高濃度炭酸ガスが一気に発生します。最初の2〜3分は熱いような強い刺激がありますが、20分後にシートを剥がして洗い流すと、自分の肌とは思えないほど毛穴がキュッと収縮し、陶器のような真っ白なツヤ肌に生まれ変わります。",
      pros: "市販の炭酸パックの中では群を抜く圧倒的な炭酸濃度と毛穴収縮力。1回での変化量がすさまじく、ニキビ跡や凹凸肌にも強い。",
      cons: "シートを乗せた瞬間に強いパチパチ感（痛みや熱感）があるため、超敏感肌の人や刺激に弱い人は最初は驚くので注意（効き目は最強）。",
      texture: "重厚な黒ジェル＋炭酸発生シートのハイブリッド構造",
      skinType: "頑固な開き毛穴・イチゴ鼻・クレーター凹凸・韓国美容医療レベルを求める人",
      longevity: "クリニック級の毛穴収縮＆白肌実感 ★★★★★"
    },
    {
      badge: "1,000円ポッキリ・泡立つシート",
      point: "韓国コスメ「PURED 炭酸バブルシートマスク」。貼るだけでモコモコのマイクロバブルが自然発泡する1,000円ポッキリお試しセット。",
      review: "「まずは1,000円で炭酸パックの面白さと毛穴洗浄力を体験してみたい」という方にうってつけ。黒い竹炭シートを顔に貼って1分待つと、シートの上から白いモコモコの炭酸泡が雪だるまのように膨れ上がってきます。微細なバブルがパチパチと弾けながら毛穴の奥のメイク残りや古い角質を浮き上がらせ、10分後にシートを外して軽く洗い流せば、小鼻のザラつきがツルツルに。お買い物マラソンの店舗数稼ぎにも最高のアイテムです。",
      pros: "1,000円ポッキリ・送料無料で試せる圧倒的な手軽さ。個包装のシートマスク型なので旅行やサウナのお供にも最適。",
      cons: "洗い流し不要の保湿シートマスクではなく、泡立った後にぬるま湯で洗い流す「ディープクレンジングマスク」なので入浴前や洗顔時に使うこと。",
      texture: "貼るとみるみるうちにモコモコ膨らむ発泡バブルシート",
      skinType: "炭酸パック初心者・毛穴の黒ずみを楽しくオフしたい人・プチプラ派",
      longevity: "毛穴ツルツル＆さっぱり感 ★★★★☆"
    },
    {
      badge: "1剤式個包装・マイルド発泡",
      point: "花印（HANAJIRUSHI）公式「スパークリングフェイスジェルパック 6包入」。1回使い切りの個包装パウチで、混ぜずに塗るだけの高保湿発泡ジェル。",
      review: "2剤式のように混ぜる手間がなく、かつボトルタイプのように最後の方でガスが抜ける心配もない「1剤式・個包装パウチ」の優等生。パウチを開けて透明なジェルを肌に広げると、体温に反応してきめ細かい白い炭酸泡へと変化します。ヒアルロン酸やコラーゲン、ハトムギエキスなど和漢植物の保湿成分が豊富に含まれているため、カーボキシーのような強い刺激がなく、乾燥性敏感肌でも心地よいシュワシュワ感でトーンアップが叶います。",
      pros: "1回ずつの個包装で常に100%新鮮な発泡力を保てる。刺激がマイルドで、パック後の肌の水分量が非常に高い。",
      cons: "1箱6包入りのため、週2回ペースで約3週間分（気に入ったらまとめ買いクーポンの活用がおすすめ）。",
      texture: "なめらかなジェルからクリーミーな微細泡へと変化するマイルド処方",
      skinType: "強い刺激が苦手な敏感肌・乾燥によるくすみ肌・衛生的な個包装が好きな人",
      longevity: "マイルド血行促進＆うるおい保持 ★★★★☆"
    },
    {
      badge: "炭酸美容の祖・頭皮から顔リフト",
      point: "炭酸パックの生みの親・日置博士が設立した「ドクターメディオン（Dr.Medion）ヘッドスパスカルプパック」。頭皮の酸欠とコリをほぐす炭酸クレイ。",
      review: "「顔の炭酸パックをしても、夕方にはまた顔がたるんでくすむ」という人は、顔と1枚の皮で繋がっている【頭皮の冷えと血行不良】が原因です。頭皮が1ミリたるむと、顔は3ミリたるむと言われています。炭酸美容のパイオニアであるドクターメディオンのこのスカルプパックは、高濃度炭酸泡と海泥クレイで頭皮の毛穴詰まりを洗浄しながら、硬く凍りついた帽状腱膜（頭頂部の筋膜）の血流を一気に解放。洗い流した瞬間、目元がパッと見開き、顔全体のトーンまで明るくなるのを実感できます。",
      pros: "顔と繋がる頭皮の血行を根本から改善し、顔のリフトアップと秋の抜け毛・頭皮臭予防が同時に叶う。",
      cons: "顔用ではなく「頭皮専用（ヘッドスパ用）」のため、週1〜2回のシャンプー前のスペシャルケアとして使用すること。",
      texture: "頭皮にピタッと密着して垂れない、爽快なシトラス香る炭酸クレイフォーム",
      skinType: "頭皮が硬い・眼精疲労がひどい・顔のたるみと秋の抜け毛を同時に防ぎたい人",
      longevity: "頭皮の軽さ＆目元パッチリ感 ★★★★★"
    },
    {
      badge: "7日間集中リフォーム・正規品",
      point: "国内正規品「プラミネ（Plamine）PS PACK 本品7回分セット」。肌のターンオーバーを短期間で強制起動させる「7日間連続プログラム」用。",
      review: "美容皮膚科や高級エステで推奨される「炭酸パックの7日間連続集中ケア（1週間毎日続けて一気に肌細胞を叩き起こすメソッド）」を自宅で実践するための本品セット。1日目はくすみが抜け、3日目で毛穴が小さくなり、7日目を終える頃には、秋枯れしていた肌がまるで20代の頃のようなパンッとした密度と均一な白さを取り戻します。同窓会や結婚式、大切な写真撮影を控えている方のための「塗る美容医療」と呼ぶにふさわしい逸品です。",
      pros: "4,000円OFFクーポン等の大型還元対象になることが多く、サロン専売の最高峰2剤式パックを破格で7日間集中体験できる。",
      cons: "1回あたりの価値が高いため、塗る際は首筋やまぶたの上、唇の上まで余さずしっかり広げて使い切ること（目と唇の上にも塗れる安全処方です）。",
      texture: "まぶたや唇の上まで隙間なく密着する、最高純度の高濃度炭酸ゲル",
      skinType: "短期間で劇的に肌質を変えたい人・イベント前の集中ケア・本物志向の大人世代",
      longevity: "7日間での肌質リフォーム力 ★★★★★"
    }
  ];

  let cardsHtml = '';
  carbonItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, carbonArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <!-- 導入：季節の悩みとボーア効果の解説 -->
  <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 6px solid #0284c7; border-radius: 14px; padding: 28px; margin-bottom: 40px; box-shadow: 0 6px 20px rgba(2, 132, 199, 0.08);">
    <div style="display: inline-block; background: #0284c7; color: white; font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: 20px; margin-bottom: 10px;">2026秋・血流＆毛穴レスキュー完全版</div>
    <h2 style="color: #0369a1; font-size: 23px; margin: 0 0 14px 0; font-weight: 900; line-height: 1.4;">🍂 なぜ秋になると「美白美容液を塗っても顔が土色にくすみ、毛穴が縦に開く」のか？</h2>
    <p style="margin: 0 0 16px 0; color: #0c4a6e; font-size: 15.5px; line-height: 1.85;">
      「夏が終わって日焼けは落ち着いたはずなのに、10月後半から顔色がどんより暗い茶色・灰色に見える」「目の下の青クマが消えず、頬の毛穴が涙型に開いてファンデが落ちる」…実はこの秋のくすみは、メラニン（シミの元）ではなく<strong>【気温低下による毛細血管の収縮と、肌細胞の深刻な酸欠】</strong>が原因です。<br><br>
      外気温が15℃を下回ると、自律神経は体温を守るために顔の表面にある毛細血管をキュッと縮めます。すると血液の流れが滞り、ヘモグロビンが酸素を失って「黒っぽい静脈血」へと変化し、薄い皮膚から透けて顔全体が土色に見えるのです。この冷えによる酸欠状態を一瞬で解除する唯一無二の生理現象が、高濃度炭酸（二酸化炭素）を使った<strong>【ボーア効果（Bohr effect）による強制酸素チャージ】</strong>です。
    </p>
    <div style="background: white; border-radius: 10px; padding: 18px 20px; border: 1px solid #bae6fd;">
      <strong style="color: #0284c7; display: block; margin-bottom: 8px; font-size: 15px;">💡 生理学「ボーア効果」が秋の酸欠肌・開き毛穴を劇的に変える3ステップ:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14.5px; color: #0369a1; line-height: 1.8;">
        <li><strong>STEP 1（炭酸の経皮吸収）:</strong> 二酸化炭素（CO2）は非常に分子が小さく脂溶性・水溶性の両方を持つため、皮膚を通り抜けて真皮の毛細血管までダイレクトに到達します。</li>
        <li><strong>STEP 2（血管拡張＆酸素の大量放出）:</strong> 血管内にCO2が入ってくると、身体は「肌細胞が酸欠になっている！」と判断し、血管を普段の3〜5倍に拡張。赤血球から<strong>大量の酸素（O2）</strong>を肌細胞へ一気に切り離して供給します（＝ボーア効果）。</li>
        <li><strong>STEP 3（老廃物回収＆コラーゲン増生）:</strong> 血流の濁流によってむくみの水分や老廃物が回収され、酸素を得た線維芽細胞がコラーゲンを産生。パックを外した瞬間に「白く澄んでいるのに頬はほんのりピンク」という極上の水光肌が誕生します。</li>
      </ul>
    </div>
  </div>

  <!-- 3つのタイプ別・選び方マトリックス -->
  <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #0284c7; padding-bottom: 10px; margin: 48px 0 20px 0;">🫧 「2剤式・1剤式・泡フォーム」どれが正解？炭酸コスメ3大タイプ比較マトリックス</h2>
  <p>炭酸パック・洗顔は「炭酸ガスの発生方式」によって効果の強さと手軽さが大きく異なります。ライフスタイルと悩みの深さで選び分けましょう。</p>

  <div style="overflow-x: auto; margin: 24px 0 36px 0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 640px; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #0369a1; color: white; text-align: left;">
          <th style="padding: 12px 14px; width: 22%;">タイプ分類</th>
          <th style="padding: 12px 14px; width: 26%;">炭酸濃度と持続時間</th>
          <th style="padding: 12px 14px; width: 28%;">メリット・向いているシーン</th>
          <th style="padding: 12px 14px; width: 24%;">該当する代表アイテム</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 14px; font-weight: 800; color: #0284c7; background: #f0f9ff;">① 本格2剤式・シート反応式<br><span style="font-size: 11px; font-weight: normal;">(混ぜるゲル / 専用シート)</span></td>
          <td style="padding: 12px 14px;"><strong>超高濃度 (10,000〜70,000ppm)</strong><br>20分間強力に発泡が持続</td>
          <td style="padding: 12px 14px;">1回でエステ級の小顔・毛穴収縮・美白効果を出したい週末の集中ケア</td>
          <td style="padding: 12px 14px;"><a href="#rank-3" style="color: #0284c7; font-weight: bold;">3位・10位 プラミネ</a><br><a href="#rank-6" style="color: #0284c7; font-weight: bold;">6位 カーボキシー</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 14px; font-weight: 800; color: #0284c7; background: #f0f9ff;">② 1剤式・自然発泡ジェル<br><span style="font-size: 11px; font-weight: normal;">(塗るだけで泡立つタイプ)</span></td>
          <td style="padding: 12px 14px;"><strong>高濃度 (5,000〜10,000ppm)</strong><br>5〜10分間でマイルドに浸透</td>
          <td style="padding: 12px 14px;">カップで混ぜる手間や洗い物なしで、平日の夜にサッと水光ツヤを作りたい</td>
          <td style="padding: 12px 14px;"><a href="#rank-2" style="color: #0284c7; font-weight: bold;">2位 URU特許パック</a><br><a href="#rank-7" style="color: #0284c7; font-weight: bold;">7位 PURED</a> / <a href="#rank-8" style="color: #0284c7; font-weight: bold;">8位 花印</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 14px; font-weight: 800; color: #0284c7; background: #f0f9ff;">③ エアゾール炭酸泡洗顔・スパ<br><span style="font-size: 11px; font-weight: normal;">(缶から濃密泡が出るタイプ)</span></td>
          <td style="padding: 12px 14px;"><strong>高密度マイクロ泡 (3,000〜10,000ppm)</strong><br>1〜5分の洗顔＆ショートパック</td>
          <td style="padding: 12px 14px;">毎朝のむくみ顔リセット、小鼻の黒ずみ洗浄、頭皮の血行促進を日課にしたい</td>
          <td style="padding: 12px 14px;"><a href="#rank-1" style="color: #0284c7; font-weight: bold;">1位 アートクライム</a><br><a href="#rank-4" style="color: #0284c7; font-weight: bold;">4位 シピエレガン</a> / <a href="#rank-9" style="color: #0284c7; font-weight: bold;">9位 メディオン</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 全10商品 一覧比較表 -->
  <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #0284c7; padding-bottom: 10px; margin: 48px 0 20px 0;">📊 【2026秋最新】高濃度炭酸パック＆炭酸洗顔 厳選10選 スペック比較一覧表</h2>
  <div style="overflow-x: auto; margin: 20px 0 40px 0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 720px; background: #fff; border: 1px solid #e2e8f0;">
      <thead>
        <tr style="background: #f1f5f9; color: #0f172a; border-bottom: 2px solid #cbd5e1;">
          <th style="padding: 10px; text-align: center;">順位</th>
          <th style="padding: 10px; text-align: left;">商品名</th>
          <th style="padding: 10px; text-align: center;">形式</th>
          <th style="padding: 10px; text-align: center;">放置時間</th>
          <th style="padding: 10px; text-align: left;">プラスαの美容成分・機能</th>
          <th style="padding: 10px; text-align: right;">参考価格</th>
        </tr>
      </thead>
      <tbody>
        ${carbonItemsRaw.map((item, idx) => {
          const forms = ['ワンプッシュ泡', '1剤式ジェル', '本格2剤式ゲル', 'ワンプッシュ泡', 'ワンプッシュ泡', 'ゲル＋専用シート', '発泡シートマスク', '1剤式個包装', '頭皮用炭酸泡', '本格2剤式(7回)'];
          const times = ['1〜5分', '5〜10分', '20分(剥がす)', '3〜5分', '1〜3分', '20分', '10分', '5〜10分', '3〜5分', '20分(剥がす)'];
          const plus = ['薬用炭×沖縄海泥マリンシルト', '特許1剤技術×ヒアルロン酸', '固まって剥がせるサロン処方', '大人毛穴のハリ弾力サポート', '顔・肌・頭皮マルチ対応', '超高濃度70,000ppm×菊花エキス', '竹炭シート×マイクロバブル', '和漢植物エキス×高保湿', '海泥クレイ×頭皮コリほぐし', '7日間集中肌質リフォーム'];
          return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; text-align: center; font-weight: 800; color: #0284c7;">${idx + 1}位</td>
            <td style="padding: 10px; font-weight: 700;"><a href="#rank-${idx + 1}" style="color: #0f172a; text-decoration: underline;">${item.itemName.slice(0, 28)}...</a></td>
            <td style="padding: 10px; text-align: center;"><span style="background: #f0f9ff; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 11.5px;">${forms[idx]}</span></td>
            <td style="padding: 10px; text-align: center; font-weight: 600;">${times[idx]}</td>
            <td style="padding: 10px; color: #334155;">${plus[idx]}</td>
            <td style="padding: 10px; text-align: right; font-weight: 800; color: #c2410c;">${item.priceFormatted}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>

  <!-- ランキング詳細 -->
  <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #0284c7; padding-bottom: 10px; margin: 48px 0 20px 0;">👑 秋の土色くすみ・開き毛穴を一掃！高濃度炭酸パック＆洗顔ランキング10選</h2>
  <p>泡の密度、ボーア効果による血色感の立ち上がりスピード、洗い流した後の毛穴の引き締まり具合を徹底比較したベスト10です。</p>

  ${cardsHtml}

  <!-- プロの実践テクニック -->
  <div style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 14px; padding: 30px; margin: 48px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #0284c7; padding-bottom: 10px; font-weight: 800;">
      ✨ 美容皮膚科医も推奨！炭酸パックの効果を200%引き出す「連続集中メソッド＆NG習慣」
    </h3>
    <p style="font-size: 15px; color: #334155;">炭酸パックは「なんとなく週1回やる」よりも、最初の使い方を工夫するだけで肌質の変わり方が劇的に違ってきます。</p>
    <ol style="padding-left: 22px; line-height: 2.05; color: #1e293b; font-size: 15px;">
      <li><strong>使い始めの「最初の3日間〜7日間」だけ毎日連続でパックする（集中ブースト）:</strong><br>秋の冷えで完全に眠ってしまった毛細血管と線維芽細胞を叩き起こすには、最初に3日〜1週間だけ連続で使用して肌の基礎代謝をトップギアに入れるのが最も効率的です。一度肌が立ち上がったら、その後は週1〜2回のキープケアで十分持続します。</li>
      <li><strong>お風呂の「湯船の中で2剤式パック」をするのは実はNG（汗で浮いてしまう）:</strong><br>湯船に浸かって汗をかいている状態で高濃度炭酸パックを塗ると、汗の水分でジェルが浮き上がり、炭酸ガスが皮膚に入らず外へ逃げてしまいます。お風呂上がりの「清潔で乾いた肌（スキンケアの一番最初）」にリビングで塗るのが最も深く浸透します（※1位アートクライム等の炭酸泡洗顔は浴室で水気を拭いてから使えばOK）。</li>
      <li><strong>「耳の下（耳下腺）〜あご裏」まで泡やジェルを広げる:</strong><br>顔のくすみやむくみを取るカギは、顔と首の境目にある太い血管とリンパ節です。頬だけでなく、あごの下や耳の下まで炭酸パックを塗ることで、小顔リフトアップ効果が倍増します。</li>
      <li><strong>パック直後の「赤み（フラッシング）」が引かないうちに高濃度美容液を入れる:</strong><br>パックを外した直後、塗った場所がくっきりとピンク色に紅潮しているのは毛細血管が全開になっている証拠です。この10分間にナイアシンアミドやビタミンC、ヒト幹細胞クリームを塗ると、普段の何倍ものスピードで真皮方向へデリバリーされます。</li>
    </ol>
  </div>

  <!-- よくある質問 Q&A -->
  <div style="margin: 48px 0;">
    <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
      <span>💬</span> 炭酸パック・炭酸洗顔に関するよくある質問（Q&A）
    </h3>
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff;">
      <div style="padding: 18px 22px; border-bottom: 1px solid #e2e8f0;">
        <strong style="color: #0369a1; font-size: 15.5px; display: block; margin-bottom: 6px;">Q1. パックを塗ると肌が熱くなって赤くなりますが、肌荒れ（かぶれ）ではないですか？</strong>
        <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;"><strong>A. かゆみやブツブツを伴わない一時的な赤みは、炭酸ガスによる「ボーア効果（血管拡張）」の正常なサインです。</strong><br>特に普段から冷え性で血行が悪い人ほど、急に血流が巡り始めることでポカポカとした熱感と赤み（フラッシング現象）が強く出ます。洗い流してから10〜30分ほどで赤みがスッと引き、その後には驚くほど白く澄んだ透明肌が現れますのでご安心ください。</p>
      </div>
      <div style="padding: 18px 22px; border-bottom: 1px solid #e2e8f0;">
        <strong style="color: #0369a1; font-size: 15.5px; display: block; margin-bottom: 6px;">Q2. 朝と夜、どちらに炭酸ケアをするのが一番効果的ですか？</strong>
        <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;"><strong>A. 「むくみ解消・化粧ノリUP」なら朝の炭酸泡洗顔、「毛穴収縮・本格エイジング修復」なら夜の2剤式パックがベストです。</strong><br>朝は1〜3分で終わるワンプッシュ泡（1位アートクライムや5位マルチフォーム）を使うと、寝起きのむくみとくすみが一掃されて日中のファンデ崩れがなくなります。夜は20分じっくり置くゲルパック（3位プラミネや6位カーボキシー）で一日の肌疲れを根本修復するのが理想の使い分けです。</p>
      </div>
      <div style="padding: 18px 22px;">
        <strong style="color: #0369a1; font-size: 15.5px; display: block; margin-bottom: 6px;">Q3. ニキビや肌荒れがある時に炭酸パックを使っても大丈夫ですか？</strong>
        <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;"><strong>A. 炭酸には「抗炎症作用」と「アクネ菌が嫌う酸素を供給する働き」があるため、むしろ大人ニキビの予防・鎮静に非常に有効です。</strong><br>ただし、潰れた直後の傷口がある場合は高濃度タイプ（カーボキシー等）は強く染みるため、傷口を避けて塗るか、マイルドな泡タイプ・1剤式からスタートしてください。</p>
      </div>
    </div>
  </div>

  <!-- 内部リンクボックス -->
  <div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 14px; padding: 24px; margin: 36px 0;">
    <h4 style="margin: 0 0 12px 0; color: #92400e; font-size: 16.5px; font-weight: 800;">🍁 あわせて読みたい！炭酸ケアの後に重ねたい秋の集中美肌特集</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14.5px; line-height: 2; color: #78350f;">
      <li><a href="/blog/autumn-dense-night-repair-cream-dry-lines-10" style="color: #b45309; font-weight: bold;">濃厚ナイトリペアクリーム10選【炭酸パックで血管が開いた肌にエクソソーム＆幹細胞を密封】</a></li>
      <li><a href="/blog/autumn-mild-peeling-serum-smooth-pores-10" style="color: #b45309; font-weight: bold;">角質柔軟ピーリング美容液10選【古い角質と毛穴の黒ずみをWで一掃する最強コンビ】</a></li>
      <li><a href="/blog/autumn-clay-cream-shampoo-dry-scalp-10" style="color: #b45309; font-weight: bold;">高保湿クレイ＆クリームシャンプー10選【頭皮のコリと乾燥フケを癒す自宅ヘッドスパ】</a></li>
      <li><a href="/blog/autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】2026秋コスメ81大特集・810選コンプリートハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
