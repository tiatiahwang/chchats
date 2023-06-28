import dynamic from 'next/dynamic';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Button from './button';
import Loader from './loader';

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

export default function Editor({
  inputRef,
  quillRef,
  contents,
  setContents,
  handleSubmit,
  placeholder,
}) {
  const [isUploading, setIsUploading] = useState(false);
  // editor 높이 설정
  useEffect(() => {
    const check = () => {
      if (quillRef.current) {
        const editor = quillRef.current.editor.container;
        editor.style.height = '450px';
        editor.style.overflow = 'auto';
        return;
      }
      setTimeout(check, 200);
    };
    check();
  }, [quillRef]);

  // 이미지 업로드 관련 로직
  const imageHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*'); // 이미지 파일만 선택가능하도록 제한
    input.setAttribute('name', 'image');
    input.click();

    input.onchange = async () => {
      const file =
        input && input.files ? input.files[0] : null;
      if (file === null) return;
      const formData = new FormData();
      formData.append('image', file); // formData는 키-밸류 구조

      try {
        setIsUploading(true);
        const { uploadURL } = await (
          await fetch('/api/files')
        ).json();
        const form = new FormData();
        form.append(
          'file',
          file,
          FILE_NAME + Math.random() * 100,
        );
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
        const reformedVariants = variants[0].includes(
          'public',
        )
          ? variants[0].split('/public')[0]
          : variants[0].split('/avatar')[0];
        console.log('url', reformedVariants);
        quill.editor.insertEmbed(
          range.index ?? 1,
          'image',
          `${reformedVariants}/public`,
        );
        setIsUploading(false);
      } catch (e) {
        console.log('이미지 업로드 에러!: ', e);
      }
    };
  }, [quillRef]);

  // editor toolbar 설정
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

  return (
    <form onSubmit={handleSubmit}>
      {isUploading ? (
        <div className='fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black flex items-center justify-center text-2xl text-center font-bold z-50'>
          이미지 업로드 중입니다. <br />
          잠시만 기다려 주세요.
        </div>
      ) : null}
      <div className='flex items-center justify-start space-x-2 pb-4'>
        <label className='text-xl'>제목</label>
        <input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
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
  );
}
