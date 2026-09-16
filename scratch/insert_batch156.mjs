import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch156_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ156の4記事の定義
const batchDefs = [
  {
    id: 'art-super-absorbent-quick-dry-hair-towel-cap-10sen-2026',
    slug: 'art-super-absorbent-quick-dry-hair-towel-cap-10sen-2026',
    title: '【超吸水速乾ヘアキャップ＆タオルターバン10選】ドライヤー時間を半分に短縮！髪を傷めず水分をごっそり吸い取る人気ドライキャップ比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: 'お風呂上がりの億劫なヘアドライを劇的時短！「超吸水マイクロファイバーヘアキャップ＆タオルターバン」おすすめ10選！綿タオルの約3倍〜5倍の吸水力で濡れ髪の水分を瞬間吸着し、ドライヤー熱による髪のパサつき・枝毛ダメージを防止する人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「お風呂上がりに髪を乾かすのに20分以上かかって汗だくになる」「ドライヤーの熱風を長時間当て続けるせいで毛先がパサついて枝毛や切れ毛が増える」「お風呂から上がってすぐにスキンケアや家事をしたいのに濡れ髪が邪魔」……そんな毎日の億劫なバスタイム後の悩みを解決するのが、**「超吸水速乾ヘアキャップ＆タオルターバン」**です。

一般的な綿タオルとは比較にならない驚異の吸水構造を採用しています：
1. **綿の3〜5倍の吸水速度を誇る極細高密度マイクロファイバー**：髪をゴシゴシ擦る必要がなく、頭にすっぽり被せておくだけで滴る水分をグングン吸収
2. **ボタン留めやゴムギャザー設計で動いてもズレ落ちない**：スキンケアをしたりボディクリームを塗っている間、両手が自由に使えて快適
3. **ドライヤー時間が約半分に激減しキューティクルを熱ダメージから保護**：熱風を当てる時間を最小限に抑えられるため、サロン帰りのようなツヤとうるおいをキープ

今回は楽天市場で口コミ数千件を超えるベストセラー吸水ヘアキャップ10選を徹底比較します！`
  },
  {
    id: 'art-wall-mounted-hair-dryer-holder-rack-10sen-2026',
    slug: 'art-wall-mounted-hair-dryer-holder-rack-10sen-2026',
    title: '【壁掛けドライヤーホルダー＆コード収納10選】穴あけ不要で洗面台スッキリ！強力粘着・マグネットで浮かせる人気ドライヤーラック比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '毎日の出し入れストレスをゼロに！「壁掛けドライヤーホルダー（浮かせる収納ラック）」おすすめ10選！壁に穴を開けずに強力粘着テープやマグネットで設置でき、重い大風量ドライヤーや散らかりがちなコードも美しくまとめる人気アイテムを徹底解説。',
    products: fetched.t2,
    lead: `「大風量の高機能ドライヤーが大きくて洗面台の引き出しに入らない」「コードがぐちゃぐちゃに絡まって毎朝ほどくのがストレス」「洗面台の上がごちゃついて生活感が出てしまうのをどうにかしたい」……洗面所のデッドスペースを劇的に活用できるのが、**「壁掛けドライヤーホルダー」**です。

浮かせた状態でスマートに収納できるため、水垢防止と時短を両立します：
- **賃貸住宅でも安心の穴あけ不要・強力粘着シート＆マグネット固定**：タイルや洗面台の側面、洗濯機横の隙間などにピタッと貼り付けるだけで抜群の耐荷重を発揮
- **専用のコード巻き取りフック付きで絡まり・断線リスクを防止**：使用後はサッと掛けるだけでコードが床や水回りに落ちず、すっきり清潔な空間を維持
- **シリコン保護パッド付きで大切なドライヤーに傷がつかない**：高級ドライヤーのボディやノズルもしっかり保護しながら、片手でサッと出し入れ可能

今回は楽天の洗面収納ランキングで高評価を集める人気ドライヤーホルダー10選を徹底比較します！`
  },
  {
    id: 'art-usb-rechargeable-cordless-hot-curler-bangs-10sen-2026',
    slug: 'art-usb-rechargeable-cordless-hot-curler-bangs-10sen-2026',
    title: '【USB充電式コードレスホットカーラー10選】雨の日でも前髪のふんわりカール復活！持ち運び・学校・オフィスで使える人気前髪カーラー比較',
    category: 'ヘアケア',
    date: '2026-09-16',
    description: '湿気や雨でペタンコになった前髪を外出先で秒速リペア！「USB充電式コードレスホットカーラー」おすすめ10選！モバイルバッテリーやスマホから給電でき、数分巻くだけでアイロンいらずの自然なふんわり前髪・毛先ワンカールを作る人気アイテムを徹底検証。',
    products: fetched.t3,
    lead: `「朝せっかくセットした前髪が湿気や汗、マスクの蒸気ですぐにペタンコ・うねってしまう」「出先で前髪を直したいけれど大きなヘアアイロンは重くて持ち歩けない」「コンセントがない学校やオフィスのトイレでも手軽にカールを復活させたい」……そんな女子の永遠のお悩みをスマートに解決するのが、**「USB充電式コードレスホットカーラー」**です。

手のひらサイズでポーチに入り、どこでも即座に適温まで温まります：
- **モバイルバッテリーやUSB端子に繋いでわずか2〜3分で急速加熱**：前髪にくるっと巻きつけてクリップで留めるだけで、朝のサロン級ふんわりカールが復活
- **熱すぎない適温設計（約80℃〜100℃）で髪を焦がさず火傷の心配もゼロ**：ヘアアイロンのように髪をプレスしないため、傷みやパサつきを最小限に抑える
- **ピンやクリップが一体型になった軽量コンパクトデザイン**：メイク直しの間に巻いておくだけで時間を無駄にせず、自然なエアリー前髪が完成

今回は韓国コスメ界隈やSNSでバズっている話題のUSBホットカーラー10選を徹底比較します！`
  },
  {
    id: 'art-gentle-hydrating-makeup-remover-cleansing-sheets-10sen-2026',
    slug: 'art-gentle-hydrating-makeup-remover-cleansing-sheets-10sen-2026',
    title: '【大判・高保湿メイク落としクレンジングシート10選】擦らずスルン！夜遅い日・旅行・ジムに便利な摩擦レス人気ふき取りシート比較',
    category: 'スキンケア',
    date: '2026-09-16',
    description: '洗面所に行く気力がない夜でもベッドの上で即メイクオフ！「大判・高保湿メイク落としクレンジングシート」おすすめ10選！ヒアルロン酸やセラミド配合の摩擦レス天然コットンシートで、ウォータープルーフマスカラまで優しく落としてスキンケアまで完了する人気商品を徹底解説。',
    products: fetched.t4,
    lead: `「残業や飲み会でクタクタに疲れて帰宅し、クレンジングや洗顔をする気力がない」「ふき取りシートは便利だけど、肌を擦って摩擦ダメージや乾燥小じわになるのが怖い」「旅行や飛行機、キャンプ、ジムの後にサッとメイクを落としたい」……忙しい現代女性の救世主となるのが、**「高保湿・摩擦レス大判メイク落としシート」**です。

従来のふき取りシートの「乾燥する」「摩擦が痛い」というイメージを完全に覆します：
1. **美容液成分をヒタヒタに含んだ厚手大判シートで摩擦係数を極限までカット**：肌の上を滑らせるだけで、濃いアイメイクや毛穴の奥のファンデーションまで浮かせて吸着
2. **クレンジング・洗顔・化粧水が1枚で完結するオールインワン処方**：ふき取った後もつっぱり感がなく、そのまま寝落ちしても潤い肌をしっかりキープ
3. **アルコールフリー・弱酸性の低刺激設計**：まつエク対応や敏感肌用処方など、肌への優しさを追求したクオリティ

今回は楽天市場で「これがないと生きていけない」と口コミ絶賛の人気クレンジングシート10選を徹底比較します！`
  }
];

// 記事データを構築
for (const def of batchDefs) {
  const ranking = (def.products || []).slice(0, 10).map((p, index) => {
    return {
      rank: index + 1,
      name: p.name,
      price: p.price,
      url: p.url,
      image: p.image,
      shop: p.shop,
      reviewCount: p.reviewCount,
      reviewAverage: p.reviewAverage,
      description: `${p.name}は、${def.category}ジャンルで楽天市場ユーザーから高い評価（★${p.reviewAverage}・レビュー数${p.reviewCount}件）を集める人気アイテム。実用性とコスパに優れ、日々のケアやお悩みをスマートに解決してくれます。`
    };
  });

  const buyingGuide = [
    {
      title: '選び方ポイント1：機能性と吸水力・カール力・洗浄力の持続性',
      desc: '髪や肌に直接触れるアイテムだからこそ、基本となる素材の質や性能が高く評価されているものを選びましょう。'
    },
    {
      title: '選び方ポイント2：設置・持ち運びやすさと給電方式の利便性',
      desc: '洗面所の省スペース化や外出先での使用目的に応じて、サイズ感や充電方式、設置方法が生活動線に合っているか確認しましょう。'
    },
    {
      title: '選び方ポイント3：肌や髪への摩擦レス＆低刺激設計',
      desc: '毎日のルーティンで継続して使うものだからこそ、キューティクルや角質層に負担をかけない優しい素材選びが大切です。'
    }
  ];

  const fullArticle = {
    id: def.id,
    slug: def.slug,
    title: def.title,
    category: def.category,
    date: def.date,
    updatedAt: def.date,
    author: 'ラクコスメ編集部',
    description: def.description,
    lead: def.lead,
    buyingGuide: buyingGuide,
    ranking: ranking,
    content: `## はじめに\n\n${def.lead}\n\n## 失敗しない選び方の3つのポイント\n\n${buyingGuide.map((g, i) => `### ${i+1}. ${g.title}\n\n${g.desc}`).join('\n\n')}\n\n## おすすめ人気ランキング10選\n\n${ranking.map(r => `### 第${r.rank}位：${r.name}\n\n- **価格**: ¥${r.price.toLocaleString()}（税込）\n- **ショップ**: ${r.shop}\n- **評価**: ★${r.reviewAverage} (${r.reviewCount}件)\n\n${r.description}\n\n[楽天市場で詳細を見る](${r.url})`).join('\n\n')}\n\n## まとめ\n\n毎日のビューティー＆ライフスタイルを格上げする便利アイテム。ぜひ自分にぴったりの商品を見つけてみてください！`
  };

  // 重複チェック
  const existingIdx = articles.findIndex(a => a.id === def.id || a.slug === def.slug);
  if (existingIdx >= 0) {
    articles[existingIdx] = fullArticle;
    console.log(`Updated existing article: ${def.slug}`);
  } else {
    articles.push(fullArticle);
    console.log(`Added new article: ${def.slug}`);
  }

  if (!allSlugs.includes(def.slug)) {
    allSlugs.push(def.slug);
  }
}

// 保存
fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
fs.writeFileSync(allTxtPath, allSlugs.join('\n') + '\n', 'utf-8');

console.log(`Successfully updated articles.json and all.txt. Total articles: ${articles.length}`);
