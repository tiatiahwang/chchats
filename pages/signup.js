import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Input from '@/components/input';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { register, watch, reset, handleSubmit } = useForm();
  const [signup, { loading, data, error }] = useMutation('/api/users/signup');
  const [errorMessage, setErrorMessage] = useState();

  const togglePassword = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const onValid = (validForm) => {
    signup(validForm);
  };

  useEffect(() => {
    if (!data?.ok) {
      setErrorMessage(data?.message);
    } else {
      router.push('/login');
    }
  }, [data]);

  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
      <div className='w-3/4 border p-20'>
        <h3 className='text-center text-3xl font-bold mb-10 text-indigo-500'>
          가입하기
        </h3>
        <form
          onSubmit={handleSubmit(onValid)}
          className='mt-8 flex flex-col space-y-6'
        >
          <Input
            register={register('email', {
              required: true,
            })}
            name='이메일'
            label='이메일'
            type='email'
            kind='email'
            required
          />
          <Input
            register={register('password', {
              required: true,
            })}
            name='비밀번호'
            label='비밀번호'
            kind='password'
            type={show ? 'text' : 'password'}
            onClick={togglePassword}
          />
          <div className='pt-5'>
            <Button text={'가입하기'} />
          </div>
        </form>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}
