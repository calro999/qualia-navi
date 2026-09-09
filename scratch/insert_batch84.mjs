import fs from 'fs';

const articlesPath = 'src/data/articles.json';
const allTxtPath = 'all.txt';

console.log('Loading existing articles...');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
console.log(`Current articles count: ${articles.length}`);

const art1 = JSON.parse(fs.readFileSync('scratch/batch84_art1.json', 'utf-8'));
const art2 = JSON.parse(fs.readFileSync('scratch/batch84_art2.json', 'utf-8'));
const art3 = JSON.parse(fs.readFileSync('scratch/batch84_art3.json', 'utf-8'));
const art4 = JSON.parse(fs.readFileSync('scratch/batch84_art4.json', 'utf-8'));

const batch84 = [art1, art2, art3, art4];

for (const art of batch84) {
  const existingIdx = articles.findIndex(a => a.id === art.id || a.slug === art.slug);
  if (existingIdx !== -1) {
    console.log(`Replacing existing article: ${art.slug}`);
    articles[existingIdx] = art;
  } else {
    console.log(`Appending new article: ${art.slug} (${art.content.length} chars)`);
    articles.push(art);
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf-8');
console.log(`Updated articles.json! Total articles: ${articles.length}`);

// Update all.txt
let allTxt = fs.existsSync(allTxtPath) ? fs.readFileSync(allTxtPath, 'utf-8') : '';
const existingSlugs = new Set(allTxt.split('\n').map(s => s.trim()).filter(Boolean));

for (const art of batch84) {
  if (!existingSlugs.has(art.slug)) {
    allTxt += `\n${art.slug}`;
    console.log(`Added slug to all.txt: ${art.slug}`);
  }
}
fs.writeFileSync(allTxtPath, allTxt.trim() + '\n', 'utf-8');
console.log('Batch 84 insertion complete!');
