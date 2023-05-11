import Category from '@/components/category';
import Layout from '@/components/layout';
import PostDetail from '@/components/postDetail';
import useMutation from '@/libs/client/useMutation';
import useTimeFormat from '@/libs/client/useTimeFormat';
import useUser from '@/libs/client/useUser';
import { marketCategories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function Questions() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR(
    router.query.id
      ? `/api/posts/${router.query.id}`
      : null,
  );
  const [addComment, { loading, data: newCommentData }] =
    useMutation(`/api/posts/${router.query.id}/comment`);
  const onValid = (validForm) => {
    if (loading) return;
    addComment(validForm);
  };
  useEffect(() => {
    if (newCommentData && newCommentData.ok) {
      reset();
      mutate();
    }
  }, [newCommentData, reset, mutate]);
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
          categories={marketCategories}
          selected={data?.post?.subCategory}
        />
        <PostDetail post={data?.post} />
        {/* COMMENT SECTION */}
        <div className='mt-0'>
          <form
            className='flex mb-4 gap-4'
            onSubmit={handleSubmit(onValid)}
          >
            <div className='shrink-0'>
              {user?.avater ? (
                <img
                  src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${user?.avatar}/avatar`}
                  className='h-8 w-8 rounded-full'
                />
              ) : (
                <div className='h-8 w-8 rounded-full bg-indigo-100' />
              )}
            </div>
            <textarea
              {...register('contents')}
              className='resize-none rounded-md flex-1 focus:outline-none dark:bg-darkbg border-[1px] dark:border-white p-2'
              placeholder={
                !user ? '로그인을 해주세요' : null
              }
            />
            <button
              disabled={!user}
              className='text-sm cursor-pointer hover:text-indigo-500'
            >
              댓글 작성
            </button>
          </form>
          {data?.post?.comments?.map((comment) => (
            <div
              key={comment.id}
              className='dark:text-white border-t-[1px] dark:border-white py-6'
            >
              <div className='flex items-center space-x-2 text-xs pb-2'>
                <div className='w-5 h-5 rounded-full bg-indigo-100' />
                <span>{comment.user.name}</span>
                <span>·</span>
                <span>
                  {useTimeFormat(
                    new Date(comment.createdAt),
                  )}
                </span>
              </div>
              <p>{comment.contents}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
