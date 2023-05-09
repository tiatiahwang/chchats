import { cls } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Category({
  categories,
  selected = '',
}) {
  const router = useRouter();
  const currentCategory =
    selected === ''
      ? router.pathname.split('/')[2]
      : selected;
  return (
    <ul className='dark:text-white flex space-x-2 text-sm'>
      {categories?.map((category) => (
        <Link href={category.url} key={category.id}>
          <li
            className={cls(
              'p-2 rounded-md cursor-pointer',
              router.pathname.split('/').length === 2 &&
                category.id === 0
                ? 'bg-gray-200 dark:bg-darkselected'
                : '',
              currentCategory === category.ref
                ? 'bg-gray-200 dark:bg-darkselected'
                : 'hover:text-indigo-500',
            )}
          >
            {category.name}
          </li>
        </Link>
      ))}
    </ul>
  );
}
