import Layout from '@/components/layout';
import PostList from '@/components/post-card';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Questions() {
  const router = useRouter();
  const { data } = useSWR('/api/posts?category=questions');

  const onClick = () => router.push('/questions/new');

  return (
    <Layout>
      <PostList
        categoryName='Q&A'
        description='다양한 주제에 대해서 묻고 대답해보세요.'
        onClick={onClick}
        data={data}
      />
    </Layout>
  );
}
