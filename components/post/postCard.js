import useTimeFormat from '@/libs/client/useTimeFormat';
import { cls } from '@/libs/client/utils';
import Link from 'next/link';

export default function PostCard({
  post,
  isScrapPage = false,
  showContents = true,
  isLast,
}) {
  return (
    <div
      key={post.id}
      className={cls(
        'dark:text-white space-y-2',
        isLast
          ? 'pt-4'
          : 'border-b-[1px] dark:border-white py-4',
      )}
    >
      {/* 유저 아바타/이름 + 글 작성 시간 + 댓글 갯수 */}
      <div className='flex items-center justify-between  text-xs pb-2'>
        <div className='flex items-center space-x-2'>
          {post?.user?.avatar ? (
            <img
              src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${
                post?.user?.avatar || author?.avatar
              }/avatar`}
              className='h-5 w-5 rounded-full'
            />
          ) : (
            <div className='h-5 w-5 rounded-full bg-indigo-100' />
          )}
          <span>{post?.user?.name}</span>
          <span>·</span>
          <span>
            {useTimeFormat(new Date(post?.createdAt))}{' '}
            {isScrapPage && '스크랩 했어요!'}
          </span>
        </div>
        <div className='flex items-center space-x-1'>
          <svg
            className='h-3 w-3'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
            ></path>
          </svg>
          <span>{post?._count?.comments}</span>
        </div>
      </div>
      {/* 글 제목 및 내용*/}
      <Link
        href={`/${post?.category}/${post?.subCategory}/${post?.id}`}
        className='space-y-2'
      >
        <div className='text-md font-bold hover:text-indigo-500 cursor-pointer'>
          {post.title}
        </div>
        {showContents && post.contents && (
          <div className='text-xs hover:text-indigo-500 cursor-pointer'>
            {post.contents
              .replace(
                /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                '',
              )
              .slice(0, 60)}
          </div>
        )}
      </Link>
    </div>
  );
}
