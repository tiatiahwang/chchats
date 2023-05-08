import Category from '@/components/category';
import Layout from '@/components/layout';
import PostDetail from '@/components/postDetail';
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
      </div>
    </Layout>
  );
}
