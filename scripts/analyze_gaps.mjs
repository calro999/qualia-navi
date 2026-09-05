import fs from 'fs';

const articles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
const queries = JSON.parse(fs.readFileSync('scratch/extracted_queries.json', 'utf8'));

const detailedReport = [];

for (const q of queries) {
  const t = q.query;
  // check title, tags, content
  const matches = articles.filter(a => {
    const inTitle = a.title && a.title.includes(t);
    const inTags = Array.isArray(a.tags) && a.tags.some(tg => tg && (tg.includes(t) || t.includes(tg)));
    const inContent = a.content && a.content.includes(t);
    return inTitle || inTags || inContent;
  });

  detailedReport.push({
    query: t,
    clicks: q.clicks,
    impressions: q.impressions,
    position: q.position,
    matchedCount: matches.length,
    topMatch: matches[0] ? { id: matches[0].id, title: matches[0].title } : null
  });
}

const unreached = detailedReport.filter(r => r.matchedCount === 0);
console.log(`Total queries: ${queries.length}`);
console.log(`Completely unreached queries: ${unreached.length}`);
console.log(`Sample unreached:`);
unreached.slice(0, 30).forEach(u => console.log(`[Pos: ${u.position}, Imp: ${u.impressions}] ${u.query}`));

fs.writeFileSync('scratch/query_coverage_report.json', JSON.stringify(detailedReport, null, 2));
