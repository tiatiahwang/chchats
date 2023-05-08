import Layout from '@/components/layout';
import PostList from '@/components/postList';
import { marketCategories } from '@/libs/client/utils';
import useSWR from 'swr';

export default function Questions() {
  const { data } = useSWR('/api/posts?category=market');

  return (
    <Layout>
      <PostList
        categoryName='Market'
        description='사고 팔고 사고 팔고'
        onClick={() => router.push('/market/new')}
        data={data}
        categoryList={marketCategories}
      />
    </Layout>
  );
}
