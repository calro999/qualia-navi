// scripts/autumn_series23_article3_jojoba.mjs
import { jojobaItemsRaw, jojobaArticles, renderProductCard } from './insert_autumn_series23_helper.mjs';

export function getJojobaArticleContent() {
  const reviews = [
    {
      point: "オーガニック認証取得のゴールデンホホバオイル。独自の脱臭精製でホホバ特有の香りを抑え、敏感肌や香りに敏感な方でも快適。",
      review: "未精製オイルの高い栄養価を保ちつつ、気になる原料臭だけを特殊技術で除去。黄金色の美しいオイルはサラリと肌になじみ、秋の乾燥でゴワついた顔や首すじをふっくら柔らかくほぐします。無臭タイプなので、お手持ちの化粧水や乳液に1滴混ぜてブースターとして使うのにも最適です。",
      texture: "においが気にならないクリアゴールデンオイル",
      skinType: "敏感肌・匂いに敏感・導入ブースター・フェイスオイル",
      longevity: "皮脂バランス調整 ★★★★★"
    },
    {
      point: "無添加・低温圧搾（コールドプレス）の未精製ゴールデンホホバオイル100ml。便利なポンプ付きで使い勝手抜群。",
      review: "熱を加えないコールドプレス製法により、天然のビタミンEやミネラルがそのまま凝縮。便利なポンプ式なのでお風呂上がりに片手でサッと手に取れ、全身のボディケアや濡れた髪のアウトバストリートメントとして大活躍。髪につければ秋風による静電気や広がりを一瞬で抑えてくれます。",
      texture: "黄金の栄養が詰まったコクのあるテクスチャー",
      skinType: "髪のパサつき・全身ボディ乾燥・静電気予防",
      longevity: "高純度保湿ヴェール ★★★★★"
    },
    {
      point: "オーガニックファブリカ公式のホホバ種子油100％。天然高純度オイルで、頭皮クレンジングから毛穴ケアまでマルチ対応。",
      review: "徹底した品質管理で作られた国産充填の安心設計。シャンプー前の乾いた頭皮に馴染ませてマッサージすると、秋の乾燥で硬くなった頭皮がほぐれ、毛穴に詰まった酸化皮脂が浮き上がります。洗い流した後の根元の立ち上がりと軽やかさは感動レベル。",
      texture: "スルスル頭皮になじむ浸透オイル",
      skinType: "頭皮の乾燥・フケ・毛穴クレンジング・ヘアケア",
      longevity: "頭皮の柔軟＆クレンジング ★★★★★"
    },
    {
      point: "フランス発フロリハナ公式！世界基準のエコサート認証オーガニック未精製ホホバ。サイズ展開も豊富で鮮度長持ち。",
      review: "アロマセラピーのプロやオーガニック愛好家から圧倒的な信頼を集めるフロリハナ。15mlのミニサイズから選べるため、酸化を気にせずいつでも新鮮な状態で使い切れます。人の皮脂成分「ワックスエステル」と構造が極めて近く、アトピー肌や乾燥性敏感肌にも優しくフィットします。",
      texture: "純度100%オーガニックの上質な浸透感",
      skinType: "オーガニック本格志向・敏感肌・サイズ選択可能",
      longevity: "肌バリアサポート ★★★★★"
    },
    {
      point: "ホホバの第一人者サンナチュラルズの最高峰「プレミアムピュアジェイオイル」。アリゾナ産高品質ホホバ種子を贅沢使用。",
      review: "世界最高峰と称されるアリゾナ砂漠の契約農家で収穫されたホホバのみを使用。通常のオイルとは一線を画す圧倒的なハリ・ツヤ感。洗顔後すぐに肌に馴染ませると、砂漠の植物ならではの強靭な保水パワーが肌を満たし、乾燥小ジワをピンと目立たなくしてくれます。",
      texture: "濃密で黄金のツヤをもたらすプレミアム質感",
      skinType: "最高峰エイジングケア・シワ・ハリ不足・乾燥肌",
      longevity: "超濃密ツヤ持続 ★★★★★"
    },
    {
      point: "コスパ最強の250ml大容量パウチ！無添加未精製ゴールデンホホバオイルを毎日全身に惜しみなく使える詰め替え用。",
      review: "お気に入りのポンプ容器に詰め替えて家族全員で使えるエコ大容量。お風呂上がりの濡れたままの肌に塗り広げることで、水分を抱え込んで吸い付くようなすべすべ肌に仕上がります。かかとのガサガサやひじ・膝の黒ずみケアにも惜しみなく使えて家計にも優しい名品。",
      texture: "全身に塗り広げやすい滑らかな伸び",
      skinType: "大容量派・ファミリーユース・ひじ・かかとケア",
      longevity: "全身高保湿 ★★★★★"
    },
    {
      point: "製薬会社デルメッド公式のディープモイストオイルお試しミニ。ホホバオイル配合の贅沢フェイシャル用ブレンド。",
      review: "大人の肌悩みを研究し尽くした製薬会社ならではの処方。ホホバオイルをベースにエイジングケア成分を絶妙にブレンドし、オイル特有の重さを感じさせないシルキーな使用感。化粧水の前に塗ることで肌を柔らかく整え、スキンケアの浸透効率を格段に高めます。",
      texture: "シルクのように軽やかなブースターオイル",
      skinType: "大人のくすみ肌・ブースター・製薬会社品質",
      longevity: "浸透ブースト効果 ★★★★☆"
    },
    {
      point: "オーガニックファブリカの100ml×2本セット。割引価格でお得に購入でき、洗面台と寝室に1本ずつ置ける人気セット。",
      review: "朝のヘアスタイリング用と夜のスキンケア・ボディケア用で使い分けたい方に大人気。ホホバオイルは酸化しにくい安定したオイルのため、長期間品質が落ちにくいのも大きなメリットです。髪の毛先に少量揉み込めば、秋の冷たい風でも広がらない艶やかなまとまりが完成します。",
      texture: "ベタつかず髪にも肌にもマルチに馴染む",
      skinType: "まとめ買い・ヘア＆スキンケア両用・セットでお得",
      longevity: "マルチケア持続 ★★★★★"
    },
    {
      point: "大容量300mlで長持ち！Na-Fuオーガニックゴールデンホホバオイル。マッサージオイルとしても最適な滑らかさ。",
      review: "エステサロンでも使用されるプロ仕様の大容量。秋の長湯のあとのリンパマッサージやフットマッサージに最適で、指通りが滑らかで肌に負担をかけません。不要な添加物を一切含まず、赤ちゃんのベビーマッサージにも安心して使える優しさが特徴です。",
      texture: "摩擦レスで伸びの良いマッサージテクスチャー",
      skinType: "全身マッサージ・ベビーマッサージ・プロ仕様",
      longevity: "摩擦軽減＆保湿持続 ★★★★★"
    },
    {
      point: "オーガニックファブリカの【精製】クリアホホバオイル100%。未精製特有の成分に敏感な超デリケート肌にも安心。",
      review: "丁寧に精製して不純物や色素を取り除いた無色透明のホホバオイル。未精製のゴールデンホホバだと肌に合わないことがある超敏感肌の方や、お洋服や枕カバーへの色移りが気になる方におすすめ。サラサラとした軽い感触で、毛穴詰まりを起こしにくいクリアな仕上がりです。",
      texture: "サラサラと軽いクリアオイル",
      skinType: "超敏感肌・無色透明・毛穴詰まり防止・軽い仕上がり",
      longevity: "低刺激バリア ★★★★☆"
    }
  ];

  let cardsHtml = '';
  jojobaItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, jojobaArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 6px solid #16a34a; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(22, 163, 74, 0.08);">
    <h2 style="color: #166534; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 なぜ秋のマルチケアには「高純度ホホバオイル」が最強なのか？</h2>
    <p style="margin: 0 0 14px 0; color: #14532d; font-size: 15px;">
      「秋になると顔だけでなく、頭皮のフケやかゆみ、髪のパサつき、ひじやかかとの粉ふきまで全身が乾いて収拾がつかない…」そんなお悩みを1本で丸ごと解決してくれるのが<strong>高純度ホホバオイル</strong>です。<br>
      実は、ホホバオイルは一般的な植物油（トリグリセリド）とは異なり、化学構造的には<strong>【ワックスエステル（液状ロウ）】</strong>に分類されます。人間の皮脂の約20〜30%を占めるワックスエステルとほぼ同一の構造を持つため、肌への親和性が極めて高く、ベタつかずに角質層へとスッと浸透。さらに、植物油の中で最も酸化しにくく安定しているため、秋のゆらぎ肌や酸化トラブルを防ぐ理想的なマルチ美容液なのです。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #bbf7d0;">
      <strong style="color: #16a34a; display: block; margin-bottom: 6px;">💡 美容のプロが愛用するホホバオイルの5大活用法:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #166534;">
        <li><strong>洗顔後のブースター（導入液）:</strong> 硬くなった角質を柔らかくほぐし、化粧水の浸透を劇的にサポート。</li>
        <li><strong>シャンプー前の「頭皮クレンジング＆保湿」:</strong> 毛穴の酸化脂を溶かし出し、秋の乾燥フケやかゆみを予防。</li>
        <li><strong>髪のアウトバストリートメント＆静電気防止:</strong> 毛先の広がりを抑え、キューティクルに自然なツヤを与える。</li>
        <li><strong>お風呂上がりの全身インバスボディケア:</strong> 濡れた肌に伸ばすだけで水分を抱え込み、粉ふきを徹底ブロック。</li>
        <li><strong>毛穴の角栓ポロポロ除去パック:</strong> 小鼻の黒ずみに優しく馴染ませてクルクルするだけで、角栓を浮かせてオフ。</li>
      </ul>
    </div>
  </div>

  <h2>秋の全身乾燥・頭皮・ヘアケア！高純度オーガニックホホバオイル厳選10選</h2>
  <p>楽天市場で口コミ高評価・天然100%オーガニック・低温圧搾・無添加にこだわった名品を徹底比較しました。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">
      ✨ 未精製（ゴールデン）と精製（クリア）の賢い選び分け方
    </h3>
    <p>ホホバオイルを選ぶ際、黄金色と無色透明のどちらを選ぶべきか迷った時の基準です：</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 14px;">
      <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
        <th style="padding: 10px; text-align: left;">種類</th>
        <th style="padding: 10px; text-align: left;">特徴とメリット</th>
        <th style="padding: 10px; text-align: left;">おすすめの肌質・用途</th>
      </tr>
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-weight: bold; color: #b45309;">ゴールデン（未精製）</td>
        <td style="padding: 10px;">低温圧搾でビタミンEやミネラルが豊富に残る。エイジングケア効果・保湿力が最高峰。</td>
        <td style="padding: 10px;">乾燥肌・エイジングサイン・頭皮マッサージ・ヘアケア全般</td>
      </tr>
      <tr>
        <td style="padding: 10px; font-weight: bold; color: #0284c7;">クリア（精製）</td>
        <td style="padding: 10px;">不純物や香りをろ過除去。刺激が極めて少なく、サラサラとした軽いテクスチャー。</td>
        <td style="padding: 10px;">超敏感肌・ニキビ肌・ベビーマッサージ・においが苦手な方</td>
      </tr>
    </table>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋の全身保湿＆美肌オイル特集</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-ceramide-high-moisture-body-milk-10" style="color: #b45309; font-weight: bold;">高保湿ボディミルク10選【粉ふき・すねの痒みブロック】</a></li>
      <li><a href="/article/feat-autumn-dense-bath-milk-dry-skin-body-10" style="color: #b45309; font-weight: bold;">高保湿バスミルク10選【長湯乾燥・カサカサ全身うるおい入浴】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
