import Category from '@/components/category';
import Layout from '@/components/layout';
import PostDetail from '@/components/postDetail';
import {
  categories,
  questionsCategories,
} from '@/libs/client/utils';
import { useRouter } from 'next/router';
import {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import useSWR from 'swr';

export default function DetailPage() {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id
      ? `/api/posts/${router.query.id}`
      : null,
  );
  const [mainCategory, setMainCategory] = useState('');

  useLayoutEffect(() => {
    if (!router.isReady) return;
    const currentMainCategory = categories.filter(
      (category) =>
        category.ref === router.asPath.split('/')[1],
    );
    setMainCategory(currentMainCategory[0]);
  }, [router]);

  console.log(data);
  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <div className='dark:text-white bg-gray-200 dark:bg-darkselected py-4 px-8 rounded-md'>
          <p className='font-semibold text-md'>
            {mainCategory.name}
          </p>
          <p className='text-xs'>
            {mainCategory.description}
          </p>
        </div>
        <Category
          categories={questionsCategories}
          selected={data?.post?.subCategory}
        />
        <PostDetail post={data?.post} />
      </div>
    </Layout>
  );
}
