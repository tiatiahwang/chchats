export function cls(...classnames) {
  return classnames.join(' ');
}

export const categories = [
  {
    id: 0,
    name: 'Q&A',
    ref: 'questions',
    description: '다양한 주제에 대해서 묻고 대답해보세요.',
    subCategories: [
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
      {
        id: 6,
        name: 'IT',
        url: '/questions/it',
        ref: 'it',
      },
      {
        id: 7,
        name: '기타',
        url: '/questions/etc',
        ref: 'etc',
      },
    ],
  },
  {
    id: 1,
    name: '정보',
    ref: 'information',
    description: '정보를 공유해 보아요.',
    subCategories: [
      { id: 0, name: '전체', url: '/market', ref: '' },
      {
        id: 1,
        name: '정보1',
        url: '/information/info1',
        ref: 'sell',
      },
      {
        id: 2,
        name: '정보2',
        url: '/information/info2',
        ref: 'buy',
      },
      {
        id: 3,
        name: '정보3',
        url: '/information/info3',
        ref: 'rent',
      },
    ],
  },
  {
    id: 2,
    name: '마켓',
    ref: 'market',
    description: '사고 팔고 사고 팔고 정들어 보아요.',
    subCategories: [
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
    ],
  },
];
