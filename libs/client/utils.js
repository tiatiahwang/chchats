export function cls(...classnames) {
  return classnames.join(' ');
}

export const questionsCategories = [
  { id: 0, name: '전체', url: '/questions', ref: '' },
  { id: 1, name: '비자', url: '/questions/visa', ref: 'visa' },
  { id: 2, name: '법률', url: '/questions/law', ref: 'law' },
  { id: 3, name: '건강', url: '/questions/health', ref: 'health' },
  { id: 4, name: '교육', url: '/questions/education', ref: 'education' },
  { id: 5, name: '부동산', url: '/questions/estate', ref: 'estate' },
  { id: 6, name: 'IT', url: '/questions/it', ref: 'it' },
];
