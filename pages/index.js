import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';

export default function Home() {
  const { user, isLoading } = useUser();
  return <Layout title='홈'></Layout>;
}
