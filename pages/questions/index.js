import Button from '@/components/button';
import Category from '@/components/category';
import Layout from '@/components/layout';
import { questionsCategories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Questions() {
  const router = useRouter();
  const onClick = () => router.push('/questions/new');

  const { data } = useSWR('/api/posts?category=questions');
  useEffect(() => {
    if (data && data.ok) console.log(data);
  }, [data]);
  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <Button text='글작성하기' large={false} onClick={onClick} />
        <Category categories={questionsCategories} />
        {data?.posts?.map((post) => (
          <div key={post.id} className='text-white space-y-2'>
            <div className='flex items-center space-x-2 text-xs'>
              <div className='w-5 h-5 rounded-full bg-indigo-100' />
              <span>{post.user.name}</span>
              <span>{post.createdAt}</span>
            </div>
            <div className='text-md font-bold hover:text-indigo-500 cursor-pointer'>
              {post.title}
            </div>
            <div className='text-xs hover:text-indigo-500 cursor-pointer'>
              {post.contents
                .replace(
                  /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                  '',
                )
                .slice(0, 60)}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
