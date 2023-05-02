import Layout from '@/components/layout';
import useUser from '@/libs/client/useUser';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const { user, isLoading } = useUser();
  const [navbar, setNavbar] = useState(false);
  return <Layout title='홈'></Layout>;
}
