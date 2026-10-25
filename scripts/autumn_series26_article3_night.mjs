// scripts/autumn_series26_article3_night.mjs
import { nightItemsRaw, nightArticles, renderProductCard } from './insert_autumn_series26_helper.mjs';

export function getNightArticleContent() {
  const reviews = [
    {
      badge: "細胞エネルギー充填・総合1位",
      point: "藤井明子氏プロデュース「FATUITE（ファチュイテ）ブライテスト エナジャイジングナイトクリームa」。ミトコンドリアのATP産生（肌エネルギー）に着目した名作。",
      review: "「しっかり寝たはずなのに、秋の朝は肌がしぼんで老けて見える」という現象に終止符を打つクリーム。加齢や寒暖差ストレスで低下する「夜間の自己修復エネルギー」をブーストする独自複合成分を配合しています。特筆すべきはそのテクスチャーで、ジャーからすくう時はこっくり濃厚なバームのようなのに、肌に伸ばすとスッと軽やかに溶けて「ピンとした形状記憶ヴェール」に変化します。枕にペタペタ張り付く不快感がゼロでありながら、翌朝洗顔する瞬間まで肌の表面がしっとり守られ、頬の高い位置にツヤ玉が宿ります。",
      pros: "重たい油膜感やベタつきが一切ないのに、朝まで水分を1ミリも逃さない圧倒的な密閉力。翌朝のハリと透明感の立ち上がりが早い。",
      cons: "人気が非常に高く、季節の変わり目はエマルジョンとの選択で迷う人が多い（秋冬の乾燥期は断然「クリームa」がおすすめ）。",
      texture: "濃厚さと無重力の軽やかさを両立したシルキーバーム",
      skinType: "秋枯れしぼみ肌・ベタつくクリームが苦手なインナードライ肌・30代〜50代",
      longevity: "翌朝のパンッとしたハリ復元力 ★★★★★"
    },
    {
      badge: "国産ヒト幹細胞×CICA鎮静",
      point: "純国産ヒト幹細胞培養液と高濃度CICA（ツボクサエキス）、さらにEGF・FGF・ヒト型セラミドを凝縮した「ひめゆり SC クリーム W10」。",
      review: "秋の花粉や急激な冷え込みで「肌が赤くゆらぎやすいけれど、攻めのエイジングケアも諦めたくない」という方の救世主。CICAとグリチルリチン酸が日中に受けた微弱炎症（赤み・ヒリつき）を寝ている間に鎮めつつ、国産ヒト幹細胞培養液とグロースファクターが真皮のコラーゲンネットワークを強力に立て直します。濃厚なクリームが傷んだ角質層の隙間をセメントのように埋め、わずか数日で手触りがふっくらと落ち着きます。",
      pros: "攻めの「ヒト幹細胞エイジングケア」と守りの「CICA鎮静・セラミド保湿」が1個で完結する。日本製で安心感が高くコスパも優秀。",
      cons: "しっとり感が非常に高いため、脂性肌の人はTゾーンを薄めに、目元・口元・頬を厚めに塗るゾーン塗り分けがベスト。",
      texture: "肌にピタッと密着して保護膜を作る、こっくり濃厚クリーム",
      skinType: "秋のゆらぎ敏感肌・赤みが出やすい乾燥肌・ハリ不足に悩む大人肌",
      longevity: "肌荒れ鎮静＆高密度バリア ★★★★★"
    },
    {
      badge: "エクソソーム×レチノール睡眠美容",
      point: "「塗る睡眠美容」を掲げる「ヨルリッチ（YORU RICH）アドバンスドクリーム 50g」。ヒト幹細胞エクソソーム×次世代レチノール×ナイアシンアミドの3大成分集結。",
      review: "今、美容医療業界で最も注目されている細胞間情報伝達物質「エクソソーム」に、ターンオーバーを促すレチノールとシワ改善のナイアシンアミドを掛け合わせた夜専用クリーム。紫外線に当たらない夜間だからこそ、レチノールの修復パワーをフル稼働させることができます。刺激を抑えた誘導体・カプセル処方のため、秋の乾燥肌でも皮むけ（A反応）を起こしにくく、眠っている間に目尻の乾燥小ジワやほうれい線の溝を内側からふっくらと押し上げます。",
      pros: "エクソソーム・レチノール・ナイアシンアミドという主役級成分を一度に塗れる圧倒的なタイパ＆コスパ。翌朝の毛穴の引き締まり感が抜群。",
      cons: "レチノール配合のため、念のため朝の使用は控え「夜のみ」の使用に徹すること（翌朝は日焼け止めを塗るのが鉄則）。",
      texture: "なめらかに伸びて角層へグングン吸い込まれるメルティクリーム",
      skinType: "目元・口元の乾燥小ジワ・たるみ毛穴・睡眠不足で肌が荒れやすい人",
      longevity: "一晩での小ジワふっくら感 ★★★★★"
    },
    {
      badge: "顔〜首デコルテ大容量エクソソーム",
      point: "楽天ランキング2位受賞！ヒト幹細胞＆エクソソームを贅沢に配合しながら、顔から首・全身まで惜しみなく使える高保湿ナイトクリーム。",
      review: "高級なナイトクリームはどうしてもちびちび使ってしまいがちですが、冬の入り口の乾燥を防ぐには「規定量よりやや多めをたっぷり塗ること」が何より重要です。このクリームは惜しみなく使える容量と価格を実現しており、顔のついでに年齢が出やすい「首の横ジワ」や「耳の後ろから鎖骨までのデコルテライン」「手の甲」まで一気にお手入れできます。翌朝の首元のなめらかさとツヤに驚くはずです。",
      pros: "コスパが極めて高く、顔だけでなく首・デコルテ・手の甲のナイトパックとして毎日贅沢に塗り込める。",
      cons: "ジャー容器からたっぷり取る際、清潔を保つため指ではなく手持ちのスパチュラ（または綿棒）を使うのがおすすめ。",
      texture: "スルスルと広範囲に伸び広がる、みずみずしいリッチクリーム",
      skinType: "顔から首・デコルテまで全身の乾燥を一気に防ぎたい人・コスパ重視派",
      longevity: "全身もっちり保湿キープ ★★★★★"
    },
    {
      badge: "時計遺伝子・肌リズム修復",
      point: "DHC直販「エンリッチ ナイトクリーム リペア＆リフト」。夜間特有の肌時計（サーカディアンリズム）に着目した時計遺伝子アプローチ。",
      review: "残業やスマホの夜更かしで睡眠時間が短くなると、夜間に分泌されるはずの「美肌修復ホルモン（成長ホルモン・メラトニン）」が減少し、秋の肌は一気に枯れてしまいます。DHCのこの名品は、睡眠中の肌リズムをサポートする植物エキスと、肌の上でネット状に密着する「3Dリフトポリマー」を配合。物理的にたるんだ頬をグッと持ち上げてホールドしながら眠りにつけるため、寝不足の翌朝でも「8時間ぐっすり眠ったようなピンとしたハリ肌」を偽装できます。",
      pros: "不規則な生活・睡眠不足による肌荒れやたるみに強い。リフトポリマーによる物理的なピーンとしたハリ感が心地よい。",
      cons: "フローラルムスク系の華やかな香りがあるため、完全無香料が好みの人は事前にチェックを。",
      texture: "濃厚なコクがあり、なじませるとピタッと肌を持ち上げるホールド質感",
      skinType: "睡眠不足・夜更かしが多い働く女性・フェイスラインの緩みが気になる人",
      longevity: "寝不足レスキュー＆リフト感 ★★★★★"
    },
    {
      badge: "高級キャビアエキス・贅沢栄養",
      point: "ヴィアンヌ「The Caviar Cream（ザ キャビアクリーム）」。チョウザメの卵（キャビア）から抽出した高濃度アミノ酸・オメガ3脂肪酸・ミネラルを凝縮。",
      review: "ヨーロッパの高級スパで「細胞の栄養爆弾」として重宝されるキャビアエキスを主役にしたラグジュアリークリーム。キャビアの脂質構造は人間の細胞膜と非常に近いため、秋の冷えで硬化した肌へ驚くほどスムーズに浸透します。アミノ酸とビタミン類が枯渇した真皮・表皮に濃密な栄養を補給し、カサついてツヤを失った大人の肌を、内側から発光するようなベルベットスキンへと引き上げます。",
      pros: "栄養価が極めて高く、何を使っても乾燥が止まらない超乾燥肌や更年期世代のしぼみ肌に劇的なうるおいを与える。",
      cons: "油分と栄養がリッチなため、ニキビができやすい10代〜20代前半の脂性肌にはやや重すぎることがある（大人世代向けの逸品）。",
      texture: "ベルベットのように重厚で、体温でじっくりとろけるラグジュアリーバーム",
      skinType: "極度の乾燥肌・ツヤと弾力が激減した40代〜60代・週末のスペシャルケア",
      longevity: "圧倒的な栄養密閉＆ツヤ ★★★★★"
    },
    {
      badge: "サロン専売・乳酸ナイトリペア",
      point: "芸能人やモデルがこぞって通うエステ採用ブランド「クリスティーナ（CHRISTINA）LINE REPAIR ラクティック ナイトリペア 60mL」。",
      review: "イスラエル発の世界的ドクターズサロンコスメ。最大の特徴は、夜の保湿クリームの中に「マイルドな乳酸（AHA）」と「酸素供給サポート成分」が組み込まれている点です。ただフタをするだけでなく、眠っている8時間の間に古い角質を穏やかにほぐしてターンオーバーを促し、新しい細胞へと生まれ変わらせる「攻めのナイトリペア」を行ってくれます。翌朝ぬるま湯で顔を洗った瞬間の、シルクのように滑らかな手触りはクリスティーナならではの快感です。",
      pros: "保湿と角質ターンオーバー促進が寝ている間に同時に完了する。60mLと一般的なクリームより大容量で長持ちする。",
      cons: "サロン専売のハイエンド処方のため価格は高めだが、エステに1回行く以上の肌質変化を自宅で毎日体感できる。",
      texture: "サロン品質ならではの、重さを感じさせない高浸透ホイップクリーム",
      skinType: "くすみ・ゴワつき・乾燥が同時に気になる肌・サロン専売コスメ愛好家",
      longevity: "翌朝のシルク肌実感度 ★★★★★"
    },
    {
      badge: "クリスティーナ・極上サテン肌",
      point: "クリスティーナ公式「サテンスムース ナイトクリーム 50ml」。ペプチドと高保湿植物オイルがキメの乱れを修復し、サテン生地のような均一肌へ。",
      review: "前述のラクティックナイトリペアが「角質更新」なら、こちらのサテンスムースは「深いシワ・キメのひび割れ・バリア修復」に特化した濃厚モデル。秋の乾燥でキメが流れてしまい、ファンデーションを塗っても毛穴や小ジワが目立つ肌に、ペプチド複合体が働きかけてふっくらとした均一な網目を再構築します。寝返りによる枕との摩擦ダメージを完全に防ぐなめらかなシルキー膜も秀逸です。",
      pros: "刺激が全くなく、敏感に傾いた秋の夜でも安心して使える。翌朝のファンデーションの密着度が劇的に跳ね上がる。",
      cons: "人気サロン商品のため、模倣品を避けるためにも必ず公式認定ショップから購入すること。",
      texture: "サテンの布をまとったかのように滑らかで上品な密着クリーム",
      skinType: "キメが乱れてメイクが乗らない乾燥肌・摩擦による赤みが出やすい肌",
      longevity: "キメ修復＆摩擦ガード ★★★★★"
    },
    {
      badge: "合成界面活性剤ゼロ・純オーガニック",
      point: "肌本来の自活力を取り戻す「アミュセンス エモリエントクリーム 30g」。合成界面活性剤・合成防腐剤・シリコンを完全排除した純天然処方。",
      review: "「季節の変わり目になると、どんな高機能クリームを塗ってもムズムズかゆくなったり赤くなったりする」という超敏感肌・インナードライ肌のための駆け込み寺。石油系の合成界面活性剤を使わず、スクワランやホホバ種子油、シア脂などの天然オイルと植物エキスだけで乳化を実現しています。肌のバリア膜を一切壊さず、自分が本来持っている「皮脂膜」と全く同じ役割を果たしてくれるため、荒れ果てた秋の肌が深く安らぎます。",
      pros: "徹底した無添加・ノンケミカル処方で、肌荒れ時や花粉皮膚炎の時期でもピリピリせずにしっかり保湿できる。",
      cons: "天然成分のみで作られているため、開封後は半年以内を目安に新鮮なうちに使い切ること。",
      texture: "体温でじんわり溶けて素肌と一体化するナチュラルバーム",
      skinType: "超敏感肌・オーガニック志向・ケミカル成分で肌荒れしやすい人",
      longevity: "やさしい天然皮脂膜バリア ★★★★☆"
    },
    {
      badge: "3種プラセンタ×8種植物オイル",
      point: "「エテルノ ナイトクリームプレミアム 40g」。国産発酵プラセンタを含む3種のプラセンタエキスと、アルガン・ホホバなど8種の美容オイルを融合。「乾燥小ジワを目立たなくする」効能評価試験済み。",
      review: "秋から冬にかけて「化粧水→美容液→美容オイル→クリーム」と何ステップも重ねるのが面倒な夜でも、これ1個で「濃厚プラセンタ美容液＋8種の植物オイル＋密閉クリーム」の3役をこなしてくれるプレミアム処方。さらに公的機関による「乾燥による小ジワを目立たなくする効能評価試験」をクリアしているため、目尻や口元のちりめんジワに対する実力は折り紙付きです。オイルリッチな処方が秋の冷えで硬くなった肌を芯から柔らかくほぐします。",
      pros: "「乾燥小ジワ効能評価試験済み」の確かなエビデンス。8種のオイル配合で、別に美容オイルを買う必要がない。",
      cons: "オイルリッチでツヤと油分がしっかり残るため、朝メイク前に使う場合はティッシュオフしてから下地を塗るのがコツ（基本は夜専用がベスト）。",
      texture: "美容オイルが溶け出したような、リッチで艶やかなエモリエントクリーム",
      skinType: "目元・口元の乾燥小ジワが深刻な人・プラセンタ＆オイル美容が好きな人",
      longevity: "乾燥小ジワ密封＆オイル保湿 ★★★★★"
    }
  ];

  let cardsHtml = '';
  nightItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, nightArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <!-- 導入：季節の悩みとメカニズム -->
  <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-left: 6px solid #7c3aed; border-radius: 14px; padding: 28px; margin-bottom: 40px; box-shadow: 0 6px 20px rgba(124, 58, 237, 0.08);">
    <div style="display: inline-block; background: #7c3aed; color: white; font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: 20px; margin-bottom: 10px;">2026秋・睡眠中オーバーナイト修復ガイド</div>
    <h2 style="color: #5b21b6; font-size: 23px; margin: 0 0 14px 0; font-weight: 900; line-height: 1.4;">🍂 なぜ秋の夜は「乳液だけで寝ると、深夜2時に水分が蒸発して朝カピカピになる」のか？</h2>
    <p style="margin: 0 0 16px 0; color: #4c1d95; font-size: 15.5px; line-height: 1.85;">
      「お風呂上がりにはしっかり潤っていたはずなのに、朝起きると頬や口元が突っ張ってカピカピに乾いている」「朝、鏡を見ると枕の跡がなかなか消えず、目元の小ジワが深くなっている」…その原因は、<strong>【深夜の皮膚温度上昇に伴う水分蒸散（TEWL）の急増と、秋の湿度急降下】</strong>にあります。<br><br>
      人間は深い眠りに入る際、深部体温を下げるために皮膚表面の血管を拡張させて熱を放出します。そのため、<strong>睡眠中の肌は日中よりも水分蒸発スピードが約1.5〜2倍に跳ね上がる</strong>のです。夏場の湿度70%の部屋なら乳液（水分が多く油分が20%程度）でも耐えられますが、湿度が40%以下に落ち込む秋の寝室では、乳液の薄い膜は深夜2時頃には完全に破綻。朝まで8時間水分を閉じ込め、同時に睡眠ホルモンと連動して細胞を修復する<strong>【夜専用・濃厚ナイトリペアクリーム】</strong>への切り替えが必須となります。
    </p>
    <div style="background: white; border-radius: 10px; padding: 18px 20px; border: 1px solid #ddd6fe;">
      <strong style="color: #6d28d9; display: block; margin-bottom: 8px; font-size: 15px;">💡 乳液や朝用クリームとは決定的に違う「ナイトクリーム」3つの特権:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14.5px; color: #5b21b6; line-height: 1.8;">
        <li><strong>朝まで絶対に乾かさない「高融点バーム＆ラメラ液晶構造」:</strong> 体温で溶けて肌に密着し、寝室の乾燥やエアコン風から8時間水分を完全ロックします。</li>
        <li><strong>紫外線を浴びない夜だからこそ使える「攻めの高濃度修復成分」:</strong> レチノール・エクソソーム・ヒト幹細胞・高濃度プラセンタなど、日中は分解されやすい成分をフル投入できます。</li>
        <li><strong>寝返りによる「枕・布団との物理的摩擦」から角層を保護:</strong> 睡眠中に人は20回以上寝返りを打ちます。厚みのあるクッション膜が摩擦による肝斑・くすみ・小ジワを防ぎます。</li>
      </ul>
    </div>
  </div>

  <!-- 成分・目的別マトリックス -->
  <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #7c3aed; padding-bottom: 10px; margin: 48px 0 20px 0;">🔬 あなたの秋の肌悩みはどれ？「4大ナイトリペア処方」選び方マトリックス</h2>
  <p>ナイトクリームは「どんな夜間の肌トラブルを優先して直したいか」によって選ぶべき主成分が変わります。</p>

  <div style="overflow-x: auto; margin: 24px 0 36px 0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 640px; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #5b21b6; color: white; text-align: left;">
          <th style="padding: 12px 14px; width: 22%;">処方タイプ</th>
          <th style="padding: 12px 14px; width: 28%;">睡眠中の働き・メカニズム</th>
          <th style="padding: 12px 14px; width: 26%;">最も適している肌悩み</th>
          <th style="padding: 12px 14px; width: 24%;">該当する代表アイテム</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 14px; font-weight: 800; color: #6d28d9; background: #f5f3ff;">① エクソソーム×レチノール×幹細胞系</td>
          <td style="padding: 12px 14px;">細胞間の情報伝達を活性化し、真皮のコラーゲン・ヒアルロン酸産生を強力にブーストする。</td>
          <td style="padding: 12px 14px;">目尻・口元の深いシワ、頬のたるみ毛穴、本格的な若返りケア</td>
          <td style="padding: 12px 14px;"><a href="#rank-2" style="color: #7c3aed; font-weight: bold;">2位 ひめゆりSC</a><br><a href="#rank-3" style="color: #7c3aed; font-weight: bold;">3位 ヨルリッチ</a><br><a href="#rank-4" style="color: #7c3aed; font-weight: bold;">4位 大容量エクソソーム</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 14px; font-weight: 800; color: #6d28d9; background: #f5f3ff;">② 肌時計（サーカディアン）×エネルギー系</td>
          <td style="padding: 12px 14px;">睡眠不足や寒暖差で乱れた夜間の自己修復リズムを整え、翌朝のツヤと弾力を急速チャージ。</td>
          <td style="padding: 12px 14px;">寝不足で顔がしぼむ、朝起きると肌がくすんで疲れて見える</td>
          <td style="padding: 12px 14px;"><a href="#rank-1" style="color: #7c3aed; font-weight: bold;">1位 FATUITE</a><br><a href="#rank-5" style="color: #7c3aed; font-weight: bold;">5位 DHCエンリッチ</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 14px; font-weight: 800; color: #6d28d9; background: #f5f3ff;">③ サロン専売・角質＆サテン修復系</td>
          <td style="padding: 12px 14px;">乳酸やペプチドが寝ている間に乱れたキメと古い角質を修復し、サロン帰りの滑らかさを作る。</td>
          <td style="padding: 12px 14px;">肌表面のゴワつき、朝の化粧ノリの悪さ、キメの乱れ</td>
          <td style="padding: 12px 14px;"><a href="#rank-7" style="color: #7c3aed; font-weight: bold;">7位・8位 クリスティーナ</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 14px; font-weight: 800; color: #6d28d9; background: #f5f3ff;">④ 濃厚オイル・プラセンタ・純天然バーム系</td>
          <td style="padding: 12px 14px;">キャビアやプラセンタ、8種の植物オイルが枯渇した皮脂膜を補い、乾燥小ジワを物理的に密封。</td>
          <td style="padding: 12px 14px;">粉が吹くほどの超乾燥肌、ちりめんジワ、敏感肌のバリア保護</td>
          <td style="padding: 12px 14px;"><a href="#rank-6" style="color: #7c3aed; font-weight: bold;">6位 キャビア</a> / <a href="#rank-9" style="color: #7c3aed; font-weight: bold;">9位 アミュセンス</a><br><a href="#rank-10" style="color: #7c3aed; font-weight: bold;">10位 エテルノ</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 全10商品 一覧比較表 -->
  <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #7c3aed; padding-bottom: 10px; margin: 48px 0 20px 0;">📊 【2026秋最新】濃厚ナイトリペアクリーム 厳選10選 スペック比較一覧表</h2>
  <div style="overflow-x: auto; margin: 20px 0 40px 0;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 720px; background: #fff; border: 1px solid #e2e8f0;">
      <thead>
        <tr style="background: #f1f5f9; color: #0f172a; border-bottom: 2px solid #cbd5e1;">
          <th style="padding: 10px; text-align: center;">順位</th>
          <th style="padding: 10px; text-align: left;">商品名</th>
          <th style="padding: 10px; text-align: center;">保湿重厚感</th>
          <th style="padding: 10px; text-align: left;">主役級キー成分</th>
          <th style="padding: 10px; text-align: center;">ベタつきにくさ</th>
          <th style="padding: 10px; text-align: right;">参考価格</th>
        </tr>
      </thead>
      <tbody>
        ${nightItemsRaw.map((item, idx) => {
          const weights = ['濃密シルキー', '高密着リッチ', 'メルティ高浸透', 'みずみずしい', '濃厚ホールド', '極上重厚バーム', 'なめらかホイップ', 'サテン密着', '天然オイルバーム', 'オイルリッチ'];
          const ings = ['ATPエネルギー複合体', '国産ヒト幹細胞・CICA・セラミド', 'エクソソーム・レチノール', 'ヒト幹細胞・エクソソーム', '時計遺伝子サポート・3Dポリマー', '高濃度キャビアエキス・オメガ3', '乳酸(AHA)・酸素サポート成分', 'ペプチド複合体・植物オイル', 'スクワラン・シア脂(無添加)', '3種プラセンタ・8種植物オイル'];
          const nonStick = ['★★★★★', '★★★★☆', '★★★★★', '★★★★★', '★★★★☆', '★★★★☆', '★★★★★', '★★★★★', '★★★★☆', '★★★★☆'];
          return `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; text-align: center; font-weight: 800; color: #7c3aed;">${idx + 1}位</td>
            <td style="padding: 10px; font-weight: 700;"><a href="#rank-${idx + 1}" style="color: #0f172a; text-decoration: underline;">${item.itemName.slice(0, 28)}...</a></td>
            <td style="padding: 10px; text-align: center;"><span style="background: #f5f3ff; color: #6d28d9; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 11.5px;">${weights[idx]}</span></td>
            <td style="padding: 10px; color: #334155;">${ings[idx]}</td>
            <td style="padding: 10px; text-align: center; color: #059669; font-weight: bold;">${nonStick[idx]}</td>
            <td style="padding: 10px; text-align: right; font-weight: 800; color: #c2410c;">${item.priceFormatted}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>

  <!-- ランキング詳細 -->
  <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; border-bottom: 3px solid #7c3aed; padding-bottom: 10px; margin: 48px 0 20px 0;">👑 秋の就寝中過乾燥・朝のカピカピ肌を救う！濃厚ナイトリペアクリーム10選</h2>
  <p>塗って寝た翌朝の「洗顔時の手触り」「水分チェッカーでの保水率」「枕へのつきにくさ」を徹底検証したベスト10です。</p>

  ${cardsHtml}

  <!-- プロの実践テクニック -->
  <div style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 14px; padding: 30px; margin: 48px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; font-weight: 800;">
      ✨ エステティシャン直伝！翌朝の顔がキュッと引き上がる「夜間密封リフト塗り」4ステップ
    </h3>
    <p style="font-size: 15px; color: #334155;">高価なナイトクリームも、冷たいまま顔の上でゴシゴシ塗り広げては効果が半減してしまいます。浸透とリフトアップを最大化する夜の儀式がこちらです。</p>
    <ol style="padding-left: 22px; line-height: 2.05; color: #1e293b; font-size: 15px;">
      <li><strong>化粧水や美容液が「完全に肌に馴染んでから（1分待ってから）」クリームを塗る:</strong><br>肌の表面がまだ化粧水でビシャビシャに濡れている状態でクリームを乗せると、油分と水分が混ざって上滑りし、密着膜が作れません。手のひらが肌に吸い付く状態になってからクリームを投入します。</li>
      <li><strong>「両手のひらをすり合わせて36℃に温め」クリームを透明にしてからプレスする:</strong><br>大きめのパール2粒分を手に取り、両手のひらを合わせて5秒間温めます。バームや固めのクリームが体温でとろけてオイル状に変わったら、顔の中心から外側へスタンプのように密着させます。</li>
      <li><strong>片手でこめかみを引き上げながら「ほうれい線・目尻のシワを開いて」塗り込む:</strong><br>ただ表面を撫でるだけではシワの溝の底までクリームが届きません。反対の手でこめかみを軽く引き上げてシワをピンと伸ばし、その隙間に薬指でクリームを埋め込むようにトントンと馴染ませます。</li>
      <li><strong>寝る直前に「生え際・耳の下・鎖骨」をプッシュして夜間リンパを開通させる:</strong><br>手に残ったクリームで耳の下（耳下腺）から鎖骨に向かって3回撫で下ろしてから眠りにつくと、睡眠中の老廃物排出がスムーズになり、翌朝の顔のむくみが劇的にスッキリします。</li>
    </ol>
  </div>

  <!-- よくある質問 Q&A -->
  <div style="margin: 48px 0;">
    <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
      <span>💬</span> ナイトクリームに関するよくある質問（Q&A）
    </h3>
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff;">
      <div style="padding: 18px 22px; border-bottom: 1px solid #e2e8f0;">
        <strong style="color: #6d28d9; font-size: 15.5px; display: block; margin-bottom: 6px;">Q1. 乳液とナイトクリーム、両方塗る必要がありますか？それともどちらか1つでいいですか？</strong>
        <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;"><strong>A. 基本は「化粧水 → 美容液 → ナイトクリーム」でOKですが、極度の乾燥肌は「乳液＋ナイトクリーム」のW使いが最強です。</strong><br>乳液は「角質層を柔らかくして水分と油分のバランスを整える役割」、ナイトクリームは「表面を強固なヴェールで密閉して蒸発を防ぐ役割」があります。20代〜30代の混合肌なら乳液を省いてナイトクリームだけでも十分ですが、40代以上の乾燥肌や粉吹き肌の方は、乳液で肌をふっくらさせてから最後にナイトクリームでフタをすると翌朝の弾力が見違えます。</p>
      </div>
      <div style="padding: 18px 22px; border-bottom: 1px solid #e2e8f0;">
        <strong style="color: #6d28d9; font-size: 15.5px; display: block; margin-bottom: 6px;">Q2. ナイトクリームを塗って寝ると、朝起きたときにTゾーンが少し油っぽく感じます。どう洗顔すべき？</strong>
        <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;"><strong>A. 朝はぬるま湯だけ（水洗顔）ではなく、優しい洗顔料や炭酸泡洗顔で「夜の酸化油分」をオフしてください。</strong><br>夜塗ったクリームの油分や寝ている間に分泌された皮脂は、朝には空気に触れて酸化しています。ぬるま湯だけでは落ちずメイク崩れやくすみの原因になるため、Tゾーンを中心にマイルドな洗顔料でサッと洗い流すのが美肌の鉄則です。</p>
      </div>
      <div style="padding: 18px 22px;">
        <strong style="color: #6d28d9; font-size: 15.5px; display: block; margin-bottom: 6px;">Q3. 夜用クリームを朝のメイク前に塗っても大丈夫ですか？</strong>
        <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;"><strong>A. レチノール高配合のもの（3位ヨルリッチ等）以外は朝も使えますが、量は夜の「半分〜3分の1」に減らしましょう。</strong><br>ナイトクリームは油分や密着ポリマーが多く含まれているため、朝たっぷり塗るとファンデーションがヨレやすくなります。朝使う場合は米粒〜小豆1粒分を手のひらで薄く伸ばしてハンドプレスし、ティッシュで軽く押さえてからUV下地を塗ると一日中乾燥知らずで過ごせます。</p>
      </div>
    </div>
  </div>

  <!-- 内部リンクボックス -->
  <div style="background: #fffbeb; border: 2px solid #fde68a; border-radius: 14px; padding: 24px; margin: 36px 0;">
    <h4 style="margin: 0 0 12px 0; color: #92400e; font-size: 16.5px; font-weight: 800;">🍁 あわせて読みたい！秋の夜長オーバーナイト集中美容特集</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14.5px; line-height: 2; color: #78350f;">
      <li><a href="/blog/autumn-mild-peeling-serum-smooth-pores-10" style="color: #b45309; font-weight: bold;">角質柔軟ピーリング美容液10選【ナイトクリームの浸透を3倍に引き上げる前処置】</a></li>
      <li><a href="/blog/autumn-neck-decollete-firming-cream-10" style="color: #b45309; font-weight: bold;">薬用ネック＆デコルテクリーム10選【顔のナイトケアと同時に首の横ジワを徹底アイロン】</a></li>
      <li><a href="/blog/autumn-eyelash-nourishing-serum-damage-repair-10" style="color: #b45309; font-weight: bold;">高濃度補修まつ毛美容液10選【眠っている間に秋の抜け毛・まつ毛ダメージを集中育成】</a></li>
      <li><a href="/blog/autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】2026秋コスメ81大特集・810選コンプリートハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
