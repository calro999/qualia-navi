import fs from 'fs';

const report = JSON.parse(fs.readFileSync('scratch/query_coverage_report.json', 'utf8'));
const unreached = report.filter(r => r.matchedCount === 0);

console.log('Unreached count:', unreached.length);

const groups = {
  // 1. コフレ・ホリデー20代・30代
  coffret: [],
  // 2. マツパ・マツエク後ケア＆コーティング美容液
  lash_care: [],
  // 3. リップ（秋・上品・イエベ・成分・クラシックレッド等）
  lip_variations: [],
  // 4. ベースメイク・コンシーラー・ファンデ（マキアージュ・セザンヌ・メイベリン等）
  base_foundation: [],
  // 5. アイブロウ・眉コート（ブロウラッシュEX・年代別）
  eyebrow: [],
  // 6. スキンケア（乳液ベタつかない・拭き取り・アベンヌ汗疹等）
  skincare_trouble: [],
  // 7. その他
  others: []
};

for (const item of unreached) {
  const q = item.query;
  if (/コフレ|ホリデー/.test(q)) {
    groups.coffret.push(item);
  } else if (/マツパ|マツエク|まつ毛/.test(q)) {
    groups.lash_care.push(item);
  } else if (/リップ|口紅/.test(q)) {
    groups.lip_variations.push(item);
  } else if (/ファンデ|コンシーラー|下地|プライマー/.test(q)) {
    groups.base_foundation.push(item);
  } else if (/アイブロウ|ブロウ|眉/.test(q)) {
    groups.eyebrow.push(item);
  } else if (/拭き取り|ふきとり|乳液|洗顔|アベンヌ|汗疹|美容液|スキンケア/.test(q)) {
    groups.skincare_trouble.push(item);
  } else {
    groups.others.push(item);
  }
}

for (const [k, v] of Object.entries(groups)) {
  console.log(`\n=== Group: ${k} (${v.length} queries) ===`);
  v.forEach(x => console.log(`  - ${x.query} (Imp: ${x.impressions}, Pos: ${x.position})`));
}
