import Category from '@/components/category';
import Comments from '@/components/comments';
import Layout from '@/components/layout';
import PostDetail from '@/components/postDetail';
import { categories } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
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

  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <Link href={`/${mainCategory.ref}`}>
          <div className='dark:text-white bg-gray-200 dark:bg-darkselected py-4 px-8 rounded-md'>
            <p className='font-semibold text-md'>
              {mainCategory.name}
            </p>
            <p className='text-xs'>
              {mainCategory.description}
            </p>
          </div>
        </Link>
        <PostDetail post={data?.post} />
        {data?.post?.comments.length > 0 ? (
          <Comments comments={data?.post?.comments} />
        ) : null}
      </div>
    </Layout>
  );
}
