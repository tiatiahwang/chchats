import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Input from '@/components/input';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout';

export default function Login() {
  const router = useRouter();
  const [login, { loading, data, error }] = useMutation(
    '/api/users/login',
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  useEffect(() => console.log(errors), [errors]);

  return (
    <Layout noPaddingTop={true}>
      <div className='w-full h-[calc(100vh-5rem)] flex flex-col justify-center items-center'>
        <div className='w-[350px] border py-16 px-10'>
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
            <div>
              <Input
                register={register('password', {
                  required: true,
                  minLength: {
                    value: 6,
                    message: '최소 6자 이상 입력해주세요.',
                  },
                })}
                name='비밀번호'
                label='비밀번호'
                kind='password'
                type={show ? 'text' : 'password'}
                onClick={togglePassword}
              />
              {errors?.password?.message && (
                <span className='flex justify-center pt-2 text-sm'>
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <div className='pt-4'>
              <Button text={'로그인하기'} large={true} />
            </div>
          </form>
          <p>{errorMessage}</p>
          <div className='mt-10'>
            <div className='relative'>
              <div className='absolute w-full border-t border-gray-300' />
              <div className='relative -top-3 text-center '>
                <span className='bg-white dark:bg-[#374151] px-2 text-sm text-gray-500 dark:text-gray-300'>
                  아직 계정이 없으시다면
                </span>
              </div>
              <Button
                transparantBg={true}
                text={'가입하기'}
                onClick={onRegisterClick}
                large={true}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
