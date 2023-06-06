import Button from '../button';
import Category from '../category';
import PostCard from './postCard';

export default function PostList({
  category,
  onClick,
  data,
  isHome = false,
}) {
  return (
    <div className='p-4 space-y-6 text-black'>
      {/* 메인 카테고리 이름과 설명 부분 */}
      <div className='dark:text-white bg-gray-100 dark:bg-darkselected py-4 px-8 rounded-md'>
        <p className='font-semibold text-md'>
          {category?.name}
        </p>
        <p className='text-xs'>{category?.description}</p>
      </div>
      {/* 홈 화면일때 글 작성 버튼 비노출 */}
      {!isHome ? (
        <Button
          text='글작성하기'
          large={false}
          onClick={onClick}
        />
      ) : null}
      {/* 홈 화면일때 카테고리 리스트 비노출 */}
      {!isHome ? (
        <Category
          categories={category?.subCategories}
          selected={data?.post?.subCategory}
        />
      ) : null}
      {/* 글 */}
      <div className='border-t-[1px] border-gray-200 dark:border-white'>
        {isHome && data?.posts?.length >= 5 ? (
          <>
            {data?.posts?.slice(0, 5).map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </>
        ) : (
          <>
            {data?.posts?.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </>
        )}
      </div>
      {data?.posts?.length === 0 ? (
        <div className='text-md dark:text-white font-medium'>
          아직 등록된 글이 없어요 🥲
        </div>
      ) : null}
    </div>
  );
}
