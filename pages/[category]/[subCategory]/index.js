import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

import Layout from '@/components/layout';
import PostList from '@/components/post/postList';
import { categories } from '@/libs/client/utils';

export default function SubPosts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(
    router.asPath
      ? `/api/posts?category=${
        router.asPath.split('/')[1]
      }&subCategory=${
        router.asPath.split('/')[2]
      }&page=${page}`
      : null
  );
  const onClick = () => {
    if (!router.isReady) return;
    router.push({
      pathname: `${router.asPath.slice(0)}/new`,
    });
  };
  return (
    <Layout>
      <PostList
        category={
          categories.filter(
            (category) =>
              category.ref === router.asPath.split('/')[1]
          )[0]
        }
        onClick={onClick}
        data={data}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
      />
    </Layout>
  );
}
