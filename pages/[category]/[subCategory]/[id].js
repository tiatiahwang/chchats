import Comments from '@/components/comments';
import Layout from '@/components/layout';
import Loader from '@/components/loader';
import Modal from '@/components/modal';
import PostDetail from '@/components/postDetail';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { categories } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

export default function DetailPage() {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { data, mutate, isLoading } = useSWR(
    router.query.id
      ? `/api/posts/${router.query.id}`
      : null,
  );
  const [addComment, { loading, data: newCommentData }] =
    useMutation(`/api/posts/${router.query.id}/comment`);

  const [mainCategory, setMainCategory] = useState('');

  useLayoutEffect(() => {
    if (!router.isReady) return;
    const currentMainCategory = categories.filter(
      (category) =>
        category.ref === router.asPath.split('/')[1],
    );
    setMainCategory(currentMainCategory[0]);
  }, [router]);

  const [showModal, setShowModal] = useState(false);
  const [showCommentForm, setShowCommentForm] =
    useState(false);

  const onValid = (validForm) => {
    if (loading) return;
    addComment(validForm);
  };

  const onClickAddComment = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    setShowCommentForm(!showCommentForm);
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* 메인 카테고리 */}
            <Link href={`/${mainCategory.ref}`}>
              <div className='dark:text-white bg-gray-200 dark:bg-darkselected py-4 px-8 rounded-md'>
                <p className='font-semibold text-md'>
                  {mainCategory.name}
                </p>
                <p className='text-xs'>
                  {mainCategory.description}
                </p>
              </div>
            </Link>
            {/* 글 내용 상세 */}
            <PostDetail post={data?.post} />
            {/* 댓글 작성 */}
            <button
              onClick={onClickAddComment}
              className='hover:text-indigo-500 text-sm pb-6'
            >
              {showCommentForm
                ? '댓글창 닫기'
                : '댓글 쓰기'}
            </button>
            {showCommentForm ? (
              <form
                className='flex mb-4 gap-4'
                onSubmit={handleSubmit(onValid)}
              >
                <div className='shrink-0'>
                  {user?.avatar ? (
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
                  disabled={!user ? true : false}
                />
                <button className='text-sm cursor-pointer hover:text-indigo-500'>
                  댓글 작성
                </button>
              </form>
            ) : null}
            {/* 댓글 리스트 */}
            {data?.post?.comments.length > 0 ? (
              <Comments comments={data?.post?.comments} />
            ) : null}
          </>
        )}
      </div>
      {/* 로그인 안내 모달창 */}
      {showModal ? (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          onConfirm={() => router.push('/login')}
          onCancle={() => setShowModal(false)}
        />
      ) : null}
    </Layout>
  );
}
