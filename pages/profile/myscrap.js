import PostCard from '@/components/post/postCard';
import ProfileNav from '@/components/profile/profileNav';
import { useEffect } from 'react';
import useSWR from 'swr';

const MyScrap = () => {
  const { data } = useSWR('/api/users/me/scraps');
  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {data?.scraps?.map((scrap) => (
          <PostCard
            post={scrap.post}
            key={scrap.id}
            isScrapPage={true}
          />
        ))}
      </div>
    </>
  );
};

export default MyScrap;
