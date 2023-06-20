import Link from 'next/link';
import Button from '../button';
import Category from '../category';
import PostCard from './postCard';
import Pagination from './pagination';
import Loader from '../loader';

export default function PostList({
  category,
  onClick,
  data,
  isHome = false,
  isSearch = false,
  isLoading,
  page,
  setPage,
}) {
  return (
    <>
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* 글 */}
            <div className='border-t-[1px] border-gray-200 dark:border-white'>
              {data?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    showContents={isHome ? false : true}
                    isHome={isHome}
                    isLast={
                      data?.posts?.length - 1 === index
                        ? true
                        : false
                    }
                  />
                );
              })}
            </div>
            {/* 등록된 글이 없을때 화면에 표시되는 글 */}
            {data?.posts?.length === 0 ? (
              <div className='text-md dark:text-white font-medium'>
                아직 등록된 글이 없어요 🥲
              </div>
            ) : null}
          </>
        )}
        {/* 페이지네이션 */}
      </div>
      {!isHome ? (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages}
        />
      ) : null}
    </>
  );
}
