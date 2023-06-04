import useTimeFormat from '@/libs/client/useTimeFormat';
import Link from 'next/link';

export default function PostCard({ post, author = null }) {
  return (
    <div
      key={post.id}
      className='dark:text-white border-b-[1px] dark:border-white py-4 space-y-2'
    >
      <div className='flex items-center space-x-2 text-xs pb-2'>
        {post?.user?.avatar || author?.avatar ? (
          <img
            src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${
              post?.user?.avatar || author?.avatar
            }/avatar`}
            className='h-5 w-5 rounded-full'
          />
        ) : (
          <div className='h-5 w-5 rounded-full bg-indigo-100' />
        )}
        <span>{post?.user?.name || author?.name}</span>
        <span>·</span>
        <span>
          {useTimeFormat(new Date(post?.createdAt))}{' '}
          {author !== null && '스크랩 했어요!'}
        </span>
      </div>
      <Link
        href={`/${post?.category}/${post?.subCategory}/${post?.id}`}
        className='space-y-2'
      >
        <div className='text-md font-bold hover:text-indigo-500 cursor-pointer'>
          {post.title}
        </div>
        <div className='text-xs hover:text-indigo-500 cursor-pointer'>
          {post.contents &&
            post.contents
              .replace(
                /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                '',
              )
              .slice(0, 60)}
        </div>
      </Link>
    </div>
  );
}
