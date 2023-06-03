import Comments from '@/components/comments';
import ProfileNav from '@/components/profile/profileNav';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const MyCommnet = () => {
  const router = useRouter();
  const { data } = useSWR('/api/users/me/comments');
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {data?.comments ? (
          <Comments
            comments={data.comments}
            isProfile={true}
          />
        ) : null}
      </div>
    </>
  );
};

export default MyCommnet;
