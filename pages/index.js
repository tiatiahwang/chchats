import Layout from '@/components/layout';
import PostList from '@/components/postList';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Home() {
  const router = useRouter();
  const { data: QuestionsData } = useSWR(
    '/api/posts?category=questions',
  );
  const { data: MarketData } = useSWR(
    '/api/posts?category=market',
  );

  return (
    <Layout title='홈' noPaddingTop={true}>
      <PostList
        categoryName='Q&A'
        onClick={() => router.push('/questions/new')}
        data={QuestionsData}
        isHome={true}
      />
      <PostList
        categoryName='Market'
        onClick={() => router.push('/market/new')}
        data={MarketData}
        isHome={true}
      />
    </Layout>
  );
}
