import { useState } from 'react';
import useSWR from 'swr';

import Comments from '@/components/comments';
import Loader from '@/components/loader';
import Pagination from '@/components/post/pagination';
import ProfileNav from '@/components/profile/profileNav';

const MyCommnet = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(
    `/api/users/me/comments?page=${page}`
  );

  return (
    <>
      <ProfileNav />
      <div className='px-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.comments ? (
              <Comments
                comments={data.comments}
                isProfile={true}
              />
            ) : null}
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

export default MyCommnet;
