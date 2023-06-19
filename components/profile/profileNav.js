import Button from '@/components/button';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { cls } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const ProfileNav = () => {
  const router = useRouter();
  const { user } = useUser();

  const [logout, { loading, data: logoutStatus }] =
    useMutation('/api/users/logout');

  const onClickLogout = () => {
    if (loading) return;
    logout();
  };

  useEffect(() => {
    if (logoutStatus && logoutStatus.ok) {
      setTimeout(() => router.push('/'), 1000);
    }
  }, [logoutStatus]);

  return (
    <Layout>
      {user ? (
        <div className='px-4'>
          <div className='flex justify-between'>
            <div className='flex items-center space-x-3'>
              {user?.avatar ? (
                <img
                  src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${user?.avatar}/avatar`}
                  className='h-16 w-16 rounded-full'
                />
              ) : (
                <div className='h-16 w-16 rounded-full bg-indigo-100' />
              )}
              <Link legacyBehavior href='/profile/edit'>
                <a className='flex flex-col'>
                  <span className='font-medium dark:text-white'>
                    {user?.name}
                  </span>
                  <span className='text-xs text-gray-700 dark:text-white'>
                    프로필 수정하기 &rarr;
                  </span>
                </a>
              </Link>
            </div>
            <div>
              <Button
                onClick={onClickLogout}
                text='로그아웃'
                height='38px'
              />
            </div>
          </div>
          <div className='flex items-center justify-start gap-x-6 border-b-[1px] border-gray-100 text-sm mt-6 font-medium'>
            <Link href='/profile/mypost' className='pb-4'>
              <span
                className={cls(
                  'pb-4 px-2',
                  router.pathname.includes('mypost') ||
                    router.pathname.split('/').length === 2
                    ? 'border-b-[3px] border-indigo-500 text-indigo-500'
                    : 'hover:border-b-[3px] hover:border-indigo-300 hover:text-indigo-300',
                )}
              >
                내가 쓴 글
              </span>
            </Link>
            <Link
              href='/profile/mycomment'
              className='pb-4'
            >
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
            <Link href='/profile/myscrap' className='pb-4'>
              <span
                className={cls(
                  'pb-4 px-2',
                  router.pathname.includes('myscrap')
                    ? 'border-b-[3px] border-indigo-500 text-indigo-500'
                    : 'hover:border-b-[3px] hover:border-indigo-300 hover:text-indigo-300',
                )}
              >
                스크랩
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default ProfileNav;
