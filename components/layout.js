import Link from 'next/link';
import { useEffect, useState } from 'react';
import TogggleDarkMode from './toggleDarkMode';
import { cls } from '@/libs/client/utils';
import useUser from '@/libs/client/useUser';
import { SearchInput } from './searchInput';

export default function Layout({ children, noPaddingTop }) {
  const { user } = useUser();
  const [navbar, setNavbar] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    return <TogggleDarkMode />;
  };

  return (
    <div>
      <nav className='w-full'>
        <div className='justify-between mx-auto md:items-center md:flex relative dark:bg-darkbg'>
          <div className='flex items-center justify-between py-3 md:w-full'>
            {/* 모바일뷰 설정 - 좌측 아이콘 */}
            <div className='md:hidden'>
              <button
                className='p-2 rounded-md outline-none focus:bg-gray-100 dark:focus:bg-gray-400'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
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
                      d='M6 18L18 6M6 6l12 12'
                    ></path>
                  </svg>
                ) : (
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
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <div className='md:flex md:items-center'>
              <div className='text-xl font-bold w-[100px]'>
                <Link href='/' className=''>
                  <img
                    className='w-full dark:hidden'
                    src='/logo_light.png'
                  />
                  <img
                    className='w-full hidden dark:block'
                    src='/logo_dark.png'
                  />
                </Link>
              </div>
              <div>
                <ul className='hidden md:flex md:space-x-8 md:ml-10'>
                  <li>
                    <Link href='/board'>
                      <div>이야기방</div>
                    </Link>
                  </li>
                  <li>
                    <Link href='/information'>
                      <div>정보공유</div>
                    </Link>
                  </li>
                  <li>
                    <Link href='/market'>
                      <div>사고팔고</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='flex justify-between items-center relative'>
              <SearchInput />
              <div className='absolute right-10 top-[7px] md:right-12'>
                {renderThemeChanger()}
              </div>
              <Link href={user ? '/profile' : '/login'}>
                {user?.avatar ? (
                  <img
                    src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${user?.avatar}/avatar`}
                    className='h-8 w-8 rounded-full'
                  />
                ) : (
                  <div className='h-8 w-8 rounded-full bg-indigo-100' />
                )}
              </Link>
            </div>
          </div>
          {/* 모바일뷰에서 토글되는 창 */}
          {navbar ? (
            <div className='md:hidden top-18 absolute z-10 dark:bg-darkbg w-full pb-4 shadow-md bg-white'>
              <div
                className={`px-4 flex-1 justify-self-center pb-3 mt-2 ${
                  navbar ? '' : 'hidden'
                }`}
              >
                <ul className='items-center justify-center space-y-8'>
                  <li>
                    <Link href='/board' legacyBehavior>
                      <a>이야기방</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/information'
                      legacyBehavior
                    >
                      <a>정보공유</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/market' legacyBehavior>
                      <a>사고팔고</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
      <div className={cls('', noPaddingTop ? '' : 'pt-12')}>
        {children}
      </div>
    </div>
  );
}
