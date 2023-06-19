import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Layout from '@/components/layout';
import PostList from '@/components/post/postList';

const Search = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data } = useSWR(
    keyword
      ? `/api/posts/search?keyword=${encodeURI(
          encodeURIComponent(keyword),
        )}`
      : null,
  );
  console.log(data);
  return (
    <Layout>
      <div className='text-xl'>
        "<span className='font-bold'>{keyword}</span>"{' '}
        검색결과
      </div>
      <div>
        {data?.posts ? (
          <PostList
            category=''
            data={data}
            isSearch={true}
          />
        ) : null}
      </div>
    </Layout>
  );
};

export default Search;
