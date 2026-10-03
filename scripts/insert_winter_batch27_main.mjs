import fs from 'fs';
import path from 'path';
import {
  stickSerumItemsRaw,
  nailOilItemsRaw,
  neckCreamItemsRaw,
  stickSerumArticles,
  nailOilArticles,
  neckCreamArticles
} from './insert_winter_batch27_helper.mjs';

import { getStickSerumArticleContent } from './winter_batch27_article1_stickserum.mjs';
import { getNailOilArticleContent } from './winter_batch27_article2_nailoil.mjs';
import { getNeckCreamArticleContent } from './winter_batch27_article3_neckcream.mjs';

console.log('🚀 [冬コスメ 第27弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const stickSerumContent = getStickSerumArticleContent();
const nailOilContent = getNailOilArticleContent();
const neckCreamContent = getNeckCreamArticleContent();

console.log(`- 記事1 (スティック美容液) 文字数: 約${stickSerumContent.length}文字`);
console.log(`- 記事2 (携帯ネイルオイル) 文字数: 約${nailOilContent.length}文字`);
console.log(`- 記事3 (ネック＆デコルテクリーム) 文字数: 約${neckCreamContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (stickSerumContent.length < 5000 || nailOilContent.length < 5000 || neckCreamContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-stick-serum-moisturizing-balm-2026",
    slug: "winter-stick-serum-moisturizing-balm-2026",
    title: "【2026冬・暖房乾燥＆目元の小ジワ割れを外出先で直塗り復活】高保湿スティック美容液＆うるおいマルチバームスティックおすすめ人気10選！メイクの上からヨレずにツヤ肌を蘇らせる冬のポーチ必携決定版",
    subtitle: "オフィスの強烈なエアコン暖房や冷たい北風で、午後になると目元のちりめんジワやほうれい線、口元のファンデが粉吹き・ひび割れを起こす11〜12月！メイクを落とさずに上から直塗りでき、瞬時にみずみずしい水分と美容液成分をチャージできるスティック美容液＆マルチバームを徹底検証。IPSA、KAHI、エトヴォス、MiMC、乾燥さん、タイムシークレット、キュレル、ドクターエルシア、イハダ、セザンヌなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "オフィスの強烈なエアコン暖房や冷たい北風で、午後になると目元のちりめんジワやほうれい線、口元のファンデが粉吹き・ひび割れを起こす11〜12月！メイクを落とさずに上から直塗りでき、瞬時にみずみずしい水分と美容液成分をチャージできるスティック美容液＆マルチバームを徹底検証。IPSA、KAHI、エトヴォス、MiMC、乾燥さん、タイムシークレット、キュレル、ドクターエルシア、イハダ、セザンヌなど厳選10選！",
    isHallOfFame: true,
    coverImage: stickSerumItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/stickserum.jpg",
    recommendedItemCodes: stickSerumArticles.map(a => a.id),
    contentMarkdown: stickSerumContent
  },
  {
    id: "feat-winter-nail-cuticle-oil-pen-care-2026",
    slug: "winter-nail-cuticle-oil-pen-care-2026",
    title: "【2026冬・爪先の二枚爪＆ささくれ・甘皮の白化を集中補修】高保湿ペン型ネイルオイル＆ロールオン・キューティクル美容液おすすめ人気10選！外出先でもベタつかずハイポニキウムまで潤す冬の美爪育児決定版",
    subtitle: "寒風と乾燥、毎日の手洗い・アルコール消毒で爪が割れやすく、甘皮がガサガサに白くなってささくれが出血する11〜12月！ハンドクリームでは届かない爪の根元（マトリクス）と爪裏（ハイポニキウム）に浸透し、指先をサロン級のツヤで包み込む携帯ネイルオイルを徹底比較。uka（ウカ）、ディオール、OPI、ロクシタン、無印良品、エクセル、ベリンダ、ネイルホリック、キャンメイク、アンドネイルなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "寒風と乾燥、毎日の手洗い・アルコール消毒で爪が割れやすく、甘皮がガサガサに白くなってささくれが出血する11〜12月！ハンドクリームでは届かない爪の根元（マトリクス）と爪裏（ハイポニキウム）に浸透し、指先をサロン級のツヤで包み込む携帯ネイルオイルを徹底比較。uka（ウカ）、ディオール、OPI、ロクシタン、無印良品、エクセル、ベリンダ、ネイルホリック、キャンメイク、アンドネイルなど厳選10選！",
    isHallOfFame: true,
    coverImage: nailOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nailoil.jpg",
    recommendedItemCodes: nailOilArticles.map(a => a.id),
    contentMarkdown: nailOilContent
  },
  {
    id: "feat-winter-neck-decollete-firming-cream-care-2026",
    slug: "winter-neck-decollete-firming-cream-care-2026",
    title: "【2026冬・マフラー摩擦＆タートルネック乾燥による首の横ジワを集中ケア】高保湿ネック＆デコルテ専用クリーム・リフト美容液おすすめ人気10選！年齢が出やすい首元をピンと引き上げハリツヤを取り戻す大人の冬ケア決定版",
    subtitle: "タートルネックのニットやウールマフラーの摩擦、冬の寒さによる姿勢の縮こまりで、首元の横ジワ・ちりめんジワ・たるみ・ざらつきが一気に表面化する11〜12月！顔用クリームでは服にベタつく悩みを解消し、首特有の薄い皮膚をサラリと引き締めて上向きのハリを与えるネック＆デコルテ専用コスメを徹底検証。クラランス、コスメデコルテAQ、資生堂エリクシール、シスレー、POLA、アテニア、アクセーヌ、オバジ、キールズなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "タートルネックのニットやウールマフラーの摩擦、冬の寒さによる姿勢の縮こまりで、首元の横ジワ・ちりめんジワ・たるみ・ざらつきが一気に表面化する11〜12月！顔用クリームでは服にベタつく悩みを解消し、首特有の薄い皮膚をサラリと引き締めて上向きのハリを与えるネック＆デコルテ専用コスメを徹底検証。クラランス、コスメデコルテAQ、資生堂エリクシール、シスレー、POLA、アテニア、アクセーヌ、オバジ、キールズなど厳選10選！",
    isHallOfFame: true,
    coverImage: neckCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/neckcream.jpg",
    recommendedItemCodes: neckCreamArticles.map(a => a.id),
    contentMarkdown: neckCreamContent
  }
];

// data.ts の INITIAL_BLOG_POSTS を更新
const dataTsPath = path.resolve('src/data.ts');
let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

const blogPostsMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
if (dataTsContent.includes(blogPostsMarker)) {
  const jsonToInsert = blogPostsToAdd.map(bp => JSON.stringify(bp, null, 2)).join(',\n') + ',\n';
  dataTsContent = dataTsContent.replace(
    blogPostsMarker,
    `${blogPostsMarker}\n${jsonToInsert}`
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log(`🎉 成功！ src/data.ts の INITIAL_BLOG_POSTS に 3つの新規冬コスメ特集記事を先頭追加しました！`);
} else {
  console.error(`❌ data.ts 内に ${blogPostsMarker} が見つかりませんでした。`);
  process.exit(1);
}
