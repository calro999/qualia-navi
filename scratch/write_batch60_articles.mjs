
import fs from 'fs';

const g1Items = JSON.parse(fs.readFileSync('scratch/rakuten_batch60_g1_verified.json', 'utf8'));
const g2Items = JSON.parse(fs.readFileSync('scratch/rakuten_batch60_g2_verified.json', 'utf8'));
const g3Items = JSON.parse(fs.readFileSync('scratch/rakuten_batch60_g3_verified.json', 'utf8'));
const g4Items = JSON.parse(fs.readFileSync('scratch/rakuten_batch60_g4_verified.json', 'utf8'));

console.log('Script template ready.');
