import { cls } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Category({ categories }) {
  const router = useRouter();
  const currentCategory = router.pathname.split('/')[2];

  return (
    <ul className='dark:text-white flex space-x-2 text-sm'>
      {categories?.map((category) => {
        console.log(router.pathname.split('/').length);
        return (
          <Link href={category.url} key={category.id}>
            <li
              className={cls(
                'p-2 rounded-md cursor-pointer',
                router.pathname.split('/').length === 2 && category.id === 0
                  ? 'bg-[#4c596f]'
                  : '',
                currentCategory === category.ref
                  ? 'bg-[#4c596f]'
                  : 'hover:text-indigo-500',
              )}
            >
              {category.name}
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
