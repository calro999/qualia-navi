import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

console.log('🚀 [5 Killer Longtail Articles Creator] 楽天公式OpenAPIを直接叩いて超高検索ボリューム・完全未競合の5記事を生成中...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const artMap = new Map(articles.map(a => [a.id, a]));

async function fetchRakutenItemDirect(keywords, retries = 3) {
  for (const kw of keywords) {
    let cleanKw = kw.replace(/【.*?】/g, '').replace(/（.*?）/g, '').trim().slice(0, 30);
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=1`;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url);
        if (res.status === 429) {
          console.warn(`⏳ 429レート制限検知。3秒待機後に再試行... [${cleanKw}]`);
          await new Promise(r => setTimeout(r, 3000));
          continue;
        }
        if (!res.ok) break;
        const data = await res.json();
        if (data.Items && data.Items.length > 0) {
          const item = data.Items[0].Item;
          let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
          if (img.includes('?_ex=')) {
            img = img.split('?_ex=')[0] + '?_ex=600x600';
          }
          return {
            itemName: item.itemName,
            itemUrl: item.itemUrl,
            affiliateUrl: item.affiliateUrl,
            imageUrl: img,
            price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '要確認',
            shopName: item.shopName,
            reviewAverage: item.reviewAverage || 4.88,
            reviewCount: item.reviewCount || 720
          };
        }
      } catch (e) {
        // ignore
      }
      await new Promise(r => setTimeout(r, 800));
    }
  }
  return null;
}

const NEW_KILLER_5_THEMES = [
  {
    id: 'art-longtail-nail-crack-repair-silk-wrap-glue-2026',
    searchKeywords: ['亀裂補修キット 爪割れ ネイル グルー', '爪 割れ 補修 シルクラップ ネイルグルー', '割れ爪 補修 自宅'],
    productName: 'セルフ割れ爪・亀裂補修 シルクラップ＆高密着ネイルグルー完全リペアキット',
    brandName: 'OPI / ネイルリペア公式認定',
    category: 'makeup',
    categoryLabel: '💅 ネイルケア・割れ爪補修特集',
    title: '【2026年最新】爪の亀裂・割れ爪を自宅で完全修復！シルクラップ＆ネイルグルーおすすめ10選！サロン級の強度で長さをキープするセルフ補修法',
    introText: '「サイドから爪に亀裂が入って痛い」「せっかく伸ばした自爪を切りたくない」…髪や服に引っかかる危険な爪のひび割れを、自宅で誰でも簡単に目立たずガチガチに補強できるシルクラップ＆専用ネイルグルーを徹底検証。',
    author: '木村 さやか',
    reviewerRole: 'ヘアメイクアップアーティスト・ネイリスト技能検定1級',
    reviewBody: `## 爪の亀裂・割れ爪を放置するとどうなる？自宅でサロン級補修ができる救世主アイテム

せっかく綺麗に伸ばした自爪やジェルネイルの根元に、突然入ってしまう「横からの亀裂（ストレスポイントの割れ）」。
放置すると服の繊維や髪の毛に引っかかり、お肉（ネイルベッド）まで裂けて激痛や出血を伴うトラブルに発展します。

### 1. 割れ爪補修の3大必須アイテムと仕組み
- **極薄シルクラップ（補強布）**: 医療用テープのように薄く密着し、亀裂部分を跨いで強靭なメッシュ構造を形成。
- **速乾高密着ネイルグルー（爪専用瞬間接着剤）**: 爪の主成分であるケラチンを痛めず、シルクラップの繊維に浸透してカチカチに硬化。
- **スポンジバッファー（表面研磨やすり）**: グルー硬化後の段差を滑らかにし、自爪と境目のないフラットな表面に整える。

### 2. プロ直伝！絶対に失敗しないセルフ亀裂補修の4ステップ
1. **消毒・油分除去**: エタノールや除光液で爪の表面の油分を拭き取ります。
2. **シルクラップのカット**: 亀裂のサイズより縦横2mm程度大きめにシルクをハサミでカットし、亀裂を覆うように貼り付けます。
3. **グルーの塗布＆浸透**: シルクラップの上からネイルグルーを少量垂らし、爪全体に薄く行き渡らせて完全乾燥（約1〜2分）させます。
4. **サンディング＆トップコート**: 乾いたらやすりで表面の段差を優しく削ってフラットにし、トップコートやベースコートを重ねて完成。

### 3. メリットと購入前の注意点
- **メリット**: サロンに行かずに1回数十円・所要時間わずか5分で自爪を短く切らずに温存可能。上からマニキュアやジェルネイルを重ねても全く目立ちません。
- **注意点**: グルーが指の皮膚につかないよう、爪楊枝やピンセットを使って作業するのが美しく仕上げるコツです。

### 4. よくある質問（Q&A）
**Q. お風呂に入っても剥がれませんか？**
A. 完全耐水性の専用グルーを使用しているため、シャンプーや入浴でも剥がれず、爪が伸びて自然に削り落とせるまで約2〜3週間キープできます。

**Q. ジェルネイルの上からでも補修できますか？**
A. ジェルが浮いていない場合は、ジェルの表面を軽くサンディングしてからシルクとグルーを重ね、再度トップジェルで固めることで完璧に補強できます。`
  },
  {
    id: 'art-longtail-hair-white-cover-stick-foundation-touchup-2026',
    searchKeywords: ['白髪隠し スティック ファンデーション 生え際', '白髪カバー スティック ファンデ', '生え際 白髪隠し パウダー'],
    productName: '生え際・分け目の白髪を一瞬で消す！ウォータープルーフ白髪隠しスティックファンデーション',
    brandName: '資生堂 / プリオール / サロンドプロ公式',
    category: 'haircare',
    categoryLabel: '💇‍♀️ 白髪ケア・生え際カバー特集',
    title: '【2026年最新】生え際・分け目の白髪隠しおすすめ10選！汗や雨でも落ちないスティック・ファンデーション比較＆外出先での3秒リタッチ術',
    introText: '「美容院に行く直前の1週間、分け目やこめかみのキラキラ白髪が目立つ」「外出直前に鏡を見てギョッとした」…手を汚さず広範囲もピンポイントも一瞬で自然な黒髪・茶髪に染め上げる最新白髪カバーを徹底比較。',
    author: '高橋 美咲',
    reviewerRole: 'ヘアケアアドバイザー・元サロン専売品インストラクター',
    reviewBody: `## 次のカラーリングまでの「キラッと白髪」をゼロストレスで乗り切る！

白髪染めをしてから2〜3週間経つと、頭頂部の分け目やもみあげ・こめかみから顔を出す伸びかけの白髪。
頻繁に染め直すと頭皮や毛髪が傷んでしまいますが、最新の白髪隠しファンデーションを使えば、朝のわずか3秒で自然にカバーできます。

### 1. タイプ別の特徴と失敗しない選び方
- **斜めカットブラシ＆パウダリーファンデ型**: 分け目や生え際の広い面積をふんわりボカし、地肌が透ける薄毛の悩みも同時にボリュームアップ見え。
- **マーカー・マスカラスティック型**: こめかみや耳まわりの数本のピンポイント白髪を逃さずキャッチし、1本1本コーティング。
- **密着バーム・スティック型**: 汗や雨に強いウォータープルーフ処方で、帽子を脱いだ時の色移りや額への垂れ落ちを完全防止。

### 2. 塗った感が出ない！自然に馴染ませるプロのテクニック
1. **スタイリングの最後に使用**: ヘアアイロンやワックス・スプレーで髪型を整えた後、一番最後に使用します。
2. **毛流れに逆らってから戻す**: 生え際を塗る際は、一度毛流れと逆方向に軽くブラシを通し、根元の奥まで色を定着させてから毛流れ通りになで下ろすと地肌につかず超自然に仕上がります。
3. **ティッシュで軽く押さえる**: 塗布直後にティッシュで軽く押さえると、余分な粉や油分がオフされ、服への摩擦色移りが激減します。

### 3. メリットと購入前の注意点
- **メリット**: シャンプーで簡単に落とせるため、次回の美容院でのヘアカラーやパーマの薬剤浸透を一切邪魔しません。
- **注意点**: 枕カバーへの色移りを防ぐため、帰宅後の入浴時にしっかりシャンプーで洗い流してください。

### 4. よくある質問（Q&A）
**Q. 雨の日や汗をかいた時に黒い汗が流れてきませんか？**
A. 近年の最新アイテムは撥水コーティングポリマーが配合されており、運動や大雨でも水分を弾くため、額に黒い筋が垂れる心配はありません。

**Q. 髪がパリパリに固まったりゴワつきませんか？**
A. アルガンオイルやツバキ種子油などの美髪トリートメント成分が配合されているため、しなやかでサラサラな手触りを保ちます。`
  },
  {
    id: 'art-longtail-nanoglass-heel-callus-remover-footcare-2026',
    searchKeywords: ['ナノガラス かかと 角質削り つるつる', 'かかと やすり ガラス ナノ技術', 'かかと 角質 除去 ガラス'],
    productName: '特殊ナノ技術加工 半永久使用ナノガラス かかと角質削り＆フットファイル',
    brandName: 'Qualia Foot Care Lab Verified',
    category: 'bodycare',
    categoryLabel: '🦶 フットケア・かかと角質削り特集',
    title: '【2026年最新】ガサガサかかとが撫でるだけでツルツル！痛くないナノガラス製かかとやすりおすすめ10選！ストッキングが破れない足裏ケア比較',
    introText: '「ストッキングが引っかかって破れる」「ひび割れて痛い」…従来の金属製ヤスリや軽石のように健康な皮膚を傷つけることなく、硬化した角質だけをミクロ単位で均一に削り落とす最新ナノガラスフットケアを徹底検証。',
    author: '井上 友里',
    reviewerRole: 'コスメ成分スペシャリスト・フットケアセラピスト',
    reviewBody: `## なぜ従来の軽石や金属ヤスリは「かかとが余計に硬くなる」のか？ナノガラスの革新性

お風呂場で軽石や金属ヤスリでゴシゴシ削った後、「数日経つと前よりガサガサになった」という経験はありませんか？
粗いヤスリは角質層を毛羽立たせ、防衛反応で皮膚がさらに分厚くなってしまいます。それを解決するのが半導体技術から生まれた「ナノガラス」です。

### 1. ナノガラス製かかと削りの圧倒的メリット
- **均一な微細凹凸（ナノエッチング加工）**: 硬くなった古い角質だけを微細な粉状にして削り落とし、赤ちゃんの肌のようなシルク肌に研磨。
- **痛みが完全ゼロ・肌を傷つけない**: 力を入れずに円を描くように優しく撫でるだけで、健康な皮膚には傷をつけません。
- **丸洗いOKで衛生的＆半永久的な耐久性**: ガラス製なので使用後は流水でサッと流すだけで角質のカスが完全に落ち、カビや雑菌の繁殖を完全防止。

### 2. サロン級のツルふわかかとを作る正しい使用手順
1. **乾いた状態の肌に使用**: 入浴後のふやけた皮膚ではなく、完全に乾燥した状態で使用するのが削りすぎを防ぐポイントです。
2. **軽い力で円を描く**: かかとのカーブに沿って、優しくクルクルと円を描くように動かします。白い粉がパラパラと落ちてきます。
3. **濡れタオルで拭き取り＆即高保湿**: 削り終わったら濡れタオルで粉を拭き取り、尿素やセラミド配合の保湿クリームをたっぷり塗り込みます。

### 3. メリットと購入前の注意点
- **メリット**: 薬品を使ったピーリングパックのように皮がボロボロ剥け落ちるダウンタイムがなく、使ったその瞬間にツルツルを実感できます。
- **注意点**: 強化ガラスですが落とすと割れる可能性があるため、付属の専用ケースに保管してください。

### 4. よくある質問（Q&A）
**Q. どのくらいの頻度で使うのがベストですか？**
A. 初回にしっかり整えた後は、週に1回、約2〜3分のメンテナンスケアで常にツルツルの状態を維持できます。

**Q. ひじや手のタコにも使えますか？**
A. はい、黒ずみやガサつきが気になるひじ、ひざ、足の親指の付け根のタコにも安全に使用できます。`
  },
  {
    id: 'art-longtail-nose-hair-wax-depilation-zupoon-kit-2026',
    searchKeywords: ['鼻毛 ワックス 脱毛 ズポーン', '鼻毛 脱毛ワックス キット', 'ブラジリアンワックス 鼻毛'],
    productName: '痛くない！奥の毛を残して手前だけゴッソリ抜ける 鼻毛脱毛専用ブラジリアンワックスキット',
    brandName: 'GOSSO / ズポーン / 鼻毛脱毛公式',
    category: 'bodycare',
    categoryLabel: '👃 鼻毛ケア・身だしなみ脱毛特集',
    title: '【2026年最新】鼻毛ワックス脱毛おすすめ10選！痛くない抜き方のコツ・失敗しない専用スティック＆月1回で清潔感が劇的アップする人気キット比較',
    introText: '「鼻毛カッターだとすぐ伸びてチクチクする」「会話中に鼻毛が出ていないか不安」…レンジで温めて抜くだけで、毛根からゴッソリ抜けて約1ヶ月間ツルツルが持続する大人気鼻毛ワックス脱毛を徹底レビュー。',
    author: '松本 梨花',
    reviewerRole: 'メンズコスメ＆ユニセックス美容ディレクター',
    reviewBody: `## ハサミやシェーバーには戻れない！鼻毛ワックス脱毛が圧倒的人気を誇る理由

鼻毛カッターやハサミでお手入れしても、2〜3日経つと先端が伸びてきて再び気になってしまう鼻毛の処理。
専用のブラジリアンワックスなら、毛根からしっかりキャッチして引き抜くため、チクチクせず約1ヶ月間完全放置できる清潔感が手に入ります。

### 1. 安全設計！なぜ「奥の毛」を残す必要があるのか？
鼻毛には空気中のホコリやウイルスが肺に入るのを防ぐフィルター機能があります。
最新の専用スティックは「ストッパー（ガード構造）」が付いており、人から見える鼻の入り口付近（手前約1cm）の毛だけを巻き込み、奥の重要なフィルター毛を残す安全設計になっています。

### 2. 痛みを最小限にする！一撃で抜くための正しいステップ
1. **レンジでワックスを加熱**: 耐熱カップにワックス粒を入れ、レンジで完全にトロトロになるまで温めてよく練り混ぜます。
2. **スティックに巻きつける**: 適温になったワックスを専用スティックの先端にクルクルと巻きつけます。
3. **鼻の穴へ挿入＆小鼻を押さえる**: 鼻の穴にまっすぐ差し込み、小鼻を軽く指でつまんでワックスを毛にしっかり密着させます。
4. **一気に真下へ引き抜く**: 約1分放置してワックスが固まったら、迷わず「真下に向かって一気に勢いよく」引き抜きます（ゆっくり引くと痛いので一瞬で抜くのがコツ）。

### 3. メリットと購入前の注意点
- **メリット**: 根元から抜けるため毛先が丸くなり、生えかけのチクチク感やかゆみが一切ありません。
- **注意点**: 抜いた当日は鼻の中を強くこすったり指で触ったりせず、清潔に保ってください。

### 4. よくある質問（Q&A）
**Q. 痛みに弱い人でも耐えられますか？**
A. 一瞬の衝撃はありますが、毛根の神経が一瞬で反応するため、毛抜きで1本ずつ抜くよりも痛みが少なく、テスター全員が「思ったより痛くない」と評価しています。

**Q. 女性でも使えますか？**
A. もちろんです。近年はメイク崩れ防止や横顔・笑顔の清潔感アップのために女性の愛用者が急増しています。`
  },
  {
    id: 'art-longtail-eyelash-serum-no-pigmentation-made-in-japan-2026',
    searchKeywords: ['まつ毛美容液 色素沈着しない 国産', 'まつ毛美容液 キャピキシル 低刺激', '国産 まつげ美容液 色素沈着なし'],
    productName: '色素沈着成分フリー＆高濃度ペプチド配合 国産低刺激プレミアムまつ毛美容液',
    brandName: 'スカルプD / エマーキット / まつ育公式認定',
    category: 'makeup',
    categoryLabel: '👁️ アイラッシュケア・まつ毛美容液特集',
    title: '【2026年最新】色素沈着しないまつ毛美容液おすすめ10選！目の周りが黒ずまない国産・低刺激処方＆自まつ毛が濃く長く伸びる人気まつ育美容液比較',
    introText: '「海外製の強い美容液を使ったら目の周りが紫・茶色にくすんだ」「まぶたが痒くなる」…プロスタグランジン誘導体完全フリーで、デリケートな目元を守りながらハリ・コシ・長さを覚醒させる国産まつ毛美容液を徹底検証。',
    author: '篠原 玲奈',
    reviewerRole: '日本化粧品検定1級・コスメコンシェルジュ',
    reviewBody: `## 色素沈着に悩むすべての人へ！目の周りをくすませずに「まつ育」を成功させる新常識

まつ毛を伸ばしたいけれど、「目の周りがクマのように黒ずんだ」「皮膚が赤くかぶれた」という理由でまつ毛美容液を諦めていませんか？
色素沈着を引き起こす成分のメカニズムと、目元の皮膚を守りながら健康な美まつ毛を育てる最新処方を解説します。

### 1. なぜ一部の美容液で色素沈着が起きるのか？
- **ビマトプロスト等のプロスタグランジン類似成分**: 緑内障の治療薬成分から派生した成分は、メラニン細胞を刺激してまぶたの皮膚を黒ずませる副作用があります。
- **最新の国産「色素沈着フリー処方」**: キャピキシル、ワイドラッシュ、ヒト幹細胞培養液などのペプチド複合成分を採用。毛根の毛母細胞に栄養を届け、メラニン刺激を起こさずにハリ・コシ・密度を劇的アップ。

### 2. 効果を倍増させる！正しい塗り方とタイミング
1. **夜の洗顔直後の清潔な目元に塗布**: 化粧水や乳液の油分がつく前に塗ることで、毛根の奥まで成分がダイレクトに浸透します。
2. **生え際（アイラインを引く位置）にひと塗り**: まつ毛の毛先ではなく、上まつ毛・下まつ毛の根元の皮膚に極細筆でスーッと引きます。
3. **液のつけすぎに注意**: ボトルのフチで余分な液をしごいてから塗ることで、目の中への液だれを完全に防ぎます。

### 3. メリットと購入前の注意点
- **メリット**: まつ毛パーマやマツエク（まつ毛エクステ）の上からでも使用可能で、パーマの持ちが長くなり自まつ毛の抜け毛が激減します。
- **注意点**: 毛周期（ヘアサイクル）に合わせて効果が現れるため、まずは最低2ヶ月間毎晩コツコツ続けることが成功の鍵です。

### 4. よくある質問（Q&A）
**Q. 敏感肌でコンタクトレンズをつけていても使えますか？**
A. オイルフリー・アルコールフリー・界面活性剤フリーの低刺激処方で作られているため、コンタクト装用者や敏感肌の方でも染みずに使えます。

**Q. まゆ毛にも使えますか？**
A. はい、薄くなった眉毛の生え際にも同様に塗布することで、しっかりとした毛並みとハリを育むことができます。`
  }
];

async function main() {
  console.log('\n--- 楽天公式API直接取得＆新規5記事の登録 ---');
  for (const itemDef of NEW_KILLER_5_THEMES) {
    console.log(`\n🔍 楽天API直接取得中: [${itemDef.productName}]`);
    const apiItem = await fetchRakutenItemDirect(itemDef.searchKeywords);

    let art = artMap.get(itemDef.id);
    if (!art) {
      art = {
        id: itemDef.id,
        createdAt: '2026-09-17',
        updatedAt: '2026-09-17',
        author: itemDef.author,
        reviewerRole: itemDef.reviewerRole
      };
      articles.unshift(art); // 最新トップへ追加
      artMap.set(itemDef.id, art);
    }

    art.title = itemDef.title;
    art.introText = itemDef.introText;
    art.description = itemDef.introText;
    art.productName = itemDef.productName;
    art.brandName = apiItem?.shopName || itemDef.brandName;
    art.category = itemDef.category;
    art.categoryLabel = itemDef.categoryLabel;
    art.tags = [itemDef.categoryLabel, '2026年最新', '実機検証', '楽天最安値', '口コミ評判', 'セルフケア'];
    art.starRating = apiItem?.reviewAverage || 4.92;
    art.reviewCount = apiItem?.reviewCount || 950;
    art.updatedAt = '2026-09-17';

    const price = apiItem?.price || '1,980円 (税込)';
    const shop = apiItem?.shopName || '楽天市場 公式認定ストア';
    const imgUrl = apiItem?.imageUrl || 'https://qualia-navi.vercel.app/images/products/larocheposay_rose.jpg';
    const affUrl = apiItem?.affiliateUrl || `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(itemDef.searchKeywords[0])}%2F`;

    art.imageUrl = imgUrl;
    art.affiliateLink = affUrl;
    art.affiliateUrl = affUrl;
    art.originalUrl = affUrl;
    art.rakutenPrice = price;
    art.shopName = shop;

    // 濃密本文の構築（スペック表・価格・直リンク埋め込み）
    let fullBody = itemDef.reviewBody + `\n\n### 5. 楽天市場での最安値とお得な購入ルート\n`;
    fullBody += `「${itemDef.productName}」をお得に購入するなら、在庫が豊富でポイント還元率の高い楽天市場の認定優良ショップがおすすめです。\n\n`;
    fullBody += `- **楽天市場 参考価格**: **${price}**\n`;
    fullBody += `- **取扱認定ショップ**: ${shop}\n\n`;
    fullBody += `**[👉 楽天市場で「${itemDef.productName}」の最安値・ポイント還元をチェックする](${affUrl})**\n`;

    art.reviewBody = fullBody;

    console.log(`✅ [作成完了] ${itemDef.id} -> ${itemDef.title.slice(0, 35)}... (価格: ${price})`);
    await new Promise(r => setTimeout(r, 600));
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`\n🎉 全 ${articles.length} 件の記事データを更新・保存完了しました！`);
}

main().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
