export function cls(...classnames) {
  return classnames.join(' ');
}

export const categories = [
  {
    id: 0,
    name: '이야기방',
    ref: 'board',
    subCategories: [
      { id: 0, name: '전체', url: '/board', ref: '' },
      {
        id: 1,
        name: '하루살이',
        url: '/board/life',
        ref: 'life',
      },
      {
        id: 2,
        name: '고민상담',
        url: '/board/consult',
        ref: 'consult',
      },
    ],
  },
  {
    id: 1,
    name: '정보공유',
    ref: 'information',
    subCategories: [
      { id: 0, name: '전체', url: '/information', ref: '' },
      {
        id: 1,
        name: '비자',
        url: '/information/visa',
        ref: 'visa',
      },
      {
        id: 2,
        name: '법률',
        url: '/information/law',
        ref: 'law',
      },
      {
        id: 3,
        name: '건강',
        url: '/information/health',
        ref: 'health',
      },
      {
        id: 4,
        name: '교육',
        url: '/information/education',
        ref: 'education',
      },
      {
        id: 5,
        name: '부동산',
        url: '/information/estate',
        ref: 'estate',
      },
      {
        id: 6,
        name: 'IT',
        url: '/information/it',
        ref: 'it',
      },
      {
        id: 7,
        name: '기타',
        url: '/information/etc',
        ref: 'etc',
      },
    ],
  },
  {
    id: 2,
    name: '사고팔고',
    ref: 'market',
    subCategories: [
      { id: 0, name: '전체', url: '/market', ref: '' },
      {
        id: 1,
        name: '팔아요',
        url: '/market/sell',
        ref: 'sell',
      },
      {
        id: 2,
        name: '살게요',
        url: '/market/buy',
        ref: 'buy',
      },
      {
        id: 3,
        name: '렌트',
        url: '/market/rent',
        ref: 'rent',
      },
    ],
  },
];
