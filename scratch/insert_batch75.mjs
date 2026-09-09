import fs from 'fs';

const art1 = JSON.parse(fs.readFileSync('scratch/batch75_art1.json'));
const art2 = JSON.parse(fs.readFileSync('scratch/batch75_art2.json'));
const art3 = JSON.parse(fs.readFileSync('scratch/batch75_art3.json'));
const art4 = JSON.parse(fs.readFileSync('scratch/batch75_art4.json'));

const batch = [art1, art2, art3, art4];
const batchSlugs = new Set(batch.map(a => a.slug));

const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

console.log(`Original article count: ${articles.length}`);

const filtered = articles.filter(a => !batchSlugs.has(a.slug));
filtered.push(...batch);

console.log(`New article count: ${filtered.length}`);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));

// Update all.txt
const allTxt = filtered.map(a => a.slug || a.id).join('\n') + '\n';
fs.writeFileSync('all.txt', allTxt);

console.log(`articles.json and all.txt updated successfully with Batch 75!`);
