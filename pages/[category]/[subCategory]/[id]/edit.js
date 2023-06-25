import Editor from '@/components/editor';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { categories, cls } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

export default function EditPost() {
  const { user } = useUser();
  const router = useRouter();
  const quillRef = useRef();
  const inputRef = useRef();
  const [mainCategory, setMainCategory] = useState('');
  const [subCategories, setSubCategories] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [contents, setContents] = useState('');

  const { data } = useSWR(
    router.isReady
      ? `/api/posts/${router.asPath.split('/')[3]}`
      : null,
  );

  const [editPost, { loading, data: editPostData }] =
    useMutation(
      router.isReady
        ? `/api/posts/${router.asPath.split('/')[3]}/edit`
        : null,
    );

  useEffect(() => {
    if (data && data.ok) {
      setMainCategory(data.post.category);
      setContents(data.post.contents);
      setSelectedSub(data.post.subCategory);
    }
  }, [data]);

  useEffect(() => {
    if (mainCategory === '') return;
    const sub = categories.find(
      (category) => category.ref === mainCategory,
    );
    setSubCategories(sub.subCategories);
  }, [mainCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputValue =
      document.querySelector('input').value;
    const title =
      inputValue !== '' ? inputValue : data.post.title;
    const check = document.querySelector('div.ql-editor');

    if (mainCategory === '' || selectedSub === '') {
      return alert('카테고리를 선택해주세요. 둘다');
    }
    if (title === '' || contents === '') {
      return alert('제목과 내용 입력은 필수 입니다.');
    }

    const post = {
      title,
      contents: check.innerHTML,
      category: mainCategory,
      subCategory: selectedSub,
    };

    if (loading) return;
    editPost(post);
  };

  useEffect(() => {
    if (editPostData && editPostData?.ok) {
      router.push(
        `/${data.post.category}/${data.post.subCategory}/${data.post.id}`,
      );
    }
  }, [editPostData]);

  return (
    <Layout noPaddingTop={true}>
      <div className='h-screen p-4 space-y-4'>
        {/* 카테고리 선택 */}
        <div className='text-xl'>카테고리 선택(필수)</div>
        <div className='border-t-[1px] border-b-[1px] py-4 space-y-4'>
          {/* 메인 카테고리 */}
          <div className='flex space-x-2 items-center'>
            <div className='text-sm'>메인 카테고리</div>
            <ul className='flex'>
              {categories.map((category) => (
                <li
                  onClick={() =>
                    setMainCategory(category.ref)
                  }
                  key={category.id}
                  className={cls(
                    'p-2 rounded-md cursor-pointer',
                    mainCategory === category.ref
                      ? 'bg-gray-200 dark:bg-darkselected'
                      : 'hover:text-indigo-500',
                  )}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          {/* sub 카테고리 */}
          <div className='flex space-x-2 items-center'>
            <div className='text-sm'>서브 카테고리</div>
            {subCategories.length > 0 ? (
              <ul className='flex'>
                {subCategories.map((category) => {
                  if (category.id === 0) return;
                  return (
                    <li
                      onClick={() =>
                        setSelectedSub(category.ref)
                      }
                      key={category.id}
                      className={cls(
                        'p-2 rounded-md cursor-pointer',
                        selectedSub === category.ref
                          ? 'bg-gray-200 dark:bg-darkselected'
                          : 'hover:text-indigo-500',
                      )}
                    >
                      {category.name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
        {/* 에디터 */}
        <Editor
          inputRef={inputRef}
          quillRef={quillRef}
          contents={contents}
          setContents={setContents}
          handleSubmit={handleSubmit}
          placeholder={
            data?.post?.title
              ? data?.post?.title
              : '제목을 입력해주세요'
          }
        />
      </div>
    </Layout>
  );
}
