import useUser from '@/libs/client/useUser';

export default function Home() {
  const { user, isLoading } = useUser();
  console.log(user, isLoading);
  return <div>홈</div>;
}
