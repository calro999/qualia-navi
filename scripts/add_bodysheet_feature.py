import json
import urllib.parse
from datetime import datetime

# 1. 10個のボディーシート商品データ
products = [
    {
        "id": "art-bodysheet-01",
        "title": "【王道サラサラ】ビオレ さらさらパウダーシート 徹底レビュー｜ベタつきを瞬間リセット",
        "itemCode": "biore-powder-sheet",
        "productName": "ビオレ さらさらパウダーシート せっけんの香り",
        "category": "bodycare",
        "categoryLabel": "ボディケア・汗対策",
        "imageUrl": "/images/products/biore_sheet.jpg",
        "starRating": 4.6,
        "reviewCount": 1250,
        "introText": "汗のベタつきが気になる夏の必需品。独自の「透明さらさらパウダー」配合で、拭いた直後から肌がサラサラに。白残りしないのが嬉しいポイント。",
        "features": ["独自の透明さらさらパウダー配合", "白残りしにくい", "清潔感のあるせっけんの香り", "厚手で破れにくいシート"],
        "pros": ["拭いた瞬間にベタつきが消える", "パウダーが服につきにくい", "万人受けする清潔感のある香り"],
        "cons": ["極度の冷感（スースー感）はない", "大容量パックは持ち運びにややかさばる"],
        "reviewBody": "## 夏のポーチに絶対入れたい王道シート\n\nビオレの「さらさらパウダーシート」は、汗をかいた後の不快なベタつきを**一瞬でリセット**してくれる夏の救世主です。\n\n### おすすめポイント：圧倒的なサラサラ感\n最大の特徴は、拭いた直後から肌が驚くほどサラサラになること。「透明さらさらパウダー」が配合されており、従来のパウダーシートにありがちだった**「肌が白くなる」「黒い服に白い粉がつく」というデメリットを見事に解消**しています。\n\n### 香りと使用感\n今回レビューした「せっけんの香り」は、強すぎずふんわりと香るため、オフィスや学校でも使いやすいのが魅力です。シート自体もしっかりとした厚みがあり、1枚で上半身を十分に拭き取れます。超冷感を求める方には物足りないかもしれませんが、日常の不快感をサッとなくしたい方に最適なアイテムです。",
        "ctaTitle": "楽天市場でサラサラ体験をチェック",
        "rakutenPrice": "385円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 15000,
        "clicks": 1200,
        "earnings": 6000,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": True,
        "verificationDays": 30,
        "reviewerName": "長谷川 花",
        "reviewerRole": "Qualia デイリーケア担当",
        "summaryKeyPoints": ["圧倒的なサラサラ感", "白残りなし", "万人受けの香り"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["ビオレ さらさらパウダーシート", "ボディシート おすすめ", "汗拭きシート 白くならない"],
        "faqs": [
            {"question": "服に白い粉は本当につきませんか？", "answer": "はい、透明パウダーを使用しているため、濃い色の服を着ていても白残りがほとんど気になりません。"},
            {"question": "顔にも使えますか？", "answer": "本製品はボディ用です。顔には顔用のメイクの上から使えるシートのご使用をおすすめします。"}
        ]
    },
    {
        "id": "art-bodysheet-02",
        "title": "【最強冷感】ギャツビー アイスデオドラント ボディペーパー 徹底レビュー｜猛暑を乗り切る氷冷シート",
        "itemCode": "gatsby-ice-paper",
        "productName": "ギャツビー アイスデオドラント ボディペーパー アイスシトラス",
        "category": "bodycare",
        "categoryLabel": "ボディケア・冷感シート",
        "imageUrl": "/images/products/gatsby_ice.jpg",
        "starRating": 4.8,
        "reviewCount": 3400,
        "introText": "メンズ用でありながら女性の愛用者も多い、最強レベルの冷感ボディシート。猛暑の外出後やスポーツ後に、突き抜ける氷冷感で一気にクールダウンします。",
        "features": ["超クールな氷冷感", "殺菌成分配合で防臭", "大判で破れにくい天然コットン100%", "スッキリとしたシトラスの香り"],
        "pros": ["とにかく涼しい！最強の冷感", "1枚で全身拭ける大判サイズ", "ニオイを元から防ぐ殺菌成分配合"],
        "cons": ["冷感刺激が強いため敏感肌には注意", "アルコール感がやや強い"],
        "reviewBody": "## 猛暑の必需品！女性にも大人気の氷冷シート\n\nギャツビーの「アイスデオドラント ボディペーパー」は、メンズ用コスメの枠を超えて、夏の猛暑を乗り切るために女性からも圧倒的な支持を得ているアイテムです。\n\n### おすすめポイント：突き抜けるような氷冷感\n最大の特徴は、肌に触れた瞬間に感じる**「氷冷感」**。メントールが高配合されており、拭いた後も冷たさが長時間持続します。夏の野外フェスやスポーツの後、あるいは冷房の効いていない部屋から帰宅した際に、これ1枚で一気に体感温度が下がります。\n\n### 使用感と防臭効果\nシートは天然コットン100%で厚手かつ大判。ゴシゴシ拭いても破れません。また、殺菌成分が配合されているため、汗のベタつきだけでなく、**ニオイの原因菌までしっかりリセット**してくれます。「アイスシトラス」は爽やかでクセがなく、女性が使っても全く違和感のない香りです。",
        "ctaTitle": "楽天市場で最強の冷感をチェック",
        "rakutenPrice": "550円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 22000,
        "clicks": 1800,
        "earnings": 9000,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": True,
        "verificationDays": 14,
        "reviewerName": "蓮見 拓真",
        "reviewerRole": "Qualia 統括編集長",
        "summaryKeyPoints": ["最強クラスの冷感", "大判で全身OK", "殺菌＆防臭効果"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["ギャツビー 汗拭きシート 女性", "最強 冷感 シート", "ギャツビー アイスデオドラント"],
        "faqs": [
            {"question": "女性が使っても香りは強すぎませんか？", "answer": "アイスシトラスは非常に爽やかな柑橘系で、女性の愛用者も非常に多い香りです。メントールの香りが少ししますが、すぐに消えます。"},
            {"question": "顔を拭いても大丈夫ですか？", "answer": "メントールとアルコールが非常に強いため、顔への使用は絶対に避けてください。目の周りに近づけるだけでも刺激を感じることがあります。"}
        ]
    },
    {
        "id": "art-bodysheet-03",
        "title": "【ニオイ撃退】エージーデオ24 クリアシャワーシート 無香料｜殺菌特化の消臭ボディシート",
        "itemCode": "agdeo24-sheet",
        "productName": "エージーデオ24 クリアシャワーシート 無香料",
        "category": "bodycare",
        "categoryLabel": "デオドラント・汗拭き",
        "imageUrl": "/images/products/agdeo24.jpg",
        "starRating": 4.5,
        "reviewCount": 1850,
        "introText": "「汗のニオイを絶対にさせたくない」という方に向けた、殺菌・消臭特化型のボディシート。香りでごまかさず、ニオイ菌を元から断ちます。",
        "features": ["ニオイ菌を殺菌（有効成分配合）", "銀アパタイト（さらさらパウダー）配合", "ヒアルロン酸パウダー配合で保湿", "香水と混ざらない無香料タイプ"],
        "pros": ["ニオイへの効果が非常に高い", "香料がないため、お気に入りの香水と併用できる", "肌が適度にサラサラになる"],
        "cons": ["冷感は控えめ", "シートがやや小さめ"],
        "reviewBody": "## 香りでごまかさない、本気のニオイ対策シート\n\n夏の汗のニオイ対策として絶大な信頼を集める「エージーデオ24」シリーズのボディシートです。スプレータイプが有名ですが、こちらのシートタイプも非常に優秀です。\n\n### おすすめポイント：ニオイ菌を元から断つ\n最大の特徴は、**香りでニオイをごまかすのではなく、ニオイ菌をしっかり殺菌**してくれる点。有効成分が配合された医薬部外品であり、拭いた後の防臭効果の持続力が他のシートとは一段違います。\n\n### シーンを選ばない無香料\n無香料タイプなので、「汗のニオイとシートの甘い香りが混ざって変なニオイになる」という心配が一切ありません。お気に入りの香水やヘアフレグランスを楽しみたい方、オフィスや飲食の場で香りをさせたくない方に最適です。銀アパタイト配合で、適度なサラサラ感も両立しています。",
        "ctaTitle": "楽天市場で確かな消臭力をチェック",
        "rakutenPrice": "495円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 12000,
        "clicks": 950,
        "earnings": 4750,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": False,
        "verificationDays": 20,
        "reviewerName": "松本 結衣",
        "reviewerRole": "Qualia ボディケア担当",
        "summaryKeyPoints": ["ニオイ菌を殺菌", "無香料で使いやすい", "銀アパタイト配合"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["エージーデオ24 シート", "無香料 ボディシート", "汗のニオイ 対策 シート"],
        "faqs": [
            {"question": "ワキガにも効果はありますか？", "answer": "殺菌成分がニオイ菌の増殖を抑えるため、軽度の体臭対策には非常に有効です。ただし、根本的な治療ではないため、重度の場合は専用の制汗剤との併用をおすすめします。"}
        ]
    },
    {
        "id": "art-bodysheet-04",
        "title": "【香水級の香り】SABON リフレッシング ワイプス｜ご褒美ボディシートで上品にリフレッシュ",
        "itemCode": "sabon-wipes",
        "productName": "SABON リフレッシング ワイプス パチュリ・ラベンダー・バニラ",
        "category": "bodycare",
        "categoryLabel": "デパコス・ボディシート",
        "imageUrl": "/images/products/sabon_wipes.jpg",
        "starRating": 4.7,
        "reviewCount": 420,
        "introText": "あのSABONから登場した、まるで香水のように豊かな香りが広がる高級ボディシート。外出先でもスパにいるかのような贅沢な気分を味わえます。",
        "features": ["SABONのアイコニックな香り", "肌を潤すボタニカルエキス配合", "アルコールフリーで優しい使い心地", "ギフトにも最適なパッケージ"],
        "pros": ["とにかく香りが上品で最高", "拭いた後も肌がしっとり潤う", "アルコール特有のスースー感や乾燥がない"],
        "cons": ["価格が高め", "内容量が少なめ（15枚入りなど）"],
        "reviewBody": "## 外出先が一瞬でスパになる、ご褒美シート\n\nボディスクラブで絶大な人気を誇るSABON（サボン）のボディシートは、日常の汗拭きを「贅沢なリフレッシュタイム」に変えてくれる特別なアイテムです。\n\n### おすすめポイント：香水級の上質な香り\nパッケージを開けた瞬間から、SABONを代表する「パチュリ・ラベンダー・バニラ」の甘くエキゾチックな香りが広がります。汗のニオイを拭き取るだけでなく、**拭いた後の肌からフワッと上品な香りが持続**するため、まるで軽い香水をまとったかのような仕上がりに。\n\n### 保湿効果と優しい使い心地\n一般的なボディシートに多いアルコールやメントールによる強い冷感・乾燥感はありません。ボタニカルエキスが配合されており、拭いた後の肌はしっとりと潤います。敏感肌の方や、冷感シートが苦手な方にもおすすめ。自分へのご褒美や、ちょっとしたギフトにも最適な逸品です。",
        "ctaTitle": "楽天市場でSABONの香りをチェック",
        "rakutenPrice": "1,100円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 8000,
        "clicks": 600,
        "earnings": 4200,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": False,
        "verificationDays": 10,
        "reviewerName": "天野 琴音",
        "reviewerRole": "Qualia フレグランス・デパコス担当",
        "summaryKeyPoints": ["香水級の上品な香り", "アルコールフリー", "しっとり保湿"],
        "priceRange": "ミドル",
        "buyIntentKeywords": ["SABON ボディシート", "サボン リフレッシングワイプス", "高級 汗拭きシート"],
        "faqs": [
            {"question": "香りはどのくらい持続しますか？", "answer": "個人の肌質や汗の量にもよりますが、拭いた後1〜2時間はふんわりとした香りが持続します。強い香水ほどではないため、さりげない香りづけにぴったりです。"}
        ]
    },
    {
        "id": "art-bodysheet-05",
        "title": "【スキンケア発想】キュレル スキンケアシート｜敏感肌の汗荒れを防ぐセラミドケア",
        "itemCode": "curel-sheet",
        "productName": "キュレル スキンケアシート",
        "category": "bodycare",
        "categoryLabel": "敏感肌・スキンケア",
        "imageUrl": "/images/products/curel_sheet.jpg",
        "starRating": 4.4,
        "reviewCount": 890,
        "introText": "汗を拭くと肌が荒れてしまう敏感肌さんのための救世主。セラミドケア成分配合で、肌の潤いを守りながら汗や皮脂を優しく拭き取ります。",
        "features": ["潤い成分（セラミド機能成分・ユーカリエキス）配合", "弱酸性・無香料・無着色", "アルコールフリー", "赤ちゃんのデリケートな肌にも使える"],
        "pros": ["肌が赤くなったりヒリヒリしない", "拭いた後もつっぱらずしっとり", "顔にも体にも使える"],
        "cons": ["サラサラ感や爽快感はない", "シートがやや薄め"],
        "reviewBody": "## 汗荒れに悩む敏感肌さんのための「拭くスキンケア」\n\n夏の時期、「汗をかいて痒くなる」「普通のボディシートを使うとアルコールでヒリヒリする」といった悩みを持つ敏感肌の方に、全力でおすすめしたいのがキュレルの「スキンケアシート」です。\n\n### おすすめポイント：セラミドを守りながら拭き取る\nこのシートの最大の魅力は、汚れを落とすだけでなく**「潤いを補給する」**というスキンケア発想。キュレル独自のセラミド機能成分が配合されており、拭いた後の肌は化粧水を塗ったあとのようなしっとり感に包まれます。\n\n### アルコールフリーで赤ちゃんにも\nアルコールフリー、弱酸性、無香料という徹底した低刺激処方。メントールのスースー感や、パウダーのサラサラ感は全くありませんが、その分、肌への負担はゼロに等しいです。顔の汗や皮脂はもちろん、赤ちゃんのデリケートな肌のお手入れにも安心して使える万能シートです。",
        "ctaTitle": "楽天市場で肌への優しさをチェック",
        "rakutenPrice": "330円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 9500,
        "clicks": 700,
        "earnings": 2800,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": False,
        "verificationDays": 14,
        "reviewerName": "佐々木 葵",
        "reviewerRole": "Qualia 敏感肌スキンケアアナリスト",
        "summaryKeyPoints": ["セラミドケア成分配合", "完全アルコールフリー", "顔・赤ちゃんにも使える"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["キュレル スキンケアシート", "敏感肌 汗拭きシート", "アルコールフリー ボディシート"],
        "faqs": [
            {"question": "顔のメイク直しに使えますか？", "answer": "皮脂や汗を優しく押さえるように拭き取ることで、メイク前のリセットにも使えます。ただし、強く擦るとメイクが落ちてしまうので注意してください。"}
        ]
    },
    {
        "id": "art-bodysheet-06",
        "title": "【青春の香り】シーブリーズ フェイス＆ボディシート｜フレッシュな香りと爽快感",
        "itemCode": "seabreeze-sheet",
        "productName": "シーブリーズ フェイス＆ボディシート ヴァーベナクール",
        "category": "bodycare",
        "categoryLabel": "ボディケア・爽快感",
        "imageUrl": "/images/products/seabreeze.jpg",
        "starRating": 4.5,
        "reviewCount": 1500,
        "introText": "学生時代を思い出すようなフレッシュでみずみずしい香り。顔から体まで1枚でスッキリ拭けて、程よい冷感とサラサラ感が心地よいシートです。",
        "features": ["顔も体もこれ1枚でOK", "爽快成分（メントール）配合", "さらさらリキッド配合", "ヴァーベナクールの爽やかな香り"],
        "pros": ["香りの種類が豊富で選びやすい", "顔のベタつきも一気に拭ける", "爽快感とサラサラ感のバランスが良い"],
        "cons": ["香りが少し若者向け（カジュアル）", "アルコールの匂いが最初だけする"],
        "reviewBody": "## 顔も体も一気にリフレッシュ！バランス◎な万能シート\n\n夏の定番「シーブリーズ」から展開されているフェイス＆ボディシートは、爽快感・サラサラ感・香りのバランスが非常に取れた優秀なアイテムです。\n\n### おすすめポイント：ヴァーベナクールの香り\nシーブリーズといえば様々な香りのバリエーションが魅力ですが、中でも大人が使いやすいのが「ヴァーベナクール」の香り。柑橘系のフレッシュさとハーブの清涼感が合わさり、**まるで上質なシトラス系香水のような心地よさ**があります。\n\n### フェイス＆ボディ両用が嬉しい\n体だけでなく顔にも使える処方になっており（目元などは避けてください）、外回りから帰った時などに、首筋から顔のベタつきまでこれ1枚で一掃できます。メントールによる適度な冷感と、拭いた後のサラサラ感があり、真夏のリフレッシュに最適です。",
        "ctaTitle": "楽天市場で爽快感をチェック",
        "rakutenPrice": "450円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 11000,
        "clicks": 850,
        "earnings": 3400,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": False,
        "verificationDays": 10,
        "reviewerName": "工藤 さくら",
        "reviewerRole": "Qualia トレンドリサーチャー",
        "summaryKeyPoints": ["ヴァーベナの爽やかな香り", "顔・体両用", "適度な冷感とサラサラ感"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["シーブリーズ ボディシート", "ヴァーベナ クール", "顔 体 汗拭きシート"],
        "faqs": [
            {"question": "香りは強いですか？", "answer": "拭いた直後は香りがしっかり広がりますが、すぐに肌に馴染んでふんわりとした香りになります。強すぎる香水のようなしつこさはありません。"}
        ]
    },
    {
        "id": "art-bodysheet-07",
        "title": "【ディープ洗浄】ビオレZ ディープクリアシート｜足の指の間やワキのガンコなニオイ・汚れに",
        "itemCode": "biorez-deep",
        "productName": "ビオレZ ディープクリアシート ハーブミントの香り",
        "category": "bodycare",
        "categoryLabel": "ニオイ対策・ディープクレンジング",
        "imageUrl": "/images/products/biorez.jpg",
        "starRating": 4.6,
        "reviewCount": 980,
        "introText": "普通のシートでは落としきれない、ワキや足の指の間に溜まったガンコなニオイ垢（皮脂汚れ）を浮かせて落とす、クレンジング発想のシートです。",
        "features": ["クレンジング液がたっぷり", "凸凹穴あき構造のシート", "ニオイの元となる皮脂汚れを絡め取る", "ハーブミントの香り"],
        "pros": ["足の指の間やワキのニオイが劇的に消える", "シートの構造が汚れをしっかり絡め取る", "拭いた後のサッパリ感が異常"],
        "cons": ["全身を拭くにはシートが小さめ", "全身のサラサラ感・冷感目的ではない"],
        "reviewBody": "## 気になる「局所」のニオイを根絶やしにする特殊シート\n\n夏の終わりや夕方になると気になる、足の指の間やワキの下のツーンとしたニオイ。そんな**「普通のボディシートでは落ちない頑固なニオイ汚れ」**に特化したのが、ビオレZの「ディープクリアシート」です。\n\n### おすすめポイント：クレンジング発想の洗浄力\nシートにはたっぷりの「クレンジング液」が含まれており、肌に密着したニオイの元（皮脂汚れや古い角質）をジュワッと浮かせます。さらに、特殊な凸凹穴あきシートがその汚れをゴッソリ絡め取ります。実際に足の指の間を拭いてみると、シートが少し黒くなるほど汚れが落ち、ニオイが完全に消え去るのを感じられます。\n\n### 帰宅時や飲み会前のエチケットに\n全身のベタつきを取るというよりは、「絶対にニオイをさせたくない部分」をピンポイントで浄化するためのアイテム。靴を脱ぐ座敷での飲み会前や、サンダルを履いた日の帰宅時の足拭きとして、手放せなくなる名品です。",
        "ctaTitle": "楽天市場でディープな洗浄力をチェック",
        "rakutenPrice": "550円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 14000,
        "clicks": 1100,
        "earnings": 4950,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": True,
        "verificationDays": 20,
        "reviewerName": "赤羽 真琴",
        "reviewerRole": "Qualia デオドラント専門家",
        "summaryKeyPoints": ["ニオイ垢を絡め取る", "クレンジング液たっぷり", "足・ワキの局所ケアに最適"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["ビオレZ ディープクリアシート", "足のニオイ シート", "ワキのニオイ 拭き取り"],
        "faqs": [
            {"question": "全身にも使えますか？", "answer": "使用可能ですが、シートが少し小さめで液がたっぷりしているため、全身をサラサラにする目的よりも、首すじ・胸元・ワキ・足などニオイが気になる部位にピンポイントで使うのに適しています。"}
        ]
    },
    {
        "id": "art-bodysheet-08",
        "title": "【大判で高コスパ】無印良品 汗ふきシート｜シンプルイズベストな日常使い",
        "itemCode": "muji-sheet",
        "productName": "無印良品 汗ふきシート シトラスの香り",
        "category": "bodycare",
        "categoryLabel": "ボディケア・デイリー",
        "imageUrl": "/images/products/muji_sheet.jpg",
        "starRating": 4.3,
        "reviewCount": 650,
        "introText": "無印良品らしい無駄のないシンプルなパッケージ。大判で破れにくいシートと、精油由来の自然なシトラスの香りが日常使いにぴったりです。",
        "features": ["厚手で大判のシート", "合成香料無添加（天然精油の香り）", "パラベンフリー", "シンプルなデザイン"],
        "pros": ["パッケージがシンプルでバッグの中で悪目立ちしない", "天然精油の香りが人工的でなく心地よい", "1枚でしっかり拭ける大判サイズ"],
        "cons": ["冷感やサラサラ感は控えめ", "香りの持続性はほぼない"],
        "reviewBody": "## 大人が持ち歩きやすい、シンプルで上質なシート\n\nドラッグストアのボディシートは派手なパッケージが多くて持ち歩きにくい…という方に人気なのが、無印良品の「汗ふきシート」です。\n\n### おすすめポイント：天然精油の自然な香り\n最大の魅力は、合成香料を使わず、オレンジ果皮油やレモン果皮油などの**天然精油で香り付けされている点**。人工的な甘い香りや強いメントール臭がなく、アロマのような自然で爽やかなシトラスの香りに癒やされます。\n\n### 機能性も十分\nシートは厚手で大判サイズになっており、1枚で首元から腕、背中までしっかりと拭き取ることができます。強い冷感やパウダーのサラサラ感といった派手な機能はありませんが、「汗をスッキリ拭き取って、自然な香りでリフレッシュする」という基本機能を実直に満たしてくれる、大人のための日常使いシートです。",
        "ctaTitle": "楽天市場で無印良品のシートをチェック",
        "rakutenPrice": "390円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 8500,
        "clicks": 600,
        "earnings": 2400,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": False,
        "verificationDays": 7,
        "reviewerName": "瀬戸 凜",
        "reviewerRole": "Qualia ライフスタイル担当",
        "summaryKeyPoints": ["天然精油の自然な香り", "シンプルパッケージ", "大判で拭きやすい"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["無印良品 汗ふきシート", "天然精油 ボディシート", "シンプル 汗拭きシート"],
        "faqs": [
            {"question": "肌が白くなる成分（パウダー）は入っていますか？", "answer": "パウダー無配合のため、拭いた後に服が白くなったり、肌にきしみ感が出たりすることはありません。自然なサッパリ感が特徴です。"}
        ]
    },
    {
        "id": "art-bodysheet-09",
        "title": "【ディズニーデザイン】マンダム ハッピーデオ ボディシート｜持ってるだけで気分が上がる",
        "itemCode": "happydeo-sheet",
        "productName": "マンダム ハッピーデオ ボディシート うるサラ 花せっけんの香り",
        "category": "bodycare",
        "categoryLabel": "ボディケア・フレグランス",
        "imageUrl": "/images/products/happydeo.jpg",
        "starRating": 4.5,
        "reviewCount": 1100,
        "introText": "ミニーマウスなどのディズニーキャラクターが描かれた可愛いパッケージが目印。見た目の可愛さだけでなく、うるおい成分とサラサラパウダーの絶妙なバランスが秀逸です。",
        "features": ["可愛いディズニーパッケージ", "ボタニカルマイクロパウダー配合（白くならない）", "うるおい成分配合", "優しく香る花せっけん"],
        "pros": ["パッケージが可愛くて持ち歩くのが楽しい", "パウダーインなのに白残りせず肌がスベスベに", "女の子らしい優しい香り"],
        "cons": ["男性には可愛すぎるパッケージ", "極寒レベルの冷感はない"],
        "reviewBody": "## 気分もアガる！可愛い＆高機能な優秀シート\n\nポーチに入っているだけでテンションが上がる、ディズニーデザインが特徴のマンダム「ハッピーデオ」。しかし、その魅力は見た目だけではありません。\n\n### おすすめポイント：うるサラな絶妙な仕上がり\n「うるサラ」という名前の通り、うるおい成分（植物エキス）で肌を保湿しながら、ボタニカルマイクロパウダーが**白残りせずに肌をスベスベ**にしてくれます。エアコンの効いた室内で汗を拭いても、肌が乾燥してつっぱる感じがありません。\n\n### 女の子らしい清楚な香り\n「花せっけんの香り」は、石鹸の清潔感にフローラルの甘さを少し足したような、シャンプーのような清楚な香り。強すぎず、周りの人に「いい匂い」と思わせる絶妙なバランスです。学校やオフィスでのエチケットシートとして、可愛さと実用性を兼ね備えたアイテムです。",
        "ctaTitle": "楽天市場で可愛いパッケージをチェック",
        "rakutenPrice": "440円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 10500,
        "clicks": 800,
        "earnings": 3200,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": False,
        "verificationDays": 10,
        "reviewerName": "小野寺 あかり",
        "reviewerRole": "Qualia トレンドメイク・雑貨担当",
        "summaryKeyPoints": ["可愛いディズニーデザイン", "白くならないパウダー", "清楚な花せっけんの香り"],
        "priceRange": "プチプラ",
        "buyIntentKeywords": ["ハッピーデオ ボディシート", "ディズニー 汗拭きシート", "花せっけん ボディシート"],
        "faqs": [
            {"question": "冷感タイプもありますか？", "answer": "はい、ハッピーデオシリーズには「極氷冷」という強いクール感に特化したラインナップ（ミッキーやデイジーデザインなど）もあります。用途に合わせて選べます。"}
        ]
    },
    {
        "id": "art-bodysheet-10",
        "title": "【超爽快デパコス】ハウスオブローゼ ミントリープ クール ボディシート｜天然ミントの極上クーリング",
        "itemCode": "houseofrose-mint",
        "productName": "ハウスオブローゼ ミントリープ クール ボディシート",
        "category": "bodycare",
        "categoryLabel": "デパコス・ボディケア",
        "imageUrl": "/images/products/houseofrose.jpg",
        "starRating": 4.8,
        "reviewCount": 320,
        "introText": "毎年夏限定で登場し、熱狂的なファンを持つ「ミントリープ」シリーズ。天然ミント精油のクリアな香りと、突き抜けるような極上のクール感が味わえます。",
        "features": ["天然ハッカ油（ミント精油）配合", "メントール配合の強いクール感", "保湿成分（レモン果実エキス等）配合", "パウダーフリーで白くならない"],
        "pros": ["天然ミントの香りが本物志向で最高にリフレッシュできる", "強い冷感が持続し、汗が引く", "パウダーフリーなのにベタつかない"],
        "cons": ["夏期限定販売のため冬は買えない", "ドラッグストアのものより少し高価"],
        "reviewBody": "## 夏限定！天然ミントの極上クーリング体験\n\nハウスオブローゼから毎年夏限定で発売される「ミントリープ」シリーズのボディシートは、美容好きの間で「夏の風物詩」としてまとめ買いされるほどの人気アイテムです。\n\n### おすすめポイント：本物のミントの香り\n人工的なミント臭ではなく、天然ハッカ油をはじめとする9種の天然精油をブレンドした、**突き抜けるようにクリアで爽快な香り**が最大の特徴。拭いた瞬間に鼻に抜ける爽やかな香りで、夏の暑さによるイライラや疲労感まで吹き飛びます。\n\n### 大人が満足する極上の冷感\nメントールによるクール感はかなり強めですが、保湿成分が配合されているため肌への刺激はまろやか。パウダーフリーなので黒い服を着ていても安心です。猛暑日の外出先で、質の高いリフレッシュタイムを確約してくれる、大人のためのプレミアムなボディシートです。",
        "ctaTitle": "楽天市場で極上ミントの冷感をチェック",
        "rakutenPrice": "660円〜",
        "createdAt": "2026-07-25",
        "estimatedPV": 9000,
        "clicks": 750,
        "earnings": 4500,
        "aiModelUsed": "Qualia Editorial Engine",
        "isHallOfFame": True,
        "verificationDays": 14,
        "reviewerName": "望月 陽菜",
        "reviewerRole": "Qualia オーガニック・ナチュラル担当",
        "summaryKeyPoints": ["天然ミント精油の香り", "極上のクール感", "夏限定の人気アイテム"],
        "priceRange": "ミドル",
        "buyIntentKeywords": ["ハウスオブローゼ ミントリープ シート", "天然ミント ボディシート", "高級 冷感シート"],
        "faqs": [
            {"question": "冬でも買えますか？", "answer": "原則として春夏限定のシリーズとなるため、在庫がなくなり次第終了となります。毎年春頃に発売開始されます。"}
        ]
    }
]

# 2. 記事の追加 (articles.json)
json_path = 'src/data/articles.json'
with open(json_path, 'r', encoding='utf-8') as f:
    articles_data = json.load(f)

# ID重複を避けるための処理
existing_ids = {art['id'] for art in articles_data}
for prod in products:
    # URLエンコードした商品名をアフィリエイトリンクに組み込む
    encoded_name = urllib.parse.quote(prod['productName'])
    prod['affiliateLink'] = f"https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F{encoded_name}%2F"
    if prod['id'] not in existing_ids:
        articles_data.insert(0, prod)  # 先頭に追加

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(articles_data, f, ensure_ascii=False, indent=2)

print(f"✅ added {len(products)} products to articles.json")

# 3. ブログ特集記事 (data.ts の INITIAL_BLOG_POSTS に追加)
blog_post = {
    "id": "blog-bodysheet-summer-2026",
    "slug": "bodysheet-summer-2026",
    "title": "【2026年最新】汗のベタつき・ニオイを即リセット！本当におすすめのボディシート（汗拭きシート）厳選10選",
    "subtitle": "冷感、香水級の香り、敏感肌向けからニオイ特化まで、用途別最強シートを美容アナリストが徹底比較。",
    "targetGender": "unisex",
    "coverImage": "/images/products/biore_sheet.jpg",
    "authorId": "author-matsumoto",
    "authorName": "松本 結衣",
    "authorRole": "Qualia ボディケアアナリスト",
    "authorAvatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    "createdAt": "2026-07-25",
    "readTimeMinutes": 7,
    "introText": "猛暑が続く夏の必須アイテム「ボディシート（汗拭きシート）」。ドラッグストアには数え切れないほどの種類が並んでいますが、「どれを買えばいいかわからない」「服が白くなるのが嫌」「もっといい香りのものが欲しい」と悩んでいませんか？今回は、Qualia美容分析室が定番からデパコス級まで、実際に試して選んだ【最強ボディシート10選】を目的別にご紹介します！",
    "recommendedItemCodes": [prod["itemCode"] for prod in products],
    "isHallOfFame": True,
    "contentMarkdown": """## なぜ「ボディシート選び」が重要なのか？

夏の不快な汗のベタつきやニオイ。外出先でシャワーを浴びられない時に、私たちの救世主となってくれるのが**ボディシート（汗拭きシート）**です。

しかし、自分の用途に合っていないシートを選んでしまうと、以下のような失敗を招くことも。

- **黒い服が真っ白になってしまった（パウダーの残り）**
- **アルコール刺激が強すぎて肌がヒリヒリ赤くなった**
- **香りが強すぎて、自分の香水と混ざって変なニオイに…**

そこで今回は、成分や使用感、香りのベクトルが異なる**10種類の優秀なボディシート**を厳選しました。あなたのライフスタイルや肌質に最適な1枚が必ず見つかります！

---

## 目的別！おすすめボディシートの選び方

### 1. とにかく「サラサラ感」を重視したい
服が肌に張り付くのが不快な方は、**パウダー配合タイプ**がおすすめ。最近は「透明パウダー」を採用し、服が白くならない優秀なアイテムが増えています。
👉 おすすめ：[ビオレ さらさらパウダーシート](/articles/art-bodysheet-01)、[マンダム ハッピーデオ](/articles/art-bodysheet-09)

### 2. 猛暑を乗り切る「強冷感」が欲しい
スポーツ後や外回りが多い方は、**メントール高配合の氷冷タイプ**を。拭いた瞬間だけでなく、風に当たるたびに涼しさを感じられます。
👉 おすすめ：[ギャツビー アイスデオドラント](/articles/art-bodysheet-02)、[ハウスオブローゼ ミントリープ](/articles/art-bodysheet-10)

### 3. 絶対に「ニオイ」をさせたくない
ワキや足のニオイが心配な方は、香りでごまかすのではなく**「殺菌有効成分」や「クレンジング液」が含まれたタイプ**を選びましょう。
👉 おすすめ：[エージーデオ24 無香料](/articles/art-bodysheet-03)、[ビオレZ ディープクリア](/articles/art-bodysheet-07)

### 4. 敏感肌で「肌荒れ」しやすい
アルコール（エタノール）で肌が赤くなる方は、**アルコールフリー処方やセラミドなどの保湿成分**が配合されたスキンケア発想のシートが安心です。
👉 おすすめ：[キュレル スキンケアシート](/articles/art-bodysheet-05)

### 5. 「上質な香り」でリフレッシュしたい
シート特有のアルコール臭が苦手な方には、**天然精油配合や、香水のように香るデパコス級アイテム**がおすすめです。
👉 おすすめ：[SABON リフレッシング ワイプス](/articles/art-bodysheet-04)、[無印良品 汗ふきシート](/articles/art-bodysheet-08)

---

## まとめ：今年の夏を快適に過ごす相棒を見つけよう

ボディシートは、用途に合わせて**「2種類持ち」**するのも賢いテクニックです。
例えば、「朝の通勤後はしっかり冷感のギャツビー」を使い、「夕方のデート前は上品に香るSABON」を使うなど、シーンで使い分けることで夏の不快指数はグッと下がります。

今回ご紹介した10アイテムは、どれもQualia美容分析室が自信を持っておすすめできる名品ばかり。ぜひ気になったアイテムを取り入れて、今年の猛暑を爽やかに乗り切ってくださいね！
"""
}

# data.tsのINITIAL_BLOG_POSTSに挿入
ts_path = 'src/data.ts'
with open(ts_path, 'r', encoding='utf-8') as f:
    ts_lines = f.readlines()

new_lines = []
in_blog_posts = False
for line in ts_lines:
    if 'export const INITIAL_BLOG_POSTS: BlogPost[] = [' in line:
        new_lines.append(line)
        
        # Insert the new blog post right after the opening bracket
        blog_str = f"""  {{
    id: '{blog_post["id"]}',
    slug: '{blog_post["slug"]}',
    title: '{blog_post["title"]}',
    subtitle: '{blog_post["subtitle"]}',
    targetGender: '{blog_post["targetGender"]}',
    coverImage: '{blog_post["coverImage"]}',
    authorId: '{blog_post["authorId"]}',
    authorName: '{blog_post["authorName"]}',
    authorRole: '{blog_post["authorRole"]}',
    authorAvatar: '{blog_post["authorAvatar"]}',
    createdAt: '{blog_post["createdAt"]}',
    readTimeMinutes: {blog_post["readTimeMinutes"]},
    introText: '{blog_post["introText"]}',
    recommendedItemCodes: {json.dumps(blog_post["recommendedItemCodes"])},
    isHallOfFame: {'true' if blog_post["isHallOfFame"] else 'false'},
    contentMarkdown: `{blog_post["contentMarkdown"]}`
  }},
"""
        new_lines.append(blog_str)
        continue
    
    new_lines.append(line)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ added blog post to src/data.ts")
