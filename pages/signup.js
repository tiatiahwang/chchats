import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Input from '@/components/input';
import useMutation from '@/libs/client/useMutation';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout';

export default function Signup() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signup, { loading, data, error }] = useMutation(
    '/api/users/signup',
  );
  const [errorMessage, setErrorMessage] = useState();

  const togglePassword = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const onValid = (validForm) => {
    if (loading) return;
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
    <Layout noPaddingTop={true}>
      <div className='w-full h-[calc(100vh-5rem)] flex flex-col justify-center items-center'>
        <div className='w-[400px] border p-16'>
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
              label='(필수) 이메일'
              type='email'
              kind='email'
              required
            />
            <Input
              register={register('username', {
                required: true,
              })}
              kind='username'
              name='이름'
              label='(필수) 이름'
              type='text'
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
                label='(필수) 비밀번호'
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
            <div className='pt-5'>
              <Button
                text={loading ? '로딩중' : '가입하기'}
                large={true}
              />
            </div>
          </form>
          <p className='text-center mt-2 text-red-400 text-sm font-bold'>
            {errorMessage}
          </p>
        </div>
      </div>
    </Layout>
  );
}
