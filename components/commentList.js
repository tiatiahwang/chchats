import useTimeFormat from '@/libs/client/useTimeFormat';

export default function CommentList({ comments }) {
  return comments?.map((comment) => (
    <div
      key={comment.id}
      className='dark:text-white border-t-[1px] dark:border-white py-6'
    >
      <div className='flex items-center space-x-2 text-xs pb-2'>
        <div className='w-5 h-5 rounded-full bg-indigo-100' />
        <span>{comment.user.name}</span>
        <span>·</span>
        <span>
          {useTimeFormat(new Date(comment.createdAt))}
        </span>
      </div>
      <p>{comment.contents}</p>
    </div>
  ));
}
