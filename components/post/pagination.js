import { cls } from '@/libs/client/utils';

export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  // page 넘버들 배열 만들기
  let pageNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = page - 2; i <= page + 2; i++) {
      if (i < 1) continue;
      if (i > totalPages) break;
      pageNumbers.push(i);
    }
  }

  const maxValue = Math.max.apply(null, pageNumbers);
  const minValue = Math.min.apply(null, pageNumbers);

  if (pageNumbers.length <= 3 && totalPages > 5) {
    console.log(pageNumbers);
    if (pageNumbers[0] === 1) {
      pageNumbers = [
        ...pageNumbers,
        maxValue + 1,
        maxValue + 2,
      ];
    } else if (
      pageNumbers[pageNumbers.length - 1] === totalPages
    ) {
      pageNumbers = [
        minValue - 2,
        minValue - 1,
        ...pageNumbers,
      ];
    }
  }

  if (pageNumbers.length == 4 && totalPages > 5) {
    if (pageNumbers[0] === 1) {
      pageNumbers = [...pageNumbers, maxValue + 1];
    } else if (
      pageNumbers[pageNumbers.length - 1] === totalPages
    ) {
      pageNumbers = [minValue - 1, ...pageNumbers];
    }
  }

  return (
    <div className='flex items-center justify-center  space-x-2 '>
      <button
        className={cls(
          page === 1
            ? 'text-gray-400 opacity-60'
            : 'hover:text-indigo-500',
        )}
        onClick={() => {
          if (page <= 1) return;
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        prev
      </button>
      {pageNumbers.map((pageNum, index) => (
        <span
          key={index}
          className={cls(
            'cursor-pointer hover:text-indigo-500',
            pageNum === page ? 'font-bold' : '',
          )}
          onClick={() => setPage(pageNum)}
        >
          {pageNum}
        </span>
      ))}
      <button
        className={cls(
          page === totalPages
            ? 'text-gray-400 opacity-60'
            : 'hover:text-indigo-500',
        )}
        onClick={() => {
          if (page === totalPages) return;
          setPage(page + 1);
        }}
        disabled={page === totalPages}
      >
        next
      </button>
    </div>
  );
}
