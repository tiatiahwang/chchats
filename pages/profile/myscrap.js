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
            {data?.scraps.length === 0 ? (
              <div className='py-4'>
                아직 스크랩하신 글이 없어요 🥲
              </div>
            ) : (
              <>
                {data?.scraps?.map((scrap, index) => (
                  <PostCard
                    post={scrap.post}
                    key={scrap.id}
                    isScrapPage={true}
                    scrapCreatedAt={scrap.createdAt}
                    isLast={
                      data?.scraps?.length - 1 === index
                        ? true
                        : false
                    }
                  />
                ))}
              </>
            )}
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
