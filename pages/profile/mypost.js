import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
import { cls } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MyPost() {
  const router = useRouter();
  const { user } = useUser();
  console.log(router.pathname.includes('mypost'));
  return (
    <Layout>
      <div className='px-4'>
        <div className='flex items-center space-x-3'>
          <div className='h-16 w-16 rounded-full bg-indigo-200' />
          <Link legacyBehavior href=''>
            <a className='flex flex-col'>
              <span className='font-medium dark:text-white'>{user?.name}</span>
              <span className='text-xs text-gray-700 dark:text-white'>
                프로필 수정하기 &rarr;
              </span>
            </a>
          </Link>
        </div>
        <div className='flex items-center justify-center gap-x-6 border-b border-gray-300 text-sm mt-6 font-medium'>
          <Link href={`/profile/${user?.id}/mypost`} className='pb-4'>
            <span
              className={cls(
                'pb-4 px-2',
                router.pathname.includes('mypost')
                  ? 'border-b-[3px] border-indigo-500 text-indigo-500'
                  : 'hover:border-b-[3px] hover:border-indigo-300 hover:text-indigo-300',
              )}
            >
              내가 쓴 글
            </span>
          </Link>
          <Link href='/' className='pb-4'>
            <span
              className={cls(
                'pb-4 px-2',
                router.pathname.includes('mycomment')
                  ? 'border-b-[3px] border-indigo-500 text-indigo-500'
                  : 'hover:border-b-[3px] hover:border-indigo-300 hover:text-indigo-300',
              )}
            >
              나의 댓글
            </span>
          </Link>
          <Link href='/' className='pb-4'>
            <span
              className={cls(
                'pb-4 px-2',
                router.pathname.includes('marked')
                  ? 'border-b-[3px] border-indigo-500 text-indigo-500'
                  : 'hover:border-b-[3px] hover:border-indigo-300 hover:text-indigo-300',
              )}
            >
              스크랩
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
