import Category from '@/components/category';
import Layout from '@/components/layout';
import PostDetail from '@/components/postDetail';
import useTimeFormat from '@/libs/client/useTimeFormat';
import { marketCategories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Questions() {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id
      ? `/api/posts/${router.query.id}`
      : null,
  );
  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <div className='dark:text-white dark:bg-darkselected py-4 px-8 rounded-md'>
          <p className='font-semibold text-md'>Q&A</p>
          <p className='text-xs'>
            다양한 주제에 대해서 묻고 대답해보세요.
          </p>
        </div>
        <Category
          categories={marketCategories}
          selected={data?.post?.subCategory}
        />
        <PostDetail post={data?.post} />
        {/* COMMENT SECTION */}
        <div className='mt-0'>
          {data?.post?.comments?.map((comment) => (
            <div className='dark:text-white border-t-[1px] dark:border-white py-6'>
              <div className='flex items-center space-x-2 text-xs pb-2'>
                <div className='w-5 h-5 rounded-full bg-indigo-100' />
                <span>{comment.user.name}</span>
                <span>·</span>
                <span>
                  {useTimeFormat(
                    new Date(comment.createdAt),
                  )}
                </span>
              </div>
              <p>{comment.contents}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
