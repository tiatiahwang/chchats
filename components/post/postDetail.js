import useTimeFormat from '@/libs/client/useTimeFormat';

export default function PostDetail({
  post,
  isScrapped,
  onClickScrap,
}) {
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
          {/* 스크랩 */}
          <div
            className='cursor-pointer'
            onClick={onClickScrap}
          >
            <svg
              className='w-6 h-6'
              fill={isScrapped ? 'white' : 'none'}
              stroke='currentColor'
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
              ></path>
            </svg>
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
