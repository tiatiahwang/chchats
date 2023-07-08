import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useEffect,
  useLayoutEffect,
  useState
} from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import Comments from '@/components/comments';
import Layout from '@/components/layout';
import Loader from '@/components/loader';
import Modal from '@/components/modal';
import PostDetail from '@/components/post/postDetail';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { categories, cls } from '@/libs/client/utils';

export default function DetailPage() {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const { data, mutate, isLoading } = useSWR(
    router.query.id
      ? `/api/posts/${router.query.id}`
      : null
  );
  const [addComment, { loading, data: newCommentData }] =
    useMutation(`/api/posts/${router.query.id}/comment`);
  const [toggleScrap] = useMutation(
    `/api/posts/${router.query.id}/scrap`
  );
  const [
    deletePost,
    { loading: deleteLoading, data: deleteStatus },
  ] = useMutation(`/api/posts/${router.query.id}/delete`);
  const [
    deleteComment,
    {
      loading: deleteCommentLoading,
      data: deleteCommentData,
    },
  ] = useMutation(
    `/api/posts/${router.query.id}/delete-comment`
  );
  const [toggleLike, { loading: toggleLikeLoading }] =
    useMutation(`/api/posts/${router.query.id}/like`);

  // 로그인 안내 모달창
  const [showLoginModal, setShowLoginModal] =
    useState(false);
  // 게시글 삭제 확인 모달창
  const [showDeletePostModal, setShowDeletePostModal] =
    useState(false);
  // 댓글 삭제 확인 모달창
  const [
    showDeleteCommentModal,
    setShowDeleteCommentModal,
  ] = useState(false);

  const [mainCategory, setMainCategory] = useState('');

  useLayoutEffect(() => {
    if (!router.isReady) return;
    const currentMainCategory = categories.filter(
      (category) =>
        category.ref === router.asPath.split('/')[1]
    );
    setMainCategory(currentMainCategory[0]);
  }, [router]);

  // 삭제 아이콘 클릭시
  const onClickDelete = () => {
    if (!data || deleteLoading) return;
    setShowDeletePostModal(true);
  };

  useEffect(() => {
    if (deleteStatus && deleteStatus.ok) {
      // TODO: previous page로 이동해야 할 것 같음
      router.push('/');
    }
  }, [deleteStatus]);

  // 스크랩 아이콘 클릭시
  const onClickScrap = () => {
    if (!data) return;
    if (!user) {
      setShowModal(true);
      return;
    }
    mutate(
      (prev) =>
        prev && { ...prev, isScrapped: !prev.isScrapped },
      false
    );
    toggleScrap({});
  };

  // 글 추천 클릭시
  const onClickLike = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            likes: data.isLiked
              ? data?.post._count.likes - 1
              : data?.post._count.likes + 1,
          },
        },
        isLiked: !data.isLiked,
      },
      false
    );
    if (!toggleLikeLoading) {
      toggleLike({});
    }
  };

  // 댓글 쓰기 클릭시 - 비로그인시
  const onClickAddComment = () => setShowLoginModal(true);

  // 댓글 등록
  const onValid = (validForm) => {
    if (loading) return;
    const replaced = validForm.contents.replaceAll(
      '\n',
      '<br/>'
    );
    if (replaced === '') {
      alert('댓글 내용을 작성해주세요.');
    }
    addComment({ contents: replaced });
  };

  // 댓글 등록 성공시, 작성한 댓글 화면에 보이게
  useEffect(() => {
    if (newCommentData && newCommentData.ok) {
      reset();
      mutate();
    }
  }, [newCommentData, reset, mutate]);

  const [commentId, setCommentId] = useState();
  // 댓글 삭제
  const onClickDeleteComment = (id) => {
    if (deleteCommentLoading) return;
    setCommentId(id);
    setShowDeleteCommentModal(true);
  };

  // 댓글 삭제 성공시
  useEffect(() => {
    if (deleteCommentData && deleteCommentData.ok) {
      router.reload();
    }
  }, [deleteCommentData]);

  return (
    <Layout>
      <div className='p-4'>
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
              </div>
            </Link>
            {/* 글 내용 상세 */}
            <PostDetail
              post={data?.post}
              isMyPost={data?.isMyPost}
              isScrapped={data?.isScrapped}
              onClickDelete={onClickDelete}
              onClickScrap={onClickScrap}
            />
            {/* 글 추천 */}
            <div
              className={cls(
                'p-4 flex items-center justify-center',
                data?.isLiked
                  ? 'font-bold text-indigo-500'
                  : ''
              )}
            >
              <div
                className='space-x-2 cursor-pointer w-fit flex'
                onClick={onClickLike}
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
                  />
                </svg>
                <span className='text-sm'>
                  추천 {data?.post?._count.likes}
                </span>
              </div>
            </div>
            {/* 댓글 작성 - 비로그인 시 버튼 노출 (로그인 모달로 로그인 유도) / 로그인시 댓글 창 노출 */}
            {!user ? (
              <div className='border-t-[1px] dark:border-white dark:text-white pt-4 flex items-center'>
                <button
                  onClick={onClickAddComment}
                  className='hover:text-indigo-500 hover:border-indigo-500 text-sm border-[1px] p-2 dark:border-white rounded-md'
                >
                  댓글 쓰기
                </button>
              </div>
            ) : (
              <form
                className='flex flex-col py-4 gap-4 border-y-[1px] dark:border-white dark:text-white'
                onSubmit={handleSubmit(onValid)}
              >
                <div className='flex space-x-4'>
                  <div>
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
                    className='placeholder:text-sm whitespace-pre-line resize-none rounded-md flex-1 focus:outline-none dark:bg-darkbg border-[1px] dark:border-white p-2'
                    placeholder='좋은 영향을 주고 받는 댓글을 남겨주세요 :)'
                  />
                </div>
                <div className='fit-content flex items-center justify-end'>
                  <button className='p-2 rounded-md bg-indigo-500 text-white text-sm hover:bg-indigo-600'>
                    댓글 작성
                  </button>
                </div>
              </form>
            )}
            {/* 댓글 리스트 */}
            {data?.post?.comments.length > 0 ? (
              <Comments
                comments={data?.post?.comments}
                onClickDeleteComment={onClickDeleteComment}
              />
            ) : null}
          </>
        )}
      </div>
      {/* 로그인 안내 모달창 */}
      {showLoginModal ? (
        <Modal
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
          onConfirm={() => router.push('/login')}
          onCancle={() => setShowLoginModal(false)}
        />
      ) : null}
      {/* 게시글 삭제 확인 모달창 */}
      {showDeletePostModal ? (
        <Modal
          showModal={showDeletePostModal}
          setShowModal={setShowDeletePostModal}
          onConfirm={() => deletePost()}
          onCancle={() => setShowDeletePostModal(false)}
          isDelete={true}
        />
      ) : null}
      {/* 댓글 삭제 확인 모달창 */}
      {showDeleteCommentModal ? (
        <Modal
          showModal={showDeleteCommentModal}
          setShowModal={setShowDeleteCommentModal}
          onConfirm={() => deleteComment(commentId)}
          onCancle={() => setShowDeleteCommentModal(false)}
          isDelete={true}
        />
      ) : null}
    </Layout>
  );
}
