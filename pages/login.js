import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Input from '@/components/input';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';

export default function Login() {
  const router = useRouter();
  const [login, { loading, data, error }] = useMutation('/api/users/login');
  const { register, watch, reset, handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const togglePassword = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const onValid = (validForm) => {
    if (loading) return;
    login(validForm);
  };

  const onRegisterClick = () => {
    router.push('/signup');
  };

  useEffect(() => {
    if (!data?.ok) {
      setErrorMessage(data?.message);
    } else {
      router.push('/');
    }
  }, [data]);

  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
      <div className='w-3/4 border p-20'>
        <h3 className='text-center text-3xl font-bold mb-10 text-indigo-500'>
          로그인
        </h3>
        <form
          className='mt-8 flex flex-col space-y-6'
          onSubmit={handleSubmit(onValid)}
        >
          <Input
            register={register('email', {
              required: true,
            })}
            name='이메일'
            label='이메일'
            kind='email'
            type='email'
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
            <Button text={'로그인하기'} />
          </div>
        </form>
        <p>{errorMessage}</p>
        <div className='mt-10'>
          <div className='relative'>
            <div className='absolute w-full border-t border-gray-300' />
            <div className='relative -top-3 text-center '>
              <span className='bg-white px-2 text-sm text-gray-500'>
                아직 계정이 없으시다면
              </span>
            </div>
            <Button
              transparantBg={true}
              text={'가입하기'}
              onClick={onRegisterClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
