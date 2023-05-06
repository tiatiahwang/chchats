import Button from '@/components/button';
import Category from '@/components/category';
import Layout from '@/components/layout';
import useTimeFormat from '@/libs/client/useTimeFormat';
import { questionsCategories } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Questions() {
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState('');
  const { data } = useSWR(
    router.query.id
      ? `/api/posts/${router.query.id}`
      : null,
  );

  useEffect(() => {
    if (data && data.ok) {
      const createdAt = new Date(data.post.createdAt);
      setCreatedAt(useTimeFormat(createdAt));
    }
  }, [data]);

  return (
    <Layout>
      <div className='p-4 space-y-6'>
        <div className='dark:text-white dark:bg-darkselected py-4 px-8 rounded-md'>
          <p className='font-semibold text-md'>Q&A</p>
          <p className='text-xs'>
            다양한 주제에 대해서 묻고 대답해보세요.
          </p>
        </div>
        <Category
          categories={questionsCategories}
          selected={data?.post?.subCategory}
        />
        <div className='border-t-[1px] border-white space-y-8 py-8'>
          <div className='flex space-x-4 items-center'>
            <div>
              {data?.post?.user?.avatar ? (
                <img
                  src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${data?.post?.user?.avatar}/avatar`}
                  className='h-12 w-12 rounded-full'
                />
              ) : (
                <div className='h-16 w-16 rounded-full bg-indigo-100' />
              )}
            </div>
            <div className='flex flex-col'>
              <span className='text-sm'>
                {data?.post?.user?.name}
              </span>
              <span className='text-xs'>{createdAt}</span>
            </div>
          </div>
          <h1 className='text-2xl font-semibold'>
            {data?.post?.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.post?.contents,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
