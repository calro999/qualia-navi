import fs from 'fs';

const lateSummerTopics2 = [
  // 1. 汗対策 (5件)
  `  - id: topic-body-gatsby-spot-block
    category: bodycare
    keyword: "ギャツビー プレミアム デオドラント ロールオン"
    title_template: "【SNSで正直教えたくないと話題】{product_name} 猛暑の滝汗でも服に汗ジミを作らない神ロールオン"
    target_audience: "残暑の脇汗や服の汗ジミを絶対見せたくないおしゃれ派"
    is_hall_of_fame: true`,

  `  - id: topic-body-ag24-footcream
    category: bodycare
    keyword: "エージーデオ24 デオドラントフットクリアクリーム"
    title_template: "【靴脱いでも全く臭わないとバズり中】{product_name} 全人類買うべき高密着足用防臭クリーム"
    target_audience: "サンダルや革靴の中の足のニオイを完璧に防ぎたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-biore-coolmist
    category: bodycare
    keyword: "ビオレ 冷ハンディミスト"
    title_template: "【シュッと一吹きで神クールダウン】{product_name} 汗と熱中症対策の優勝ミスト"
    target_audience: "8-9月の残暑での外出やテーマパークで速攻冷却したい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-diane-botanicaldry
    category: haircare
    keyword: "ダイアン ボタニカル ドライシャンプー"
    title_template: "【汗でペタンこ髪が10秒で復活】{product_name} 頭皮のニオイとベタつきを消す神スプレー"
    target_audience: "夕方の髪のペタつきや頭皮の汗臭さを瞬時に復活させたい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-deoco-sheet
    category: bodycare
    keyword: "デオコ 薬用ボディクレンズシート"
    title_template: "【大人の汗臭が消えてバズり中】{product_name} サラサラ肌とすぃーとフローラルの香りをまとえるシート"
    target_audience: "拭き取り後も良い香りをキープし汗臭さを消したい女性"
    is_hall_of_fame: false`,

  // 2. コスメ (3件)
  `  - id: topic-skincare-suisai-gold
    category: skincare
    keyword: "suisai スイサイ ビューティクリア ゴールド パウダーウォッシュ"
    title_template: "【金の酵素洗顔で毛穴つるんとバズり中】{product_name} 金美容オイル配合で洗うたびつや肌"
    target_audience: "夏終わりの頑固な毛穴角栓・乾燥ゴワつきを一網打尽にしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-romand-meltbalm
    category: makeup
    keyword: "ロムアンド グラスティング メルトバーム"
    title_template: "【むっちりツヤ唇でSNS優勝】{product_name} 水光膜が唇を包み込むバズりリップ"
    target_audience: "ぷるぷるの縦ジワなし粘膜ツヤリップを手に入れたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-cezanne-keepmist
    category: makeup
    keyword: "セザンヌ メイクフィックスミスト"
    title_template: "【ワンコインでメイクが落ちないと話題】{product_name} デパコス級のキープ力を誇る神ミスト"
    target_audience: "プチプラで猛暑のメイク崩れ・マスクヨレを鉄壁ガードしたい方"
    is_hall_of_fame: true`,

  // 3. ネイルチップ (2件)
  `  - id: topic-nail-korean-blush-cat
    category: k-beauty
    keyword: "韓国風 ほろ酔いチーク キャッツアイ マグネットネイルチップ"
    title_template: "【指先がリアルに盛れると大バズり】{product_name} じゅわっと滲むチーク×立体キャッツアイ"
    target_audience: "チークネイルとマグネットの最新トレンドを指先に纏いたい方"
    is_hall_of_fame: true`,

  `  - id: topic-nail-aurora-french
    category: k-beauty
    keyword: "オーロラフレンチ 氷フィルム ネイルチップ"
    title_template: "【光の当たり方でバチバチに可愛い】{product_name} 夏終わりのセルフネイル優勝デザイン"
    target_audience: "透明感あふれるオーロラ氷フレンチで手元を美しく魅せたい方"
    is_hall_of_fame: true`
];

function addLateSummerTopics2() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const updatedContent = content.trim() + '\n\n' + lateSummerTopics2.join('\n\n') + '\n';

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('8-9月に使いたいSNSバズコスメ＆制汗＆ネイル10商品を articles.yml に追加しました。');
}

addLateSummerTopics2();
