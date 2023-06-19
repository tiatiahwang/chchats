import Link from 'next/link';
import Button from '../button';
import Category from '../category';
import PostCard from './postCard';

export default function PostList({
  category,
  onClick,
  data,
  isHome = false,
  isSearch = false,
}) {
  console.log(data);
  return (
    <div className='mb-4 md:mb-0 p-4 space-y-4 text-black bg-gray-100 dark:bg-darkselected rounded-md'>
      {/* 메인 카테고리 이름 */}
      <div className='dark:text-white rounded-md'>
        <Link
          href={`/${category?.ref}`}
          className='font-semibold text-2xl hover:text-indigo-500'
        >
          {category?.name}
        </Link>
      </div>
      {/* 홈 화면일때 글 작성 버튼 비노출 */}
      {!isHome && !isSearch ? (
        <Button
          text='글작성하기'
          large={false}
          onClick={onClick}
        />
      ) : null}
      {/* 홈 화면일때 카테고리 리스트 비노출 */}
      {!isHome && !isSearch ? (
        <Category categories={category?.subCategories} />
      ) : null}
      {/* 글 */}
      <div className='border-t-[1px] border-gray-200 dark:border-white'>
        {data?.posts?.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              showContents={isHome ? false : true}
            />
          );
        })}
      </div>
      {data?.posts?.length === 0 ? (
        <div className='text-md dark:text-white font-medium'>
          아직 등록된 글이 없어요 🥲
        </div>
      ) : null}
    </div>
  );
}
