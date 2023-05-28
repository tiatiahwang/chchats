import useTimeFormat from '@/libs/client/useTimeFormat';

export default function Comments({ comments }) {
  return comments?.map((comment) => (
    <div
      key={comment.id}
      className='dark:text-white border-t-[1px] dark:border-white py-6'
    >
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
    </div>
  ));
}
