import useTimeFormat from '@/libs/client/useTimeFormat';

export default function PostDetail({ post }) {
  // 데이터 로딩되는 동안 뭔가 화면에 표시해주어야함
  return (
    post && (
      <div className='border-t-[1px] border-white space-y-8 py-8'>
        <div className='flex space-x-4 items-center'>
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
          <div className='flex flex-col'>
            <span className='text-sm'>
              {post?.user?.name}
            </span>
            <span className='text-xs'>
              {useTimeFormat(new Date(post?.createdAt))}
            </span>
          </div>
        </div>
        <h1 className='text-2xl font-semibold'>
          {post?.title}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: post?.contents,
          }}
        />
      </div>
    )
  );
}
