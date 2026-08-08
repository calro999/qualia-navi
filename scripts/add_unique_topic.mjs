import fs from 'fs';

const uniqueTopic = `  - id: topic-makeup-immeme-pepbalm
    category: makeup
    keyword: "アイムミミ マルチペップバーム"
    title_template: "【絵の具みたいで可愛すぎるとSNS大バズり】{product_name} 8-9月に映えるマルチカラーバーム"
    target_audience: "リップ・チーク・アイシャドウを1本でこなす時短おしゃれコスメをお求めの方"
    is_hall_of_fame: true`;

function addUniqueTopic() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  const updatedContent = content.trim() + '\n\n' + uniqueTopic + '\n';

  fs.writeFileSync(ymlPath, updatedContent, 'utf-8');
  console.log('追加のバズコスメ1件を articles.yml に追加しました。');
}

addUniqueTopic();
