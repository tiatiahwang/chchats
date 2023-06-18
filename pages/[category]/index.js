import Layout from '@/components/layout';
import PostList from '@/components/post/postList';
import { categories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Posts() {
  const router = useRouter();
  const { data } = useSWR(
    router.asPath
      ? `/api/posts?category=${router.asPath.slice(1)}`
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
    </Layout>
  );
}
