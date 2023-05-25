import Link from 'next/link';
import { useEffect, useState } from 'react';
import TogggleDarkMode from './toggleDarkMode';
import { cls } from '@/libs/client/utils';
import useUser from '@/libs/client/useUser';

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
        <div className='justify-between mx-auto md:items-center md:flex md:px-8 relative dark:bg-darkbg'>
          <div className='flex items-center justify-between py-3 px-4 md:px-5 md:w-full'>
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
              <Link href='/' className='cursor-pointer'>
                <h2 className='text-xl'>LOGO</h2>
              </Link>
              <ul className='hidden md:flex md:space-x-8 md:ml-10'>
                <li>
                  <Link href='/questions'>
                    <div>Q&A</div>
                  </Link>
                </li>
                <li>
                  <Link href='/information'>
                    <div>정보</div>
                  </Link>
                </li>
                <li>
                  <Link href='/market'>
                    <div>마켓</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='flex items-center space-x-5'>
              {renderThemeChanger()}
              <Link href='/profile'>
                {user && user?.avatar ? (
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
                    <Link href='/questions' legacyBehavior>
                      <a>Q&A</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/information'
                      legacyBehavior
                    >
                      <a>정보</a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/market' legacyBehavior>
                      <a>마켓</a>
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
