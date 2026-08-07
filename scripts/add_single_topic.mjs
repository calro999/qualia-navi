import fs from 'fs';

const singleTopic = `  - id: topic-skincare-suisai-powder
    category: skincare
    keyword: "suisai スイサイ ビューティクリア パウダーウォッシュ N"
    title_template: "【毛穴黒ずみ・角栓スッキリ】{product_name} 2つの酵素＆アミノ酸系洗浄成分でつるつる素肌"
    target_audience: "夏の角栓・皮脂つまり・黒ずみ毛穴を洗顔でケアしたい方"
    is_hall_of_fame: true`;

function addSingleTopic() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const settingsIdx = content.indexOf('settings:');
  const beforeSettings = content.slice(0, settingsIdx);
  const settingsPart = content.slice(settingsIdx);

  const updatedContent = beforeSettings + '\n' + singleTopic + '\n\n' + settingsPart;

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('suisai 酵素洗顔を articles.yml に追加しました。');
}

addSingleTopic();
