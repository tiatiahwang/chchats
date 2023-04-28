import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Input from '@/components/input';

export default function Signup() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const onClick = () => {
    // 가입이 성공한 경우에만 redirect
    router.push('/login');
  };
  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
      <div className='w-1/3 border p-20'>
        <h3 className='text-center text-3xl font-bold mb-10 text-indigo-500'>
          가입하기
        </h3>
        <form className='mt-8 flex flex-col space-y-6'>
          <Input name='이메일' label='이메일' type='email' required />
          <Input
            name='비밀번호'
            label='비밀번호'
            kind='password'
            type={show ? 'text' : 'password'}
            onClick={togglePassword}
          />
          <div className='pt-5'>
            <Button text={'가입하기'} onClick={onClick} />
          </div>
        </form>
      </div>
    </div>
  );
}
