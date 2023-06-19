import { cls } from '@/libs/client/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { current } from 'tailwindcss/colors';

export default function Pagination({
  page,
  setPage,
  totalPages,
}) {
  const atFirstPage = () => page === 1;
  const atLastPage = () => page === totalPages;

  // page 넘버들 배열 만들기

  let pageNumbers = [];
  for (let i = page - 2; i <= page + 2; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    pageNumbers.push(i);
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
        disabled={atFirstPage()}
      >
        prev
      </button>
      {pageNumbers.map((pageNum) => (
        <span
          key={pageNum}
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
        disabled={atLastPage()}
      >
        next
      </button>
    </div>
  );
}
