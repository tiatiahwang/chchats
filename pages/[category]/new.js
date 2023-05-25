import Button from '@/components/button';
import Layout from '@/components/layout';
import useMutation from '@/libs/client/useMutation';
import useUser from '@/libs/client/useUser';
import { cls, categories } from '@/libs/client/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const FILE_NAME = new Date().toJSON().slice(0, 10);

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false },
);
export default function Upload() {
  const { user } = useUser();
  const router = useRouter();
  const quillRef = useRef();
  const inputRef = useRef();
  const [contents, setContents] = useState('');
  const [uploadPost, { loading, data }] =
    useMutation('/api/posts');

  const imageHandler = useCallback(async () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*'); // 이미지 파일만 선택가능하도록 제한
    input.setAttribute('name', 'image');
    input.click(); // 에디터의 이미지버튼을 클릭하면 이 input이 클릭된다.

    // input이 클릭되면 파일 선택창이 화면에 나타난다.
    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async () => {
      const file =
        input && input.files ? input.files[0] : null;
      if (file === null) return;
      // multer에 맞는 형식으로 데이터를 만들어 준다
      // 이미지를 url로 바꾸기 위해 서버로 전달하는 폼데이터를 만드는 것이다.
      const formData = new FormData();
      formData.append('image', file); // formData는 키-밸류 구조

      try {
        const { uploadURL } = await (
          await fetch('/api/files')
        ).json();
        const form = new FormData();
        form.append('file', file, FILE_NAME + user?.name);
        const {
          result: { variants },
        } = await (
          await fetch(uploadURL, {
            method: 'POST',
            body: form,
          })
        ).json();

        const quill = quillRef?.current?.getEditor();
        const range = quill?.getSelection();
        quill.editor.insertEmbed(
          range.index,
          'image',
          variants[0],
        );
      } catch (e) {
        console.log('이미지 업로드 에러!: ', e);
      }
    };
  }, [quillRef]);

  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능들을 순서대로 나열
        container: [
          [
            {
              size: [
                '12px',
                '14px',
                '16px',
                '18px',
                '20px',
              ],
            },
            { color: [] },
          ],
          ['bold', 'italic', 'underline', 'strike'],
          ['image'],
        ],
        handlers: {
          // 위에서 만든 이미지 핸들러 사용하도록 설정
          image: imageHandler,
        },
      },
    }),
    [imageHandler],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = document.querySelector('input').value;

    if (mainCategory === '' || subCategory === '') {
      return alert('카테고리를 선택해주세요. 둘다');
    }
    if (title === '' || contents === '') {
      return alert('제목과 내용 입력은 필수 입니다.');
    }

    const post = {
      title,
      contents,
      category: mainCategory,
      subCategory,
    };

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
    if (router.asPath.includes('[')) return;
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
      <div className='h-screen px-4 space-y-4'>
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
                        setSelectedSub(category.name)
                      }
                      key={category.id}
                      className={cls(
                        'p-2 rounded-md cursor-pointer',
                        selectedSub === category.name
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
        <form onSubmit={handleSubmit}>
          <div className='flex items-center justify-start space-x-2 pb-4'>
            <label className='text-xl'>제목</label>
            <input
              ref={inputRef}
              type='text'
              placeholder='제목을 입력해주세요'
              className='appearance-none rounded-md p-2 dark:text-white dark:bg-darkbg
            placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
            />
          </div>
          <QuillNoSSRWrapper
            forwardedRef={quillRef}
            value={contents}
            onChange={setContents}
            modules={modules}
            theme='snow'
          />
          <div className='pt-8'>
            <Button text={'등록'} />
          </div>
        </form>
      </div>
    </Layout>
  );
}
