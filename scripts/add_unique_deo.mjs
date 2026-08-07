import fs from 'fs';

const newUniqueDeoTopics = [
  `  - id: topic-body-seabreeze-soap
    category: bodycare
    keyword: "シーブリーズ 薬用デオドラントボディソープ"
    title_template: "【汗のニオイとキビを防ぐ】{product_name} キメ細かい泡で全身の汗・皮脂汚れを爽快殺菌"
    target_audience: "夏のバスタイムで全身の汗臭さとベタつきを爽快にリセットしたい方"
    is_hall_of_fame: true`,

  `  - id: topic-oral-clinica-advantage
    category: oralcare
    keyword: "クリニカ アドバンテージ ハミガキ"
    title_template: "【酵素でネバつき・口臭予防】{product_name} 予防歯科発想で朝の口臭原因菌を退治"
    target_audience: "朝起きたときの口内のネバつきや口臭を予防したい方"
    is_hall_of_fame: true`,

  `  - id: topic-body-happydeo-sheet
    category: bodycare
    keyword: "マンダム ハッピーデオ ボディシート"
    title_template: "【ハッピーな香りで汗消臭】{product_name} 潤い成分配合で拭いた後も乾燥しない快適シート"
    target_audience: "汗を拭き取りながら優しい香りと潤いをキープしたい方"
    is_hall_of_fame: false`
];

function addUniqueDeoTopics() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + newUniqueDeoTopics.join('\n\n') + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('追加の消臭特化商品3件を articles.yml に追加しました。');
}

addUniqueDeoTopics();
