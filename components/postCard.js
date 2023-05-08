import useTimeFormat from '@/libs/client/useTimeFormat';
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div
      key={post.id}
      className='text-white border-b-[1px] border-white py-4 space-y-2'
    >
      <div className='flex items-center space-x-2 text-xs pb-2'>
        <div className='w-5 h-5 rounded-full bg-indigo-100' />
        <span>{post.user.name}</span>
        <span>·</span>
        <span>
          {useTimeFormat(new Date(post.createdAt))}
        </span>
      </div>
      <Link
        href={`/${post.category}/${post.id}`}
        className='space-y-2'
      >
        <div className='text-md font-bold hover:text-indigo-500 cursor-pointer'>
          {post.title}
        </div>
        <div className='text-xs hover:text-indigo-500 cursor-pointer'>
          {post.contents
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
