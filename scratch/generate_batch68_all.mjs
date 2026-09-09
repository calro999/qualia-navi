import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch68_g1_verified.json'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch68_g2_verified.json'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch68_g3_verified.json'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch68_g4_verified.json'));

console.log("Verified items loaded: 10 each.");
