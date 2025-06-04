import dayjs from "dayjs";

export const diffDay = (date: string | Date) => {
  const diff = dayjs().diff(dayjs(date), "day");

  const displayTime =
    diff === 0
      ? "오늘"
      : diff === 1
      ? "어제"
      : diff === 2
      ? "2일 전"
      : diff === 3
      ? "3일 전"
      : dayjs(date).format("YYYY년 MM월 DD일");

  return displayTime;
};
