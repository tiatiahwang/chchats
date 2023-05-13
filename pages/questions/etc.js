import Layout from '@/components/layout';
import PostList from '@/components/postList';
import { questionsCategories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Etc() {
  const router = useRouter();
  const { data } = useSWR(
    router.pathname
      ? `/api/posts?category=${
          router.pathname.split('/')[1]
        }&subCategory=${router.pathname.split('/')[2]}`
      : null,
  );
  const onClick = () => router.push('/questions/new');
  return (
    <Layout>
      <PostList
        categoryName='Q&A'
        description='다양한 주제에 대해서 묻고 대답해보세요.'
        onClick={onClick}
        data={data}
        categoryList={questionsCategories}
      />
    </Layout>
  );
}
