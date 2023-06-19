import Layout from '@/components/layout';
import Pagination from '@/components/post/pagination';
import PostList from '@/components/post/postList';
import { categories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

export default function Posts() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data } = useSWR(
    router.asPath
      ? `/api/posts?category=${router.asPath.slice(
          1,
        )}&page=${page}`
      : null,
  );
  const onClick = () =>
    router.push(`/${router.asPath.slice(1)}/new`);
  return (
    <Layout>
      <PostList
        category={
          categories.filter(
            (category) =>
              category.ref === router.asPath.slice(1),
          )[0]
        }
        onClick={onClick}
        data={data}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages}
      />
    </Layout>
  );
}
