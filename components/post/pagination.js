import { cls, pages } from '@/libs/client/utils';

export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  const { pageNumList } = pages({
    currentPage: page,
    printPage: 5, // 화면에 보이는 페이지 갯수
    totalPages,
  });
  return (
    <div className='flex justify-center space-x-4 p-6'>
      <div className='flex items-center space-x-2'>
        <button
          className={cls(
            page === 1
              ? 'text-gray-400 opacity-60'
              : 'hover:text-indigo-500'
          )}
          onClick={() => {
            if (page <= 1) return;
            setPage(1);
          }}
          disabled={page === 1}
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
            />
          </svg>
        </button>
        <button
          className={cls(
            page === 1
              ? 'text-gray-400 opacity-60'
              : 'hover:text-indigo-500'
          )}
          onClick={() => {
            if (page <= 1) return;
            setPage(page - 1);
          }}
          disabled={page === 1}
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </button>
      </div>
      <div className='flex items-center space-x-4'>
        {pageNumList.map((pageNum, index) => (
          <span
            key={index}
            className={cls(
              'text-md cursor-pointer hover:text-indigo-500',
              pageNum === page ? 'font-bold' : ''
            )}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </span>
        ))}
      </div>
      <div className='flex items-center space-x-2'>
        <button
          className={cls(
            page === totalPages
              ? 'text-gray-400 opacity-60'
              : 'hover:text-indigo-500'
          )}
          onClick={() => {
            if (page === totalPages) return;
            setPage(page + 1);
          }}
          disabled={page === totalPages}
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
        <button
          className={cls(
            page === totalPages
              ? 'text-gray-400 opacity-60'
              : 'hover:text-indigo-500'
          )}
          onClick={() => {
            if (page === totalPages) return;
            setPage(totalPages);
          }}
          disabled={page === totalPages}
        >
          <svg
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
