// カテゴリー名の定義
export type MenuCategory = '懐石コース' | 'お祝い・法事コース' | '牛しゃぶ・ふぐ' | '逸品料理' | 'ランチ' | 'テイクアウト';

// メニューアイテムの型定義
export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: MenuCategory;
}

// カテゴリー一覧
export const menuCategories: MenuCategory[] = [
  '懐石コース',
  'お祝い・法事コース',
  '牛しゃぶ・ふぐ',
  '逸品料理',
  'ランチ',
  'テイクアウト'
];

// メニューデータ
export const allMenuItems: MenuItem[] = [
  // 懐石コース
  {
    id: 1,
    title: '板長おまかせコース',
    description: '選りすぐった旬の素材を使用した本格懐石コース（全9品）',
    price: '11,000円',
    image: '/images/menu-omakase.webp',
    category: '懐石コース',
  },
  {
    id: 2,
    title: '季節の懐石 花コース',
    description: '前菜、土瓶蒸し、刺身、牛ヒレ肉変り焼など全8品の贅沢コース',
    price: '8,800円',
    image: '/images/menu-hana.webp',
    category: '懐石コース',
  },
  {
    id: 3,
    title: '季節の懐石 月コース',
    description: '前菜3点、造り、煮物、焼物など全8品の本格和食コース',
    price: '7,150円',
    image: '/images/menu-tuki.webp',
    category: '懐石コース',
  },
  {
    id: 4,
    title: 'ミニ懐石 雪コース',
    description: '先付3点、造り、蒸物など全8品のリーズナブルな懐石コース',
    price: '5,500円',
    image: '/images/menu-yuki.webp',
    category: '懐石コース',
  },
  // お祝い・法事コース
  {
    id: 5,
    title: '梅（うめ）コース',
    description: '前菜3点、造り、蒸物など全9品のお祝いにふさわしいコース',
    price: '6,050円',
    image: '/images/menu-ume.webp',
    category: 'お祝い・法事コース',
  },
  {
    id: 6,
    title: '竹（たけ）コース',
    description: '前菜、土瓶蒸し、造り、牛ヒレ焼など全9品の特別なお祝いコース',
    price: '7,700円',
    image: '/images/menu-take.webp',
    category: 'お祝い・法事コース',
  },
  {
    id: 7,
    title: '松（まつ）コース',
    description: '前菜、土瓶蒸し、造り、伊勢海老焼など全9品の贅沢なお祝いコース',
    price: '12,100円',
    image: '/images/menu-matsu.webp',
    category: 'お祝い・法事コース',
  },
  {
    id: 8,
    title: '桔梗（ききょう）コース',
    description: '前菜引出し盛り4点、造り、蒸物など全8品のご法事向けコース',
    price: '6,050円',
    image: '/images/menu-kikyou.webp',
    category: 'お祝い・法事コース',
  },
  {
    id: 9,
    title: '百合（ゆり）コース',
    description: '前菜引出し盛り4点、造り、煮物など全8品の格式高いご法事向けコース',
    price: '7,700円',
    image: '/images/menu-yuri.webp',
    category: 'お祝い・法事コース',
  },
  {
    id: 10,
    title: '菊（きく）コース',
    description: '前菜引出し盛り、吸物、造りなど全9品の上質なご法事向けコース',
    price: '11,000円',
    image: '/images/menu-kiku.webp',
    category: 'お祝い・法事コース',
  },
  
  // 牛しゃぶ・ふぐ
  {
    id: 11,
    title: '牛しゃぶしゃぶ・檜（ひのき）コース',
    description: '前菜、刺身、上しゃぶしゃぶ（上和牛霜降肉）など全11品の贅沢なコース',
    price: '9,900円',
    image: '/images/menu-hinoki.webp',
    category: '牛しゃぶ・ふぐ',
  },
  {
    id: 12,
    title: '牛しゃぶしゃぶ・橘（たちばな）コース',
    description: '先付、刺身、上しゃぶしゃぶ（上和牛霜降肉）など全10品のコース',
    price: '7,700円',
    image: '/images/menu-tachibana.webp',
    category: '牛しゃぶ・ふぐ',
  },
  {
    id: 13,
    title: '最高級ふぐの贅沢三昧！ふぐコース',
    description: '前菜、湯引き皮付きふぐ刺盛、ふぐの唐揚げなど全6品のふぐ尽くしコース',
    price: '11,000円',
    image: '/images/menu-fugu.webp',
    category: '牛しゃぶ・ふぐ',
  },
  
  // 逸品料理
  {
    id: 14,
    title: '刺身盛合せ',
    description: '厳選した旬の新鮮な魚介を彩り豊かに盛り合わせました',
    price: '1,650円～',
    image: '/images/p.webp',
    category: '逸品料理',
  },
  {
    id: 15,
    title: '本日の白身魚薄造り',
    description: 'その日一番の白身魚を薄造りで楽しむ逸品',
    price: '1,760円',
    image: '/images/p.webp',
    category: '逸品料理',
  },
  {
    id: 16,
    title: '特選牛ヒレ肉変わり焼 梅風味ダレ',
    description: '厳選した牛ヒレ肉を香ばしく焼き上げ、特製の梅風味ダレで',
    price: '1,512円',
    image: '/images/p.webp',
    category: '逸品料理',
  },
  {
    id: 17,
    title: '鯛かぶと煮',
    description: '鯛のかぶとを丁寧に煮込み、旨味を閉じ込めた味わい深い一品',
    price: '1,100円',
    image: '/images/p.webp',
    category: '逸品料理',
  },
  {
    id: 18,
    title: 'お茶漬彩々 まぐろ',
    description: '厳選したまぐろを使用した彩り豊かなお茶漬け',
    price: '要相談',
    image: '/images/p.webp',
    category: '逸品料理',
  },
  {
    id: 19,
    title: 'お茶漬彩々 たらこ・明太子・梅・のり',
    description: '様々な具材から選べる彩り豊かなお茶漬け',
    price: '要相談',
    image: '/images/p.webp',
    category: '逸品料理',
  },
  
  // ランチ
  {
    id: 20,
    title: '昼ごはん【神谷ご膳】',
    description: '創業85年の伝統を誇る、神谷の味を散りばめた昼の豪華なお弁当（赤出汁付き）',
    price: '2,750円',
    image: '/images/menu-gozen.webp',
    category: 'ランチ',
  },
  {
    id: 21,
    title: '昼ごはん【彩（いろどり）】',
    description: '季節の日替り花籠盛り、海鮮サラダなどを品良く盛り合わせた、ちょっと豪華な昼ごはん',
    price: '2,200円',
    image: '/images/menu-irodori.webp',
    category: 'ランチ',
  },
  {
    id: 22,
    title: '昼ごはん【二色の小丼】',
    description: '季節の日替り花籠盛り、鮪とイクラの二色丼、赤出汁、香の物の贅沢なランチ',
    price: '1,540円',
    image: '/images/menu-nishoku.webp',
    category: 'ランチ',
  },
  {
    id: 23,
    title: '昼ごはん【桜姫鶏の唐揚げ】',
    description: '青森産の桜姫鶏を薄味に仕上げた柔らかい唐揚げとポン酢のランチセット',
    price: '1,540円',
    image: '/images/menu-sakurahimedori.webp',
    category: 'ランチ',
  },
  {
    id: 24,
    title: '昼のお届け弁当',
    description: '大切な来客や昼食会議などに川口市内の方向けの配達弁当（要予約）',
    price: '2,200円から',
    image: '/images/menu-bento-murasaki.webp',
    category: 'ランチ',
  },
  
  // テイクアウト
  {
    id: 25,
    title: 'お弁当 紫(むらさき)',
    description: 'テイクアウト用の手軽なお弁当',
    price: '2,160円',
    image: '/images/menu-bento-murasaki.webp',
    category: 'テイクアウト',
  },
  {
    id: 26,
    title: 'お弁当 薫(かおる)',
    description: '品数豊富な少し贅沢なテイクアウト弁当',
    price: '3,780円',
    image: '/images/menu-bento-kaoru.webp',
    category: 'テイクアウト',
  },
  {
    id: 27,
    title: 'お弁当 葵(あおい)',
    description: '特別な日におすすめの高級テイクアウト弁当',
    price: '5,400円',
    image: '/images/menu-bento-aoi.webp',
    category: 'テイクアウト',
  },
  {
    id: 28,
    title: '【期間限定】あぶり黒豚重',
    description: '鹿児島県産の黒豚と隠し味に神谷の電気ブランを使用した特製重',
    price: '1,620円',
    image: '/images/menu-bento-kurobuta.webp',
    category: 'テイクアウト',
  },
  {
    id: 29,
    title: 'お子様弁当',
    description: 'お子様向けの彩り豊かな特製弁当',
    price: '1,296円',
    image: '/images/menu-bento-okosama.webp',
    category: 'テイクアウト',
  },
  {
    id: 30,
    title: '祝鯛化粧焼 折',
    description: 'お祝いのお席のお土産や、ご自宅でのお祝い事に（要予約）',
    price: '3,240円',
    image: '/images/menu-bento-tai.webp',
    category: 'テイクアウト',
  },
  {
    id: 31,
    title: '赤飯 折',
    description: 'お祝い事に最適な着色料不使用の安心安全な赤飯（要予約）',
    price: '1,080円',
    image: '/images/menu-bento-sekihan.webp',
    category: 'テイクアウト',
  },
  {
    id: 32,
    title: '神谷の西京焼',
    description: 'お土産やギフトにも最適な特製西京焼（郵送可）',
    price: '3,240円',
    image: '/images/menu-obento-saikyouyaki.webp',
    category: 'テイクアウト',
  },
  {
    id: 33,
    title: '神谷の西京漬',
    description: '職人が手間暇かけて作った旬の魚の西京漬（冷凍品・郵送可）',
    price: '5,400円',
    image: '/images/menu-obento-saikyouzuke.webp',
    category: 'テイクアウト',
  },
  {
    id: 34,
    title: '神谷の西京漬',
    description: '職人が手間暇かけて作った旬の魚の西京漬（冷凍品・郵送可）',
    price: '7,560円',
    image: '/images/menu-obento-saikyouzuke.webp',
    category: 'テイクアウト',
  },
];
