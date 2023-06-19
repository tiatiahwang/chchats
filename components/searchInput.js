import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export function SearchInput() {
  // 1. search query 가져오기
  // 2. server에서 가져온 정보 있으면 redirect to search page
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onValid = ({ keyword }) => {
    router.push(`/search?keyword=${keyword}`);
  };
  return (
    <div className='hidden md:flex text-sm dark:bg-darkselected bg-gray-100 py-2 px-4 rounded-full'>
      <span className='flex select-none items-center justify-center'>
        <svg
          className='h-4 w-4'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
          ></path>
        </svg>
      </span>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          className='bg-transparent px-2 appearance-none focus:outline-none'
          type='text'
          placeholder='검색'
          {...register('keyword', {
            required: true,
            minLength: 2,
          })}
        />
      </form>
    </div>
  );
}
