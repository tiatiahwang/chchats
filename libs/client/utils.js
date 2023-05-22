export function cls(...classnames) {
  return classnames.join(' ');
}

export function elapsedTime(date) {
  const start = +new Date(date);
  const end = +new Date();

  const diff = (end - start) / 1000;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(
      diff / value.milliSeconds,
    );

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return '방금 전';
}

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
