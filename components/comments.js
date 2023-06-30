import useTimeFormat from '@/libs/client/useTimeFormat';
import useUser from '@/libs/client/useUser';
import { cls } from '@/libs/client/utils';
import Link from 'next/link';

export default function Comments({
  comments,
  isProfile = false,
  onClickDeleteComment,
}) {
  const { user } = useUser();
  return (
    <>
      {isProfile && comments.length === 0 ? (
        <div className='py-4'>
          아직 남기신 댓글이 없어요 🥲
        </div>
      ) : null}
      {/* TODO: 마지막 댓글 border-b는 없애야함 */}
      {comments?.map((comment) => (
        <div
          key={comment.id}
          className={cls(
            'dark:text-white border-b-[1px] dark:border-white',
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
              <div className='flex justify-between items-center text-xs pb-2'>
                <div className='flex items-center space-x-2'>
                  {comment.user.avatar ? (
                    <img
                      src={`https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${comment.user.avatar}/avatar`}
                      className='h-6 w-6 rounded-full'
                    />
                  ) : (
                    <div className='h-8 w-8 rounded-full bg-indigo-100' />
                  )}
                  <span>{comment.user.name}</span>
                  <span>·</span>
                  <span>
                    {useTimeFormat(
                      new Date(comment.createdAt),
                    )}
                  </span>
                </div>
                <div className='flex itmes-center'>
                  {user?.id === comment?.user?.id ? (
                    <div
                      className='cursor-pointer'
                      onClick={() =>
                        onClickDeleteComment(comment.id)
                      }
                    >
                      <svg
                        className='w-6 h-6 rounded-full p-1 dark:hover:bg-indigo-500 dark:text-white hover:text-indigo-500'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        ></path>
                      </svg>
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: comment.contents,
                }}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
}
