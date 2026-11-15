// scripts/compile_monthly_hubs.mjs
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { readHubItemsFromDir } from './lib/md_item_parser.mjs';
import { getMonthParts } from './lib/month_templates.mjs';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sortByStarRating(items) {
  return [...items].sort((a, b) => {
    const rA = Number(a.starRating || 0);
    const rB = Number(b.starRating || 0);
    if (rB !== rA) return rB - rA;
    const cA = Number(a.reviewCount || 0);
    const cB = Number(b.reviewCount || 0);
    if (cB !== cA) return cB - cA;
    return String(b.addedDate || '').localeCompare(String(a.addedDate || ''));
  });
}

function sortByLatestDate(items) {
  return [...items].sort((a, b) => {
    const dCmp = String(b.addedDate || '').localeCompare(String(a.addedDate || ''));
    if (dCmp !== 0) return dCmp;
    return Number(b.starRating || 0) - Number(a.starRating || 0);
  });
}

function buildMonthNavigationBanner(monthStr, genreSlug, allMonths) {
  const { year, month } = getMonthParts(monthStr);
  const latestMonth = allMonths[0];
  const latestParts = getMonthParts(latestMonth);

  const monthPills = allMonths
    .map((m) => {
      const mp = getMonthParts(m);
      const isCurrent = m === monthStr;
      if (isCurrent) {
        return `<span style="display:inline-block;padding:5px 12px;border-radius:9999px;background:#e11d48;color:#fff;font-weight:800;font-size:12px;">📅 ${mp.year}年${mp.month}月版（閲覧中）</span>`;
      }
      return `<a href="/features/feat-${m}-${genreSlug}" style="display:inline-block;padding:5px 12px;border-radius:9999px;background:#fff;color:#be123c;border:1px solid #fecdd3;font-weight:700;font-size:12px;text-decoration:none;">${mp.year}年${mp.month}月版を見る →</a>`;
    })
    .join(' ');

  const latestRedirect =
    monthStr !== latestMonth
      ? `<div style="margin-top:10px;padding:10px 14px;background:#fff1f2;border:1px solid #fda4af;border-radius:10px;font-size:13px;font-weight:700;color:#9f1239;">👉 最新月（${latestParts.year}年${latestParts.month}月）の更新版はこちら：<a href="/features/feat-${latestMonth}-${genreSlug}" style="color:#e11d48;text-decoration:underline;margin-left:4px;">【${latestParts.year}年${latestParts.month}月最新】特集ページへ移動</a></div>`
      : '';

  return `<div style="background:linear-gradient(135deg,#fff1f2 0%,#fffbeb 100%);border:1px solid #fecdd3;border-radius:16px;padding:16px 20px;margin:20px 0;">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
    <span style="font-size:13px;font-weight:800;color:#9f1239;">🗓️ ${year}年${month}月 月次特集アーカイブ＆更新切替</span>
    <a href="/features/feat-${monthStr}-monthly-cosme-grand-hub" style="font-size:12px;font-weight:800;color:#b45309;text-decoration:underline;">📚 ${year}年${month}月 全24ジャンル総合ハブへ戻る</a>
  </div>
  <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px;">
    ${monthPills}
  </div>
  ${latestRedirect}
</div>`;
}

function buildLatestSpotlightHtml(latestItems, rankLookup) {
  const topLatest = latestItems.slice(0, 3);
  if (topLatest.length === 0) return '';

  const cards = topLatest
    .map((item) => {
      const rank = rankLookup.get(item.itemCode) || 1;
      const rating = Number(item.starRating || 4.5).toFixed(2);
      const name = escapeHtml(item.cleanName || item.productName);
      const added = escapeHtml(item.addedDate || '');
      const point = escapeHtml(item.featurePoint || '');
      const price = escapeHtml(item.price || '');
      const img = escapeHtml(item.imageUrl || '/images/placeholder.svg');
      const aff = escapeHtml(item.affiliateUrl || '#');

      return `<div style="background:#ffffff;border:1.5px solid #fda4af;border-radius:14px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
    <span style="background:#e11d48;color:#fff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:9999px;">🆕 ${added} 追加</span>
    <span style="font-size:12px;font-weight:800;color:#b45309;">現在 ${rank}位 (★${rating})</span>
  </div>
  <div style="display:flex;gap:12px;align-items:center;">
    <img src="${img}" alt="${name}" loading="lazy" style="width:72px;height:72px;object-fit:contain;border-radius:10px;border:1px solid #f1f5f9;background:#fff;padding:4px;flex-shrink:0;" />
    <div style="min-width:0;flex:1;">
      <div style="font-size:13.5px;font-weight:800;color:#0f172a;line-height:1.4;margin-bottom:4px;">
        <a href="#rank-${rank}" style="color:#0f172a;text-decoration:none;">${name}</a>
      </div>
      <div style="font-size:13px;font-weight:800;color:#e11d48;">${price}</div>
    </div>
  </div>
  <p style="margin:0;font-size:12px;color:#475569;line-height:1.6;">${point}</p>
  <div style="display:flex;gap:8px;">
    <a href="#rank-${rank}" style="flex:1;text-align:center;padding:8px 10px;border-radius:8px;background:#fff1f2;color:#be123c;font-size:12px;font-weight:800;text-decoration:none;border:1px solid #fecdd3;">レビューへ ↓</a>
    <a href="${aff}" target="_blank" rel="nofollow noopener noreferrer sponsored" style="flex:1;text-align:center;padding:8px 10px;border-radius:8px;background:linear-gradient(135deg,#ea580c,#e11d48);color:#fff;font-size:12px;font-weight:800;text-decoration:none;">楽天で見る ↗</a>
  </div>
</div>`;
    })
    .join('\n');

  return `<div style="background:linear-gradient(135deg,#fff1f2 0%,#fdf2f8 100%);border:2px solid #fb7185;border-radius:18px;padding:18px;margin:20px 0;">
  <div style="font-size:13px;font-weight:800;color:#be123c;margin-bottom:12px;">✨ 毎日更新！直近追加された注目ピックアップ（新着順トップ3）</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;">
    ${cards}
  </div>
</div>`;
}

function buildComparisonTableHtml(rankedItems, latestDate) {
  const rows = rankedItems
    .map((item, idx) => {
      const rank = idx + 1;
      const rating = Number(item.starRating || 4.5).toFixed(2);
      const count = Number(item.reviewCount || 0).toLocaleString();
      const name = escapeHtml(item.cleanName || item.productName);
      const price = escapeHtml(item.price || '');
      const point = escapeHtml(item.featurePoint || '');
      const aff = escapeHtml(item.affiliateUrl || '#');
      const isNew = item.addedDate === latestDate;
      const rankBadgeBg =
        rank === 1 ? '#f59e0b' : rank === 2 ? '#64748b' : rank === 3 ? '#b45309' : '#f1f5f9';
      const rankBadgeColor = rank <= 3 ? '#ffffff' : '#475569';

      return `<tr style="border-bottom:1px solid #f1f5f9;transition:background 0.15s ease;">
  <td style="padding:12px 6px;text-align:center;vertical-align:middle;width:48px;">
    <span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:9999px;background:${rankBadgeBg};color:${rankBadgeColor};font-weight:900;font-size:12px;">${rank}</span>
  </td>
  <td style="padding:12px 10px;vertical-align:middle;min-width:180px;">
    <div style="font-weight:800;font-size:13px;color:#0f172a;line-height:1.45;word-break:break-word;">
      ${isNew ? '<span style="display:inline-block;background:#e11d48;color:#fff;font-size:10px;font-weight:900;padding:2px 6px;border-radius:4px;margin-right:4px;vertical-align:middle;">NEW</span>' : ''}
      <a href="#rank-${rank}" style="color:#0f172a;text-decoration:underline;text-underline-offset:2px;">${name}</a>
    </div>
    <div style="font-size:11.5px;color:#64748b;margin-top:4px;line-height:1.5;word-break:break-word;">${point}</div>
  </td>
  <td style="padding:12px 8px;text-align:center;vertical-align:middle;width:90px;">
    <div style="font-weight:900;color:#d97706;font-size:13px;white-space:nowrap;">★ ${rating}</div>
    <div style="font-size:11px;color:#64748b;white-space:nowrap;">(${count}件)</div>
  </td>
  <td style="padding:12px 8px;text-align:center;vertical-align:middle;width:110px;">
    <div style="font-weight:800;color:#be123c;font-size:13px;line-height:1.3;word-break:break-word;">${price}</div>
  </td>
  <td style="padding:12px 8px;text-align:center;vertical-align:middle;width:120px;">
    <a href="${aff}" target="_blank" rel="nofollow noopener noreferrer sponsored" style="display:inline-flex;align-items:center;justify-content:center;padding:7px 12px;border-radius:8px;background:linear-gradient(135deg,#ea580c,#e11d48);color:#fff;font-size:11.5px;font-weight:800;text-decoration:none;white-space:nowrap;box-shadow:0 2px 6px rgba(225,29,72,0.2);">楽天公式 ↗</a>
  </td>
</tr>`;
    })
    .join('\n');

  return `<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;border:1.5px solid #fecdd3;border-radius:16px;background:#ffffff;margin:20px 0;box-shadow:0 2px 10px rgba(0,0,0,0.03);">
  <table style="width:100%;border-collapse:collapse;min-width:600px;text-align:left;table-layout:auto;">
    <thead>
      <tr style="background:#fff1f2;border-bottom:2px solid #fecdd3;font-size:12px;color:#881337;">
        <th style="padding:10px 6px;text-align:center;width:48px;">順位</th>
        <th style="padding:10px 10px;">商品名・注目ポイント</th>
        <th style="padding:10px 8px;text-align:center;width:90px;">星評価</th>
        <th style="padding:10px 8px;text-align:center;width:110px;">参考価格</th>
        <th style="padding:10px 8px;text-align:center;width:120px;text-align:center;">購入・詳細</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</div>`;
}

function buildRankedProductBlock(item, rank, latestDate) {
  const rating = Number(item.starRating || 4.5).toFixed(2);
  const count = Number(item.reviewCount || 0).toLocaleString();
  const name = escapeHtml(item.cleanName || item.productName);
  const rawName = escapeHtml(item.productName || item.cleanName);
  const price = escapeHtml(item.price || '');
  const shop = escapeHtml(item.shopName || '楽天市場 取扱店舗');
  const img = escapeHtml(item.imageUrl || '/images/placeholder.svg');
  const aff = escapeHtml(item.affiliateUrl || '#');
  const point = escapeHtml(item.featurePoint || '');
  const skinType = escapeHtml(item.skinOrColorType || '');
  const texture = escapeHtml(item.texture || '');
  const added = escapeHtml(item.addedDate || '');
  const pointRate = Number(item.pointRate || 1);
  const isFreeShipping = Number(item.postageFlag || 0) === 0;
  const isNew = item.addedDate === latestDate;

  const badgeLabel =
    rank === 1
      ? '👑 総合starRating第1位'
      : rank === 2
      ? '🥈 総合starRating第2位'
      : rank === 3
      ? '🥉 総合starRating第3位'
      : item.badge || `🏆 注目ランキング第${rank}位`;

  const prosList = (Array.isArray(item.pros) ? item.pros : [])
    .map((p) => `<li style="margin-bottom:4px;">${escapeHtml(p)}</li>`)
    .join('');
  const consList = (Array.isArray(item.cons) ? item.cons : [])
    .map((c) => `<li style="margin-bottom:4px;">${escapeHtml(c)}</li>`)
    .join('');

  const reviewParagraphs = String(item.reviewMarkdown || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 12px 0;font-size:14.5px;line-height:1.85;color:#334155;">${escapeHtml(p)}</p>`)
    .join('\n');

  const shippingBadge = isFreeShipping
    ? '<span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">送料無料ライン対応・設定あり</span>'
    : '<span style="background:#f8fafc;color:#475569;border:1px solid #cbd5e1;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;">送料条件は販売店ページで要確認</span>';
  const pointBadge =
    pointRate >= 2
      ? `<span style="background:#fffbeb;color:#b45309;border:1px solid #fde68a;font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;">ポイント${pointRate}倍対象</span>`
      : '';
  const newBadge = isNew
    ? `<span style="background:#e11d48;color:#fff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:9999px;">🆕 ${added} 新着追加</span>`
    : `<span style="background:#f1f5f9;color:#475569;font-size:11px;font-weight:700;padding:3px 10px;border-radius:9999px;">追加日: ${added}</span>`;

  return `
### 第${rank}位：${item.cleanName || item.productName}

<div id="rank-${rank}" style="border:2px solid ${rank <= 3 ? '#fda4af' : '#e2e8f0'};border-radius:18px;padding:20px;margin:14px 0 28px 0;background:linear-gradient(180deg,#ffffff 0%,#fffdfd 100%);box-shadow:0 4px 16px rgba(15,23,42,0.04);scroll-margin-top:90px;">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding-bottom:12px;margin-bottom:14px;border-bottom:1px dashed #e2e8f0;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;">
      <span style="background:linear-gradient(135deg,#be123c,#e11d48);color:#fff;font-weight:900;font-size:13px;padding:4px 14px;border-radius:9999px;">${escapeHtml(badgeLabel)}</span>
      ${newBadge}
    </div>
    <span style="font-size:12.5px;color:#64748b;font-weight:600;">販売ショップ: <strong style="color:#0f172a;">${shop}</strong></span>
  </div>

  <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;">
    <div style="flex:0 0 180px;margin:0 auto;text-align:center;">
      <a href="${aff}" target="_blank" rel="nofollow noopener noreferrer sponsored" style="display:block;border-radius:14px;border:1px solid #e2e8f0;background:#fff;padding:8px;">
        <img src="${img}" alt="${name}" loading="lazy" style="width:100%;max-height:180px;object-fit:contain;" />
      </a>
      <div style="margin-top:8px;">
        <span style="color:#f59e0b;font-size:14px;font-weight:900;">★ ${rating}</span>
        <span style="font-size:12px;color:#64748b;margin-left:4px;">(${count}件の購入者評価)</span>
      </div>
    </div>

    <div style="flex:1 1 280px;">
      <div style="font-size:17px;font-weight:900;color:#0f172a;line-height:1.45;margin-bottom:8px;">${name}</div>
      <div style="font-size:11.5px;color:#64748b;margin-bottom:10px;line-height:1.5;">正式掲載名: ${rawName}</div>

      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:12px;">
        <span style="font-size:21px;font-weight:900;color:#be123c;">${price}</span>
        ${shippingBadge}
        ${pointBadge}
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-bottom:14px;font-size:13px;line-height:1.65;color:#334155;">
        <div style="margin-bottom:4px;"><strong style="color:#be123c;">✦ 注目ポイント:</strong> ${point}</div>
        ${skinType ? `<div style="margin-bottom:4px;"><strong style="color:#0f172a;">✦ 向いているタイプ:</strong> ${skinType}</div>` : ''}
        ${texture ? `<div><strong style="color:#0f172a;">✦ 質感・使用感:</strong> ${texture}</div>` : ''}
      </div>

      <a href="${aff}" target="_blank" rel="nofollow noopener noreferrer sponsored" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;box-sizing:border-box;background:linear-gradient(135deg,#ea580c 0%,#e11d48 100%);color:#ffffff;font-weight:900;font-size:14px;padding:12px 20px;border-radius:12px;text-decoration:none;box-shadow:0 4px 12px rgba(225,29,72,0.22);">
        <span>🛒 楽天市場で現在の価格・在庫・レビューを見る ↗</span>
      </a>
    </div>
  </div>

  <div style="margin-top:18px;padding-top:16px;border-top:1px solid #f1f5f9;">
    <div style="font-size:14.5px;font-weight:800;color:#0f172a;margin-bottom:8px;">📝 成分・仕上がり・コスパの徹底検証メモ</div>
    ${reviewParagraphs}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:12px;">
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px 14px;">
        <strong style="color:#166534;font-size:13px;display:block;margin-bottom:6px;">👍 選ばれる理由・メリット</strong>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#15803d;line-height:1.65;">
          ${prosList}
        </ul>
      </div>
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:12px 14px;">
        <strong style="color:#991b1b;font-size:13px;display:block;margin-bottom:6px;">⚠️ 購入前の注意点・チェック項目</strong>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#b91c1c;line-height:1.65;">
          ${consList}
        </ul>
      </div>
    </div>
  </div>
</div>`;
}

function buildGenreLinksGrid(monthStr, currentGenreSlug, genres) {
  const { year, month } = getMonthParts(monthStr);
  const pills = genres
    .map((g) => {
      const active = g.slug === currentGenreSlug;
      if (active) {
        return `<span style="display:inline-block;padding:5px 10px;border-radius:8px;background:#0f172a;color:#fff;font-size:11.5px;font-weight:800;">${escapeHtml(g.shortName)}</span>`;
      }
      return `<a href="/features/feat-${monthStr}-${g.slug}" style="display:inline-block;padding:5px 10px;border-radius:8px;background:#fff;color:#334155;border:1px solid #cbd5e1;font-size:11.5px;font-weight:700;text-decoration:none;">${escapeHtml(g.shortName)}</a>`;
    })
    .join(' ');

  return `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;margin:28px 0;">
  <div style="font-size:13px;font-weight:800;color:#0f172a;margin-bottom:10px;">📂 ${year}年${month}月版・全24ジャンル特集ハブ一覧</div>
  <div style="display:flex;flex-wrap:wrap;gap:6px;">
    ${pills}
  </div>
</div>`;
}

function compileGenreHub(monthStr, meta, items, allMonths, genres) {
  const { year, month } = getMonthParts(monthStr);
  const rankedItems = sortByStarRating(items);
  const latestItems = sortByLatestDate(items);
  const rankLookup = new Map();
  rankedItems.forEach((item, idx) => {
    rankLookup.set(item.itemCode, idx + 1);
  });

  const latestDate = latestItems[0]?.addedDate || `${monthStr}-15`;
  const monthNav = buildMonthNavigationBanner(monthStr, meta.genreSlug, allMonths);
  const latestSpotlight = buildLatestSpotlightHtml(latestItems, rankLookup);
  const comparisonTable = buildComparisonTableHtml(rankedItems, latestDate);
  const rankedCards = rankedItems
    .map((item, idx) => buildRankedProductBlock(item, idx + 1, latestDate))
    .join('\n');
  const genreLinks = buildGenreLinksGrid(monthStr, meta.genreSlug, genres);

  const guideMd = (meta.buyingGuide || [])
    .map((tip, i) => `${i + 1}. **ポイント${i + 1}**：${tip}`)
    .join('\n');

  const faqMd = (meta.faqs || [])
    .map((f) => `### Q. ${f.q}\n\n**A.** ${f.a}`)
    .join('\n\n');

  const contentMarkdown = `${monthNav}

${meta.seasonalNote}

現在このページには、楽天市場の実データと評価実績をもとに厳選した **全${rankedItems.length}商品** を掲載しています（最終追加日: **${latestDate}**）。毎日の新着追加にあわせてページ上部の注目枠と \`starRating\` ランキングが自動でアップデートされます。

## 🆕 本日・直近追加された最新${meta.shortName}ピックアップ

${latestSpotlight}

## 👑 ${year}年${month}月最新｜starRating順・${meta.genreName}ランキング早見比較表（全${rankedItems.length}商品）

評価順（\`starRating\` × レビュー件数）で自動整列した全ラインナップの一覧表です。商品名をクリックするとページ内の詳細検証レビューへ移動します。

${comparisonTable}

## 🏆 starRating順・${meta.genreName} 徹底検証ランキング（第1位〜第${rankedItems.length}位）

ここからは、ランキング上位から順に各商品の成分特徴・質感・メリットと購入前の注意点まで1点ずつ詳しく検証します。

${rankedCards}

## 💡 ${year}年${month}月に失敗しない${meta.genreName}の選び方ガイド

${guideMd}

## ❓ ${meta.genreName}に関するよくある疑問 Q&A

${faqMd}

${genreLinks}
`;

  const coverImage =
    rankedItems[0]?.imageUrl ||
    latestItems[0]?.imageUrl ||
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80';

  const readTimeMinutes = Math.max(12, Math.round(rankedItems.length * 1.4));

  return {
    id: meta.id,
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    targetGender: meta.targetGender || 'women',
    coverImage,
    authorId: meta.authorId,
    authorName: meta.authorName,
    authorRole: meta.authorRole,
    authorAvatar: meta.authorAvatar,
    createdAt: meta.createdAt || `${monthStr}-01`,
    updatedAt: latestDate,
    readTimeMinutes,
    introText: `${meta.introText}（現在${rankedItems.length}アイテム掲載・${latestDate}更新）`,
    recommendedItemCodes: [],
    contentMarkdown,
    isHallOfFame: true
  };
}

function compileGrandMonthPortal(monthStr, compiledGenrePosts, genreStats, allMonths) {
  const { year, month, season } = getMonthParts(monthStr);
  const totalItems = genreStats.reduce((sum, g) => sum + g.count, 0);
  const latestUpdate = genreStats
    .map((g) => g.latestDate)
    .sort()
    .reverse()[0] || `${monthStr}-15`;

  const cardsHtml = genreStats
    .map((g) => {
      const topName = escapeHtml(g.topItem?.cleanName || '厳選ラインナップ更新中');
      const topRating = g.topItem ? Number(g.topItem.starRating || 4.5).toFixed(2) : '4.80';
      const topImg = escapeHtml(g.topItem?.imageUrl || '/images/placeholder.svg');
      return `<div style="background:#ffffff;border:1.5px solid #fecdd3;border-radius:16px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
  <div style="display:flex;align-items:center;justify-content:space-between;">
    <span style="background:#fff1f2;color:#be123c;font-size:11px;font-weight:800;padding:3px 9px;border-radius:9999px;">No.${g.genre.index}｜全${g.count}品</span>
    <span style="font-size:11px;color:#64748b;font-weight:700;">更新: ${escapeHtml(g.latestDate)}</span>
  </div>
  <div style="font-size:15.5px;font-weight:900;color:#0f172a;line-height:1.4;">
    <a href="/features/feat-${monthStr}-${g.genre.slug}" style="color:#0f172a;text-decoration:none;">${escapeHtml(g.genre.name)}</a>
  </div>
  <div style="display:flex;gap:10px;align-items:center;background:#f8fafc;padding:10px;border-radius:10px;">
    <img src="${topImg}" alt="${topName}" loading="lazy" style="width:52px;height:52px;object-fit:contain;border-radius:8px;background:#fff;border:1px solid #e2e8f0;padding:2px;flex-shrink:0;" />
    <div style="min-width:0;flex:1;">
      <div style="font-size:11px;font-weight:800;color:#d97706;">👑 1位 ★${topRating}</div>
      <div style="font-size:12px;font-weight:700;color:#334155;line-height:1.35;">${topName}</div>
    </div>
  </div>
  <a href="/features/feat-${monthStr}-${g.genre.slug}" style="display:block;text-align:center;padding:9px 12px;border-radius:10px;background:linear-gradient(135deg,#be123c,#e11d48);color:#fff;font-size:12.5px;font-weight:800;text-decoration:none;">${escapeHtml(g.genre.shortName)}ランキングを見る →</a>
</div>`;
    })
    .join('\n');

  const monthPills = allMonths
    .map((m) => {
      const mp = getMonthParts(m);
      if (m === monthStr) {
        return `<span style="display:inline-block;padding:5px 12px;border-radius:9999px;background:#e11d48;color:#fff;font-weight:800;font-size:12px;">📅 ${mp.year}年${mp.month}月総合ハブ（閲覧中）</span>`;
      }
      return `<a href="/features/feat-${m}-monthly-cosme-grand-hub" style="display:inline-block;padding:5px 12px;border-radius:9999px;background:#fff;color:#be123c;border:1px solid #fecdd3;font-weight:700;font-size:12px;text-decoration:none;">${mp.year}年${mp.month}月総合ハブ →</a>`;
    })
    .join(' ');

  const contentMarkdown = `<div style="background:linear-gradient(135deg,#fff1f2 0%,#fffbeb 100%);border:1px solid #fecdd3;border-radius:16px;padding:16px 20px;margin:20px 0;">
  <div style="font-size:13px;font-weight:800;color:#9f1239;margin-bottom:8px;">🗓️ 月別総合ランキング・アーカイブ</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px;">${monthPills}</div>
</div>

${season.climateNote}。${season.eventHint}に合わせて、**全24ジャンル・合計${totalItems}アイテム**を各ジャンル専門の特集ページへ集約し、毎日最新アイテムと \`starRating\` 評価ランキングを更新しています（最終更新: **${latestUpdate}**）。

## 🧭 ${year}年${month}月 全24ジャンル別・最新コスメランキング一覧

気になるカテゴリから、毎日更新される \`starRating\` 順ランキング＆本音レビューページへお進みください。

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin:24px 0;">
  ${cardsHtml}
</div>

## 🔄 Qualia Navi の「毎日育つジャンル特集」の仕組み

1. **新着アイテムを毎日1品ずつ自動追加**：各ジャンルページ上部の新着ピックアップ欄に、その日見つけた注目コスメのレビューが追加されます。
2. **starRating 連動の自動順位変動**：追加されたすべての商品は評価実績とレビュー数に基づいて自動で順位付けされ、実力派アイテムが自然と上位に並びます。
3. **毎月1日に新月特集を自動立ち上げ**：月が変わると最新月用の24ジャンルページが新設され、過去の月次ランキングとも行き来できます。
`;

  return {
    id: `feat-${monthStr}-monthly-cosme-grand-hub`,
    slug: `${monthStr}-monthly-cosme-grand-hub`,
    title: `【${year}年${month}月最新・総まとめ】全24ジャンル別コスメ人気ランキング総合ハブ（計${totalItems}アイテム毎日更新）`,
    subtitle: `${year}年${month}月の口紅・チーク・アイシャドウ・下地・ファンデ・化粧水・美容液・美容家電まで全24ジャンルのstarRatingランキングと新着アイテムを毎日更新で集約。`,
    targetGender: 'unisex',
    coverImage:
      compiledGenrePosts[0]?.coverImage ||
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-tachibana',
    authorName: '橘 えりか',
    authorRole: 'Qualia Navi コスメ＆美容編集長',
    authorAvatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    createdAt: `${monthStr}-01`,
    updatedAt: latestUpdate,
    readTimeMinutes: 10,
    introText: `${year}年${month}月最新コスメ全24ジャンル（計${totalItems}商品）の総合ポータルハブ。毎日更新される新着アイテムとstarRatingランキングへ最短アクセスできます。`,
    recommendedItemCodes: [],
    contentMarkdown,
    isHallOfFame: true
  };
}

export function compileAllMonthlyHubs() {
  const genresPath = path.resolve('content/hub-genres.json');
  const genres = JSON.parse(fs.readFileSync(genresPath, 'utf8'));
  const hubPagesRoot = path.resolve('content/hub-pages');
  const hubItemsRoot = path.resolve('content/hub-items');

  if (!fs.existsSync(hubPagesRoot)) {
    console.log('ℹ️ content/hub-pages が存在しないためコンパイルをスキップします。');
    return [];
  }

  const allMonths = fs
    .readdirSync(hubPagesRoot)
    .filter((d) => /^\d{4}-\d{2}$/.test(d) && fs.statSync(path.join(hubPagesRoot, d)).isDirectory())
    .sort()
    .reverse();

  const compiledPosts = [];

  for (const monthStr of allMonths) {
    const genrePostsForMonth = [];
    const genreStats = [];

    for (const genre of genres) {
      const metaPath = path.join(hubPagesRoot, monthStr, genre.slug, 'meta.json');
      if (!fs.existsSync(metaPath)) continue;

      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      const itemDir = path.join(hubItemsRoot, monthStr, genre.slug);
      const items = readHubItemsFromDir(itemDir);

      const post = compileGenreHub(monthStr, meta, items, allMonths, genres);
      genrePostsForMonth.push(post);

      const ranked = sortByStarRating(items);
      const latest = sortByLatestDate(items);
      genreStats.push({
        genre,
        count: items.length,
        topItem: ranked[0] || null,
        latestDate: latest[0]?.addedDate || meta.updatedAt || `${monthStr}-01`
      });
    }

    if (genrePostsForMonth.length > 0) {
      const portalPost = compileGrandMonthPortal(monthStr, genrePostsForMonth, genreStats, allMonths);
      compiledPosts.push(portalPost, ...genrePostsForMonth);
    }
  }

  if (compiledPosts.length === 0) {
    console.log('ℹ️ コンパイル対象の月次ハブ記事がありません。');
    return [];
  }

  // src/data.ts の INITIAL_BLOG_POSTS を更新（既存の feat-YYYY-MM-* を置換し先頭に配置）
  const dataTsPath = path.resolve('src/data.ts');
  const dataTsContent = fs.readFileSync(dataTsPath, 'utf8');
  const blogMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = ';
  const compMarker = 'export const INITIAL_COMPARISONS: ProductComparison[] = ';

  const blogIdx = dataTsContent.indexOf(blogMarker);
  const compIdx = dataTsContent.indexOf(compMarker);
  if (blogIdx === -1 || compIdx === -1) {
    throw new Error('src/data.ts 内に INITIAL_BLOG_POSTS または INITIAL_COMPARISONS が見つかりません');
  }

  const blogSlice = dataTsContent
    .slice(blogIdx + blogMarker.length, compIdx)
    .trim()
    .replace(/;\s*$/, '');
  const existingBlogs = vm.runInNewContext(`(${blogSlice})`);
  const nonMonthlyBlogs = existingBlogs.filter(
    (b) => !/^feat-\d{4}-\d{2}-/.test(String(b.id || ''))
  );

  const mergedBlogs = [...compiledPosts, ...nonMonthlyBlogs];
  const updatedDataTs =
    dataTsContent.slice(0, blogIdx + blogMarker.length) +
    JSON.stringify(mergedBlogs, null, 2) +
    ';\n\n' +
    dataTsContent.slice(compIdx);

  fs.writeFileSync(dataTsPath, updatedDataTs, 'utf8');

  const publicBlogsPath = path.resolve('public/data/blogs.json');
  fs.mkdirSync(path.dirname(publicBlogsPath), { recursive: true });
  fs.writeFileSync(publicBlogsPath, JSON.stringify(mergedBlogs), 'utf8');

  console.log(
    `✅ [Monthly Hub Compiler] 月次ハブ記事 ${compiledPosts.length} 本をコンパイルし、src/data.ts と public/data/blogs.json（計 ${mergedBlogs.length} 本）を更新しました！`
  );
  return compiledPosts;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  compileAllMonthlyHubs();
}
