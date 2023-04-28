import { cls } from '@/libs/client/utils';

export default function Button({
  large = false,
  onClick,
  text,
  transparantBg = false,
  ...rest
}) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={cls(
        'w-full rounded-md border border-transparent px-4 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        large ? 'py-3 text-base' : 'py-2 text-sm ',
        transparantBg
          ? 'text-indigo-500 hover:border-indigo-500'
          : 'bg-indigo-500 text-white hover:bg-indigo-600',
      )}
    >
      {text}
    </button>
  );
}
