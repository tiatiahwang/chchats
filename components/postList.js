import Button from './button';
import Category from './category';
import PostCard from './postCard';

export default function PostList({
  categoryName,
  description,
  onClick,
  data,
  isHome = false,
  categoryList,
}) {
  return (
    <div className='p-4 space-y-6 text-black'>
      <div className='dark:text-white bg-gray-100 dark:bg-darkselected py-4 px-8 rounded-md'>
        <p className='font-semibold text-md'>
          {categoryName}
        </p>
        <p className='text-xs'>{description}</p>
      </div>
      {!isHome ? (
        <Button
          text='글작성하기'
          large={false}
          onClick={onClick}
        />
      ) : null}
      {!isHome ? (
        <Category
          categories={categoryList}
          selected={data?.post?.subCategory}
        />
      ) : null}
      <div className='border-t-[1px] border-gray-200 dark:border-white'>
        {data?.posts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
