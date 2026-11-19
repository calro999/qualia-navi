// scripts/lib/month_templates.mjs
import fs from 'fs';
import path from 'path';

export const MONTH_SEASON_CONFIG = {
  1: {
    seasonName: '厳冬・新春',
    emoji: '🎍',
    headlineBadge: '1月・厳冬レスキュー＆新春リセット',
    climateNote: '一年で最も気温・湿度が下がり、屋外の冷気と室内の暖房による乾燥ダメージがピークに達する1月',
    eventHint: '新春初売り・お買い物マラソンのポイント還元を活用して冬後半の保湿アイテムを賢く揃える時期'
  },
  2: {
    seasonName: '晩冬・ゆらぎ',
    emoji: '🌸',
    headlineBadge: '2月・乾燥＆春のゆらぎ先回りケア',
    climateNote: '真冬の乾燥が続く一方、気温差や花粉・紫外線量の増加でバリア機能がゆらぎやすくなる2月',
    eventHint: '春の新作コスメ解禁と冬物保湿のリピート買いが交差するタイミング'
  },
  3: {
    seasonName: '春・新生活',
    emoji: '🌷',
    headlineBadge: '3月・春の新作＆花粉ブロック特集',
    climateNote: '環境の変化や花粉・PM2.5・紫外線急増により、軽やかなツヤ感とバリア保護の両立が求められる3月',
    eventHint: '楽天スーパーSALEや新生活応援キャンペーンで一軍コスメを総入れ替えしやすい季節'
  },
  4: {
    seasonName: '春本番・UV強化',
    emoji: '🌿',
    headlineBadge: '4月・春本番メイク＆紫外線対策始動',
    climateNote: '日差しが強まり日中の皮脂・汗が出始めるため、保湿と崩れにくさのバランス見直しが必要な4月',
    eventHint: '春夏ベースメイクやUV下地の最新ランキングが動く時期'
  },
  5: {
    seasonName: '初夏・皮脂UVケア',
    emoji: '☀️',
    headlineBadge: '5月・初夏の紫外線＆テカリ毛穴対策',
    climateNote: '紫外線量が一気に増え、湿度上昇とともに毛穴の開きやメイク崩れが気になり始める5月',
    eventHint: '皮脂・汗に強いキープ系コスメと透明感スキンケアの需要が高まる時期'
  },
  6: {
    seasonName: '梅雨・湿気崩れ対策',
    emoji: '☔',
    headlineBadge: '6月・梅雨の湿気崩れ＆うねりケア',
    climateNote: '高い湿度による前髪・メイクの崩れや、皮脂とインナードライが混在しやすい6月',
    eventHint: '楽天スーパーSALEを狙ってウォータープルーフ＆湿気対策の名品をまとめ買いしやすい時期'
  },
  7: {
    seasonName: '盛夏・猛暑UV',
    emoji: '🌻',
    headlineBadge: '7月・猛暑耐久＆クール美白ケア',
    climateNote: '強い紫外線・猛暑による汗と冷房乾燥が同時に押し寄せる7月',
    eventHint: 'お中元・夏ギフトや夏休みレジャー前の鉄壁アイテムが人気の時期'
  },
  8: {
    seasonName: '真夏・アフターケア',
    emoji: '🌊',
    headlineBadge: '8月・真夏のUVアフターケア＆毛穴引き締め',
    climateNote: '蓄積した紫外線ダメージや皮脂酸化によるくすみ・ごわつきを集中リセットしたい8月',
    eventHint: '夏バテ肌の鎮静ケアと秋の新色先取りチェックが重なる時期'
  },
  9: {
    seasonName: '初秋・夏の疲れリセット',
    emoji: '🍇',
    headlineBadge: '9月・夏のダメージ回復＆秋色シフト',
    climateNote: '夏の紫外線ダメージが肌表面に現れやすく、朝晩の風で乾きを感じ始める9月',
    eventHint: '楽天スーパーSALEに合わせて秋冬向けの高保湿ラインへ切り替える絶好のタイミング'
  },
  10: {
    seasonName: '秋本番・寒暖差ケア',
    emoji: '🍁',
    headlineBadge: '10月・寒暖差ゆらぎ＆深み秋メイク',
    climateNote: '急激な湿度低下と寒暖差で肌のゴワつき・小ジワが目立ちやすくなる10月',
    eventHint: 'お買い物マラソンや5と0のつく日を活用して秋冬用の潤いコスメを揃える季節'
  },
  11: {
    seasonName: '晩秋・ホリデー本格化',
    emoji: '🎄',
    headlineBadge: '11月・乾燥本格防衛＆ホリデー注目コスメ',
    climateNote: '木枯らしと暖房の始動で一気に水分が奪われ、ホリデーイベントや限定コフレへの注目も高まる11月',
    eventHint: '楽天ブラックフライデーや感謝祭でデパコス・韓国コスメ・新作を実質お得に入手できる大注目月'
  },
  12: {
    seasonName: '真冬・ご褒美＆ギフト',
    emoji: '🎁',
    headlineBadge: '12月・真冬の高保湿＆年末ご褒美ギフト',
    climateNote: '年末の多忙さと厳しい寒さ・乾燥の中でも、ツヤと血色を絶やさない持続力と高保湿が問われる12月',
    eventHint: '楽天スーパーSALE＆大感謝祭で1年頑張った自分へのご褒美やクリスマスギフトを選ぶ最盛期'
  }
};

export function getMonthParts(monthStr) {
  const [yStr, mStr] = monthStr.split('-');
  const year = Number(yStr);
  const month = Number(mStr);
  const season = MONTH_SEASON_CONFIG[month] || MONTH_SEASON_CONFIG[11];
  return { year, month, season };
}

export function getSeasonKeyForFrontend(monthNum) {
  if (monthNum === 10) return 'oct';
  if (monthNum === 11) return 'nov';
  if (monthNum === 12) return 'dec';
  return 'jan';
}

export function createGenreMeta(monthStr, genre) {
  const { year, month, season } = getMonthParts(monthStr);
  const id = `feat-${monthStr}-${genre.slug}`;

  return {
    id,
    slug: `${monthStr}-${genre.slug}`,
    month: monthStr,
    year,
    monthNum: month,
    genreIndex: genre.index,
    genreSlug: genre.slug,
    genreName: genre.name,
    shortName: genre.shortName,
    categorySlug: genre.categorySlug,
    categoryLabel: genre.categoryLabel,
    targetGender: genre.targetGender || 'women',
    authorId: genre.authorId,
    authorName: genre.authorName,
    authorRole: genre.authorRole,
    authorAvatar: genre.authorAvatar,
    seasonBadge: `${season.emoji} ${year}年${month}月版｜${season.headlineBadge}`,
    title: `【${year}年${month}月最新】${genre.name}おすすめ人気ランキング＆徹底レビュー【毎日更新】`,
    subtitle: `${season.climateNote}。楽天市場の最新評価・レビュー実績データと実使用目線の検証をもとに、${year}年${month}月に本当におすすめできる${genre.name}を厳選してランキング形式で毎日アップデートします。`,
    introText: `${year}年${month}月最新の${genre.name}人気ランキング。星評価（starRating）順の比較早見表と新着アイテム速報を毎日1品ずつ追記して最新化しています。`,
    seasonalNote: `${season.climateNote}。${season.eventHint}だからこそ、ただ流行っているだけでなく「今の気候で心地よく使い続けられるか」「価格に見合う実感があるか」を軸に厳選しました。`,
    buyingGuide: genre.buyingGuide || [],
    faqs: genre.faqs || [],
    createdAt: `${monthStr}-01`,
    updatedAt: `${monthStr}-15`
  };
}

/**
 * 指定月の全24ジャンル用 meta.json とアイテム格納ディレクトリが存在しない場合に自動生成する
 */
export function ensureMonthlyHubPages(monthStr, genres) {
  const pagesDir = path.resolve('content/hub-pages', monthStr);
  const itemsDir = path.resolve('content/hub-items', monthStr);
  fs.mkdirSync(pagesDir, { recursive: true });
  fs.mkdirSync(itemsDir, { recursive: true });

  let createdCount = 0;
  for (const genre of genres) {
    const genrePageDir = path.join(pagesDir, genre.slug);
    const genreItemDir = path.join(itemsDir, genre.slug);
    fs.mkdirSync(genrePageDir, { recursive: true });
    fs.mkdirSync(genreItemDir, { recursive: true });

    const metaPath = path.join(genrePageDir, 'meta.json');
    if (!fs.existsSync(metaPath)) {
      const meta = createGenreMeta(monthStr, genre);
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
      createdCount++;
    }
  }
  return createdCount;
}
