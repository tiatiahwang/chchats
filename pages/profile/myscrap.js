import useSWR from 'swr';
import Loader from '@/components/loader';
import PostCard from '@/components/post/postCard';
import ProfileNav from '@/components/profile/profileNav';
import { useState } from 'react';
import Pagination from '@/components/post/pagination';

const MyScrap = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(
    `/api/users/me/scraps?page=${page}`,
  );
  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.scraps?.map((scrap) => (
              <PostCard
                post={scrap.post}
                key={scrap.id}
                isScrapPage={true}
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

export default MyScrap;
