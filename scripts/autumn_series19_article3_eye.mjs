// scripts/autumn_series19_article3_eye.mjs
import { eyeItemsRaw, eyeArticles, renderProductCard } from './insert_autumn_series19_helper.mjs';

export function getEyeArticleContent() {
  const reviews = [
    {
      point: "温感・冷感・振動マッサージを1台で網羅。USB充電式コードレスで、秋の夜長のベッドサイドやオフィス休憩に最適な楽天1位ホットアイマスク。",
      review: "約40℃〜45℃の心地よい蒸気のような温熱が瞬時に立ち上がり、冷え切った目の奥のピント調節筋（毛様体筋）をじんわり優しくほぐします。微細な振動リズムが目周りのツボを心地よく刺激し、血行不良による頑固な青クマや目元のむくみを一掃。タイマー付きで就寝時も安心です。",
      texture: "肌あたりの良いソフトクッション素材",
      skinType: "眼精疲労・青クマ・睡眠の質改善",
      longevity: "ポカポカ温感持続 ★★★★★"
    },
    {
      point: "最新モデルとして進化した多機能アイケアマスク。目元を包み込む3D立体構造で光を完全に遮断しながら、至福の温熱リラクゼーション。",
      review: "秋の夜長のスマホ・PC作業で酷使された目を急速リフレッシュ。目の周りを優しく温めながら、こめかみまでしっかりカバーする広角設計です。充電式コードレスのため、寝返りを打っても邪魔にならず、毎日の就寝ルーティンに取り入れることで深い眠りをサポートします。",
      texture: "通気性に優れた立体デザイン",
      skinType: "重度の疲れ目・デスクワーカー",
      longevity: "深部温熱キープ ★★★★★"
    },
    {
      point: "エアバッグによる空気圧マッサージと温熱が融合した本格アイフレッシャーVega。まるでエステティシャンの指先のような心地よさ。",
      review: "空気の力で目元をやさしく加圧・解放するエアプレッシャー技術を搭載。秋の寒さでこわばった目元の筋肉をリズミカルにストレッチし、滞ったリンパと静脈血をスムーズに流します。温熱機能と合わせることで、使用後は視界がパッと明るくなり、目元の重だるさが嘘のように軽くなります。",
      texture: "高級感のあるプレミアムレザー調",
      skinType: "慢性的な眼精疲労・目元のむくみ",
      longevity: "サロン級リフレッシュ ★★★★★"
    },
    {
      point: "楽天ランキング1位常連の実力派。グラフェン発熱技術を採用し、わずか数秒で均一な安定温熱を届ける速暖ホットアイマスク。",
      review: "薄型・軽量で持ち運びにも便利。秋の出張や旅行の新幹線・飛行機内でも手軽に使えます。グラフェン素材特有の遠赤外線効果により、肌表面だけでなく目元の深部までポカポカとした心地よい熱がじんわり届き、乾燥してシワっぽくなった目元の血色感を瞬時に高めます。",
      texture: "超軽量シルキータッチ",
      skinType: "血行不良・持ち運び・青クマ",
      longevity: "遠赤外線温熱 ★★★★★"
    },
    {
      point: "温感と冷感の両方を切り替え可能な2WAY設計。朝のむくみ目には冷感、夜の疲れ目・クマには温感と使い分けができる万能ウォーマー。",
      review: "秋の気温変化や生活リズムの乱れによる朝のまぶたの腫れぼったさには冷感モードですっきりと引き締め、夜は温感モードでじっくり血流を促すという理想的なケアがこれ1台で完結。コストパフォーマンスも非常に高く、初めてアイウォーマーを導入する方に最適なエントリー機です。",
      texture: "しっとり柔らかいフェイスフィット",
      skinType: "朝のむくみ・夜のクマ・ハイブリッド派",
      longevity: "温冷両用 ★★★★★"
    },
    {
      point: "世界的ヘルスケアブランド・フィリップスが開発した最高峰アイマッサージャー。人間工学に基づいた精密設計で目元を極上ケア。",
      review: "医療・健康機器で培われた高度な技術を投入。目元に均一な圧力をかけるウェーブ振動と、皮膚の薄い目元に最適な温度コントロールが施されています。秋の寒さで重くなったまぶたを優しく持ち上げるようなケアで、使用後は目元がパッチリと開き、若々しい印象を取り戻せます。",
      texture: "医療グレードの抗菌シリコン＆クロス",
      skinType: "本格ケア・ギフト・上質なリラクゼーション",
      longevity: "フィリップス品質 ★★★★★"
    },
    {
      point: "ふるさと納税でも大人気！国内工場で丁寧に作られた安心安全のネムリーナ。高密度振動とじんわり温熱で心地よい入眠を誘う。",
      review: "日本の技術力が光る、睡眠の質向上に特化したホットアイマスク。秋の夜の冷え込みで交感神経が高ぶり、なかなか寝付けない夜に装着すると、数分でまぶたが温まり、心地よい眠気へと導かれます。プレゼントやご両親への贈り物としても圧倒的な支持を集めています。",
      texture: "日本製の肌に優しい高級ファブリック",
      skinType: "不眠気味・冷え性・国産志向",
      longevity: "心地よい入眠サポート ★★★★★"
    },
    {
      point: "フィリップスのフラッグシップモデル。Bluetooth音楽再生機能と温熱エアマッサージが融合した至高のリラクゼーションギア。",
      review: "心地よいヒーリングサウンドを聴きながら、温かい手のひらで包まれているかのような極上の目元スパ体験。秋の忙しい毎日の終わりに、15分間の完全リセット時間を創出します。目元のクマや乾燥だけでなく、心身のストレスまでスーッと溶かしてくれる一生モノの美容家電です。",
      texture: "人間工学フィット・高級プレミアム仕様",
      skinType: "極上の癒やし・ストレス過多・ハイスペック",
      longevity: "至高のスパ体験 ★★★★★"
    },
    {
      point: "フィリップス公式限定モデル。目元の乾燥を防ぎながら、適切な温熱で目元の毛細血管を刺激し透明感を呼び戻す。",
      review: "秋の外気乾燥でカサつきやすい目元をいたわる設計。アイクリームを塗った上から装着することで、温熱効果により美容液成分の浸透が格段にアップ。まるでエステサロンの目元集中パックのような贅沢な保湿＆血行ケアを自宅で毎晩再現できます。",
      texture: "肌密着性の高いプレミアムクッション",
      skinType: "乾燥クマ・エイジングケア・公式限定",
      longevity: "美肌温熱浸透 ★★★★★"
    },
    {
      point: "EMS電気刺激と温熱が同時に目元の深層筋にアプローチ！たるみや目袋、頑固な青クマを根本から引き上げる次世代ギア。",
      review: "温めるだけでなく、普段動かしにくい眼輪筋をEMSの電気パルスでダイレクトにトレーニング。秋の乾燥と加齢で目元がたるみ、黒クマや影が目立ってきた大人の目元に劇的なハリとリフト感をもたらします。じんわり広がる温感とともに、目元がキュッと引き締まる感動を味わえます。",
      texture: "通電性と肌触りを両立した特殊パッド",
      skinType: "目元のたるみ・黒クマ・リフトケア",
      longevity: "EMS引き締め持続 ★★★★★"
    }
  ];

  let cardsHtml = '';
  eyeItemsRaw.forEach((item, idx) => {
    cardsHtml += renderProductCard(item, eyeArticles[idx], idx, reviews[idx]);
  });

  return `
<div class="autumn-theme-article" style="line-height: 1.95; color: #1e293b; font-size: 16px;">

  <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-left: 6px solid #b45309; border-radius: 12px; padding: 24px; margin-bottom: 36px; box-shadow: 0 4px 15px rgba(180, 83, 9, 0.08);">
    <h2 style="color: #78350f; font-size: 22px; margin: 0 0 12px 0; font-weight: 800;">🍂 秋の冷え込みと「眼精疲労・青クマ・目元のこわばり」の密接な関係</h2>
    <p style="margin: 0 0 14px 0; color: #451a03; font-size: 15px;">
      秋の夜長、日没が早まることでスマートフォンやパソコンのブルーライトを浴びる時間が増加します。さらに、外気温の低下によって顔全体の毛細血管がギュッと収縮するため、目元の血流が激減してしまいます。<br>
      その結果、<strong>【目の奥の毛様体筋が硬直してピントが合わなくなる眼精疲労】</strong>と、<strong>【滞留した還元ヘモグロビン（暗赤色の血液）が皮膚を通して青黒く透けて見える「青クマ」】</strong>が同時に悪化してしまうのです。
    </p>
    <div style="background: white; border-radius: 8px; padding: 14px 18px; border: 1px solid #fed7aa;">
      <strong style="color: #b45309; display: block; margin-bottom: 6px;">💡 秋の温感アイケア・ホットアイマスクがもたらす3大効果:</strong>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #78350f;">
        <li><strong>毛様体筋の緊張緩和とピント調節機能の回復:</strong> 約40℃の温熱で目周りの筋肉を芯から弛緩させ、重だるい疲れ目をすっきりリセット。</li>
        <li><strong>目元の毛細血管を拡張し、青クマとくすみを根本解消:</strong> 滞った静脈血の流れを促すことで、どんよりした目元に明るい透明感と血色感を復活。</li>
        <li><strong>副交感神経を刺激して自律神経を整え、深い入眠へ:</strong> まぶたを温めることで脳がリラックスモードに切り替わり、冷えによる秋の不眠を解消。</li>
      </ul>
    </div>
  </div>

  <h2>秋の疲れ目・青クマを芯から癒す！ホットアイマスク・温感アイケア厳選10選</h2>
  <p>楽天ランキング上位かつ温熱効果・リラクゼーション機能・EMS引き締め力に優れた名品を厳選してご紹介します。</p>

  ${cardsHtml}

  <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px; margin: 40px 0;">
    <h3 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #b45309; padding-bottom: 8px;">
      ✨ 美容プロ直伝！「アイクリーム×温感アイマスク」の相乗効果テクニック
    </h3>
    <p>ホットアイマスクをただ着けるだけでなく、スキンケアと組み合わせることでエステ級の美肌効果が得られます：</p>
    <ol style="padding-left: 22px; line-height: 2; color: #334155;">
      <li><strong>高保湿アイクリームを目元にたっぷり塗布する:</strong> レチノールやナイアシンアミド配合のアイクリームを、目周りに少し厚めに塗り広げます。</li>
      <li><strong>薄手のティッシュを目元に挟む（またはシルクカバー装着）:</strong> 機器へのクリーム付着を防ぎ、同時に適度なスチーム効果を生み出します。</li>
      <li><strong>40℃前後の温感モードで10〜15分間リラックス:</strong> 温熱によって毛穴が開き、皮膚の柔軟性が高まることで、アイクリームの美容成分が角層深部までグングン浸透します。</li>
      <li><strong>終了後は手のひらで優しく目元をハンドプレス:</strong> 温まった目元のうるおいを閉じ込め、そのままベッドに入れば翌朝ふっくらハリのある明るい目元を実感できます。</li>
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 32px 0;">
    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">🍁 あわせて読みたい！秋のパーツケア＆温活特集リンク</h4>
    <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #78350f;">
      <li><a href="/article/feat-autumn-eye-cream-fine-lines-crow-feet-10" style="color: #b45309; font-weight: bold;">高保湿アイクリーム10選【目元の乾燥小ジワ・ハリ集中ケア】</a></li>
      <li><a href="/article/feat-autumn-warming-massage-gel-cream-dullness-10" style="color: #b45309; font-weight: bold;">温感マッサージジェル10選【血行促進とくすみ抜け】</a></li>
      <li><a href="/article/feat-autumn-moist-bath-oil-body-care-cold-dry-10" style="color: #b45309; font-weight: bold;">高保湿バスオイル10選【秋の冷え込み・湯冷め防止】</a></li>
      <li><a href="/article/feat-autumn-cosmetics-guide-45-series-hub" style="color: #b45309; font-weight: bold;">【決定版】秋のコスメ特集コンプリート・ハブガイド</a></li>
    </ul>
  </div>

</div>
`;
}
