import { useState } from 'react';
import useSWR from 'swr';
import Loader from '@/components/loader';
import PostCard from '@/components/post/postCard';
import ProfileNav from '@/components/profile/profileNav';
import Pagination from '@/components/post/pagination';

const Profile = () => {
  const [page, setPage] = useState(1);
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
            {data?.posts?.map((post, index) => (
              <PostCard
                post={post}
                key={post.id}
                isLast={
                  data?.posts?.length - 1 === index
                    ? true
                    : false
                }
              />
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
