import Editor from '@/components/editor';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import { cls, categories } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Upload() {
  const router = useRouter();
  const quillRef = useRef();
  const inputRef = useRef();
  const [contents, setContents] = useState('');
  const [uploadPost, { loading, data }] =
    useMutation('/api/posts');

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = inputRef.current.value;

    if (mainCategory === '' || selectedSub === '') {
      return alert('카테고리를 선택해주세요. 둘다');
    }
    if (title === '' || contents === '') {
      return alert('제목과 내용 입력은 필수 입니다.');
    }

    const post = {
      title,
      contents,
      category: mainCategory,
      subCategory: selectedSub,
    };
    console.log(post);

    if (loading) return;
    uploadPost(post);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(
        `/${data.post.category}/${data.post.subCategory}/${data.post.id}`,
      );
    }
  }, [data]);

  const [mainCategory, setMainCategory] = useState('');
  const [subCategories, setSubCategories] = useState('');
  const [selectedSub, setSelectedSub] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    setMainCategory(router.asPath.split('/')[1]);
  }, [router]);

  useEffect(() => {
    if (mainCategory === '') return;
    const sub = categories.find(
      (category) => category.ref === mainCategory,
    );
    setSubCategories(sub.subCategories);
  }, [mainCategory]);

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
          placeholder='제목을 입력해주세요'
        />
      </div>
    </Layout>
  );
}
