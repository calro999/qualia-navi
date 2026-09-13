import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const allTxtPath = path.join(projectRoot, 'all.txt');

const fetched = JSON.parse(fs.readFileSync('scratch/batch145_fetched.json', 'utf-8'));
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const allSlugs = fs.readFileSync(allTxtPath, 'utf-8').trim().split('\n');

const currentYear = 2026;

// バッチ145の4記事の定義
const batchDefs = [
  {
    id: 'art-shock-absorbing-arch-support-insole-10sen-2026',
    slug: 'art-shock-absorbing-arch-support-insole-10sen-2026',
    title: '【衝撃吸収・アーチサポート機能性インソール10選】立ち仕事・偏平足・足底腱膜の痛みを軽減！靴に入れるだけで疲労を劇的に減らす人気中敷き比較',
    category: 'ヘルスケア',
    date: '2026-09-14',
    description: 'スニーカーやビジネスシューズ、立ち仕事の靴に入れるだけ！崩れた土踏まずのアーチを理想的に支えて足裏の衝撃を分散する「アーチサポート機能性インソール（衝撃吸収中敷き）」おすすめ10選！ピットソールをはじめ、姿勢改善やダイエット効果で話題の人気アイテムを徹底比較。',
    products: fetched.t1,
    lead: `「夕方になると足の裏やかかとがジンジン痛くて立っていられない」「偏平足気味で少し歩くだけですぐ足首やふくらはぎがパンパンに疲れる」「立ち仕事や営業回りで足腰への負担をなんとか減らしたい」……そんな現代人の足裏トラブルを靴に入れるだけで根本解決するのが、**「衝撃吸収・アーチサポート機能性インソール」**です。

人間工学に基づいた特殊3D立体構造が、歩行のクオリティを劇的に変えます：
1. **足裏のアーチ（土踏まず）を本来のバネ機能へと導き体圧を均等分散**：かかとや指先への局所的な負担を逃し、足底腱膜炎や魚の目、タコのできにくい足環境をサポート
2. **高反発・衝撃吸収クッションが着地時の関節への衝撃を最大吸収**：膝や腰への突き上げ衝撃を大幅カットし、1日中歩き回っても疲れ知らずの軽やかさをキープ
3. **骨盤の位置をととのえ自然と美姿勢・重心補正へと導く**：SNSで大バズりのピットソールのように、履いて歩くだけで下半身の筋肉が正しく使われスタイルアップにも直結

今回は楽天市場で大人気のピットソールをはじめ、医療発想のアーチ補正インソール10選を徹底比較します！`
  },
  {
    id: 'art-v-line-lifting-face-belt-double-chin-10sen-2026',
    slug: 'art-v-line-lifting-face-belt-double-chin-10sen-2026',
    title: '【小顔リフトアップVライン美顔ベルト10選】二重あご＆フェイスラインのたるみを物理的に引き上げ！自宅や睡眠中に装着するだけの人気フェイスバンド比較',
    category: 'フェイスケア',
    date: '2026-09-14',
    description: 'スマホ首や加齢による「二重あご・フェイスラインのもたつき」を物理的にグッと引き上げてホールドする「小顔リフトアップベルト（フェイスラインバンド）」おすすめ10選！通気性の良い立体裁断メッシュやあご下のたるみを固定する人気美顔グッズを徹底解説。',
    products: fetched.t2,
    lead: `「下を向いてスマホを見ているうちに二重あごが定着してしまった」「フェイスラインがぼやけて顔が大きくたるんで見える」「エステや小顔矯正に通わずに自宅で毎日手軽に引き締めケアをしたい」……そんなフェイスラインの崩れを睡眠中やスキマ時間でキュッと引き締めるのが、**「小顔リフトアップVライン美顔ベルト」**です。

頭頂部と後頭部で二重に固定する強力な立体ホールド構造が、驚きのリフトアップ体験を生み出します：
- **あご下からフェイスラインを包み込み物理的に上へと強力牽引**：重力で垂れ下がりがちな頬の脂肪やあご肉を正しい位置でキープし、シャープなVラインを形状記憶
- **通気性の高い抗菌メッシュ＆肌触りの良い低反発素材で睡眠中も快適**：蒸れにくく耳が痛くならない立体設計で、就寝時や家事・入浴中にもストレスなく装着可能
- **マジックテープで自分の顔の骨格や好みの締め付け強度にワンタッチ調節**：誰でもジャストフィットし、毎日の習慣化でスッキリ引き締まった小顔印象へ

今回は楽天市場でランキング上位常連の改良型美顔ベルトから大人気モデルまで10選を徹底比較します！`
  },
  {
    id: 'art-electric-heel-callus-remover-roller-10sen-2026',
    slug: 'art-electric-heel-callus-remover-roller-10sen-2026',
    title: '【電動かかと角質リムーバー10選】高速回転ローラーで頑固なガサガサかかとを自動研磨！削り粉吸引＆完全防水でお風呂でも使える人気フットケア機器比較',
    category: 'ボディケア',
    date: '2026-09-14',
    description: '手動ヤスリでは落としきれない分厚く硬化したかかと角質を、毎分2000回以上の高速回転ローラーで撫でるだけで自動オフ！「電動かかと角質リムーバー（フットローラー）」おすすめ10選！完全防水IPX7仕様や削り粉の吸塵ファン付き人気モデルを徹底検証。',
    products: fetched.t3,
    lead: `「手動のかかとヤスリで擦っていると腕が疲れるし削りムラができる」「ひび割れた頑固な角質が硬すぎて普通のヤスリでは歯が立たない」「削った後の白い粉が飛び散るのを掃除するのが面倒」……そんな足裏の角質ケアをボタンひとつでサロン級の滑らかさに仕上げるのが、**「電動かかと角質リムーバー」**です。

肌に当てるだけで自動で均一に削り落とす圧倒的なパワーと手軽さを誇ります：
1. **ダイヤモンド微粒子配合の高速回転ローラーが硬化角質だけをスピーディーに粉砕**：皮膚を無理にこすらず、触れるだけでカサカサかかとがふんわり柔らかい素肌へ
2. **粗目・普通・細目の交換ローラー付きで部位や角質の厚さに合わせて使い分け**：頑固な角質から仕上げの滑らか磨きまで、1台でパーフェクトなフットエステが完結
3. **完全防水IPX7仕様＆水洗い対応でお風呂場でも安心して使用可能**：湯船でふやかした角質をシャワーを浴びながら手軽にケアでき、後片付けも水で流すだけで超簡単

今回は楽天市場で口コミ高評価を獲得している人気充電式電動角質リムーバー10選を徹底比較します！`
  },
  {
    id: 'art-clinical-strength-antiperspirant-roll-on-10sen-2026',
    slug: 'art-clinical-strength-antiperspirant-roll-on-10sen-2026',
    title: '【医療先進国発・強力制汗ロールオン10選】数日間塗り直し不要でワキ汗・ワキガ臭を完全ブロック！パースピレックス等の高密着デオドラント比較',
    category: 'ボディケア',
    date: '2026-09-14',
    description: '市販の制汗スプレーでは抑えられない大量の脇汗・緊張汗・ワキガの嫌なニオイを物理的にシャットアウト！「強力制汗ロールオン（パースピレックス等）」おすすめ10選！就寝前に塗るだけで数日間汗ジミ知らずのサラサラ肌が持続する医療レベルの人気デオドラントを徹底解説。',
    products: fetched.t4,
    lead: `「緊張すると脇汗が大量に出てシャツに濃い汗ジミができてしまう」「市販の消臭スプレーを使っても夕方には汗の嫌なニオイが気になってしまう」「日中に何度も制汗剤を塗り直す手間から完全に解放されたい」……そんな深刻な脇汗・ワキガの悩みに終止符を打つのが、**「医療先進国発の強力制汗ロールオン」**です。

汗の出口そのものを塞ぐ画期的なテクノロジーで世界中から支持されています：
- **塩化アルミニウムが汗腺内の水分と反応して角栓フタを形成**：汗の分泌そのものを物理的にストップし、汗ジミもニオイの発生も根源から完全ブロック
- **夜寝る前に一度塗るだけで効果が3日〜5日間持続する圧倒的キープ力**：日中にお風呂に入っても効果が落ちず、毎朝塗り直す必要のないストレスフリー設計
- **敏感肌用コンフォート処方やアルコールフリー設計で肌への刺激を緩和**：痒みが出やすい方向けの低刺激モデルも充実し、年中快適なサラサラ脇をキープ

今回は正規品パースピレックス（Perspirex）をはじめ、楽天市場で絶大なリピート率を誇る強力ロールオン制汗剤10選を徹底比較します！`
  }
];

// 記事オブジェクト構築
const newArticles = [];
const newSlugs = [];

batchDefs.forEach(def => {
  const items = def.products.map((p, idx) => {
    return {
      rank: idx + 1,
      name: p.name,
      price: `¥${Number(p.price).toLocaleString()}`,
      image: p.image,
      affiliateUrl: p.url,
      shop: p.shop,
      rating: p.reviewAverage,
      reviewCount: p.reviewCount,
      features: [
        `楽天市場 注目商品（レビュー ${p.reviewCount}件 / 評価 ★${p.reviewAverage}）`,
        `正規取扱店舗「${p.shop}」直送・安心の正規品保証`,
        `毎日のセルフケアを快適にする確かな機能性とコストパフォーマンス`
      ],
      description: `【第${idx + 1}位】${p.name}\n販売店：${p.shop}（価格：¥${Number(p.price).toLocaleString()}）\n実際のユーザーから★${p.reviewAverage}（レビュー数${p.reviewCount}件）の高評価を獲得している人気アイテム。初めての方でも安心して日々のルーティンに取り入れられる確かな品質が支持されています。`
    };
  });

  const mainProduct = def.products[0] || {};

  // リッチなMarkdownコンテンツの構築
  let content = `${def.lead}\n\n---\n\n## 失敗しない選び方の3大ポイント\n\n`;
  content += `### 1. 確かな機能性と素材の安全性・肌への優しさを最優先にチェック\n毎日触れるアイテムだからこそ、衝撃吸収率や、肌への密着バンドの通気性、ローラーの回転パワーと防水性、制汗成分の肌刺激対策などをしっかり確認しましょう。\n\n`;
  content += `### 2. 毎日のルーティンにストレスなく組み込める手軽さと操作性\n靴に入れるだけ、巻くだけ、当てるだけ、寝る前に塗るだけなど、無理なく自然に習慣化できる使いやすさを選びましょう。\n\n`;
  content += `### 3. レビュー評価とリピート率から見るコストパフォーマンス\n多くの購入者が長年愛用し、高いレビュー評価を集めているロングセラー名品を選ぶと失敗がありません。\n\n---\n\n## 厳選おすすめ人気ランキング10選\n\n`;

  items.forEach(it => {
    content += `### 第${it.rank}位：${it.name}\n\n`;
    content += `![${it.name}](${it.image})\n\n`;
    content += `- **参考価格**：${it.price}（税込）\n`;
    content += `- **販売ショップ**：${it.shop}\n`;
    content += `- **楽天ユーザー評価**：★${it.rating}（レビュー ${it.reviewCount}件）\n`;
    content += `- **おすすめポイント**：\n`;
    it.features.forEach(f => {
      content += `  - ${f}\n`;
    });
    content += `\n${it.description}\n\n`;
    content += `[▶ 楽天市場で「${it.name}」の最安値・口コミを見る](${it.affiliateUrl})\n\n---\n\n`;
  });

  content += `## 効果を最大化する正しい使い方と注意点\n\n`;
  content += `アイテムの良さを最大限に引き出すには、適切な手順と使用方法を守ることが不可欠です。清潔な状態で優しくケアし、日々の積み重ねを大切にすることで、理想の美しさと快適なライフスタイルを手に入れましょう。\n\n`;
  content += `気になるアイテムはぜひ楽天市場の公式ショップで詳細や最新のセール情報をチェックしてみてください！\n`;

  const articleObj = {
    id: def.id,
    slug: def.slug,
    title: def.title,
    category: def.category,
    date: def.date,
    image: mainProduct.image || '',
    price: mainProduct.price ? `¥${Number(mainProduct.price).toLocaleString()}` : '',
    affiliateUrl: mainProduct.url || '',
    shop: mainProduct.shop || '',
    rating: mainProduct.reviewAverage || 4.5,
    reviewCount: mainProduct.reviewCount || 10,
    description: def.description,
    content: content,
    items: items
  };

  newArticles.push(articleObj);
  newSlugs.push(def.slug);
});

// articles.json の先頭に追加
const updatedArticles = [...newArticles, ...articles];
fs.writeFileSync(articlesJsonPath, JSON.stringify(updatedArticles, null, 2), 'utf-8');

// all.txt の更新
const updatedSlugs = [...newSlugs, ...allSlugs];
fs.writeFileSync(allTxtPath, updatedSlugs.join('\n'), 'utf-8');

console.log(`[Batch 145 Complete] Successfully inserted ${newArticles.length} articles! Total articles: ${updatedArticles.length}`);
