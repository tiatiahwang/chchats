import { questionsCategories } from '@/libs/client/utils';
import Button from './button';
import Category from './category';
import useTimeFormat from '@/libs/client/useTimeFormat';
import Link from 'next/link';
import PostCard from './postCard';

export default function PostList({
  categoryName,
  description,
  onClick,
  data,
  isHome = false,
  categoryList,
}) {
  console.log(data);
  return (
    <div className='p-4 space-y-6'>
      <div className='dark:text-white dark:bg-darkselected py-4 px-8 rounded-md'>
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
      <div className='border-t-[1px] border-white'>
        {data?.posts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}
