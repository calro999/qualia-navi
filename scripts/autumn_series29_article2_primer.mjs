// scripts/autumn_series29_article2_primer.mjs
import { primerItemsRaw, primerArticles, renderProductCard } from './insert_autumn_series29_helper.mjs';

export function getPrimerArticleContent() {
  const reviews = [
    {
      badge: "🥇 総合1位・楽天2800件レビューの殿堂入りCC",
      point: "10%OFF！ピコモンテ（PICOMONTE）プレミアムCCクリーム 50ml SPF35 PA+++。ガラクトミセス培養液配合で塗るたび水光素肌美。",
      review: "累計レビュー数2,800件超、楽天市場で驚異のリピート率を誇る多機能美容液CCクリーム。高級スキンケアの主役成分「ガラクトミセス培養液」を贅沢に配合し、化粧下地・日焼け止め・美容液・カラーコントロール・毛穴カバーの5役を1本で完璧にこなします。肌に乗せるとカプセルが弾けて自分の肌色へと自然に変化し、秋の乾燥でくすんだ顔色を瞬時にパッと明るい水光肌へトーンアップ。ファンデーションを重ねなくてもこれ1本で美肌が完成するノーファンデ派の救世主です。",
      texture: "みずみずしく肌に吸い込まれる高保湿美容液クリーム",
      skinType: "くすみ・毛穴の開き・ノーファンデ派・乾燥肌・時短メイク",
      longevity: "一日中くすまない水光ツヤ ★★★★★",
      pros: [
        "ガラクトミセス配合で、メイクをしている間中スキンケアパックをしているかのような潤いが続く",
        "白浮きせず肌の色に合わせて自然になじむカラーチェンジ処方で、色選びの失敗がない",
        "大容量50mlで1,500円台という圧倒的なコストパフォーマンス"
      ],
      cons: [
        "濃いシミやニキビ跡を完全に隠すには、部分的にコンシーラーを足すのがおすすめ",
        "カバー力がしっかりあるため、最初はパール粒大から少量ずつ伸ばすのがコツ"
      ]
    },
    {
      badge: "👑 期間限定20%OFF・ダルバ最高峰ギフトセット",
      point: "20%OFFクーポン！ダルバ（d'Alba）ギフトセット 5種。ホワイトトリュフ配合の高級下地＆ミストでCA級のツヤ肌固定。",
      review: "韓国の客室乗務員（CA）が機内の砂漠のような過酷な乾燥に耐えるために愛用する『ダルバ』の超贅沢5種セット。イタリア産ホワイトトリュフと植物オイルが絶妙なバランスで溶け込んだ化粧下地は、秋風に吹かれても夕方までファンデがひび割れず、陶器のような滑らかなツヤを維持。セットのミストスプレーをメイクの仕上げに吹きかければ、マスクや衣服の摩擦にもビクともしない鉄壁の潤いヴェールが完成します。",
      texture: "肌のキメを埋めるように滑らかなシルキーエマルジョン",
      skinType: "CA級水光ツヤ・超乾燥肌・オフィス暖房対策・ギフトコフレ",
      longevity: "長時間の乾燥崩れ完全ブロック ★★★★★",
      pros: [
        "高級食材ホワイトトリュフの抗酸化力と保湿力で、夕方のくすみと乾燥シワを徹底防止",
        "ミストや日焼け止めまで揃った5種セットで、秋冬のベースメイクをトータルで格上げできる",
        "20%OFFセール対象で、デパコス以上の満足感を驚くほどお得に手に入れられる"
      ],
      cons: [
        "セット品のため単体購入より初期費用はかかる点（ただし1品あたりのコスパは抜群）",
        "ミストはオイル層と水分層の2層式のため、使う前にしっかり振る必要がある"
      ]
    },
    {
      badge: "💜 最大30%OFFクーポン・毛穴レス×透明感パープル",
      point: "最大30%OFF！ByUR（バイユア）セラムフィット トーンアップUV 下地 SPF50+ PA++++。毛穴管理発想で秋の黄ぐすみを一掃。",
      review: "毛穴管理（ポアマネジメント）のスペシャリストブランド『ByUR』のメガヒット下地。秋特有の「乾燥によるたるみ毛穴」と「気温低下による血行不良の黄ぐすみ」を、微細なパープルコントロールカラーと光散乱パウダーが瞬時に補正。美容液成分をたっぷり含んだテクスチャーが毛穴の凹凸にピタッと入り込み、夕方になってもファンデーションが毛穴に落ちて水玉模様になる悲劇を完璧に防ぎます。",
      texture: "ベタつかず毛穴をフラットに整えるスムースセラム",
      skinType: "開き毛穴・たるみ毛穴・黄ぐすみ・透明感アップ・UVカット重視",
      longevity: "毛穴落ち＆テカリ防止 ★★★★★",
      pros: [
        "絶妙なラベンダーパープル色で、秋のどんよりした黄ぐすみを消して透明感を宿す",
        "SPF50+ PA++++の最高値UVカットでありながら、紫外線吸収剤フリーでキシキシしない",
        "毛穴を引き締める美容成分配合で、日中も素肌のキメを整え続ける"
      ],
      cons: [
        "顔全体に塗りすぎると白浮きしやすいため、顔の中央（三角ゾーン）中心に伸ばすのが鉄則",
        "人気カラーのため楽天スーパーセールやお買い物マラソン時は早期完売に注意"
      ]
    },
    {
      badge: "✨ 3STEPビタケア・グルタチオン配合の塗れ肌下地",
      point: "ダルバ公式 3STEP ビタケアセット。グルタチオン×ビタミン配合でくすみを寄せ付けない多幸感トーンアップ。",
      review: "美白成分の王様「グルタチオン」と高濃度ビタミンをチャージできるダルバのスペシャルケアセット。紫外線ダメージを引きずった秋の肌に、内側から発光するような明るさと血色感を取り戻します。下地自体が美容液そのもののような潤い感で、乾燥で粉を吹きやすい口周りや目元のキワにも吸い付くように馴染み、上から重ねるファンデーションの密着度を3倍に高めます。",
      texture: "水分が溢れ出すようなフレッシュなビタエマルジョン",
      skinType: "紫外線シミ予備軍・くすみ・乾燥崩れ・ビタミン補給",
      longevity: "明るい素肌トーン持続 ★★★★★",
      pros: [
        "グルタチオンとビタミン配合で、メイクしながら日中の美白・抗酸化ケアができる",
        "肌にツヤの薄膜をピタッと張るため、ファンデーションの量が半分で済むようになる",
        "高級感のあるアロマの香りで朝のメイク時間の気分が劇的に高まる"
      ],
      cons: [
        "高機能ビタミン処方のため、肌が極度に荒れている時は少量から試すのが推奨",
        "3STEPセットのため、シンプルに下地1本だけ欲しい人にはステップが多く感じられる場合がある"
      ]
    },
    {
      badge: "☀️ 河北裕介プロデュース・UVプライマーリッチモイスト",
      point: "＆be公式 UVプライマーリッチモイスト SPF50+ PA++++。微細パールが叶える極上の生ツヤとノンケミカル石鹸オフ。",
      review: "ヘアメイクアップアーティスト・河北裕介氏がこだわり抜いて開発した、日本のベースメイク界の傑作。微細なゴールド＆ピンクパールが肌のアラを光で飛ばし、まるで上質なハイライトを仕込んだかのような立体的なツヤを生み出します。高保湿エモリエント成分が肌を包み込み、秋風にさらされてもカピカピに乾燥しないリッチモイスト処方。ノンケミカルで石鹸オフできる優しさも人気の理由です。",
      texture: "美容液クリームのようにとろけて伸びるパールエマルジョン",
      skinType: "乾燥小ジワ・くすみ・立体ツヤ肌・石けんオフ派・河北メイク好き",
      longevity: "生ツヤ＆立体感キープ ★★★★★",
      pros: [
        "1,650円という信じられないプチプラでありながら、デパコスの名品下地と互角の実力",
        "石けんやマイルドな洗顔料で落とせるため、クレンジングによる肌負担を軽減できる",
        "微細パールがくすみや凹凸を光でカムフラージュし、ひと塗りで女優肌へ"
      ],
      cons: [
        "全顔にたっぷり塗りすぎるとツヤが強すぎてテカリに見えることがあるため、適量を守ること",
        "大人気のため店頭や公式オンラインで一時的に品薄になることが多い"
      ]
    },
    {
      badge: "🌿 ガラクトミセス×水光肌・ピコモンテ10%OFFクーポン",
      point: "リピート率No.1のピコモンテ プレミアムCCクリーム。50ml大容量で毎朝のメイクを1分に短縮する万能下地。",
      review: "「朝の忙しい時間に日焼け止め、下地、ファンデを重ねるのが面倒」「重ね塗りすると厚塗り感が出て老けて見える」という大人世代に絶大な支持を受ける時短CCクリーム。指先でスルスルと伸ばすだけで、キメの乱れた肌に均一な薄膜を形成。秋の寒暖差で赤みが出やすい小鼻や頬の赤みも自然にカバーし、夕方までサラリとした快適な保湿感が続きます。",
      texture: "滑らかに伸びてベタつきを残さないスムースクリーム",
      skinType: "時短メイク・赤みカバー・高コスパ・毎日のデイリー使い",
      longevity: "自然なカバー力＆崩れ防止 ★★★★☆",
      pros: [
        "化粧水の後これ1本塗るだけでベースメイクが完成するため、朝のメイク時間を劇的に短縮できる",
        "50mlの大容量で数ヶ月間たっぷり使え、お財布に極めて優しい",
        "肌に優しい処方で、クレンジング後も肌が疲れていないのを実感できる"
      ],
      cons: [
        "マットな陶器肌に仕上げたい人にはツヤ感が少し強く感じられる",
        "チューブから勢いよく出ることがあるため、ゆっくり押し出すのがコツ"
      ]
    },
    {
      badge: "🔬 トラネキサム酸×ナイアシンアミド・薬用美白UV下地",
      point: "医薬部外品！アンジエンド ノーカラーメイクUV。トラネキサム酸配合で秋のシミ・肝斑をケアしながらノーファンデ美肌。",
      review: "シミ・肝斑の予防成分「トラネキサム酸」とシワ改善成分「ナイアシンアミド」をダブル配合した医薬部外品の薬用日中美容液下地。色がつかない「ノーカラー」処方のため、マスクや衣服の襟元にファンデの色がつくストレスが完全にゼロ。肌の凹凸を光の拡散効果で滑らかに見せ、一日中美容液パックをしているような心地よさで大人の乾燥肌を守り抜きます。",
      texture: "白浮きせずすっと馴染むシルキータッチエッセンス",
      skinType: "シミ・肝斑悩み・ノーファンデ・マスク色移り防止・敏感肌",
      longevity: "薬用美白＆保湿ヴェール ★★★★★",
      pros: [
        "トラネキサム酸配合で、メイクしながら秋の紫外線によるシミ・そばかすを本気で予防できる",
        "ノーカラー設計でマスクや洋服に色が一切つかず、首やデコルテまで広範囲に塗れる",
        "敏感肌パッチテスト済み・紫外線吸収剤フリーで肌への優しさを極限まで追求"
      ],
      cons: [
        "ノーカラータイプのため、濃いニキビ跡や赤みを色でガッツリカバーしたい人には物足りない",
        "しっかりカバーしたい日は上からパウダーやクッションファンデを重ねるのがおすすめ"
      ]
    },
    {
      badge: "💎 薬用リンクルセラムUV・シワ改善しながらSPF50+",
      point: "シワ改善×美白のW有効成分！薬用リンクルセラムUVホワイト SPF50+。メイクするたびに目尻や口元のシワをケア。",
      review: "「高いUVカット下地を塗ると夕方に目元やほうれい線がパサついてシワが深くなる」という悩みに終止符を打つ薬用リンクル下地。有効成分ナイアシンアミドが真皮層のコラーゲン産生を促進し、日中もシワを伸ばし続けます。乳液のようにみずみずしい伸びの良さで、カサついた秋の肌にも引っかかり感なくスルスル広がり、ファンデーションの密着度を最大化します。",
      texture: "しっとり溶け込む高保湿リンクルミルク",
      skinType: "ほうれい線・目元の小ジワ・シワ改善・高い紫外線カット",
      longevity: "シワ改善＆しっとり持続 ★★★★★",
      pros: [
        "メイク中ずっとシワ改善と美白の有効成分が働き続け、落とした後の肌がふっくらする",
        "SPF50+の高いUVカットでありながらキシキシ感や白浮きが一切ない",
        "乾燥によるファンデーションのひび割れやヨレを一日中ブロック"
      ],
      cons: [
        "医薬部外品の本格リンクル処方のため、一般的なプチプラ下地より価格は3,000円台とやや高め",
        "脂性肌の方が夏場に使うとややリッチに感じるため、秋〜冬の乾燥シーズンに最適"
      ]
    },
    {
      badge: "🌿 フコイダン配合・年齢肌のたるみ毛穴をリフトアップ",
      point: "海藻由来の保水成分フコイダン配合！ニューピュアフコイダン 美容液BBクリーム 20g。40代50代の乾燥たるみを救う名品。",
      review: "驚異の保水力と自己治癒力を持つ海藻エキス「高純度フコイダン」を贅沢に配合したエイジングケアBB下地。年齢とともに涙型に開いたたるみ毛穴や、乾燥でしぼんだ大人の肌にピンとしたハリを与え、下地段階で肌の凹凸をフラットに整えます。合成着色料やパラベンを使わない無添加設計で、季節の変わり目に肌がゆらぎやすい大人世代から熱烈な信頼を集めています。",
      texture: "肌をキュッと引き締める密着リフトクリーム",
      skinType: "たるみ毛穴・40代50代・年齢肌のしぼみ・無添加スキンケア派",
      longevity: "ハリ感＆毛穴カバー持続 ★★★★★",
      pros: [
        "フコイダンの優れた保水ヴェールが、乾燥した空気から肌の水分を一日中逃さない",
        "たるんだ毛穴を引き上げるようにフィットし、ファンデの毛穴落ちを根本から防ぐ",
        "無添加ノンケミカル処方で、秋の乾燥でデリケートになった肌をいたわりながらメイクできる"
      ],
      cons: [
        "内容量が20gとややコンパクトなサイズ感のため、毎朝全顔にたっぷり使うと減りが早い",
        "こっくりしたクリームのため、手のひらの体温で温めてから伸ばすのが綺麗に塗るコツ"
      ]
    },
    {
      badge: "🔥 64%OFFセール・1000円以下の奇跡のオールインワンBB",
      point: "64%OFFセールで980円！MILY BBクリーム 50g。美容液・下地・UV・コンシーラーがこれ1本で完結する衝撃コスパ。",
      review: "楽天市場のセールで毎回ランキングを席巻する大ヒットBBクリーム。通常価格から64%OFFの980円という驚きのプチプラでありながら、ビタミン誘導体やヒアルロン酸などの保湿美容成分をしっかり配合。ムラになりにくい滑らかな伸び心地で、忙しい朝でもパパッと手早く均一なツヤ肌を作れます。毎日の通勤・通学や近所への買い物など、デイリー使いにこれ以上ない神コスパ品です。",
      texture: "スルスル伸びて軽やかに密着するデイリーBB",
      skinType: "980円プチプラ・時短メイク・デイリー使い・学生・コスパ重視",
      longevity: "手軽なツヤ肌キープ ★★★★☆",
      pros: [
        "980円（送料無料）という破格の安さで、毎日惜しみなくたっぷり使える",
        "美容液からファンデまで1本で完了するため、忙しい朝の準備が2分で終わる",
        "薄付きで厚塗り感が出ないため、ナチュラルメイクやすっぴん風メイクに最適"
      ],
      cons: [
        "SPF24 PA++のため、真夏や長時間の炎天下レジャーには別で強力な日焼け止めが必要",
        "超ハイカバーではないため、濃いシミやクマはコンシーラーの重ね付けがおすすめ"
      ]
    }
  ];

  let cardsHtml = '';
  primerItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, primerArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <!-- 導入：なぜ秋になると「化粧下地を塗った瞬間に粉を吹き、夕方に毛穴落ちする」のか？皮膚科学のメカニズム -->
  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 6px solid #16a34a; border-radius: 12px; padding: 26px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(22, 163, 74, 0.08);">
    <h2 style="color: #15803d; font-size: 22px; margin: 0 0 14px 0; font-weight: 800;">🍂 なぜ秋は「下地を塗った瞬間にカサカサ粉を吹き、夕方になるとファンデが毛穴に落ちる」のか？</h2>
    <p style="margin: 0 0 14px 0; color: #166534; font-size: 15.5px;">
      「夏と同じ化粧下地を使っているのに、塗った瞬間から小鼻や口周りが粉を吹いて白く浮く」「お昼過ぎに鏡を見ると、ファンデーションが毛穴の中に落ち込んでポツポツ水玉状に崩れている」…こうした秋のベースメイクの悲劇は、<strong>【夏の皮脂吸着系下地の使い続けと、秋の急激なインナードライ】</strong>が引き起こしています。<br><br>
      夏用の化粧下地には、汗や皮脂を強力に吸い取る「シリカ」や「多孔質パウダー」が大量に配合されています。しかし、湿度が30%台へ急落する秋にこの皮脂吸着下地を使うと、<strong>肌に必要なわずかな水分と皮脂まで根こそぎ吸い取ってしまい、肌表面の角質が激しくめくれ上がって「粉ふき」を起こします</strong>。<br>
      さらに、カラカラに乾いた角質層が縮むことで毛穴の周りがしぼんで大きく開き、そこに過剰分泌された油分とファンデが流れ込んで「毛穴落ち」を招くのです。この秋の悪循環を断ち切る唯一の解決策が、粉体で油分を吸い取るのではなく、美容液成分で水分を抱え込みながらキメをフラットに整える<strong>【高保湿美容液化粧下地（プライマー）】</strong>への切り替えです。
    </p>
    <div style="background: white; border-radius: 8px; padding: 16px 20px; border: 1px solid #bbf7d0;">
      <strong style="color: #16a34a; display: block; margin-bottom: 8px; font-size: 16px;">💡 秋の肌に「高保湿美容液下地」を投入すべき3大皮膚科学的理由:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14.5px; color: #15803d; line-height: 1.8;">
        <li><strong>① 角層のめくれをピタッと鎮火する「エマルジョン保湿膜」：</strong> ナイアシンアミドや発酵エキスが肌のキメの隙間に入り込み、粉ふきを瞬時にフラット化。</li>
        <li><strong>② 毛穴の凹凸を光で飛ばす「ソフトフォーカス・ポアレス技術」：</strong> 固いパウダーで毛穴を埋めるのではなく、微細なパールと光拡散膜で毛穴影を消失させる。</li>
        <li><strong>③ 夕方の酸化くすみを防ぐ「トーンアップ＆抗酸化成分」：</strong> ホワイトトリュフやビタミンC誘導体が、皮脂の酸化による黄ぐすみや黒ずみを一日中ブロック。</li>
      </ul>
    </div>
  </div>

  <!-- 失敗しない選び方：3大処方マトリックス比較表 -->
  <h2 style="font-size: 22px; color: #0f172a; border-left: 5px solid #16a34a; padding-left: 14px; margin: 44px 0 18px 0;">🔍 肌悩み・仕上がりの好みで選ぶ！美容液化粧下地「3大処方タイプ」比較マトリックス</h2>
  <p style="margin-bottom: 16px;">美容液化粧下地は配合成分と色補正機能によって「水光ツヤCC型」「毛穴・黄ぐすみ補正パープル型」「薬用美白・ノーカラー型」に分かれます。自分の肌状態に合わせて選びましょう。</p>

  <div style="overflow-x: auto; margin-bottom: 40px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: linear-gradient(90deg, #15803d, #16a34a); color: white; text-align: left;">
          <th style="padding: 12px 14px; white-space: nowrap;">処方タイプ</th>
          <th style="padding: 12px 14px;">代表成分・作用メカニズム</th>
          <th style="padding: 12px 14px; white-space: nowrap;">補正効果</th>
          <th style="padding: 12px 14px;">こんな肌悩み・好みに最適！</th>
          <th style="padding: 12px 14px;">代表アイテム</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 14px; font-weight: bold; color: #15803d; background: #f0fdf4;">① ガラクトミセス・水光CC型<br><span style="font-size:12px; font-weight:normal;">(ノーファンデ・時短ツヤ)</span></td>
          <td style="padding: 12px 14px;">発酵ガラクトミセス、カラーカプセル。<strong>肌色になじみながら美容液パック効果</strong>を発揮。</td>
          <td style="padding: 12px 14px; font-weight: bold; color: #16a34a;">自然な色ムラカバー・<br>みずみずしい水光素肌</td>
          <td style="padding: 12px 14px;">・ファンデーションを塗らずに素肌美で過ごしたい人<br>・朝のメイク時間を2分に短縮したい人<br>・乾燥で肌が突っ張る人</td>
          <td style="padding: 12px 14px;"><strong>1位：ピコモンテ CC</strong><br><strong>6位：ピコモンテ プレミアム</strong><br><strong>10位：MILY BBクリーム</strong></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 14px; font-weight: bold; color: #15803d; background: #f0fdf4;">② ポアレス・透明感パープル型<br><span style="font-size:12px; font-weight:normal;">(毛穴レス＆黄ぐすみ消去)</span></td>
          <td style="padding: 12px 14px;">ラベンダーパープル色素、毛穴管理成分。<strong>黄ぐすみを補正し毛穴の影を光で飛ばす</strong>。</td>
          <td style="padding: 12px 14px; font-weight: bold; color: #2563eb;">圧倒的な透明感・<br>毛穴フラット化</td>
          <td style="padding: 12px 14px;">・夕方にファンデが毛穴落ちして水玉になる人<br>・顔色がどんより黄色くくすんで疲れて見える人<br>・透明感のある白肌を作りたい人</td>
          <td style="padding: 12px 14px;"><strong>3位：ByUR（バイユア）</strong><br><strong>5位：＆be UVプライマー</strong></td>
        </tr>
        <tr>
          <td style="padding: 12px 14px; font-weight: bold; color: #15803d; background: #f0fdf4;">③ 薬用美白・リンクルリペア型<br><span style="font-size:12px; font-weight:normal;">(シワ改善＆ノーカラー)</span></td>
          <td style="padding: 12px 14px;">トラネキサム酸、ナイアシンアミド。<strong>日中も真皮コラーゲン産生とシミ予防</strong>を継続。</td>
          <td style="padding: 12px 14px; font-weight: bold; color: #b45309;">シワのひび割れ防止・<br>マスク色移りゼロ</td>
          <td style="padding: 12px 14px;">・目尻やほうれい線のシワに下地が割れ込む人<br>・マスクや洋服の襟に色がつくのが嫌な人<br>・首元まで一緒にトーンアップしたい人</td>
          <td style="padding: 12px 14px;"><strong>2位：ダルバ ギフトセット</strong><br><strong>7位：アンジエンド 薬用UV</strong><br><strong>8位：薬用リンクルセラムUV</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 全10商品スペック比較一覧表（アンカーリンク付き） -->
  <h2 style="font-size: 22px; color: #0f172a; border-left: 5px solid #16a34a; padding-left: 14px; margin: 44px 0 18px 0;">📊 高保湿美容液化粧下地（プライマー） 全10選スペック比較一覧表</h2>
  <p style="margin-bottom: 16px;">商品名をクリックすると、ページ下部の詳細レビュー・メリット＆デメリット解説へ直接ジャンプできます。</p>

  <div style="overflow-x: auto; margin-bottom: 44px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 13.5px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #1e293b; color: white; text-align: left;">
          <th style="padding: 10px 12px; white-space: nowrap;">順位</th>
          <th style="padding: 10px 12px;">商品名（タップで詳細へ）</th>
          <th style="padding: 10px 12px; white-space: nowrap;">仕上がりタイプ</th>
          <th style="padding: 10px 12px; white-space: nowrap;">UV防御力</th>
          <th style="padding: 10px 12px;">最大の強み・おすすめな人</th>
          <th style="padding: 10px 12px; white-space: nowrap;">参考価格</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0; background: #f0fdf4;">
          <td style="padding: 10px 12px; font-weight: bold; color: #16a34a;">🥇 1位</td>
          <td style="padding: 10px 12px; font-weight: bold;"><a href="#rank-1" style="color: #15803d; text-decoration: underline;">ピコモンテ プレミアムCCクリーム 50ml</a></td>
          <td style="padding: 10px 12px;">水光CC・色変化</td>
          <td style="padding: 10px 12px;">SPF35 PA+++</td>
          <td style="padding: 10px 12px;">楽天2800件レビュー！ガラクトミセス配合でノーファンデ美肌</td>
          <td style="padding: 10px 12px; font-weight: bold;">¥1,590</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold; color: #475569;">🥈 2位</td>
          <td style="padding: 10px 12px; font-weight: bold;"><a href="#rank-2" style="color: #15803d; text-decoration: underline;">ダルバ（d'Alba）ギフトセット 5種</a></td>
          <td style="padding: 10px 12px;">高級オイル下地</td>
          <td style="padding: 10px 12px;">高UVカット</td>
          <td style="padding: 10px 12px;">20%OFF！ホワイトトリュフ配合・機内乾燥も防ぐCA級ツヤ</td>
          <td style="padding: 10px 12px; font-weight: bold;">¥3,840</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background: #f0fdf4;">
          <td style="padding: 10px 12px; font-weight: bold; color: #b45309;">🥉 3位</td>
          <td style="padding: 10px 12px; font-weight: bold;"><a href="#rank-3" style="color: #15803d; text-decoration: underline;">ByUR（バイユア）セラムフィット 下地</a></td>
          <td style="padding: 10px 12px;">透明感パープル</td>
          <td style="padding: 10px 12px;">SPF50+ PA++++</td>
          <td style="padding: 10px 12px;">最大30%OFF！毛穴管理発想で秋の黄ぐすみと毛穴落ちを一掃</td>
          <td style="padding: 10px 12px; font-weight: bold;">¥2,420</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold;">4位</td>
          <td style="padding: 10px 12px;"><a href="#rank-4" style="color: #2563eb; text-decoration: underline;">ダルバ 3STEP ビタケアセット</a></td>
          <td style="padding: 10px 12px;">グルタチオン水光</td>
          <td style="padding: 10px 12px;">高機能美容液</td>
          <td style="padding: 10px 12px;">塗るたび肌キメ整う・くすみを寄せ付けない多幸感トーンアップ</td>
          <td style="padding: 10px 12px;">¥6,840</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold;">5位</td>
          <td style="padding: 10px 12px;"><a href="#rank-5" style="color: #2563eb; text-decoration: underline;">＆be UVプライマー リッチモイスト</a></td>
          <td style="padding: 10px 12px;">パール生ツヤ</td>
          <td style="padding: 10px 12px;">SPF50+ PA++++</td>
          <td style="padding: 10px 12px;">河北裕介プロデュース！石けんオフ＆光で毛穴小ジワを消去</td>
          <td style="padding: 10px 12px;">¥1,650</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold;">6位</td>
          <td style="padding: 10px 12px;"><a href="#rank-6" style="color: #2563eb; text-decoration: underline;">ピコモンテ プレミアムCC 単品</a></td>
          <td style="padding: 10px 12px;">ガラクトミセスCC</td>
          <td style="padding: 10px 12px;">SPF35 PA+++</td>
          <td style="padding: 10px 12px;">10%OFFクーポン！赤みカバーと時短メイクに最適な大容量</td>
          <td style="padding: 10px 12px;">¥1,590</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold;">7位</td>
          <td style="padding: 10px 12px;"><a href="#rank-7" style="color: #2563eb; text-decoration: underline;">アンジエンド ノーカラーメイクUV</a></td>
          <td style="padding: 10px 12px;">医薬部外品・薬用</td>
          <td style="padding: 10px 12px;">高UVカット</td>
          <td style="padding: 10px 12px;">トラネキサム酸配合！マスクに色がつかないノーカラー薬用美白</td>
          <td style="padding: 10px 12px;">¥2,680</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold;">8位</td>
          <td style="padding: 10px 12px;"><a href="#rank-8" style="color: #2563eb; text-decoration: underline;">薬用リンクルセラムUVホワイト</a></td>
          <td style="padding: 10px 12px;">シワ改善下地</td>
          <td style="padding: 10px 12px;">SPF50+</td>
          <td style="padding: 10px 12px;">ナイアシンアミド配合！目元やほうれい線のシワ割れを徹底防止</td>
          <td style="padding: 10px 12px;">¥3,850</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 12px; font-weight: bold;">9位</td>
          <td style="padding: 10px 12px;"><a href="#rank-9" style="color: #2563eb; text-decoration: underline;">ニューピュアフコイダン 美容液BB</a></td>
          <td style="padding: 10px 12px;">フコイダンリフト</td>
          <td style="padding: 10px 12px;">ノンケミカル</td>
          <td style="padding: 10px 12px;">40代50代のたるみ毛穴を引き締め！海藻の自己治癒力で保湿</td>
          <td style="padding: 10px 12px;">¥2,970</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold;">10位</td>
          <td style="padding: 10px 12px;"><a href="#rank-10" style="color: #2563eb; text-decoration: underline;">MILY BBクリーム オールインワン</a></td>
          <td style="padding: 10px 12px;">高コスパBB下地</td>
          <td style="padding: 10px 12px;">SPF24 PA++</td>
          <td style="padding: 10px 12px;">64%OFFで980円！手軽にムラなく仕上がる毎日の神コスパ</td>
          <td style="padding: 10px 12px;">¥980</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="font-size: 22px; color: #0f172a; border-left: 5px solid #16a34a; padding-left: 14px; margin: 44px 0 18px 0;">🏆 秋の粉ふき・毛穴落ちを救う！高保湿美容液化粧下地厳選10選【詳細レビュー】</h2>
  <p>ここからは、各アイテムの「保湿持続力」「毛穴カバー力」「メリット・デメリット」を徹底解剖します。</p>

  ${cardsHtml}

  <!-- プロの実践テクニック4ステップ -->
  <div style="background: #f0fdf4; border: 2px solid #4ade80; border-radius: 12px; padding: 28px; margin: 44px 0;">
    <h3 style="color: #15803d; margin-top: 0; font-size: 20px; border-bottom: 3px solid #16a34a; padding-bottom: 10px;">
      ✨ ベースメイク専門家直伝！下地の密着力を3倍に高める「手のひら温め＆スポンジ垂直タップ」4ステップ
    </h3>
    <p style="color: #166534; font-size: 15px;">化粧下地を「指先で擦り広げる」のはモロモロや粉ふきの最大の原因です。サロン帰りのようなシルク肌を1日中キープするプロの鉄則手順：</p>
    <ol style="padding-left: 22px; line-height: 2.05; color: #1e293b; font-size: 15px;">
      <li><strong>【最重要】スキンケア後「ティッシュで余分な油分をオフ」してから下地を出す：</strong><br>
      乳液やクリームの油分が肌表面にヌルヌル残っていると、下地と混ざって分離し、モロモロ（カス）が出ます。スキンケア後1分置き、ティッシュ1枚を顔全体にふわりと乗せて軽く手のひらで押さえてから下地を塗り始めましょう。</li>
      <li><strong>手のひらで下地を「体温で温めて」から、顔の広い面（頬・額）へスタンプ：</strong><br>
      冷たいままの下地は肌になじみにくく上滑りします。手のひらにパール粒大を取り、両手を軽く合わせて体温で温めてから、<strong>「両頬→額→あご」</strong>の広いパーツに手のひら全体で包み込むように密着させます。</li>
      <li><strong>小鼻や目元・口元は「指の腹でトントンと優しく叩き込む」：</strong><br>
      皮脂が出やすい小鼻のキワや、シワになりやすい目元・口元は、横に伸ばさず<strong>「指の腹でトントントンと軽く押し込む」</strong>ように密着させます。これで毛穴の溝に美容液下地がピタッと入り込み、夕方の毛穴落ちを完全に封じ込めます。</li>
      <li><strong>仕上げに「水で濡らして固く絞ったスポンジ」で全体を垂直タッピング：</strong><br>
      下地を塗った直後、水を含ませてギューッと固く絞ったメイクスポンジで顔全体をトントンと軽く叩きます。余分な油分が吸い取られると同時に、水分が肌に押し込まれてファンデーションとの密着力が驚異的に跳ね上がります。</li>
    </ol>
  </div>

  <!-- 読者の疑問を解決する専門Q&A -->
  <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 44px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 3px solid #16a34a; padding-bottom: 10px;">
      ❓ 化粧下地・ベースメイクに関するよくある疑問 Q&A
    </h3>

    <div style="margin-bottom: 22px;">
      <h4 style="color: #15803d; font-size: 16.5px; margin: 0 0 8px 0;">Q1. 美容液化粧下地を塗ると、消しゴムのカスのような「モロモロ」が出てしまいます。原因と防ぎ方は？</h4>
      <p style="margin: 0; color: #334155; font-size: 14.5px; line-height: 1.85;">
        <strong>A. 原因は「スキンケアの成分（カルボマー等の増粘剤）と下地のポリマーの摩擦凝固」です。「スキンケア後に2分置くこと」と「擦らず叩き込むこと」で100%防げます。</strong><br>
        化粧水や美容液が乾ききっていない状態で下地を強く擦り広げると、水分とシリコンが混ざり合ってダマになります。スキンケア完了後、歯磨きや着替えなどで2分ほど時間を置いて肌になじませ、下地を塗る際は横に擦らず「ポンポンと優しくスタンプするように置く」だけで、モロモロは完全に発生しなくなります。
      </p>
    </div>

    <div style="margin-bottom: 22px;">
      <h4 style="color: #15803d; font-size: 16.5px; margin: 0 0 8px 0;">Q2. 秋は「頬は乾燥するのに、鼻の頭だけテカる」混合肌です。下地はどう使い分けるべき？</h4>
      <p style="margin: 0; color: #334155; font-size: 14.5px; line-height: 1.85;">
        <strong>A. 「全顔に高保湿下地を塗り、Tゾーンだけ皮脂防止下地やパウダーを重ねる」のがプロの黄金ルールです。</strong><br>
        Tゾーンがテカるからといって顔全体にさっぱり系下地を使うと、頬がカサカサに干からびてしまいます。まずは今回ご紹介した高保湿美容液下地（1位や3位など）を顔全体に薄く仕込み、テカリが気になる「小鼻と眉間だけ」に少量のパウダーやポアプライマーを重ねることで、全顔の水分量を落とさずにテカリだけを完璧にコントロールできます。
      </p>
    </div>

    <div>
      <h4 style="color: #15803d; font-size: 16.5px; margin: 0 0 8px 0;">Q3. 美容液下地だけでファンデーションを塗らずに過ごしても、紫外線対策や美肌見せは十分ですか？</h4>
      <p style="margin: 0; color: #334155; font-size: 14.5px; line-height: 1.85;">
        <strong>A. はい、最近の高機能CCクリームや色補正下地（1位、3位、7位など）なら、ノーファンデの方がむしろ若々しく美しく見えます。</strong><br>
        ファンデーションを厚く塗り重ねるよりも、トーンアップ下地の上に軽くフェイスパウダーをふわっと重ねるだけの「ノーファンデメイク」の方が、毛穴落ちやマスク崩れが起きにくく、素肌そのものが美しい印象を与えます。SPF35〜50+配合のものを選べば、秋の紫外線防御もこれ1本で完璧です。
      </p>
    </div>
  </div>

  <!-- 関連内部リンク -->
  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋の崩れないベースメイク特集</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14.5px; line-height: 1.9; color: #78350f;">
      <li><a href="/article/feat-autumn-hydrating-glow-cushion-foundation-10" style="color: #b45309; font-weight: bold;">生ツヤ高保湿クッションファンデ10選【美容液下地と相性抜群の薄膜ツヤ肌】</a></li>
      <li><a href="/article/feat-autumn-hydrating-pressed-powder-dry-shine-10" style="color: #b45309; font-weight: bold;">高保湿プレストパウダー10選【Tゾーンのテカリ抑えと頬の粉ふき防止】</a></li>
      <li><a href="/article/feat-autumn-stick-concealer-high-adhesion-dry-10" style="color: #b45309; font-weight: bold;">高密着スティックコンシーラー10選【シミ・クマを厚塗り感なくピンポイント消去】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
