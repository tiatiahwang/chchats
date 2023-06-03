import useTimeFormat from '@/libs/client/useTimeFormat';
import { cls } from '@/libs/client/utils';
import Link from 'next/link';

export default function Comments({
  comments,
  isProfile = false,
}) {
  return comments?.map((comment) => (
    <div
      key={comment.id}
      className={cls(
        'dark:text-white border-t-[1px] dark:border-white',
        isProfile ? 'py-4' : 'py-6',
      )}
    >
      {isProfile ? (
        <Link
          className='hover:text-indigo-500'
          href={`/${comment.post.category}/${comment.post.subCategory}/${comment.postId}`}
        >
          <div className='flex items-center space-x-2 text-sm pb-2 cursor-pointer'>
            <p>
              '
              <span className='font-bold'>
                {comment.post.title}
              </span>
              ' 게시물에 아래 댓글을 남기셨어요!
            </p>
          </div>
          <p>{comment.contents}</p>
        </Link>
      ) : (
        <>
          <div className='flex items-center space-x-2 text-xs pb-2'>
            {comment.user.avatar ? (
              <img
                src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${comment.user.avatar}/avatar`}
                className='h-8 w-8 rounded-full'
              />
            ) : (
              <div className='h-8 w-8 rounded-full bg-indigo-100' />
            )}
            <span>{comment.user.name}</span>
            <span>·</span>
            <span>
              {useTimeFormat(new Date(comment.createdAt))}
            </span>
          </div>
          <p>{comment.contents}</p>
        </>
      )}
    </div>
  ));
}
