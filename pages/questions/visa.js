import Button from '@/components/button';
import Category from '@/components/category';
import Layout from '@/components/layout';
import { questionsCategories } from '@/libs/client/utils';
import { useRouter } from 'next/router';

export default function Visa() {
  const router = useRouter();
  const onClick = () => router.push('/questions/new');
  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <Button text='글작성하기' large={false} onClick={onClick} />
        <Category categories={questionsCategories} />
      </div>
    </Layout>
  );
}
