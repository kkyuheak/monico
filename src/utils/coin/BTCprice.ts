export const BTCprice = (price: number) => {
  if (price.toString().includes("e")) {
    const splitNum = price.toString().split("-")[1];
    return price.toFixed(+splitNum);
  } else {
    return price;
  }
};
