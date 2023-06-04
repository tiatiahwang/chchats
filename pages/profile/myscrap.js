import PostCard from '@/components/post/postCard';
import ProfileNav from '@/components/profile/profileNav';
import { useEffect } from 'react';
import useSWR from 'swr';

const MyScrap = () => {
  const { data } = useSWR('/api/users/me/scraps');
  useEffect(() => {
    console.log(data), [data];
  });
  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {data?.scraps?.map((scrap) => (
          <PostCard
            post={scrap.post}
            author={scrap.user}
            key={scrap.id}
          />
        ))}
      </div>
    </>
  );
};

export default MyScrap;
