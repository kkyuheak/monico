export const formatToMillionsKRW = (price: string) => {
  const number = Number(price.replace(/,/g, ""));
  const millions = Math.floor(number / 1000000);

  return `${millions.toLocaleString()}백만`;
};
