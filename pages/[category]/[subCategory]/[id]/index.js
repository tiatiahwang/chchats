import Comments from '@/components/comments';
import Layout from '@/components/layout';
import Loader from '@/components/loader';
import Modal from '@/components/modal';
import PostDetail from '@/components/post/postDetail';
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
  const [toggleScrap] = useMutation(
    `/api/posts/${router.query.id}/scrap`,
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
    `/api/posts/${router.query.id}/delete-comment`,
  );

  // 로그인 안내 모달창
  const [showLoginModal, setShowLoginModal] =
    useState(false);
  // 게시글 삭제 확인 모달창
  const [showDeletePostModal, setShowDeletePostModal] =
    useState(false);
  // 댓글 쓰기 부분 보였다 안보였다
  const [showCommentForm, setShowCommentForm] =
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
        category.ref === router.asPath.split('/')[1],
    );
    setMainCategory(currentMainCategory[0]);
  }, [router]);

  // 삭제 아이콘 클릭시
  const onClickDelete = () => {
    if (!data || deleteLoading) return;
    setShowDeleteModal(true);
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
      false,
    );
    toggleScrap({});
  };

  // 댓글 쓰기 클릭시
  const onClickAddComment = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    setShowCommentForm(!showCommentForm);
  };

  // 댓글 등록
  const onValid = (validForm) => {
    if (loading) return;
    const replaced = validForm.contents.replaceAll(
      '\n',
      '<br/>',
    );
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
            {/* 댓글 작성 */}
            <button
              onClick={onClickAddComment}
              className='hover:text-indigo-500 hover:border-indigo-500 text-sm border-[1px] border-white mb-6 p-2 rounded-md'
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
                  className='whitespace-pre-line resize-none rounded-md flex-1 focus:outline-none dark:bg-darkbg border-[1px] dark:border-white p-2'
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
          onCancle={() => setShowModal(false)}
        />
      ) : null}
      {/* 게시글 삭제 확인 모달창 */}
      {showDeletePostModal ? (
        <Modal
          showModal={showDeletePostModal}
          setShowModal={setShowDeletePostModal}
          onConfirm={() => deletePost()}
          onCancle={() => setShowDeleteModal(false)}
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
