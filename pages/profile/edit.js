import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { cls } from '@/libs/client/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const FILE_NAME = new Date().toJSON().slice(0, 10);

const Profile = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
    setValue,
  } = useForm();
  const [editProfile, { loading, data }] =
    useMutation('/api/users/me');
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');

  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.name) setValue('name', user.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${user?.avatar}/avatar`,
      );
  }, [user, setValue, setAvatarPreview]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  const onChange = () => {
    if (errors.formErrors?.mesage) {
      clearErrors('formErrors');
    }
  };

  const onValid = async ({ email, name }) => {
    if (loading) return;

    if (email === '' && name === '') {
      return setError('formErrors', {
        message: '이메일과 이름은 필수 입력 사항입니다.',
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (
        await fetch('/api/files')
      ).json();
      const form = new FormData();
      form.append(
        'file',
        avatar[0],
        FILE_NAME + user?.name,
      );
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      editProfile({ email, name, avatarId: id });
    } else {
      editProfile({ email, name });
    }
  };

  useEffect(() => {
    if (data && !data.ok) {
      setError('formErrors', {
        message: data.message,
      });
    }
    if (data && data.ok) {
      router.push('/profile');
    }
  }, [data, router]);
  return (
    <Layout>
      <div className='px-4 max-w-xl mx-auto'>
        <form
          onChange={onChange}
          onSubmit={handleSubmit(onValid)}
          className='space-y-4 px-4 py-10'
        >
          {/* 아바타 사진 변경 */}
          <div className='flex items-center space-y-6 flex-col justify-center'>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                className='h-40 w-40 rounded-full bg-indigo-200'
              />
            ) : (
              <img className='h-40 w-40 rounded-full bg-indigo-200' />
            )}
            <label
              htmlFor='picture'
              className='cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
            >
              사진 변경
              <input
                {...register('avatar')}
                id='picture'
                type='file'
                className='hidden'
                accept='image/*'
              />
            </label>
          </div>
          <Input
            register={register('email')}
            required={false}
            label='이메일'
            name='email'
            type='email'
            kind='email'
          />
          <Input
            register={register('name')}
            required={false}
            label='이름'
            name='name'
            type='text'
            kind='username'
          />
          {errors.formErrors ? (
            <span className='my-2 block text-center text-sm font-medium text-indigo-500'>
              {errors.formErrors.message}
            </span>
          ) : null}
          <Button
            large={true}
            text={loading ? '로딩중' : '수정하기'}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
