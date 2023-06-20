import Layout from '@/components/layout';
import PostList from '@/components/post/postList';
import { categories } from '@/libs/client/utils';
import useSWR from 'swr';

export default function Home() {
  // HOME 화면에서는 최신 글 5개만 가져올 수 있도록 query에 해당 정보 같이 전송
  const { data: boardData } = useSWR(
    '/api/posts?category=board&isHome=true',
  );

  const { data: infoData } = useSWR(
    '/api/posts?category=information&isHome=true',
  );
  const { data: marketData } = useSWR(
    '/api/posts?category=market&isHome=true',
  );
  console.log(boardData);
  // PostList에 category 정보 보내는 방식 변경 추후 필요할 수도
  return (
    <Layout title='홈' noPaddingTop={true}>
      <div className='md:grid md:gap-6 md:grid-cols-2'>
        <PostList
          category={categories[0]}
          data={boardData}
          isHome={true}
        />
        <PostList
          category={categories[1]}
          data={infoData}
          isHome={true}
        />
        <PostList
          category={categories[2]}
          data={marketData}
          isHome={true}
        />
      </div>
    </Layout>
  );
}
