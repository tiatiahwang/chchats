import Button from '@/components/button';
import useMutation from '@/libs/client/useMutation';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Upload() {
  const router = useRouter();
  const quillRef = useRef();
  const inputRef = useRef();
  const [contents, setContents] = useState('');
  const [uploadPost, { loading, data }] = useMutation('/api/posts');

  const imageHandler = useCallback(() => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*'); // 이미지 파일만 선택가능하도록 제한
    input.setAttribute('name', 'image');
    input.click(); // 에디터의 이미지버튼을 클릭하면 이 input이 클릭된다.

    // input이 클릭되면 파일 선택창이 화면에 나타난다.
    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    // input.onchange = async () => {
    //   const file = input.files[0];
    //   // multer에 맞는 형식으로 데이터를 만들어 준다
    //   // 이미지를 url로 바꾸기 위해 서버로 전달하는 폼데이터를 만드는 것이다.
    //   const formData = new FormData();
    //   formData.append('image', file); // formData는 키-밸류 구조

    //   try {
    //     // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
    //     const result = await axios.post(
    //       `${process.env.REACT_APP_API_URL}/uploadimg`,
    //       formData,
    //     );
    //     if (!result.data.url) {
    //       alert('이미지 업로드에 실패하였습니다.');
    //     }
    //     // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
    //     // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
    //     // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

    //     const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
    //     const range = editor.getSelection(); // 커서 위치에 이미지 삽입
    //     editor.insertEmbed(range.index, 'image', result.data.url);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  }, [quillRef]);

  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
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

    const post = {
      title,
      contents,
      category: 'Q&A',
    };

    console.log(post);
    if (loading) return;
    uploadPost(post);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/posts/${data.post.id}`);
    }
  }, [data]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center justify-start'>
          <span>제목</span>
          <input
            ref={inputRef}
            type='text'
            placeholder='제목을 입력해주세요'
            className='w-appearance-none px-3 py-2 placeholder-gray-400 focus:outline-none'
          />
        </div>
        <QuillNoSSRWrapper
          ref={quillRef}
          value={contents}
          onChange={setContents}
          modules={modules}
          theme='snow'
        />
        <div className='pt-5'>
          <Button text={'글 작성하기'} />
        </div>
      </form>
    </div>
  );
}
