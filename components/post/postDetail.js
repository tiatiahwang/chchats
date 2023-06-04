import useMutation from '@/libs/client/useMutation';
import useTimeFormat from '@/libs/client/useTimeFormat';
import { useEffect } from 'react';

export default function PostDetail({ post }) {
  const [scrap, { loading, data }] = useMutation(
    post?.id ? `/api/posts/${post?.id}/scrap` : null,
  );
  // 데이터 로딩되는 동안 뭔가 화면에 표시해주어야함
  const onClickScrap = (id) => {
    if (loading) return;
    scrap(post?.title);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    post && (
      <div className='space-y-8 py-8'>
        <div className='flex items-center justify-between'>
          {/* 글쓴이 정보 */}
          <div className='flex space-x-4 items-center'>
            {/* 아바타 */}
            <div>
              {post?.user?.avatar ? (
                <img
                  src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${post?.user?.avatar}/avatar`}
                  className='h-12 w-12 rounded-full'
                />
              ) : (
                <div className='h-16 w-16 rounded-full bg-indigo-100' />
              )}
            </div>
            {/* 글쓴이 이름과 글 쓴 날짜 */}
            <div className='flex flex-col'>
              <span className='text-sm'>
                {post?.user?.name}
              </span>
              <span className='text-xs'>
                {useTimeFormat(new Date(post?.createdAt))}
              </span>
            </div>
          </div>
          {/* TODO:: 스크랩 아이콘 추가하기 */}
          <div
            className='cursor-pointer'
            onClick={() => onClickScrap(post?.id)}
          >
            스크랩
          </div>
        </div>
        {/* 글 제목 */}
        <h1 className='text-2xl font-semibold'>
          {post?.title}
        </h1>
        {/* 글 내용 */}
        <div
          dangerouslySetInnerHTML={{
            __html: post?.contents,
          }}
        />
      </div>
    )
  );
}
