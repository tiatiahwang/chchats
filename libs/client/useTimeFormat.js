export default function useTimeFormat(date) {
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const now = new Date();
  const elapsedTime = Math.trunc(
    (now.getTime() - date.getTime()) / 1000,
  );

  let formatted = '';

  if (elapsedTime < seconds) {
    formatted = '방금 전';
  } else if (elapsedTime < minute) {
    formatted = elapsedTime + '초 전';
  } else if (elapsedTime < hour) {
    formatted = Math.trunc(elapsedTime / minute) + '분 전';
  } else if (elapsedTime < day) {
    formatted = Math.trunc(elapsedTime / hour) + '시간 전';
  } else if (elapsedTime < day * 15) {
    formatted = Math.trunc(elapsedTime / day) + '일 전';
  } else {
    formatted = SimpleDateTimeFormat(date, 'yyyy.M.d');
  }

  return formatted;
}
