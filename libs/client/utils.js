export function cls(...classnames) {
  return classnames.join(' ');
}

export const mainCategories = [
  { id: 0, name: 'Q&A', ref: 'questions' },
  { id: 1, name: '정보', ref: 'information' },
  { id: 2, name: '마켓', ref: 'market' },
];

export const questionsCategories = [
  { id: 0, name: '전체', url: '/questions', ref: '' },
  {
    id: 1,
    name: '비자',
    url: '/questions/visa',
    ref: 'visa',
  },
  {
    id: 2,
    name: '법률',
    url: '/questions/law',
    ref: 'law',
  },
  {
    id: 3,
    name: '건강',
    url: '/questions/health',
    ref: 'health',
  },
  {
    id: 4,
    name: '교육',
    url: '/questions/education',
    ref: 'education',
  },
  {
    id: 5,
    name: '부동산',
    url: '/questions/estate',
    ref: 'estate',
  },
  { id: 6, name: 'IT', url: '/questions/it', ref: 'it' },
  { id: 7, name: '기타', url: '/quesions/etc', ref: 'etc' },
];

export const marketCategories = [
  { id: 0, name: '전체', url: '/market', ref: '' },
  {
    id: 1,
    name: '매매',
    url: '/market/sell',
    ref: 'sell',
  },
  {
    id: 2,
    name: '구매',
    url: '/market/buy',
    ref: 'buy',
  },
  {
    id: 3,
    name: '렌트',
    url: '/market/rent',
    ref: 'rent',
  },
];
