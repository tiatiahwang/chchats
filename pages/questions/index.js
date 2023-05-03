import Button from '@/components/button';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';

export default function Questions() {
  const router = useRouter();
  const onClick = () => router.push('/questions/new');
  return (
    <Layout>
      <Button text='글작성하기' large={false} onClick={onClick} />
      <div>큐앤에이</div>
    </Layout>
  );
}
