import re

new_posts = """
  {
    id: 'post-ipsa-aqua',
    title: '【薬用化粧水の最高峰】イプサ ザ・タイムR アクア 徹底検証＆大人ニキビ・インナードライ対策ガイド',
    subtitle: '独自の保湿成分アクアインセンダーが肌表面に水の層をつくり、水分をキープ。テカリと乾燥を同時に予防！',
    slug: 'ipsa-time-r-aqua-review',
    category: 'skincare',
    categoryName: 'スキンケア・美容液',
    readTime: '6分',
    createdAt: '2026-07-25',
    author: {
      name: '橘 えりか',
      role: 'コスメ＆美容編集長',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    coverImage: '/images/products/shirojyun_premium.jpg',
    content: `
# イプサ ザ・タイムR アクア 徹底レビュー

## 1. 薬用化粧水No.1！水感バリアのリアル効果口コミ
「イプサ ザ・タイムR アクア」は、デパコス化粧水の中でも殿堂入りの人気を誇る薬用化粧水です。肌表面に潤いの層をつくり、キメを整えて水で満たされたような透明感あふれる肌へ導きます。

## 2. ニキビ・肌荒れ有効成分をダブル配合
薬用有効成分（トラネキサム酸・グリチルリチン酸ジカリウム）を配合し、大人のニキビや肌荒れを予防。アルコールフリーでデリケートな肌でも安心して使えます。

## 3. 楽天でお得に最安値購入
楽天ポイントアップ還元やクーポンを利用すれば、実質最安価格でお得に購入可能です。
    `,
    relatedProducts: ['prod-decorte', 'prod-curel-uv'],
    isHallOfFame: true
  },
  {
    id: 'post-suqqu-eyeshadow',
    title: '【デパコス至高のアイシャドウ】SUQQU シグニチャー カラー アイズ 密着感＆ツヤ発色レビュー',
    subtitle: '働く大人の目元に上品な陰影と艶やかな輝き。粉飛びゼロで一日中崩れない至高のパレット。',
    slug: 'suqqu-signature-color-eyes-review',
    category: 'makeup',
    categoryName: 'ベース＆メイクアップ',
    readTime: '5分',
    createdAt: '2026-07-25',
    author: {
      name: '松本 結衣',
      role: '専属ベースメイクコレクター',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    coverImage: '/images/products/fujiko_mayutint.jpg',
    content: `
# SUQQU シグニチャー カラー アイズ 徹底レビュー

## 1. 大人の目元を格上げする上質な質感と発色
「SUQQU シグニチャー カラー アイズ」は、重ねても濁らないクリアな発色となめらかな密着感が魅力のアイシャドウパレットです。

## 2. 息をのむ美しさと高持続力
しっとりとした薄膜パウダーがまぶたに密着し、夕方までヨレずに綺麗なグラデーションが持続します。

## 3. 楽天限定ポイント還元でお得にゲット
大人気の定番色や季節限定色も、楽天のポイント高還元ショップを利用することで大変お得に手に入ります。
    `,
    relatedProducts: ['prod-kate-lip', 'prod-nars-powder'],
    isHallOfFame: true
  },
  {
    id: 'post-cledepeau-base',
    title: '【憧れの最高峰下地】クレ・ド・ポー ボーテ ヴォワールコレクチュール n 瞬時に美肌フィルター検証',
    subtitle: '自ら光を放つような透明感。くすみ・毛穴・小ジワを瞬時に補正し、上質な素肌美を演出する伝説の下地。',
    slug: 'cledepeau-voile-correcteur-review',
    category: 'makeup',
    categoryName: 'ベース＆メイクアップ',
    readTime: '7分',
    createdAt: '2026-07-25',
    author: {
      name: '松本 結衣',
      role: '専属ベースメイクコレクター',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    coverImage: '/images/products/pauljoe_primer.jpg',
    content: `
# クレ・ド・ポー ボーテ ヴォワールコレクチュール n 徹底レビュー

## 1. 美容賢者が絶賛する最高峰プレメイクアップ
「クレ・ド・ポー ボーテ ヴォワールコレクチュール n」は、塗った瞬間に肌の凹凸やくしみをリセットし、極上の素肌感を演出する最高峰の化粧下地です。

## 2. スキンケア効果で一日中潤いキープ
独自のスキンケア成分を配合し、長時間メイクしていても肌が疲れず、ファンデーションのモチと美しさを格段に高めます。

## 3. 楽天でポイント還元＆お得に購入
デパコス最高峰アイテムも、楽天のポイント還元イベントを活用すれば実質価格を大幅に抑えて購入可能です。
    `,
    relatedProducts: ['prod-laroche-rose', 'prod-tirtir-red'],
    isHallOfFame: true
  },
"""

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert before `export const INITIAL_COMPARISONS`
target = "export const INITIAL_COMPARISONS"
if target in content:
    content = content.replace("export const INITIAL_BLOG_POSTS: BlogPost[] = [", "export const INITIAL_BLOG_POSTS: BlogPost[] = [" + new_posts)
    with open('src/data.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added 3 new posts to INITIAL_BLOG_POSTS in src/data.ts!")
else:
    print("Could not find target in src/data.ts")
