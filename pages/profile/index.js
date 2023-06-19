import { useState } from 'react';
import useSWR from 'swr';
import Loader from '@/components/loader';
import PostCard from '@/components/post/postCard';
import ProfileNav from '@/components/profile/profileNav';
import Pagination from '@/components/post/pagination';

const Profile = () => {
  const [page, setPage] = useState(1);
  console.log(page);
  const { data, isLoading } = useSWR(
    page !== null
      ? `/api/users/me/posts?page=${page}`
      : null,
  );

  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.posts?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.totalPages}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
