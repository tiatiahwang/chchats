import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { cls } from '@/libs/client/utils';

export default function Category({ categories }) {
  const router = useRouter();

  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    setCurrentCategory(
      router.query.subCategory === undefined
        ? 'all'
        : router.query.subCategory
    );
  }, [router]);
  return (
    <div className='w-full'>
      <ul className='dark:text-white flex space-x-2 text-sm overflow-x-scroll scrollbar-hide py-2'>
        {categories?.map((category) => (
          <Link href={category.url} key={category.id}>
            <li
              className={cls(
                'p-2 rounded-md cursor-pointer inline whitespace-nowrap',
                currentCategory === 'all' &&
                  category.id == 0
                  ? 'bg-gray-300 dark:bg-darkhover dark:bg-opacity-30'
                  : '',
                currentCategory === category.ref
                  ? 'bg-gray-300 dark:bg-darkhover dark:bg-opacity-30'
                  : 'hover:text-indigo-500'
              )}
            >
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
