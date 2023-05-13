import Layout from '@/components/layout';
import PostList from '@/components/postList';
import { marketCategories } from '@/libs/client/utils';
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
  const onClick = () => router.push('/market/new');
  return (
    <Layout>
      <PostList
        categoryName='Market'
        description='사고 팔고 사고 팔고'
        onClick={onClick}
        data={data}
        categoryList={marketCategories}
      />
    </Layout>
  );
}
