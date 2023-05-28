import Layout from '@/components/layout';
import PostList from '@/components/postList';
import { categories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Home() {
  const router = useRouter();
  const { data: QuestionsData } = useSWR(
    '/api/posts?category=questions',
  );
  const { data: InfoData } = useSWR(
    '/api/posts?category=information',
  );
  const { data: MarketData } = useSWR(
    '/api/posts?category=market',
  );

  // PostList에 category 정보 보내는 방식 변경 추후 필요할 수도
  return (
    <Layout title='홈' noPaddingTop={true}>
      <PostList
        category={categories[0]}
        data={QuestionsData}
        isHome={true}
      />
      <PostList
        category={categories[1]}
        data={InfoData}
        isHome={true}
      />
      <PostList
        category={categories[2]}
        data={MarketData}
        isHome={true}
      />
    </Layout>
  );
}
