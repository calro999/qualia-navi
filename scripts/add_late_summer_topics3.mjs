import fs from 'fs';

const lateSummerTopics3 = [
  `  - id: topic-skincare-medicube-zeroporepad
    category: skincare
    keyword: "メディキューブ ゼロ毛穴パッド"
    title_template: "【拭き取るだけで毛穴消えるとTikTokで大バズり】{product_name} 8-9月の角栓・引き締め神トナーパッド"
    target_audience: "夏終わりの毛穴の開き・皮脂トラブル・角栓をスッキリケアしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-anua-peachserum
    category: skincare
    keyword: "Anua 桃70％ナイアシンセラム"
    title_template: "【つるつるの桃肌になるとバズり中】{product_name} 透明感爆上がりの白玉美容液"
    target_audience: "夏の紫外線を浴びてくすんだ肌に透明感とツヤを与えたい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-vt-pdrnessence
    category: skincare
    keyword: "VT PDRNエッセンス"
    title_template: "【韓国で話題沸騰のバズり美容液】{product_name} 水光肌のようなハリとツヤがヤバいと絶賛"
    target_audience: "夏終わりの肌疲労やエイジングサインに濃密アプローチしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-tirtir-crystalcushion
    category: makeup
    keyword: "TIRTIR マスクフィット クリスタル メッシュクッション"
    title_template: "【神ツヤ美肌になれると話題】{product_name} メッシュ構造で薄づきなのに崩れないクッション"
    target_audience: "猛暑でも崩れず澄んだ透明ツヤ肌をキープしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-makeup-wakemake-eyepalette
    category: makeup
    keyword: "WAKEMAKE ソフトブラーリング アイパレット"
    title_template: "【16色入って捨て色なしとバズり中】{product_name} 秋先取りメイクもこれ1個で完璧に盛れる"
    target_audience: "自分に合うグラデーションカラーで垢抜け目元を作りたい方"
    is_hall_of_fame: true`,

  `  - id: topic-lip-fwee-puddingpot
    category: lip
    keyword: "fwee リップアンドチーク ブラーパンディングポット"
    title_template: "【むにゅっと質感が可愛すぎるとバズり中】{product_name} リップもチークもこれ1個で統一感優勝"
    target_audience: "韓国トレンドのふんわり粘膜リップ＆チークを楽しみたい方"
    is_hall_of_fame: true`,

  `  - id: topic-suncare-biore-uvmist
    category: suncare
    keyword: "ビオレUV アクアリッチ エアリーホールドミスト"
    title_template: "【服や髪の上からでもシュッとできて焼けない】{product_name} 8-9月の塗り直し神日焼け止めミスト"
    target_audience: "外出先でメイクを崩さず手軽に紫外線対策をしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-hair-pluseau-pointrepair
    category: haircare
    keyword: "プリュスオー ポイントリペア"
    title_template: "【アホ毛が一瞬で消えると大バズり】{product_name} 持ち歩き必須のまとめ髪マスカラ"
    target_audience: "湿気や汗で浮き出るアホ毛や前髪の乱れを秒で直したい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-pelican-hipsoap
    category: bodycare
    keyword: "ペリカン石鹸 恋するおしり ヒップケアソープ"
    title_template: "【ツルツルお尻になるとSNSバズり中】{product_name} ピーリング石鹸でザラつき一網打尽"
    target_audience: "おしりや太ももの黒ずみ・ザラつきをすべすべに整えたい方"
    is_hall_of_fame: true`,

  `  - id: topic-skincare-qualys-dermalaser
    category: skincare
    keyword: "ダーマレーザー VC100 マスク"
    title_template: "【シートマスク界の最高峰と大バズり】{product_name} 毛穴がキュッと引き締まる濃密ビタミンCパック"
    target_audience: "日焼け後の集中保湿と毛穴ケアを圧倒的コスパで叶えたい方"
    is_hall_of_fame: true`
];

function addLateSummerTopics3() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const updatedContent = content.trim() + '\n\n' + lateSummerTopics3.join('\n\n') + '\n';

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('8-9月に使いたいSNSバズコスメ第3弾10商品を articles.yml に追加しました。');
}

addLateSummerTopics3();
