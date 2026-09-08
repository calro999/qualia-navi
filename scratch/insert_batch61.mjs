import fs from 'fs';

const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const batch61 = [
  JSON.parse(fs.readFileSync('scratch/batch61_art1.json', 'utf8')),
  JSON.parse(fs.readFileSync('scratch/batch61_art2.json', 'utf8')),
  JSON.parse(fs.readFileSync('scratch/batch61_art3.json', 'utf8')),
  JSON.parse(fs.readFileSync('scratch/batch61_art4.json', 'utf8'))
];

for (const art of batch61) {
  const existingIdx = articles.findIndex(a => a.id === art.id);
  if (existingIdx !== -1) {
    articles[existingIdx] = art;
    console.log(`Updated existing article: ${art.id}`);
  } else {
    articles.unshift(art);
    console.log(`Added new article: ${art.id}`);
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
console.log(`Total articles in articles.json: ${articles.length}`);

// Sync all.txt
const allTxt = articles.map(a => `https://qualia-navi.com/article/${a.id}`).join('\n');
fs.writeFileSync('all.txt', allTxt);
console.log(`Synced all.txt (${articles.length} lines)`);
