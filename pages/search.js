import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

import Layout from '@/components/layout';
import Loader from '@/components/loader';
import PostList from '@/components/post/postList';

const Search = () => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { data, isLoading } = useSWR(
    keyword
      ? `/api/posts/search?keyword=${encodeURI(
        encodeURIComponent(keyword)
      )}&page=${page}`
      : null
  );
  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : data?.posts ? (
        <PostList
          category=''
          keyword={keyword}
          data={data}
          isSearch={true}
          page={page}
          setPage={setPage}
        />
      ) : null}
    </Layout>
  );
};

export default Search;
