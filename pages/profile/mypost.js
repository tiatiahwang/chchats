import PostCard from '@/components/post/postCard';
import ProfileNav from '@/components/profile/profileNav';
import useSWR from 'swr';

const MyPost = () => {
  const { data } = useSWR('/api/users/me/posts');

  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {data?.posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default MyPost;
