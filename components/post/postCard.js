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
      {/* 유저 아바타/이름 + 글 작성 시간 + 좋아요 갯수 + 댓글 갯수 */}
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
        <div className='flex items-center space-x-2'>
          {/* 좋아요 부분 */}
          <div className='flex items-center space-x-1'>
            <svg
              className='h-3 w-3'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
              ></path>
            </svg>
            <span>{post?._count.likes}</span>
          </div>
          {/* 댓글 부분 */}
          <div className='flex space-x-1 items-center'>
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
