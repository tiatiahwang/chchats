import Layout from '@/components/layout';
import PostList from '@/components/post/postList';
import { categories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function SubPosts() {
  const router = useRouter();
  const { data } = useSWR(
    router.asPath
      ? `/api/posts?category=${
          router.asPath.split('/')[1]
        }&subCategory=${router.asPath.split('/')[2]}`
      : null,
  );
  const onClick = () => {
    if (!router.isReady) return;
    router.push({
      pathname: `${router.asPath.slice(0)}/new`,
    });
  };
  return (
    <Layout noPaddingTop={true}>
      <PostList
        category={
          categories.filter(
            (category) =>
              category.ref === router.asPath.split('/')[1],
          )[0]
        }
        onClick={onClick}
        data={data}
      />
    </Layout>
  );
}
