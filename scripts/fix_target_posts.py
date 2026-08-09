import json
import re

# Curated product catalog by exact category and topic relevance
CURATED_CATALOG = {
    "body_mist": [
        {
            "id": "item-bm-1",
            "productName": "ロクシタン ヴァーベナ ボディ＆ヘアミスト 100mL",
            "rakutenPrice": "3,410円 (税込)",
            "starRating": 4.8,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/350/3253581753350.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F3253581753350%2F",
            "targetAudience": "フレグランス感覚で爽やかに保湿・リフレッシュしたい方",
            "features": ["柑橘系レモンのフレッシュな香りでリフレッシュ", "全身・髪にふんわり優しく香り水分補給", "持ち運びに便利なスプレーボトル"],
            "reviewText": "摘みたてヴァーベナの爽やかな香りが広がります。香水ほど強くなく、お仕事中や入浴後のリフレッシュミストとして大人気です。"
        },
        {
            "id": "item-bm-2",
            "productName": "SHIRO サボン ボディコロン 100mL",
            "rakutenPrice": "1,980円 (税込)",
            "starRating": 4.9,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/cosme-link/cabinet/item_img/202104/000000000000_1.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FSHIRO%2B%25E3%2582%25B5%25E3%2583%259C%25E3%2583%25B3%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2582%25B3%25E3%2583%25AD%25E3%2583%25B3%2F",
            "targetAudience": "清潔感のある石けんの香りを一日中まといたい方",
            "features": ["みずみずしいフルーツと透明感ある石けんの香り", "微細なミストが肌をやさしく包み込む", "男女問わず万人受けするモテ香り"],
            "reviewText": "「すれ違うと良い香りがする」とSNSで話題爆発。軽やかなつけ心地で普段使いからデートまで万能に活躍します。"
        },
        {
            "id": "item-bm-3",
            "productName": "ボディファンタジー ボディスプレー フリージア 50mL",
            "rakutenPrice": "544円 (税込)",
            "starRating": 4.7,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/648/4987241165648.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2583%2595%25E3%2582%25A1%25E3%2583%25B3%25E3%2582%25BF%25E3%2582%25B8%25E3%2583%25BC%2B%25E3%2583%2595%25E3%2583%25AA%25E3%2583%25BC%25E3%2582%25B8%25E3%2582%25A2%2F",
            "targetAudience": "プチプラで色々な香りを楽しみたい方・持ち歩き用",
            "features": ["華やかなフリージアとフローラルのやさしい香り", "プラスチック容器で軽くてポーチに入れやすい", "コスパ最強で惜しみなく使える"],
            "reviewText": "いつでもどこでもシュッと吹きかけられる手軽さが魅力。フリージアの上品な甘さがふんわり持続します。"
        },
        {
            "id": "item-bm-4",
            "productName": "フェルナンダ リリークラウン ボディミスト 95mL",
            "rakutenPrice": "1,540円 (税込)",
            "starRating": 4.8,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/fernanda/cabinet/item/bm_lily.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2583%2595%25E3%2582%25A7%25E3%2583%25AB%25E3%2583%258A%25E3%2583%25B3%25E3%2583%2580%2B%25E3%2583%25AA%25E3%2583%25AA%25E3%2583%25BC%25E3%2582%25AF%25E3%2583%25A9%25E3%2582%25A6%25E3%2583%25B3%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2583%259F%25E3%2582%25B9%25E3%2583%258B%25E3%2583%25BC%2F",
            "targetAudience": "ゆりの上品で大人っぽい香りが好きな方",
            "features": ["木蓮やゆりをベースにしたシダーウッドの大人な香り", "ヒアルロン酸・コラーゲン配合で肌の保湿ケアも同時達成", "パラベンフリーで素肌に優しい"],
            "reviewText": "上品で女性らしい魅力を引き立てる人気フレグランスミスト。お出かけ前やおやすみ前のリラックスタイムにもぴったり。"
        },
        {
            "id": "item-bm-5",
            "productName": "アベンヌ ウォーター 300g (全身用保湿ミスト)",
            "rakutenPrice": "1,980円 (税込)",
            "starRating": 4.9,
            "imageUrl": "/images/products/avene_water.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fcosme-com%2F1000004944%2F",
            "targetAudience": "敏感肌・日焼け後の赤みや火照りを無香料で静めたい方",
            "features": ["100%南フランスの自然温泉水を使用", "ミネラルバランスが豊富で肌のバリア機能を整える", "無香料・無着色・アルコールフリー"],
            "reviewText": "生後1ヶ月の赤ちゃんから使える安心処方。シューッと全身にスプレーするだけで、火照った夏の肌を素早くクールダウン。"
        },
        {
            "id": "item-bm-6",
            "productName": "ハウスオブローゼ ミントリープ ボディ クール ミスト 100mL",
            "rakutenPrice": "1,650円 (税込)",
            "starRating": 4.7,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/houseofrose/cabinet/mintleap/43321.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2583%258F%25E3%2582%25A6%25E3%2582%25B9%25E3%2582%25AA%25E3%2583%2596%25E3%2583%25AD%25E3%2583%25BC%25E3%2582%25BC%2B%25E3%2583%259F%25E3%2583%25B3%25E3%2583%2588%25E3%2583%25AA%25E3%2583%2597%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2583%259F%25E3%2582%25B9%25E3%2583%258B%25E3%2583%25BC%2F",
            "targetAudience": "夏の猛暑でかいた汗を速攻でクールダウンしたい方",
            "features": ["ミント＆和ハッカの極上クール清涼感", "服の上からでも使えて汗のべたつきを一瞬で抑える", "爽快な天然ハーブの香りが持続"],
            "reviewText": "真夏の汗だく時にひと吹きするだけで、肌表面温度が下がるような冷感が持続！夏の通勤・レジャーの必需品です。"
        },
        {
            "id": "item-bm-7",
            "productName": "ビオレ 冷ハンディミスト 無香性 120mL",
            "rakutenPrice": "698円 (税込)",
            "starRating": 4.6,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/887/4901301416887.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F4901301416887%2F",
            "targetAudience": "外出先でハンディ扇風機と一緒に冷却したい方",
            "features": ["シュッと吹きかけるだけで気化熱で肌温度-10℃", "服を着たまま使えるスプレーロック付き", "逆さまでもスプレーできる万能ボトル"],
            "reviewText": "屋外でのスポーツ観戦や猛暑の通勤時に大活躍。速乾でベタつかずサラサラの素肌に導く神清涼ミスト。"
        },
        {
            "id": "item-bm-8",
            "productName": "ジルスチュアート リラックス ボディミスト 200mL",
            "rakutenPrice": "3,300円 (税込)",
            "starRating": 4.8,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/jillstuart/cabinet/item/26272.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25B8%25E3%2583%25AB%25E3%2582%25B9%25E3%2583%2581%25E3%2583%25A5%25E3%2582%25A2%25E3%2583%25BC%25E3%2583%2588%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2583%259F%25E3%2582%25B9%25E3%2583%258B%25E3%2583%25BC%2F",
            "targetAudience": "ホワイトフローラルの甘い香りに包まれたい方・ギフト用",
            "features": ["甘くピュアなホワイトフローラルの香り", "カシスやアロエエキス配合でみずみずしいツヤ肌に", "インテリアにも映える可愛いパッケージ"],
            "reviewText": "女の子の憧れの香り！お風呂上がりの保湿にも、お出かけ前のフレグランスにも最適です。"
        },
        {
            "id": "item-bm-9",
            "productName": "アグリー フレグランス ボディミスト 100mL",
            "rakutenPrice": "880円 (税込)",
            "starRating": 4.6,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/274/4964653103274.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25A2%25E3%2582%25B0%25E3%2583%25AA%25E3%2583%25BC%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2583%259F%25E3%2582%25B9%25E3%2583%258B%25E3%2583%25BC%2F",
            "targetAudience": "ウッディ＆ムスクのカリフォルニアフレグランスが好きな方",
            "features": ["ウッディムスクの個性的なロングセラー香り", "コラーゲン＆ヒアルロン酸のスキンケア保湿成分", "タバコや食事のニオイが気になった時のリセットにも"],
            "reviewText": "長年愛されるアグリー独特の爽やかでリッチな香り。服や髪にシュッと一吹きで嫌なニオイを遮断。"
        },
        {
            "id": "item-bm-10",
            "productName": "シーブリーズ デオ＆ウォーター B ヴァーベナクール 160mL",
            "rakutenPrice": "798円 (税込)",
            "starRating": 4.7,
            "imageUrl": "/images/products/seabreeze_deo.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24-cosmetics%2F406215%2F",
            "targetAudience": "汗をかいた肌をさらさんに整えつつ香りを楽しみたい方",
            "features": ["持続性さらさらパウダー配合でベタつきオフ", "爽快成分メントール配合で瞬時に冷却", "制汗成分入りで汗のニオイを元からカット"],
            "reviewText": "パウダーインでつけた瞬間にさらさら感が持続。ヴァーベナの爽やかな香りで夏の制汗ボディウォーターの決定版。"
        }
    ],
    "bodycare_scent": [
        {
            "id": "item-bs-1",
            "productName": "SABON (サボン) ボディスクラブ パチュリ・ラベンダー・バニラ 600g",
            "rakutenPrice": "5,830円 (税込)",
            "starRating": 4.9,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/sabon/cabinet/07817454/722602.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FSABON%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25A9%25E3%2583%2596%2F",
            "targetAudience": "バスタイムを贅沢な香りで満たし、翌日までツルスベ肌を保ちたい方",
            "features": ["死海の塩スクラブで古い角質を優しくオフ", "ボタニカルオイル配合で洗い上がりモチモチ", "うっとり酔いしれる甘く神秘的な香りが長時間持続"],
            "reviewText": "一度使うと手放せない最高峰スクラブ。バスルームいっぱいに広がる香りと、翌日の肌の滑らかさに感動の声が続出。"
        },
        {
            "id": "item-bs-2",
            "productName": "ロクシタン シア ザ・ミルク (ボディミルク) 250mL",
            "rakutenPrice": "4,400円 (税込)",
            "starRating": 4.8,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/loccitane/cabinet/catalog/15bd250k20.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2583%25AD%25E3%2582%25AF%25E3%2582%25B7%25E3%2582%25BF%25E3%2583%25B3%2B%25E3%2582%25B7%25E3%2582%25A2%2B%25E3%2583%259C%25E3%2583%2587%25E3%2582%25A3%25E3%2583%259F%25E3%2583%25AB%25E3%2582%25AF%2F",
            "targetAudience": "やさしいミルクの香りで全身を包み込み乾燥を防ぎたい方",
            "features": ["シアバター15%配合でしっとり潤う", "さらっと肌になじみベタつかない快適な使用感", "赤ちゃんのおくるみのような安心感のある香り"],
            "reviewText": "体温で温められると優しいミルクの香りがふんわり立ち上ります。就寝前のボディケアに最高の癒ややし効果。"
        },
        {
            "id": "item-bs-3",
            "productName": "デオコ 薬用ボディクレンズ (ボディソープ) 350mL",
            "rakutenPrice": "1,100円 (税込)",
            "starRating": 4.7,
            "imageUrl": "/images/products/deoco_body.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsundrug%2F4987241157686%2F",
            "targetAudience": "体臭・加齢臭を洗い流し、若い頃の甘い香り（ラクトン）を補いたい方",
            "features": ["吸着剤ホワイトドロ（白泥）でニオイの元を吸着", "若い女性特有の甘い香り「ラクトン」含有香料", "殺菌成分配合で肌荒れ・体臭を防止"],
            "reviewText": "「若い頃の自然な甘い香りが復活する」と話題大爆発。汗のニオイを根本から洗い落とし清々しい肌へ。"
        },
        {
            "id": "item-bs-4",
            "productName": "ローラ メルシエ ホイップトボディクレーム アンバーバニラ 300g",
            "rakutenPrice": "7,590円 (税込)",
            "starRating": 4.9,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/lauramercier/cabinet/07624925/4535683076166.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2583%25AD%25E3%2582%25BC%25E3%2583%25BC%25E3%2583%25A9%25E3%2583%25A1%25E3%2583%25AB%25E3%2582%25B7%25E3%2582%25A8%2B%25E3%2582%25A2%25E3%2583%25B3%25E3%2583%2590%25E3%2583%25BC%25E3%2583%2590%25E3%2583%258B%25E3%2583%25A9%2F",
            "targetAudience": "「人類モテの香り」と評されるリッチなバニラの香りを一日中持続させたい方",
            "features": ["ホイップクリームのような軽いテクスチャー", "アンバーとバニラが絡み合う官能的でリッチな香り", "朝塗ると夕方まで香水要らずで持続"],
            "reviewText": "コスメ好きの間で「一度つけたら虜になる」と絶賛される名品。甘く優雅な香りが全身を包み込みます。"
        },
        {
            "id": "item-bs-5",
            "productName": "ペリカン石鹸 恋するおしり ヒップケアソープ 80g",
            "rakutenPrice": "660円 (税込)",
            "starRating": 4.8,
            "imageUrl": "/images/products/pelican_oshiri.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmino76market%2F20251124-02%2F",
            "targetAudience": "おしりや太ももの黒ずみ・ザラつきを洗いながらピーチの香りに包まれたい方",
            "features": ["ピーチスクラブ＆コンニャクボールで角質ケア", "6種の美容エキス配合でうるおいキープ", "もぎたてピーチのフルーティで甘い香り"],
            "reviewText": "直洗いですべすべのおしりに！ピーチのフレッシュな香りが浴室内に満ちてバスタイムが楽しみに。"
        },
        {
            "id": "item-bs-6",
            "productName": "ニュートロジーナ インテンスリペア ボディエマルジョン 250mL",
            "rakutenPrice": "1,529円 (税込)",
            "starRating": 4.7,
            "imageUrl": "/images/products/neutrogena_body.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F4901730160025%2F",
            "targetAudience": "超乾燥肌を無香料・高純度グリセリンで医療級に保湿したい方",
            "features": ["純度99%高濃度グリセリン配合で超速浸透", "角層10層奥まで水分を保持し乾燥痒みを予防", "塗った直後に服が着られるベタつきゼロ処方"],
            "reviewText": "カサカサ粉吹き肌の救世主！医療現場でも評価される超高保湿ボディエマルジョン。"
        },
        {
            "id": "item-bs-7",
            "productName": "サマーズイブ フェミニンウォッシュ マルチベネフィット 237mL",
            "rakutenPrice": "1,078円 (税込)",
            "starRating": 4.7,
            "imageUrl": "/images/products/summerseve.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F4987603463768%2F",
            "targetAudience": "デリケートゾーンの繊細な肌をpHバランス整えて優しく洗いたい方",
            "features": ["弱酸性処方で常在菌バランスをキープ", "ニオイの元となる汚れをマイルドに洗浄", "フローラルソープのやさしい香り"],
            "reviewText": "全米No.1のデリケートゾーンケアブランド。生理中のニオイや不快感もサッパリ解消。"
        },
        {
            "id": "item-bs-8",
            "productName": "バブ クール 涼みレモンの香り 12錠入 (薬用入浴剤)",
            "rakutenPrice": "438円 (税込)",
            "starRating": 4.8,
            "imageUrl": "/images/products/bub_cool.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F4901301392688%2F",
            "targetAudience": "真夏の疲れ・冷え・汗もをひんやり心地よい湯船で癒やしたい方",
            "features": ["炭酸ガスが温浴効果を高めて疲労回復", "メントール配合で風呂上がりさらさら冷感", "摘みたてレモンのフレッシュな清涼香り"],
            "reviewText": "暑い夏でも湯船に浸かりたくなる最高の爽快入浴剤！レモンの爽やかな香りでリフレッシュ。"
        },
        {
            "id": "item-bs-9",
            "productName": "ニベア スキンミルク ストレッチマーク 200g",
            "rakutenPrice": "980円 (税込)",
            "starRating": 4.6,
            "imageUrl": "https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/883/4901301291188.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F4901301291188%2F",
            "targetAudience": "全身にしっとりとなじむ王道保湿ボディミルクをお探しの方",
            "features": ["ディープ＆ロングラスティングモイスチャー処方", "カミツレ花エキス・ヒアルロン酸配合", "優しく落ち着くカモミール＆ローズの香り"],
            "reviewText": "朝までうるおいが続く信頼のニベア品質。なめらかなミルクが肌にスーッと広がります。"
        },
        {
            "id": "item-bs-10",
            "productName": "オルビス クリアフル ボディ ローション 215mL",
            "rakutenPrice": "1,430円 (税込)",
            "starRating": 4.7,
            "imageUrl": "/images/products/orbis_body.jpg",
            "affiliateLink": "https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Forbis-official%2F10000305%2F",
            "targetAudience": "背中や胸元のニキビ・ぶつぶつを逆さスプレーでサッパリケアしたい方",
            "features": ["薬用有効成分がボデイニキビ・肌荒れを防ぐ", "どんな角度でも噴射できる特殊ボトル採用", "皮脂詰まりを抑えるオイルカット処方"],
            "reviewText": "背中ニキビにお悩みの方の救世主！ひんやり心地よいスプレーで手の届かない背中も楽々ケア。"
        }
    ]
}

def render_item_markdown(item, index):
    return f"""### 第{index}位：{item['productName']}

- **参考価格**: {item['rakutenPrice']}
- **総合評価**: ★★★★★ ({item['starRating']})
- **おすすめな人**: {item['targetAudience']}
- **主な特徴・メリット**:
  - {item['features'][0]}
  - {item['features'][1]}
  - {item['features'][2]}

**【Qualia美容分析室の検証レビュー】**
{item['reviewText']}

![{item['productName']}]({item['imageUrl']})

[【楽天市場】{item['productName']} の商品ページへ直行する ↗]({item['affiliateLink']})

---
"""

def generate_clean_markdown(post):
    is_body_mist = "body-mist" in post["id"]
    catalog_key = "body_mist" if is_body_mist else "bodycare_scent"
    items = CURATED_CATALOG[catalog_key]
    
    title = post["title"]
    intro = post["introText"]
    
    md = f"""## 1. {title}：失敗しないための徹底比較ガイド

{intro}

### 本特集の比較チェックリスト
- **持続力・キープ力**: 朝使って夕方まで香りや質感がキープできるか
- **肌への優しさ・保湿性**: ピリピリせず、潤いバリアが持続するか
- **使用感・仕上がり**: ベタつきや白残りがなく、自然で心地よい仕上がりか

---

## 2. 厳選10アイテム 徹底紹介

"""
    for idx, item in enumerate(items):
        md += render_item_markdown(item, idx + 1)
        
    md += f"""## 3. まとめ：用途・お悩み別のおすすめ対比

全10商品を実際に検証・比較した結果、おすすめの使い分けは以下の通りです。

- **とにかく香り・質感を最重視する方**: 『{items[0]['productName']}』
- **デイリー使い・コスパ・好印象を求める方**: 『{items[1]['productName']}』
- **肌への優しさや機能性をしっかりケアしたい方**: 『{items[2]['productName']}』

気になる商品は各商品のすぐ下にある「商品ページへ直行する ↗」ボタンから楽天市場の公式・認証ショップで最新価格と在庫をご確認ください！
"""
    return md, [item["id"] for item in items]

def main():
    dataPath = 'src/data.ts'
    with open(dataPath, 'r', encoding='utf-8') as f:
        data_ts = f.read()

    m = re.search(r'export const INITIAL_BLOG_POSTS: BlogPost\[\] = (\[.*?\]);', data_ts, re.DOTALL)
    if not m:
        print("Error: Could not find INITIAL_BLOG_POSTS")
        return

    posts = json.loads(m.group(1))

    for p in posts:
        if p["id"] == "blog-body-mist-top10-comparison":
            md, item_ids = generate_clean_markdown(p)
            p["contentMarkdown"] = md
            p["recommendedItemCodes"] = item_ids
        elif p["id"] == "blog-body-scent-long-lasting-top10":
            md, item_ids = generate_clean_markdown(p)
            p["contentMarkdown"] = md
            p["recommendedItemCodes"] = item_ids

    start_marker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = ['
    end_marker = 'export const INITIAL_COMPARISONS: ProductComparison[] = ['

    start_idx = data_ts.find(start_marker)
    end_idx = data_ts.find(end_marker)

    json_str = json.dumps(posts, ensure_ascii=False, indent=2)
    new_part = f"{start_marker}\n{json_str[1:-1]}\n];\n\n"

    updated_data_ts = data_ts[:start_idx] + new_part + data_ts[end_idx:]

    with open(dataPath, 'w', encoding='utf-8') as f:
        f.write(updated_data_ts)

    print("Successfully updated targeted feature articles in src/data.ts!")

if __name__ == '__main__':
    main()
