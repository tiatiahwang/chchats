import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';

const PostDetail = () => {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id ? `/api/posts/${router.query.id}` : null,
  );

  return (
    <div className='px-4 py-4'>
      <div className='mb-8'>
        <div className='h-96 bg-pink-100' />
        <div className='flex cursor-pointer items-center space-x-3 border-b border-t py-3'>
          <div className='h-12 w-12 rounded-full bg-pink-200' />
          <Link href={`/users/profiles/${data?.post?.user?.id}`} legacyBehavior>
            <p className='text-sm font-medium text-gray-700'>
              {data?.post?.user?.name}
            </p>
          </Link>
        </div>
        <div className='mt-5'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {data?.post?.title}
          </h1>
          <div
            className='my-6 text-gray-700'
            dangerouslySetInnerHTML={{ __html: data?.post?.contents }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
