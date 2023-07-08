import { useRef } from 'react';

export default function Modal({
  showModal,
  setShowModal,
  onConfirm,
  onCancle,
  isDelete,
}) {
  const modalRef = useRef();
  const handleModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    showModal && (
      <div
        ref={modalRef}
        onClick={(e) => handleModal(e)}
        className='fixed inset-0 bg-opacity-25 backdrop-blur-sm bg-black flex items-center justify-center'
      >
        <div className='w-[300px] bg-white dark:bg-darkhover text-center text-sm p-6 rounded-md space-y-6'>
          {isDelete ? (
            <div>정말 삭제하시겠어요?</div>
          ) : (
            <div>
              로그인이 필요해요.
              <br />
              로그인 페이지로 이동하시겠어요?
            </div>
          )}
          <div className='space-x-6'>
            <button
              onClick={onConfirm}
              className='bg-indigo-500 border-[1px] border-indigo-500 py-2 px-4 text-white rounded-md hover:bg-white dark:hover:bg-darkhover hover:border-indigo-500 hover:text-indigo-500'
            >
              확인
            </button>
            <button
              onClick={onCancle}
              className='border-transparent border-[1px] py-2 px-4 hover:border-black dark:hover:border-white rounded-md'
            >
              취소
            </button>
          </div>
        </div>
      </div>
    )
  );
}
