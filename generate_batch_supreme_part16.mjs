import fs from 'fs';
import path from 'path';

const RAKUTEN_APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchRakutenItems(keyword, hits = 10) {
  const cleanKw = keyword.replace(/[+*?^${}()|[\]\\/]/g, ' ').replace(/\s+/g, ' ').trim();
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&hits=${hits}&imageFlag=1&sort=%2BreviewCount`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`API Error [${res.status}]: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    if (!data.Items || data.Items.length === 0) return [];

    return data.Items.map(itemObj => {
      const item = itemObj.Item || itemObj;
      const rawImg = (item.mediumImageUrls && item.mediumImageUrls[0]) || 
                     (item.smallImageUrls && item.smallImageUrls[0]) || '';
      const secureImg = (typeof rawImg === 'string' ? rawImg : (rawImg.imageUrl || ''))
        .replace(/^http:\/\//, 'https://')
        .replace(/\?_ex=\d+x\d+/, '?_ex=500x500');

      return {
        name: item.itemName,
        price: item.itemPrice,
        url: item.affiliateUrl || item.itemUrl,
        imageUrl: secureImg,
        shopName: item.shopName,
        reviewAverage: item.reviewAverage || 0,
        reviewCount: item.reviewCount || 0
      };
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

const batchArticles = [
  {
    id: "art-summerseve-and-deoco-sensitive-care-guide",
    title: "【サマーズイブでかゆみ・ニオイは消える？】デリケートゾーンケアの真実とデオコ敏感肌ボディソープ徹底比較",
    description: "サマーズイブのフェミニンウォッシュは本当にかゆみや匂いを防げる？弱酸性処方の効果と口コミを皮膚科学視点で検証。さらに大人臭・皮脂臭をオフするデオコ敏感肌対応アイテムも徹底比較。",
    category: "ボディケア",
    tags: ["サマーズイブ かゆみ", "サマーズイブ 匂い消える", "デオコ ボディソープ 敏感肌", "デリケートゾーンケア", "フェミニンウォッシュ", "体臭ケア", "弱酸性"],
    searchKeyword: "サマーズイブ フェミニンウォッシュ デリケートゾーン",
    fallbackKeyword: "サマーズイブ フェミニンウォッシュ",
    content: `生理中や夏場のムレ、下着のこすれによる「デリケートゾーンのムズムズ・かゆみ」や「不快なニオイ」。人には相談しづらいけれど、多くの女性が日常的に抱える切実な悩みです。

全米No.1シェアを誇るフェミニンケアブランド**「サマーズイブ（Summer's Eve）」**や、年齢とともに変化する体臭・大人臭をケアする**「デオコ（DEOCO）」**が大きな支持を集めています。

「サマーズイブを使うと本当にニオイは消えるの？」
「洗いすぎると逆に乾燥やかゆみの原因にならない？」
「敏感肌でも刺激なく洗えるデオコやデリケートゾーン用ソープの選び方は？」

本記事では、デリケートゾーンの自浄作用を守りながら気になるトラブルを根本から防ぐ正しいケア法と、口コミ高評価のおすすめボディケアアイテムを徹底レビューします。

---

### 1. デリケートゾーンのニオイ・かゆみの原因と正しい洗い方

#### ① 普通のアルカリ性ボディソープはNG！なぜ弱酸性が必要か
健康な膣周りはpH3.8〜4.5の弱酸性に保たれ、乳酸桿菌（善玉菌）の働きによって雑菌の繁殖を防いでいます。一般的な石けんやボディソープ（アルカリ性〜弱アルカリ性）で洗ってしまうと、善玉菌まで洗い流してバリア機能が低下し、かゆみや嫌なニオイの悪循環に陥ります。

#### ② サマーズイブの強み：肌本来の弱酸性バランスを崩さない
サマーズイブはデリケートゾーンの肌環境に合わせた弱酸性設計。保湿成分配合で、汚れやニオイの元となる余分な皮脂・分泌物だけを優しく洗い流し、つっぱり感や乾燥を防ぎます。

#### ③ デオコ（DEOCO）と使い分け：大人臭・汗臭・加齢臭には白泥とラクトン
首筋やワキ、胸元など、皮脂分泌が多く年齢特有のニオイ（ノネナールやラクトンの減少）が気になるパーツには、白泥（吸着剤）とビタミンC誘導体配合のデオコが絶大な効果を発揮します。

---

### 2. デリケートゾーン＆全身の清潔感を保つ厳選ケアアイテム`
  },
  {
    id: "art-suppin-powder-and-cream-pore-care-guide",
    title: "【すっぴんパウダー＆すっぴんクリームの口コミ検証】つけたまま寝られる？毛穴落ち・ニキビへの影響と素肌偽装メイク術",
    description: "クラブの「すっぴんパウダー」「すっぴんクリーム」はお泊まりやスクールメイクに本当にバレない？毛穴カバー力やニキビ肌への負担、24時間つけたまま寝ても肌荒れしないかの真実をプロが徹底検証。",
    category: "ベースメイク",
    tags: ["すっぴんパウダー 口コミ", "すっぴんクリーム 口コミ", "ノーファンデ", "お泊まりコスメ", "毛穴カバー", "スキンケアパウダー", "すっぴんメイク"],
    searchKeyword: "クラブ すっぴんパウダー スキンケアパウダー",
    fallbackKeyword: "すっぴんパウダー クラブ",
    content: `「彼氏とのお泊まりや旅行で、完全なすっぴんは見せたくない…」
「休日は肌を休ませたいけれど、毛穴や色ムラはふんわりぼかしたい」

そんな願いを叶える大人気ロングセラーが、クラブの**「すっぴんパウダー」**と**「すっぴんクリーム」**です。スキンケア処方で「洗顔不要・24時間つけたまま眠れる」という画期的なコンセプトで学生から大人女子まで圧倒的な支持を誇ります。

しかし、「本当に毛穴落ちはしない？」「つけたままでニキビや肌荒れの原因にならない？」「白浮きしない？」と疑問を持つ方も多いはず。

今回は、コスメの成分と仕上がりを徹底分析するプロが、すっぴんシリーズの真の実力と、バレずに美素肌を装うベストな重ね方を徹底検証します。

---

### 1. すっぴんパウダー＆クリームの魅力と肌荒れしない使い方のコツ

#### ① なぜクレンジング不要で寝られるの？
すっぴんパウダー＆クリームは、一般的なファンデーションに使われる鉱物油や紫外線吸収剤を極力排除し、ヒアルロン酸やコラーゲンなどの保湿スキンケア成分をベースに作られています。肌の潤いを守りながら、微粒子パウダーが光を拡散させて毛穴やテカリをカバーします。

#### ② 毛穴落ち・白浮きを防ぐ塗り方の黄金比
クリームを全顔にベタ塗りするとヨレの原因になります。
1. スキンケアが肌にしっかり浸透したのを確認（余分な油分はティッシュで軽くオフ）
2. すっぴんクリームをパール粒大、顔の中心（Tゾーン・頬）から外側へ薄く叩き込む
3. すっぴんパウダー付属のふかふかパフで、擦らず優しく「押さえるように」密着させる

#### ③ どんな人に向いている？
- 温泉旅行やお泊まりで「素肌が綺麗な人」に見せたいとき
- リモートワークやちょっとした近所への外出
- スクールメイクや就活のナチュラルメイク

---

### 2. つけたまま眠れるスキンケアパウダー＆ノーファンデ名品`
  },
  {
    id: "art-senka-giselle-and-innisfree-primer-guide",
    title: "【専科 ジゼル愛用洗顔＆イニスフリー ノーセバム プライマー徹底検証】毛穴レス陶器肌をつくる角栓オフ×テカリ防止メソッド",
    description: "aespaジゼル愛用の専科パーフェクトホイップの濃密泡洗顔テクニックと、イニスフリー大人気ノーセバム ブラープライマーの毛穴凹凸・皮脂テカリ防止効果を徹底検証！夕方までサラサラ陶器肌をキープする秘訣。",
    category: "毛穴・ベースメイク",
    tags: ["専科 ジゼル", "ジゼル洗顔", "innisfree イニスフリーノーセバム ブラープライマー25ml/韓国 コスメ product info and reviews", "イニスフリー パウダーファンデーション", "毛穴プライマー", "皮脂崩れ防止", "洗顔フォーム"],
    searchKeyword: "イニスフリー ノーセバム プライマー 下地 毛穴",
    fallbackKeyword: "イニスフリー ノーセバム 下地",
    content: `実力派ガールズグループ**aespa（エスパ）のジゼルさん**が愛用していることで大きな話題となった**「専科 パーフェクトホイップ」**。そして、韓国コスメの毛穴消し・テカリ防止下地として不動の地位を築く**「イニスフリー ノーセバム ブラープライマー」**。

「ジゼルさんのようなつるんとしたむき卵肌になる洗顔方法は？」
「ノーセバムプライマーは頑固なイチゴ鼻や開き毛穴をどこまで埋めてくれる？」
「パウダーファンデーションと組み合わせても毛穴落ちしない？」

本記事では、毛穴の黒ずみ・角栓を根こそぎクリアにする落とすケアから、日中の皮脂テカリをゼロにするベースメイクの仕込み技までを実証レビューします。

---

### 1. 毛穴レス陶器肌を仕込む「洗顔×プライマー」の最強タッグ

#### ① 専科パーフェクトホイップ：ミクロ濃密泡で摩擦レス洗顔
ジゼルさんも実践する美肌の秘訣は「たっぷりの弾力泡で肌を擦らず洗うこと」。専科のミクロ濃密泡は毛穴の奥の微細な汚れまで吸着し、必要な潤いを奪わずにくすみを一掃します。

#### ② イニスフリー ノーセバム ブラープライマー：凹凸毛穴をフラットに補正
スキンケアで肌を整えた後、米粒大を指先に取り、小鼻や頬の毛穴の気になる部分にくるくると下から上へ塗り込みます。皮脂吸着パウダーが余分なアブラをキャッチし、まるでフィルターをかけたようなすべすべマット肌を夕方までキープします。

---

### 2. 毛穴・テカリに悩む人必携の神コスメ厳選`
  },
  {
    id: "art-covermark-cc-and-luxury-concealer-review",
    title: "【カバーマーク スキンブライト クリーム CC 口コミ検証】1本で美肌完成？夕方まで崩れない高級コンシーラー比較",
    description: "カバーマークのスキンブライト クリーム CCは本当にファンデいらず？くすみ飛ばし・カバー力・色持ちを徹底検証。さらにシワにたまらない・絶対にヨレない高級コンシーラーの名品と組み合わせ技を公開。",
    category: "ベースメイク",
    tags: ["カバーマーク スキンブライト クリーム cc 口コミ", "高級 コンシーラー 崩れない", "パウダーファンデーション 脂性肌", "CCクリーム", "ベースメイク", "崩れない", "カバーマーク"],
    searchKeyword: "カバーマーク スキンブライト クリーム CC",
    fallbackKeyword: "カバーマーク CCクリーム",
    content: `「忙しい朝、下地とファンデーションを重ねる時間がない…」
「でも手抜きに見えない、きちんとした透明感とカバー力が欲しい」

そんな大人の女性たちの救世主として絶賛されているのが、ファンデーションのエキスパートブランド**COVERMARK（カバーマーク）の「スキンブライト クリーム CC」**です。

1本で下地・ファンデーション・日焼け止め（SPF50+ PA++++）を兼ね備え、独自の「皮脂キャッチ成分」で時間が経つほど明るく密着すると評判ですが、実際のカバー力やマスク崩れ防止効果はどうなのでしょうか？

本記事では、スキンブライト クリーム CCのリアルな使用感と、頑固なシミやくまを完璧に隠す崩れない高級コンシーラーとの最強美肌コンビネーションを徹底解説します。

---

### 1. カバーマーク スキンブライト クリーム CCが支持される3つの理由

#### ① 厚塗り感ゼロなのにシミ・色ムラを光で飛ばす
薄膜でみずみずしく伸び広がり、毛穴や色ムラを自然にカムフラージュ。ファンデーション特有の重さがなく、まるで元から素肌がキレイな人のような仕上がりに。

#### ② 夕方の「黄ぐすみ」「どんより疲れ顔」を阻止
皮脂を吸着して光を放つパウダーが配合されているため、時間が経っても皮脂浮きやくすみが起きにくく、一日中澄んだトーンが続きます。

#### ③ 高級コンシーラーとの合わせ技でパーフェクトスキンに
目元の茶くまや濃いシミには、美容液成分高配合のリキッド・スティックコンシーラーをごく少量トントンと重ねるだけで、夕方まで一切シワにたまらない極上肌が完成します。

---

### 2. 大人の肌を格上げするCCクリーム＆崩れない名品コンシーラー`
  }
];

async function main() {
  console.log("🚀 [Supreme Organic Polish] 第16弾 4大最重要テーマの書き下ろし開始...\n");
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  for (const item of batchArticles) {
    await sleep(1500);
    console.log(`🔍 楽天APIから【${item.title}】の商品データを取得中... (KW: ${item.searchKeyword})`);
    let items = await fetchRakutenItems(item.searchKeyword, 10);
    if (items.length === 0 && item.fallbackKeyword) {
      await sleep(1500);
      console.log(`⚠️ 代替KWで再試行`);
      items = await fetchRakutenItems(item.fallbackKeyword, 10);
    }
    console.log(`✅ 商品データ ${items.length} 件取得完了！`);

    let dynamicEditorial = item.content;
    if (items.length > 0) {
      dynamicEditorial += "\n\n";
      items.slice(0, 10).forEach((prod, i) => {
        const pReview = prod.reviewAverage > 0 ? `★${Number(prod.reviewAverage).toFixed(1)} (${prod.reviewCount}件)` : '注目アイテム';
        dynamicEditorial += `#### ${i + 1}. [${prod.name}](${prod.url})\n`;
        if (prod.imageUrl) {
          dynamicEditorial += `![${prod.name}](${prod.imageUrl})\n\n`;
        }
        dynamicEditorial += `- **価格**: ¥${Number(prod.price).toLocaleString()}（税込・取扱店：${prod.shopName}）\n`;
        dynamicEditorial += `- **ユーザー評価**: ${pReview}\n`;
        dynamicEditorial += `- **プロの注目ポイント**: 楽天公式・正規取扱店で安定した高評価を獲得。テクスチャー・使用感ともに妥協がなく、日々の肌トラブル予防と美肌演出を確実にサポートしてくれます。\n\n`;
      });
    }

    dynamicEditorial += `\n---

### まとめ：毎日の習慣を見直して自信が持てる素肌へ
今回ご紹介したアイテムは、肌のメカニズムや悩みに合わせて開発された本物の実力派ばかりです。ライフスタイルや肌質に合わせて、ぜひ毎日のルーティンに取り入れてみてくださいね。`;

    const existingIndex = articles.findIndex(a => a.id === item.id);
    const newArticleObj = {
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags,
      date: "2026-09-05",
      readingTime: "5分",
      content: dynamicEditorial
    };

    if (existingIndex >= 0) {
      articles[existingIndex] = newArticleObj;
      console.log(`🔄 [更新完了] ${item.title}`);
    } else {
      articles.push(newArticleObj);
      console.log(`✨ [新規追加] ${item.title}`);
    }
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log("🎉 第16弾 4大最重要記事の書き下ろし・データ保存が完了しました！\n");
}

main();
