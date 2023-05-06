import Button from '@/components/button';
import Category from '@/components/category';
import Layout from '@/components/layout';
import useTimeFormat from '@/libs/client/useTimeFormat';
import { questionsCategories } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Questions() {
  const router = useRouter();
  const { data } = useSWR('/api/posts?category=questions');

  const onClick = () => router.push('/questions/new');

  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <div className='dark:text-white dark:bg-darkselected py-4 px-8 rounded-md'>
          <p className='font-semibold text-md'>Q&A</p>
          <p className='text-xs'>
            다양한 주제에 대해서 묻고 대답해보세요.
          </p>
        </div>
        <Button
          text='글작성하기'
          large={false}
          onClick={onClick}
        />
        <Category categories={questionsCategories} />
        <div className='border-t-[1px] border-white'>
          {data?.posts?.map((post) => {
            const formattedCreatedAt = useTimeFormat(
              new Date(post.createdAt),
            );
            return (
              <div
                key={post.id}
                className='text-white border-b-[1px] border-white py-4 space-y-2'
              >
                <div className='flex items-center space-x-2 text-xs pb-2'>
                  <div className='w-5 h-5 rounded-full bg-indigo-100' />
                  <span>{post.user.name}</span>
                  <span>·</span>
                  <span>{formattedCreatedAt}</span>
                </div>
                <Link
                  href={`/questions/${post.id}`}
                  className='space-y-2'
                >
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
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
