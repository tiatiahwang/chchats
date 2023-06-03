import ProfileNav from '@/components/profile/profileNav';
import useUser from '@/libs/client/useUser';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const MyScrap = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useSWR('/api/users/me/posts');

  return <ProfileNav />;
};

export default MyScrap;
