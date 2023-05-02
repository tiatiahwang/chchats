import useUser from '@/libs/client/useUser';
import Link from 'next/link';

const Profile = () => {
  const { user } = useUser();
  return (
    <div className='px-4 py-10'>
      <div className='flex items-center space-x-3'>
        <div className='h-16 w-16 rounded-full bg-pink-100' />
        <Link legacyBehavior href=''>
          <a className='flex flex-col'>
            <span className='font-medium text-gray-900'>{user?.name}</span>
            <span className='text-xs text-gray-700'>
              프로필 수정하기 &rarr;
            </span>
          </a>
        </Link>
      </div>
      <div className='mt-10 flex justify-around'>
        <Link legacyBehavior href=''>
          <a className='flex flex-col items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white'>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                ></path>
              </svg>
            </div>
            <span className='mt-2 text-sm font-medium text-gray-700'>글</span>
          </a>
        </Link>
        <Link legacyBehavior href='/'>
          <a className='flex flex-col items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white'>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                ></path>
              </svg>
            </div>
            <span className='mt-2 text-sm font-medium text-gray-700'>댓글</span>
          </a>
        </Link>
        <Link legacyBehavior href='/'>
          <a className='flex flex-col items-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-white'>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                ></path>
              </svg>
            </div>
            <span className='mt-2 text-sm font-medium text-gray-700'>
              스크랩
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
